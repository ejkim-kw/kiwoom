const {test, before} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const cheerio = require('cheerio');
const {buildDemo} = require('../scripts/build-demo.cjs');
const root = path.resolve(__dirname, '..');
let output, $, files, original;
before(async () => {
  original = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  output = await buildDemo();
  $ = cheerio.load(await fs.readFile(path.join(output, 'index.html'), 'utf8'));
  files = await fs.readdir(output);
});
test('the original editor entry remains byte-for-byte unchanged', async () => {
  assert.equal(await fs.readFile(path.join(root, 'index.html'), 'utf8'), original);
});
test('presentation contains only Ver 4.8 and Digital Form, with no reference or right panel', () => {
  assert.equal($('body').attr('data-demo-only'), 'true');
  assert.equal($('head title').text(), '키움증권 디지털 ARS · Ver 4.8 / Digital Form');
  assert.equal($('head meta[charset]').attr('charset'), 'UTF-8');
  assert.equal($('head meta[name="viewport"]').length, 1);
  assert.equal($('head link[href*="pretendard"]').length, 1);
  assert.deepEqual($('#sianList > [data-sian]').toArray().map(el => [$(el).attr('data-sian'), $(el).attr('data-ver')]), [['s1','v48'], ['dform',undefined]]);
  assert.equal($('#schemeTabs, #refList, .prev-title, .prev-item, #scenePanel, .stage-spacer').length, 0);
  assert.equal($('.flow, .dars-deck').length, 2);
  assert.equal($('#v48DemoCustomer, [data-v48-demo-reconnect], [data-skipauth], [data-demo-autofill], [data-demo-attach-documents]').length, 5);
  assert.equal($('[data-demo-fill-account], [data-demo-fill-phone], .demo-tools .rf-tel').length, 0);
  assert.deepEqual($('.demo-tools > button .rf-nm').toArray().map(el=>$(el).text()), ['인증 초기화','본인인증 생략','자동입력','서류첨부']);
  assert.equal($('#dform-app').length, 1);
});
test('published package excludes development files and source maps', async () => {
  assert.deepEqual(files.filter(name => !['assets', 'index.html', 'licenses.txt', '.nojekyll', '.demo-build'].includes(name)).sort(), [
    ...files.filter(name => /^demo\.[a-f0-9]{12}\.min\.(js|css)$/.test(name))
  ].sort());
  assert.equal(files.filter(name => name.endsWith('.js')).length, 1);
  assert.equal(files.filter(name => name.endsWith('.css')).length, 1);
  const source = await fs.readFile(path.join(output, $('script').attr('src')), 'utf8');
  assert.ok(!source.includes('sourceMappingURL'));
  assert.ok(!source.includes('sourcesContent'));
  assert.ok(source.length < 800000);
});
test('all local resources referenced by the entry exist inside the demo package', async () => {
  for(const el of $('[src], link[href]').toArray()){
    const value = $(el).attr('src') || $(el).attr('href');
    if(/^https?:/.test(value)) continue;
    assert.ok(!value.startsWith('../'));
    assert.ok((await fs.stat(path.join(output, value))).isFile(), value);
  }
});
