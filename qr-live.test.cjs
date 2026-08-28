const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {PNG} = require('pngjs');
const jsQR = require('jsqr');

test('우측 패널 QR은 kiwoom 배포 루트 주소를 담는다', () => {
  const file = path.join(__dirname, 'qr', 'kiwoom-qr-live.png');
  assert.ok(fs.existsSync(file));
  const png = PNG.sync.read(fs.readFileSync(file));
  const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  assert.ok(decoded);
  assert.equal(decoded.data, 'https://ejkim-kw.github.io/kiwoom/');

  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert.match(app, /kiwoom-qr-live\.png/);
});
