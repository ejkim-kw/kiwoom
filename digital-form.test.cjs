const test = require('node:test');
const assert = require('node:assert/strict');
const DigitalForm = require('./digital-form.js');

test('필수 서류가 모두 첨부되기 전에는 제출할 수 없다', () => {
  let session = DigitalForm.createSession('isa', 3);
  session = DigitalForm.attachDocument(session, 0, 'camera');
  session = DigitalForm.attachDocument(session, 1, 'file');
  assert.equal(DigitalForm.canSubmit(session), false);
  session = DigitalForm.attachDocument(session, 2, 'gallery');
  assert.equal(DigitalForm.canSubmit(session), true);
});

test('첨부 방식과 완료 여부를 서류별로 보존한다', () => {
  const session = DigitalForm.attachDocument(DigitalForm.createSession('rename', 2), 1, 'gallery');
  assert.deepEqual(session.documents, [null, {method:'gallery', attached:true}]);
});

test('모든 서류가 첨부된 접수만 접수완료 상태로 제출한다', () => {
  let incomplete = DigitalForm.attachDocument(DigitalForm.createSession('agent', 2), 0, 'camera');
  assert.equal(DigitalForm.submit(incomplete).error, '필수 서류를 모두 첨부해 주세요.');
  let complete = DigitalForm.attachDocument(incomplete, 1, 'file');
  const result = DigitalForm.submit(complete);
  assert.equal(result.error, '');
  assert.equal(result.session.status, 'received');
  assert.match(result.session.receiptNo, /^DF-\d{8}-\d{4}$/);
});

test('접수상태 다섯 단계를 고객 문구로 제공한다', () => {
  assert.deepEqual(DigitalForm.STATUSES.map(x => x.label), ['접수완료','처리중','보완요청','보완중','처리완료']);
});
