const test=require('node:test');
const assert=require('node:assert/strict');
const A=require('./v48-auth.js');
const first=A.accounts[0].id,second=A.accounts[1].id,third=A.accounts[2].id;
const reg={accountId:first,name:'홍길동'};
function run(registered=null,session=A.createSession(),options={}){
  let current={flow:A.begin(session,registered,options),session,registration:registered};
  return {get state(){return current;},send(event){current=A.transition(current.flow,current.session,current.registration,event);return current;}};
}
function phone(r,register=true){
  assert.equal(r.send({type:'PHONE_REQUEST',name:'홍길동',dob:'900101',gender:'1',carrier:'skt',phone:'01012345678',agreed:true}).error,'');
  assert.equal(r.send({type:'PHONE_VERIFY',otp:'123456'}).error,'');
  if(r.state.flow.step==='enrollment')r.send({type:'ENROLLMENT_DECISION',register});
}

test('계좌번호 조회 전용 인증은 등록 고객도 휴대폰 인증 후 계좌 선택 없이 완료된다',()=>{
  for(const registered of [null,reg]){
    const r=run(registered,A.createSession(),{phoneOnly:true});
    assert.equal(r.state.flow.step,'phone');
    assert.equal(r.state.flow.offerEnrollment,false);
    phone(r);
    assert.equal(r.state.flow.step,'complete');
    assert.equal(r.state.session.phoneVerified,true);
    assert.equal(r.state.session.accountId,'');
    assert.deepEqual(r.state.session.verifiedAccounts,[]);
    assert.deepEqual(r.state.registration,registered);
  }
});
test('휴대폰 인증 요청은 필수 정보와 동의가 갖춰져야 진행되며 수정한 번호를 허용한다',()=>{
  const valid={name:'시연고객',dob:'900101',gender:'1',carrier:'skt',phone:'010-9876-5432',agreed:true};
  assert.equal(A.phoneRequestError(valid),'');
  for(const invalid of [{name:''},{name:'   '},{dob:''},{dob:'90010'},{gender:''},{gender:'12'},{gender:'9'},{carrier:''},{carrier:'unknown'},{phone:''},{phone:'010-12'},{phone:'010abcdefgh'},{agreed:false}]){
    const details={...valid,...invalid};
    assert.ok(A.phoneRequestError(details));
    const r=run();
    assert.ok(r.send({type:'PHONE_REQUEST',...details}).error);
    assert.equal(r.state.flow.step,'phone');
  }
  const r=run();
  assert.equal(r.send({type:'PHONE_REQUEST',...valid}).flow.step,'otp');
});
test('인증 화면 업무명은 진입 메뉴와 처리 중인 업무를 유지한다',()=>{
  const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
  const context=vm.createContext({V48Auth:A,document:{addEventListener(){}},localStorage:{getItem(){return null;}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'v48-auth-ui.js'),'utf8'),context);
  const cases=[
    [{kind:'myinfo',title:'계좌정보 조회 및 변경'},'계좌정보 조회 및 변경'],
    [{kind:'untact',title:'서류신청'},'서류신청'],
    [{kind:'legacy',destination:{go:'iodcheck'}},'입출금이 안 돼요'],
    [{kind:'legacy',destination:{go:'iodcheck',cert:true}},'서류 발급현황이 궁금해요'],
    [{kind:'legacy',destination:{go:'iodcheck',isa:true}},'ISA 가입서류를 내고싶어요'],
    [{kind:'legacy',destination:{go:'iodcheck',untactStatus:true}},'비대면 접수현황이 궁금해요'],
    [{kind:'legacy',destination:{go:'orderopen',ordertitle:'현금매수'}},'현금매수'],
    [{kind:'page',patch:{page:'result',title:'거래내역 조회'}},'거래내역 조회']
  ];
  for(const [pending,title] of cases){
    context.pending=pending;
    assert.equal(vm.runInContext('v48AuthTaskTitle(pending)',context),title);
  }
});

