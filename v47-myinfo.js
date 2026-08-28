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
  const FLOW_META = {
    accountProfile:{title:'계좌정보 조회 및 변경',steps:[['accountAuth','계좌 인증'],['profile','계좌정보 확인']]},
    accountNumbers:{title:'증권계좌번호 확인',steps:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['accountList','계좌 확인']]},
    accountPasswordGuide:{title:'계좌비밀번호 재설정',steps:[['guide','비밀번호 안내']]},
    idPassword:{title:'ID 조회·비밀번호 초기화',steps:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['selection','ID·계좌 선택'],['accountPassword','계좌 인증'],['newIdPassword','비밀번호 재설정'],['complete','완료']]},
    dormantRelease:{title:'장기미사용 ID 제한 해제',steps:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['selection','ID·계좌 선택'],['accountPassword','계좌 인증'],['complete','완료']]}
  };
  const HELP_STEPS = {
    accountNumber:[['helpPhone','휴대폰 정보'],['helpPhoneOtp','인증번호'],['helpAccountList','계좌 확인']],
    accountPassword:[['helpPasswordGuide','비밀번호 안내']]
  };
  const DATA = {
    accounts:[
      {id:'52575602', type:'위탁종합'},
      {id:'63217654', type:'중개형 ISA'},
      {id:'50430218', type:'연금저축'}
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
  function isPhoneRequestReady(values){
    const v=values||{};
    return !!String(v.name||'').trim()
      && /^\d{6}$/.test(String(v.dob||'').replace(/\D/g,''))
      && /^\d{10,11}$/.test(String(v.phone||'').replace(/\D/g,''))
      && v.agreed===true;
  }
  function isPhoneOtpReady(value){
    return /^\d{6}$/.test(String(value||''));
  }
  function getTitle(state){
    return (FLOW_META[state && state.flow] || {}).title || '내정보';
  }
  function getProgress(state){
    const meta = FLOW_META[state && state.flow];
    if(!meta) return null;
    const steps = HELP_STEPS[state.helpKind] || meta.steps;
    const current = steps.findIndex(([step])=>step===state.step);
    return {labels:steps.map(([,label])=>label), current:current < 0 ? 0 : current};
  }
  function getHeaderModel(state){
    const progress=getProgress(state);
    return progress ? {accessibleTitle:getTitle(state), labels:progress.labels, current:progress.current} : null;
  }
  function getAccountAuthModel(state){
    return {
      account:{value:String(state && state.accountInput || ''), inputMode:'numeric', maxLength:8, helpKind:'accountNumber'},
      password:{value:'', inputMode:'numeric', maxLength:8, helpKind:'accountPassword'}
    };
  }
  function getAuthPresentation(){
    return {bodyClass:'v47mi-self-auth', inputGroupClass:'v47mi-self-auth-info', inset:20};
  }
  function maskAccount(value){
    const raw=String(value||'').replace(/\D/g,'');
    return raw.length===8 ? `${raw.slice(0,2)}**-**${raw.slice(-2)}` : '****';
  }
  function createState(menuTitle, options){
    const flow = MENU_KEYS[menuTitle];
    if(!flow) return null;
    const skipAuthentication=!!(options && options.skipAuthentication);
    const defaultStep=flow==='accountPasswordGuide' ? 'guide' : (flow==='accountProfile' ? 'accountAuth' : 'phone');
    const skippedStep={accountProfile:'profile',accountNumbers:'accountList',idPassword:'selection',dormantRelease:'selection'}[flow];
    return {flow, step:skipAuthentication && skippedStep ? skippedStep : defaultStep, phoneVerified:skipAuthentication, selectedId:'', selectedAccount:'', completed:false, errors:{}};
  }
  function establishesSessionAuthentication(event, result){
    return !result.error && (event.type==='PHONE_VERIFY' || event.type==='ACCOUNT_AUTH');
  }
  function transition(state, event){
    const next = {...state, errors:{}};
    if(event.type==='OPEN_ACCOUNT_HELP'){
      const accountInput=String(event.accountInput||state.accountInput||'').replace(/\D/g,'').slice(0,8);
      if(event.kind==='accountNumber') return {state:{...next, step:'helpPhone', helpKind:'accountNumber', accountInput}, error:''};
      if(event.kind==='accountPassword') return {state:{...next, step:'helpPasswordGuide', helpKind:'accountPassword', accountInput}, error:''};
      return {state, error:''};
    }
    if(event.type==='CLOSE_ACCOUNT_HELP'){
      const clean={...next, step:'accountAuth'};
      delete clean.helpKind;
      return {state:clean, error:''};
    }
    if(event.type==='SELECT_HELP_ACCOUNT'){
      if(!DATA.accounts.some(x=>x.id===event.value)) return {state, error:'확인할 계좌를 선택해 주세요.', field:'helpAccount'};
      const clean={...next, step:'accountAuth', accountInput:event.value};
      delete clean.helpKind;
      return {state:clean, error:''};
    }
    if(event.type==='PHONE_REQUEST'){
      if(!(event.name||'').trim()) return {state, error:'고객명을 입력해 주세요.', field:'name'};
      if(!/^\d{6}$/.test(event.dob||'')) return {state, error:'생년월일 6자리를 입력해 주세요.', field:'dob'};
      if(!/^\d{10,11}$/.test(event.phone||'')) return {state, error:'휴대폰 번호 10~11자리를 입력해 주세요.', field:'phone'};
      if(event.agreed!==true) return {state, error:'휴대폰 인증 필수 약관에 동의해 주세요.', field:'agreement'};
      return {state:{...next, step:state.helpKind==='accountNumber'?'helpPhoneOtp':'phoneOtp'}, error:''};
    }
    if(event.type==='PHONE_VERIFY'){
      if(!/^\d{6}$/.test(event.otp||'')) return {state, error:'인증번호 6자리를 입력해 주세요.', field:'otp'};
      const step = state.helpKind==='accountNumber' ? 'helpAccountList' : (state.flow==='accountNumbers' ? 'accountList' : 'selection');
      return {state:{...next, phoneVerified:true, step}, error:''};
    }
    if(event.type==='ACCOUNT_AUTH'){
      if(!/^\d{8}$/.test(event.account||'')) return {state, error:'계좌번호 숫자 8자리를 입력해 주세요.', field:'account'};
      if(!DATA.accounts.some(x=>x.id===event.account)) return {state, error:'등록된 계좌번호를 확인해 주세요.', field:'account'};
      if(!/^\d{4,8}$/.test(event.password||'')) return {state, error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.', field:'accountPassword'};
      return {state:{...next, selectedAccount:event.account, step:'profile'}, error:''};
    }
    if(event.type==='SELECT_ID'){
      const selected = DATA.ids.find(x=>x.id===event.value);
      if(!selected) return {state, error:'ID를 선택해 주세요.', field:'selection'};
      if(state.flow==='dormantRelease' && !selected.dormant) return {state, error:'장기미사용 제한 ID를 선택해 주세요.', field:'selection'};
      return {state:{...next, selectedId:event.value, selectedAccount:''}, error:''};
    }
    if(event.type==='SELECT_ACCOUNT'){
      const owner = DATA.ids.find(x=>x.id===state.selectedId);
      if(!owner || !owner.accounts.includes(event.value)) return {state, error:'선택한 ID에 연결된 계좌를 선택해 주세요.', field:'selection'};
      return {state:{...next, selectedAccount:event.value}, error:''};
    }
    if(event.type==='CONTINUE'){
      if(!state.selectedId || !state.selectedAccount) return {state, error:'재설정할 ID와 계좌를 선택해 주세요.', field:'selection'};
      const owner = DATA.ids.find(x=>x.id===state.selectedId);
      if(!owner || !owner.accounts.includes(state.selectedAccount)) return {state, error:'선택한 ID에 연결된 계좌를 선택해 주세요.', field:'selection'};
      return {state:{...next, step:'accountPassword'}, error:''};
    }
    if(event.type==='ACCOUNT_PASSWORD'){
      if(!/^\d{4,8}$/.test(event.password||'')) return {state, error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.', field:'flowAccountPassword'};
      return state.flow==='dormantRelease'
        ? {state:{...next, step:'complete', completed:true}, error:''}
        : {state:{...next, step:'newIdPassword'}, error:''};
    }
    if(event.type==='NEW_ID_PASSWORD'){
      if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,8}$/.test(event.password||'')) return {state, error:'영문과 숫자를 조합해 5~8자리로 입력해 주세요.', field:'newPassword'};
      if(event.password!==event.confirm) return {state, error:'새 ID 비밀번호가 서로 일치하지 않아요.', field:'newPasswordConfirm'};
      return {state:{...next, step:'complete', completed:true}, error:''};
    }
    if(event.type==='COMPLETE') return {state:{...next, step:'complete', completed:true}, error:''};
    return {state, error:''};
  }
  return {MENU_KEYS, FLOW_META, DATA, shouldHandle, isPhoneRequestReady, isPhoneOtpReady, getTitle, getProgress, getHeaderModel, getAccountAuthModel, getAuthPresentation, maskAccount, createState, establishesSessionAuthentication, transition};
});
