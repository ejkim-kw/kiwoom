const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {parseHTML}=require('linkedom');
const DF=require('./digital-form.js');

function session(group,id,settings){return DF.selectProfessionalRequirement(DF.createSession('professionalInvestor',3,'any'),group,id,settings);}
function ui(){
  const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  const start=html.indexOf('/* Digital Form(dform)');
  const {window,document}=parseHTML('<html><body><div id="dform-phone"><div id="dform-stepper"></div><main id="dform-app"></main></div></body></html>');
  window.DigitalForm=DF;
  vm.runInNewContext(html.slice(start,html.indexOf('</script>',start)),{window,document,DigitalForm:DF,console});
  function click(selector){const el=document.querySelector(selector);assert.ok(el,selector);el.dispatchEvent(new window.Event('click',{bubbles:true}));}
  function check(key,checked){const el=document.querySelector('[data-dfcondition="'+key+'"]');assert.ok(el,key);el.checked=checked;el.dispatchEvent(new window.Event('change',{bubbles:true}));}
  function attach(index,method='file'){click('[data-dfattach="'+index+'"]');click('[data-dfmethod="'+method+'"]');click('[data-dfcomplete]');}
  function names(){return [...document.querySelectorAll('.df-attach-nm')].map(el=>el.textContent);}
  return {window,document,click,check,attach,names};
}

test('전문투자자는 업무 배지와 소득·전문가·자산 순서이며 요건을 고르기 전에는 첨부·제출할 수 없다',()=>{
  const task=DF.TASKS.professionalInvestor;
  assert.equal(task.category,'업무');
  assert.deepEqual(task.docs.map(doc=>doc.name),['소득요건','전문가요건','자산요건']);
  let s=DF.createSession('professionalInvestor',3,'any');
  s=DF.attachDemoDocuments(s);s=DF.attachDocument(s,0,'file');
  assert.equal(DF.canSubmit(s),false);
  assert.ok(DF.submit(s).error);
  const u=ui();assert.equal(u.document.querySelector('[data-dfgo="professionalInvestor"] .df-category').textContent,'업무');
  u.click('[data-dfgo="professionalInvestor"]');
  assert.equal(u.document.querySelector('[data-dfsubmit]'),null);
  assert.equal(u.document.querySelector('[data-dfmethod]'),null);
});

test('모든 세부요건은 별도 서류 목록과 공통서류를 생성하며 한 서류만으로는 제출되지 않는다',()=>{
  assert.deepEqual(DF.PROFESSIONAL_OPTIONS.map(options=>options.length),[2,9,3]);
  DF.PROFESSIONAL_OPTIONS.forEach((options,group)=>options.forEach(option=>{
    let s=session(group,option.id);
    assert.ok(s.documentDefinitions.length>=4,option.id);
    assert.equal(new Set(s.documentDefinitions.map(doc=>doc.id)).size,s.documents.length);
    assert.deepEqual(s.documentDefinitions.slice(0,3).map(doc=>doc.id),['identity','investment-balance','account-opening']);
    s=DF.attachDocument(s,0,'file');assert.equal(DF.canSubmit(s),false,option.id);
    s=DF.attachDemoDocuments(s);assert.equal(DF.canSubmit(s),true,option.id);
    const result=DF.submit(s);assert.equal(result.session.status,'received');
    assert.equal(result.session.selection.optionId,option.id);
  }));
});

test('부부합산 소득·전문자격의 서류 차이를 별도 첨부 항목에 반영한다',()=>{
  const own=session(0,'income-self').documentDefinitions;
  assert.ok(own.some(doc=>doc.name==='본인 소득금액증명원'));
  assert.ok(!own.some(doc=>doc.name.includes('배우자')));
  const couple=session(0,'income-couple').documentDefinitions;
  for(const name of ['배우자 소득금액증명원','가족관계증명서 또는 혼인관계증명서','배우자 개인(신용)정보 동의서','배우자 신분증'])assert.ok(couple.some(doc=>doc.name===name),name);
  for(const id of ['expert-investment-manager','expert-investment-analyst'])assert.ok(session(1,id).documentDefinitions.some(doc=>doc.id==='registration-history'));
  assert.ok(!session(1,'expert-accountant').documentDefinitions.some(doc=>doc.id==='registration-history'));
  assert.match(session(1,'expert-international-risk').documentDefinitions.map(doc=>doc.name).join(' '),/GARP/);
  assert.match(session(1,'expert-accountant').documentDefinitions.find(doc=>doc.id.startsWith('career')).summary,/협회.*심사 불가/);
});

test('자산 구성과 배우자·담보대출 조건을 함께 적용하고 투자경험 확인만 공통 증빙을 생략한다',()=>{
  let s=session(2,'assets-combined',{withSpouse:true,withMortgage:true});
  const ids=s.documentDefinitions.map(doc=>doc.id);
  for(const id of ['financial-balance','property-register','property-value','property-lease','credit-self','credit-spouse','spouse-consent','spouse-identity','mortgage-confirmation','mortgage-liability'])assert.ok(ids.includes(id),id);
  const before=s.documents.length;
  s=DF.selectProfessionalRequirement(s,2,'assets-combined',{experienceConfirmed:true});
  assert.equal(s.documents.length,before-2);
  assert.ok(s.documentDefinitions.some(doc=>doc.id==='identity'));
  assert.ok(!s.documentDefinitions.some(doc=>doc.id==='investment-balance'));
  assert.ok(session(2,'assets-property').documentDefinitions.every(doc=>doc.id!=='financial-balance'));
});

