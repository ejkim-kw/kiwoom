/* Shared Ver 4.8 catalog navigation. Existing service IDs keep their detail routes. */
const V48_SELF_COPY = [
  '입출금이 제한된 원인과 해결 방법을 확인해요',
  '신청한 서류의 발급 상태를 확인해요',
  '가입·만기연장·이전에 필요한 서류를 제출해요',
  'ID·증권계좌·공동인증서 비밀번호를 확인해요',
  '비대면으로 접수한 업무의 진행 상태를 확인해요',
  '계좌와 ID를 확인하고 다시 이용할 준비를 해요',
  '착오송금 유형과 자금반환 신청 방법을 확인해요',
  '레버리지 ETP 거래요건과 신청내역을 확인해요',
  '파생상품 적격투자자 신청과 서류접수를 확인해요'
];
const V48_CATEGORY_COPY = {
  1:'고객정보와 계좌·ID·비밀번호를 확인하고 관리해요.',
  2:'ARS·인증서·OTP 이용 방법과 설정을 확인해요.',
  3:'계좌개설을 이어가거나 계좌를 폐쇄해요.',
  4:'잔고·거래·금융소득 등 필요한 서류를 신청해요.',
  5:'이체·주식대체와 계좌 이용 제한을 확인해요.',
  6:'미수·신용·대출 내역과 상환 업무를 확인해요.',
  7:'청약과 보유 주식의 권리 업무를 확인해요.',
  8:'국내주식 시세와 주문·예수금·잔고를 확인해요.',
  9:'해외주식·금융상품·파생상품과 매체 이용을 문의해요.'
};
const V48_LEGACY_SELF = {
  'self-1':'iodstart', 'self-2':'certstart', 'self-3':'isastart',
  'self-4':'pwreset', 'self-5':'untactstatusstart'
};
const V48_LEGACY_MYINFO = {
  '1-1':'계좌정보 조회 및 변경', 'account-number':'증권계좌번호확인',
  '1-4':'ID조회/PW초기화', '1-5':'장기미사용ID 제한 해지'
};
const V48_LEGACY_UNTACT = {
  '2-1':'서류신청', '2-2':'계좌개설 이어하기', '2-3':'출금계좌등록',
  '2-4':'계좌폐쇄', '3-3':'한도제한계좌해제'
};
const V48_MEDIA_ROUTES = {
  '1-2':'accident', '1-6':'authid', '3-1':'song', '3-4':'shipping',
  '4-4':'credit', '5-1':'rights', '5-2':'ipo', '6-2':'pwmgmt',
  '6-3':'etcsvc', '7-5':'altex'
};
const V48_RECENT_STAR='<svg viewBox="0 0 24 24" fill="#fa58cf" aria-hidden="true"><path d="m12 2.5 3 6.1 6.7 1-4.9 4.7 1.2 6.7-6-3.2L6 21l1.2-6.7-4.9-4.7 6.7-1Z"/></svg>';
// Small, layered pictograms follow the reference. Stable category IDs keep the
// correct illustration attached when the local editor reorders the menu.
const V48_HOME_ICON_PATHS = {
  1:'<rect x="3" y="7" width="26" height="21" rx="3" fill="#73aaff"/><path d="M6 7h20a3 3 0 0 1 3 3v3H3v-3a3 3 0 0 1 3-3Z" fill="#2866d5"/><rect x="7" y="20" width="8" height="2.5" rx="1" fill="#fff"/><rect x="7" y="24" width="16" height="1.5" rx=".75" fill="#a6cdff"/>',
  2:'<path d="m16 4 11 4v9c0 7-11 13-11 13S5 24 5 17V8Z" fill="#00bebd"/><path d="m11 16 3.5 3.5 6-6.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  3:'<rect x="3" y="7" width="25" height="21" rx="3" fill="#77acff"/><path d="M6 7h19a3 3 0 0 1 3 3v3H3v-3a3 3 0 0 1 3-3Z" fill="#2866d5"/><rect x="7" y="20" width="8" height="2.5" rx="1" fill="#fff"/><circle cx="26" cy="24" r="6.5" fill="#4937c8" stroke="#f2f3f5" stroke-width="1.5"/><path d="M26 21v6m-3-3h6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  4:'<path d="M8 3h12l7 7v19H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Z" fill="#cce2ff"/><path d="M20 3v7h7" fill="#78acff"/><path d="M10 13h6m-6 5h12m-12 5h12" stroke="#408bff" stroke-width="2.4" stroke-linecap="round"/>',
  5:'<path d="m7 9 15-6a2 2 0 0 1 2.6 1.2l2 5.8" fill="#8450ff"/><rect x="3" y="9" width="26" height="20" rx="4" fill="#cbb6ff"/><path d="M22 16h8v9h-8a4.5 4.5 0 0 1 0-9Z" fill="#8552f6"/><circle cx="23" cy="20.5" r="1.5" fill="#f4edff"/><path d="M7 24h8" stroke="#9d78f2" stroke-width="2" stroke-linecap="round"/>',
  6:'<circle cx="19" cy="10" r="8" fill="#ffca54"/><path d="m14.5 6 2 8 2.5-6 2.5 6 2-8m-10 4h12" fill="none" stroke="#ee9b25" stroke-width="1.35" stroke-linejoin="round"/><path d="M4 22h6v10H4z" fill="#ffbc7b"/><path d="m10 24 5-3h6c3 0 3 4 0 4h-5l8-1 5-4c2-1 4 1 2 3l-7 7H10Z" fill="#ffd29d"/><path d="M1 23h4v9H1z" fill="#ffe4ba"/>',
  7:'<rect x="3" y="7" width="26" height="23" rx="3" fill="#ffc4f4"/><path d="M6 7h20a3 3 0 0 1 3 3v5H3v-5a3 3 0 0 1 3-3Z" fill="#fa6de3"/><path d="M10 4v7m12-7v7" stroke="#f764df" stroke-width="3" stroke-linecap="round"/><rect x="7" y="19" width="5" height="5" rx="1" fill="#f66cde"/><path d="M22 22h7v10l-3.5-2-3.5 2Z" fill="#f56fe4"/>',
  8:'<rect x="3" y="4" width="26" height="20" rx="3" fill="#71a9ff"/><path d="M13 24h6v4h-6zM10 28h12v2H10z" fill="#286bd5"/><path d="M9 14v5m7-9v9m7-7v7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
  9:'<path d="M7 4h20a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H11l-8 5V8a4 4 0 0 1 4-4Z" fill="#00c1bd"/><path d="M17 9v7" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="17" cy="20" r="1.4" fill="#fff"/>'
};
function v48HomeCategoryIcon(id){
  return `<svg viewBox="0 0 34 34" fill="none" aria-hidden="true" focusable="false">${V48_HOME_ICON_PATHS[id]||V48_HOME_ICON_PATHS[1]}</svg>`;
}
function v48SelfServiceIcon(index){
  if(index===0)return '<svg viewBox="0 0 34 34" fill="none" aria-hidden="true" focusable="false"><rect x="4" y="4" width="25" height="25" rx="5" fill="#8184ff"/><path d="M9 13h15M10 21h5" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="26" cy="26" r="7" fill="#6059de" stroke="#fff" stroke-width="2"/><path d="m24 24 4 4m0-4-4 4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>';
  return v48HomeCategoryIcon([1,4,4,2,3,1,5,8,8][index]||9);
}
let v48RecentMenus = [
  {title:'계좌비밀번호 재설정', action:'acctpw'},
  {title:'금융상품(ISA/연금/펀드) 문의', action:'v48:item:financial-products'},
  {title:'서류발급', action:'v48:category:4'}
];

