const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const myInfo = require('./v47-myinfo.js');

test('handles 내정보 detail routes only in VER4.7', () => {
  assert.equal(myInfo.shouldHandle('v47','계좌정보 조회 및 변경'), true);
  assert.equal(myInfo.shouldHandle('v46','계좌정보 조회 및 변경'), false);
  assert.equal(myInfo.shouldHandle('v47','해외주식 관련'), false);
});

test('maps all five VER4.7 내정보 menu labels', () => {
  assert.deepEqual(Object.keys(myInfo.MENU_KEYS), [
    '계좌정보 조회 및 변경', '증권계좌번호확인', '계좌비밀번호 재설정',
    'ID조회/PW초기화', '장기미사용ID 제한 해지'
  ]);
});

test('creates an isolated initial state for each supported menu', () => {
  const state = myInfo.createState('ID조회/PW초기화');
  assert.deepEqual(state, {
    flow:'idPassword', step:'phone', phoneVerified:false,
    selectedId:'', selectedAccount:'', completed:false, errors:{}
  });
  assert.equal(myInfo.createState('알 수 없는 메뉴'), null);
});

test('creates independent state and error objects for separate flows', () => {
  const idPassword = myInfo.createState('ID조회/PW초기화');
  const dormantRelease = myInfo.createState('장기미사용ID 제한 해지');

  idPassword.errors.field = 'error';

  assert.notEqual(idPassword, dormantRelease);
  assert.notEqual(idPassword.errors, dormantRelease.errors);
  assert.deepEqual(dormantRelease.errors, {});
});

test('defines variable-length progress for every multi-step flow', () => {
  assert.deepEqual(myInfo.getProgress({flow:'accountProfile', step:'accountAuth'}), {
    labels:['계좌 인증','계좌정보 확인'], current:0
  });
  assert.deepEqual(myInfo.getProgress({flow:'accountNumbers', step:'accountList'}), {
    labels:['휴대폰 정보','인증번호','계좌 확인'], current:2
  });
  assert.deepEqual(myInfo.getProgress({flow:'idPassword', step:'newIdPassword'}), {
    labels:['휴대폰 정보','인증번호','ID·계좌 선택','계좌 인증','비밀번호 재설정','완료'], current:4
  });
  assert.deepEqual(myInfo.getProgress({flow:'dormantRelease', step:'complete'}), {
    labels:['휴대폰 정보','인증번호','ID·계좌 선택','계좌 인증','완료'], current:4
  });
  assert.deepEqual(myInfo.getProgress({flow:'accountPasswordGuide', step:'guide'}), {
    labels:['비밀번호 안내'], current:0
  });
});

test('account help flows replace the main progress with their current steps', () => {
  assert.deepEqual(myInfo.getProgress({flow:'accountProfile', step:'helpPhone', helpKind:'accountNumber'}), {
    labels:['휴대폰 정보','인증번호','계좌 확인'], current:0
  });
  assert.deepEqual(myInfo.getProgress({flow:'accountProfile', step:'helpAccountList', helpKind:'accountNumber'}), {
    labels:['휴대폰 정보','인증번호','계좌 확인'], current:2
  });
  assert.deepEqual(myInfo.getProgress({flow:'accountProfile', step:'helpPasswordGuide', helpKind:'accountPassword'}), {
    labels:['비밀번호 안내'], current:0
  });
});

test('detail header exposes only the current stepper and not the submenu title', () => {
  assert.deepEqual(myInfo.getHeaderModel({flow:'accountProfile', step:'profile'}), {
    accessibleTitle:'계좌정보 조회 및 변경',
    labels:['계좌 인증','계좌정보 확인'],
    current:1
  });
});

test('account authentication uses direct inputs with contextual help actions', () => {
  assert.deepEqual(myInfo.getAccountAuthModel({accountInput:'63217654'}), {
    account:{value:'63217654', inputMode:'numeric', maxLength:8, helpKind:'accountNumber'},
    password:{value:'', inputMode:'numeric', maxLength:8, helpKind:'accountPassword'}
  });
});

