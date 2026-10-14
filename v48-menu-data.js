/* Ver 4.8 only. Menu hierarchy revised from the requested 9-category tree.
 * Existing service IDs remain stable when a service moves or is renamed.
 * Workbook detail records are retained for grouped services and self-service links. */
(function(root, factory){
  const catalog = factory();
  if(typeof module === 'object' && module.exports) module.exports = catalog;
  root.V48Menu = catalog;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  const originalCategories = [
    {id:1, title:"인증", subtitle:"인증서/ID/PW", items:[
      {"id":"1-1","title":"계좌정보 조회 및 변경 방법","row":6,"topics":["계좌정보 + 영S# 연동"],"channels":["app","agent","ars"]},
      {"id":"1-2","title":"사고 등록/해지","row":8,"topics":["사고 등록","사고 등록내역 조회","사고 해지"],"channels":["app","agent","ars"]},
      {"id":"1-3","title":"증권계좌번호 확인 및 계좌비밀번호 재설정 방법","row":13,"topics":["증권계좌 리스트"],"channels":["app","agent"]},
      {"id":"1-4","title":"ID 조회 / ID비밀번호재설정","row":14,"topics":["ID 조회","IDPW 재설정"],"channels":["app","agent"]},
      {"id":"1-5","title":"장기미사용ID 제한 해제","row":16,"topics":["장기미사용 ID 조회","장기미사용 ID 제한해지"],"channels":["app","agent"]},
      {"id":"1-6","title":"간편인증/공동인증서 발급방법","row":18,"topics":["자주묻는질문 + 매체연동"],"channels":["app","agent"]},
      {"id":"1-7","title":"실물 OTP 조회","row":19,"topics":["OTP 조회내역","OTP 등록내역 없음"],"channels":["app","agent"]},
    ]},
    {id:2, title:"비대면업무", subtitle:"신청/내역조회", items:[
      {"id":"2-1","title":"서류신청","row":21,"topics":["잔고증명서 신청","거래내역서 신청","금융소득내역서 신청","원천징수내역서 신청","그외서류","신청완료 페이지"],"channels":["app","agent"]},
      {"id":"2-2","title":"계좌개설 이어하기","row":28,"topics":["접수내역 (최근 접수 건 표기)","접수내역 없음"],"channels":["app","agent"]},
      {"id":"2-3","title":"출금계좌등록","row":30,"topics":["접수내역 (최근 접수 건 표기)","접수내역 없음"],"channels":["app","agent"]},
      {"id":"2-4","title":"계좌폐쇄","row":32,"topics":["접수내역 (최근 접수 건 표기)","접수내역 없음"],"channels":["app","agent"]},
    ]},
    {id:3, title:"뱅킹서비스", subtitle:"입출금/입출고", items:[
      {"id":"3-1","title":"은행이체","row":35,"topics":["자주묻는질문 + 매체연동"],"channels":["app","agent","ars"]},
      {"id":"3-2","title":"금융거래목적확인서","row":40,"topics":["장기미사용","단기간다수계좌개설","등록 가능한 계좌없음"],"channels":["app","agent"]},
      {"id":"3-3","title":"한도제한계좌해제","row":43,"topics":["제한여부 + 해제방법","한도제한된 계좌 없음"],"channels":["app","agent"]},
      {"id":"3-4","title":"주식대체","row":45,"topics":["국내주식 출고신청내역 조회","신청내역 없음, 신청방법"],"channels":["app","agent"]},
    ]},
    {id:4, title:"신용/대출", subtitle:"미수/신용/대출", items:[
      {"id":"4-1","title":"미수 및 반대매매","row":47,"topics":["금일 반대매매 현황"],"channels":["app","agent"]},
      {"id":"4-2","title":"신용/대출 약정 및 신청방법","row":48,"topics":["약정 및 신청방법"],"channels":["app","agent"]},
      {"id":"4-3","title":"신용/대출 잔고조회","row":49,"topics":["잔고조회"],"channels":["app","agent","ars"]},
      {"id":"4-4","title":"신용/대출 만기일연장","row":51,"topics":["잔고선택 후 만기일연장"],"channels":["app","agent"]},
      {"id":"4-5","title":"신용/대출 상환","row":54,"topics":["잔고선택 후 현금상환신청"],"channels":["app","agent"]},
    ]},
    {id:5, title:"권리/청약", subtitle:"유상/공모주", items:[
      {"id":"5-1","title":"유상청약","row":56,"topics":["유상청약 신청/취소","유상청약 예약신청/취소","유상청약 신청내역 조회"],"channels":["app","agent","ars"]},
      {"id":"5-2","title":"공모주청약","row":60,"topics":["공모주청약 신청/취소","공모주청약 경쟁률 조회","공모주 정보 조회","공모주 풋백 옵션"],"channels":["app","agent","ars"]},
      {"id":"5-3","title":"반대의사 및 매수청구","row":66,"topics":["반대의사","매수청구"],"channels":["app","agent"]},
      {"id":"5-4","title":"그외 권리업무","row":71,"topics":["그외권리"],"channels":["app","agent"]},
    ]},
    {id:6, title:"매체", subtitle:"HTS/MTS/ARS", items:[
      {"id":"6-1","title":"ARS 주문이용신청/해지","row":73,"topics":["ARS 주문이용신청/해지"],"channels":["agent","ars"]},
      {"id":"6-2","title":"ARS 주문비밀번호 등록/변경","row":75,"topics":["ARS 주문비밀번호 등록/변경"],"channels":["agent","ars"]},
      {"id":"6-3","title":"ARS 퀵넘버플러스 등록/삭제","row":77,"topics":["퀵넘버플러스 조회/삭제"],"channels":["app","agent","ars"]},
      {"id":"6-4","title":"HTS 화면 문의","row":79,"topics":["자주묻는질문"],"channels":["agent"]},
      {"id":"6-5","title":"MTS 화면 문의","row":80,"topics":["자주묻는질문"],"channels":["agent"]},
    ]},
    {id:7, title:"주식", subtitle:"국내/해외", items:[
      {"id":"7-1","title":"국내주식 시세 및 시황","row":81,"topics":["현재가 조회","지수정보 및 주식시황"],"channels":["app","agent","ars"]},
      {"id":"7-2","title":"국내주식 주문","row":86,"topics":["주문"],"channels":["app","agent","ars"]},
      {"id":"7-3","title":"국내주식 체결조회","row":92,"topics":["주문내역 조회","예약주문내역 조회"],"channels":["app","agent","ars"]},
      {"id":"7-4","title":"예수금 및 잔고조회","row":97,"topics":["예수금 및 추정예탁자산 조회","주문가능금액 조회","주식잔고 조회"],"channels":["app","agent","ars"]},
      {"id":"7-5","title":"대체거래소 문의","row":100,"topics":["자주묻는질문 + 매체연동"],"channels":["app","agent"]},
      {"id":"7-6","title":"K-OTC 문의","row":101,"topics":[],"channels":["ars"]},
      {"id":"7-7","title":"ETF/ETN/레버리지ETP 문의","row":107,"topics":["거래가능여부 조회화면"],"channels":["app","agent"]},
      {"id":"7-8","title":"해외주식 문의","row":108,"topics":["해외지수정보","환율 및 환전방법 안내","해외주식 배당/권리일정 안내","해외주식 양도소득세 안내","RIA 계좌 문의"],"channels":["app","agent","ars"]},
      {"id":"7-9","title":"해외주식 거래시간 및 휴장일","row":113,"topics":["해외주식 거래시간 안내","휴장일 안내"],"channels":["app","agent"]},
    ]},
    {id:8, title:"금융상품", subtitle:"ISA/연금/펀드", items:[
      {"id":"8-1","title":"계좌개설 및 가입서류 문의","row":115,"topics":["IRP, 연금, ISA"],"channels":["app","agent"]},
      {"id":"8-2","title":"상품 문의","row":117,"topics":["펀드, ELS/ELB, 발행어음, 채권, 퇴직연금, 랩어카운트"],"channels":["app","agent"]},
      {"id":"8-3","title":"계좌상세 문의","row":119,"topics":["금융상품계좌 평가금액 조회","금융상품계좌 예수금 조회","금융상품계좌 거래내역 조회"],"channels":["app","agent","ars"]},
    ]},
    {id:9, title:"선물옵션", subtitle:"파생상품/CFD", items:[
      {"id":"9-1","title":"국내선물옵션","row":122,"topics":["자주묻는질문 + 매체연동"],"channels":["agent","ars"]},
      {"id":"9-2","title":"해외선물옵션","row":123,"topics":["자주묻는질문 + 매체연동"],"channels":["agent"]},
      {"id":"9-3","title":"국내CFD","row":124,"topics":["자주묻는질문 + 매체연동"],"channels":["agent"]},
      {"id":"9-4","title":"해외CFD 및 상품선물옵션","row":125,"topics":["자주묻는질문 + 매체연동"],"channels":["agent"]},
    ]},
  ];
  const originalItems = originalCategories.flatMap(category=>category.items);
  const existing = (id,title) => ({...originalItems.find(item=>item.id===id),...(title?{title}:{})});
  const group = (id,title,description,children) => ({id,title,description,children});
  const document = (id,title) => ({id,title,document:title,description:`${title} 발급에 필요한 정보를 입력해요`});
  const otherDocuments = [
    document('doc-bank-transfers','은행이체거래내역서'),
    document('doc-etp-trades','레버리지 ETP 거래확인서'),
    document('doc-withholding','원천징수내역서'),
    document('doc-foreign-tax','외납세액명세서'),
    document('doc-overseas-gains','해외주식 양도소득내역서'),
    document('doc-derivatives-tax','파생상품 양도소득세 계산명세서')
  ].map(item=>({...item,documentMode:'period'}));
  const categories = [
    {id:1,title:'계좌정보',subtitle:'고객정보/ID/PW',items:[
      existing('1-1','고객정보 조회'),
      {id:'account-number',title:'증권계좌번호 조회',description:'보유 중인 증권계좌번호를 확인해요'},
      {id:'linked-bank',title:'연결 은행계좌정보 조회',description:'증권계좌에 연결된 은행계좌 정보를 확인해요'},
      existing('1-4','ID 조회 / ID 비밀번호 재설정'),
      existing('1-5','장기미사용 ID 제한 해제'),
      existing('3-2'),existing('1-2','사고등록/해지')
    ]},
    {id:2,title:'인증센터',subtitle:'ARS/인증서/OTP',items:[
      group('ars','ARS','ARS 주문 서비스와 비밀번호·퀵넘버플러스를 관리해요',['6-1','6-2','6-3']),
      existing('1-6','간편인증/공동인증서'),existing('1-7','OTP')
    ]},
    {id:3,title:'개설/폐쇄',subtitle:'이어하기/내역조회',items:[
      existing('2-2'),existing('2-4')
    ]},
    {id:4,title:'서류발급',subtitle:'신청/내역조회',items:[
      document('doc-balance','잔고증명서'),document('doc-trades','거래내역서'),document('doc-income','금융소득내역서'),
      group('doc-other','기타서류','신청할 서류를 선택해 주세요.',otherDocuments.map(item=>item.id))
    ]},
    {id:5,title:'뱅킹서비스',subtitle:'입출금/입출고',items:[
      existing('3-1'),existing('2-3'),existing('3-3','한도제한계좌 해제'),existing('3-4')
    ]},
    {id:6,title:'신용/대출',subtitle:'미수/신용/대출',items:[
      existing('4-1','미수현황'),existing('4-2','신용/대출 서비스안내'),existing('4-3'),existing('4-4'),existing('4-5','신용/대출 현금상환')
    ]},
    {id:7,title:'권리/청약',subtitle:'유상/공모주',items:[
      existing('5-1'),existing('5-2'),existing('5-3'),existing('5-4','그 외 권리업무')
    ]},
    {id:8,title:'주문/시세',subtitle:'국내주식',items:[
      existing('7-1','시세 및 시황'),existing('7-2'),existing('7-3','국내주식 주문내역 조회'),existing('7-4')
    ]},
    {id:9,title:'상품문의',subtitle:'해외/금융/파생',items:[
      existing('7-8'),
      group('financial-products','금융상품(ISA/연금/펀드) 문의','금융상품 가입과 상품·계좌내역을 안내해요',['8-1','8-2','8-3']),
      group('derivatives','파생상품(선물옵션/CFD) 문의','국내외 선물옵션과 CFD 이용 방법을 안내해요',['9-1','9-2','9-3','9-4']),
      group('media-help','매체(HTS/MTS) 문의','PC와 모바일 영웅문 화면 이용 방법을 안내해요',['6-4','6-5'])
    ]}
  ];
  const activeIds = new Set(categories.flatMap(category=>category.items.map(item=>item.id)));
  const legacyItems = originalItems.filter(item=>!activeIds.has(item.id));
  const selfServices = [
    {"id":"self-1","title":"입출금이 안 돼요","row":6},
    {"id":"self-2","title":"서류 발급현황이 궁금해요","row":13},
    {"id":"self-3","title":"ISA 가입서류를 내고싶어요","row":18},
    {"id":"self-4","title":"비밀번호를 모르겠어요","row":23},
    {"id":"self-5","title":"비대면 접수현황이 궁금해요","row":27},
    {"id":"self-6","title":"오랜만에 키움증권 오셨나요","row":34},
    {"id":"self-7","title":"다른 분의 계좌로 잘못 입금했어요","row":44},
    {"id":"self-8","title":"레버리지ETP 거래가능한지 궁금해요","row":48},
    {"id":"self-8-futures","title":"선물옵션 거래가능한지 궁금해요","row":49},
  ];
  const freeze = value => {
    if(value && typeof value === 'object'){ Object.values(value).forEach(freeze); Object.freeze(value); }
    return value;
  };
  return freeze({categories, legacyItems, otherDocuments, selfServices});
});
