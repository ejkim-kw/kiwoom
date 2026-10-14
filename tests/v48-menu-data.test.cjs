const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const catalogPath = path.join(__dirname, '../v48-menu-data.js');

test('the revised 9-category menu contains the requested 37 services without changing previous versions', () => {
  assert.ok(fs.existsSync(catalogPath), 'Ver 4.8 needs its own workbook catalog');
  const catalog = require(catalogPath);
  assert.deepEqual(catalog.categories.map(c => c.title), [
    '계좌정보', '인증센터', '개설/폐쇄', '서류발급', '뱅킹서비스', '신용/대출', '권리/청약', '주문/시세', '상품문의'
  ]);
  assert.deepEqual(catalog.categories.map(c => c.subtitle), ['고객정보/ID/PW','ARS/인증서/OTP','이어하기/내역조회','신청/내역조회','입출금/입출고','미수/신용/대출','유상/공모주','국내주식','해외/금융/파생']);
  assert.deepEqual(catalog.categories.map(c => c.items.map(i=>i.title)), [
    ['고객정보 조회','증권계좌번호 조회','연결 은행계좌정보 조회','ID 조회 / ID 비밀번호 재설정','장기미사용 ID 제한 해제','금융거래목적확인서','사고등록/해지'],
    ['ARS','간편인증/공동인증서','OTP'],
    ['계좌개설 이어하기','계좌폐쇄'],
    ['잔고증명서','거래내역서','금융소득내역서','기타서류'],
    ['은행이체','출금계좌등록','한도제한계좌 해제','주식대체'],
    ['미수현황','신용/대출 서비스안내','신용/대출 잔고조회','신용/대출 만기일연장','신용/대출 현금상환'],
    ['유상청약','공모주청약','반대의사 및 매수청구','그 외 권리업무'],
    ['시세 및 시황','국내주식 주문','국내주식 주문내역 조회','예수금 및 잔고조회'],
    ['해외주식 문의','금융상품(ISA/연금/펀드) 문의','파생상품(선물옵션/CFD) 문의','매체(HTS/MTS) 문의']
  ]);
  assert.deepEqual(catalog.selfServices.map(s => s.title), [
    '입출금이 안 돼요', '서류 발급현황이 궁금해요', 'ISA 가입서류를 내고싶어요',
    '비밀번호를 모르겠어요', '비대면 접수현황이 궁금해요', '오랜만에 키움증권 오셨나요',
    '다른 분의 계좌로 잘못 입금했어요', '레버리지ETP 거래가능한지 궁금해요', '선물옵션 거래가능한지 궁금해요'
  ]);
  const ids = catalog.categories.flatMap(c => c.items.map(i => i.id));
  assert.equal(new Set(ids).size, 37);
  const legacy = require('../v47-self-service.js');
  for (const ver of ['v47', 'v471']) {
    assert.equal(legacy.getSelfServiceItems(ver).length, 5);
    assert.equal(legacy.getSelfServiceItems(ver)[0].title, '입출금이 안돼요');
  }
});

function uiContext(version = 'v48') {
  const calls = [];
  const context = vm.createContext({
    V48Menu:require(catalogPath),
    I:new Proxy({}, {get:(_, key) => `<svg data-icon="${key}"></svg>`}),
    isV48:() => version === 'v48', bigFont:false, sessionAuthed:false,
    s1state:{amOpen:0, page:'home'},
    v47Esc:value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
    s1nav:patch => calls.push(['nav', patch]),
    closeMenuDrawer:() => calls.push(['close']),
    startV47MyInfo:title => calls.push(['myinfo', title]),
    startV47Untact:title => calls.push(['untact', title]),
    V47Untact:require('../v47-untact.js'), v48Session:{accountId:'12345678'},
    v48Require:pending => {calls.push(['auth',pending]);return !context.v48Session.accountId;},
    MYACCT_SHEET:{title:'linked-bank'},
    openMethodSheet:sheet => calls.push(['sheet', sheet]),
    openConsult:title => calls.push(['consult', title]),
    V47SelfService:require('../v47-self-service.js'),
    MEDIA_SHEETS:Object.fromEntries(['accident','authid','song','docpurpose','shipping','credit','rights','ipo','arsguide','pwmgmt','etcsvc','altex','acctopen'].map(key=>[key,{title:key}])),
  });
  const app=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
  vm.runInContext(app.slice(app.indexOf('const PWMGMT_VOICE_SHEET ='),app.indexOf('const AUTHID_SHEET =')),context);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../v48-home.js'), 'utf8'), context);
  return {context, calls};
}

