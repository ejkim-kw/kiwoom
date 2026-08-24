const test = require('node:test');
const assert = require('node:assert/strict');
const myInfo = require('./v47-myinfo.js');

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

test('phone request requires complete customer information and consent', () => {
  const state = myInfo.createState('증권계좌번호확인');
  let result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'', dob:'900101', phone:'01012345678', agreed:true});
  assert.equal(result.error, '고객명을 입력해 주세요.');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'9001', phone:'01012345678', agreed:true});
  assert.equal(result.error, '생년월일 6자리를 입력해 주세요.');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'0101234', agreed:true});
  assert.equal(result.error, '휴대폰 번호 10~11자리를 입력해 주세요.');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'01012345678', agreed:false});
  assert.equal(result.error, '휴대폰 인증 필수 약관에 동의해 주세요.');
  result = myInfo.transition(state, {type:'PHONE_REQUEST', name:'홍길동', dob:'900101', phone:'01012345678', agreed:true});
  assert.equal(result.state.step, 'phoneOtp');
});

test('phone verification cannot advance without six digits', () => {
  const state = myInfo.createState('증권계좌번호확인');
  const result = myInfo.transition({...state, step:'phoneOtp'}, {type:'PHONE_VERIFY', otp:'123'});
  assert.equal(result.state.step, 'phoneOtp');
  assert.equal(result.error, '인증번호 6자리를 입력해 주세요.');
});

test('ID password flow requires an ID and linked account', () => {
  let state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', phoneVerified:true};
  let result = myInfo.transition(state, {type:'CONTINUE'});
  assert.equal(result.error, '재설정할 ID와 계좌를 선택해 주세요.');
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
