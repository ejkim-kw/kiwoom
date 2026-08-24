const test = require('node:test');
const assert = require('node:assert/strict');

let service;
try {
  service = require('./v47-self-service.js');
} catch (_) {
  service = null;
}

test('VER4.7 더보기에서 비대면 접수현황 조회 메뉴를 제공한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');
  const items = service.getSelfServiceItems('v47');

  assert.deepEqual(items.map(({ title, action }) => [title, action]), [
    ['입출금이 안돼요', 'iodstart'],
    ['서류 발급현황이 궁금해요', 'certstart'],
    ['ISA 가입서류를 내고 싶어요', 'isastart'],
    ['비밀번호를 모르겠어요', 'pwreset'],
    ['비대면 접수현황이 궁금해요', 'untactstatusstart'],
  ]);
});

test('신규 메뉴는 VER4.7에만 노출한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.equal(service.getSelfServiceItems('v45').length, 4);
  assert.equal(service.getSelfServiceItems('v46').length, 4);
  assert.equal(service.getSelfServiceItems('v47').length, 5);
});

test('서류 발급 조회 결과는 요청한 네 가지 카드명을 사용한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.deepEqual(service.CERTIFICATE_STATUS.map(item => item.name), [
    '잔고증명서',
    '거래내역서',
    '금융소득내역서',
    '제신고신청',
  ]);
});

test('비대면 접수현황 결과는 네 가지 신청 업무를 보여준다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.deepEqual(service.UNTACT_STATUS.map(item => item.name), [
    '계좌개설',
    '출금계좌등록',
    '한도제한계좌해제',
    '계좌폐쇄',
  ]);
  assert.ok(service.UNTACT_STATUS.every(item => item.status && item.description));
});

test('VER4.7 셀프서비스는 내정보와 동일한 현재 단계 stepper 모델을 제공한다', () => {
  assert.deepEqual(service.getStepperModel('v47', '비대면 접수현황', ['계좌 인증','접수현황 조회','결과 안내'], 1), {
    accessibleTitle:'비대면 접수현황',
    labels:['계좌 인증','접수현황 조회','결과 안내'],
    current:1,
    states:['done','current','upcoming'],
  });
  assert.equal(service.getStepperModel('v46', '비대면 접수현황', ['계좌 인증','접수현황 조회','결과 안내'], 1), null);
});

test('VER4.7 셀프서비스 stepper는 범위를 벗어난 현재 단계를 안전하게 보정한다', () => {
  const model = service.getStepperModel('v47', '서류 발급현황', ['계좌 인증','발급현황 조회','재발급'], 9);
  assert.equal(model.current, 2);
  assert.deepEqual(model.states, ['done','done','current']);
});