function v48AddRecent(title, action){
  if(!title || !action)return;
  v48RecentMenus=[{title,action},...v48RecentMenus.filter(item=>item.action!==action)].slice(0,6);
}
function v48FindItem(id){
  return [...V48Menu.categories.flatMap(category=>category.items),...V48Menu.legacyItems,...V48Menu.otherDocuments].find(item=>item.id===id);
}
function v48ActionTitle(action,fallback){
  const [,kind,...parts]=String(action).split(':'),id=parts.join(':');
  if(kind==='item')return v48FindItem(id)?.title||fallback;
  if(kind==='category')return V48Menu.categories.find(category=>String(category.id)===id)?.title||fallback;
  if(kind==='self')return V48Menu.selfServices.find(item=>item.id===id)?.title||fallback;
  return fallback;
}
function v48MenuDescription(item){
  if(item.description)return item.description;
  const legacy=V48_LEGACY_MYINFO[item.id] || V48_LEGACY_UNTACT[item.id];
  if(legacy)return V47SelfService.getSubMenuDescription('v48',legacy);
  const descriptions={
    '1-2':'계좌·카드·OTP 사고를 신고하고 해지 방법을 확인해요',
    '1-3':'계좌번호를 조회하고 비밀번호 재설정 방법을 확인해요',
    '1-6':'간편인증과 공동인증서 발급 방법을 안내해요',
    '1-7':'등록한 OTP와 오류 횟수를 확인해요',
    '3-1':'은행과 증권계좌 사이의 이체 방법을 안내해요',
    '3-2':'거래 목적을 확인하고 계좌 이용 제한을 해제해요',
    '3-4':'국내주식 출고 신청내역과 처리 상태를 확인해요',
    '4-1':'금일 반대매매 현황과 유의사항을 확인해요',
    '4-2':'신용·대출 약정과 신청 방법을 안내해요',
    '4-3':'이용 중인 신용·대출 잔고를 확인해요',
    '4-4':'연장할 잔고를 선택하고 만기일을 연장해요',
    '4-5':'상환할 잔고를 선택하고 현금상환을 신청해요',
    '5-1':'유상청약과 예약청약 신청·취소 내역을 확인해요',
    '5-2':'공모주 청약 신청·취소와 경쟁률을 확인해요',
    '5-3':'주주 반대의사와 매수청구 내역을 확인해요',
    '5-4':'보유 주식의 권리정보를 확인해요',
    '6-1':'ARS 주문 서비스를 신청하거나 해지해요',
    '6-2':'ARS 주문비밀번호를 등록하거나 변경해요',
    '6-3':'퀵넘버플러스 등록내역을 확인하고 관리해요',
    '6-4':'PC 영웅문 화면 이용 방법을 안내해요',
    '6-5':'모바일 영웅문 화면 이용 방법을 안내해요',
    '7-1':'현재가·지수정보·주식시황을 확인해요',
    '7-2':'국내주식 주문 방법을 안내해요',
    '7-3':'체결·미체결·예약주문 내역을 확인해요',
    '7-4':'예수금·주문가능금액·주식잔고를 확인해요',
    '7-5':'KRX와 NXT의 거래 차이점을 안내해요',
    '7-6':'K-OTC 종목시세와 주문 방법을 안내해요',
    '7-7':'거래신청 여부·필요요건·기본예탁금을 확인해요',
    '7-8':'해외지수·환전·배당·권리일정을 안내해요',
    '7-9':'해외주식 거래시간과 휴장일을 확인해요',
    '8-1':'IRP·연금·ISA 계좌개설과 가입서류를 안내해요',
    '8-2':'펀드·ELS/ELB·채권 등 금융상품을 안내해요',
    '8-3':'금융상품계좌 평가금액·예수금·거래내역을 확인해요',
    '9-1':'국내선물옵션 거래와 이용 방법을 안내해요',
    '9-2':'해외선물옵션 거래와 이용 방법을 안내해요',
    '9-3':'국내 CFD 거래와 이용 방법을 안내해요',
    '9-4':'해외 CFD와 상품선물옵션 이용 방법을 안내해요'
  };
  return descriptions[item.id] || '이용할 업무와 연결 방법을 확인해요';
}
function v48SelfServiceItems(){
  return V48Menu.selfServices.map((item,index)=>({
    t:item.title,sub:V48_SELF_COPY[index],
    act:`data-v48self="${item.id}"${V48_LEGACY_SELF[item.id]?` data-${V48_LEGACY_SELF[item.id]}`:''}`
  }));
}
function renderV48Header(){
  const warning='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 3.8a2 2 0 0 1 3.4 0l9 15.1A2 2 0 0 1 21 22H3a2 2 0 0 1-1.7-3.1Z" fill="#ff3e48"/><path d="M12 8v6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="18" r="1.2" fill="#fff"/></svg>';
  const home=s1state.page==='home';
  const status=`<button type="button" class="v48-center-status v48-header-pill" data-v48-congestion aria-label="고객센터 혼잡도: 보통, 스킬별 상세 보기"><span class="v48-center-icon" aria-hidden="true">${I.headset}</span><b>보통</b></button>`;
  return `<div class="v48-brand"><button type="button" class="toss-logo v48-home-logo" data-v48-home aria-label="키움증권 홈으로 이동"><img src="assets/kiwoom-symbol-v48.svg" alt=""></button>${home?status:''}</div>
    <div class="th-right">
      <button type="button" class="acc-report v48-header-pill" data-mediasheet="accident">${warning}<span>금융사기</span></button>
      ${home?'':status}
      <button type="button" class="bigfont-switch v48-header-pill ${bigFont?'on':''}" data-bigfont aria-pressed="${bigFont?'true':'false'}" aria-label="큰글씨">${home?'<span class="v48-font-dot" aria-hidden="true"></span>':''}<span class="bfs-label">큰글씨</span></button>
      <button type="button" class="v48-header-menu" data-menu aria-label="전체메뉴 열기">${I.menu}${home?'<span class="v48-menu-caption" aria-hidden="true">메뉴</span>':''}</button>
    </div>`;
}
function v48Home(){
  const services=v48SelfServiceItems().map((item,index)=>`<li><button type="button" class="v48-service-item" ${item.act}><span class="v48-service-art" aria-hidden="true">${v48SelfServiceIcon(index)}</span><span class="v48-service-copy"><b>${v47Esc(item.t)}</b><small>${v47Esc(item.sub)}</small></span><span class="v48-service-arrow" aria-hidden="true">${I.chev}</span></button></li>`).join('');
  const recent=v48RecentMenus.map(item=>`<button type="button" class="v48-recent-item" data-v47recent data-v47searchgo="${v47Esc(item.action)}" data-v47title="${v47Esc(v48ActionTitle(item.action,item.title))}"><b>${v47Esc(v48ActionTitle(item.action,item.title))}</b></button>`).join('');
  const grid=V48Menu.categories.map((category,index)=>{
    const expanded=s1state.v48HomeCategory===category.id;
    const title=v47Esc(category.title).replace('/','/<wbr>');
    const button=`<button type="button" class="v47-cell" id="v48HomeCategory${category.id}" data-v48cat="${category.id}" data-v48-expand aria-expanded="${expanded}" aria-controls="v48HomePanel${category.id}"><span class="v48-category-art" aria-hidden="true">${v48HomeCategoryIcon(category.id)}</span><span class="v47-cell-nm" data-content-label="category:${category.id}:title">${title}</span>${category.subtitle?`<span class="v47-cell-sub" data-content-label="category:${category.id}:subtitle">${v47Esc(category.subtitle)}</span>`:''}<span class="v48-category-chevron" aria-hidden="true">${I.chev}</span></button>`;
    // Panels span the grid immediately after their category's three-button row.
    if((index+1)%3!==0)return button;
    return button+V48Menu.categories.slice(index-2,index+1).map(group=>{
      const rows=group.items.map(item=>`<li><button type="button" class="v48-inline-menu-link" data-v48item="${item.id}"><span data-content-label="item:${item.id}:title">${v47Esc(item.title)}</span><span aria-hidden="true">${I.chev}</span></button></li>`).join('');
      return `<section class="v48-inline-menu" id="v48HomePanel${group.id}" aria-labelledby="v48HomeCategory${group.id}"${s1state.v48HomeCategory===group.id?'':' hidden'}><p class="v48-category-description">${v47Esc(V48_CATEGORY_COPY[group.id])}</p><ul>${rows}</ul></section>`;
    }).join('');
  }).join('');
  const announcement='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h5l11-4v14L9 14H4V8ZM9 14l2 7H7l-2-7M9 8v6"/></svg>';
  return `<div class="home-wrap toss-home v48-home">
    <div class="v48-hero">
      <button type="button" class="v48-notice" data-v48-notice aria-label="공모주 청약 일정 안내">${announcement}<span>공모주 청약 일정 안내</span><span class="v48-notice-arrow" aria-hidden="true">${I.chev}</span></button>
      <h1 class="v48-title">안녕하세요,<br><strong>쉽고 빠르게 검색해보세요</strong></h1>
    </div>
    <div class="v48-home-search"><button type="button" class="v48-home-search-box" data-v48-search-open aria-label="업무 검색 열기"><span class="v48-home-search-placeholder">검색어를 입력하세요.</span><span class="v48-search-symbol" aria-hidden="true">${I.search}</span></button></div>
    <section class="v48-recent" aria-labelledby="v48RecentTitle"><h2 id="v48RecentTitle">${V48_RECENT_STAR}최근 본 메뉴</h2><div class="v48-recent-list" tabindex="0" role="group" aria-label="최근 본 메뉴 목록, 좌우로 이동">${recent}</div></section>
    <div class="v48-home-content">
      <section class="v48-all" aria-label="전체메뉴"><div class="v47-grid">${grid}</div></section>
      <section class="v48-self-services" aria-labelledby="v48SelfTitle"><h2 id="v48SelfTitle">직접 해결할 수 있어요</h2><ul>${services}</ul></section>
    </div>
  </div>`;
}

