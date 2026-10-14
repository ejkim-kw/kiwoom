const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

function setup(version='v48'){
  const view={scrollTop:185,querySelectorAll:()=>[]};
  let drawer=null;
  const context=vm.createContext({
    isV48:()=>version==='v48',s1state:{page:'home',history:[],v48HomeExpanded:1},
    v48Flow:null,v48Pending:null,v48Origin:null,v48SearchText:'',v48SearchSubmitted:false,
    document:{getElementById:id=>id==='s1view'?view:id==='menuDrawer'?drawer:null},
    v48StopPhoneTimers(){},v48ClosePhoneSheet(){},v48CloseQuickHelp(){},closePwKeypad(){},
    closeMenuDrawer(){drawer=null;},closeMethodSheet(){},closeConsult(){},closeAcctSheet(){},closeStkSheet(){},
    v48SyncAccount(){},renderS1(){},
    openMenuDrawer(){const scroll={scrollTop:0};drawer={classList:{contains:()=>true},querySelector:()=>scroll,querySelectorAll:()=>[]};},
    requestAnimationFrame:fn=>fn(),
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../v48-navigation.js'),'utf8'),context);
  return {context,view,run:code=>vm.runInContext(code,context),setDrawer:value=>drawer=value,getDrawer:()=>drawer};
}

test('closing a menu after multiple authentication/business steps restores its home origin',()=>{
  const {run,view}=setup();
  run("v48BeginMenu('입출금이 안 돼요');s1state.page='v48auth';s1state.history.push({page:'home'});v48Flow={step:'password'};s1state.page='iodcheck';s1state.title='계좌 조회';");
  assert.equal(run('v48MenuContext.title'),'입출금이 안 돼요');
  run('v48CloseMenu()');
  assert.equal(run('s1state.page'),'home');
  assert.equal(run('s1state.v48HomeExpanded'),1);
  assert.equal(run('s1state.history.length'),0);
  assert.equal(run('v48Flow'),null);
  assert.equal(view.scrollTop,185);
});

test('a menu selected from a category closes to the category, which can then close to home',()=>{
  const {run}=setup();
  run("v48BeginMenu('인증');s1state.page='v48category';s1state.v48Category=1;v48BeginMenu('계좌정보 조회 및 변경');s1state.page='v48auth';v48CloseMenu();");
  assert.equal(run('s1state.page'),'v48category');
  assert.equal(run('s1state.v48Category'),1);
  assert.equal(run('v48MenuContext.title'),'인증');
  run('v48CloseMenu()');
  assert.equal(run('s1state.page'),'home');
});

test('close restores a search result and an open full-menu drawer',()=>{
  const {run,setDrawer,getDrawer}=setup();
  run("s1state.page='v48search';v48SearchText='계좌';v48SearchSubmitted=true;");
  const scroller={scrollTop:240};
  setDrawer({classList:{contains:()=>true},querySelector:()=>scroller});
  run("v48BeginMenu('서류신청');s1state.page='v47untact';v48SearchText='';v48CloseMenu();");
  assert.equal(run('s1state.page'),'v48search');
  assert.equal(run('v48SearchText'),'계좌');
  assert.equal(run('v48SearchSubmitted'),true);
  assert.ok(getDrawer());
  assert.equal(getDrawer().querySelector('.menu-scroll').scrollTop,240);
});

test('going back to the source clears its completed context; previous versions are untouched',()=>{
  const {run}=setup();
  run("v48BeginMenu('계좌정보');s1state.page='v48auth';s1state.page='home';v48ReconcileMenuContext();");
  assert.equal(run('v48MenuContext'),null);
  const old=setup('v471');
  old.run("v48BeginMenu('계좌정보');v48CloseMenu();");
  assert.equal(old.run('v48MenuContext'),null);
  assert.equal(old.run('s1state.page'),'home');
});