test('인증번호는 요청부터 3분간 유효하고 재요청하면 새 유효시간을 적용한다',()=>{
  const r=run(),details={name:'시연고객',dob:'900101',gender:'1',carrier:'kt',phone:'01098765432',agreed:true};
  r.send({type:'PHONE_REQUEST',...details,now:1000});
  assert.equal(r.state.flow.otpExpiresAt,181000);
  assert.equal(r.state.flow.otpAutoFillAt,3000);
  assert.equal(A.phoneVerifyError('123456',181000,180999),'');
  assert.match(r.send({type:'PHONE_VERIFY',otp:'123456',now:181000}).error,/유효시간/);
  assert.equal(r.state.session.phoneVerified,false);
  r.send({type:'PHONE_REQUEST',...details,now:182000});
  assert.equal(r.state.flow.otpExpiresAt,362000);
  assert.equal(r.state.flow.phoneOtp,'');
  assert.equal(r.send({type:'PHONE_VERIFY',otp:'123456',now:183000}).flow.step,'enrollment');
  assert.equal(r.state.flow.otpExpiresAt,0);
});

test('인증번호 요청 후 정보 수정은 기존 인증번호를 무효화하고 다시 요청하게 한다',()=>{
  const r=run();
  r.send({type:'PHONE_REQUEST',name:'시연고객',dob:'900101',gender:'1',carrier:'skt',phone:'01098765432',agreed:true});
  assert.equal(r.send({type:'PHONE_EDIT'}).flow.step,'phone');
  assert.equal(r.state.flow.otpExpiresAt,0);
  assert.ok(r.send({type:'PHONE_VERIFY',otp:'123456'}).error);
  phone(r);
  assert.equal(r.state.flow.step,'accounts');
});

test('시연 인증번호 불일치는 인증을 완료하지 않고 수정한 번호로 다시 시도할 수 있다',()=>{
  const r=run();
  r.send({type:'PHONE_REQUEST',name:'시연고객',dob:'900101',gender:'1',carrier:'skt',phone:'01012345678',agreed:true});
  assert.match(r.send({type:'PHONE_VERIFY',otp:'654321'}).error,/일치하지/);
  assert.equal(r.state.session.phoneVerified,false);
  assert.equal(r.state.flow.step,'otp');
  assert.equal(r.send({type:'PHONE_VERIFY',otp:'123456'}).error,'');
  assert.equal(r.state.session.phoneVerified,true);
});

test('인증 완료는 숫자 6자리가 필요하고 같은 화면의 뒤로가기는 인증을 취소한다',()=>{
  for(const otp of ['', '12345', '1234567', '12ab56'])assert.ok(A.phoneVerifyError(otp));
  assert.equal(A.phoneVerifyError('123456'),'');
  const r=run();
  r.send({type:'PHONE_REQUEST',name:'시연고객',dob:'900101',gender:'1',carrier:'skt',phone:'01098765432',agreed:true});
  assert.ok(r.send({type:'PHONE_VERIFY',otp:''}).error);
  assert.equal(r.state.session.phoneVerified,false);
  assert.equal(r.send({type:'BACK'}).flow.step,'cancelled');
});
test('미등록: 휴대폰 인증 → 별도 등록 동의 → 계좌 선택 → 비밀번호 확인 후에만 등록',()=>{
  const r=run();
  assert.equal(r.send({type:'SELECT_ACCOUNT',accountId:first}).flow.step,'phone');
  phone(r);assert.equal(r.state.session.accountId,'');
  r.send({type:'SELECT_ACCOUNT',accountId:second});
  assert.equal(r.state.flow.consent,true);assert.equal(r.state.registration,null);
  assert.ok(r.send({type:'PASSWORD',password:'12',consent:true}).error);
  assert.equal(r.state.registration,null);
  r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.equal(r.state.session.accountId,second);assert.equal(r.state.registration.accountId,second);
  assert.equal(r.state.session.phoneVerified,true);
  assert.equal(JSON.stringify(r.state).includes('1234'),false);
});
test('등록을 건너뛰어도 업무 가능, 다음 연결은 휴대폰 인증',()=>{
  const r=run();phone(r,false);r.send({type:'SELECT_ACCOUNT',accountId:first});
  r.send({type:'PASSWORD',password:'1234',consent:false});
  assert.equal(r.state.flow.step,'complete');assert.equal(r.state.registration,null);
  assert.equal(A.begin(A.createSession(),r.state.registration).step,'phone');
});

