const test=require('node:test');
const assert=require('node:assert/strict');
const A=require('../v48-auth.js');
const first=A.accounts[0].id,second=A.accounts[1].id;
function flow(registered=null,session=A.createSession(),options={}){
  let state={flow:A.begin(session,registered,options),session,registration:registered};
  return {get state(){return state;},send(event){state=A.transition(state.flow,state.session,state.registration,event);return state;}};
}
function verifyPhone(r){
  r.send({type:'PHONE_REQUEST',name:'시연고객',dob:'900101',gender:'1',carrier:'skt',phone:'01012345678',agreed:true});
  return r.send({type:'PHONE_VERIFY',otp:A.DEMO_OTP});
}
test('미등록 고객의 휴대폰 인증 후 별도 안내에서 명시적으로 등록을 선택한다',()=>{
  const r=flow();
  assert.ok(r.send({type:'ENROLLMENT_DECISION',register:true}).error);
  verifyPhone(r);
  assert.equal(r.state.flow.step,'enrollment');
  assert.equal(r.state.flow.consent,false);
  assert.equal(r.state.registration,null);
  assert.ok(r.send({type:'SELECT_ACCOUNT',accountId:first}).error);
  r.send({type:'ENROLLMENT_DECISION',register:true});
  assert.equal(r.state.flow.step,'accounts');
  assert.equal(r.state.registration,null);
  r.send({type:'SELECT_ACCOUNT',accountId:second});
  assert.ok(r.send({type:'PASSWORD',password:'1'}).error);
  assert.equal(r.state.registration,null);
  r.send({type:'PASSWORD',password:'1234'});
  assert.equal(r.state.registration.accountId,second);
  assert.equal(r.state.flow.enrollmentCompleted,true);
  assert.equal(A.begin(A.createSession(),r.state.registration).step,'identity');
});
test('건너뛰어도 업무를 완료하며 같은 접속 중에는 등록 안내를 반복하지 않는다',()=>{
  const r=flow();verifyPhone(r);r.send({type:'ENROLLMENT_DECISION',register:false});
  assert.equal(r.state.flow.step,'accounts');
  const reentry=A.begin(r.state.session,null);
  assert.equal(reentry.step,'accounts');
  assert.equal(reentry.offerEnrollment,false);
  r.send({type:'SELECT_ACCOUNT',accountId:first});
  r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.equal(r.state.flow.step,'complete');
  assert.equal(r.state.registration,null,'이전 비밀번호 이벤트의 consent 값으로 등록하지 않음');
});
test('등록 완료 고객은 휴대폰 인증을 다시 해도 등록 안내나 계좌 덮어쓰기가 없다',()=>{
  const registered={accountId:first,name:'홍길동'},r=flow(registered);
  r.send({type:'IDENTITY',matches:false});verifyPhone(r);
  assert.equal(r.state.flow.step,'accounts');
  assert.ok(r.send({type:'ENROLLMENT_DECISION',register:true}).error);
  r.send({type:'SELECT_ACCOUNT',accountId:second});r.send({type:'PASSWORD',password:'1234',consent:true});
  assert.deepEqual(r.state.registration,registered);
});
test('안내에서 뒤로가기와 계좌 선택 취소는 등록을 완료하지 않는다',()=>{
  const r=flow();verifyPhone(r);
  assert.equal(r.send({type:'BACK'}).flow.step,'cancelled');
  const again=flow(null,r.state.session);
  assert.equal(again.state.flow.step,'enrollment');
  again.send({type:'ENROLLMENT_DECISION',register:true});
  assert.equal(again.send({type:'BACK'}).flow.step,'enrollment');
  assert.equal(again.state.registration,null);
  again.send({type:'ENROLLMENT_DECISION',register:false});
  assert.equal(again.state.flow.consent,false);
});
test('단순 계좌번호 조회에서는 조회를 바로 완료하고 이후 계좌 인증 업무에서 등록을 안내한다',()=>{
  const r=flow(null,A.createSession(),{phoneOnly:true});verifyPhone(r);
  assert.equal(r.state.flow.step,'complete');
  const next=flow(null,r.state.session);
  assert.equal(next.state.flow.step,'enrollment');
});
test('퀵넘버 인증 후 다른 계좌는 휴대폰 인증을 먼저 마쳐야 목록을 보여준다',()=>{
  const r=flow({accountId:first,name:'홍길동'});
  r.send({type:'IDENTITY',matches:true});r.send({type:'PASSWORD',password:'1234'});
  const change=flow(r.state.registration,r.state.session,{change:true});
  assert.equal(change.state.flow.step,'phone');
  assert.ok(change.send({type:'SELECT_ACCOUNT',accountId:second}).error);
  verifyPhone(change);
  assert.equal(change.state.flow.step,'accounts');
  assert.equal(change.state.session.accountId,first);
});
test('등록 동의 후 인증 세션이 만료되면 등록하지 않고 휴대폰 인증부터 다시 시작한다',()=>{
  const r=flow();verifyPhone(r);r.send({type:'ENROLLMENT_DECISION',register:true});
  r.send({type:'SELECT_ACCOUNT',accountId:first});
  r.send({type:'PASSWORD',password:'1234',now:r.state.session.expiresAt});
  assert.equal(r.state.registration,null);
  assert.equal(r.state.flow.step,'phone');
  assert.equal(r.state.flow.consent,false);
});
test('등록 안내는 별도 페이지이고 계좌 목록에는 이전 선택 동의 체크박스가 없다',()=>{
  const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),{load}=require('cheerio');
  const context=vm.createContext({V48Auth:A,isV48:()=>true,document:{addEventListener(){}},localStorage:{getItem(){return null;}},v47Esc:value=>value,I:{back:'',chev:''}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../v48-auth-ui.js'),'utf8'),context);
  vm.runInContext("v48Flow={step:'enrollment',taskTitle:'고객정보 조회'};",context);
  const $=load(vm.runInContext('renderV48Auth()',context));
  assert.equal($('.v48-auth-enrollment').length,1);
  assert.match($('h2').text(),/한 번 등록하면.*계좌비밀번호만/);
  assert.equal($('[data-v48-enrollment="yes"]').text(),'동의하고 등록하기');
  assert.equal($('[data-v48-enrollment="no"]').text(),'지금은 건너뛰기');
  assert.match($('.v48-enrollment-optional').text(),/등록하지 않아도/);
  assert.match($('.v48-enrollment-other').text(),/다른 계좌.*휴대폰 인증/);
  assert.equal($('input[type="checkbox"]').length,0);
  vm.runInContext("v48Flow={step:'accounts',offerEnrollment:true,consent:true};v48Session.phoneVerified=true;",context);
  const accounts=load(vm.runInContext('renderV48Auth()',context));
  assert.equal(accounts('#v48QuickConsent,[data-v48-quick-help]').length,0);
  assert.equal(accounts('[data-v48-account]').length,3);
});
