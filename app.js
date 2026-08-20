/* ============================================================
   디지털 ARS · 간편모드 인터랙티브 목업
   ============================================================ */

/* ---------- SVG 아이콘 ---------- */
const I = {
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 3 7-8"/><path d="M16 7h4v4"/></svg>',
  order:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.3" fill="currentColor"/></svg>',
  transfer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
  ipo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 16l-5 2.7 1-5.5-4-3.9 5.5-.8z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/></svg>',
  globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
  future:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-6 4 14 2-8h6"/></svg>',
  option:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 12h8"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  fund:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 109-9h-9z"/><path d="M12 3v9h9"/></svg>',
  pension:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/></svg>',
  els:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 14l3-3 2 2 5-5"/></svg>',
  isa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>',
  wrap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5-9 5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  bond:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/></svg>',
  ai:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="6" width="14" height="12" rx="3"/><path d="M12 6V3M9 11h.01M15 11h.01M9 15h6"/><path d="M2 12h2M20 12h2"/></svg>',
  rp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 8h4a2.5 2.5 0 010 5H9.5V8zm0 5v4M9.5 13h5"/></svg>',
  headset:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19a4 4 0 01-4 3h-2"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.5 21a2 2 0 01-3 0"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
  chev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4z"/></svg>',
  agent:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-1a8 8 0 0116 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/></svg>',
  power:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v9"/><path d="M6.5 7a8 8 0 1011 0"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"/><path d="M10.7 12.3L20 3"/><path d="M16 5l3 3"/><path d="M13.5 7.5l2.5 2.5"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h5"/></svg>',
  idcard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16c0-1.8 1.4-3 3.2-3s3.2 1.2 3.2 3"/><path d="M15 10h4M15 14h3"/></svg>',
  cert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h5"/><circle cx="15" cy="16" r="3"/><path d="M13.6 16l1 1 1.8-1.9"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.8 4.5-2.2 1.4a11 11 0 005.5 5.5l1.4-2.2L19 16v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/></svg>',
};

/* ---------- 데이터 ---------- */
const FAV = [
  {k:'ID·계좌조회/PW초기화',     lb:'ID·계좌조회<br>PW초기화',      ic:'key',    go:'result', rk:'idpw'},
  {k:'비대면업무 신청현황',      lb:'비대면업무<br>신청현황',       ic:'order',  go:'result', rk:'untactstatus'},
  {k:'계좌잔고 및 거래내역조회', lb:'계좌잔고 및<br>거래내역조회',  ic:'wallet', go:'list'},
  {k:'계좌사고 등록/해지',       lb:'계좌사고<br>등록/해지',        ic:'power',  go:'result', rk:'accidentcancel'},
  {k:'고객확인등록(CDD/EDD)',    lb:'고객확인등록<br>(CDD/EDD)',    ic:'idcard', go:'result', rk:'cdd'},
  {k:'서류발급 및 신청내역조회', lb:'서류발급 및<br>신청내역조회',  ic:'cert',   go:'result', rk:'certissue'},
  {k:'신용/대출 만기연장',       lb:'신용/대출<br>만기연장',        ic:'clock',  go:'result', rk:'creditext'},
  {k:'공모주 청약',              lb:'공모주<br>청약',               ic:'ipo',    go:'result', rk:'ipo'},
  {k:'간편/공동인증 관리',       lb:'간편/공동<br>인증관리',        ic:'shield', go:'result', rk:'authmgmt'},
];

/* 자주 찾는 서비스에 추가 가능한 후보(빈 슬롯 클릭 → 선택해서 FAV에 추가) */
let FAV_ADD = [
  {k:'펀드 조회·거래',   lb:'펀드<br>조회·거래',   ic:'fund',     go:'result'},
  {k:'연금저축 조회',    lb:'연금저축<br>조회',     ic:'pension',  go:'result'},
  {k:'해외주식 잔고조회', lb:'해외주식<br>잔고조회', ic:'globe',    go:'result'},
  {k:'환전 신청',        lb:'환전<br>신청',         ic:'transfer', go:'result'},
  {k:'ELS/DLS 조회',     lb:'ELS/DLS<br>조회',      ic:'els',      go:'result'},
  {k:'자동이체 관리',     lb:'자동이체<br>관리',     ic:'clock',    go:'result'},
];

const CATS = {
  '금융상품':[
    {k:'펀드',ic:'fund'},{k:'연금저축',ic:'pension'},{k:'ELS/ELB',ic:'els'},
    {k:'ISA',ic:'isa'},{k:'Wrap',ic:'wrap'},{k:'국내채권',ic:'bond'},
    {k:'해외채권',ic:'globe'},{k:'AI자산관리',ic:'ai'},{k:'원화RP',ic:'rp'},
  ],
  '국내주식':[
    {k:'현재가',ic:'chart'},{k:'국내지수',ic:'globe'},{k:'주문/체결',ic:'order'},
    {k:'잔고/거래',ic:'wallet'},{k:'관심종목',ic:'els'},{k:'조건검색',ic:'search'},
    {k:'투자정보',ic:'isa'},{k:'테마/업종',ic:'wrap'},{k:'공모주',ic:'ipo'},
  ],
  '해외주식':[
    {k:'현재가',ic:'chart'},{k:'해외지수',ic:'globe'},{k:'환전',ic:'transfer'},
    {k:'주문/체결',ic:'order'},{k:'잔고조회',ic:'wallet'},{k:'관심종목',ic:'els'},
    {k:'시간외거래',ic:'clock'},{k:'배당내역',ic:'rp'},{k:'투자정보',ic:'isa'},
  ],
  '자산뱅킹':[
    {k:'계좌이체',ic:'transfer'},{k:'입출금',ic:'wallet'},{k:'대출',ic:'bond'},
    {k:'원화RP',ic:'rp'},{k:'외화',ic:'globe'},{k:'연금',ic:'pension'},
    {k:'세금/리포트',ic:'isa'},{k:'자동이체',ic:'clock'},{k:'혜택',ic:'ipo'},
  ],
};

const SISE = [
  {k:'현재가', d:'국내주식 가격, 거래량, 호가 등 확인', ic:'chart', go:'index'},
  {k:'국내/해외지수', d:'코스피, 코스닥, 다우존스 등 국내/해외 지수확인', ic:'globe', go:'index'},
  {k:'선물시세', d:'선물 가격, 거래량 등 확인', ic:'future', go:'index'},
  {k:'옵션시세', d:'콜/풋 옵션의 가격, 거래량 등 확인', ic:'option', go:'index'},
  {k:'시간외단일 현재가', d:'시간외단일시장의 국내주식 가격, 거래량 등 확인', ic:'clock', go:'index'},
];

/* 시안 2 인라인 확장 카테고리 */
const INLINE = [
  {k:'시세/지수조회', ic:'chart', subs:[
    {t:'현재가', d:'국내주식 가격·거래량·호가'},
    {t:'국내/해외지수', d:'코스피·코스닥·다우존스 등'},
    {t:'선물시세', d:'선물 가격·거래량'},
    {t:'옵션시세', d:'콜/풋 옵션 가격·거래량'},
    {t:'시간외단일 현재가', d:'시간외단일시장 가격'},
  ]},
  {k:'주문/체결안내', ic:'order', subs:[
    {t:'국내주식 주문', d:'매수·매도 주문'},
    {t:'체결 내역', d:'당일 체결 확인'},
    {t:'미체결 조회', d:'정정·취소'},
    {t:'예약주문', d:'장 시작 전 예약'},
  ]},
  {k:'잔고/거래내역', ic:'wallet', subs:[
    {t:'보유 잔고', d:'평가손익 확인'},
    {t:'거래내역', d:'기간별 거래'},
    {t:'입출금 내역', d:'예수금 흐름'},
    {t:'실현손익', d:'기간 손익'},
  ]},
  {k:'이체/서비스', ic:'transfer', subs:[
    {t:'계좌이체', d:'은행·증권 이체'},
    {t:'출금가능금액', d:'예수금 조회'},
    {t:'자동이체', d:'정기 이체 관리'},
  ]},
  {k:'공모주청약', ic:'ipo', subs:[
    {t:'진행 공모주', d:'청약 일정 안내'},
    {t:'청약하기', d:'청약 신청'},
    {t:'배정/환불', d:'결과 확인'},
  ]},
  {k:'사고신고/부가서비스', ic:'shield', subs:[
    {t:'분실/사고 신고', d:'카드·계좌 신고'},
    {t:'인증센터', d:'공동·금융인증서'},
    {t:'알림 설정', d:'푸시·체결 알림'},
  ]},
];

/* 자주 찾는 서비스 → 상세 메뉴 리스트 (시안 1) */
const DETAIL = {
  '계좌잔고 및 거래내역조회':[
    {k:'계좌잔고·예수금 조회', d:'보유종목 평가손익·예수금 잔액', ic:'wallet', go:'holdings'},
    {k:'거래 내역',           d:'기간별 매매·입출금 내역',       ic:'order',  go:'trades'},
    {k:'체결 내역',           d:'당일 체결된 주문 확인',         ic:'clock',  go:'filled'},
  ],
  '거래내역/체결내역':[
    {k:'거래 내역', d:'기간별 매매·입출금 내역', ic:'order', go:'trades'},
    {k:'체결 내역', d:'당일 체결된 주문 확인',   ic:'clock', go:'filled'},
  ],
  '주문/체결안내':[
    {k:'미체결 조회', d:'정정·취소 가능한 주문 확인', ic:'order',  go:'unfilled'},
    {k:'체결 내역',   d:'당일 체결된 주문 확인',       ic:'clock',  go:'filled'},
    {k:'예약주문 현황', d:'장 시작 전 예약한 주문',     ic:'isa',    go:'reserved'},
  ],
  '잔고/거래내역':[
    {k:'보유 잔고',   d:'평가손익·보유종목 확인', ic:'wallet',  go:'holdings'},
    {k:'거래 내역',   d:'기간별 매매 내역',       ic:'order',   go:'trades'},
    {k:'입출금 내역', d:'예수금 입출금 흐름',     ic:'transfer',go:'cashflow'},
    {k:'실현손익',    d:'기간별 실현손익 집계',   ic:'chart',   go:'pnl'},
  ],
  '이체/서비스':[
    {k:'계좌 이체',     d:'은행·증권 계좌로 이체',   ic:'transfer',go:'transfer'},
    {k:'출금가능금액',  d:'출금 가능 예수금 조회',   ic:'wallet',  go:'withdrawable'},
    {k:'자동이체 관리', d:'정기 이체 등록·해지',     ic:'clock',   go:'autotransfer'},
  ],
  '공모주청약':[
    {k:'진행중 공모주', d:'청약 일정·경쟁률 안내', ic:'ipo', go:'ipolist'},
    {k:'청약 결과',     d:'배정·환불 결과 확인',   ic:'isa', go:'iporesult'},
  ],
  '사고신고/부가서비스':[
    {k:'분실·사고 신고', d:'카드·계좌 사고 접수',     ic:'shield', go:'report'},
    {k:'인증센터',       d:'공동·금융인증서 관리',     ic:'shield', go:'cert'},
    {k:'알림 설정',      d:'체결·입출금 푸시 알림',    ic:'bell',   go:'noti'},
  ],
};

/* ---------- 결과 화면 렌더러 ---------- */
const won = n => n.toLocaleString('ko-KR');

const RESULT = {
  index: indexResult,

  /* ID·계좌번호 조회 / PW초기화 */
  idpw(){
    const items = [
      {k:'아이디(ID) 조회', d:'가입 정보로 아이디 찾기', ic:'search', go:'idpwfind'},
      {k:'계좌번호 조회', d:'본인 명의 계좌번호 확인', ic:'wallet', go:'acctfind'},
      {k:(isV21Ver()?'ID비밀번호 재설정':'ID비밀번호 초기화'), d:'본인인증 후 로그인 비밀번호 재설정', ic:'key', go:'idpwreset'},
    ];
    if(isV21Ver()) items.push({k:'장기미사용 ID 제한해제', d:'1년 이상 미사용 계정의 로그인 제한 해제', ic:'clock', go:'idrelease'});
    return menuList(items);
  },

  /* ID·계좌번호 조회 ── 본인 명의 계좌번호 조회 */
  acctfind(){
    const authed = sessionAuthed;   // 본인인증 완료 시 마스킹 해제하고 전체 계좌번호 표시
    const acc=[
      {full:'키움 종합 1234-5678-90',  mask:'키움 종합 1234-56**-**',  d:'종합위탁 · 2019.03.14 개설', rep:true},
      {full:'키움 CMA 9876-5432-10',   mask:'키움 CMA 9876-54**-**',   d:'CMA · 2021.08.02 개설'},
      {full:'키움 연금저축 5555-1234-56', mask:'키움 연금저축 5555-12**-**', d:'연금저축계좌 · 2022.05.10 개설'},
    ];
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">실명 확인</div><div class="v">홍길동</div></div>
      <div class="data-row"><div class="k">본인인증</div><div class="v up">${authed?'본인인증 완료':'인증 필요'}</div></div>
    </div>
    <div class="sec-title" style="padding-top:0">본인 명의 계좌 ${acc.length}</div>
    <div class="list">` + acc.map(a=>`
      <div class="row" style="cursor:default">
        <div class="ic">${I.wallet}</div>
        <div class="tx"><div class="t">${authed?a.full:a.mask}${a.rep?` <span class="tag live">대표</span>`:''}</div><div class="d">${a.d}</div></div>
      </div>`).join('') + `</div>
    <div class="notice">${authed?'본인인증이 완료되어 계좌번호 전체가 표시됩니다.':'보안을 위해 계좌번호 일부는 마스킹(**)되어 표시됩니다.'}</div>`;
  },

  /* ID조회 ── 아이디(ID) 조회 결과 */
  idpwfind(){
    const authed = sessionAuthed;   // 본인인증 완료 시 마스킹 해제하고 전체 아이디 표시
    const ids=[
      {full:'kiwoom_hong',   mask:'kiwoom_h****', d:'2019.03.14 가입 · 최근 로그인 2026.06.21', rep:true},
      {full:'honggildong90', mask:'hong****90',   d:'2021.08.02 가입 · 최근 로그인 2025.11.02'},
    ];
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">실명 확인</div><div class="v">홍길동</div></div>
      <div class="data-row"><div class="k">본인인증</div><div class="v up">${authed?'본인인증 완료':'인증 필요'}</div></div>
      <div class="data-row"><div class="k">가입일</div><div class="v">2019.03.14</div></div>
    </div>
    <div class="sec-title" style="padding-top:0">회원님의 아이디</div>
    <div class="list">` + ids.map(x=>`
      <div class="row" style="cursor:default">
        <div class="ic">${I.search}</div>
        <div class="tx"><div class="t">${authed?x.full:x.mask}${x.rep?` <span class="tag live">대표</span>`:''}</div><div class="d">${x.d}</div></div>
      </div>`).join('') + `</div>
    <div class="notice">${authed?'본인인증이 완료되어 전체 아이디가 표시됩니다.':'보안을 위해 아이디 일부는 마스킹(****)되어 표시됩니다.'}</div>`;
  },

  /* PW초기화 ── 비밀번호 초기화(재설정) */
  idpwreset(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">아이디</div><div class="v">kiwoom_h****</div></div>
      <div class="data-row"><div class="k">본인인증</div><div class="v up">휴대폰 인증 완료</div></div>
    </div>
    <div class="auth-info" style="margin:0 16px">
      <div class="ir"><span class="k">새 비밀번호</span>
        <input class="ir-input" type="password" autocomplete="new-password" placeholder="새 비밀번호 입력"></div>
      <div class="ir"><span class="k">비밀번호 확인</span>
        <input class="ir-input" type="password" autocomplete="new-password" placeholder="비밀번호 다시 입력"></div>
    </div>
    <div class="notice" style="margin-top:12px">영문·숫자·특수문자를 조합해 8~20자로 설정해 주세요. 직전에 사용한 비밀번호는 다시 사용할 수 없습니다.</div>
    <div class="primary-btn" data-flash="비밀번호가 재설정되었습니다. 새 비밀번호로 다시 로그인해 주세요. (시연용)">비밀번호 재설정</div>`;
  },

  /* 장기미사용 ID 제한해제 — 1년 이상 미로그인 계정 제한 상태 + 해제 (실데이터) */
  idrelease(){
    const authed = sessionAuthed;   // 인증 완료 시 아이디 전체 표시
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">아이디</div><div class="v">${authed?'honggildong90':'hong****90'}</div></div>
      <div class="data-row"><div class="k">계정 상태</div><div class="v down">로그인 제한 (장기미사용)</div></div>
      <div class="data-row"><div class="k">마지막 로그인</div><div class="v">2025.11.02</div></div>
      <div class="data-row"><div class="k">제한 적용일</div><div class="v">2026.11.02</div></div>
      <div class="data-row"><div class="k">본인인증</div><div class="v up">${authed?'본인인증 완료':'인증 필요'}</div></div>
    </div>
    <div class="sec-title" style="padding-top:0">제한 안내</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.clock}</div>
        <div class="tx"><div class="t">장기미사용 로그인 제한 <span class="tag wait">제한중</span></div><div class="d">최근 1년 이상 로그인 이력이 없어 계정이 잠금되었습니다.</div></div>
      </div>
    </div>
    <div class="notice">본인인증 후 제한을 해제하면 다시 로그인하실 수 있습니다. 해제 후에도 장기간 미접속 시 재제한될 수 있습니다.</div>
    <div class="primary-btn" data-flash="장기미사용 ID 제한이 해제되었습니다. 다시 로그인하실 수 있습니다. (시연용)">제한 해제</div>`;
  },

  /* 간편비밀번호(PIN) 변경 */
  idpwpin(){
    pinReset();   // 화면 진입 시 입력버퍼 초기화 (이후 키 입력은 부분 DOM 갱신)
    const keys = [1,2,3,4,5,6,7,8,9,'',0,'⌫'];
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">아이디</div><div class="v">kiwoom_h****</div></div>
      <div class="data-row"><div class="k">간편비밀번호(PIN)</div><div class="v">등록됨 · 6자리</div></div>
    </div>
    <div class="pin-wrap">
      <div class="pin-entry">
        <div class="pin-guide" id="pinGuide">새로운 간편비밀번호<br>6자리를 입력해 주세요</div>
        <div class="pin-dots" id="pinDots"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      <div class="pin-pad">` + keys.map(k=> k===''
        ? `<div class="pin-key blank"></div>`
        : `<div class="pin-key" data-pinkey="${k==='⌫'?'back':k}">${k}</div>`).join('') + `</div>
    </div>
    <div class="notice">생년월일, 연속된 숫자(예: 123456), 동일한 숫자(예: 111111)는 사용할 수 없습니다.</div>`;
  },

  /* 비대면업무 신청현황 */
  untactstatus(){
    const items=[
      {k:'비대면 계좌개설', d:'종합위탁계좌 · 2026.06.20 신청', st:'done', lb:'완료', rk:'untactacct'},
      {k:'출금계좌등록', d:'신한 110-***-**56 · 2026.06.24 신청', st:'done', lb:'완료', rk:'untactwithdraw'},
      {k:'모바일 OTP 발급', d:'iPhone 15 Pro · 2026.06.28 신청', st:'wait', lb:'처리중', rk:'untactotp'},
      {k:'OTP 사고해지', d:'분실 신고 · 2026.06.26 신청', st:'done', lb:'완료', rk:'untactotpcancel'},
      {k:'계좌폐쇄', d:'CMA 9876-54** · 2026.06.19 신청', st:'live', lb:'반려', rk:'untactclose'},
      {k:'계좌비밀번호 재설정', d:'종합 1234-5678 · 2026.06.27 신청', st:'done', lb:'완료', rk:'untactpw'},
    ];
    return `<div class="list">` + items.map(x=>`
      <div class="row" data-s1go="result" data-rk="${x.rk}" data-fk="${x.k}">
        <div class="ic">${I.order}</div>
        <div class="tx"><div class="t">${x.k}</div><div class="d">${x.d}</div></div>
        <span class="tag ${x.st}">${x.lb}</span>
        <div class="chev">${I.chev}</div>
      </div>`).join('') + `</div>
    <div class="notice">최근 3개월 이내 비대면으로 신청한 업무의 처리 현황입니다. 항목을 선택하면 상세 진행 상황을 볼 수 있습니다.</div>`;
  },

  /* 비대면 ── 계좌개설 (완료) */
  untactacct(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0620-00123</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.20 14:32</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag done">완료</span></div></div>
    </div>`
    + untactSteps(['신청접수','서류심사','개설완료'], 3) +
    `<div class="sec-title">신청 내용</div>
    <div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">계좌 종류</div><div class="v">종합위탁계좌</div></div>
      <div class="data-row"><div class="k">투자성향</div><div class="v">적극투자형</div></div>
      <div class="data-row"><div class="k">연계 출금계좌</div><div class="v">신한 110-***-**56</div></div>
    </div>
    <div class="primary-btn" data-flash="개설된 계좌 정보로 이동합니다. (시연용)">개설 계좌 보기</div>
    <div class="notice">개설이 완료되어 즉시 거래가 가능합니다. 계좌번호는 '계좌번호 조회'에서 확인하세요.</div>`;
  },

  /* 비대면 ── 출금계좌등록 (완료) */
  untactwithdraw(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0624-00210</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.24 16:05</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag done">완료</span></div></div>
    </div>`
    + untactSteps(['등록 신청','계좌 인증','등록 완료'], 3) +
    `<div class="sec-title">신청 내용</div>
    <div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">등록 계좌</div><div class="v">신한은행 110-***-**56</div></div>
      <div class="data-row"><div class="k">인증 방식</div><div class="v">1원 계좌인증</div></div>
      <div class="data-row"><div class="k">등록일</div><div class="v">2026.06.24</div></div>
    </div>
    <div class="primary-btn" data-flash="등록된 출금계좌로 출금 화면으로 이동합니다. (시연용)">출금하기</div>
    <div class="notice">등록된 출금계좌로 즉시 출금·이체가 가능합니다.</div>`;
  },

  /* 비대면 ── 모바일 OTP 발급 (처리중) */
  untactotp(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0628-00377</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.28 10:42</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag wait">처리중</span></div></div>
    </div>`
    + untactSteps(['발급 신청','본인 인증','발급 완료'], 1) +
    `<div class="sec-title">신청 내용</div>
    <div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">OTP 종류</div><div class="v">모바일 OTP</div></div>
      <div class="data-row"><div class="k">등록 기기</div><div class="v">iPhone 15 Pro</div></div>
      <div class="data-row"><div class="k">처리 예정</div><div class="v">본인 인증 후 즉시</div></div>
    </div>
    <div class="primary-btn warn" data-flash="모바일 OTP 발급 신청을 취소했습니다. (시연용)">신청 취소</div>
    <div class="notice">모바일 OTP는 본인 인증 완료 후 등록 기기에서 즉시 사용할 수 있습니다.</div>`;
  },

  /* 비대면 ── OTP 사고해지 (완료) */
  untactotpcancel(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0626-00301</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.26 13:20</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag done">완료</span></div></div>
    </div>`
    + untactSteps(['해지 신청','본인 확인','해지 완료'], 3) +
    `<div class="sec-title">신청 내용</div>
    <div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">대상 OTP</div><div class="v">모바일 OTP</div></div>
      <div class="data-row"><div class="k">사고 사유</div><div class="v">분실</div></div>
      <div class="data-row"><div class="k">해지일</div><div class="v">2026.06.26</div></div>
    </div>
    <div class="primary-btn" data-flash="모바일 OTP 재발급 화면으로 이동합니다. (시연용)">OTP 재발급</div>
    <div class="notice">사고해지 후에는 새 OTP를 발급받아야 보안매체 인증을 사용할 수 있습니다.</div>`;
  },

  /* 비대면 ── 계좌폐쇄 (반려) */
  untactclose(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0619-00088</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.19 15:33</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag live">반려</span></div></div>
    </div>`
    + untactSteps(['폐쇄 신청','자산 확인','폐쇄 완료'], 1, true) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">반려 사유</div><div class="v">잔여 자산 존재</div></div>
      <div class="data-row"><div class="k">대상 계좌</div><div class="v">키움 CMA 9876-54**-**</div></div>
    </div>
    <div class="notice" style="text-align:left;margin:0 18px 12px">계좌에 예수금·보유종목이 남아 있어 폐쇄가 반려되었습니다. 잔여 자산 출금·이전 후 다시 신청해 주세요.</div>
    <div class="primary-btn" data-flash="잔여 자산 정리 후 계좌폐쇄를 다시 신청합니다. (시연용)">잔여 자산 정리하기</div>`;
  },

  /* 비대면 ── 계좌비밀번호 재설정 (완료) */
  untactpw(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">접수번호</div><div class="v">2026-0627-00455</div></div>
      <div class="data-row"><div class="k">신청일시</div><div class="v">2026.06.27 11:50</div></div>
      <div class="data-row"><div class="k">처리상태</div><div class="v"><span class="tag done">완료</span></div></div>
    </div>`
    + untactSteps(['재설정 신청','본인 인증','재설정 완료'], 3) +
    `<div class="sec-title">신청 내용</div>
    <div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">대상 계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">인증 방식</div><div class="v">휴대폰 본인인증</div></div>
      <div class="data-row"><div class="k">적용일</div><div class="v">2026.06.27</div></div>
    </div>
    <div class="notice">계좌 비밀번호가 재설정되었습니다. 다음 거래부터 새 비밀번호를 사용해 주세요.</div>`;
  },

  /* 계좌사고 등록/해지 */
  accidentcancel(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">현재 사고 등록</div><div class="v up">3건 등록됨</div></div>
    </div>`
    + (isV21Ver() ? '' : untactSteps(['신고 접수','사고 등록','해지·거래재개'], 1)) +
    `<div class="sec-title" style="padding-top:0">사고 신고 등록</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.power}</div>
        <div class="tx"><div class="t">계좌출금 정지 사고등록</div><div class="d">해당 계좌 출금·이체 즉시 정지</div></div>
        <span class="mini-btn" data-flash="계좌출금 정지 사고등록이 완료되었습니다. (시연용)">등록</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.idcard}</div>
        <div class="tx"><div class="t">제휴카드 분실 사고등록</div><div class="d">제휴 체크·신용카드 사용 정지</div></div>
        <span class="mini-btn" data-flash="제휴카드 분실 사고등록이 완료되었습니다. (시연용)">등록</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.key}</div>
        <div class="tx"><div class="t">OTP 사고등록</div><div class="d">OTP 분실·도난 · 보안매체 사용 정지</div></div>
        <span class="mini-btn" data-flash="OTP 사고등록이 완료되었습니다. (시연용)">등록</span>
      </div>
    </div>
    <div class="sec-title">등록된 사고 해지</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.shield}</div>
        <div class="tx"><div class="t">분실·도난 사고신고 <span class="tag live">등록중</span></div><div class="d">2026.06.22 등록 · 전 계좌 정지</div></div>
        <span class="mini-btn warn" data-flash="사고신고가 해지되었습니다. 정상 거래가 가능합니다. (시연용)">해지</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.clock}</div>
        <div class="tx"><div class="t">장기미사용계좌 <span class="tag wait">거래제한</span></div><div class="d">1년 이상 미사용 · 출금·이체 제한</div></div>
        <span class="mini-btn warn" data-s1go="result" data-rk="purpose" data-fk="금융거래목적확인서">해지</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.idcard}</div>
        <div class="tx"><div class="t">단기간 다수계좌 <span class="tag wait">거래제한</span></div><div class="d">단기간 다수 계좌개설 · 신규거래 제한</div></div>
        <span class="mini-btn warn" data-s1go="result" data-rk="purpose" data-fk="금융거래목적확인서">해지</span>
      </div>
    </div>
    <div class="notice">분실·도난 사고는 본인 확인 후 즉시 해지됩니다. 장기미사용·단기간 다수계좌의 거래제한 해지는 금융거래목적확인서 제출이 필요합니다.</div>`;
  },

  /* 금융거래목적확인서 */
  purpose(){
    return untactSteps(['정보 입력','서류 제출','제출 완료'], 0) +
    `<div class="field"><div class="fl">거래 목적</div><div class="fi">자산운용·투자 ${I.down}</div></div>
      <div class="field"><div class="fl">자금 원천</div><div class="fi">근로·사업 소득 ${I.down}</div></div>
      <div class="field"><div class="fl">직업 구분</div><div class="fi">회사원 ${I.down}</div></div>
      <div class="primary-btn" data-flash="금융거래목적확인서가 제출되었습니다. 거래제한이 해제됩니다. (시연용)">제출하기</div>
      <div class="notice">자금세탁방지(AML) 제도에 따라 금융거래 목적 확인이 필요합니다. 제출 후 장기미사용·다수계좌 거래제한이 해제됩니다.</div>`;
  },

  /* 고객정보확인 (CDD/EDD) */
  cdd(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">실명 확인</div><div class="v">홍길동 (****-1******)</div></div>
      <div class="data-row"><div class="k">고객확인 등급</div><div class="v">CDD · 일반</div></div>
      <div class="data-row"><div class="k">최근 확인일</div><div class="v">2025.06.20</div></div>
      <div class="data-row"><div class="k">갱신 예정일</div><div class="v up">2026.06.20</div></div>
    </div>
    <div class="primary-btn" data-applink="cdd">고객확인 정보 등록 · 갱신</div>
    <div class="notice">CDD/EDD는 고객확인제도에 따른 신원·거래목적 확인 절차입니다.</div>`;
  },

  /* 서류발급 및 신청내역조회 */
  certissue(){
    return menuList([
      {k:'잔고증명서', d:'특정일 기준 보유 잔고 증명', ic:'cert', go:'certbal'},
      {k:'거래내역서', d:'기간별 거래내역서 발급', ic:'doc', go:'certtx'},
      {k:'외납세액명세서', d:'외국 납부세액 내역 명세', ic:'doc', go:'certforeign'},
      {k:'양도소득내역서', d:'양도소득 대상 매매손익 명세', ic:'chart', go:'certgains'},
    ]);
  },

  /* 증명서 ── 잔고증명서 발급 */
  certbal(){
    return untactSteps(['발급 신청','발급 처리','발급 완료'], 0) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">증명 계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">예금주</div><div class="v">홍길동</div></div>
    </div>
    ${certField('certDate')}
    ${certField('certUse')}
    ${certField('certCopies')}
    <div class="primary-btn" data-flash="잔고증명서가 발급되었습니다. 등록된 이메일로 발송됩니다. (시연용)">잔고증명서 발급</div>
    <div class="notice">기준일 현재 보유 종목 평가금액과 예수금이 증명서에 표기됩니다.</div>`;
  },

  /* 증명서 ── 거래내역서 발급 */
  certtx(){
    return untactSteps(['발급 신청','발급 처리','발급 완료'], 0) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">발급 계좌</div><div class="v">키움 종합 1234-5678</div></div>
    </div>
    ${certField('certPeriod')}
    ${certField('certTxType')}
    ${certField('certFormat')}
    <div class="primary-btn" data-flash="거래내역서가 발급되었습니다. (시연용)">거래내역서 발급</div>
    <div class="notice">최근 5년 이내의 매매·입출금 거래내역서를 발급할 수 있습니다.</div>`;
  },

  /* 서류 ── 외납세액명세서 발급 */
  certforeign(){
    return untactSteps(['발급 신청','발급 처리','발급 완료'], 0) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">발급 계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">예금주</div><div class="v">홍길동</div></div>
    </div>
    ${certField('certTaxYear')}
    ${certField('certUse')}
    ${certField('certFormat')}
    <div class="primary-btn" data-flash="외납세액명세서가 발급되었습니다. (시연용)">외납세액명세서 발급</div>
    <div class="notice">해외 주식·채권 등에서 외국에 납부한 세액 내역을 명세서로 발급합니다. 연말정산·종합소득세 신고에 활용할 수 있습니다.</div>`;
  },

  /* 서류 ── 양도소득내역서 발급 */
  certgains(){
    return untactSteps(['발급 신청','발급 처리','발급 완료'], 0) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">발급 계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">예금주</div><div class="v">홍길동</div></div>
    </div>
    ${certField('certTaxYear')}
    ${certField('certUse')}
    ${certField('certFormat')}
    <div class="primary-btn" data-flash="양도소득내역서가 발급되었습니다. (시연용)">양도소득내역서 발급</div>
    <div class="notice">해외주식 등 양도소득 대상 자산의 매매 손익 내역을 명세서로 발급합니다. 양도소득세 신고에 활용할 수 있습니다.</div>`;
  },

  /* 신용·대출 만기연장 신청 */
  creditext(){
    return (isV21Ver() ? '' : untactSteps(['연장 신청','연장 심사','연장 완료'], 0)) +
    `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">대출 계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">신용·대출 잔액</div><div class="v">15,400,000원</div></div>
      <div class="data-row"><div class="k">담보비율</div><div class="v up">182%</div></div>
    </div>
    <div class="sec-title" style="padding-top:0">연장 가능 2건</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.clock}</div>
        <div class="tx"><div class="t">신용융자 만기연장</div><div class="d">잔액 12,400,000원 · 만기 2026.07.10 (D-14)</div></div>
        <span class="mini-btn" data-flash="신용융자 만기연장이 신청되었습니다. (시연용)">연장신청</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.bond}</div>
        <div class="tx"><div class="t">매도대금 담보대출 만기연장</div><div class="d">잔액 3,000,000원 · 만기 2026.07.05 (D-9)</div></div>
        <span class="mini-btn" data-flash="담보대출 만기연장이 신청되었습니다. (시연용)">연장신청</span>
      </div>
    </div>
    <div class="notice">만기연장은 약정 한도·담보비율 충족 시 신청 당일 처리됩니다.</div>`;
  },

  /* 공모주 청약 */
  ipo(){
    return `<div class="sec-title" style="padding-top:0">진행 중 공모주</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.ipo}</div>
        <div class="tx"><div class="t">에이펙스반도체 <span class="tag live">청약중</span></div><div class="d">6/24~6/25 · 확정공모가 36,000원</div></div>
        <span class="mini-btn" data-flash="공모주 청약 화면으로 이동합니다. (시연용)">청약</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.ipo}</div>
        <div class="tx"><div class="t">대명에너지 <span class="tag wait">예정</span></div><div class="d">7/01~7/02 · 희망밴드 18,000~21,000원</div></div>
        <span class="mini-btn" data-flash="공모주 청약 알림이 신청되었습니다.">알림신청</span>
      </div>
    </div>
    <div class="sec-title">청약 조회</div>` + menuList([
      {k:'청약 경쟁률 조회', d:'종목별 청약 경쟁률 확인', ic:'chart', go:'iporate'},
      {k:'환불·배정 조회', d:'배정 주수 및 환불금 확인', ic:'wallet', go:'iporesult'},
      {k:'청약 내역 조회', d:'나의 공모주 청약 신청 내역', ic:'doc', go:'ipohist'},
    ]);
  },

  /* 공모주 ── 청약 경쟁률 조회 */
  iporate(){
    const r=[
      {n:'에이펙스반도체', rate:'1,420 : 1', st:'live', lb:'청약중', d:'06.24~06.25 청약중'},
      {n:'그린에너지솔루션', rate:'예정', st:'wait', lb:'예정', d:'06.26~06.27 예정'},
      {n:'대명에너지', rate:'875 : 1', st:'done', lb:'마감', d:'06.18 청약마감'},
    ];
    return `<div class="list">` + r.map(x=>`
      <div class="row" style="cursor:default">
        <div class="ic">${I.chart}</div>
        <div class="tx"><div class="t">${x.n} <span class="tag ${x.st}">${x.lb}</span></div><div class="d">${x.d}</div></div>
        <div class="rt2"><div class="p">${x.rate}</div></div>
      </div>`).join('') + `</div>
      <div class="notice">기관 수요예측 경쟁률이며, 일반 청약 경쟁률은 청약 마감 후 확정됩니다.</div>`;
  },

  /* 공모주 ── 청약 내역 조회 */
  ipohist(){
    return `<div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.ipo}</div>
        <div class="tx"><div class="t">미래모빌리티 <span class="tag done">배정완료</span></div><div class="d">청약 100주 · 배정 7주 · 환불 2,790,000원</div></div>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.ipo}</div>
        <div class="tx"><div class="t">에이펙스반도체 <span class="tag live">청약중</span></div><div class="d">청약 50주 · 증거금 900,000원 · 06.25 마감</div></div>
        <span class="mini-btn warn" data-flash="공모주 청약을 취소했습니다. (시연용)">취소</span>
      </div>
    </div>
    <div class="notice">최근 1년간의 공모주 청약 신청 내역을 조회할 수 있습니다.</div>`;
  },

  /* 간편/공동인증 등록·해지 */
  authmgmt(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">간편비밀번호(PIN)</div><div class="v up">등록됨</div></div>
      <div class="data-row"><div class="k">생체인증</div><div class="v">미등록</div></div>
      <div class="data-row"><div class="k">공동인증서</div><div class="v">2026.09.12 만료</div></div>
    </div>` + menuList([
      {k:'간편비밀번호(PIN) 변경', d:'6자리 간편비밀번호 재설정', ic:'shield', go:'idpwpin'},
      {k:'생체인증 등록', d:'지문·Face ID 등록', ic:'key', go:'authbio'},
      {k:'공동인증서 갱신/재발급', d:'인증서 갱신·타기관 등록', ic:'cert', go:'authcert'},
      {k:'간편/공동인증 해지', d:'등록된 인증수단 해지', ic:'x', go:'authrevoke'},
    ]);
  },

  /* ===== 9. 권리업무 (셀프서비스 메뉴구조도 9번 · 대 > 중 > 소) ===== */
  /* 권리업무 (대분류) → 중분류 4종 */
  rights(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">계좌</div><div class="v">키움 종합 1234-5678</div></div>
      <div class="data-row"><div class="k">진행중 권리</div><div class="v up">2건</div></div>
    </div>` + menuList([
      {k:'유상청약',       d:'유상증자 청약 신청·예약·취소·내역', ic:'ipo',    go:'rightsOffer'},
      {k:'주주반대의사',   d:'주총 안건 반대의사 통지 신청·취소·내역', ic:'doc',   go:'rightsDissent'},
      {k:'주식매수청구',   d:'주식매수청구권 행사 신청·취소·내역', ic:'wallet', go:'rightsAppraisal'},
      {k:'권리현황',       d:'보유 종목 권리배정·일정 조회', ic:'search', go:'rightsStatus'},
    ]);
  },
  /* 권리업무 ── 1) 유상청약 (중분류) → 소분류 4종 */
  rightsOffer(){
    return `<div class="sec-title" style="padding-top:0">유상청약</div>`
    + menuList([
      {k:'유상청약 신청',     d:'당일 유상증자 청약 신청'},
      {k:'유상청약예약 신청', d:'예약 청약 신청 (청약기간 내 자동접수)'},
      {k:'유상청약 취소',     d:'당일·예약 청약 취소'},
      {k:'유상청약신청내역',  d:'청약 신청·배정·환불 내역 조회'},
    ], `'유상청약' 세부 업무는 시연 준비 중입니다. (시연용)`);
  },
  /* 권리업무 ── 2) 주주반대의사 (중분류) → 소분류 3종 */
  rightsDissent(){
    return `<div class="sec-title" style="padding-top:0">주주반대의사</div>`
    + menuList([
      {k:'주주반대의사 신청',    d:'주주총회 안건 반대의사 통지'},
      {k:'주주반대의사 신청취소', d:'통지한 반대의사 철회'},
      {k:'주주반대의사신청내역',  d:'반대의사 통지 내역 조회'},
    ], `'주주반대의사' 세부 업무는 시연 준비 중입니다. (시연용)`);
  },
  /* 권리업무 ── 3) 주식매수청구 (중분류) → 소분류 3종 */
  rightsAppraisal(){
    return `<div class="sec-title" style="padding-top:0">주식매수청구</div>`
    + menuList([
      {k:'주식매수청구 신청',    d:'주식매수청구권 행사 신청'},
      {k:'주식매수청구 신청취소', d:'행사 신청 취소'},
      {k:'주식매수청구신청내역',  d:'매수청구 신청·정산 내역 조회'},
    ], `'주식매수청구' 세부 업무는 시연 준비 중입니다. (시연용)`);
  },
  /* 권리업무 ── 4) 권리현황 (중분류 · 소분류 없음, 조회 화면) */
  rightsStatus(){
    return `<div class="sec-title" style="padding-top:0">보유 종목 권리현황</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.ipo}</div>
        <div class="tx"><div class="t">삼성전자 <span class="tag live">유상증자</span></div><div class="d">신주배정기준일 2026.07.10 · 청약 07.21~07.22</div></div>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.doc}</div>
        <div class="tx"><div class="t">SK하이닉스 <span class="tag wait">주총</span></div><div class="d">정기주총 2026.07.15 · 반대의사 접수 ~07.14</div></div>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.wallet}</div>
        <div class="tx"><div class="t">현대차 <span class="tag">배당</span></div><div class="d">배당기준일 2026.06.30 · 주당 1,500원</div></div>
      </div>
    </div>
    <div class="notice">권리배정·청약 일정은 발행회사·명의개서대리인 사정에 따라 변경될 수 있습니다.</div>`;
  },

  /* 인증관리 ── 생체인증 등록 */
  authbio(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">기기</div><div class="v">iPhone 15 Pro</div></div>
      <div class="data-row"><div class="k">생체인증 상태</div><div class="v">미등록</div></div>
    </div>
    <div class="toggle-row">
      <div><div class="tl">지문(Touch ID) 로그인</div><div class="td">지문으로 간편 로그인·인증</div></div>
      <div class="sw" data-sw></div>
    </div>
    <div class="toggle-row">
      <div><div class="tl">얼굴(Face ID) 로그인</div><div class="td">얼굴 인식으로 간편 로그인·인증</div></div>
      <div class="sw on" data-sw></div>
    </div>
    <div class="primary-btn" data-flash="생체인증이 등록되었습니다. 다음 로그인부터 사용할 수 있습니다. (시연용)">생체인증 등록</div>
    <div class="notice">생체정보는 고객님 기기의 보안영역에만 저장되며 서버로 전송되지 않습니다.</div>`;
  },

  /* 인증관리 ── 공동인증서 갱신/재발급 */
  authcert(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">인증서 종류</div><div class="v">공동인증서(범용)</div></div>
      <div class="data-row"><div class="k">발급기관</div><div class="v">yessign</div></div>
      <div class="data-row"><div class="k">만료일</div><div class="v up">2026.09.12 (D-75)</div></div>
    </div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.cert}</div>
        <div class="tx"><div class="t">인증서 갱신</div><div class="d">만료 전 동일 인증서를 1년 연장</div></div>
        <span class="mini-btn" data-flash="공동인증서 갱신이 완료되었습니다. (시연용)">갱신</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.shield}</div>
        <div class="tx"><div class="t">인증서 재발급</div><div class="d">분실·훼손 시 신규 발급</div></div>
        <span class="mini-btn" data-flash="공동인증서 재발급 절차를 시작합니다. (시연용)">재발급</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.transfer}</div>
        <div class="tx"><div class="t">타기관 인증서 등록</div><div class="d">은행·타사 인증서 가져오기</div></div>
        <span class="mini-btn" data-flash="타기관 인증서 등록 화면으로 이동합니다. (시연용)">등록</span>
      </div>
    </div>
    <div class="notice">인증서 갱신은 만료 30일 전부터 신청할 수 있습니다.</div>`;
  },

  /* 인증관리 ── 간편/공동인증 해지 */
  authrevoke(){
    return `<div class="sec-title" style="padding-top:0">등록된 인증수단</div>
    <div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.shield}</div>
        <div class="tx"><div class="t">간편비밀번호(PIN)</div><div class="d">6자리 PIN · 2024.01.10 등록</div></div>
        <span class="mini-btn warn" data-flash="간편비밀번호가 해지되었습니다. (시연용)">해지</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.key}</div>
        <div class="tx"><div class="t">생체인증(Face ID)</div><div class="d">2025.03.22 등록</div></div>
        <span class="mini-btn warn" data-flash="생체인증이 해지되었습니다. (시연용)">해지</span>
      </div>
      <div class="row" style="cursor:default">
        <div class="ic">${I.cert}</div>
        <div class="tx"><div class="t">공동인증서(범용)</div><div class="d">2026.09.12 만료</div></div>
        <span class="mini-btn warn" data-flash="공동인증서가 해지되었습니다. (시연용)">해지</span>
      </div>
    </div>
    <div class="notice">모든 인증수단을 해지하면 다음 로그인 시 본인인증을 다시 진행해야 합니다.</div>`;
  },

  /* 잔고 ── 보유 잔고 */
  holdings(){
    const stk = [
      {n:'삼성전자', q:10, avg:78000, cur:83200},
      {n:'SK하이닉스', q:3, avg:198000, cur:212500},
      {n:'현대차', q:5, avg:241000, cur:228000},
      {n:'카카오', q:20, avg:54200, cur:49800},
    ];
    let totEval=0, totCost=0;
    let rows = stk.map(s=>{
      const ev=s.q*s.cur, pl=(s.cur-s.avg)*s.q, rt=((s.cur-s.avg)/s.avg*100);
      totEval+=ev; totCost+=s.q*s.avg;
      const up=pl>=0, cls=up?'txt-up':'txt-down', sign=up?'+':'';
      return `<div class="stk">
        <div><div class="nm">${s.n}</div><div class="sub2">${s.q}주 · 평단 ${won(s.avg)}</div></div>
        <div class="rt"><div class="p">${won(ev)}</div>
          <div class="pc ${cls}">${sign}${won(pl)} (${sign}${rt.toFixed(1)}%)</div></div>
      </div>`;
    }).join('');
    const totPl=totEval-totCost, totRt=totPl/totCost*100;
    const up=totPl>=0, cls=up?'up':'down', sign=up?'+':'';
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">총 평가금액</div><div class="v">${won(totEval)}원</div></div>
      <div class="data-row"><div class="k">총 평가손익</div><div class="v ${cls}">${sign}${won(totPl)} (${sign}${totRt.toFixed(1)}%)</div></div>
      <div class="data-row"><div class="k">출금가능 예수금</div><div class="v">2,150,000원</div></div>
    </div>
    <div class="sec-title" style="padding-top:0">보유 종목 ${stk.length}</div>
    <div class="data-card">${rows}</div>`;
  },

  /* 잔고 ── 미체결 */
  unfilled(){
    const o=[
      {n:'삼성전자', s:'매수', q:10, p:83000, st:'미체결'},
      {n:'카카오',   s:'매도', q:20, p:50500, st:'부분체결'},
    ];
    return `<div class="list">` + o.map(x=>`
      <div class="row" style="cursor:default">
        <div class="tx"><div class="t">${x.n} <span class="tag ${x.s==='매수'?'live':'done'}">${x.s}</span></div>
          <div class="d">${x.q}주 · ${won(x.p)}원 · ${x.st}</div></div>
        <div style="display:flex;gap:7px">
          <span class="mini-btn" data-flash="정정 화면으로 이동합니다.">정정</span>
          <span class="mini-btn warn" data-flash="주문을 취소했습니다.">취소</span>
        </div>
      </div>`).join('') + `</div>
      <div class="notice">미체결 주문은 장중에만 정정·취소할 수 있습니다.</div>`;
  },

  /* 잔고 ── 체결 내역 */
  filled(){
    const all=[
      {n:'삼성전자', s:'매수', q:10, p:78000, t:'09:12'},
      {n:'SK하이닉스', s:'매수', q:3, p:198000, t:'10:34'},
      {n:'현대차', s:'매도', q:2, p:235000, t:'13:05'},
    ];
    let body;
    if(orderTab==='전체'){
      const o = txFilter.stock ? all.filter(x=>x.n===txFilter.stock) : all;
      body = o.length
        ? `<div class="list">` + o.map(x=>`
            <div class="row" style="cursor:default">
              <div class="tx"><div class="t">${x.n} <span class="tag ${x.s==='매수'?'live':'done'}">${x.s}</span></div>
                <div class="d">${x.q}주 · ${won(x.p)}원 · ${x.t} 체결</div></div>
              <div class="rt2"><div class="p">${won(x.q*x.p)}원</div></div>
            </div>`).join('') + `</div>`
        : orderEmpty();
    } else if(orderTab==='예약'){
      body = `<div class="list">
        <div class="row" style="cursor:default">
          <div class="tx"><div class="t">삼성전자 <span class="tag wait">예약</span></div>
            <div class="d">매수 5주 · 82,000원 · 내일 09:00 발주</div></div>
          <span class="mini-btn warn" data-flash="예약주문을 취소했습니다.">취소</span>
        </div></div>`;
    } else {   // 미체결: 정정·취소 가능한 주문 (취소 버튼 포함)
      const un=[
        {n:'삼성전자', s:'매수', q:5, p:82000, t:'09:30'},
        {n:'카카오', s:'매도', q:10, p:51000, t:'10:15'},
        {n:'NAVER', s:'매수', q:2, p:198500, t:'11:02'},
      ];
      const u = txFilter.stock ? un.filter(x=>x.n===txFilter.stock) : un;
      body = u.length
        ? `<div class="list">` + u.map(x=>`
            <div class="row" style="cursor:default">
              <div class="tx"><div class="t">${x.n} <span class="tag ${x.s==='매수'?'live':'done'}">${x.s}</span></div>
                <div class="d">${x.q}주 · ${won(x.p)}원 · ${x.t} 주문 · 미체결</div></div>
              <span class="mini-btn warn" data-flash="미체결 주문을 취소했습니다. (시연용)">취소</span>
            </div>`).join('') + `</div>`
        : orderEmpty();
    }
    return orderFilterBar() + body;
  },

  /* 잔고 ── 예약주문 */
  reserved(){
    return `<div class="list">
      <div class="row" style="cursor:default">
        <div class="tx"><div class="t">삼성전자 <span class="tag wait">예약</span></div>
          <div class="d">매수 5주 · 82,000원 · 내일 09:00 발주</div></div>
        <span class="mini-btn warn" data-flash="예약주문을 취소했습니다.">취소</span>
      </div></div>
      <div class="notice">예약주문은 다음 영업일 장 시작 시 자동 발주됩니다.</div>`;
  },

  /* 잔고 ── 거래내역 */
  trades(){
    const all=[
      {d:'06.20', n:'삼성전자', s:'매수', a:780000},
      {d:'06.18', n:'카카오', s:'매도', a:1010000},
      {d:'06.16', n:'SK하이닉스', s:'매수', a:594000},
    ];
    const o = txFilter.stock ? all.filter(x=>x.n===txFilter.stock) : all;
    const body = o.length
      ? `<div class="data-card">` + o.map(x=>`
          <div class="data-row"><div class="k">${x.d} · ${x.n} ${x.s}</div>
            <div class="v ${x.s==='매수'?'up':'down'}">${x.s==='매수'?'-':'+'}${won(x.a)}</div></div>`).join('') + `</div>`
      : `<div class="tx-empty"><div class="te-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M9 16v-3M12 16v-6M15 16v-2"/></svg></div><div class="te-t">거래내역이 없어요.</div></div>`;
    return txFilterBar() + body;
  },

  /* 잔고 ── 입출금 */
  cashflow(){
    const o=[
      {d:'06.21', k:'타행 입금', a:3000000, plus:true},
      {d:'06.20', k:'주식 매수 대금', a:780000, plus:false},
      {d:'06.15', k:'배당금 입금', a:42500, plus:true},
    ];
    return `<div class="data-card">` + o.map(x=>`
      <div class="data-row"><div class="k">${x.d} · ${x.k}</div>
        <div class="v ${x.plus?'down':'up'}">${x.plus?'+':'-'}${won(x.a)}</div></div>`).join('')
      + `</div>`;
  },

  /* 잔고 ── 실현손익 */
  pnl(){
    return `<div class="data-card" style="margin-bottom:14px">
      <div class="data-row"><div class="k">이번 달 실현손익</div><div class="v up">+312,400</div></div>
      <div class="data-row"><div class="k">실현 수익률</div><div class="v up">+5.8%</div></div>
      <div class="data-row"><div class="k">매매 수수료·세금</div><div class="v">-8,210</div></div>
    </div>
    <div class="data-card">
      <div class="data-row"><div class="k">카카오 (매도)</div><div class="v up">+158,000</div></div>
      <div class="data-row"><div class="k">현대차 (매도)</div><div class="v down">-12,000</div></div>
      <div class="data-row"><div class="k">NAVER (매도)</div><div class="v up">+166,400</div></div>
    </div>`;
  },

  /* 이체 ── 계좌이체 */
  transfer(){
    return `<div class="field"><div class="fl">출금 계좌</div>
        <div class="fi">키움증권 종합 1234-5678 <span class="unit">2,150,000원</span></div></div>
      <div class="field"><div class="fl">입금 계좌</div>
        <div class="fi">신한은행 110-***-****56 ${I.down}</div></div>
      <div class="field"><div class="fl">이체 금액</div>
        <div class="fi amt">1,000,000<span class="unit">원</span></div></div>
      <div class="primary-btn" data-flash="이체가 완료되었습니다. (시연용)">이체하기</div>
      <div class="notice">간편모드에서는 1일 1,000만원까지 즉시 이체할 수 있습니다.</div>`;
  },

  /* 이체 ── 출금가능금액 */
  withdrawable(){
    return `<div class="data-card">
      <div class="data-row"><div class="k">예수금</div><div class="v">2,150,000원</div></div>
      <div class="data-row"><div class="k">미수·담보 차감</div><div class="v">0원</div></div>
      <div class="data-row"><div class="k">출금가능금액</div><div class="v up">2,150,000원</div></div>
    </div>
    <div class="primary-btn" data-flash="출금 화면으로 이동합니다.">출금하기</div>`;
  },

  /* 이체 ── 자동이체 */
  autotransfer(){
    return `<div class="list">
      <div class="row" style="cursor:default">
        <div class="ic">${I.clock}</div>
        <div class="tx"><div class="t">매월 25일 · 연금저축</div><div class="d">신한은행 → 키움 · 300,000원</div></div>
        <span class="tag done">정상</span>
      </div></div>
      <div class="primary-btn" data-flash="자동이체 등록 화면으로 이동합니다.">+ 자동이체 등록</div>`;
  },

  /* 공모주 ── 진행중 */
  ipolist(){
    const ipo=[
      {n:'에이펙스반도체', band:'52,000~60,000', date:'06.24~06.25', rate:'1,420 : 1', st:'live'},
      {n:'그린에너지솔루션', band:'18,000~22,000', date:'06.26~06.27', rate:'예정', st:'wait'},
    ];
    return ipo.map(x=>`<div class="ipo-card">
      <div class="ih"><div class="ic" style="width:34px;height:34px;border-radius:10px;background:var(--primary-soft);display:grid;place-items:center;color:var(--primary)">${I.ipo}</div>
        <div class="nm">${x.n}</div>
        <span class="tag ${x.st}" style="margin-left:auto">${x.st==='live'?'청약중':'청약예정'}</span></div>
      <div class="irow"><div class="k">공모가 밴드</div><div class="v">${x.band}원</div></div>
      <div class="irow"><div class="k">청약 기간</div><div class="v">${x.date}</div></div>
      <div class="irow"><div class="k">기관 경쟁률</div><div class="v">${x.rate}</div></div>
      ${x.st==='live'?`<div class="primary-btn" style="margin:12px 0 0" data-flash="청약 신청 화면으로 이동합니다.">청약하기</div>`:''}
    </div>`).join('');
  },

  /* 공모주 ── 청약 결과 */
  iporesult(){
    return `<div class="ipo-card">
      <div class="ih"><div class="nm">미래모빌리티</div><span class="tag done" style="margin-left:auto">배정완료</span></div>
      <div class="irow"><div class="k">청약 수량</div><div class="v">100주</div></div>
      <div class="irow"><div class="k">배정 수량</div><div class="v">7주</div></div>
      <div class="irow"><div class="k">환불 금액</div><div class="v">2,790,000원</div></div>
      <div class="irow"><div class="k">환불 예정일</div><div class="v">06.24</div></div>
    </div>`;
  },

  /* 사고신고 ── 분실/사고 */
  report(){
    return menuList([
      {k:'계좌 사고 신고', d:'부정 거래·도용 의심 시 즉시 정지', ic:'shield'},
      {k:'OTP·보안카드 분실', d:'재발급 및 일시 정지 신청', ic:'shield'},
      {k:'명의도용 차단', d:'비대면 계좌개설 차단 신청', ic:'shield'},
    ], '신고 접수 화면으로 이동합니다.');
  },

  /* 사고신고 ── 인증센터 */
  cert(){
    return menuList([
      {k:'공동인증서 관리', d:'발급·갱신·복사·삭제', ic:'shield'},
      {k:'금융인증서 관리', d:'클라우드 인증서', ic:'shield'},
      {k:'간편비밀번호 변경', d:'6자리 PIN 재설정', ic:'shield'},
    ], '인증 화면으로 이동합니다.');
  },

  /* 사고신고 ── 알림설정 */
  noti(){
    const t=[
      {k:'체결 알림', d:'주문 체결 시 푸시 발송', on:true},
      {k:'입출금 알림', d:'예수금 변동 시 푸시 발송', on:true},
      {k:'관심종목 시세 알림', d:'목표가 도달 시 알림', on:false},
      {k:'공모주 일정 알림', d:'청약 시작 전 안내', on:true},
    ];
    return t.map(x=>`<div class="toggle-row">
      <div><div class="tl">${x.k}</div><div class="td">${x.d}</div></div>
      <div class="sw ${x.on?'on':''}" data-sw></div>
    </div>`).join('');
  },
};

// 비대면업무 진행 단계 스텝바 (cur=진행중 단계 index, cur>=length면 전체 완료, rejected=cur단계 반려)
function untactSteps(steps, cur, rejected){
  return `<div class="usteps">` + steps.map((s,i)=>{
    const cls = i<cur ? 'done' : (i===cur ? (rejected?'reject':'cur') : '');
    const mark = i<cur ? I.check : (i===cur && rejected ? '!' : (i+1));
    return `<div class="ustep ${cls}"><span class="udot">${mark}</span><span class="ulabel">${s}</span></div>`;
  }).join('') + `</div>`;
}

function menuList(items, msg){
  // x.go 가 있으면 해당 결과화면으로 이동, 없으면 안내 메시지(flash)
  return `<div class="list">` + items.map(x=>{
    const act = x.go ? `data-s1go="result" data-rk="${x.go}" data-fk="${x.k}"` : `data-flash="${msg}"`;
    return `
    <div class="row" ${act}>
      <div class="ic">${I[x.ic]}</div>
      <div class="tx"><div class="t">${x.k}</div><div class="d">${x.d}</div></div>
      <div class="chev">${I.chev}</div></div>`;
  }).join('') + `</div>`;
}

/* ===== 거래내역 상단 필터: 계좌번호 / 종목검색 / 기간선택 / 거래유형 ===== */
const txFilter = {stock:'', period:'2026.06.24 ~ 2026.06.24'};
const pad2 = n => String(n).padStart(2,'0');
const fmtP = d => `${d.y}.${pad2(d.m)}.${pad2(d.d)}`;

function txFilterBar(){
  const stockCell = txFilter.stock
    ? `<span class="stk-nm">${txFilter.stock}</span><span class="stk-x" data-stockclear title="종목 지우기">${I.x}</span>`
    : `종목검색 ${I.search}`;
  return `<div class="tx-filter">
    <div class="txf-row">
      <div class="txf" data-acctchange>${authAcct.type} ${authAcct.no} ${I.down}</div>
      <div class="txf sub stk" data-stocksearch>${stockCell}</div>
    </div>
    <div class="txf-row">
      <div class="txf sub" data-periodsel>${txFilter.period} ${I.down}</div>
      <div class="txf sub" data-flash="거래 유형을 선택합니다. (시연용)">전체 거래 ${I.down}</div>
    </div>
  </div>`;
}

/* 체결내역 상단 필터 (영웅문 주문내역상단 참고): 계좌·종목검색·날짜·체결/미체결/예약 */
const ORDER_TABS = ['전체','미체결','예약'];
let orderTab = '전체';
const TODAY = '2026.06.24';
function orderEmpty(){
  return `<div class="tx-empty"><div class="te-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5z"/><path d="M9 16v-3M12 16v-6M15 16v-2"/></svg></div><div class="te-t">주문내역이 없어요.</div></div>`;
}
function orderFilterBar(){
  const isAll = orderTab==='전체';
  // 전체: 과거 날짜 조회 가능 / 미체결·예약: 당일 자동셋팅 + 비활성화
  const dateCell = isAll
    ? `<div class="txf sub" data-datesel>${fmtP(orderDate)} ${I.down}</div>`
    : `<div class="txf sub off">${TODAY} ${I.down}</div>`;
  const stockCell = txFilter.stock
    ? `<span class="stk-nm">${txFilter.stock}</span><span class="stk-x" data-stockclear title="종목 지우기">${I.x}</span>`
    : `종목검색 ${I.search}`;
  return `<div class="tx-filter">
    <div class="txf-row">
      <div class="txf" data-acctchange>${authAcct.type} ${authAcct.no} ${I.down}</div>
      <div class="txf sub stk" data-stocksearch>${stockCell}</div>
    </div>
    <div class="txf-row">
      ${dateCell}
      <div class="txf sub" data-flash="주문 유형을 선택합니다. (시연용)">전체 주문 ${I.down}</div>
    </div>
    <div class="ord-tabs">` + ORDER_TABS.map(tb=>
      `<div class="ord-tab ${tb===orderTab?'on':''}" data-ordertab="${tb}">${tb}</div>`).join('') + `</div>
  </div>`;
}

/* 종목검색창 (영웅문 종목검색창 참고) */
const STOCKS = [
  {nm:'삼성전자', t:'주식', bg:'#1428A0'}, {nm:'SK하이닉스', t:'주식', bg:'#E60012'},
  {nm:'카카오', t:'주식', bg:'#FEE500', fg:'#3A2A00'}, {nm:'현대차', t:'주식', bg:'#002C5F'},
  {nm:'네이버', t:'주식', bg:'#03C75A'}, {nm:'파이온엑스', t:'주식', bg:'#6A1B9A'},
  {nm:'LK삼양', t:'주식', bg:'#7CB342'}, {nm:'SP삼화', t:'주식', bg:'#D32F2F'},
  {nm:'삼기', t:'주식', bg:'#E53935'}, {nm:'삼기에너지솔루션즈', t:'주식', bg:'#212121'},
  {nm:'삼륭물산', t:'주식', bg:'#2E7D32'}, {nm:'삼립', t:'주식 · 소수점', bg:'#29B6F6'},
  {nm:'삼목에스폼', t:'주식 · 소수점', bg:'#BDBDBD', fg:'#333'}, {nm:'삼미금속', t:'주식', bg:'#1976D2'},
];
const RECENT_STOCKS = ['삼성전자','SK하이닉스','파이온엑스'];
function stockResultHTML(q){
  const k=(q||'').trim();
  const list = STOCKS.filter(s=>!k || s.nm.includes(k));
  if(!list.length) return `<div class="ss-empty">검색 결과가 없어요.</div>`;
  return list.map(s=>`<div class="ss-row" data-stockpick="${s.nm}">
    <div class="ss-lg" style="background:${s.bg};color:${s.fg||'#fff'}">${s.nm.slice(0,2)}</div>
    <div class="ss-in"><div class="ss-nm">${s.nm}</div><div class="ss-ty">${s.t}</div></div>
  </div>`).join('');
}
function filterStockList(q){ const c=document.getElementById('stockResults'); if(c) c.innerHTML=stockResultHTML(q); }
function openStockSearch(){
  closeTxOverlay();
  const screen=document.getElementById('screen'); if(!screen) return;
  // 종목박스(주문화면) 또는 거래내역 필터 아래부터 시트가 나오도록 top 계산
  const anchor = screen.querySelector('.ord-stock') || screen.querySelector('.tx-filter') || screen.querySelector('.stk-find');
  let top = 96;
  if(anchor){ const r=anchor.getBoundingClientRect(), sr=screen.getBoundingClientRect(); top = Math.round(r.bottom - sr.top + 8); }
  const el=document.createElement('div'); el.className='tx-ov ss-float'; el.id='txOverlay';
  el.innerHTML=`<div class="ss-sheet" style="top:${top}px">
    <div class="ss-head">
      <input id="ssInput" class="ss-input" placeholder="종목명 검색" oninput="filterStockList(this.value)" autocomplete="off">
      <div class="ss-ic">${I.search}</div>
      <div class="ss-back" data-txclose>${I.x}</div>
    </div>
    <div class="ss-recent">
      <div class="ss-rt">최근 본 종목</div>
      <div class="ss-chips">${RECENT_STOCKS.map(n=>`<div class="ss-chip" data-stockpick="${n}">${n}</div>`).join('')}</div>
    </div>
    <div class="ss-results" id="stockResults">${stockResultHTML('')}</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}

/* 기간선택창 (영웅문 기간선택창 참고) */
const PERIOD_PRESETS = {
  today: {label:'오늘',   s:{y:2026,m:6,d:24}, e:{y:2026,m:6,d:24}},
  month: {label:'이번 달', s:{y:2026,m:6,d:1},  e:{y:2026,m:6,d:24}},
  week1: {label:'1주일',  s:{y:2026,m:6,d:17}, e:{y:2026,m:6,d:24}},
  month1:{label:'1개월',  s:{y:2026,m:5,d:24}, e:{y:2026,m:6,d:24}},
  year1: {label:'1년',    s:{y:2025,m:6,d:24}, e:{y:2026,m:6,d:24}},
};
let txPeriodSel = 'today';
function wheelCol(val, unit){
  let rows='';
  for(let i=-2;i<=2;i++) rows+=`<div class="wv ${i===0?'on':''}">${val+i}${unit}</div>`;
  return `<div class="wcol">${rows}</div>`;
}
function periodSheetHTML(){
  const p = PERIOD_PRESETS[txPeriodSel];
  const chips = Object.keys(PERIOD_PRESETS).map(k=>
    `<div class="pchip ${k===txPeriodSel?'on':''}" data-period="${k}">${PERIOD_PRESETS[k].label}</div>`).join('');
  const block = (lab,d)=>`<div class="pwlab">${lab}</div>
    <div class="pwheel">${wheelCol(d.y,'년')}${wheelCol(d.m,'월')}${wheelCol(d.d,'일')}</div>`;
  return `<div class="ps-sheet">
    <div class="ps-top"><div class="ps-title">기간을 선택하세요</div><div class="ps-x" data-txclose>✕</div></div>
    <div class="pchips">${chips}</div>
    ${block('시작일', p.s)}
    ${block('종료일', p.e)}
    <div class="primary-btn" data-periodapply>선택</div>
  </div>`;
}
function openPeriodSheet(){
  closeTxOverlay();
  const screen=document.getElementById('screen'); if(!screen) return;
  const el=document.createElement('div'); el.className='tx-ov'; el.id='txOverlay';
  el.innerHTML=periodSheetHTML();
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeTxOverlay(){ const el=document.getElementById('txOverlay'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); },200); } }

/* 체결내역 날짜선택창 (단일 날짜: 오늘/어제/1주일전/1개월전) */
const DATE_PRESETS = {
  today: {label:'오늘',    d:{y:2026,m:6,d:24}},
  yest:  {label:'어제',    d:{y:2026,m:6,d:23}},
  week1: {label:'1주일전', d:{y:2026,m:6,d:17}},
  month1:{label:'1개월전', d:{y:2026,m:5,d:24}},
};
let orderDateSel = 'today';
let orderDate = {y:2026,m:6,d:24};
function dateSheetHTML(){
  const chips = Object.keys(DATE_PRESETS).map(k=>
    `<div class="pchip ${k===orderDateSel?'on':''}" data-datepreset="${k}">${DATE_PRESETS[k].label}</div>`).join('');
  const d = orderDate;
  return `<div class="ps-sheet">
    <div class="ps-top"><div class="ps-title">날짜를 선택하세요</div><div class="ps-x" data-txclose>✕</div></div>
    <div class="pchips">${chips}</div>
    <div class="pwheel">${wheelCol(d.y,'년')}${wheelCol(d.m,'월')}${wheelCol(d.d,'일')}</div>
    <div class="primary-btn" data-dateapply>선택</div>
  </div>`;
}
function openDateSheet(){
  closeTxOverlay();
  const screen=document.getElementById('screen'); if(!screen) return;
  const el=document.createElement('div'); el.className='tx-ov'; el.id='txOverlay';
  el.innerHTML=dateSheetHTML();
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}

/* 주문유형 선택창 (영웅문 유형선택 참고) */
function orderTypeSheetHTML(){
  const sideCls = orderState.side==='sell' ? 'sell' : 'buy';
  return `<div class="ps-sheet ot-sheet ${sideCls}">
    <div class="ps-top"><div class="ps-title">주문유형을 선택해주세요</div><div class="ps-x" data-txclose>✕</div></div>
    <div class="ot-list">` + ORDER_TYPES.map(tp=>
      `<div class="ot-row ${tp===orderState.type?'on':''}" data-ordtypepick="${tp}">
        <span>${tp}</span>${tp===orderState.type?`<span class="ot-ck">${I.check}</span>`:''}
      </div>`).join('') + `</div>
  </div>`;
}
function openOrderTypeSheet(){
  closeTxOverlay();
  const screen=document.getElementById('screen'); if(!screen) return;
  const el=document.createElement('div'); el.className='tx-ov'; el.id='txOverlay';
  el.innerHTML=orderTypeSheetHTML();
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}

/* IVR 메뉴 구조도 (디지털ARS/음성ARS 메뉴구조도.jpg 기반)
   - 대메뉴 → 중메뉴 → 소메뉴 3단 아코디언
   - '직원연결' 항목 클릭 시에만 음성 ARS 연결 안내 팝업 */
const A = {t:'0. 직원연결', d:'상담원(직원)에게 바로 연결'};   // 직원연결 리프(공통)
const IVR = [
  {t:'2. 일반주문', subs:[
    {t:'1. 현금매도', d:'보유 주식을 현금으로 매도', go:'order', side:'sell'},
    {t:'2. 현금매수', d:'예수금으로 주식 현금 매수', go:'order', side:'buy'},
    {t:'3. 현금정정', d:'미체결 현금주문 가격·수량 정정', go:'order', side:'modify'},
    {t:'4. 현금취소', d:'미체결 현금주문 취소', go:'order', side:'cancel'},
    {t:'5. 신용매도', d:'신용·대주 매도 주문', subs:[
      {t:'1. 자기융자 매도상환', d:'자기융자 상환을 위한 매도'},
      {t:'2. 대출 매도상환', d:'대출금 상환을 위한 매도'},
      {t:'3. 대주 매도', d:'대주(차입주식) 매도'},
    ]},
    {t:'6. 신용매수', d:'신용융자·대주 매수 주문', subs:[
      {t:'1. 자기융자 매수', d:'자기융자로 주식 매수'},
      {t:'2. 대주 매수상환', d:'대주 상환을 위한 매수'},
    ]},
    {t:'7. K-OTC 주문', d:'비상장주식 K-OTC 주문', subs:[
      {t:'1. K-OTC 매도주문', d:'K-OTC 종목 매도'},
      {t:'2. K-OTC 매수주문', d:'K-OTC 종목 매수'},
      {t:'3. K-OTC 주문정정', d:'K-OTC 미체결 주문 정정'},
      {t:'4. K-OTC 주문취소', d:'K-OTC 미체결 주문 취소'},
      A,
    ]},
    {t:'0. 직원연결', d:'상담원(직원)에게 바로 연결'},
  ]},
  {t:'3. 시세 및 시황', subs:[
    {t:'1. 현재가 및 호가안내', d:'실시간 현재가·호가 안내', subs:[
      {t:'1. 호가잔량', d:'매도·매수 호가 잔량 안내'},
      {t:'2. 5단호가', d:'5단계 호가 잔량 안내'},
      {t:'3. 당일시고저', d:'상·하한가, 시·고·저가 안내'},
      A,
    ]},
    {t:'2. 관심종목·보유종목 현재가 조회', d:'관심·보유종목 시세·주문', subs:[
      {t:'1. 보유종목 현재가 조회 및 주문', d:'보유종목 시세 확인·주문'},
      {t:'2. 관심종목 현재가 조회 및 주문', d:'관심종목 시세 확인·주문'},
      {t:'3. 관심종목 등록', d:'관심종목 신규 등록'},
      {t:'4. 관심종목 삭제', d:'등록된 관심종목 삭제'},
      A,
    ]},
    {t:'3. 지수정보 안내', d:'국내 주요 지수 안내', subs:[
      {t:'1. 종합주가지수', d:'코스피 종합지수·등락 현황', go:'idxKospi'},
      {t:'2. 코스닥 지수', d:'코스닥 지수 안내', go:'idxKosdaq'},
      {t:'3. 코스피 200지수', d:'코스피200 지수 안내', go:'idxKospi200'},
      A,
    ]},
    {t:'4. 해외 지수정보 안내', d:'주요국 증시 지수 안내', subs:[
      {t:'1. 중국관련지수', d:'상해·심천 등 중국 지수'},
      {t:'2. 홍콩관련지수', d:'항셍 등 홍콩 지수'},
      {t:'3. 일본니케이지수', d:'니케이225 지수'},
      {t:'4. 미국관련지수', d:'다우·나스닥·S&P 지수'},
      A,
    ]},
    {t:'5. 환율 안내', d:'주요 통화 환율 안내', subs:[
      {t:'1. 환율안내 다시듣기', d:'환율 안내 다시 듣기'},
      A,
    ]},
    {t:'6. 선물 현재가 조회', d:'지수·상품 선물 현재가', subs:[
      {t:'1. 다른종목조회', d:'다른 선물종목 조회'},
      {t:'2. 현재종목 다시듣기', d:'현재 종목 시세 다시 듣기'},
      A,
    ]},
    {t:'7. 시간외 단일가 시세', d:'시간외 단일가 시세·주문', subs:[
      {t:'1. 시간외 단일가 주문', d:'시간외 단일가 주문'},
      {t:'2. 다른 종목 조회', d:'다른 종목 시간외 시세'},
      {t:'3. 현재종목 시간외단일가시세 다시듣기', d:'현재 종목 시세 다시 듣기'},
      A,
    ]},
    {t:'8. K-OTC 현재가', d:'비상장주식 K-OTC 현재가', subs:[
      {t:'1. ARS K-OTC주문', d:'K-OTC 현재가 확인 후 주문'},
      {t:'2. 다른 K-OTC종목조회', d:'다른 K-OTC 종목 조회'},
      {t:'3. 현재종목 현재가 다시듣기', d:'현재 종목 시세 다시 듣기'},
      A,
    ]},
    {t:'9. 주식 시황', d:'당일 주식시장 시황 안내', subs:[
      {t:'1. 주식시황 다시듣기', d:'주식 시황 다시 듣기'},
      A,
    ]},
    A,
  ]},
  {t:'4. 체결 및 주문내역조회', subs:[
    {t:'1. 금일 체결내역조회', d:'당일 체결된 주문 내역', subs:[
      {t:'1. 전체 조회', d:'당일 전체 체결내역'},
      {t:'2. 종목코드 조회', d:'종목별 체결내역'},
      {t:'3. 주문번호 조회', d:'주문번호별 체결내역'},
      A,
    ]},
    {t:'2. 금일 미체결 내역조회', d:'당일 미체결 주문 내역', subs:[
      {t:'1. 전체 조회', d:'당일 전체 미체결내역'},
      {t:'2. 종목코드 조회', d:'종목별 미체결내역'},
      A,
    ]},
    {t:'3. 금일 주문 내역조회', d:'당일 접수된 주문 내역', subs:[
      {t:'1. 전체 조회', d:'당일 전체 주문내역'},
      {t:'2. 종목코드 조회', d:'종목별 주문내역'},
      {t:'3. 주문번호 조회', d:'주문번호별 주문내역'},
      A,
    ]},
    {t:'4. 전일 체결 내역조회', d:'전일 이전 체결 내역', subs:[
      {t:'1. 체결내역 다시듣기', d:'체결내역 다시 듣기'},
      {t:'2. 다른일자 체결내역조회', d:'다른 일자 체결내역'},
      {t:'3. 다른계좌 체결내역조회', d:'다른 계좌 체결내역'},
      A,
    ]},
    {t:'5. 예약주문 내역조회', d:'예약주문 접수 내역', subs:[
      {t:'1. 예약주문내역 다시듣기', d:'예약주문 내역 다시 듣기'},
      {t:'2. 다른계좌 예약주문내역조회', d:'다른 계좌 예약주문 내역'},
      A,
    ]},
    A,
  ]},
  {t:'5. 계좌잔고 및 거래내역 조회', subs:[
    {t:'1. 예수금 및 추정예탁자산 조회', d:'예수금·추정 예탁자산 조회', subs:[
      {t:'1. 예수금 및 추정예탁자산 다시듣기', d:'예수금·예탁자산 다시 듣기'},
      {t:'2. 빠른주문', d:'바로 주문화면으로'},
      {t:'3. 일반주문', d:'일반 주문화면으로'},
      {t:'4. 다른계좌조회', d:'다른 계좌 잔고조회'},
      A,
    ]},
    {t:'2. 주문가능 금액조회', d:'주문 가능 금액 조회', subs:[
      {t:'1. 전체 주문가능금액조회', d:'전체 주문가능금액'},
      {t:'2. 종목별 주문가능금액조회', d:'종목별 주문가능금액'},
      A,
    ]},
    {t:'3. 현금주식 잔고조회', d:'현금·주식 잔고 조회', subs:[
      {t:'1. 현금유가잔고 다시듣기', d:'현금·유가증권 잔고 다시 듣기'},
      {t:'2. 빠른주문', d:'바로 주문화면으로'},
      {t:'3. 일반주문', d:'일반 주문화면으로'},
      {t:'4. 다른계좌조회', d:'다른 계좌 잔고조회'},
      A,
    ]},
    {t:'4. 신용 잔고조회', d:'신용 잔고 조회', subs:[
      {t:'1. 신용잔고 다시듣기', d:'신용 잔고 다시 듣기'},
      {t:'2. 신용매도주문', d:'신용 매도 주문화면으로'},
      {t:'3. 신용매수주문', d:'신용 매수 주문화면으로'},
      {t:'4. 다른계좌조회', d:'다른 계좌 신용잔고'},
      A,
    ]},
    {t:'5. 거래내역 조회', d:'기간별 거래내역 조회', subs:[
      {t:'1. 전체조회', d:'전체 거래내역'},
      {t:'2. 매매조회', d:'매매 거래내역'},
      {t:'3. 입출금조회', d:'입금·출금 내역'},
      {t:'4. 입출고조회', d:'입고·출고 내역'},
      A,
    ]},
    {t:'6. 금융상품 관련 ARS서비스', d:'펀드·채권 등 금융상품 조회', subs:[
      {t:'1. 평가금액 조회', d:'금융상품 평가금액'},
      {t:'2. 예수금 조회', d:'금융상품 예수금'},
      {t:'3. 거래내역 조회', d:'금융상품 거래내역'},
      A,
    ]},
    A,
  ]},
  {t:'6. 은행이체 및 계좌간 자금이체', subs:[
    {t:'1. 연계은행 송금', d:'연계은행 계좌로 송금'},
    {t:'2. 증권계좌 송금', d:'증권계좌로 송금'},
    {t:'3. 타사 송금', d:'타사 계좌로 송금'},
    {t:'4. 송금결과확인 조회', d:'송금 처리결과 확인'},
    {t:'5. 계좌 간 자금이체', d:'내 계좌 간 자금이체'},
    A,
  ]},
  {t:'7. 주문비밀번호', subs:[
    {t:'1. 주문비밀번호 관련서비스', d:'주문비밀번호 등록·변경', subs:[
      {t:'1. 주문비밀번호 등록', d:'주문비밀번호 신규 등록'},
      {t:'2. 주문비밀번호 변경', d:'주문비밀번호 변경'},
      {t:'3. ARS 이용신청', d:'ARS 주문 이용 신청'},
      {t:'4. ARS 이용해지', d:'ARS 주문 이용 해지'},
      A,
    ]},
    {t:'2. 영업부 계좌개설 비밀번호 등록서비스', d:'영업부 개설계좌 비밀번호 등록'},
    {t:'3. 퀵넘버 플러스 관련서비스', d:'퀵넘버 플러스 조회·삭제', subs:[
      {t:'1. 퀵넘버 플러스 조회', d:'등록된 퀵넘버 조회'},
      {t:'2. 퀵넘버 플러스 삭제', d:'등록된 퀵넘버 삭제'},
      A,
    ]},
    A,
  ]},
  {t:'8. 사고등록 및 ARS 이용안내', subs:[
    {t:'1. 주소 및 전화번호 변경', d:'주소·연락처 정보 변경'},
    {t:'2. 사고등록', d:'분실·도난 등 사고 등록', subs:[
      {t:'1. 계좌출금 정지 사고등록', d:'계좌 출금정지 사고등록'},
      {t:'2. 제휴카드 분실 사고등록', d:'제휴카드 분실 사고등록'},
      {t:'3. OTP 사고등록', d:'OTP 분실·사고 등록'},
      {t:'4. 사고등록 내역조회', d:'등록된 사고내역 조회'},
      A,
    ]},
    {t:'3. ARS 이용안내 및 공지사항', d:'ARS 이용안내·공지사항', subs:[
      {t:'1. ARS 이용시간 안내', d:'ARS 서비스 이용시간'},
      {t:'2. ARS 주문서비스 이용신청 및 주문비밀번호 등록안내', d:'주문서비스 신청·비밀번호 안내'},
      {t:'3. ARS 관심종목 안내', d:'ARS 관심종목 이용 안내'},
      {t:'4. ARS 이용비용 안내', d:'ARS 서비스 이용비용'},
      A,
    ]},
    A,
  ]},
  {t:'9. 유상청약 및 공모주 청약', subs:[
    {t:'1. 유상청약', d:'유상증자 청약 신청·조회', subs:[
      {t:'1. 당일 유상청약 신청', d:'당일 유상청약 신청'},
      {t:'2. 당일 유상청약 취소', d:'당일 유상청약 취소'},
      {t:'3. 유상청약 예약신청 및 취소', d:'유상청약 예약신청·취소'},
      {t:'4. 유상청약 내역확인', d:'유상청약 신청내역 확인'},
      A,
    ]},
    {t:'2. 공모주 청약', d:'공모주(IPO) 청약 신청·조회', subs:[
      {t:'1. 청약입력', d:'공모주 청약 신청'},
      {t:'2. 청약취소', d:'공모주 청약 취소'},
      {t:'3. 은행이체', d:'청약 증거금 은행이체'},
      {t:'4. 청약 경쟁률 조회', d:'공모주 청약 경쟁률'},
      {t:'5. 청약관련 조회', d:'청약 신청내역 조회'},
      {t:'6. 공모주정보 조회', d:'공모주 일정·정보'},
      {t:'7. 공모주 풋백옵션', d:'공모주 풋백옵션 안내'},
      A,
    ]},
    A,
  ]},
];

/* '직원연결' 항목만 음성 ARS 팝업 대상 */
function isAgent(t){ return /직원연결/.test(t); }
/* 표시용 번호 제거 (대메뉴·소메뉴), 중메뉴는 번호 유지 */
function stripNum(t){ return t.replace(/^[0-9#]+\.\s*/,''); }
/* 소메뉴(하위) 없는 항목 클릭 시 안내멘트 */
function connectMsg(label){ return `'${label}' 화면으로 연결합니다. (시연용)`; }

/* 메인: 대메뉴만 표기 → 클릭 시 중메뉴/소메뉴 아코디언 화면으로 이동 (data-ivdae) */
function renderIvr(){
  return `<div class="ivlist">` + IVR.map((m,i)=>
    `<div class="ivcard"><div class="ivrow lv1 nav" data-ivdae="${i}"><div class="ivt">${stripNum(m.t)}</div><div class="ivarw">${I.chev}</div></div></div>`
  ).join('') + `</div>`;
}

/* 대메뉴 상세: 중메뉴(펼침) → 소메뉴 아코디언
   - 중메뉴(하위 있음) → 펼쳐서 소메뉴 표기 (data-mid2)
   - 중메뉴(하위 없음) → 화면연결 안내멘트 (data-flash)
   - 소메뉴: 직원연결→팝업 / go(예시화면)→이동 / 그 외→안내멘트
   - 직원연결 중메뉴 → 음성 ARS 팝업 (data-arspop) */
function renderMidAcc(i){
  const subs = (IVR[i]||{}).subs || [];
  return `<div class="ivlist">` + subs.map((s,j)=>{
    if(isAgent(s.t)){
      return `<div class="ivcard"><div class="ivrow lv1 agent" data-arspop="${s.t}"><div class="ivt">${stripNum(s.t)}</div></div></div>`;
    }
    if(!s.subs){
      const attr = s.go==='order' ? `data-orderopen="${s.side||'buy'}" data-ordertitle="${stripNum(s.t)}"` : `data-flash="${connectMsg(stripNum(s.t))}"`;
      return `<div class="ivcard"><div class="ivrow lv1 nav" ${attr}><div class="ivt">${s.t}</div></div></div>`;
    }
    // 소메뉴가 있는 중메뉴 → 다음 페이지(버튼식)로 이동
    return `<div class="ivcard"><div class="ivrow lv1 nav" data-ivsub="${i}_${j}"><div class="ivt">${s.t}</div><div class="ivarw">${I.chev}</div></div></div>`;
  }).join('') + `</div>`;
}

/* 대메뉴 → 중메뉴 리스트 화면 (일반주문) */
function ivMidPage(i){
  const subs = (IVR[i]||{}).subs || [];
  return `<div class="list">` + subs.map((s,j)=>{
    const attr = isAgent(s.t) ? `data-arspop="${s.t}"`
      : s.subs ? `data-ivnav="${i}_${j}"`
      : `data-flash="${connectMsg(stripNum(s.t))}"`;
    return `<div class="row" ${attr}>
      <div class="tx"><div class="t">${s.t}</div></div>
      <div class="chev">${I.chev}</div></div>`;
  }).join('') + `</div>`;
}

/* 소메뉴 클릭 속성 (직원연결→팝업 / 결과화면 이동 / 그 외 안내멘트) */
function ivSubAttr(s, label){
  return isAgent(s.t) ? `data-arspop="${s.t}"`
    : s.go ? `data-s1go="result" data-rk="${s.go}" data-fk="${label}"`
    : `data-flash="${connectMsg(label)}"`;
}
/* 중메뉴 → 소메뉴 버튼식 화면 */
function ivSubPage(mid){
  const subs = (mid && mid.subs) || [];
  // 현재가 및 호가안내 상세: 접속 시 종목검색만, 종목 검색 후 현재가 카드 + 한줄 탭(소메뉴)
  if(/현재가 및 호가/.test((mid && mid.t) || '')){
    const stockCell = txFilter.stock
      ? `<span class="stk-nm">${txFilter.stock}</span><span class="stk-x" data-stockclear title="종목 지우기">${I.x}</span>`
      : `<span class="ph">종목명을 검색하세요</span>`;
    const searchBar = `<div class="stk-find" data-stocksearch>${I.search}${stockCell}</div>`;
    if(!txFilter.stock) return searchBar;   // 검색 전: 종목검색만 표시
    // 카드 내부에 종목코드·밑줄형 호가 탭·탭별 호가정보 포함
    return searchBar + stockQuoteCard(txFilter.stock);
  }
  // 신용매수 상세: 소메뉴 리스트만 표시 (자기융자 매수 → 종목검색+주문카드 화면으로 이동)
  if(/신용매수/.test((mid && mid.t) || '')){
    return `<div class="iv-btns">` + subs.map(s=>{
      const label = stripNum(s.t);
      const attr = /자기융자\s*매수/.test(s.t) ? 'data-creditbuy' : ivSubAttr(s, label);
      return `<div class="iv-btn" ${attr}>${label}</div>`;
    }).join('') + `</div>`;
  }
  // 신용매도 상세: 소메뉴 리스트만 표시 (자기융자 매도상환 → 종목검색+주문카드 화면으로 이동)
  if(/신용매도/.test((mid && mid.t) || '')){
    return `<div class="iv-btns">` + subs.map(s=>{
      const label = stripNum(s.t);
      const attr = /자기융자\s*매도상환/.test(s.t) ? 'data-creditsell' : ivSubAttr(s, label);
      return `<div class="iv-btn" ${attr}>${label}</div>`;
    }).join('') + `</div>`;
  }
  // 그 외 중메뉴: 기존 소메뉴 버튼식
  if(!subs.length){
    return `<div class="iv-btns"><div class="iv-btn" data-flash="${connectMsg(stripNum(mid.t))}">${stripNum(mid.t)}</div></div>`;
  }
  return `<div class="iv-btns">` + subs.map(s=>{
    const label = stripNum(s.t);
    return `<div class="iv-btn" ${ivSubAttr(s, label)}>${label}</div>`;
  }).join('') + `</div>`;
}

/* 전체메뉴: 음성 ARS 메뉴 3단 아코디언 (대분류→중분류→소분류 인라인 펼침) */
/* 자주 찾는 서비스 메뉴구조 (메뉴구조도/자주찾는서비스.jpg 기반) — 대분류→중분류 */
const FAV_MENU = [
  {t:'1. 국내주식', subs:[
    {t:'주식주문 및 체결내역조회'},
  ]},
  {t:'2. ID/PW · 인증서', subs:[
    {t:'신규계좌 및 공인인증'},
  ]},
  {t:'3. 미수 · 신용대출', subs:[
    {t:'미수, 신용대출 약정 및 단순문의'},
    {t:'계좌조회 및 대출신청, ETF문의'},
  ]},
  {t:'4. 권리', subs:[
    {t:'권리 및 공모주, 제증명서'},
  ]},
  {t:'5. 시스템', subs:[
    {t:'HTS, MTS 등 시스템 관련'},
  ]},
  {t:'6. 선물옵션', subs:[
    {t:'선물옵션 및 ELW'},
  ]},
  {t:'7. 해외주식', subs:[
    {t:'해외주식 및 국내복귀계좌'},
  ]},
  {t:'8. 금융상품', subs:[
    {t:'연금, ISA 계좌개설 및 서면형 가입서류'},
    {t:'펀드, 채권, ELS 및 계좌상세'},
  ]},
  {t:'9. CFD', subs:[
    {t:'국내주식 CFD'},
    {t:'해외주식 CFD 및 환헷지, 상품선물옵션'},
  ]},
];
/* 시안2(dars1) 메인 탭 드릴다운에서 참조 — 인라인 스크립트로 IVR/FAV_MENU 데이터 노출 */
window.IVR = IVR; window.FAV_MENU = FAV_MENU;

/* 시안1 V2.0 · 단순 ARS 메뉴트리 = 음성ARS 메뉴구조도(IVR) 그대로를 번호순 드릴다운으로 탐색.
   메뉴 연결(이동)만 제공하고 최종(리프) 화면은 열지 않음 — renderSimpleArs() 참고. */

/* 전체메뉴 드로어 (오른쪽→왼쪽 슬라이드) */
function openMenuDrawer(){
  closeMenuDrawer();
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  el.className = 'menu-ov' + (isV47()?' v47':''); el.id = 'menuDrawer';
  const isV21 = isV21Ver();
  const head = isV47()
    ? `<div class="menu-head">
         <div class="page-title">전체메뉴</div>
         <div class="head-spacer"></div>
         <div class="back" data-menuclose title="닫기">${I.x}</div>
       </div>`
    : isV21
    ? `<div class="menu-head">
         <div class="back home-wbtn" data-home title="홈">${I.home}</div>
         <div class="page-title">전체메뉴</div>
         <div class="head-spacer"></div>
         <div class="back" data-menuclose title="닫기">${I.x}</div>
       </div>`
    : `<div class="menu-head">
         <div class="page-title">전체메뉴</div>
         <div class="head-spacer"></div>
         <div class="back" data-menuclose title="닫기">${I.x}</div>
       </div>
       <div class="menu-pills">${amPills()}</div>`;
  el.innerHTML = `<div class="menu-panel">
    ${head}
    <div class="menu-scroll">${renderAllMenu()}</div>
  </div>`;
  screen.appendChild(el);
  if(isV47()) screen.classList.add('v47-fab-open');
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeMenuDrawer(){
  const el = document.getElementById('menuDrawer');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 300); }
  document.getElementById('screen')?.classList.remove('v47-fab-open');
}
/* 자주 찾는 서비스 추가 바텀시트 (favmore 빈 슬롯 클릭 → 후보 선택 → FAV 추가) */
function openFavAdd(){
  const screen = document.getElementById('screen'); if(!screen) return;
  closeFavAdd();
  const el = document.createElement('div'); el.className='fav-add-ov'; el.id='favAddOv';
  const list = FAV_ADD.length
    ? FAV_ADD.map((f,i)=>`<div class="fa-row" data-favpick="${i}"><div class="fa-ic">${I[f.ic]}</div><div class="fa-nm">${f.k}</div><div class="fa-plus">${I.plus}</div></div>`).join('')
    : `<div class="fa-none">추가할 수 있는 서비스를 모두 추가했습니다.</div>`;
  el.innerHTML = `<div class="fav-add-sheet">
    <div class="fa-head"><div class="fa-title">자주 찾는 서비스 추가</div><div class="back" data-favaddclose>${I.x}</div></div>
    <div class="fa-list">${list}</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeFavAdd(){
  const el = document.getElementById('favAddOv');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 250); }
}
function refreshMenu(){
  const dr = document.getElementById('menuDrawer');
  if(dr){
    const p = dr.querySelector('.menu-pills'); if(p) p.innerHTML = amPills();
    const s = dr.querySelector('.menu-scroll'); if(s) s.innerHTML = renderAllMenu();
  } else renderS1();
}

/* 세그먼트 버튼 (간편모드 계좌조회 국내/미국/상품/현금 디자인) — 헤더와 함께 고정 */
function amPills(){
  const tab = s1state.amTab || 'ars';
  return `<div class="hero-folder">
    <div class="hf-pills">
      <div class="back hf-home" data-home title="홈">${I.home}</div>
      <button class="hf-pill ${tab==='ars'?'on':''}" data-amtab="ars">ARS메뉴</button>
      <button class="hf-pill ${tab==='fav'?'on':''}" data-amtab="fav">상담원연결</button>
    </div>
  </div>`;
}
/* V2.1 전체메뉴: 좌측 3 대메뉴(셀프서비스/ARS/상담원연결) + 우측 중첩 아코디언 */
/* 셀프서비스 트리: 중메뉴=FAV 서비스, 소메뉴=각 서비스 하위 항목(rk=결과화면 키). 폼형 서비스는 리프 */
const SELF_MENU = [
  {t:'ID·계좌조회 / PW재설정', subs:[
    {t:'아이디(ID) 조회', rk:'idpwfind'},
    {t:'계좌번호 조회',   rk:'acctfind'},
    {t:'ID비밀번호 재설정', rk:'idpwreset'},
    {t:'장기미사용 ID 제한해제', rk:'idrelease'},
  ]},
  {t:'비대면업무 신청현황', subs:[
    {t:'비대면 계좌개설', rk:'untactacct'},
    {t:'출금계좌등록',    rk:'untactwithdraw'},
    {t:'모바일 OTP 발급', rk:'untactotp'},
    {t:'OTP 사고해지',    rk:'untactotpcancel'},
    {t:'계좌폐쇄',        rk:'untactclose'},
    {t:'계좌비밀번호 재설정', rk:'untactpw'},
  ]},
  {t:'계좌잔고 및 거래내역조회', subs:[
    {t:'계좌잔고·예수금 조회', rk:'holdings'},
    {t:'거래 내역', rk:'trades'},
    {t:'체결 내역', rk:'filled'},
  ]},
  {t:'계좌사고 등록 / 해지', rk:'accidentcancel'},
  {t:'고객확인등록(CDD/EDD)', rk:'cdd'},
  {t:'서류발급 및 신청내역조회', subs:[
    {t:'잔고증명서',     rk:'certbal'},
    {t:'거래내역서',     rk:'certtx'},
    {t:'외납세액명세서', rk:'certforeign'},
    {t:'양도소득내역서', rk:'certgains'},
  ]},
  {t:'신용/대출 만기연장', rk:'creditext'},
  {t:'공모주 청약', subs:[
    {t:'청약 경쟁률 조회', rk:'iporate'},
    {t:'환불·배정 조회',   rk:'iporesult'},
    {t:'청약 내역 조회',   rk:'ipohist'},
  ]},
  {t:'간편/공동인증 관리', subs:[
    {t:'간편비밀번호(PIN) 변경', rk:'idpwpin'},
    {t:'생체인증 등록',          rk:'authbio'},
    {t:'공동인증서 갱신/재발급',  rk:'authcert'},
    {t:'간편/공동인증 해지',      rk:'authrevoke'},
  ]},
];
window.SELF_MENU = SELF_MENU;   // 시안2(dars1) 전체메뉴 드로어에서 참조
function v21LeafAttr(m, label, cat){
  if(m.staff) return `data-arspop="${m.staff}"`;   // 수요 카테고리(ARS_CAT6) 직원연결 매핑 → 상담원 연결 화면
  if(isAgent(m.t)) return `data-arspop="${m.t}"`;
  if(cat==='staff') return `data-staffconnect="${label}"`;
  if(cat==='self')  return `data-s1go="result" data-rk="${m.rk}" data-fk="${label}"`;
  // ARS(IVR) 리프: 전용 화면 있으면 그 화면, 없으면 안내
  if(/자기융자\s*매도상환/.test(m.t)) return `data-creditsell`;
  if(/자기융자\s*매수/.test(m.t)) return `data-creditbuy`;
  if(m.go==='order') return `data-orderopen="${m.side||'buy'}" data-ordertitle="${label}"`;
  if(m.go) return `data-s1go="result" data-rk="${m.go}" data-fk="${label}"`;
  return `data-flash="${connectMsg(label)}"`;
}
function renderAccTree(items, prefix, cat, forceOpen){
  return items.map((m,i)=>{
    const path = prefix ? prefix+'_'+i : ''+i;
    if(m.subs && m.subs.length){
      const open = forceOpen || !!s1state.amTreeOpen[path];   // forceOpen=전체메뉴 펼치기(모두 펼침)
      const kids = open ? `<div class="amv-sub">${renderAccTree(m.subs, path, cat, forceOpen)}</div>` : '';
      return `<div class="amv-node ${open?'open':''}">
        <div class="amv-row nav" data-amacc="${path}"><div class="ivt">${m.t}</div><div class="ivarw">${I.down}</div></div>
        ${kids}</div>`;
    }
    const label = stripNum(m.t);
    const isAg = isAgent(m.t);
    return `<div class="amv-row leaf ${isAg?'agent':''}" ${v21LeafAttr(m,label,cat)}><div class="ivt">${isAg?label:m.t}</div>${isAg?'':`<div class="ivarw nav">${I.chev}</div>`}</div>`;
  }).join('');
}
function renderV21Menu(forceOpen){
  const cat = s1state.amCat || 'self';
  const cats = [['self','셀프서비스'],['ars','ARS'],['staff','상담원연결']];
  const left = cats.map(([k,nm])=>`<div class="am-dae ${k===cat?'on':''}" data-amcat="${k}">${nm}</div>`).join('');
  const tree = cat==='ars' ? (isV40() ? catData() : IVR) : cat==='staff' ? FAV_MENU : SELF_MENU;
  const right = `<div class="amv-list">${renderAccTree(tree, '', cat, forceOpen)}</div>`;
  return `<div class="am2col v21col"><div class="am-left">${left}</div><div class="am-right">${right}</div></div>`;
}
function renderV47AllMenu(){
  const sel = Math.max(0, Math.min(s1state.amOpen||0, V47_MENU_CATS.length-1));
  const left = V47_MENU_CATS.map((c,i)=>
    `<div class="am-dae ${i===sel?'on':''}" data-am1="${i}">${c.t}${c.sub?`<span class="am-dae-sub">${c.sub}</span>`:''}</div>`
  ).join('');
  const cat = V47_MENU_CATS[sel];
  const right = cat.subs.map(s=>
    `<div class="am-mid" data-flash="${s} · 이후 절차 정의 예정"><div class="ivt">${s}</div></div>`
  ).join('');
  return `<div class="am2col"><div class="am-left">${left}</div><div class="am-right">${right}</div></div>`;
}
function renderAllMenu(forceTab){
  // Ver 4.7 · V47_MENU_CATS 기반 전체메뉴
  if(isV47()) return renderV47AllMenu();
  // 시안1 V2.1 · 전체메뉴를 3 대메뉴 + 중첩 아코디언 구조로 분기
  if(isV21Ver() && !forceTab) return renderV21Menu();
  const tab = forceTab || s1state.amTab || 'ars';
  // 시안1 V2.0/V2.1 · ARS메뉴는 '단순 ARS 메뉴트리'(음성ARS 번호 드릴다운)로 분기
  if(tab==='ars' && (s1Ver==='v2' || isV21Ver())) return renderSimpleArs();
  // 탭에 따라 메뉴 데이터 선택 (자주찾는서비스 / 보이는 ARS) — 동일한 2단 아코디언 형태
  const menu = (tab==='fav') ? FAV_MENU : IVR;
  const sel = s1state.amOpen < 0 ? 0 : Math.min(s1state.amOpen, menu.length-1);
  // 좌측: 대메뉴 리스트
  const left = menu.map((m,i)=>
    `<div class="am-dae ${i===sel?'on':''}" data-am1="${i}">${stripNum(m.t)}</div>`
  ).join('');
  // 우측: 선택된 대메뉴의 중메뉴 (소메뉴는 인라인 펼침)
  const dae = menu[sel] || {subs:[]};
  let right;
  if(!dae.subs || !dae.subs.length){
    // 중메뉴가 없는 대분류 → 단일 연결 행 (직원연결 탭은 상담부서 연결)
    const label = stripNum(dae.t);
    const fb = (tab==='fav') ? `data-staffconnect="${label}"` : `data-flash="${connectMsg(label)}"`;
    right = `<div class="am-mid" ${fb}><div class="ivt">${label}</div></div>`;
  } else {
    right = dae.subs.map((s,j)=>{
      if(isAgent(s.t)){
        return `<div class="am-mid agent" data-arspop="${s.t}"><div class="ivt">${stripNum(s.t)}</div></div>`;
      }
      if(!s.subs){
        const lbl = stripNum(s.t);
        const attr = s.go==='order' ? `data-orderopen="${s.side||'buy'}" data-ordertitle="${lbl}"`
          : s.go ? `data-s1go="result" data-rk="${s.go}" data-fk="${lbl}"`
          : (tab==='fav' ? `data-staffconnect="${lbl}"` : `data-flash="${connectMsg(lbl)}"`);
        return `<div class="am-mid" ${attr}><div class="ivt">${s.t}</div></div>`;
      }
      // 소메뉴가 있는 중메뉴 → 소메뉴를 인라인 아코디언으로 펼침 (보이는 ARS·직원연결 공통)
      // 소메뉴 클릭 시: 전용 소메뉴 화면 있으면 그 화면으로, 없으면 상위 중메뉴(소메뉴 리스트) 화면으로 이동
      const open2 = s1state.amOpen2===j;
      const sub = `<div class="am-sub">` + s.subs.map(x=>{
        const label = stripNum(x.t);
        let attr, nav=true;
        if(isAgent(x.t)){ attr = `data-arspop="${x.t}"`; nav=false; }
        else if(/자기융자\s*매도상환/.test(x.t)) attr = `data-creditsell`;
        else if(/자기융자\s*매수/.test(x.t)) attr = `data-creditbuy`;
        else if(x.go==='order') attr = `data-orderopen="${x.side||'buy'}" data-ordertitle="${label}"`;
        else if(x.go) attr = `data-s1go="result" data-rk="${x.go}" data-fk="${label}"`;
        else if(tab!=='fav') attr = `data-ivsub="${sel}_${j}"`;   // 전용 소메뉴 화면 없음 → 상위 중메뉴 화면(ivsub)으로
        else { attr = `data-flash="${connectMsg(label)}"`; nav=false; }
        return `<div class="ivrow lv3" ${attr}><div class="ivt">${label}</div>${nav?`<div class="ivarw nav">${I.chev}</div>`:''}</div>`;
      }).join('') + `</div>`;
      return `<div class="am-node ${open2?'open':''}">
        <div class="am-mid" data-am2="${j}"><div class="ivt">${s.t}</div><div class="ivarw">${I.down}</div></div>
        ${sub}</div>`;
    }).join('');
  }
  return `<div class="am2col">
    <div class="am-left">${left}</div>
    <div class="am-right">${right}</div>
  </div>`;
}

/* 시안1 V2.0 · 단순 ARS 메뉴트리 렌더 (음성ARS 구조도 번호 드릴다운 · 최종화면 미연결)
   - s1state.sarsPath: IVR 트리를 따라 내려간 인덱스 경로
   - 하위 메뉴 있으면 → 다음 단계로 이동(번호순) / 리프면 → 최종 메뉴(화면 안 열림) */
function sarsWalk(tree, path){
  let items = tree; const trail = [];
  for(const idx of (path||[])){
    const n = items[idx];
    if(!n || !n.subs) break;
    trail.push(n); items = n.subs;
  }
  return {items, trail};
}
/* 번호 드릴다운 트리 렌더 (음성ARS·상담원연결 공통)
   opts.crumb: 브레드크럼 접두 / opts.guide: 루트 안내문 / opts.leaf: 'staff'면 리프=상담원 연결, 아니면 최종(미연결) */
function renderArsTree(tree, opts){
  opts = opts || {};
  const path = s1state.sarsPath || [];
  const {items, trail} = sarsWalk(tree, path);
  const head = trail.length
    ? `<div class="sars-path">${opts.crumb||''}${trail.map(n=>stripNum(n.t)).join(' › ')}</div>`
    : `<div class="sars-guide">${opts.guide||'원하시는 번호를 선택하세요.'}</div>`;
  const back = path.length
    ? `<div class="sars-back" data-sarsup><span class="sars-bk">${I.chev}</span><span>이전 메뉴</span></div>` : '';
  const isStaff = (opts.leaf==='staff');
  const rows = items.map((m,i)=>{
    const num = (m.t.match(/^[0-9#]+/)||[''])[0];
    const name = stripNum(m.t);
    const hasKids = !!(m.subs && m.subs.length);
    if(m.stk){   // 주식주문: 계단식 주문 선택 플로팅 진입(nav 스타일 · 하위 데이터 없이 시트로 처리)
      return `<div class="sars-item nav" data-stkorder>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.che){   // 체결내역 조회: 연결매체(영S#/디지털ARS/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-chesheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.sise){   // 시세 조회: 연결매체(영S#/챗봇/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-sisesheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.idx){   // 지수정보·환율 안내: 연결매체(영S#/챗봇/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-idxsheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.dep){   // 예수금·주문가능금액 조회: 연결매체(디지털ARS/영S#/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-depsheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.bal){   // 주식·신용·금융상품 잔고조회: 연결매체(디지털ARS/영S#/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-balsheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.txn){   // 거래내역 조회: 연결매체(디지털ARS/영S#/음성ARS) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-txnsheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.misu){   // 미수·반대매매 조회: 연결매체(디지털ARS/영S#) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-misusheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.myacct){   // 계좌번호·MY계좌 정보확인: 연결매체(디지털ARS/영S#) 선택 플로팅 진입(nav 스타일)
      return `<div class="sars-item nav" data-myacctsheet>
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(m.media){   // 입출금·이체: 연결매체 선택 플로팅(제네릭, MEDIA_SHEETS[m.media])
      return `<div class="sars-item nav" data-mediasheet="${m.media}">
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    if(hasKids){
      return `<div class="sars-item nav" data-sarsdown="${i}">
        <span class="sars-num">${num}</span><div class="ivt">${name}</div>
        <span class="sars-arw">${I.chev}</span></div>`;
    }
    // 리프 라우팅: (mapStaff 시) 직원연결 매핑·0.직원연결 → 상담원 연결 화면 / 상담원연결 트리 → 연결 / 음성ARS → 최종(화면 미연결)
    const wantStaff = opts.mapStaff && (m.staff || isAgent(m.t));
    let leafAttr, tag, cls = '';
    if(wantStaff){ leafAttr = `data-arspop="${m.staff || stripNum(m.t)}"`; tag = `<span class="sars-end staff">직원연결</span>`; cls = 'staffleaf'; }
    else if(isStaff){ leafAttr = `data-staffconnect="${name}"`; tag = `<span class="sars-end staff">연결</span>`; cls = 'staffleaf'; }
    else { leafAttr = `data-sarsleaf="${name}"`; tag = `<span class="sars-end">최종</span>`; }
    return `<div class="sars-item leaf ${cls}" ${leafAttr}>
      <span class="sars-num leaf">${num||'·'}</span><div class="ivt">${name}</div>
      ${tag}</div>`;
  }).join('');
  return `<div class="sars-wrap">
    ${head}${back}
    <div class="sars-list">${rows}</div>
  </div>`;
}
/* Ver 4.0(v40) 전용: 사용자 지정 9 대메뉴 + 상담·챗봇 수요 매핑.
   각 항목은 IVR 실제 노드를 참조(드릴다운 소메뉴 전량 보존)하거나, 대응 소메뉴가 없으면 {staff}=관련 직원연결(상담원 연결 화면)로 매핑.
   IVR 인덱스: 0=일반주문 1=시세및시황 2=체결및주문내역 3=계좌잔고 4=은행이체 5=주문비밀번호 6=사고등록 7=유상청약및공모주
   ※시세및시황(IVR[1])은 1번 대메뉴 '주문·체결확인'에 하위 그룹으로 포함. ※식별자 ARS_CAT6는 레거시명(현재 9개). */
function ivN(d, m){ const s = (IVR[d]||{}).subs; return s ? s[m] : undefined; }
function drillNode(name, node){ return node ? Object.assign({}, node, {t:name}) : {t:name}; }   // IVR 노드 참조(소메뉴 보존) + 표시명 교체
function staffLeaf(name){ return {t:name, staff:name}; }                                          // 대응 소메뉴 없음 → 직원연결(상담원 연결 화면)
function catNode(title, ic, items){
  return {t:title, ic, subs: items.map((it,i)=>Object.assign({}, it, {t:(i+1)+'. '+it.t}))};      // 카테고리 내 항목 1..N 재번호(하위 소메뉴 번호는 원본 유지)
}
const ARS_CAT6 = [
  catNode('1. 주문·체결확인', 'order', [
    {t:'주식주문', stk:true},            // 현금/신용/K-OTC 매도·매수·정정·취소 통합 → 계단식 주문 플로팅(방법→종류→유형→[음성ARS 신용]소메뉴)
    {t:'체결 · 주문내역 조회', che:true}, // 금일 체결·금일 미체결·전일 체결·금일 주문내역·예약주문 통합 → 3매체(영S#/디지털ARS/음성ARS) 플로팅. 음성ARS 선택 시 5개 중메뉴 리스트. (2번 순서)
    {t:'시세 조회', sise:true},          // 현재가·호가/관심·보유종목/선물/시간외/K-OTC 통합 → 3매체(영S#/챗봇/음성ARS) 플로팅. 음성ARS 선택 시 6유형 리스트(그에 맞는 IVR 연결).
    {t:'지수정보 · 환율 안내', idx:true},  // 지수정보/해외지수/환율/주식시황(IVR[1].subs 2,3,4,8) 통합 → 3매체(영S#/챗봇/음성ARS) 플로팅. 음성ARS 선택 시 소메뉴 리스트(직원연결 제외).
    {t:'대체거래소 문의', media:'altex'},   // NXT 대체거래소 문의 → 매체 플로팅(상담원 연결) — 전 버전 공통
  ]),
  catNode('2. 계좌·잔고조회', 'wallet', [
    {t:'예수금 · 주문가능금액 조회', dep:true},   // 예수금·추정예탁자산(ivN3,0)+주문가능금액(ivN3,1) 통합 → 3매체(디지털ARS/영S#/음성ARS) 플로팅. 음성ARS 선택 시 각 IVR 연결.
    {t:'주식 · 신용 · 금융상품 잔고조회', bal:true},   // 현금주식(ivN3,2)+신용(ivN3,3)+금융상품평가·잔고(ivN3,5) 통합 → 3매체 플로팅. 음성ARS 선택 시 각 IVR 연결.
    {t:'거래내역 조회', txn:true},   // 3매체(디지털ARS/영S#/음성ARS) 플로팅. 음성ARS 선택 시 하위(전체/매매/입출금/입출고) 각 IVR 연결.
    {t:'미수·반대매매 조회', misu:true},   // 2매체(디지털ARS/영S#) 플로팅
    {t:'계좌번호·MY계좌 정보확인', myacct:true},   // 2매체(디지털ARS/영S#) 플로팅
  ]),
  catNode('3. 입출금·이체', 'transfer', [
    {t:'송금', media:'song'},   // 연계은행(ivN4,0)+증권계좌(ivN4,1)+타사(ivN4,2) 통합 → 2매체(영S#/음성ARS). 음성ARS 선택 시 3종 서브리스트.
    {t:'계좌 간 자금이체', media:'xfer'},   // 2매체(영S#/음성ARS)
    {t:'송금결과확인 조회', media:'songres'},   // 2매체(영S#/음성ARS)
    staffLeaf('출금불가·출금제한 임시조치 해지'),
    staffLeaf('환전'),
  ]),
  catNode('4. 인증·비밀번호', 'shield', [
    {t:'비밀번호 관리', media:'pwmgmt'},   // 주문·계좌·영업부 비밀번호 — 디지털ARS/영S#/음성ARS(주문비번 4종)
    {t:'인증·ID 관리',  media:'authid'},   // 간편·공동인증·ID조회·PW초기화 — 영S#/상담원(본인확인 필요)
    {t:'부가서비스',    media:'etcsvc'},    // 퀵넘버·장기미사용 ID 제한해제 — 디지털ARS/영S#/음성ARS(퀵넘버 2종)
  ]),
  catNode('5. 계좌개설·사고', 'idcard', [
    {t:'사고등록',          media:'accident'},   // 음성ARS 중심(긴급) — accvoice→4종 서브리스트 / accapp→영S#
    {t:'주소·전화번호 변경', media:'addr'},       // 영S#/음성ARS 2매체
    {t:'비대면 계좌개설',    media:'acctopen'},    // 키움계좌개설 앱 중심 — kiwoom앱 / 영S#
    staffLeaf('계좌 사고등록 해지'),
    staffLeaf('계좌폐쇄'),
    staffLeaf('신분증 진위확인'),
  ]),
  catNode('6. 공모주·유상청약', 'ipo', [
    {t:'유상청약',    media:'rights'},   // 디지털ARS(조회)/영S#(청약)/음성ARS(4종) 3매체
    {t:'공모주 청약', media:'ipo'},       // 디지털ARS(일정·경쟁률)/영S#(청약)/음성ARS(5종) 3매체
  ]),
  catNode('7. 서류신청·제출', 'cert', [
    {t:'증명서 발급',           media:'cert'},        // 제증명·잔고증명서·거래내역서 통합 — 디지털ARS(발급화면)/영S#
    {t:'금융거래목적확인서 제출', media:'docpurpose'},   // 디지털ARS(제출화면)/영S#
    {t:'고객확인(KYC/CDD) 등록', media:'dockyc'},
    {t:'투자자정보확인서 등록',   media:'docinvestor'},
    {t:'해외 양도소득 관련서류',  media:'docforeign'},
  ]),
  catNode('8. 업무신청', 'doc', [
    {t:'인증·계좌 신청',     media:'authacct'},   // OTP·출금계좌 2종·실명확인 — 디지털ARS(신청화면)/영S#/상담원
    {t:'출고·이관 신청',     media:'shipping'},   // 대체출고·타사대체·해외입출고·ISA — 3매체
    {t:'신용·대출 만기연장', media:'credit'},      // 신용융자·대출 만기연장 — 3매체
  ]),
  catNode('9. 공지·이용안내', 'bell', [
    {t:'ARS 이용안내 및 공지사항', media:'arsguide'},   // 디지털ARS(이용안내 화면)/음성ARS(4종 서브)
    {t:'서비스 점검·공지사항',     media:'notice'},      // 디지털ARS(공지 리스트)/영S#
    {t:'이벤트 안내',             media:'event'},        // 디지털ARS(이벤트 리스트)/영S#
  ]),
];
/* Ver 4.0 전용 대메뉴 재편(2026-07-09): 8개 카테고리로 통합·재정렬. v41(그리드)·v42는 기존 ARS_CAT6(9개) 유지.
   - 계좌개설·사고 + 업무신청 → '비대면 업무'로 병합 / 공지·이용안내 삭제(ARS이용안내만 시스템 및 상품문의로 이동)
   - 신규 '시스템 및 상품문의' = 시스템·해외주식·선물옵션·금융상품·CFD(상담원 연결) + ARS 이용안내 */
const ARS_CAT6_V40 = [
  catNode('1. 예수금 · 잔고조회', 'wallet', [
    {t:'예수금 · 주문가능금액 조회', dep:true},
    {t:'주식 · 신용 · 금융상품 잔고조회', bal:true},
    {t:'거래내역 조회', txn:true},
    {t:'미수·반대매매 조회', misu:true},
  ]),
  catNode('2. ID · 비밀번호 · 계좌정보', 'shield', [
    {t:'비밀번호 관리', media:'pwmgmt'},
    {t:'인증·ID 관리',  media:'authid'},
    {t:'부가서비스',    media:'etcsvc'},
    {t:'계좌정보조회',  myacct:true},   // 예수금·잔고조회 5번에서 이동(구 '계좌번호·MY계좌 정보확인') — 2매체(디지털ARS/영S#) 플로팅
  ]),
  catNode('3. 입출금 · 뱅킹서비스', 'transfer', [
    {t:'송금', media:'song'},
    {t:'계좌 간 자금이체', media:'xfer'},
    {t:'송금결과확인 조회', media:'songres'},
    staffLeaf('출금불가·출금제한 임시조치 해지'),
    staffLeaf('환전'),
  ]),
  catNode('4. 주문 · 체결확인', 'order', [
    {t:'주식주문', stk:true},
    {t:'체결 · 주문내역 조회', che:true},
    {t:'시세 조회', sise:true},
    {t:'지수정보 · 환율 안내', idx:true},
    {t:'대체거래소 문의', media:'altex'},   // NXT 대체거래소 문의 → 매체 플로팅(상담원 연결)
  ]),
  catNode('5. 서류신청 · 제출', 'cert', [
    {t:'증명서 발급',           media:'cert'},
    {t:'금융거래목적확인서 제출', media:'docpurpose'},
    {t:'고객확인(KYC/CDD) 등록', media:'dockyc'},
    {t:'투자자정보확인서 등록',   media:'docinvestor'},
    {t:'해외 양도소득 관련서류',  media:'docforeign'},
  ]),
  catNode('6. 비대면 업무', 'idcard', [
    {t:'사고등록',          media:'accident'},
    {t:'주소·전화번호 변경', media:'addr'},
    {t:'비대면 계좌개설',    media:'acctopen'},
    {t:'인증·계좌 신청',     media:'authacct'},
    {t:'출고·이관 신청',     media:'shipping'},
    {t:'신용·대출 만기연장', media:'credit'},
    staffLeaf('계좌 사고등록 해지'),
    staffLeaf('계좌폐쇄'),
    staffLeaf('신분증 진위확인'),
  ]),
  catNode('7. 공모주 · 유상청약', 'ipo', [
    {t:'유상청약',    media:'rights'},
    {t:'공모주 청약', media:'ipo'},
  ]),
  catNode('8. 시스템 및 상품문의', 'bell', [
    staffLeaf('시스템'),
    staffLeaf('해외주식'),
    staffLeaf('선물옵션'),
    staffLeaf('금융상품'),
    staffLeaf('CFD'),
    {t:'ARS 이용안내 및 공지사항', media:'arsguide'},
  ]),
];
function catData(){ return s1Ver==='v40' ? ARS_CAT6_V40 : ARS_CAT6; }   // v40=재편 8카테고리 / v41·v42=원본 9카테고리
function catDesc(){ return s1Ver==='v40' ? V40_DESC_V40 : V40_DESC; }

/* 음성 ARS 메뉴트리 (V2.0/V2.1 ARS메뉴) — Ver 4.0은 수요 9 카테고리(ARS_CAT6, 직원연결 매핑 활성), 그 외는 원본 IVR */
function usesCat(){ return isV40(); }   // ARS_CAT6(9 카테고리) + 직원연결 매핑 사용 버전 (v40·v41 공통)
function renderSimpleArs(){ return renderArsTree(usesCat() ? catData() : IVR, {guide:'원하시는 서비스를 선택하세요.', crumb:'음성 ARS · ', mapStaff:usesCat()}); }
/* 상담원 연결 메뉴트리 (V2.1 메인 · ARS메뉴와 동일 번호 드릴다운 구성) */
function renderStaffTree(){ return renderArsTree(FAV_MENU, {guide:'상담 분야의 번호를 선택하세요.', crumb:'상담원 연결 · ', leaf:'staff'}); }

/* 상담원(직원) 연결 화면 */
function agentConnectScreen(label){
  const nm = (label && label!=='직원연결') ? stripNum(label) : '';
  const desc = nm ? `'${nm}' 관련 상담부서로<br>상담원(직원)에게 연결해 드립니다.`
    : `상담원(직원)에게 바로 연결해 드립니다.<br>아래 버튼을 눌러 상담을 시작하세요.`;
  return `<div class="agent-connect">
    <div class="ac-ic">${I.headset}</div>
    <div class="ac-t">상담원 연결</div>
    <div class="ac-d">${desc}</div>
    <div class="ac-info">
      ${nm ? `<div class="ac-row"><span class="k">상담 분야</span><span class="v">${nm}</span></div>` : ''}
      <div class="ac-row"><span class="k">상담 가능 시간</span><span class="v">평일 08:00 ~ 18:00</span></div>
      <div class="ac-row"><span class="k">예상 대기</span><span class="v">약 1분</span></div>
    </div>
    <div class="primary-btn" data-flash="상담원에게 연결합니다. (시연용)">상담원 연결하기</div>
    <div class="notice">연결 시 음성 통화 또는 채팅 상담으로 진행됩니다.</div>
  </div>`;
}

/* Ver 4.0 · 상담원 연결 화면 — 토스 헤더(뒤로가기만, 타이틀·햄버거 없음) + 중앙정렬 본문(헤드셋 아이콘 포함, 기존 .agent-connect 재사용) */
function renderAgentV40(label){
  const nm = (label && label!=='직원연결') ? stripNum(label) : '';
  const desc = nm ? `'${nm}' 관련 상담부서로<br>상담원에게 연결해 드려요.` : `상담원에게 바로 연결해 드려요.<br>아래 버튼을 눌러 상담을 시작하세요.`;
  if(isV45()){
    return `<div class="iodresult-screen v45-authpage">
      <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
      <div class="iod-v45-body">
        <div class="toss-dhead">
          <div class="td-title">상담원 연결</div>
          <div class="td-desc">${desc}</div>
        </div>
        <div class="iod-v45-card">
          ${nm ? `<div class="v45-ir"><span class="v45-ik">상담 분야</span><span class="v45-iv">${nm}</span></div>` : ''}
          <div class="v45-ir"><span class="v45-ik">상담 가능 시간</span><span class="v45-iv">평일 08:00~18:00</span></div>
          <div class="v45-ir"><span class="v45-ik">상담 대기</span><span class="v45-iv">3명</span></div>
        </div>
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-agentgo>상담원 연결하기</div></div>
      </div>
    </div>`;
  }
  const v40 = (s1Ver==='v40');   // Ver 4.0만: '상담 대기'·설명글 삭제·카드=버튼 동일폭·연결 후 홈 이동(v41/v42는 기존 유지)
  const waitRow = v40
    ? `<div class="ac-row"><span class="k">상담 대기</span><span class="v">3명</span></div>`
    : `<div class="ac-row"><span class="k">예상 대기</span><span class="v">약 1분</span></div>`;
  const noticeRow = v40 ? '' : `<div class="notice">연결 시 음성 통화 또는 채팅 상담으로 진행돼요.</div>`;
  const connectBtn = v40
    ? `<div class="primary-btn" data-agentgo>상담원 연결하기</div>`
    : `<div class="primary-btn" data-flash="상담원에게 연결합니다. (시연용)">상담원 연결하기</div>`;
  return `<div class="acv-wrap${v40?' acv-v40':''}">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="agent-connect">
      <div class="ac-ic">${I.headset}</div>
      <div class="ac-t">상담원 연결</div>
      <div class="ac-d">${desc}</div>
      <div class="ac-info">
        ${nm ? `<div class="ac-row"><span class="k">상담 분야</span><span class="v">${nm}</span></div>` : ''}
        <div class="ac-row"><span class="k">상담 가능 시간</span><span class="v">평일 08:00 ~ 18:00</span></div>
        ${waitRow}
      </div>
      ${connectBtn}
      ${noticeRow}
    </div>
  </div>`;
}

/* 음성 ARS 연결 화면 */
function voiceConnectScreen(){
  return `<div class="agent-connect">
    <div class="ac-ic">${I.phone}</div>
    <div class="ac-t">음성 ARS 연결 중</div>
    <div class="ac-d">키움증권 음성 ARS에 연결하고 있습니다.<br>잠시만 기다려 주세요.</div>
    <div class="ac-info">
      <div class="ac-row"><span class="k">연결 번호</span><span class="v">1544-9000</span></div>
      <div class="ac-row"><span class="k">상태</span><span class="v">연결 중…</span></div>
      <div class="ac-row"><span class="k">예상 대기</span><span class="v">약 30초</span></div>
    </div>
    <div class="primary-btn" data-s1back>통화 종료</div>
    <div class="notice">음성 안내에 따라 키패드를 입력하시면 상담이 진행됩니다.</div>
  </div>`;
}

/* 인증정보 폐기 안내 문구 — 일반: [상황 안내]+상세 문구 / 큰글씨(bigFont): 짧고 쉬운 한 줄 */
function wipeNote(lead){ return bigFont ? '입력한 정보는 저장하지 않아요.' : `${lead}<br>입력하신 인증정보는 남기거나 저장하지 않아요.`; }

/* Ver 4.0 · 음성 ARS 연결 화면 — 토스 헤더(뒤로가기만) + 중앙정렬 본문(수화기 아이콘·연결정보·통화 종료, renderAgentV40와 동일 구조) */
function renderVoiceV40(){
  return `<div class="acv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="agent-connect">
      <div class="ac-ic">${I.phone}</div>
      <div class="ac-t">음성 ARS 연결 중</div>
      <div class="ac-d">키움증권 음성 ARS에 연결하고 있어요.<br>잠시만 기다려 주세요.</div>
      <div class="ac-info">
        <div class="ac-row"><span class="k">연결 번호</span><span class="v">1544-9000</span></div>
        <div class="ac-row"><span class="k">상태</span><span class="v">연결 중…</span></div>
        <div class="ac-row"><span class="k">예상 대기</span><span class="v">약 30초</span></div>
      </div>
      <div class="primary-btn" data-s1back>통화 종료</div>
      <div class="notice">${wipeNote('음성 ARS로 연결하면 지금 보고 계신 디지털 ARS는 종료돼요.')}</div>
    </div>
  </div>`;
}

/* 음성 ARS 연결 안내 팝업 */
function showPopup(label){
  closeModal();
  const name = label ? label.replace(/^[0-9#]+\.\s*/,'') : '';
  const screen = document.getElementById('screen');
  const el = document.createElement('div');
  if(isV40()){   // Ver 4.0 계열: 토스 스타일 안내 팝업(app-pop 재사용 · 마젠타 스킨)
    const v40only = (s1Ver==='v40');   // Ver 4.0: 안내 첫째줄('키움증권 음성 ARS로 연결해 드릴게요.')·연결번호/시간 삭제
    const msg = name
      ? `'${name}' 메뉴를<br>음성 ARS로 연결해 드릴게요.`
      : (v40only ? `음성 안내에 따라 원하시는 메뉴를 선택하세요.`
                 : `키움증권 음성 ARS로 연결해 드릴게요.<br>음성 안내에 따라 원하시는 메뉴를 선택하세요.`);
    const warn = v40only ? '' : `<span class="ap-warn">연결 번호 1544-9900 · 평일 08:00~18:00</span>`;
    el.className = 'app-pop-ov v40'; el.id = 'arsModal';
    el.innerHTML = `<div class="app-pop">
      <div class="ap-logo voice">${CS_ICON.voice}</div>
      <div class="ap-title">음성 ARS로 연결할게요</div>
      <div class="ap-desc">${msg}${warn}</div>
      <div class="ap-btns">
        <div class="ap-btn cancel" data-mcancel>취소</div>
        <div class="ap-btn go" data-mok>연결하기</div>
      </div>
    </div>`;
    screen.appendChild(el);
    requestAnimationFrame(()=>el.classList.add('on'));
    return;
  }
  // 레거시(비 v40) 안내 팝업
  const msg = name ? `'${name}' 메뉴는<br>음성 ARS 상담으로 연결됩니다.` : `음성 ARS 상담으로<br>연결해 드립니다.`;
  el.className = 'modal-ov'; el.id = 'arsModal';
  el.innerHTML = `<div class="modal">
    <div class="m-ic">${I.phone}</div>
    <div class="m-t">음성 ARS 연결 안내</div>
    <div class="m-d">${msg}</div>
    <div class="m-btns">
      <button class="m-btn cancel" data-mcancel>취소</button>
      <button class="m-btn ok" data-mok>연결하기</button>
    </div>
  </div>`;
  screen.appendChild(el);
}
function closeModal(){ const m=document.getElementById('arsModal'); if(m) m.remove(); }
/* Ver 4.0 · 음성 ARS 연결하기 → 실제 휴대폰 통화화면(다이얼패드+통화중) 전체화면 오버레이 + 상단 '디지털 ARS 열기' 플로팅 */
function openVoiceCall(){
  closeModal();
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  el.className = 'callscreen-ov'; el.id = 'callScreen';
  const dialIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/></svg>';
  const keys = [['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ'],['*',''],['0','+'],['#','']];
  const keypad = keys.map(([d,l])=>`<div class="ck"><span class="ck-d">${d}</span><span class="ck-l">${l}</span></div>`).join('');
  el.innerHTML = `<div class="call-statusbar"><span>9:41</span><span class="icons">●●● 5G ▮</span></div>
    <div class="call-float" data-arsopen><span class="cf-ic">${dialIc}</span>디지털 ARS 열기</div>
    <div class="call-info">
      <div class="call-name">키움증권 음성 ARS</div>
      <div class="call-num">1544-9900</div>
      <div class="call-status">통화 중</div>
    </div>
    <div class="call-keypad">${keypad}</div>
    <div class="call-endwrap"><div class="call-end" data-callend title="통화 종료">${I.phone}</div><div class="call-endlb">통화 종료</div></div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeVoiceCall(){ const el=document.getElementById('callScreen'); if(el) el.remove(); }

/* 서비스 종료 안내 팝업 (Ver 4.0: 토스 스타일 · 입력 인증정보 무효화 안내) */
function showEndPopup(){
  closeModal();
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  if(isV40()){
    // 일반 모드: 인증 여부와 무관하게 항상 기존 전체 문구 / 큰글씨: 짧게
    const v40only = (s1Ver==='v40');   // Ver 4.0: 설명글(인증정보 안내) 삭제, '이용해 주셔서 감사합니다.'만 유지
    const warn = `<span class="ap-warn">${bigFont ? '입력한 정보는 저장하지 않아요.' : '입력하신 인증정보는 종료와 함께 모두 무효화돼요.<br>이용을 마치면 인증정보를 남기거나 저장하지 않아요.'}</span>`;
    el.className = 'app-pop-ov v40'; el.id = 'arsModal';
    el.innerHTML = `<div class="app-pop">
      <div class="ap-logo end">${I.power}</div>
      <div class="ap-title">서비스를 종료할게요</div>
      <div class="ap-desc">이용해 주셔서 감사합니다.${v40only ? '' : '<br>'+warn}</div>
      <div class="ap-btns">
        <div class="ap-btn cancel" data-mcancel>취소</div>
        <div class="ap-btn go" data-endok>종료하기</div>
      </div>
    </div>`;
    screen.appendChild(el);
    requestAnimationFrame(()=>el.classList.add('on'));
    return;
  }
  // 레거시(비 v40)
  flash('서비스를 종료합니다. 이용해 주셔서 감사합니다.');
}

/* ---------- 상태 ---------- */
let mode = '간편';     // 일반 | 간편
let bigFont = false;
let scheme = 's1';

function applyScale(){
  let s = mode==='간편' ? 1.06 : 1.0;
  if(bigFont) s += 0.12;
  document.documentElement.style.setProperty('--scale', s.toFixed(3));
}

/* ---------- 공통 헤더 ---------- */
function header(title, menu=true){
  return `<div class="app-head">
    <div class="logo"><img src="assets/kiwoom-logo.png" alt="키움증권"></div>
    <div class="head-spacer"></div>
    <div class="center-badge" data-skipauth title="본인인증 생략 (시연)">고객센터 <b>원활</b><span class="dot"></span></div>
    ${menu ? `<div class="back" data-menu title="전체메뉴">${I.menu}</div>` : ''}
  </div>`;
}
const NOTICES = [
  '[공지] 디지털 ARS 서비스 정기점검 안내 (6/25 02:00~04:00)',
  '[안내] 공모주 청약 — 에이펙스반도체 6/24~6/25 진행',
  '[이벤트] 중개형 ISA 타사 이전 시 최대 551만원 혜택',
];
function noticeCard(){
  const track = NOTICES.map(t=>`<span class="ni">${t}</span>`).join('');
  return `<div class="center-status" data-flash="공지사항 전체보기로 이동합니다.">
    <div class="marquee"><div class="mtrack">${track}${track}</div></div>
    <div class="more">전체 ${I.chev}</div>
  </div>`;
}
/* Ver 4.0 · 토스 스타일 카테고리 리스트 (단색 마젠타 아이콘칩 + 볼드 라벨 + 설명글 + chevron) */
const V40_DESC = [
  '주식을 사고팔고, 체결·주문 내역을 확인해요',
  '예수금과 잔고, 거래내역을 조회해요',
  '은행↔증권 입출금과 계좌 간 이체를 해요',
  '비밀번호를 바꾸고 인증서를 관리해요',
  '계좌를 새로 만들거나 사고를 신고·해지해요',
  '공모주와 유상증자 청약을 신청해요',
  '증명서를 발급받고 필요한 서류를 제출해요',
  'OTP 발급, 출금계좌 등록 등을 신청해요',
  '서비스 공지와 ARS 이용방법을 안내해요',
];
/* Ver 4.0 재편 대메뉴(8개) 설명글 — catDesc()가 v40일 때 사용(순서 = ARS_CAT6_V40) */
const V40_DESC_V40 = [
  '예수금과 잔고, 거래내역을 조회해요',
  '비밀번호·인증서·계좌 정보를 관리해요',
  '입출금·이체 등 뱅킹서비스를 이용해요',
  '주식을 사고팔고, 체결·주문 내역을 확인해요',
  '증명서를 발급받고 필요한 서류를 제출해요',
  '계좌개설·사고등록 등 업무를 비대면으로 신청해요',
  '공모주와 유상증자 청약을 신청해요',
  '시스템·상품 문의와 ARS 이용안내를 확인해요',
];
function tossCatList(){
  return `<div class="toss-list">` + catData().map((cat,i)=>
    `<div class="toss-cat" data-sarsdown="${i}">
      <div class="tc-ic">${I[cat.ic]||I.order}</div>
      <div class="tc-body"><div class="tc-nm">${stripNum(cat.t)}</div><div class="tc-desc">${catDesc()[i]||''}</div></div>
      <div class="tc-arw">${I.chev}</div>
    </div>`
  ).join('') + `</div>`;
}
/* Ver 4.1 · 9 대메뉴 3×3 그리드 (아이콘칩 + 라벨) — 로직·드릴다운은 v40과 동일, 메인 표현만 그리드 */
/* 그리드 전용 2줄 라벨(카테고리 인덱스 기준, <br>로 줄바꿈). 미지정 셀은 원본 카테고리명(stripNum). ※v40 리스트·드릴다운 헤더는 원본명 유지 */
const V41_GRID_LB = {
  0: '주식주문 ·<br>체결확인',      // cat1 주문·체결확인
  1: '계좌예수금 ·<br>잔고조회',    // cat2 계좌·잔고조회
  2: '입출금 ·<br>계좌간이체',      // cat3 입출금·이체
  3: '인증 ·<br>비밀번호',          // cat4 인증·비밀번호
  4: '계좌개설 ·<br>사고등록',      // cat5 계좌개설·사고
  5: '공모주 ·<br>유상청약',        // cat6 공모주·유상청약
  6: '서류신청 ·<br>제출',          // cat7 서류신청·제출
  7: '업무<br>신청',                // cat8 업무신청 (구분점 없음 → 업무/신청 분리)
  8: '공지 ·<br>이용안내',          // cat9 공지·이용안내
};
function tossCatGrid(){
  return `<div class="toss-grid">` + catData().map((cat,i)=>
    `<div class="toss-gcell" data-sarsdown="${i}">
      <div class="tg-ic">${I[cat.ic]||I.order}</div>
      <div class="tg-nm">${V41_GRID_LB[i] || stripNum(cat.t)}</div>
    </div>`
  ).join('') + `</div>`;
}
/* Ver 4.5 · 대메뉴 상단 탭(공통/증권/금융상품) + 대메뉴/중메뉴 — 디지털ARS 메뉴구조도 v0.2 기준.
   각 대메뉴: {id(전역번호), t(대메뉴명), ic(아이콘), subs[중메뉴명...]}. subs 비면 대메뉴 자체가 최종(중메뉴 없음). 중메뉴 클릭 이후 절차는 추후 정의. */
const V45_MENU_TABS = [
  {k:'common', nm:'공통', cats:[
    {id:1, t:'MTS/HTS 화면',   fi:12, d:'HTS·MTS 화면 사용을 문의해요',              subs:['HTS 화면 문의','MTS 화면 문의']},
    {id:2, t:'ID/PW/인증서',   fi:2,  d:'ID·비밀번호·인증서를 조회하고 관리해요',    subs:['ID조회/PW초기화','장기미사용ID 제한 해지','간편인증/공동인증서']},
    {id:3, t:'비대면 업무',     fi:4,  d:'계좌개설·비밀번호·출금계좌 등을 비대면으로 처리해요', subs:['계좌개설 및 1원입금인증','증권계좌번호확인','계좌비밀번호 재설정','출금계좌등록','한도제한계좌해제','계좌폐쇄']},
    {id:4, t:'계좌정보/뱅킹',   fi:1,  d:'계좌정보 조회·변경과 이체·대체를 이용해요', subs:['계좌정보 조회 및 변경','은행이체','주식대체']},
    {id:6, t:'사고 등록/해지',  fi:9,  d:'계좌 사고를 등록하거나 해지해요',           subs:[]},
    {id:8, t:'서류발급',        fi:6,  d:'필요한 증명서·서류를 발급받아요',           subs:[]},
  ]},
  {k:'domestic', nm:'증권', cats:[
    {id:5, t:'미수금 및 신용/대출',       fi:1, d:'미수·반대매매와 신용·대출을 확인·신청해요',   subs:['미수 및 반대매매','신용/대출 약정 안내','신용/대출 신청 및 상환']},
    {id:7, t:'국내주식 주문 및 잔고조회', fi:4, d:'시세·주문·체결·잔고조회까지 이용해요',         subs:['시세 및 시황','주문','체결조회','예수금 및 잔고조회','대체거래소 문의']},
    {id:9, t:'유상청약 및 공모주청약',    fi:6, d:'유상·공모주 청약과 권리업무를 신청해요',       subs:['유상청약','공모주청약','반대의사 및 매수청구','그외 권리업무']},
  ]},
  {k:'etc', nm:'금융상품', cats:[
    {id:10, t:'해외주식',            fi:8, d:'해외주식과 RIA계좌 업무를 이용해요',            subs:['해외주식 관련','RIA계좌']},
    {id:11, t:'금융상품',            fi:8, d:'ISA·연금·펀드 등 금융상품에 가입·관리해요',     subs:['ISA 가입','연금 및 IRP 가입','ELS·랩어카운트','펀드·채권·발행어음','계좌조회 및 뱅킹업무']},
    {id:12, t:'국내선물옵션',        fi:8, d:'국내 선물·옵션 거래를 문의해요',                subs:[]},
    {id:13, t:'CFD 및 상품선물옵션', fi:8, d:'CFD·상품선물옵션 거래를 문의해요',              subs:['해외CFD 및 상품선물옵션','국내CFD']},
    {id:14, t:'부가서비스',          fi:5, d:'ARS 주문이용·비밀번호·퀵넘버를 신청해요',       subs:['ARS 주문이용신청','ARS 주문비밀번호','ARS 퀵넘버플러스']},
    {id:15, t:'금융센터 전화번호 안내', fi:7, d:'금융센터 대표 전화번호를 안내해요',            subs:[]},
  ]},
];
function v45CatById(id){ for(const tab of V45_MENU_TABS){ const c=tab.cats.find(x=>x.id===id); if(c) return c; } return null; }

/* Ver 4.7 · 9대메뉴 (메뉴구조도 기반) */
const V47_MENU_CATS = [
  {id:1, t:'내정보',        sub:'계좌정보/ID/PW',          ic:'v47-glass-1.png', subs:['계좌정보 조회 및 변경','증권계좌번호확인','계좌비밀번호 재설정','ID조회/PW초기화','장기미사용ID 제한 해지']},
  {id:2, t:'비대면업무',    sub:'접수현황/서류발급',        ic:'v47-glass-2.png', subs:['서류신청','계좌개설 이어하기','출금계좌등록','한도제한계좌해제','계좌폐쇄']},
  {id:3, t:'뱅킹서비스',    sub:'입출금/신용/대출',         ic:'v47-glass-3.png', subs:['은행이체','주식대체','미수 및 반대매매','신용·대출 약정 및 신청방법','신용·대출 잔고조회','신용·대출 만기일연장','신용·대출 상환']},
  {id:4, t:'권리/청약',     sub:'유상청약/공모주청약',      ic:'v47-glass-4.png', subs:['유상청약','공모주청약','반대의사 및 매수청구','그의 권리업무']},
  {id:5, t:'국내주식',      sub:'시세/주문/잔고',            ic:'v47-glass-5.png', subs:['시세 및 시황','주문','체결조회','예수금 및 잔고조회','대체거래소 문의']},
  {id:6, t:'해외주식',      sub:'제도/환전/RIA',             ic:'v47-glass-6.png', subs:['해외주식 관련','RIA계좌']},
  {id:7, t:'금융상품',      sub:'ISA·연금·펀드',            ic:'v47-glass-7.png', subs:['ISA 가입','연금 및 IRP 가입','ELS·랩어카운트','펀드·채권·발행어음','계좌조회 및 뱅킹업무']},
  {id:8, t:'선물옵션',      sub:'CFD/파생상품',             ic:'v47-glass-8.png', subs:['국내선물옵션','해외CFD 및 상품선물옵션','국내CFD']},
  {id:9, t:'기타서비스',    sub:'인증/화면문의',            ic:'v47-glass-9.png', subs:['ARS 주문이용신청','ARS 주문비밀번호','ARS 퀵넘버플러스','간편인증·공동인증서','HTS 화면 문의','MTS 화면 문의','사고 등록·해지','금융센터 전화번호 안내']},
];
/* Ver 4.7 · 3×3 그리드 홈 */
function v47Grid(){
  return `<div class="v47-grid">` + V47_MENU_CATS.map(c=>`<div class="v47-cell" data-v47cat="${c.id}">
      <div class="v47-cell-ic"><img src="assets/${c.ic}" alt=""></div>
      <div class="v47-cell-nm">${c.t}</div>
      ${c.sub?`<div class="v47-cell-sub">${c.sub}</div>`:''}
    </div>`).join('') + `</div>`;
}
/* Ver 4.7 · 대메뉴 클릭 후 중메뉴 목록 페이지 */
function v47SubMenuPage(){
  const cat = V47_MENU_CATS.find(c=>c.id===s1state.v47Cat);
  if(!cat) return '';
  const rows = cat.subs.map(s=>
    `<div class="toss-cat" data-v47sub="${s}"><div class="tc-body"><div class="tc-nm">${s}</div></div><div class="tc-arw">${I.chev}</div></div>`
  ).join('');
  return `<div class="home-wrap toss-home">
    <div class="toss-stick">
      <div class="toss-top"><div class="toss-back" data-s1back>${I.back}</div><div class="head-spacer"></div></div>
      <div class="toss-dhead"><div class="td-title">${cat.t}</div>${cat.sub?`<div class="td-desc">${cat.sub}</div>`:''}</div>
    </div>
    <div class="toss-list">${rows}</div>
  </div>`;
}
function v45MenuTabs(){
  const cur = s1state.v45Tab || 'common';
  const tabs = V45_MENU_TABS.map(t=>
    `<div class="v45-tab ${t.k===cur?'on':''}" data-v45tab="${t.k}">${t.nm}</div>`
  ).join('');
  return `<div class="v45-tabs">${tabs}</div>`;
}
function v45Menu(){
  const cur = s1state.v45Tab || 'common';
  const tab = V45_MENU_TABS.find(t=>t.k===cur) || V45_MENU_TABS[0];
  const openId = s1state.v45Cat;
  return `<div class="toss-list">` + tab.cats.map(c=>{
    const icon = c.fi ? `<img src="assets/finance-${c.fi}.png" alt="">` : (I[c.ic]||I.order);
    const isOpen = (openId === c.id) && c.subs && c.subs.length;
    const subsHtml = isOpen
      ? `<div class="v45-acc-subs">` + c.subs.map(s=>
          `<div class="toss-cat v45-acc-sub" data-v45sub="${s}"><div class="tc-body"><div class="tc-nm">${s}</div></div><div class="tc-arw">${I.chev}</div></div>`
        ).join('') + `</div>`
      : '';
    return `<div class="v45-acc-item${isOpen?' open':''}"><div class="toss-cat" data-v45cat="${c.id}"><div class="tc-ic${c.fi?' tc-ic-fin':''}">${icon}</div><div class="tc-body"><div class="tc-nm">${c.t}</div>${c.d?`<div class="tc-desc">${c.d}</div>`:''}</div><div class="tc-arw${isOpen?' open':''}">${I.chev}</div></div>${subsHtml}</div>`;
  }).join('') + `</div>`;
}
/* v46: 탭 없이 모든 대메뉴 flat 나열 */
function v46FlatMenu(){
  const openId = s1state.v45Cat;
  const allCats = V45_MENU_TABS.reduce((a,t)=>a.concat(t.cats),[]);
  return `<div class="toss-list">` + allCats.map(c=>{
    const icon = c.fi ? `<img src="assets/finance-${c.fi}.png" alt="">` : (I[c.ic]||I.order);
    const isOpen = (openId === c.id) && c.subs && c.subs.length;
    const subsHtml = isOpen
      ? `<div class="v45-acc-subs">` + c.subs.map(s=>
          `<div class="toss-cat v45-acc-sub" data-v45sub="${s}"><div class="tc-body"><div class="tc-nm">${s}</div></div><div class="tc-arw">${I.chev}</div></div>`
        ).join('') + `</div>`
      : '';
    return `<div class="v45-acc-item${isOpen?' open':''}"><div class="toss-cat" data-v45cat="${c.id}"><div class="tc-ic${c.fi?' tc-ic-fin':''}">${icon}</div><div class="tc-body"><div class="tc-nm">${c.t}</div>${c.d?`<div class="tc-desc">${c.d}</div>`:''}</div><div class="tc-arw${isOpen?' open':''}">${I.chev}</div></div>${subsHtml}</div>`;
  }).join('') + `</div>`;
}
/* 대메뉴 드릴다운: 중메뉴 리스트 (뒤로가기 + 대메뉴명 타이틀). 중메뉴 클릭 이후 절차는 추후 정의 */
function renderV45Sub(){
  const cat = v45CatById(s1state.v45Cat);
  if(!cat || !cat.subs.length){ s1state.v45Cat=null; return ''; }   // 방어용(분기 조건에서 이미 subs 유무 확인)
  const list = cat.subs.map(s=>
    `<div class="toss-cat" data-v45sub="${s}"><div class="tc-body"><div class="tc-nm">${s}</div></div><div class="tc-arw">${I.chev}</div></div>`
  ).join('');
  return `<div class="home-wrap toss-home">`
    + `<div class="toss-stick"><div class="toss-top"><div class="toss-back" data-v45back title="이전">${I.chev}</div><div class="head-spacer"></div></div>`
    + `<div class="toss-dhead"><div class="td-title">${cat.t}</div></div></div>`
    + `<div class="toss-drill"><div class="toss-list">${list}</div></div>`
    + `</div>`;
}
/* Ver 4.0 · '상담 없이 해결할 수 있어요' 자가해결 카드 (토스 IMG_5635 참고) — 기본 1개만, 화살표로만 펼침/접기 */
/* FAQ 카드 아이콘: 사이버보안 스타일의 자체 제작 원본 라인 SVG (외부 에셋·라이선스 불필요) */
const V40_FAQ = [
  {t:'입출금이 안돼요',   svg:'<img src="assets/error.png" alt="입출금 오류">'},
  {t:'증명서 발급 현황이 궁금해요', svg:'<img src="assets/certificate.png" alt="증명서 발급 현황">'},
  {t:'ISA 가입서류를 내고 싶어요',   svg:'<img src="assets/file-upload.png" alt="ISA 가입서류 제출">'},
  {t:'자주 묻는 질문',   svg:'<img src="assets/question.png" alt="자주 묻는 질문">'},
];
/* v40 전용 FAQ: 4번째 항목을 '비밀번호를 재설정하고 싶어요'로 교체(자물쇠 아이콘·인라인 SVG). v41/v42는 기존 V40_FAQ 유지 */
const PW_LOCK_SVG = '<svg viewBox="0 0 24 24" fill="none"><rect x="4.5" y="10.3" width="15" height="10.4" rx="2.4" fill="#E6007F"/><path d="M8 10.3V8a4 4 0 0 1 8 0v2.3" stroke="#F7A8D3" stroke-width="2.2"/><circle cx="12" cy="14.6" r="1.55" fill="#fff"/><rect x="11.2" y="15.1" width="1.6" height="3.1" rx=".8" fill="#fff"/></svg>';
const V40_FAQ_V40 = [ V40_FAQ[0],
  {t:'서류 발급현황이 궁금해요', svg:'<img src="assets/certificate.png" alt="서류 발급현황">'},   // v40 전용: '증명서 발급 현황이 궁금해요' → '서류 발급현황이 궁금해요' (v41/v42는 기존 유지)
  V40_FAQ[2],
  {t:'비밀번호를 재설정하고 싶어요', svg:'<img src="assets/question.png" alt="비밀번호 재설정">'},
];
/* '비밀번호를 재설정하고 싶어요' 클릭 → 어떤 비밀번호를 재설정할지 선택 시트(매체 플로팅 바텀시트 방식) */
const PWRESET_SHEET = { title:'어떤 비밀번호를 재설정할까요?', sub:'재설정할 비밀번호를 선택해 주세요', noIcon:true, cls:'pwreset-sheet', methods:[
  {kind:'pwreset0', nm:'ID 비밀번호',        desc:'로그인에 쓰는 <b class="cs-em">영문과 숫자를 조합한 5~8자리</b> 비밀번호예요'},
  {kind:'pwreset1', nm:'증권계좌 비밀번호',   desc:'증권계좌에 쓰는 <b class="cs-em">숫자 4~8자리</b> 비밀번호예요'},
  {kind:'pwreset2', nm:'공동인증서 비밀번호', desc:'<b class="cs-em">영문·숫자·특수문자를 모두 포함한 10자리 이상</b> 비밀번호예요'},
]};
/* ===== FAQ 비밀번호 재설정 > ID 비밀번호 재설정 플로우 (Ver 4.0) =====
   본인인증(정보입력 → 인증번호) → 본인확인 완료 + 계좌인증 → ID 비밀번호 재설정 */
const IDPW_ID = 'kiwoom0728';
const IDPW_ACCTS = ['12**-**78','63**-**76','50**-**02'];
const IDPW_STEPS = ['본인 인증','계좌 인증','비밀번호 재설정'];
function v45IdpwTop(cur){
  cur=(cur||0);
  const seg=IDPW_STEPS.map((s,i)=>`<span class="v45-step${i<=cur?' on':''}"></span>`).join('');
  const back=s1state.noBack?`<div class="v45-step-spacer" aria-hidden="true"></div>`:`<div class="back" data-s1back>${I.back}</div>`;
  return `<div class="page-top iod-top v45-authtop">${back}<div class="v45-stepper" title="${cur+1}/${IDPW_STEPS.length} · ${IDPW_STEPS[cur]}">${seg}</div><div class="v45-step-spacer" aria-hidden="true"></div></div>`;
}
function renderIdpwAuth(){
  // 1페이지: 정보입력(고객명/생년월일/휴대폰 + 필수동의 + 인증요청) → 인증번호(타이틀·설명 유지, 입력창 대신 인증번호 + 인증완료)
  const step = s1state.idpwStep || 'info';
  const desc = '고객님 본인 확인을 위해 정보를 입력해 주세요.';
  if(isV45()){
    const otpBody = `<div class="auth-wrap"><div class="auth-info"><div class="ir"><span class="k">인증번호</span><input class="ir-input" id="idpwOtp" inputmode="numeric" maxlength="6" placeholder="숫자 6자리" autocomplete="off"></div></div><div class="idpw-guide">입력하신 휴대폰으로 인증번호를 보냈어요.<br>3분 이내에 입력해 주세요.</div></div><div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-idpwotpdone>인증완료</div></div>`;
    const infoBody = `<div class="auth-wrap"><div class="auth-info"><div class="ir"><span class="k">고객명</span><input class="ir-input" id="idpwName" placeholder="이름 입력" autocomplete="off"></div><div class="ir"><span class="k">생년월일</span><input class="ir-input" id="idpwDob" inputmode="numeric" maxlength="6" placeholder="6자리 (YYMMDD)" autocomplete="off"></div><div class="ir"><span class="k">본인명의 휴대폰</span><input class="ir-input" id="idpwPhone" inputmode="numeric" maxlength="11" placeholder="'-' 없이 입력" autocomplete="off"></div></div><div class="find-agree idpw-agree${s1state.idpwAgree?' on':''}" data-idpwagree><span class="fa-box">${FIND_CHECK}</span><span class="fa-txt">개인(신용)정보 수집·이용 필수동의서 <b>(필수)</b></span></div></div><div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-idpwreq>인증요청</div></div>`;
    return `<div class="iodresult-screen v45-authpage">${v45IdpwTop(0)}<div class="iod-v45-body"><div class="toss-dhead"><div class="td-title">본인인증 후<br>ID 비밀번호를 재설정해요</div><div class="td-desc">${desc}</div></div>${step==='otp'?otpBody:infoBody}</div></div>`;
  }
  const title = '본인인증 후 ID 비밀번호 재설정이 가능해요';
  const body = step==='otp'
    ? `<div class="auth-info">
        <div class="ir"><span class="k">인증번호</span><input class="ir-input" id="idpwOtp" inputmode="numeric" maxlength="6" placeholder="숫자 6자리" autocomplete="off"></div>
      </div>
      <div class="idpw-guide">입력하신 휴대폰으로 인증번호를 보냈어요.<br>3분 이내에 입력해 주세요.</div>
      <div class="primary-btn" data-idpwotpdone>인증완료</div>`
    : `<div class="auth-info">
        <div class="ir"><span class="k">고객명</span><input class="ir-input" id="idpwName" placeholder="이름 입력" autocomplete="off"></div>
        <div class="ir"><span class="k">생년월일</span><input class="ir-input" id="idpwDob" inputmode="numeric" maxlength="6" placeholder="6자리 (YYMMDD)" autocomplete="off"></div>
        <div class="ir"><span class="k">본인명의 휴대폰</span><input class="ir-input" id="idpwPhone" inputmode="numeric" maxlength="11" placeholder="'-' 없이 입력" autocomplete="off"></div>
      </div>
      <div class="find-agree idpw-agree${s1state.idpwAgree?' on':''}" data-idpwagree><span class="fa-box">${FIND_CHECK}</span><span class="fa-txt">개인(신용)정보 수집·이용 필수동의서 <b>(필수)</b></span></div>
      <div class="primary-btn" data-idpwreq>인증요청</div>`;
  return `<div class="auth-wrap iodauth">
    <div class="toss-dhead"><div class="td-title">${title}</div><div class="td-desc">${desc}</div></div>
    ${body}
  </div>`;
}
function renderIdpwDone(){
  // 본인확인 완료 → ID 표기 + 계좌 인증(콤보 마스킹 + 계좌비번) → 확인 시 같은 자리에 ID 비밀번호 재설정 입력칸
  const reset = !!s1state.idpwReset;
  if(isV45()){
    const acctBody = `<div class="iod-v45-card"><div class="v45-ir"><span class="v45-ik">회원님의 ID</span><span class="v45-iv">${IDPW_ID}</span></div></div><div class="auth-wrap"><div class="auth-info"><div class="ir"><span class="k">증권계좌</span><div class="idpw-selwrap"><select class="idpw-sel" id="idpwAcctSel">${IDPW_ACCTS.map(a=>`<option>${a}</option>`).join('')}</select><span class="idpw-selchev">${I.down}</span></div></div><div class="ir"><span class="k">계좌 비밀번호</span><input class="ir-input" id="idpwAcctPw" type="password" inputmode="numeric" maxlength="8" placeholder="숫자 4~8자리" autocomplete="off"></div></div></div><div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-idpwacctdone>확인</div></div>`;
    const resetBody = `<div class="auth-wrap"><div class="auth-info"><div class="ir"><span class="k">새 비밀번호</span><input class="ir-input" id="idpwNew" type="password" maxlength="8" placeholder="영문+숫자 5~8자리" autocomplete="off"></div><div class="ir"><span class="k">비밀번호 확인</span><input class="ir-input" id="idpwNew2" type="password" maxlength="8" placeholder="한 번 더 입력" autocomplete="off"></div></div></div><div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-idpwresetdone>재설정</div></div>`;
    const title45 = reset ? '새 ID 비밀번호를<br>설정해요' : '본인 확인이<br>완료됐어요';
    const desc45 = reset ? '새로 사용할 ID 비밀번호를 입력해 주세요.' : '계좌 정보를 인증하면 ID 비밀번호를 재설정할 수 있어요.';
    return `<div class="iodresult-screen v45-authpage">${v45IdpwTop(reset?2:1)}<div class="iod-v45-body"><div class="toss-dhead"><div class="td-title">${title45}</div><div class="td-desc">${desc45}</div></div>${reset?resetBody:acctBody}</div></div>`;
  }
  const title = '본인 확인이 완료되었어요';
  const desc = reset ? '새로 사용할 ID 비밀번호를 입력해 주세요.' : '계좌 정보를 인증하면 ID 비밀번호를 재설정할 수 있어요.';
  const idCard = `<div class="idpw-idcard"><div class="idpw-idlabel">회원님의 ID</div><div class="idpw-idval">${IDPW_ID}</div></div>`;
  const card = reset
    ? `<div class="auth-info">
        <div class="ir"><span class="k">새 비밀번호</span><input class="ir-input" id="idpwNew" type="password" maxlength="8" placeholder="영문+숫자 5~8자리" autocomplete="off"></div>
        <div class="ir"><span class="k">비밀번호 확인</span><input class="ir-input" id="idpwNew2" type="password" maxlength="8" placeholder="한 번 더 입력" autocomplete="off"></div>
      </div>
      <div class="primary-btn" data-idpwresetdone>재설정</div>`
    : `<div class="auth-info">
        <div class="ir"><span class="k">증권계좌</span><div class="idpw-selwrap"><select class="idpw-sel" id="idpwAcctSel">${IDPW_ACCTS.map(a=>`<option>${a}</option>`).join('')}</select><span class="idpw-selchev">${I.down}</span></div></div>
        <div class="ir"><span class="k">계좌 비밀번호</span><input class="ir-input" id="idpwAcctPw" type="password" inputmode="numeric" maxlength="8" placeholder="숫자 4~8자리" autocomplete="off"></div>
      </div>
      <div class="primary-btn" data-idpwacctdone>확인</div>`;
  return `<div class="auth-wrap iodauth">
    <div class="toss-dhead"><div class="td-title">${title}</div><div class="td-desc">${desc}</div></div>
    ${idCard}
    ${card}
  </div>`;
}
function tossFaqCard(){
  const open = !!s1state.faqOpen;
  const rowHtml = it=>{
    // '입출금이 안돼요'는 실제 업무 플로우(계좌 인증 → 상태 확인 → 결과) 진입, 나머지는 시연용 안내
    const act = it.t==='입출금이 안돼요' ? `data-iodstart`
              : it.t==='ISA 가입서류를 내고 싶어요' ? `data-isastart`
              : (it.t==='증명서 발급 현황이 궁금해요' || it.t==='서류 발급현황이 궁금해요') ? `data-certstart`
              : it.t==='비밀번호를 재설정하고 싶어요' ? `data-pwreset`
              : `data-flash="'${it.t}' 도움말 화면으로 이동합니다. (시연용)"`;
    return `<div class="tf-row" ${act}><div class="tf-ic">${it.svg}</div><div class="tf-t">${it.t}</div><div class="tf-arw">${I.chev}</div></div>`;
  };
  const toggleEl = `<div class="tf-toggle ${open?'open':''}">${s1Ver==='v40'?I.plus:I.down}</div>`;
  const titleEl = `<div class="tf-title">혹시 이런 내용이 궁금하신가요?</div>`;
  // v40: [+] 토글을 문구 바로 오른쪽에 붙임(CSS .tf-title flex:none) / v41·v42: 기존대로 [v] 화살표를 우측 끝에
  const head = `<div class="tf-head" data-faqtoggle title="${open?'접기':'더보기'}">${titleEl+toggleEl}</div>`;
  // v41/v42: 기존 구조 유지 (헤더가 회색카드 안, 접힘 시 1개 노출)
  if(s1Ver!=='v40'){
    const shown = open ? V40_FAQ : V40_FAQ.slice(0, 1);
    return `<div class="toss-faq">${head}<div class="tf-list">${shown.map(rowHtml).join('')}</div></div>`;
  }
  // v40: 헤더(문구+더보기)를 회색영역 밖(인사말 아래)으로 분리
  if(open){
    // 더보기: 전체 질문을 회색영역에 목록으로(애니메이션 없음)
    return head + `<div class="toss-faq open"><div class="tf-list">${V40_FAQ_V40.map(rowHtml).join('')}</div></div>`;
  }
  // 접힘: 회색영역=대메뉴 1행 높이, 질문이 아래→위로 자동 슬라이드(티커). 끝에 첫 항목 복제로 무한루프 이음새 제거
  const rows = V40_FAQ_V40.map(rowHtml).join('') + rowHtml(V40_FAQ_V40[0]);
  return head + `<div class="toss-faq"><div class="tf-list tf-ticker">${rows}</div></div>`;
}
/* Ver 4.5 · 홈 인디고 배너 (동영상 레퍼런스: Find the Qualified skilled Professional 배너) */
function v45Banner(){
  const ic = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="5" width="24" height="38" rx="4" fill="rgba(255,255,255,0.2)"/>
    <rect x="16" y="9" width="16" height="25" rx="2" fill="rgba(255,255,255,0.12)"/>
    <path d="M18 14h12M18 19h8M18 24h10" stroke="rgba(255,255,255,0.65)" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="24" cy="39" r="2" fill="rgba(255,255,255,0.6)"/>
  </svg>`;
  return `<div class="v45-banner">
    <div class="v45-bn-body">
      <div class="v45-bn-kicker">키움증권 디지털 ARS</div>
      <div class="v45-bn-title">상담 없이<br>직접 해결해요</div>
      <div class="v45-bn-sub">빠르고 쉬운 셀프 서비스</div>
    </div>
    <div class="v45-bn-ic">${ic}</div>
  </div>`;
}
/* Ver 4.5 · 자가해결 배너 슬라이더 (1장씩 자동 슬라이딩 + 점 인디케이터 + 더보기) */
const SS_ITEMS = [
  {t:'입출금이 안돼요',           sub:'한도제한·출금불가 원인을 즉시 확인해요',   act:'data-iodstart',  img:'assets/glass3.png'},
  {t:'서류 발급현황이 궁금해요',   sub:'신청 서류의 발급 상태를 바로 확인해요',   act:'data-certstart', img:'assets/glass5.png'},
  {t:'ISA 가입서류를 내고 싶어요', sub:'소득확인 서류를 제출하고 가입을 완료해요', act:'data-isastart',  img:'assets/glass4.png'},
  {t:'비밀번호를 모르겠어요',      sub:'계좌 비밀번호를 안전하게 재설정해요',     act:'data-pwreset',   img:'assets/glass2.jpeg'},
];
let ssBannerTimer = null;
const SS_CHEV_R = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;

function v45SsBannerCard(it){
  return `<div class="v45ss-card" ${it.act} role="button">
    <img class="v45ss-img" src="${it.img}" alt="">
    <div class="v45ss-overlay"></div>
    <div class="v45ss-txt">
      <div class="v45ss-nm">${it.t}</div>
      <div class="v45ss-sub">${it.sub}</div>
    </div>
  </div>`;
}

function v45SelfSolve(){
  const slides = SS_ITEMS.map(it => v45SsBannerCard(it)).join('');
  const dots = SS_ITEMS.map((_, i) =>
    `<span class="v45ss-dot${i===0?' on':''}" data-ssdot="${i}"></span>`
  ).join('');
  return `<div class="v45-selfsolve">
    <div class="v45ss-toprow">
      <span class="v45ss-headtxt">혹시 이런 내용이 궁금하신가요?</span>
      <span class="v45ss-more" data-ssmore>더보기</span>
    </div>
    <div class="v45ss-wrap"><div class="v45ss-track" id="ssBannerTrack">${slides}</div></div>
    <div class="v45ss-dots">${dots}</div>
  </div>`;
}

function renderSsMore(){
  const rows = SS_ITEMS.map(it=>
    `<div class="toss-cat v45ss-txtrow" ${it.act}>
      <div class="tc-body"><div class="tc-nm">${it.t}</div><div class="tc-desc">${it.sub}</div></div>
      <div class="tc-arw">${I.chev}</div>
    </div>`
  ).join('');
  return `<div class="v45-ssmore-page">
    <div class="toss-top"><div class="toss-back" data-s1back>${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-list v45ss-txtlist">${rows}</div>
  </div>`;
}

function initSsBanner(){
  clearTimeout(ssBannerTimer);
  const track = document.getElementById('ssBannerTrack');
  if(!track) return;
  const wrap = track.parentElement;
  const cards = [...track.querySelectorAll('.v45ss-card')];
  const n = cards.length;
  if(n < 2) return;
  let cur = 0;
  let slideW = 0;

  function measure(){ slideW = wrap.offsetWidth; cards.forEach(c => { c.style.width = slideW + 'px'; }); }
  function getDots(){ return [...document.querySelectorAll('.v45ss-dot')]; }
  function goTo(idx){
    cur = ((idx % n) + n) % n;
    track.style.transform = `translateX(${-cur * slideW}px)`;
    getDots().forEach((d, i) => d.classList.toggle('on', i === cur));
  }
  measure();
  track.style.transition = 'none';
  goTo(0);
  requestAnimationFrame(() => { track.style.transition = 'transform .45s cubic-bezier(.25,.46,.45,.94)'; });

  let touchX = 0, touchY = 0;
  wrap.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; touchY = e.touches[0].clientY; }, {passive:true});
  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 36){ goTo(dx < 0 ? cur+1 : cur-1); reschedule(); }
  });

  const ssRoot = wrap.closest('.v45-selfsolve');
  if(ssRoot) ssRoot.addEventListener('click', e => {
    const dot = e.target.closest('[data-ssdot]');
    if(dot){ goTo(parseInt(dot.dataset.ssdot)); reschedule(); }
  });

  function tick(){ if(!document.getElementById('ssBannerTrack')) return; goTo(cur+1); reschedule(); }
  function reschedule(){ clearTimeout(ssBannerTimer); ssBannerTimer = setTimeout(tick, 3500); }
  reschedule();
}

function openSsMore(){ s1nav({page:'ssmore', title:'자가해결 메뉴', noHome:true}); }
function banner(){
  return `<div class="banner">
    <div class="big">최대 551<small>만원</small></div>
    <div class="mid">중개형 ISA 혜자 이벤트</div>
    <div class="sub">타사 이전 시 혜택기회 UP!</div>
    <div class="rocket">🚀</div>
  </div>`;
}
function tabbar(active){
  if(isV47()){
    // Ver 4.7 플로팅 FAB: 우하단 [+] 버튼, 클릭 시 메뉴 펼침
    return `<div class="v47-fab" id="v47Fab">
      <div class="v47-fab-menu">
        <div class="v47-fab-item" data-menu>${I.menu}<span>전체메뉴</span></div>
        <div class="v47-fab-item" data-tab="voice">${I.phone}<span>음성ARS</span></div>
        <div class="v47-fab-item" data-tab="chat">${I.chat}<span>챗봇</span></div>
        <div class="v47-fab-item end" data-tab="end">${I.power}<span>서비스종료</span></div>
      </div>
      <button class="v47-fab-btn" data-v47fabtoggle aria-label="메뉴 열기/닫기">
        <span class="v47-fab-ic">${I.plus}</span>
      </button>
    </div>`;
  }
  if(isV45()){
    // Ver 4.5 플로팅 필 네비(tab2.jpg): 흰색 알약 바, 아이콘 3개
    return `<div class="v45-nav-pill">`
      + `<div class="tb v45nav-side" data-tab="home" title="홈">${I.home}</div>`
      + `<div class="tb v45nav-side" data-tab="chat" title="채팅">${I.chat}</div>`
      + `<div class="tb v45nav-side" data-tab="end" title="서비스종료">${I.power}</div>`
      + `</div>`;
  }
  return `<div class="tb" data-tab="voice">${I.phone}<span>음성ARS</span></div>
    <div class="tb" data-tab="chat">${I.chat}<span>챗봇</span></div>
    <div class="tb end" data-tab="end">${I.power}<span>서비스종료</span></div>`;
}

/* 앱 하단 푸터 (간편모드 메뉴 하단 스타일) */
function appFooter(){
  return `<div class="app-foot">
    <img src="assets/kiwoom-logo.png" alt="키움증권">
    <div class="foot-tx">
      고객센터 1544-9000 · 평일 08:00~18:00<br>
      서울특별시 영등포구 여의나루로4길 18 키움금융센터<br>
      ⓒ Kiwoom Securities Co., Ltd. All rights reserved.
    </div>
  </div>`;
}

/* ============================================================
   시안 1 화면 렌더
   ============================================================ */
const s1state = {page:'home', cat:'금융상품', open:-1, open2:-1, title:'', listKey:'', resultKey:'', ivI:-1, ivJ:-1, midOpen:-1, amOpen:-1, amOpen2:-1, amTab:'ars', sarsPath:[], v21Tab:'self', amCat:'self', amTreeOpen:{}, faqOpen:false, priceTab:'hoga', fromFav:false, authNext:'', authMethod:'', acctPw:'', otpSent:false, noBack:false, noHome:false, history:[], v47Cat:null};
// 본인인증 세션 유지 플래그 (메모리 변수 → 새로고침 시 자동 초기화)
let sessionAuthed = false;

/* 화면 이동: 현재 상태를 history에 쌓고 새 화면으로 */
function s1nav(patch){
  closeMenuDrawer();               // 화면 이동 시 전체메뉴 드로어 닫기
  closeConsult();                  // 상담연결 팝업 열려있으면 닫기
  closeMethodSheet();              // 방법 선택 플로팅 열려있으면 닫기
  closeStkSheet();                 // 주식주문 계단식 플로팅 열려있으면 닫기
  s1state.history.push({page:s1state.page, title:s1state.title, listKey:s1state.listKey, resultKey:s1state.resultKey, fromFav:s1state.fromFav, authNext:s1state.authNext, authMethod:s1state.authMethod, otpSent:s1state.otpSent, noBack:s1state.noBack, noHome:s1state.noHome});
  s1state.noBack = false;          // 기본은 뒤로가기 표시, 진입 화면만 patch로 숨김
  s1state.noHome = false;          // 기본은 홈/메뉴 표시, 세부페이지만 patch로 숨김
  Object.assign(s1state, patch);
  renderS1();
}
function s1back(){
  const prev = s1state.history.pop();
  if(prev){ Object.assign(s1state, prev); }
  else { s1state.page='home'; }
  renderS1();
}
/* 본인인증 방법 선택 (레퍼런스: 정부24 인증방법선택 / 디자인: 영웅문 인증센터) */
function authSelect(){
  const iod = isIodFlow();
  const che = isCheAuth();
  let methods = [
    {key:'phone',   ic:'phone',  t:'휴대폰 인증',           d: (iod||che) ? '본인 명의 휴대폰으로 인증해요' : '본인 명의 휴대폰으로 인증'},
    {key:'simple',  ic:'shield', t:'간편(민간인증서) 인증',  d: (iod||che) ? '카카오·네이버·KB 등 간편인증서로 인증해요' : '카카오·네이버·KB 등 민간인증서로 인증'},
    {key:'account', ic:'wallet', t:'계좌번호 인증',          d:'본인 계좌번호·비밀번호로 인증'},
  ];
  if(iod || che) methods = methods.filter(m=>m.key!=='account');   // 계좌번호 찾기(iod)·계좌 조회(che) 단계에서는 계좌번호 인증 제외
  const head = iod ? '계좌번호를 찾아드릴게요<br>본인 인증 방법을 선택해 주세요' : '본인 인증 방법을<br>선택해주세요';
  const selTitle = iod ? '계좌번호 찾기' : (che ? '계좌 조회' : '본인 인증');
  const selDesc  = iod ? '본인 인증 후 계좌번호를 찾아드릴게요'
                : che ? `${cheAuthCtx()?cheAuthCtx()+'을 확인할 ':''}본인 인증 방법을 선택해 주세요`
                : '본인 인증 방법을 선택해 주세요';
  // v40 계열: Ver 4.0 토스 헤딩(타이틀+설명) / 레거시: auth-head
  const heading = isV40()
    ? `<div class="toss-dhead"><div class="td-title">${selTitle}</div><div class="td-desc">${selDesc}</div></div>`
    : `<div class="auth-head">${head}</div>`;
  // Ver 4.5: pill 카드 스타일 인증 선택 (동영상 레퍼런스)
  if(isV45()){
    return `<div class="auth-wrap${che?' cheauth':''}">
      ${heading}
      <div class="v45-auth-list">${methods.map(m=>
        `<div class="v45-auth-pill" data-auth="${m.key}">
          <div class="v45-pill-ic">${I[m.ic]}</div>
          <div class="v45-pill-tx"><div class="v45-pill-nm">${m.t}</div><div class="v45-pill-desc">${m.d}</div></div>
          <div class="v45-pill-arw">${I.chev}</div>
        </div>`
      ).join('')}</div>
    </div>`;
  }
  return `<div class="auth-wrap${che?' cheauth':''}">
    ${heading}
    <div class="auth-list">` + methods.map(m=>
      `<div class="auth-card" data-auth="${m.key}">
        <div class="auth-ic">${I[m.ic]}</div>
        <div class="auth-tx"><div class="at">${m.t}</div><div class="ad">${m.d}</div></div>
        <div class="auth-arw">${I.chev}</div>
      </div>`
    ).join('') + `</div>
  </div>`;
}

/* 인증 방법별 단계 화면 */
function authStep(method){
  if(method==='phone'){
    // 디자인 참고: 키움 디지털ARS '휴대폰 인증하기'
    const rows = [
      ['고객명','홍길동'], ['생년월일','1990년 01월 01일'],
      ['통신사','SKT'], ['휴대폰 번호','010-1234-5678'],
    ];
    const info = `<div class="auth-info">` + rows.map(r=>
        `<div class="ir"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`
      ).join('') + `</div>`;
    const iod = isIodFlow();
    const cheP = isCheAuth();
    const v40 = isV40();   // v40 계열: 토스 톤 + Ver 4.0 헤딩(타이틀+설명)
    const reqNote = v40 ? '위 정보로 휴대폰 인증을 진행할게요.' : '위 정보로 휴대폰 본인인증을 진행합니다.';
    const otpNote = v40 ? '인증번호를 보내드렸어요. 문자를 확인해 주세요.' : '인증번호를 발송했습니다. 문자를 확인해주세요.';
    // 토스: 헤딩이 '인증번호 입력'이라 라벨/placeholder 중복 → 제거
    const otpLabel = v40 ? '' : `<label>인증번호</label>`;
    const otpPh    = v40 ? '' : '인증번호 6자리 입력';
    const tail = s1state.otpSent
      ? `<div class="auth-field" style="margin-top:20px">
          ${otpLabel}
          <div class="otp-row">
            <input class="auth-input" id="otpNo" type="text" inputmode="numeric" maxlength="6" autocomplete="off" placeholder="${otpPh}">
            <span class="otp-timer" id="otpTimer">03:00</span>
          </div>
          <div class="auth-note" style="text-align:center;margin:12px 2px 0;white-space:nowrap;font-size:calc(13px*var(--scale))">${otpNote}</div>
        </div>
        <div class="primary-btn" data-otpdone>인증 완료</div>`
      : `<div class="auth-note">${reqNote}</div>
        <div class="primary-btn" data-otpreq>인증 요청하기</div>`;
    // 인증 요청 후에는 '인증번호 입력' 화면처럼 헤딩 전환 + 고객정보카드 숨김
    const head = (v40 && s1state.otpSent) ? '인증번호 6자리를<br>입력해주세요' : '본인 명의 휴대폰으로<br>인증을 진행해주세요';
    const showInfo = !(v40 && s1state.otpSent);
    // v40 계열: Ver 4.0 토스 헤딩(타이틀+설명) / 레거시: auth-head
    const heading = v40
      ? (s1state.otpSent
          ? `<div class="toss-dhead"><div class="td-title">인증번호 입력</div><div class="td-desc">문자로 받은 인증번호 6자리를 입력해 주세요</div></div>`
          : `<div class="toss-dhead"><div class="td-title">휴대폰 인증</div><div class="td-desc">본인 명의 휴대폰으로 인증해 주세요</div></div>`)
      : `<div class="auth-head">${head}</div>`;
    return `<div class="auth-wrap${cheP?' cheauth':''}">
      ${heading}
      ${showInfo ? info : ''}
      ${tail}
    </div>`;
  }
  if(method==='simple'){
    // 레퍼런스: 정부24 민간인증서 선택 (로고는 컬러 뱃지로 대체)
    const provs = [
      {nm:'카카오톡', s:'talk', bg:'#FEE500', fg:'#3A2A00'},
      {nm:'네이버',   s:'N',    bg:'#03C75A', fg:'#fff'},
      {nm:'토스',     s:'toss', bg:'#0064FF', fg:'#fff'},
      {nm:'KB국민',   s:'KB',   bg:'#FFB300', fg:'#fff'},
      {nm:'통신사PASS',s:'PASS', bg:'#E4002B', fg:'#fff'},
      {nm:'신한인증서',s:'신한', bg:'#0046FF', fg:'#fff'},
      {nm:'NH인증서', s:'NH',   bg:'#19A85B', fg:'#fff'},
      {nm:'페이코',   s:'PAYCO',bg:'#FF1F40', fg:'#fff'},
    ];
    const cheS = isCheAuth();
    const sHeading = isV40()
      ? `<div class="toss-dhead"><div class="td-title">간편 인증</div><div class="td-desc">이용하실 간편인증서를 선택해 주세요</div></div>`
      : `<div class="auth-head">간편인증서를<br>선택해주세요</div>`;
    return `<div class="auth-wrap${cheS?' cheauth':''}">
      ${sHeading}
      <div class="prov-card"><div class="prov-grid">` + provs.map(p=>
        `<div class="prov" data-simplepick="${p.nm}">
          <div class="prov-badge" style="background:${p.bg};color:${p.fg}">${p.s}</div>
          <div class="prov-nm">${p.nm}</div>
        </div>`
      ).join('') + `</div></div>
    </div>`;
  }
  // account: 계좌번호 직접 입력 + 비밀번호(터치 시 플로팅 키패드) — 휴대폰 인증 정보카드 디자인
  const iod = isIodFlow();
  const che = isCheAuth();
  const isa = isIsaFlow();
  const v40 = isV40();
  const cert = isCertFlow();
  const iodOnly = iod && !isa && !cert;   // 순수 '입출금이 안돼요' 흐름만 초보자용 간결 재설계(진행바·note 삭제, 타이틀·플레이스홀더 정리)
  const certV40 = cert && s1Ver==='v40';  // v40 '서류 발급현황' 흐름도 iodauth와 동일한 초보자용 간결 재설계(진행바·note 삭제, 25px 정렬, 회색 findlink)
  const isaV40 = isa && s1Ver==='v40';    // v40 ISA(FAQ 3번)도 1·2번과 동일 iodauth 초보자용 스타일(진행바 삭제·14px·25px·회색 findlink). v41/v42는 기존 유지
  const simple = iodOnly || certV40 || isaV40;   // 간결 UI(iodauth 클래스·플레이스홀더·note삭제·버튼폭·25px) 공통 게이트
  const ctx = cheAuthCtx();
  const head = isa ? '중개형 ISA 신청현황을<br>조회할 계좌를 인증해주세요' : (iod ? '어떤 계좌에서<br>입출금이 안되나요?' : '본인 명의 계좌번호와<br>비밀번호를 입력해주세요');
  const acctDesc = isa ? '중개형 ISA 신청현황을 확인할 계좌번호와 비밀번호를 입력해 주세요'
                 : cert ? (certV40 ? '신청 내역을 확인할 계좌번호와 비밀번호를 입력해 주세요' : '증명서 발급·신청 내역을 확인할 계좌번호와 비밀번호를 입력해 주세요')
                 : iod ? '입출금 상태를 확인할 계좌번호와 비밀번호를 입력해 주세요'
                 : che ? `${ctx?ctx+'을 확인할 ':''}계좌번호와 비밀번호를 입력해 주세요`
                 : '본인 명의 계좌번호와 비밀번호를 입력해 주세요';
  const note = isa ? '인증하신 계좌의 중개형 ISA 가입·이전 신청현황을 확인해요.' : (cert ? '인증하신 계좌의 증명서 발급·신청 내역을 확인해요.' : (iod ? '인증하신 계좌의 상태를 확인해서 안내해 드려요.' : (che ? '본인 명의 계좌만 조회 가능해요.' : '계좌번호와 비밀번호로 본인인증을 진행합니다.')));
  const acctVal = iod ? (s1state.iodAcctNo||'') : (che ? (s1state.cheAcctNo||'') : '');   // 계좌 선택(인증 후 계좌리스트)에서 자동 입력된 계좌번호
  // v40 계열: Ver 4.0 토스 헤딩(타이틀+설명) / 레거시: 기존 auth-head. ISA·증명서는 안내+인증 1페이지 통합 → 전용 타이틀
  const acctTitle = isa ? (isaV40 ? 'ISA 가입 · 이전 신청내역을 확인해볼게요' : 'ISA 가입서류 제출') : (cert ? (certV40 ? '서류 신청내역을 확인해볼게요' : '증명서 발급 현황') : (iodOnly ? '계좌 상태를 확인해볼게요' : '계좌 인증'));
  const heading = v40
    ? `<div class="toss-dhead"><div class="td-title">${acctTitle}</div><div class="td-desc">${acctDesc}</div></div>`
    : `<div class="auth-head">${head}</div>`;
  const findlink = (iod || certV40)
    ? `<div class="iod-findlink" data-iodfind>${(acctVal && acctVal.trim()) ? '계좌비밀번호를 모르겠어요' : '계좌번호를 모르겠어요'} ›</div>`
    : (che ? `<div class="iod-findlink" data-cheacctfind>${(acctVal && acctVal.trim()) ? '계좌비밀번호를 모르겠어요' : '계좌번호를 모르겠어요'} ›</div>` : '');
  const chealt = '';   // 체결·주문내역 흐름을 매체 플로팅 먼저로 되돌림 → 인증화면 '다른 방법' 링크 불필요(매체 시트가 이미 첫 단계)
  // Ver 4.5: 플레이스홀더(숫자 8자리/4~8자리) 대신 우측에 물음표(도움말) 아이콘, findlink는 숨김.
  // 계좌번호 물음표=계좌찾기 플로팅 / 비밀번호 물음표=비밀번호 안내 팝업
  const qSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1.2 1-1.2 1.8"/><path d="M12 16.7h.01"/></svg>`;
  const qmarkAcct = isV45() ? `<div class="ir-qmark" data-acctfind role="button" title="계좌번호 찾기">${qSvg}</div>` : '';
  const qmarkPw   = isV45() ? `<div class="ir-qmark" data-pwhelp role="button" title="비밀번호 안내">${qSvg}</div>` : '';
  return `<div class="auth-wrap${che?' cheauth':''}${simple?' iodauth':''}">
    ${heading}
    <div class="auth-info">
      <div class="ir"><span class="k">계좌번호</span>
        <input class="ir-input" id="acctNo" type="text" inputmode="numeric" autocomplete="off" ${isV45()?'maxlength="9" ':(simple?'maxlength="8" ':'')}placeholder="${isV45()?'':(simple?'숫자 8자리':'계좌번호 입력')}" value="${isV45()&&acctVal?acctVal.replace(/-/g,'').slice(0,8).replace(/(\d{4})(\d{4})/,'$1-$2'):acctVal}">${qmarkAcct}</div>
      <div class="ir"><span class="k">비밀번호</span>
        <div class="ir-input ir-pw" data-pwopen><span id="acctPwDisp" class="acct-dots" data-ph="${isV45()?'':(simple?'숫자 4~8자리':'비밀번호 입력 (4~8자리)')}">${'●'.repeat((s1state.acctPw||'').length)}</span></div>${qmarkPw}</div>
    </div>
    ${simple ? '' : `<div class="auth-note">${note}</div>`}
    <div class="primary-btn${isV45()?' v45-authbtn'+(((acctVal||'').trim() && (s1state.acctPw||'').length)?'':' is-off'):''}" data-authdone>확인</div>
    ${isV45()?'':findlink}
    ${chealt}
  </div>`;
}
/* Ver 4.5 세그먼트 스텝퍼 헤더 — cur: 0=계좌인증 1=계좌조회 2=결과안내. s1state.noBack으로 뒤로가기 제어 */
function v45AuthTop(cur){
  cur = (cur !== undefined && cur !== null) ? cur : 0;
  const steps = iodStepsFor();
  const seg = steps.map((s,i)=>`<span class="v45-step${i<=cur?' on':''}"></span>`).join('');
  const back = s1state.noBack
    ? `<div class="v45-step-spacer" aria-hidden="true"></div>`
    : `<div class="back" data-s1back>${I.back}</div>`;
  return `<div class="page-top iod-top v45-authtop">`
    + back
    + `<div class="v45-stepper" title="${cur+1}/${steps.length} · ${steps[cur]}">${seg}</div>`
    + `<div class="v45-step-spacer" aria-hidden="true"></div>`
    + `</div>`;
}
/* Ver 4.5 계좌인증 '확인' 버튼 활성/비활성 동기화 (계좌번호·계좌비밀번호 모두 입력 시 남색 활성) */
function v45AuthBtnSync(){
  if(!isV45()) return;
  const btn = document.querySelector('.auth-wrap .primary-btn[data-authdone]');
  if(!btn) return;
  const a = document.getElementById('acctNo');
  const acctOk = a && a.value.replace(/-/g,'').trim().length === 8;
  const pwOk = (s1state.acctPw||'').length > 0;
  btn.classList.toggle('is-off', !(acctOk && pwOk));
}

/* 일반주문 주문화면 (디자인 참고: 영웅문 간편모드 계좌조회) */
/* 종목별 시세 (현재가·등락) — 종목 돋보기 검색에서 선택 시 사용 */
const STOCK_INFO = {
  '삼성전자':           {code:'005930', cur:83200,  chg:1200,  pct:1.46,  tick:100},
  'SK하이닉스':         {code:'000660', cur:212500, chg:4500,  pct:2.16,  tick:500},
  '카카오':             {code:'035720', cur:49800,  chg:-700,  pct:-1.39, tick:50},
  '현대차':             {code:'005380', cur:228000, chg:-3000, pct:-1.30, tick:500},
  '네이버':             {code:'035420', cur:198500, chg:1500,  pct:0.76,  tick:500},
  '파이온엑스':         {code:'900250', cur:64200,  chg:2100,  pct:3.38,  tick:100},
  'LK삼양':             {code:'002170', cur:38450,  chg:320,   pct:0.84,  tick:50},
  'SP삼화':             {code:'009470', cur:12680,  chg:-140,  pct:-1.09, tick:10},
  '삼기':               {code:'122350', cur:8910,   chg:210,   pct:2.41,  tick:10},
  '삼기에너지솔루션즈': {code:'460860', cur:156000, chg:3500,  pct:2.30,  tick:500},
  '삼륭물산':           {code:'014970', cur:22300,  chg:-150,  pct:-0.67, tick:50},
  '삼립':               {code:'005610', cur:95400,  chg:900,   pct:0.95,  tick:100},
  '삼목에스폼':         {code:'018310', cur:18920,  chg:80,    pct:0.42,  tick:10},
  '삼미금속':           {code:'023960', cur:6540,   chg:-60,   pct:-0.91, tick:10}
};
function stockInfo(nm){ return STOCK_INFO[nm] || {code:'000000', cur:0, chg:0, pct:0, tick:100}; }
/* 종목 현재가 카드 (현재가 및 호가안내 · 종목 선택 시 종합주가지수 카드 대체) */
function stockQuoteCard(nm){
  const info = stockInfo(nm);
  const up = info.chg >= 0, cls = up?'up':'down', sign = up?'▲':'▼';
  const vol = ((info.cur % 9) + 1) * 100000 + (info.cur % 1000) * 100;
  const tab = s1state.priceTab || 'hoga';
  // 한줄 밑줄형 탭 (참고: 영웅문 간편모드 실시간랭킹 탭)
  const TABS = [{k:'hoga',l:'호가잔량'},{k:'5dan',l:'5단호가'},{k:'sigojo',l:'당일시고저'}];
  const tabRow = `<div class="hoga-tabs">`
    + TABS.map(x=>`<div class="hoga-tab ${x.k===tab?'on':''}" data-pricetab="${x.k}">${x.l}</div>`).join('')
    + `</div>`;
  return `<div class="idx-quote">
    <div class="qname">${nm} <span class="qcode">(${info.code||'000000'})</span></div>
    <div class="qval ${cls}">${won(info.cur)}</div>
    <div class="qchg ${cls}">${sign} ${won(Math.abs(info.chg))} (${info.pct>0?'+':''}${info.pct}%)</div>
    <div class="idx-hl">
      <div class="c"><div class="l">거래량</div><div class="n">${won(vol)}</div></div>
    </div>
    ${tabRow}
    <div class="hoga-panel">${hogaPanel(info, tab)}</div>
    <div class="ord-btnrow">
      <div class="idx-realbtn" data-arsorder="${nm}">일반주문</div>
      <div class="idx-realbtn gray" data-arspop="직원연결">직원연결</div>
    </div>
  </div>`;
}
/* 탭별 호가정보 패널 (호가잔량 / 5단호가 / 당일시고저) — 현재가·호가단위 기반 의사값 */
function hogaPanel(info, tab){
  const tick = info.tick || 100;
  const roundTick = n => Math.round(n/tick)*tick;
  const qty = i => 1000 + ((info.cur + i*131) % 9000);   // 레벨별 안정적 의사 잔량
  if(tab==='5dan'){
    let rows='';
    for(let i=5;i>=1;i--) rows += `<div class="hg-row ask"><span class="hg-lv">매도 ${i}호가</span><span class="hg-p">${won(info.cur+i*tick)}</span><span class="hg-q">${won(qty(i))}</span></div>`;
    for(let i=1;i<=5;i++) rows += `<div class="hg-row bid"><span class="hg-lv">매수 ${i}호가</span><span class="hg-p">${won(Math.max(0,info.cur-i*tick))}</span><span class="hg-q">${won(qty(i+5))}</span></div>`;
    return `<div class="hoga5">${rows}</div>`;
  }
  if(tab==='sigojo'){
    const prev = info.cur - info.chg;
    const hi = roundTick(info.cur + tick*3), lo = roundTick(Math.max(0, info.cur - tick*4)), open = roundTick(prev + tick);
    const upL = roundTick(prev*1.3), dnL = roundTick(prev*0.7);
    return `<div class="idx-hl">
        <div class="c"><div class="l">시가</div><div class="n">${won(open)}</div></div>
        <div class="c"><div class="l">기준가(전일)</div><div class="n">${won(prev)}</div></div>
      </div>
      <div class="idx-hl">
        <div class="c"><div class="l">고가</div><div class="n">${won(hi)}</div></div>
        <div class="c"><div class="l">저가</div><div class="n">${won(lo)}</div></div>
      </div>
      <div class="idx-hl">
        <div class="c"><div class="l">상한가</div><div class="n">${won(upL)}</div></div>
        <div class="c"><div class="l">하한가</div><div class="n">${won(dnL)}</div></div>
      </div>`;
  }
  // 호가잔량 (기본): 1차 매도/매수 호가 + 잔량
  const ask1 = info.cur + tick, bid1 = Math.max(0, info.cur - tick);
  return `<div class="idx-hl">
      <div class="c"><div class="l">1차 매도호가</div><div class="n">${won(ask1)}</div></div>
      <div class="c"><div class="l">매도잔량</div><div class="n">${won(qty(1))}</div></div>
    </div>
    <div class="idx-hl">
      <div class="c"><div class="l">1차 매수호가</div><div class="n">${won(bid1)}</div></div>
      <div class="c"><div class="l">매수잔량</div><div class="n">${won(qty(6))}</div></div>
    </div>`;
}
const ORDER_TYPES = ['지정가','시장가','조건부 지정가','시간외 종가','최유리지정가','최우선지정가',
  '지정가 IOC','시장가 IOC','최유리지정가 IOC','지정가 FOK','시장가 FOK','최유리지정가 FOK'];
// stock: 선택 전 null / price·qty: 선택 후에도 비워둔 채 사용자 입력 / solo: 단일 주문(탭 숨김)
const ORDER_TITLE = {buy:'현금매수', sell:'현금매도', modify:'현금정정', cancel:'현금취소'};
// 주문 버튼 명칭 (주문확인창 '주문구분'에도 동일 표기)
const ORDER_BTN = {buy:'매수 주문', sell:'매도 주문', modify:'정정하기', cancel:'취소하기'};
// 주문 타이틀별 하위 탭 (현재 미사용 — 필요 시 타이틀별 탭 정의)
const ORDER_SUBTABS = {};
const orderState = {side:'buy', type:'지정가', stock:null, price:'', qty:'', solo:false, done:'', tabs:null, tabSel:0};
function resetOrder(){ orderState.side='buy'; orderState.type='지정가'; orderState.stock=null; orderState.price=''; orderState.qty=''; orderState.solo=false; orderState.done=''; orderState.tabs=null; orderState.tabSel=0; }
function orderScreen(){
  const o = orderState;
  const s = o.stock;                                // 선택 전 null
  const TABS = [['buy','매수'],['sell','매도'],['modify','정정'],['cancel','취소']];
  const isList = (o.side==='modify' || o.side==='cancel');   // 정정/취소 → 미체결내역 표기
  // 매수/매도: 종목검색 + 현재가카드 + 주문카드 (신용 주문 페이지와 동일 디자인)
  let body;
  if(isList){
    body = `<div class="ord-body ${o.side}">${orderUnfilledList(o.side)}</div>`;
  } else {
    const stockCell = s
      ? `<span class="stk-nm">${s.nm}</span><span class="stk-x" data-ordstockclear title="종목 지우기">${I.x}</span>`
      : `<span class="ph">${o.side==='buy'?'매수':'매도'}할 종목을 검색하세요</span>`;
    const searchBar = `<div class="stk-find" data-ordsearch>${I.search}${stockCell}</div>`;
    body = searchBar + creditOrderCard(s ? s.nm : null, ORDER_BTN[o.side]);
  }
  // solo(현금매도/매수 등 단일 진입): 계좌번호 + 해당 탭 아래 내용만 표기 (탭바 숨김)
  const tabs2 = o.solo ? '' : `<div class="ord-tabs2">` + TABS.map(([k,lb])=>
      `<div class="ot2 ${k} ${o.side===k?'on':''}" data-ordside="${k}">${lb}</div>`).join('') + `</div>`;
  // 주문 완료 메시지 + 4개 버튼 (신용 주문 페이지와 동일)
  const sideNm = o.side==='buy' ? '매수' : '매도';
  const doneMsg = (!isList && o.done)
    ? `<div class="ord-done ${o.side}" style="margin:2px 0 0">주문번호 ${o.done}번으로 주문이 완료되었습니다.</div>
       <div class="ord-acts row" style="margin:9px 0 0">
         <div class="ord-act" data-orderagain>추가${sideNm}</div>
         <div class="ord-act" data-ordfilled>체결내역</div>
         <div class="ord-act" data-ordacct>다른계좌주문</div>
         <div class="ord-act" data-arspop="직원연결">직원연결</div>
       </div>` : '';
  // 타이틀 아래 한 줄 하위 탭 (예: 신용매도 = 자기융자 매도상환/대출 매도상환/대주 매도)
  const subTabs = (o.tabs && o.tabs.length) ? `<div class="cat-tabs ord-subtabs">` + o.tabs.map((tb,i)=>
      `<div class="cat-tab ${i===o.tabSel?'on':''}" data-credittab="${i}">${tb}</div>`).join('') + `</div>` : '';
  return `${subTabs}<div class="ord-wrap">
    ${tabs2}
    ${body}
    ${doneMsg}
  </div>`;
}
/* 정정/취소 탭: 미체결 주문 목록 */
const UNFILLED = [
  {n:'삼성전자', s:'매수', q:5, p:82000, t:'09:30'},
  {n:'카카오', s:'매도', q:10, p:51000, t:'10:15'},
  {n:'NAVER', s:'매수', q:2, p:198500, t:'11:02'},
];
function orderUnfilledList(side){
  const act = side==='modify' ? '정정' : '취소';
  const msg = side==='modify' ? '정정 화면으로 이동합니다' : '주문을 취소했습니다';
  return `<div class="ord-unlist">` + UNFILLED.map(x=>`
    <div class="unrow">
      <div class="untx">
        <div class="unnm">${x.n} <span class="tag ${x.s==='매수'?'live':'done'}">${x.s}</span></div>
        <div class="und">${x.q}주 · ${won(x.p)}원 · ${x.t} 주문 · 미체결</div>
      </div>
      <span class="mini-btn ${side==='cancel'?'warn':''}" data-flash="${x.n} ${msg}. (시연용)">${act}</span>
    </div>`).join('') + `</div>`;
}

/* 주문가격·수량 직접 입력 (총액 실시간 갱신) */
function orderPriceInput(v){ orderState.price = String(v).replace(/[^0-9]/g,''); orderUpdateTotal(); }
function orderQtyInput(v){ orderState.qty = String(v).replace(/[^0-9]/g,''); orderUpdateTotal(); }
function orderUpdateTotal(){
  const el = document.getElementById('ordTotal'); if(!el) return;
  const o = orderState, s = o.stock;
  const isMarket = o.type.startsWith('시장가') || o.type==='시간외 종가';
  const eff = isMarket ? (s ? s.cur : 0) : (parseInt(o.price,10) || 0);
  el.textContent = won(eff * (parseInt(o.qty,10) || 0)) + '원';
}

/* 신용 주문 카드 (현재가 헤더 + 주문유형/가격/수량/총액 + 주문 버튼) — orderState 사용
   매수/매도는 orderState.side, 버튼 라벨은 화면 타이틀(s1state.title) 사용 */
function creditOrderCard(nm, btnLabel){
  const o = orderState;
  const info = nm ? stockInfo(nm) : null;   // 종목 미선택 시에도 주문 카드는 표기
  const isMarket = o.type.startsWith('시장가') || o.type==='시간외 종가';
  const priceNum = parseInt(o.price,10)||0, qtyNum = parseInt(o.qty,10)||0;
  const eff = isMarket ? (info ? info.cur : 0) : priceNum;
  const total = eff * qtyNum;
  const isSell = o.side==='sell';
  const sideCls = isSell ? 'sell' : 'buy';
  const totCls = isSell ? 'txt-down' : 'txt-up';
  const actLabel = btnLabel || s1state.title || (isSell ? '자기융자 매도상환' : '자기융자매수');
  // 현재가 카드: 종목 선택 시에만 표시 / 주문 카드: 항상 표시 (각각 흰색)
  let priceCard = '';
  if(info){
    const up = info.chg>=0, qcls = up?'up':'down', sign = up?'▲':'▼';
    priceCard = `<div class="idx-quote">
      <div class="qname">${nm} <span class="qcode">(${info.code})</span></div>
      <div class="qval ${qcls}">${won(info.cur)}</div>
      <div class="qchg ${qcls}">${sign} ${won(Math.abs(info.chg))} (${info.pct>0?'+':''}${info.pct}%)</div>
    </div>`;
  }
  const orderCard = `<div class="idx-quote ${sideCls}">
    <div class="ord-fields">
      <div class="ord-field">
        <div class="ofl">주문유형</div>
        <div class="ortsel" data-ordtypesel>${o.type} ${I.down}</div>
      </div>
      <div class="ord-field">
        <div class="ofl">주문가격</div>
        ${isMarket
          ? `<div class="ord-inwrap off"><span class="ord-mkt">시장가</span></div>`
          : `<div class="ord-inwrap"><input class="ord-input" type="text" inputmode="numeric" value="${o.price}" placeholder="가격 입력" oninput="orderPriceInput(this.value)"><span class="ord-unit">원</span></div>`}
      </div>
      <div class="ord-field">
        <div class="ofl">주문수량</div>
        <div class="ord-inwrap"><input class="ord-input" type="text" inputmode="numeric" value="${o.qty}" placeholder="수량 입력" oninput="orderQtyInput(this.value)"><span class="ord-unit">주</span></div>
      </div>
      <div class="ord-sum ${sideCls}">
        <div class="osr tot"><span>주문 총액</span><b id="ordTotal" class="${totCls}">${won(total)}원</b></div>
      </div>
    </div>
    <div class="idx-realbtn ${sideCls}" data-ordsubmit>${actLabel}</div>
  </div>`;
  return priceCard + orderCard;
}

/* 주문 확인 바텀시트 (영웅문 주문확인창 참고) — 매도는 [매도]·매도색 */
function showOrderConfirm(){
  closeOrdConfirm();
  const o = orderState, s = o.stock;
  const M = {buy:'매수', sell:'매도', modify:'정정', cancel:'취소'};
  // 주문구분: 주문 버튼 명칭 그대로 (신용주문은 화면 타이틀, 그 외는 ORDER_BTN)
  const isCredit = (s1state.page==='creditbuy' || s1state.page==='creditsell');
  const btnLabel = isCredit ? (s1state.title || M[o.side]) : (ORDER_BTN[o.side] || M[o.side]);
  const isMarket = o.type.startsWith('시장가') || o.type==='시간외 종가';
  const priceNum = parseInt(o.price,10)||0, qtyNum = parseInt(o.qty,10)||0;
  const eff = isMarket ? (s ? s.cur : 0) : priceNum;
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  el.className = 'ordc-ov'; el.id = 'ordConfirm';
  el.innerHTML = `<div class="ordc-sheet">
    <div class="ordc-title">이렇게 주문할게요</div>
    <div class="ordc-list">
      <div class="ocr"><span class="k">종목명</span><span class="v">${s ? s.nm : '-'}</span></div>
      <div class="ocr"><span class="k">주문구분</span><span class="v ${o.side}">${btnLabel}</span></div>
      <div class="ocr"><span class="k">주문유형</span><span class="v">${o.type}</span></div>
      <div class="ocr"><span class="k">주문수량</span><span class="v">${won(qtyNum)}주</span></div>
      <div class="ocr"><span class="k">주문가격</span><span class="v ${o.side}">${isMarket ? '시장가' : won(priceNum)+'원'}</span></div>
      <div class="ocr"><span class="k">총 주문금액</span><span class="v">${won(eff*qtyNum)}원</span></div>
    </div>
    <div class="ordc-btns">
      <button class="ordc-btn cancel" data-ordcancel>취소</button>
      <button class="ordc-btn ok ${o.side}" data-ordconfirm>확인</button>
    </div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeOrdConfirm(){ const m=document.getElementById('ordConfirm'); if(m){ m.classList.remove('on'); setTimeout(()=>{ if(m.parentNode) m.remove(); },240); } }

/* 계좌 선택 (영웅문 계좌선택 플로팅 참고) */
const ACCOUNTS = [
  {nm:'홍길동', no:'5257-5602', type:'위탁종합'},
  {nm:'홍길동', no:'6320-3614', type:'위탁종합'},
  {nm:'홍길동', no:'6320-7376', type:'중개형ISA'},
];
let selAcct = 0;
let authAcct = {type:ACCOUNTS[0].type, no:ACCOUNTS[0].no};  // 본인인증 시 사용한 계좌(거래내역 표시용)
let pwCtx = '';                                             // 키패드 용도: ''(인증) / 'change'(계좌변경)
let pendingAcct = -1;                                       // 계좌변경 시 비번 확인 대기 중인 계좌
function acctLineHTML(){ const a=ACCOUNTS[selAcct]; return `${a.type} ${a.no} ${I.down}`; }
function openAcctSheet(){
  closeAcctSheet();
  const screen=document.getElementById('screen'); if(!screen) return;
  const el=document.createElement('div'); el.className='tx-ov acct'; el.id='acctSheet';
  if(isV40()){
    // Ver 4.0 · 토스 스타일 바텀시트(consult-sheet 재사용) — 그립+타이틀/설명+계좌 리스트+닫기
    el.innerHTML=`<div class="consult-sheet acct-v40">
      <div class="cs-grip"></div>
      <div class="cs-head"><div class="cs-title">계좌를 선택하세요</div><div class="cs-sub">조회하실 계좌를 선택해 주세요</div></div>
      <div class="cs-list">` + ACCOUNTS.map((a,i)=>`
        <div class="cs-row ${i===selAcct?'on':''}" data-acctpick="${i}">
          <div class="cs-ic">${I.wallet}</div>
          <div class="cs-body"><div class="cs-nm">${a.type}</div><div class="cs-desc">${a.no}</div></div>
          ${i===selAcct?`<div class="acctck">${I.check}</div>`:`<div class="cs-arw">${I.chev}</div>`}
        </div>`).join('') + `</div>
      <div class="cs-cancel" data-acctclose>닫기</div>
    </div>`;
  } else {
    el.innerHTML=`<div class="ps-sheet">
      <div class="ps-top"><div class="ps-title">계좌를 선택하세요</div><div class="ps-x" data-acctclose>✕</div></div>
      <div class="acct-list">` + ACCOUNTS.map((a,i)=>`
        <div class="acct-row ${i===selAcct?'on':''}" data-acctpick="${i}">
          <div class="acct-tx"><div class="acct-nm">${a.nm}</div><div class="acct-no">${a.no} [${a.type}]</div></div>
          ${i===selAcct?`<div class="acct-ck">${I.check}</div>`:''}
        </div>`).join('') + `</div>
    </div>`;
  }
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeAcctSheet(){ const el=document.getElementById('acctSheet'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); },200); } }

/* ===== 증명서 발급 폼 드롭다운 (옵션 선택 바텀시트) ===== */
const CERT_OPTS = {
  certDate:   {t:'기준일자',  opts:['2026.06.29'], cal:true},          // 달력(단일)
  certUse:    {t:'제출 용도', opts:['은행 제출용','관공서 제출용','법원 제출용','회사 제출용','기타']},
  certCopies: {t:'발급 통수', opts:['1통','2통','3통','5통']},
  certPeriod: {t:'조회 기간', opts:['2026.06.01 ~ 2026.06.29'], cal:true}, // 달력(범위)
  certTxType: {t:'거래 구분', opts:['전체 거래','매수/매도','입출금','배당/이자']},
  certFormat: {t:'파일 형식', opts:['PDF','Excel','종이(우편)']},
  certUseDep: {t:'제출 용도', opts:['비자·유학용','은행 제출용','관공서 제출용','기타']},
  certLang:   {t:'발급 언어', opts:['국문','영문','국·영문 병기']},
  certTaxYear:{t:'과세 연도', opts:['2025년','2024년','2023년','2022년']},
  reDate:  {t:'기준일자',  opts:['2026.07.09','2026.07.08','2026.06.30','2026.06.29']},   // 증명서 재발급 전용(단순 리스트)
  reUse:   {t:'발급 용도', opts:['제출용','은행 제출용','관공서 제출용','회사 제출용','기타']},
  reCopies:{t:'발급 부수', opts:['1부','2부','3부','5부']},
};
const certSel = {};   // 선택값 저장(없으면 첫 옵션이 기본값)
function certVal(key){ return certSel[key] || CERT_OPTS[key].opts[0]; }
// 폼 필드 1줄(라벨+선택값+꺾쇠) — data-certsel 로 시트 오픈
function certField(key){
  return `<div class="field"><div class="fl">${CERT_OPTS[key].t}</div>
    <div class="fi" data-certsel="${key}" style="cursor:pointer">${certVal(key)} ${I.down}</div></div>`;
}
function openCertSheet(key){
  closeCertSheet();
  const o = CERT_OPTS[key]; if(!o) return;
  const screen=document.getElementById('screen'); if(!screen) return;
  const cur = certVal(key);
  const el=document.createElement('div'); el.className='tx-ov' + (isV45()?' v45':isV40()?' v40':''); el.id='certSheet'; el.dataset.certkey=key;   // v40: 마젠타 / v45: 인디고
  el.innerHTML=`<div class="ps-sheet">
    <div class="ps-top"><div class="ps-title">${o.t}</div><div class="ps-x" data-certclose>✕</div></div>
    <div class="acct-list">` + o.opts.map(v=>`
      <div class="acct-row ${v===cur?'on':''}" data-certpick="${v}">
        <div class="acct-tx"><div class="acct-nm">${v}</div></div>
        ${v===cur?`<div class="acct-ck">${I.check}</div>`:''}
      </div>`).join('') + `</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeCertSheet(){ const el=document.getElementById('certSheet'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); },200); } }

/* ===== 달력 피커 (기준일자=단일 / 기간=범위 선택) ===== */
const CAL_WK = ['일','월','화','수','목','금','토'];
let calState = {y:2026, m:6, mode:'single', target:'certDate', single:null, start:null, end:null};
const ymd = s => { const m=String(s).match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/); return m? {y:+m[1],m:+m[2],d:+m[3]} : null; };
const ymdF = d => `${d.y}.${pad2(d.m)}.${pad2(d.d)}`;
const ymdCmp = (a,b) => a.y!==b.y ? a.y-b.y : a.m!==b.m ? a.m-b.m : a.d-b.d;
const ymdEq = (a,b) => !!a && !!b && a.y===b.y && a.m===b.m && a.d===b.d;
function calGridHTML(){
  const y=calState.y, m=calState.m;
  const first = new Date(y, m-1, 1).getDay();          // 1일의 요일(0=일)
  const dim   = new Date(y, m, 0).getDate();           // 해당 월 일수
  let cells='';
  for(let i=0;i<first;i++) cells += `<div class="cal-day muted"></div>`;
  for(let d=1; d<=dim; d++){
    const cur={y,m,d};
    let cls='';
    if(calState.mode==='single'){
      if(ymdEq(cur, calState.single)) cls='on';
    } else {
      const s=calState.start, e=calState.end;
      if(ymdEq(cur,s)||ymdEq(cur,e)) cls='on';
      else if(s&&e&&ymdCmp(cur,s)>0&&ymdCmp(cur,e)<0) cls='inrange';
    }
    cells += `<div class="cal-day ${cls}" data-calday="${d}">${d}</div>`;
  }
  return cells;
}
function calSheetHTML(){
  const title = calState.mode==='range' ? '기간을 선택하세요' : '기준일자를 선택하세요';
  const sub = calState.mode==='range'
    ? `${calState.start?ymdF(calState.start):'시작일'} ~ ${calState.end?ymdF(calState.end):'종료일'}`
    : (calState.single?ymdF(calState.single):'날짜 선택');
  return `<div class="ps-sheet">
    <div class="ps-top"><div class="ps-title">${title}</div><div class="ps-x" data-calclose>✕</div></div>
    <div class="cal-head">
      <div class="cal-nav" data-calmove="-1">‹</div>
      <div class="cal-ym">${calState.y}년 ${calState.m}월</div>
      <div class="cal-nav" data-calmove="1">›</div>
    </div>
    <div class="cal-wk">${CAL_WK.map((w,i)=>`<div class="cw ${i===0?'sun':i===6?'sat':''}">${w}</div>`).join('')}</div>
    <div class="cal-grid">${calGridHTML()}</div>
    <div class="cal-range">${sub}</div>
    <div class="primary-btn" data-calapply>선택</div>
  </div>`;
}
function calRefresh(){ const el=document.getElementById('calSheet'); if(el) el.innerHTML=calSheetHTML(); }
function openCalendar(target){
  closeCalendar();
  const screen=document.getElementById('screen'); if(!screen) return;
  calState.target = target;
  if(target==='certPeriod'){
    calState.mode='range';
    const ms = (certVal('certPeriod').match(/(\d{4})\.(\d{1,2})\.(\d{1,2})/g)||[]).map(ymd);
    calState.start = ms[0] || {y:2026,m:6,d:1};
    calState.end   = ms[1] || {y:2026,m:6,d:29};
    calState.y=calState.end.y; calState.m=calState.end.m;
  } else {
    calState.mode='single';
    calState.single = ymd(certVal('certDate')) || {y:2026,m:6,d:29};
    calState.y=calState.single.y; calState.m=calState.single.m;
  }
  const el=document.createElement('div'); el.className='tx-ov'; el.id='calSheet';
  el.innerHTML=calSheetHTML();
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeCalendar(){ const el=document.getElementById('calSheet'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); },200); } }
function calPickDay(d){
  const day={y:calState.y, m:calState.m, d};
  if(calState.mode==='single'){ calState.single=day; }
  else {
    if(!calState.start || calState.end){ calState.start=day; calState.end=null; }   // 새 범위 시작
    else if(ymdCmp(day, calState.start)<0){ calState.end=calState.start; calState.start=day; }
    else calState.end=day;
  }
  calRefresh();
}
function calApply(){
  if(calState.mode==='single'){ certSel.certDate = ymdF(calState.single); }
  else { if(!calState.end) calState.end=calState.start; certSel.certPeriod = `${ymdF(calState.start)} ~ ${ymdF(calState.end)}`; }
  closeCalendar(); renderS1();
}

/* 계좌 비밀번호 플로팅 키패드 (디자인 참고: 영웅문 계좌비밀번호) */
function openPwKeypad(showAcct, ctx){
  pwCtx = ctx || '';
  closePwKeypad();
  const screen = document.getElementById('screen');
  if(!screen) return;
  const digits = ['1','2','3','4','5','6','7','8','9'];
  const el = document.createElement('div');
  el.className = 'kp-ov' + (isV45() ? ' v45' : isV40() ? ' v40' : '');   // Ver 4.0: 마젠타 / Ver 4.5: 인디고
  el.id = 'pwKeypad';
  el.innerHTML = `<div class="kp-sheet">
    <div class="kp-grab"></div>
    <div class="kp-top">
      <div class="kp-title">${pwCtx==='pwreset1'?'증권계좌 비밀번호 확인':'계좌 비밀번호 입력'}</div>
      <div class="kp-toggle"><span>ABC</span><span class="on">123</span></div>
    </div>
    ${showAcct ? `<div class="kp-acct" data-acctsel>${acctLineHTML()}</div>` : ''}
    <div class="kp-pw"><span id="kpDots" class="acct-dots" data-ph="계좌 비밀번호(4자리~8자리)">${'●'.repeat((s1state.acctPw||'').length)}</span></div>
    <div class="keypad">` + digits.map(k=>`<div class="key" data-key="${k}">${k}</div>`).join('')
      + `<div class="key blank"></div><div class="key" data-key="0">0</div><div class="key blank"></div></div>
    <div class="kp-actions">
      <div class="kp-akey back" data-key="back">⌫</div>
      <div class="kp-akey cancel" data-kpcancel>취소</div>
      <div class="kp-akey done" data-kpconfirm>입력완료</div>
    </div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closePwKeypad(){
  const el = document.getElementById('pwKeypad');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 220); }
}
/* 인증서 비밀번호 확인 바텀시트 (v45 전용) */
function openCertPwSheet(){
  closeCertPwSheet(); closePwKeypad();
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  el.className = 'kp-ov' + (isV45()?' v45':isV40()?' v40':'');
  el.id = 'certPwSheet';
  el.innerHTML = `<div class="kp-sheet"><div class="kp-grab"></div><div class="kp-top"><div class="kp-title">인증서 비밀번호 확인</div></div><div class="kp-cert-hint">영문·숫자·특수문자 포함 10자리 이상</div><div class="kp-cert-pw"><input class="kp-cert-input" type="password" id="certPwInput" placeholder="인증서 비밀번호 입력" autocomplete="new-password"></div><div class="kp-actions" style="grid-template-columns:1fr 2fr"><div class="kp-akey cancel" data-certpwcancel>취소</div><div class="kp-akey done" data-certpwconfirm>입력완료</div></div></div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>{ el.classList.add('on'); setTimeout(()=>{ const i=document.getElementById('certPwInput'); if(i) i.focus(); }, 250); });
}
function closeCertPwSheet(){
  const el = document.getElementById('certPwSheet');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 220); }
}

/* ===== 영웅문S# 앱 연결 팝업 (계좌정보 연동 + 해당 화면 바로연동) ===== */
const APP_LINK = {
  cdd: {title:'고객확인(CDD/EDD) 정보 등록·갱신'},
  iodpurpose: {title:'금융거래목적확인서 등록'},
  iodpw: {title:'계좌 비밀번호 재설정'},
  pwresetacct: {title:'증권계좌 비밀번호 재설정', popDesc:'<b>증권계좌 비밀번호</b>는<br>영웅문S#에서 재설정할 수 있어요.'},   // 증권계좌 비밀번호 재설정 안내
  pwhelp: {title:'증권계좌 비밀번호', popTitle:'증권계좌 비밀번호를 잊으셨나요?', popBtn:'영웅문S# 바로가기',
    popDesc:'증권계좌 비밀번호는 <b>숫자 4~8자리</b>예요.<br>비밀번호가 기억나지 않으면 <b>영웅문S#</b> 앱에서<br>다시 설정할 수 있어요.'},   // Ver 4.5 계좌인증 · 비밀번호 물음표 안내
  pwresetcert: {title:'공동인증서 비밀번호 재설정', popDesc:'<b>공동인증서 비밀번호</b>는<br>영웅문S#에서 재설정할 수 있어요.'},   // 공동인증서 비밀번호 재설정 안내
  chefilled: {title:'체결내역 조회'},
  sisequote: {title:'시세 조회'},
  idxinfo: {title:'지수·환율 정보'},
  depinfo: {title:'예수금·주문가능금액 조회'},
  balinfo: {title:'주식·신용·금융상품 잔고조회'},
  txninfo: {title:'거래내역 조회'},
  misuinfo: {title:'미수·반대매매 조회'},
  myacctinfo: {title:'계좌번호·MY계좌 정보확인'},
  songinfo: {title:'송금'}, xferinfo: {title:'계좌 간 자금이체'}, songresinfo: {title:'송금결과확인 조회'},
  accinfo: {title:'사고등록'}, addrinfo: {title:'주소·전화번호 변경'}, acctopeninfo: {title:'비대면 계좌개설'},
  rightsinfo: {title:'유상청약'}, ipoinfo: {title:'공모주 청약'},
  certinfo: {title:'증명서 발급'}, purposedocinfo: {title:'금융거래목적확인서 제출'}, kycinfo: {title:'고객확인(KYC/CDD) 등록'},
  investorinfo: {title:'투자자정보확인서 등록'}, foreigninfo: {title:'해외 양도소득 관련서류'},
  authacctinfo: {title:'인증·계좌 신청'}, shippinginfo: {title:'출고·이관 신청'}, creditinfo: {title:'신용·대출 만기연장'},
  noticeinfo: {title:'공지사항'}, eventinfo: {title:'이벤트 안내'},
  pwmgmtinfo: {title:'비밀번호 관리'}, authidinfo: {title:'인증·ID 관리'}, etcsvcinfo: {title:'부가서비스'},
  acctopenkiwoom: {title:'비대면 계좌개설', app:'키움계좌개설', logo:'assets/kiwoom-favicon.ico',
    popTitle:'키움계좌개설 앱을 열게요', popBtn:'키움계좌개설 열기',
    popDesc:'<b>비대면 계좌개설</b>을 위해<br>키움계좌개설 앱으로 이동할게요.<br><span class="ap-warn">휴대폰 인증과 신분증 촬영이 필요해요.</span>'},
  iodpwopen: {title:'계좌 비밀번호 재설정', app:'키움계좌개설', logo:'assets/kiwoom-favicon.ico',
    popTitle:'키움계좌개설 앱을 열게요', popBtn:'키움계좌개설 열기',
    popDesc:'<b>계좌 비밀번호 재설정</b>을 위해<br>키움계좌개설 앱으로 이동할게요.<br><span class="ap-warn">휴대폰 인증과 신분증 촬영이 필요해요.</span>'},
};
function openAppLink(key){
  closeAppLink();
  const screen = document.getElementById('screen'); if(!screen) return;
  const c = APP_LINK[key] || {title:'요청하신 업무'};
  const v40 = isV40(); const v45 = isV45();   // Ver 4.0: 마젠타 / Ver 4.5: 인디고 스킨
  const el = document.createElement('div');
  el.className = 'app-pop-ov' + (v45 ? ' v45' : v40 ? ' v40' : ''); el.id = 'appPop'; el.dataset.linkTitle = c.title; el.dataset.linkApp = c.app || '영웅문S#';
  // 앱 이름·로고·문구는 APP_LINK 항목에서 오버라이드 가능(기본=영웅문S#)
  const logoSrc = c.logo || 'assets/ys-icon.png';
  const logo  = v40 ? `<div class="ap-logo"><img src="${logoSrc}" alt="${c.app||'영웅문S#'}"></div>` : `<div class="ap-logo">S#</div>`;
  const v40only = (s1Ver==='v40');   // Ver 4.0: 연동·종료·인증정보 안내 삭제, 선택 메뉴 강조 '바로 이동'만, 버튼 '열기'
  const title = c.popTitle || (v40 ? '영웅문S#으로 연결할게요' : '영웅문S#으로 연결');
  const desc  = c.popDesc || (
      v40only ? `<b>${c.title}</b> 화면으로 바로 이동해요.`
    : v40 ? (bigFont
        ? `<b>${c.title}</b> 화면으로 이동해요.<br><span class="ap-warn">${wipeNote('')}</span>`
        : `입력하신 계좌를 영웅문S#에 연동해서<br><b>${c.title}</b> 화면으로 바로 이동해요.<br><span class="ap-warn">${wipeNote('지금 보고 계신 디지털 ARS는 종료돼요.')}</span>`)
    : `계좌정보를 안전하게 연동하고<br><b>${c.title}</b> 화면으로 바로 이동합니다.`);
  const goTxt = c.popBtn || (v40only ? '연결하기' : '영웅문S# 열기');
  // Ver 4.0은 중간 단계 플로우(앱 실행›계좌 연동›화면 이동) 미노출
  const flow = v40 ? '' : `<div class="ap-flow"><span class="ap-step">앱 실행</span><span class="ap-arr">›</span><span class="ap-step">계좌 연동</span><span class="ap-arr">›</span><span class="ap-step">화면 이동</span></div>`;
  el.innerHTML = `<div class="app-pop">
    ${logo}
    <div class="ap-title">${title}</div>
    <div class="ap-desc">${desc}</div>
    ${flow}
    <div class="ap-btns">
      <div class="ap-btn cancel" data-appcancel>취소</div>
      <div class="ap-btn go" data-appgo>${goTxt}</div>
    </div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeAppLink(){
  const el = document.getElementById('appPop');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 220); }
}

/* ===== Ver 4.0 · 상담연결 안내 팝업 (최종메뉴 클릭 시) =====
   헤더=후보1 / 채널 라벨·배지=B 추천 / 설명=세부문구 변형.
   업무에 따라 제공 채널 개수가 달라질 수 있음 — 우선 5종 모두 노출.
   desc가 함수면 상황(계좌 연동 여부 등)에 따라 문구 분기. */
/* 상담팝업 채널 아이콘 — FAQ 배너와 동일한 '컬러 채움형' 스타일(2톤). 투명 배경 위 풀컬러.
   영웅문S#은 실제 앱 아이콘(assets/ys-icon.png) 사용. */
const CS_ICON = {
  // 챗봇: 파란 말풍선 + 흰 점 3개
  chat:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 6A2.5 2.5 0 0 1 6.5 3.5h11A2.5 2.5 0 0 1 20 6v6.5a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.3A1 1 0 0 1 4 17.5V6z" fill="#3b82f6"/><circle cx="9" cy="9.3" r="1.35" fill="#fff"/><circle cx="12.5" cy="9.3" r="1.35" fill="#dbeafe"/><circle cx="16" cy="9.3" r="1.35" fill="#fff"/></svg>',
  // 음성ARS: 초록 수화기 + 연초록 음파
  voice:'<svg viewBox="0 0 24 24" fill="none"><path d="M6.7 11.9c1.4 2.8 3.7 5.1 6.5 6.5l2-2c.3-.3.7-.4 1.1-.3 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1v3.2c0 .6-.4 1-1 1C10.4 22.9 3.1 15.6 3.1 6.7c0-.6.5-1 1-1h3.2c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1.1l-1.9 1.6z" fill="#E6007F"/><path d="M14.6 3.1a6.6 6.6 0 0 1 5.7 5.7" stroke="#F6A9D4" stroke-width="1.8" stroke-linecap="round"/><path d="M14.1 6.4a3.4 3.4 0 0 1 2.8 2.8" stroke="#F6A9D4" stroke-width="1.8" stroke-linecap="round"/></svg>',
  // 전화상담: 주황 헤드셋(헤드밴드+이어컵) + 마이크
  call:'<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 13v-1.5a7.5 7.5 0 0 1 15 0V13" stroke="#14183C" stroke-width="2.2" stroke-linecap="round"/><rect x="3" y="12.3" width="4.4" height="7" rx="2.2" fill="#14183C"/><rect x="16.6" y="12.3" width="4.4" height="7" rx="2.2" fill="#14183C"/><path d="M19 19.3v.4a3.3 3.3 0 0 1-3.3 3.3H13.5" stroke="#14183C" stroke-width="2.1" stroke-linecap="round"/><circle cx="12.6" cy="23" r="1.5" fill="#9aa0c0"/></svg>',
  // 디지털ARS: 노트북+전구 아이콘(PNG)
  web:'<img src="assets/free-icon-computer-15557961.png" alt="디지털 ARS">',
};
const CONSULT_CHANNELS = [
  { k:'hero', nm:'영웅문S#으로 이어보기', ic:'<img src="assets/ys-icon.png" alt="영웅문S#">',
    badges:[{t:'앱 연동',cls:'navy'},{t:'바로 이동',cls:'mag'}],
    // 입력한 계좌정보(세션 인증) 있으면 연동 문구, 없으면 앱 이동 문구
    desc(){ return sessionAuthed
      ? '입력하신 계좌로 연결해 바로 이 화면을 띄워드려요'
      : '앱을 열어 원하시는 업무 화면으로 이동해요'; } },
  { k:'chat', nm:'AI 챗봇에게 물어보기', ic:CS_ICON.chat,
    badges:[{t:'24시간',cls:'navy'},{t:'대기 없음',cls:'mag'}],
    desc:'기다림 없이 지금 바로 물어보세요' },
  { k:'voice', nm:'음성 ARS로 안내받기', ic:CS_ICON.voice,
    badges:[{t:'음성 안내',cls:'gray'}],
    desc:'선택하신 업무에 맞춰 순서대로 알려드려요' },
  { k:'call', nm:'상담원과 통화하기', ic:CS_ICON.call,
    badges:[{t:'담당부서 연결',cls:'gray'},{t:'대기 있음',cls:'warn'}],
    desc:'담당 상담원과 직접 통화해요 · 연결까지 잠시 걸릴 수 있어요' },
  { k:'digital', nm:'디지털 ARS로 처리하기', ic:CS_ICON.web, soon:true,
    badges:[{t:'준비중 · 27년 2월',cls:'gray'}],
    desc:'곧 만나요! 2027년 2월부터 이 화면에서 바로 처리할 수 있어요' },
];
function openConsult(label, opts){
  opts = opts || {};
  const exclude = opts.exclude || [];   // 제외할 채널 키 (예: 직원연결 최종메뉴는 'voice' 제외)
  const prev = document.getElementById('consultPop'); if(prev) prev.remove();   // 기존 팝업 즉시 제거(중복 id 방지)
  const screen = document.getElementById('screen'); if(!screen) return;
  const el = document.createElement('div');
  el.className = 'consult-ov' + (bigFont?' bigfont':''); el.id = 'consultPop'; el.dataset.csLabel = label || '';
  const rows = CONSULT_CHANNELS.filter(c=>!exclude.includes(c.k)).map(c=>{
    const badges = (c.badges||[]).map(b=>`<span class="cs-badge ${b.cls}">${b.t}</span>`).join('');
    const desc = (typeof c.desc==='function') ? c.desc() : (c.desc||'');
    return `<div class="cs-row${c.soon?' soon':''}" data-cschannel="${c.k}">
      <div class="cs-ic">${c.ic}</div>
      <div class="cs-body">
        <div class="cs-nm">${c.nm}</div>
        <div class="cs-badges">${badges}</div>
        <div class="cs-desc">${desc}</div>
      </div>
      <div class="cs-arw">${I.chev}</div>
    </div>`;
  }).join('');
  el.innerHTML = `<div class="consult-sheet">
    <div class="cs-grip"></div>
    <div class="cs-head">
      <div class="cs-title">어떻게 도와드릴까요?</div>
      ${s1Ver==='v40'?'':`<div class="cs-sub">편하신 방법으로 상담을 연결해 드려요</div>`}
      ${label?`<div class="cs-ctx">선택하신 업무 · <b>${label}</b></div>`:''}
    </div>
    <div class="cs-list">${rows}</div>
    <div class="cs-cancel" data-csclose>닫기</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeConsult(){
  const el = document.getElementById('consultPop');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); }
}

/* ===== Ver 4.0 · '입출금이 안돼요' 업무 플로우 =====
   계좌 인증(계좌번호/휴대폰/간편 — 기존 auth 재사용) → 상태 확인(로딩) → 결과(3가지 사유 토글).
   인증 완료 라우팅은 authNext.go==='iodcheck' 로 식별(gotoAuthNext에서 startIodCheck 호출). */
function isIodFlow(){ return (s1state.authNext||{}).go==='iodcheck'; }   // 계좌인증 화면의 '계좌번호 모름' 링크·스텝바 노출 게이트
function isCheAuth(){ return (s1state.authNext||{}).go==='chefilled'; }  // 체결·주문내역 디지털ARS 계좌인증(Ver 4.0 디자인)
function cheAuthCtx(){ const go=(s1state.authNext||{}).go; if(go==='chefilled') return '체결·주문내역'; return ''; }   // 계좌인증 진입 경로별 안내 컨텍스트(향후 경로 추가 가능)
const IOD_STEPS = ['계좌 인증','계좌 조회','결과 안내'];
const ISA_STEPS = ['계좌 인증','신청현황 조회','서류 제출'];   // 중개형 ISA 가입서류 제출 플로우 스텝
const CERT_STEPS = ['계좌 인증','발급현황 조회','재발급'];   // 증명서 발급 현황 플로우 스텝
function isIsaFlow(){ return !!(s1state.authNext||{}).isa; }   // ISA 플로우(계좌인증 재사용, authNext.isa 플래그)
function isCertFlow(){ return !!(s1state.authNext||{}).cert; }   // 증명서 발급 현황 플로우(계좌인증 재사용, authNext.cert 플래그)
function iodStepsFor(){ return isCertFlow() ? CERT_STEPS : (isIsaFlow() ? ISA_STEPS : IOD_STEPS); }   // 공유 계좌인증 화면 스텝 라벨
const IOD_HERO_IC = '<img src="assets/ys-icon.png" alt="영웅문S#">';
/* 결과 화면 하단 버튼 → 클릭 시 방법 선택 플로팅(openMethodSheet) 노출.
   등록형(multi/dormant)=금융거래목적확인서 등록, 한도제한(limit)=한도 제한 해제. */
const IOD_REG_SHEET = { title:'어떻게 등록할까요?', sub:'편하신 방법으로 등록해 드려요', methods:[
  {kind:'app',     ic:IOD_HERO_IC,  nm:'영웅문S#으로 등록하기', desc:'앱을 열어 서류를 등록해요'},
  {kind:'purpose', ic:CS_ICON.web,  nm:'디지털 ARS로 등록하기', desc:'지금 이 화면에서 바로 등록해요'},
]};
/* 주문·체결확인 > 체결내역 조회 → 연결매체 선택 플로팅(영웅문S#/디지털ARS/음성ARS) */
const CHE_SHEET = { title:'체결·주문내역을 어떻게 조회할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'chedigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 체결·주문내역을 확인해요'},
  {kind:'cheapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 체결·주문내역을 바로 확인해요'},
  {kind:'chevoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 체결·주문내역을 확인해요'},
]};
/* 주문·체결확인 > 대체거래소(NXT) 문의 → 매체 플로팅(상담원 연결) */
const ALTEX_SHEET = { title:'대체거래소 문의를 어떻게 도와드릴까요?', sub:'상담원이 대체거래소(NXT) 관련 문의를 안내해 드려요', methods:[
  {kind:'altexcs', ic:CS_ICON.call, nm:'상담원과 통화하기', desc:'상담원이 대체거래소 문의를 도와드려요'},
]};
/* 주문·체결확인 > 시세 조회 → 연결매체 선택 플로팅(영웅문S#/챗봇/음성ARS) */
const SISE_SHEET = { title:'시세를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'siseapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 실시간 시세를 바로 확인해요'},
  {kind:'sisechat',  ic:CS_ICON.chat,  nm:'AI 챗봇에게 물어보기',  desc:'기다림 없이 지금 바로 시세를 물어보세요'},
  {kind:'sisevoice', ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 시세를 확인해요'},
]};
/* 음성 ARS 선택 시 → 시세 유형 6가지 선택 플로팅. 클릭 시 그에 맞는 IVR(시세및시황 하위) 메뉴로 연결 */
const SISE_VOICE_SHEET = { title:'어떤 시세를 안내해 드릴까요?', sub:'음성 ARS로 선택하신 시세를 안내해 드려요', noIcon:true, methods:[
  {kind:'siv0', nm:'국내주식',      desc:'현재가·호가 등 국내주식 시세를 안내해요'},
  {kind:'siv1', nm:'관심종목',      desc:'등록하신 관심종목 현재가를 안내해요'},
  {kind:'siv2', nm:'보유종목',      desc:'보유하신 종목 현재가를 안내해요'},
  {kind:'siv3', nm:'시간외 단일가', desc:'시간외 단일가 시세를 안내해요'},
  {kind:'siv4', nm:'K-OTC',        desc:'비상장주식 K-OTC 현재가를 안내해요'},
  {kind:'siv5', nm:'선물',         desc:'지수·상품 선물 현재가를 안내해요'},
]};
/* 입출금·이체(cat3) — 각 항목 2매체(영웅문S#/음성ARS) 플로팅. data-mediasheet="key"→MEDIA_SHEETS[key] */
const SONG_SHEET = { title:'송금을 어떻게 할까요?', sub:'편하신 방법으로 송금을 도와드려요', methods:[
  {kind:'songapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 송금하기', desc:'앱을 열어 송금을 진행해요'},
  {kind:'songvoice', ic:CS_ICON.voice, nm:'음성 ARS로 송금하기',   desc:'음성 안내에 따라 송금해요'},
]};
const SONG_VOICE_SHEET = { title:'어떤 송금을 도와드릴까요?', sub:'음성 ARS로 선택하신 송금을 안내해 드려요', noIcon:true, methods:[
  {kind:'songv0', nm:'연계은행 송금', desc:'연계은행 계좌로 송금해요'},
  {kind:'songv1', nm:'증권계좌 송금', desc:'증권계좌로 송금해요'},
  {kind:'songv2', nm:'타사 송금',     desc:'타사 계좌로 송금해요'},
]};
const XFER_SHEET = { title:'계좌 간 자금이체를 어떻게 할까요?', sub:'편하신 방법으로 이체를 도와드려요', methods:[
  {kind:'xferapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 이체하기', desc:'앱을 열어 자금이체를 진행해요'},
  {kind:'xfervoice', ic:CS_ICON.voice, nm:'음성 ARS로 이체하기',   desc:'음성 안내에 따라 이체해요'},
]};
const SONGRES_SHEET = { title:'송금결과를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'songresapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 송금 결과를 확인해요'},
  {kind:'songresvoice', ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 확인해요'},
]};
/* 계좌개설·사고(cat4) — 항목 맞춤: 사고등록=음성ARS 중심(긴급) / 비대면 계좌개설=키움계좌개설 앱 중심 */
const KIWOOM_OPEN_IC = '<img src="assets/kiwoom-favicon.ico" alt="키움계좌개설">';
const ACC_SHEET = { title:'사고등록을 어떻게 할까요?', sub:'긴급 시 음성 ARS로 즉시 도와드려요', methods:[
  {kind:'accvoice', ic:CS_ICON.voice, nm:'음성 ARS로 사고등록하기',  desc:'음성 안내에 따라 즉시 정지·등록해요'},
  {kind:'accapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 사고등록하기', desc:'앱을 열어 사고등록을 진행해요'},
  {kind:'acccs',    ic:CS_ICON.call,  nm:'상담원과 통화하기',          desc:'상담원이 사고 접수를 도와드려요', v40only:true},
]};
const ACC_VOICE_SHEET = { title:'어떤 사고를 등록할까요?', sub:'음성 ARS로 선택하신 사고등록을 도와드려요', noIcon:true, methods:[
  {kind:'accv0', nm:'계좌출금 정지 사고등록', desc:'계좌 출금·이체를 즉시 정지해요'},
  {kind:'accv1', nm:'제휴카드 분실 사고등록', desc:'제휴 체크·신용카드 사용을 정지해요'},
  {kind:'accv2', nm:'OTP 사고등록',          desc:'OTP 분실·도난 시 보안매체를 정지해요'},
  {kind:'accv3', nm:'사고등록 내역조회',      desc:'등록된 사고내역을 확인해요'},
]};
const ADDR_SHEET = { title:'주소·전화번호 변경을 어떻게 할까요?', sub:'편하신 방법으로 변경을 도와드려요', methods:[
  {kind:'addrapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 변경하기', desc:'앱을 열어 주소·연락처를 변경해요'},
  {kind:'addrvoice', ic:CS_ICON.voice, nm:'음성 ARS로 변경하기',   desc:'음성 안내에 따라 변경해요'},
]};
const ACCTOPEN_SHEET = { title:'비대면 계좌개설을 어떻게 할까요?', sub:'편하신 방법으로 개설을 도와드려요', methods:[
  {kind:'acctopenapp',    ic:IOD_HERO_IC,    nm:'영웅문S#에서 개설하기',       desc:'앱을 열어 비대면 계좌개설을 진행해요'},
]};
/* 공모주·유상청약(cat5) — 각 항목 3매체(디지털ARS 조회/영웅문S# 청약/음성ARS) 플로팅 */
const RIGHTS_SHEET = { title:'유상청약을 어떻게 할까요?', sub:'편하신 방법으로 청약을 도와드려요', methods:[
  {kind:'rightsdigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 유상청약 권리를 확인해요'},
  {kind:'rightsapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 청약하기', desc:'앱을 열어 유상청약을 진행해요'},
  {kind:'rightsvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 청약하기',   desc:'음성 안내에 따라 청약해요'},
]};
const RIGHTS_VOICE_SHEET = { title:'어떤 유상청약을 도와드릴까요?', sub:'음성 ARS로 선택하신 업무를 안내해 드려요', noIcon:true, methods:[
  {kind:'rightsv0', nm:'당일 유상청약 신청',     desc:'당일 유상증자 청약을 신청해요'},
  {kind:'rightsv1', nm:'당일 유상청약 취소',     desc:'당일 청약을 취소해요'},
  {kind:'rightsv2', nm:'유상청약 예약신청·취소', desc:'예약 청약을 신청·취소해요'},
  {kind:'rightsv3', nm:'유상청약 내역확인',      desc:'청약 신청·배정·환불 내역을 확인해요'},
]};
const IPO_SHEET = { title:'공모주 청약을 어떻게 할까요?', sub:'편하신 방법으로 청약을 도와드려요', methods:[
  {kind:'ipodigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 공모주 일정·경쟁률을 확인해요'},
  {kind:'ipoapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 청약하기', desc:'앱을 열어 공모주 청약을 진행해요'},
  {kind:'ipovoice',   ic:CS_ICON.voice, nm:'음성 ARS로 청약하기',   desc:'음성 안내에 따라 청약해요'},
]};
const IPO_VOICE_SHEET = { title:'어떤 공모주 업무를 도와드릴까요?', sub:'음성 ARS로 선택하신 업무를 안내해 드려요', noIcon:true, methods:[
  {kind:'ipov0', nm:'청약 입력',        desc:'공모주 청약을 신청해요'},
  {kind:'ipov1', nm:'청약 취소',        desc:'공모주 청약을 취소해요'},
  {kind:'ipov2', nm:'청약 경쟁률 조회', desc:'종목별 청약 경쟁률을 안내해요'},
  {kind:'ipov3', nm:'청약 관련 조회',   desc:'청약 신청내역을 안내해요'},
  {kind:'ipov4', nm:'공모주정보 조회',  desc:'공모주 일정·정보를 안내해요'},
]};
/* 서류신청·제출(cat7) — 각 항목 2매체(디지털ARS/영웅문S#) 플로팅. 서류 IVR 노드 없음 → 음성ARS 제외 */
const CERT_SHEET = { title:'증명서를 어떻게 발급할까요?', sub:'편하신 방법으로 발급을 도와드려요', methods:[
  {kind:'certdigital', ic:CS_ICON.web, nm:'디지털 ARS로 발급하기', desc:'지금 이 화면에서 증명서를 발급해요'},
  {kind:'certapp',     ic:IOD_HERO_IC, nm:'영웅문S#으로 발급하기', desc:'앱을 열어 증명서를 발급해요'},
]};
/* 서류 제출 3종(금융거래목적확인서/KYC·CDD/투자자정보확인서/해외양도소득) — 디지털ARS 제출화면(공용 renderDocSubmitV40)/영S# */
const docSheet = (title, verb, kd, ka) => ({ title, sub:`편하신 방법으로 ${verb}을 도와드려요`, methods:[
  {kind:kd, ic:CS_ICON.web, nm:`디지털 ARS로 ${verb}하기`, desc:'지금 이 화면에서 서류를 촬영·첨부해 제출해요'},
  {kind:ka, ic:IOD_HERO_IC, nm:`영웅문S#으로 ${verb}하기`, desc:'앱을 열어 서류를 제출해요'},
]});
const PURPOSE_SHEET  = docSheet('금융거래목적확인서를 어떻게 제출할까요?', '제출', 'purposedig', 'purposeapp');
const KYC_SHEET      = docSheet('고객확인(KYC/CDD)을 어떻게 등록할까요?',    '등록', 'kycdig',     'kycapp');
const INVESTOR_SHEET = docSheet('투자자정보확인서를 어떻게 등록할까요?',      '등록', 'investordig','investorapp');
const FOREIGN_SHEET  = docSheet('해외 양도소득 서류를 어떻게 제출할까요?',    '제출', 'foreigndig', 'foreignapp');
/* 업무신청(cat8) — 성격별 3그룹, 각 3매체(디지털ARS 신청화면/영웅문S#/상담원) 플로팅. 업무신청 IVR 노드 없음 → 음성ARS 대신 상담원 */
const applySheet = (title, kd, ka, kc) => ({ title, sub:'편하신 방법으로 신청을 도와드려요', methods:[
  {kind:kd, ic:CS_ICON.web,  nm:'디지털 ARS로 신청하기', desc:'지금 이 화면에서 업무를 신청해요'},
  {kind:ka, ic:IOD_HERO_IC,  nm:'영웅문S#으로 신청하기', desc:'앱을 열어 업무를 신청해요'},
  {kind:kc, ic:CS_ICON.call, nm:'상담원과 통화하기',      desc:'담당 상담원이 직접 도와드려요'},
]});
const AUTHACCT_SHEET = applySheet('인증·계좌 업무를 어떻게 신청할까요?', 'authacctdig', 'authacctapp', 'authacctcs');
const SHIPPING_SHEET = applySheet('출고·이관 업무를 어떻게 신청할까요?', 'shippingdig', 'shippingapp', 'shippingcs');
const CREDIT_SHEET   = applySheet('만기연장을 어떻게 신청할까요?',        'creditdig',   'creditapp',   'creditcs');
/* 공지·이용안내(cat9) — 항목 맞춤: ARS이용안내=디지털ARS/음성ARS, 공지사항·이벤트=디지털ARS/영S#. 모두 정보 열람(디지털 리스트 화면) */
const ARSGUIDE_SHEET = { title:'ARS 이용안내를 어떻게 볼까요?', sub:'편하신 방법으로 안내를 도와드려요', methods:[
  {kind:'arsguidedigital', ic:CS_ICON.web,   nm:'디지털 ARS로 보기',   desc:'지금 이 화면에서 이용안내를 확인해요'},
  {kind:'arsguidevoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기', desc:'음성 안내에 따라 이용안내를 들어요'},
]};
const ARSGUIDE_VOICE_SHEET = { title:'어떤 안내를 들으실까요?', sub:'음성 ARS로 선택하신 안내를 들려드려요', noIcon:true, methods:[
  {kind:'arsgv0', nm:'ARS 이용시간 안내',            desc:'ARS 서비스 이용시간을 안내해요'},
  {kind:'arsgv1', nm:'ARS 주문서비스 이용신청·비밀번호', desc:'주문서비스 신청·주문비밀번호를 안내해요'},
  {kind:'arsgv2', nm:'ARS 관심종목 안내',            desc:'ARS 관심종목 이용을 안내해요'},
  {kind:'arsgv3', nm:'ARS 이용비용 안내',            desc:'ARS 서비스 이용비용을 안내해요'},
]};
const NOTICE_SHEET = { title:'공지사항을 어떻게 볼까요?', sub:'편하신 방법으로 안내를 도와드려요', methods:[
  {kind:'noticedigital', ic:CS_ICON.web, nm:'디지털 ARS로 보기', desc:'지금 이 화면에서 공지사항을 확인해요'},
  {kind:'noticeapp',     ic:IOD_HERO_IC, nm:'영웅문S#으로 보기', desc:'앱을 열어 공지사항을 확인해요'},
]};
const EVENT_SHEET = { title:'이벤트를 어떻게 볼까요?', sub:'편하신 방법으로 안내를 도와드려요', methods:[
  {kind:'eventdigital', ic:CS_ICON.web, nm:'디지털 ARS로 보기', desc:'지금 이 화면에서 이벤트를 확인해요'},
  {kind:'eventapp',     ic:IOD_HERO_IC, nm:'영웅문S#으로 보기', desc:'앱을 열어 이벤트를 확인해요'},
]};
/* 인증·비밀번호(cat4) — 항목 맞춤: 비밀번호 관리=디지털/영S#/음성ARS, 인증·ID=영S#/상담원, 부가서비스=디지털/영S#/음성ARS */
const PWMGMT_SHEET = { title:'비밀번호를 어떻게 관리할까요?', sub:'편하신 방법으로 관리를 도와드려요', methods:[
  {kind:'pwmgmtdigital', ic:CS_ICON.web,   nm:'디지털 ARS로 관리하기', desc:'지금 이 화면에서 비밀번호를 관리해요'},
  {kind:'pwmgmtapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 관리하기', desc:'앱을 열어 비밀번호를 관리해요'},
  {kind:'pwmgmtvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 관리하기',   desc:'음성 안내에 따라 주문비밀번호를 관리해요'},
]};
const PWMGMT_VOICE_SHEET = { title:'어떤 비밀번호 업무를 도와드릴까요?', sub:'음성 ARS로 선택하신 업무를 안내해 드려요', noIcon:true, methods:[
  {kind:'pwmv0', nm:'주문비밀번호 등록', desc:'ARS 주문비밀번호를 신규 등록해요'},
  {kind:'pwmv1', nm:'주문비밀번호 변경', desc:'ARS 주문비밀번호를 변경해요'},
  {kind:'pwmv2', nm:'ARS 이용신청',     desc:'ARS 주문 이용을 신청해요'},
  {kind:'pwmv3', nm:'ARS 이용해지',     desc:'ARS 주문 이용을 해지해요'},
]};
const AUTHID_SHEET = { title:'인증·ID를 어떻게 관리할까요?', sub:'편하신 방법으로 관리를 도와드려요', methods:[
  {kind:'authidapp', ic:IOD_HERO_IC,  nm:'영웅문S#으로 관리하기', desc:'앱을 열어 간편·공동인증·ID를 관리해요'},
  {kind:'authidcs',  ic:CS_ICON.call, nm:'상담원과 통화하기',       desc:'본인확인 후 상담원이 도와드려요'},
]};
const ETCSVC_SHEET = { title:'부가서비스를 어떻게 이용할까요?', sub:'편하신 방법으로 도와드려요', methods:[
  {kind:'etcsvcdigital', ic:CS_ICON.web,   nm:'디지털 ARS로 관리하기', desc:'지금 이 화면에서 부가서비스를 관리해요'},
  {kind:'etcsvcapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 관리하기', desc:'앱을 열어 부가서비스를 관리해요'},
  {kind:'etcsvcvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 퀵넘버를 관리해요'},
]};
const ETCSVC_VOICE_SHEET = { title:'어떤 퀵넘버 업무를 도와드릴까요?', sub:'음성 ARS로 선택하신 업무를 안내해 드려요', noIcon:true, methods:[
  {kind:'etcv0', nm:'퀵넘버 플러스 조회', desc:'등록된 퀵넘버를 안내해요'},
  {kind:'etcv1', nm:'퀵넘버 플러스 삭제', desc:'등록된 퀵넘버를 삭제해요'},
]};
const MEDIA_SHEETS = { song:SONG_SHEET, xfer:XFER_SHEET, songres:SONGRES_SHEET, accident:ACC_SHEET, addr:ADDR_SHEET, acctopen:ACCTOPEN_SHEET, rights:RIGHTS_SHEET, ipo:IPO_SHEET,
  cert:CERT_SHEET, docpurpose:PURPOSE_SHEET, dockyc:KYC_SHEET, docinvestor:INVESTOR_SHEET, docforeign:FOREIGN_SHEET,
  authacct:AUTHACCT_SHEET, shipping:SHIPPING_SHEET, credit:CREDIT_SHEET,
  arsguide:ARSGUIDE_SHEET, notice:NOTICE_SHEET, event:EVENT_SHEET,
  pwmgmt:PWMGMT_SHEET, authid:AUTHID_SHEET, etcsvc:ETCSVC_SHEET, altex:ALTEX_SHEET };
/* 공지·이용안내 디지털ARS 정보 리스트(renderInfoListV40, s1state.infoKey 기반) */
const INFO_LISTS = {
  arsguide: { title:'ARS 이용안내', desc:'ARS 서비스 이용 안내를 확인해요', sectl:'이용안내', items:[
    {t:'ARS 이용시간 안내',        d:'평일 08:00~22:00 · 주말·공휴일 휴무'},
    {t:'ARS 주문서비스 이용신청',   d:'주문서비스 신청 후 주문비밀번호 등록이 필요해요'},
    {t:'ARS 관심종목 안내',        d:'관심종목 등록 시 빠르게 시세를 확인해요'},
    {t:'ARS 이용비용 안내',        d:'음성 주문 수수료·이용료를 안내해요'},
  ]},
  notice: { title:'공지사항', desc:'서비스 점검·공지사항을 확인해요', sectl:'공지사항', items:[
    {t:'디지털 ARS 서비스 정기점검 안내', d:'2026.06.25 02:00~04:00 · 일시 중단', tag:'점검', tc:'wait'},
    {t:'전자금융거래 이용약관 개정 안내',  d:'2026.07.01 시행',                  tag:'공지', tc:'done'},
    {t:'여름철 고객센터 단축운영 안내',    d:'2026.07.20~08.10',                 tag:'공지', tc:'done'},
  ]},
  event: { title:'이벤트 안내', desc:'진행 중인 이벤트를 확인해요', sectl:'진행 이벤트', items:[
    {t:'중개형 ISA 타사 이전 혜택',  d:'최대 551만원 혜택 · ~2026.08.31',  tag:'진행중', tc:'live'},
    {t:'해외주식 환율우대 이벤트',   d:'환전 수수료 우대 · ~2026.07.31',   tag:'진행중', tc:'live'},
    {t:'신규 고객 수수료 지원',      d:'국내주식 거래 수수료 지원 · 종료',  tag:'종료',   tc:'done'},
  ]},
};
/* 업무신청 디지털ARS 신청화면 — 그룹별 신청 가능 업무 리스트(renderApplyGroupV40, s1state.applyGroup 기반) */
const APPLY_GROUPS = {
  authacct: { title:'인증·계좌 신청', desc:'OTP·출금계좌·실명확인을 신청해요', items:[
    {n:'모바일 OTP 발급',    d:'스마트폰 OTP를 새로 발급해요'},
    {n:'출금계좌 등록',      d:'원화 출금계좌를 등록해요'},
    {n:'외화 출금계좌 등록',  d:'외화 출금계좌를 등록해요'},
    {n:'온라인 실명확인',    d:'비대면으로 실명을 확인해요'},
  ]},
  shipping: { title:'출고·이관 신청', desc:'대체출고·타사이관·해외 입출고를 신청해요', items:[
    {n:'유가증권 대체출고(타명의)', d:'타명의 계좌로 유가증권을 대체출고해요'},
    {n:'타사대체출고',            d:'타 증권사로 주식을 대체출고해요'},
    {n:'해외주식 입·출고',        d:'해외주식을 입고·출고해요'},
    {n:'중개형ISA 이관·이수',     d:'중개형 ISA 계좌를 이관·이수해요'},
  ]},
  credit: { title:'신용·대출 만기연장', desc:'신용융자·대출 만기를 연장해요', items:[
    {n:'신용융자 만기연장', d:'신용융자 상환 만기를 연장해요'},
    {n:'대출 만기연장',     d:'대출 상환 만기를 연장해요'},
  ]},
  // 인증·비밀번호(cat4) 그룹 — 버튼 라벨(btn)·안내문(actMsg)이 '신청'과 다름
  pwmgmt: { title:'비밀번호 관리', desc:'주문·계좌·영업부 비밀번호를 관리해요', sectl:'비밀번호', btn:'설정', actMsg:'설정 화면으로 이동합니다', items:[
    {n:'주문비밀번호 등록·변경',      d:'ARS 주문비밀번호를 등록·변경해요'},
    {n:'계좌 비밀번호 변경',          d:'계좌 비밀번호를 변경해요'},
    {n:'영업부 계좌개설 비밀번호 등록', d:'영업부 개설계좌 비밀번호를 등록해요'},
  ]},
  etcsvc: { title:'부가서비스', desc:'퀵넘버·장기미사용 ID를 관리해요', sectl:'부가서비스', btn:'관리', actMsg:'처리 화면으로 이동합니다', items:[
    {n:'퀵넘버 플러스 조회',    d:'등록된 퀵넘버를 조회해요'},
    {n:'퀵넘버 플러스 삭제',    d:'등록된 퀵넘버를 삭제해요'},
    {n:'장기미사용 ID 제한해제', d:'장기미사용으로 제한된 ID를 해제해요'},
  ]},
};
/* 계좌·잔고조회 > 계좌번호·MY계좌 정보확인 → 연결매체 선택 플로팅(디지털ARS/영웅문S# 2매체) */
const MYACCT_SHEET = { title:'계좌 정보를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'myacctdigital', ic:CS_ICON.web, nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 계좌 정보를 확인해요'},
  {kind:'myacctapp',     ic:IOD_HERO_IC, nm:'영웅문S#으로 조회하기', desc:'앱을 열어 계좌번호·MY계좌 정보를 확인해요'},
]};
/* 계좌·잔고조회 > 미수·반대매매 조회 → 연결매체 선택 플로팅(디지털ARS/영웅문S# 2매체) */
const MISU_SHEET = { title:'미수·반대매매를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'misudigital', ic:CS_ICON.web, nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 미수·반대매매를 확인해요'},
  {kind:'misuapp',     ic:IOD_HERO_IC, nm:'영웅문S#으로 조회하기', desc:'앱을 열어 미수·반대매매를 확인해요'},
]};
/* 계좌·잔고조회 > 거래내역 조회 → 연결매체 선택 플로팅(디지털ARS/영웅문S#/음성ARS) */
const TXN_SHEET = { title:'거래내역을 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'txndigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 거래내역을 확인해요'},
  {kind:'txnapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 거래내역을 확인해요'},
  {kind:'txnvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 확인해요'},
]};
/* 음성 ARS 선택 시 → 거래내역 하위(전체/매매/입출금/입출고), 클릭 시 그에 맞는 IVR 메뉴로 연결 */
const TXN_VOICE_SHEET = { title:'어떤 거래내역을 안내해 드릴까요?', sub:'음성 ARS로 선택하신 거래내역을 안내해 드려요', noIcon:true, methods:[
  {kind:'txnv0', nm:'전체 조회',   desc:'전체 거래내역을 안내해요'},
  {kind:'txnv1', nm:'매매 조회',   desc:'매매 거래내역을 안내해요'},
  {kind:'txnv2', nm:'입출금 조회', desc:'입금·출금 내역을 안내해요'},
  {kind:'txnv3', nm:'입출고 조회', desc:'입고·출고 내역을 안내해요'},
]};
/* 계좌·잔고조회 > 주식·신용·금융상품 잔고조회 → 연결매체 선택 플로팅(디지털ARS/영웅문S#/음성ARS) */
const BAL_SHEET = { title:'잔고를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'baldigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 보유 잔고를 확인해요'},
  {kind:'balapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 주식·신용·금융상품 잔고를 확인해요'},
  {kind:'balvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 확인해요'},
]};
/* 음성 ARS 선택 시 → 통합했던 3개 잔고(현금주식/신용/금융상품), 클릭 시 그에 맞는 IVR 메뉴로 연결 */
const BAL_VOICE_SHEET = { title:'어떤 잔고를 안내해 드릴까요?', sub:'음성 ARS로 선택하신 잔고를 안내해 드려요', noIcon:true, methods:[
  {kind:'balv0', nm:'현금주식 잔고조회',       desc:'현금주식 보유 잔고를 안내해요'},
  {kind:'balv1', nm:'신용 잔고조회',           desc:'신용 보유 잔고를 안내해요'},
  {kind:'balv2', nm:'금융상품 평가·잔고 조회', desc:'금융상품 평가·잔고를 안내해요'},
]};
/* 계좌·잔고조회 > 예수금·주문가능금액 조회 → 연결매체 선택 플로팅(디지털ARS/영웅문S#/음성ARS) */
const DEP_SHEET = { title:'예수금·주문가능금액을 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'depdigital', ic:CS_ICON.web,   nm:'디지털 ARS로 조회하기', desc:'지금 이 화면에서 바로 예수금·잔고를 확인해요'},
  {kind:'depapp',     ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 예수금·주문가능금액을 확인해요'},
  {kind:'depvoice',   ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 확인해요'},
]};
/* 음성 ARS 선택 시 → 통합했던 2개 조회(예수금·추정예탁자산 / 주문가능금액), 클릭 시 그에 맞는 IVR 메뉴로 연결 */
const DEP_VOICE_SHEET = { title:'어떤 조회를 안내해 드릴까요?', sub:'음성 ARS로 선택하신 조회를 안내해 드려요', noIcon:true, methods:[
  {kind:'depv0', nm:'예수금·추정예탁자산 조회', desc:'예수금과 추정 예탁자산을 안내해요'},
  {kind:'depv1', nm:'주문가능 금액조회',        desc:'주문 가능 금액을 안내해요'},
]};
/* 주문·체결확인 > 지수정보·환율 안내 → 연결매체 선택 플로팅(영웅문S#/챗봇/음성ARS) */
const IDX_SHEET = { title:'지수·환율 정보를 어떻게 확인할까요?', sub:'편하신 방법으로 조회를 도와드려요', methods:[
  {kind:'idxapp',   ic:IOD_HERO_IC,   nm:'영웅문S#으로 조회하기', desc:'앱을 열어 지수·환율 정보를 바로 확인해요'},
  {kind:'idxchat',  ic:CS_ICON.chat,  nm:'AI 챗봇에게 물어보기',  desc:'기다림 없이 지금 바로 물어보세요'},
  {kind:'idxvoice', ic:CS_ICON.voice, nm:'음성 ARS로 안내받기',   desc:'음성 안내에 따라 정보를 확인해요'},
]};
/* 음성 ARS 선택 시 → 지수정보/해외지수/환율/주식시황의 소메뉴 리스트(직원연결 제외). 클릭 시 그에 맞는 IVR 메뉴로 연결 */
const IDX_VOICE_SHEET = { title:'어떤 정보를 안내해 드릴까요?', sub:'음성 ARS로 선택하신 정보를 안내해 드려요', noIcon:true, methods:[
  {kind:'idxv0', nm:'종합주가지수',    desc:'코스피 종합지수와 등락 현황을 안내해요'},
  {kind:'idxv1', nm:'코스닥 지수',     desc:'코스닥 지수를 안내해요'},
  {kind:'idxv2', nm:'코스피 200지수',  desc:'코스피200 지수를 안내해요'},
  {kind:'idxv3', nm:'중국 관련지수',   desc:'상해·심천 등 중국 지수를 안내해요'},
  {kind:'idxv4', nm:'홍콩 관련지수',   desc:'항셍 등 홍콩 지수를 안내해요'},
  {kind:'idxv5', nm:'일본 니케이지수', desc:'니케이225 지수를 안내해요'},
  {kind:'idxv6', nm:'미국 관련지수',   desc:'다우·나스닥·S&P 지수를 안내해요'},
  {kind:'idxv7', nm:'환율',           desc:'주요 통화 환율을 안내해요'},
  {kind:'idxv8', nm:'주식 시황',       desc:'당일 주식시장 시황을 안내해요'},
]};
/* 음성 ARS 선택 시 → 통합했던 체결내역 중메뉴(금일 체결·금일 미체결·전일 체결·금일 주문내역·예약주문) 선택 플로팅 */
const CHE_VOICE_SHEET = { title:'어떤 내역을 안내해 드릴까요?', sub:'음성 ARS로 선택하신 메뉴를 안내해 드려요', noIcon:true, methods:[
  {kind:'chev0', nm:'금일 체결내역 조회',    desc:'당일 체결된 주문 내역을 안내해요'},
  {kind:'chev1', nm:'금일 미체결 내역 조회', desc:'당일 미체결 주문 내역을 안내해요'},
  {kind:'chev2', nm:'전일 체결내역 조회',    desc:'전일 체결된 주문 내역을 안내해요'},
  {kind:'chev3', nm:'금일 주문내역 조회',    desc:'당일 접수된 주문 내역을 안내해요'},
  {kind:'chev4', nm:'예약주문 내역조회',     desc:'예약 접수된 주문 내역을 안내해요'},
]};
/* 계좌인증 '계좌비밀번호를 모르겠어요' → 방법 선택 플로팅(상담팝업 스타일) */
const IOD_PW_SHEET = { title:'계좌 비밀번호를 잊으셨나요?', sub:'편하신 방법으로 재설정을 도와드려요', methods:[
  {kind:'pwapp',     ic:IOD_HERO_IC,                                                             nm:'영웅문S#에서 재설정하기',    desc:'앱을 열어 계좌 비밀번호를 다시 설정해요'},
]};
const IOD_RESULTS = {
  multi: {
    tab:'단기 다수계좌', badge:'출금 제한', badgeCls:'stop',
    title:'지금은 출금이 제한된 계좌예요',
    body:'최근 짧은 기간에 여러 계좌를 만드셔서, 안전을 위해 출금이 잠시 막혀 있어요.',
    release:'<b>금융거래목적확인서</b>를 등록하시면 바로 풀려요.',
    btn:'금융거래목적확인서 등록하기', sheet: IOD_REG_SHEET,
  },
  dormant: {
    tab:'장기 미사용', badge:'거래중지 · 출금 제한', badgeCls:'stop',
    title:'오래 쉬어서 거래가 중지된 계좌예요',
    body:'안전을 위해 출금이 제한돼 있어요.',
    release:'<b>금융거래목적확인서</b>를 등록하시면 즉시 해제돼요.',
    btn:'금융거래목적확인서 등록하기', sheet: IOD_REG_SHEET,
  },
  limit: {
    tab:'한도 제한', badge:'한도 제한', badgeCls:'warn',
    title:'출금한도가 제한된 계좌예요',
    body:'지금은 하루 <b>100만 원까지</b> 출금할 수 있어요.',
    release:'한도를 풀려면 추가 서류 확인이 필요해요.',
    btn:'한도 제한 해제하기',
    sheet:{ title:'어떻게 해제할까요?', sub:'편하신 방법으로 해제해 드려요', methods:[
      {kind:'app',     ic:IOD_HERO_IC,  nm:'영웅문S#에서 해제하기', desc:'앱에서 한도 제한을 해제해요'},
      {kind:'consult', ic:CS_ICON.call, nm:'상담원 연결',        desc:'담당 상담원과 연결해 드려요'},
    ]},
  },
  idcard: {
    tab:'신분증 미확인', badge:'진위확인 필요', badgeCls:'warn',
    title:'신분증 진위확인이 되지않은 계좌예요',
    body:'등록된 신분증의 진위확인이 완료되지 않아 거래가 제한돼 있어요.',
    release:'<b>신분증 진위확인</b>을 완료하시면 바로 풀려요.',
    btn:'신분증 진위확인하기',
    sheet:{ title:'어떻게 확인할까요?', sub:'편하신 방법으로 진위확인을 도와드려요', methods:[
      {kind:'app',      ic:IOD_HERO_IC,  nm:'영웅문S#에서 확인하기', desc:'앱을 열어 신분증 진위확인을 진행해요'},
      {kind:'idcardcs', ic:CS_ICON.call, nm:'상담원과 통화하기',     desc:'상담원이 진위확인을 도와드려요'},
    ]},
    // Ver 4.0 전용 오버라이드 (v41/v42는 위 필드 사용)
    titleV40:'신분증 진위확인이 필요한 계좌에요',
    bodyV40:'등록된 신분증의 진위확인이 완료되지 않아 거래가 제한돼있어요.',
    releaseV40:'신분증 진위확인을 위해 재요청 URL을 통해 신분증을 재접수 해주세요.',
    btnV40:'신분증 재요청 URL 받기',
    infoBadge:{ title:'왜 신분증 진위확인이 되지 않았나요?', points:[
      '접수한 신분증이 흐리거나 어두워 식별이 불가할 경우 진위확인이 불가해요',
      '신분증 재요청 안내문자가 이미 발송되었으나 놓쳤을 수 있어요',
      '정상 처리 시 알림톡으로 안내되고 있으니 신분증 재요청 URL을 통해 접수해주세요',
    ]},
  },
};
function startIodCheck(){
  // 인증 완료 → 상태 확인(로딩) → 1.8초 후 결과. 로딩/결과에서 뒤로가기는 홈으로.
  s1state.iodResult = 'idcard';   // 결과안내 첫 화면 = 신분증 진위확인(새로고침 시 다른 사유로 순환)
  s1nav({page:'iodcheck', title:'계좌 조회', noBack:true, noHome:true, fromFav:false});
  s1state.history = [];
  setTimeout(()=>{
    if(s1state.page!=='iodcheck') return;   // 사용자가 이탈했으면 중단
    s1state.page='iodresult'; s1state.title='계좌 상태';
    s1state.noBack=false; s1state.noHome=true;
    renderS1();
  }, 5000);   // 계좌 조회 상태 5초 유지
}
function renderIodChecking(){
  if(isV45()) return `<div class="iodload-screen v45-authpage">
    ${v45AuthTop(1)}
    <div class="iodload-body v45-iodload-body">
      <div class="toss-dhead"><div class="td-title">계좌 상태를 확인하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
      <div class="v45-scan-anim">
        <div class="v45-dot-spinner"><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div></div>
      </div>
    </div>
  </div>`;
  return `<div class="iodload-screen">
    ${pageTop(s1state.title||'계좌 조회', true)}
    <div class="iodload-body">
      <div class="toss-dhead"><div class="td-title">계좌 상태를 확인하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
      <div class="iodload-icon"><div class="iod-spinwrap"><div class="iod-spinner"></div><div class="iod-scan">${I.search||''}</div></div></div>
    </div>
  </div>`;
}
function renderIodResult(){
  const key = IOD_RESULTS[s1state.iodResult] ? s1state.iodResult : 'multi';
  const r = IOD_RESULTS[key];
  // Ver 4.0: 진행바 없음 / 타이틀=제한사유(클릭 시 순환) / 설명글=본문+해결방법 합침 / 버튼 / 데모설명은 화면 맨 아래
  if(s1Ver==='v40'){
    const cyc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>';
    const title = r.titleV40 || r.title;
    const body  = r.bodyV40 || r.body;
    const release = r.releaseV40 || r.release;
    const btnTxt = r.btnV40 || r.btn;
    const desc = `${body.replace(/,\s*/g, ',<br>')}<br>${release}`;   // 본문 쉼표에서 줄바꿈 + 해결방법은 새 줄
    const badge = r.infoBadge ? `<div class="iodres-badge" data-idbadge><span class="ib-q">?</span>왜 진위확인이 되지 않았나요?</div>` : '';
    const btnAttr = r.infoBadge ? 'data-idurl' : 'data-iodmethods';   // idcard: 재요청 URL 받기(안내톡 발송) / 그 외: 방법 선택 플로팅
    return `<div class="iodresult-screen">
      ${pageTop(s1state.title||'계좌 상태', true, `<div class="isa-refresh" data-iodcycle title="다른 사유 보기">${cyc}</div>`)}
      <div class="iodresult-body">
        <div class="toss-dhead">
          <div class="td-title">${title}</div>
          <div class="td-desc">${desc}</div>
        </div>
        ${badge}
        <div class="iodresult-btnwrap"><div class="primary-btn" ${btnAttr}>${btnTxt}</div></div>
      </div>
    </div>`;
  }
  const acct = (authAcct && authAcct.no) ? `${authAcct.type||'위탁종합'} ${fmtAcct(authAcct.no)}` : '위탁종합 1234-5678';
  if(isV45()) return `<div class="iodresult-screen v45-iodresult v45-authpage">
    ${v45AuthTop(2)}
    <div class="iod-v45-body">
      <div class="toss-dhead">
        <div class="td-title">${r.title}</div>
        <div class="td-desc">${r.body}</div>
      </div>
      <div class="iod-v45-card" data-iodcycle>
        <div class="iod-v45-acct">${acct}</div>
        <span class="iod-badge ${r.badgeCls}">${r.badge}</span>
        <div class="iod-release">${r.release}</div>
      </div>
      <div class="iod-v45-actions">
        <div class="primary-btn v45-iod-btn" data-iodmethods>${r.btn}</div>
      </div>
      <div class="iod-note">※ 데모 화면이에요. 위 카드를 탭하면 다른 사유를 볼 수 있어요.</div>
    </div>
  </div>`;
  const actBtns = `<div class="primary-btn" data-iodmethods>${r.btn}</div>`;
  return pageTop(s1state.title||'계좌 상태', true)
    + untactSteps(IOD_STEPS, 2)
    + `<div class="iod-card" data-iodcycle>
        <div class="iod-acct">${acct}</div>
        <span class="iod-badge ${r.badgeCls}">${r.badge}</span>
        <div class="iod-title">${r.title}</div>
        <div class="iod-body">${r.body}</div>
        <div class="iod-release">${r.release}</div>
      </div>`
    + `<div class="iod-actions">${actBtns}</div>`
    + `<div class="iod-note">※ 데모 화면이에요. 위 카드를 탭하면 다른 사유(계좌 상태)를 볼 수 있어요.</div>`;
}

/* ===== 중개형 ISA 서민형 가입서류 제출 플로우 (Ver 4.0) =====
   FAQ 진입 → 계좌인증(안내+인증 1페이지 통합, 타이틀 'ISA 가입서류 제출'·버튼 '계좌 인증하고 조회하기') → 조회 로딩 → 신청현황 → 제출방법 선택 → 서류제출/발급번호 입력 */
const ISA_TABS = [['new','신규가입'],['transfer','계좌이전'],['renew','만기연장']];
/* 1) 신청현황 조회 로딩 */
function renderIsaChecking(){
  if(isV45()) return `<div class="iodload-screen v45-authpage">
    ${v45AuthTop(1)}
    <div class="iodload-body v45-iodload-body">
      <div class="toss-dhead"><div class="td-title">신청현황을 조회하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
      <div class="v45-scan-anim">
        <div class="v45-dot-spinner"><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div></div>
      </div>
    </div>
  </div>`;
  if(s1Ver==='v40'){   // FAQ 로딩 스타일(iodload-screen): 진행바·스피너 없음, 타이틀+'잠시만 기다려 주세요'(6px), 마젠타 GIF
    return `<div class="iodload-screen">
      ${pageTop(s1state.title||'신청현황 조회', true)}
      <div class="iodload-body">
        <div class="toss-dhead"><div class="td-title">신청현황을 조회하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
        <div class="iodload-icon"><div class="iod-spinwrap"><div class="iod-spinner"></div><div class="iod-scan">${I.search||''}</div></div></div>
      </div>
    </div>`;
  }
  return pageTop(s1state.title||'신청현황 조회', true)
    + untactSteps(ISA_STEPS, 1)
    + `<div class="iod-loading">
        <div class="iod-spinwrap"><div class="iod-spinner"></div><div class="iod-scan">${I.search||''}</div></div>
        <div class="iod-load-t">신청현황을 조회하고 있어요</div>
        <div class="iod-load-d">잠시만 기다려 주세요</div>
      </div>`;
}
/* 3) 신청현황 표기 (신규가입 / 계좌이전 / 만기연장) */
const ISA_RESULT_STATES = ['new','transfer','renew','none'];   // 신규가입/계좌이전/만기연장/없음 (상단 새로고침 순환)
function renderIsaResult(){
  const v40 = s1Ver==='v40';
  const kv = rows => `<div class="hv-summary">` + rows.map(r=>`<div class="hv-row"><span>${r[0]}</span><b class="${r[2]||''}">${r[1]}</b></div>`).join('') + `</div>`;
  const newBody = kv([
    ['상품명','중개형ISA'],['신청일자','2026.07.03'],['귀속년도','2026'],['가입유형','서민형'],
    ['신청방법','온라인'],['소득증빙서류','발급번호 확인 필요'],['추가증빙서류','-'],['접수일자','2026.07.03'],['접수상태','적격','up'],
  ]);
  const xferBody = `<div class="hv-secttl">이전신청 정보</div>` + kv([
    ['이전신청일','2026.07.01'],['이전상태','처리중','up'],['이전의사 확인방법','전화통화'],
  ]) + `<div class="hv-secttl">기존 금융회사</div>` + kv([
    ['회사명','기업은행'],['지점명','원동동'],['계좌번호','2581-3216-824011'],
  ]) + `<div class="hv-secttl">당사(키움증권)</div>` + kv([
    ['계좌번호','6320-7376 [중개형ISA]'],['가입상품명','중개형ISA'],
  ]);
  const renewFields = kv([
    ['상품','중개형ISA'],['가입자 분류','서민형'],['현재 만기일자','2026.09.21'],['연장후 만기일자','2029.09.21'],['가입유형','근로소득자 (5천만원 이하)'],
  ]);
  const misuText = '만기연장 신청은 <b>평일 08:00~17:00</b>, <b>만기 3개월 이전~만기일 전 영업일</b>까지 가능해요.';   // 노란 박스(유의사항) 글
  const renewBody = renewFields + `<div class="misu-note">${misuText}</div>`;   // v41/v42: 카드 아래 노란 박스 유지
  if(isV45()){
    const st = ISA_RESULT_STATES.indexOf(s1state.isaTab) >= 0 ? s1state.isaTab : 'new';
    const rfs = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>';
    const kv45 = rows => `<div class="iod-v45-card">` + rows.map(r=>`<div class="v45-kv-row"><span class="v45-kv-k">${r[0]}</span><span class="v45-kv-v${r[2]?' '+r[2]:''}">${r[1]}</span></div>`).join('') + `</div>`;
    const newCard = kv45([
      ['상품명','중개형ISA'],['신청일자','2026.07.03'],['귀속년도','2026'],['가입유형','서민형'],
      ['신청방법','온라인'],['소득증빙서류','발급번호 확인 필요'],['접수상태','적격','up'],
    ]);
    const xferCard = kv45([
      ['이전신청일','2026.07.01'],['이전상태','처리중','up'],['이전의사 확인방법','전화통화'],
      ['이전사','기업은행 원동동'],['기존계좌','2581-3216-824011'],
    ]);
    const renewCard = kv45([
      ['상품','중개형ISA'],['가입자 분류','서민형'],['현재 만기일자','2026.09.21'],['연장후 만기일자','2029.09.21'],
    ]);
    const M45 = {
      new:      {title:'ISA 신규가입 신청내역이 조회되었어요', desc:'접수상태가 적격이면 ISA 상품에 가입할 수 있어요.', body:newCard,   cta:'가입서류 제출하기',   ctaAttr:'data-isamethod'},
      transfer: {title:'ISA 계좌이전 신청내역이 조회되었어요', desc:'타사 → 키움 중개형ISA 계좌이전 신청내역이에요.',  body:xferCard,  cta:'계좌이전 서류 제출하기', ctaAttr:'data-isamethod'},
      renew:    {title:'ISA 만기연장 신청내역이 조회되었어요', desc:'중개형ISA 만기연장 신청내역이에요.',             body:renewCard, cta:'만기연장 서류 제출하기', ctaAttr:'data-isamethod'},
      none:     {title:'ISA 가입·이전 신청내역이 없어요',     desc:'ISA 가입·계좌이전은 영웅문S# 또는 키움증권 홈페이지에서 신청할 수 있어요.', body:'', cta:'상담원 연결', ctaAttr:'data-staffconnect="ISA 가입·계좌이전"'},
    };
    const s = M45[st];
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(1)}
      <div class="iod-v45-body">
        <div class="v45-isa-head">
          <div class="toss-dhead"><div class="td-title">${s.title}</div><div class="td-desc">${s.desc}</div></div>
          <div class="v45-cycle-btn" data-isacycle title="다른 결과 보기">${rfs}</div>
        </div>
        ${s.body}
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" ${s.ctaAttr}>${s.cta}</div></div>
        <div class="iod-note">※ 데모 화면이에요. 새로고침 버튼으로 다른 상태를 확인해요.</div>
      </div>
    </div>`;
  }
  if(v40){
    // 4상태(신규가입/계좌이전/만기연장/없음) — 상단 새로고침 아이콘(data-isacycle)으로 순환. 계좌번호·탭 삭제, 결과만 깔끔히 표기
    const st = ISA_RESULT_STATES.indexOf(s1state.isaTab) >= 0 ? s1state.isaTab : 'new';
    const M = {
      new:      {title:'ISA 신규가입 신청내역이 조회되었어요', desc:'접수상태가 <b>적격</b>이면 ISA 상품에 가입할 수 있어요.', body:newBody, cta:'가입서류 제출하기'},
      transfer: {title:'ISA 계좌이전 신청내역이 조회되었어요', desc:'타사 → 키움 중개형ISA 계좌이전 신청내역이에요.', body:xferBody, cta:'계좌이전 서류 제출하기'},
      renew:    {title:'ISA 만기연장 신청내역이 조회되었어요', desc:'중개형ISA 만기연장 신청내역이에요.<br>'+misuText, body:renewFields, cta:'만기연장 서류 제출하기'},
      none:     {title:'ISA 가입 · 이전 신청내역이 없어요', desc:'ISA 가입·계좌이전은 <b>영웅문S#</b> 또는 <b>키움증권 홈페이지 > 계좌개설 > ISA</b>에서 신청할 수 있어요.', body:'', cta:''},
    };
    const s = M[st];
    const rfs = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>';
    return `<div class="fv-wrap certstat-v40">
      <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div><div class="isa-refresh" data-isacycle title="다른 결과 보기">${rfs}</div></div>
      <div class="toss-dhead"><div class="td-title">${s.title}</div><div class="td-desc">${s.desc}</div></div>
      <div class="my-body">${s.body}</div>
      ${s.cta?`<div class="fv-foot"><div class="primary-btn accent" data-isamethod>${s.cta}</div></div>`
             :(st==='none'?`<div class="fv-foot"><div class="primary-btn" data-staffconnect="ISA 가입·계좌이전">상담원 연결</div></div>`:'')}
    </div>`;
  }
  // 비-v40(v41/v42): 기존 탭 기반 유지
  const tab = s1state.isaTab || 'new';
  const acct = (authAcct && authAcct.no) ? `${authAcct.type||'중개형ISA'} ${authAcct.no}` : '중개형ISA 6320-7376';
  const tabBar = `<div class="fv-tabs bal-tabs">` + ISA_TABS.map(([k,l])=>`<div class="fv-tab ${tab===k?'on':''}" data-isatab="${k}">${l}</div>`).join('') + `</div>`;
  const M2 = {
    new:      {desc:'접수상태가 <b>적격</b>이면 ISA 상품에 가입할 수 있어요.', body:newBody, cta:'가입서류 제출하기'},
    transfer: {desc:'타사 → 키움 중개형ISA 계좌이전 신청내역이에요.', body:xferBody, cta:'계좌이전 서류 제출하기'},
    renew:    {desc:'중개형ISA 만기연장 신청내역이에요.', body:renewBody, cta:'만기연장 서류 제출하기'},
  };
  const m = M2[tab] || M2.new;
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div><div class="toss-rlink" data-isareissue>발급번호 재등록</div></div>
    ${untactSteps(ISA_STEPS, 1)}
    <div class="toss-dhead"><div class="td-title">신청현황</div><div class="td-desc">중개형 ISA 신청내역을 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${acct}</span></div>
    ${tabBar}
    <div class="my-body">
      <div class="fv-note">${m.desc}</div>
      ${m.body}
    </div>
    <div class="fv-foot"><div class="primary-btn accent" data-isamethod>${m.cta}</div></div>
  </div>`;
}
/* 4) 가입서류 제출방법 선택 (서류제출 / 온라인 발급번호 입력) */
const ISA_METHOD_SHEET = { title:'가입서류를 어떻게 제출할까요?', sub:'편하신 방법으로 제출을 도와드려요', methods:[
  {kind:'isadoc',   ic:CS_ICON.web,  nm:'서류 제출하기',        desc:'가입서류를 촬영·첨부해 제출해요'},
  {kind:'isaissue', ic:IOD_HERO_IC,  nm:'온라인 발급번호 입력', desc:'발급받은 번호를 입력해 제출해요'},
]};
/* 5) 서류 제출 화면 — 업로드폼 + 심사시간 안내 + 알림톡 안내 + 신청내역 확인 */
function renderIsaSubmit(){
  if(isV45()){
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(2)}
      <div class="iod-v45-body">
        <div class="toss-dhead"><div class="td-title">가입서류 제출</div><div class="td-desc">서민형 가입서류를 촬영하거나 파일로 제출해요</div></div>
        <div class="iod-v45-card v45-doc-card">
          <div class="v45-doc-ic">${I.doc}</div>
          <div class="v45-doc-h">가입서류 제출</div>
          <div class="v45-doc-d">소득확인증명서 등 서민형 가입서류를<br>촬영하거나 파일로 첨부해 제출해요</div>
          <div class="v45-doc-btn" data-flash="가입서류 제출이 접수되었어요. 심사 후 알림톡으로 안내해 드릴게요. (시연용)">서류 촬영·첨부하기</div>
        </div>
        <div class="iod-note">제출 후 심사에 <b>2~3 영업일</b>이 걸릴 수 있어요.<br>심사 반려 또는 완료 시 알림톡으로 안내해 드려요.</div>
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-isahistory>신청내역 확인</div></div>
      </div>
    </div>`;
  }
  const v40 = s1Ver==='v40';   // FAQ 결과안내 스타일: 진행바 삭제 + 타이틀/설명 result 스타일 + 25px(certstat-v40)
  return `<div class="fv-wrap${v40?' certstat-v40':''}">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    ${v40?'':untactSteps(ISA_STEPS, 2)}
    <div class="toss-dhead"><div class="td-title">가입서류 제출</div><div class="td-desc">서민형 가입서류를 촬영하거나 파일로 제출해요</div></div>
    <div class="doc-card">
      <div class="doc-ic">${I.doc}</div>
      <div class="doc-h">가입서류 제출</div>
      <div class="doc-d">소득확인증명서 등 서민형 가입서류를<br>촬영하거나 파일로 첨부해 제출해요</div>
      <div class="doc-btn" data-flash="가입서류 제출이 접수되었어요. 심사 후 알림톡으로 안내해 드릴게요. (시연용)">서류 촬영·첨부하기</div>
    </div>
    <div class="fv-note">제출 후 심사에 <b>2~3 영업일</b>이 걸릴 수 있어요.<br>심사 <b>반려</b> 또는 <b>완료</b> 시 <b>알림톡</b>으로 안내해 드려요.</div>
    <div class="fv-foot"><div class="primary-btn" data-isahistory>신청내역 확인</div></div>
  </div>`;
}
/* 6) 온라인 발급번호 입력 화면 */
function renderIsaIssue(){
  const seg = (id,len)=>`<input class="isa-seg" id="${id}" inputmode="numeric" maxlength="${len}" placeholder="${'0'.repeat(len)}" oninput="isaSegInput(this)">`;
  if(isV45()){
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(2)}
      <div class="iod-v45-body">
        <div class="toss-dhead"><div class="td-title">온라인 발급번호 입력</div><div class="td-desc">홈택스에서 발급받은 소득확인증명서 번호를 입력해요</div></div>
        <div class="iod-v45-card v45-issue-card">
          <div class="v45-issue-label">홈택스 발급번호 (14자리)</div>
          <div class="isa-issue-row v45-issue-row">${seg('isaIssue1',4)}<span class="isa-seg-dash">-</span>${seg('isaIssue2',4)}<span class="isa-seg-dash">-</span>${seg('isaIssue3',3)}<span class="isa-seg-dash">-</span>${seg('isaIssue4',3)}</div>
        </div>
        <div class="iod-note">소득확인증명서(개인종합자산관리계좌 가입용)의 온라인 발급번호 14자리를 입력해 주세요. 확인되면 별도 서류 제출 없이 처리돼요.</div>
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-isaissuedone>발급번호 제출하기</div></div>
      </div>
    </div>`;
  }
  const v40 = s1Ver==='v40';   // FAQ 결과안내 스타일: 진행바 삭제 + 타이틀/설명 result 스타일 + 25px(certstat-v40)
  return `<div class="fv-wrap${v40?' certstat-v40':''}">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    ${v40?'':untactSteps(ISA_STEPS, 2)}
    <div class="toss-dhead"><div class="td-title">온라인 발급번호 입력</div><div class="td-desc">홈택스에서 발급받은 소득확인증명서 번호를 입력해요</div></div>
    <div class="my-body">
      <div class="fv-note">소득확인증명서(개인종합자산관리계좌 가입용)의 <b>온라인 발급번호 14자리</b>를 입력해 주세요.<br>확인되면 별도 서류 제출 없이 처리돼요.</div>
      <div class="hv-secttl">홈택스 발급번호</div>
      <div class="isa-issue-row">${seg('isaIssue1',4)}<span class="isa-seg-dash">-</span>${seg('isaIssue2',4)}<span class="isa-seg-dash">-</span>${seg('isaIssue3',3)}<span class="isa-seg-dash">-</span>${seg('isaIssue4',3)}</div>
      <div class="primary-btn" data-isaissuedone style="margin:2px 25px 14px">발급번호 제출하기</div>
      <div class="hv-secttl">홈택스 증빙서류 발급경로</div>
      <div class="fv-note"><b>PC</b> · 국세청 홈택스 → 민원증명 → 소득확인증명서<br><b>모바일</b> · 손택스 앱 → 국세증명·사업자등록·세금관련 신청/신고 → 즉시발급증명 → 소득확인증명서(개인종합자산관리계좌 가입용)</div>
    </div>
    <div class="fv-foot"><div class="primary-btn" data-isahistory>신청내역 확인</div></div>
  </div>`;
}
/* 발급번호 세그먼트 입력: 숫자만 허용 + 자리수 다 채우면 다음 칸으로 자동 이동 */
function isaSegInput(el){
  el.value = el.value.replace(/\D/g,'').slice(0, el.maxLength);
  if(el.value.length >= el.maxLength){
    const segs = [].slice.call((el.closest('.isa-issue-row')||document).querySelectorAll('.isa-seg'));
    const i = segs.indexOf(el);
    if(i>=0 && i < segs.length-1) segs[i+1].focus();
  }
}
function startIsaCheck(){
  s1state.isaTab = 'new';   // 신청현황 진입 시 신규가입 탭부터
  s1nav({page:'isacheck', title:'신청현황 조회', noBack:true, noHome:true, fromFav:false});
  s1state.history = [];
  setTimeout(()=>{
    if(s1state.page!=='isacheck') return;
    s1state.page='isaresult'; s1state.title='신청현황';
    s1state.noBack=false; s1state.noHome=true;
    renderS1();
  }, 2500);
}

/* ===== 증명서 발급 현황 플로우 (Ver 4.0) =====
   FAQ 진입 → 계좌인증(안내+인증 1페이지 통합, 타이틀 '증명서 발급 현황') → 발급현황 조회 로딩 → 발급현황(재발급 버튼) */
const CERT_STATUS = [
  {n:'잔고증명서',       st:'발급완료', stc:'done', d:'2026.07.05 발급 · 이메일 발송 완료', re:true},
  {n:'거래내역서',       st:'처리중',   stc:'wait', d:'2026.07.08 신청 · 발급 준비 중',     re:false},
  {n:'외화예수금증명서', st:'발급완료', stc:'done', d:'2026.06.30 발급 · 이메일 발송 완료', re:true},
];
function startCertCheck(){
  s1nav({page:'certcheck', title:'발급현황 조회', noBack:true, noHome:true, fromFav:false});
  s1state.history = [];
  setTimeout(()=>{
    if(s1state.page!=='certcheck') return;
    s1state.page='certstatus'; s1state.title='증명서 발급 현황';
    s1state.certHasRecords=true;   // 진입 시 기본 = 조회됨(신청내역 있음)
    s1state.noBack=false; s1state.noHome=true;
    renderS1();
  }, 2500);
}
function renderCertChecking(){
  if(isV45()) return `<div class="iodload-screen v45-authpage">
    ${v45AuthTop(1)}
    <div class="iodload-body v45-iodload-body">
      <div class="toss-dhead"><div class="td-title">서류 신청내역을 확인하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
      <div class="v45-scan-anim">
        <div class="v45-dot-spinner"><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div><div class="v45-ds-dot"></div></div>
      </div>
    </div>
  </div>`;
  // v40: 계좌조회 로딩(iodload-screen)과 동일 디자인 — 진행바 없음·설명글 16px·설명글 아래 좌측 search GIF
  if(s1Ver==='v40'){
    return `<div class="iodload-screen">
      ${pageTop(s1state.title||'발급현황 조회', true)}
      <div class="iodload-body">
        <div class="toss-dhead"><div class="td-title">서류 신청내역을 확인하고 있어요</div><div class="td-desc">잠시만 기다려 주세요</div></div>
        <div class="iodload-icon"><div class="iod-spinwrap"><div class="iod-spinner"></div><div class="iod-scan">${I.search||''}</div></div></div>
      </div>
    </div>`;
  }
  return pageTop(s1state.title||'발급현황 조회', true)
    + untactSteps(CERT_STEPS, 1)
    + `<div class="iod-loading">
        <div class="iod-spinwrap"><div class="iod-spinner"></div><div class="iod-scan">${I.search||''}</div></div>
        <div class="iod-load-t">증명서 발급현황을 조회하고 있어요</div>
        <div class="iod-load-d">잠시만 기다려 주세요</div>
      </div>`;
}
/* 신청내역 표기 — 발급현황 + 재발급 버튼 */
function renderCertStatus(){
  const v40 = s1Ver==='v40';
  const itemHtml = cls => CERT_STATUS.map(x=>`<div class="${cls}">
      <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag ${x.stc}">${x.st}</span></div><div class="fv-sub">${x.d}</div></div>
      ${x.re ? `<div class="fv-issue" data-certreissue="${x.n}">재발급</div>` : ''}
    </div>`).join('');
  if(isV45()){
    const has = s1state.certHasRecords !== false;
    const title = has ? '서류 신청내역이 조회되었어요' : '서류 신청내역이 없어요';
    const desc  = has ? '최근 1개월 내 신청하신 서류 내역이에요.' : '최근 1개월 내 신청하신 서류가 없어요.';
    const items = has ? CERT_STATUS.map(x=>`
      <div class="iod-v45-card v45-cert-item" data-certstatustoggle>
        <div class="v45-ci-head">
          <div class="v45-ci-nm">${x.n}</div>
          <span class="iod-badge ${x.stc}">${x.st}</span>
        </div>
        <div class="v45-ci-date">${x.d}</div>
        ${x.re ? `<div class="v45-ci-foot"><div class="v45-ci-rebtn" data-certreissue="${x.n}">재발급</div></div>` : ''}
      </div>`).join('') : '';
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(1)}
      <div class="iod-v45-body">
        <div class="toss-dhead"><div class="td-title">${title}</div><div class="td-desc">${desc}</div></div>
        ${items}
        ${!has ? `<div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-certapply>서류 발급·신청</div></div>` : ''}
        <div class="iod-note">※ 데모 화면이에요. 카드를 탭하면 결과를 전환해요.</div>
      </div>
    </div>`;
  }
  if(v40){
    // 결과 2종: 조회됨(신청내역 표기) / 없음. 데모 토글(data-certstatustoggle)로 전환. 계좌번호·'발급현황' 타이틀 없음. 각 항목은 개별 회색테두리 카드.
    const has = s1state.certHasRecords !== false;   // 기본 = 조회됨
    const title = has ? '서류 신청내역이 조회되었어요' : '서류 신청내역이 없어요';
    const desc  = has ? '최근 1개월 내 신청하신 서류 내역이에요.<br>발급완료 서류는 <b>재발급</b>으로 다시 받을 수 있어요.<br>처리중 서류는 발급 완료 후 알림톡으로 안내해 드려요.'
                      : '최근 1개월 내 신청하신 서류가 없어요.<br>필요한 서류는 <b>[서류 발급·신청]</b> 메뉴에서 신청할 수 있어요.';
    const body = `<div class="certstat-list">${has ? itemHtml('certstat-item') : ''}</div>`;   // 하단 안내글은 상단 설명글로 합침
    const cyc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>';
    return `<div class="fv-wrap certstat-v40">
      <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div><div class="isa-refresh" data-certstatustoggle title="다른 결과 보기">${cyc}</div></div>
      <div class="toss-dhead"><div class="td-title">${title}</div><div class="td-desc">${desc}</div></div>
      ${body}
      ${has ? '' : `<div class="fv-foot"><div class="primary-btn accent" data-certapply>서류 발급·신청</div></div>`}
    </div>`;
  }
  // 비-v40(v41/v42): 기존 유지
  const acct = (authAcct && authAcct.no) ? `${authAcct.type||'위탁종합'} ${authAcct.no}` : '위탁종합 5257-5602';
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    ${untactSteps(CERT_STEPS, 1)}
    <div class="toss-dhead"><div class="td-title">증명서 발급 현황</div><div class="td-desc">신청하신 증명서의 발급 현황을 확인하고 재발급받아요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${acct}</span></div>
    <div class="hv-secttl">발급 현황 ${CERT_STATUS.length}</div>
    <div class="fv-card"><div class="fv-list">${itemHtml('fv-item')}</div></div>
    <div class="fv-note">발급완료 증명서는 <b>재발급</b>으로 다시 받을 수 있어요.<br>처리중 증명서는 발급 완료 후 알림톡으로 안내해 드려요.</div>
  </div>`;
}
/* 증명서 재발급 상세화면 — 발급 정보 확인 + 재발급 신청 */
function renderCertReissue(){
  const nm = s1state.certName || '증명서';
  const acct = (authAcct && authAcct.no) ? `${authAcct.type||'위탁종합'} ${authAcct.no}` : '위탁종합 5257-5602';
  const D = key=>`<div class="ir"><span class="k">${CERT_OPTS[key].t}</span><span class="v sel" data-certsel="${key}">${certVal(key)} ${I.down}</span></div>`;   // 실제 선택 바텀시트(CERT_OPTS/openCertSheet 재사용)
  if(isV45()){
    const Dv45 = key=>`<div class="v45-ir"><span class="v45-ik">${CERT_OPTS[key].t}</span><span class="v45-iv sel" data-certsel="${key}">${certVal(key)} ${I.down}</span></div>`;
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(2)}
      <div class="iod-v45-body">
        <div class="toss-dhead"><div class="td-title">${nm} 재발급</div><div class="td-desc">발급 조건을 확인하고 재발급받아요</div></div>
        <div class="iod-v45-card">
          <div class="v45-ir"><span class="v45-ik">서류 종류</span><span class="v45-iv">${nm}</span></div>
          ${Dv45('reDate')}
          ${Dv45('reUse')}
          ${Dv45('reCopies')}
          <div class="v45-ir"><span class="v45-ik">수령 방법</span><span class="v45-iv">등록 이메일 발송</span></div>
        </div>
        <div class="iod-note">재발급 수수료는 없어요. 등록된 이메일로 즉시 발송돼요.</div>
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-certreissuedone="${nm}">재발급 신청하기</div></div>
      </div>
    </div>`;
  }
  const v40 = s1Ver==='v40';   // v40: 재설계 흐름과 통일 — 진행바 삭제·'증명서'→'서류' 용어·좌우 25px 정렬(certstat-v40 스코프)
  return `<div class="fv-wrap${v40?' certstat-v40':''}">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    ${v40 ? '' : untactSteps(CERT_STEPS, 2)}
    <div class="toss-dhead"><div class="td-title">${nm} 재발급</div><div class="td-desc">발급 조건을 확인하고 재발급받아요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${acct}</span></div>
    <div class="hv-secttl">발급 정보</div>
    <div class="auth-info" style="margin:0 ${v40?25:24}px 14px">
      <div class="ir"><span class="k">${v40?'서류':'증명서'} 종류</span><span class="v">${nm}</span></div>
      ${D('reDate')}
      ${D('reUse')}
      ${D('reCopies')}
      <div class="ir"><span class="k">수령 방법</span><span class="v">등록 이메일 발송</span></div>
    </div>
    <div class="fv-note">재발급 수수료는 없어요. 신청하시면 심사 없이 <b>등록된 이메일</b>로 즉시 발송돼요.</div>
    <div class="fv-foot"><div class="primary-btn accent" data-certreissuedone="${nm}">재발급 신청하기</div></div>
  </div>`;
}
/* 서류 재발급 신청 완료 화면 (v40) — [입출금] 완료화면(iod-done-center) 디자인 재사용: 체크 아이콘·타이틀·설명·확인 버튼 */
function renderCertReissueDone(){
  const nm = s1state.certName || '서류';
  if(isV45()){
    return `<div class="iod-done-center v45-authpage">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">재발급이 완료됐어요</div>
        <div class="iod-done-d">${nm}를 등록된 이메일로<br>보내드렸어요.</div>
      </div>
      <div class="iod-done-btnwrap"><div class="primary-btn v45-iod-btn" data-iodhome>확인</div></div>
    </div>`;
  }
  return `<div class="iod-done-center">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">재발급이 완료됐어요</div>
        <div class="iod-done-d">${nm}를 등록된 이메일로<br>보내드렸어요.<br>메일함을 확인해 주세요.</div>
      </div>
      <div class="iod-done-btnwrap"><div class="primary-btn" data-iodhome>확인</div></div>
    </div>`;
}
/* 결과 화면 버튼 → 방법 선택 플로팅(상담팝업 스타일 재사용: consult-ov/cs-*) */
/* Ver 4.0 매체시트 간결화: 아이콘 제거 + 매체 단어 강조색 + 짧은 설명 (매체 키워드 매칭 시) */
const CS_MEDIA_KW = ['키움계좌개설 앱','디지털 ARS','영웅문S#','AI 챗봇','음성 ARS','상담원'];   // 긴 것 우선(부분일치 방지)
const CS_MEDIA_SHORT = { '디지털 ARS':'이 화면에서 바로', '영웅문S#':'앱에서 바로', '키움계좌개설 앱':'앱에서 바로', 'AI 챗봇':'챗봇에게 바로', '음성 ARS':'음성 안내로', '상담원':'전화로 바로 연결' };
function csMediaKw(nm){ return CS_MEDIA_KW.find(k => nm.indexOf(k) >= 0); }
function openMethodSheet(cfg){
  const prev = document.getElementById('methodPop'); if(prev) prev.remove();   // 기존 시트 즉시 제거(중복 id 방지)
  const screen = document.getElementById('screen'); if(!screen || !cfg) return;
  const v40lite = (s1Ver==='v40');   // Ver 4.0: 간결 스타일(아이콘 없음·매체명 강조·짧은 설명)
  const el = document.createElement('div');
  el.className = 'consult-ov method-ov' + (bigFont?' bigfont':'') + (isV45()?' v45':'') + (v40lite?' v40lite':'') + (cfg.cls?' '+cfg.cls:''); el.id = 'methodPop';
  const noIcon = cfg.noIcon;   // 아이콘 열 없이(텍스트만) 렌더
  let methods = cfg.methods || [];
  if(s1Ver==='v42'){ methods = methods.filter(m => m.ic !== CS_ICON.web); }   // Ver 4.2: 매체 플로팅에서 '디지털 ARS'(CS_ICON.web) 항목 전부 숨김
  if(s1Ver!=='v40'){ methods = methods.filter(m => !m.v40only); }   // v40only 항목(예: 사고신고 시트 상담원 연결)은 Ver 4.0에서만 노출
  if(isV45()){
    // v45 전용 아이콘: 상담원→인디고 헤드셋, 디지털ARS→인디고 모니터, 영웅문S#→브랜드 아이콘 유지
    const V45_IC_HEADSET = `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1A4E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5a9 9 0 0 1 18 0"/><path d="M3 11.5v3.5a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z"/><path d="M21 11.5v3.5a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3z"/></svg>`;
    const V45_IC_MONITOR = `<svg viewBox="0 0 24 24" fill="none" stroke="#1A1A4E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`;
    const v45ic = m => {
      if(noIcon || !m.ic) return '';
      const CALL_KINDS = ['consult','idcardcs','acccs','pwmgmtcs','authidcs','creditcs'];
      if(CALL_KINDS.indexOf(m.kind)>=0) return `<div class="v45-mrow-ic">${V45_IC_HEADSET}</div>`;
      if(m.ic===CS_ICON.web) return `<div class="v45-mrow-ic">${V45_IC_MONITOR}</div>`;
      return `<div class="v45-mrow-ic">${m.ic}</div>`;
    };
    const rows = methods.map(m=>`<div class="v45-mrow" data-iodmethod="${m.kind}" data-mlabel="${m.nm}">
      ${v45ic(m)}
      <div class="v45-mrow-body"><div class="v45-mrow-nm">${m.nm}</div></div>
      <div class="v45-mrow-arw">${I.chev}</div>
    </div>`).join('');
    el.innerHTML = `<div class="consult-sheet v45-msheet">
      <div class="cs-grip"></div>
      <div class="v45-msheet-head"><div class="v45-msh-title">${cfg.title}</div>${cfg.sub?`<div class="v45-msh-sub">${cfg.sub}</div>`:''}</div>
      <div class="v45-msheet-list">${rows}</div>
    </div>`;
  } else {
    const rows = methods.map(m=>{
      if(v40lite){   // 주식주문 시트와 동일한 '제목+설명' 형식(아이콘·강조색 없음·전체 설명, 문구톤 통일)
        return `<div class="cs-row no-ic" data-iodmethod="${m.kind}" data-mlabel="${m.nm}">
          <div class="cs-body"><div class="cs-nm">${m.nm}</div>${m.desc?`<div class="cs-desc">${m.desc}</div>`:''}</div>
          <div class="cs-arw">${I.chev}</div>
        </div>`;
      }
      return `<div class="cs-row${noIcon?' no-ic':''}" data-iodmethod="${m.kind}" data-mlabel="${m.nm}">
        ${noIcon ? '' : `<div class="cs-ic">${m.ic}</div>`}
        <div class="cs-body"><div class="cs-nm">${m.nm}</div><div class="cs-desc">${m.desc}</div></div>
        <div class="cs-arw">${I.chev}</div>
      </div>`;
    }).join('');
    el.innerHTML = `<div class="consult-sheet">
      <div class="cs-grip"></div>
      <div class="cs-head"><div class="cs-title">${cfg.title}</div>${(cfg.sub && !(s1Ver==='v40' && cfg.sub.indexOf('편하신 방법으로')===0))?`<div class="cs-sub">${cfg.sub}</div>`:''}</div>
      <div class="cs-list">${rows}</div>
      <div class="cs-cancel" data-msclose>닫기</div>
    </div>`;
  }
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeMethodSheet(){
  const el = document.getElementById('methodPop');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); }
}

/* Ver 4.0 전용 · '계좌번호를 모르겠어요' → 3단계 계좌찾기 플로팅 (①정보입력 ②인증번호 ③계좌리스트) */
const FIND_ACCTS = [
  {t:'위탁종합', no:'12345678'},
  {t:'연금저축', no:'23456789'},
  {t:'선물옵션', no:'34567890'},
];
const FIND_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';
function fmtAcct(no){ return no.replace(/(\d{4})(\d{4})/, '$1-$2'); }
function openFindAcct(){
  const screen = document.getElementById('screen'); if(!screen) return;
  const prev = document.getElementById('findAcctPop'); if(prev) prev.remove();
  s1state.findAgree = false;
  const el = document.createElement('div');
  el.className = 'consult-ov find-ov' + (isV45() ? ' v45' : ''); el.id = 'findAcctPop';
  el.innerHTML = findAcctSheet(1);
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function findAcctStep(n){ const el = document.getElementById('findAcctPop'); if(el) el.innerHTML = findAcctSheet(n); }
function closeFindAcct(){ const el = document.getElementById('findAcctPop'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); } }
function openPwHelpSheet(){
  const screen = document.getElementById('screen'); if(!screen) return;
  const prev = document.getElementById('pwHelpSheet'); if(prev) prev.remove();
  const el = document.createElement('div');
  el.className = 'consult-ov pw-help-sheet'; el.id = 'pwHelpSheet';
  el.innerHTML = `<div class="consult-sheet">
    <div class="cs-grip"></div>
    <div class="cs-head"><div class="cs-title">증권계좌 비밀번호</div></div>
    <div class="pw-help-desc">증권계좌 비밀번호는 <b>숫자 4~8자리</b>예요.<br>비밀번호가 기억나지 않으면 <b>영웅문S#</b> 앱에서<br>다시 설정할 수 있어요.</div>
    <div class="pw-help-cta" data-pwhelpgo><img src="assets/ys-icon.png" alt="S#" class="pw-help-ic">영웅문S# 바로가기</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closePwHelpSheet(){
  const el = document.getElementById('pwHelpSheet');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); }
}
/* 인증서 비밀번호 설명 바텀시트 (v45 전용) */
function openCertInfoSheet(){
  const screen = document.getElementById('screen'); if(!screen) return;
  const prev = document.getElementById('certInfoSheet'); if(prev) prev.remove();
  const el = document.createElement('div');
  el.className = 'consult-ov pw-help-sheet'; el.id = 'certInfoSheet';
  el.innerHTML = `<div class="consult-sheet">
    <div class="cs-grip"></div>
    <div class="cs-head"><div class="cs-title">공동인증서 비밀번호</div></div>
    <div class="pw-help-desc">공동인증서 비밀번호는 <b>영문·숫자·특수문자를 모두 포함한 10자리 이상</b>이에요.<br>비밀번호가 기억나지 않으면 <b>영웅문S#</b> 앱에서<br>다시 설정할 수 있어요.</div>
    <div class="pw-help-cta" data-certinfogo><img src="assets/ys-icon.png" alt="S#" class="pw-help-ic">영웅문S# 바로가기</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeCertInfoSheet(){
  const el = document.getElementById('certInfoSheet');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); }
}
function syncFindCtaBtn(){
  if(!isV45()) return;
  const pop = document.getElementById('findAcctPop'); if(!pop) return;
  const btn = pop.querySelector('.cs-cta'); if(!btn) return;
  if(pop.querySelector('[data-findotp]')){
    const inputs = [...pop.querySelectorAll('[data-findinput]')];
    const allFilled = inputs.every(inp => inp.tagName==='SELECT' ? inp.value!=='' : inp.value.trim()!=='');
    btn.classList.toggle('is-off', !(allFilled && !!pop.querySelector('.find-agree.on')));
  } else if(pop.querySelector('[data-finddone]')){
    const otp = pop.querySelector('.find-otp');
    btn.classList.toggle('is-off', !(otp && otp.value.length===6));
  }
}
/* 결과안내 '왜 진위확인이 되지 않았나요?' 배지 → 사유 안내 플로팅 */
function openBadgeInfo(){
  const key = IOD_RESULTS[s1state.iodResult] ? s1state.iodResult : 'multi';
  const b = IOD_RESULTS[key].infoBadge; if(!b) return;
  const screen = document.getElementById('screen'); if(!screen) return;
  const prev = document.getElementById('badgePop'); if(prev) prev.remove();
  const el = document.createElement('div');
  el.className = 'consult-ov badge-ov'; el.id = 'badgePop';
  el.innerHTML = `<div class="consult-sheet">
    <div class="cs-grip"></div>
    <div class="cs-head"><div class="cs-title">${b.title}</div></div>
    <div class="badge-points">${b.points.map(p=>`<div class="badge-pt"><span class="bp-dot"></span><span class="bp-txt">${p}</span></div>`).join('')}</div>
    <div class="cs-cancel" data-badgeclose>닫기</div>
  </div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeBadgeInfo(){ const el = document.getElementById('badgePop'); if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); } }
function findAcctSheet(step){
  const head = `<div class="cs-grip"></div>
    <div class="cs-head"><div class="cs-title">${step===3?'계좌조회가 완료되었어요':'계좌번호를 잊으셨나요?'}</div>
      <div class="cs-sub">${step===3?'확인할 계좌를 선택해주세요':'본인명의 휴대폰 인증 후 계좌번호를 찾아드릴게요'}</div></div>`;
  if(step===1){
    if(isV45()) return `<div class="consult-sheet find-sheet">${head}
      <div class="v45-fform">
        <div class="fir">
          <span class="fir-k">이름</span>
          <input class="fir-in" data-findinput placeholder="" autocomplete="off">
        </div>
        <div class="fir">
          <span class="fir-k">주민번호</span>
          <div class="fir-rrn">
            <input class="fir-in" data-findinput inputmode="numeric" maxlength="6" placeholder="앞 6자리">
            <span class="fir-dash">–</span>
            <input class="fir-in fir-rrn2" data-findinput inputmode="numeric" maxlength="1">
            <span class="fir-mask">●●●●●●</span>
          </div>
        </div>
        <div class="fir fir-phone">
          <div class="fir-sel-wrap">
            <select class="fir-sel" data-findinput><option value="">통신사</option><option>SKT</option><option>KT</option><option>LG U+</option><option>알뜰폰</option></select>
            <span class="fir-selchev">${I.down}</span>
          </div>
          <span class="fir-vdivider"></span>
          <input class="fir-in" data-findinput placeholder="휴대폰번호" inputmode="numeric" maxlength="11">
        </div>
      </div>
      <div class="find-agree${s1state.findAgree?' on':''}" data-findagree><span class="fa-box">${FIND_CHECK}</span><span class="fa-txt">휴대폰 인증 전체 약관동의 <b>(필수)</b></span></div>
      <div class="cs-cta is-off" data-findotp>인증받기</div>
    </div>`;
    return `<div class="consult-sheet find-sheet">${head}
      <div class="find-form">
        <input class="find-input" placeholder="이름" autocomplete="off">
        <div class="find-row find-rrn">
          <input class="find-input" placeholder="생년월일 6자리" inputmode="numeric" maxlength="6">
          <span class="find-dash">–</span>
          <input class="find-input find-rrn2" inputmode="numeric" maxlength="1">
          <span class="find-mask">●●●●●●</span>
        </div>
        <div class="find-row find-selwrap"><select class="find-input find-sel"><option value="">통신사</option><option>SKT</option><option>KT</option><option>LG U+</option><option>알뜰폰</option></select><span class="find-selchev">${I.down}</span></div>
        <input class="find-input" placeholder="휴대폰번호 ('-' 없이 입력)" inputmode="numeric" maxlength="11">
      </div>
      <div class="find-agree${s1state.findAgree?' on':''}" data-findagree><span class="fa-box">${FIND_CHECK}</span><span class="fa-txt">휴대폰 인증 전체 약관동의 <b>(필수)</b></span></div>
      <div class="cs-cta is-off" data-findotp>인증받기</div>
    </div>`;
  }
  if(step===2){
    return `<div class="consult-sheet find-sheet">${head}
      <div class="find-form">
        <div class="find-otpguide">입력하신 휴대폰으로 인증번호를 보냈어요.<br>3분 이내에 입력해 주세요.</div>
        <div class="find-row find-otprow"><input class="find-input find-otp" placeholder="인증번호 6자리" inputmode="numeric" maxlength="6" autocomplete="off"><span class="find-otptimer">02:59</span></div>
      </div>
      <div class="cs-cta is-off" data-finddone>인증완료</div>
    </div>`;
  }
  if(isV45()) return `<div class="consult-sheet find-sheet">${head}
    <div class="v45-fform">
      ${FIND_ACCTS.map(a=>`<div class="fir fir-acct" data-findacct="${a.no}"><span class="fa-t">${a.t}</span><span class="fa-sep"> : </span><span class="fa-no">${fmtAcct(a.no)}</span></div>`).join('')}
    </div>
  </div>`;
  return `<div class="consult-sheet find-sheet">${head}
    <div class="find-acctlist">
      ${FIND_ACCTS.map(a=>`<div class="find-acct" data-findacct="${a.no}"><div class="fa-info"><div class="fa-t">${a.t}</div><div class="fa-no">${fmtAcct(a.no)}</div></div><div class="cs-arw">${I.chev}</div></div>`).join('')}
    </div>
    <div class="cs-cancel" data-findclose>닫기</div>
  </div>`;
}

/* ===== Ver 4.0 · 주식주문 계단식 선택 플로팅 (주문·체결확인 > 주식주문) =====
   방법(영S#/음성ARS) → 주식종류(현금/신용/K-OTC) → 주문유형(매도/매수/정정/취소)
   → [음성ARS+신용]이면 소메뉴 → 연결. 상담방법 플로팅(consult-sheet) 스타일 재사용. 멘트=Ver4.0 톤. */
let stkOrder = {method:'', kind:'', type:'', sub:''};
const STK_KIND = {cash:'현금주식', credit:'신용주식', kotc:'K-OTC'};
const STK_TYPE = {sell:'매도', buy:'매수', modify:'정정', cancel:'취소'};
function stkSheetCfg(step){
  if(step==='method') return { title:'어떻게 주문할까요?', sub:'편하신 방법으로 주식주문을 도와드릴게요', opts:[
    {v:'hero',  ic:IOD_HERO_IC,   nm:'영웅문S#으로 주문하기', desc:'앱을 열어 주문 화면으로 바로 이동해요'},
    {v:'voice', ic:CS_ICON.voice, nm:'음성 ARS로 주문하기',   desc:'음성 안내에 따라 순서대로 주문해요'},
  ]};
  if(step==='kind') return { title:'어떤 주식을 주문할까요?', sub:'주식 종류를 선택해 주세요', opts:[
    {v:'cash',   nm:'현금주식', desc:'예수금으로 매매하는 일반 주식이에요'},
    {v:'credit', nm:'신용주식', desc:'신용융자·대주로 매매하는 주식이에요'},
    {v:'kotc',   nm:'K-OTC',   desc:'비상장주식 K-OTC예요'},
  ]};
  if(step==='type') return { title:'어떤 주문인가요?', sub:'주문 유형을 선택해 주세요', opts:[
    {v:'sell',   nm:'매도', desc:'보유하신 주식을 팔아요'},
    {v:'buy',    nm:'매수', desc:'주식을 새로 사요'},
    {v:'modify', nm:'정정', desc:'미체결 주문을 정정해요'},
    {v:'cancel', nm:'취소', desc:'미체결 주문을 취소해요'},
  ]};
  if(step==='sub'){   // 음성ARS 소메뉴 — 신용 매도/매수는 신용상품 유형, 그 외(현금·K-OTC·신용정정취소)는 주문유형별 세부
    const {kind, type} = stkOrder;
    if(kind==='credit' && type==='sell') return { title:'어떤 신용주문인가요?', sub:'세부 유형을 선택해 주세요', opts:[
      {v:'자기융자 매도상환', nm:'자기융자 매도상환', desc:'자기융자 상환을 위해 매도해요'},
      {v:'대출 매도상환',     nm:'대출 매도상환',     desc:'대출금 상환을 위해 매도해요'},
      {v:'대주 매도',         nm:'대주 매도',         desc:'대주(차입주식)를 매도해요'}]};
    if(kind==='credit' && type==='buy') return { title:'어떤 신용주문인가요?', sub:'세부 유형을 선택해 주세요', opts:[
      {v:'자기융자 매수', nm:'자기융자 매수', desc:'자기융자로 주식을 매수해요'},
      {v:'대주 매수상환', nm:'대주 매수상환', desc:'대주 상환을 위해 매수해요'}]};
    if(type==='sell' || type==='buy') return { title:'어떤 방식으로 주문할까요?', sub:'주문 방식을 선택해 주세요', opts:[
      {v:'지정가 주문', nm:'지정가 주문', desc:'원하는 가격을 지정해 주문해요'},
      {v:'시장가 주문', nm:'시장가 주문', desc:'지금 시장가격으로 바로 주문해요'}]};
    if(type==='modify') return { title:'무엇을 정정할까요?', sub:'정정 항목을 선택해 주세요', opts:[
      {v:'가격 정정', nm:'가격 정정', desc:'미체결 주문의 가격을 정정해요'},
      {v:'수량 정정', nm:'수량 정정', desc:'미체결 주문의 수량을 정정해요'}]};
    if(type==='cancel') return { title:'어떻게 취소할까요?', sub:'취소 방식을 선택해 주세요', opts:[
      {v:'전체 취소', nm:'전체 취소', desc:'미체결 주문을 전체 취소해요'},
      {v:'부분 취소', nm:'부분 취소', desc:'미체결 주문 일부만 취소해요'}]};
    return null;
  }
  return null;
}
function openStkSheet(step){
  const screen = document.getElementById('screen'); const cfg = stkSheetCfg(step);
  if(!screen || !cfg) return;
  const rows = cfg.opts.map(o=>
    `<div class="cs-row" data-stkpick="${o.v}" data-stkstep="${step}">
      ${(o.ic && s1Ver!=='v40') ? `<div class="cs-ic">${o.ic}</div>` : ''}
      <div class="cs-body"><div class="cs-nm">${o.nm}</div>${o.desc?`<div class="cs-desc">${o.desc}</div>`:''}</div>
      <div class="cs-arw">${I.chev}</div>
    </div>`).join('');
  const inner = `<div class="cs-grip"></div>
    <div class="cs-head"><div class="cs-title">${cfg.title}</div>${(cfg.sub && !(s1Ver==='v40' && cfg.sub.indexOf('편하신 방법으로')===0))?`<div class="cs-sub">${cfg.sub}</div>`:''}</div>
    <div class="cs-list">${rows}</div>
    <div class="cs-cancel" data-stkclose>닫기</div>`;
  const existing = document.getElementById('stkPop');
  // v40: 이미 열린 시트면 재생성(재슬라이드) 없이 내용만 교체 + 높이만 부드럽게 커졌다/줄었다 → 튀어오름 방지
  if(existing && s1Ver==='v40' && existing.classList.contains('on')){
    const sheet = existing.querySelector('.consult-sheet');
    const startH = sheet.offsetHeight;
    sheet.innerHTML = inner;
    const endH = sheet.offsetHeight;          // 새 내용의 자연 높이(auto)
    sheet.style.height = startH + 'px';
    void sheet.offsetHeight;                    // reflow → 시작 높이 확정
    sheet.style.transition = 'height .26s cubic-bezier(.22,.7,.3,1)';
    sheet.style.height = endH + 'px';
    const done = ()=>{ sheet.style.height=''; sheet.style.transition=''; };
    sheet.addEventListener('transitionend', done, {once:true});
    setTimeout(done, 320);                       // 높이 변화 없을 때 폴백
    return;
  }
  if(existing) existing.remove();               // 첫 진입/비-v40: 중복 id 방지 후 재생성(슬라이드업)
  const el = document.createElement('div'); el.className = 'consult-ov stk-ov' + (bigFont?' bigfont':''); el.id = 'stkPop';
  el.innerHTML = `<div class="consult-sheet">${inner}</div>`;
  screen.appendChild(el);
  requestAnimationFrame(()=>el.classList.add('on'));
}
function closeStkSheet(){
  const el = document.getElementById('stkPop');
  if(el){ el.classList.remove('on'); setTimeout(()=>{ if(el.parentNode) el.remove(); }, 240); }
}
function stkConnect(){
  closeStkSheet();
  const label = `${STK_KIND[stkOrder.kind]||''} ${STK_TYPE[stkOrder.type]||''}`.trim() + (stkOrder.sub ? ` · ${stkOrder.sub}` : '');
  if(stkOrder.method==='hero'){
    APP_LINK.stkorder = {title: label + ' 주문'};   // 영웅문S# 앱 연결 팝업(v40 톤)으로 해당 주문화면 연동
    openAppLink('stkorder');
  } else {
    s1nav({page:'voiceconnect', title:'음성 ARS 연결', voiceLabel: label, noHome:true});   // 음성 ARS 연결 안내 화면(라벨에 이미 소메뉴 포함)
  }
}
/* 휴대폰·간편 인증 완료 → 본인 명의 계좌 선택(선택 시 계좌 인증 화면에 계좌번호 자동 입력) */
function renderIodAcctSel(){
  const rows = ACCOUNTS.map((a,i)=>
    `<div class="iodsel-row" data-iodacct="${i}">
      <div class="iodsel-ic">${I.wallet}</div>
      <div class="iodsel-tx"><div class="iodsel-nm">${a.type}</div><div class="iodsel-no">${a.no}</div></div>
      <div class="iodsel-arw">${I.chev}</div>
    </div>`).join('');
  // che(체결·주문내역): Ver 4.0 토스백 헤더 + 타이틀/설명(경로 컨텍스트), 스텝바 없음
  if(isCheAuth()){
    const ctx = cheAuthCtx();
    return `<div class="acv-wrap"><div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>`
      + `<div class="auth-wrap cheauth">
          <div class="toss-dhead"><div class="td-title">계좌 선택</div><div class="td-desc">${ctx?ctx+'을 확인할 ':''}계좌를 선택해 주세요</div></div>
          <div class="iodsel-list">${rows}</div>
        </div></div>`;
  }
  return pageTop(s1state.title||'계좌 선택', true)
    + untactSteps(iodStepsFor(), 0)
    + `<div class="auth-wrap">
        <div class="toss-dhead"><div class="td-title">계좌 선택</div><div class="td-desc">${isCertFlow() ? '증명서 발급·신청 내역을 확인할 계좌를 선택해 주세요' : (isIsaFlow() ? '중개형 ISA 신청현황을 확인할 계좌를 선택해 주세요' : '입출금을 확인할 계좌를 선택해 주세요')}</div></div>
        <div class="iodsel-list">${rows}</div>
      </div>`;
}
/* 금융거래목적확인서 등록 — [입출금] 플로우와 동일 디자인(iod-top 뒤로가기·auth-wrap 24px 정렬·Ver4.0 톤) */
function renderIodPurpose(){
  const F = (k,v)=>`<div class="ir"><span class="k">${k}</span><span class="v">${v} ${I.down}</span></div>`;
  if(isV45()){
    const Dv45 = (k,v)=>`<div class="v45-ir"><span class="v45-ik">${k}</span><span class="v45-iv sel">${v} ${I.down}</span></div>`;
    return `<div class="iodresult-screen v45-authpage">
      ${v45AuthTop(2)}
      <div class="iod-v45-body">
        <div class="toss-dhead">
          <div class="td-title">거래 목적을 확인하고<br>등록해 드릴게요</div>
          <div class="td-desc">자금세탁방지(AML) 제도에 따라 거래 목적 확인이 필요해요</div>
        </div>
        <div class="iod-v45-card">
          ${Dv45('거래 목적','자산운용·투자')}
          ${Dv45('자금 원천','근로·사업 소득')}
          ${Dv45('직업 구분','회사원')}
        </div>
        <div class="iod-note">등록하시면 장기미사용·다수계좌 거래제한이 바로 풀려요.</div>
        <div class="iod-v45-actions"><div class="primary-btn v45-iod-btn" data-iodpurposedone>등록하기</div></div>
      </div>
    </div>`;
  }
  return pageTop(s1state.title||'금융거래목적확인서', true)
    + `<div class="auth-wrap">
        <div class="auth-head">거래 목적을 확인하고<br>등록해 드릴게요</div>
        <div class="auth-info">
          ${F('거래 목적','자산운용·투자')}
          ${F('자금 원천','근로·사업 소득')}
          ${F('직업 구분','회사원')}
        </div>
        <div class="auth-note">자금세탁방지(AML) 제도에 따라 거래 목적 확인이 필요해요.<br>등록하시면 장기미사용·다수계좌 거래제한이 바로 풀려요.</div>
        <div class="primary-btn" data-iodpurposedone>등록하기</div>
      </div>`;
}
/* 금융거래목적확인서 등록 완료 화면 — [입출금] 디자인(iod-top·24px·Ver4.0 톤), 스텝바 완료 */
function renderIodPurposeDone(){
  if(isV45()){
    return `<div class="iod-done-center v45-authpage">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">등록이 완료됐어요</div>
        <div class="iod-done-d">거래 목적 확인이 등록되어<br>계좌의 거래제한이 바로 해제됐어요.<br>이제 정상적으로 입출금하실 수 있어요.</div>
      </div>
      <div class="iod-done-btnwrap"><div class="primary-btn v45-iod-btn" data-iodhome>확인</div></div>
    </div>`;
  }
  return `<div class="iod-done-center">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">등록이 완료됐어요</div>
        <div class="iod-done-d">거래 목적 확인이 등록되어<br>계좌의 거래제한이 바로 해제됐어요.<br>이제 정상적으로 입출금하실 수 있어요.</div>
      </div>
      <div class="iod-done-btnwrap"><div class="primary-btn" data-iodhome>확인</div></div>
    </div>`;
}
/* 음성 ARS 연결 안내 화면 — Ver4.0 플로우 화면 형식(iod-top·헤딩·정보카드·안내·버튼, [입출금]과 동일) */
function renderVoiceConnect(){
  const label = s1state.voiceLabel || '음성 ARS';
  const acctVal = sessionAuthed ? `${(authAcct&&authAcct.no)||'인증 계좌'} 연동` : '통화 중 확인';
  // Ver 4.0: 토스 헤더(뒤로가기만) + 중앙정렬 본문(수화기 아이콘·연결정보·연결 버튼) — renderVoiceV40/renderAgentV40와 동일 구조
  if(isV40()){
    return `<div class="acv-wrap">
      <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
      <div class="agent-connect">
        <div class="ac-ic">${I.phone}</div>
        <div class="ac-t">음성 ARS로 연결할까요?</div>
        <div class="ac-d">선택하신 메뉴를 음성 안내로<br>바로 도와드릴게요.</div>
        <div class="ac-info">
          <div class="ac-row"><span class="k">연결 메뉴</span><span class="v">${label}</span></div>
          <div class="ac-row"><span class="k">계좌 연동</span><span class="v">${acctVal}</span></div>
        </div>
        <div class="primary-btn" data-voicego>음성 ARS 연결</div>
        <div class="notice">${wipeNote('음성 ARS로 연결하면 지금 보고 계신 디지털 ARS는 종료돼요.')}</div>
      </div>
    </div>`;
  }
  return pageTop(s1state.title||'음성 ARS 연결', true)
    + `<div class="auth-wrap">
        <div class="auth-head">음성 ARS로<br>바로 연결해 드릴게요</div>
        <div class="auth-info">
          <div class="ir"><span class="k">연결 메뉴</span><span class="v">${label}</span></div>
          <div class="ir"><span class="k">계좌 연동</span><span class="v">${acctVal}</span></div>
        </div>
        <div class="auth-note">${wipeNote('음성 ARS로 연결하면 지금 보고 계신 디지털 ARS는 종료돼요.')}</div>
        <div class="primary-btn" data-voicego>음성 ARS 연결</div>
      </div>`;
}
/* 음성 ARS 연결 완료 화면 — 연결 버튼 클릭 후, 세로 중앙 정렬 */
function renderVoiceDone(){
  const label = s1state.voiceLabel || '';
  const menuLine = label ? `선택하신 <b>${label}</b> 안내를<br>지금 시작할게요.` : `음성 안내를 지금 시작할게요.`;
  return `<div class="iod-done-center">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">음성 ARS로 연결됐어요</div>
        <div class="iod-done-d">${menuLine}<br>잠시만 기다려 주세요.</div>
      </div>
      <div class="iod-done-note">${wipeNote('이 디지털 ARS 화면은 종료돼요.')}</div>
      <div class="iod-done-btnwrap"><div class="primary-btn" data-iodhome>확인</div></div>
    </div>`;
}
/* 영웅문S# 연결 완료 화면 — 앱 연결 팝업 '열기' 후, 세로 중앙 정렬 */
function renderHeroDone(){
  const title = s1state.heroTitle || '요청하신 업무';
  const app = s1state.heroApp || '영웅문S#';
  const acctLine = (sessionAuthed && !bigFont) ? '인증하신 계좌를 연동해서<br>' : '';   // 큰글씨: 본문 축약
  return `<div class="iod-done-center">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">${app} 앱으로 연결됐어요</div>
        <div class="iod-done-d">${acctLine}<b>${title}</b> 화면으로 이동했어요.</div>
      </div>
      <div class="iod-done-note">${wipeNote('이 디지털 ARS 화면은 종료돼요.')}</div>
      <div class="iod-done-btnwrap"><div class="primary-btn" data-iodhome>확인</div></div>
    </div>`;
}
/* 신분증 재요청 URL 발송 완료 화면 (입출금 안내 · 신분증 진위확인 결과에서 진입) */
function renderIdDone(){
  return `<div class="iod-done-center">
      <div class="iod-done">
        <div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div>
        <div class="iod-done-t">재요청 URL을 보내드렸어요</div>
        <div class="iod-done-d"><b>신분증 재요청 URL</b>을 알림톡으로 발송했어요.<br>링크에서 신분증을 재접수하시면,<br>진위확인 후 거래 제한이 풀려요.</div>
      </div>
      <div class="iod-done-note">※ 알림톡이 오지 않으면 잠시 후 다시 시도해 주세요.</div>
      <div class="iod-done-btnwrap"><div class="primary-btn" data-iodhome>확인</div></div>
    </div>`;
}

/* Ver 4.0 · 체결내역(디지털 ARS 조회) 전용 화면 — 토스 톤 헤더 + v40 필터칩 + 하단까지 감싼 카드(내부 스크롤) + 상담원 연결 */
/* 계좌번호별 체결·미체결·예약 내역 (계좌인증한 계좌에 따라 다른 데이터 표시) */
const FILLED_ACCT = {
  '5257-5602': {   // 위탁종합 — 국내 대형주
    all:[
      {n:'삼성전자',   s:'매수', q:10, p:78000,  t:'09:12'},
      {n:'SK하이닉스', s:'매수', q:3,  p:198000, t:'10:34'},
      {n:'현대차',     s:'매도', q:2,  p:235000, t:'13:05'},
    ],
    un:[
      {n:'삼성전자', s:'매수', q:5,  p:82000,  t:'09:30'},
      {n:'카카오',   s:'매도', q:10, p:51000,  t:'10:15'},
      {n:'NAVER',    s:'매수', q:2,  p:198500, t:'11:02'},
    ],
    rv:{n:'삼성전자', s:'예약', sub:'매수 5주 · 82,000원 · 내일 09:00', cancel:true},
  },
  '6320-3614': {   // 위탁종합 — 성장·중대형주
    all:[
      {n:'카카오',      s:'매수', q:20, p:49800,  t:'09:45'},
      {n:'기아',        s:'매도', q:8,  p:112000, t:'11:10'},
      {n:'POSCO홀딩스', s:'매수', q:4,  p:385000, t:'14:02'},
    ],
    un:[
      {n:'LG에너지솔루션', s:'매수', q:2, p:412000, t:'10:20'},
      {n:'셀트리온',       s:'매도', q:6, p:178000, t:'13:15'},
    ],
    rv:{n:'기아', s:'예약', sub:'매수 10주 · 110,000원 · 내일 09:00', cancel:true},
  },
  '6320-7376': {   // 중개형ISA — ETF 위주
    all:[
      {n:'KODEX 200',        s:'매수', q:30, p:38500, t:'09:20'},
      {n:'TIGER 미국S&P500', s:'매수', q:12, p:18200, t:'10:50'},
      {n:'KODEX 배당가치',    s:'매수', q:25, p:12400, t:'13:30'},
    ],
    un:[
      {n:'TIGER 나스닥100', s:'매수', q:8, p:105000, t:'11:05'},
    ],
    rv:{n:'KODEX 200', s:'예약', sub:'매수 20주 · 38,000원 · 내일 09:00', cancel:true},
  },
};
function renderFilledV40(){
  const acctData = FILLED_ACCT[authAcct.no] || FILLED_ACCT['5257-5602'];   // 인증한 계좌의 내역
  const all = acctData.all;
  const un = acctData.un;
  let items;
  if(orderTab==='예약'){
    items = acctData.rv ? [acctData.rv] : [];
  } else if(orderTab==='미체결'){
    const u = txFilter.stock ? un.filter(x=>x.n===txFilter.stock) : un;
    items = u.map(x=>({n:x.n, s:x.s, sub:`${x.q}주 · ${won(x.p)}원 · ${x.t}`, cancel:true}));
  } else {
    const o = txFilter.stock ? all.filter(x=>x.n===txFilter.stock) : all;
    items = o.map(x=>({n:x.n, s:x.s, sub:`${x.q}주 · ${won(x.p)}원 · ${x.t}`, amt:`${won(x.q*x.p)}원`}));
  }
  const tagCls = s => s==='매수' ? 'buy' : s==='매도' ? 'sell' : 'wait';
  const listHTML = items.length
    ? items.map(x=>`<div class="fv-item">
        <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag ${tagCls(x.s)}">${x.s}</span></div>
          <div class="fv-sub">${x.sub}</div></div>
        ${x.cancel ? `<span class="fv-cancel" data-flash="주문을 취소했습니다. (시연용)">취소</span>` : (x.amt ? `<div class="fv-amt">${x.amt}</div>` : '')}
      </div>`).join('')
    : `<div class="fv-empty">해당하는 내역이 없어요.</div>`;

  const stockCell = txFilter.stock
    ? `<span class="fv-stk">${txFilter.stock}</span><span class="fv-x" data-stockclear title="종목 지우기">${I.x}</span>`
    : `<span class="fv-ph">종목검색</span>${I.search}`;
  const dateChip = (orderTab==='전체')
    ? `<div class="fv-chip" data-datesel>${fmtP(orderDate)} ${I.down}</div>`
    : `<div class="fv-chip off">${TODAY} ${I.down}</div>`;

  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">체결내역</div><div class="td-desc">선택한 날짜의 주문 및 체결내역을 확인해요</div></div>
    <div class="fv-filter">
      <div class="fv-chip full" data-acctchange><span class="fv-cv">${authAcct.type} ${authAcct.no}</span>${I.down}</div>
      <div class="fv-grid2">
        <div class="fv-chip" data-stocksearch>${stockCell}</div>
        ${dateChip}
      </div>
      <div class="fv-tabs">` + ORDER_TABS.map(tb=>
        `<div class="fv-tab ${tb===orderTab?'on':''}" data-ordertab="${tb}">${tb==='전체'?'체결':tb}</div>`).join('') + `</div>
    </div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="체결내역 조회">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 예수금·주문가능금액(디지털 ARS 조회) 전용 화면 — 토스톤 헤더 + 예수금 요약 카드 + 주문가능금액(증거금률별) 카드(스크롤) + 상담원 연결
   ※보유종목은 별도 중메뉴(현금주식 잔고조회 등)에서 처리 */
function renderHoldingsV40(){
  const dep = 2150000;          // 예수금 (D+0)
  const withdrawable = 2150000; // 출금가능금액
  const misu = 0;               // 미수금
  // 주문가능금액 (증거금률별 — 낮을수록 주문가능금액 ↑)
  const orders = [
    {r:'현금 (증거금 100%)', d:'현금으로 주문 가능한 금액',      amt:2150000},
    {r:'증거금 40%',        d:'증거금률 40% 종목 주문가능',     amt:5375000},
    {r:'증거금 30%',        d:'증거금률 30% 종목 주문가능',     amt:7166000},
    {r:'증거금 20%',        d:'증거금률 20% 종목 주문가능',     amt:10750000},
  ];
  const listHTML = orders.map(o=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${o.r}</div><div class="fv-sub">${o.d}</div></div>
      <div class="hv-amt">${won(o.amt)}원</div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">예수금 · 주문가능금액</div><div class="td-desc">인증하신 계좌의 예수금과 주문가능금액을 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="hv-summary">
      <div class="hv-row"><span>예수금 (D+0)</span><b>${won(dep)}원</b></div>
      <div class="hv-row"><span>출금가능금액</span><b>${won(withdrawable)}원</b></div>
      <div class="hv-row"><span>미수금</span><b>${won(misu)}원</b></div>
    </div>
    <div class="hv-secttl">주문가능금액</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="예수금·주문가능금액 조회">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 주식·신용·금융상품 잔고(디지털 ARS 조회) 전용 화면 — 토스톤 헤더 + 평가 요약 카드 + [전체/현금/신용/금융상품] 필터 탭 + 보유 종목 카드(스크롤) + 상담원 연결 */
let balFilter = '전체';   // 잔고조회 유형 필터
const BAL_TABS = ['전체','현금','신용','금융상품'];
function renderBalanceV40(){
  const stk = [
    {n:'삼성전자',         q:10, avg:78000,  cur:83200,  k:'현금'},
    {n:'현대차',           q:5,  avg:241000, cur:228000, k:'현금'},
    {n:'SK하이닉스',       q:3,  avg:198000, cur:212500, k:'신용'},
    {n:'카카오',           q:20, avg:54200,  cur:49800,  k:'신용'},
    {n:'KODEX 200',        q:20, avg:38000,  cur:38500,  k:'금융상품'},
    {n:'TIGER 미국S&P500', q:12, avg:18000,  cur:18200,  k:'금융상품'},
  ];
  const kCls = k => k==='신용' ? 'credit' : k==='금융상품' ? 'fund' : 'cash';
  // 요약은 전체 기준
  let totEval=0, totCost=0;
  stk.forEach(s=>{ totEval+=s.q*s.cur; totCost+=s.q*s.avg; });
  const totPl=totEval-totCost, totRt=totPl/totCost*100;
  const uc=totPl>=0?'up':'down', us=totPl>=0?'+':'';
  // 리스트는 필터 적용
  const filtered = balFilter==='전체' ? stk : stk.filter(s=>s.k===balFilter);
  const listHTML = filtered.length
    ? filtered.map(s=>{
        const ev=s.q*s.cur, pl=(s.cur-s.avg)*s.q, rt=((s.cur-s.avg)/s.avg*100);
        const up=pl>=0, cls=up?'up':'down', sign=up?'+':'';
        return `<div class="fv-item">
          <div class="fv-it"><div class="fv-nm">${s.n} <span class="bal-tag ${kCls(s.k)}">${s.k}</span></div><div class="fv-sub">${s.q}주 · 평단 ${won(s.avg)}원</div></div>
          <div class="hv-right"><div class="hv-amt">${won(ev)}원</div><div class="hv-pl ${cls}">${sign}${won(pl)} (${sign}${rt.toFixed(1)}%)</div></div>
        </div>`;
      }).join('')
    : `<div class="fv-empty">해당 유형의 보유 종목이 없어요.</div>`;
  const tabs = BAL_TABS.map(tb=>`<div class="fv-tab ${tb===balFilter?'on':''}" data-balfilter="${tb}">${tb}</div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">주식·신용·금융상품 잔고</div><div class="td-desc">인증하신 계좌의 보유 잔고를 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="hv-summary">
      <div class="hv-row"><span>총 평가금액</span><b>${won(totEval)}원</b></div>
      <div class="hv-row"><span>총 평가손익</span><b class="${uc}">${us}${won(totPl)}원 (${us}${totRt.toFixed(1)}%)</b></div>
      <div class="hv-row"><span>총 매입금액</span><b>${won(totCost)}원</b></div>
    </div>
    <div class="fv-tabs bal-tabs">${tabs}</div>
    <div class="hv-secttl">보유 종목 ${filtered.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="주식·신용·금융상품 잔고조회">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 거래내역(디지털 ARS 조회) 전용 화면 — 토스톤 헤더 + 기간 칩 + 거래내역(매매·입출금 구분) 카드(스크롤) + 상담원 연결 */
function renderTradesV40(){
  const tx = [
    {d:'06.20', n:'삼성전자',      k:'매수', amt:-780000},
    {d:'06.19', n:'예수금 입금',    k:'입금', amt:2000000},
    {d:'06.18', n:'카카오',        k:'매도', amt:1010000},
    {d:'06.16', n:'SK하이닉스',    k:'매수', amt:-594000},
    {d:'06.14', n:'배당금 입금',    k:'입금', amt:18500},
    {d:'06.12', n:'현대차',        k:'매도', amt:456000},
  ];
  const tagCls = k => k==='매수' ? 'buy' : k==='매도' ? 'sell' : 'cashtag';
  const listHTML = tx.map(x=>{
    const neg=x.amt<0, sign=neg?'-':'+';
    return `<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag ${tagCls(x.k)}">${x.k}</span></div><div class="fv-sub">${x.d}</div></div>
      <div class="hv-amt ${neg?'txneg':'txpos'}">${sign}${won(Math.abs(x.amt))}원</div>
    </div>`;
  }).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">거래내역</div><div class="td-desc">선택한 기간의 거래내역을 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="fv-chip hv-period" data-flash="조회 기간을 선택합니다. (시연용)"><span class="fv-ck">조회 기간</span><span class="fv-cv">2026.06.01 ~ 2026.06.24</span>${I.down}</div>
    <div class="hv-secttl">거래내역 ${tx.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="거래내역 조회">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 공모주 청약(디지털 ARS 조회) 전용 화면 — 진행 중 공모주 일정·경쟁률(조회 전용, 청약은 앱/음성) */
function renderIpoV40(){
  const ipo = [
    {n:'에이펙스반도체', st:'청약중', stc:'live', d:'06.24~06.25 · 확정공모가 36,000원', rt:'1,204:1',  rts:'통합 경쟁률'},
    {n:'대명에너지',     st:'예정',   stc:'wait', d:'07.01~07.02 · 희망밴드 18,000~21,000원', rt:'—', rts:'수요예측 중'},
    {n:'케이지모빌리티', st:'환불',   stc:'done', d:'06.10~06.11 · 공모가 24,500원', rt:'배정 12주', rts:'환불 06.13'},
  ];
  const listHTML = ipo.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag ${x.stc}">${x.st}</span></div><div class="fv-sub">${x.d}</div></div>
      <div class="fv-rt">${x.rt}<span class="fv-rtsub">${x.rts}</span></div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">공모주 청약</div><div class="td-desc">진행 중인 공모주 일정과 경쟁률을 확인해요</div></div>
    <div class="fv-note">청약 신청은 <b>영웅문S#</b> 또는 <b>음성 ARS</b>에서 진행할 수 있어요. 이 화면에서는 일정·경쟁률을 조회해요.</div>
    <div class="hv-secttl">진행 중 공모주 ${ipo.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="공모주 청약">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 유상청약(디지털 ARS 조회) 전용 화면 — 보유 종목 유상증자 청약 권리(조회 전용, 청약은 앱/음성) */
function renderRightsV40(){
  const rights = [
    {n:'셀트리온바이오', st:'청약중', stc:'live', d:'06.23~06.27 · 신주 발행가 12,000원', rt:'배정 30주', rts:'초과청약 가능'},
    {n:'한화에너지',     st:'예정',   stc:'wait', d:'07.03~07.05 · 발행가 미정',        rt:'배정 예정', rts:'권리락 07.01'},
  ];
  const listHTML = rights.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag ${x.stc}">${x.st}</span></div><div class="fv-sub">${x.d}</div></div>
      <div class="fv-rt">${x.rt}<span class="fv-rtsub">${x.rts}</span></div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">유상청약</div><div class="td-desc">보유 종목의 유상증자 청약 권리를 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="fv-note">청약 신청은 <b>영웅문S#</b> 또는 <b>음성 ARS</b>에서 진행할 수 있어요. 이 화면에서는 청약 권리를 조회해요.</div>
    <div class="hv-secttl">청약 대상 권리 ${rights.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="유상청약">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 증명서 발급(디지털 ARS) 전용 화면 — 발급 가능 증명서 리스트 + 항목별 발급 버튼 + 상담원 연결 */
function renderCertV40(){
  const certs = [
    {n:'잔고증명서',       d:'특정일 기준 보유 잔고 증명'},
    {n:'거래내역서',       d:'기간별 거래내역 증명'},
    {n:'외화예수금증명서', d:'외화 예수금 잔액 증명'},
    {n:'외납세액명세서',   d:'외국 납부세액 내역 명세'},
  ];
  const listHTML = certs.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n}</div><div class="fv-sub">${x.d}</div></div>
      <div class="fv-issue" data-flash="${x.n} 발급이 접수되었어요. 등록된 이메일로 보내드릴게요. (시연용)">발급</div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">증명서 발급</div><div class="td-desc">필요한 증명서를 발급받아요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="hv-secttl">발급 가능 증명서 ${certs.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="증명서 발급">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 서류 제출(디지털 ARS) 전용 화면 — s1state.docLabel 기반 공용 화면(촬영·첨부 CTA + 안내 + 상담원 연결) */
function renderDocSubmitV40(){
  const label = s1state.docLabel || '서류';
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">${label}</div><div class="td-desc">서류를 촬영하거나 파일로 제출해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="doc-card">
      <div class="doc-ic">${I.doc}</div>
      <div class="doc-h">${label} 제출</div>
      <div class="doc-d">서류를 촬영하거나 파일로 첨부해<br>간편하게 제출할 수 있어요</div>
      <div class="doc-btn" data-flash="${label} 제출이 접수되었어요. 심사 후 알림으로 안내해 드릴게요. (시연용)">서류 촬영·첨부하기</div>
    </div>
    <div class="fv-note">제출 후 심사에 <b>1~2 영업일</b>이 걸릴 수 있어요. 반려 시 알림으로 안내해 드려요.</div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="${label} 제출">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 업무신청(디지털 ARS) 전용 화면 — s1state.applyGroup(APPLY_GROUPS) 기반, 그룹 내 신청 가능 업무 리스트 + 항목별 신청 버튼 + 상담원 연결 */
function renderApplyGroupV40(){
  const g = APPLY_GROUPS[s1state.applyGroup] || APPLY_GROUPS.authacct;
  const btn = g.btn || '신청';
  const msg = g.actMsg || '신청이 접수되었어요';
  const listHTML = g.items.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n}</div><div class="fv-sub">${x.d}</div></div>
      <div class="fv-issue" data-flash="${x.n} ${msg}. (시연용)">${btn}</div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">${g.title}</div><div class="td-desc">${g.desc}</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="hv-secttl">${g.sectl || '신청 가능 업무'} ${g.items.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="${g.title}">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 공지·이용안내(디지털 ARS) 전용 화면 — s1state.infoKey(INFO_LISTS) 기반 정보 리스트(제목·설명·상태태그, 버튼 없음) + 상담원 연결 */
function renderInfoListV40(){
  const g = INFO_LISTS[s1state.infoKey] || INFO_LISTS.arsguide;
  const listHTML = g.items.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.t}${x.tag?` <span class="fv-tag ${x.tc}">${x.tag}</span>`:''}</div><div class="fv-sub">${x.d}</div></div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">${g.title}</div><div class="td-desc">${g.desc}</div></div>
    <div class="hv-secttl">${g.sectl} ${g.items.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="${g.title}">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 미수·반대매매(디지털 ARS 조회) 전용 화면 — 토스톤 헤더 + 미수 요약 카드 + 반대매매 안내 + 대상 종목 카드(스크롤) + 상담원 연결 */
function renderMisuV40(){
  const targets = [
    {n:'삼성전자',   q:10, amt:832000},
    {n:'SK하이닉스', q:2,  amt:425000},
  ];
  const listHTML = targets.map(x=>`<div class="fv-item">
      <div class="fv-it"><div class="fv-nm">${x.n} <span class="fv-tag sell">반대매매 대상</span></div><div class="fv-sub">${x.q}주 · 예상 처분금액</div></div>
      <div class="hv-amt">${won(x.amt)}원</div>
    </div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">미수·반대매매</div><div class="td-desc">미수금과 반대매매 예정을 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="hv-summary">
      <div class="hv-row"><span>미수금</span><b class="up">1,240,000원</b></div>
      <div class="hv-row"><span>연체이자</span><b>3,200원</b></div>
      <div class="hv-row"><span>반대매매 예정일</span><b>2026.06.26 (D+2)</b></div>
    </div>
    <div class="misu-note">미수금을 <b>06.25(D+1)</b>까지 상환하지 않으면, 06.26일 반대매매가 자동으로 진행돼요.</div>
    <div class="hv-secttl">반대매매 예정 종목 ${targets.length}</div>
    <div class="fv-card"><div class="fv-list">${listHTML}</div></div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="미수·반대매매 조회">상담원 연결</div></div>
  </div>`;
}

/* Ver 4.0 · 계좌번호·MY계좌 정보(디지털 ARS 조회) 전용 화면 — 토스톤 헤더 + 계좌 정보 카드 + MY계좌 설정 카드 + 상담원 연결 */
function renderMyAcctV40(){
  const info = [
    ['계좌번호', authAcct.no],
    ['예금주', '홍길동'],
    ['계좌 종류', authAcct.type],
    ['개설일', '2020.03.15'],
    ['계좌 상태', '정상'],
  ];
  const my = [
    ['계좌 별칭', '국내주식'],
    ['대표계좌', '대표계좌로 설정됨'],
    ['출금 계좌', '등록됨'],
  ];
  const rows = arr => arr.map(r=>`<div class="hv-row"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('');
  return `<div class="fv-wrap">
    <div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>
    <div class="toss-dhead"><div class="td-title">계좌번호·MY계좌</div><div class="td-desc">인증하신 계좌의 정보와 MY계좌 설정을 확인해요</div></div>
    <div class="fv-chip hv-acct"><span class="fv-cv">${authAcct.type} ${authAcct.no}</span></div>
    <div class="my-body">
      <div class="hv-secttl">계좌 정보</div>
      <div class="hv-summary">${rows(info)}</div>
      <div class="hv-secttl">MY계좌 설정</div>
      <div class="hv-summary">${rows(my)}</div>
    </div>
    <div class="fv-foot"><div class="primary-btn" data-staffconnect="계좌번호·MY계좌 정보확인">상담원 연결</div></div>
  </div>`;
}

/* ===== 간편비밀번호(PIN) 변경 — 2단계 입력(새 PIN → 확인) ===== */
let pinState = {buf:'', stage:'new', first:''};
function pinReset(){ pinState = {buf:'', stage:'new', first:''}; }
// 사용 불가 규칙: 동일 숫자(111111)·연속 숫자(123456/654321)·생년월일(900101)
function pinInvalidReason(p){
  if(/^(\d)\1{5}$/.test(p)) return '동일한 숫자는 사용할 수 없습니다.';
  let asc=true, desc=true;
  for(let i=1;i<p.length;i++){
    if(+p[i] !== +p[i-1]+1) asc=false;
    if(+p[i] !== +p[i-1]-1) desc=false;
  }
  if(asc||desc) return '연속된 숫자는 사용할 수 없습니다.';
  if(p==='900101') return '생년월일은 사용할 수 없습니다.';
  return '';
}
function pinUpdateDots(){
  const dots = document.querySelectorAll('#pinDots span');
  dots.forEach((d,i)=> d.classList.toggle('on', i < pinState.buf.length));
}
function pinSetGuide(html){
  const g = document.getElementById('pinGuide');
  if(g) g.innerHTML = html;
}
function pinPress(val){
  if(val==='back'){ pinState.buf = pinState.buf.slice(0,-1); pinUpdateDots(); return; }
  if(pinState.buf.length >= 6) return;
  pinState.buf += String(val);
  pinUpdateDots();
  if(pinState.buf.length === 6) setTimeout(pinProcess, 140);  // 6번째 점 표시 후 처리
}
function pinProcess(){
  const p = pinState.buf;
  if(pinState.stage === 'new'){
    const bad = pinInvalidReason(p);
    if(bad){ flash(bad); pinState.buf=''; pinUpdateDots(); return; }
    pinState.first = p; pinState.stage = 'confirm'; pinState.buf=''; pinUpdateDots();
    pinSetGuide('확인을 위해<br>새 PIN을 다시 입력해 주세요');
    return;
  }
  // confirm 단계
  if(p === pinState.first){
    flash('간편비밀번호(PIN)가 변경되었습니다. 다음 로그인부터 새 PIN을 사용해 주세요. (시연용)');
    pinReset();
    s1back();   // ID조회/PW초기화 메뉴로 복귀
  } else {
    flash('PIN이 일치하지 않습니다. 처음부터 다시 입력해 주세요.');
    pinState = {buf:'', stage:'new', first:''};
    pinUpdateDots();
    pinSetGuide('새로운 간편비밀번호<br>6자리를 입력해 주세요');
  }
}

/* 인증번호 카운트다운 (3:00 → 0:00) */
let otpTimer = null;
function startOtpTimer(sec){
  clearInterval(otpTimer);
  let t = sec;
  const paint = ()=>{
    const el = document.getElementById('otpTimer');
    if(!el){ clearInterval(otpTimer); return; }   // 화면 이탈 시 자동 정리
    const m = String(Math.floor(t/60)).padStart(2,'0');
    const s = String(t%60).padStart(2,'0');
    el.textContent = `${m}:${s}`;
    if(t<=0){ clearInterval(otpTimer); el.classList.add('done'); }
  };
  paint();
  otpTimer = setInterval(()=>{ t--; paint(); }, 1000);
}

/* 인증 완료 후 원래 자주 찾는 서비스 목적지로 이동 */
function gotoAuthNext(deep){
  sessionAuthed = true;            // 이후 다른 자주 찾는 서비스는 추가 인증 생략
  const d = s1state.authNext || {};
  const fk = d.fk || '';
  s1state.acctPw = '';
  // ISA 가입서류 제출 플로우: 인증 완료 → 신청현황 조회(로딩) → 신청현황
  if(d.go==='iodcheck' && d.isa){ startIsaCheck(); return; }
  // 증명서 발급 현황 플로우: 인증 완료 → 발급현황 조회(로딩) → 발급현황
  if(d.go==='iodcheck' && d.cert){ startCertCheck(); return; }
  // 입출금 안내 플로우: 인증 완료 → 계좌 상태 확인(로딩) → 결과
  if(d.go==='iodcheck'){ startIodCheck(); return; }
  // 체결·주문내역 조회(디지털ARS): 계좌 인증 완료 → 체결내역 화면
  if(d.go==='chefilled'){ s1nav({page:'result', resultKey:'filled', title:'체결 내역', noBack:false, noHome:true}); s1state.history=[]; return; }
  // 보이는 ARS 일반주문 → 주문화면 / 그 외 대메뉴 → 중메뉴 리스트
  if(d.go==='order'){ resetOrder();
    if(d.stock){ const info = stockInfo(d.stock); orderState.stock = {nm:d.stock, cur:info.cur, chg:info.chg, pct:info.pct, tick:info.tick}; }
    s1nav({page:'order', title:'일반주문'}); return; }
  // 다른계좌주문: 인증 후 클릭했던 주문화면으로 복귀 (종목 초기화)
  if(d.go==='reorder'){ resetOrder(); orderState.side=d.side||'buy'; orderState.solo=!!d.solo;
    s1nav({page: d.page||'order', title: d.title || ORDER_TITLE[orderState.side] || '일반주문'}); return; }
  // 전체메뉴 일반주문 중메뉴: 인증 후 해당 주문화면/소메뉴 화면으로 이동
  if(d.go==='orderopen'){ resetOrder(); orderState.side=d.side; orderState.solo=true;
    orderState.tabs = ORDER_SUBTABS[d.ordertitle] || null; orderState.tabSel = 0;
    s1nav({page:'order', title: d.ordertitle || '일반주문'}); return; }
  if(d.go==='ivsub'){ s1nav({page:'ivsub', ivI:d.ivI, ivJ:d.ivJ, title:stripNum((IVR[d.ivI].subs[d.ivJ]||{}).t||'상세')}); return; }
  if(d.go==='daeacc'){ s1nav({page:'daeacc', ivI:d.ivI, midOpen:-1, title: fk}); return; }
  // 자주 찾는 서비스 화면: 뒤로가기 + 전체메뉴 + 홈 모두 표시
  if(d.go==='list')        s1nav({page:'list',  listKey: fk, title: fk, noBack:false, noHome:false});
  else if(d.go==='sise')   s1nav({page:'sise',  title: fk || '시세/지수조회', noBack:false, noHome:false});
  else if(d.go==='index')  s1nav({page:'index', title: fk || '국내지수', noBack:false, noHome:false});
  else                     s1nav({page:'result',resultKey: d.rk, title: fk, noBack:false, noHome:false});
  // 홈에서 진입한 경우 뒤로가기가 인증화면이 아닌 홈으로 향하도록 히스토리 정리
  if(!deep) s1state.history = [];
}
function pageTop(title, hideTitle, rightHtml){
  // 세부페이지는 우상단 버튼 숨김 / 그 외에는 전체메뉴 버튼만 표시. rightHtml 지정 시 우측 슬롯에 커스텀 요소(예: 결과화면 새로고침)
  const right = rightHtml || (s1state.noHome ? '' : `<div class="back" data-menu title="전체메뉴">${I.menu}</div>`);
  const back = s1state.noBack ? '' : `<div class="back" data-s1back>${I.back}</div>`;
  return `<div class="page-top${hideTitle ? ' iod-top' : ''}">
    ${back}
    <div class="page-title">${hideTitle ? '' : title}</div>
    <div class="head-spacer"></div>
    ${right}
  </div>`;
}

function renderS1(){
  const v = document.getElementById('s1view');
  const flowEl = v && v.closest('.flow'); if(flowEl) flowEl.classList.toggle('toss', isV40());   // Ver 4.0 계열 토스 스킨 (전 화면 var() 토큰 오버라이드)
  if(flowEl){ flowEl.classList.toggle('v45', isV45()); }   // Ver 4.5 인디고 팔레트 오버라이드
  if(flowEl){ flowEl.classList.toggle('v46', isV46()); }   // Ver 4.6 전용 CSS 스코프
  if(flowEl){ flowEl.classList.toggle('v47', isV47()); }   // Ver 4.7 전용 CSS 스코프
  let html = '';
  if(s1state.page==='home'){
    /* 자주 찾는 서비스 9개로 한눈에 구성 */
    // Ver 2.1은 9번째 셀(간편/공동인증 관리)을 셀프서비스 메뉴구조도 9번 '권리업무'로 대체 (v11 등 다른 버전은 원본 유지)
    const favSrc = (isV21Ver())
      ? FAV.map((f,i)=> i===8 ? {k:'권리업무', lb:'권리업무', ic:'ipo', go:'result', rk:'rights'}
                      : i===0 ? {k:'ID·계좌조회 PW재설정', lb:'ID·계좌조회<br>PW재설정', ic:'key', go:'result', rk:'idpw'}
                      : f)
      : FAV;
    const favGrid = `<div class="fav-grid">` + favSrc.map((f,i)=>
          `<div class="fav" data-fav data-s1go="${f.go}" data-fk="${f.k}"${f.rk?` data-rk="${f.rk}"`:''}><div class="ic">${I[f.ic]}</div><div class="lb">${f.lb||f.k}</div></div>`
        ).join('') + `</div>`;
    const chargeNote = `<div class="home-bottom">`
        + `<div class="charge"><svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg><span>이동통신망 이용 시 데이터 통화료가 부과될 수 있습니다</span></div>`
      + `</div>`;
    if(s1Ver==='v1'){
      /* Ver 1.0 · 과거 메인 (자주 찾는 서비스 6개 + 더보기 + 보이는 ARS + 이벤트 배너 + 푸터) — 화면구현 */
      const fav6 = `<div class="fav-grid">` + FAV.slice(0,5).map(f=>
            `<div class="fav" data-fav data-s1go="${f.go}" data-fk="${f.k}"${f.rk?` data-rk="${f.rk}"`:''}><div class="ic">${I[f.ic]}</div><div class="lb">${f.lb||f.k}</div></div>`
          ).join('')
        + `<div class="fav fav-more-cell" data-favmore><div class="ic">${I.chev}</div><div class="lb">더보기</div></div>`
        + `</div>`;
      html = `<div class="home-wrap">`
        + header('ARS', true) + noticeCard()
        + `<div class="sec-title home-sec">자주 찾는 서비스</div>`
        + fav6
        + `<div class="sec-title home-sec">보이는 ARS</div>`
        + renderIvr()
        + banner()
        + appFooter()
        + `</div>`;
    } else if(isV40()){
      /* Ver 4.0 계열 · 토스 스타일 디지털 ARS (포인트=키움 마젠타·네이비) — 9 카테고리(ARS_CAT6). v40=토스 리스트 / v41=3×3 그리드. 드릴다운·전체메뉴없음 공통. */
      const path = s1state.sarsPath || [];
      // 우상단 큰글씨 on/off 스위치 (기존 전역 bigFont+applyScale 재사용)
      // Ver 4.5: ON/OFF 글자 토글 스위치 / 그 외 버전: 기존 아이콘+라벨 토글
      const bf = isV45()
        ? `<div class="bigfont-switch ${bigFont?'on':''}" data-bigfont role="switch" aria-checked="${bigFont?'true':'false'}" title="큰글씨 ${bigFont?'끄기':'켜기'}"><span class="bfs-label">큰글씨</span><span class="bfs-track"><span class="bfs-txt bfs-on">ON</span><span class="bfs-txt bfs-off">OFF</span><span class="bfs-knob"></span></span></div>`
        : `<div class="bigfont-toggle ${bigFont?'on':''}" data-bigfont title="큰글씨 ${bigFont?'끄기':'켜기'}"><svg class="bf-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 13h6"/><path d="m2 16 4.5-11 4.5 11"/><path d="M18 16V7"/><path d="m14 11 4-4 4 4"/></svg><span class="bf-t">큰글씨</span></div>`;
      // 우상단 사고신고 아이콘 → 사고등록 매체 플로팅(ACC_SHEET) 재사용
      const accReport = `<div class="acc-report" data-mediasheet="accident" title="사고신고" role="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span class="acc-report-t">사고신고</span></div>`;
      // Ver 4.0 메인화면(대메뉴 목록)에만 적용하는 여백·폰트 정리 훅 (v41 그리드·v42·드릴다운 미적용)
      const v40main = (s1Ver==='v40' && path.length===0) ? ' v40main' : '';
      html = `<div class="home-wrap toss-home${bigFont?' bigfont':''}${v40main}">`;
      if(path.length===0){
        // 상단 로고~인사말은 고정(sticky), 아래 FAQ·카테고리 리스트만 스크롤
        html += `<div class="toss-stick"><div class="toss-top"><div class="toss-logo"><img src="assets/kiwoom-logo.png" alt="키움증권"></div><div class="th-right">${bf}${isV45()?'':accReport}</div></div>`   // Ver 4.5: 사고신고 아이콘 제거
          + `<div class="toss-hero${isV47()?' v47-hero':''}"><div class="th-hi">안녕하세요,<br>무엇을 도와드릴까요?</div></div></div>`
          + (isV45() ? v45SelfSolve() : tossFaqCard())
          + (isV47() ? v47Grid() : isV46() ? v46FlatMenu() : isV45() ? (v45MenuTabs() + v45Menu()) : (s1Ver==='v41' && !bigFont) ? tossCatGrid() : tossCatList());   // v47: 3×3 그리드 / v46: 탭없이 전체 flat / v45: 탭(공통/증권/금융상품)메뉴 / v41: 3×3 그리드 / v40: 리스트
      } else {
        // 드릴다운 헤더: 현재 단계 이름을 타이틀로(대메뉴 진입 시 = 대메뉴명), 대메뉴 단계면 설명글도 표기
        const dtrail = sarsWalk(catData(), path).trail;
        const dcur = dtrail[dtrail.length-1] || {t:''};
        const dtitle = stripNum(dcur.t);
        const ddesc = (path.length===1) ? (catDesc()[path[0]] || '') : '';
        // 뒤로가기~제목·설명은 고정(sticky), 아래 중메뉴 리스트만 스크롤
        html += `<div class="toss-stick"><div class="toss-top"><div class="toss-back" data-sarsup title="이전">${I.chev}</div><div class="head-spacer"></div></div>`
          + `<div class="toss-dhead"><div class="td-title">${dtitle}</div>${ddesc?`<div class="td-desc">${ddesc}</div>`:''}</div></div>`
          + `<div class="toss-drill">`
          + renderSimpleArs() + `</div>`;
      }
      html += `</div>`;
    } else {
      /* V2.1은 인사글+탭 위에 콘텐츠가 쌓여 스크롤 발생 → v21home(인사글 축소, 전 탭) + v21self(셀프 9그리드 축소)로 한 화면에 */
      let wrapCls = 'home-wrap';
      if(isV21Ver()){ wrapCls += ' v21home'; if((s1state.v21Tab||'self')==='self') wrapCls += ' v21self'; }
      html = `<div class="${wrapCls}">`
        + header('ARS', true) + noticeCard()
        + `<div class="home-guide"><div class="hg-hi">안녕하세요, 키움증권입니다</div><div class="hg-sub">이용하실 서비스를 선택해 주세요</div></div>`;
      if(isV21Ver()){
        /* V2.1 (ECS 피드백 반영): 인사글 아래 셀프서비스/ARS메뉴/상담원연결 인라인 탭 */
        const vt = s1state.v21Tab || 'self';
        const tabs = [['self','셀프서비스'],['ars','ARS메뉴'],['staff','상담원연결']];
        html += `<div class="v21-tabs">` + tabs.map(([k,nm])=>
            `<div class="hoga-tab ${k===vt?'on':''}" data-v21tab="${k}">${nm}</div>`).join('') + `</div>`;
        if(vt==='self')      html += favGrid + chargeNote;
        else if(vt==='ars')  html += `<div class="v21-pane"><div class="v21-arspanel">` + renderSimpleArs() + `</div></div>`;   // 시안2 화면2 인라인영역(연보라 패널)
        else                 html += `<div class="v21-pane"><div class="v21-arspanel">` + renderStaffTree() + `</div></div>`;   // 상담원연결도 동일 보라 패널
      } else {
        html += favGrid + chargeNote;
      }
      html += `</div>`;
    }
  }
  else if(s1state.page==='v47cat' && isV47()){
    html = v47SubMenuPage();
  }
  else if(s1state.page==='ssmore'){
    html = renderSsMore();
  }
  else if(s1state.page==='authsel'){
    html = isCheAuth()
      ? `<div class="acv-wrap"><div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>` + authSelect() + `</div>`
      : pageTop(s1state.title||'본인인증', isIodFlow()) + (isIodFlow()?untactSteps(iodStepsFor(),0):'') + authSelect();
  }
  else if(s1state.page==='authstep'){
    if(isV45() && !isCheAuth() && s1state.authMethod==='account'){
      // Ver 4.5 자가해결 계좌인증: 세그먼트 스텝퍼 상단바 + 계좌인증(기존 untactSteps 대체). 메인·드릴다운과 동일 그라데이션 배경(.v45-authpage)
      html = `<div class="v45-authpage">` + v45AuthTop() + authStep(s1state.authMethod) + `</div>`;
    } else {
      html = isCheAuth()
        ? `<div class="acv-wrap"><div class="toss-top"><div class="toss-back" data-s1back title="이전">${I.chev}</div><div class="head-spacer"></div></div>` + authStep(s1state.authMethod) + `</div>`
        : pageTop(s1state.title||'본인인증', isIodFlow() || (isCertFlow()&&s1Ver==='v40')) + (((isIsaFlow()&&s1Ver!=='v40')||(isCertFlow()&&s1Ver!=='v40'))?untactSteps(iodStepsFor(),0):'') + authStep(s1state.authMethod);   // 순수 '입출금'·v40 서류발급현황·v40 ISA는 진행바 없음(v41·v42 ISA/증명서만 표시), v40 cert/isa는 iod-top(25px 정렬)
    }
  }
  else if(s1state.page==='iodacctsel'){
    html = renderIodAcctSel();
  }
  else if(s1state.page==='idpwauth'){
    html = isV45() ? renderIdpwAuth() : pageTop(s1state.title||'본인인증', true) + renderIdpwAuth();
  }
  else if(s1state.page==='idpwdone'){
    html = isV45() ? renderIdpwDone() : pageTop(s1state.title||'본인 확인', true) + renderIdpwDone();
  }
  else if(s1state.page==='idpwfinish'){
    html = `<div class="iod-done-center v45-authpage"><div class="iod-done"><div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div><div class="iod-done-t">재설정이 완료됐어요</div><div class="iod-done-d">ID 비밀번호가 재설정됐어요.<br>새 비밀번호로 로그인해 주세요.</div></div><div class="iod-done-btnwrap"><div class="primary-btn v45-iod-btn" data-iodhome>확인</div></div></div>`;
  }
  else if(s1state.page==='iodpurposedone'){
    html = renderIodPurposeDone();
  }
  else if(s1state.page==='certreissuedone'){
    html = renderCertReissueDone();
  }
  else if(s1state.page==='voiceconnect'){
    html = renderVoiceConnect();
  }
  else if(s1state.page==='voicedone'){
    html = renderVoiceDone();
  }
  else if(s1state.page==='herodone'){
    html = renderHeroDone();
  }
  else if(s1state.page==='iddone'){
    html = renderIdDone();
  }
  else if(s1state.page==='isacheck'){
    html = renderIsaChecking();
  }
  else if(s1state.page==='certcheck'){
    html = renderCertChecking();
  }
  else if(s1state.page==='certstatus'){
    html = renderCertStatus();
  }
  else if(s1state.page==='certreissue'){
    html = renderCertReissue();
  }
  else if(s1state.page==='isaresult'){
    html = renderIsaResult();
  }
  else if(s1state.page==='isasubmit'){
    html = renderIsaSubmit();
  }
  else if(s1state.page==='isaissue'){
    html = renderIsaIssue();
  }
  else if(s1state.page==='iodcheck'){
    html = renderIodChecking();
  }
  else if(s1state.page==='iodresult'){
    html = renderIodResult();
  }
  else if(s1state.page==='favmore'){
    /* 전체 자주 찾는 서비스 (더보기 → 9개 전체 + 빈 아이콘 추가 슬롯 3개) */
    const empties = Array.from({length:3}).map(()=>
        `<div class="fav empty" data-favadd><div class="ic">${I.plus}</div><div class="lb">추가</div></div>`).join('');
    html = pageTop('자주 찾는 서비스')
      + `<div class="fav-grid" style="padding-top:6px">` + FAV.map(f=>
          `<div class="fav" data-fav data-s1go="${f.go}" data-fk="${f.k}"${f.rk?` data-rk="${f.rk}"`:''}><div class="ic">${I[f.ic]}</div><div class="lb">${f.lb||f.k}</div></div>`
        ).join('') + empties + `</div>`;
  }
  else if(s1state.page==='cat'){
    const tabs = Object.keys(CATS);
    html = header('ARS') + noticeCard()
      + `<div class="cat-tabs">` + tabs.map(t=>
          `<div class="cat-tab ${t===s1state.cat?'on':''}" data-cat="${t}">${t}</div>`
        ).join('') + `</div>`
      + `<div class="grid9">` + CATS[s1state.cat].map(c=>
          `<div class="cell" data-s1go="sise" data-fk="${c.k}"><div class="ic">${I[c.ic]}</div><div class="lb">${c.k}</div></div>`
        ).join('') + `</div>` + banner();
  }
  else if(s1state.page==='sise'){
    html = pageTop(s1state.title||'시세/지수조회')
      + `<div class="list">` + SISE.map(s=>
          `<div class="row" data-s1go="index" data-fk="${s.k}"><div class="ic">${I[s.ic]}</div>
            <div class="tx"><div class="t">${s.k}</div><div class="d">${s.d}</div></div>
            <div class="chev">${I.chev}</div></div>`
        ).join('') + `</div>`;
  }
  else if(s1state.page==='list'){
    const rows = DETAIL[s1state.listKey] || [];
    html = pageTop(s1state.listKey)
      + `<div class="list">` + rows.map(r=>
          `<div class="row" data-s1go="result" data-rk="${r.go}" data-fk="${r.k}"><div class="ic">${I[r.ic]}</div>
            <div class="tx"><div class="t">${r.k}</div><div class="d">${r.d}</div></div>
            <div class="chev">${I.chev}</div></div>`
        ).join('') + `</div>`;
  }
  else if(s1state.page==='result'){
    // Ver 4.0 계열 · 금융거래목적확인서(purpose)는 [입출금] 플로우와 동일 디자인 적용
    if(isV40() && s1state.resultKey==='purpose'){
      html = renderIodPurpose();
    } else if(isV40() && s1state.resultKey==='filled'){
      html = renderFilledV40();   // Ver 4.0 · 체결내역(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='holdings'){
      html = renderHoldingsV40();   // Ver 4.0 · 예수금·주문가능금액(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='balance'){
      html = renderBalanceV40();    // Ver 4.0 · 주식·신용·금융상품 잔고(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='trades'){
      html = renderTradesV40();     // Ver 4.0 · 거래내역(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='misu'){
      html = renderMisuV40();       // Ver 4.0 · 미수·반대매매(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='myacct'){
      html = renderMyAcctV40();     // Ver 4.0 · 계좌번호·MY계좌 정보(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='ipo'){
      html = renderIpoV40();        // Ver 4.0 · 공모주 청약(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='rights'){
      html = renderRightsV40();     // Ver 4.0 · 유상청약(디지털ARS 조회) 전용 화면
    } else if(isV40() && s1state.resultKey==='certv40'){
      html = renderCertV40();       // Ver 4.0 · 증명서 발급(디지털ARS) 전용 화면
    } else if(isV40() && s1state.resultKey==='docsubmit'){
      html = renderDocSubmitV40();  // Ver 4.0 · 서류 제출(디지털ARS, docLabel 기반) 전용 화면
    } else if(isV40() && s1state.resultKey==='applygroup'){
      html = renderApplyGroupV40(); // Ver 4.0 · 업무신청(디지털ARS, applyGroup 기반) 전용 화면
    } else if(isV40() && s1state.resultKey==='infolist'){
      html = renderInfoListV40();   // Ver 4.0 · 공지·이용안내(디지털ARS, infoKey 기반) 전용 화면
    } else {
      const render = RESULT[s1state.resultKey];
      html = pageTop(s1state.title||'조회 결과')
        + (render ? render() : `<div class="notice">준비 중인 화면입니다.</div>`);
    }
  }
  else if(s1state.page==='index'){
    html = pageTop(s1state.title||'국내지수') + indexResult();
  }
  else if(s1state.page==='daeacc'){
    const dae = IVR[s1state.ivI];
    html = pageTop(s1state.title || (dae?stripNum(dae.t):'메뉴'))
      + (dae ? renderMidAcc(s1state.ivI) : `<div class="notice">준비 중인 화면입니다.</div>`);
  }
  else if(s1state.page==='order'){
    html = pageTop(s1state.title||'일반주문') + orderScreen();
  }
  else if(s1state.page==='creditbuy' || s1state.page==='creditsell'){
    // 자기융자매수 / 자기융자 매도상환: 종목검색 + (검색 시) 주문 카드
    const sel = orderState.stock;
    const stockCell = sel
      ? `<span class="stk-nm">${sel.nm}</span><span class="stk-x" data-creditclear title="종목 지우기">${I.x}</span>`
      : `<span class="ph">종목명을 검색하세요</span>`;
    const searchBar = `<div class="stk-find" data-stocksearch>${I.search}${stockCell}</div>`;
    const sideCls = orderState.side==='sell' ? 'sell' : 'buy';
    const sideNm = orderState.side==='sell' ? '매도' : '매수';
    const doneMsg = (sel && orderState.done)
      ? `<div class="ord-done ${sideCls}" style="margin:2px 16px 0">주문번호 ${orderState.done}번으로 주문이 완료되었습니다.</div>
         <div class="ord-acts row" style="margin:9px 16px 4px">
           <div class="ord-act" data-orderagain>추가${sideNm}</div>
           <div class="ord-act" data-ordfilled>체결내역</div>
           <div class="ord-act" data-ordacct>다른계좌주문</div>
           <div class="ord-act" data-arspop="직원연결">직원연결</div>
         </div>`
      : '';
    // 종목 검색 전에도 주문 카드 표시 (현재가 카드는 종목 선택 후)
    html = pageTop(s1state.title||'신용주문') + searchBar + creditOrderCard(sel ? sel.nm : null) + doneMsg;
  }
  else if(s1state.page==='agent'){
    html = isV40() ? renderAgentV40(s1state.agentLabel)   // Ver 4.0: 토스 헤더(타이틀·햄버거 없음)+좌 24px 정렬
                   : pageTop(s1state.title||'상담원 연결') + agentConnectScreen(s1state.agentLabel);
  }
  else if(s1state.page==='voice'){
    html = isV40() ? renderVoiceV40()   // Ver 4.0: 토스 헤더 + 중앙정렬 음성 ARS 연결 화면
                   : pageTop(s1state.title||'음성 ARS 연결') + voiceConnectScreen();
  }
  else if(s1state.page==='ivmid'){
    const dae = IVR[s1state.ivI];
    html = pageTop(s1state.title || (dae?stripNum(dae.t):'주문'))
      + (dae ? ivMidPage(s1state.ivI) : `<div class="notice">준비 중인 화면입니다.</div>`);
  }
  else if(s1state.page==='ivsub'){
    const mid = (IVR[s1state.ivI]||{}).subs ? IVR[s1state.ivI].subs[s1state.ivJ] : null;
    html = pageTop(s1state.title||'메뉴 선택')
      + (mid ? ivSubPage(mid) : `<div class="notice">준비 중인 화면입니다.</div>`);
  }
  else if(s1state.page==='allmenu'){
    html = `<div class="allmenu-head">
      <div class="page-top allmenu-top">
        <div class="back" data-s1back>${I.back}</div>
        <div class="page-title">전체메뉴</div>
        <div class="head-spacer"></div>
        <div class="back" data-home title="홈">${I.home}</div>
      </div>
      ${amPills()}
    </div>` + renderAllMenu();
  }
  v.innerHTML = html;
  setTab('s1', s1state.page==='home'?'home':'');
  if(isV45() && s1state.page==='home') requestAnimationFrame(initSsBanner);
  // 휴대폰 인증번호 화면이면 카운트다운 시작
  if(s1state.page==='authstep' && s1state.authMethod==='phone' && s1state.otpSent){ startOtpTimer(180); }
  // Ver 4.5 계좌인증: 계좌번호 입력 시 확인버튼 활성/비활성 실시간 동기화
  if(s1state.page==='authstep' && isV45() && s1state.authMethod==='account'){
    const a = document.getElementById('acctNo');
    if(a) a.addEventListener('input', v45AuthBtnSync);
    v45AuthBtnSync();
  }
}

function indexResult(){
  return `<div class="seg">
      <button class="on">국내지수</button><button>해외지수</button>
    </div>
    <div class="select-box">코스피 ${I.down}</div>
    <div class="data-card">
      <div class="data-row"><div class="k">지수(전일대비)</div><div class="v up">2,025.08 ▲15.95</div></div>
      <div class="data-row"><div class="k">거래량(천주)</div><div class="v">179,910</div></div>
      <div class="data-row"><div class="k">거래대금(백만)</div><div class="v">1,533,276</div></div>
      <div class="data-row"><div class="k">상승 종목 수</div><div class="v up">486</div></div>
      <div class="data-row"><div class="k">하락 종목 수</div><div class="v down">300</div></div>
      <div class="data-row"><div class="k">보합 종목 수</div><div class="v">101</div></div>
      <div class="data-row"><div class="k">상한가 종목 수</div><div class="v">0</div></div>
      <div class="data-row"><div class="k">하한가 종목 수</div><div class="v">0</div></div>
    </div>`;
}

/* ===== 지수정보 안내 → 소메뉴 예시 화면 =====
   (간편모드/거래시황·등락현황 참고) */
const IDX = {
  idxKospi:{name:'종합주가 지수', value:'2,025.08', chg:'15.95', pct:'+0.79%', up:true,
    dayLow:'2,008.40', dayHigh:'2,031.55', yearLow:'1,920.30', yearHigh:'2,090.66', pos:72,
    m1:'거래량', m1v:'179,910천주', m2:'거래대금', m2v:'1,533,276백만'},
  idxKosdaq:{name:'코스닥 지수', value:'698.42', chg:'3.21', pct:'-0.46%', up:false,
    dayLow:'695.10', dayHigh:'704.80', yearLow:'650.22', yearHigh:'905.40', pos:34},
  idxKospi200:{name:'코스피 200', value:'338.15', chg:'2.64', pct:'+0.79%', up:true,
    dayLow:'335.20', dayHigh:'339.40', yearLow:'300.18', yearHigh:'360.55', pos:70},
};

/* 거래시황 스타일 — 지수 현재가 + 1일/1년 범위 */
function idxQuote(c){
  const cls = c.up?'up':'down', sign = c.up?'▲':'▼';
  return `<div class="idx-quote">
    <div class="qname">${c.name}</div>
    <div class="qval ${cls}">${c.value}</div>
    <div class="qchg ${cls}">${sign} ${c.chg} (${c.pct})</div>
    <div class="idx-hl">
      <div class="c"><div class="l">${c.m1||'1일 최저'}</div><div class="n">${c.m1v||c.dayLow}</div></div>
      <div class="c"><div class="l">${c.m2||'1일 최고'}</div><div class="n">${c.m2v||c.dayHigh}</div></div>
    </div>
    <div class="idx-realbtn" data-arspop="직원연결">직원연결</div>
  </div>`;
}

/* 등락현황 스타일 — 종목등락현황 표 */
function riseFallTable(){
  const rows = [
    {gu:'코스피', sh:4, up:46,  fl:13, dn:859,   lh:0},
  ];
  return `<div class="rf-card">
    <div class="rf-title">종목등락현황</div>
    <table class="rf-table">
      <tr><th>구분</th><th>상한</th><th>상승</th><th>보합</th><th>하락</th><th>하한</th></tr>
      ${rows.map(r=>`<tr>
        <td class="gu">${r.gu}</td>
        <td class="rf-up">${r.sh}</td>
        <td class="rf-up">${r.up}</td>
        <td class="flat">${r.fl}</td>
        <td class="rf-down">${won(r.dn)}</td>
        <td class="rf-down">${r.lh}</td>
      </tr>`).join('')}
    </table>
  </div>`;
}

function idxScene(key){
  const c = IDX[key];
  if(!c) return `<div class="notice">준비 중인 화면입니다.</div>`;
  return idxQuote(c) + riseFallTable();
}
RESULT.idxKospi     = ()=>idxScene('idxKospi');
RESULT.idxKosdaq    = ()=>idxScene('idxKosdaq');
RESULT.idxKospi200  = ()=>idxScene('idxKospi200');

/* ============================================================
   시안 2 화면 렌더 (인라인 확장)
   ============================================================ */
const s2state = {open:0, page:'list', title:''};

function renderS2(){
  const v = document.getElementById('s2view');
  if(s2state.page==='index'){
    v.innerHTML = `<div class="page-top"><div class="back" data-s2back>${I.back}</div><div class="page-title">${s2state.title}</div></div>` + indexResult();
    setTab('s2','');
    return;
  }
  let html = header('ARS')
    + `<div class="sec-title">이용하실 메뉴를 선택해 주세요</div>`
    + `<div class="list">` + INLINE.map((c,i)=>{
        const open = i===s2state.open;
        return `<div class="acc ${open?'open':''}">
          <div class="acc-head" data-acc="${i}">
            <div class="ic">${I[c.ic]}</div>
            <div class="t">${c.k}</div>
            <div class="arw">${I.down}</div>
          </div>
          <div class="acc-body">` + c.subs.map(s=>
            `<div class="sub-item" data-s2go data-fk="${s.t}">
              <div><div class="si-t">${s.t}</div><div class="si-d">${s.d}</div></div>
              <div class="chev">${I.chev}</div></div>`
          ).join('') + `</div></div>`;
      }).join('') + `</div><div style="height:14px"></div>`;
  v.innerHTML = html;
  setTab('s2','home');
}

/* ============================================================
   삼성증권 · 보이는 ARS (레퍼런스 목업)
   메인 → [시세/투자정보] → 참고1(주식현재가/투자정보 메뉴)
        → [코스피지수안내] → 참고2(코스피지수안내)
        → [등락종목안내] → 참고3(등락 종목 안내) → [이전단계] 복귀
   ============================================================ */
const SAM_I = {
  headset: I.headset,
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0113 0"/></svg>',
  menu: I.menu,
  back: I.back,
  home: I.home,
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3M8.5 21h7"/></svg>',
  agent: I.headset,
  callend:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3l1.8 4.5-2.2 1.4a11 11 0 005.5 5.5l1.4-2.2L19 16v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/><path d="M16 4l5 5M21 4l-5 5"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0113.7-5.7L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 01-13.7 5.7L4 16"/><path d="M4 20v-4h4"/></svg>',
  down: I.down,
  chev: I.chev,
};

/* 메인 9분할 그리드 (삼성증권_메인) */
const SAM_GRID = [
  {k:'주문',                 ic:'order'},
  {k:'시세 / 투자정보',      ic:'chart',    go:'sise'},
  {k:'거래내역 / 잔고',      ic:'wallet'},
  {k:'이체 / 청약',          ic:'transfer'},
  {k:'ISA',                  ic:'isa',      n:true},
  {k:'금융상품 / CMA',       ic:'fund'},
  {k:'사고 / 기타업무',      ic:'bell'},
  {k:'보이스피싱',           ic:'shield'},
  {k:'비대면 계좌\n개설안내', ic:'idcard'},
];

/* 참고1 좌측 카테고리 / 우측 메뉴 */
const SAM_SIDE = ['주문','주식현재가 / 투자정보','거래내역 / 잔고','이체 / 청약','ISA','금융상품 / CMA','사고 / 기타업무'];
const SAM_SISE = [
  {t:'현재가 / 호가 안내'},
  {t:'보유종목현재가조회'},
  {t:'관심종목 조회 / 등록 / 삭제'},
  {t:'코스피지수안내', go:'kospi'},
  {t:'코스닥지수안내'},
  {t:'코스피200지수 / 선물시세 안내'},
  {t:'해외지수안내'},
  {t:'매매동향/환율안내', arw:'down'},
];

/* 참고2·3 조회결과 데이터 */
const SAM_KOSPI = [
  {k:'현재지수', v:'8,203.84 (▼910.71)', cls:'down'},
  {k:'거래량',   v:'483,711 천주'},
  {k:'거래대금', v:'598,624 억원'},
];
const SAM_UPDOWN = [
  {k:'상승종목', v:'상한가 4종목 포함 46종목'},
  {k:'하락종목', v:'하한가 없이 859종목'},
  {k:'보합종목', v:'13종목'},
];

const samState = {page:'main'};
const SAM_BACK = {sise:'main', kospi:'sise', updown:'kospi'};

function samNav(p){ samState.page = p; renderSam(); }

/* 상단 보이는 ARS 다크바 (공통) */
function samArsBar(){
  return `<div class="sam-arsbar">
    <div class="l">${SAM_I.headset} 보이는 ARS</div>
    <div class="r" data-samend>${SAM_I.close} 닫기</div>
  </div><div class="sam-topline"></div>`;
}
/* 하단 바 (공통) */
function samBottom(){
  return `<div class="sam-bottom">
    <div class="b" data-samtab="음성 ARS로 연결합니다. 잠시만 기다려 주세요.">${SAM_I.mic} 음성ARS</div>
    <div class="b" data-samtab="상담원을 연결합니다. 잠시만 기다려 주세요.">${SAM_I.agent} 상담연결</div>
    <div class="b" data-samtab="통화를 종료합니다. 이용해 주셔서 감사합니다.">${SAM_I.callend} 통화종료</div>
  </div>`;
}
/* 서브 헤더 (back · 타이틀 · home) */
function samSubHead(title){
  return `<div class="sam-subhead">
    <div class="ico" data-samback>${SAM_I.back}</div>
    <div class="ttl">${title}</div>
    <div class="ico" data-samhome>${SAM_I.home}</div>
  </div>`;
}

/* 삼성증권 참고: 실제 캡쳐본 플로우 (메인→참고1→참고2→참고3) + 클릭 핫스팟
   l/t/w/h = 이미지 대비 %, go = 클릭 시 이동 페이지 */
const SAM_HOME = {l:83, t:10.5, w:15, h:7, go:'main'};   // 우측 상단 홈 아이콘 → 메인
const SAM_CAP = {
  main:   {img:'삼성증권_메인.jpeg',  hots:[{l:33.5, t:20, w:33, h:15, go:'sise'}]},          // [시세/투자정보]
  sise:   {img:'삼성증권_참고1.jpeg', hots:[{l:34,   t:42, w:64, h:6,  go:'kospi'}, SAM_HOME]},  // [코스피지수안내] + 홈
  kospi:  {img:'삼성증권_참고2.jpeg', hots:[{l:2,    t:47, w:96, h:6,  go:'updown'}, SAM_HOME]}, // [등락종목안내] + 홈
  updown: {img:'삼성증권_참고3.jpeg', hots:[{l:2,    t:47, w:96, h:6,  go:'kospi'}, SAM_HOME]},  // [이전단계] + 홈
};
function renderSam(){
  const root = document.getElementById('samscreen');
  if(!root) return;
  const cap = SAM_CAP[samState.page] || SAM_CAP.main;
  root.innerHTML = `<div class="sam-cap">
    <img src="레퍼런스/${cap.img}" alt="삼성증권 보이는 ARS 참고">
    ${cap.hots.map(h=>`<div class="sam-hot" data-samgo="${h.go}" style="left:${h.l}%;top:${h.t}%;width:${h.w}%;height:${h.h}%"></div>`).join('')}
  </div>`;
}

/* NH투자증권 참고: 단일 캡쳐(3화면 가로배치)를 배경 크롭으로 한 화면씩 표시 + 핫스팟
   pos = background-position-x, hots = 핫스팟(%, go=다음 단계) */
const NH_STEPS = {
  main: {pos:'0%',   hots:[{l:6,  t:40, w:42, h:15, go:'menu'}]},   // [ARS 메뉴]
  menu: {pos:'50%',  hots:[{l:66, t:40, w:31, h:16, go:'auth'}]},   // [계좌조회]
  auth: {pos:'100%', hots:[{l:8,  t:46, w:84, h:8,  go:'main'}]},   // [확인] → 메인
};
const nhState = {page:'main'};
function nhNav(p){ nhState.page = p; renderNH(); }
function renderNH(){
  const root = document.getElementById('nhscreen');
  if(!root) return;
  const st = NH_STEPS[nhState.page] || NH_STEPS.main;
  root.innerHTML = `<div class="nh-cap" style="background-position-x:${st.pos}">`
    + st.hots.map(h=>`<div class="sam-hot" data-nhgo="${h.go}" style="left:${h.l}%;top:${h.t}%;width:${h.w}%;height:${h.h}%"></div>`).join('')
    + `</div>`;
}

/* 한국투자증권 참고: 메인→메뉴 캡쳐 + 클릭 핫스팟 (주문·청약·펀드매매 → 현금매도) */
const HK_CAP = {
  main: {img:'한국투자증권_메인.PNG', hots:[{l:7,  t:30, w:86, h:9, go:'menu'}]},   // [주문, 청약, 펀드매매]
  menu: {img:'한국투자증권_메뉴.PNG', hots:[{l:33, t:28, w:64, h:8, go:'main'}]},   // [현금매도] → 메인
};
const hkState = {page:'main'};
function hkNav(p){ hkState.page = p; renderHK(); }
function renderHK(){
  const root = document.getElementById('hkscreen');
  if(!root) return;
  const cap = HK_CAP[hkState.page] || HK_CAP.main;
  root.innerHTML = `<div class="sam-cap">
    <img src="레퍼런스/${cap.img}" alt="한국투자증권 보이는 ARS 참고">
    ${cap.hots.map(h=>`<div class="sam-hot" data-hkgo="${h.go}" style="left:${h.l}%;top:${h.t}%;width:${h.w}%;height:${h.h}%"></div>`).join('')}
  </div>`;
}

/* 키움증권 참고(현행 ASIS): 메인 → 일반주문 → 현금매도 캡쳐 + 클릭 핫스팟 */
const KW_CAP = {
  main:  {img:'키움증권_ASIS(1).jpeg', hots:[{l:2,  t:27,   w:96, h:6,   go:'order'}]},  // [2. 일반주문]
  order: {img:'키움증권_ASIS(2).jpeg', hots:[{l:2,  t:25.3, w:96, h:5.6, go:'sell'}]},   // [2.1. 현금매도]
  sell:  {img:'키움증권_ASIS(3).jpeg', hots:[{l:25, t:58,   w:37, h:5.5, go:'main'}]},   // [통화연결] → 메인
};
const kwState = {page:'main'};
function kwNav(p){ kwState.page = p; renderKiwoom(); }
function renderKiwoom(){
  const root = document.getElementById('kwscreen');
  if(!root) return;
  const cap = KW_CAP[kwState.page] || KW_CAP.main;
  root.innerHTML = `<div class="sam-cap">
    <img src="레퍼런스/${cap.img}" alt="키움증권 현행 보이는 ARS 참고">
    ${cap.hots.map(h=>`<div class="sam-hot" data-kwgo="${h.go}" style="left:${h.l}%;top:${h.t}%;width:${h.w}%;height:${h.h}%"></div>`).join('')}
  </div>`;
}

/* ---------- 하단 네비 ---------- */
function setTab(sc, active){
  const nav = document.querySelector(`.flow[data-scheme="${sc}"] [data-nav]`);
  if(nav) nav.innerHTML = tabbar(active);
}

/* ============================================================
   인터랙션 바인딩
   ============================================================ */
function rerender(){
  applyScale();
  renderS1(); renderSam(); renderNH(); renderHK(); renderKiwoom();
}

/* ===== AI 업무챗봇 화면 (별도 앱) — 영웅문/AI업무챗봇.png 그대로 표시 =====
   상단에 겹치는 '보이는 ARS 열기' 플로팅 버튼만 동작 */
function openAiChat(){
  const screen = document.getElementById('screen');
  if(!screen || document.getElementById('aiChatOv')) return;
  const el = document.createElement('div');
  el.id = 'aiChatOv';
  const v40 = isV40(); const v45_ = isV45();   // Ver 4.0 계열: 문구 '디지털 ARS 열기' + 디지털ARS(모니터) 아이콘
  el.className = 'aichat-ov' + (v40 ? ' v40' : '');
  const floatIc = v40
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/></svg>'
    : I.headset;
  const floatTxt = v40 ? '디지털 ARS 열기' : '보이는 ARS 열기';
  const floatCls = v45_ ? ' v45' : v40 ? ' v40' : '';   // v45: 인디고 / v40: 마젠타
  el.innerHTML = `<img class="aichat-img" src="영웅문/AI업무챗봇.png" alt="AI 업무챗봇">
    <div class="ars-float${floatCls}" data-arsopen><span class="af-ic">${floatIc}</span> ${floatTxt}</div>`;
  screen.appendChild(el);
}
function closeAiChat(){ const e=document.getElementById('aiChatOv'); if(e) e.remove(); }

/* 휴대폰 인증 OTP: 6자리 입력 시 자동 완료 + Enter 완료
   (모바일 소프트키보드가 [인증 완료] 버튼을 가리고 인증 화면이 스크롤되지 않아 버튼을 못 누르는 문제 대응) */
document.addEventListener('input', (e)=>{
  const el = e.target;
  if(!el) return;
  if(el.closest && el.closest('#findAcctPop')){
    if(el.classList.contains('fir-sel')) el.classList.toggle('has-val', el.value !== '');
    syncFindCtaBtn(); return;
  }
  if(el.id === 'acctNo'){   // 계좌번호: v45에서 4-4 자동 포맷, 링크 문구 전환
    if(isV45()){
      const raw = el.value.replace(/\D/g, '').slice(0, 8);
      el.value = raw.length > 4 ? raw.slice(0,4) + '-' + raw.slice(4) : raw;
      v45AuthBtnSync();
      if(raw.length === 8 && !(s1state.acctPw||'').length){ openPwKeypad(false); }
    }
    const link = document.querySelector('.iod-findlink[data-iodfind], .iod-findlink[data-cheacctfind]');
    if(link) link.textContent = (el.value.trim() ? '계좌비밀번호를 모르겠어요' : '계좌번호를 모르겠어요') + ' ›';
    return;
  }
  if(el.id !== 'otpNo') return;
  el.value = el.value.replace(/\D/g, '').slice(0, 6);   // 숫자만, 최대 6자리
  if(el.value.length === 6){
    const btn = document.querySelector('[data-otpdone]');
    if(btn) btn.click();                                 // 자동 인증 완료(버튼 탭 불필요)
  }
});
document.addEventListener('keydown', (e)=>{
  if(e.target && e.target.id === 'otpNo' && e.key === 'Enter'){
    e.preventDefault();
    const btn = document.querySelector('[data-otpdone]');
    if(btn) btn.click();
  }
});

document.addEventListener('click', (e)=>{
  const t = e.target;

  // AI 챗봇 → '보이는 ARS 열기' 플로팅 버튼: 챗봇 닫고 보이는 ARS 화면으로
  if(t.closest('[data-arsopen]')){ closeAiChat(); closeVoiceCall(); selectSian('s1'); return; }   // AI챗봇/통화화면 '디지털 ARS 열기' → 메인

  // 음성 ARS 연결 안내 팝업 → 연결하기: Ver 4.0은 휴대폰 통화화면(다이얼패드), 그 외는 기존 연결화면
  if(t.closest('[data-mok]')){ closeModal(); if(s1Ver==='v40'){ openVoiceCall(); return; } s1nav({page:'voice', title:'음성 ARS 연결', fromFav:false}); return; }
  if(t.closest('[data-callend]')){ closeVoiceCall(); selectSian('s1'); return; }   // 통화 종료 → 디지털 ARS 메인
  if(t.closest('[data-endok]')){   // 서비스 종료: 세션·입력 인증정보 폐기(저장 안 함) 후 메인 초기화
    closeModal();
    sessionAuthed = false;
    authAcct = {type:ACCOUNTS[0].type, no:ACCOUNTS[0].no};   // 입력 인증계좌 초기화
    s1state.page='home'; s1state.fromFav=false; s1state.history=[]; s1state.sarsPath=[];
    renderS1();
    flash('서비스가 종료되었어요. 이용해 주셔서 감사합니다. (시연용)');
    return;
  }
  // 직원연결 메뉴: 안내 팝업 없이 바로 상담원 연결 화면으로 이동(클릭 메뉴 내용 표기)
  const staff = t.closest('[data-staffconnect]');
  if(staff){ s1nav({page:'agent', title:'상담원 연결', agentLabel: staff.dataset.staffconnect, fromFav:false}); return; }
  if(t.closest('[data-mcancel]')){ closeModal(); return; }
  if(t.classList.contains('modal-ov')){ closeModal(); return; }

  // 일반/간편 토글
  const m = t.closest('[data-mode]');
  if(m){ mode = m.dataset.mode; rerender(); return; }
  // 큰글씨
  if(t.closest('[data-bigfont]')){ bigFont=!bigFont; rerender(); return; }

  // 영웅문S# 앱 연결 팝업: 열기 / 연결 / 취소 / 배경탭 닫기
  const al = t.closest('[data-applink]');
  if(al){ openAppLink(al.dataset.applink); return; }
  if(t.closest('[data-appgo]')){
    const pop = document.getElementById('appPop'); const ttl = pop ? pop.dataset.linkTitle : ''; const app = (pop && pop.dataset.linkApp) ? pop.dataset.linkApp : '영웅문S#';
    closeAppLink();
    if(isV40()){ s1nav({page:'herodone', title: app+' 연결', heroTitle: ttl, heroApp: app, noBack:true, noHome:true}); return; }   // v40 계열: 연결 완료 화면
    flash(`${app} 앱으로 연결합니다. 계좌정보 연동 후 ${ttl} 화면으로 이동합니다. (시연용)`);
    return;
  }
  if(t.closest('[data-appcancel]') || (t.classList && t.classList.contains('app-pop-ov'))){ closeAppLink(); closeModal(); return; }   // app-pop-ov 오버레이 탭: 앱 연결 팝업/음성 ARS 안내 팝업(arsModal) 모두 닫기

  // Ver 4.0 · 상담연결 안내 팝업: 채널 선택 / 닫기(닫기버튼·배경탭)
  const csch = t.closest('[data-cschannel]');
  if(csch){
    if(csch.classList.contains('soon')){ flash('디지털 ARS는 2027년 2월 오픈 예정이에요. 조금만 기다려 주세요!'); return; }
    const csEl = document.getElementById('consultPop');
    const lbl = csEl ? (csEl.dataset.csLabel||'') : '';
    const k = csch.dataset.cschannel;
    if(k==='voice'){ closeConsult(); s1nav({page:'voiceconnect', title:'음성 ARS 연결', voiceLabel: lbl, noHome:true}); return; }   // 음성 ARS → 연결 안내 화면
    const CS_MSG = {
      hero:  sessionAuthed ? `영웅문S#으로 연결합니다. '${lbl}' 화면으로 바로 이동해요. (시연용)` : '영웅문S#을 실행합니다. 원하시는 업무 화면으로 이동해요. (시연용)',
      chat:  '24시간 AI 챗봇 상담으로 연결합니다. (시연용)',
      call:  '담당 부서 상담원에게 연결합니다. 연결까지 잠시만 기다려 주세요. (시연용)',
    };
    closeConsult();
    flash(CS_MSG[k] || '상담을 연결합니다. (시연용)');
    return;
  }
  // 주식주문 계단식 플로팅: 진입 / 선택(단계 진행) / 닫기 — consult 닫기보다 먼저(stk-ov도 consult-ov라)
  if(t.closest('[data-stkorder]')){ stkOrder={method:'',kind:'',type:'',sub:''}; openStkSheet('method'); return; }
  if(t.closest('[data-chesheet]')){ openMethodSheet(CHE_SHEET); return; }   // 체결·주문내역 조회 → 다른 메뉴처럼 매체 플로팅 먼저(디지털ARS/영S#/음성ARS)
  if(t.closest('[data-sisesheet]')){ openMethodSheet(SISE_SHEET); return; }  // 시세 조회 → 연결매체 선택 플로팅
  if(t.closest('[data-idxsheet]')){ openMethodSheet(IDX_SHEET); return; }    // 지수정보·환율 안내 → 연결매체 선택 플로팅
  if(t.closest('[data-depsheet]')){ openMethodSheet(DEP_SHEET); return; }    // 예수금·주문가능금액 조회 → 연결매체 선택 플로팅
  if(t.closest('[data-balsheet]')){ openMethodSheet(BAL_SHEET); return; }    // 주식·신용·금융상품 잔고조회 → 연결매체 선택 플로팅
  if(t.closest('[data-txnsheet]')){ openMethodSheet(TXN_SHEET); return; }    // 거래내역 조회 → 연결매체 선택 플로팅
  if(t.closest('[data-misusheet]')){ openMethodSheet(MISU_SHEET); return; }  // 미수·반대매매 조회 → 연결매체 선택 플로팅(2매체)
  if(t.closest('[data-myacctsheet]')){ openMethodSheet(MYACCT_SHEET); return; }  // 계좌번호·MY계좌 정보확인 → 연결매체 선택 플로팅(2매체)
  if(t.closest('[data-chealt]')){ openMethodSheet(CHE_SHEET); return; }   // 체결·주문내역 계좌인증 화면 '다른 방법으로 조회하기' → 매체 플로팅
  if(t.closest('[data-pwreset]')){ openMethodSheet(PWRESET_SHEET); return; }   // FAQ '비밀번호를 재설정하고 싶어요' → 어떤 비밀번호 재설정할지 선택 시트
  // ID 비밀번호 재설정 플로우
  if(t.closest('[data-idpwagree]')){ s1state.idpwAgree=!s1state.idpwAgree; const a=document.querySelector('.idpw-agree'); if(a) a.classList.toggle('on', s1state.idpwAgree); return; }
  if(t.closest('[data-idpwreq]')){ if(!s1state.idpwAgree){ flash('개인(신용)정보 수집·이용에 동의해 주세요.'); return; } s1state.idpwStep='otp'; renderS1(); return; }   // 인증요청 → 인증번호 단계
  if(t.closest('[data-idpwotpdone]')){ s1state.idpwReset=false; s1nav({page:'idpwdone', title:'본인 확인', noHome:true}); return; }   // 인증완료 → 본인확인 완료 화면
  if(t.closest('[data-idpwacctdone]')){ s1state.idpwReset=true; renderS1(); return; }   // 계좌인증 확인 → 같은 자리에 ID 비밀번호 재설정 입력칸
  if(t.closest('[data-idpwresetdone]')){ if(isV45()){ s1nav({page:'idpwfinish', noBack:true, noHome:true}); } else { flash('ID 비밀번호가 재설정되었어요. 새 비밀번호로 로그인해 주세요. (시연용)'); s1state.page='home'; s1state.history=[]; s1state.authNext=null; renderS1(); } return; }   // 재설정 완료 → 홈(v40) / 완료페이지(v45)
  const msh = t.closest('[data-mediasheet]');
  if(msh){ const cfg = MEDIA_SHEETS[msh.dataset.mediasheet]; if(cfg) openMethodSheet(cfg); return; }   // 입출금·이체 각 항목 → 2매체 플로팅
  const stkSel = t.closest('[data-stkpick]');
  if(stkSel){
    const step = stkSel.dataset.stkstep, v = stkSel.dataset.stkpick;
    if(step==='method'){ stkOrder.method=v; openStkSheet('kind'); return; }
    if(step==='kind'){   stkOrder.kind=v;   openStkSheet('type'); return; }
    if(step==='type'){
      stkOrder.type=v;
      // 음성ARS는 항상 소메뉴 한 단계 더(현금·신용·K-OTC), 영웅문S#은 바로 연결
      if(stkOrder.method==='voice'){ openStkSheet('sub'); return; }
      stkConnect(); return;
    }
    if(step==='sub'){ stkOrder.sub=v; stkConnect(); return; }
    return;
  }
  if(t.closest('[data-stkclose]') || (t.classList && t.classList.contains('stk-ov'))){ closeStkSheet(); return; }

  // 방법 선택 플로팅: 방법 클릭 / 닫기(배경·닫기버튼) — consult 닫기보다 먼저(method-ov도 consult-ov라)
  const mrow = t.closest('[data-iodmethod]');
  if(mrow){
    const kind = mrow.dataset.iodmethod;
    closeMethodSheet();
    if(kind==='app'){ openAppLink('iodpurpose'); return; }
    if(kind==='purpose'){ s1nav({page:'result', resultKey:'purpose', title:'금융거래목적확인서', noHome:true}); return; }
    if(kind==='consult'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'한도제한계좌 해제', noHome:true}); return; }
    if(kind==='idcardcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'신분증 진위확인', noHome:true}); return; }   // 신분증 진위확인 → 상담원
    if(kind==='pwapp'){ openAppLink('iodpw'); return; }          // 계좌 비밀번호 재설정 — 영웅문S# 앱 연결
    if(kind==='pwopenapp'){ openAppLink('iodpwopen'); return; }  // 계좌 비밀번호 재설정 — 키움계좌개설 앱 연결
    if(kind==='cheapp'){ openAppLink('chefilled'); return; }                                                          // 체결내역 조회 — 영웅문S# 앱 연결
    if(kind==='chedigital'){ s1state.authNext = {go:'chefilled'}; s1state.cheAcctNo = ''; if(sessionAuthed){ gotoAuthNext(); return; } s1nav({page:'authstep', authMethod:'account', title:'계좌 인증', acctPw:'', otpSent:false, fromFav:false, noBack:false, noHome:true}); return; }   // 체결내역 조회 — 디지털 ARS: 계좌인증(이미 인증 시 생략) → 체결내역 화면
    if(kind==='chevoice'){ openMethodSheet(CHE_VOICE_SHEET); return; }                                               // 체결내역 조회 — 음성 ARS → 중메뉴 선택 플로팅
    if(kind==='altexcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'대체거래소 문의', noHome:true}); return; }   // 대체거래소 문의 → 상담원 연결
    if(kind==='chev0'){ flash('음성 ARS로 「금일 체결내역 조회」를 안내해 드릴게요. (시연용)'); return; }
    if(kind==='chev1'){ flash('음성 ARS로 「금일 미체결 내역 조회」를 안내해 드릴게요. (시연용)'); return; }
    if(kind==='chev2'){ flash('음성 ARS로 「전일 체결내역 조회」를 안내해 드릴게요. (시연용)'); return; }
    if(kind==='chev3'){ flash('음성 ARS로 「금일 주문내역 조회」를 안내해 드릴게요. (시연용)'); return; }
    if(kind==='chev4'){ flash('음성 ARS로 「예약주문 내역조회」를 안내해 드릴게요. (시연용)'); return; }
    if(kind==='siseapp'){ openAppLink('sisequote'); return; }                                              // 시세 조회 — 영웅문S# 앱 연결
    if(kind==='sisechat'){ flash('AI 챗봇에게 물어보면 시세를 바로 알려드려요. (시연용)'); return; }       // 시세 조회 — AI 챗봇
    if(kind==='sisevoice'){ openMethodSheet(SISE_VOICE_SHEET); return; }                                   // 시세 조회 — 음성 ARS → 시세 유형 선택 플로팅
    if(kind==='siv0'){ flash('음성 ARS 「국내주식 현재가·호가」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='siv1'){ flash('음성 ARS 「관심종목 현재가」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='siv2'){ flash('음성 ARS 「보유종목 현재가」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='siv3'){ flash('음성 ARS 「시간외 단일가 시세」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='siv4'){ flash('음성 ARS 「K-OTC 현재가」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='siv5'){ flash('음성 ARS 「선물 현재가」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='idxapp'){ openAppLink('idxinfo'); return; }                                             // 지수·환율 — 영웅문S# 앱 연결
    if(kind==='idxchat'){ flash('AI 챗봇에게 물어보면 지수·환율 정보를 바로 알려드려요. (시연용)'); return; }   // 지수·환율 — AI 챗봇
    if(kind==='idxvoice'){ openMethodSheet(IDX_VOICE_SHEET); return; }                                 // 지수·환율 — 음성 ARS → 소메뉴 리스트
    if(kind.indexOf('idxv')===0){ flash(`음성 ARS 「${mrow.dataset.mlabel}」 메뉴로 연결해 드릴게요. (시연용)`); return; }   // idxv0~8 공통
    if(kind==='depdigital'){ s1nav({page:'result', resultKey:'holdings', title:'계좌잔고·예수금', noHome:true}); return; }   // 예수금·주문가능금액 — 디지털 ARS(계좌잔고·예수금 화면)
    if(kind==='depapp'){ openAppLink('depinfo'); return; }                                              // 예수금·주문가능금액 — 영웅문S# 앱 연결
    if(kind==='depvoice'){ openMethodSheet(DEP_VOICE_SHEET); return; }                                  // 예수금·주문가능금액 — 음성 ARS → 2개 조회 선택
    if(kind==='depv0'){ flash('음성 ARS 「예수금·추정예탁자산 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='depv1'){ flash('음성 ARS 「주문가능 금액조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='baldigital'){ s1nav({page:'result', resultKey:'balance', title:'주식·신용·금융상품 잔고', noHome:true}); return; }   // 잔고조회 — 디지털 ARS(보유 잔고 화면)
    if(kind==='balapp'){ openAppLink('balinfo'); return; }                                              // 잔고조회 — 영웅문S# 앱 연결
    if(kind==='balvoice'){ openMethodSheet(BAL_VOICE_SHEET); return; }                                  // 잔고조회 — 음성 ARS → 3개 잔고 선택
    if(kind==='balv0'){ flash('음성 ARS 「현금주식 잔고조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='balv1'){ flash('음성 ARS 「신용 잔고조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='balv2'){ flash('음성 ARS 「금융상품 평가·잔고 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='txndigital'){ s1nav({page:'result', resultKey:'trades', title:'거래내역', noHome:true}); return; }   // 거래내역 — 디지털 ARS(거래내역 화면)
    if(kind==='txnapp'){ openAppLink('txninfo'); return; }                                              // 거래내역 — 영웅문S# 앱 연결
    if(kind==='txnvoice'){ openMethodSheet(TXN_VOICE_SHEET); return; }                                  // 거래내역 — 음성 ARS → 하위 조회 선택
    if(kind==='txnv0'){ flash('음성 ARS 「전체 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='txnv1'){ flash('음성 ARS 「매매 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='txnv2'){ flash('음성 ARS 「입출금 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='txnv3'){ flash('음성 ARS 「입출고 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='misudigital'){ s1nav({page:'result', resultKey:'misu', title:'미수·반대매매', noHome:true}); return; }   // 미수·반대매매 — 디지털 ARS 화면
    if(kind==='misuapp'){ openAppLink('misuinfo'); return; }                                            // 미수·반대매매 — 영웅문S# 앱 연결
    if(kind==='myacctdigital'){ s1nav({page:'result', resultKey:'myacct', title:'계좌번호·MY계좌', noHome:true}); return; }   // 계좌번호·MY계좌 — 디지털 ARS 화면
    if(kind==='myacctapp'){ openAppLink('myacctinfo'); return; }                                        // 계좌번호·MY계좌 — 영웅문S# 앱 연결
    // 입출금·이체 (영웅문S#/음성ARS 2매체)
    if(kind==='songapp'){ openAppLink('songinfo'); return; }
    if(kind==='songvoice'){ openMethodSheet(SONG_VOICE_SHEET); return; }   // 송금 → 3종 서브리스트
    if(kind==='songv0'){ flash('음성 ARS 「연계은행 송금」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='songv1'){ flash('음성 ARS 「증권계좌 송금」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='songv2'){ flash('음성 ARS 「타사 송금」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='xferapp'){ openAppLink('xferinfo'); return; }
    if(kind==='xfervoice'){ flash('음성 ARS 「계좌 간 자금이체」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='songresapp'){ openAppLink('songresinfo'); return; }
    if(kind==='songresvoice'){ flash('음성 ARS 「송금결과확인 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    // 계좌개설·사고 (항목 맞춤)
    if(kind==='accvoice'){ openMethodSheet(ACC_VOICE_SHEET); return; }   // 사고등록 → 4종 서브리스트
    if(kind==='acccs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'사고 신고', noHome:true}); return; }   // 사고신고 시트 상담원 연결(v40)
    if(kind==='accv0'){ flash('음성 ARS 「계좌출금 정지 사고등록」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='accv1'){ flash('음성 ARS 「제휴카드 분실 사고등록」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='accv2'){ flash('음성 ARS 「OTP 사고등록」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='accv3'){ flash('음성 ARS 「사고등록 내역조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='accapp'){ openAppLink('accinfo'); return; }
    if(kind==='addrapp'){ openAppLink('addrinfo'); return; }
    if(kind==='addrvoice'){ flash('음성 ARS 「주소·전화번호 변경」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='acctopenkiwoom'){ openAppLink('acctopenkiwoom'); return; }   // 비대면 계좌개설 → 키움계좌개설 앱
    if(kind==='acctopenapp'){ openAppLink('acctopeninfo'); return; }
    // 공모주·유상청약 (디지털ARS/영웅문S#/음성ARS 3매체)
    if(kind==='rightsdigital'){ s1nav({page:'result', resultKey:'rights', title:'유상청약', noHome:true}); return; }   // 유상청약 — 디지털 ARS 화면
    if(kind==='rightsapp'){ openAppLink('rightsinfo'); return; }
    if(kind==='rightsvoice'){ openMethodSheet(RIGHTS_VOICE_SHEET); return; }   // 유상청약 → 4종 서브리스트
    if(kind==='rightsv0'){ flash('음성 ARS 「당일 유상청약 신청」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='rightsv1'){ flash('음성 ARS 「당일 유상청약 취소」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='rightsv2'){ flash('음성 ARS 「유상청약 예약신청·취소」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='rightsv3'){ flash('음성 ARS 「유상청약 내역확인」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='ipodigital'){ s1nav({page:'result', resultKey:'ipo', title:'공모주 청약', noHome:true}); return; }   // 공모주 청약 — 디지털 ARS 화면
    if(kind==='ipoapp'){ openAppLink('ipoinfo'); return; }
    if(kind==='ipovoice'){ openMethodSheet(IPO_VOICE_SHEET); return; }   // 공모주 청약 → 5종 서브리스트
    if(kind==='ipov0'){ flash('음성 ARS 「청약 입력」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='ipov1'){ flash('음성 ARS 「청약 취소」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='ipov2'){ flash('음성 ARS 「청약 경쟁률 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='ipov3'){ flash('음성 ARS 「청약 관련 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='ipov4'){ flash('음성 ARS 「공모주정보 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    // 서류신청·제출 (디지털ARS/영웅문S# 2매체)
    if(kind==='certdigital'){ s1nav({page:'result', resultKey:'certv40', title:'증명서 발급', noHome:true}); return; }   // 증명서 발급 — 디지털 ARS 화면
    if(kind==='certapp'){ openAppLink('certinfo'); return; }
    if(kind==='purposedig'){ s1nav({page:'result', resultKey:'docsubmit', title:'금융거래목적확인서', docLabel:'금융거래목적확인서', noHome:true}); return; }
    if(kind==='purposeapp'){ openAppLink('purposedocinfo'); return; }
    if(kind==='kycdig'){ s1nav({page:'result', resultKey:'docsubmit', title:'고객확인(KYC/CDD)', docLabel:'고객확인(KYC/CDD)', noHome:true}); return; }
    if(kind==='kycapp'){ openAppLink('kycinfo'); return; }
    if(kind==='investordig'){ s1nav({page:'result', resultKey:'docsubmit', title:'투자자정보확인서', docLabel:'투자자정보확인서', noHome:true}); return; }
    if(kind==='investorapp'){ openAppLink('investorinfo'); return; }
    if(kind==='foreigndig'){ s1nav({page:'result', resultKey:'docsubmit', title:'해외 양도소득 서류', docLabel:'해외 양도소득 서류', noHome:true}); return; }
    if(kind==='foreignapp'){ openAppLink('foreigninfo'); return; }
    // 업무신청 (디지털ARS/영웅문S#/상담원 3매체)
    if(kind==='authacctdig'){ s1nav({page:'result', resultKey:'applygroup', title:'인증·계좌 신청', applyGroup:'authacct', noHome:true}); return; }
    if(kind==='authacctapp'){ openAppLink('authacctinfo'); return; }
    if(kind==='authacctcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'인증·계좌 신청', noHome:true}); return; }
    if(kind==='shippingdig'){ s1nav({page:'result', resultKey:'applygroup', title:'출고·이관 신청', applyGroup:'shipping', noHome:true}); return; }
    if(kind==='shippingapp'){ openAppLink('shippinginfo'); return; }
    if(kind==='shippingcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'출고·이관 신청', noHome:true}); return; }
    if(kind==='creditdig'){ s1nav({page:'result', resultKey:'applygroup', title:'신용·대출 만기연장', applyGroup:'credit', noHome:true}); return; }
    if(kind==='creditapp'){ openAppLink('creditinfo'); return; }
    if(kind==='creditcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'신용·대출 만기연장', noHome:true}); return; }
    // 공지·이용안내 (항목 맞춤)
    if(kind==='arsguidedigital'){ s1nav({page:'result', resultKey:'infolist', title:'ARS 이용안내', infoKey:'arsguide', noHome:true}); return; }   // ARS 이용안내 — 디지털 ARS 화면
    if(kind==='arsguidevoice'){ openMethodSheet(ARSGUIDE_VOICE_SHEET); return; }   // ARS 이용안내 → 4종 서브리스트
    if(kind==='arsgv0'){ flash('음성 ARS 「ARS 이용시간 안내」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='arsgv1'){ flash('음성 ARS 「ARS 주문서비스 이용신청」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='arsgv2'){ flash('음성 ARS 「ARS 관심종목 안내」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='arsgv3'){ flash('음성 ARS 「ARS 이용비용 안내」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='noticedigital'){ s1nav({page:'result', resultKey:'infolist', title:'공지사항', infoKey:'notice', noHome:true}); return; }   // 공지사항 — 디지털 ARS 화면
    if(kind==='noticeapp'){ openAppLink('noticeinfo'); return; }
    if(kind==='eventdigital'){ s1nav({page:'result', resultKey:'infolist', title:'이벤트 안내', infoKey:'event', noHome:true}); return; }   // 이벤트 — 디지털 ARS 화면
    if(kind==='eventapp'){ openAppLink('eventinfo'); return; }
    // ISA 가입서류 제출방법
    if(kind==='isadoc'){ s1nav({page:'isasubmit', title:'가입서류 제출', noHome:true}); return; }
    if(kind==='isaissue'){ s1nav({page:'isaissue', title:'발급번호 입력', noHome:true}); return; }
    // 인증·비밀번호 (항목 맞춤)
    if(kind==='pwmgmtdigital'){ s1nav({page:'result', resultKey:'applygroup', title:'비밀번호 관리', applyGroup:'pwmgmt', noHome:true}); return; }   // 비밀번호 관리 — 디지털 ARS 화면
    if(kind==='pwmgmtapp'){ openAppLink('pwmgmtinfo'); return; }
    if(kind==='pwmgmtvoice'){ openMethodSheet(PWMGMT_VOICE_SHEET); return; }   // 비밀번호 관리 → 주문비밀번호 4종 서브리스트
    if(kind==='pwmv0'){ flash('음성 ARS 「주문비밀번호 등록」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='pwmv1'){ flash('음성 ARS 「주문비밀번호 변경」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='pwmv2'){ flash('음성 ARS 「ARS 이용신청」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='pwmv3'){ flash('음성 ARS 「ARS 이용해지」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='pwreset0'){ s1state.idpwStep='info'; s1state.idpwAgree=false; s1state.idpwReset=false; s1nav({page:'idpwauth', title:'본인인증', noHome:true}); return; }   // ID 비밀번호 재설정 플로우
    if(kind==='pwreset1'){ if(isV45()){ openPwHelpSheet(); } else { openAppLink('pwresetacct'); } return; }   // 증권계좌 비밀번호 → v45: 설명 바텀시트 / 그외: 영웅문S# 팝업
    if(kind==='pwreset2'){ if(isV45()){ openCertInfoSheet(); } else { openAppLink('pwresetcert'); } return; }   // 공동인증서 비밀번호 → v45: 설명 바텀시트 / 그외: 영웅문S# 팝업
    if(kind.indexOf('pwreset')===0){ flash(`「${mrow.dataset.mlabel}」 재설정 화면으로 이동합니다. (시연용)`); return; }   // 기타 pwreset — 시연용(폴백)
    if(kind==='authidapp'){ openAppLink('authidinfo'); return; }
    if(kind==='authidcs'){ s1nav({page:'agent', title:'상담원 연결', agentLabel:'인증·ID 관리', noHome:true}); return; }
    if(kind==='etcsvcdigital'){ s1nav({page:'result', resultKey:'applygroup', title:'부가서비스', applyGroup:'etcsvc', noHome:true}); return; }   // 부가서비스 — 디지털 ARS 화면
    if(kind==='etcsvcapp'){ openAppLink('etcsvcinfo'); return; }
    if(kind==='etcsvcvoice'){ openMethodSheet(ETCSVC_VOICE_SHEET); return; }   // 부가서비스 → 퀵넘버 2종 서브리스트
    if(kind==='etcv0'){ flash('음성 ARS 「퀵넘버 플러스 조회」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    if(kind==='etcv1'){ flash('음성 ARS 「퀵넘버 플러스 삭제」 메뉴로 연결해 드릴게요. (시연용)'); return; }
    return;
  }
  if(t.closest('[data-msclose]') || (t.classList && t.classList.contains('method-ov'))){ closeMethodSheet(); return; }

  // 계좌찾기 플로팅(3단계) — consult-ov 클래스를 공유하므로 아래 일반 consult-ov 핸들러보다 먼저 처리
  if(t.closest('[data-findagree]')){ s1state.findAgree=!s1state.findAgree; const a=document.querySelector('#findAcctPop .find-agree'); if(a) a.classList.toggle('on', s1state.findAgree); syncFindCtaBtn(); return; }
  if(t.closest('[data-findotp]')){ if(!s1state.findAgree){ flash('휴대폰 인증 약관에 동의해 주세요. (시연용)'); return; } findAcctStep(2); return; }
  if(t.closest('[data-finddone]')){ findAcctStep(3); return; }
  if(t.closest('[data-findclose]')){ closeFindAcct(); return; }
  const findAcctRow = t.closest('[data-findacct]');
  if(findAcctRow){ const inp=document.getElementById('acctNo'); const no=findAcctRow.dataset.findacct; if(inp){ inp.value=no.length===8?no.slice(0,4)+'-'+no.slice(4):no; v45AuthBtnSync(); } s1state.iodAcctNo=no; closeFindAcct(); flash('계좌번호가 입력되었어요. (시연용)'); return; }
  if(t.classList && t.classList.contains('find-ov')){ closeFindAcct(); return; }
  // 비밀번호 도움말 바텀시트
  if(t.closest('[data-pwhelpclose]') || t.classList.contains('pw-help-sheet')){ if(t.id==='certInfoSheet'){ closeCertInfoSheet(); } else { closePwHelpSheet(); } return; }
  if(t.closest('[data-pwhelpgo]')){ closePwHelpSheet(); flash('영웅문S# 앱으로 이동합니다. (시연용)'); return; }
  if(t.closest('[data-certinfogo]')){ closeCertInfoSheet(); flash('영웅문S# 앱으로 이동합니다. (시연용)'); return; }
  // 결과안내 '왜 진위확인이 되지 않았나요?' 배지 플로팅 — consult-ov 공유이므로 일반 핸들러보다 먼저
  if(t.closest('[data-idbadge]')){ openBadgeInfo(); return; }
  if(t.closest('[data-badgeclose]') || (t.classList && t.classList.contains('badge-ov'))){ closeBadgeInfo(); return; }
  if(t.closest('[data-idurl]')){ s1nav({page:'iddone', title:'재요청 URL 발송', noBack:true, noHome:true}); return; }   // 신분증 재요청 URL 받기 → 발송 완료 화면

  if(t.closest('[data-csclose]') || (t.classList && t.classList.contains('consult-ov'))){ closeConsult(); return; }
  if(t.closest('[data-ssmore]')){ openSsMore(); return; }

  // 입출금 안내 플로우: 진입(계좌 인증) / 계좌번호 모름(본인인증 선택) / 결과 사유 토글
  if(t.closest('[data-iodstart]')){
    s1state.authNext = {go:'iodcheck'};
    s1state.iodAcctNo = '';   // 새 플로우 시작 → 자동입력 계좌번호 초기화
    if(sessionAuthed){ gotoAuthNext(); return; }   // 이미 계좌인증됨 → 인증 생략, 바로 진행
    s1nav({page:'authstep', authMethod:'account', title:'계좌 인증', acctPw:'', otpSent:false, fromFav:false, noBack:false, noHome:true});
    return;
  }
  // ISA 가입서류 제출: FAQ 진입 → 계좌인증(안내+인증 1페이지 통합, 공용 계좌인증 재사용·isa 플래그)
  if(t.closest('[data-isastart]')){
    s1state.authNext = {go:'iodcheck', isa:true};
    s1state.iodAcctNo = '';
    if(sessionAuthed){ gotoAuthNext(); return; }   // 이미 계좌인증됨 → 인증 생략
    s1nav({page:'authstep', authMethod:'account', title:'ISA 가입서류 제출', acctPw:'', otpSent:false, fromFav:false, noBack:false, noHome:true});
    return;
  }
  // 증명서 발급 현황: FAQ 진입 → 계좌인증(공용 계좌인증 재사용·cert 플래그)
  if(t.closest('[data-certstart]')){
    s1state.authNext = {go:'iodcheck', cert:true};
    s1state.iodAcctNo = '';
    if(sessionAuthed){ gotoAuthNext(); return; }   // 이미 계좌인증됨 → 인증 생략
    s1nav({page:'authstep', authMethod:'account', title:'증명서 발급 현황', acctPw:'', otpSent:false, fromFav:false, noBack:false, noHome:true});
    return;
  }
  // 발급현황 재발급 버튼 → 재발급 상세화면
  const creis = t.closest('[data-certreissue]');
  if(creis){ s1nav({page:'certreissue', title:creis.dataset.certreissue+' 재발급', certName:creis.dataset.certreissue, noHome:true}); return; }
  // 재발급 신청 → 접수 안내
  const creisdone = t.closest('[data-certreissuedone]');
  if(creisdone){
    if(isV40()){ s1nav({page:'certreissuedone', title:'재발급 완료', certName:creisdone.dataset.certreissuedone, noBack:true, noHome:true}); return; }
    flash(`${creisdone.dataset.certreissuedone} 재발급이 접수되었어요. 등록된 이메일로 보내드릴게요. (시연용)`); return;
  }
  // 신청현황 → 가입서류 제출방법 선택 플로팅
  if(t.closest('[data-isamethod]')){ openMethodSheet(ISA_METHOD_SHEET); return; }
  // 신청현황 결과(v40) 상단 새로고침 → 4상태(신규가입/계좌이전/만기연장/없음) 순환
  if(t.closest('[data-isacycle]')){
    const cur = ISA_RESULT_STATES.indexOf(s1state.isaTab);
    s1state.isaTab = ISA_RESULT_STATES[(cur+1) % ISA_RESULT_STATES.length] || 'new';
    renderS1(); return;
  }
  // 신청현황 탭 전환(신규가입/계좌이전/만기연장) — v41/v42 탭
  const isatab = t.closest('[data-isatab]');
  if(isatab){ s1state.isaTab = isatab.dataset.isatab; renderS1(); return; }
  // 신청내역 확인 → 신청현황 화면
  if(t.closest('[data-isahistory]')){ s1nav({page:'isaresult', title:'신청현황', noHome:true}); return; }
  // 발급번호 재등록 → 발급번호 입력 화면
  if(t.closest('[data-isareissue]')){ s1nav({page:'isaissue', title:'발급번호 재등록', noHome:true}); return; }
  // 발급번호 제출(홈택스 14자리)
  if(t.closest('[data-isaissuedone]')){
    const no = ['isaIssue1','isaIssue2','isaIssue3','isaIssue4'].map(id=>(document.getElementById(id)||{}).value||'').join('').replace(/\D/g,'');
    if(no.length < 14){ flash('발급번호 14자리를 정확히 입력해주세요.'); return; }
    flash('발급번호가 제출되었어요. 확인 후 알림톡으로 안내해 드릴게요. (시연용)');
    return;
  }
  // Ver 4.5 계좌번호 물음표 → 계좌찾기 플로팅(화면 이동 X)
  if(t.closest('[data-acctfind]')){ openFindAcct(); return; }
  // Ver 4.5 비밀번호 물음표 → 증권계좌 비밀번호 안내 바텀시트
  if(t.closest('[data-pwhelp]')){ openPwHelpSheet(); return; }
  if(t.closest('[data-iodfind]')){
    const acctNo = (document.getElementById('acctNo')||{}).value || '';
    if(acctNo.trim()){ openMethodSheet(IOD_PW_SHEET); return; }   // 계좌번호 입력됨 → 비밀번호 재설정 방법 선택 플로팅
    if(s1Ver==='v40'){ openFindAcct(); return; }   // Ver 4.0: 3단계 계좌찾기 플로팅(정보입력→인증번호→계좌리스트)
    s1nav({page:'authsel', title:'계좌번호 찾기', acctPw:'', otpSent:false, noHome:true}); return;   // 계좌번호 미입력 → 계좌번호 찾기
  }
  // 체결·주문내역 계좌인증: 계좌번호 입력됨 → 비밀번호 재설정 방법 시트 / 미입력 → 휴대폰·간편 인증 방법 선택(authNext={go:chefilled} 유지)
  if(t.closest('[data-cheacctfind]')){
    const acctNo = (document.getElementById('acctNo')||{}).value || '';
    if(acctNo.trim()){ openMethodSheet(IOD_PW_SHEET); return; }   // 계좌번호 입력됨 → '계좌비밀번호를 모르겠어요' → 재설정 방법 선택
    s1nav({page:'authsel', title:'계좌 조회', acctPw:'', otpSent:false, noHome:true}); return;
  }
  const certtog = t.closest('[data-certstatustoggle]');
  if(certtog){ s1state.certHasRecords = (s1state.certHasRecords === false); renderS1(); return; }   // 서류 신청내역 결과 데모: 조회됨 ↔ 없음 전환
  const iodc = t.closest('[data-iodcycle]');
  if(iodc){
    const keys = Object.keys(IOD_RESULTS);
    const cur = keys.indexOf(IOD_RESULTS[s1state.iodResult] ? s1state.iodResult : keys[0]);
    s1state.iodResult = keys[(cur+1) % keys.length];   // 클릭마다 다음 사유로 순환
    renderS1(); return;
  }
  // 결과 버튼 → 방법 선택 플로팅 열기
  if(t.closest('[data-iodmethods]')){
    const key = IOD_RESULTS[s1state.iodResult] ? s1state.iodResult : 'multi';
    openMethodSheet(IOD_RESULTS[key].sheet); return;
  }
  // 금융거래목적확인서 등록 → 완료 화면 / 완료 화면 '확인' → 메인
  if(t.closest('[data-iodpurposedone]')){ s1nav({page:'iodpurposedone', title:'등록 완료', noBack:true, noHome:true}); return; }
  if(t.closest('[data-iodhome]')){ s1state.page='home'; s1state.sarsPath=[]; s1state.history=[]; s1state.authNext=null; renderS1(); return; }
  if(t.closest('[data-certapply]')){   // 서류 신청내역 없음 → '서류신청·제출' 카테고리 중메뉴 리스트로 이동
    const cats = catData(); let idx = cats.findIndex(c => /서류/.test(c.t)); if(idx < 0) idx = 4;
    s1state.page='home'; s1state.sarsPath=[idx]; s1state.history=[]; s1state.authNext=null; renderS1(); return;
  }
  if(t.closest('[data-agentgo]')){ flash('상담원에게 연결합니다. 잠시만 기다려 주세요. (시연용)'); s1state.page='home'; s1state.sarsPath=[]; s1state.history=[]; s1state.authNext=null; renderS1(); return; }   // 상담원 연결하기 → 연결 안내 후 홈으로
  // 음성 ARS 연결 버튼 → 연결 완료 화면
  if(t.closest('[data-voicego]')){ s1nav({page:'voicedone', title:'음성 ARS 연결', noBack:true, noHome:true}); return; }

  // 시연용 토스트 버튼
  const fl = t.closest('[data-flash]');
  if(fl){ flash(fl.dataset.flash); return; }
  // 알림 토글 스위치
  const sw = t.closest('[data-sw]');
  if(sw){ sw.classList.toggle('on'); return; }

  /* ---- 시안 1 ---- */
  // 자주 찾는 서비스 더보기
  if(t.closest('[data-favmore]')){ s1nav({page:'favmore', title:'자주 찾는 서비스', fromFav:true}); return; }
  // 자주 찾는 서비스 추가: 빈 슬롯 클릭 → 후보 시트 / 후보 선택 → FAV 추가 / 닫기
  if(t.closest('[data-favadd]')){ openFavAdd(); return; }
  const fpick = t.closest('[data-favpick]');
  if(fpick){
    const i = +fpick.dataset.favpick; const f = FAV_ADD.splice(i,1)[0];
    closeFavAdd();
    if(f){ FAV.push(f); renderS1(); flash(`'${f.k}'를 자주 찾는 서비스에 추가했습니다.`); }
    return;
  }
  if(t.closest('[data-favaddclose]') || (t.classList && t.classList.contains('fav-add-ov'))){ closeFavAdd(); return; }
  // 본인인증 방법 선택 → 해당 인증단계 화면으로 이동
  const authm = t.closest('[data-auth]');
  if(authm){
    // IOD 플로우(입출금)에서는 우상단 전체메뉴(햄버거) 숨김 — 다른 IOD 화면과 동일
    s1nav({page:'authstep', authMethod: authm.dataset.auth, title:'본인인증', acctPw:'', otpSent:false, noHome: isIodFlow()||isCheAuth()});
    return;
  }
  // 휴대폰 인증: 인증번호 요청 → 인증번호 입력칸 노출
  if(t.closest('[data-otpreq]')){ s1state.otpSent = true; renderS1(); return; }
  // 휴대폰 인증: 인증 완료 → 계좌 비밀번호 키패드(계좌번호 라인 포함)
  if(t.closest('[data-otpdone]')){
    const otp = (document.getElementById('otpNo')||{}).value || '';
    if(!otp.trim()){ flash('인증번호를 입력해주세요.'); return; }
    flash('휴대폰 인증이 완료되었습니다. (시연용)');
    if(isIodFlow()){ s1nav({page:'iodacctsel', title:'계좌 선택', otpSent:false, noHome:true}); return; }   // 입출금 플로우: 계좌 선택 리스트로
    if(isCheAuth()){ s1nav({page:'iodacctsel', title:'계좌 선택', otpSent:false, noHome:true}); return; }   // 체결·주문내역: 휴대폰 인증 완료 → 계좌 선택 리스트
    openPwKeypad(true); return;
  }
  // 간편인증서 제공자 선택 → 제공자 인증 완료 후 계좌 비밀번호 키패드
  const sp = t.closest('[data-simplepick]');
  if(sp){
    flash(`${sp.dataset.simplepick} 인증이 완료되었습니다. (시연용)`);
    if(isIodFlow()){ s1nav({page:'iodacctsel', title:'계좌 선택', noHome:true}); return; }   // 입출금 플로우: 계좌 선택 리스트로
    if(isCheAuth()){ s1nav({page:'iodacctsel', title:'계좌 선택', noHome:true}); return; }   // 체결·주문내역: 간편 인증 완료 → 계좌 선택 리스트
    openPwKeypad(true); return;
  }
  // 입출금 플로우: 계좌 선택 → 계좌 인증 화면으로 돌아가 선택 계좌번호 자동 입력
  const iacc = t.closest('[data-iodacct]');
  if(iacc){
    const i = +iacc.dataset.iodacct;
    selAcct = i; authAcct = {type:ACCOUNTS[i].type, no:ACCOUNTS[i].no};
    if(isCheAuth()) s1state.cheAcctNo = ACCOUNTS[i].no;   // 체결·주문내역: 선택 계좌번호를 계좌인증 화면에 자동 입력
    else s1state.iodAcctNo = ACCOUNTS[i].no;
    s1nav({page:'authstep', authMethod:'account', title:'계좌 인증', acctPw:'', otpSent:false, noHome:true});
    return;
  }
  // 간편비밀번호(PIN) 변경: 키패드 입력 → 점 채우기 / 6자리 시 단계 진행
  const pk = t.closest('[data-pinkey]');
  if(pk){ pinPress(pk.dataset.pinkey); return; }
  // 계좌 비밀번호 입력란 터치 → 플로팅 키패드 (계좌번호 라인 없음)
  if(t.closest('[data-pwopen]')){ openPwKeypad(false); return; }
  // 키패드 바깥(backdrop) 터치 → 닫기
  if(t.classList && t.classList.contains('kp-ov')){ if(t.id==='certPwSheet'){ closeCertPwSheet(); } else { closePwKeypad(); } return; }
  // 키패드 숫자 입력 / 지우기
  const key = t.closest('[data-key]');
  if(key){
    const k = key.dataset.key;
    if(k==='back') s1state.acctPw = s1state.acctPw.slice(0,-1);
    else if(s1state.acctPw.length < 8) s1state.acctPw += k;
    const dots = '●'.repeat(s1state.acctPw.length);
    ['acctPwDisp','kpDots'].forEach(id=>{ const d=document.getElementById(id); if(d) d.textContent = dots; });
    v45AuthBtnSync();   // Ver 4.5 계좌인증 확인버튼 활성/비활성 동기화
    return;
  }
  // 키패드 취소 → 입력 취소 후 닫기
  if(t.closest('[data-kpcancel]')){
    s1state.acctPw = ''; const d=document.getElementById('acctPwDisp'); if(d) d.textContent='';
    v45AuthBtnSync();
    closePwKeypad(); return;
  }
  // 인증서 비밀번호 시트 취소·확인
  if(t.closest('[data-certpwcancel]')){ closeCertPwSheet(); return; }
  if(t.closest('[data-certpwconfirm]')){
    const inp = document.getElementById('certPwInput');
    if(!inp || inp.value.length < 10){ flash('인증서 비밀번호는 10자리 이상이어야 해요.'); return; }
    closeCertPwSheet(); flash('인증서 비밀번호 확인 완료. (시연용)'); return;
  }
  // 키패드 입력완료 → 비밀번호 확정 후 닫기 (휴대폰 인증은 바로 조회화면으로)
  if(t.closest('[data-kpconfirm]')){
    if((s1state.acctPw||'').length < 4){ flash('비밀번호를 4자리 이상 입력해주세요.'); return; }
    closePwKeypad();
    if(pwCtx==='pwreset1'){ s1state.acctPw=''; pwCtx=''; flash('증권계좌 비밀번호 확인 완료. (시연용)'); return; }   // 증권계좌 비밀번호 재설정: 확인 후 완료 안내
    if(pwCtx==='change'){           // 거래내역 계좌변경: 다른 계좌 선택 후 비번 확인 → 적용
      s1state.acctPw = '';
      pwCtx='';
      if(pendingAcct>=0){ selAcct=pendingAcct; authAcct={type:ACCOUNTS[selAcct].type, no:ACCOUNTS[selAcct].no}; pendingAcct=-1; }
      flash('계좌가 변경되었습니다. (시연용)');
      renderS1(); return;
    }
    if(s1state.authMethod==='phone' || s1state.authMethod==='simple'){
      s1state.acctPw = '';
      authAcct = {type:ACCOUNTS[selAcct].type, no:ACCOUNTS[selAcct].no};
      flash('계좌 인증이 완료되었습니다. (시연용)');
      gotoAuthNext();
      return;
    }
    // 계좌번호 인증: 비밀번호는 유지하고 키패드만 닫음 → 하단 '확인'(data-authdone)에서 최종 인증
    return;
  }
  // 인증 완료 → 원래 목적지(예수금/잔고)로 이동
  const done = t.closest('[data-authdone]');
  if(done){
    if(s1state.authMethod==='account'){
      const acctNo = ((document.getElementById('acctNo')||{}).value || '').replace(/-/g,'');
      if(!acctNo.trim()){ flash('계좌번호를 입력해주세요.'); return; }
      if((s1state.acctPw||'').length < 4){ flash('계좌 비밀번호를 입력해주세요. (4자리 이상)'); return; }
      const foundAcct = ACCOUNTS.find(a=>a.no===acctNo.trim());   // 등록 계좌면 종류(위탁종합/ISA) 반영
      authAcct = {type: foundAcct ? foundAcct.type : '위탁종합', no:acctNo.trim()};   // 입력한 계좌번호를 거래내역에 표시
      closePwKeypad();
    }
    const NAMES = {phone:'휴대폰', simple:'간편(민간인증서)', account:'계좌번호'};
    const via = done.dataset.authdone || NAMES[s1state.authMethod] || '본인';
    flash(`${via} 인증이 완료되었습니다. (시연용)`);
    gotoAuthNext();
    return;
  }
  const s1go = t.closest('[data-s1go]');
  if(s1go){
    const go = s1go.dataset.s1go, fk = s1go.dataset.fk, rk = s1go.dataset.rk;
    const isFav = !!s1go.closest('[data-fav]');
    // 자주 찾는 서비스 항목 전체 → 본인인증 절차를 먼저 거친 뒤 원래 목적지로 이동
    if(isFav){
      s1state.authNext = {go, rk, fk};
      if(sessionAuthed){            // 이미 인증된 세션 → 추가 인증 없이 바로 이동
        // 더보기에서 인증 생략 접속 = 상세로 판단(뒤로가기만), 홈에서 접속 = 메인(홈만)
        const deep = (s1state.page === 'favmore');
        s1state.fromFav = true;
        gotoAuthNext(deep);
      } else {
        s1nav({page:'authsel', authNext:{go, rk, fk}, title:'본인인증', fromFav:true, otpSent:false, acctPw:'', noBack:false});
      }
      return;
    }
    // 자주 찾는 서비스에서 출발했으면 홈 버튼이 유지되도록 fromFav 전파
    const fromFav = s1state.page==='home' ? false : s1state.fromFav;
    if(go==='sise')        s1nav({page:'sise',  title: fk || '시세/지수조회', fromFav});
    else if(go==='index')  s1nav({page:'index', title: fk || '국내지수', fromFav});
    else if(go==='list')   s1nav({page:'list',  listKey: fk, title: fk, fromFav});
    else if(go==='result') s1nav({page:'result',resultKey: rk, title: fk, fromFav, noHome: (s1state.page==='list' && s1state.fromFav)});
    return;
  }
  if(t.closest('[data-s1back]')){ s1back(); return; }
  // 고객센터 '원활' 배지 / 좌측 패널 '본인인증 생략' → 본인인증 세션 활성화(시연용): 이후 모든 인증 절차 생략
  const skip = t.closest('[data-skipauth]');
  if(skip){
    const srBtn = document.querySelector('#sianList [data-skipauth]');
    // 좌측 패널 버튼이 이미 활성(생략 ON)인 상태에서 다시 클릭 → 생략 해제(본인인증 절차 재개)
    if(skip.closest('#sianList') && sessionAuthed){
      sessionAuthed = false;
      if(srBtn){ srBtn.classList.remove('on'); const tel=srBtn.querySelector('.rf-tel'); if(tel) tel.textContent='클릭 시 이후 인증 생략 (시연용)'; }
      flash('본인인증 생략을 해제했습니다. 이후 본인인증 절차를 진행합니다.');
      return;
    }
    // 그 외 → 본인인증 생략 활성화
    sessionAuthed = true;
    if(srBtn){ srBtn.classList.add('on'); const tel=srBtn.querySelector('.rf-tel'); if(tel) tel.textContent='인증 생략 켜짐 (시연용)'; }
    flash('본인인증이 완료되어 이후 인증을 생략합니다. (시연용)');
    return;
  }
  // 전체메뉴 홈 아이콘 → 메인화면으로
  if(t.closest('[data-home]')){ closeMenuDrawer(); s1state.page='home'; s1state.fromFav=false; s1state.history=[]; renderS1(); return; }
  const cat = t.closest('[data-cat]');
  if(cat){ s1state.cat = cat.dataset.cat; renderS1(); return; }
  // V2.1 메인 인라인 탭(셀프서비스/ARS메뉴/상담원연결) 전환 — 트리 상태 초기화
  const v21 = t.closest('[data-v21tab]');
  if(v21){ s1state.v21Tab=v21.dataset.v21tab; s1state.sarsPath=[]; s1state.amOpen=-1; s1state.amOpen2=-1; renderS1(); return; }
  // Ver 4.5 대메뉴 탭(공통/증권/금융상품) 전환 — 버블 슬라이딩 위해 전체 re-render 대신 부분 갱신
  const v45t = t.closest('[data-v45tab]');
  if(v45t){
    const k = v45t.dataset.v45tab;
    if(k !== s1state.v45Tab){
      s1state.v45Tab = k;
      s1state.v45Cat = null;   // 탭 전환 시 드릴다운 초기화
      const tabsEl = v45t.closest('.v45-tabs');
      if(tabsEl) tabsEl.querySelectorAll('.v45-tab').forEach(el=>el.classList.toggle('on', el.dataset.v45tab===k));
      const menuEl = tabsEl && tabsEl.nextElementSibling;   // 탭 바로 뒤 = 메뉴 리스트
      if(menuEl){ const tmp=document.createElement('div'); tmp.innerHTML=v45Menu(); const fresh=tmp.firstElementChild; if(fresh) menuEl.replaceWith(fresh); else renderS1(); }
      else renderS1();
    }
    return;
  }
  // Ver 4.5 대메뉴 클릭 → 중메뉴 아코따언 인라인 토글
  const v45c = t.closest('[data-v45cat]');
  if(v45c){
    const cat = v45CatById(+v45c.dataset.v45cat);
    if(cat){
      if(cat.subs && cat.subs.length){
        s1state.v45Cat = (s1state.v45Cat === cat.id) ? null : cat.id;
        const menuEl = document.querySelector('.toss-list');
        if(menuEl){ const tmp=document.createElement('div'); tmp.innerHTML=isV46()?v46FlatMenu():v45Menu(); const fresh=tmp.firstElementChild; if(fresh) menuEl.replaceWith(fresh); else renderS1(); }
        else renderS1();
      } else { flash(`'${cat.t}' 메뉴입니다. (중메뉴 없음 · 이후 절차 정의 예정)`); }
    }
    return;
  }
  // Ver 4.5 중메뉴 드릴다운 뒤로가기 → 대메뉴 리스트
  if(t.closest('[data-v45back]')){ s1state.v45Cat = null; renderS1(); return; }
  // Ver 4.5 중메뉴 클릭 → 이후 절차는 추후 정의(현재 안내 placeholder)
  const v45s = t.closest('[data-v45sub]');
  if(v45s){ flash(`'${v45s.dataset.v45sub}' 중메뉴 선택 · 이후 절차 정의 예정`); return; }
  // Ver 4.7 FAB 토글
  if(t.closest('[data-v47fabtoggle]')){
    const fab=document.getElementById('v47Fab');
    if(fab){ const open=fab.classList.toggle('open'); fab.closest('.screen')?.classList.toggle('v47-fab-open',open); }
    return;
  }
  // Ver 4.7 FAB 열림 상태에서 배경 클릭 → 닫기
  if(isV47() && !t.closest('#v47Fab') && !t.closest('.menu-ov')){
    const fab=document.getElementById('v47Fab');
    if(fab?.classList.contains('open')){ fab.classList.remove('open'); fab.closest('.screen')?.classList.remove('v47-fab-open'); }
  }
  // Ver 4.7 대메뉴 그리드 클릭 → 중메뉴 목록 페이지
  const v47c = t.closest('[data-v47cat]');
  if(v47c){ s1nav({page:'v47cat', v47Cat:+v47c.dataset.v47cat}); return; }
  // Ver 4.7 중메뉴 클릭 → 이후 절차 정의 예정
  const v47s = t.closest('[data-v47sub]');
  if(v47s){ flash(`'${v47s.dataset.v47sub}' · 이후 절차 정의 예정`); return; }
  // [큰글씨] ON · 큰 카드 아코디언: 카드 탭=인라인 펼침/접힘, 서비스 탭=해당 카테고리 소메뉴 드릴다운
  // Ver 4.0 · '상담 없이 해결할 수 있어요' 자가해결 카드 펼침/접기 (화살표)
  if(t.closest('[data-faqtoggle]')){ s1state.faqOpen = !s1state.faqOpen; renderS1(); return; }
  // 전체메뉴(햄버거) → 오른쪽에서 슬라이딩하는 드로어로 열기
  if(t.closest('[data-menu]')){ s1state.amTab='ars'; s1state.amOpen=0; s1state.amOpen2=-1; s1state.sarsPath=[]; s1state.amCat='self'; s1state.amTreeOpen={}; const _fab=document.getElementById('v47Fab'); _fab?.classList.remove('open'); _fab?.closest('.screen')?.classList.remove('v47-fab-open'); openMenuDrawer(); return; }
  // V2.1 전체메뉴: 좌측 대메뉴(셀프서비스/ARS/상담원연결) 선택 → 아코디언 초기화
  const amc = t.closest('[data-amcat]');
  if(amc){ s1state.amCat=amc.dataset.amcat; s1state.amTreeOpen={}; refreshMenu(); return; }
  // V2.1 전체메뉴: 중첩 아코디언 노드 펼침/접힘 (path 키)
  const amacc = t.closest('[data-amacc]');
  if(amacc){ const p=amacc.dataset.amacc; s1state.amTreeOpen[p]=!s1state.amTreeOpen[p]; refreshMenu(); return; }
  if(t.closest('[data-menuclose]') || (t.classList && t.classList.contains('menu-ov'))){ closeMenuDrawer(); return; }
  // 자주 찾는 서비스 / 보이는 ARS 세그먼트 전환 (선택 대분류 초기화)
  const amtab = t.closest('[data-amtab]');
  if(amtab){ s1state.amTab = amtab.dataset.amtab; s1state.amOpen = 0; s1state.amOpen2 = -1; s1state.sarsPath = []; refreshMenu(); return; }
  // V2.0 단순 ARS 번호 드릴다운: 하위 있으면 다음 단계 이동 / 이전 / 리프는 최종(화면 미연결)
  const sdn = t.closest('[data-sarsdown]');
  if(sdn){ const i=+sdn.dataset.sarsdown; s1state.sarsPath=[...(s1state.sarsPath||[]), i]; refreshMenu(); return; }
  if(t.closest('[data-sarsup]')){ (s1state.sarsPath = s1state.sarsPath||[]).pop(); refreshMenu(); return; }
  const slf = t.closest('[data-sarsleaf]');
  if(slf){
    if(isV40()){ openConsult(slf.dataset.sarsleaf, {exclude:['call']}); return; }   // Ver 4.0 계열: 음성ARS 최종메뉴 → 상담연결 팝업(전화상담 제외)
    flash(`'${slf.dataset.sarsleaf}' 음성 ARS 최종 메뉴입니다. (메뉴 연결 안내 · 화면 미연결)`); return; }
  // 전체메뉴: 좌측 대메뉴 선택(고정), 우측 중메뉴 표시
  const am1 = t.closest('[data-am1]');
  if(am1){ const i=+am1.dataset.am1; s1state.amOpen=i; s1state.amOpen2=-1; refreshMenu(); return; }
  const am2 = t.closest('[data-am2]');
  if(am2){ const j=+am2.dataset.am2; s1state.amOpen2=(s1state.amOpen2===j?-1:j); refreshMenu(); return; }
  // 메인: 대메뉴 클릭 → 중/소메뉴 아코디언 화면으로 이동
  const ivdae = t.closest('[data-ivdae]');
  if(ivdae){
    const i=+ivdae.dataset.ivdae;
    const name = stripNum(IVR[i].t);
    const noAuth = (name==='시세 및 시황');   // 시세 및 시황은 본인인증 생략
    // 모든 대메뉴 → 중메뉴 리스트(daeacc). (일반주문도 현금매도·매수 등 중메뉴를 먼저 표시)
    const dest = {go:'daeacc', ivI:i, fk:name};
    // 보이는 ARS는 '계좌번호 인증'만 사용. 미인증이면 계좌번호 인증 절차, 인증되면 바로 이용.
    if(!sessionAuthed && !noAuth){
      s1state.authNext = dest;
      s1nav({page:'authstep', authMethod:'account', title:'본인인증', acctPw:'', otpSent:false, fromFav:false});
      return;
    }
    s1nav({page:'daeacc', ivI:i, midOpen:-1, title:name, fromFav:false});
    return;
  }
  // 일반주문 중메뉴(현금매도·매수·정정·취소) → 주문화면(해당 탭)으로 이동
  // 주문화면 하위 탭(신용매도 등) 전환
  const ctab = t.closest('[data-credittab]');
  if(ctab){ orderState.tabSel = +ctab.dataset.credittab; renderS1(); return; }
  const oopen = t.closest('[data-orderopen]');
  if(oopen){
    const otitle = oopen.dataset.ordertitle || ORDER_TITLE[oopen.dataset.orderopen] || '일반주문';
    // 전체메뉴에서 일반주문 중메뉴 클릭: 미인증이면 본인계좌 인증 먼저
    if(!sessionAuthed && t.closest('.menu-panel')){
      s1state.authNext = {go:'orderopen', side:oopen.dataset.orderopen, ordertitle:otitle};
      s1nav({page:'authstep', authMethod:'account', title:'본인인증', acctPw:'', otpSent:false, fromFav:false});
      return;
    }
    resetOrder(); orderState.side = oopen.dataset.orderopen; orderState.solo = true;
    orderState.tabs = ORDER_SUBTABS[otitle] || null; orderState.tabSel = 0;
    s1nav({page:'order', title: otitle, fromFav:false}); return;
  }
  // 현재가 및 호가안내: 호가 탭(호가잔량/5단호가/당일시고저) 전환
  const ptab = t.closest('[data-pricetab]');
  if(ptab){ s1state.priceTab = ptab.dataset.pricetab; renderS1(); return; }
  // 현재가 및 호가안내 ARS 주문 → 일반주문(선택 종목 유지). 미인증 시 본인명의 계좌인증 절차부터.
  const arso = t.closest('[data-arsorder]');
  if(arso){ const nm = arso.dataset.arsorder;
    if(!sessionAuthed){
      s1state.authNext = {go:'order', stock:nm};
      s1nav({page:'authstep', authMethod:'account', title:'본인인증', acctPw:'', otpSent:false, fromFav:false});
      return;
    }
    resetOrder();
    if(nm){ const info = stockInfo(nm); orderState.stock = {nm:nm, cur:info.cur, chg:info.chg, pct:info.pct, tick:info.tick}; }
    s1nav({page:'order', title:'일반주문', fromFav:false}); return; }
  // 일반주문 주문화면 인터랙션
  const oside = t.closest('[data-ordside]');
  if(oside){ orderState.side = oside.dataset.ordside; renderS1(); return; }
  const otype = t.closest('[data-ordtype]');
  if(otype){ orderState.type = otype.dataset.ordtype; renderS1(); return; }
  // 주문화면 종목 지우기 / 종목 돋보기 → 종목검색창
  if(t.closest('[data-ordstockclear]')){ orderState.stock=null; renderS1(); return; }
  if(t.closest('[data-ordsearch]')){ openStockSearch(); return; }
  // 주문유형 선택창
  if(t.closest('[data-ordtypesel]')){ openOrderTypeSheet(); return; }
  const otpick = t.closest('[data-ordtypepick]');
  if(otpick){ orderState.type = otpick.dataset.ordtypepick; closeTxOverlay(); renderS1(); return; }
  const oprice = t.closest('[data-ordprice]');
  if(oprice){
    if(orderState.type!=='시장가'){
      const step = orderState.stock ? orderState.stock.tick : 100;
      const base = parseInt(orderState.price,10) || (orderState.stock ? orderState.stock.cur : 0);
      orderState.price = String(Math.max(step, base + (oprice.dataset.ordprice==='up'?step:-step)));
      renderS1();
    }
    return;
  }
  const oqty = t.closest('[data-ordqty]');
  if(oqty){ orderState.qty = String(Math.max(1, (parseInt(orderState.qty,10)||0) + (oqty.dataset.ordqty==='up'?1:-1))); renderS1(); return; }
  if(t.closest('[data-ordsubmit]')){
    if(!orderState.stock){ flash('종목을 선택해주세요.'); return; }
    const isMarket = orderState.type.startsWith('시장가') || orderState.type==='시간외 종가';
    if(!isMarket && !(parseInt(orderState.price,10) > 0)){ flash('주문가격을 입력해주세요.'); return; }
    if(!(parseInt(orderState.qty,10) > 0)){ flash('주문수량을 입력해주세요.'); return; }
    showOrderConfirm();
    return;
  }
  // 주문확인 바텀시트: 배경 딤 클릭 / 취소 / 확인(주문 완료)
  if(t.classList && t.classList.contains('ordc-ov')){ closeOrdConfirm(); return; }
  if(t.closest('[data-ordcancel]')){ closeOrdConfirm(); return; }
  if(t.closest('[data-ordconfirm]')){
    closeOrdConfirm();
    orderState.done = String(Math.floor(100000 + Math.random()*900000));
    renderS1();
    return;
  }
  // 주문 완료 후 후속 액션
  if(t.closest('[data-orderagain]')){ const sd=orderState.side, tb=orderState.tabs, ts=orderState.tabSel; resetOrder(); orderState.side=sd; orderState.solo=true; orderState.tabs=tb; orderState.tabSel=ts; renderS1(); return; }
  if(t.closest('[data-ordfilled]')){ s1nav({page:'result', resultKey:'filled', title:'체결 내역', fromFav:false}); return; }
  if(t.closest('[data-ordacct]')){
    // 다른 계좌로 주문: 계좌인증 후 클릭했던 주문화면으로 복귀(종목 초기화)
    sessionAuthed = false;
    const back = {page: s1state.page, side: orderState.side, title: s1state.title, solo: !!orderState.solo};
    resetOrder();
    s1state.authNext = {go:'reorder', page: back.page, side: back.side, title: back.title, solo: back.solo};
    s1nav({page:'authstep', authMethod:'account', title:'본인인증', acctPw:'', otpSent:false, fromFav:false});
    return;
  }
  // 계좌 선택 플로팅 (휴대폰/간편 추가인증 키패드의 계좌 라인)
  if(t.closest('[data-acctsel]')){ openAcctSheet(); return; }
  // 거래내역 계좌변경: 계좌리스트 먼저 표시 (현재 계좌 하이라이트)
  if(t.closest('[data-acctchange]')){
    const idx = ACCOUNTS.findIndex(a=>a.type===authAcct.type && a.no===authAcct.no);
    if(idx>=0) selAcct = idx;
    openAcctSheet(); return;
  }
  if(t.closest('[data-acctclose]')){ closeAcctSheet(); return; }
  const ap = t.closest('[data-acctpick]');
  if(ap){
    const idx = +ap.dataset.acctpick;
    closeAcctSheet();
    const line=document.querySelector('#pwKeypad .kp-acct');
    if(line){ selAcct = idx; line.innerHTML = acctLineHTML(); return; }   // 인증 키패드 내 계좌 선택
    // Ver 4.0(체결내역 계좌변경): 선택 계좌를 계좌인증 화면에 자동 입력하고 계좌 인증 다시
    if(isV40()){
      selAcct = idx;
      s1state.authNext = {go:'chefilled'};
      s1state.cheAcctNo = ACCOUNTS[idx].no;
      s1nav({page:'authstep', authMethod:'account', title:'계좌 인증', acctPw:'', otpSent:false, fromFav:false, noBack:false, noHome:true});
      return;
    }
    // 거래내역 계좌변경(s1): 같은 계좌면 변경 없음, 다른 계좌면 비밀번호 키패드
    const picked = ACCOUNTS[idx];
    if(picked.type===authAcct.type && picked.no===authAcct.no) return;
    pendingAcct = idx;
    openPwKeypad(false, 'change');
    return;
  }
  // 체결내역 체결/미체결/예약 구분
  const otab = t.closest('[data-ordertab]');
  if(otab){ orderTab = otab.dataset.ordertab; renderS1(); return; }
  // 잔고조회 전체/현금/신용/금융상품 필터
  const bftab = t.closest('[data-balfilter]');
  if(bftab){ balFilter = bftab.dataset.balfilter; renderS1(); return; }
  // 거래내역 필터: 종목검색 / 기간선택 오버레이
  if(t.closest('[data-stockclear]')){ txFilter.stock=''; renderS1(); return; }
  if(t.closest('[data-creditclear]')){ const sd = s1state.page==='creditsell'?'sell':'buy'; resetOrder(); orderState.side=sd; renderS1(); return; }
  // 신용매수 → 자기융자매수: 종목검색+주문카드 화면으로 이동
  if(t.closest('[data-creditbuy]')){ resetOrder(); orderState.side='buy'; s1nav({page:'creditbuy', title:'자기융자매수', fromFav:false}); return; }
  // 신용매도 → 자기융자 매도상환: 종목검색+주문카드 화면으로 이동
  if(t.closest('[data-creditsell]')){ resetOrder(); orderState.side='sell'; s1nav({page:'creditsell', title:'자기융자 매도상환', fromFav:false}); return; }
  if(t.closest('[data-stocksearch]')){ openStockSearch(); return; }
  // 증명서 발급 폼 드롭다운: 열기 / 옵션 선택 / 닫기 (날짜 필드는 달력 피커)
  const csel = t.closest('[data-certsel]');
  if(csel){ const k=csel.dataset.certsel; if(CERT_OPTS[k] && CERT_OPTS[k].cal) openCalendar(k); else openCertSheet(k); return; }
  if(t.closest('[data-certclose]')){ closeCertSheet(); return; }
  const cpk = t.closest('[data-certpick]');
  if(cpk){ const sh=document.getElementById('certSheet'); if(sh) certSel[sh.dataset.certkey]=cpk.dataset.certpick; closeCertSheet(); renderS1(); return; }
  // 달력 피커: 월 이동 / 날짜 선택 / 적용 / 닫기
  const cmv = t.closest('[data-calmove]');
  if(cmv){ let mo=calState.m + (+cmv.dataset.calmove); let yr=calState.y;
    if(mo<1){mo=12;yr--;} if(mo>12){mo=1;yr++;} calState.m=mo; calState.y=yr; calRefresh(); return; }
  const cday = t.closest('[data-calday]');
  if(cday){ calPickDay(+cday.dataset.calday); return; }
  if(t.closest('[data-calapply]')){ calApply(); return; }
  if(t.closest('[data-calclose]')){ closeCalendar(); return; }
  if(t.closest('[data-periodsel]')){ openPeriodSheet(); return; }
  if(t.closest('[data-datesel]')){ openDateSheet(); return; }
  const dpc = t.closest('[data-datepreset]');
  if(dpc){ orderDateSel = dpc.dataset.datepreset; orderDate = {...DATE_PRESETS[orderDateSel].d};
    const ov=document.getElementById('txOverlay'); if(ov) ov.innerHTML=dateSheetHTML(); return; }
  if(t.closest('[data-dateapply]')){ closeTxOverlay(); renderS1(); return; }
  if(t.closest('[data-txclose]')){ closeTxOverlay(); return; }
  if(t.classList && t.classList.contains('tx-ov')){
    if(t.id==='acctSheet') closeAcctSheet();
    else if(t.id==='certSheet') closeCertSheet();
    else if(t.id==='calSheet') closeCalendar();
    else closeTxOverlay();
    return;
  }
  const stk = t.closest('[data-stockpick]');
  if(stk){
    const nm = stk.dataset.stockpick;
    const info = stockInfo(nm);
    if(s1state.page==='order'){                        // 주문화면: 종목·현재가·등락률 표기 (가격·수량은 비워둠)
      orderState.stock = {nm:nm, cur:info.cur, chg:info.chg, pct:info.pct, tick:info.tick};
    } else if(s1state.page==='creditbuy' || s1state.page==='creditsell'){  // 신용 주문 카드용 orderState에 종목 설정
      orderState.stock = {nm:nm, cur:info.cur, chg:info.chg, pct:info.pct, tick:info.tick};
      orderState.done = '';
    } else {
      txFilter.stock = nm;                             // 거래/체결내역·현재가호가안내면 필터
    }
    closeTxOverlay(); renderS1(); return;
  }
  const pch = t.closest('[data-period]');
  if(pch){ txPeriodSel = pch.dataset.period; const ov=document.getElementById('txOverlay'); if(ov) ov.innerHTML=periodSheetHTML(); return; }
  if(t.closest('[data-periodapply]')){
    const p=PERIOD_PRESETS[txPeriodSel];
    txFilter.period = `${fmtP(p.s)} ~ ${fmtP(p.e)}`;
    closeTxOverlay(); renderS1(); return;
  }
  // 대메뉴 상세: 소메뉴 있는 중메뉴 → 다음 페이지(버튼식 소메뉴)
  const ivsub = t.closest('[data-ivsub]');
  if(ivsub){ const p=ivsub.dataset.ivsub.split('_'); const i=+p[0], j=+p[1];
    // 전체메뉴에서 일반주문 소메뉴(신용매도/매수 등) 클릭: 미인증이면 본인계좌 인증 먼저
    if(!sessionAuthed && t.closest('.menu-panel') && IVR[i] && stripNum(IVR[i].t)==='일반주문'){
      s1state.authNext = {go:'ivsub', ivI:i, ivJ:j};
      s1nav({page:'authstep', authMethod:'account', title:'본인인증', acctPw:'', otpSent:false, fromFav:false});
      return;
    }
    s1nav({page:'ivsub', ivI:i, ivJ:j, title:stripNum((IVR[i].subs[j]||{}).t||'상세'), fromFav:false}); return; }
  // 대메뉴 상세: 중메뉴 펼침
  const mid2 = t.closest('[data-mid2]');
  if(mid2){ const j=+mid2.dataset.mid2; s1state.midOpen=(s1state.midOpen===j?-1:j); renderS1(); return; }
  // 음성 ARS 연결 안내 팝업
  const pop = t.closest('[data-arspop]');
  if(pop){
    if(isV40()){ openConsult(stripNum(pop.dataset.arspop), {exclude:['voice']}); return; }   // Ver 4.0 계열: 직원연결 최종메뉴 → 상담연결 팝업(음성ARS 제외)
    // 상담 분야 결정
    const lbl = pop.dataset.arspop;
    let field;
    if(!isAgent(lbl)){
      field = lbl;                                   // 특정 메뉴 연결(음성 ARS 등) → 그 메뉴명
    } else if(t.closest('.menu-panel')){
      // 전체메뉴 드로어의 직원연결 → 선택된 대메뉴명 (예: 일반주문)
      const sel = s1state.amOpen < 0 ? 0 : Math.min(s1state.amOpen, IVR.length-1);
      field = stripNum((IVR[sel]||{}).t || '');
    } else {
      field = s1state.title || '';                   // 일반 화면 직원연결 → 현재 화면 타이틀
    }
    s1nav({page:'agent', title:'상담원 연결', agentLabel: field, fromFav:false}); return;
  }

  /* ---- 시안 2 ---- */
  const acc = t.closest('[data-acc]');
  if(acc){ const i=+acc.dataset.acc; s2state.open = (s2state.open===i? -1 : i); renderS2(); return; }
  const s2go = t.closest('[data-s2go]');
  if(s2go){ s2state.page='index'; s2state.title = s2go.dataset.fk || '국내지수'; renderS2(); return; }
  if(t.closest('[data-s2back]')){ s2state.page='list'; renderS2(); return; }

  /* ---- 삼성증권 (보이는 ARS) ---- */
  const samFl = t.closest('[data-samflash]');
  if(samFl){ flash(samFl.dataset.samflash); return; }
  const samGo = t.closest('[data-samgo]');
  if(samGo){ samNav(samGo.dataset.samgo); return; }
  /* ---- NH투자증권 (보이는 ARS) ---- */
  const nhGo = t.closest('[data-nhgo]');
  if(nhGo){ nhNav(nhGo.dataset.nhgo); return; }
  /* ---- 한국투자증권 (보이는 ARS) ---- */
  const hkGo = t.closest('[data-hkgo]');
  if(hkGo){ hkNav(hkGo.dataset.hkgo); return; }
  const kwGo = t.closest('[data-kwgo]');
  if(kwGo){ kwNav(kwGo.dataset.kwgo); return; }
  if(t.closest('[data-samback]')){ samNav(SAM_BACK[samState.page] || 'main'); return; }
  if(t.closest('[data-samhome]')){ samNav('main'); return; }
  const samTab = t.closest('[data-samtab]');
  if(samTab){ flash(samTab.dataset.samtab); return; }
  if(t.closest('[data-samend]')){ flash('보이는 ARS를 종료합니다.'); return; }

  /* ---- 하단 네비 ---- */
  const tab = t.closest('[data-tab]');
  if(tab){
    const which = tab.dataset.tab;
    const sc = tab.closest('.flow').dataset.scheme;
    if(which==='home'){
      if(sc==='s1'){ s1state.page='home'; s1state.fromFav=false; s1state.history=[]; renderS1(); }
      else if(sc==='s2'){ s2state.page='list'; renderS2(); }
    } else if(which==='chat'){
      openAiChat();
    } else if(which==='end'){
      showEndPopup();
    } else if(which==='voice'){
      showPopup();
    } else if(which==='agent'){
      flash('상담원을 연결합니다. 잠시만 기다려 주세요.');
    }
    return;
  }
});

/* 상단 시안 탭 */
document.getElementById('schemeTabs').addEventListener('click',(e)=>{
  const b = e.target.closest('[data-scheme]');
  if(b) switchScheme(b.dataset.scheme);
});

const SCHEME_META = {
  s1:{cap:'시안 1 · 메인 (그리드 + 메뉴 + 이벤트)', label:'화면 1 · 메인 (자주 찾는 서비스 → 메뉴 → 이벤트)',
      kpi:[['3.5초↓','메뉴 탐색 평균 시간'],['+38%p','핵심 메뉴 도달률'],['65%↓','음성 인입 콜 비중']]},
  dars1:{cap:'Ver 3.0 · 밝은 버전 디자인', label:'Ver 3.0 · 밝은 버전 디자인 · 단일 화면 내 뷰 전환',
      kpi:[['단일 화면','뷰 전환 인터랙션'],['아이콘','그리드 메인'],['Ver 3.0','밝은 버전']]},
  dars2:{cap:'Ver 1.2.1 · 큰 카드 + 인라인', label:'Ver 1.2.1 · 큰 카드 아코디언 · 인라인 펼침',
      kpi:[['큰 카드','아코디언 메인'],['인라인','화면전환 없는 결과'],['Ver 1.2.1','큰 카드']]},
  kiwoom:{cap:'키움증권 · 보이는 ARS (현행 ASIS)', label:'키움증권 현행 보이는 ARS · 메인 → 일반주문 → 현금매도',
      kpi:[['현행','ASIS 캡처'],['3단계','메인→일반주문→현금매도'],['참고','키움 보이는 ARS']]},
  samsung:{cap:'삼성증권 · 보이는 ARS (참고)', label:'삼성증권 보이는 ARS · 시세/투자정보 → 참고1·2·3 흐름',
      kpi:[['9분할','메인 그리드'],['3단계','시세/투자정보 탐색'],['참고','삼성증권 레퍼런스']]},
  mirae:{cap:'미래에셋증권 · 보이는 ARS (참고)', label:'미래에셋증권 보이는 ARS · 메인 (이후 플로우 추후 추가)',
      kpi:[['메인','캡쳐 화면'],['추후','플로우 추가 예정'],['참고','미래에셋증권 레퍼런스']]},
  nh:{cap:'NH투자증권 · 보이는 ARS (참고)', label:'NH투자증권 보이는 ARS · ARS 메뉴 → 계좌조회 → 확인',
      kpi:[['3단계','ARS메뉴→계좌조회→확인'],['단일','캡쳐 크롭'],['참고','NH투자증권 레퍼런스']]},
  hk:{cap:'한국투자증권 · 보이는 ARS (참고)', label:'한국투자증권 보이는 ARS · 주문·청약·펀드매매 → 현금매도',
      kpi:[['2단계','주문메뉴→현금매도'],['메인·메뉴','캡쳐'],['참고','한국투자증권 레퍼런스']]},
  dform:{cap:'Digital Form · 로고만 있는 빈 화면', label:'Digital Form · 키움증권 로고만 있는 빈 화면 (작업용 템플릿)',
      kpi:[['빈 화면','작업용 템플릿'],['로고','좌상단 배치'],['Digital Form','신규 목업']]},
  dform2:{cap:'Ver 4.3 · 음성ARS 메뉴 네비게이터', label:'Ver 4.3 · 음성ARS 메뉴 네비게이터 (대→중→소 번호 트리 · 음성ARS/상담원 연결)',
      kpi:[['넘버 인덱스','대→중→소 3단 트리'],['최종메뉴','음성ARS 연결 안내'],['0.직원연결','상담원 연결 안내']]},
  dform3:{cap:'Digital Form_v0.1 · 서류제출 엔진 흐름 재현', label:'Digital Form_v0.1 · 서류제출 엔진 흐름 재현 (5단계 상태머신 · 업무 11종)',
      kpi:[['5단계','인증→준비→첨부→제출→완료'],['상태머신','업로드→확인중→확인/보완'],['업무 11종','접수번호 발급']]},
  dars1v44:{cap:'Ver 4.4 · 인디고 디자인 시스템', label:'Ver 4.4 · oklch 인디고 팔레트 · Pill 탭 · underline 입력 · 바텀시트 모달',
      kpi:[['인디고','oklch(0.50 0.27 272) 기반'],['Pill 탭','셀프서비스/ARS/상담원'],['바텀시트','모달·팝업 UX']]},
};

let refFirm = 'kiwoom';   // 참고 탭에서 현재 선택된 증권사 (기본: 키움증권 현행)
let sianScheme = 's1';    // 시안 탭에서 현재 선택된 시안 (s1=시안1 / dars1=시안2 / dars2=시안3)
let s1Ver = 'v47';        // 시안1 기본 버전 = Ver 4.7(v47). 맨 URL(파라미터 없음) 진입 시 메인을 Ver 4.7으로 표시. (타 버전은 QR ?v= 파라미터로 진입)
/* Ver 2.1 — 메인 3탭(셀프서비스/ARS메뉴/상담원연결)·드로어·favSrc 등 v21 전용 동작 게이트 */
function isV21Ver(){ return s1Ver==='v21'; }
/* Ver 4.0 계열 — 토스 스킨·9 카테고리(ARS_CAT6)·상담연결 팝업 등 공통 동작 게이트 (v40=리스트 메인 / v41=3×3 그리드 메인, 로직 동일) */
function isV40(){ return s1Ver==='v40' || s1Ver==='v41' || s1Ver==='v42' || s1Ver==='v45' || s1Ver==='v46' || s1Ver==='v47'; }
/* Ver 4.5/4.6/4.7 — 인디고 팔레트 게이트 (isV40 포함이지만 색상 오버라이드를 위해 별도 식별) */
function isV45(){ return s1Ver==='v45' || s1Ver==='v46' || s1Ver==='v47'; }
function isV46(){ return s1Ver==='v46'; }
function isV47(){ return s1Ver==='v47'; }
function switchScheme(s){
  closeMenuDrawer();   // 탭/버전 전환 시 열려있던 전체메뉴 드로어 닫기
  scheme = s;
  const isRef  = (s==='ref');
  const isSian = (s==='sian');
  // 참고 모드면 선택 증권사 flow, 시안 모드면 선택 시안 flow를 표시
  const activeFlow = isRef ? refFirm : (isSian ? sianScheme : s);
  document.querySelectorAll('#schemeTabs .tab').forEach(t=>t.classList.toggle('active', t.dataset.scheme===s));
  document.querySelectorAll('.flow').forEach(f=>f.classList.toggle('active', f.dataset.scheme===activeFlow));
  // 폰 스테이지(시안1·참고) ↔ 시안2/3 덱 전환
  const isDarsView = (activeFlow==='dars1' || activeFlow==='dars2' || activeFlow==='dform' || activeFlow==='dform2' || activeFlow==='dform3' || activeFlow==='dform4' || activeFlow==='dars1v44');
  const mainStage = document.getElementById('mainStage');
  if(mainStage) mainStage.style.display = isDarsView ? 'none' : '';
  document.querySelectorAll('.dars-deck').forEach(d=>d.classList.toggle('active', d.dataset.scheme===activeFlow));
  // 참고 사이드바 표시/항목 하이라이트
  const rl = document.getElementById('refList');
  if(rl){
    rl.classList.toggle('show', isRef);
    rl.querySelectorAll('.ref-item').forEach(it=>it.classList.toggle('on', it.dataset.reffirm===refFirm));
  }
  // 시안 사이드바 표시/항목 하이라이트 (시안1은 버전 V1.0/V2.0까지 구분)
  const snl = document.getElementById('sianList');
  if(snl){
    snl.classList.toggle('show', isSian);
    snl.querySelectorAll('.ref-item[data-sian]').forEach(it=>{
      const on = it.dataset.sian===sianScheme && (!it.dataset.ver || it.dataset.ver===s1Ver);
      it.classList.toggle('on', on);
    });
    // 활성 탭이 '이전버전' 접이식 그룹 안에 있으면 자동 펼침(예: URL ?v=v41 진입)
    const onItem = snl.querySelector('.ref-item[data-sian].on');
    if(onItem && onItem.classList.contains('prev-item')) snl.classList.add('prev-open');
  }
  const meta = SCHEME_META[activeFlow] || SCHEME_META[s];
  updateSceneLabel();   // 씬 라벨은 사이드바 탭(편집 가능한 rf-nm/rf-tel)에서 동기화
  const kr = document.getElementById('kpiRow');
  if(kr && meta) kr.innerHTML = meta.kpi.map(k=>
    `<div class="k"><b>${k[0]}</b><span>${k[1]}</span></div>`).join('');
}
/* 현재 활성 스킴에 해당하는 좌측 패널 탭(.ref-item) */
function activeTabItem(){
  if(scheme==='ref'){
    const rl = document.getElementById('refList');
    return rl ? [...rl.querySelectorAll('.ref-item')].find(it=>it.dataset.reffirm===refFirm) : null;
  }
  const snl = document.getElementById('sianList');
  if(!snl) return null;
  return [...snl.querySelectorAll('.ref-item')].find(it=>
    (sianScheme==='s1') ? (it.dataset.sian==='s1' && it.dataset.ver===s1Ver)
                        : (it.dataset.sian===sianScheme)) || null;
}
/* 우측 패널: 활성 탭의 탭명/탭설명(2줄, 편집 반영) + 해당 버전 음성 시나리오 */
/* 버전별 음성 시나리오 기본 텍스트 */
const DEFAULT_SCENARIO = {
  v1:  '[Ver 1.0 · 디지털 ARS + 보이는 ARS]\n안녕하세요, 키움증권입니다.\n화면에서 자주 찾는 서비스와 보이는 ARS 메뉴를 직접 선택해 이용하실 수 있습니다.',
  v11: '안녕하세요, 키움증권입니다.\n새로워진 메인 화면에서 원하시는 서비스를 한눈에 선택해 주세요.',
  v2:  '[Ver 2.0 · 단순 ARS 메뉴연결]\n안녕하세요, 키움증권입니다.\n음성 ARS 순서 그대로 번호를 선택해 원하시는 메뉴로 이동하세요.',
  v21: '안녕하세요, 키움증권입니다.\n셀프서비스 · ARS메뉴 · 상담원연결 탭에서 원하시는 업무를 선택해 주세요.',
  v40: '안녕하세요, 키움증권입니다.\n무엇을 도와드릴까요? 원하시는 메뉴를 선택해 주세요.\n\n[메인 헤더 문구 후보]\n- 혼자서도 쉽게 할 수 있어요\n- 상담 없이 직접 해결할 수 있어요\n- 몇 초면 직접 처리할 수 있어요\n- 혼자서도 간편하게 해결해요',
  v41: '안녕하세요, 키움증권입니다.\n무엇을 도와드릴까요? 9개 대메뉴를 그리드에서 한눈에 선택해 주세요.',
  v42: '안녕하세요, 키움증권입니다.\n무엇을 도와드릴까요? 원하시는 메뉴를 선택해 주세요.',
  dars1: '[Ver 3.0 · 밝은 버전 디자인]\n안녕하세요, 키움증권입니다.\n이용하실 서비스를 선택해 주세요.',
  dars2: '[Ver 1.2.1 · 큰 카드 + 인라인]\n안녕하세요, 키움증권입니다.\n큰 카드를 누르면 그 자리에서 바로 펼쳐지는 메뉴를 이용하세요.',
  dars1v44: '[Ver 4.4 · 인디고 디자인]\n안녕하세요, 키움증권입니다.\n원하시는 서비스를 선택해 주세요.',
  v45: '[Ver 4.5 · 인디고 디자인 · s1 기반]\n안녕하세요, 키움증권입니다.\n원하시는 서비스를 선택해 주세요.',
};
/* 버전 탭 설명(rf-tel) 소스 기본값 — 사이드바에서 편집한 멀티라인 설명을 소스에 고정(모든 접속자 동일 표시) */
const DEFAULT_TAB_LABELS = {
  v11: {nm:'Ver 1.1', tel:'디지털 ARS + \n보이는 ARS (화면구현) +  \n상담원연결 (해당스킬연결)\n\n\n- 메인화면에 보이는 ARS 삭제\n- 이벤트 배너 삭제'},
  v21: {nm:'Ver 2.1', tel:'디지털 ARS + \n보이는 ARS (단순메뉴연결) +\n상담원연결 (해당스킬연결)\n\n\n- 보이는 ARS 현행과 동일\n- 메인화면에 모든 탭 추가\n- 전체메뉴 수정'},
  v40: {nm:'Ver 4.0', tel:'- 상담순위 기반 카테고리 재분석\n: 유선상담 + 채팅/챗봇상담\n\n- 간단, 쉬움, 직관적, 큰글씨 기능\n: 40~50대 타겟\n\n- 번호 구분 없이 통합 \n: 셀프서비스(디지털 ARS) +  보이는 ARS(1544-9900) + 상담원연결(1544-9000) 탭으로 나눴던 부분 통합\n\n★ 상담원 연결로 이어지지 않게 하는 것이 목표!!!'},
  v41: {nm:'Ver 4.1', tel:'Ver 4.0 · 메인 한페이지 버전'},
  v42: {nm:'Ver 4.2', tel:'Ver 4.0 · 10월 오픈 버전\n\n- 영S# + AI 챗봇 +  음성ARS\n- 관련 부서 상담원연결 포함\n(1544-9900 + 1544-9000)\n\n- 셀프서비스 미반영'},
};
function applyDefaultTabLabels(list){
  if(!list) return;
  list.querySelectorAll('.ref-item').forEach(it=>{
    const d = DEFAULT_TAB_LABELS[tabItemKey(it)]; if(!d) return;
    const nm = it.querySelector('.rf-nm'), tel = it.querySelector('.rf-tel');
    if(nm && d.nm) nm.textContent = d.nm;
    if(tel && d.tel != null) tel.textContent = d.tel;
  });
}
function loadScenario(key){
  try{ const m = JSON.parse(localStorage.getItem('darsScenarios_v5') || '{}'); if(m[key]!=null) return m[key]; }catch(_){}
  return DEFAULT_SCENARIO[key] || '안녕하세요, 키움증권입니다.\n원하시는 서비스를 선택해 주세요.\n\n(더블클릭하여 음성 시나리오를 입력하세요)';
}
function saveScenario(key, text){
  if(!key) return;
  try{ const m = JSON.parse(localStorage.getItem('darsScenarios_v5') || '{}'); m[key]=text; localStorage.setItem('darsScenarios_v5', JSON.stringify(m)); }catch(_){}
}
function updateSceneLabel(){
  const panel = document.getElementById('scenePanel'); if(!panel) return;
  const ai = activeTabItem();
  panel.classList.toggle('show', !!ai);
  if(!ai) return;
  const nm = (ai.querySelector('.rf-nm')?.textContent || '').trim();
  const tel = (ai.querySelector('.rf-tel')?.textContent || '').trim();
  const nmEl = document.getElementById('spName'), dcEl = document.getElementById('spDesc'), scEl = document.getElementById('spScenario');
  if(nmEl) nmEl.textContent = nm;
  if(dcEl) dcEl.textContent = tel;
  if(scEl && !scEl.isContentEditable) scEl.textContent = loadScenario(tabItemKey(ai));   // 편집 중 아니면 시나리오 갱신
  // 현재 버전 접속 QR (시안 탭에서만 · 버전별 이미지)
  const QR_MAP = {
    v1:['kiwoom-qr-ver1.0.png','Ver 1.0'], v11:['kiwoom-qr-ver1.1.png','Ver 1.1'],
    v2:['kiwoom-qr-ver2.0.png','Ver 2.0'], v21:['kiwoom-qr-ver2.1.png','Ver 2.1'],
    v40:['kiwoom-qr-v40.png','Ver 4.0'],
    v41:['kiwoom-qr-v41.png','Ver 4.1'], v42:['kiwoom-qr-v42.png','Ver 4.2'],
    v45:['kiwoom-qr-v45.png','Ver 4.5'], v46:['kiwoom-qr-v45.png','Ver 4.6'],
    v47:['kiwoom-qr-v47.png','Ver 4.7'],
    dform:['kiwoom-qr-dform.png','Digital Form'], dform2:['kiwoom-qr-dform2.png','Ver 4.3'], dform3:['kiwoom-qr-dform3.png','Digital Form_v0.1'],
    dars1:['kiwoom-qr-ver3.0.png','Ver 3.0'], dars2:['kiwoom-qr-ver1.2.1.png','Ver 1.2.1']
  };
  const qrKey = (scheme!=='ref') ? ((sianScheme==='s1') ? s1Ver : sianScheme) : null;
  const qrWrap = document.getElementById('spQrWrap'), qrImg = document.getElementById('spQr'), qrCap = document.getElementById('spQrCap');
  if(qrWrap){
    if(qrKey && QR_MAP[qrKey]){
      if(qrImg) qrImg.src = QR_MAP[qrKey][0];
      if(qrCap) qrCap.textContent = '스캔 시 ' + QR_MAP[qrKey][1] + ' 화면으로 열립니다';
      qrWrap.classList.add('show');
    } else qrWrap.classList.remove('show');
  }
}
/* 참고 리스트: 증권사 선택 → 해당 목업 표시 */
function selectRefFirm(firm){ refFirm = firm; switchScheme('ref'); }
/* 시안 리스트: 시안 선택 → 해당 시안의 '메인(home) 화면'으로 띄움 (ver 지정 시 시안1 버전 전환) */
function selectSian(v, ver){
  // 탭 전환 시 #screen에 떠 있던 오버레이(챗봇·매체시트·상담팝업·앱연결·안내팝업·계단주문·계좌시트 등) 모두 닫고 해당 탭 메인화면으로 진입
  closeAiChat(); closeMethodSheet(); closeConsult(); closeAppLink(); closeModal(); closeStkSheet(); closeAcctSheet(); closeCertSheet(); closeCalendar(); closeMenuDrawer();
  sianScheme = v;
  if(v==='s1'){
    if(ver) s1Ver = ver;
    // 깊은 페이지에 있었어도 항상 메인(home)으로 초기화 + 인라인 탭/트리 상태 리셋
    closeMenuDrawer();
    s1state.page='home'; s1state.fromFav=false; s1state.noHome=false; s1state.noBack=false; s1state.history=[];
    s1state.v21Tab='self'; s1state.v45Tab='common'; s1state.v45Cat=null; s1state.v47Cat=null; s1state.sarsPath=[]; s1state.amOpen=-1; s1state.amOpen2=-1;
    renderS1();
  } else if(v==='dars1'){ if(window.__darsHome1) window.__darsHome1(); }
  else if(v==='dars2'){ if(window.__darsHome2) window.__darsHome2(); }
  else if(v==='dform'){ if(window.__dformHome) window.__dformHome(); }
  else if(v==='dform2'){ if(window.__dform2Home) window.__dform2Home(); }
  else if(v==='dform3'){ if(window.__dform3Home) window.__dform3Home(); }
  else if(v==='dform4'){ if(window.__dform4Home) window.__dform4Home(); }
  else if(v==='dars1v44'){ if(window.__darsHome1v44) window.__darsHome1v44(); }
  switchScheme('sian');
}
(function(){
  const rl = document.getElementById('refList');
  if(rl) rl.addEventListener('click', e=>{
    if(e.target.isContentEditable) return;          // 편집 중 클릭은 선택 무시
    const it = e.target.closest('[data-reffirm]');
    if(it) selectRefFirm(it.dataset.reffirm);
  });
  const snl = document.getElementById('sianList');
  if(snl) snl.addEventListener('click', e=>{
    if(e.target.isContentEditable) return;
    if(e.target.closest('[data-prevtoggle]')){ snl.classList.toggle('prev-open'); return; }   // '이전버전' 섹션 [+] 접기/펼치기
    const it = e.target.closest('[data-sian]');
    if(it) selectSian(it.dataset.sian, it.dataset.ver);
  });
  // ※ #sianList 드래그 순서변경은 제거 — '이전버전' 섹션(중간 타이틀) 구조를 restoreTabOrder가 평탄화해 깨뜨리므로.
  //    (refList는 단일 섹션이라 드래그 유지) 필요 시 섹션 인지형 정렬로 재도입 가능.
  enableDragSort(rl, 'darsRefTabOrder');
  // 더블클릭 시 탭명/설명 인라인 편집 + 저장
  applyDefaultTabLabels(snl);   // 소스 기본 라벨(편집 확정본) 적용 후 저장값 복원
  enableTabEdit(snl, 'darsSianTabLabels_v5');   // 키 버전업: 편집 확정본을 소스에 고정(옛 저장 라벨 무효화)
  enableTabEdit(rl, 'darsRefTabLabels');
  // 우측 패널 시나리오 더블클릭 편집 (버전별 저장)
  const sc = document.getElementById('spScenario');
  if(sc){
    sc.addEventListener('dblclick', ()=>{
      if(sc.isContentEditable) return;
      sc.setAttribute('contenteditable','true'); sc.classList.add('editing');
      sc.focus(); placeCaretEnd(sc);
    });
    sc.addEventListener('blur', ()=>{
      if(!sc.isContentEditable) return;
      sc.removeAttribute('contenteditable'); sc.classList.remove('editing');
      const ai = activeTabItem();
      if(ai) saveScenario(tabItemKey(ai), sc.innerText.trim());
    });
    sc.addEventListener('keydown', e=>{ if(e.key==='Escape'){ e.preventDefault(); sc.blur(); } });
  }
  // 우측 패널 탭명/탭설명 더블클릭 편집 → 활성 탭(좌측 사이드바)에 반영 + 저장
  [document.getElementById('spName'), document.getElementById('spDesc')].forEach(el=>{
    if(!el) return;
    el.addEventListener('dblclick', ()=>{
      if(el.isContentEditable) return;
      el.setAttribute('contenteditable','true'); el.classList.add('editing');
      el.focus(); placeCaretEnd(el);
    });
    el.addEventListener('blur', ()=>{
      if(!el.isContentEditable) return;
      el.removeAttribute('contenteditable'); el.classList.remove('editing');
      applyScenePanelEdit();
    });
    el.addEventListener('keydown', e=>{
      if(e.key==='Escape'){ e.preventDefault(); el.blur(); return; }
      // 탭명(spName)=Enter로 편집 완료 / 탭설명(spDesc)=Enter 줄바꿈 허용(시나리오 입력창처럼)
      if(e.key==='Enter' && el.id!=='spDesc'){ e.preventDefault(); el.blur(); }
    });
  });
})();
/* 우측 패널에서 편집한 탭명/탭설명을 활성 탭(.ref-item rf-nm/rf-tel)에 반영 + localStorage 저장 */
function applyScenePanelEdit(){
  const ai = activeTabItem(); if(!ai) return;
  const nm = (document.getElementById('spName')?.textContent || '').trim();
  const tel = (document.getElementById('spDesc')?.innerText || '').trim();
  const nmEl = ai.querySelector('.rf-nm'), telEl = ai.querySelector('.rf-tel');
  if(nmEl) nmEl.textContent = nm;
  if(telEl) telEl.textContent = tel;
  const list = ai.closest('.ref-list');
  if(list) saveTabLabels(list, list.id==='refList' ? 'darsRefTabLabels' : 'darsSianTabLabels_v4');
}
/* 좌측 패널 탭 더블클릭 → 탭명/설명 인라인 편집(저장: localStorage) */
function enableTabEdit(list, labelKey){
  if(!list) return;
  restoreTabLabels(list, labelKey);   // 저장된 탭명/설명 복원 (편집은 우측 패널에서)
}
function placeCaretEnd(el){
  try{ const r=document.createRange(); r.selectNodeContents(el); r.collapse(false);
    const s=getSelection(); s.removeAllRanges(); s.addRange(r); }catch(_){}
}
function startTabEdit(it, list, labelKey){
  it.classList.add('editing');
  it.setAttribute('draggable','false');
  const nm = it.querySelector('.rf-nm'), tel = it.querySelector('.rf-tel');
  [nm,tel].forEach(el=>{ if(el) el.setAttribute('contenteditable','true'); });
  if(nm){ nm.focus(); placeCaretEnd(nm); }
  function finish(){
    [nm,tel].forEach(el=>{ if(el) el.removeAttribute('contenteditable'); });
    it.classList.remove('editing');
    it.setAttribute('draggable','true');
    saveTabLabels(list, labelKey);
    updateSceneLabel();          // 활성 탭을 편집했으면 씬 라벨도 즉시 동기화
    it.removeEventListener('focusout', onOut);
    it.removeEventListener('keydown', onKey);
  }
  function onOut(){ setTimeout(()=>{ if(!it.contains(document.activeElement)) finish(); }, 0); }
  function onKey(ev){
    if(ev.key==='Enter'){ ev.preventDefault();
      if(document.activeElement===nm && tel){ tel.focus(); placeCaretEnd(tel); } else finish(); }
    else if(ev.key==='Escape'){ ev.preventDefault(); finish(); }
  }
  it.addEventListener('focusout', onOut);
  it.addEventListener('keydown', onKey);
}
function saveTabLabels(list, labelKey){
  try{
    const map = JSON.parse(localStorage.getItem(labelKey) || '{}');
    list.querySelectorAll('.ref-item').forEach(it=>{
      const k = tabItemKey(it); if(!k) return;
      const nm = it.querySelector('.rf-nm'), tel = it.querySelector('.rf-tel');
      map[k] = { nm: nm ? nm.textContent.trim() : '', tel: tel ? tel.textContent.trim() : '' };
    });
    localStorage.setItem(labelKey, JSON.stringify(map));
  }catch(_){}
}
function restoreTabLabels(list, labelKey){
  let map; try{ map = JSON.parse(localStorage.getItem(labelKey) || 'null'); }catch(_){ return; }
  if(!map) return;
  list.querySelectorAll('.ref-item').forEach(it=>{
    const saved = map[tabItemKey(it)]; if(!saved) return;
    const nm = it.querySelector('.rf-nm'), tel = it.querySelector('.rf-tel');
    if(nm && saved.nm) nm.textContent = saved.nm;
    if(tel && saved.tel != null) tel.textContent = saved.tel;
  });
}
/* .ref-item 고유키 (시안 버전/시안2·3/참고 증권사) */
function tabItemKey(it){ return it.dataset.ver || it.dataset.sian || it.dataset.reffirm || ''; }
/* 저장된 순서대로 DOM 재배치 */
function restoreTabOrder(list, storeKey){
  if(!list || !storeKey) return;
  let saved; try{ saved = JSON.parse(localStorage.getItem(storeKey) || 'null'); }catch(_){ return; }
  if(!Array.isArray(saved) || !saved.length) return;
  const byKey = {};
  list.querySelectorAll('.ref-item').forEach(it=> byKey[tabItemKey(it)] = it);
  const anchor = list.querySelector('.func-title');   // '시연·기능' 섹션은 항상 맨 아래 유지
  saved.forEach(k=>{ if(byKey[k]){ anchor ? list.insertBefore(byKey[k], anchor) : list.appendChild(byKey[k]); } });
}
/* 현재 순서를 저장 */
function saveTabOrder(list, storeKey){
  if(!list || !storeKey) return;
  try{
    const order = [...list.querySelectorAll('.ref-item')].map(tabItemKey);
    localStorage.setItem(storeKey, JSON.stringify(order));
  }catch(_){}
}
/* .ref-item 들을 드래그로 재배치 */
function enableDragSort(list, storeKey){
  if(!list) return;
  restoreTabOrder(list, storeKey);   // 새로고침 시 저장된 순서 복원
  let dragEl = null;
  list.querySelectorAll('.ref-item').forEach(it=> it.setAttribute('draggable','true'));
  function afterEl(y){
    return [...list.querySelectorAll('.ref-item:not(.dragging)')].reduce((closest, child)=>{
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height/2;
      if(offset < 0 && offset > closest.offset) return {offset, element:child};
      return closest;
    }, {offset:-Infinity, element:null}).element;
  }
  list.addEventListener('dragstart', e=>{
    const it = e.target.closest('.ref-item'); if(!it) return;
    dragEl = it; it.classList.add('dragging');
    if(e.dataTransfer){ e.dataTransfer.effectAllowed='move'; try{ e.dataTransfer.setData('text/plain',''); }catch(_){}}
  });
  list.addEventListener('dragend', ()=>{
    if(dragEl){ dragEl.classList.remove('dragging'); dragEl=null; saveTabOrder(list, storeKey); }   // 변경된 순서 저장
  });
  list.addEventListener('dragover', e=>{
    if(!dragEl) return;
    e.preventDefault();
    const ref = afterEl(e.clientY);
    if(ref==null){ const anchor = list.querySelector('.func-title'); anchor ? list.insertBefore(dragEl, anchor) : list.appendChild(dragEl); }
    else if(ref!==dragEl) list.insertBefore(dragEl, ref);
  });
}

/* 토스트 */
let toastT;
function flash(msg){
  let el = document.getElementById('toast');
  if(!el){ el=document.createElement('div'); el.id='toast';
    el.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:rgba(20,12,40,.95);color:#fff;padding:13px 22px;border-radius:14px;font-size:14px;font-weight:600;z-index:999;box-shadow:0 10px 30px rgba(0,0,0,.4);transition:.25s;border:1px solid rgba(255,255,255,.15)';
    document.body.appendChild(el); }
  el.textContent=msg; el.style.opacity='1';
  clearTimeout(toastT); toastT=setTimeout(()=>el.style.opacity='0',2200);
}

/* 초기화 */
rerender();
switchScheme('sian');

/* URL 파라미터로 초기 버전 지정 (모바일 데모용): index.html?v=dars1(=Ver3.0) / ?v=v30 / ?v=v21 등 */
(function(){
  try{
    var raw = (new URLSearchParams(location.search).get('v') || new URLSearchParams(location.search).get('ver') || '').trim().toLowerCase();
    if(!raw) return;
    var MAP = {
      'v1':['s1','v1'],'1.0':['s1','v1'],
      'v11':['s1','v11'],'1.1':['s1','v11'],
      'v2':['s1','v2'],'2.0':['s1','v2'],
      'v21':['s1','v21'],'2.1':['s1','v21'],
      'v40':['s1','v40'],'4.0':['s1','v40'],'v4':['s1','v40'],
      'v41':['s1','v41'],'4.1':['s1','v41'],'v4.1':['s1','v41'],
      'v42':['s1','v42'],'4.2':['s1','v42'],'v4.2':['s1','v42'],
      'v45':['s1','v45'],'4.5':['s1','v45'],'v4.5':['s1','v45'],
      'v47':['s1','v47'],'4.7':['s1','v47'],'v4.7':['s1','v47'],
      'v46':['s1','v46'],'4.6':['s1','v46'],'v4.6':['s1','v46'],
      'dars1':['dars1'],'3.0':['dars1'],'v3':['dars1'],'v30':['dars1'],
      'dars2':['dars2'],'1.2.1':['dars2'],'s3':['dars2'],
      'dform':['dform'],'dform2':['dform2'],'4.3':['dform2'],'v4.3':['dform2'],'dform3':['dform3']
    };
    var sel = MAP[raw];
    if(sel) selectSian(sel[0], sel[1]);
  }catch(e){}
})();