test('계좌 선택 전에 건너뛴 퀵넘버 등록 선택은 계좌를 바꿔도 유지한다',()=>{
  const r=run();phone(r,false);
  r.send({type:'SELECT_ACCOUNT',accountId:first});
  assert.equal(r.state.flow.consent,false);
  r.send({type:'BACK'});
  r.send({type:'SELECT_ACCOUNT',accountId:second});
  assert.equal(r.state.flow.consent,false);
  r.send({type:'PASSWORD',password:'1234',consent:r.state.flow.consent});
  assert.equal(r.state.registration,null);
});
test('등록 고객은 고객 확인 후 등록 계좌 비밀번호로 인증한다',()=>{
  const r=run(reg);assert.equal(r.state.flow.step,'identity');
  assert.ok(r.send({type:'PASSWORD',password:'1234'}).error);
  assert.ok(r.send({type:'SELECT_ACCOUNT',accountId:second}).error);
  r.send({type:'IDENTITY',matches:true});
  assert.equal(r.state.flow.step,'password');
  assert.equal(r.state.flow.selectedAccount,first);
  assert.equal(r.state.flow.offerEnrollment,false);
  assert.equal(A.isAccountVerified(r.state.session,first),false);
  assert.ok(r.send({type:'PASSWORD',password:'12'}).error);
  r.send({type:'PASSWORD',password:'1234'});
  assert.equal(r.state.session.phoneVerified,false);assert.equal(r.state.session.quickEntry,true);
  assert.equal(r.state.session.accountId,first);
  assert.equal(A.isAccountVerified(r.state.session,first),true);
  assert.equal(A.isAccountVerified(r.state.session,second),false);
  assert.ok(r.state.session.expiresAt>Date.now());
  assert.equal(A.isAccountVerified(r.state.session,first,r.state.session.expiresAt),false);
  assert.equal(A.begin(A.createSession(),r.state.registration).step,'identity');
  assert.equal(JSON.stringify(r.state).includes('1234'),false);
});
test('등록 고객이 아니오를 선택하면 휴대폰 인증 후 계좌를 선택하고 기존 등록은 유지한다',()=>{
  const r=run(reg);
  assert.equal(r.send({type:'IDENTITY',matches:false}).flow.step,'phone');
  assert.ok(r.send({type:'SELECT_ACCOUNT',accountId:second}).error);
  phone(r);
  r.send({type:'SELECT_ACCOUNT',accountId:second});assert.equal(r.state.flow.offerEnrollment,false);
  r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.deepEqual(r.state.registration,reg);assert.equal(r.state.session.accountId,second);
});
test('퀵넘버 인입 계좌 변경: 휴대폰 인증 후 변경 문의, 동의는 외부 채널 안내',()=>{
  const session={accountId:first,phoneVerified:false,quickEntry:true};
  const r=run(reg,session,{change:true});assert.equal(r.state.flow.step,'phone');phone(r);
  assert.ok(r.send({type:'SELECT_ACCOUNT',accountId:first}).error);
  r.send({type:'SELECT_ACCOUNT',accountId:second});assert.equal(r.state.flow.step,'changeOffer');
  r.send({type:'CHANGE_DECISION',changeRegistration:true});assert.equal(r.state.flow.step,'changeChannels');
  assert.deepEqual(r.state.registration,reg);
  r.send({type:'CONTINUE_WITHOUT_CHANGE'});r.send({type:'PASSWORD',password:'1234'});
  assert.equal(r.state.session.accountId,second);assert.deepEqual(r.state.registration,reg);
});

test('퀵넘버 인증 후 계좌변경은 휴대폰 인증 후 새 계좌를 선택한다',()=>{
  const login=run(reg);login.send({type:'IDENTITY',matches:true});login.send({type:'PASSWORD',password:'1234'});
  const change=run(reg,login.state.session,{change:true});
  assert.equal(change.state.flow.step,'phone');
  assert.ok(change.send({type:'SELECT_ACCOUNT',accountId:first}).error);
  assert.ok(change.send({type:'SELECT_ACCOUNT',accountId:second}).error);
  assert.equal(change.state.session.accountId,first,'새 계좌 인증 전까지 기존 계좌 유지');
  assert.ok(change.send({type:'PASSWORD',password:'1234'}).error);
  phone(change);
  assert.equal(change.state.flow.step,'accounts');
  change.send({type:'SELECT_ACCOUNT',accountId:second});
  assert.equal(change.state.flow.step,'changeOffer');
  change.send({type:'CHANGE_DECISION',changeRegistration:false});
  change.send({type:'PASSWORD',password:'1234'});
  assert.equal(change.state.session.accountId,second);
});
test('이번 세션 휴대폰 인증 고객: 계좌리스트 바로 표시, 재등록 없이 계좌비밀번호만 확인',()=>{
  const r=run(reg,{accountId:first,phoneVerified:true,quickEntry:false},{change:true});
  assert.equal(r.state.flow.step,'accounts');r.send({type:'SELECT_ACCOUNT',accountId:third});
  assert.equal(r.state.flow.step,'password');assert.equal(r.state.flow.offerEnrollment,false);
  r.send({type:'PASSWORD',password:'1234'});assert.equal(r.state.session.accountId,third);
  assert.deepEqual(r.state.registration,reg);
});

