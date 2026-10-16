/* Local authoring only. This entire file is excluded from the public demo build. */
(function(){
  const local=location.protocol==='file:'||['127.0.0.1','localhost','[::1]'].includes(location.hostname);
  if(!local||/\/demo\//.test(location.pathname)||document.body.dataset.demoOnly)return;
  const M=window.KiwoomContentModel,C=window.KiwoomContent;if(!M||!C)return;
  const KEY='kiwoom.local-content-draft.v1',baseSignature=JSON.stringify(C.published);
  let data=C.getData(),mode='preview',selection=null,dragged=null,history=[],future=[],staleDraft=null;
  let panel,dialog,editorTarget,scheduled=false,storageOK=true,message='아직 변경한 내용이 없어요.',pointerStart=null,suppressClickUntil=0;
  try{
    const draft=JSON.parse(localStorage.getItem(KEY)||'null');
    if(draft){const clean=M.validate(draft.data,C.baseCatalog);if(draft.baseSignature===baseSignature){data=clean;C.setData(data);message='이 브라우저에 임시 저장된 변경사항을 복원했어요.';}else staleDraft=clean;}
  }catch(_){message='이전 임시저장을 읽지 못했어요. 저장한 편집 파일을 불러올 수 있어요.';}
  const menuCount=()=>Object.keys(data.itemOrder).length+(data.categoryOrder.length?1:0);
  const copyCount=()=>Object.keys(data.labels).length+data.copies.length;
  function saveDraft(){
    try{localStorage.setItem(KEY,JSON.stringify({baseSignature,data,savedAt:new Date().toISOString()}));storageOK=true;}
    catch(_){storageOK=false;message='브라우저 임시저장이 차단됐어요. 변경사항을 파일로 저장해 주세요.';}
  }
  function renderMenus(){
    if(typeof isV48==='function'&&isV48()&&typeof renderS1==='function'&&['home','allmenu','v48category','v48menu'].includes(s1state.page)){
      const view=document.getElementById('s1view'),scroll=view?.scrollTop||0;renderS1();if(view)view.scrollTop=scroll;
    }
    if(document.getElementById('menuDrawer')&&typeof refreshMenu==='function')refreshMenu();
    C.apply();decorate();
  }
  function commit(next,label,menus=false){
    const clean=M.validate(next,C.baseCatalog);if(JSON.stringify(clean)===JSON.stringify(data))return;
    history.push(M.clone(data));if(history.length>50)history.shift();future=[];
    data=clean;C.setData(data);saveDraft();message=storageOK?label:message;
    if(menus)renderMenus();updatePanel();
  }
  function undo(redo=false){
    const from=redo?future:history,to=redo?history:future;if(!from.length)return;
    to.push(M.clone(data));data=from.pop();C.setData(data);saveDraft();renderMenus();
    message=redo?'변경사항을 다시 적용했어요.':'마지막 변경을 취소했어요.';updatePanel();
  }
  function selectionInfo(node){
    const category=node.closest('.v48-home [data-v48cat]');
    if(category)return {kind:'category',id:category.dataset.v48cat};
    const item=node.closest('.v48-inline-menu [data-v48item]');
    if(item){const group=window.V48Menu.categories.find(c=>c.items.some(i=>i.id===item.dataset.v48item));return {kind:'item',id:item.dataset.v48item,category:String(group.id)};}
    return null;
  }
  function selectedTitle(){
    if(!selection)return '이동할 메뉴를 선택해 주세요.';
    if(selection.kind==='category')return window.V48Menu.categories.find(c=>String(c.id)===selection.id)?.title;
    return window.V48Menu.categories.flatMap(c=>c.items).find(i=>i.id===selection.id)?.title;
  }
  function selectedIds(){
    if(!selection)return [];
    return selection.kind==='category'?window.V48Menu.categories.map(c=>String(c.id)):window.V48Menu.categories.find(c=>String(c.id)===selection.category).items.map(i=>i.id);
  }
  function moveSelection(target){
    const ids=selectedIds(),next=M.clone(data),order=M.move(ids,selection.id,target);
    if(selection.kind==='category')next.categoryOrder=order;else next.itemOrder[selection.category]=order;
    commit(next,'메뉴 순서를 변경했어요. 전체메뉴에도 함께 반영돼요.',true);
    document.querySelector(selection.kind==='category'?`.v48-home [data-v48cat="${selection.id}"]`:`.v48-inline-menu [data-v48item="${selection.id}"]`)?.focus({preventScroll:true});
  }
  function decorate(){
    scheduled=false;
    document.querySelectorAll('[data-local-movable]').forEach(node=>{
      if(mode!=='order'){node.removeAttribute('draggable');node.removeAttribute('data-local-movable');node.removeAttribute('data-local-selected');}
    });
    if(mode!=='order')return;
    document.querySelectorAll('.v48-home [data-v48cat],.v48-inline-menu [data-v48item]').forEach(node=>{
      if(node.getAttribute('draggable')!=='false')node.setAttribute('draggable','false');
      node.dataset.localMovable='';
      const item=selectionInfo(node),selected=selection?.id===item?.id&&selection?.kind===item?.kind;
      if(selected)node.dataset.localSelected='';else node.removeAttribute('data-local-selected');
    });
  }
  function setMode(next){
    mode=next;document.body.dataset.localEditMode=mode;selection=null;decorate();updatePanel();
  }
  function findCopy(target){
    if(!target.closest('.phone-wrap[id]')||target.closest('input,textarea,select,svg,[contenteditable],[data-local-editor-ui]'))return null;
    const shared=target.closest('[data-content-label]');if(shared)return shared;
    const action=target.closest('[data-v47searchgo]');
    if(action){
      const match=/^v48:(category|item|self):(.+)$/.exec(action.dataset.v47searchgo);
      const title=action.querySelector('.v47-sr-copy > b,.v48-menu-result > span > strong,b')||(!action.querySelector('small,strong')?action:null);
      if(match&&title&&(target===action||title.contains(target))&&C.editable(title)){title.dataset.contentLabel=`${match[1]==='category'?'category':'item'}:${match[2]}:title`;return title;}
    }
    const block=target.closest('h1,h2,h3,p,label,dt,dd');
    if(block&&C.editable(block))return block;
    for(let el=target;el&&el!==C.containerOf(target);el=el.parentElement){if(C.editable(el))return el;}
    return null;
  }
  function openCopy(element){
    const key=element.dataset.contentLabel,record=key?null:C.descriptor(element);if(!key&&!record)return;
    editorTarget={element,key,record};
    dialog.querySelector('[data-copy-original]').textContent=key?C.originalText(element):record.original;
    dialog.querySelector('textarea').value=C.copyText(element);
    dialog.querySelector('[data-copy-scope]').textContent=key?'같은 메뉴 이름은 메인·전체메뉴·검색에 함께 반영돼요.':'현재 화면의 이 문구만 변경해요. 줄바꿈도 입력할 수 있어요.';
    dialog.querySelector('[data-copy-error]').textContent='';
    dialog.showModal();dialog.querySelector('textarea').focus();dialog.querySelector('textarea').select();
  }
  function applyCopy(){
    const next=M.clone(data),text=dialog.querySelector('textarea').value.replace(/\r/g,'').trim();
    if(editorTarget.key)next.labels[editorTarget.key]=text;
    else {
      const record={...editorTarget.record,text};
      next.copies=next.copies.filter(c=>!(c.scope===record.scope&&c.root===record.root&&c.selector===record.selector));
      if(text!==record.original)next.copies.push(record);
    }
    try{commit(next,'문구를 변경하고 임시 저장했어요.',!!editorTarget.key);dialog.close();editorTarget=null;}
    catch(error){dialog.querySelector('[data-copy-error]').textContent=error.message;}
  }
  async function exportFile(){
    const json=JSON.stringify(M.validate(data,C.baseCatalog),null,2)+'\n';
    try{
      const url=URL.createObjectURL(new Blob([json],{type:'application/json'})),link=document.createElement('a');
      link.href=url;link.download='kiwoom-content-edits.json';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
      message='다운로드한 kiwoom-content-edits.json 파일과 함께 코드 반영·배포를 요청해 주세요.';
    }catch(_){message='파일을 저장하지 못했어요. 다시 저장해 주세요.';}
    updatePanel();
  }
  function updatePanel(){
    if(!panel)return;
    panel.querySelectorAll('[data-editor-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.editorMode===mode)));
    panel.querySelector('[data-editor-status]').textContent=message;
    panel.querySelector('[data-editor-count]').textContent=`메뉴 순서 ${menuCount()} · 문구 ${copyCount()}`;
    panel.querySelector('[data-editor-order]').hidden=mode!=='order';
    panel.querySelector('[data-editor-text]').hidden=mode!=='text';
    panel.querySelector('[data-editor-selection]').textContent=selectedTitle();
    const ids=selectedIds(),index=ids.indexOf(selection?.id);
    panel.querySelector('[data-editor-up]').disabled=index<=0;
    panel.querySelector('[data-editor-down]').disabled=index<0||index===ids.length-1;
    panel.querySelector('[data-editor-undo]').disabled=!history.length;
    panel.querySelector('[data-editor-redo]').disabled=!future.length;
    panel.querySelector('[data-editor-stale]').hidden=!staleDraft;
    const list=panel.querySelector('[data-editor-changes]');list.replaceChildren();
    const changes=[...(data.categoryOrder.length?['9그리드 대메뉴 순서']:[]),...Object.keys(data.itemOrder).map(id=>(window.V48Menu.categories.find(c=>String(c.id)===id)?.title||id)+' 하위 메뉴 순서'),...Object.values(data.labels),...data.copies.map(c=>c.text||'(문구 비움)')];
    changes.forEach(text=>{const li=document.createElement('li');li.textContent=text;list.appendChild(li);});
  }
  function init(){
    const right=document.querySelector('.stage-spacer');if(!right)return;
    document.body.classList.add('local-admin');document.body.dataset.localEditMode='preview';
    panel=document.createElement('aside');panel.id='localEditor';panel.dataset.localEditorUi='';
    panel.innerHTML=`<header><span class="local-editor-tag">LOCAL ONLY</span><h2>화면 편집</h2><p>메뉴 배치와 고정 문구를 수정해요.</p></header>
      <div class="local-editor-modes" role="group" aria-label="로컬 편집 모드"><button type="button" data-editor-mode="preview" aria-pressed="true">시연</button><button type="button" data-editor-mode="order" aria-pressed="false">메뉴 이동</button><button type="button" data-editor-mode="text" aria-pressed="false">문구 수정</button></div>
      <div class="local-editor-guide" data-editor-order hidden><p>메인 메뉴를 원하는 위치로 끌어 놓으세요. 대메뉴를 누르면 하위 메뉴도 정렬할 수 있어요.</p><strong data-editor-selection></strong><div class="local-editor-pair"><button type="button" data-editor-up disabled>↑ 앞으로</button><button type="button" data-editor-down disabled>↓ 뒤로</button></div><small>키보드: 메뉴 선택 후 Alt + 방향키<br>대메뉴 간 하위 메뉴 이동은 지원하지 않아요.</small></div>
      <div class="local-editor-guide" data-editor-text hidden><p>휴대폰 화면의 고정 문구를 <strong>더블클릭</strong>하세요.</p><small>입력창의 값은 편집하지 않아요.<br>다른 페이지로 이동할 때는 ‘시연’을 선택하세요.</small></div>
      <div class="local-editor-save"><strong data-editor-count></strong><p role="status" aria-live="polite" data-editor-status></p><div class="local-editor-pair"><button type="button" data-editor-undo disabled>되돌리기</button><button type="button" data-editor-redo disabled>다시 적용</button></div><button type="button" class="local-editor-primary" data-editor-export>변경사항 저장</button><button type="button" data-editor-import>저장한 파일 불러오기</button><input type="file" data-editor-file accept=".json,application/json" hidden><small>임시저장은 이 브라우저에만 남아요.<br>저장한 파일과 함께 커밋·배포를 요청해 주세요.</small></div>
      <button type="button" data-editor-stale hidden>이전 코드의 임시저장 복원</button><details><summary>변경 내용</summary><ul data-editor-changes></ul><button type="button" data-editor-reset>코드에 저장된 상태로 되돌리기</button></details>`;
    right.prepend(panel);
    dialog=document.createElement('dialog');dialog.className='local-copy-dialog';dialog.dataset.localEditorUi='';
    dialog.innerHTML='<form><h2>문구 수정</h2><p data-copy-scope></p><details><summary>기존 문구</summary><p data-copy-original></p></details><label for="localCopyValue">변경할 문구</label><textarea id="localCopyValue" rows="5" maxlength="2000"></textarea><p role="alert" data-copy-error></p><div class="local-editor-pair"><button type="button" data-copy-cancel>취소</button><button type="submit" class="local-editor-primary">적용</button></div><small>Ctrl + Enter로 적용 · Esc로 취소</small></form>';
    document.body.appendChild(dialog);
    dialog.querySelector('form').addEventListener('submit',event=>{event.preventDefault();applyCopy();});
    dialog.querySelector('[data-copy-cancel]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('keydown',event=>{if(event.key==='Enter'&&(event.ctrlKey||event.metaKey)){event.preventDefault();applyCopy();}});
    panel.addEventListener('click',event=>{
      const t=event.target;
      if(t.closest('[data-editor-mode]'))setMode(t.closest('[data-editor-mode]').dataset.editorMode);
      if(t.closest('[data-editor-up],[data-editor-down]')&&selection){const ids=selectedIds(),step=t.closest('[data-editor-up]')?-1:1;moveSelection(ids[ids.indexOf(selection.id)+step]);}
      if(t.closest('[data-editor-undo]'))undo();if(t.closest('[data-editor-redo]'))undo(true);
      if(t.closest('[data-editor-export]'))exportFile();
      if(t.closest('[data-editor-import]'))panel.querySelector('[data-editor-file]').click();
      if(t.closest('[data-editor-reset]'))commit(M.clone(C.published),'코드에 저장된 상태로 돌아갔어요. 되돌리기로 복원할 수 있어요.',true);
      if(t.closest('[data-editor-stale]')&&staleDraft){commit(staleDraft,'이전 임시저장을 복원했어요.');staleDraft=null;renderMenus();updatePanel();}
    });
    panel.querySelector('[data-editor-file]').addEventListener('change',async event=>{
      const file=event.target.files[0];if(!file)return;
      try{if(file.size>2*1024*1024)throw new Error('2 MB 이하의 편집 파일을 선택해 주세요.');commit(JSON.parse(await file.text()),'저장한 편집 파일을 불러왔어요.',true);}
      catch(error){message=error.message;updatePanel();}finally{event.target.value='';}
    });
    document.addEventListener('click',event=>{
      if(event.target.closest('[data-local-editor-ui]'))return;
      if(Date.now()<suppressClickUntil&&selectionInfo(event.target)){event.preventDefault();event.stopImmediatePropagation();return;}
      if(mode==='text'&&event.target.closest('.phone-wrap[id]')&&!event.target.closest('input,textarea,select')){event.preventDefault();event.stopImmediatePropagation();return;}
      if(mode==='order'){
        const item=selectionInfo(event.target);if(!item)return;
        selection=item;decorate();updatePanel();
        if(item.kind==='item'){event.preventDefault();event.stopImmediatePropagation();}
      }
    },true);
    document.addEventListener('dblclick',event=>{
      if(mode!=='text'||event.target.closest('[data-local-editor-ui]'))return;
      const element=findCopy(event.target);if(!element)return;event.preventDefault();event.stopImmediatePropagation();openCopy(element);
    },true);
    document.addEventListener('keydown',event=>{
      if(event.target.closest('[data-local-editor-ui],input,textarea,select'))return;
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();exportFile();return;}
      if(mode==='text'&&event.target.closest('.phone-wrap[id]')&&['Enter',' '].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();const el=findCopy(event.target);if(el)openCopy(el);}
      if(mode==='order'&&event.altKey&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){
        const item=selectionInfo(event.target);if(!item)return;selection=item;const ids=selectedIds(),step=['ArrowUp','ArrowLeft'].includes(event.key)?-1:1,target=ids[ids.indexOf(item.id)+step];
        event.preventDefault();event.stopImmediatePropagation();if(target)moveSelection(target);
      }
    },true);
    // Pointer dragging works in embedded browsers as well as regular desktop browsers.
    document.addEventListener('pointerdown',event=>{
      if(mode!=='order'||event.button!==0)return;const item=selectionInfo(event.target);if(!item)return;
      const node=event.target.closest('[data-local-movable]');
      pointerStart={item,x:event.clientX,y:event.clientY,id:event.pointerId,node};node.setPointerCapture(event.pointerId);
    });
    document.addEventListener('pointermove',event=>{
      if(!pointerStart||event.pointerId!==pointerStart.id)return;
      if(!dragged&&Math.hypot(event.clientX-pointerStart.x,event.clientY-pointerStart.y)<6)return;
      if(!dragged){dragged=pointerStart.item;selection=dragged;decorate();updatePanel();}
      const node=document.elementFromPoint(event.clientX,event.clientY),target=node&&selectionInfo(node);
      document.querySelector('[data-local-drop]')?.removeAttribute('data-local-drop');
      if(target&&target.kind===dragged.kind&&target.category===dragged.category)node.closest('[data-local-movable]')?.setAttribute('data-local-drop','');
      const view=document.getElementById('s1view'),rect=view?.getBoundingClientRect();
      if(rect&&event.clientX>rect.left&&event.clientX<rect.right){if(event.clientY<rect.top+32)view.scrollTop-=12;else if(event.clientY>rect.bottom-32)view.scrollTop+=12;}
      event.preventDefault();
    });
    document.addEventListener('pointerup',event=>{
      if(!pointerStart||event.pointerId!==pointerStart.id)return;
      const node=document.elementFromPoint(event.clientX,event.clientY),target=node&&selectionInfo(node),moving=dragged;
      pointerStart.node.releasePointerCapture?.(event.pointerId);pointerStart=null;dragged=null;
      document.querySelector('[data-local-drop]')?.removeAttribute('data-local-drop');
      if(!moving)return;suppressClickUntil=Date.now()+300;event.preventDefault();
      if(target&&target.kind===moving.kind&&target.category===moving.category){selection=moving;moveSelection(target.id);}
    });
    document.addEventListener('pointercancel',()=>{pointerStart=null;dragged=null;document.querySelector('[data-local-drop]')?.removeAttribute('data-local-drop');});
    new MutationObserver(()=>{if(!scheduled){scheduled=true;queueMicrotask(decorate);}}).observe(document.querySelector('.stage'),{childList:true,subtree:true});
    if(JSON.stringify(data)!==baseSignature)renderMenus();updatePanel();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
