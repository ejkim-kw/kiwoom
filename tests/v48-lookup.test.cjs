const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const service=require('../v47-self-service.js');
const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');

function setup(version){
  const rendered=[],timers=[],sheets=[];
  const context=vm.createContext({
    s1Ver:version,isV48:()=>version==='v48',V47SelfService:service,I:{back:'←'},
    iodStepsFor:()=>['계좌 인증','계좌 조회','결과 안내'],
    IOD_RESULTS:{multi:{sheet:'register'},dormant:{sheet:'register'},limit:{sheet:'limit'}},
    openMethodSheet(sheet){sheets.push(sheet);},
    s1state:{page:'v48auth',title:'계좌 인증',history:[{page:'home'}],certHasRecords:false},
    s1nav(patch){Object.assign(context.s1state,patch);rendered.push(context.s1state.page);},
    renderS1(){rendered.push(context.s1state.page);},
    setTimeout(fn,delay){timers.push({fn,delay});}
  });
  for(const name of ['startIodCheck','startIsaCheck','startCertCheck','startUntactStatusCheck','v45AuthTop','openIodResultAction']){
    const start=source.indexOf(`function ${name}(`);
    if(start<0)continue;
    const end=source.indexOf('\n}',start)+2;
    vm.runInContext(source.slice(start,end),context);
  }
  return {context,rendered,timers,sheets,run:code=>vm.runInContext(code,context)};
}

const lookups=[
  ['startIodCheck','iodcheck','iodresult',5000],
  ['startIsaCheck','isacheck','isaresult',2500],
  ['startCertCheck','certcheck','certstatus',2500],
  ['startUntactStatusCheck','untactstatuscheck','untactstatusresult',2500]
];
for(const [start,loading,result,delay] of lookups){
  test(`v48 ${start}: 인증 후 대기 타이머 없이 결과 화면만 표시한다`,()=>{
    const {run,context,rendered,timers}=setup('v48');
    run(`${start}()`);
    assert.deepEqual(rendered,[result]);
    assert.equal(timers.length,0);
    assert.equal(context.s1state.noBack,false);
    assert.equal(context.s1state.history.length,0);
    if(start==='startIodCheck')assert.equal(context.s1state.iodResult,'idcard');
    if(start==='startIsaCheck')assert.equal(context.s1state.isaTab,'new');
    if(start==='startCertCheck')assert.equal(context.s1state.certHasRecords,true);
  });
  test(`v471 ${start}: 기존 조회 단계와 대기 시간을 유지한다`,()=>{
    const {run,rendered,timers}=setup('v471');
    run(`${start}()`);
    assert.deepEqual(rendered,[loading]);
    assert.equal(timers[0].delay,delay);
    timers[0].fn();
    assert.deepEqual(rendered,[loading,result]);
  });
}

test('v48 조회 및 결과 헤더는 진행바 없이 뒤로가기와 결과 전환 버튼을 유지한다',()=>{
  const {run}=setup('v48');
  for(const step of [0,1,2]){
    const html=run(`v45AuthTop(${step},'<button data-isacycle>다른 결과 보기</button>')`);
    assert.doesNotMatch(html,/stepper|progressbar|진행 단계/);
    assert.match(html,/data-s1back/);
    assert.match(html,/data-isacycle/);
  }
  assert.match(setup('v471').run('v45AuthTop(2)'),/role="progressbar"/);
});

for(const result of ['multi','dormant']){
  test(`v48 ${result}: 매체 선택 없이 금융거래목적확인서 등록 화면으로 이동한다`,()=>{
    const {context,run,rendered,sheets}=setup('v48');
    context.s1state.iodResult=result;
    run('openIodResultAction()');
    assert.deepEqual(sheets,[]);
    assert.deepEqual(rendered,['result']);
    assert.equal(context.s1state.resultKey,'purpose');
  });
}
test('v48 한도 제한은 기존 해제 방법 선택을 유지한다',()=>{
  const {context,run,rendered,sheets}=setup('v48');
  context.s1state.iodResult='limit';
  run('openIodResultAction()');
  assert.deepEqual(rendered,[]);
  assert.deepEqual(sheets,['limit']);
});
test('v471 금융거래목적확인서는 기존 매체 선택을 유지한다',()=>{
  const {context,run,rendered,sheets}=setup('v471');
  context.s1state.iodResult='multi';
  run('openIodResultAction()');
  assert.deepEqual(rendered,[]);
  assert.deepEqual(sheets,['register']);
});

test('금융거래목적 등록은 두 답변이 아니오이고 확인에 동의한 경우에만 허용한다',()=>{
  const start=source.indexOf('function v48PurposeCanRegister(');
  assert.ok(start>=0,'등록 조건 검증 함수가 있어야 한다');
  const end=source.indexOf('\n}',start)+2;
  const check=vm.runInNewContext(`(${source.slice(start,end)})`);
  for(const purpose of ['장기미사용 거래중지계좌','금융투자상품 거래']){
    for(const rental of [undefined,'예','아니오'])for(const loan of [undefined,'예','아니오'])for(const confirmed of [false,true]){
      assert.equal(check({purpose,rental,loan,confirmed}),rental==='아니오'&&loan==='아니오'&&confirmed);
    }
  }
  assert.equal(check({purpose:'저축',rental:'아니오',loan:'아니오',confirmed:true}),false);
  assert.equal(check({purpose:'금융투자상품 거래',rental:'아니오',loan:'아니오',confirmed:'true'}),false);
});
