const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

let service;
try {
  service = require('./v47-self-service.js');
} catch (_) {
  service = null;
}

test('VER4.7 더보기에서 비대면 접수현황 조회 메뉴를 제공한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');
  const items = service.getSelfServiceItems('v47');

  assert.deepEqual(items.map(({ title, action }) => [title, action]), [
    ['입출금이 안돼요', 'iodstart'],
    ['서류 발급현황이 궁금해요', 'certstart'],
    ['ISA 가입서류를 내고 싶어요', 'isastart'],
    ['비밀번호를 모르겠어요', 'pwreset'],
    ['비대면 접수현황이 궁금해요', 'untactstatusstart'],
  ]);
});

test('신규 메뉴는 VER4.7에만 노출한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.equal(service.getSelfServiceItems('v45').length, 4);
  assert.equal(service.getSelfServiceItems('v46').length, 4);
  assert.equal(service.getSelfServiceItems('v47').length, 5);
});

test('서류 발급 조회 결과는 요청한 네 가지 카드명을 사용한다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.deepEqual(service.CERTIFICATE_STATUS.map(item => item.name), [
    '잔고증명서',
    '거래내역서',
    '금융소득내역서',
    '제신고신청',
  ]);
});

test('비대면 접수현황 결과는 네 가지 신청 업무를 보여준다', () => {
  assert.ok(service, 'VER4.7 셀프서비스 구성이 필요합니다');

  assert.deepEqual(service.UNTACT_STATUS.map(item => item.name), [
    '계좌개설',
    '출금계좌등록',
    '한도제한계좌해제',
    '계좌폐쇄',
  ]);
  assert.ok(service.UNTACT_STATUS.every(item => item.status && item.description));
});

test('VER4.7 셀프서비스는 내정보와 동일한 현재 단계 stepper 모델을 제공한다', () => {
  assert.deepEqual(service.getStepperModel('v47', '비대면 접수현황', ['계좌 인증','접수현황 조회','결과 안내'], 1), {
    accessibleTitle:'비대면 접수현황',
    labels:['계좌 인증','접수현황 조회','결과 안내'],
    current:1,
    states:['done','current','upcoming'],
  });
  assert.equal(service.getStepperModel('v46', '비대면 접수현황', ['계좌 인증','접수현황 조회','결과 안내'], 1), null);
});

test('VER4.7 셀프서비스 stepper는 범위를 벗어난 현재 단계를 안전하게 보정한다', () => {
  const model = service.getStepperModel('v47', '서류 발급현황', ['계좌 인증','발급현황 조회','재발급'], 9);
  assert.equal(model.current, 2);
  assert.deepEqual(model.states, ['done','done','current']);
});

test('VER4.7 서류 발급현황은 카드 대신 새로고침 버튼으로 결과를 전환한다', () => {
  assert.deepEqual(service.getCertificateResultInteraction('v47'), {
    cardToggles:false,
    refreshToggles:true,
    refreshLabel:'다른 결과 보기',
  });
});

test('이전 버전의 서류 발급현황 카드 전환 방식은 유지한다', () => {
  assert.deepEqual(service.getCertificateResultInteraction('v46'), {
    cardToggles:true,
    refreshToggles:false,
    refreshLabel:'다른 결과 보기',
  });
});

test('VER4.7 비밀번호 재설정은 전체화면 선택 모델을 제공한다', () => {
  assert.deepEqual(service.getPasswordResetChoiceModel('v47'), {
    title:'어떤 비밀번호를 재설정할까요?',
    description:'재설정할 비밀번호를 선택해 주세요.',
    stepLabel:'비밀번호 선택',
    options:[
      { kind:'pwreset0', name:'ID 비밀번호', description:'로그인에 쓰는 영문과 숫자를 조합한 5~8자리 비밀번호예요.' },
      { kind:'pwreset1', name:'증권계좌 비밀번호', description:'증권계좌에 쓰는 숫자 4~8자리 비밀번호예요.' },
      { kind:'pwreset2', name:'공동인증서 비밀번호', description:'영문·숫자·특수문자를 모두 포함한 10자리 이상 비밀번호예요.' },
    ],
  });
  assert.equal(service.getPasswordResetChoiceModel('v46'), null);
});

test('VER4.7 ID 비밀번호 재설정은 공통 3단계 stepper 모델을 사용한다', () => {
  assert.deepEqual(service.getIdPasswordResetStepper('v47', 1), {
    accessibleTitle:'ID 비밀번호 재설정',
    labels:['본인 인증','계좌 인증','비밀번호 재설정'],
    current:1,
    states:['done','current','upcoming'],
  });
  assert.equal(service.getIdPasswordResetStepper('v46', 1), null);
});

