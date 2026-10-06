const fs = require('fs');
const assert = require('assert');

const app = fs.readFileSync('app.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');

assert.match(
  app,
  /<input class="ir-input v47-account-credential" id="acctNo" type="tel"[^>]*inputmode="numeric"/,
  '계좌번호 입력은 모바일 숫자 키보드를 사용하는 tel 입력이어야 합니다.'
);
assert.match(
  css,
  /\.flow\.toss\.v45 \.auth-wrap \.auth-info \.ir-input\{[^}]*pointer-events:auto/,
  '계좌번호 입력이 터치 이벤트를 받을 수 있어야 합니다.'
);
assert.match(
  css,
  /\.flow\.toss\.v45 \.auth-wrap \.auth-info \.ir-pw\{[^}]*pointer-events:auto/,
  '비밀번호 입력 영역이 터치 이벤트를 받을 수 있어야 합니다.'
);

console.log('mobile auth input contract passed');
