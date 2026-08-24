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

  return { getSelfServiceItems, getStepperModel, CERTIFICATE_STATUS, UNTACT_STATUS };
});