function v48ToggleHomeCategory(button){
  const grid=button.closest('.v47-grid');
  const view=button.closest('.view');
  const id=Number(button.dataset.v48cat);
  if(!grid||!view)return;
  const beforeTop=button.getBoundingClientRect().top;
  const expanded=s1state.v48HomeCategory!==id;
  s1state.v48HomeCategory=expanded?id:null;
  grid.querySelectorAll('[data-v48-expand]').forEach(item=>{
    item.setAttribute('aria-expanded',String(Number(item.dataset.v48cat)===s1state.v48HomeCategory));
  });
  grid.querySelectorAll('.v48-inline-menu').forEach(panel=>{
    panel.hidden=panel.id!==`v48HomePanel${s1state.v48HomeCategory}`;
  });
  // Keep the selected row in view when an earlier row's panel closes.
  view.scrollTop+=button.getBoundingClientRect().top-beforeTop;
  if(expanded){
    const top=view.getBoundingClientRect().top+(view.querySelector('.v48-home-search')?.offsetHeight||0)+12;
    const panel=grid.querySelector(`#v48HomePanel${id}`);
    if(button.getBoundingClientRect().top<top||panel.getBoundingClientRect().bottom>view.getBoundingClientRect().bottom){
      view.scrollTop+=button.getBoundingClientRect().top-top;
    }
  }
}

