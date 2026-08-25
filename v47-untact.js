(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.V47Untact=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const MENU_KEYS={
    '서류신청':'documents','계좌개설 이어하기':'opening','출금계좌등록':'withdrawal',
    '한도제한계좌해제':'limitRelease','계좌폐쇄':'closure'
  };
  const DATA={
    documents:[
      {name:'잔고증명서',mode:'date',desc:'기준일 현재 보유 잔고를 증명해요'},
      {name:'거래내역서',mode:'period',desc:'선택한 기간의 거래내역을 발급해요'},
      {name:'금융소득내역서',mode:'period',desc:'이자·배당 금융소득 내역을 확인해요'},
      {name:'외납세액명세서',mode:'period',desc:'해외 납부세액 명세를 발급해요'},
      {name:'양도소득내역서',mode:'period',desc:'양도소득 신고용 내역을 발급해요'},
      {name:'제신고신청',mode:'date',desc:'각종 신고 신청 내역을 발급해요'}
    ],
    documentHistory:[
      {name:'잔고증명서',status:'발급완료',statusClass:'done',detail:'2026.08.22 신청 · 이메일 발송 완료'},
      {name:'거래내역서',status:'발급중',statusClass:'wait',detail:'2026.08.24 신청 · 서류 생성 중'},
      {name:'금융소득내역서',status:'접수완료',statusClass:'wait',detail:'2026.08.25 신청 · 순서대로 처리 중'},
      {name:'외납세액명세서',status:'보완필요',statusClass:'wait',detail:'2026.08.20 신청 · 제출용도 확인 필요'}
    ],
    openings:[
      {id:'general',name:'종합계좌',status:'입력중',statusClass:'wait',detail:'고객정보 입력 단계에서 중단됐어요',continuable:true},
      {id:'isa',name:'중개형 ISA',status:'접수완료',statusClass:'done',detail:'2026.08.24 접수 · 서류 확인 대기'},
      {id:'pension',name:'연금저축',status:'진위확인중',statusClass:'wait',detail:'신분증 진위 여부를 확인하고 있어요'}
    ],
    statuses:{
      withdrawal:{title:'출금계좌등록',status:'접수완료',statusClass:'done',account:'신한 110-***-**56',detail:'2026.08.24 접수 · 등록 정보 확인 중'},
      limitRelease:{title:'한도제한계좌해제',status:'보완필요',statusClass:'wait',account:'위탁종합 52**-**02',detail:'2026.08.23 접수 · 거래목적 확인서가 필요해요'},
      closure:{title:'계좌폐쇄',status:'처리중',statusClass:'wait',account:'CMA 98**-**54',detail:'2026.08.25 접수 · 잔여 자산 확인 중'}
    }
  };
  const FLOW_META={
    documents:[['document','서류 선택'],['accountAuth','계좌 인증'],['form','신청정보'],['complete','완료']],
    opening:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['status','개설현황'],['sent','URL 발송']],
    withdrawal:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['status','접수현황']],
    limitRelease:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['status','접수현황']],
    closure:[['phone','휴대폰 정보'],['phoneOtp','인증번호'],['status','접수현황']]
  };
  function shouldHandle(version,title){return version==='v47'&&Object.prototype.hasOwnProperty.call(MENU_KEYS,title);}
  function createState(title,options){
    const flow=MENU_KEYS[title]; if(!flow)return null;
    const skip=!!(options&&options.skipAuthentication);
    return {flow,title,step:flow==='documents'?'document':(skip?'status':'phone'),skipAuthentication:skip,phoneVerified:skip,selectedDocument:'',account:'',completed:false};
  }
  function getHeaderModel(state){
    if(!state||state.step==='history')return null;
    let steps=FLOW_META[state.flow]||[];
    if(state.flow==='documents'&&state.skipAuthentication) steps=steps.filter(x=>x[0]!=='accountAuth');
    const current=Math.max(0,steps.findIndex(x=>x[0]===state.step));
    return {labels:steps.map(x=>x[1]),current,accessibleTitle:state.title};
  }
  function transition(state,event){
    const next={...state};
    if(event.type==='BACK'){
      const previous={accountAuth:'document',form:state.skipAuthentication?'document':'accountAuth',phoneOtp:'phone',status:state.skipAuthentication?'':'phoneOtp'}[state.step];
      return previous?{state:{...next,step:previous},error:''}:{state,error:''};
    }
    if(event.type==='OPEN_HISTORY'&&state.flow==='documents')return {state:{...next,step:'history'},error:''};
    if(event.type==='CLOSE_HISTORY'&&state.flow==='documents')return {state:{...next,step:'document'},error:''};
    if(event.type==='SELECT_DOCUMENT'){
      if(!DATA.documents.some(x=>x.name===event.value))return {state,error:'신청할 서류를 선택해 주세요.',field:'document'};
      return {state:{...next,selectedDocument:event.value,step:state.skipAuthentication?'form':'accountAuth'},error:''};
    }
    if(event.type==='ACCOUNT_AUTH'){
      if(!/^\d{8}$/.test(event.account||''))return {state,error:'계좌번호 숫자 8자리를 입력해 주세요.',field:'account'};
      if(!/^\d{4,8}$/.test(event.password||''))return {state,error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.',field:'accountPassword'};
      return {state:{...next,account:event.account,step:'form'},error:''};
    }
    if(event.type==='SUBMIT_DOCUMENT'){
      const doc=DATA.documents.find(x=>x.name===state.selectedDocument);
      if(!doc)return {state,error:'신청할 서류를 선택해 주세요.',field:'document'};
      if(doc.mode==='date'&&!event.date)return {state,error:'기준일자를 선택해 주세요.',field:'date'};
      if(doc.mode==='period'&&(!event.startDate||!event.endDate))return {state,error:'조회기간을 모두 선택해 주세요.',field:'period'};
      if(!(event.purpose||'').trim())return {state,error:'제출용도를 입력해 주세요.',field:'purpose'};
      if(!/^[1-9]\d*$/.test(event.copies||''))return {state,error:'발급 수량을 입력해 주세요.',field:'copies'};
      return {state:{...next,request:{date:event.date||'',startDate:event.startDate||'',endDate:event.endDate||'',purpose:event.purpose,copies:event.copies},step:'complete',completed:true},error:''};
    }
    if(event.type==='PHONE_REQUEST'){
      if(!(event.name||'').trim())return {state,error:'고객명을 입력해 주세요.',field:'name'};
      if(!/^\d{6}$/.test(event.dob||''))return {state,error:'생년월일 6자리를 입력해 주세요.',field:'dob'};
      if(!/^\d{10,11}$/.test(event.phone||''))return {state,error:'휴대폰 번호 10~11자리를 입력해 주세요.',field:'phone'};
      if(event.agreed!==true)return {state,error:'휴대폰 인증 필수 약관에 동의해 주세요.',field:'agreement'};
      return {state:{...next,step:'phoneOtp'},error:''};
    }
    if(event.type==='PHONE_VERIFY'){
      if(!/^\d{6}$/.test(event.otp||''))return {state,error:'인증번호 6자리를 입력해 주세요.',field:'otp'};
      return {state:{...next,phoneVerified:true,step:'status'},error:''};
    }
    if(event.type==='CONTINUE_OPENING'){
      const opening=DATA.openings.find(x=>x.id===event.id&&x.continuable);
      if(!opening)return {state,error:'이어갈 수 있는 계좌개설을 선택해 주세요.',field:'opening'};
      return {state:{...next,selectedOpening:event.id,step:'sent',completed:true},error:''};
    }
    return {state,error:''};
  }
  function establishesSessionAuthentication(event,result){return !result.error&&(event.type==='PHONE_VERIFY'||event.type==='ACCOUNT_AUTH');}
  return {MENU_KEYS,DATA,FLOW_META,shouldHandle,createState,getHeaderModel,transition,establishesSessionAuthentication};
});
