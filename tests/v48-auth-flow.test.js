const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const os=require('node:os');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(5000);
  const url=pathToFileURL(path.resolve('index.html')).href+'?v=v48';
  const click=selector=>page.locator(selector).click();
  const demo=async kind=>{
    await page.locator('[data-v48-demo-customer]').evaluate((el,value)=>{el.value=value;el.dispatchEvent(new Event('change',{bubbles:true}));},kind);
  };
  const enter=async()=>{await click('.v48-home [data-v48cat="1"]');await click('[data-v48item="1-1"]');};
  const phone=async()=>{
    for(const id of ['v48Name','v48Dob','v48Gender','v48Phone']){
      assert.equal(await page.locator('#'+id).isVisible(),true);
      assert.equal(await page.locator('#'+id).isEnabled(),true);
    }
    await page.locator('#v48Name').fill('홍길동');await page.locator('#v48Dob').fill('900101');
    assert.equal(await page.locator('label[for="v48Name"]').innerText(),'이름');
    await page.locator('#v48Gender').fill('1');await click('[data-v48-carrier-open]');await click('[data-v48-carrier-option="skt"]');
    await page.locator('#v48Phone').fill('01012345678');await click('[data-v48-consent-open]');
    await click('[data-v48-phone-sheet-close]');assert.equal(await page.locator('#v48PhoneConsent').isChecked(),false);
    await click('[data-v48-consent-open]');await click('[data-v48-consent-confirm]');
    await click('[data-v48-phone-form] [type="submit"]');await page.locator('#v48Otp').fill('123456');
    await click('[data-v48-otp-form] [type="submit"]');
  };
  const password=async()=>{await page.locator('#v48Password').fill('1234');await click('[data-v48-password-form] [type="submit"]');};
  try{
    await page.goto(url);await demo('unregistered');await enter();
    assert.equal(await page.locator('#v48AuthTaskTitle').innerText(),'계좌정보 조회 및 변경');
    assert.equal(await page.locator('#v48Phone').inputValue(),'010-1234-5678');
    assert.equal(await page.locator('[data-v48-phone-form] [type="submit"]').isDisabled(),true);
    await phone();assert.equal(await page.locator('[data-v48-account]').count(),3);
    await click('[data-v48-account="52575602"]');assert.equal(await page.locator('#v48QuickConsent').isChecked(),true);
    await page.locator('#v48Password').fill('1');await click('[data-v48-password-form] [type="submit"]');
    assert.match(await page.locator('#v48AuthError').innerText(),/4~8/);
    assert.equal(await page.evaluate(()=>localStorage.getItem('kiwoom.v48.demo.quicknumber')),null);
    await password();assert.equal(await page.getByText('계좌정보를 확인해 주세요',{exact:true}).isVisible(),true);
    await click('[data-v48-change-account]');assert.equal(await page.locator('#v48Name').count(),0);
    await click('[data-v48-account="63217654"]');assert.equal(await page.locator('#v48QuickConsent').count(),0);
    await password();assert.match(await page.locator('.v48-account-bar').innerText(),/63\*\*-\*\*54/);
    // Reload simulates the next digital ARS call: registration survives, verification does not.
    await page.reload();await enter();assert.equal(await page.locator('[data-v48-identity="yes"]').isVisible(),true);
    await click('[data-v48-identity="yes"]');assert.equal(await page.locator('#v48Name').count(),0);
    assert.match(await page.locator('.v48-selected-account').innerText(),/52\*\*-\*\*02/);await password();
    await click('[data-v48-change-account]');assert.equal(await page.locator('#v48Name').isVisible(),true);
    await phone();await click('[data-v48-account="63217654"]');
    await click('[data-v48-change-decision="yes"]');await click('[data-v48-change-channel="app"]');
    assert.match(await page.locator('#appPop').innerText(),/퀵넘버플러스 등록 계좌 변경/);
    await click('[data-appcancel]');await click('[data-v48-change-continue]');await password();
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('kiwoom.v48.demo.quicknumber')).accountId),'52575602');
    await click('[data-v48-change-account]');assert.equal(await page.locator('#v48Name').count(),0);
    await click('[data-v48-account="50430218"]');assert.equal(await page.locator('[data-v48-change-decision]').count(),0);await password();
    // Name mismatch always restarts phone verification without enrollment consent.
    await page.reload();await enter();await click('[data-v48-identity="no"]');await phone();
    await click('[data-v48-account="63217654"]');assert.equal(await page.locator('#v48QuickConsent').count(),0);await password();
    // Existing detail routing uses the authenticated account, without a second auth form.
    await page.evaluate(()=>startV47MyInfo('ID조회/PW초기화'));
    assert.equal(await page.locator('#v47MiNewIdPassword').isVisible(),true);
    await page.evaluate(()=>startV47Untact('서류신청'));await click('[data-v47u-document="잔고증명서"]');
    assert.equal(await page.locator('#v47UAccount').count(),0);
    // Crossing versions must not carry Ver 4.8 authentication into older versions.
    await page.locator('[data-sian="s1"][data-ver="v471"]').evaluate(el=>el.click());
    await page.evaluate(()=>startV47MyInfo('계좌정보 조회 및 변경'));
    assert.equal(await page.locator('#v47MiAccount').isVisible(),true);
    assert.equal(await page.locator('.v48-auth').count(),0);
    await page.locator('[data-sian="s1"][data-ver="v47"]').evaluate(el=>el.click());
    await page.evaluate(()=>startV47MyInfo('ID조회/PW초기화'));
    assert.equal(await page.locator('#v47MiName').isVisible(),true);
    // Same common screen also guards direct account-results and the FAQ legacy route.
    await page.goto(url);await demo('unregistered');
    await page.evaluate(()=>s1nav({page:'result',resultKey:'holdings',title:'계좌잔고·예수금'}));
    assert.equal(await page.locator('#v48Name').isVisible(),true);
    await phone();await click('[data-v48-account="52575602"]');await page.locator('#v48QuickConsent').uncheck();await password();
    assert.equal(await page.evaluate(()=>s1state.resultKey),'holdings');
    assert.equal(await page.evaluate(()=>localStorage.getItem('kiwoom.v48.demo.quicknumber')),null);
    await page.reload();await page.evaluate(()=>{s1state.authNext={go:'iodcheck'};s1nav({page:'authstep',authMethod:'account'});});
    assert.equal(await page.locator('#v48Name').isVisible(),true);
    // Small phone and enlarged text still keep native inputs inside the viewport.
    await page.setViewportSize({width:320,height:740});
    await page.evaluate(()=>{bigFont=true;rerender();});
    assert.equal(await page.locator('.v48-auth').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
    await page.evaluate(()=>{bigFont=false;rerender();});await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:path.join(os.tmpdir(),'v48-auth-mobile.png'),fullPage:true});
    await page.setViewportSize({width:820,height:1180});await page.screenshot({path:path.join(os.tmpdir(),'v48-auth-tablet.png'),fullPage:true});
    // The agent channel must reach the existing agent page, with the requested purpose.
    await demo('registered');await enter();await click('[data-v48-identity="yes"]');await password();
    await click('[data-v48-change-account]');await phone();await click('[data-v48-account="63217654"]');
    await click('[data-v48-change-decision="yes"]');await click('[data-v48-change-channel="agent"]');
    assert.equal(await page.evaluate(()=>s1state.page),'agent');
    assert.equal(await page.evaluate(()=>s1state.agentLabel),'퀵넘버플러스 등록 계좌 변경');
    await page.locator('[data-s1back]').first().click();
    await click('[data-v48-change-continue]');await password();
    await click('[data-v48-change-account]');await click('[data-v48-back]');
    assert.match(await page.locator('.v48-account-bar').innerText(),/63\*\*-\*\*54/);
    await page.evaluate(()=>{v48ResetSession();selectSian('s1','v48');});
    await enter();assert.equal(await page.locator('[data-v48-identity="yes"]').isVisible(),true);
    assert.deepEqual(errors,[]);
    console.log('PASS Ver 4.8 authentication branches, account switching, detail routing and older-version isolation');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
