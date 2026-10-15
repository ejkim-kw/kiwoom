// Generate an independent presentation package without rewriting the editor entry.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const cheerio = require('cheerio');
const esbuild = require('esbuild');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'demo');
const hash = value => crypto.createHash('sha256').update(value).digest('hex').slice(0, 12);
const mediaExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.woff2']);

async function buildDemo(){
  const original = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const $ = cheerio.load(original.replace(/^\uFEFF/, ''));
  const formScripts = $('script:not([src])').toArray().map(el => $(el).html()).filter(text => text.includes('window.__dformHome='));
  if(formScripts.length !== 1) throw new Error('Expected one current Digital Form controller.');
  const sources = $('script[src]').toArray().map(el => $(el).attr('src').split('?')[0]);
  const styles = $('link[rel="stylesheet"]').toArray().map(el => $(el).attr('href')).filter(href => !/^https?:/.test(href)).map(href => href.split('?')[0]);
  const scriptParts = [];
  for(const name of sources){
    if(path.basename(name)!==name) throw new Error('Unexpected application script: '+name);
    scriptParts.push(await fs.readFile(path.join(root, name), 'utf8'));
    if(name === 'digital-form.js') scriptParts.push(formScripts[0]);
  }
  scriptParts.push(await fs.readFile(path.join(__dirname, 'demo-shell.js'), 'utf8'));

  $('body').attr('data-demo-only', 'true');
  $('title').text('키움증권 디지털 ARS · Ver 4.8 / Digital Form');
  $('head').append('<meta name="robots" content="noindex, nofollow">');
  $('body').children().not('.deck-head, .stage').remove();
  $('.stage').children().not('.left-col, #mainStage, .dars-deck[data-scheme="dform"]').remove();
  $('#mainStage .flow').not('[data-scheme="s1"]').remove();
  $('#schemeTabs, #refList, #sianList .prev-title').remove();
  $('#sianList .ref-item').not('[data-ver="v48"], [data-sian="dform"]').remove();
  $('#sianList .func-title').remove();
  const tools = $('<details class="demo-tools" open><summary>시연 · 기능</summary></details>');
  const autofill=$('#sianList [data-demo-fill-account]').removeAttr('data-demo-fill-account').attr('data-demo-autofill','');
  autofill.find('.rf-nm').text('자동입력');
  $('#sianList [data-demo-fill-phone]').remove();
  const quick=$('#v48DemoControls').addClass('demo-quick-row');
  quick.find('label').text('퀵넘버플러스');
  const reset=quick.find('[data-v48-demo-reconnect]').addClass('func-item').html('<span class="rf-nm">인증 초기화</span>');
  tools.append(reset,$('#sianList [data-skipauth]'),autofill,$('#sianList [data-demo-attach-documents]'),quick);
  tools.find('.rf-tel').remove();
  $('#sianList').append(tools);
  $('#sianList .ref-item, #sianList .func-item').each((_, el) => {
    el.tagName = 'button';
    $(el).attr('type', 'button');
  });
  $('.left-col').attr('id', 'demoControlPanel').prepend('<div class="demo-panel-heading"><h2 id="demoControlTitle">시연 설정</h2><button type="button" data-demo-panel-close aria-label="시연 설정 닫기">×</button></div>').append('<div class="demo-panel-footer"><button type="button" data-demo-launcher-hide>+ 버튼 숨기기</button><p>새로고침하면 다시 표시돼요.</p></div>');
  $('body').append('<button type="button" class="demo-panel-backdrop" data-demo-panel-close tabindex="-1" aria-label="시연 설정 닫기" hidden></button><button type="button" class="demo-launcher" aria-label="시연 설정 열기" aria-controls="demoControlPanel" aria-expanded="false" aria-haspopup="dialog"><span aria-hidden="true">+</span></button>');
  $('script').remove();
  $('link[rel="stylesheet"]').filter((_, el) => !/^https?:/.test($(el).attr('href'))).remove();
  function removeComments(node){
    for(const child of [...(node.children || [])]){
      if(child.type === 'comment') $(child).remove();
      else removeComments(child);
    }
  }
  removeComments($.root()[0]);

  const cssParts = await Promise.all(styles.map(name => fs.readFile(path.join(root, name), 'utf8')));
  cssParts.push(await fs.readFile(path.join(__dirname, 'demo-shell.css'), 'utf8'));
  const [js, css] = await Promise.all([
    esbuild.transform(scriptParts.join('\n;\n'), {loader:'js', minify:true, sourcemap:false, legalComments:'external', charset:'utf8', target:'es2020'}),
    esbuild.transform(cssParts.join('\n'), {loader:'css', minify:true, sourcemap:false, legalComments:'external', charset:'utf8'})
  ]);
  const jsName = `demo.${hash(js.code)}.min.js`;
  const cssName = `demo.${hash(css.code)}.min.css`;
  $('head').append(`<link rel="stylesheet" href="${cssName}">`);
  $('body').append(`<script src="${jsName}"></script>`);

  // The generated directory is the only deletion target. Refuse unknown or linked directories.
  if(path.dirname(output)!==root || path.basename(output)!=='demo') throw new Error('Unsafe output path.');
  try {
    const stat = await fs.lstat(output);
    if(stat.isSymbolicLink() || !stat.isDirectory()) throw new Error('Output must be a real directory.');
    const entries = await fs.readdir(output);
    if(entries.length && !entries.includes('.demo-build')) throw new Error('Refusing to replace an unrecognized demo directory.');
    await fs.rm(output, {recursive:true});
  } catch(error){ if(error.code!=='ENOENT') throw error; }
  await fs.mkdir(path.join(output, 'assets'), {recursive:true});
  await fs.writeFile(path.join(output, '.demo-build'), 'Generated by scripts/build-demo.cjs\n');
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  for(const entry of await fs.readdir(path.join(root, 'assets'), {withFileTypes:true})){
    if(entry.isFile() && mediaExtensions.has(path.extname(entry.name).toLowerCase())){
      await fs.copyFile(path.join(root, 'assets', entry.name), path.join(output, 'assets', entry.name));
    }
  }
  await Promise.all([
    fs.writeFile(path.join(output, 'index.html'), $.html()),
    fs.writeFile(path.join(output, jsName), js.code),
    fs.writeFile(path.join(output, cssName), css.code),
    fs.writeFile(path.join(output, 'licenses.txt'), [js.legalComments, css.legalComments].filter(Boolean).join('\n'))
  ]);
  if(await fs.readFile(path.join(root, 'index.html'), 'utf8') !== original) throw new Error('Editor index.html was changed.');
  console.log(`Demo ready: ${path.join(output, 'index.html')}`);
  console.log(`JavaScript: ${Buffer.byteLength(scriptParts.join(''))} → ${Buffer.byteLength(js.code)} bytes; no source maps.`);
  return output;
}
if(require.main===module) buildDemo().catch(error => {console.error(error);process.exitCode=1;});
module.exports = {buildDemo};