function v48BindRecentScroll(root){
  root.querySelectorAll('.v48-recent-list').forEach(v48BindChipScroll);
}
function v48BindChipScroll(list){
  if(!list||list.dataset.v48ScrollBound)return;
  list.dataset.v48ScrollBound='true';
  let pointer=null,dragged=false;
  // Touch and trackpads use native scrolling; mouse users can drag the chips.
  list.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='mouse'||event.button!==0)return;
    dragged=false;
    if(list.scrollWidth<=list.clientWidth)return;
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY,left:list.scrollLeft};
  });
  list.addEventListener('pointermove',event=>{
    if(!pointer||event.pointerId!==pointer.id)return;
    const dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
    if(!dragged){
      if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>5){pointer=null;return;}
      if(Math.abs(dx)<5)return;
      dragged=true;
      list.setPointerCapture(event.pointerId);
      list.classList.add('is-dragging');
    }
    event.preventDefault();
    list.scrollLeft=pointer.left-dx;
  });
  const endDrag=event=>{
    if(!pointer||event.pointerId!==pointer.id)return;
    pointer=null;
    list.classList.remove('is-dragging');
    if(list.hasPointerCapture(event.pointerId))list.releasePointerCapture(event.pointerId);
  };
  list.addEventListener('pointerup',endDrag);
  list.addEventListener('pointercancel',endDrag);
  list.addEventListener('lostpointercapture',endDrag);
  list.addEventListener('pointerleave',()=>{if(!dragged)pointer=null;});
  list.addEventListener('click',event=>{
    if(dragged&&event.detail>0){event.preventDefault();event.stopPropagation();dragged=false;}
  },true);
  // A standard mouse wheel also reveals further chips without moving the page.
  list.addEventListener('wheel',event=>{
    if(event.ctrlKey||event.shiftKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?list.clientWidth:1);
    const max=list.scrollWidth-list.clientWidth;
    if((delta>0&&list.scrollLeft<max-1)||(delta<0&&list.scrollLeft>1)){
      event.preventDefault();list.scrollLeft+=delta;
    }
  },{passive:false});
  list.addEventListener('keydown',event=>{
    if(event.target!==list||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    list.scrollLeft+=(event.key==='ArrowRight'?1:-1)*Math.max(120,list.clientWidth*.75);
  });
}

