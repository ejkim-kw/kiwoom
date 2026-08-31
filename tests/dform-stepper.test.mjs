import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(5000);

async function expectCurrentStep(label) {
  const stepper = page.locator('#dform-stepper');
  assert.equal(await stepper.isVisible(), true, `단계 표시가 보여야 함: ${label}`);
  const current = stepper.locator('[aria-current="step"]');
  assert.equal(await current.count(), 1, '현재 단계는 정확히 하나여야 함');
  assert.equal((await current.innerText()).replace(/^\d+\s*/, '').trim(), label);
}

try {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'networkidle' });
  await page.locator('[data-sian="dform"]').click();
  await expectCurrentStep('서류확인');
  console.log('PASS 1: 업무 목록 · 서류확인');

  await page.getByText('미성년자 업무처리 (대리인)', { exact: true }).last().click();
  await expectCurrentStep('서류확인');
  console.log('PASS 2: 서류 상세 · 서류확인');

  await page.locator('#dform-phone [data-dfattach="0"]').click();
  await expectCurrentStep('첨부');
  console.log('PASS 3: 첨부방식 · 첨부');

  await page.locator('#dform-phone [data-dfmethod="camera"]').click();
  await expectCurrentStep('첨부');
  console.log('PASS 4: 촬영화면 · 첨부');

  await page.locator('#dform-phone [data-dfcomplete]').click();
  await expectCurrentStep('서류확인');
  console.log('PASS 5: 첨부 후 상세 · 서류확인');

  await page.locator('[data-demo-attach-documents]').click();
  await page.locator('#dform-phone [data-dfsubmit]').evaluate((el) => el.click());
  await expectCurrentStep('접수완료');

  console.log('PASS: Digital Form 모든 화면에 현재 단계가 표시됨');
} finally {
  await browser.close();
}