test('내정보 인증화면은 셀프서비스 인증 디자인 프레젠테이션을 사용한다', () => {
  assert.deepEqual(myInfo.getAuthPresentation(), {
    bodyClass:'v47mi-self-auth',
    inputGroupClass:'v47mi-self-auth-info',
    inset:20,
  });
});

test('orients every flow and result screen with a stable title', () => {
  assert.equal(myInfo.getTitle({flow:'accountProfile', step:'profile'}), '계좌정보 조회 및 변경');
  assert.equal(myInfo.getTitle({flow:'accountNumbers', step:'accountList'}), '증권계좌번호 확인');
  assert.equal(myInfo.getTitle({flow:'accountPasswordGuide', step:'guide'}), '계좌비밀번호 재설정');
  assert.equal(myInfo.getTitle({flow:'idPassword', step:'complete'}), 'ID 조회·비밀번호 초기화');
  assert.equal(myInfo.getTitle({flow:'dormantRelease', step:'complete'}), '장기미사용 ID 제한 해제');
});

test('masks raw account identifiers for every customer-visible account value', () => {
  assert.deepEqual(myInfo.DATA.accounts.map(x=>myInfo.maskAccount(x.id)), [
    '52**-**02','63**-**54','50**-**18'
  ]);
  assert.equal(myInfo.maskAccount('123'), '****');
  assert.ok(myInfo.DATA.accounts.every(x=>!Object.hasOwn(x, 'display')));
});

test('phone request requires complete customer information and consent', () => {
  const state = myInfo.createState('증권계좌번호확인');
  let result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'', dob:'900101', phone:'01012345678', agreed:true});
  assert.equal(result.error, '고객명을 입력해 주세요.');
  assert.equal(result.field, 'name');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'9001', phone:'01012345678', agreed:true});
  assert.equal(result.error, '생년월일 6자리를 입력해 주세요.');
  assert.equal(result.field, 'dob');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'0101234', agreed:true});
  assert.equal(result.error, '휴대폰 번호 10~11자리를 입력해 주세요.');
  assert.equal(result.field, 'phone');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'01012345678', agreed:false});
  assert.equal(result.error, '휴대폰 인증 필수 약관에 동의해 주세요.');
  assert.equal(result.field, 'agreement');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'01012345678', agreed:true});
  assert.equal(result.state.step, 'phoneOtp');
});

test('phone verification cannot advance without six digits', () => {
  const state = myInfo.createState('증권계좌번호확인');
  const result = myInfo.transition({...state, step:'phoneOtp'}, {type:'PHONE_VERIFY', otp:'123'});
  assert.equal(result.state.step, 'phoneOtp');
  assert.equal(result.error, '인증번호 6자리를 입력해 주세요.');
  assert.equal(result.field, 'otp');
});

test('ID password flow requires an ID and linked account', () => {
  let state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', phoneVerified:true};
  let result = myInfo.transition(state, {type:'CONTINUE'});
  assert.equal(result.error, '재설정할 ID와 계좌를 선택해 주세요.');
  assert.equal(result.field, 'selection');
  state = {...state, selectedId:'kiwoom0728', selectedAccount:'52575602'};
  result = myInfo.transition(state, {type:'CONTINUE'});
  assert.equal(result.state.step, 'accountPassword');
});

test('an account must belong to the selected ID', () => {
  const state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', selectedId:'hero2024'};
  const result = myInfo.transition(state, {type:'SELECT_ACCOUNT', value:'52575602'});
  assert.equal(result.error, '선택한 ID에 연결된 계좌를 선택해 주세요.');
});

test('an unknown ID cannot select an account', () => {
  const state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', selectedId:'unknown-id'};
  const result = myInfo.transition(state, {type:'SELECT_ACCOUNT', value:'52575602'});
  assert.equal(result.error, '선택한 ID에 연결된 계좌를 선택해 주세요.');
  assert.equal(result.state.selectedAccount, '');
});