test('home and drawer use the same revised hierarchy and section order', () => {
  const {context} = uiContext();
  const home = vm.runInContext('v48Home()', context);
  assert.ok(home.indexOf('class="v48-all"') < home.indexOf('class="v48-self-services"'));
  assert.match(home, /안녕하세요,<br>.*쉽고 빠르게 검색해보세요/);
  assert.match(home, /공모주 청약 일정 안내/);
  assert.match(home, /검색어를 입력하세요\./);
  assert.equal((home.match(/class="v48-service-item"/g) || []).length, 9);
  assert.equal((home.split('<section class="v48-all" aria-label="전체메뉴">')[1].match(/data-v48cat=/g) || []).length, 9);
  assert.doesNotMatch(home, /<details|<summary|전체메뉴 보기/);
  const drawer = vm.runInContext('renderV48AllMenu()', context);
  assert.ok(drawer.indexOf('v48-menu-popular') < drawer.indexOf('v48-menu-groups'));
  assert.equal((drawer.match(/class="v48-menu-group"/g) || []).length, 9);
  assert.equal((drawer.match(/class="v48-menu-link"/g) || []).length, 37);
  assert.doesNotMatch(drawer, /data-am1|am2col|<details/);
  for (const category of context.V48Menu.categories) {
    for (const item of category.items) assert.ok(drawer.includes(item.title));
  }
  assert.match(drawer, /data-v47searchgo="acctpw"/);
  assert.match(drawer, /data-v47searchgo="v48:item:2-3"/);
});

test('new category IDs, renamed entries, and search results reach their intended destinations', () => {
  const {context, calls} = uiContext();
  vm.runInContext("v48OpenMenuItem('1-1')", context);
  assert.deepEqual(calls.at(-1), ['myinfo', '계좌정보 조회 및 변경']);
  vm.runInContext("v48OpenMenuItem('2-1')", context);
  assert.deepEqual(calls.at(-1), ['untact', '서류신청']);
  const ipo = vm.runInContext("v48SearchItems('공모주').find(x => x.action === 'v48:category:7')", context);
  assert.ok(ipo, 'IPO must go to the new rights category, not credit/loans');
  const cert = vm.runInContext("v48SearchItems('공동인증서')", context);
  assert.ok(cert.some(x => x.action === 'v48:item:1-6'));
  const etp = vm.runInContext("v48SearchItems('레버리지')", context);
  assert.ok(etp.some(x => x.action === 'v48:self:self-8'));
  vm.runInContext("v48OpenMenuItem('account-number')",context);
  assert.deepEqual(calls.at(-1),['myinfo','증권계좌번호확인']);
  vm.runInContext("v48OpenMenuItem('linked-bank')",context);
  assert.equal(calls.at(-1)[0],'nav');
  assert.equal(calls.at(-1)[1].page,'result');
  assert.equal(calls.at(-1)[1].resultKey,'myacct');
  assert.equal(calls.at(-1)[1].title,'연결 은행계좌정보 조회');
  assert.equal(calls.some(([kind])=>kind==='sheet'),false,'매체 선택 없이 인증이 적용되는 결과 경로로 이동');
  assert.equal(vm.runInContext("v48FindItem('account-open')",context),undefined);
  assert.equal(vm.runInContext("v48SearchItems('계좌개설 시작하기').some(item=>item.action==='v48:item:account-open')",context),false);
});

test('financial purpose menu authenticates before its result and resumes without the legacy submission sheet',()=>{
  const {context,calls}=uiContext();
  context.v48Session.accountId='';
  vm.runInContext("v48OpenMenuItem('3-2')",context);
  assert.equal(calls.at(-1)[0],'auth');
  const pending=calls.at(-1)[1];
  assert.equal(pending.kind,'purpose');
  assert.equal(pending.title,'금융거래목적확인서');
  const authSource=fs.readFileSync(path.join(__dirname,'../v48-auth-ui.js'),'utf8');
  vm.runInContext(authSource.slice(authSource.indexOf('function v48Resume(){'),authSource.indexOf('function v48Apply(')),context);
  context.v48SyncAccount=()=>{};
  context.v48Pending=pending;context.v48Origin={page:'home'};
  context.v48MenuContext={title:pending.title};context.v48Session.accountId='63217654';
  vm.runInContext('v48Resume()',context);
  assert.equal(calls.at(-1)[0],'nav');
  assert.equal(calls.at(-1)[1].resultKey,'purposestatus');
  assert.equal(context.v48Session.accountId,'63217654');
  assert.equal(calls.some(call=>call[0]==='sheet'),false);
});