test('다른 요건을 선택해도 잘못된 서류를 재사용하지 않고 원래 요건으로 돌아가면 첨부를 보존한다',()=>{
  let s=session(0,'income-self');s=DF.attachDocument(s,3,'gallery');
  s=DF.selectProfessionalRequirement(s,1,'expert-lawyer');
  assert.equal(s.documents.filter(Boolean).length,0);
  s=DF.attachDocument(s,3,'camera');
  s=DF.selectProfessionalRequirement(s,0,'income-self');
  assert.deepEqual(s.documents[3],{method:'gallery',attached:true});
  assert.equal(DF.selectProfessionalRequirement(s,1,'invalid'),s);
});

test('각 물음표에서 안내를 확인·선택하면 해당 서류 목록으로 이동하고 개별 첨부 후 접수한다',()=>{
  const u=ui();u.click('[data-dfgo="professionalInvestor"]');
  for(const group of [0,1,2]){
    u.click('[data-dfguide="'+group+'"]');
    assert.ok(u.document.querySelector('.df-professional-guide [href^="https://www.kiwoom.com/"]'));
    assert.equal(u.document.querySelectorAll('[data-dfoption]').length,DF.PROFESSIONAL_OPTIONS[group].length);
    assert.equal(u.document.querySelector('.df-guide-sample'),null);
    u.click('.df-guide-head [data-dfguideclose]');
  }
  u.click('[data-dfguide="0"]');u.click('[data-dfoption="income-self"]');
  assert.equal(u.document.querySelector('#dform-stepper .current b').textContent,'첨부');
  assert.deepEqual(u.names(),['본인 신분증','개인전문투자자 증빙용 잔고증명서','계좌개설확인서','본인 소득금액증명원']);
  u.click('[data-dfguide="3"]');assert.match(u.document.querySelector('.df-guide-desc').textContent,/홈택스/);u.click('.df-guide-head [data-dfguideclose]');
  assert.equal(u.document.querySelector('[data-dfsubmit]').getAttribute('aria-disabled'),'true');
  u.attach(0,'camera');u.click('[data-dfsubmit]');assert.equal(u.document.querySelector('.df-receipt'),null);
  u.click('[data-dfrequirements]');u.click('[data-dfattach="0"]');assert.equal(u.document.querySelectorAll('.df-attached-state').length,1);
  u.attach(1,'file');u.attach(2,'gallery');u.attach(3,'file');
  assert.equal(u.document.querySelector('[data-dfsubmit]').getAttribute('aria-disabled'),'false');
  u.click('[data-dfsubmit]');assert.match(u.document.querySelector('.df-receipt-card').textContent,/전문투자자/);
  assert.equal(u.document.querySelector('.df-status-flow .current b').textContent,'접수완료');
  u.click('[data-dfhome]');u.click('[data-dfgo="isa"]');u.click('[data-dfguide="0"]');
  assert.equal(u.document.querySelector('.df-guide-sample').getAttribute('src'),'assets/income-certificate-sample.svg');
});

test('자산 추가 조건을 화면에서 변경하면 해당 서류가 늘어나고 이미 첨부한 공통서류는 유지한다',()=>{
  const u=ui();u.click('[data-dfgo="professionalInvestor"]');u.click('[data-dfattach="2"]');u.click('[data-dfoption="assets-financial"]');
  u.attach(0);u.check('withSpouse',true);u.check('withMortgage',true);
  for(const name of ['배우자 신분증','배우자 신용정보조회서','금융거래확인서','부채증명서'])assert.ok(u.names().includes(name),name);
  assert.equal(u.document.querySelectorAll('.df-attached-state').length,1);
  u.check('experienceConfirmed',true);assert.ok(!u.names().includes('계좌개설확인서'));
  assert.equal(u.document.querySelectorAll('.df-attached-state').length,1);
});


test('투자경험 확인을 되돌리면 기존 증빙 첨부가 복원되고 배우자 잔고는 본인 면제와 별개다',()=>{
  let s=session(2,'assets-financial',{withSpouse:true});
  s=DF.attachDocument(s,1,'file');
  s=DF.selectProfessionalRequirement(s,2,'assets-financial',{experienceConfirmed:true,ownKiwoomAssets:true});
  assert.ok(!s.documentDefinitions.some(doc=>doc.id==='financial-balance'));
  assert.ok(s.documentDefinitions.some(doc=>doc.id==='spouse-financial-balance'));
  s=DF.selectProfessionalRequirement(s,2,'assets-financial',{experienceConfirmed:false});
  assert.equal(s.documents[1].method,'file');
});