test('continue rejects an unlinked or unknown ID and account relationship', () => {
  const base = {...myInfo.createState('ID조회/PW초기화'), step:'selection', phoneVerified:true};
  let result = myInfo.transition({...base, selectedId:'kiwoom0728', selectedAccount:'50430218'}, {type:'CONTINUE'});
  assert.equal(result.error, '선택한 ID에 연결된 계좌를 선택해 주세요.');
  result = myInfo.transition({...base, selectedId:'unknown-id', selectedAccount:'52575602'}, {type:'CONTINUE'});
  assert.equal(result.error, '선택한 ID에 연결된 계좌를 선택해 주세요.');
});

test('account profile account auth advances to a read-only profile', () => {
  let state = myInfo.createState('계좌정보 조회 및 변경');
  let result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'52575602', password:'1234'});
  assert.equal(result.state.step, 'profile');
  assert.equal(result.state.selectedAccount, '52575602');
});

test('account profile authentication validates the selected account and numeric password', () => {
  const state = myInfo.createState('계좌정보 조회 및 변경');
  let result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'123', password:'1234'});
  assert.equal(result.error, '계좌번호 숫자 8자리를 입력해 주세요.');
  assert.equal(result.field, 'account');
  result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'12345678', password:'1234'});
  assert.equal(result.error, '등록된 계좌번호를 확인해 주세요.');
  result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'52575602', password:'abcd'});
  assert.equal(result.error, '계좌비밀번호 숫자 4~8자리를 입력해 주세요.');
  assert.equal(result.field, 'accountPassword');
});

test('account number help verifies the phone and returns the chosen account to authentication', () => {
  let state = myInfo.createState('계좌정보 조회 및 변경');
  let result = myInfo.transition(state, {type:'OPEN_ACCOUNT_HELP', kind:'accountNumber'});
  assert.equal(result.state.step, 'helpPhone');
  assert.equal(result.state.helpKind, 'accountNumber');

  result = myInfo.transition(result.state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'01012345678', agreed:true});
  assert.equal(result.state.step, 'helpPhoneOtp');
  result = myInfo.transition(result.state, {type:'PHONE_VERIFY', otp:'123456'});
  assert.equal(result.state.step, 'helpAccountList');
  result = myInfo.transition(result.state, {type:'SELECT_HELP_ACCOUNT', value:'63217654'});
  assert.equal(result.state.step, 'accountAuth');
  assert.equal(result.state.accountInput, '63217654');
  assert.equal(result.state.helpKind, undefined);
});

test('account password help returns to the account authentication step', () => {
  const state = myInfo.createState('계좌정보 조회 및 변경');
  const opened = myInfo.transition(state, {type:'OPEN_ACCOUNT_HELP', kind:'accountPassword'});
  assert.equal(opened.state.step, 'helpPasswordGuide');
  const closed = myInfo.transition(opened.state, {type:'CLOSE_ACCOUNT_HELP'});
  assert.equal(closed.state.step, 'accountAuth');
  assert.equal(closed.state.helpKind, undefined);
});

test('account number lookup ends at account list after phone verification', () => {
  let state = {...myInfo.createState('증권계좌번호확인'), step:'phoneOtp'};
  const result = myInfo.transition(state, {type:'PHONE_VERIFY', otp:'123456'});
  assert.equal(result.state.step, 'accountList');
  assert.equal(myInfo.DATA.accounts.length, 3);
});

test('account password guide starts without authentication', () => {
  const state = myInfo.createState('계좌비밀번호 재설정');
  assert.equal(state.step, 'guide');
});

test('ID password flow rejects a short account password', () => {
  const state={...myInfo.createState('ID조회/PW초기화'), step:'accountPassword', selectedId:'kiwoom0728', selectedAccount:'52575602'};
  const result=myInfo.transition(state,{type:'ACCOUNT_PASSWORD',password:'123'});
  assert.equal(result.error,'계좌비밀번호 숫자 4~8자리를 입력해 주세요.');
  assert.equal(result.field,'flowAccountPassword');
  assert.equal(result.state.step,'accountPassword');
});

