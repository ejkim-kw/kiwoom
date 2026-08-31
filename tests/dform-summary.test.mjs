import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.setDefaultTimeout(5000);

try {
  await page.goto('http://127.0.0.1:8766/', { waitUntil: 'networkidle' });

  const docs = await page.evaluate(() => Object.values(window.DigitalForm.TASKS).flatMap((task) => task.docs));
  assert.equal(docs.every((doc) => typeof doc.summary === 'string' && doc.summary.trim().length > 0), true, '모든 서류에 summary가 있어야 함');
  assert.equal(docs.every((doc) => doc.summary.length <= 32), true, 'summary는 32자 이하여야 함');
  assert.equal(docs.every((doc) => !/[요다]\.$/.test(doc.summary)), true, 'summary는 문장형 종결어미를 사용하지 않아야 함');

  const guardian = docs.find((doc) => doc.name === '법정대리인 신분증');
  assert.equal(guardian.summary, '신분증 원본 · 실물 촬영');
  assert.match(guardian.description, /스캔본·사본은 처리할 수 없어요/, '기존 상세 설명은 유지되어야 함');

  await page.locator('[data-sian="dform"]').click();
  await page.getByText('미성년자 업무처리 (대리인)', { exact: true }).last().click();
  const summaries = await page.locator('#dform-phone .df-attach-sub').allInnerTexts();
  assert.deepEqual(summaries, ['신분증 원본 · 실물 촬영', '미성년자 기준 · 최근 3개월 이내']);

  console.log('PASS: 서류확인 전용 요약과 기존 상세 설명이 함께 유지됨');
} finally {
  await browser.close();
}
