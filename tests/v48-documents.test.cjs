const test=require('node:test');
const assert=require('node:assert/strict');
const documents=require('../v48-documents.js');
const balance={name:'잔고증명서',mode:'date'};
const today='2026-10-14';
const valid=()=>({...documents.createDraft(balance.name,'010-1234-5678'),date:'2026-10-13',email:'demo@example.com'});

test('신청 수령 정보는 고객 기본정보의 이메일과 등록 주소에서 가져온다',()=>{
  const profile={email:' registered@example.com ',address:'서울특별시 예시로 12',deliveryAddress:'서울특별시 수령로 34'};
  const draft=documents.createDraft(balance.name,'010-1234-5678',profile);
  assert.equal(draft.email,'registered@example.com');
  assert.equal(draft.address,profile.deliveryAddress);
  assert.equal(documents.createDraft(balance.name,'', {address:profile.address}).address,profile.address);
  assert.equal(documents.createDraft(balance.name).email,'');
});

test('필수 정보가 비면 신청할 수 없고 선택하지 않은 수령 정보는 요구하지 않는다',()=>{
  const draft={...documents.createDraft(balance.name,'010-1234-5678',{email:'registered@example.com',address:'서울특별시 예시로 12'}),date:'2026-10-13'};
  assert.equal(documents.validate(draft,balance,today).error,'');
  for(const field of ['date','purpose','copies','contact','email'])assert.notEqual(documents.validate({...draft,[field]:''},balance,today).error,'');
  assert.equal(documents.validate({...draft,delivery:'우편신청',email:''},balance,today).error,'');
  assert.notEqual(documents.validate({...draft,delivery:'우편신청',address:''},balance,today).error,'');
});

test('국문·이메일 신청은 숨겨진 영문명과 주소를 요구하거나 전송하지 않는다',()=>{
  const result=documents.validate({...valid(),englishName:'OLD NAME',address:'이전 주소',otherPurpose:'이전 용도'},balance,today);
  assert.equal(result.error,'');
  assert.equal(result.request.englishName,'');
  assert.equal(result.request.address,'');
  assert.equal(result.request.otherPurpose,'');
});
test('영문과 기타 용도는 해당 입력값이 있어야 신청할 수 있다',()=>{
  const draft={...valid(),language:'영문',purpose:'기타'};
  assert.equal(documents.validate(draft,balance,today).field,'englishName');
  draft.englishName='HONG GILDONG';
  assert.equal(documents.validate(draft,balance,today).field,'otherPurpose');
  draft.otherPurpose='해외 금융기관 제출';
  const result=documents.validate(draft,balance,today);
  assert.equal(result.error,'');
  assert.deepEqual(documents.summaryRows(result.request).find(([key])=>key==='영문명'),['영문명','HONG GILDONG']);
  assert.deepEqual(documents.summaryRows(result.request).find(([key])=>key==='용도'),['용도','기타 · 해외 금융기관 제출']);
});
test('우편 신청은 이메일 대신 수령처주소를 검증하고 완료내역에 표시한다',()=>{
  const draft={...valid(),delivery:'우편신청',email:'invalid'};
  assert.equal(documents.validate(draft,balance,today).field,'address');
  draft.address='서울특별시 예시로 12, 101호';
  const result=documents.validate(draft,balance,today);
  assert.equal(result.error,'');
  assert.equal(result.request.email,'');
  const rows=documents.summaryRows(result.request);
  assert.deepEqual(rows.find(([key])=>key==='수령처주소'),['수령처주소',draft.address]);
  assert.equal(rows.some(([key])=>key==='이메일주소'),false);
});
test('신청 내역은 신청일을 기록하고 발급일은 비워 둔다',()=>{
  const result=documents.validate(valid(),balance,today);
  const rows=documents.summaryRows(result.request);
  assert.deepEqual(rows.find(([key])=>key==='신청일'),['신청일','2026.10.14']);
  assert.deepEqual(rows.find(([key])=>key==='발급일'),['발급일','']);
  assert.deepEqual(rows.find(([key])=>key==='기준일'),['기준일','2026.10.13']);
});
test('잘못된 기준일·신청매수·연락처·이메일을 거절한다',()=>{
  for(const [field,value] of [['date','2026-02-30'],['date','2026-10-15'],['copies','0'],['copies','1.5'],['contact','123'],['email','invalid']]){
    assert.equal(documents.validate({...valid(),[field]:value},balance,today).field,field);
  }
});
test('다른 기간형 서류의 신청정보도 카드 완료내역으로 유지한다',()=>{
  const doc={name:'거래내역서',mode:'period'};
  const draft={...documents.createDraft(doc.name),startDate:'2026-10-01',endDate:'2026-10-13',purpose:'금융기관 제출'};
  const result=documents.validate(draft,doc,today);
  assert.equal(result.error,'');
  assert.deepEqual(documents.summaryRows(result.request).find(([key])=>key==='조회기간'),['조회기간','2026.10.01 ~ 2026.10.13']);
  assert.equal(documents.validate({...draft,endDate:'2026-09-30'},doc,today).field,'endDate');
});
