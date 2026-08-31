import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(5000);

async function expectRequiredAll(count, buttonText) {
  const notice = page.locator('#dform-phone .df-requirement.is-all');
  assert.equal(await notice.isVisible(), true);
  assert.match(await notice.innerText(), /필수 서류를 모두 첨부해야 접수할 수 있어요/);
  assert.match(await notice.innerText(), new RegExp(`${count} 첨부`));
  assert.equal((await page.locator('#dform-phone [data-dfsubmit]').innerText()).trim(), buttonText);
}

try {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'networkidle' });
  await page.locator('[data-sian="dform"]').click();
  await page.getByText('미성년자 업무처리 (대리인)', { exact: true }).last().click();
  await expectRequiredAll('0/2', '필수 서류를 모두 첨부해 주세요');

  await page.locator('#dform-phone [data-dfattach="0"]').click();
  await page.locator('#dform-phone [data-dfmethod="camera"]').click();
  await page.locator('#dform-phone [data-dfcomplete]').click();
  await expectRequiredAll('1/2', '필수 서류를 모두 첨부해 주세요');

  await page.locator('[data-demo-attach-documents]').click();
  await expectRequiredAll('2/2', '제출할게요');
  console.log('PASS: 필수 서류 전체 첨부 조건과 진행 수가 강조 표시됨');
} finally {
  await browser.close();
}
