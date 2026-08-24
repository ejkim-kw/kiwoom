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
  function shouldHandle(version, menuTitle){
    return version==='v47' && Object.prototype.hasOwnProperty.call(MENU_KEYS,menuTitle);
  }
  function createState(menuTitle){
    const flow = MENU_KEYS[menuTitle];
    return flow ? {flow, step:flow==='accountPasswordGuide'?'guide':(flow==='accountProfile'?'accountAuth':'phone'), phoneVerified:false, selectedId:'', selectedAccount:'', completed:false, errors:{}} : null;
  }
  function transition(state, event){
    const next = {...state, errors:{}};
    if(event.type==='PHONE_REQUEST'){
      if(!(event.name||'').trim()) return {state, error:'고객명을 입력해 주세요.'};
      if(!/^\d{6}$/.test(event.dob||'')) return {state, error:'생년월일 6자리를 입력해 주세요.'};
      if(!/^\d{10,11}$/.test(event.phone||'')) return {state, error:'휴대폰 번호 10~11자리를 입력해 주세요.'};
      if(event.agreed!==true) return {state, error:'휴대폰 인증 필수 약관에 동의해 주세요.'};
      return {state:{...next, step:'phoneOtp'}, error:''};
    }
    if(event.type==='PHONE_VERIFY'){
      if(!/^\d{6}$/.test(event.otp||'')) return {state, error:'인증번호 6자리를 입력해 주세요.'};
      const step = state.flow==='accountNumbers' ? 'accountList' : 'selection';
      return {state:{...next, phoneVerified:true, step}, error:''};
    }
    if(event.type==='ACCOUNT_AUTH'){
      if(!DATA.accounts.some(x=>x.id===event.account)) return {state, error:'조회할 계좌를 선택해 주세요.'};
      if(!/^\d{4,8}$/.test(event.password||'')) return {state, error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.'};
      return {state:{...next, selectedAccount:event.account, step:'profile'}, error:''};
    }
    if(event.type==='SELECT_ID'){
      const selected = DATA.ids.find(x=>x.id===event.value);
      if(!selected) return {state, error:'ID를 선택해 주세요.'};
      if(state.flow==='dormantRelease' && !selected.dormant) return {state, error:'장기미사용 제한 ID를 선택해 주세요.'};
      return {state:{...next, selectedId:event.value, selectedAccount:''}, error:''};
    }
    if(event.type==='SELECT_ACCOUNT'){
      const owner = DATA.ids.find(x=>x.id===state.selectedId);
      if(!owner || !owner.accounts.includes(event.value)) return {state, error:'선택한 ID에 연결된 계좌를 선택해 주세요.'};
      return {state:{...next, selectedAccount:event.value}, error:''};
    }
    if(event.type==='CONTINUE'){
      if(!state.selectedId || !state.selectedAccount) return {state, error:'재설정할 ID와 계좌를 선택해 주세요.'};
      const owner = DATA.ids.find(x=>x.id===state.selectedId);
      if(!owner || !owner.accounts.includes(state.selectedAccount)) return {state, error:'선택한 ID에 연결된 계좌를 선택해 주세요.'};
      return {state:{...next, step:'accountPassword'}, error:''};
    }
    if(event.type==='ACCOUNT_PASSWORD'){
      if(!/^\d{4,8}$/.test(event.password||'')) return {state, error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.'};
      return state.flow==='dormantRelease'
        ? {state:{...next, step:'complete', completed:true}, error:''}
        : {state:{...next, step:'newIdPassword'}, error:''};
    }
    if(event.type==='NEW_ID_PASSWORD'){
      if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,8}$/.test(event.password||'')) return {state, error:'영문과 숫자를 조합해 5~8자리로 입력해 주세요.'};
      if(event.password!==event.confirm) return {state, error:'새 ID 비밀번호가 서로 일치하지 않아요.'};
      return {state:{...next, step:'complete', completed:true}, error:''};
    }
    if(event.type==='COMPLETE') return {state:{...next, step:'complete', completed:true}, error:''};
    return {state, error:''};
  }
  return {MENU_KEYS, DATA, shouldHandle, createState, transition};
});
