/* New, buildless prototype. No imports from previous ARS mockups. */
(function () {
  'use strict';
  const D=window.ARSData, app=document.getElementById('app'), sheet=document.getElementById('sheet');
  const V=window.ARSViewport||window;
  const certificates = window.ARSCertificates;
  const profileEmail = 'kiwoom.kim@example.com';
  const demoIncomingPhone = '01012345678';
  const menuChipLimit = 5;
  const popularMenu = [
    {label:'비밀번호 재설정', action:'service', id:'password-change'},
    {label:'금융상품 문의', action:'connect-skill', id:'products'},
    {label:'출금정지 풀기', action:'service', id:'withdrawal-status'},
    {label:'공모주청약', action:'service', id:'ipo'},
    {label:'증명서 신청내역', action:'service', id:'certificate-history'}
  ];
  const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const demoAccounts = [
    { id: '12345678', name: '위탁종합', number: '1234-5678', bank: '국민은행', bankTail: '67890', loginId: 'kwkim01', inactiveId: true, kycComplete: true, returned: false },
    { id: '87654321', name: 'ISA', number: '8765-4321', bank: '신한은행', bankTail: '21876', loginId: 'kwkim02', inactiveId: false, kycComplete: false, returned: false },
    { id: '24681357', name: '연금저축', number: '2468-1357', bank: '우리은행', bankTail: '03579', loginId: 'kwkim03', inactiveId: false, kycComplete: true, returned: true }
  ];
  const S={auth:{phone:false,account:false},phone:{},sms:{issued:0,attempts:0},accounts:[],selectedAccount:'',authStartedFor:null,accountAttempts:0,expanded:null,query:'',menuQuery:'',drafts:{},files:{},records:[],outcomes:{},review:null,unlocked:new Set(),endReason:null,large:false,recent:[],returnFocus:null,modalContext:null};
  try{S.large=localStorage.getItem('fresh-ars-20261112-large')==='true';const r=JSON.parse(localStorage.getItem('fresh-ars-20261112-recent')||'[]');S.recent=Array.isArray(r)?r.filter(id=>D.service(id)).slice(0,menuChipLimit):[];}catch(_){/* Private browsing still works. */}
  document.documentElement.classList.toggle('large-type',S.large);
  const paths={
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    menu:'<path d="M3 5h18M3 12h18M3 19h18"/>',
    textSize:'<path d="m2 19 3.5-9L9 19m-5.5-3h4M11 19l5.5-14L22 19m-9-4h7"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',down:'<path d="m6 9 6 6 6-6"/>',back:'<path d="m15 4-8 8 8 8"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',
    home:'<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z"/>',
    headset:'<path d="M4 13v-2a8 8 0 0 1 16 0v6a4 4 0 0 1-4 4h-3"/><rect x="2.5" y="11" width="4" height="7" rx="2"/><rect x="17.5" y="11" width="4" height="7" rx="2"/>',
    star:'<path d="m12 2 3 6.3 7 .9-5.1 4.8 1.4 7-6.3-3.4L5.7 21l1.4-7L2 9.2l7-.9z"/>',
    flame:'<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M14 2c1 5-2 7-2 9-2-1-3-3-3-5-4 4-6 8-5 12a9 9 0 0 0 17-1c1-4-1-7-3-10 0 3-1 4-2 5 1-4 0-8-2-10Zm-1 12c0 2-3 3-3 5a3 3 0 0 0 6 0c0-2-2-3-3-5Z"/>',
    megaphone:'<path d="m4 9 14-5v14L4 14zM4 9H2v5h2m3 1 2 6h3l-2-5M21 7v8"/>',
    person:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
    clipboard:'<rect x="5" y="4" width="15" height="19" rx="3"/><rect x="9" y="2" width="7" height="4" rx="1.5"/><path d="M9 12h7M9 16h5"/>',
    document:'<path d="M6 2h9l6 6v15H6zM15 2v6h6M10 13h7M10 17h7"/>',
    wallet:'<path d="M3 6h17v15H3zM3 6l13-4v4"/><rect x="15" y="11" width="7" height="6" rx="1"/><path d="M18 14h1"/>',
    coin:'<circle cx="15" cy="7" r="5"/><path d="m12 5 1 4 2-4 2 4 1-4M2 21v-6h4l4-3h5a2 2 0 0 1 0 4h-4m4 0 5-2a2 2 0 0 1 2 3l-7 5H6"/>',
    calendar:'<rect x="3" y="5" width="20" height="17" rx="3"/><path d="M3 10h20M8 2v6M18 2v6M8 15h3M8 18h3"/>',
    chat:'<path d="M3 4h18v14H9l-6 4z"/><path d="M12 8v5m0 2v.2"/>',
    shield:'<path d="m12 2 9 4v7c0 6-9 10-9 10S3 19 3 13V6z"/><path d="m8 12 3 3 5-6"/>',
    warning:'<path d="m12 3 10 18H2z"/><path d="M12 9v5m0 3v.3"/>',
    lock:'<rect x="5" y="10" width="16" height="12" rx="3"/><path d="M8 10V6a5 5 0 0 1 10 0v4M13 15v3"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8M12 17v5"/>',
    chart:'<rect x="2" y="3" width="20" height="15" rx="2"/><path d="m6 13 4-4 4 2 4-5M12 18v4M8 22h8"/>',
    edit:'<path d="m4 16 12-12 4 4L8 20l-5 1zM14 6l4 4M3 24h20"/>',
    phone:'<path d="m5 3 4-1 3 6-3 2a15 15 0 0 0 5 5l2-3 6 3-1 4c-1 5-8 2-13-3S1 4 5 3z"/>',
    check:'<path pathLength="1" d="m5 12 5 5 10-11"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v7m0-10v.1"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.2 1-1.7 1.3-1.7 2.7m0 3v.1"/>',
    upload:'<path d="M12 16V3m-5 5 5-5 5 5M3 16v6h18v-6"/>',empty:'<path d="M5 3h10l5 5v14H5zM15 3v5h5M9 13h7M9 17h4"/>',sparkle:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>'
  };
  const tones={blue:['#75a7ff','#e7efff'],violet:['#8f65f8','#efe6ff'],amber:['#f9b849','#fff0c3'],pink:['#ee78dc','#ffe2fa'],green:['#20b99a','#d8f7ec'],red:['#ff656e','#ffe7e9']};
  const colorArt={
    person:'<circle cx="13" cy="8" r="5" fill="#70a6ff"/><path d="M3 25v-4c0-6 20-6 20 0v4" fill="#a8ccff"/><path d="M8 25v-5m10 5v-5" stroke="#fff" stroke-width="1.5"/>',
    clipboard:'<rect x="4" y="4" width="18" height="22" rx="3" fill="#c5b4ff"/><rect x="8" y="2" width="10" height="5" rx="2" fill="#8e64ed"/><path d="M9 13h9M9 18h7" stroke="#8860e6" stroke-width="2" stroke-linecap="round"/>',
    document:'<path d="M5 2h11l7 7v16H5z" fill="#dbeaff"/><path d="M16 2v7h7" fill="#99c2ff"/><path d="M10 14h8M10 19h8M10 9h2" stroke="#4e96ff" stroke-width="2" stroke-linecap="round"/>',
    wallet:'<path d="m5 9 14-7 3 9" fill="currentColor"/><rect x="3" y="8" width="21" height="17" rx="3" fill="var(--icon-tint)"/><rect x="17" y="14" width="8" height="7" rx="2" fill="currentColor"/><circle cx="20" cy="17.5" r="1" fill="#fff"/><path d="M7 21h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    coin:'<circle cx="16" cy="8" r="7" fill="#ffdc78"/><path d="m12 5 2 6 2-6 2 6 2-6" stroke="#efa528" stroke-width="1.2" fill="none"/><path d="M2 20h5l5-5h5c3 0 3 4 0 4h-4l8-2c3-1 4 2 1 4l-7 5H7" fill="#ffd9b4"/><path d="M2 20v6h3v-6" fill="#ff9d52"/>',
    calendar:'<rect x="2" y="5" width="24" height="20" rx="3" fill="var(--icon-tint)"/><path d="M2 9V8a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v4H2z" fill="currentColor"/><path d="M8 2v5M20 2v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="7" y="15" width="5" height="5" rx="1" fill="currentColor"/><path d="M18 17h7v11l-3.5-2-3.5 2z" fill="currentColor"/>',
    chat:'<path d="M2 6a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H8l-6 4z" fill="#1db99b"/><path d="M14 8v7m0 3v1" stroke="#fff" stroke-width="2" stroke-linecap="round"/>',
    shield:'<path d="m14 2 11 4v9c0 7-11 12-11 12S3 22 3 15V6z" fill="currentColor"/><path d="m9 14 4 4 7-8" stroke="#fff" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    warning:'<path d="M11.5 3a2.8 2.8 0 0 1 5 0L27 22a2 2 0 0 1-2 3H3a2 2 0 0 1-2-3z" fill="#ff626e"/><path d="M14 10v6m0 4v.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'
  };
  function icon(name, cls = '', tone = '') {
    const palette = tones[tone];
    const [ink, tint] = palette || ['currentColor', 'none'];
    if (palette && colorArt[name]) {
      return `<svg class="${cls}" viewBox="0 0 28 30" color="${ink}" style="--icon-tint:${tint}" aria-hidden="true">${colorArt[name]}</svg>`;
    }
    return `<svg class="${cls}" viewBox="0 0 26 26" fill="${tint}" stroke="${ink}" stroke-width="${palette ? 1.8 : 1.65}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.document}</svg>`;
  }
  function chevron(){return icon('chevron','chevron');}
  function otherMethodsLink(service, compact = false) {
    if (service.channels.length === 1 && service.channels[0] === 'staff') return staffContactLink(service, compact);
    return `<button type="button" class="other-methods-link${compact ? ' compact' : ''}" data-action="channels" data-id="${E(service.id)}" aria-haspopup="dialog" aria-controls="sheet">다른 이용 방법 확인하기${chevron()}</button>`;
  }
  function staffContactLink(service, compact = false) {
    return `<button type="button" class="other-methods-link${compact ? ' compact' : ''}" data-action="channel" data-id="${E(service.id)}" data-channel="staff" aria-haspopup="dialog" aria-controls="sheet">상담원 연결하기${chevron()}</button>`;
  }
  function btn(text,action,extra='',kind=''){return `<button type="button" class="btn ${kind}" data-action="${action}" ${extra}>${E(text)}</button>`;}
  function callout(text,type=''){return `<div class="callout ${type}">${icon(type==='success'?'check':'info')}<div>${text}</div></div>`;}
  function demoNote(text){return `<span hidden data-demo-note>${text}</span>`;}
  function factRows(items) {
    return items.map(([label, value]) => `<div><dt>${E(label)}</dt><dd>${E(value)}</dd></div>`).join('');
  }
  function facts(items){return `<dl class="facts">${factRows(items)}</dl>`;}
  function logo(){return `<svg class="logo-mark" viewBox="0 0 40 48" aria-hidden="true"><path fill="#29267a" d="M5 17h7v12l10-12h8L17 32l12 12H18l-6-8v8H5z"/><path class="logo-arrow" fill="#e5007e" d="m15 12 23-8-6 25-5-9-12 14-6-6 13-13z"/></svg>`;}
  function homeTop() {
    const status = E(D.homeTrafficStatus);
    return `<header class="topbar">
      <span class="home-logo" role="img" aria-label="키움증권">${logo()}</span>
      <button class="traffic" data-action="traffic" data-status="${status}" aria-label="상담 혼잡도: ${status}, 스킬별 상세 보기">${icon('headset')}${status}</button>
      <button class="font-switch" role="switch" aria-checked="${S.large}" aria-label="큰글씨" data-action="large">${icon('textSize')}큰글씨</button>
      <button class="icon-button" data-action="menu" aria-label="전체메뉴">${icon('menu')}</button>
    </header>`;
  }
  function top(title = '', {context = false} = {}) {
    const tag = context ? 'span' : 'h1';
    const heading = title ? `<${tag} class="topbar-title">${E(title)}</${tag}>` : '';
    return `<header class="topbar detail"><button class="icon-button" data-action="back" aria-label="뒤로가기">${icon('back')}</button>${heading}<button class="icon-button" data-action="home" aria-label="홈으로 이동">${icon('home')}</button></header>`;
  }
  const groupName = id => D.groups.find(group => group.id === id)?.name;
  const footerNote=()=>'';
  const selectedAccount = () => S.accounts.find(account => account.id === S.selectedAccount);
  const accountNumber = () => selectedAccount()?.number || '';
  const accountLabel = account => `${account.number} · ${account.name}`;
  const accountWork = new Map();
  function currentAccountCard() {
    const account = selectedAccount();
    if (!account?.verified) return '';
    const label = E(accountLabel(account));
    return `<button type="button" class="account-choice verified-account" data-action="switch-account" aria-current="true" aria-label="${label}, 다른 계좌 선택">
      <span class="account-product">${label}</span>
      <span class="status-badge account-change-badge">다른 계좌${chevron()}</span>
    </button>`;
  }
  function sticky(html){return `<div class="sticky-actions">${html}</div>`;}
  function support(s){return s.channels.includes('staff')?`<button class="support-link" data-action="channel" data-channel="staff" data-id="${s.id}">${icon('headset')}상담원 연결하기</button>`:'';}
  function route(){const p=location.hash.replace(/^#\/?/,'').split('/');return {page:p[0]||'home',id:p[1]||'',stage:p[2]||''};}
  function go(path, state) {
    closeSheet();
    const hash = '#/' + path;
    const changed = location.hash !== hash;
    if (changed) location.hash = hash;
    if (state !== undefined) history.replaceState(state, '', hash);
    if (!changed) render();
  }
  function current(){return D.service(route().id);}
  function focusServiceTopic(){
    const r=route();
    if (r.page !== 'service') return;
    if (r.id === 'password-change' && r.stage === 'certificate') {
      const heading = app.querySelector('#password-certificate');
      if (heading) {
        heading.focus({preventScroll:true});
        heading.scrollIntoView({block:'start'});
      }
      return;
    }
    if (!Object.hasOwn(D.service(r.id)?.faqTopics || {}, r.stage)) return;
    const detail=app.querySelector('details[open]'),bar=app.querySelector('.topbar');if(!detail||!bar)return;
    const box=detail.getBoundingClientRect(),top=bar.getBoundingClientRect().bottom+16;
    const bottom=(app.querySelector('.sticky-actions')?.getBoundingClientRect().top||window.innerHeight)-16;
    const shift=box.height>bottom-top||box.top<top?box.top-top:Math.max(0,box.bottom-bottom);
    V.scrollTo(0,Math.max(0,V.scrollY+shift));
    detail.querySelector('summary')?.focus({preventScroll:true});
  }
  function remember(id){S.recent=[id,...S.recent.filter(x=>x!==id)].slice(0,menuChipLimit);try{localStorage.setItem('fresh-ars-20261112-recent',JSON.stringify(S.recent));}catch(_){} }
  function openService(id, topic, fromScenario = false) {
    const service = D.service(id);
    if (!service) return;
    S.authStartedFor = null;
    remember(id);
    const bankLookup = id === 'info' && topic === 'certificate-prep';
    const certificateGuide = id === 'password-change' && topic === 'certificate';
    const hasTopic = bankLookup || certificateGuide || Object.hasOwn(service.faqTopics || {}, topic);
    const fromPasswordScenario = fromScenario || ((bankLookup || certificateGuide) && history.state?.fromPasswordScenario);
    const state = id === 'password-change' || bankLookup ? {fromPasswordScenario: Boolean(fromPasswordScenario)} : undefined;
    go(`service/${id}${hasTopic ? '/' + topic : ''}`, state);
  }
  function menuLink(service, action = 'service') {
    const popup = action === 'certificate-options' ? ' aria-haspopup="dialog"' : '';
    return `<button class="menu-link" data-action="${action}" data-id="${service.id}"${popup}><span class="bullet"></span><span>${E(service.label)}</span>${chevron()}</button>`;
  }
  function categoryButton(group) {
    const direct = group.id === 'transfer';
    const behavior = direct
      ? 'data-action="service" data-id="withdrawal-status"'
      : `data-action="expand" data-id="${group.id}" aria-expanded="${S.expanded === group.id}" aria-controls="panel-${group.id}"`;
    return `<button class="category" ${behavior}>${icon(group.icon,'category-icon',group.tone)}<span>${E(group.name)}</span></button>`;
  }
  const noticeMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let noticeIndex = 0;
  let noticeTimer = 0;

  function noticeTicker() {
    const slides = D.homeNotices.map((notice, index) => {
      const current = index === noticeIndex;
      return `<button type="button" class="notice-link" data-action="notice" data-id="${E(notice.id)}" data-position="${current ? 'current' : 'next'}"${current ? '' : ' aria-hidden="true" tabindex="-1"'}>${E(notice.title)}</button>`;
    }).join('');
    return `<section class="notice" id="home-notices" aria-label="공지사항">
      ${icon('megaphone')}
      <div class="notice-window">${slides}</div>
      <button type="button" class="notice-control notice-next" data-action="next-notice" aria-label="다음 공지 보기"><span aria-hidden="true">${noticeIndex + 1}/${D.homeNotices.length}</span>${chevron()}</button>
      <span class="visually-hidden" role="status"></span>
    </section>`;
  }

  function stopNoticeTimer() {
    if (noticeTimer) window.clearTimeout(noticeTimer);
    noticeTimer = 0;
  }

  function scheduleNotice() {
    stopNoticeTimer();
    const ticker = document.getElementById('home-notices');
    const splash = document.getElementById('launch-screen');
    if (!ticker || noticeMotion?.matches || document.hidden || (splash && !splash.hidden)) return;
    noticeTimer = window.setTimeout(() => {
      noticeTimer = 0;
      const content = ticker.querySelector('.notice-window');
      const reading = content.matches(':focus-within') ||
        (window.matchMedia('(hover: hover)').matches && content.matches(':hover'));
      if (reading) scheduleNotice();
      else nextNotice();
    }, 5000);
  }

  function nextNotice(manual = false) {
    const ticker = document.getElementById('home-notices');
    if (!ticker) return;
    const previous = noticeIndex;
    noticeIndex = (noticeIndex + 1) % D.homeNotices.length;
    ticker.querySelectorAll('.notice-link').forEach((link, index) => {
      const current = index === noticeIndex;
      link.dataset.position = current ? 'incoming' : index === previous ? 'outgoing' : 'next';
      link.tabIndex = current ? 0 : -1;
      link.setAttribute('aria-hidden', String(!current));
    });
    ticker.querySelector('.notice-next span').textContent = `${noticeIndex + 1}/${D.homeNotices.length}`;
    if (manual) ticker.querySelector('[role="status"]').textContent = D.homeNotices[noticeIndex].title;
    scheduleNotice();
  }

  function home(){
    let grid = '';
    for (let i = 0; i < D.groups.length; i += 3) {
      const row = D.groups.slice(i, i + 3);
      const expanded = row.find(group => group.id === S.expanded);
      let panel = '';
      if (expanded) {
        const isCertificate = expanded.id === 'papers';
        const services = isCertificate ? certificates.catalog.map(id => D.service(id)) : D.services.filter(service => service.group === expanded.id);
        const action = isCertificate ? 'certificate-options' : 'service';
        const alignment = [' left', '', ' right'][row.indexOf(expanded)];
        panel = `<svg class="menu-outline" aria-hidden="true" focusable="false"><path/></svg><div id="panel-${expanded.id}" class="category-panel${alignment}">${services.map(service => menuLink(service, action)).join('')}</div>`;
      }
      grid += `<div class="menu-row">${row.map(categoryButton).join('')}${panel}</div>`;
    }
    return `${homeTop()}<main id="main">${noticeTicker()}<section class="intro"><p class="greeting">안녕하세요,</p><h1>쉽고 빠르게 검색해보세요</h1></section>
      <div class="search-dock"><form class="search-box" id="home-search"><label class="visually-hidden" for="home-query">업무 검색</label><input id="home-query" name="query" type="search" placeholder="검색어를 입력하세요." autocomplete="off" maxlength="80" enterkeyhint="search"><button id="home-search-submit" type="submit" aria-label="검색하기">${icon('search')}</button><button id="home-search-clear" type="button" data-action="clear-home-search" aria-label="검색어 지우기" hidden>${icon('close')}</button></form></div>
      <div class="recent-line"><span class="recent-label">${icon('star')}최근 본 메뉴</span><div class="recent-items">${S.recent.length?S.recent.map(id=>`<button class="chip" data-action="service" data-id="${id}">${E(D.service(id).label)}</button>`).join(''):'<span class="empty-recent">이용한 메뉴가 여기에 표시됩니다.</span>'}</div></div><section class="home-menu" aria-label="업무 메뉴">${grid}</section><section class="self-help"><h2 class="section-heading">직접 해결할 수 있어요</h2>${D.scenarios.map(([label,ic,id],i)=>`<button class="situation" data-action="scenario" data-id="${id}" data-index="${i}">${icon(ic)}<span>${E(label)}</span>${chevron()}</button>`).join('')}</section></main>`;
  }
  function updateHomeSearch(value){document.getElementById('home-search-submit').hidden=!!value;document.getElementById('home-search-clear').hidden=!value;}
  function trafficItem(skill,connection){const summary=`<span class="card-top"><span class="skill-name" id="skill-name-${E(skill.id)}">${E(skill.name)}</span><span class="status-badge ${E(skill.tone)}" id="skill-status-${E(skill.id)}">${E(skill.status)}</span></span><span class="skill-summary"><span id="skill-description-${E(skill.id)}">${E(skill.description)}</span>${chevron()}</span>`;return connection?`<li class="skill-option"><button type="button" class="detail-card traffic-item skill-choice" data-action="connect-skill" data-id="${E(skill.id)}" aria-haspopup="dialog" aria-labelledby="skill-name-${E(skill.id)}" aria-describedby="skill-status-${E(skill.id)} skill-description-${E(skill.id)}">${summary}</button></li>`:`<li class="detail-card traffic-item"><div class="card-top"><h2>${E(skill.name)}</h2><span class="status-badge ${E(skill.tone)}">${E(skill.status)}</span></div><p>${E(skill.description)}</p></li>`;}
  function trafficPage(connection=false){return `${top(connection?'상담원 연결':'고객센터 혼잡도')}<main id="main" class="content traffic-page"><p class="lead">${connection?'상담받을 분야를 선택해 주세요.<br>분야별 상담 범위와 혼잡도를 확인할 수 있습니다.':'상담 분야별 혼잡도를 확인할 수 있습니다.<br>상담 대기 상황에 따라 달라질 수 있습니다.'}</p><ul class="traffic-skills" aria-label="상담 분야별 ${connection?'연결':'혼잡도'}">${D.trafficSkills.map(skill=>trafficItem(skill,connection)).join('')}</ul>${demoNote('상담 분야별 혼잡도는 고정 시연값이며 실제 고객센터와 연동되지 않습니다. 스킬별 연결도 시연으로 진행하며 실제 전화는 실행하지 않습니다.')}</main>`;}

  function staffSummary(name, status = '보통') {
    // Hours and queue size use the ver4.8 demo values.
    const items = [['상담 분야',name], ['상담 가능 시간','평일 08:00~18:00'], ['상담 대기','3명'], ['현재 혼잡도',status]];
    return `<div class="detail-card staff-summary" data-congestion="${E(status)}">${facts(items)}</div>
      ${demoNote('상담 가능 시간과 대기 인원, 혼잡도는 시연 정보입니다. 상담원 연결을 누르면 종료 화면을 표시합니다.')}`;
  }
  function connectSkill(id) {
    const skill = D.trafficSkills.find(entry => entry.id === id);
    if (!skill) return;
    S.modalContext = `skill:${id}`;
    showSheet('상담원 연결 안내', `<p class="sheet-description">${E(skill.description)}</p>
      ${staffSummary(skill.name, skill.status)}
      <div class="sheet-actions button-row">${btn('취소하기','close-sheet','','secondary')}${btn('상담원 연결하기','execute-skill',`data-id="${E(skill.id)}"`)}</div>`);
  }
  function executeSkill(id) {
    if (sheet.open && S.modalContext === `skill:${id}`) endSession('staff');
  }

  function noticePage(id) {
    const notice = D.homeNotices.find(item => item.id === id) || D.homeNotices[0];
    const sections = notice.sections.map(section => {
      const action = section.action;
      const button = action ? btn(action.label, 'service',
        `data-id="${E(action.id)}"${action.topic ? ` data-topic="${E(action.topic)}"` : ''}`, 'secondary') : '';
      return `<section class="detail-card notice-section"><h2>${E(section.title)}</h2>
        ${section.body ? `<p>${E(section.body)}</p>` : ''}
        ${section.items ? `<ul class="checklist">${section.items.map(item=>`<li>${E(item)}</li>`).join('')}</ul>` : ''}
        ${button}</section>`;
    }).join('');
    return `${top()}<main id="main" class="content notice-page"><h1>${E(notice.title)}</h1><p class="lead">${E(notice.summary)}</p>${sections}${demoNote(notice.demoNote)}</main>`;
  }
  function menuMatches(){return D.search(S.menuQuery, {menuOnly: true});}
  function menuResults(matches=menuMatches()){return matches.length?D.groups.map(group=>{const items=matches.filter(service=>service.group===group.id);return items.length?`<section class="all-menu-group"><h2>${icon(group.icon,'',group.tone)}${E(group.name)}</h2>${items.map(service=>menuLink(service)).join('')}</section>`:'';}).join(''):`<div class="empty-state">${icon('search')}<h2>검색 결과가 없습니다</h2><p>다른 메뉴명으로 검색해 주세요.</p>${btn('검색어 지우기','clear-menu-search','','secondary')}</div>`;}
  function updateMenuSearch(value) {
    S.menuQuery = value.slice(0, 80);
    const matches = menuMatches();
    const active = !!S.menuQuery.trim();
    document.getElementById('popular-menu').hidden = active;
    document.getElementById('menu-results').innerHTML = menuResults(matches);
    const status = document.getElementById('menu-search-status');
    status.hidden = !active;
    status.textContent = active ? `검색 결과 ${matches.length}개` : '';
    document.getElementById('menu-search-clear').hidden = !S.menuQuery;
    document.getElementById('menu-search-symbol').hidden = !!S.menuQuery;
    if (V.scrollY > 0) V.scrollTo(0, 0);
    V.refresh?.();
  }
  function allMenu() {
    const matches = menuMatches();
    const active = !!S.menuQuery.trim();
    return `${top('전체메뉴')}<main id="main" class="content with-actions menu-page"><div class="search-dock">
      <form id="menu-search" class="search-box menu-search" role="search" aria-label="전체메뉴 검색">
        <label class="visually-hidden" for="menu-query">메뉴명 검색</label>
        <input type="search" id="menu-query" name="query" value="${E(S.menuQuery)}" placeholder="메뉴명을 입력하세요." maxlength="80" autocomplete="off" aria-controls="menu-results">
        <span id="menu-search-symbol" aria-hidden="true" ${S.menuQuery ? 'hidden' : ''}>${icon('search')}</span>
        <button type="button" id="menu-search-clear" data-action="clear-menu-search" aria-label="메뉴 검색어 지우기" ${S.menuQuery ? '' : 'hidden'}>${icon('close')}</button>
      </form></div>
      <nav id="popular-menu" class="popular-menu" aria-labelledby="popular-menu-title" ${active ? 'hidden' : ''}>
        <span id="popular-menu-title" class="popular-menu-title">${icon('flame')}인기메뉴</span>
        <div class="popular-menu-items">
          ${popularMenu.slice(0, menuChipLimit).map(item =>
            `<button type="button" class="chip" data-action="${item.action}" data-id="${item.id}"${item.action === 'connect-skill' ? ' aria-haspopup="dialog"' : ''}>${E(item.label)}</button>`
          ).join('')}
        </div>
      </nav>
      <p id="menu-search-status" class="count menu-search-status" role="status" aria-live="polite" ${active ? '' : 'hidden'}>${active ? `검색 결과 ${matches.length}개` : ''}</p>
      <div id="menu-results">${menuResults(matches)}</div>
    </main>${sticky(`<button type="button" class="btn" data-action="consultation">${icon('headset')}<span>상담원 연결하기</span></button>`)}`;
  }

  function searchResults(){const result=D.search(S.query);return !S.query.trim()?'<div class="empty-state">'+icon('search')+'<h2>어떤 업무가 필요하신가요?</h2><p>업무명이나 궁금한 내용을 입력해 주세요.</p></div>':result.length?`<p class="count">검색 결과 <strong>${result.length}</strong>개</p><div class="page-list">${result.map(s=>`<button class="list-row" data-action="service" data-id="${s.id}"><span><strong>${E(s.label)}</strong><small>${E(D.groups.find(g=>g.id===s.group).name)}</small></span>${chevron()}</button>`).join('')}</div>`:`<div class="empty-state">${icon('search')}<h2>검색 결과가 없습니다</h2><p>다른 단어로 검색하거나<br>전체메뉴에서 업무를 찾아보세요.</p>${btn('전체메뉴 보기','menu')}</div>`;}
  function searchPage(){return `${top('업무 검색')}<main id="main" class="content search-page"><form id="search-form" class="search-box"><label class="visually-hidden" for="search-query">업무 검색</label><input type="search" id="search-query" name="query" value="${E(S.query)}" placeholder="어떤 업무를 찾으시나요?" maxlength="80" autocomplete="off"><button type="button" data-action="clear-search" aria-label="검색어 지우기">${icon('close')}</button></form><div id="search-results">${searchResults()}</div></main>`;}
  const koreanGraphemes = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ko') : null;
  function featureList(service, label = '이용할 수 있는 업무') {
    const checkMs = 170;
    const letterMs = 18;
    let rowStart = 0;
    const items = service.features.map(feature => {
      const letters = koreanGraphemes
        ? Array.from(koreanGraphemes.segment(feature), part => part.segment)
        : Array.from(feature.normalize('NFC'));
      const start = rowStart;
      rowStart += checkMs + letters.length * letterMs + 55;
      const visualText = letters.map((letter, index) =>
        `<span style="--show-at:${start + checkMs + index * letterMs}ms">${E(letter)}</span>`).join('');
      return `<li style="--row-start:${start}ms">${icon('check')}
        <span class="visually-hidden">${E(feature)}</span><span class="feature-copy" aria-hidden="true">${visualText}</span></li>`;
    }).join('');
    return `<ul class="service-features" role="list" aria-label="${E(label)}" style="--check-time:${checkMs}ms">${items}</ul>`;
  }
  function faqPage(s){const tone=s.group==='security'?'green':s.group==='incident'?'red':'blue';return `${top(groupName(s.group), {context:true})}<main id="main"><section class="hero ${tone}"><h1>${E(s.label)}</h1><p>${E(s.description)}</p>${featureList(s)}</section><section class="faq-section"><h2>자주묻는 질문</h2>${s.faq.map(([q,a],i)=>`<details class="faq"${s.faqTopics?.[route().stage]===i?' open':''}><summary><span class="q">Q</span><span>${E(q)}</span>${icon('down','chevron')}</summary><div class="faq-answer">${E(a)}</div></details>`).join('')}${s.id==='certificate-guide'?`<div class="callout">${icon('info')}<div>앱 이동 전에 필요한 정보를 확인해 주세요.<br><button class="text-button" data-action="service" data-id="info">내 정보 확인하기</button></div></div>`:''}${demoNote(s.id==='ipo'?'공모주청약의 이용 경로와 업무 연결을 확인하는 시연입니다. 실시간 종목·일정·공시를 제공하지 않습니다.':'이용 경로와 업무 연결을 확인하는 시연 화면입니다.')}</section></main>${sticky(btn(s.faqAction||'이용 방법 선택하기','channels',`data-id="${s.id}"`,'faq-action'))}`;}
  function field(name,label,opts={}) {
    const draft = S.drafts[current()?.id] || {};
    const value = opts.value ?? draft[name] ?? '';
    const required = opts.required === false ? '' : 'required';
    const hint = opts.hint ? `<small>${E(opts.hint)}</small>` : '';
    if (opts.options) {
      const choices = opts.options.map(v => `<option ${value === v ? 'selected' : ''}>${E(v)}</option>`).join('');
      return `<div class="field"><label class="field-label" for="choose-${name}">${E(label)}</label>
        <select name="${name}" hidden ${required}><option value="">선택해 주세요</option>${choices}</select>
        <button type="button" id="choose-${name}" class="choice-field" data-action="open-choice"
          role="combobox" aria-haspopup="dialog" aria-controls="sheet" aria-expanded="false" ${required ? 'aria-required="true"' : ''}>
          <span class="choice-value">${E(value || '선택해 주세요')}</span>${icon('down')}
        </button>${hint}</div>`;
    }
    return `<label class="field"><span class="field-label">${E(label)}</span><input name="${name}" type="${opts.type||'text'}" value="${E(value)}" placeholder="${E(opts.placeholder||'')}" ${opts.inputmode?`inputmode="${opts.inputmode}"`:''} ${opts.maxlength?`maxlength="${opts.maxlength}"`:''} ${opts.max?`max="${E(opts.max)}"`:''} ${opts.readonly?'readonly':''} ${required} autocomplete="off">${hint}</label>`;
  }
  function check(name, text, checked = false) {
    return `<label class="check"><input type="checkbox" name="${name}" ${checked ? 'checked' : ''}>${icon('check')}<span>${text}</span></label>`;
  }
  function steps(account,level){return `<div class="steps"><span class="${account?'':'current'}"><b>${account?'✓':'1'}</b>휴대폰 인증</span>${level===3?`<i class="line"></i><span class="${account?'current':''}"><b>2</b>계좌 인증</span>`:''}<i class="line"></i><span>업무 확인</span></div>`;}
  function serviceIntro(service) {
    const {intro} = service;
    const requirement = S.auth.phone
      ? '휴대폰 인증을 마쳤습니다. 계좌 비밀번호로 본인을 확인해 주세요.'
      : service.level === 3 ? '휴대폰과 계좌 비밀번호로 본인을 확인합니다.' : '본인 명의의 휴대폰 인증이 필요합니다.';
    const target = `data-id="${E(service.id)}"`;
    const contact = service.id === 'withdrawal-status' ? staffContactLink(service) :
      service.channels.length ? otherMethodsLink(service) : '';
    const checklistTitle = intro?.checklistTitle ? `<h2 class="intro-checklist-title">${E(intro.checklistTitle)}</h2>` : '';
    return `${top(groupName(service.group), {context:true})}<main id="main" class="content service-intro">
      <h1>${E(intro?.title ?? service.label)}</h1>
      <p class="lead">${E(service.description)}</p>
      ${checklistTitle}${featureList(service, intro?.checklistTitle)}
    </main>${sticky(`<div class="entry-actions">
      <div class="auth-help-bubble" id="auth-requirement">${icon('shield')}<p>${requirement}</p></div>
      ${btn('인증해서 확인하기','begin-auth',`${target} aria-describedby="auth-requirement"`)}
      ${contact}
    </div>`)}`;
  }
  function switchingAccount() {
    const {stage} = route();
    return S.auth.phone && S.auth.account && current()?.level === 3 &&
      (stage === 'select-account' || stage === 'select-account-review' ||
        (current().id === 'info' && stage === 'select-account-prep'));
  }
  function leaveAccountPicker(cancelled = false) {
    if (cancelled && history.state?.fromAccountScreen) {
      history.back();
      return;
    }
    const {id, stage} = route();
    if (id === 'name-change' && Object.hasOwn(identityKinds, history.state?.identityKind)) {
      go('service/name-change', {identityKind:history.state.identityKind});
      return;
    }
    const suffix = stage === 'select-account-prep' ? '/certificate-prep' :
      cancelled && stage === 'select-account-review' ? '/confirm' : '';
    const state = stage === 'select-account-prep' ? {fromPasswordScenario: Boolean(history.state?.fromPasswordScenario)} : undefined;
    go(`service/${id}${suffix}`, state);
  }
  function accountChoices() {
    const options = S.accounts.map(account => {
      const selected = S.selectedAccount === account.id;
      const currentAccount = account.verified && selected;
      const label = E(accountLabel(account));
      const product = `<span class="account-product">${label}</span>`;
      if (account.verified) {
        const statusId = `account-status-${E(account.id)}`;
        const badge = `<small class="status-badge" id="${statusId}">인증 완료</small>`;
        const content = currentAccount ? product + badge : `<button type="button" class="verified-account-view" data-action="view-verified-account" data-id="${E(account.id)}" aria-label="${label} 조회하기" aria-describedby="${statusId}">${product}${chevron()}${badge}</button>`;
        return `<div class="account-choice verified-account">
          <input type="radio" name="account" value="${E(account.id)}" disabled aria-label="${label}" aria-describedby="${statusId}"${currentAccount ? ' aria-current="true"' : ''}>
          ${content}</div>`;
      }
      return `<label class="account-choice"><input type="radio" name="account" value="${E(account.id)}"
        ${S.accountAttempts >= 3 ? 'disabled' : selected ? 'checked' : ''}>
        ${product}<span class="account-radio" aria-hidden="true"></span></label>`;
    }).join('');
    return `<fieldset class="account-choices" aria-label="계좌 선택">
      <div class="account-options">${options}<button type="button" class="account-reselect" data-action="reselect-account"><span class="status-badge account-change-badge">다시 선택</span></button></div></fieldset>`;
  }
  const accountPinPattern = /^\d{4,8}$/;
  const accountLockMessage = '계좌 인증을 3회 실패했습니다. 비밀번호 재설정 방법을 확인해 주세요.';
  function accountFields(switching, verifiedOnly) {
    const choices = accountChoices();
    if (verifiedOnly) return choices;
    const chosen = !switching && S.selectedAccount && S.accountAttempts < 3;
    return `${choices}
      <div class="field account-password-field"${chosen ? '' : ' hidden'}>
        <input id="account-pin" name="password" type="password" inputmode="numeric" minlength="4" maxlength="8" autocomplete="off" aria-label="계좌 비밀번호" aria-describedby="account-instruction" placeholder="계좌비밀번호 (숫자 4~8자리)"${chosen ? '' : ' disabled'}>
      </div>
      <button class="btn" type="submit" disabled${chosen ? '' : ' hidden'}>계좌 인증하기</button>
      <button type="button" class="other-methods-link" data-action="channel" data-id="password-change" data-channel="app" data-password="account" aria-haspopup="dialog" aria-controls="sheet">비밀번호를 잊으셨나요?${chevron()}</button>
      ${demoNote('표시된 보유 계좌와 인증 결과는 시연값입니다.')}`;
  }
  function accountInstruction(chosen) {
    if (S.accountAttempts >= 3) return accountLockMessage;
    return chosen ? '선택한 계좌의 비밀번호를 입력해 주세요.' : '조회할 계좌를 선택해 주세요.';
  }
  const carriers = ['SKT','KT','LG U+','SKT 알뜰폰','KT 알뜰폰','LG U+ 알뜰폰'];
  const phoneTerms = [
    '개인정보취급동의', '본인확인서비스 이용 약관', '고유식별정보 처리 동의',
    '통신사 이용 약관', '개인정보 제3자 동의', '개인(신용)정보 수집·이용 필수동의서 (고객여부식별용)'
  ];
  const phoneLockMessage = '인증번호를 3회 잘못 입력했어요. 전체메뉴에서 상담원 연결을 선택해 주세요.';
  function authPage(s, step, title = s.label, switching = false) {
    const phone = step === 'phone';
    const review = phone && !S.sms.issued && phoneReady(phoneErrors(S.phone));
    const verifiedOnly = switching && S.accounts.every(account => account.verified);
    const progress = verifiedOnly ? '' : steps(!phone, s.level);
    let lead = phone ? '<p class="lead">본인 명의의 휴대폰 정보를 입력해 주세요.</p>'
      : `<p class="lead" id="account-instruction">${E(accountInstruction(!switching && Boolean(selectedAccount())))}</p>`;
    if (phone && S.sms.issued) {
      lead = '<p class="lead" id="code-hint">문자로 받은 인증번호 6자리를 입력해 주세요.</p>';
    } else if (review) {
      lead = '<p class="lead" id="phone-review-hint" tabindex="-1">입력한 정보가 맞는지 확인한 후 인증번호를 요청해 주세요.</p>';
    }
    return `${top(title)}<main id="main" class="content auth-page${review ? ' phone-review-page' : ''}">
      <div class="auth-guide">${progress}${lead}</div>
      <form id="${phone ? 'phone-form' : 'account-form'}" novalidate>${phone ? phoneFields() : accountFields(switching, verifiedOnly)}</form></main>${footerNote()}`;
  }
  function phoneFields() {
    const error = name => `<div class="form-error phone-field-error" id="phone-error-${name}" aria-live="polite"></div>`;
    if (S.sms.issued) {
      const slots = Array.from({length:6}, (_, i) => `<span class="code-slot"${i === 0 ? ' data-current' : ''}></span>`).join('');
      return `<div data-phone-step="code"><div class="field">
        <div class="code-field">
          <div class="code-entry">
            <div class="code-slots" aria-hidden="true">${slots}</div>
            <input id="phone-code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" aria-label="인증번호 6자리" aria-describedby="code-hint" required>
          </div>
          <span id="countdown" class="countdown" role="timer" aria-label="남은 유효시간">${remaining()}</span>
        </div>
        </div>${error('code')}</div>
        <button class="btn" type="submit" disabled>휴대폰 인증하기</button>
        <button type="button" class="other-methods-link" data-action="request-code"${S.sms.attempts >= 3 ? ' disabled' : ''}>인증번호 다시받기${chevron()}</button>`;
    }
    const p = {...S.phone, phone:S.phone.phone ?? demoIncomingPhone};
    const errors = phoneErrors(p);
    const ready = phoneReady(errors);
    const phoneVisible = !errors.carrier || S.sms.attempts >= 3;
    const consent = `<button type="button" name="consent" class="phone-consent" role="checkbox" aria-checked="${!!p.consent}" aria-haspopup="dialog" aria-controls="sheet" data-action="terms">
      <span class="consent-mark" aria-hidden="true">${icon('check')}</span><span>[필수] 본인확인 이용약관 동의</span>${chevron()}</button>`;
    const group = (name, visible, contents) =>
      `<div data-phone-step="${name}"${visible ? '' : ' hidden'}>${contents}${error(name)}</div>`;
    const birth = `<div class="field"><span class="field-label">생년월일·주민번호 뒤 첫 자리</span>
      <div class="resident"><input name="birth" aria-label="생년월일 6자리" inputmode="numeric" maxlength="6" required placeholder="900101" value="${E(p.birth||'')}"><span>–</span>
      <input name="gender" aria-label="주민번호 뒤 첫 자리" inputmode="numeric" maxlength="1" required value="${E(p.gender||'')}" placeholder="1"><span class="masked" aria-hidden="true">••••••</span></div></div>`;
    return `${group('name', true, field('name','이름',{value:p.name||'',placeholder:'김키움',maxlength:20}))}
      ${group('birth', !errors.name || p.birth, birth + error('gender'))}
      ${group('carrier', (!errors.birth && !errors.gender) || p.carrier, field('carrier','통신사',{value:p.carrier||'',options:carriers}))}
      ${group('phone', phoneVisible, field('phone','휴대폰 번호',{value:p.phone,placeholder:'숫자 11자리',inputmode:'numeric',maxlength:11}))}
      ${group('consent', phoneVisible && !ready && (!errors.phone || p.consent), consent)}
      <div data-phone-lock class="form-error phone-field-error"${S.sms.attempts >= 3 ? '' : ' hidden'}>${E(phoneLockMessage)}</div>
      <button class="btn" type="submit"${ready ? '' : ' disabled'}${phoneVisible ? '' : ' hidden'}>인증번호 요청하기</button>`;
  }
  function remaining(){const seconds=Math.max(0,180-Math.floor((Date.now()-S.sms.issued)/1000));return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
  function amountCard(title,amount,items=[]){return `<div class="detail-card"><h2>${E(title)}</h2><p class="number-large">${E(amount)}<span>원</span></p>${facts(items)}</div>`;}
  const identityKinds = {name:'이름', resident:'주민등록번호', both:'이름·주민등록번호'};
  const hasNameChange = kind => kind === 'name' || kind === 'both';
  function currentIdentityKind() {
    const {stage} = route();
    if (stage) return Object.hasOwn(identityKinds, stage) ? stage : null;
    const kind = history.state?.identityKind;
    return Object.hasOwn(identityKinds, kind) ? kind : 'name';
  }
  function selectIdentityKind(kind) {
    const active = currentIdentityKind();
    if (current()?.id !== 'name-change' || D.authStep('name-change', S.auth) || !selectedAccount()?.verified ||
        !active || kind === active || !Object.hasOwn(identityKinds, kind)) return;
    if (S.drafts['name-change']?.change !== kind) delete S.drafts['name-change'];
    delete S.outcomes['name-change'];
    const y = V.scrollY;
    history.replaceState({identityKind:kind}, '', '#/service/name-change');
    render();
    V.scrollTo(0, y);
    app.querySelector('.identity-kind-options input:checked')?.focus({preventScroll:true});
  }
  function canRequestIdentityLink(account, kind) {
    return account?.verified && Object.hasOwn(identityKinds, kind) &&
      (kind === 'resident' || (account.kycComplete === true && account.returned === false));
  }
  function identityChecks(account) {
    const items = [
      ['고객확인(KYC)', account.kycComplete ? '수행 완료' : '미수행'],
      ['반송계좌 여부', account.returned ? '반송계좌' : '반송계좌 아님']
    ];
    return `<section class="detail-card"><h2>조회 계좌 상태</h2>${facts(items)}</section>`;
  }
  function identityRemedies(account) {
    const action = (text, reason, destination) => btn(text,'identity-remedy',
      `data-reason="${reason}" data-channel="${destination}" aria-haspopup="dialog"`, 'secondary');
    let content = '';
    if (!account.kycComplete) {
      content += `${callout('개명을 신청하려면 먼저 영웅문S#에서 고객확인정보를 등록해 주세요.')}
        ${action('영웅문S#에서 고객확인정보 등록하기','kyc','app')}`;
    }
    if (account.returned) {
      content += `${callout('반송계좌를 해지한 뒤 개명을 신청할 수 있습니다.')}
        ${action('영웅문S#에서 반송계좌 해지하기','returned','app')}
        ${action('상담원에게 반송계좌 해지 요청하기','returned','staff')}`;
    }
    return content;
  }
  function identityNameFields(draft) {
    const options = [['Y','예 (Y)'], ['N','아니요 (N)']];
    return `${field('oldname','개명 전 이름',{value:draft.oldname || '',maxlength:20})}
      ${field('newname','개명 후 이름',{value:draft.newname || '',maxlength:20})}
      <fieldset class="certificate-segment"><legend class="field-label">미인가 신청 여부</legend>
        <div>${options.map(([value,text])=>`<label><input type="radio" name="unapproved" value="${value}" ${draft.unapproved === value ? 'checked' : ''}><span>${text}</span></label>`).join('')}</div>
      </fieldset>
      <div id="sign-consent" ${draft.unapproved === 'Y' ? '' : 'hidden'}>
        ${check('signConsent','[필수] 사인코리아 정보제공 동의',draft.unapproved === 'Y' && draft.signConsent)}
      </div>`;
  }
  function identityChangePage(service, stage) {
    const account = selectedAccount();
    const outcome = S.outcomes[service.id];
    if (stage === 'link' && outcome?.linkIssued && canRequestIdentityLink(account, outcome.change)) {
      return documentLinkResult(service, digitalFormURL('rename', outcome.change));
    }
    // A link result may be opened again after its session data has been cleared.
    if (!currentIdentityKind()) history.replaceState(null, '', '#/service/name-change');
    const kind = currentIdentityKind();
    const title = kind === 'both' ? '이름과 주민등록번호 변경' : identityKinds[kind] + ' 변경';
    const changesName = hasNameChange(kind);
    const checks = account?.verified && changesName ? identityChecks(account) : '';
    const draft = S.drafts[service.id]?.change === kind ? S.drafts[service.id] : {};
    const task = window.getIdentityChangeTask(kind);
    const documents = task.groups[0].documents.map(doc => `<li>${E(doc.title)}</li>`).join('');
    const body = canRequestIdentityLink(account, kind) ? `
      <form id="work-form" data-id="${service.id}" novalidate>
        <input type="hidden" name="change" value="${kind}">
        ${changesName ? identityNameFields(draft) : ''}
        <section class="detail-card identity-documents" aria-labelledby="identity-documents-title">
          <h2 id="identity-documents-title">필요 서류</h2>
          <p class="hint">알림톡으로 받은 URL에서 아래 서류를 제출해 주세요.</p>
          <ul class="checklist">${documents}</ul></section>
        <button type="submit" class="btn">서류 제출 URL 받기</button>
      </form>` : account?.verified ? identityRemedies(account) : '';
    const choices = Object.entries(identityKinds).map(([value,label])=>`
      <label><input type="radio" name="identity-kind" value="${value}"${kind === value ? ' checked' : ''}><span>${E(label)}</span></label>`).join('');
    const assistance = changesName && account?.returned ? '' : `<div class="work-actions">${otherMethodsLink(service)}</div>`;
    return `${top(title)}${currentAccountCard()}<main id="main" class="content identity-change">
      <fieldset class="certificate-segment identity-kind-options">
        <legend class="field-label">변경 항목</legend><div>${choices}</div>
      </fieldset>
      ${checks}${body}${assistance}</main>`;
  }
  function requestIdentityLink(service, form) {
    const kind = currentIdentityKind();
    if (!canRequestIdentityLink(selectedAccount(), kind)) return;
    clearError(form);
    captureDraft(form);
    const draft = S.drafts[service.id];
    if (draft.change !== kind) return;
    if (hasNameChange(kind)) {
      for (const [key, label] of [['oldname','개명 전 이름'], ['newname','개명 후 이름']]) {
        if (!validCustomerName((draft[key] || '').trim())) {
          showError(label + '을 한글 또는 영문으로 두 글자 이상 입력해 주세요.', key, form);
          return;
        }
      }
      if (draft.newname.trim() === draft.oldname.trim()) {
        showError('개명 전 이름과 같습니다. 개명 후 이름을 확인해 주세요.', 'newname', form); return;
      }
      if (!['Y','N'].includes(draft.unapproved)) {
        showError('미인가 신청 여부를 선택해 주세요.', 'unapproved', form); return;
      }
      if (draft.unapproved === 'Y' && !draft.signConsent) {
        showError('사인코리아 정보제공에 동의해 주세요.', 'signConsent', form); return;
      }
    }
    S.outcomes[service.id] = {linkIssued:true, change:kind};
    go(`service/${service.id}/link`);
  }
  function formBody(s){const d=S.drafts[s.id]||{};switch(s.kind||s.id){
    case 'cdd':return `${field('occupation','직업',{options:['직장인','개인사업자','학생','주부','기타']})}${field('purpose','거래 목적',{options:['저축 및 투자','생활자금 관리','기타']})}${field('source','자금 원천',{options:['근로소득','사업소득','금융소득','상속·증여','기타']})}${field('residence','거주 국가',{options:['대한민국','그 외 국가']})}${field('address','주소',{placeholder:'주소를 입력해 주세요',maxlength:120})}${check('agree','입력한 고객확인정보가 정확함을 확인했습니다.',d.agree)}`;
    case 'mistake':return `${callout('반환 신청 접수 후 사실관계 확인이 필요합니다. 접수가 반환 완료를 뜻하지 않습니다.','warning')}${field('transaction','송금 내역',{options:['2026.11.10 · 국민은행 · 300,000원','2026.11.09 · 국민은행 · 100,000원']})}${field('amount','반환 요청 금액',{inputmode:'numeric',placeholder:'원 단위 입력',hint:'선택한 송금액 이내로 입력해 주세요.'})}${field('reason','신청 사유',{options:['계좌번호 착오','금액 착오','중복 송금']})}${check('agree','신청 내역과 반환 절차를 확인했습니다.',d.agree)}`;
    case 'certificate':return certificateFields(s,d);
    case 'extension':return `<div class="detail-card"><div class="card-top"><h2>신용융자</h2><span class="status-badge">연장 가능</span></div>${facts([['대출금액','1,000,000원'],['현재 만기일','2026.11.20'],['연장 후 만기일','2027.02.18']])}</div>${demoNote('실제 연장 가능 여부·기간·금리는 심사와 거래 조건 확인이 필요합니다. 위 정보는 화면 확인용 가상값입니다.')}${check('agree','연장 내용을 확인했습니다.',d.agree)}`;
    case 'repayment':return `${amountCard('상환 가능 금액','1,000,000',[['예수금','1,500,000원'],['대출 잔액','1,000,000원']])}${field('amount','상환 금액',{inputmode:'numeric',placeholder:'상환할 금액을 입력해 주세요',hint:'상환 가능 금액 이내로 입력해 주세요.'})}<button type="button" class="text-button" data-action="full-amount">전액 입력하기</button>${check('agree','상환 금액과 계좌 정보를 확인했습니다.',d.agree)}`;
    default:return '';
  }}
  const actionLabels={cdd:'고객정보 등록하기',mistake:'반환 신청하기',certificate:'증명서 신청하기',extension:'만기 연장하기',repayment:'현금 상환하기'};
  function workForm(s){return `<form id="work-form" data-id="${s.id}" novalidate>${formBody(s)}<button class="btn" type="submit">${s.kind === 'certificate' ? '증명서 신청하기' : '입력 내용 확인하기'}</button></form>`;}
  function historyRecords(type){return S.records.filter(x=>x.accountId===S.selectedAccount&&(x.family||x.type)===type);}
  function certificateCatalog() {
    const links = certificates.catalog.map(id => {
      const service = D.service(id);
      return `<button class="list-row" data-action="certificate-options" data-id="${id}" aria-haspopup="dialog"><span>${E(service.label)}</span>${chevron()}</button>`;
    });
    return `${top(groupName('papers'))}<main id="main" class="content with-actions certificate-catalog">
      <p class="lead">신청할 증명서를 선택해 주세요.</p>
      <div class="page-list">${links.slice(0,3).join('')}</div>
      <details class="certificate-more"><summary>기타 서류 <span class="when-closed">더보기</span><span class="when-open">접기</span>${icon('down')}</summary>
        <div class="page-list">${links.slice(3).join('')}</div>
      </details></main>${sticky(btn('증명서 신청내역 보기','service','data-id="certificate-history"','secondary'))}`;
  }
  function certificateFields(service, draft) {
    const controls = certificates.activeFields(service.id, draft).map(spec => {
      const name = spec.name;
      const value = name === 'email' ? profileEmail : draft[name] ?? spec.initial ?? '';
      if (spec.choices) return `<fieldset class="certificate-segment"><legend class="field-label">${E(spec.label)}</legend>
        <div>${spec.choices.map(option => `<label><input type="radio" name="${name}" value="${E(option)}" ${value === option ? 'checked' : ''}><span>${E(option)}</span></label>`).join('')}</div></fieldset>`;
      const control = field(name, spec.label + (spec.unit ? ' (' + spec.unit + ')' : ''), {...spec, value});
      return name === 'purposeDetail' ? `<div class="certificate-purpose-detail">${control}</div>` : control;
    });
    const notice = service.id === 'certificate-withholding' ? ' 주민등록번호를 기준으로 신청합니다.' : '';
    return `<p class="lead">등록된 이메일로 증명서를 받습니다.${notice}</p>
      <input type="hidden" name="document" value="${E(service.label)}">${controls.join('')}`;
  }
  function updateCertificateFields(service, changed) {
    if (changed.name === 'purpose') {
      const group = changed.closest('.field');
      const detail = group.nextElementSibling;
      if (changed.value === '기타' && !detail?.classList.contains('certificate-purpose-detail')) {
        const spec = certificates.activeFields(service.id, {purpose:'기타'}).find(entry => entry.name === 'purposeDetail');
        group.insertAdjacentHTML('afterend', `<div class="certificate-purpose-detail">${field(spec.name, spec.label, spec)}</div>`);
      } else if (changed.value !== '기타' && detail?.classList.contains('certificate-purpose-detail')) {
        detail.remove();
        delete S.drafts[service.id].purposeDetail;
      }
    }
    if (changed.name === 'language') {
      const input = changed.form.elements.englishName;
      input.required = changed.value === '영문';
      input.closest('.field').querySelector('.field-label').textContent = input.required ? '영문명' : '영문명 (선택)';
    }
  }
  function certificateHistory() {
    const stage = route().stage;
    const records = stage === 'empty' ? [] : historyRecords('certificate').reverse();
    if (stage === 'sample' && !records.length) {
      records.push({label:'잔고증명서', number:'20261123-0001', items:[
        ['증권계좌번호',accountNumber()], ['신청 구분','국문'], ['신청 매수','1매'], ['이메일 주소',profileEmail]
      ]});
    }
    if (!records.length) return `<div class="empty-state">${icon('empty')}<h2>신청한 증명서가 없습니다</h2><p>이 계좌로 신청한 내역이 여기에 표시됩니다.</p></div>${btn('증명서 선택하기','choose-certificate')}`;
    const index = Math.max(0, records.findIndex(record => record.number === stage));
    const record = records[index];
    const pageButton = (label, position, symbol) => `<button type="button" class="icon-button" aria-label="${label}" data-action="certificate-receipt"
      ${records[position] ? `data-id="${E(records[position].number)}"` : 'disabled'}>${icon(symbol)}</button>`;
    return `<article class="record certificate-record"><div class="record-head"><h2>${E(record.label)}</h2><span class="status-badge success">접수 완료</span></div>
      ${facts([['접수번호',record.number], ...record.items])}</article>
      ${records.length > 1 ? `<nav class="certificate-pages" aria-label="신청내역 페이지">${pageButton('이전 신청내역',index-1,'back')}
        <span>${index+1} / ${records.length}</span>${pageButton('다음 신청내역',index+1,'chevron')}</nav>` : ''}
      ${btn('다른 증명서 신청하기','choose-certificate','','secondary')}`;
  }
  function certificateResult(service) {
    const result = S.outcomes[service.id];
    if (!result) return workPage(service);
    return `${top()}<main id="main" class="result with-actions certificate-result"><div class="result-icon">${icon('check')}</div>
      <h1>${E(service.label)} 신청 완료</h1><p>신청내역에서 접수 상태와 신청 내용을 확인할 수 있습니다.</p>
      </main>${sticky(btn('신청내역 확인하기','certificate-receipt',`data-id="${E(result.number)}"`))}`;
  }
  function recordHTML(r){return `<article class="record"><div class="record-head"><strong>${E(r.label)}</strong><span class="status-badge success">접수 완료</span></div><p>접수번호 ${E(r.number)}<br></p>${facts(r.items)}</article>`;}
  function profileAccount() {
    if (current()?.id !== 'info' || D.authStep('info', S.auth)) return null;
    return selectedAccount();
  }

  const contactChangeLabel = '고객정보 변경하기';
  function profileCards() {
    const account = profileAccount();
    if (!account) return '';
    const customerDetails = facts([
      ['휴대폰', '010-****-5678'],
      ['이메일', profileEmail],
      ['주소', '서울시 영등포구'],
      ['마케팅 수신매체', '문자메시지 · 이메일']
    ]);
    const accountRows = factRows([
      ['증권계좌번호', account.number],
      ['연결 은행계좌번호', `${account.bank} ••••• ${account.bankTail}`],
      ['아이디', account.loginId]
    ]);
    const idStatus = account.inactiveId
      ? '<span class="profile-id-inactive">장기미접속</span>'
      : '정상';
    const customerCard = `<section class="detail-card profile-card">
      <div class="card-top"><h2>김키움님의 정보</h2></div>
      ${customerDetails}
      <div class="profile-actions">
        ${btn(contactChangeLabel, 'change-contact', 'aria-haspopup="dialog"', 'secondary')}
      </div>
    </section>`;
    const certificatePrep = route().stage === 'certificate-prep';
    const accountCard = `<section class="detail-card profile-card">
      <div class="card-top"><h2>계좌 정보</h2><button type="button" class="profile-all-link" data-action="switch-account">전체계좌보기${chevron()}</button></div>
      <dl class="facts">${accountRows}
        <div><dt>아이디 상태</dt><dd>${idStatus}</dd></div>
      </dl>
      <div class="profile-actions">
        ${certificatePrep ? btn('공동인증서 재설정 안내로 돌아가기', 'service', 'data-id="password-change" data-topic="certificate"', 'secondary') : ''}
        ${account.inactiveId ? btn('아이디 장기미접속 제한풀기', 'release-id', 'aria-haspopup="dialog"', 'danger') : ''}
        ${btn('아이디 비밀번호 재설정하기', 'reset-id-password', '', 'secondary')}
      </div>
    </section>`;
    return currentAccountCard() + (certificatePrep ? accountCard + customerCard : customerCard + accountCard);
  }

  function openIdRelease() {
    const account = profileAccount();
    if (!account?.inactiveId) return;
    S.modalContext = 'release-id:' + account.id;
    showSheet('아이디 장기미접속 해제', `
      ${facts([['아이디', account.loginId], ['현재 상태', '장기미접속']])}
      <p class="sheet-description profile-prompt">이 아이디의 장기미접속 상태를 해제할까요?</p>
      <div class="sheet-actions button-row">${btn('취소하기', 'close-sheet', '', 'secondary')}${btn('해제하기', 'confirm-id-release')}</div>`);
  }

  function confirmIdRelease() {
    const account = profileAccount();
    if (!sheet.open || !account?.inactiveId || S.modalContext !== 'release-id:' + account.id) return;
    account.inactiveId = false;
    render();
    app.querySelector('[data-action="reset-id-password"]')?.focus({preventScroll:true});
    showSheet('아이디 장기미접속 해제 완료', `
      <p class="sheet-description">${E(account.loginId)} 아이디의 상태가 정상으로 변경되었습니다.</p>
      ${btn('확인하기', 'close-sheet')}`);
  }

  function idPasswordAccount() {
    if (!['info', 'password-change'].includes(current()?.id) || D.authStep('info', S.auth)) return null;
    return S.accounts.find(account => account.id === S.selectedAccount && account.verified);
  }

  function isIdResetStep(r = route()) {
    return r.page === 'service' && r.id === 'password-change' && r.stage === 'id-reset';
  }

  function startIdPasswordReset() {
    if (current()?.id !== 'password-change') return;
    if (idPasswordAccount()) { openIdPasswordReset(); return; }
    history.pushState({fromPasswordHub:true, fromPasswordScenario:history.state?.fromPasswordScenario}, '', '#/service/password-change/id-reset');
    render();
    V.scrollTo(0, 0);
  }

  function returnToPasswordHub() {
    if (history.state?.fromPasswordHub) { history.back(); return; }
    history.replaceState(null, '', '#/service/password-change');
    render();
    V.scrollTo(0, 0);
  }

  function openIdPasswordReset() {
    const account = idPasswordAccount();
    if (!account) return;
    S.modalContext = 'id-password:' + account.id;
    showSheet('아이디 비밀번호 재설정', `
      <p class="sheet-description">아이디 <strong>${E(account.loginId)}</strong></p>
      <form id="id-password-form" novalidate>
        <label class="field"><span class="field-label">새 비밀번호</span><input type="password" name="newPassword" autocomplete="new-password" required aria-describedby="id-password-rule"><small id="id-password-rule">영문 소문자와 숫자 조합 5~8자리</small></label>
        <label class="field"><span class="field-label">새 비밀번호 확인</span><input type="password" name="repeatPassword" autocomplete="new-password" required></label>
        <div class="sheet-actions button-row">${btn('취소하기', 'close-sheet', '', 'secondary')}<button type="submit" class="btn">재설정하기</button></div>
      </form>`);
  }

  function submitIdPassword(form) {
    const account = idPasswordAccount();
    if (!sheet.open || !account || S.modalContext !== 'id-password:' + account.id) return;
    clearError(form);
    const { newPassword, repeatPassword } = form.elements;
    if (!/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,8}$/.test(newPassword.value)) {
      return showError('영문 소문자와 숫자를 함께 사용해 5~8자리로 입력해 주세요.', 'newPassword', form);
    }
    if (newPassword.value !== repeatPassword.value) return showError('새 비밀번호와 확인 입력이 일치하지 않습니다.', 'repeatPassword', form);
    form.reset();
    S.modalContext = null;
    showSheet('아이디 비밀번호 재설정 완료', `
      <p class="sheet-description">아이디 <strong>${E(account.loginId)}</strong></p>
      ${btn('확인하기', 'close-sheet')}`);
  }

  const withdrawalIssues = {
    trading: {
      title: '단기간 다수계좌 개설', status: '거래중지',
      reason: '짧은 기간에 여러 계좌가 개설되어 출금이 제한되었습니다.',
      method: '금융거래목적확인서를 등록하면 이 제한이 해제됩니다.'
    },
    dormant: {
      title: '장기미사용', status: '거래중지',
      reason: '오랫동안 거래하지 않아 계좌의 출금이 제한되었습니다.',
      method: '금융거래목적확인서를 등록하면 장기미사용 제한이 해제됩니다.'
    },
    limit: {
      title: '이체한도 제한', status: '한도 제한',
      reason: '이체한도가 적용되어 한도를 초과한 금액을 출금할 수 없습니다.',
      method: '영웅문S#에서 해제에 필요한 서류를 확인하고 제출합니다.',
      action: '영웅문S#에서 해제하기'
    },
    identity: {
      title: '신분증 진위 미확인', status: '확인 필요',
      reason: '등록한 신분증의 진위를 확인하지 못해 거래가 제한되었습니다.',
      method: '재촬영 URL에서 신분증을 다시 제출해 주세요. 진위확인이 완료되면 이 제한이 해제됩니다.',
      action: '신분증 재촬영 URL 받기'
    }
  };
  const accountIssues = {
    '12345678': ['trading', 'identity'],
    '87654321': ['dormant'],
    '24681357': ['limit']
  };
  function hasWithdrawalIssue(id) {
    return (accountIssues[S.selectedAccount] || []).includes(id) && !S.unlocked.has(id);
  }
  const purposeRegistrationLabel = '금융거래목적확인서 등록하기';
  const dormantPurpose = '장기미사용 거래중지계좌';
  const tradingPurposes = ['금융투자상품 거래', '자산 관리'];
  const purposesFor = id => id === 'dormant' ? [dormantPurpose, ...tradingPurposes] : tradingPurposes;
  const identityHelpTitle = '왜 진위확인이 되지 않았나요?';
  function canResolveWithdrawalIssue(id) {
    const {page, id:serviceId, stage} = route();
    return page === 'service' && !stage && (serviceId === 'withdrawal-status' || serviceId === id) &&
      !D.authStep(serviceId, S.auth) && hasWithdrawalIssue(id);
  }
  function purposeQuestion(name, question, description = '') {
    const answers = ['예', '아니오'].map(value => `<label><input type="radio" name="${name}" value="${value}"><span>${value}</span></label>`).join('');
    return `<details class="purpose-question" open>
      <summary><span id="purpose-${name}">${E(question)}</span>${icon('down', 'chevron')}</summary>
      ${description ? `<p>${E(description)}</p>` : ''}
      <fieldset class="purpose-answers" aria-labelledby="purpose-${name}">${answers}</fieldset>
    </details>`;
  }
  function openPurposeRegistration(id) {
    if (!['dormant', 'trading'].includes(id) || !canResolveWithdrawalIssue(id)) return;
    S.modalContext = {purposeIssue:id, account:S.selectedAccount};
    showSheet('금융거래목적확인서 등록', `<form id="withdrawal-purpose-form" novalidate>
      <p class="sheet-description">조회 계좌 ${E(accountNumber())}의 거래 목적과 아래 항목을 확인해 주세요.</p>
      ${field('purpose','금융거래목적',{value:id === 'dormant' ? dormantPurpose : '', options:purposesFor(id)})}
      <div class="purpose-questions">
        ${purposeQuestion('rental', '타인으로부터 통장대여 요청을 받은 사실이 있습니까?',
          '타인에게 양도한 통장이나 현금카드가 범죄에 이용되면 미성년자도 민형사상 책임을 질 수 있습니다.')}
        ${purposeQuestion('loan', '타인으로부터 신용등급의 상향, 대출 등의 목적으로 통장개설을 요청받은 사실이 있습니까?')}
      </div>
      ${check('confirmed', '본 확인서 내용을 충분히 이해하고 틀림없이 기재하였습니다.')}
      <div class="sheet-actions button-row">
        ${btn('취소하기','close-sheet','','secondary')}<button class="btn" type="submit" disabled>등록하기</button>
      </div>
    </form>`, {focusTitle:true});
  }
  function canRegisterPurpose(form, id) {
    const {purpose, rental, loan, confirmed} = form.elements;
    return purposesFor(id).includes(purpose.value) && rental.value === '아니오' &&
      loan.value === '아니오' && confirmed.checked;
  }
  function showWithdrawalIdentityHelp() {
    if (!canResolveWithdrawalIssue('identity')) return;
    showSheet(identityHelpTitle, `<ul class="notice-list identity-verification-list">
      <li>신분증 사진이 흐리거나 어두우면 정보가 식별되지 않아 진위를 확인할 수 없습니다.</li>
      <li>재촬영 안내 문자가 이미 도착했을 수 있으니 받은 메시지를 확인해 주세요.</li>
      <li>재촬영 URL에서 신분증을 다시 제출해 주세요. 진위확인이 완료되면 알림톡으로 결과를 안내합니다.</li>
    </ul>`, {focusTitle:true});
  }
  function requestWithdrawalIdentityLink() {
    const account = selectedAccount();
    if (!account || account.identityLinkSent || !canResolveWithdrawalIssue('identity')) return;
    account.identityLinkSent = true;
    render();
    showSheet('신분증 재촬영 URL 알림톡 발송이 완료되었습니다', `
      <p class="sheet-description">알림톡의 링크를 열어 신분증을 다시 촬영해 주세요. 직원이 접수 순서대로 신분증의 진위를 확인합니다.</p>
      <p class="sheet-description">직원의 진위 확인이 완료되면 제한이 해제됩니다. 처리가 완료되면 알림톡으로 알려드립니다.</p>
      <p class="sheet-description">예상 처리 시간은 <strong>영업일 기준 1일 이내</strong>입니다.</p>
      ${btn('확인하기','close-sheet')}
      ${demoNote('알림톡 발송 완료를 재현한 화면입니다.')}`, {focusTitle:true});
    S.returnFocus = document.getElementById('withdrawal-result-identity');
  }
  function withdrawalStatus() {
    const issues = accountIssues[S.selectedAccount] || [];
    if (!issues.length) {
      return callout('이 계좌에는 조회된 출금정지 사유가 없습니다.', 'success');
    }
    const remaining = issues.filter(hasWithdrawalIssue).length;
    const identityLinkSent = selectedAccount()?.identityLinkSent;
    const cards = issues.map(id => {
      const issue = withdrawalIssues[id];
      const resolved = S.unlocked.has(id);
      const result = resolved ? '처리완료' : id === 'identity' && identityLinkSent ? 'URL 발송완료' : '';
      const dialog = 'aria-haspopup="dialog" aria-controls="sheet"';
      const help = id === 'identity' ? `<button type="button" class="withdrawal-help" data-action="withdrawal-identity-help" ${dialog}>
        ${icon('help')}<span>${identityHelpTitle}</span></button>` : '';
      let action;
      if (id === 'identity') action = btn(issue.action, 'request-identity-link', dialog, 'secondary');
      else if (id === 'limit') action = btn(issue.action, 'channel', `data-id="${id}" data-channel="app" ${dialog}`, 'secondary');
      else action = btn(purposeRegistrationLabel, 'unlock', `data-id="${id}" ${dialog}`, 'secondary');
      return `<article class="detail-card withdrawal-issue"${result ? ` aria-label="${E(issue.title)}"` : ''}>
        <div class="withdrawal-issue-content"${result ? ' inert' : ''}>
          <div class="card-top"><h2>${E(issue.title)}</h2><span class="status-badge withdrawal-status-badge">${E(issue.status)}</span></div>
          <p>${E(issue.reason)}</p><h3><mark class="withdrawal-method-highlight">해제 방법</mark></h3>
          <p>${E(issue.method)}</p>${help}${action}</div>
        ${result ? `<div class="withdrawal-issue-overlay"><div class="withdrawal-issue-result" id="withdrawal-result-${E(id)}" role="status" tabindex="-1">${resolved ? icon('check') : ''}<strong>${E(result)}</strong></div></div>` : ''}
      </article>`;
    });
    return `<p class="lead">이 계좌에 남아 있는 출금정지 사유는 <strong class="withdrawal-count" aria-live="polite">${remaining}건</strong>입니다.</p>${cards.join('')}${demoNote('출금정지 사유와 처리 결과는 선택한 시연 계좌의 예시입니다. 실제 계좌 상태를 조회하지 않습니다.')}`;
  }
  function showWithdrawalResolution(id) {
    const previousCount = app.querySelector('.withdrawal-count')?.textContent;
    render();
    const result = document.getElementById(`withdrawal-result-${id}`);
    if (!result) return;
    result.focus({preventScroll:true});
    result.classList.add('is-animating');
    const animations = result.getAnimations?.({subtree:true}) || [];
    if (!animations.length) return;
    const count = app.querySelector('.withdrawal-count');
    const remaining = count.textContent;
    count.textContent = previousCount;
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (count.isConnected) count.textContent = remaining;
    });
  }
  function withdrawalDetail(service) {
    const id = service.id;
    if (!hasWithdrawalIssue(id)) {
      return `${callout(`이 계좌에는 ${withdrawalIssues[id].title}에 따른 제한이 없습니다.`, 'success')}${btn('출금정지 사유 확인하기', 'service', 'data-id="withdrawal-status"', 'outline')}`;
    }
    const issue = withdrawalIssues[id];
    const action = id === 'limit'
      ? btn('영웅문S#에서 한도 제한 해제하기', 'channel', 'data-id="limit" data-channel="app"')
      : btn(purposeRegistrationLabel, 'unlock', `data-id="${id}" aria-haspopup="dialog" aria-controls="sheet"`);
    return `<p class="lead">${E(issue.reason)}</p><div class="detail-card"><div class="card-top"><h2>현재 계좌 상태</h2><span class="status-badge warning">${E(issue.status)}</span></div>
      <p>${E(issue.method)}</p></div>${action}${demoNote('실제 해제 요건은 계좌 상태에 따라 달라집니다. 시연에서 등록한 거래 목적은 전송하지 않습니다.')}`;
  }
  function workBody(s){if(actionLabels[s.kind||s.id])return workForm(s);switch(s.id){
    case 'resume':
      return `<p class="lead">진행 중인 계좌개설 신청을 확인합니다.</p><article class="record"><div class="record-head"><strong>종합계좌 개설</strong><span class="status-badge">진행 중</span></div>
        ${facts([['신청일','2026.11.10'],['현재 단계','신분증 확인'],['남은 절차','본인확인 · 계좌정보 입력']])}
        <p>계좌개설앱에서 절차를 이어갑니다.</p>${demoNote('신청내역의 고객·상태·처리 결과는 가상값입니다.')}
        ${btn('계좌개설앱으로 이동하기','channel',`data-id="${s.id}" data-channel="opening"`,'secondary')}</article>`;
    case 'applications':
      return `<p class="lead">비대면 신청의 처리 상태를 확인합니다.</p>
        ${S.records.filter(x=>!['certificate','repayment','extension','password'].includes(x.family||x.type)).map(recordHTML).join('')}
        <article class="record"><div class="record-head"><strong>ISA 가입 서류 확인</strong><span class="status-badge warning">보완 필요</span></div>
        ${facts([['신청일','2026.11.10'],['보완 내용','첨부서류 확인 필요']])}
        ${demoNote('신청내역은 가상값입니다. 실제 보완 요건은 신청 내용에 따라 확인합니다.')}
        ${btn('보완서류 제출하기','supplement','','secondary')}</article>`;
    case 'certificate-history':return certificateHistory();
    case 'outbound':return `<div class="empty-state">${icon('empty')}<h2>출고 신청내역이 없습니다</h2><p>현재 계좌에는 주식 출고 내역이 없습니다.<br>궁금한 내용은 상담원에게 문의해 주세요.</p></div>`;
    case 'withdrawal-status': return withdrawalStatus();
    case 'dormant': case 'limit': case 'trading': return withdrawalDetail(s);
    case 'unpaid':return `<p class="lead">미수금과 입금 필요 금액을 확인합니다.</p>${amountCard('미수금','150,000',[['계좌',accountNumber()],['조회 기준','현재 계좌 정보'],['처리 상태','입금 필요']])}${callout('실제 미수금·상환기한·반대매매 여부는 거래내역 확인이 필요합니다. 자세한 내용은 영웅문S# 또는 상담원에게 확인해 주세요.','warning')}`;
    case 'otp':return `<p class="lead">계좌에 등록된 실물 OTP 정보입니다.</p><div class="detail-card"><div class="card-top"><h2>실물 OTP</h2><span class="status-badge success">이용 가능</span></div>${facts([['제조사','보안매체'],['일련번호','****1234'],['등록일','2025.03.12'],['상태','정상']])}</div>${callout('OTP를 분실한 경우 사고 접수 후 사용 정지 여부를 확인해 주세요.')}${btn('OTP 사고 안내','service','data-id="otp-loss"','outline')}`;
    default:return '';
  }}
  function workPage(s) {
    if (s.id === 'info') {
      return `${top(s.label)}<main id="main" class="content profile-page">
        <div class="profile-overview">${profileCards()}</div>
        <div class="work-actions">${staffContactLink(s)}</div>
      </main>${footerNote()}`;
    }
    const footerAction = s.id === 'withdrawal-status' ? staffContactLink(s) : s.channels.length ? otherMethodsLink(s) : '';
    return `${top(s.label)}${s.level === 3 ? currentAccountCard() : ''}
      <main id="main" class="content">${workBody(s)}
        ${footerAction ? `<div class="work-actions">${footerAction}</div>` : ''}
      </main>${footerNote()}`;
  }
  function reviewPage(s){if(!S.review||S.review.id!==s.id)return workPage(s);return `${top(s.label)}${currentAccountCard()}<main id="main" class="content with-actions"><p class="lead">신청할 내용을 확인해 주세요.</p><div class="detail-card">${facts(S.review.items)}</div>${demoNote('시연 확인 버튼을 누르면 가상 접수 결과가 표시됩니다. 실제 신청이나 거래는 이루어지지 않습니다.')}<button class="text-button" data-action="edit-work">입력 내용 수정하기</button></main>${sticky(btn(actionLabels[s.kind||s.id]||'확인하기','confirm-work',`data-id="${s.id}"`))}`;}
  function resultPage(s){const r=S.outcomes[s.id];if(!r)return workPage(s);return `${top(s.label)}<main id="main" class="result"><div class="result-icon">${icon('check')}</div><h2>${E(r.title)}</h2>${r.description?`<p>${E(r.description)}</p>`:''}<div class="detail-card">${facts([...(r.number?[['접수번호',r.number]]:[]),...r.items])}</div>${r.history?btn('신청내역 확인하기','service',`data-id="${r.history}"`):''}${btn('홈으로 이동하기','home','',r.history?'secondary':'')}</main>${footerNote()}`;}
  function emptyPage(s){const labels={resume:'진행 중인 계좌개설 신청이 없습니다',applications:'비대면 신청내역이 없습니다',unpaid:'조회된 미수금이 없습니다',otp:'등록된 실물 OTP가 없습니다'};return `${top(s.label)}<main id="main" class="content"><div class="empty-state">${icon('empty')}<h2>${labels[s.id]||'조회된 내역이 없습니다'}</h2><p>다른 업무를 선택하거나 다시 조회해 주세요.</p></div>${btn('다시 조회하기','refresh-result')}${support(s)}</main>${footerNote()}`;}
  function endedPage() {
    const message = S.endReason === 'staff' ? '인증·입력 정보는 초기화되었습니다.' :
      '인증·입력 정보는 초기화되었습니다. 앱으로 자동 전달되지 않으며, 앱에서 진행한 업무가 이 화면으로 돌아오지 않습니다.';
    return `${top()}<main id="main" class="result"><div class="result-icon">${icon('check')}</div><h1 tabindex="-1">디지털 ARS가 종료되었습니다</h1>${callout(message)}${btn('홈으로 이동하기','restart')}</main>${footerNote()}`;
  }
  const isaDocumentTitle = 'ISA 서민형 서류제출';
  const isaCancelledStatus = '신청취소';
  const documentScenarios = {
    isa: {ready:'신규 가입', extension:'만기 연장', transfer:'계좌 이전', missing:'신청내역 없음', complete:'서류 제출 완료'},
    trading: {ready:'서류 제출 대상', missing:'등록 신청 전', ineligible:'거래 불가'}
  };
  function digitalFormURL(task, change) {
    const params = [];
    if (task) params.push('task=' + encodeURIComponent(task));
    if (task === 'rename' && window.getIdentityChangeTask(change)) params.push('change=' + encodeURIComponent(change));
    if (S.large) params.push('large=1');
    return 'digital-form.html' + (params.length ? '?' + params.join('&') : '');
  }
  function currentDocumentScenario(s) { return S.drafts[s.id]?.scenario || 'ready'; }
  function documentScenarioOptions(s) {
    if (!s.formTask) return null;
    if (s.formTask === 'isa') return documentScenarios.isa;
    return s.formTask === 'supplement' ? null : documentScenarios.trading;
  }
  const historyOptions = {ready:'신청내역 있음', empty:'신청내역 없음'};
  const lookupOptions = {
    resume:historyOptions, applications:historyOptions,
    unpaid:{ready:'미수금 있음', empty:'미수금 없음'}, otp:{ready:'등록 내역 있음', empty:'등록 내역 없음'}
  };
  function resultToolOptions(r) {
    const s = r.page === 'service' && D.service(r.id);
    if (!s || S.endReason || D.authStep(s.id, S.auth)) return null;
    const documentOptions = documentScenarioOptions(s);
    if (documentOptions && (!r.stage || r.stage === 'link')) {
      return {title:'서류 제출 조회 결과', options:documentOptions, selected:currentDocumentScenario(s)};
    }
    if (s.id === 'certificate-history') {
      const records = historyRecords('certificate');
      if (r.stage && !['empty','sample'].includes(r.stage) && !records.some(record => record.number === r.stage)) return null;
      const empty = r.stage === 'empty' || (r.stage !== 'sample' && !records.length);
      return {title:'증명서 신청내역', options:historyOptions, selected:empty ? 'empty' : 'ready'};
    }
    if (lookupOptions[s.id] && (!r.stage || r.stage === 'empty')) {
      return {title:'조회 결과', options:lookupOptions[s.id], selected:r.stage === 'empty' ? 'empty' : 'ready'};
    }
    if (!r.stage && withdrawalIssues[s.id] && hasWithdrawalIssue(s.id)) {
      return {title:'해제 가능 여부', options:{ineligible:'해제 불가 안내 보기'}};
    }
    return null;
  }
  function updateResultTools(r) {
    const panel = document.getElementById('demo-result-tools');
    if (!panel) return;
    const tools = resultToolOptions(r);
    panel.hidden = !tools;
    if (!tools) { panel.replaceChildren(); return; }
    panel.innerHTML = `<h3 id="demo-result-title">${E(tools.title)}</h3><div class="console-options" role="group" aria-labelledby="demo-result-title">${Object.entries(tools.options).map(([key,label]) =>
      `<button type="button" data-action="preview-result" data-id="${E(r.id)}" data-scenario="${key}"${tools.selected ? ` aria-pressed="${tools.selected === key}"` : ' aria-haspopup="dialog"'}>${E(label)}</button>`).join('')}</div>`;
  }
  function previewResult(id, key) {
    const r = route(), tools = resultToolOptions(r);
    if (r.id !== id || !tools || !Object.hasOwn(tools.options,key) || sheet.open) return;
    if (key === tools.selected) return;
    if (withdrawalIssues[id] && key === 'ineligible') {
      showSheet('해제 가능 여부 안내',`<p class="sheet-description">추가 확인이 필요해 바로 해제할 수 없습니다. 제한 사유와 필요서류를 상담원에게 확인해 주세요.</p>${btn('상담원 연결하기','channel',`data-id="${id}" data-channel="staff"`)}${btn('확인하기','close-sheet','','secondary')}`);
      return;
    }
    let stage = '';
    if (D.service(id).kind === 'documents') {
      S.drafts[id] = {...S.drafts[id], scenario:key};
      delete S.outcomes[id];
    } else if (key === 'empty') stage = '/empty';
    else if (id === 'certificate-history' && !historyRecords('certificate').length) stage = '/sample';
    history.replaceState(history.state,'',`#/service/${id}${stage}`);
    render();
    V.scrollTo(0,0);
    document.querySelector('#demo-result-tools [aria-pressed="true"]')?.focus({preventScroll:true});
  }
  function documentLookup(s, scenario) {
    if (s.formTask === 'isa') {
      const results = {
        ready: {
          title:'ISA 신규가입 신청내역', status:isaCancelledStatus,
          text:'서민형 가입 자격을 확인할 소득증빙서류를 제출해 주세요.',
          items:[['신청일','2026.11.23'], ['가입 유형','서민형']]
        },
        extension: {
          title:'ISA 만기연장 신청내역',
          items:[['가입 유형','서민형'], ['현재 만기일','2026.12.02'], ['연장 후 만기일','2029.12.02']]
        },
        transfer: {
          title:'ISA 계좌이전 신청내역',
          items:[['이전 신청일','2026.09.02'], ['이전 상태','처리 중'], ['이전 의사 확인 방법','전화 통화']]
        },
        complete: {
          title:'ISA 신규가입 신청내역', status:'적격',
          items:[['가입 유형','서민형'], ['소득증빙서류','제출 완료']]
        },
        missing: {
          title:'ISA 가입·이전 신청내역이 없습니다',
          text:'ISA 가입이나 계좌이전은 영웅문S# 또는 키움증권 홈페이지에서 신청할 수 있습니다.'
        }
      };
      const key = Object.hasOwn(results, scenario) ? scenario : 'ready';
      const result = results[key];
      return {...result, canRequest:key === 'ready' && result.status === isaCancelledStatus};
    }
    if (s.formTask === 'supplement') return {title:'ISA 보완서류 요청', text:'신청내역에서 안내받은 서류를 준비해 주세요.', items:[['보완할 서류','ISA 가입용 소득확인증명서'], ['보완 사유','기존 서류의 발급번호 확인 필요']], canRequest:true};
    const etp = s.formTask === 'leverage';
    const task = etp ? '레버리지 ETP' : s.formTask === 'domestic-futures' ? '국내선물옵션' : '해외선물옵션';
    if (scenario === 'ineligible') return {title:`${task} 거래 제한`, text:'현재 계좌는 등록 대상에 해당하지 않습니다. 상담원에게 계좌 상태를 확인할 수 있습니다.', help:true};
    if (scenario === 'missing') return {title:`${task} 등록 신청내역이 없습니다`, text:etp ? '영웅문S#에서 거래 등록을 먼저 신청해 주세요.' : '홈페이지 또는 영웅문4에서 파생상품 적격투자자 등록을 먼저 신청해 주세요.', help:!etp, app:etp};
    return {title:etp ? '레버리지 ETP 타사 거래확인서 등록' : `${task} 적격투자자 서류 등록`,
      text:etp ? '다른 증권사의 레버리지 ETP 거래내역을 확인할 수 있는 서류를 준비해 주세요.' : '금융자격증, 금융투자업 종사 경력증명서 또는 타사 거래확인서 중 해당하는 서류를 준비해 주세요.',
      canRequest:true};
  }
  function documentLinkResult(s, url) {
    const link = `<a class="btn" href="${E(url)}" target="_blank" rel="noopener" aria-label="디지털폼 열기 (새 창)">디지털폼 열기</a>`;
    const done = s.id === 'name-change' ? btn('확인하기','back','','secondary') :
      btn('확인하기','service',`data-id="${s.id}"`,'secondary');
    return `${top(s.formTask === 'isa' ? isaDocumentTitle : s.label)}<main id="main" class="result document-link-result"><div class="result-icon">${icon('chat')}</div>
      <h1>서류제출 URL이 준비되었습니다</h1><p>알림톡의 디지털폼을 열어 서류를 등록해 주세요.</p>
      ${demoNote('알림톡 수신을 재현한 화면입니다. 링크는 별도 디지털폼 목업을 엽니다.')}</main>
      ${sticky(link + done)}`;
  }
  function isaDocumentPage(service, result, request) {
    const status = result.status
      ? `<div><dt>접수 상태</dt><dd${result.canRequest ? ' class="isa-cancelled-status"' : ''}>${E(result.status)}</dd></div>`
      : '';
    const details = result.items
      ? `<dl class="facts">${factRows([['상품명','중개형 ISA'], ...result.items])}${status}</dl>`
      : `<p class="hint">${E(result.text)}</p>`;
    return `${top(isaDocumentTitle)}${currentAccountCard()}<main id="main" class="content">
      ${result.items && result.text ? `<p class="lead">${E(result.text)}</p>` : ''}
      <section class="detail-card isa-application-card">
        <div class="card-top"><h2>${E(result.title)}</h2></div>
        ${details}
        ${result.canRequest ? request : '<p class="hint">서류를 제출할 필요가 없습니다.</p>'}
      </section>
      <div class="work-actions">${staffContactLink(service)}</div>
    </main>`;
  }
  function documentHandoffPage(s, stage) {
    if (!s.formTask) {
      const kinds = ['documents-domestic','documents-foreign'].map(id => menuLink(D.service(id))).join('');
      return `${top()}${currentAccountCard()}<main id="main" class="content"><h1>파생상품 서류제출</h1><p class="lead">거래확인서를 제출할 시장을 선택해 주세요.</p><div class="page-list">${kinds}</div></main>`;
    }
    const result = documentLookup(s, currentDocumentScenario(s));
    if (stage === 'link' && result.canRequest && S.outcomes[s.id]?.linkIssued) {
      return documentLinkResult(s, digitalFormURL(s.formTask));
    }
    const isa = s.formTask === 'isa';
    const request = btn('서류제출 URL 받기','request-document-link',`data-id="${s.id}"`,isa ? 'secondary' : '');
    if (isa) return isaDocumentPage(s, result, request);
    const actions = result.canRequest ? request : result.app ? btn('영웅문S#에서 신청하기','channel',`data-id="${s.id}" data-channel="app"`) :
      result.help ? btn('상담원 연결하기','channel',`data-id="${s.id}" data-channel="staff"`) : btn('확인하기','home');
    return `${top()}${currentAccountCard()}<main id="main" class="content with-actions"><h1>${E(result.title)}</h1>
      ${result.text ? `<p class="lead">${E(result.text)}</p>` : ''}${result.items ? `<div class="detail-card">${facts(result.items)}</div>` : ''}
      ${result.canRequest ? `<p class="hint">알림톡으로 받은 URL에서 서류를 제출합니다.</p>${otherMethodsLink(s,true)}` : ''}
      </main>${sticky(actions)}`;
  }
  function canUseChannel(s, channel) {
    if (s?.id === 'name-change' && channel === 'app') {
      const account = selectedAccount();
      return current()?.id === s.id && !D.authStep(s.id, S.auth) && account?.verified &&
        hasNameChange(currentIdentityKind()) && (!account.kycComplete || account.returned);
    }
    return s?.channels.includes(channel) || (s?.id === 'documents-etp' && channel === 'app' &&
      current()?.id === s.id && !D.authStep(s.id, S.auth) && currentDocumentScenario(s) === 'missing');
  }
  function render() {
    stopNoticeTimer();
    if (sheet.open) closeSheet();
    const r = route();
    updateResultTools(r);
    const detailScreen = S.endReason || ['service', 'notice', 'certificates', 'traffic', 'consultation'].includes(r.page);
    app.className = detailScreen ? 'app-shell detail-screen' : r.page === 'home' ? 'app-shell home-screen' : 'app-shell';
    if (S.endReason) {
      app.innerHTML = endedPage();
      app.querySelector('main h1')?.focus({preventScroll:true});
      V.refresh?.();
      return;
    }
    if (r.page === 'home') { app.innerHTML = home(); scheduleNotice(); }
    else if (r.page === 'traffic') app.innerHTML = trafficPage();
    else if (r.page === 'consultation') app.innerHTML = trafficPage(true);
    else if (r.page === 'certificates') app.innerHTML = certificateCatalog();
    else if (r.page === 'notice') app.innerHTML = noticePage(r.id);
    else if (r.page === 'menu') app.innerHTML = allMenu();
    else if (r.page === 'search') app.innerHTML = searchPage();
    else if (r.page === 'service') {
      const s = D.service(r.id);
      if (!s) {
        app.innerHTML = `${top('페이지 안내')}<main id="main" class="content"><div class="empty-state"><h2>업무를 찾을 수 없습니다</h2>${btn('전체메뉴 보기','menu')}</div></main>`;
        return;
      }
      const resetStep = isIdResetStep(r);
      const authService = resetStep ? D.service('info') : s;
      const auth = D.authStep(authService.id, S.auth);
      if (resetStep && auth) app.innerHTML = authPage(authService, auth, '아이디 비밀번호 재설정');
      else if (auth && S.authStartedFor !== s.id) app.innerHTML = serviceIntro(s);
      else if (auth) app.innerHTML = authPage(s, auth);
      else if (s.kind === 'password-guide') app.innerHTML = passwordGuidePage(s);
      else if (switchingAccount()) app.innerHTML = authPage(s, 'account', s.label, true);
      else if (s.level === 1) {
        app.className += ' faq-screen';
        app.innerHTML = faqPage(s);
      }
      else if (s.kind === 'documents') app.innerHTML = documentHandoffPage(s, r.stage);
      else if (s.id === 'name-change') app.innerHTML = identityChangePage(s, r.stage);
      else if (r.stage === 'confirm') app.innerHTML = reviewPage(s);
      else if (s.kind === 'certificate' && r.stage === 'result') app.innerHTML = certificateResult(s);
      else if (r.stage === 'result') app.innerHTML = resultPage(s);
      else if (r.stage === 'empty' && s.id !== 'certificate-history') app.innerHTML = emptyPage(s);
      else app.innerHTML = workPage(s);
    } else { go('home'); return; }
    const heading = app.querySelector('main h1, h1.topbar-title');
    const phoneForm = document.querySelector('#phone-form');
    if (phoneForm) {
      const review = document.getElementById('phone-review-hint');
      if (review) {
        review.focus({preventScroll:true});
        V.scrollTo(0,0);
      } else {
        const first = Object.entries(phoneErrors(S.phone)).find(([,message]) => message)?.[0];
        if (S.sms.issued && codeError()) phoneError(phoneForm,'code',codeError());
        const next = phoneForm.elements.code || (first ? phoneControl(phoneForm,first) : phoneForm.querySelector('[type=submit]'));
        focusAuthField(next);
      }
    } else if (heading) { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
    V.refresh?.();
    if (isIdResetStep(r) && idPasswordAccount()) openIdPasswordReset();
  }
  let activeChoice = null;
  function showSheet(title, body, {listOnly = false, focusTitle = false} = {}) {
    if (!sheet.open) S.returnFocus = document.activeElement;
    const heading = listOnly
      ? `<span id="sheet-title" hidden>${E(title)}</span>`
      : `<div class="sheet-head"><h2 id="sheet-title"${focusTitle ? ' tabindex="-1" autofocus' : ''}>${E(title)}</h2>
          <button type="button" class="icon-button" data-action="close-sheet" aria-label="닫기">${icon('close')}</button></div>`;
    sheet.innerHTML = `<div class="sheet-inner"><div class="sheet-handle" aria-hidden="true"></div>
      ${heading}<div class="sheet-body">${body}</div></div>`;
    if (!sheet.open) sheet.showModal();
    V.lock?.(true);
    document.body.style.overflow = 'hidden';
    sheet.querySelector(focusTitle ? '#sheet-title' : 'button')?.focus({preventScroll:true});
  }
  function openChoice(trigger) {
    const group = trigger.closest('.field');
    const select = group.querySelector('select');
    if (select.form?.id === 'phone-form' && select.name === 'carrier') {
      focusAuthField(trigger, false);
    }
    const label = group.querySelector('.field-label').textContent;
    const parent = sheet.contains(trigger) ? sheet.firstElementChild : null;
    const scrollTop = parent?.querySelector('.sheet-body').scrollTop || 0;
    activeChoice = {trigger, select, parent, scrollTop};
    trigger.setAttribute('aria-expanded', 'true');
    const options = Array.from(select.options).filter(option => option.value || !select.required);
    const initial = options.find(option => option.selected) || options[0];
    const rows = options.map(option => `<button type="button" class="choice-option" role="option"
      data-action="pick-choice" data-value="${E(option.value)}" aria-selected="${option.selected}" tabindex="${option === initial ? 0 : -1}">
      <span>${E(option.text)}</span>${option.selected ? icon('check') : ''}
    </button>`).join('');
    showSheet(`${label} 선택`, `<div class="choice-list" role="listbox" aria-labelledby="sheet-title">${rows}</div>`);
    if (!parent) S.returnFocus = trigger;
    sheet.querySelector('.choice-option[tabindex="0"]')?.focus();
  }
  function dismissSheet() {
    if (S.modalContext?.termIndex != null) {
      showPhoneTerms(S.modalContext.termIndex);
      return;
    }
    if (!activeChoice) {
      const leaveResetStep = isIdResetStep() && idPasswordAccount();
      closeSheet();
      if (leaveResetStep) returnToPasswordHub();
      return;
    }
    const {trigger, select, parent, scrollTop} = activeChoice;
    activeChoice = null;
    trigger.setAttribute('aria-expanded', 'false');
    if (!parent) {
      closeSheet();
      if (select.form?.id === 'phone-form' && !select.value) phoneError(select.form,'carrier','통신사를 선택해 주세요.');
      return;
    }
    sheet.replaceChildren(parent);
    parent.querySelector('.sheet-body').scrollTop = scrollTop;
    trigger.focus({preventScroll:true});
  }
  function pickChoice(value) {
    if (!activeChoice) return;
    const {select, trigger} = activeChoice;
    const option = Array.from(select.options).find(option => option.value === value);
    if (!option || (select.required && !value)) return;
    const changed = select.value !== value;
    select.value = value;
    trigger.querySelector('.choice-value').textContent = option.text;
    dismissSheet();
    if (changed) {
      select.dispatchEvent(new Event('input', {bubbles:true}));
      select.dispatchEvent(new Event('change', {bubbles:true}));
    }
    if (select.form?.id === 'phone-form' && select.name === 'carrier') focusAuthField(select.form.elements.phone);
  }
  function closeSheet(){
    if (activeChoice) activeChoice.trigger.setAttribute('aria-expanded', 'false');
    activeChoice = null;
    S.modalContext=null;
    if (!sheet.open) return;
    sheet.querySelector('#id-password-form')?.reset();
    sheet.close();
    V.lock?.(false);
    document.body.style.overflow='';
    if(S.returnFocus?.isConnected)S.returnFocus.focus({preventScroll:true});
  }
  function channels(id, allowApplication = false){
    const service = D.service(id);
    if (!service?.channels.length) return;
    S.modalContext = id;
    const labels = {app:'영웅문S# 바로가기', staff:'상담원 연결하기', ivr:'음성 ARS 연결하기', opening:'계좌개설앱 바로가기'};
    const choices = service.channels.map(channel => {
      const isApp = channel === 'app' || channel === 'opening';
      const symbol = isApp ? (channel === 'app' ? 'S#' : '계좌') : icon(channel === 'staff' ? 'headset' : 'phone');
      return `<button type="button" class="channel-button" data-action="channel" data-channel="${channel}" data-id="${E(id)}"><span class="channel-icon${isApp?' app':''}" aria-hidden="true">${symbol}</span><span>${labels[channel]}</span>${chevron()}</button>`;
    });
    if (allowApplication && service.kind === 'certificate') {
      choices.unshift(`<button type="button" class="channel-button" data-action="service" data-id="${E(id)}"><span class="channel-icon" aria-hidden="true">${icon('document')}</span><span>바로 신청하기</span>${chevron()}</button>`);
      showSheet(service.label, choices.join(''));
    } else showSheet('다른 이용 방법', choices.join(''), {listOnly:true});
  }

  function passwordGuidePage(service) {
    const sections = service.passwordTypes.map(type => {
      const isId = type.id === 'id';
      const action = isId ? 'data-action="start-id-password-reset"' :
        `data-action="channel" data-id="password-change" data-channel="app" data-password="${type.id}" aria-haspopup="dialog"`;
      let actionLabel = '영웅문S#에서 재설정하기';
      if (isId) {
        actionLabel = !S.auth.phone ? '휴대폰·계좌 인증 후 재설정하기' :
          S.auth.account ? '재설정하기' : '계좌 인증 후 재설정하기';
      }
      const prep = type.id === 'certificate' ? `
        <div class="password-prep">
          <h3>준비할 정보</h3>
          <ul><li>증권계좌번호 또는 아이디</li><li>연결 은행계좌번호 끝 5자리</li></ul>
          <button type="button" class="text-button" data-action="service" data-id="info" data-topic="certificate-prep"
            aria-label="내 정보에서 연결 은행계좌번호 끝 5자리 조회하기">내 정보에서 끝 5자리 조회하기${chevron()}</button>
        </div>` : '';
      return `<section class="detail-card password-kind" aria-labelledby="password-${type.id}">
        <h2 id="password-${type.id}" tabindex="-1">${E(type.label)}</h2>
        <p>${E(type.use)} · ${E(type.format)}</p>${prep}
        <button type="button" class="btn secondary" ${action} aria-labelledby="password-${type.id} reset-${type.id}">
          <span id="reset-${type.id}">${actionLabel}</span></button>
      </section>`;
    }).join('');
    const title = history.state?.fromPasswordScenario ? service.original : service.label;
    return `${top(title)}<main id="main" class="content password-guide">
      ${sections}<div class="work-actions">${staffContactLink(service)}</div>
    </main>`;
  }
  function channel(id, c, { title, detail, password = 'account' } = {}) {
    const service = D.service(id);
    if (!canUseChannel(service, c)) return;
    const passwordHandoff = id === 'password-change' && c === 'app';
    if (passwordHandoff) {
      if (password !== 'account' && password !== 'certificate') return;
      title = password === 'certificate' ? '공동인증서 비밀번호 재설정' : '증권계좌 비밀번호 재설정';
    }
    S.modalContext = c === 'staff' ? `staff:${id}` : id;
    const name = {app:'영웅문S#', opening:'계좌개설앱', staff:'상담원', ivr:'음성 ARS'}[c];
    const isApp = c === 'app' || c === 'opening';
    const notice = isApp
      ? `${passwordHandoff ? '앱' : name}으로 이동하면 디지털 ARS가 종료됩니다. 인증·입력 정보는 자동으로 전달되지 않습니다.`
      : c === 'staff' ? '담당 상담원에게 연결합니다.' : `${service.label} 업무로 ${name}에 연결합니다.`;
    const ready = id === 'certificate-guide' && c === 'app'
      ? `<div class="detail-card"><h3 class="section-heading">이동 전 확인</h3><p class="hint">발급은 영웅문S#에서 진행합니다.</p>${check('ready','아이디·계좌번호와 필요한 정보를 확인했습니다.')}</div>` : '';
    showSheet(title || `${name} ${isApp ? '이동' : '연결'} 안내`, `
      ${detail ? `<p class="channel-guidance">${E(detail)}</p>` : ''}
      <p class="sheet-description">${E(notice)}</p>${c === 'staff' ? staffSummary(id === 'name-change' ? '기타서류' : service.label) : ready}
      <div class="sheet-actions button-row">${btn('취소하기','close-sheet','','secondary')}${btn(isApp ? `${name}으로 이동하기` : `${name} 연결하기`, 'execute-channel', `data-id="${E(id)}" data-channel="${c}"`)}</div>`);
  }
  function phoneData(form) {
    const identity = Object.fromEntries(new FormData(form));
    identity.consent = !!S.phone.consent;
    return identity;
  }
  function showPhoneTerms(returnIndex) {
    const form = document.getElementById('phone-form');
    if (!form || S.sms.issued) return;
    const rows = phoneTerms.map((title, index) =>
      `<button type="button" class="phone-term-row" data-action="phone-term" data-index="${index}"><span><span class="term-required">[필수]</span> ${E(title)}</span>${chevron()}</button>`).join('');
    S.modalContext = 'phone-terms';
    showSheet('휴대폰 인증 약관동의', `<p class="sheet-description">휴대폰 본인확인에 꼭 필요한 약관에만 동의를 받습니다.</p>
      <div class="phone-term-list">${rows}</div>${btn('전체 동의하기','agree-phone-terms', S.sms.attempts >= 3 ? 'disabled' : '')}`, {focusTitle:true});
    S.returnFocus = form.elements.consent;
    if (returnIndex != null) sheet.querySelector(`[data-action="phone-term"][data-index="${returnIndex}"]`)?.focus();
  }
  function phoneTermDetail(index) {
    if (!phoneTerms[index] || !sheet.open) return;
    S.modalContext = {termIndex:index};
    showSheet(phoneTerms[index], `<p class="sheet-description">약관 원문을 준비 중입니다.</p>${btn('약관 목록으로 돌아가기','terms')}`, {focusTitle:true});
  }
  function agreePhoneTerms() {
    const form = document.getElementById('phone-form');
    if (!form || !sheet.open || S.modalContext !== 'phone-terms' || S.sms.issued || S.sms.attempts >= 3) return;
    const identity = form.elements.phone ? phoneData(form) : S.phone;
    S.phone = {...identity,consent:true};
    render();
  }
  function errorControl(field) {
    return field?.tagName === 'SELECT' ? field.nextElementSibling : field;
  }
  function clearFieldError(control) {
    const errorId = control?.dataset?.errorId;
    if (!errorId) return;
    document.getElementById(errorId)?.remove();
    const descriptions = (control.getAttribute('aria-describedby') || '').split(/\s+/)
      .filter(id => id && id !== errorId);
    if (descriptions.length) control.setAttribute('aria-describedby', descriptions.join(' '));
    else control.removeAttribute('aria-describedby');
    control.removeAttribute('aria-invalid');
    delete control.dataset.errorId;
  }
  function clearError(scope) {
    scope.querySelectorAll('[data-error-id]').forEach(clearFieldError);
  }
  function showError(message, name, scope) {
    const field = scope.querySelector(`[name="${name}"]:not(:disabled)`);
    const control = errorControl(field);
    if (!control) return;
    const group = control.closest('.field, .check, .certificate-segment, .account-choices, .upload');
    let box = document.getElementById(control.dataset.errorId);
    if (!box) {
      box = document.createElement('p');
      box.id = `${scope.id}-error-${name}`;
      box.className = 'field-error';
      (group || control).after(box);
      control.dataset.errorId = box.id;
      control.setAttribute('aria-describedby', [control.getAttribute('aria-describedby'), box.id].filter(Boolean).join(' '));
    }
    box.textContent = message;
    control.setAttribute('aria-invalid', 'true');
    if (scope.id === 'account-form') focusAuthField(control);
    else {
      control.focus({preventScroll:true});
      control.scrollIntoView({block:'center', inline:'nearest', behavior:'instant'});
    }
  }
  function validCustomerName(name) {
    return /^[가-힣a-zA-Z\s]{2,20}$/.test(name) && name.replace(/\s/g,'').length >= 2;
  }
  function validBirth(b,g) {
    if (!/^\d{6}$/.test(b) || !/^[1-8]$/.test(g)) return false;
    const year = ('3478'.includes(g) ? 2000 : 1900) + Number(b.slice(0,2));
    const month = Number(b.slice(2,4)), day = Number(b.slice(4,6));
    const date = new Date(year, month - 1, day);
    return date.getMonth() === month - 1 && date.getDate() === day && date <= new Date();
  }
  function phoneErrors(p) {
    const name = (p.name || '').trim(), suffixReady = /^[1-8]$/.test(p.gender);
    const birthValid = suffixReady ? validBirth(p.birth,p.gender) : validBirth(p.birth,'1') || validBirth(p.birth,'3');
    return {
      name: validCustomerName(name) ? '' : '이름을 한글 또는 영문으로 두 글자 이상 입력해 주세요.',
      birth: birthValid ? '' : '생년월일을 여섯 자리 숫자로 확인해 주세요.',
      gender: suffixReady ? '' : '주민등록번호 뒤 첫 자리를 확인해 주세요.',
      carrier: carriers.includes(p.carrier) ? '' : '통신사를 선택해 주세요.',
      phone: /^010\d{8}$/.test(p.phone) ? '' : '010으로 시작하는 휴대폰 번호 11자리를 입력해 주세요.',
      consent: p.consent ? '' : '본인확인 이용약관에 동의해 주세요.'
    };
  }
  function phoneReady(errors) { return S.sms.attempts < 3 && Object.values(errors).every(message => !message); }
  function phoneControl(form, name) { return name === 'carrier' ? form.querySelector('#choose-carrier') : form.elements[name]; }
  function phoneError(form, name, message) {
    const box = form.querySelector(`#phone-error-${name}`), control = phoneControl(form, name);
    if (!box || !control) return false;
    const changed = box.textContent !== message;
    if (changed) box.textContent = message;
    if (message) {
      control.setAttribute('aria-invalid','true');
      control.setAttribute('aria-describedby',box.id);
    } else {
      control.removeAttribute('aria-invalid');
      if (name === 'code') control.setAttribute('aria-describedby','code-hint');
      else control.removeAttribute('aria-describedby');
    }
    return changed && !!message;
  }
  function codeError() {
    if (S.sms.attempts >= 3) return phoneLockMessage;
    if (Date.now() - S.sms.issued >= 180000) return '인증번호가 만료되었어요. 인증번호를 다시 받아 주세요.';
    return '';
  }
  function updateCodeButtons(form) {
    form.querySelector('[type=submit]').disabled = !!codeError() || !/^\d{6}$/.test(form.elements.code.value);
    form.querySelector('[data-action="request-code"]').disabled = S.sms.attempts >= 3;
  }
  function markCodePosition(input) {
    const slots = input.previousElementSibling.children;
    const position = Math.min(input.selectionStart, slots.length - 1);
    for (let i = 0; i < slots.length; i++) slots[i].toggleAttribute('data-current', i === position);
  }
  function revealPhoneStep(form, name) {
    const step = form.querySelector(`[data-phone-step="${name}"]`);
    if (!step.hidden) return false;
    step.hidden = false;
    if (name === 'phone') form.querySelector('[type=submit]').hidden = false;
    V.refresh?.();
    return true;
  }
  function focusAuthField(control, animate = true) {
    if (!control) return;
    if (V.focusAuthField) V.focusAuthField(control, animate);
    else control.focus();
  }
  let nameFocusTimer;
  function updatePhoneField(el) {
    const form = el.form;
    if (el.name === 'code') {
      if (/\D/.test(el.value)) {
        const position = el.value.slice(0, el.selectionStart).replace(/\D/g, '').length;
        el.value = el.value.replace(/\D/g, '');
        el.setSelectionRange(position, position);
      }
      markCodePosition(el);
      phoneError(form,'code',codeError());
      updateCodeButtons(form);
      return;
    }
    const previousNumber = S.phone.phone;
    const p = phoneData(form);
    if (S.phone.consent) {
      p.consent = false;
      form.elements.consent.setAttribute('aria-checked','false');
      revealPhoneStep(form,'consent');
      const guide = document.getElementById('phone-review-hint');
      if (guide) guide.textContent = '수정한 정보를 확인하고 이용약관에 다시 동의해 주세요.';
    }
    const errors = phoneErrors(p);
    S.phone = p;
    if (!el.value) el.dataset.touched = 'true';
    const names = el.name === 'gender' ? ['birth','gender'] : [el.name];
    for (const name of names) {
      const control = phoneControl(form,name);
      const complete = control.maxLength > 0 && control.value.length >= control.maxLength;
      if (!errors[name] || complete || control.dataset.touched || name === 'consent') phoneError(form,name,errors[name]);
    }
    form.querySelector('[type=submit]').disabled = !phoneReady(errors);
    if (el.name === 'name') {
      clearTimeout(nameFocusTimer);
      if (errors.name) return;
      revealPhoneStep(form,'birth');
      // Two-letter names can continue manually. Wait for continuous typing and IME commits.
      if (!p.birth && p.name.replace(/\s/g,'').length >= 3) {
        nameFocusTimer = setTimeout(() => {
          if (el.isConnected && document.activeElement === el && !el.dataset.composing) focusAuthField(form.elements.birth);
        },350);
      }
    } else if (el.name === 'birth' || el.name === 'gender') {
      if (errors.birth) {
        if (el.name === 'gender') {
          phoneError(form,'birth',errors.birth);
          focusAuthField(form.elements.birth);
        }
        return;
      }
      if (el.name === 'birth' && !p.gender) focusAuthField(form.elements.gender);
      if (!errors.gender && revealPhoneStep(form,'carrier')) openChoice(phoneControl(form,'carrier'));
    } else if (el.name === 'carrier' && !errors.carrier) {
      revealPhoneStep(form,'phone');
      if (!errors.phone) revealPhoneStep(form,'consent');
    } else if (el.name === 'phone' && !errors.phone) {
      revealPhoneStep(form,'consent');
      if (p.phone !== previousNumber && S.sms.attempts < 3) showPhoneTerms();
    }
  }
  function requestCode() {
    const form = document.getElementById('phone-form');
    if (!form) return false;
    const identity = form.elements.phone ? phoneData(form) : S.phone;
    const errors = phoneErrors(identity);
    if (!phoneReady(errors)) {
      const invalid = Object.keys(errors).find(name => errors[name]);
      if (!S.sms.issued && invalid) {
        phoneError(form,invalid,errors[invalid]);
        focusAuthField(phoneControl(form,invalid));
      }
      return false;
    }
    S.phone = identity;
    S.sms.issued = Date.now();
    render();
    return true;
  }
  function confirmPhone() {
    if (!S.sms.issued) { requestCode(); return; }
    const form = document.getElementById('phone-form');
    if (!form?.elements.code) return;
    const code = form.elements.code.value;
    let message = codeError();
    if (!message && !/^\d{6}$/.test(code)) message = '인증번호 여섯 자리를 입력해 주세요.';
    else if (!message && code !== '123456') {
      S.sms.attempts++;
      message = codeError() || `인증번호가 일치하지 않아요. 다시 입력해 주세요. (${S.sms.attempts}/3)`;
    }
    if (message) {
      phoneError(form,'code',message);
      updateCodeButtons(form);
      focusAuthField(form.elements.code);
      form.elements.code.select();
      return;
    }
    S.auth.phone=true; S.auth.account=false; S.accounts=demoAccounts.map(a=>({...a}));
    S.selectedAccount=''; S.phone={}; S.sms.issued=0;
    render(); V.scrollTo(0,0);
  }
  function selectAccount(id) {
    const switching = switchingAccount();
    const account = S.accounts.find(account => account.id === id);
    if (!S.auth.phone || (S.auth.account && !switching) || S.accountAttempts >= 3 ||
        !account || account.verified) return;
    // During a switch the form holds the candidate. All queries still use the verified account.
    if (!switching) S.selectedAccount = id;
    const form = document.getElementById('account-form');
    if (form) {
      const password = form.elements.password;
      password.closest('.field').hidden = false;
      password.value = '';
      password.disabled = false;
      const submit = form.querySelector('[type=submit]');
      submit.hidden = false;
      submit.disabled = true;
      clearError(form);
      document.getElementById('account-instruction').textContent = accountInstruction(true);
      focusAuthField(password);
    }
    V.refresh?.();
  }
  function reselectAccount() {
    const previous = document.querySelector('#account-form [name=account]:checked');
    if (!previous) return;
    if (!switchingAccount()) S.selectedAccount = '';
    render();
    const form = document.getElementById('account-form');
    const radio = form.querySelector(`[name=account][value="${previous.value}"]:not(:disabled)`);
    const next = radio || form.querySelector('[data-action=view-verified-account], [data-password=account]');
    next?.focus({preventScroll:true});
    V.scrollTo(0, 0);
  }
  function updateAccountPin(input) {
    const form = input.form;
    if (input.disabled || input.readOnly) return;
    clearError(form);
    form.querySelector('[type=submit]').disabled = !accountPinPattern.test(input.value);
    if (/\D/.test(input.value)) showError('계좌 비밀번호는 숫자 4~8자리로 입력해 주세요.', 'password', form);
  }
  function activateAccount(id) {
    accountWork.set(S.selectedAccount, {drafts:S.drafts, files:S.files, outcomes:S.outcomes, unlocked:S.unlocked});
    const saved = accountWork.get(id);
    S.drafts = saved?.drafts || {};
    S.files = saved?.files || {};
    S.outcomes = saved?.outcomes || {};
    S.unlocked = saved?.unlocked || new Set();
    S.review = null;
    S.selectedAccount = id;
  }
  function confirmAccount(form) {
    if (!S.auth.phone) { render(); return; }
    const switching = switchingAccount();
    if (S.auth.account && !switching) return;
    if (S.accountAttempts >= 3) return;
    clearError(form);
    const id = form.elements.account?.value;
    const account = S.accounts.find(entry => entry.id === id);
    if (!account || account.verified || (switching ? id === S.selectedAccount : id !== S.selectedAccount)) {
      showError('인증할 보유 계좌를 선택해 주세요.', 'account', form);
      return;
    }
    const password = form.elements.password.value;
    if (!accountPinPattern.test(password)) { showError('계좌 비밀번호는 숫자 4~8자리로 입력해 주세요.', 'password', form); return; }
    if (password !== D.demoAccountPins[id]) {
      form.elements.password.value = '';
      form.querySelector('[type=submit]').disabled = true;
      S.accountAttempts++;
      const locked = S.accountAttempts >= 3;
      if (locked) {
        form.elements.password.readOnly = true;
        const guide = document.getElementById('account-instruction');
        if (guide) guide.textContent = '선택한 계좌의 인증 결과를 확인해 주세요.';
        V.refresh?.();
      }
      showError(locked ? accountLockMessage : `계좌 비밀번호가 일치하지 않습니다. 다시 입력해 주세요. (${S.accountAttempts}/3)`, 'password', form);
      return;
    }
    form.reset();
    account.verified = true;
    S.accountAttempts = 0;
    if (switching) {
      activateAccount(id);
      leaveAccountPicker();
    } else {
      S.auth.account = true;
      render();
    }
    V.scrollTo(0, 0);
  }
  function captureDraft(form){if(!form)return;const s=current();if(!s)return;const obj={};for(const el of form.elements){if(!el.name||(el.type==='radio'&&!el.checked)||['file','submit','password'].includes(el.type))continue;obj[el.name]=el.type==='checkbox'?el.checked:el.value;}S.drafts[s.id]=obj;}
  function validateWork(s,f){clearError(f);captureDraft(f);const d=S.drafts[s.id];if(s.kind==='certificate') {
      const error = certificates.validate(s.id, d);
      if (error) { showError(error[1], error[0], f); return null; }
      return certificates.receiptItems(s.id, {...d, email:profileEmail}, accountNumber());
    }
    for(const el of f.querySelectorAll('[required]'))if(!el.value.trim()){showError('필수 항목을 입력하거나 선택해 주세요.',el.name,f);return null;}
    const labels={occupation:'직업',purpose:'거래 목적',source:'자금 원천',residence:'거주 국가',address:'주소',transaction:'송금 내역',amount:'금액',reason:'신청 사유',document:'증명서 종류',date:'발급 기준일',delivery:'수령 방법',destination:'수령 정보',kind:'제출 업무'};
    if(s.id==='repayment'||s.id==='mistake'){const max=s.id==='repayment'?1000000:d.transaction?.includes('300,000')?300000:100000;if(!D.validAmount(d.amount||'',max)){showError(`금액은 1원부터 ${max.toLocaleString('ko-KR')}원까지 정수로 입력해 주세요.`,'amount',f);return null;}}
    if(!d.agree){showError('입력 내용과 유의사항을 확인해 주세요.','agree',f);return null;}
    const items=Object.entries(labels).filter(([k])=>d[k]).map(([k,label])=>[label,k==='amount'?Number(d[k].replace(/,/g,'')).toLocaleString('ko-KR')+'원':d[k]]);if(s.id==='extension')items.push(['대출금액','1,000,000원'],['연장 후 만기일','2027.02.18']);return items;
  }
  function completeWork(id){const s=D.service(id);if(!s||!actionLabels[s.kind||id]||D.authStep(id,S.auth)||S.review?.id!==id)return;const items=S.review.items,number=String(S.records.length+1).padStart(8,'0');S.records.push({accountId:S.selectedAccount,type:id,family:s.kind||id,label:s.label,number,items:items.filter(([k])=>!['주소','수령 정보','변경할 이름','변경할 주민번호'].includes(k))});S.outcomes[id]={title:id==='repayment'?'현금상환을 완료했습니다':id==='extension'?'만기연장을 완료했습니다':'신청을 완료했습니다',number,items,history:s.kind==='certificate'?'certificate-history':['repayment','extension'].includes(s.kind||id)?null:'applications'};delete S.drafts[id];delete S.files[id];S.review=null;go(`service/${id}/result`);}
  function eraseSession(){accountWork.clear();S.auth={phone:false,account:false};S.phone={};S.sms={issued:0,attempts:0};S.accounts=[];S.selectedAccount='';S.authStartedFor=null;S.accountAttempts=0;S.modalContext=null;S.menuQuery='';S.drafts={};S.files={};S.records=[];S.outcomes={};S.review=null;S.unlocked.clear();}
  function endSession(reason) {
    eraseSession();
    S.endReason = reason;
    go('ended');
    render();
    V.scrollTo(0, 0);
  }
  function resetDemo() {
    eraseSession();
    S.endReason = null;
    S.recent = [];
    S.expanded = null;
    S.query = '';
    S.returnFocus = null;
    noticeIndex = 0;
    try { localStorage.removeItem('fresh-ars-20261112-recent'); } catch (_) { /* Storage may be unavailable. */ }
    go('home');
    V.scrollTo(0, 0);
    V.announce?.('시연을 초기화했습니다.');
  }
  function executeChannel(id,c) {
    const s=D.service(id);
    if (!canUseChannel(s, c)) return;
    if (c === 'staff') {
      if (sheet.open && S.modalContext === `staff:${id}`) endSession('staff');
      return;
    }
    if (id === 'password-change' && (!sheet.open || S.modalContext !== id)) return;
    if (id === 'certificate-guide' && c === 'app' && !sheet.querySelector('[name=ready]')?.checked) {
      showError('이동 전에 필요한 정보 확인에 체크해 주세요.', 'ready', sheet);
      return;
    }
    if (c === 'app' || c === 'opening') {
      endSession('app');
    } else {
      showSheet('연결 안내',`<div class="result-icon">${icon('headset')}</div><p class="sheet-description">${E(s.label)} · 음성 ARS 연결을 요청했습니다.</p>${btn('확인하기','close-sheet')}`);
    }
  }
  function safeHome(){const f=document.getElementById('work-form');if(f)captureDraft(f);go('home');}
  function submitWork(form) {
    const service = current();
    if (!service || form.dataset.id !== service.id || route().stage === 'result') return;
    if (D.authStep(service.id,S.auth)) { render(); return; }
    if (service.id === 'name-change') { requestIdentityLink(service,form); return; }
    const items = validateWork(service, form);
    if (!items) return;
    S.review = {id:service.id, items};
    if (service.kind === 'certificate') completeWork(service.id);
    else go(`service/${service.id}/confirm`);
  }
  function handleAction(b){const a=b.dataset.action,id=b.dataset.id,s=current();switch(a){
    case 'open-choice':openChoice(b);break;
    case 'pick-choice':pickChoice(b.dataset.value);break;
    case 'reselect-account':reselectAccount();break;
    case 'identity-remedy': {
      const account = selectedAccount();
      if (s?.id !== 'name-change' || D.authStep(s.id, S.auth) || !account?.verified || !hasNameChange(currentIdentityKind())) return;
      const destination = b.dataset.channel;
      if (b.dataset.reason === 'kyc' && !account.kycComplete && destination === 'app') {
        channel(s.id, destination, {title:'고객확인정보 등록', detail:'영웅문S#에서 고객확인정보를 등록할 수 있습니다.'});
      } else if (b.dataset.reason === 'returned' && account.returned && ['app','staff'].includes(destination)) {
        const detail = destination === 'app' ? '영웅문S#에서 반송계좌 해지를 신청할 수 있습니다.' : '상담원에게 반송계좌 해지를 요청할 수 있습니다.';
        channel(s.id, destination, {title:'반송계좌 해지', detail});
      }
      break;
    }
    case 'view-verified-account':
      if (switchingAccount() && id !== S.selectedAccount && S.accounts.some(account => account.id === id && account.verified)) {
        activateAccount(id);
        leaveAccountPicker();
      }
      break;
    case 'switch-account':
      if (s?.level === 3 && S.auth.phone && S.auth.account) {
        captureDraft(document.getElementById('work-form'));
        const stage = route().stage;
        const picker = stage === 'confirm' ? 'select-account-review' :
          stage === 'certificate-prep' && s.id === 'info' ? 'select-account-prep' : 'select-account';
        const origin = {fromAccountScreen:true};
        if (s.id === 'name-change') origin.identityKind = currentIdentityKind();
        if (picker === 'select-account-prep') origin.fromPasswordScenario = history.state?.fromPasswordScenario;
        history.pushState(origin, '', `#/service/${s.id}/${picker}`);
        render(); V.scrollTo(0, 0);
      }
      break;
    case 'begin-auth':if(!D.service(id)||D.service(id).level===1)return;S.authStartedFor=id;render();V.scrollTo(0,0);break;
    case 'request-document-link': {
      if (!s?.formTask || s.id !== id || D.authStep(id, S.auth) || !documentLookup(s, currentDocumentScenario(s)).canRequest) return;
      S.outcomes[id] = {linkIssued:true};
      go('service/' + id + '/link');
      break;
    }
    case 'preview-result':previewResult(id,b.dataset.scenario);break;
    case 'home':safeHome();break;case 'menu':go('menu');break;case 'service':openService(id,b.dataset.topic);break;
    case 'back': {
      if (S.endReason) return;
      const r = route();
      if (S.sms.issued && document.getElementById('phone-code')) {
        S.sms.issued = 0;
        render();
        return;
      }
      if (S.accountAttempts < 3 && document.querySelector('#account-form [name=account]:checked')) {
        reselectAccount();
        return;
      }
      if (isIdResetStep(r)) { returnToPasswordHub(); return; }
      if (switchingAccount()) { leaveAccountPicker(true); return; }
      if (r.page === 'consultation') { go('menu'); return; }
      if (r.page === 'service' && D.authStep(r.id, S.auth) && S.authStartedFor === r.id) {
        S.authStartedFor = null; S.selectedAccount = ''; render(); V.scrollTo(0,0); return;
      }
      if (r.id === 'info' && r.stage === 'certificate-prep') {
        openService('password-change', 'certificate'); return;
      }
      if (r.id === 'name-change' && r.stage === 'link') {
        go('service/name-change', {identityKind:S.outcomes[r.id]?.change});
        return;
      }
      if (r.stage === 'confirm' || r.stage === 'link') go(`service/${r.id}`);
      else go('home');
      break;
    }
    case 'expand':S.expanded=S.expanded===id?null:id;{const y=V.scrollY;render();V.scrollTo(0,y);app.querySelector(`[data-action=expand][data-id="${id}"]`)?.focus({preventScroll:true});}break;
    case 'large':S.large=!S.large;document.documentElement.classList.toggle('large-type',S.large);try{localStorage.setItem('fresh-ars-20261112-large',String(S.large));}catch(_){}b.setAttribute('aria-checked',String(S.large));break;
    case 'traffic':go('traffic');break;
    case 'consultation':go('consultation');break;case 'connect-skill':connectSkill(id);break;case 'execute-skill':executeSkill(id);break;
    case 'notice':go(id && id !== D.homeNotices[0].id && D.homeNotices.some(item=>item.id===id) ? `notice/${id}` : 'notice');break;
    case 'next-notice':nextNotice(true);break;
    case 'scenario':openService(id, undefined, true);break;
    case 'clear-home-search':{const input=document.getElementById('home-query');input.value='';S.query='';updateHomeSearch('');input.focus();}break;
    case 'clear-menu-search':{const input=document.getElementById('menu-query');input.value='';updateMenuSearch('');input.focus();}break;
    case 'clear-search':S.query='';document.getElementById('search-query').value='';document.getElementById('search-results').innerHTML=searchResults();document.getElementById('search-query').focus();break;
    case 'choose-certificate':go('certificates');break;
    case 'certificate-options':if(D.service(id)?.kind==='certificate')channels(id,true);break;
    case 'certificate-receipt':
      if (historyRecords('certificate').some(record => record.number === id)) go(`service/certificate-history/${id}`);
      break;
    case 'channels':channels(id);break;
    case 'channel':channel(id,b.dataset.channel,{password:b.dataset.password});break;
    case 'execute-channel':executeChannel(id,b.dataset.channel);break;
    case 'close-sheet':dismissSheet();break;
    case 'terms':showPhoneTerms(S.modalContext?.termIndex);break;
    case 'phone-term':phoneTermDetail(Number(b.dataset.index));break;
    case 'agree-phone-terms':agreePhoneTerms();break;
    case 'demo-phone':S.phone={name:'김키움',birth:'900101',gender:'1',carrier:'SKT',phone:demoIncomingPhone,consent:false};S.sms.issued=0;render();if(S.sms.attempts < 3)showPhoneTerms();break;
    case 'demo-code':{const input=document.querySelector('[name=code]');if(input){input.value='123456';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();}}break;
    case 'demo-account': {
      const form = document.getElementById('account-form');
      const password = form?.elements.password;
      const sample = D.demoAccountPins[form?.elements.account?.value];
      if (password && !password.disabled && !password.readOnly && sample) {
        password.value = sample;
        updateAccountPin(password);
        focusAuthField(password);
      }
      break;
    }
    case 'request-code':requestCode();break;
    case 'full-amount': {
      const amount = document.getElementById('work-form').elements.amount;
      amount.value = '1000000';
      amount.dispatchEvent(new Event('input', {bubbles:true}));
      break;
    }
    case 'edit-work':go(`service/${s.id}`);break;case 'confirm-work':completeWork(id);break;case 'refresh-result':render();V.scrollTo(0,0);break;
    case 'supplement':openService('documents-supplement');break;
    case 'unlock':openPurposeRegistration(id);break;
    case 'withdrawal-identity-help':showWithdrawalIdentityHelp();break;
    case 'request-identity-link':requestWithdrawalIdentityLink();break;

    case 'change-contact':
      if (profileAccount()) {
        channel('info', 'app', {title:contactChangeLabel, detail:'연락처와 주소는 영웅문S#에서 변경할 수 있습니다.'});
      }
      break;
    case 'release-id':openIdRelease();break;
    case 'confirm-id-release':confirmIdRelease();break;
    case 'start-id-password-reset':startIdPasswordReset();break;
    case 'reset-id-password':openIdPasswordReset();break;
    case 'restart':eraseSession();S.endReason=null;go('home');render();break;
    case 'reset':resetDemo();break;
  }}
  document.addEventListener('click', event => {
    const skip = event.target.closest('.skip-link');
    if (skip) {
      event.preventDefault();
      const main = document.querySelector(skip.hash);
      if (main) { main.tabIndex = -1; main.focus(); main.scrollIntoView({block:'start'}); }
      return;
    }
    const button = event.target.closest('[data-action]');
    if (button && !button.disabled) handleAction(button);
  });
  document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;if(f.id==='home-search'){S.query=f.elements.query.value.trim();go('search');}else if(f.id==='menu-search'){updateMenuSearch(f.elements.query.value);}else if(f.id==='search-form'){S.query=f.elements.query.value;document.getElementById('search-results').innerHTML=searchResults();}else if(f.id==='phone-form')confirmPhone();else if(f.id==='account-form')confirmAccount(f);else if(f.id==='work-form'){submitWork(f);}else if(f.id==='id-password-form')submitIdPassword(f);});
  document.addEventListener('selectionchange', () => {
    if (document.activeElement?.id === 'phone-code') markCodePosition(document.activeElement);
  });
  // Keep Hangul syllables in their original input until the IME commits them.
  document.addEventListener('compositionstart', e => {
    if (e.target.form?.id !== 'phone-form') return;
    clearTimeout(nameFocusTimer);
    e.target.dataset.composing = 'true';
  });
  document.addEventListener('compositionend', e => {
    if (e.target.form?.id !== 'phone-form') return;
    delete e.target.dataset.composing;
    updatePhoneField(e.target);
  });
  document.addEventListener('focusout', e => {
    const el = e.target;
    if (el.form?.id !== 'phone-form' || !el.name || !el.isConnected) return;
    if (el.name === 'name') {
      clearTimeout(nameFocusTimer);
    }
    // A field can receive focus briefly while the preceding input is being corrected.
    if (!el.value && !el.dataset.touched) return;
    el.dataset.touched = 'true';
    const message = el.name === 'code'
      ? codeError() || (el.value && !/^\d{6}$/.test(el.value) ? '인증번호 여섯 자리를 입력해 주세요.' : '')
      : phoneErrors(phoneData(el.form))[el.name];
    // A valid-length code can still have a server-style mismatch; keep that response until edited.
    if (el.name === 'code' && !message) return;
    const newError = phoneError(el.form,el.name,message);
    const next = e.relatedTarget;
    if (newError && (!next || next.form === el.form && next.matches('input, [role=combobox]'))) {
      requestAnimationFrame(() => {
        if (el.isConnected && !sheet.open && document.hasFocus() && document.activeElement === (next || document.body)) focusAuthField(el);
      });
    }
  });
  document.addEventListener('input', e => {
    const el = e.target;
    if (el.id === 'home-query') updateHomeSearch(el.value);
    if (el.id === 'menu-query') updateMenuSearch(el.value);
    if (el.id === 'search-query') {
      S.query = el.value;
      document.getElementById('search-results').innerHTML = searchResults();
    }
    if (el.form?.id === 'phone-form') {
      if (!e.isComposing && !el.dataset.composing) updatePhoneField(el);
      return;
    }
    if (el.form?.id === 'account-form') {
      if (el.name === 'password') updateAccountPin(el);
      return;
    }
    if (el.type === 'radio') {
      const group = el.closest('fieldset');
      if (group) clearError(group);
    }
    else if (el.type !== 'file') clearFieldError(errorControl(el));
    if (el.form?.id === 'work-form') {
      captureDraft(el.form);
      if (current()?.id === 'name-change') delete S.outcomes['name-change'];
    }
  });
  document.addEventListener('change', e => {
    const el = e.target;
    if (el.name === 'identity-kind' && el.checked) {
      selectIdentityKind(el.value);
      return;
    }
    if (el.form?.id === 'withdrawal-purpose-form') {
      el.form.querySelector('[type=submit]').disabled = !canRegisterPurpose(el.form, S.modalContext?.purposeIssue);
      return;
    }
    if (el.form?.id === 'account-form' && el.name === 'account') {
      selectAccount(el.value);
      return;
    }
    if (el.form?.id !== 'work-form') return;
    const s = current();
    captureDraft(el.form);
    if (s.kind === 'certificate') updateCertificateFields(s, el);
    if (s.id === 'name-change') {
      delete S.outcomes[s.id];
      if (el.name === 'unapproved') {
        const consent = el.form.elements.signConsent;
        const visible = el.value === 'Y';
        if (!visible) {
          consent.checked = false;
          clearFieldError(consent);
          S.drafts[s.id].signConsent = false;
        }
        document.getElementById('sign-consent').hidden = !visible;
        V.refresh?.();
      }
    }
  });
  document.addEventListener('keydown', event => {
    const {target, key} = event;
    if (target.matches('[data-action="open-choice"]') && (key === 'ArrowDown' || key === 'ArrowUp')) {
      event.preventDefault();
      openChoice(target);
      return;
    }
    if (!activeChoice || !target.matches('.choice-option')) return;
    const options = Array.from(sheet.querySelectorAll('.choice-option'));
    const i = options.indexOf(target), last = options.length - 1;
    const next = {ArrowDown:Math.min(i + 1,last), ArrowUp:Math.max(i - 1,0), Home:0, End:last}[key];
    if (next === undefined) return;
    event.preventDefault();
    target.tabIndex = -1;
    options[next].tabIndex = 0;
    options[next].focus();
  });
  sheet.addEventListener('click',event=>{if(event.target===sheet)dismissSheet();});
  document.addEventListener('submit', event => {
    if (event.target.id !== 'withdrawal-purpose-form') return;
    event.preventDefault();
    const {purposeIssue:id, account} = S.modalContext || {};
    if (!sheet.open || activeChoice || account !== S.selectedAccount || !canResolveWithdrawalIssue(id) ||
      !canRegisterPurpose(event.target, id)) return;
    S.unlocked.add(id);
    if (route().id === 'withdrawal-status') {
      showWithdrawalResolution(id);
      return;
    }
    S.outcomes[id] = {title:'거래 제한을 해제했습니다', description:'금융거래목적확인서를 등록했습니다.', items:[['대상 계좌',accountNumber()],['해제한 사유',withdrawalIssues[id].title]]};
    go(`service/${id}/result`);
  });
  sheet.addEventListener('cancel',e=>{e.preventDefault();dismissSheet();});
  sheet.addEventListener('close',()=>{
    if (sheet.open) return;
    S.modalContext=null;
    document.body.style.overflow='';
  });
  let dragStart=null;sheet.addEventListener('pointerdown',e=>{if(e.target.classList.contains('sheet-handle'))dragStart=e.clientY;});sheet.addEventListener('pointerup',e=>{if(dragStart!==null&&e.clientY-dragStart>60)dismissSheet();dragStart=null;});
  window.addEventListener('hashchange',()=>{
    if (!S.auth.account) S.selectedAccount = '';
    render();V.scrollTo(0,0);requestAnimationFrame(focusServiceTopic);
  });
  window.addEventListener('pagehide',()=>{stopNoticeTimer();eraseSession();closeSheet();sheet.innerHTML='';app.innerHTML='';});
  document.addEventListener('ars-launch-complete',scheduleNotice);
  document.addEventListener('visibilitychange',scheduleNotice);
  noticeMotion?.addEventListener('change',scheduleNotice);
  window.addEventListener('pageshow',e=>{if(e.persisted)render();});
  setInterval(() => {
    const timer = document.getElementById('countdown');
    if (!timer || !S.sms.issued) return;
    const expired = Date.now() - S.sms.issued >= 180000;
    timer.textContent = expired ? '만료' : remaining();
    if (expired || S.sms.attempts >= 3) {
      const form = document.getElementById('phone-form');
      const newlyInvalid = phoneError(form,'code',codeError());
      form.querySelector('[type=submit]').disabled = true;
      if (newlyInvalid && !document.body.classList.contains('df-preview') && !sheet.open && document.hasFocus() && (form.contains(document.activeElement) || document.activeElement === document.body)) {
        focusAuthField(form.elements.code);
      }
    }
  },1000);
  if(!location.hash)history.replaceState(null,'','#/home');render();requestAnimationFrame(focusServiceTopic);
})();
