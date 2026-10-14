const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const A=require('../v48-auth.js');

function setup(){
  let now=1000,timer;
  class Clock extends Date {static now(){return now;}}
  const context=vm.createContext({V48Auth:A,V47MyInfo:require('../v47-myinfo.js'),Date:Clock,
    document:{addEventListener(){},getElementById(){return null;},querySelector(){return null;}},localStorage:{getItem(){return null;}},
    isV48:()=>true,v47Esc:value=>value,I:{back:'',chev:''},s1state:{page:'home'},
    v48MenuContext:{title:'첫 업무'},sessionAuthed:false,authAcct:{},
    setTimeout:fn=>{timer=fn;return 1;},clearTimeout(){},clearInterval(){},
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../v48-auth-ui.js'),'utf8'),context);
  const run=code=>vm.runInContext(code,context);
  run(`v48Session={...V48Auth.createSession(),phoneVerified:true,accountId:'52575602',verifiedAccounts:['52575602'],expiresAt:601000};`);
  return {run,setTime:value=>now=value,fireTimer:()=>timer()};
}

test('계좌 선택 목록은 번호와 상품명을 한 줄에 표시하고 인증한 계좌에만 배지를 붙인다',()=>{
  const {run}=setup();
  run('v48Flow=V48Auth.begin(v48Session,null,{now:1000});');
  const html=run('renderV48Auth()');
  assert.match(html,/>업무를 처리할 계좌를 선택해주세요<\/h2>/);
  assert.match(html,/5257-5602 \[위탁종합\]/);
  assert.match(html,/6321-7654 \[중개형 ISA\]/);
  assert.equal((html.match(/class="v48-account-verified"/g)||[]).length,1);
  assert.doesNotMatch(html,/52\*\*/);
});

test('증권계좌번호 조회는 휴대폰 인증만 요구하고 비선택형 목록을 표시한다',()=>{
  const {run}=setup();
  const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
  run(app.slice(app.indexOf('function startV47MyInfo('),app.indexOf('function applyV47MyInfoEvent(')));
  run(app.slice(app.indexOf('function renderV47AccountNumbers('),app.indexOf('function renderV47AccountPasswordGuide(')));
  run(`
    s1Ver='v48';s1nav=patch=>Object.assign(s1state,patch);v47MyInfoTop=()=>'';
    v48Session.phoneVerified=false;v48Session.quickEntry=true;
    v48StartAuth=pending=>{v48Pending=pending;return true;};
    startV47MyInfo('증권계좌번호확인');
  `);
  assert.equal(run('v48Pending.phoneOnly'),true);
  assert.equal(run("v48Require({kind:'myinfo',phoneOnly:true})"),true,'퀵넘버 인증만으로는 목록 조회 불가');
  run("v48Session.phoneVerified=true;v48Session.accountId='';v48Session.verifiedAccounts=[];startV47MyInfo('증권계좌번호확인');");
  assert.equal(run('s1state.v47MyInfo.step'),'accountList');
  assert.equal(run('sessionAuthed'),false,'휴대폰 인증이 계좌비밀번호 인증을 대신하지 않음');
  run("v48Session.accountId='52575602';");
  assert.equal(!!run('v48ShowAccountBar()'),false,'목록에는 선택 계좌나 계좌변경 버튼이 없음');
  const html=run('renderV47AccountNumbers(s1state.v47MyInfo)');
  assert.match(html,/보유 계좌를 확인했어요/);
  assert.match(html,/고객님 명의의 증권계좌 목록이에요\.<br>최근 개설된 계좌 20개까지 표시돼요/);
  assert.match(html,/5257-5602 \[위탁종합\]/);
  assert.doesNotMatch(html,/<button|<svg|data-v48-account=|data-v47mi-help-account=/);
});

test('계좌 선택과 목록 다시 펼치기는 전체 화면을 다시 렌더링하지 않는다',()=>{
  const {run}=setup();
  run(`
    let renders=0,mounts=[];
    renderS1=()=>{renders++;};
    v48MountAccountAuth=()=>{mounts.push(v48Flow.step);return true;};
    v48Flow=V48Auth.begin(v48Session,null,{now:1000});
    v48Apply({type:'SELECT_ACCOUNT',accountId:'63217654',now:1000});
  `);
  assert.equal(run('v48Flow.step'),'password');
  assert.equal(run('v48Flow.selectedAccount'),'63217654');
  assert.equal(run('renders'),0);
  run("v48Apply({type:'BACK',now:1000});");
  assert.equal(run('v48Flow.step'),'accounts');
  assert.equal(run('v48Flow.selectedAccount'),'');
  assert.equal(run('renders'),0);
  assert.equal(run("mounts.join(',')"),'password,accounts');
});

test('인증한 현재 계좌는 다른 메뉴에서도 목록 선택 없이 재사용한다',()=>{
  const {run}=setup();
  run(`v48MenuContext.accountId='52575602';v48StartAuth=()=>{s1state.page='v48auth';return true;};`);
  assert.equal(run("v48Require({kind:'myinfo'})"),false);
  for(const kind of ['myinfo','untact','document','legacy','page','purpose']){
    run("v48MenuContext={title:'다른 업무'};");
    assert.equal(run(`v48Require({kind:'${kind}'})`),false,kind);
    assert.equal(run('v48MenuContext.accountId'),'52575602');
  }
  run("v48Session.accountId='63217654';v48MenuContext={title:'미인증 계좌'};");
  assert.equal(run("v48Require({kind:'document'})"),true,'현재 계좌의 인증이 없으면 인증 필요');
});

test('계좌변경은 선택 화면을 열고 완료 후 같은 업무를 변경한 계좌로 표시한다',()=>{
  const {run}=setup();
  run(`
    s1state={page:'v47myinfo',title:'고객정보 조회',v47MyInfo:{flow:'accountProfile',step:'profile',selectedAccount:'52575602'}};
    v48StartAuth=(pending,change)=>{v48Pending=pending;v48Origin=JSON.parse(JSON.stringify(s1state));v48Flow=V48Auth.begin(v48Session,v48Registration,{change,now:1000});s1state.page='v48auth';};
    v48AccountChange();
  `);
  assert.equal(run('v48Flow.step'),'accounts');
  assert.equal(run('v48Flow.change'),true);
  run(`
    v48Session.accountId='63217654';v48Session.verifiedAccounts.push('63217654');
    renderS1=()=>{};v48Resume();
  `);
  assert.equal(run('s1state.page'),'v47myinfo');
  assert.equal(run('s1state.title'),'고객정보 조회');
  assert.equal(run('s1state.v47MyInfo.selectedAccount'),'63217654');
  assert.equal(run('authAcct.no'),'6321-7654');
});

test('금융거래목적 조회는 다른 메뉴에서 인증한 현재 계좌를 재사용하며 미인증 계좌는 허용하지 않는다',()=>{
  const {run}=setup();
  run("v48StartAuth=()=>true;");
  assert.equal(run("v48Require({kind:'purpose',title:'금융거래목적확인서'})"),false);
  assert.equal(run('v48MenuContext.accountId'),'52575602');
  run("v48MenuContext={title:'새 메뉴'};v48Session.phoneVerified=false;v48Session.quickEntry=true;");
  assert.equal(run("v48Require({kind:'purpose'})"),false);
  run("v48Session.verifiedAccounts=[];");
  assert.equal(run("v48Require({kind:'purpose'})"),true);
});

test('퀵넘버 등록 계좌 인증 후 같은 업무로 돌아갈 때 휴대폰 인증을 반복하지 않는다',()=>{
  const {run}=setup();
  run(`
    v48Session=V48Auth.createSession();
    v48Registration={accountId:'52575602',name:'홍길동'};
    v48Flow=V48Auth.begin(v48Session,v48Registration,{now:1000});
    const identity=V48Auth.transition(v48Flow,v48Session,v48Registration,{type:'IDENTITY',matches:true,now:1000});
    const verified=V48Auth.transition(identity.flow,identity.session,identity.registration,{type:'PASSWORD',password:'1234',now:1000});
    v48Session=verified.session;v48SyncAccount();
    v48MenuContext.accountId='52575602';
    v48StartAuth=()=>{throw new Error('이미 인증한 업무에서 인증이 반복됨');};
  `);
  assert.equal(run('sessionAuthed'),true);
  assert.equal(run("v48Require({kind:'myinfo'})"),false);
});

test('휴대폰 인증 전에는 퀵넘버 계좌의 중간 네 자리만 가리고 실제 계좌 식별값은 유지한다',()=>{
  const {run}=setup();
  run(`
    v48Session=V48Auth.createSession();v48Registration={accountId:'63217654',name:'홍길동'};
    const start=V48Auth.begin(v48Session,v48Registration,{now:1000});
    v48Flow=V48Auth.transition(start,v48Session,v48Registration,{type:'IDENTITY',matches:true,now:1000}).flow;
  `);
  const password=run('renderV48Auth()');
  assert.match(password,/63\*\*-\*\*54 \[중개형 ISA\]/);
  assert.doesNotMatch(password,/6321-7654/);
  run(`
    v48Session=V48Auth.transition(v48Flow,v48Session,v48Registration,{type:'PASSWORD',password:'1234',now:1000}).session;
    v48Flow=null;v48SyncAccount();
  `);
  assert.match(run('v48AccountBar()'),/63\*\*-\*\*54/);
  assert.equal(run('authAcct.no'),'6321-7654','조회에 사용하는 원본 계좌는 보존');
  assert.equal(run('v48AccountText(authAcct.no)'),'63**-**54');
  const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
  run("pageTop=()=>'';");
  run(app.slice(app.indexOf('function renderMyAcctV40(){'),app.indexOf('/* ===== 간편비밀번호(PIN)')));
  assert.match(run('renderMyAcctV40()'),/\*{8} 12345/,'연계은행 계좌는 끝 다섯 자리만 표시');
  assert.match(run('renderMyAcctV40()'),/연계은행<\/dt><dd[^>]*>우리은행/);
  assert.doesNotMatch(run('renderMyAcctV40()'),/MY계좌 설정|예금주|개설일/,'은행계좌 조회 카드로 교체');
  assert.doesNotMatch(run('renderMyAcctV40()'),/6321-7654/,'결과 상세정보에도 원본 계좌번호가 노출되지 않음');
  run('v48Session.phoneVerified=true;');
  assert.match(run('v48AccountBar()'),/6321-7654/);
  assert.equal(run('v48AccountText(authAcct.no)'),'6321-7654');
  assert.match(run('renderMyAcctV40()'),/\*{8} 12345/,'휴대폰 인증 후에도 은행계좌는 끝 다섯 자리만 표시');
  run('isV48=()=>false;v48Session.phoneVerified=false;');
  assert.equal(run('v48AccountText(authAcct.no)'),'6321-7654','이전 버전 표시는 유지');
  assert.match(run('renderMyAcctV40()'),/MY계좌 설정/,'이전 버전 결과 화면은 유지');
});

test('퀵넘버 인증 계좌는 다른 메뉴에서도 추가 인증 없이 재사용한다',()=>{
  const {run}=setup();
  run(`
    v48Registration={accountId:'63217654',name:'홍길동'};
    v48Session=V48Auth.createSession();
    const flow=V48Auth.begin(v48Session,v48Registration,{now:1000});
    const identity=V48Auth.transition(flow,v48Session,v48Registration,{type:'IDENTITY',matches:true,now:1000});
    v48Session=V48Auth.transition(identity.flow,identity.session,identity.registration,{type:'PASSWORD',password:'1234',now:1000}).session;
    v48SyncAccount();
    v48StartAuth=()=>true;
  `);
  for(const kind of ['myinfo','untact','document','legacy','page','purpose']){
    run("v48MenuContext={title:'다른 메뉴'};");
    assert.equal(run(`v48Require({kind:'${kind}'})`),false,kind);
    assert.equal(run('v48MenuContext.accountId'),'63217654');
    assert.equal(run('v48Session.accountId'),'63217654');
  }
  run("v48Session.accountId='52575602';v48MenuContext={title:'새 업무'};");
  assert.equal(run("v48Require({kind:'myinfo'})"),true,'미인증 계좌는 인증 필요');
  run("v48Session.accountId='63217654';v48Session.verifiedAccounts=[];");
  assert.equal(run("v48Require({kind:'legacy'})"),true,'계좌 인증 전에는 인증 필요');
});

test('세션 만료 타이머는 계좌별 인증을 초기화하고 홈으로 돌아간다',()=>{
  const {run,setTime,fireTimer}=setup();
  run(`v48ResetSession=()=>{v48Session=V48Auth.createSession();};v48GoHome=()=>{s1state.page='home';};s1state.page='v47untact';v48ScheduleSessionExpiry();`);
  setTime(601000);fireTimer();
  assert.equal(run('s1state.page'),'home');
  assert.equal(run('v48Session.verifiedAccounts.length'),0);
  assert.equal(run('v48Session.phoneVerified'),false);
});
