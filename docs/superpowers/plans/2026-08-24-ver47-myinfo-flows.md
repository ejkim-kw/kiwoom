# VER4.7 내정보 상세 흐름 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** VER4.7 `내정보`의 다섯 중메뉴를 인증, 조회, 처리, 완료까지 동작하는 상세 흐름으로 구현한다.

**Architecture:** `v47-myinfo.js`가 업무 설정, 샘플 데이터, 단계 전이와 입력 검증을 담당하는 순수 모듈이 되고, 기존 `app.js`는 이 모듈의 상태를 VER4.7 화면으로 렌더링하고 이벤트를 전달한다. 휴대폰 인증, ID·계좌 선택, 계좌비밀번호 확인, 완료 화면을 공통 렌더러로 구성해 업무별 중복을 없애며 `isV47()` 게이트로 이전 버전을 보호한다.

**Tech Stack:** Vanilla JavaScript, HTML/CSS, Node.js built-in test runner (`node:test`), 기존 단일 페이지 목업 라우터

**Spec:** `docs/superpowers/specs/2026-08-24-ver47-myinfo-flows-design.md`

## Global Constraints

- VER4.7에만 적용한다.
- VER4.6 이하의 메뉴 라우팅과 기존 인증·자가해결 흐름은 변경하지 않는다.
- 샘플 고객·계좌·ID 데이터만 사용하는 인터랙티브 목업으로 구현한다.
- `계좌정보 조회 및 변경`은 조회 전용이며 화면 내 직접 수정 기능은 제공하지 않는다.
- 모든 선택 카드와 버튼의 터치 영역을 44px 이상 유지한다.
- 선택 상태는 색뿐 아니라 체크 표시와 텍스트로 함께 표현한다.
- 완료 화면의 `확인`은 VER4.7 홈으로 이동한다.

## File Structure

- Create `v47-myinfo.js`: VER4.7 내정보 업무 설정, 샘플 데이터, 상태 생성, 단계 전이, 입력 검증을 제공하는 UMD 순수 모듈.
- Create `v47-myinfo.test.cjs`: 순수 모듈의 버전 게이트, 업무별 단계, 검증, 완료 상태 테스트.
- Modify `index.html`: `v47-myinfo.js`를 `app.js`보다 먼저 로드.
- Modify `app.js`: VER4.7 중메뉴 라우팅, 공통 화면 렌더러, 클릭·입력 이벤트 연결.
- Modify `style.css`: 내정보 전용 선택 카드, 읽기 전용 정보 목록, 이중 하단 버튼, 완료 화면의 VER4.7 스타일.

---

### Task 1: VER4.7 내정보 도메인 모델과 버전 게이트

**Files:**
- Create: `v47-myinfo.js`
- Create: `v47-myinfo.test.cjs`
- Modify: `index.html:1726`

**Interfaces:**
- Produces: `V47MyInfo.MENU_KEYS: Record<string, string>`
- Produces: `V47MyInfo.createState(menuTitle: string): MyInfoState | null`
- Produces: `V47MyInfo.transition(state: MyInfoState, event: MyInfoEvent): TransitionResult`
- Produces: `V47MyInfo.DATA` containing `accounts`, `ids`, and `accountProfile`
- `MyInfoState`: `{ flow, step, phoneVerified, selectedId, selectedAccount, completed, errors }`
- `TransitionResult`: `{ state, error: string }`

- [ ] **Step 1: Write the failing version and configuration tests**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const myInfo = require('./v47-myinfo.js');

test('maps all five VER4.7 내정보 menu labels', () => {
  assert.deepEqual(Object.keys(myInfo.MENU_KEYS), [
    '계좌정보 조회 및 변경', '증권계좌번호확인', '계좌비밀번호 재설정',
    'ID조회/PW초기화', '장기미사용ID 제한 해지'
  ]);
});