test('VER4.7 증권계좌와 공동인증서 비밀번호 안내를 결과페이지 모델로 제공한다', () => {
  assert.deepEqual(service.getPasswordResetGuideModel('v47', 'account'), {
    title:'증권계좌 비밀번호',
    rule:'숫자 4~8자리',
    description:'비밀번호가 기억나지 않으면 영웅문S#에서 다시 설정할 수 있어요.',
    appKey:'pwresetacct',
  });
  assert.deepEqual(service.getPasswordResetGuideModel('v47', 'certificate'), {
    title:'공동인증서 비밀번호',
    rule:'영문·숫자·특수문자를 모두 포함한 10자리 이상',
    description:'비밀번호가 기억나지 않으면 영웅문S#에서 다시 설정할 수 있어요.',
    appKey:'pwresetcert',
  });
  assert.equal(service.getPasswordResetGuideModel('v46', 'account'), null);
  assert.equal(service.getPasswordResetGuideModel('v47', 'unknown'), null);
});

test('VER4.7 셀프서비스 더보기는 비밀번호 선택과 동일한 카드형 목록을 사용한다', () => {
  assert.deepEqual(service.getSelfServiceListPresentation('v47'), {
    layout:'choice-cards',
    interactiveElement:'button',
  });
  assert.deepEqual(service.getSelfServiceListPresentation('v46'), {
    layout:'legacy-rows',
    interactiveElement:'div',
  });
});

test('VER4.7 대메뉴의 중메뉴도 동일한 카드형 목록을 사용한다', () => {
  assert.deepEqual(service.getSubMenuListPresentation('v47'), {
    layout:'choice-cards',
    interactiveElement:'button',
    density:'compact',
  });
  assert.equal(service.getSubMenuListPresentation('v46'), null);
});

test('VER4.7 전체 중메뉴 44개에 간결한 행동형 설명을 제공한다', () => {
  assert.equal(Object.keys(service.SUBMENU_DESCRIPTIONS).length, 44);
  assert.ok(Object.values(service.SUBMENU_DESCRIPTIONS).every(text => text.length > 0 && text.endsWith('해요')));
  assert.equal(service.getSubMenuDescription('v47', '계좌정보 조회 및 변경'), '등록된 계좌 정보를 확인하고 변경해요');
  assert.equal(service.getSubMenuDescription('v47', '체결조회'), '주문 체결 여부와 내역을 확인해요');
  assert.equal(service.getSubMenuDescription('v46', '체결조회'), '');
});

test('VER4.7 서류 발급현황 빈 결과의 서류신청 버튼은 비대면업무 서류신청으로 이동한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  assert.match(app, /data-certapply>\$\{isV47\(\)\?'서류신청':'서류 발급·신청'\}<\/div>/);
  assert.match(app, /if\(isV47\(\)\)\{ startV47Untact\('서류신청'\); return; \}/);
});