test('specific documents resume the existing application form after authentication',()=>{
  const {context,calls}=uiContext();
  context.v48Session.accountId='';
  vm.runInContext("v48OpenMenuItem('doc-balance')",context);
  const pending=calls.at(-1)[1];
  assert.equal(calls.at(-1)[0],'auth');
  assert.equal(pending.title,'잔고증명서');
  assert.equal(pending.kind,'document');
  context.v48Session.accountId='12345678';
  for(const [id,title] of [['doc-balance','잔고증명서'],['doc-trades','거래내역서'],['doc-income','금융소득내역서']]){
    vm.runInContext(`v48OpenMenuItem('${id}')`,context);
    assert.equal(context.s1state.v47Untact.selectedDocument,title);
    assert.equal(context.s1state.v47Untact.step,'form');
    assert.equal(context.s1state.v47Untact.account,'12345678');
    assert.equal(calls.at(-1)[1].page,'v47untact');
  }
});

test('other documents show six choices before authentication and resume the selected document afterward',()=>{
  const {context,calls}=uiContext();
  const titles=['은행이체거래내역서','레버리지 ETP 거래확인서','원천징수내역서','외납세액명세서','해외주식 양도소득내역서','파생상품 양도소득세 계산명세서'];
  const catalog=context.V48Menu;
  assert.deepEqual(catalog.otherDocuments.map(item=>item.title),titles);
  context.v48Session.accountId='';
  vm.runInContext("v48OpenMenuItem('doc-other')",context);
  assert.equal(calls.some(call=>call[0]==='auth'),false);
  assert.equal(calls.at(-1)[1].page,'v48menu');
  context.s1state.v48MenuId='doc-other';
  const html=vm.runInContext('renderV48MenuGuide()',context);
  assert.equal((html.match(/data-v48item=/g)||[]).length,6);
  assert.match(html,/찾는 서류가 없으신가요\?/);
  assert.match(html,/data-staffconnect="기타서류"[^>]*>상담원연결/);
  for(let i=0;i<titles.length;i++){
    assert.ok(html.includes(titles[i]));
    if(i)assert.ok(html.indexOf(titles[i-1])<html.indexOf(titles[i]));
  }
  const authSource=fs.readFileSync(path.join(__dirname,'../v48-auth-ui.js'),'utf8');
  vm.runInContext(authSource.slice(authSource.indexOf('function v48Resume(){'),authSource.indexOf('function v48Apply(')),context);
  context.v48SyncAccount=()=>{};
  for(const item of catalog.otherDocuments){
    calls.length=0;context.v48Session.accountId='';
    vm.runInContext(`v48OpenMenuItem('${item.id}')`,context);
    assert.equal(calls.at(-1)[0],'auth');
    const pending=calls.at(-1)[1];
    assert.equal(pending.title,item.title);
    assert.equal(pending.id,item.id);
    context.v48Pending=pending;context.v48Origin={page:'v48menu',v48MenuId:'doc-other'};
    context.v48MenuContext={title:item.title};
    context.v48Session.accountId='12345678';
    vm.runInContext('v48Resume()',context);
    assert.equal(context.v48MenuContext.accountId,'12345678');
    const state=context.s1state.v47Untact;
    assert.equal(state.selectedDocument,item.title);
    assert.equal(state.step,'form');
    assert.equal(state.account,'12345678');
    const invalid=context.V47Untact.transition(state,{type:'SUBMIT_DOCUMENT',startDate:'2026-10-01',purpose:'제출',copies:'1'});
    assert.equal(invalid.field,'period');
    const valid=context.V47Untact.transition(state,{type:'SUBMIT_DOCUMENT',startDate:'2026-10-01',endDate:'2026-10-12',purpose:'제출',copies:'1'});
    assert.equal(valid.error,'');
    assert.equal(valid.state.step,'complete');
  }
  assert.equal(context.V47Untact.DATA.documents.length,6,'older-version document choices remain unchanged');
  assert.equal(context.V47Untact.DATA.documents[4].name,'양도소득내역서');
});

