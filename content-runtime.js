/* Read-only rendering of approved presentation data; shared by local and published pages. */
(function(root){
  const M=root.KiwoomContentModel,baseCatalog=root.V48Menu;
  if(!M||!baseCatalog)return;
  const published=M.validate(root.KiwoomContentData||M.empty(),baseCatalog);
  let data=M.clone(published),observer,scheduled=false;
  const applied=new Map();
  const excluded='input,textarea,select,option,script,style,svg,canvas,iframe,[contenteditable="true"],[data-local-editor-ui]';
  const normalize=value=>String(value||'').replace(/\r/g,'').replace(/[ \t]+/g,' ').replace(/ *\n */g,'\n').trim();
  function copyText(element){
    if(!element||element.matches(excluded))return '';
    let result='';
    const walk=node=>{
      if(node.nodeType===3){result+=node.data;return;}
      if(node.nodeType!==1||node.matches(excluded)||node.getAttribute('aria-hidden')==='true')return;
      if(node.tagName==='BR'){result+='\n';return;}
      for(const child of node.childNodes)walk(child);
    };
    walk(element);return normalize(result);
  }
  function labelValue(key,catalog=baseCatalog){
    const [kind,id,field]=String(key).split(':');
    const item=kind==='category'?catalog.categories.find(c=>String(c.id)===id):[...catalog.categories.flatMap(c=>c.items),...catalog.legacyItems,...catalog.otherDocuments,...catalog.selfServices].find(i=>i.id===id);
    return item?.[field];
  }
  const originalText=element=>element.dataset.contentLabel?labelValue(element.dataset.contentLabel):applied.get(element)?.original||copyText(element);
  function editable(element){
    return !!element&&!element.closest(excluded)&&!element.querySelector('input,textarea,select,[contenteditable],button,a')&&!!copyText(element)&&copyText(element).length<=2000;
  }
  function scope(container,element){
    if(container.dataset.contentScreen)return container.id+':'+container.dataset.contentScreen;
    if(container.id==='mainStage'&&typeof s1state!=='undefined'&&typeof sianScheme!=='undefined'&&sianScheme==='s1'){
      const state=s1state,auth=typeof v48Flow==='undefined'?null:v48Flow;
      const version=typeof s1Ver==='undefined'?'':s1Ver;
      if(element?.closest('#menuDrawer'))return 's1:'+version+':drawer';
      if(element?.closest('.v48-global-header'))return 's1:'+version+':header';
      // Navigation retains unrelated state; it must not alter a page's copy identity.
      const page=state.page,detail=page==='result'?state.resultKey:page==='list'?state.listKey:
        page==='v48category'?state.v48Category:page==='v48menu'?state.v48MenuId:
        page==='v47myinfo'?[state.v47MyInfo?.flow,state.v47MyInfo?.step]:
        page==='v47untact'?[state.v47Untact?.flow,state.v47Untact?.step]:
        page==='v48auth'?auth?.step:null;
      return 's1:'+JSON.stringify([version,page,detail]);
    }
    const view=container.querySelector('.dform-view,.dars.active,.flow.active');
    const heading=view?.querySelector('h1,h2,.df-title,.df-detail-title,.df-done-t');
    return container.id+':'+(view?.className||'')+':'+(heading?originalText(heading):'');
  }
  function containerOf(element){return element.closest('.phone-wrap[id]');}
  function selectorFor(element,container){
    const parts=[];
    for(let node=element;node&&node!==container;node=node.parentElement){
      if(node.id&&container.querySelectorAll('#'+CSS.escape(node.id)).length===1){parts.unshift('#'+CSS.escape(node.id));break;}
      let part=node.tagName.toLowerCase();
      const stable=Array.from(node.attributes).find(a=>/^data-(v48item|v48cat|v48self|v47sub|s1go|dfgo|dfguide|dfattach|v47searchgo)$/.test(a.name));
      if(stable)part+=`[${stable.name}="${CSS.escape(stable.value)}"]`;
      else {
        const classes=Array.from(node.classList).filter(c=>!/^(on|active|show|open|selected|is-|local-)/.test(c));
        if(classes.length)part+='.'+classes.map(c=>CSS.escape(c)).join('.');
        const peers=node.parentElement?Array.from(node.parentElement.children).filter(n=>n.tagName===node.tagName):[];
        if(peers.length>1)part+=`:nth-of-type(${peers.indexOf(node)+1})`;
      }
      parts.unshift(part);
    }
    return parts.join(' > ');
  }
  function descriptor(element){
    const container=containerOf(element);if(!container||!editable(element))return null;
    return {scope:scope(container,element),root:container.id,selector:selectorFor(element,container),original:originalText(element),text:copyText(element)};
  }
  function writeCopy(element,value){
    const nodes=[];
    const walk=node=>{
      if(node.nodeType===3){nodes.push(node);return;}
      if(node.nodeType!==1||node.matches(excluded)||node.getAttribute('aria-hidden')==='true')return;
      for(const child of Array.from(node.childNodes))walk(child);
      if(node.tagName==='BR')node.remove();
    };
    walk(element);if(!nodes.length)return;
    nodes[0].data=value;nodes.slice(1).forEach(node=>node.data='');element.style.whiteSpace='pre-line';
  }
  function restore(){
    for(const [element,previous] of applied){
      if(element.isConnected&&copyText(element)===normalize(previous.text)){
        element.innerHTML=previous.html;element.style.whiteSpace=previous.whiteSpace;
        if(previous.aria!==null)element.setAttribute('aria-label',previous.aria);
      }
    }
    applied.clear();
  }
  function observe(){observer?.observe(document.body,{childList:true,subtree:true,characterData:true});}
  function apply(){
    scheduled=false;observer?.disconnect();
    for(const [element] of applied)if(!element.isConnected)applied.delete(element);
    document.querySelectorAll('.phone-wrap [data-content-label]').forEach(element=>{
      const value=labelValue(element.dataset.contentLabel,root.V48Menu);
      if(value!==undefined&&copyText(element)!==normalize(value))writeCopy(element,value);
      const action=element.closest('[data-v47searchgo]');
      if(action&&value!==undefined&&element.dataset.contentLabel.endsWith(':title'))action.setAttribute('data-v47title',value);
    });
    for(const copy of data.copies){
      const container=document.getElementById(copy.root);
      if(!container?.matches('.phone-wrap'))continue;
      let matches;try{matches=container.querySelectorAll(copy.selector);}catch(_){continue;}
      if(matches.length!==1)continue;
      const element=matches[0];if(scope(container,element)!==copy.scope||applied.has(element)||!editable(element)||copyText(element)!==normalize(copy.original))continue;
      const previous={html:element.innerHTML,original:copy.original,text:copy.text,whiteSpace:element.style.whiteSpace,aria:element.getAttribute('aria-label')};
      applied.set(element,previous);writeCopy(element,copy.text);
      if(previous.aria===copy.original)element.setAttribute('aria-label',copy.text);
    }
    observe();
  }
  function schedule(){if(!scheduled){scheduled=true;queueMicrotask(apply);}}
  function setData(next){
    const validated=M.validate(next,baseCatalog);observer?.disconnect();restore();
    data=validated;root.V48Menu=M.applyCatalog(baseCatalog,data);apply();
    return M.clone(data);
  }
  root.V48Menu=M.applyCatalog(baseCatalog,data);
  root.KiwoomContent={baseCatalog,published,getData:()=>M.clone(data),setData,apply,copyText,originalText,editable,descriptor,containerOf,scope};
  document.addEventListener('DOMContentLoaded',()=>{observer=new MutationObserver(schedule);apply();});
})(window);