test('VER4.7 영웅문S# 연결안내는 전용 팝업 구조와 디자인을 사용한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');
  assert.match(app, /el\.className = 'app-pop-ov' \+ \(isV47\(\) \? ' v47'/);
  assert.match(app, /v47 \? `<div class="ap-logo"><img src="\$\{logoSrc\}"/);
  assert.match(app, /v47 \? '영웅문S#으로 이동할까요\?'/);
  assert.match(app, /\(v40 && !v47\) \? '' : `<div class="ap-flow"/);
  assert.match(app, /v47 \? `안전하게 연결한 뒤/);
  assert.match(app, /role="dialog" aria-modal="true"/);
  assert.match(css, /\.app-pop-ov\.v47\{/);
  assert.match(css, /\.app-pop-ov\.v47 \.ap-btn\{height:46px;border-radius:999px/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
});

test('VER4.7 상담방법 선택은 전용 접근성 바텀시트와 공통 버튼 규격을 사용한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');
  assert.match(app, /el\.className = 'consult-ov' \+ \(isV47\(\)\?' v47':''\)/);
  assert.match(app, /role="dialog" aria-modal="true" aria-labelledby="consultTitle"/);
  assert.match(app, /isV47\(\)\?'상담 방법을 선택해 주세요':'어떻게 도와드릴까요\?'/);
  assert.match(app, /<button type="button" class="cs-row/);
  assert.match(app, /<button type="button" class="cs-cancel" data-csclose>닫기<\/button>/);
  assert.match(css, /\.consult-ov\.v47\{/);
  assert.match(css, /\.consult-ov\.v47 \.consult-sheet\{[^}]*border-radius:24px 24px 0 0[^}]*padding:[^;]*20px/);
  assert.match(css, /\.consult-ov\.v47 \.cs-cancel\{height:46px;border-radius:999px/);
});

test('VER4.7 상담방법의 챗봇·음성ARS·상담원 아이콘은 하단 플로팅 메뉴 아이콘을 재사용한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  assert.match(app, /const V47_CONSULT_ICON = \{chat:I\.chat, voice:I\.phone, call:I\.headset\}/);
  assert.match(app, /const channelIcon = isV47\(\) && V47_CONSULT_ICON\[c\.k\] \? V47_CONSULT_ICON\[c\.k\] : c\.ic/);
  assert.match(app, /<div class="cs-ic">\$\{channelIcon\}<\/div>/);
});

test('VER4.7 모든 계좌인증 화면은 공통 계좌번호·비밀번호 타이포그래피 계약을 사용한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');
  for(const id of ['acctNo','acctPwDisp','v47MiAccount','v47MiAccountPwDisp','v47UAccount','v47UAccountPwDisp','v47MiFlowAccountPassword','idpwAcctPw']){
    assert.match(app, new RegExp(`id="${id}"[^>]*class="[^"]*v47-account-credential|class="[^"]*v47-account-credential[^"]*"[^>]*id="${id}"`), `${id}에 공통 인증값 클래스가 필요합니다.`);
  }
  assert.match(css, /\.flow\.toss\.v47 \.v47-account-credential\{font-family:inherit!important;font-size:calc\(14px\*var\(--scale\)\)!important;font-weight:500!important/);
  assert.match(css, /\.flow\.toss\.v47 \.v47-account-credential\.acct-dots\{letter-spacing:/);
});

test('VER4.7 상세 휴대폰인증은 공통 동의 디자인과 인증요청 활성화 계약을 사용한다', () => {
  const app=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
  const css=fs.readFileSync(path.join(__dirname,'style.css'),'utf8');
  assert.match(app, /const V47_PHONE_AUTH = \[/);
  assert.match(app, /function syncV47PhoneAuthButtons\(\)/);
  assert.match(app, /V47MyInfo\.isPhoneRequestReady\(/);
  assert.match(app, /class="find-agree v47-phone-consent/);
  assert.match(app, /data-v47mi-phone-request[^>]*aria-disabled="true"/);
  assert.match(app, /data-v47u-phone-request[^>]*aria-disabled="true"/);
  assert.match(app, /data-idpwreq[^>]*aria-disabled="true"/);
  assert.match(css, /\.flow\.toss\.v47 \.v47-phone-consent\{/);
});

test('VER4.7 인증번호 단계는 공통 인증완료 버튼 활성화 계약을 사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  assert.match(app, /const V47_PHONE_OTP = \[/);
  assert.match(app, /function syncV47PhoneOtpButtons\(\)/);
  assert.match(app, /V47MyInfo\.isPhoneOtpReady\(/);
  assert.match(app, /data-v47mi-phone-verify[^>]*aria-disabled="true"/);
  assert.match(app, /data-v47u-phone-verify[^>]*aria-disabled="true"/);
  assert.match(app, /data-idpwotpdone[^>]*aria-disabled="true"/);
});

test('Ver 4.6은 현재 시안이 아닌 이전버전 접이식 목록에 배치한다', () => {
  const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  assert.match(index, /class="ref-item prev-item" data-sian="s1" data-ver="v46"/);
  const previousTitle = index.indexOf('class="ref-title prev-title"');
  const v46 = index.indexOf('data-ver="v46"');
  assert.ok(v46 > previousTitle);
});

test('VER4.7 모든 주요 화면 컨테이너는 좌우 20px 인셋 토큰을 사용한다', () => {
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

  assert.match(css, /\.flow\.toss\.v47\{--v47-detail-inset:20px\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v47-hero\{padding:4px var\(--v47-detail-inset\) 8px\}/);
  assert.match(css, /\.flow\.toss\.v47 \.toss-stick \.toss-dhead\{padding-left:var\(--v47-detail-inset\);padding-right:var\(--v47-detail-inset\)\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v45ss-wrap\{[^}]*margin:0 var\(--v47-detail-inset\)/);
  assert.match(css, /\.flow\.toss\.v47 \.v45ss-txtlist\{[^}]*padding:4px var\(--v47-detail-inset\) 28px\}/);
  assert.match(css, /\.flow\.toss\.v47 \.toss-list\{[^}]*padding:4px var\(--v47-detail-inset\) 28px\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v47-grid\{padding-left:var\(--v47-detail-inset\);padding-right:var\(--v47-detail-inset\)\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v45-iodload-body\{padding-left:var\(--v47-detail-inset\);padding-right:var\(--v47-detail-inset\)\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v45-iodload-body \.toss-dhead\{padding-left:0;padding-right:0\}/);
  assert.match(css, /\.flow\.toss\.v47 \.iodresult-body\{padding-left:var\(--v47-detail-inset\);padding-right:var\(--v47-detail-inset\)\}/);
});

test('VER4.7 ISA 신청현황 새로고침은 뒤로가기 라인의 투명 아이콘 버튼을 사용한다', () => {
  const app = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

  assert.match(app, /const isaRefresh = isV47\(\)\s*\? `<button type="button" class="v47-header-refresh" data-isacycle/);
  assert.match(app, /\$\{v45AuthTop\(1, isaRefresh\)\}/);
  assert.match(css, /\.flow\.toss\.v47 \.v47-header-refresh\{[^}]*background:transparent/);
});
