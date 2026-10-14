/* Ver 4.8 search and header navigation. Other versions keep their existing UI. */
const V48_SEARCH_HISTORY_KEY='kiwoom.v48.recent-searches';
const V48_SEARCH_BADGE_LIMIT=5;
let v48SearchText='';
let v48SearchSubmitted=false;
let v48SearchReturnScroll=0;
let v48SearchHistory=[];
try{
  const saved=JSON.parse(localStorage.getItem(V48_SEARCH_HISTORY_KEY)||'[]');
  if(Array.isArray(saved))v48SearchHistory=[...new Set(saved.filter(value=>typeof value==='string').map(value=>value.trim().slice(0,60)).filter(Boolean))].slice(0,6);
}catch(_){ /* The search remains available when storage is blocked or malformed. */ }

function v48SaveSearchHistory(){
  try{localStorage.setItem(V48_SEARCH_HISTORY_KEY,JSON.stringify(v48SearchHistory));}catch(_){}
}
function v48RecentSearches(){
  return `<div class="v48-search-section-head"><h2><span class="v48-history-icon" aria-hidden="true">${I.clock}</span>최근 검색어</h2>${v48SearchHistory.length?'<button type="button" data-v48-clear-history aria-label="최근 검색어 전체 삭제">전체 삭제</button>':''}</div>
    ${v48SearchHistory.length?`<div class="v48-search-chips" role="group" aria-label="최근 검색어 목록">${v48SearchHistory.slice(0,V48_SEARCH_BADGE_LIMIT).map(keyword=>`<span class="v48-search-keyword"><button type="button" data-v48-keyword="${v47Esc(keyword)}">${v47Esc(keyword)}</button><button type="button" data-v48-delete-keyword="${v47Esc(keyword)}" aria-label="${v47Esc(keyword)} 검색어 삭제"><span aria-hidden="true">${I.x}</span></button></span>`).join('')}</div>`:'<p class="v48-search-empty-history">검색한 단어가 여기에 표시돼요.</p>'}`;
}
function v48SearchRecentMenus(){
  return `<section class="v48-search-recent" aria-labelledby="v48SearchRecentTitle"><h2 id="v48SearchRecentTitle">${V48_RECENT_STAR}최근 본 메뉴</h2><div class="v48-menu-chips" role="group" aria-label="최근 본 메뉴 목록">${v48RecentMenus.slice(0,V48_SEARCH_BADGE_LIMIT).map(item=>`<button type="button" data-v47recent data-v47searchgo="${v47Esc(item.action)}" data-v47title="${v47Esc(item.title)}">${v47Esc(item.title)}</button>`).join('')}</div></section>`;
}
function renderV48Search(){
  const popular=[
    {title:'계좌비밀번호 재설정',action:'acctpw'},
    {title:'금융상품(ISA/연금/펀드) 문의',action:'v48:item:financial-products'},
    {title:'서류발급',action:'v48:category:4'},
    {title:'출금계좌등록',action:'v48:item:2-3'},
    {title:'주문/시세',action:'v48:category:8'},
    {title:'공모주청약',action:'v48:item:5-2'}
  ];
  const flame='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2c1 5-4 6-3 10 1-1 2-2 2-4 4 2 7 5 7 9a7 7 0 0 1-14 0c0-4 3-7 4-8-1 4 0 5 1 5-2-5 5-7 3-12Z"/></svg>';
  const bag='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12l9 3 9-3M12 12v5"/></svg>';
  const bars='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 21h18M4 21V12h3v9M10.5 21V4h3v17M17 21V9h3v12"/></svg>';
  return `<section class="v48-search-page" data-v47searchscope aria-label="업무 검색 화면">
    <header class="v48-search-top"><h1>검색</h1></header>
    <div class="v48-search-entry"><div class="v48-search-field" role="search" aria-label="업무 검색">
      <input type="search" data-v47search aria-label="검색할 업무" placeholder="검색어를 입력하세요." maxlength="60" autocomplete="off" enterkeyhint="search" value="${v47Esc(v48SearchText)}">
      <button type="button" data-v47searchbtn aria-label="검색">${I.search}</button>
    </div></div>
    <div class="v48-search-body">
      <section class="v48-search-history" data-v48-history aria-label="최근 검색어">${v48RecentSearches()}</section>
      ${v48SearchRecentMenus()}
      <div class="v47-search-results" data-v47searchresults aria-live="polite"></div>
      <div data-v48-search-suggestions>
        <section class="v48-search-popular v48-menu-popular" aria-labelledby="v48PopularTitle">
          <h2 id="v48PopularTitle">${flame}인기메뉴</h2>
          <div class="v48-menu-chips" role="group" aria-label="인기메뉴 목록">${popular.slice(0,V48_SEARCH_BADGE_LIMIT).map(item=>`<button type="button" data-v47searchgo="${item.action}" data-v47title="${v47Esc(item.title)}">${v47Esc(item.title)}</button>`).join('')}</div>
        </section>
        <section class="v48-search-chat" aria-labelledby="v48ChatTitle">
          <h2 id="v48ChatTitle"><span class="v48-chat-icon" aria-hidden="true">${I.chat}</span>챗봇 추천</h2>
          <div class="v48-chat-links">
            <button type="button" data-v48-ai="work"><span class="v48-chat-link-icon" aria-hidden="true">${bag}</span><span>AI업무</span><span class="v48-chat-link-arrow" aria-hidden="true">${I.chev}</span></button>
            <button type="button" data-v48-ai="invest"><span class="v48-chat-link-icon" aria-hidden="true">${bars}</span><span>AI투자</span><span class="v48-chat-link-arrow" aria-hidden="true">${I.chev}</span></button>
          </div>
        </section>
      </div>
    </div>
  </section>`;
}
function v48SearchChanged(input){
  const root=input.closest('.v48-search-page');if(!isV48()||!root)return;
  v48SearchText=input.value;v48SearchSubmitted=false;
  closeV47SearchResults(input);
  root.querySelector('[data-v48-search-suggestions]').hidden=false;
}
function v48SearchDidRun(root,remember){
  if(!isV48()||!root.matches('.v48-search-page'))return;
  const input=root.querySelector('[data-v47search]');
  v48SearchText=input.value.trim();v48SearchSubmitted=true;
  root.querySelector('[data-v48-search-suggestions]').hidden=true;
  if(remember){
    v48SearchHistory=[v48SearchText,...v48SearchHistory.filter(keyword=>keyword!==v48SearchText)].slice(0,6);
    v48SaveSearchHistory();
    root.querySelector('[data-v48-history]').innerHTML=v48RecentSearches();
    input.blur();
  }
}
function v48CloseSearch(){
  s1back();document.getElementById('s1view').scrollTop=v48SearchReturnScroll;
  document.querySelector('[data-v48-search-open]')?.focus({preventScroll:true});
}
function handleV48SearchClick(target){
  if(!isV48())return false;
  if(target.closest('[data-v48-search-open]')){
    v48SearchText='';v48SearchSubmitted=false;
    v48SearchReturnScroll=document.getElementById('s1view').scrollTop;
    s1nav({page:'v48search'});
    document.getElementById('s1view').scrollTop=0;
    document.querySelector('.v48-search-page [data-v47search]')?.focus({preventScroll:true});return true;
  }
  if(target.closest('[data-v48-search-back]')){
    v48CloseSearch();return true;
  }
  const removeKeyword=target.closest('[data-v48-delete-keyword]');
  if(removeKeyword){
    const index=v48SearchHistory.indexOf(removeKeyword.dataset.v48DeleteKeyword);
    v48SearchHistory=v48SearchHistory.filter(keyword=>keyword!==removeKeyword.dataset.v48DeleteKeyword);
    v48SaveSearchHistory();
    const root=removeKeyword.closest('.v48-search-page');
    root.querySelector('[data-v48-history]').innerHTML=v48RecentSearches();
    const remaining=root.querySelectorAll('[data-v48-delete-keyword]');
    (remaining[Math.min(index,remaining.length-1)]||root.querySelector('[data-v47search]')).focus({preventScroll:true});
    return true;
  }
  const keyword=target.closest('[data-v48-keyword]');
  if(keyword){
    const root=keyword.closest('.v48-search-page'),input=root.querySelector('[data-v47search]');
    input.value=keyword.dataset.v48Keyword;runV47Search(input);
    root.querySelector('[data-v48-keyword]')?.focus({preventScroll:true});return true;
  }
  if(target.closest('[data-v48-clear-history]')){
    v48SearchHistory=[];v48SaveSearchHistory();
    const root=target.closest('.v48-search-page');
    root.querySelector('[data-v48-history]').innerHTML=v48RecentSearches();
    root.querySelector('[data-v47search]').focus({preventScroll:true});return true;
  }
  const ai=target.closest('[data-v48-ai]');
  if(ai){
    if(ai.dataset.v48Ai==='work')openAiChat();else openAppLink('v48aiinvest');
    return true;
  }
  return false;
}

// The app header is outside the scrollable page, below the mock phone status bar.
function v48MountHeaderMenu(view){
  const flow=view.closest('.flow');
  let header=flow.querySelector(':scope > .v48-global-header');
  if(!isV48()||['v48search','allmenu'].includes(s1state.page)){header?.remove();return;}
  if(!header){
    header=document.createElement('header');header.className='toss-top v48-global-header';
    header.setAttribute('aria-label','디지털 ARS 공통 메뉴');
    flow.insertBefore(header,view);
  }
  header.innerHTML=renderV48Header();
  // Detail pages retain their back/step controls without a second menu button.
  view.querySelectorAll('[data-menu]').forEach(button=>button.remove());
}
