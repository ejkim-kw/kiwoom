(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.V47SelfService = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const BASE_SELF_SERVICE_ITEMS = [
    { title:'입출금이 안돼요', sub:'한도제한·출금불가 원인을 즉시 확인해요', action:'iodstart', img:'assets/glass3.png', icon:'assets/v47-glass-3.png', v47Float:true },
    { title:'서류 발급현황이 궁금해요', sub:'신청 서류의 발급 상태를 바로 확인해요', action:'certstart', img:'assets/glass5.png', icon:'assets/v47-glass-2.png', v47Float:true },
    { title:'ISA 가입서류를 내고 싶어요', sub:'소득확인 서류를 제출하고 가입을 완료해요', action:'isastart', img:'assets/glass4.png', icon:'assets/v47-glass-7.png', v47Float:true },
    { title:'비밀번호를 모르겠어요', sub:'계좌 비밀번호를 안전하게 재설정해요', action:'pwreset', img:'assets/glass2.jpeg', icon:'assets/v47-glass-1.png', v47Float:true, v47Img:'assets/glass2-nobg.png' },
  ];

  const UNTACT_MENU_ITEM = {
    title:'비대면 접수현황이 궁금해요',
    sub:'비대면으로 신청한 업무의 처리 상태를 확인해요',
    action:'untactstatusstart',
    img:'assets/glass5.png',
    icon:'assets/v47-glass-2.png',
    v47Float:true,
  };

  const CERTIFICATE_STATUS = [
    { name:'잔고증명서', status:'발급완료', statusClass:'done', description:'2026.07.05 발급 · 이메일 발송 완료', reissue:true },
    { name:'거래내역서', status:'처리중', statusClass:'wait', description:'2026.07.08 신청 · 발급 준비 중', reissue:false },
    { name:'금융소득내역서', status:'발급완료', statusClass:'done', description:'2026.07.03 발급 · 이메일 발송 완료', reissue:true },
    { name:'제신고신청', status:'처리중', statusClass:'wait', description:'2026.07.09 신청 · 담당 부서 확인 중', reissue:false },
  ];

  const UNTACT_STATUS = [
    { name:'계좌개설', status:'처리완료', statusClass:'done', description:'2026.07.08 접수 · 계좌개설 완료' },
    { name:'출금계좌등록', status:'처리중', statusClass:'wait', description:'2026.07.09 접수 · 등록 정보 확인 중' },
    { name:'한도제한계좌해제', status:'보완필요', statusClass:'wait', description:'2026.07.07 접수 · 추가 서류 확인이 필요해요' },
    { name:'계좌폐쇄', status:'접수완료', statusClass:'done', description:'2026.07.10 접수 · 순서대로 처리 중' },
  ];

  const SUBMENU_DESCRIPTIONS = {
    '계좌정보 조회 및 변경':'등록된 계좌 정보를 확인하고 변경해요',
    '증권계좌번호확인':'보유한 증권계좌번호를 확인해요',
    '계좌비밀번호 재설정':'계좌 비밀번호 재설정 방법을 안내해요',
    'ID조회/PW초기화':'ID를 확인하고 비밀번호를 재설정해요',
    '장기미사용ID 제한 해지':'오래 사용하지 않은 ID 제한을 해제해요',
    '서류신청':'필요한 증명서와 서류를 신청해요',
    '계좌개설 이어하기':'중단한 계좌개설을 이어서 진행해요',
    '출금계좌등록':'출금에 사용할 계좌를 등록해요',
    '한도제한계좌해제':'계좌의 이체·출금 제한을 해제해요',
    '계좌폐쇄':'사용하지 않는 계좌를 안전하게 폐쇄해요',
    '은행이체':'은행 계좌로 간편하게 이체해요',
    '주식대체':'보유 주식을 다른 계좌로 대체해요',
    '미수 및 반대매매':'미수금과 반대매매 내역을 확인해요',
    '신용·대출 약정 및 신청방법':'신용·대출 신청 절차를 안내해요',
    '신용·대출 잔고조회':'신용·대출 이용 잔고를 확인해요',
    '신용·대출 만기일연장':'신용·대출 만기 연장 방법을 안내해요',
    '신용·대출 상환':'신용·대출 상환 방법을 안내해요',
    '유상청약':'유상증자 청약을 신청하고 확인해요',
    '공모주청약':'공모주 청약을 신청하고 내역을 확인해요',
    '반대의사 및 매수청구':'의사를 등록하고 처리 내역을 확인해요',
    '그의 권리업무':'기타 권리 관련 업무를 안내해요',
    '시세 및 시황':'현재 시세와 시장 흐름을 확인해요',
    '주문':'주식 주문 방법과 이용 절차를 안내해요',
    '체결조회':'주문 체결 여부와 내역을 확인해요',
    '예수금 및 잔고조회':'주문 가능 금액과 보유 잔고를 확인해요',
    '대체거래소 문의':'대체거래소 이용 방법을 안내해요',
    '해외주식 관련':'해외주식 거래와 이용 제도를 안내해요',
    'RIA계좌':'RIA계좌 이용 방법과 업무를 안내해요',
    'ISA 가입':'ISA 가입 조건과 절차를 안내해요',
    '연금 및 IRP 가입':'연금·IRP 가입 방법을 안내해요',
    'ELS·랩어카운트':'ELS와 랩어카운트 이용 방법을 안내해요',
    '펀드·채권·발행어음':'다양한 금융상품 정보를 확인해요',
    '계좌조회 및 뱅킹업무':'금융상품 계좌와 뱅킹 업무를 이용해요',
    '국내선물옵션':'국내선물옵션 거래 방법을 안내해요',
    '해외CFD 및 상품선물옵션':'해외 파생상품 거래 방법을 안내해요',
    '국내CFD':'국내CFD 거래 방법과 제도를 안내해요',
    'ARS 주문이용신청':'ARS 주문 서비스를 신청하고 관리해요',
    'ARS 주문비밀번호':'ARS 주문 비밀번호를 등록하고 변경해요',
    'ARS 퀵넘버플러스':'빠른 ARS 연결 번호를 관리해요',
    '간편인증·공동인증서':'인증서를 등록하고 안전하게 관리해요',
    'HTS 화면 문의':'HTS 화면 이용 문제를 해결해요',
    'MTS 화면 문의':'MTS 화면 이용 문제를 해결해요',
    '사고 등록·해지':'계좌 사고를 등록하거나 해지해요',
    '금융센터 전화번호 안내':'필요한 금융센터 연락처를 확인해요',
  };

  function getSelfServiceItems(version) {
    return version === 'v47'
      ? BASE_SELF_SERVICE_ITEMS.concat(UNTACT_MENU_ITEM)
      : BASE_SELF_SERVICE_ITEMS.slice();
  }

  function getStepperModel(version, title, steps, current) {
    if (version !== 'v47' || !Array.isArray(steps) || !steps.length) return null;
    const safeCurrent = Math.max(0, Math.min(steps.length - 1, Number.isFinite(current) ? current : 0));
    return {
      accessibleTitle:String(title || '셀프서비스'),
      labels:steps.slice(),
      current:safeCurrent,
      states:steps.map((_, index) => index < safeCurrent ? 'done' : (index === safeCurrent ? 'current' : 'upcoming')),
    };
  }

  function getCertificateResultInteraction(version) {
    const refreshToggles = version === 'v47';
    return {
      cardToggles:!refreshToggles,
      refreshToggles,
      refreshLabel:'다른 결과 보기',
    };
  }

  function getPasswordResetChoiceModel(version) {
    if (version !== 'v47') return null;
    return {
      title:'어떤 비밀번호를 재설정할까요?',
      description:'재설정할 비밀번호를 선택해 주세요.',
      stepLabel:'비밀번호 선택',
      options:[
        { kind:'pwreset0', name:'ID 비밀번호', description:'로그인에 쓰는 영문과 숫자를 조합한 5~8자리 비밀번호예요.' },
        { kind:'pwreset1', name:'증권계좌 비밀번호', description:'증권계좌에 쓰는 숫자 4~8자리 비밀번호예요.' },
        { kind:'pwreset2', name:'공동인증서 비밀번호', description:'영문·숫자·특수문자를 모두 포함한 10자리 이상 비밀번호예요.' },
      ],
    };
  }

  function getIdPasswordResetStepper(version, current) {
    return getStepperModel(version, 'ID 비밀번호 재설정', ['본인 인증','계좌 인증','비밀번호 재설정'], current);
  }

  function getPasswordResetGuideModel(version, kind) {
    if (version !== 'v47') return null;
    const guides = {
      account:{
        title:'증권계좌 비밀번호',
        rule:'숫자 4~8자리',
        description:'비밀번호가 기억나지 않으면 영웅문S#에서 다시 설정할 수 있어요.',
        appKey:'pwresetacct',
      },
      certificate:{
        title:'공동인증서 비밀번호',
        rule:'영문·숫자·특수문자를 모두 포함한 10자리 이상',
        description:'비밀번호가 기억나지 않으면 영웅문S#에서 다시 설정할 수 있어요.',
        appKey:'pwresetcert',
      },
    };
    return guides[kind] || null;
  }

  function getSelfServiceListPresentation(version) {
    return version === 'v47'
      ? { layout:'choice-cards', interactiveElement:'button' }
      : { layout:'legacy-rows', interactiveElement:'div' };
  }

  function getSubMenuListPresentation(version) {
    return version === 'v47'
      ? { layout:'choice-cards', interactiveElement:'button', density:'compact' }
      : null;
  }

  function getSubMenuDescription(version, name) {
    return version === 'v47' ? (SUBMENU_DESCRIPTIONS[name] || '') : '';
  }

  return { getSelfServiceItems, getStepperModel, getCertificateResultInteraction, getPasswordResetChoiceModel, getIdPasswordResetStepper, getPasswordResetGuideModel, getSelfServiceListPresentation, getSubMenuListPresentation, getSubMenuDescription, SUBMENU_DESCRIPTIONS, CERTIFICATE_STATUS, UNTACT_STATUS };
});
