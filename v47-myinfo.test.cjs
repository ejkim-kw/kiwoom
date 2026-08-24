const test = require('node:test');
const assert = require('node:assert/strict');
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
  assert.equal(myInfo.getProgress({flow:'accountPasswordGuide', step:'guide'}), null);
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
  let result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'unknown', password:'1234'});
  assert.equal(result.error, '조회할 계좌를 선택해 주세요.');
  assert.equal(result.field, 'account');
  result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'52575602', password:'abcd'});
  assert.equal(result.error, '계좌비밀번호 숫자 4~8자리를 입력해 주세요.');
  assert.equal(result.field, 'accountPassword');
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
