const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const os=require('node:os');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(5000);
  const url=pathToFileURL(path.resolve('index.html')).href;
  try{
    await page.goto(url+'?v=v48');
    assert.equal(await page.locator('#ssBannerTrack').count(),0);
    assert.equal(await page.locator('.v48-service-item').count(),9);
    assert.equal(await page.locator('.v48-all [data-v48cat]:visible').count(),9);
    assert.equal(await page.locator('.v48-all .v47-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),3);
    assert.equal(await page.locator('.v48-title').innerText(),'안녕하세요,\n쉽고 빠르게 검색해보세요');
    assert.ok((await page.locator('.v48-all').boundingBox()).y < (await page.locator('.v48-self-services').boundingBox()).y);
    assert.equal(await page.locator('.v48-home-search-placeholder').evaluate(el=>getComputedStyle(el).flexGrow),'1','search placeholder must fill the space before the right-aligned action');
    assert.equal(await page.locator('.v48-bottom-nav').count(),0,'Ver 4.8 home must not render the footer');
    assert.equal(await page.locator('.v48-recent-list').evaluate(el=>getComputedStyle(el).scrollbarWidth),'none','hide the scrollbar, not horizontal scrolling');
    const rows=await page.locator('.v48-service-item').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().top));
    assert.equal(rows.every((top,i)=>!i||top>rows[i-1]),true);
    assert.equal(await page.locator('.v48-recent-list').evaluate(el=>{
      const label=el.previousElementSibling.getBoundingClientRect(),list=el.getBoundingClientRect();
      const before=el.scrollLeft;el.scrollLeft=1000;
      return label.right<=list.left&&el.scrollLeft>before&&el.scrollWidth>el.clientWidth;
    }),true,'only badge group should scroll horizontally next to its fixed label');
    assert.equal(await page.locator('.v48-home').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
    // The header replaces the footer without losing access to the existing drawer.
    await page.locator('.v48-global-header [data-menu]').click();
    const drawer=page.locator('#menuDrawer.on');
    assert.equal(await drawer.locator('.v48-menu-group').count(),9);
    assert.equal(await drawer.locator('.v48-menu-link').count(),45);
    assert.equal(await drawer.locator('.v48-menu-chips button').count(),4);
    assert.equal(await drawer.locator('[data-v47search], [data-am1]').count(),0);
    await drawer.locator('[data-menuclose]').click();await page.locator('#menuDrawer').waitFor({state:'detached'});
    await page.getByRole('button',{name:'업무 검색 열기'}).click();
    assert.equal(await page.locator('.v48-search-page [data-v47search]').isVisible(),true);
    await page.getByRole('button',{name:'검색 닫기'}).click();
    assert.equal(await page.locator('.v48-home').isVisible(),true);
    // Categories remain visible without a disclosure step.
    assert.equal(await page.locator('.v48-all [data-v48cat]').first().isVisible(),true);
    await page.locator('.v48-all [data-v48cat="1"]').click();
    assert.equal(await page.locator('[data-v48item="1-1"]').isVisible(),true);
    assert.equal(await page.locator('.v48-bottom-nav').count(),0,'category pages must not render the footer');
    await page.locator('.v48-global-header [data-menu]').click();
    await page.locator('#menuDrawer.on').waitFor({state:'visible'});
    assert.equal(await page.locator('#menuDrawer.on').isVisible(),true);
    await page.locator('#menuDrawer [data-menuclose]').click();
    await page.goto(url+'?v=v48');await page.locator('.v48-service-item[data-iodstart]').click();
    assert.equal(await page.locator('#v48Name').isVisible(),true,'expanded service list should retain its auth destination');
    assert.equal(await page.locator('.v48-bottom-nav').count(),0,'authentication must not render the footer');
    await page.locator('.v48-global-header [data-menu]').click();
    await page.locator('#menuDrawer.on').waitFor({state:'visible'});
    assert.equal(await page.locator('#menuDrawer.on').isVisible(),true);
    for(const width of [320,390,820,1006]){
      await page.setViewportSize({width,height:892});await page.goto(url+'?v=v48');
      assert.equal(await page.locator('.v48-home').evaluate(el=>el.scrollWidth<=el.clientWidth),true,'home overflow at '+width+'px');
      if(width===390||width===1006)await page.screenshot({path:path.join(os.tmpdir(),'v48-home-'+width+'.png'),fullPage:true});
    }
    await page.setViewportSize({width:320,height:844});await page.locator('[data-bigfont]').click();
    assert.equal(await page.locator('.v48-home').evaluate(el=>el.scrollWidth<=el.clientWidth),true,'large text should not overflow');
    await page.locator('.v48-service-item[data-iodstart]').click();
    assert.equal(await page.locator('.v48-auth header>span:not(.v48-auth-progress)').evaluate(el=>getComputedStyle(el).whiteSpace),'nowrap','the added menu must not break the authentication title');
    assert.equal(await page.locator('.v48-auth').evaluate(el=>el.scrollWidth<=el.clientWidth),true,'large-text auth header should not overflow');
    // Earlier versions keep both the carousel and their original search behavior.
    await page.goto(url+'?v=v471');assert.equal(await page.locator('#ssBannerTrack').count(),1);
    await page.locator('[data-v47search]').fill('비밀번호');await page.locator('[data-v47search]').press('Enter');
    assert.match(await page.locator('[data-v47searchresults]').innerText(),/ID 비밀번호 재설정/);
    await page.locator('[data-v47search]').fill('');assert.equal(await page.locator('[data-v47searchresults]').isVisible(),false);
    await page.goto(url+'?v=v47');assert.equal(await page.locator('#ssBannerTrack').count(),1);
    assert.equal(await page.locator('[data-v47search]').count(),0);
    assert.deepEqual(errors,[]);
    console.log('PASS v4.8 reference header, workbook menus, section order, search entry and previous versions');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
