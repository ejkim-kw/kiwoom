const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

function setup(){
  const saved=new Map();
  const context=vm.createContext({
    I:new Proxy({},{get:(_,key)=>`<svg data-icon="${key}"></svg>`}),
    isV48:()=>true,
    v47Esc:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
    localStorage:{getItem:key=>saved.get(key)||null,setItem:(key,value)=>saved.set(key,value)},
    runV47Search(){throw new Error('Deleting a badge must not run a search');}
  });
  for(const file of ['v48-home.js','v48-search.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
  return {context,saved,run:code=>vm.runInContext(code,context)};
}

test('search shows at most five keywords, viewed menus and popular badges without truncating home history',()=>{
  const {run}=setup();
  run("v48SearchHistory=['하나','둘','셋','넷','다섯','여섯'];v48RecentMenus=Array.from({length:6},(_,i)=>({title:'메뉴'+i,action:'v48:item:'+i}));");
  const html=run('renderV48Search()');
  assert.equal((html.match(/data-v48-keyword=/g)||[]).length,5);
  assert.equal((html.match(/data-v48-delete-keyword=/g)||[]).length,5);
  assert.equal((html.match(/data-v47recent /g)||[]).length,5);
  const popular=html.split('class="v48-search-popular v48-menu-popular"')[1].split('</section>')[0];
  assert.equal((popular.match(/data-v47searchgo=/g)||[]).length,5);
  assert.ok(html.indexOf('data-v48-history')<html.indexOf('v48-search-recent'));
  assert.ok(html.includes(run('V48_RECENT_STAR')));
  assert.equal(run('v48RecentMenus.length'),6);
});

test('deleting one keyword persists only that removal and preserves viewed menu history',()=>{
  const {context,run,saved}=setup();
  run("v48SearchHistory=['계좌','공모주','한도'];");
  const menus=run('JSON.stringify(v48RecentMenus)');
  let focused=false;
  const history={innerHTML:''};
  const root={querySelector:sel=>sel==='[data-v48-history]'?history:{focus:()=>{focused=true;}},querySelectorAll:()=>[]};
  const button={dataset:{v48DeleteKeyword:'공모주'},closest:()=>root};
  context.target={closest:sel=>sel==='[data-v48-delete-keyword]'?button:null};
  assert.equal(run('handleV48SearchClick(target)'),true);
  assert.deepEqual(JSON.parse(saved.get('kiwoom.v48.recent-searches')),['계좌','한도']);
  assert.equal(run('JSON.stringify(v48RecentMenus)'),menus);
  assert.doesNotMatch(history.innerHTML,/공모주/);
  assert.equal(focused,true);
});

test('keyword badges escape text and keep delete controls separate from search buttons',()=>{
  const {run}=setup();
  run(`v48SearchHistory=['<img src=x>"'];`);
  const html=run('v48RecentSearches()');
  assert.doesNotMatch(html,/<img/);
  assert.match(html,/&lt;img src=x&gt;&quot;/);
  assert.match(html,/<\/button><button[^>]*data-v48-delete-keyword=/);
});