test('계좌별 비밀번호 인증 완료를 기억하고 다른 메뉴에서는 해당 계좌만 생략한다',()=>{
  const r=run();phone(r);r.send({type:'SELECT_ACCOUNT',accountId:first});
  assert.equal(A.isAccountVerified(r.state.session,first),false);
  r.send({type:'PASSWORD',password:'12'});
  assert.equal(A.isAccountVerified(r.state.session,first),false);
  r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.equal(A.isAccountVerified(r.state.session,first),true);
  const next=run(r.state.registration,r.state.session);
  assert.equal(next.state.flow.step,'accounts');
  assert.equal(next.send({type:'SELECT_ACCOUNT',accountId:first}).flow.step,'complete');
  const other=run(next.state.registration,next.state.session);
  assert.equal(other.send({type:'SELECT_ACCOUNT',accountId:second}).flow.step,'password');
  other.send({type:'PASSWORD',password:'1234'});
  assert.deepEqual(other.state.session.verifiedAccounts,[first,second]);
  const change=run(other.state.registration,other.state.session,{change:true});
  assert.equal(change.send({type:'SELECT_ACCOUNT',accountId:first}).flow.step,'complete');
  assert.equal(change.state.session.accountId,first);
  assert.equal(A.isAccountVerified(change.state.session,third),false);
});

test('인증 만료 경계에서는 모든 계좌 인증을 버리고 등록 고객 확인부터 재시작한다',()=>{
  const r=run(reg);r.send({type:'IDENTITY',matches:false});phone(r);r.send({type:'SELECT_ACCOUNT',accountId:first});
  r.send({type:'PASSWORD',password:'1234'});
  const expiresAt=r.state.session.expiresAt;
  assert.ok(expiresAt>Date.now());
  assert.equal(A.isAccountVerified(r.state.session,first,expiresAt-1),true);
  assert.equal(A.isAccountVerified(r.state.session,first,expiresAt),false);
  assert.equal(A.begin(r.state.session,reg,{now:expiresAt}).step,'identity');
  const next=run(reg,r.state.session);
  const expired=next.send({type:'SELECT_ACCOUNT',accountId:first,now:expiresAt});
  assert.equal(expired.flow.step,'identity');
  assert.deepEqual(expired.session,A.createSession());
  assert.equal(A.begin(expired.session,reg).step,'identity');
  assert.equal(A.isAccountVerified(A.createSession(),first),false);
  const waiting=run(reg,r.state.session);
  waiting.send({type:'SELECT_ACCOUNT',accountId:second});
  const latePassword=waiting.send({type:'PASSWORD',password:'1234',now:expiresAt});
  assert.equal(latePassword.flow.step,'identity');
  assert.deepEqual(latePassword.session,A.createSession());
});

test('계좌번호 표시 형식은 마스킹 없는 4자리-4자리다',()=>{
  for(const item of A.accounts)assert.equal(A.formatAccount(item.id),`${item.id.slice(0,4)}-${item.id.slice(4)}`);
});
test('퀵넘버 등록 계좌 변경 거절 시 선택한 다른 계좌로 이번 업무만 진행',()=>{
  const r=run(reg,{accountId:first,phoneVerified:false,quickEntry:true},{change:true});
  phone(r);r.send({type:'SELECT_ACCOUNT',accountId:second});
  r.send({type:'CHANGE_DECISION',changeRegistration:false});assert.equal(r.state.flow.step,'password');
  r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.equal(r.state.session.accountId,second);assert.deepEqual(r.state.registration,reg);
});
test('취소·잘못된 입력은 기존 인증 계좌와 등록 계좌를 변경하지 않음',()=>{
  const original={accountId:first,phoneVerified:true,quickEntry:false};
  const r=run(reg,original,{change:true});
  r.send({type:'SELECT_ACCOUNT',accountId:second});r.send({type:'BACK'});r.send({type:'BACK'});
  assert.equal(r.state.flow.step,'cancelled');assert.deepEqual(r.state.session,original);
  assert.deepEqual(r.state.registration,reg);
});
