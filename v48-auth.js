/* Ver 4.8 prototype authentication. No passwords or phone details are persisted. */
(function(root, factory){
  const api=factory();
  if(typeof module==='object' && module.exports) module.exports=api;
  root.V48Auth=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const accounts=[
    {id:'52575602',type:'위탁종합'},
    {id:'63217654',type:'중개형 ISA'},
    {id:'50430218',type:'연금저축'}
  ];
  const account=id=>accounts.find(a=>a.id===id);
  const mask=id=>account(id)?`${id.slice(0,2)}**-**${id.slice(-2)}`:'****';
  const formatAccount=id=>account(id)?`${id.slice(0,4)}-${id.slice(4)}`:'';
  const registration=value=>value && account(value.accountId)?{accountId:value.accountId,name:'홍길동'}:null;
  // Prototype session lifetime; production must follow the server's session expiry.
  const SESSION_DURATION=10*60*1000;
  const createSession=()=>({phoneVerified:false,accountId:'',quickEntry:false,verifiedAccounts:[],expiresAt:0,enrollmentDismissed:false});
  const isExpired=(session,now=Date.now())=>!!session.expiresAt&&now>=session.expiresAt;
  const isAccountVerified=(session,id,now=Date.now())=>!!account(id)&&(session.phoneVerified||(session.quickEntry&&session.accountId===id))&&session.expiresAt>now&&!!session.verifiedAccounts?.includes(id);
  const carriers=[{id:'skt',label:'SKT'},{id:'kt',label:'KT'},{id:'lgu',label:'LG U+'},{id:'skt-mvno',label:'SKT 알뜰폰'},{id:'kt-mvno',label:'KT 알뜰폰'},{id:'lgu-mvno',label:'LG U+ 알뜰폰'}];
  const DEMO_OTP='123456';
  function phoneRequestError(details){
    if(!String(details.name||'').trim())return '고객명을 입력해 주세요.';
    if(!/^\d{6}$/.test(details.dob||''))return '생년월일 6자리를 입력해 주세요.';
    if(!/^[1-8]$/.test(details.gender||''))return '주민등록번호 뒷자리의 첫 숫자를 입력해 주세요.';
    if(!carriers.some(item=>item.id===details.carrier))return '통신사를 선택해 주세요.';
    if(!/^01\d{8,9}$/.test(String(details.phone||'').replace(/[\s-]/g,'')))return '본인 명의 휴대폰 번호를 확인해 주세요.';
    if(details.agreed!==true)return '휴대폰 인증 필수 약관에 동의해 주세요.';
    return '';
  }
  function phoneVerifyError(otp,expiresAt,now=Date.now()){
    if(expiresAt!==undefined&&(!expiresAt||now>=expiresAt))return '유효시간이 지났어요. 인증번호를 다시 요청해 주세요.';
    return /^\d{6}$/.test(otp||'')?'':'인증번호 6자리를 입력해 주세요.';
  }
  function begin(session,registered,{change=false,phoneOnly=false,now=Date.now()}={}){
    if(isExpired(session,now))session=createSession();
    const reg=registration(registered);
    const offerEnrollment=!phoneOnly&&!change&&!reg&&!session.enrollmentDismissed&&!isAccountVerified(session,session.accountId,now);
    return {
      step:phoneOnly?'phone':session.phoneVerified?(offerEnrollment?'enrollment':'accounts'):reg&&!change?'identity':'phone',
      change, phoneOnly, previousAccount:session.accountId, selectedAccount:'',
      offerEnrollment,
      offerChange:change&&session.quickEntry&&!session.phoneVerified,
      consent:false, quick:false
    };
  }
  function transition(flow,session,registered,event){
    const now=event.now??Date.now();
    if(isExpired(session,now)){
      const fresh=createSession();
      return {flow:{...flow,...begin(fresh,registered,{phoneOnly:flow.phoneOnly,now}),phoneDetails:undefined,phoneOtp:'',otpExpiresAt:0,otpAutoFillAt:0},session:fresh,registration:registration(registered),error:''};
    }
    let next={...flow}, nextSession={...session}, reg=registration(registered);
    const fail=error=>({flow,session,registration:reg,error});
    switch(event.type){
      case 'IDENTITY':
        if(flow.step!=='identity'||!reg)return fail('고객 확인부터 진행해 주세요.');
        if(event.matches){next.step='password';next.selectedAccount=reg.accountId;next.quick=true;}
        else {next.step='phone';next.offerEnrollment=false;next.quick=false;nextSession=createSession();}
        break;
      case 'PHONE_REQUEST':
        if(!['phone','otp'].includes(flow.step))return fail('휴대폰 정보를 먼저 확인해 주세요.');
        if(phoneRequestError(event))return fail(phoneRequestError(event));
        next.step='otp';next.phoneOtp='';next.phoneOtpError='';
        next.otpExpiresAt=(event.now??Date.now())+180000;
        next.otpAutoFillAt=next.otpExpiresAt-178000;next.otpAutoFilled=false;
        break;
      case 'PHONE_EDIT':
        if(!['phone','otp'].includes(flow.step))return fail('휴대폰 정보를 먼저 확인해 주세요.');
        next.step='phone';next.phoneOtp='';next.phoneOtpError='';next.otpExpiresAt=0;next.otpAutoFillAt=0;
        break;
      case 'PHONE_VERIFY':
        if(flow.step!=='otp')return fail('인증번호를 먼저 요청해 주세요.');
        if(phoneVerifyError(event.otp,flow.otpExpiresAt,event.now))return fail(phoneVerifyError(event.otp,flow.otpExpiresAt,event.now));
        // A fixed code lets the static demo show mismatch/recovery; production must verify on the server.
        if(event.otp!==DEMO_OTP)return fail('인증번호가 일치하지 않아요. 받은 번호를 다시 입력해 주세요.');
        nextSession.phoneVerified=true;nextSession.expiresAt=now+SESSION_DURATION;
        next.step=flow.phoneOnly?'complete':flow.offerEnrollment&&!reg?'enrollment':'accounts';
        next.phoneOtp='';next.phoneOtpError='';next.otpExpiresAt=0;next.otpAutoFillAt=0;
        break;
      case 'ENROLLMENT_DECISION':
        if(flow.step!=='enrollment'||!session.phoneVerified||!flow.offerEnrollment||reg||typeof event.register!=='boolean')return fail('휴대폰 인증 후 등록 안내를 확인해 주세요.');
        next.consent=event.register;next.step='accounts';
        nextSession.enrollmentDismissed=!event.register;
        break;
      case 'SELECT_ACCOUNT':
        if(flow.step!=='accounts'||!session.phoneVerified||!account(event.accountId))return fail('본인인증 후 계좌를 선택해 주세요.');
        if(flow.change&&event.accountId===flow.previousAccount)return fail('변경할 다른 계좌를 선택해 주세요.');
        next.selectedAccount=event.accountId;next.quick=false;
        if(isAccountVerified(session,event.accountId,now)&&!(flow.offerEnrollment&&flow.consent)){
          nextSession.accountId=event.accountId;nextSession.quickEntry=false;next.step='complete';break;
        }
        next.step=flow.offerChange&&reg&&event.accountId!==reg.accountId?'changeOffer':'password';
        break;
      case 'CHANGE_DECISION':
        if(flow.step!=='changeOffer')return fail('변경할 계좌를 먼저 선택해 주세요.');
        next.step=event.changeRegistration?'changeChannels':'password';
        break;
      case 'CONTINUE_WITHOUT_CHANGE':
        if(flow.step!=='changeChannels')return fail('변경 안내를 확인해 주세요.');
        next.step='password';
        break;
      case 'PASSWORD':
        if(flow.step!=='password'||!account(flow.selectedAccount))return fail('인증할 계좌를 먼저 선택해 주세요.');
        if(flow.quick?(!reg||reg.accountId!==flow.selectedAccount):!session.phoneVerified)return fail('본인 확인부터 다시 진행해 주세요.');
        if(!/^\d{4,8}$/.test(event.password||''))return fail('계좌비밀번호 숫자 4~8자리를 입력해 주세요.');
        if(flow.offerEnrollment&&flow.consent===true&&!reg){
          reg={accountId:flow.selectedAccount,name:'홍길동'};next.enrollmentCompleted=true;
        }
        nextSession.accountId=flow.selectedAccount;
        nextSession.quickEntry=flow.quick&&!session.phoneVerified;
        nextSession.verifiedAccounts=[...new Set([...(session.verifiedAccounts||[]),flow.selectedAccount])];
        if(!nextSession.expiresAt)nextSession.expiresAt=now+SESSION_DURATION;
        next.step='complete';
        break;
      case 'BACK':
        if(flow.step==='password')next.step=flow.quick?'identity':'accounts';
        else if(flow.step==='accounts'&&flow.offerEnrollment&&session.phoneVerified&&!reg)next.step='enrollment';
        else if(flow.step==='changeOffer'||flow.step==='changeChannels')next.step='accounts';
        else next.step='cancelled';
        next.selectedAccount='';next.quick=false;next.phoneOtp='';next.otpExpiresAt=0;next.otpAutoFillAt=0;
        break;
      default:return fail('진행할 단계를 확인해 주세요.');
    }
    return {flow:next,session:nextSession,registration:reg,error:''};
  }
  return {accounts,account,mask,formatAccount,registration,createSession,begin,transition,phoneRequestError,phoneVerifyError,carriers,DEMO_OTP,SESSION_DURATION,isExpired,isAccountVerified};
});