test('creates an isolated initial state for each supported menu', () => {
  const state = myInfo.createState('ID조회/PW초기화');
  assert.deepEqual(state, {
    flow:'idPassword', step:'phone', phoneVerified:false,
    selectedId:'', selectedAccount:'', completed:false, errors:{}
  });
  assert.equal(myInfo.createState('알 수 없는 메뉴'), null);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test v47-myinfo.test.cjs`

Expected: FAIL because `v47-myinfo.js` does not exist.

- [ ] **Step 3: Implement the UMD module and immutable state factory**

```js
(function(root, factory){
  const api = factory();
  if(typeof module === 'object' && module.exports) module.exports = api;
  root.V47MyInfo = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function(){
  const MENU_KEYS = {
    '계좌정보 조회 및 변경':'accountProfile',
    '증권계좌번호확인':'accountNumbers',
    '계좌비밀번호 재설정':'accountPasswordGuide',
    'ID조회/PW초기화':'idPassword',
    '장기미사용ID 제한 해지':'dormantRelease'
  };
  const DATA = {
    accounts:[
      {id:'52575602', type:'위탁종합', display:'5257-5602'},
      {id:'63217654', type:'중개형 ISA', display:'6321-7654'},
      {id:'50430218', type:'연금저축', display:'5043-0218'}
    ],
    ids:[
      {id:'kiwoom0728', accounts:['52575602','63217654'], dormant:false},
      {id:'hero2024', accounts:['50430218'], dormant:true}
    ],
    accountProfile:{
      address:'서울특별시 영등포구 여의나루로 **', phone:'010-****-7980',
      marketing:'알림톡 · 이메일', occupation:'회사원', residence:'대한민국'
    }
  };
  function createState(menuTitle){
    const flow = MENU_KEYS[menuTitle];
    return flow ? {flow, step:flow==='accountPasswordGuide'?'guide':(flow==='accountProfile'?'accountAuth':'phone'), phoneVerified:false, selectedId:'', selectedAccount:'', completed:false, errors:{}} : null;
  }
  return {MENU_KEYS, DATA, createState};
});
```

- [ ] **Step 4: Load the module before `app.js`**

```html
<script src="v47-self-service.js?v=20260824a"></script>
<script src="v47-myinfo.js?v=20260824a"></script>
<script src="app.js?v=20260824b"></script>
```

- [ ] **Step 5: Run tests and syntax checks**

Run: `node --test v47-myinfo.test.cjs && node --check v47-myinfo.js && node --check app.js`

Expected: all tests PASS and both syntax checks exit 0.

- [ ] **Step 6: Commit**

```bash
git add v47-myinfo.js v47-myinfo.test.cjs index.html
git commit -m "feat: add ver4.7 myinfo flow model"
```

---

### Task 2: 공통 인증·선택 단계와 상태 검증

**Files:**
- Modify: `v47-myinfo.js`
- Modify: `v47-myinfo.test.cjs`
- Modify: `app.js:2357-2366, 2709, 5397-5402, 6537-6543`
- Modify: `style.css:3701-3741`

**Interfaces:**
- Consumes: `V47MyInfo.createState`, `V47MyInfo.DATA`
- Produces: `V47MyInfo.transition(state, event)` supporting `PHONE_REQUEST`, `PHONE_VERIFY`, `SELECT_ID`, `SELECT_ACCOUNT`, `ACCOUNT_PASSWORD`, `NEW_ID_PASSWORD`, `COMPLETE`
- Produces: `startV47MyInfo(menuTitle)`, `renderV47MyInfo()`, `renderV47MyInfoPhone()`, `renderV47MyInfoSelection()` in `app.js`

- [ ] **Step 1: Add failing transition validation tests**

```js
test('phone verification cannot advance without six digits', () => {
  const state = myInfo.createState('증권계좌번호확인');
  const result = myInfo.transition({...state, step:'phoneOtp'}, {type:'PHONE_VERIFY', otp:'123'});
  assert.equal(result.state.step, 'phoneOtp');
  assert.equal(result.error, '인증번호 6자리를 입력해 주세요.');
});

test('ID password flow requires an ID and linked account', () => {
  let state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', phoneVerified:true};
  let result = myInfo.transition(state, {type:'CONTINUE'});
  assert.equal(result.error, '재설정할 ID와 계좌를 선택해 주세요.');
  state = {...state, selectedId:'kiwoom0728', selectedAccount:'52575602'};
  result = myInfo.transition(state, {type:'CONTINUE'});
  assert.equal(result.state.step, 'accountPassword');
});

test('an account must belong to the selected ID', () => {
  const state = {...myInfo.createState('ID조회/PW초기화'), step:'selection', selectedId:'hero2024'};
  const result = myInfo.transition(state, {type:'SELECT_ACCOUNT', value:'52575602'});
  assert.equal(result.error, '선택한 ID에 연결된 계좌를 선택해 주세요.');
});
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --test --test-name-pattern="phone verification|requires an ID|must belong" v47-myinfo.test.cjs`

Expected: FAIL because `transition` is undefined.

- [ ] **Step 3: Implement pure transition validation**

```js
function transition(state, event){
  const next = {...state, errors:{}};
  if(event.type==='PHONE_REQUEST') return {state:{...next, step:'phoneOtp'}, error:''};
  if(event.type==='PHONE_VERIFY'){
    if(!/^\d{6}$/.test(event.otp||'')) return {state, error:'인증번호 6자리를 입력해 주세요.'};
    const step = state.flow==='accountNumbers' ? 'accountList' : 'selection';
    return {state:{...next, phoneVerified:true, step}, error:''};
  }
  if(event.type==='SELECT_ID') return {state:{...next, selectedId:event.value, selectedAccount:''}, error:''};
  if(event.type==='SELECT_ACCOUNT'){
    const owner = DATA.ids.find(x=>x.id===state.selectedId);
    if(owner && !owner.accounts.includes(event.value)) return {state, error:'선택한 ID에 연결된 계좌를 선택해 주세요.'};
    return {state:{...next, selectedAccount:event.value}, error:''};
  }
  if(event.type==='CONTINUE'){
    if(!state.selectedId || !state.selectedAccount) return {state, error:'재설정할 ID와 계좌를 선택해 주세요.'};
    return {state:{...next, step:'accountPassword'}, error:''};
  }
  return {state, error:''};
}
```

- [ ] **Step 4: Route only VER4.7 menu clicks into the common flow**

```js
function startV47MyInfo(menuTitle){
  const state = V47MyInfo.createState(menuTitle);
  if(!state) return false;
  s1state.v47MyInfo = state;
  s1nav({page:'v47myinfo', title:menuTitle, noHome:true});
  return true;
}

const v47s = t.closest('[data-v47sub]');
if(v47s){
  if(isV47() && startV47MyInfo(v47s.dataset.v47sub)) return;
  flash(`'${v47s.dataset.v47sub}' · 이후 절차 정의 예정`);
  return;
}
```

- [ ] **Step 5: Add shared phone and selection renderers**

```js
function renderV47MyInfoPhone(state){
  const otp = state.step==='phoneOtp';
  return `<div class="v45-authpage">${v47MyInfoTop(state)}<div class="iod-v45-body">
    <div class="toss-dhead"><div class="td-title">휴대폰으로 본인인증해요</div><div class="td-desc">본인 명의 휴대폰 정보를 입력해 주세요.</div></div>
    ${otp ? `<div class="auth-info"><div class="ir"><span class="k">인증번호</span><input id="v47MyInfoOtp" class="ir-input" inputmode="numeric" maxlength="6"></div></div><div class="primary-btn v45-iod-btn" data-v47mi-phone-verify>인증완료</div>` : `<div class="auth-info"><div class="ir"><span class="k">고객명</span><input id="v47MiName" class="ir-input"></div><div class="ir"><span class="k">생년월일</span><input id="v47MiDob" class="ir-input" inputmode="numeric" maxlength="6"></div><div class="ir"><span class="k">휴대폰</span><input id="v47MiPhone" class="ir-input" inputmode="numeric" maxlength="11"></div></div><div class="find-agree" data-v47mi-agree><span class="fa-box">${FIND_CHECK}</span><span class="fa-txt">휴대폰 인증 전체 약관동의 <b>(필수)</b></span></div><div class="primary-btn v45-iod-btn" data-v47mi-phone-request>인증요청</div>`}
  </div></div>`;
}

function renderV47MyInfoSelection(state){
  const ids=V47MyInfo.DATA.ids.filter(x=>state.flow!=='dormantRelease'||x.dormant);
  const selected=ids.find(x=>x.id===state.selectedId);
  const accounts=selected ? V47MyInfo.DATA.accounts.filter(x=>selected.accounts.includes(x.id)) : [];
  const choice=(kind,value,title,sub,on)=>`<button class="v47mi-choice${on?' on':''}" data-v47mi-${kind}="${value}" aria-pressed="${on}"><span><b>${title}</b><small>${sub}</small></span><span class="v47mi-check">${on?'선택됨 ✓':'선택'}</span></button>`;
  return `<div class="v45-authpage">${v47MyInfoTop(state)}<div class="iod-v45-body"><div class="toss-dhead"><div class="td-title">ID와 계좌를 선택해 주세요</div><div class="td-desc">본인 확인에 사용할 정보를 선택해요.</div></div><div class="v47mi-list">${ids.map(x=>choice('id',x.id,x.id,x.dormant?'장기미사용 제한':'사용 가능',state.selectedId===x.id)).join('')}</div>${selected?`<div class="v47mi-list">${accounts.map(x=>choice('account',x.id,x.type,x.display,state.selectedAccount===x.id)).join('')}</div>`:''}<button class="primary-btn v45-iod-btn" data-v47mi-continue>다음</button></div></div>`;
}
```

- [ ] **Step 6: Add interaction events and inline validation feedback**

```js
if(t.closest('[data-v47mi-phone-verify]')){
  applyV47MyInfoEvent({type:'PHONE_VERIFY', otp:(document.getElementById('v47MyInfoOtp')||{}).value||''});
  return;
}
if(t.closest('[data-v47mi-account]')){
  applyV47MyInfoEvent({type:'SELECT_ACCOUNT', value:t.closest('[data-v47mi-account]').dataset.v47miAccount});
  return;
}
```

`applyV47MyInfoEvent`는 오류가 있으면 `flash(result.error)`를 호출하고, 성공 시 `s1state.v47MyInfo=result.state; renderS1();`을 수행한다.

- [ ] **Step 7: Add 44px selection-card styles**

```css
.flow.toss.v47 .v47mi-choice{min-height:64px;padding:14px 16px;border:1.5px solid #EAECFF;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:space-between;cursor:pointer}
.flow.toss.v47 .v47mi-choice.on{border-color:#1A1A4E;background:#F5F5FF}
.flow.toss.v47 .v47mi-check{width:24px;height:24px;display:grid;place-items:center;color:#1A1A4E}
.flow.toss.v47 .v47mi-error{color:#B42318;font-size:13px;line-height:1.45;margin-top:8px}
```

- [ ] **Step 8: Run tests and commit**

Run: `node --test v47-myinfo.test.cjs && node --check app.js`

Expected: all tests PASS and syntax check exits 0.

```bash
git add v47-myinfo.js v47-myinfo.test.cjs app.js style.css
git commit -m "feat: add shared ver4.7 myinfo steps"
```

---

### Task 3: 계좌 조회·계좌번호·비밀번호 안내 화면

**Files:**
- Modify: `v47-myinfo.js`
- Modify: `v47-myinfo.test.cjs`
- Modify: `app.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: `V47MyInfo.DATA`, `V47MyInfo.transition`, `renderV47MyInfoPhone`
- Produces: `renderV47AccountProfile`, `renderV47AccountNumbers`, `renderV47AccountPasswordGuide`
- Produces: app actions `data-v47mi-agent`, `data-v47mi-hero-profile`, `data-v47mi-hero-password`

- [ ] **Step 1: Add failing flow-endpoint tests**

```js
test('account profile account auth advances to a read-only profile', () => {
  let state = myInfo.createState('계좌정보 조회 및 변경');
  let result = myInfo.transition(state, {type:'ACCOUNT_AUTH', account:'52575602', password:'1234'});
  assert.equal(result.state.step, 'profile');
  assert.equal(result.state.selectedAccount, '52575602');
});

test('account number lookup ends at account list after phone verification', () => {
  let state = {...myInfo.createState('증권계좌번호확인'), step:'phoneOtp'};
  const result = myInfo.transition(state, {type:'PHONE_VERIFY', otp:'123456'});
  assert.equal(result.state.step, 'accountList');
  assert.equal(myInfo.DATA.accounts.length, 3);
});

test('account password guide starts without authentication', () => {
  const state = myInfo.createState('계좌비밀번호 재설정');
  assert.equal(state.step, 'guide');
});
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test --test-name-pattern="account profile|account number|password guide" v47-myinfo.test.cjs`

Expected: account profile test FAIL because `ACCOUNT_AUTH` is not handled.

- [ ] **Step 3: Implement account-auth validation**

```js
if(event.type==='ACCOUNT_AUTH'){
  if(!DATA.accounts.some(x=>x.id===event.account)) return {state, error:'조회할 계좌를 선택해 주세요.'};
  if(!/^\d{4,8}$/.test(event.password||'')) return {state, error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.'};
  return {state:{...next, selectedAccount:event.account, step:'profile'}, error:''};
}
```

- [ ] **Step 4: Render the read-only account profile**

```js
function renderV47AccountProfile(state){
  const p=V47MyInfo.DATA.accountProfile;
  const rows=[['주소',p.address],['연락처',p.phone],['마케팅 수신매체',p.marketing],['직업',p.occupation],['거주국가',p.residence]];
  return `<div class="v45-authpage">${v47MyInfoTop(state)}<div class="iod-v45-body"><div class="toss-dhead"><div class="td-title">계좌정보를 확인해 주세요</div><div class="td-desc">등록된 정보는 영웅문S# 또는 상담원을 통해 변경할 수 있어요.</div></div><div class="iod-v45-card v47mi-profile">${rows.map(([k,v])=>`<div class="v45-ir"><span class="v45-ik">${k}</span><span class="v45-iv">${v}</span></div>`).join('')}</div><div class="v47mi-dual"><button data-v47mi-agent>상담원 연결</button><button data-v47mi-hero-profile>영웅문S#에서 변경</button></div></div></div>`;
}
```

- [ ] **Step 5: Render account list and password guide**

계좌번호 화면은 `V47MyInfo.DATA.accounts`를 `iod-v45-card`로 렌더링한다.

```js
function renderV47AccountNumbers(state){
  const rows=V47MyInfo.DATA.accounts.map(x=>`<div class="iod-v45-card v45-cert-item"><div class="v45-ci-head"><div class="v45-ci-nm">${x.type}</div><span class="iod-badge done">사용 가능</span></div><div class="v45-ci-date">${x.display}</div></div>`).join('');
  return `<div class="v45-authpage">${v47MyInfoTop(state)}<div class="iod-v45-body"><div class="toss-dhead"><div class="td-title">보유 계좌를 확인했어요</div><div class="td-desc">고객님 명의의 증권계좌 목록이에요.</div></div>${rows}</div></div>`;
}
```

비밀번호 안내 화면은 다음 세 문구를 실제 마크업으로 포함한다.

```html
<div class="v47mi-guide-item"><b>어디에 사용하나요?</b><span>주문, 이체 등 계좌 업무를 확인할 때 사용해요.</span></div>
<div class="v47mi-guide-item"><b>몇 자리인가요?</b><span>숫자 4~8자리로 설정해요.</span></div>
<div class="v47mi-guide-item"><b>비밀번호를 잊으셨나요?</b><span>기존 비밀번호는 조회할 수 없으며 안전하게 재설정해야 해요.</span></div>
<button class="primary-btn v45-iod-btn" data-v47mi-hero-password>영웅문S#에서 재설정</button>
```

- [ ] **Step 6: Connect existing consultation and app-link dialogs**

```js
if(t.closest('[data-v47mi-agent]')){ openConsult('계좌정보 변경'); return; }
if(t.closest('[data-v47mi-hero-profile]')){ openAppLink('myacct'); return; }
if(t.closest('[data-v47mi-hero-password]')){ openAppLink('pwreset'); return; }
```

기존 함수의 실제 키가 다르면 `APP_LINK`에 `myacct`와 `pwreset` 설정을 추가하되 새 팝업 컴포넌트는 만들지 않는다.

- [ ] **Step 7: Run the complete tests and browser smoke path**

Run: `node --test v47-myinfo.test.cjs && node --check app.js && node --check v47-myinfo.js`

Expected: all tests PASS and syntax checks exit 0.

Browser checks:

1. VER4.7 내정보 → 계좌정보 조회 및 변경 → 계좌 인증 → 5개 읽기 전용 정보 확인.
2. 두 하단 버튼이 각각 상담 및 영웅문S# 팝업을 연다.
3. 증권계좌번호 확인 → 휴대폰 인증 → 계좌 3개 표시.
4. 계좌비밀번호 재설정 → 안내 3개와 영웅문S# 버튼 표시.

- [ ] **Step 8: Commit**

```bash
git add v47-myinfo.js v47-myinfo.test.cjs app.js style.css
git commit -m "feat: add ver4.7 account information flows"
```

---

### Task 4: ID 비밀번호 재설정과 장기미사용 제한해제

**Files:**
- Modify: `v47-myinfo.js`
- Modify: `v47-myinfo.test.cjs`
- Modify: `app.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: shared phone, selection, and account-password steps from Task 2
- Produces: `renderV47IdSelection`, `renderV47AccountPassword`, `renderV47NewIdPassword`, `renderV47MyInfoComplete`
- Produces terminal states `idPasswordComplete` and `dormantReleaseComplete`

- [ ] **Step 1: Add failing account-password and completion tests**

```js
test('ID password flow rejects a short account password', () => {
  const state={...myInfo.createState('ID조회/PW초기화'), step:'accountPassword', selectedId:'kiwoom0728', selectedAccount:'52575602'};
  const result=myInfo.transition(state,{type:'ACCOUNT_PASSWORD',password:'123'});
  assert.equal(result.error,'계좌비밀번호 숫자 4~8자리를 입력해 주세요.');
  assert.equal(result.state.step,'accountPassword');
});

test('ID password reset validates matching 5 to 8 character values', () => {
  const state={...myInfo.createState('ID조회/PW초기화'), step:'newIdPassword', selectedId:'kiwoom0728', selectedAccount:'52575602'};
  assert.equal(myInfo.transition(state,{type:'NEW_ID_PASSWORD',password:'abc12',confirm:'abc13'}).error,'새 ID 비밀번호가 서로 일치하지 않아요.');
  const done=myInfo.transition(state,{type:'NEW_ID_PASSWORD',password:'abc12',confirm:'abc12'});
  assert.equal(done.state.step,'complete');
  assert.equal(done.state.completed,true);
});

test('dormant release accepts only a dormant ID and completes after account password', () => {
  const state={...myInfo.createState('장기미사용ID 제한 해지'),step:'accountPassword',selectedId:'hero2024',selectedAccount:'50430218'};
  const done=myInfo.transition(state,{type:'ACCOUNT_PASSWORD',password:'1234'});
  assert.equal(done.state.step,'complete');
  assert.equal(done.state.completed,true);
});
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `node --test --test-name-pattern="short account|matching 5|dormant release" v47-myinfo.test.cjs`

Expected: FAIL because password events and completion states are not implemented.

- [ ] **Step 3: Implement password transitions**

```js
if(event.type==='ACCOUNT_PASSWORD'){
  if(!/^\d{4,8}$/.test(event.password||'')) return {state,error:'계좌비밀번호 숫자 4~8자리를 입력해 주세요.'};
  return state.flow==='dormantRelease'
    ? {state:{...next,step:'complete',completed:true},error:''}
    : {state:{...next,step:'newIdPassword'},error:''};
}
if(event.type==='NEW_ID_PASSWORD'){
  if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,8}$/.test(event.password||'')) return {state,error:'영문과 숫자를 조합해 5~8자리로 입력해 주세요.'};
  if(event.password!==event.confirm) return {state,error:'새 ID 비밀번호가 서로 일치하지 않아요.'};
  return {state:{...next,step:'complete',completed:true},error:''};
}
```

- [ ] **Step 4: Render linked ID/account selection**

ID 카드는 `DATA.ids`를 사용한다. `dormantRelease` 흐름에서는 `dormant:true`인 ID만 표시한다. ID 선택 후에는 해당 ID의 `accounts` 배열에 포함된 계좌만 렌더링한다. 선택 카드에는 다음 접근성 속성을 포함한다.

```html
<button class="v47mi-choice on" data-v47mi-id="hero2024" aria-pressed="true">
  <span><b>hero2024</b><small>장기미사용 제한</small></span><span class="v47mi-check">선택됨 ✓</span>
</button>
```

- [ ] **Step 5: Render account password, new ID password, and completion screens**

```js
function renderV47MyInfoComplete(state){
  const dormant=state.flow==='dormantRelease';
  return `<div class="iod-done-center v45-authpage"><div class="iod-done"><div class="iod-done-ic"><img src="assets/glass4.png" alt=""></div><div class="iod-done-t">${dormant?'제한해제가 완료됐어요':'ID 비밀번호 재설정이 완료됐어요'}</div><div class="iod-done-d">${dormant?'장기미사용 ID로 다시 로그인할 수 있어요.':'새 비밀번호로 로그인해 주세요.'}</div></div><div class="iod-done-btnwrap"><button class="primary-btn v45-iod-btn" data-v47mi-home>확인</button></div></div>`;
}
```

계좌비밀번호 입력은 `type="password"`, `inputmode="numeric"`, `maxlength="8"`을 사용한다. 새 ID 비밀번호와 확인값은 각각 `maxlength="8"`, `autocomplete="new-password"`를 사용한다.

- [ ] **Step 6: Wire completion and home actions**

```js
if(t.closest('[data-v47mi-home]')){
  s1state.v47MyInfo=null; s1state.page='home'; s1state.history=[]; renderS1(); return;
}
```

- [ ] **Step 7: Run all tests and syntax checks**

Run: `node --test v47-myinfo.test.cjs v47-self-service.test.cjs && node --check v47-myinfo.js && node --check app.js`

Expected: all tests PASS; both syntax checks exit 0.

- [ ] **Step 8: Commit**

```bash
git add v47-myinfo.js v47-myinfo.test.cjs app.js style.css
git commit -m "feat: add ver4.7 ID recovery flows"
```

---

### Task 5: VER4.7 회귀·접근성·브라우저 검증

**Files:**
- Modify: `v47-myinfo.test.cjs`
- Modify: `app.js` only if verification exposes a defect
- Modify: `style.css` only if verification exposes overflow, contrast, or touch-target defects

**Interfaces:**
- Consumes: all Task 1–4 interfaces
- Produces: verified five-flow VER4.7 implementation with VER4.6 regression coverage

- [ ] **Step 1: Add a failing version-routing contract test to the pure router helper**

Expose `shouldHandle(version, menuTitle)` from `v47-myinfo.js`, then add:

```js
test('handles 내정보 detail routes only in VER4.7', () => {
  assert.equal(myInfo.shouldHandle('v47','계좌정보 조회 및 변경'), true);
  assert.equal(myInfo.shouldHandle('v46','계좌정보 조회 및 변경'), false);
  assert.equal(myInfo.shouldHandle('v47','해외주식 관련'), false);
});
```

- [ ] **Step 2: Run the routing test and verify RED**

Run: `node --test --test-name-pattern="only in VER4.7" v47-myinfo.test.cjs`

Expected: FAIL because `shouldHandle` is undefined.

- [ ] **Step 3: Implement the exact version gate**

```js
function shouldHandle(version, menuTitle){
  return version==='v47' && Object.prototype.hasOwnProperty.call(MENU_KEYS,menuTitle);
}
```

Export `shouldHandle` and use it inside `startV47MyInfo` before creating state.

- [ ] **Step 4: Run the complete automated verification**

Run: `node --test v47-myinfo.test.cjs v47-self-service.test.cjs`

Expected: all tests PASS, 0 failed.

Run: `node --check v47-myinfo.js && node --check v47-self-service.js && node --check app.js`

Expected: all commands exit 0 with no syntax errors.

Run: `git diff --check`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 5: Verify all five flows in a local browser**

Serve `목업` and open `http://127.0.0.1:8765/?v=v47`. Check:

1. Each `내정보` middle menu opens its correct first screen.
2. `계좌정보 조회 및 변경` shows exactly five profile fields and two bottom actions.
3. `증권계좌번호확인` shows three accounts after six-digit OTP.
4. `계좌비밀번호 재설정` opens the existing 영웅문S# linkage dialog.
5. `ID조회/PW초기화` reaches its dedicated completion screen.
6. `장기미사용ID 제한 해지` shows only `hero2024` and reaches its dedicated completion screen.
7. Big-font ON does not clip titles, cards, labels, or fixed actions.
8. Browser console contains 0 errors and 0 warnings caused by changed files.

- [ ] **Step 6: Verify the prior-version guard**

Open `http://127.0.0.1:8765/?v=v46`, enter the corresponding menu, and confirm its existing behavior remains unchanged. Do not alter VER4.6 copy or route to the VER4.7 flow.

- [ ] **Step 7: Commit any verification fixes and final test coverage**

```bash
git add v47-myinfo.test.cjs v47-myinfo.js app.js style.css
git commit -m "test: verify ver4.7 myinfo flows"
```

- [ ] **Step 8: Final evidence capture**

Run fresh:

```bash
node --test v47-myinfo.test.cjs v47-self-service.test.cjs
node --check v47-myinfo.js
node --check v47-self-service.js
node --check app.js
git diff --check
```

Record the exact test count, failure count, syntax-check exits, browser console result, and the five manually verified flows in the handoff.
