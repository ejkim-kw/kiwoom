const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const catalog=require('../v48-menu-data.js');
const M=require('../content-model.js');
test('category and item ordering preserve every stable route and leave the catalog unchanged',()=>{
  const data=M.empty();data.categoryOrder=['4','1','2','3','5','6','7','8','9'];
  data.itemOrder['1']=catalog.categories[0].items.map(i=>i.id).reverse();
  data.labels['category:4:title']='증명서 발급';data.labels['item:1-1:title']='내 정보 확인';
  const changed=M.applyCatalog(catalog,M.validate(data,catalog));
  assert.equal(changed.categories[0].id,4);
  assert.equal(changed.categories[0].title,'증명서 발급');
  assert.equal(changed.categories[1].items.at(-1).id,'1-1');
  assert.equal(changed.categories[1].items.at(-1).title,'내 정보 확인');
  assert.equal(catalog.categories[0].title,'계좌정보');
  assert.deepEqual(changed.categories.flatMap(c=>c.items.map(i=>i.id)).sort(),catalog.categories.flatMap(c=>c.items.map(i=>i.id)).sort());
});
test('invalid or incomplete trees, unsafe keys and malformed copy records are rejected',()=>{
  const data=M.empty();
  for(const patch of [
    {version:2},{categoryOrder:['1','1']},{categoryOrder:['1']},{itemOrder:{1:['unknown']}},
    {itemOrder:JSON.parse('{"__proto__":[]}')},{labels:{'item:unknown:title':'X'}},
    {labels:{'category:1:id':'9'}},{labels:{'category:1:title':''}},
    {copies:[{scope:'s1',root:'body',selector:'h2',original:'A',text:'B'}]},
    {copies:[{scope:'s1',root:'mainStage',selector:'input',original:'A',text:'B'}]}
  ])assert.throws(()=>M.validate({...data,...patch},catalog));
});
test('plain text serialization cannot close a script tag and copy records round-trip',()=>{
  const data=M.empty();data.copies=[{scope:'s1:v48:home',root:'mainStage',selector:'h1.v48-title',original:'안녕하세요',text:'<script>alert(1)</script>\n새 안내'}];
  const clean=M.validate(data,catalog),context={};vm.runInNewContext(M.toScript(clean),context);
  assert.equal(context.KiwoomContentData.copies[0].text,data.copies[0].text);
  assert.ok(!M.toScript(clean).includes('</script>'));
});

test('fixed labels inside input-style wrappers are editable without allowing actual input elements',()=>{
  const data=M.empty();
  data.copies=[{scope:'s1:test',root:'mainStage',selector:'div.v48-input-fields > div.v48-input-field > label',original:'비밀번호 확인',text:'비밀번호 다시 입력'}];
  assert.equal(M.validate(data,catalog).copies[0].text,'비밀번호 다시 입력');
  data.copies[0].selector='div.v48-input-field > input#password';assert.throws(()=>M.validate(data,catalog));
});

test('copy scopes distinguish Digital Form tasks and ignore stale navigation fields on home',()=>{
  const context={KiwoomContentModel:M,V48Menu:catalog,document:{addEventListener(){}},s1state:{page:'home'},sianScheme:'s1',s1Ver:'v48'};context.window=context;
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../content-runtime.js'),'utf8'),context);
  const C=context.KiwoomContent,df=id=>({id:'dform-phone',dataset:{contentScreen:id},querySelector:()=>null});
  assert.notEqual(C.scope(df('detail:identity')),C.scope(df('detail:isa')));
  assert.notEqual(C.scope(df('done:identity')),C.scope(df('done:isa')));
  const container={id:'mainStage',dataset:{}};const first=C.scope(container);
  Object.assign(context.s1state,{resultKey:'old',v48MenuId:'old',v48Category:7});
  assert.equal(C.scope(container),first);
});

test('menu names remain plain text in method and consultation sheets',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),cheerio=require('cheerio');
  const escape=value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const label='<img src=x onerror=alert(1)>',rendered=[];
  const context={document:{getElementById:id=>id==='screen'?{appendChild:el=>rendered.push(el)}:null,createElement:()=>({dataset:{},classList:{add(){}},setAttribute(){}})},requestAnimationFrame:fn=>fn(),s1Ver:'v48',bigFont:false,isV45:()=>true,isV47:()=>true,v47Esc:escape,CONSULT_CHANNELS:[],V47_CONSULT_ICON:{},I:{}};
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('function openMethodSheet(cfg)'),source.indexOf('function closeMethodSheet()')),context);
  vm.runInContext(source.slice(source.indexOf('function openConsult('),source.indexOf('function closeConsult()')),context);
  context.openMethodSheet({title:label});context.openConsult(label);
  for(const el of rendered){const $=cheerio.load(el.innerHTML);assert.equal($('img[onerror]').length,0);assert.ok($.text().includes(label));}
  assert.equal(rendered.length,2);
});

test('edited menu names also remain text on subsequent voice and app completion screens',()=>{
  const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),cheerio=require('cheerio');
  const label='<img src=x onerror=alert(1)>',context={s1state:{voiceLabel:label,heroTitle:label},sessionAuthed:false,bigFont:false,isV40:()=>true,I:{},wipeNote:s=>s,v47Esc:value=>String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
  vm.createContext(context);
  vm.runInContext(source.slice(source.indexOf('function renderVoiceConnect()'),source.indexOf('function renderIdDone()')),context);
  for(const render of [context.renderVoiceConnect,context.renderVoiceDone,context.renderHeroDone]){
    const $=cheerio.load(render());assert.equal($('img[onerror]').length,0);assert.ok($.text().includes(label));
  }
});
test('moving a menu supports adjacent keyboard moves and arbitrary drag destinations',()=>{
  assert.deepEqual(M.move(['a','b','c'],'c','a'),['c','a','b']);
  assert.deepEqual(M.move(['a','b','c'],'a','c'),['b','c','a']);
  assert.deepEqual(M.move(['a','b','c'],'a','a'),['a','b','c']);
  assert.throws(()=>M.move(['a','b'],'x','a'));
});
test('content import validates before writing, then emits the same data used by the browser',()=>{
  const {importContent}=require('../scripts/apply-content.cjs');
  const os=require('node:os'),folder=fs.mkdtempSync(path.join(os.tmpdir(),'kiwoom-content-test-'));
  const source=path.join(folder,'edits.json'),target=path.join(folder,'content-data.js');
  try{
    fs.writeFileSync(target,'original');fs.writeFileSync(source,JSON.stringify({version:99}));
    assert.throws(()=>importContent(source,target));assert.equal(fs.readFileSync(target,'utf8'),'original');
    const data=M.empty();data.labels['category:1:title']='나의 계좌';fs.writeFileSync(source,JSON.stringify(data));
    importContent(source,target);const context={};vm.runInNewContext(fs.readFileSync(target,'utf8'),context);
    assert.equal(context.KiwoomContentData.labels['category:1:title'],'나의 계좌');
  }finally{for(const name of fs.readdirSync(folder))fs.unlinkSync(path.join(folder,name));fs.rmdirSync(folder);}
});
