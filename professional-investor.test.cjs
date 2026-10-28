const test = require('node:test');
const assert = require('node:assert/strict');
const DigitalForm = require('./digital-form.js');

test('전문투자자는 소득·전문가·자산 순서의 대체 요건으로 접수한다', () => {
  const task = DigitalForm.TASKS.professionalInvestor;
  assert.ok(task);
  assert.equal(task.category, '금융상품');
  assert.deepEqual(task.docs.map(doc => doc.name), ['소득요건', '전문가요건', '자산요건']);
  assert.equal(task.requirementMode, 'any');
  assert.match(DigitalForm.requirementLabel(task), /요건.*한 가지 이상/);
  for (const index of [0, 1, 2]) {
    let session = DigitalForm.createSession('professionalInvestor', 3, task.requirementMode);
    assert.equal(DigitalForm.canSubmit(session), false);
    assert.ok(DigitalForm.submit(session).error);
    session = DigitalForm.attachDocument(session, index, 'file');
    const result = DigitalForm.submit(session);
    assert.equal(result.error, '');
    assert.equal(result.session.status, 'received');
    assert.equal(result.session.documents.filter(Boolean).length, 1);
    assert.equal(result.session.documents[index].method, 'file');
  }
});

test('요건별 안내는 공식 서류와 배우자 합산 조건, 공통 투자경험을 구분한다', () => {
  const task = DigitalForm.TASKS.professionalInvestor;
  assert.ok(task);
  const [income, expert, asset] = task.docs.map(doc => JSON.stringify(doc.guide));
  assert.match(income, /소득금액증명원/);
  assert.match(income, /1\.5억원/);
  assert.match(income, /배우자 신분증/);
  assert.match(expert, /금융투자전문인력등록확인서/);
  assert.match(expert, /경력증명서/);
  assert.match(expert, /GARP/);
  assert.doesNotMatch(expert, /CFA/);
  assert.match(asset, /신용정보조회서/);
  assert.match(asset, /임대차계약서/);
  assert.match(asset, /부채증명서/);
  assert.match(task.preparation.join(' '), /개인전문투자자 증빙용 잔고증명서/);
  assert.match(task.preparation.join(' '), /계좌개설확인서/);
  assert.match(task.preparation.join(' '), /등록 완료.*별도/);
  for (const doc of task.docs) {
    assert.equal(doc.guide.source.url, 'https://www.kiwoom.com/h/help/right/VHelpProInvestorView?viewIdx=0');
    assert.ok(doc.guide.sections.length >= 2);
    assert.equal(doc.guide.sample, '');
  }
});
