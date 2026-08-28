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

test('Digital Form 신청 목록은 요청한 10개 업무와 분류 배지를 제공한다', () => {
  assert.equal(Object.keys(DigitalForm.TASKS).length, 10);
  assert.deepEqual(Object.values(DigitalForm.TASKS).map(x => x.category), [
    '업무','업무','업무','업무','금융상품','선물옵션','국내주식','해외주식','선물옵션','업무'
  ]);
  assert.deepEqual(Object.values(DigitalForm.TASKS).map(x => x.title), [
    '미성년자 업무처리 (대리인)','법인계좌 업무처리 (대리인)','본인확인용','개명',
    'ISA 서민형 증빙서류 제출','선물옵션 적격투자자','레버리지ETP 적격투자자',
    '해외레버리지ETP 적격투자자','선물옵션 기본예탁금 전입','기타'
  ]);
});

test('선택형 업무는 서류 하나만 첨부해도 제출할 수 있다', () => {
  let corporate = DigitalForm.createSession('corporate', 4, 'any');
  assert.equal(DigitalForm.canSubmit(corporate), false);
  corporate = DigitalForm.attachDocument(corporate, 2, 'file');
  assert.equal(DigitalForm.canSubmit(corporate), true);

  let qualified = DigitalForm.createSession('futuresQualified', 3, 'any');
  qualified = DigitalForm.attachDocument(qualified, 0, 'file');
  assert.equal(DigitalForm.canSubmit(qualified), true);
});

test('실물촬영 필수 서류는 사진 촬영 방식만 허용한다', () => {
  assert.deepEqual(DigitalForm.TASKS.minor.docs[0].methods, ['camera']);
  assert.deepEqual(DigitalForm.TASKS.identity.docs[0].methods, ['camera']);
  assert.deepEqual(DigitalForm.TASKS.rename.docs[0].methods, ['camera']);
});

test('신청 목록 분류값을 서로 다른 배지 색상 클래스로 매핑한다', () => {
  assert.deepEqual(['업무','금융상품','선물옵션','국내주식','해외주식'].map(DigitalForm.categoryClass), [
    'business','finance','futures','domestic','overseas'
  ]);
});

test('소득확인증명서는 홈택스 발급 안내와 전용 예시 이미지를 제공한다', () => {
  const income = DigitalForm.TASKS.isa.docs[0];
  assert.equal(income.guide.title, '서류안내');
  assert.match(income.guide.description, /국세청 홈택스/);
  assert.deepEqual(income.guide.checks, ['발급 용도','귀속연도','총급여액']);
  assert.equal(income.guide.sample, 'assets/income-certificate-sample.svg');
  assert.notEqual(DigitalForm.TASKS.minor.docs[0].guide.sample, income.guide.sample);
});

test('서류안내 바텀시트는 VER4.7 블러와 정렬된 헤더 및 숨김 스크롤바를 사용한다', () => {
  const css = require('node:fs').readFileSync(require('node:path').join(__dirname, 'style.css'), 'utf8');
  assert.match(css, /#dform-phone \.df-guide-ov\{[^}]*background:rgba\(20,24,60,\.32\)[^}]*backdrop-filter:blur\(8px\)/);
  assert.match(css, /#dform-phone \.df-guide-head\{[^}]*min-height:44px[^}]*align-items:center/);
  assert.match(css, /#dform-phone \.df-guide-sheet \.df-guide-head button\{[^}]*width:44px[^}]*height:44px/);
  assert.match(css, /#dform-phone \.df-guide-sheet\{[^}]*scrollbar-width:none/);
  assert.match(css, /#dform-phone \.df-guide-sheet::-webkit-scrollbar\{display:none\}/);
});

test('제출서류가 한 종류면 필요서류 배지를 표시하지 않는다', () => {
  assert.equal(DigitalForm.requirementLabel(DigitalForm.TASKS.isa), '');
  assert.equal(DigitalForm.requirementLabel(DigitalForm.TASKS.minor), '아래 서류 모두 필요');
  assert.equal(DigitalForm.requirementLabel(DigitalForm.TASKS.corporate), '아래 서류 중 1개만 선택');
});

test('모든 제출서류는 맞춤 안내와 실제 예시 이미지 파일을 제공한다', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const docs = Object.values(DigitalForm.TASKS).flatMap(task => task.docs);
  assert.equal(docs.length, 17);
  for (const doc of docs) {
    assert.equal(doc.guide.title, '서류안내', doc.name);
    assert.ok(doc.guide.description.length > 10, doc.name);
    assert.ok(doc.guide.notes.length >= 2, doc.name);
    assert.ok(doc.guide.checks.length >= 1, doc.name);
    assert.ok(fs.existsSync(path.join(__dirname, doc.guide.sample)), doc.name);
  }
});

test('주민번호 뒷자리 표시가 필요한 예시는 전체 형식의 가상번호를 보여준다', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  for (const doc of DigitalForm.TASKS.rename.docs) {
    assert.equal(doc.guide.showFullRrn, true, doc.name);
    const sample = fs.readFileSync(path.join(__dirname, doc.guide.sample), 'utf8');
    assert.match(sample, /900101-1234567/, doc.name);
    assert.doesNotMatch(sample, /900101-1\*+/, doc.name);
  }
});

test('서류첨부 시연은 업무 조건을 충족하도록 첨부하고 제출을 활성화한다', () => {
  let all = DigitalForm.createSession('minor', 2, 'all');
  all = DigitalForm.attachDemoDocuments(all);
  assert.equal(all.documents.filter(Boolean).length, 2);
  assert.equal(DigitalForm.canSubmit(all), true);

  let any = DigitalForm.createSession('corporate', 4, 'any');
  any = DigitalForm.attachDemoDocuments(any);
  assert.equal(any.documents.filter(Boolean).length, 1);
  assert.equal(DigitalForm.canSubmit(any), true);
});

test('왼쪽 시연 기능에 서류첨부 버튼을 제공한다', () => {
  const html = require('node:fs').readFileSync(require('node:path').join(__dirname, 'index.html'), 'utf8');
  assert.match(html, /data-demo-attach-documents/);
  assert.match(html, />서류첨부</);
  assert.match(html, /data-demo-attach-documents[^>]*>[\s\S]*?Digital Form에 시연서류 첨부/);
  assert.doesNotMatch(html, /data-demo-attach-documents[^>]*>[\s\S]*?현재 Digital Form/);
});

test('기타 업무는 목록 마지막에서 양식 제한 없이 최대 10개를 받는다', () => {
  const entries = Object.entries(DigitalForm.TASKS);
  const [id, task] = entries.at(-1);
  assert.equal(id, 'other');
  assert.equal(task.category, '업무');
  assert.equal(task.title, '기타');
  assert.equal(task.detailTitle, '서류를 첨부해주세요');
  assert.equal(task.maxAttachments, 10);
  assert.equal(task.requirementMode, 'any');

  let session = DigitalForm.createSession('other', task.maxAttachments, task.requirementMode);
  assert.equal(DigitalForm.canSubmit(session), false);
  session = DigitalForm.attachDocument(session, 0, 'file');
  assert.equal(DigitalForm.canSubmit(session), true);
  assert.equal(DigitalForm.visibleAttachmentCount(session, task.maxAttachments), 2);
  for (let index = 1; index < 10; index++) session = DigitalForm.attachDocument(session, index, 'file');
  assert.equal(DigitalForm.visibleAttachmentCount(session, task.maxAttachments), 10);
});
