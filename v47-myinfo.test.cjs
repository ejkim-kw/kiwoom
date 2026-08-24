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
