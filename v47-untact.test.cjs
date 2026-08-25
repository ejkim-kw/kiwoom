const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const untact = require('./v47-untact.js');

test('VER4.7 비대면업무 5개 메뉴를 지원한다', () => {
  ['서류신청','계좌개설 이어하기','출금계좌등록','한도제한계좌해제','계좌폐쇄'].forEach(title => {
    assert.equal(untact.shouldHandle('v47', title), true);
    assert.ok(untact.createState(title));
  });
  assert.equal(untact.shouldHandle('v46', '서류신청'), false);
});

test('서류신청은 서류선택에서 계좌인증과 신청정보를 거쳐 완료된다', () => {
  let state = untact.createState('서류신청');
  assert.equal(state.step, 'document');
  let result = untact.transition(state,{type:'SELECT_DOCUMENT',value:'잔고증명서'});
  assert.equal(result.state.step,'accountAuth');
  result = untact.transition(result.state,{type:'ACCOUNT_AUTH',account:'52575602',password:'1234'});
  assert.equal(result.state.step,'form');
  result = untact.transition(result.state,{type:'SUBMIT_DOCUMENT',date:'2026-08-25',purpose:'금융기관 제출',copies:'1'});
  assert.equal(result.state.step,'complete');
  assert.equal(result.state.completed,true);
});

test('기간형 서류는 시작일과 종료일을 모두 요구한다', () => {
  let state = untact.createState('서류신청',{skipAuthentication:true});
  state = untact.transition(state,{type:'SELECT_DOCUMENT',value:'거래내역서'}).state;
  const failed = untact.transition(state,{type:'SUBMIT_DOCUMENT',startDate:'2026-08-01',endDate:'',purpose:'제출',copies:'1'});
  assert.equal(failed.field,'period');
  assert.match(failed.error,/조회기간/);
});

test('서류 신청내역은 별도 화면으로 열고 닫는다', () => {
  let state = untact.createState('서류신청');
  state = untact.transition(state,{type:'OPEN_HISTORY'}).state;
  assert.equal(state.step,'history');
  assert.equal(untact.DATA.documentHistory.length,4);
  state = untact.transition(state,{type:'CLOSE_HISTORY'}).state;
  assert.equal(state.step,'document');
});

test('상세 단계의 뒤로가기는 직전 단계로 이동한다', () => {
  let state=V47Untact.createState('서류신청');
  state=V47Untact.transition(state,{type:'SELECT_DOCUMENT',value:'잔고증명서'}).state;
  assert.equal(V47Untact.transition(state,{type:'BACK'}).state.step,'document');
});

test('계좌개설 이어하기는 휴대폰인증 후 URL 발송 완료로 진행한다', () => {
  let state = untact.createState('계좌개설 이어하기');
  state = untact.transition(state,{type:'PHONE_REQUEST',name:'홍길동',dob:'900101',phone:'01012345678',agreed:true}).state;
  assert.equal(state.step,'phoneOtp');
  state = untact.transition(state,{type:'PHONE_VERIFY',otp:'123456'}).state;
  assert.equal(state.step,'status');
  const result = untact.transition(state,{type:'CONTINUE_OPENING',id:'general'});
  assert.equal(result.state.step,'sent');
  assert.equal(result.state.completed,true);
});

test('이미 인증한 세션은 비대면 현황 메뉴의 휴대폰 인증을 생략한다', () => {
  ['계좌개설 이어하기','출금계좌등록','한도제한계좌해제','계좌폐쇄'].forEach(title => {
    assert.equal(untact.createState(title,{skipAuthentication:true}).step,'status');
  });
});

test('비대면업무 화면은 공통 stepper와 CTA 및 라우팅을 제공한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const index=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
  assert.match(app,/function startV47Untact\(/);
  assert.match(app,/function renderV47Untact\(/);
  assert.match(app,/data-v47u-document=/);
  assert.match(app,/data-v47u-opening=/);
  assert.match(app,/data-v47u-history/);
  assert.match(index,/v47-untact\.js\?v=/);
});