test('ID password reset validates matching 5 to 8 character values', () => {
  const state={...myInfo.createState('ID조회/PW초기화'), step:'newIdPassword', selectedId:'kiwoom0728', selectedAccount:'52575602'};
  const mismatch=myInfo.transition(state,{type:'NEW_ID_PASSWORD',password:'abc12',confirm:'abc13'});
  assert.equal(mismatch.error,'새 ID 비밀번호가 서로 일치하지 않아요.');
  assert.equal(mismatch.field,'newPasswordConfirm');
  const done=myInfo.transition(state,{type:'NEW_ID_PASSWORD',password:'abc12',confirm:'abc12'});
  assert.equal(done.state.step,'complete');
  assert.equal(done.state.completed,true);
});

test('dormant release accepts only a dormant ID and completes after account password', () => {
  const selection={...myInfo.createState('장기미사용ID 제한 해지'),step:'selection'};
  const blocked=myInfo.transition(selection,{type:'SELECT_ID',value:'kiwoom0728'});
  assert.equal(blocked.error,'장기미사용 제한 ID를 선택해 주세요.');
  const state={...myInfo.createState('장기미사용ID 제한 해지'),step:'accountPassword',selectedId:'hero2024',selectedAccount:'50430218'};
  const done=myInfo.transition(state,{type:'ACCOUNT_PASSWORD',password:'1234'});
  assert.equal(done.state.step,'complete');
  assert.equal(done.state.completed,true);
});

test('휴대폰 인증요청은 이름·생년월일·휴대폰·필수동의가 모두 유효할 때만 활성화한다', () => {
  assert.equal(myInfo.isPhoneRequestReady({name:'홍길동',dob:'900101',phone:'01012345678',agreed:true}), true);
  assert.equal(myInfo.isPhoneRequestReady({name:'',dob:'900101',phone:'01012345678',agreed:true}), false);
  assert.equal(myInfo.isPhoneRequestReady({name:'홍길동',dob:'90010',phone:'01012345678',agreed:true}), false);
  assert.equal(myInfo.isPhoneRequestReady({name:'홍길동',dob:'900101',phone:'010123456',agreed:true}), false);
  assert.equal(myInfo.isPhoneRequestReady({name:'홍길동',dob:'900101',phone:'01012345678',agreed:false}), false);
});

test('휴대폰 인증완료는 인증번호 6자리가 입력된 경우에만 활성화한다', () => {
  assert.equal(myInfo.isPhoneOtpReady('123456'), true);
  assert.equal(myInfo.isPhoneOtpReady('12345'), false);
  assert.equal(myInfo.isPhoneOtpReady('12345a'), false);
  assert.equal(myInfo.isPhoneOtpReady(''), false);
});

test('본인인증 생략 상태에서는 내정보 상세메뉴의 최초 인증 단계를 건너뛴다', () => {
  const skipped = title => myInfo.createState(title, {skipAuthentication:true});

  assert.equal(skipped('계좌정보 조회 및 변경').step, 'profile');
  assert.equal(skipped('증권계좌번호확인').step, 'accountList');
  assert.equal(skipped('계좌비밀번호 재설정').step, 'guide');
  assert.equal(skipped('ID조회/PW초기화').step, 'selection');
  assert.equal(skipped('장기미사용ID 제한 해지').step, 'selection');
  assert.equal(skipped('증권계좌번호확인').phoneVerified, true);

  assert.equal(myInfo.createState('계좌정보 조회 및 변경').step, 'accountAuth');
  assert.equal(myInfo.createState('증권계좌번호확인').step, 'phone');
});

test('내정보 계좌인증은 셀프서비스와 동일한 입력란과 확인 버튼을 사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  assert.match(app, /iod-v45-body auth-wrap v47mi-account-auth/);
  assert.match(app, /class="ir-qmark" data-v47mi-help=/);
  assert.match(app, /class="primary-btn v45-authbtn v47mi-cta\$\{\(accountValue/);
  assert.match(app, /function v47MyInfoAccountAuthBtnSync\(\)/);
  assert.ok(app.includes("account:((document.getElementById('v47MiAccount')||{}).value||'').replace(/\\D/g,'')"));
  assert.match(index, /style\.css\?v=\d{8}[a-z]?/);
  assert.match(index, /v47-myinfo\.js\?v=\d{8}[a-z]?/);
  assert.match(index, /app\.js\?v=\d{8}[a-z]?/);
});

