/* Ver 4.8 menu title and return destination survive authentication and business steps. */
let v48MenuContext=null;
const V48_MENU_ENTRY_ATTRIBUTES=['data-v48cat','data-v48item','data-v48self','data-v47searchgo','data-v48-notice','data-v48-congestion','data-v47sub','data-mediasheet','data-s1go','data-staffconnect'];
const v48CopyNavigation=value=>value==null?value:JSON.parse(JSON.stringify(value));
function v48SameLocation(a,b){
  return !!a&&!!b&&['page','v48Category','v48MenuId','listKey','resultKey','title'].every(key=>(a[key]||'')===(b[key]||''));
}
function v48ReconcileMenuContext(){
  while(v48MenuContext&&v48SameLocation(s1state,v48MenuContext.origin.state))v48MenuContext=v48MenuContext.parent;
  if(s1state.page==='home')v48MenuContext=null;
}
function v48BeginMenu(title,trigger=null){
  if(!isV48())return;
  v48ReconcileMenuContext();
  const drawer=document.getElementById('menuDrawer');
  const attribute=trigger&&V48_MENU_ENTRY_ATTRIBUTES.find(name=>trigger.hasAttribute(name));
  v48MenuContext={title,parent:v48MenuContext,origin:{
    state:v48CopyNavigation(s1state),scroll:document.getElementById('s1view')?.scrollTop||0,
    drawer:drawer?.classList.contains('on')?{scroll:drawer.querySelector('.menu-scroll')?.scrollTop||0}:null,
    search:{text:v48SearchText,submitted:v48SearchSubmitted},
    auth:{flow:v48CopyNavigation(v48Flow),pending:v48CopyNavigation(v48Pending),origin:v48CopyNavigation(v48Origin)},
    trigger:attribute?{name:attribute,value:trigger.getAttribute(attribute)}:null
  }};
}
function v48TrackMenuClick(target){
  if(!isV48())return;
  const trigger=target.closest('[data-v48cat],[data-v48item],[data-v48self],[data-v47searchgo],[data-v48-notice],[data-v48-congestion],[data-v47sub],[data-mediasheet],.v48-notice-action[data-s1go],[data-staffconnect]');
  if(!trigger||trigger.hasAttribute('data-v48-expand'))return;
  if(['consult','menu'].includes(trigger.dataset.v47searchgo))return;
  let title=trigger.dataset.v47title||trigger.dataset.fk;
  if(trigger.hasAttribute('data-v47sub'))title=trigger.querySelector('b')?.textContent||trigger.dataset.v47sub;
  if(trigger.hasAttribute('data-v48item'))title=v48FindItem(trigger.dataset.v48item)?.title;
  if(trigger.hasAttribute('data-v48self'))title=V48Menu.selfServices.find(item=>item.id===trigger.dataset.v48self)?.title;
  if(trigger.hasAttribute('data-v48cat'))title=V48Menu.categories.find(item=>item.id===+trigger.dataset.v48cat)?.title;
  if(trigger.hasAttribute('data-v48-notice'))title='공지사항';
  if(trigger.hasAttribute('data-v48-congestion'))title='고객센터 혼잡도';
  if(trigger.hasAttribute('data-mediasheet'))title=MEDIA_SHEETS[trigger.dataset.mediasheet]?.title;
  if(title)v48BeginMenu(title,trigger);
}
function v48CloseMenu(){
  if(!isV48())return;
  const context=v48MenuContext;
  if(!context){v48GoHome();return;}
  const {origin}=context;
  v48StopPhoneTimers();v48ClosePhoneSheet(false);v48CloseQuickHelp(false);
  closeMenuDrawer();closeMethodSheet();closeConsult();closeAcctSheet();closeStkSheet();closePwKeypad();
  v48MenuContext=context.parent;
  v48Flow=v48CopyNavigation(origin.auth.flow);v48Pending=v48CopyNavigation(origin.auth.pending);v48Origin=v48CopyNavigation(origin.auth.origin);
  for(const key of Object.keys(s1state))delete s1state[key];
  Object.assign(s1state,v48CopyNavigation(origin.state));
  v48SearchText=origin.search.text;v48SearchSubmitted=origin.search.submitted;
  v48SyncAccount();renderS1();
  const view=document.getElementById('s1view');view.scrollTop=origin.scroll;
  let root=view;
  if(origin.drawer){
    // Remove a drawer still finishing its exit before recreating the source list.
    document.getElementById('menuDrawer')?.remove();
    openMenuDrawer();root=document.getElementById('menuDrawer');
    root.querySelector('.menu-scroll').scrollTop=origin.drawer.scroll;
  }
  if(origin.trigger){
    const {name,value}=origin.trigger;
    Array.from(root.querySelectorAll(`[${name}]`)).find(el=>el.getAttribute(name)===value)?.focus({preventScroll:true});
  }
}
function v48MountTaskHeader(view){
  const flow=view.closest('.flow');
  flow.querySelector(':scope > .v48-task-header')?.remove();
  if(!isV48())return;
  v48ReconcileMenuContext();
  if(s1state.page==='home')return;
  const search=s1state.page==='v48search';
  const browse=search||s1state.page==='allmenu';
  const title=search?'검색':s1state.page==='allmenu'?'전체메뉴':v48MenuContext?.title||v48Flow?.taskTitle||s1state.title||'메뉴';
  const legacyHeader=view.querySelector('.v48-auth > header,.v48-notice-header,.v48-search-top,.page-top,.toss-stick .toss-top,.fv-wrap > .toss-top');
  const legacyBack=legacyHeader?.querySelector('[data-v48-back],[data-v48-search-back],[data-s1back],[data-v47mi-back],[data-v47mi-help-back],[data-v47u-back],[data-v47u-history-back],[data-v45back]');
  // Ver 4.8 detail pages retain contextual actions without step indicators.
  view.querySelectorAll('.v47mi-stepper,.v45-stepper').forEach(element=>element.remove());
  if(legacyHeader){
    legacyHeader.classList.add('v48-replaced-header');
    const extras=Array.from(legacyHeader.children).filter(el=>el.matches('.v47u-top-action,.isa-refresh,.v47-header-refresh,.v47-cert-refresh,[data-refresh]'));
    if(extras.length){
      const progress=document.createElement('div');progress.className='v48-task-progress';
      extras.forEach(el=>progress.appendChild(el));legacyHeader.after(progress);
    }
  }
  const repeatedTitle=view.querySelector('.v48-catalog-page > .toss-stick .td-title');
  if(repeatedTitle?.textContent===title)repeatedTitle.remove();
  const header=document.createElement('header');header.className='v48-task-header'+(browse?' v48-browse-header':'');header.setAttribute('aria-label','현재 메뉴');
  header.innerHTML=`${browse?'':`<button type="button" data-v48-task-back aria-label="이전 화면">${I.back}</button>`}<h1 id="v48TaskTitle">${v47Esc(title)}</h1><button type="button" data-v48-task-close aria-label="${search?'검색 닫기':'메뉴 닫기'}">${I.x}</button>`;
  const goBack=()=>{
    if(legacyBack)legacyBack.click();else s1back();
  };
  header.querySelector('[data-v48-task-close]').addEventListener('click',search?v48CloseSearch:v48CloseMenu);
  header.querySelector('[data-v48-task-back]')?.addEventListener('click',goBack);
  view.querySelector('.v48-auth')?.setAttribute('aria-labelledby','v48TaskTitle');
  flow.insertBefore(header,view);
}
function v48MountPrimaryActions(view){
  if(!isV48())return;
  view.querySelectorAll('.primary-btn,.v48-auth-button,.v47mi-dual-btn.primary,.v47u-card-cta,.v45-doc-btn,.doc-btn,.pw-help-cta').forEach(button=>{
    if(button.closest('[role="dialog"],.consult-ov,.sheet,.method-ov,.v48-phone-sheet-overlay')||button.classList.contains('secondary'))return;
    button.classList.add('v48-primary-action');
  });
}
