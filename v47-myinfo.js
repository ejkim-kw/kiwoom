(function(root, factory){
  const api = factory();
  if(typeof module === 'object' && module.exports) module.exports = api;
  root.V47MyInfo = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  const MENU_KEYS = {
    '계좌정보 조회 및 변경':'accountProfile',
    '증권계좌번호확인':'accountNumbers',
    '계좌비밀번호 재설정':'accountPasswordGuide',
    'ID조회/PW초기화':'idPassword',
    '장기미사용ID 제한 해지':'dormantRelease'
  };
  const DATA = {
    accounts:[
      {id:'52575602', type:'위탁종합', display:'5257-5602'},
      {id:'63217654', type:'중개형 ISA', display:'6321-7654'},
      {id:'50430218', type:'연금저축', display:'5043-0218'}
    ],
    ids:[
      {id:'kiwoom0728', accounts:['52575602','63217654'], dormant:false},
      {id:'hero2024', accounts:['50430218'], dormant:true}
    ],
    accountProfile:{
      address:'서울특별시 영등포구 여의나루로 **', phone:'010-****-7980',
      marketing:'알림톡 · 이메일', occupation:'회사원', residence:'대한민국'
    }
  };
  function createState(menuTitle){
    const flow = MENU_KEYS[menuTitle];
    return flow ? {flow, step:flow==='accountPasswordGuide'?'guide':(flow==='accountProfile'?'accountAuth':'phone'), phoneVerified:false, selectedId:'', selectedAccount:'', completed:false, errors:{}} : null;
  }
  return {MENU_KEYS, DATA, createState};
});