test('내정보 계좌인증은 셀프서비스의 비밀번호 마스킹과 키패드 구조를 그대로 사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

  assert.match(app, /id="v47MiAccountPwDisp" class="acct-dots[^"]*"/);
  assert.match(app, /data-pwopen="v47MyInfo"/);
  assert.ok(app.includes("password:s1state.acctPw||''"));
  assert.ok(app.includes("if(pwCtx==='v47MyInfo')"));
  assert.doesNotMatch(app, /id="v47MiAccountPassword" class="ir-input" type="password"/);
});

test('내정보 전체 주요 CTA는 셀프서비스 공통 버튼 규격을 사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
  const actions = ['phone-request','phone-verify','continue','account-password','new-id-password','hero-password','home'];

  actions.forEach(action => {
    assert.match(app, new RegExp(`class="[^"]*v47mi-cta[^"]*"[^>]*data-v47mi-${action}`));
  });
  assert.match(app, /class="v47mi-dual-btn secondary" data-v47mi-agent/);
  assert.match(app, /class="v47mi-dual-btn primary" data-v47mi-hero-profile/);
  assert.match(css, /\.flow\.toss\.v47 \.v47mi-cta\{/);
  assert.match(css, /height:46px/);
  assert.match(css, /border-radius:999px/);
});

test('내정보 계좌인증 도움말은 셀프서비스 하단 플로팅을 재사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

  assert.ok(app.includes("if(kind==='accountNumber'){ openFindAcct('v47MyInfo'); return; }"));
  assert.ok(app.includes("if(kind==='accountPassword'){ openPwHelpSheet(); return; }"));
  assert.ok(app.includes("s1state.findTarget==='v47MyInfo'"));
  assert.ok(app.includes("document.getElementById('v47MiAccount')"));
  assert.ok(app.includes('v47MyInfoAccountAuthBtnSync();'));
});

test('내정보 최초 본인인증 성공 이벤트만 공통 인증 상태로 공유한다', () => {
  assert.equal(myInfo.establishesSessionAuthentication({type:'PHONE_VERIFY'}, {error:''}), true);
  assert.equal(myInfo.establishesSessionAuthentication({type:'ACCOUNT_AUTH'}, {error:''}), true);
  assert.equal(myInfo.establishesSessionAuthentication({type:'PHONE_VERIFY'}, {error:'인증번호를 확인해 주세요.'}), false);
  assert.equal(myInfo.establishesSessionAuthentication({type:'ACCOUNT_PASSWORD'}, {error:''}), false);
});

test('좌측 시연 기능은 현재 인증 화면의 정보만 자동 입력한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  assert.match(index, /data-demo-fill-account/);
  assert.match(index, /data-demo-fill-phone/);
  assert.match(app, /function fillDemoAccountAuthentication\(\)/);
  assert.match(app, /function fillDemoPhoneAuthentication\(\)/);
  assert.ok(app.includes("setDemoInput('v47MiAccount','52575602')"));
  assert.match(app, /\['v47MiPhone','01012345678'\]/);
  assert.match(app, /\['v47MyInfoOtp','123456'\]/);
});

test('휴대폰 자동입력은 계좌번호 찾기 하단 플로팅에도 적용된다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

  ['findDemoName','findDemoDob','findDemoGender','findDemoCarrier','findDemoPhone','findDemoOtp'].forEach(id => {
    assert.ok(app.includes(`id="${id}"`));
  });
  assert.match(app, /\['findDemoName','홍길동'\]/);
  assert.match(app, /\['findDemoCarrier','SKT'\]/);
  assert.match(app, /\['findDemoOtp','123456'\]/);
});