test('ARS and product inquiry groups retain the existing detail destinations',()=>{
  const {context}=uiContext();
  for(const [id,children] of [['ars',['6-1','6-2','6-3']],['financial-products',['8-1','8-2','8-3']],['derivatives',['9-1','9-2','9-3','9-4']],['media-help',['6-4','6-5']]]){
    context.s1state.v48MenuId=id;
    const html=vm.runInContext('renderV48MenuGuide()',context);
    for(const child of children){
      assert.match(html,new RegExp(`data-v48item="${child}"`));
      assert.ok(vm.runInContext(`v48FindItem('${child}')`,context));
    }
  }
});

test('ARS order enrollment and cancellation are both reachable from the named menu',()=>{
  const {context,calls}=uiContext();
  vm.runInContext("v48OpenMenuItem('6-1')",context);
  const [kind,sheet]=calls.at(-1);
  assert.equal(kind,'sheet');
  assert.deepEqual(Array.from(sheet.methods || [],item=>item.kind),['pwmv2','pwmv3']);
});

test('Ver 4.8 recent menus and event handlers do not change earlier versions', () => {
  const {context} = uiContext();
  vm.runInContext("v48AddRecent('신용/대출','v48:category:4')", context);
  assert.match(vm.runInContext('v48Home()', context), /data-v47searchgo="v48:category:4"/);
  const legacy = uiContext('v471');
  assert.equal(vm.runInContext("handleV48MenuClick({closest(){throw Error('legacy DOM must not be inspected')}})", legacy.context), false);
  assert.deepEqual(legacy.calls, []);
});

test('the secondary self-service list also selects the workbook only in Ver 4.8',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
  const shared=source.slice(source.indexOf('function selfServiceItems(){'),source.indexOf('let ssBannerTimer'));
  for(const version of ['v48','v471','v47','v46']){
    const {context}=uiContext(version);context.s1Ver=version;
    vm.runInContext(shared,context);
    const services=vm.runInContext('selfServiceItems()',context);
    assert.equal(services.length,version==='v48'?9:version==='v46'?4:5);
    if(version==='v48')assert.match(services.at(-1).act,/data-v48self="self-8-futures"/);
    else assert.equal(services[0].act,'data-iodstart');
  }
});

test('all 37 menu entries and 9 self services have usable navigation', () => {
  const {context, calls} = uiContext();
  for (const item of context.V48Menu.categories.flatMap(category=>category.items)) {
    calls.length=0;
    vm.runInContext(`v48OpenMenuItem(${JSON.stringify(item.id)})`,context);
    const destination=calls.at(-1);
    assert.ok(['nav','myinfo','untact','sheet'].includes(destination[0]),item.title);
    assert.ok(destination[1],item.title+' destination must exist');
    if(destination[0]==='nav'&&destination[1].page==='v48menu'){
      Object.assign(context.s1state,destination[1]);
      const html=vm.runInContext('renderV48MenuGuide()',context);
      assert.ok(html.includes(item.title),item.title);
      assert.doesNotMatch(html,/undefined|null/);
    }
  }
  for (const item of context.V48Menu.selfServices) {
    calls.length=0;
    vm.runInContext(`v48OpenSelfService(${JSON.stringify(item.id)})`,context);
    const destination=calls.at(-1);
    assert.equal(destination[0],'nav',item.title);
    assert.ok(['authstep','pwresetchoice','v48menu'].includes(destination[1].page),item.title);
    if(destination[1].page==='v48menu'){
      Object.assign(context.s1state,destination[1]);
      assert.doesNotMatch(vm.runInContext('renderV48MenuGuide()',context),/undefined|null/);
    }
  }
});

test('back navigation restores the prior workbook category and menu after switching categories', () => {
  const {context}=uiContext();
  const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
  Object.assign(context,{
    closeConsult:()=>{},closeMethodSheet:()=>{},closeStkSheet:()=>{},renderS1:()=>{},
    v48ProtectedPage:()=>false
  });
  context.s1state.history=[];
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../v48-navigation.js'),'utf8'),context);
  vm.runInContext(source.slice(source.indexOf('function s1nav(patch){'),source.indexOf('function authSelect(){')),context);
  vm.runInContext("v48OpenCategory(1); v48OpenMenuItem('1-3'); v48OpenCategory(7); v48OpenMenuItem('7-7'); s1back(); s1back()",context);
  assert.equal(context.s1state.page,'v48menu');
  assert.equal(context.s1state.v48MenuId,'1-3');
  vm.runInContext('s1back()',context);
  assert.equal(context.s1state.page,'v48category');
  assert.equal(context.s1state.v48Category,1);
});
