const { chromium } = require('playwright');

const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.setDefaultTimeout(5000);
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('file:///C:/Users/User/Desktop/claude/%EB%94%94%EC%A7%80%ED%84%B8ARS/kiwoom-source/index.html?v=v47');

  expect(await page.locator('[data-sian="s1"][data-ver="v471"]').count() === 1, 'left panel should expose Ver 4.7.1');
  expect(await page.locator('.th-hi').isVisible(), 'restored Ver 4.7 should show the greeting title');
  expect(await page.locator('[data-v47search]').count() === 0, 'restored Ver 4.7 should not show search');
  expect(await page.locator('[data-v47trends]').count() === 0, 'restored Ver 4.7 should not show real-time keywords');
  expect(await page.locator('[data-v47recent-section]').count() === 0, 'restored Ver 4.7 should not show recent menus');
  expect(await page.getByText('혹시 이런 내용이 궁금하신가요?', { exact: true }).isVisible(), 'restored Ver 4.7 should show the original FAQ heading');
  expect(await page.locator('.v47-grid .v47-cell').count() === 9, 'restored Ver 4.7 should retain the nine-menu grid');

  await page.locator('[data-sian="s1"][data-ver="v471"]').evaluate(el => el.click());
  expect(await page.locator('.th-hi').isVisible(), 'Ver 4.7.1 should retain the current greeting title');
  expect(await page.getByText('지금 시간에 많이 검색 중', { exact: true }).isVisible(), 'Ver 4.7.1 should retain the current trending label');
  expect(await page.getByText('문의가 많은 업무', { exact: true }).isVisible(), 'Ver 4.7.1 should retain the current FAQ label');
  expect(await page.getByText('최근 이용한 메뉴', { exact: true }).isVisible(), 'Ver 4.7.1 should retain the current recent label');
  expect(await page.locator('[data-v47recent] small').count() === 3, 'Ver 4.7.1 should retain recent-menu descriptions');
  await page.locator('[data-v47search]').fill('비밀번호');
  await page.locator('[data-v47search]').press('Enter');
  await page.getByText('ID 비밀번호 재설정', { exact: true }).click();
  expect(await page.locator('#v47MiName').isVisible(), 'Ver 4.7.1 should retain the existing detail-page routing');
  expect(pageErrors.length === 0, `page errors: ${pageErrors.join(' | ')}`);

  await browser.close();
  console.log('v47 version split tests passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