function v48MenuRow(item){
  return `<button type="button" class="v47-pwreset-choice v47-submenu-choice" data-v48item="${item.id}"><span><b data-content-label="item:${item.id}:title">${v47Esc(item.title)}</b><small>${v47Esc(v48MenuDescription(item))}</small></span><span class="v47-pwreset-chev" aria-hidden="true">${I.chev}</span></button>`;
}
const V48_ALL_MENU_POPULAR=[
    {title:'계좌비밀번호 재설정',action:'acctpw'},
    {title:'금융상품(ISA/연금/펀드) 문의',action:'v48:item:financial-products'},
    {title:'출금계좌등록',action:'v48:item:2-3'},
    {title:'공모주청약',action:'v48:item:5-2'}
];
function v48MenuNameMatch(title,query){
  const text=String(query||'').replace(/\s+/g,'');if(!text)return null;
  const pattern=Array.from(text,char=>char.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('\\s*');
  return String(title).match(new RegExp(pattern,'i'));
}
function v48FilterAllMenu(query){
  const catalog=V48Menu.categories.flatMap(category=>category.items.map(item=>({title:item.title,category:category.title,action:`v48:item:${item.id}`})));
  const popular=V48_ALL_MENU_POPULAR.map(item=>({...item,title:v48ActionTitle(item.action,item.title),category:catalog.find(menu=>menu.action===item.action)?.category||'인기메뉴'}));
  const seen=new Set();
  return [...popular,...catalog].filter(item=>!seen.has(item.action)&&seen.add(item.action)&&v48MenuNameMatch(item.title,query));
}
function v48HighlightMenuName(title,query){
  const match=v48MenuNameMatch(title,query);if(!match)return v47Esc(title);
  return v47Esc(title.slice(0,match.index))+'<mark>'+v47Esc(match[0])+'</mark>'+v47Esc(title.slice(match.index+match[0].length));
}
function v48AllMenuResultRows(items,query){
  return items.map(item=>`<li><button type="button" class="v48-menu-result" data-v47searchgo="${v47Esc(item.action)}" data-v47title="${v47Esc(item.title)}"><span><small>${v47Esc(item.category)}</small><strong>${v48HighlightMenuName(item.title,query)}</strong></span><span aria-hidden="true">${I.chev}</span></button></li>`).join('');
}
function renderV48AllMenuSearch(){
  return `<form class="v48-menu-search" role="search" aria-label="전체메뉴 이름 검색"><input type="search" data-v48-menu-search aria-label="메뉴명 검색" aria-controls="v48MenuResults" placeholder="메뉴명을 입력하세요." maxlength="60" autocomplete="off" enterkeyhint="search"><button type="button" data-v48-menu-clear aria-label="검색어 지우기" hidden>${I.x}</button><button type="submit" aria-label="메뉴 검색">${I.search}</button></form>`;
}
function v48UpdateAllMenuSearch(root){
  const input=root.querySelector('[data-v48-menu-search]');if(!input)return;
  const query=input.value.trim(),items=v48FilterAllMenu(query);
  root.querySelector('[data-v48-menu-default]').hidden=!!query;
  root.querySelector('#v48MenuResults').hidden=!query;
  root.querySelector('[data-v48-menu-clear]').hidden=!input.value;
  root.querySelector('[data-v48-menu-count]').textContent=query?`검색결과 ${items.length}개`:'';
  root.querySelector('[data-v48-menu-results-list]').innerHTML=query?v48AllMenuResultRows(items,query):'';
  root.querySelector('[data-v48-menu-empty]').hidden=!query||items.length>0;
  root.querySelector('.menu-scroll').scrollTop=0;
}
function v48MountAllMenuSearch(root){
  const input=root.querySelector('[data-v48-menu-search]'),form=input?.closest('form');
  if(!form||form.dataset.v48SearchMounted)return;
  form.dataset.v48SearchMounted='true';
  const update=()=>v48UpdateAllMenuSearch(root);
  const clear=()=>{input.value='';update();input.focus({preventScroll:true});};
  input.addEventListener('input',event=>{if(!event.isComposing)update();});
  input.addEventListener('compositionend',update);
  input.addEventListener('search',update);
  input.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&input.value){event.preventDefault();event.stopPropagation();clear();}
    if(event.key==='Enter'&&(event.isComposing||event.keyCode===229))event.preventDefault();
  });
  form.addEventListener('submit',event=>{event.preventDefault();update();input.blur();});
  root.addEventListener('click',event=>{if(event.target.closest('[data-v48-menu-clear],[data-v48-menu-reset]'))clear();});
}
function renderV48AllMenu(){
  const popular=V48_ALL_MENU_POPULAR.map(item=>`<button type="button" data-v47searchgo="${item.action}" data-v47title="${v47Esc(v48ActionTitle(item.action,item.title))}">${v47Esc(v48ActionTitle(item.action,item.title))}</button>`).join('');
  const flame='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2c1 5-3 6-3 9-2-1-2-3-2-4-3 3-5 6-4 10a8 8 0 0 0 16-1c0-5-4-8-7-14Zm-1 18c-4 0-3-5 0-7-1 3 3 3 3 5 0 1-1 2-3 2Z"/></svg>';
  const icons=[
    '<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    '<path d="m12 2 9 4v6c0 5-5 8-9 10C8 20 3 17 3 12V6Z" fill="currentColor" stroke="none"/><path d="m8 12 3 3 5-6" stroke="#fff"/>',
    '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M5 17v-1a3 3 0 0 1 6 0v1m3-8h4m-4 4h4"/>',
    '<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8"/>',
    '<path d="m3 7 9-5 9 5H3Zm0 14h18M5 10v8m7-8v8m7-8v8"/>',
    '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18m-6 5h3"/>',
    '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4m8-4v4M4 11h16m-12 5 3 2 5-4"/>',
    '<path d="M4 3v18h17M7 15l5-5 4 3 5-7m-5 0h5v5"/>',
    '<path d="M3 13v-2a9 9 0 0 1 18 0v6a4 4 0 0 1-4 4h-3"/><rect x="2" y="11" width="4" height="7" rx="2"/><rect x="18" y="11" width="4" height="7" rx="2"/>'
  ];
  const sections=V48Menu.categories.map((category,index)=>{
    const icon=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[category.id-1]}</svg>`;
    const subtitle=category.subtitle;
    const rows=category.items.map(item=>`<li><button type="button" class="v48-menu-link" data-v48item="${item.id}"><span data-content-label="item:${item.id}:title">${v47Esc(item.title)}</span><span aria-hidden="true">${I.chev}</span></button></li>`).join('');
    return `<section class="v48-menu-group" aria-labelledby="v48MenuGroup${category.id}"><h2 id="v48MenuGroup${category.id}"><span class="v48-menu-icon v48-menu-icon-${category.id}">${icon}</span><span data-content-label="category:${category.id}:title">${v47Esc(category.title)}</span>${subtitle?`<small data-content-label="category:${category.id}:subtitle">${v47Esc(subtitle)}</small>`:''}</h2><ul>${rows}</ul></section>`;
  }).join('');
  return `<div class="v48-menu-catalog"><div data-v48-menu-default><section class="v48-menu-popular" aria-labelledby="v48PopularTitle"><h2 id="v48PopularTitle">${flame}인기메뉴</h2><div class="v48-menu-chips" tabindex="0" role="group" aria-label="인기메뉴 목록, 좌우로 이동">${popular}</div></section><div class="v48-menu-groups">${sections}</div></div><section id="v48MenuResults" aria-label="메뉴명 검색결과" hidden><p class="v48-menu-count" data-v48-menu-count role="status" aria-live="polite" aria-atomic="true"></p><ul class="v48-menu-results" data-v48-menu-results-list aria-label="검색된 메뉴"></ul><div class="v48-menu-empty" data-v48-menu-empty hidden><h2>일치하는 메뉴가 없어요</h2><p>메뉴명을 짧게 입력하거나<br>다른 단어로 검색해 주세요.</p><button type="button" data-v48-menu-reset>전체메뉴 보기</button></div></section></div>`;
}
function v48Page(title, description, body){
  return `<div class="home-wrap toss-home v48-catalog-page"><div class="toss-stick"><div class="toss-top"><button type="button" class="toss-back" data-s1back aria-label="이전 화면">${I.chev}</button><div class="head-spacer"></div></div><div class="toss-dhead"><h1 class="td-title">${v47Esc(title)}</h1><p class="td-desc">${v47Esc(description).replace(/\n/g,'<br>')}</p></div></div>${body}</div>`;
}
function renderV48Notice(){
  return `<div class="home-wrap toss-home v48-notice-page">
    <header class="v48-notice-header"><button type="button" data-s1back aria-label="이전 화면">${I.back}</button><h1>공지사항</h1></header>
    <article class="v48-notice-body" aria-label="공지사항 상세 내용">
      <h2 class="v48-notice-title">공모주 청약 일정 안내</h2>
      <p class="v48-notice-intro">공모주 청약을 준비하시는 고객님께 안내드립니다.</p>
      <section><h3>청약 일정 확인</h3><p>공모주 청약 메뉴에서 관심 종목의 청약 시작일·마감일과 배정·환불 일정을 확인해 주세요.</p>
        <button type="button" class="v48-notice-action" data-v48item="5-2">공모주 청약 신청하기<span aria-hidden="true">${I.chev}</span></button>
      </section>
      <section><h3>청약 전 확인할 내용</h3><ul><li>청약할 종목과 청약 기간</li><li>종목별 신청 조건과 청약 가능 수량</li><li>청약증거금과 계좌 잔액</li></ul></section>
      <section><h3>신청 내역 확인</h3><p>신청 후에는 공모주 청약 메뉴에서 신청 내역과 처리 결과를 확인해 주세요.</p>
        <button type="button" class="v48-notice-action" data-s1go="result" data-rk="ipohist" data-fk="공모주 청약 신청내역 조회">공모주 청약 신청내역 조회하기<span aria-hidden="true">${I.chev}</span></button>
      </section>
    </article></div>`;
}
function renderV48Congestion(){
  // Demo statuses follow the existing consultation skill order. No live queue feed.
  const statuses=['normal','normal','busy','busy','normal','free','busy','normal','free'];
  const labels={free:'여유',normal:'보통',busy:'혼잡'};
  const badge=status=>`<span class="v48-skill-status v48-skill-${status}"><i aria-hidden="true"></i>${labels[status]}</span>`;
  const rows=FAV_MENU.map((skill,index)=>`<li class="v48-skill-row"><div><h3>${v47Esc(stripNum(skill.t))}</h3><p>${v47Esc(skill.subs.map(item=>item.t).join(' · '))}</p></div>${badge(statuses[index]||'normal')}</li>`).join('');
  return v48Page('고객센터 혼잡도','상담 분야별 혼잡도를 확인해보세요.\n상담 대기 상황에 따라 혼잡도가 달라질 수 있어요.',`<section class="v48-congestion-detail" aria-label="상담 분야별 혼잡도"><ul class="v48-skill-list">${rows}</ul></section>`);
}
function renderV48Category(){
  const category=V48Menu.categories.find(item=>item.id===s1state.v48Category);
  if(!category)return '';
  return v48Page(category.title,category.subtitle,`<div class="v47-pwreset-list v47-submenu-list">${category.items.map(v48MenuRow).join('')}</div>`);
}
function v48OpenCategory(id){
  const category=V48Menu.categories.find(item=>item.id===Number(id));
  if(!category)return;
  closeMenuDrawer();v48AddRecent(category.title,`v48:category:${category.id}`);
  s1nav({page:'v48category',v48Category:category.id});
}
function v48OpenMenuItem(id){
  const item=v48FindItem(id);if(!item)return;
  closeMenuDrawer();v48AddRecent(item.title,`v48:item:${id}`);
  if(id==='3-2'){v48OpenPurpose();return;}
  if(item.document){v48OpenDocument(id);return;}
  if(V48_LEGACY_MYINFO[id]){startV47MyInfo(V48_LEGACY_MYINFO[id]);return;}
  if(V48_LEGACY_UNTACT[id]){startV47Untact(V48_LEGACY_UNTACT[id]);return;}
  if(id==='linked-bank'){s1nav({page:'result',resultKey:'myacct',title:item.title,noHome:true});return;}
  if(id==='6-1'){
    openMethodSheet({...PWMGMT_VOICE_SHEET,title:item.title,methods:PWMGMT_VOICE_SHEET.methods.filter(method=>['pwmv2','pwmv3'].includes(method.kind))});return;
  }
  if(V48_MEDIA_ROUTES[id]){openMethodSheet(MEDIA_SHEETS[V48_MEDIA_ROUTES[id]]);return;}
  s1nav({page:'v48menu',v48MenuId:id});
}
function v48OpenPurpose(){
  if(!isV48()||v48Require({kind:'purpose',title:'금융거래목적확인서'}))return;
  s1nav({page:'result',resultKey:'purposestatus',title:'금융거래목적확인서',noHome:true,v48PurposeResult:'eligible',v48Purpose:null});
}
function v48DocumentOptions(){
  const category=V48Menu.categories.find(item=>item.id===4);
  return category.items.flatMap(item=>item.children?item.children.map(v48FindItem):[item]).map(item=>{
    const existing=V47Untact.DATA.documents.find(doc=>doc.name===item.document);
    return {name:item.document,mode:item.documentMode||existing.mode,desc:existing?.desc||item.description};
  });
}
function v48OpenDocument(id){
  const item=v48FindItem(id);if(!item?.document)return;
  if(v48Require({kind:'document',id,title:item.title}))return;
  const documents=v48DocumentOptions();
  let state=V47Untact.createState('서류신청',{skipAuthentication:true,documents});
  state.account=v48Session.accountId;
  state=V47Untact.transition(state,{type:'SELECT_DOCUMENT',value:item.document}).state;
  state.v48DirectDocument=true;
  s1state.v47Untact=state;s1state.v47UntactAgree=false;
  s1nav({page:'v47untact',title:item.title,noHome:true});
}
function v48OpenSelfService(id){
  const item=V48Menu.selfServices.find(item=>item.id===id);if(!item)return;
  closeMenuDrawer();v48AddRecent(item.title,`v48:self:${id}`);
  if(id==='self-4'){s1nav({page:'pwresetchoice',title:'비밀번호 재설정',noHome:true});return;}
  if(V48_LEGACY_SELF[id]){
    s1state.authNext={go:'iodcheck',...(id==='self-2'?{cert:true}:id==='self-3'?{isa:true}:id==='self-5'?{untactStatus:true}:{})};
    s1state.iodAcctNo='';
    if(sessionAuthed){gotoAuthNext();return;}
    s1nav({page:'authstep',authMethod:'account',title:'계좌 인증',acctPw:'',otpSent:false,fromFav:false,noBack:false,noHome:true});return;
  }
  if(id==='self-8'){v48OpenMenuItem('7-7');return;}
  s1nav({page:'v48menu',v48MenuId:id});
}

// Grouped services link to their original detail pages and existing hand-offs.
function renderV48MenuGuide(){
  const id=s1state.v48MenuId;
  const item=v48FindItem(id) || V48Menu.selfServices.find(item=>item.id===id);
  if(!item)return '';
  let description=v48MenuDescription(item), body='';
  if(id==='doc-other'){
    const rows=V48Menu.otherDocuments.map(doc=>`<li><button type="button" class="v48-inline-menu-link" data-v48item="${doc.id}"><span>${v47Esc(doc.title)}</span><span aria-hidden="true">${I.chev}</span></button></li>`).join('');
    body=`<ul class="v48-other-documents" aria-label="기타서류 목록">${rows}</ul><div class="v48-document-support"><p>찾는 서류가 없으신가요?</p><button type="button" data-staffconnect="기타서류" data-v47title="상담원연결">상담원연결</button></div>`;
  }else if(item.children){
    body=`<div class="v47-pwreset-list v47-submenu-list">${item.children.map(child=>v48MenuRow(v48FindItem(child))).join('')}</div>`;
  }else if(id==='1-3' || id==='self-6'){
    const choices=id==='1-3'?[
      ['증권계좌번호 확인','data-v47sub="증권계좌번호확인"'],
      ['계좌비밀번호 재설정 방법','data-v47sub="계좌비밀번호 재설정"']
    ]:[
      ['증권계좌번호 조회','data-v47sub="증권계좌번호확인"'],
      ['증권계좌 비밀번호','data-v47sub="계좌비밀번호 재설정"'],
      ['ID 조회 / IDPW 재설정','data-v47sub="ID조회/PW초기화"'],
      ['장기미사용 ID 조회 / 제한해지','data-v47sub="장기미사용ID 제한 해지"'],
      ['장기미사용계좌 / 금융거래목적확인서','data-mediasheet="docpurpose"'],
      ['고객확인등록(CDD/EDD)','data-mediasheet="dockyc"'],
      ['인증서 발급방법','data-mediasheet="authid"'],
      ['은행계좌번호 조회','data-myacctsheet']
    ];
    description=id==='self-6'?V48_SELF_COPY[5]:description;
    body=`<div class="v47-pwreset-list v47-submenu-list">${choices.map(([label,attr])=>`<button type="button" class="v47-pwreset-choice" ${attr}><span><b>${label}</b></span><span class="v47-pwreset-chev" aria-hidden="true">${I.chev}</span></button>`).join('')}</div>`;
  }else{
    const topics=id==='self-7'?['타사 → 키움증권 착오송금','키움증권 → 타사 착오송금','키움증권 계좌 간 착오송금','수취인 자금반환 신청']
      :id==='self-8-futures'?['파생상품 적격투자자 신청내역 조회','적격투자자 확인 서류접수','신청내역이 없는 경우 신청방법 안내']
      :item.topics?.length?item.topics:['이용 방법 및 자주 묻는 질문'];
    description=id==='self-7'?V48_SELF_COPY[6]:id==='self-8-futures'?V48_SELF_COPY[8]:description;
    const channels=item.channels || ['agent'];
    body=`<div class="v48-guide-body"><h2>이용할 수 있는 업무</h2><ul class="v48-guide-topics">${topics.map(topic=>`<li>${v47Esc(topic)}</li>`).join('')}</ul><div class="v48-guide-actions">${channels.includes('app')?`<button type="button" data-v48-app="${id}">영웅문S#에서 이용하기</button>`:''}${channels.includes('ars')?`<button type="button" data-v47searchgo="voice" data-v47title="${v47Esc(item.title)} 음성 ARS">음성 ARS로 이용하기</button>`:''}<button type="button" data-v48-consult="${v47Esc(item.title)}">상담 방법 보기</button></div></div>`;
  }
  return v48Page(item.title,description,body);
}

function v48SearchItems(query){
  const normalize=value=>String(value||'').toLowerCase().replace(/\s+/g,'');
  const q=normalize(query);if(!q)return [];
  const featured=[
    {title:'ID 비밀번호 재설정',desc:'ID를 확인하고 비밀번호를 재설정해요',keys:'비밀번호 패스워드 pw id 아이디 로그인',action:'idpw'},
    {title:'계좌 비밀번호 변경',desc:'증권계좌 비밀번호 재설정 방법을 안내해요',keys:'비밀번호 패스워드 pw 계좌 증권계좌',action:'acctpw'},
    {title:'간편인증/공동인증서',desc:'공동인증서 비밀번호와 발급 방법을 확인해요',keys:'비밀번호 인증서 공동인증서',action:'v48:item:1-6'},
    {title:'서류발급',desc:'필요한 증명서와 서류를 신청해요',keys:'서류 증명서 발급 신청 제출',action:'v48:category:4'},
    {title:'권리/청약',desc:'공모주·유상청약 신청과 권리업무 메뉴를 확인해요',keys:'공모주 청약 유상청약 권리',action:'v48:category:7'}
  ].map(item=>({...item,title:v48ActionTitle(item.action,item.title)})).filter(item=>normalize(item.title+item.desc+item.keys).includes(q)).map(item=>({...item,badge:'메뉴 보기'}));
  const menus=V48Menu.categories.flatMap(category=>category.items.flatMap(item=>[item,...(item.children||[]).map(v48FindItem)]).map(item=>({title:item.title,desc:v48MenuDescription(item),badge:category.title,action:`v48:item:${item.id}`}))).filter(item=>normalize(item.title+item.desc).includes(q));
  const self=V48Menu.selfServices.map((item,index)=>({title:item.title,desc:V48_SELF_COPY[index],badge:'셀프서비스',action:`v48:self:${item.id}`})).filter(item=>normalize(item.title+item.desc).includes(q));
  const categories=V48Menu.categories.filter(item=>normalize(item.title+item.subtitle).includes(q)).map(item=>({title:item.title,desc:item.subtitle,badge:'전체메뉴',action:`v48:category:${item.id}`}));
  const seen=new Set();
  return [...featured,...menus,...self,...categories].filter(item=>!seen.has(item.action)&&seen.add(item.action)).slice(0,5);
}
function handleV48MenuClick(target){
  if(!isV48())return false;
  if(target.closest('[data-mediasheet="docpurpose"]')){v48OpenPurpose();return true;}
  if(target.closest('[data-v48-purpose-cycle]')){
    s1state.v48PurposeResult=s1state.v48PurposeResult==='none'?'eligible':'none';
    renderS1();document.querySelector('[data-v48-purpose-cycle]')?.focus({preventScroll:true});return true;
  }
  if(target.closest('[data-v48-purpose-register]')){
    if(s1state.page==='result'&&s1state.resultKey==='purposestatus'&&s1state.v48PurposeResult==='eligible')
      s1nav({page:'result',resultKey:'purpose',title:'금융거래목적확인서',noHome:true,v48Purpose:null});
    return true;
  }
  if(target.closest('[data-v48-home]')){v48GoHome();return true;}
  if(target.closest('[data-v48-notice]')){
    s1nav({page:'v48notice',title:'공지사항'});
    document.getElementById('s1view').scrollTop=0;return true;
  }
  if(target.closest('[data-v48-congestion]')){
    s1nav({page:'v48congestion',title:'고객센터 혼잡도'});return true;
  }
  const expand=target.closest('[data-v48-expand]');
  if(expand){v48ToggleHomeCategory(expand);return true;}
  const category=target.closest('[data-v48cat]');
  if(category){v48OpenCategory(category.dataset.v48cat);return true;}
  const item=target.closest('[data-v48item]');
  if(item){v48OpenMenuItem(item.dataset.v48item);return true;}
  const self=target.closest('[data-v48self]');
  if(self){v48OpenSelfService(self.dataset.v48self);return true;}
  const result=target.closest('[data-v47searchgo]');
  if(result?.dataset.v47searchgo.startsWith('v48:')){
    const [,kind,...parts]=result.dataset.v47searchgo.split(':'),id=parts.join(':');
    if(kind==='category')v48OpenCategory(id);
    else if(kind==='item')v48OpenMenuItem(id);
    else if(kind==='self')v48OpenSelfService(id);
    return true;
  }
  const app=target.closest('[data-v48-app]');
  if(app){
    const menu=v48FindItem(app.dataset.v48App);if(!menu)return true;
    const key=`v48menu:${menu.id}`;
    APP_LINK[key]={title:menu.title,popDesc:`<b>${v47Esc(menu.title)}</b><br>영웅문S# 연결 화면을 시연해요.`};
    openAppLink(key);return true;
  }
  const consult=target.closest('[data-v48-consult]');
  if(consult){openConsult(consult.dataset.v48Consult);return true;}
  return false;
}
