/* Ver 4.8 only: adapter between common authentication and existing business pages. */
const V48_REG_KEY='kiwoom.v48.demo.quicknumber';
// Static prototype caller context; replace with the incoming call's number when integrated.
const V48_DEMO_INBOUND_PHONE='010-1234-5678';
let v48Registration=null;
try { v48Registration=V48Auth.registration(JSON.parse(localStorage.getItem(V48_REG_KEY))); } catch(_error) {}
let v48Session=V48Auth.createSession();
let v48Flow=null, v48Pending=null, v48Origin=null, v48LegacySession=null;
let v48QuickHelpCleanup=null;
let v48PhoneSheetCleanup=null;
let v48ChoiceSheetCleanup=null;
let v48PhoneCountdown=null,v48PhoneSmsDemo=null;
let v48SessionTimer=null;
function v48ExpireSession(){
  if(!V48Auth.isExpired(v48Session,Date.now()))return false;
  clearTimeout(v48SessionTimer);v48SessionTimer=null;
  if(isV48()){v48ResetSession();v48GoHome();}
  else v48Session=V48Auth.createSession();
  return true;
}
function v48ScheduleSessionExpiry(){
  clearTimeout(v48SessionTimer);v48SessionTimer=null;
  if(v48Session.expiresAt)v48SessionTimer=setTimeout(v48ExpireSession,Math.max(0,v48Session.expiresAt-Date.now()));
}
function v48StopPhoneTimers(){
  clearInterval(v48PhoneCountdown);clearTimeout(v48PhoneSmsDemo);
  v48PhoneCountdown=null;v48PhoneSmsDemo=null;
}

function v48MaskedName(name){
  const characters=Array.from(String(name||''));
  if(characters.length<2)return '*';
  return characters[0]+'*'.repeat(Math.max(1,characters.length-2))+(characters.length>2?characters.at(-1):'');
}
function v48CloseQuickHelp(restoreFocus=true){
  if(v48QuickHelpCleanup)v48QuickHelpCleanup(restoreFocus);
}
function v48ClosePhoneSheet(restoreFocus=true){
  if(v48PhoneSheetCleanup)v48PhoneSheetCleanup(restoreFocus);
}
function v48CloseChoiceSheet(restoreFocus=true){
  if(v48ChoiceSheetCleanup)v48ChoiceSheetCleanup(restoreFocus);
}
// Shared list picker: use the phone carrier sheet's layout and selection treatment.
function v48OpenChoiceSheet({title,options,value,trigger,onSelect,restoreTrigger}){
  if(!isV48()||trigger?.disabled)return;
  const screen=document.getElementById('screen');if(!screen)return;
  v48CloseChoiceSheet(false);
  const items=options.map(option=>typeof option==='string'?{value:option,label:option}:option);
  const overlay=document.createElement('div');
  overlay.id='v48ChoiceSheet';overlay.className='v48-phone-sheet-overlay v48';
  overlay.innerHTML=`<section class="v48-phone-sheet" role="dialog" aria-modal="true" aria-labelledby="v48ChoiceSheetTitle"><div class="v48-phone-sheet-head"><h2 id="v48ChoiceSheetTitle">${v47Esc(title)}</h2><button type="button" data-v48-choice-close aria-label="${v47Esc(title)} 닫기">${I.x}</button></div><div class="v48-phone-sheet-body"><div class="v48-carrier-options">${items.map((item,index)=>`<button type="button" data-v48-choice-option="${index}" aria-pressed="${item.value===value}"${item.disabled?' disabled':''}><span>${v47Esc(item.label)}</span><span class="v48-carrier-check" aria-hidden="true">✓</span></button>`).join('')}</div></div></section>`;
  const background=Array.from(screen.children).map(element=>({element,inert:element.inert}));
  screen.appendChild(overlay);background.forEach(({element})=>element.inert=true);
  trigger?.setAttribute('aria-expanded','true');
  const restore=()=>{
    const target=restoreTrigger?.()||trigger;
    if(target?.isConnected)target.focus({preventScroll:true});
  };
  v48ChoiceSheetCleanup=restoreFocus=>{
    overlay.remove();background.forEach(({element,inert})=>element.inert=inert);
    trigger?.setAttribute('aria-expanded','false');v48ChoiceSheetCleanup=null;
    if(restoreFocus)restore();
  };
  overlay.addEventListener('click',event=>{
    event.stopPropagation();
    if(event.target===overlay||event.target.closest('[data-v48-choice-close]')){v48CloseChoiceSheet();return;}
    const option=event.target.closest('[data-v48-choice-option]');
    if(!option||option.disabled)return;
    const item=items[Number(option.dataset.v48ChoiceOption)];
    if(!item||item.disabled)return;
    v48CloseChoiceSheet(false);onSelect(item.value);restore();
  });
  overlay.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();v48CloseChoiceSheet();return;}
    const focusable=Array.from(overlay.querySelectorAll('button:not(:disabled)'));
    if(event.key==='Tab'){
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus({preventScroll:true});}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus({preventScroll:true});}
    }
    if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
      event.preventDefault();
      const index=focusable.indexOf(document.activeElement);
      const next=event.key==='Home'?0:event.key==='End'?focusable.length-1:(index+(event.key==='ArrowDown'?1:-1)+focusable.length)%focusable.length;
      focusable[next].focus({preventScroll:true});focusable[next].scrollIntoView({block:'nearest'});
    }
  });
  const initial=overlay.querySelector('[aria-pressed="true"]:not(:disabled)')||overlay.querySelector('[data-v48-choice-option]:not(:disabled)')||overlay.querySelector('[data-v48-choice-close]');
  initial.focus({preventScroll:true});
}
function v48MountChoiceFields(root){
  if(!isV48()||!root)return;
  root.querySelectorAll('select:not([data-v48-choice-mounted])').forEach(select=>{
    if(select.multiple||select.size>1)return;
    const label=select.closest('label');
    const title=select.getAttribute('aria-label')||label?.querySelector('span')?.textContent.trim()||select.closest('.ir')?.querySelector('.k')?.textContent.trim()||(select.classList.contains('fir-sel')||select.classList.contains('find-sel')?'통신사':'항목');
    const trigger=document.createElement('button');
    trigger.type='button';trigger.className=`${select.className} v48-select-trigger`;
    trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');
    const sync=()=>{
      trigger.textContent=select.selectedOptions[0]?.label||'선택해주세요';trigger.disabled=select.disabled;
      trigger.classList.toggle('has-val',!!select.value);
      trigger.setAttribute('aria-label',`${title}: ${trigger.textContent}`);
    };
    const open=()=>v48OpenChoiceSheet({title:`${title} 선택`,trigger,value:select.value,
      options:Array.from(select.options).filter(option=>!option.hidden&&option.value!=='').map(option=>({value:option.value,label:option.label,disabled:option.disabled||option.parentElement.disabled})),
      onSelect:value=>{
        const changed=select.value!==value;select.value=value;sync();
        if(changed){select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));}
      }
    });
    trigger.addEventListener('click',event=>{event.preventDefault();open();});
    trigger.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();open();}});
    select.dataset.v48ChoiceMounted='true';select.classList.add('v48-native-choice');select.hidden=true;
    select.after(trigger);select.addEventListener('change',sync);
    select.addEventListener('invalid',event=>{event.preventDefault();trigger.focus({preventScroll:true});open();});
    if(label)label.addEventListener('click',event=>{if(!trigger.contains(event.target)&&event.target!==select){event.preventDefault();if(!trigger.disabled)trigger.click();}});
    sync();
  });
  root.querySelectorAll('[data-certsel],[data-ordtypesel]').forEach(trigger=>{
    trigger.setAttribute('role','button');trigger.tabIndex=0;
    trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');
    trigger.addEventListener('keydown',event=>{
      if(['Enter',' ','ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();trigger.click();}
    });
  });
}
function v48OpenPhoneSheet(kind){
  if(!isV48()||!['phone','otp'].includes(v48Flow?.step))return;
  const form=document.querySelector('[data-v48-phone-form]'),screen=document.getElementById('screen');
  const trigger=form?.querySelector(kind==='carrier'?'[data-v48-carrier-open]':'[data-v48-consent-open]');
  if(!screen||!trigger||trigger.disabled)return;
  v48ClosePhoneSheet(false);
  const carrier=kind==='carrier',title=carrier?'통신사 선택':'휴대폰 인증 약관동의';
  // Explanatory copy for the prototype; provider-specific legal documents are not bundled.
  const terms=[
    ['개인정보취급동의','휴대폰 본인확인에 필요한 개인정보의 취급에 관한 동의 항목이에요.'],
    ['본인확인서비스 이용 약관','휴대폰 본인확인서비스 이용에 관한 약관이에요.'],
    ['고유식별정보 처리 동의','본인확인을 위한 고유식별정보 처리에 관한 동의 항목이에요.'],
    ['통신사 이용 약관','선택한 통신사의 본인확인서비스 이용에 관한 약관이에요.'],
    ['개인정보 제3자 동의','본인확인에 필요한 개인정보의 제3자 제공에 관한 동의 항목이에요.'],
    ['개인(신용)정보 수집·이용 필수동의서(고객여부식별용)','고객 여부를 확인하기 위한 개인(신용)정보 수집·이용에 관한 동의 항목이에요.']
  ];
  const overlay=document.createElement('div');
  overlay.id='v48PhoneSheet';overlay.className='v48-phone-sheet-overlay v48';
  const content=carrier?`<div class="v48-carrier-options">${V48Auth.carriers.map(item=>`<button type="button" data-v48-carrier-option="${item.id}" aria-pressed="${v48Flow.phoneDetails.carrier===item.id}"><span>${item.label}</span><span class="v48-carrier-check" aria-hidden="true">✓</span></button>`).join('')}</div>`:`<p class="v48-terms-intro">휴대폰 인증을 위해서 약관 동의는 필수예요.</p><div class="v48-phone-terms">${terms.map(([label,description])=>`<details><summary><span><b>[필수]</b> ${label}</span>${I.chev}</summary><p>${description}</p></details>`).join('')}</div>`;
  overlay.innerHTML=`<section class="v48-phone-sheet" role="dialog" aria-modal="true" aria-labelledby="v48PhoneSheetTitle"><div class="v48-phone-sheet-head"><h2 id="v48PhoneSheetTitle">${title}</h2><button type="button" data-v48-phone-sheet-close aria-label="${title} 닫기">${I.x}</button></div><div class="v48-phone-sheet-body">${content}</div>${carrier?'':'<div class="v48-phone-sheet-footer"><button type="button" data-v48-consent-confirm>전체동의</button></div>'}</section>`;
  const background=Array.from(screen.children).map(element=>({element,inert:element.inert}));
  screen.appendChild(overlay);
  background.forEach(({element})=>element.inert=true);
  trigger.setAttribute('aria-expanded','true');
  v48PhoneSheetCleanup=restoreFocus=>{
    overlay.remove();background.forEach(({element,inert})=>element.inert=inert);
    trigger.setAttribute('aria-expanded','false');v48PhoneSheetCleanup=null;
    if(restoreFocus&&trigger.isConnected)trigger.focus({preventScroll:true});
  };
  overlay.addEventListener('click',event=>{
    event.stopPropagation();
    if(event.target===overlay||event.target.closest('[data-v48-phone-sheet-close]')){v48ClosePhoneSheet();return;}
    const option=event.target.closest('[data-v48-carrier-option]');
    if(option){
      form.querySelector('#v48Carrier').value=option.dataset.v48CarrierOption;
      v48ClosePhoneSheet();v48SyncPhoneForm(form);return;
    }
    if(event.target.closest('[data-v48-consent-confirm]')){
      form.querySelector('#v48PhoneConsent').checked=true;
      v48ClosePhoneSheet();v48SyncPhoneForm(form);
    }
  });
  overlay.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();v48ClosePhoneSheet();return;}
    if(event.key==='Tab'){
      const focusable=Array.from(overlay.querySelectorAll('button,summary')),first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus({preventScroll:true});}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus({preventScroll:true});}
    }
  });
  const initialFocus=carrier?(overlay.querySelector('[aria-pressed="true"]')||overlay.querySelector('[data-v48-carrier-option]')):overlay.querySelector('[data-v48-phone-sheet-close]');
  // The sheet starts below the screen while animating; focusing it must not scroll the page or mockup.
  initialFocus.focus({preventScroll:true});
}
function v48OpenQuickHelp(){
  v48OpenPasswordSheet('quick');
}
function v48SyncPasswordForm(){
  const form=document.querySelector('[data-v48-password-form]');
  if(!form)return;
  form.querySelector('[type="submit"]').disabled=v48Flow?.step!=='password'||!/^\d{4,8}$/.test(form.querySelector('#v48Password').value);
}
function v48OpenPasswordSheet(kind){
  const validStep=kind==='quick'?['accounts','password'].includes(v48Flow?.step):v48Flow?.step==='password';
  if(!isV48()||!validStep||v48ExpireSession())return;
  if(kind==='quick'&&!v48Flow.offerEnrollment)return;
  v48CloseQuickHelp(false);
  const screen=document.getElementById('screen');
  const keypad=kind==='keypad',quick=kind==='quick';
  const trigger=document.querySelector(keypad?'#v48Password':quick?'[data-v48-quick-help]':'[data-v48-password-help]');
  if(!screen||!trigger)return;
  const input=document.getElementById('v48Password');
  let draft=keypad?input.value:'';
  const title=keypad?'계좌 비밀번호 입력':quick?'퀵넘버플러스 등록 안내':'증권계좌 비밀번호 재설정';
  const overlay=document.createElement('div');
  overlay.id=keypad?'v48PasswordKeypad':quick?'v48QuickHelp':'v48PasswordHelp';
  overlay.className='v48-phone-sheet-overlay v48-password-sheet-overlay v48';
  // Numeric keypad presentation for this prototype; no credentials leave the page.
  const digits=Array.from({length:10},(_,index)=>String(index));
  if(keypad)for(let i=digits.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[digits[i],digits[j]]=[digits[j],digits[i]];}
  const key=value=>`<button type="button" data-v48-password-key="${value}">${value}</button>`;
  const content=keypad?`<div class="v48-keypad-value" data-v48-keypad-value role="status" aria-live="polite"></div><div class="v48-password-keys">${digits.map(key).join('')}<button type="button" data-v48-password-key="clear">전체삭제</button><button type="button" data-v48-password-key="back" aria-label="한 자리 삭제">⌫</button></div>`:quick?'<p>퀵넘버플러스는 고객님의 전화번호와 선택한 계좌를 연결해 디지털 ARS 이용을 돕는 서비스예요.</p><p>등록은 선택사항이며, 동의하지 않아도 지금 업무를 처리할 수 있어요.</p>':'<p>증권계좌 비밀번호는 <b>숫자 4~8자리</b>예요.<br>비밀번호가 기억나지 않으면 <b>영웅문S#</b> 앱에서 다시 설정할 수 있어요.</p>';
  const action=keypad?'입력완료':quick?'동의하기':'<img src="assets/ys-icon.png" alt="" class="pw-help-ic">영웅문S# 바로가기';
  overlay.innerHTML=`<section class="v48-phone-sheet" role="dialog" aria-modal="true" aria-labelledby="${overlay.id}Title"><div class="v48-password-sheet-grip" aria-hidden="true"></div><div class="v48-phone-sheet-head"><h2 id="${overlay.id}Title">${title}</h2><button type="button" data-v48-password-sheet-close aria-label="${title} 닫기">${I.x}</button></div><div class="v48-phone-sheet-body">${content}</div><div class="v48-phone-sheet-footer"><button type="button" data-v48-password-sheet-confirm>${action}</button></div></section>`;
  const background=Array.from(screen.children).map(element=>({element,inert:element.inert}));
  screen.appendChild(overlay);
  background.forEach(({element})=>element.inert=true);
  trigger.setAttribute('aria-expanded','true');
  v48QuickHelpCleanup=restoreFocus=>{
    draft='';overlay.remove();background.forEach(({element,inert})=>element.inert=inert);
    trigger.setAttribute('aria-expanded','false');
    v48QuickHelpCleanup=null;
    if(restoreFocus&&trigger.isConnected)trigger.focus({preventScroll:true});
  };
  const updateKeypad=()=>{
    const value=overlay.querySelector('[data-v48-keypad-value]');
    value.textContent=draft?'●'.repeat(draft.length):'숫자 4~8자리를 입력해주세요.';
    value.setAttribute('aria-label',draft?`비밀번호 ${draft.length}자리 입력됨`:'숫자 4~8자리를 입력해주세요.');
    value.classList.toggle('is-empty',!draft);
    overlay.querySelector('[data-v48-password-sheet-confirm]').disabled=draft.length<4;
  };
  const press=value=>{
    if(value==='back')draft=draft.slice(0,-1);
    else if(value==='clear')draft='';
    else if(/^\d$/.test(value)&&draft.length<8)draft+=value;
    updateKeypad();
  };
  overlay.addEventListener('click',event=>{
    event.stopPropagation();
    if(event.target===overlay||event.target.closest('[data-v48-password-sheet-close]')){v48CloseQuickHelp();return;}
    const key=event.target.closest('[data-v48-password-key]');
    if(key){press(key.dataset.v48PasswordKey);return;}
    if(event.target.closest('[data-v48-password-sheet-confirm]')){
      if(v48ExpireSession())return;
      if(keypad){
        if(!/^\d{4,8}$/.test(draft))return;
        input.value=draft;v48SyncPasswordForm();v48CloseQuickHelp();
      }else if(quick){
        document.getElementById('v48QuickConsent').checked=true;v48Flow.consent=true;v48CloseQuickHelp();
      }else {v48CloseQuickHelp(false);openAppLink('pwresetacct');}
    }
  });
  overlay.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();v48CloseQuickHelp();return;}
    if(keypad&&(/^\d$/.test(event.key)||['Backspace','Delete'].includes(event.key))){
      event.preventDefault();event.stopPropagation();press(event.key==='Backspace'?'back':event.key==='Delete'?'clear':event.key);return;
    }
    if(event.key==='Tab'){
      const buttons=overlay.querySelectorAll('button:not(:disabled)'),first=buttons[0],last=buttons[buttons.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus({preventScroll:true});}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus({preventScroll:true});}
    }
  });
  if(keypad)updateKeypad();
  overlay.querySelector('[data-v48-password-sheet-close]').focus({preventScroll:true});
}

function v48SaveRegistration(){
  try {
    if(v48Registration)localStorage.setItem(V48_REG_KEY,JSON.stringify(v48Registration));
    else localStorage.removeItem(V48_REG_KEY);
  } catch(_error) { /* file:// or private browsers may allow only in-memory demo state. */ }
}
function v48SyncAccount(){
  sessionAuthed=V48Auth.isAccountVerified(v48Session,v48Session.accountId,Date.now());
  const a=V48Auth.account(v48Session.accountId);
  if(a)authAcct={type:a.type,no:`${a.id.slice(0,4)}-${a.id.slice(4)}`};
}
function v48SwitchVersion(next){
  v48CloseChoiceSheet(false);
  if(V48Auth.isExpired(v48Session,Date.now()))v48Session=V48Auth.createSession();
  v48StopPhoneTimers();
  v48ClosePhoneSheet(false);
  v48CloseQuickHelp(false);
  if(next==='v48'&&!isV48()){
    v48LegacySession={authed:sessionAuthed,acct:{...authAcct},sel:selAcct};
    v48SyncAccount();
  } else if(next!=='v48'&&isV48()){
    v48MenuContext=null;
    v48Flow=null;v48Pending=null;v48Origin=null;
    if(window.speechSynthesis)window.speechSynthesis.cancel();
    sessionAuthed=v48LegacySession?.authed||false;
    authAcct=v48LegacySession?.acct||{type:ACCOUNTS[0].type,no:ACCOUNTS[0].no};
    selAcct=v48LegacySession?.sel||0;
  }
}
function v48ResetSession(){
  v48CloseChoiceSheet(false);
  clearTimeout(v48SessionTimer);v48SessionTimer=null;
  v48MenuContext=null;
  v48StopPhoneTimers();
  v48ClosePhoneSheet(false);
  v48CloseQuickHelp(false);
  v48Session=V48Auth.createSession();v48Flow=null;v48Pending=null;v48Origin=null;
  s1state.acctPw='';s1state.authNext=null;
  closePwKeypad();
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  v48SyncAccount();
  authAcct={type:ACCOUNTS[0].type,no:ACCOUNTS[0].no};
}
function v48GoHome(){
  if(!isV48())return;
  v48MenuContext=null;
  v48StopPhoneTimers();
  v48ClosePhoneSheet(false);
  v48CloseQuickHelp(false);
  v48Flow=null;v48Pending=null;v48Origin=null;
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  closePwKeypad();
  s1nav({page:'home',fromFav:false,authNext:'',acctPw:''});
  s1state.history=[];
  document.getElementById('s1view').scrollTop=0;
}
function v48AuthTaskTitle(pending,origin={}){
  if(pending?.kind==='return')return `${origin.title||'이용 계좌'} · 계좌 변경`;
  if(pending?.title)return pending.title;
  const d=pending?.destination||{},patch=pending?.patch||{};
  if(d.go==='iodcheck')return d.isa?'ISA 가입서류를 내고싶어요':d.cert?'서류 발급현황이 궁금해요':d.untactStatus?'비대면 접수현황이 궁금해요':'입출금이 안 돼요';
  if(d.go==='chefilled')return '체결·주문내역 조회';
  if(d.ordertitle||d.title||d.fk)return d.ordertitle||d.title||d.fk;
  if(['order','reorder','orderopen'].includes(d.go))return '주식 주문';
  if(d.go==='ivsub'&&typeof IVR!=='undefined')return stripNum(IVR[d.ivI]?.subs[d.ivJ]?.t||'업무 조회');
  if(patch.title)return patch.title;
  const key=patch.resultKey||d.rk;
  if(key&&typeof RESULT!=='undefined'&&RESULT[key]?.title)return RESULT[key].title;
  return origin.title||'선택한 업무';
}
function v48StartAuth(pending,change=false){
  if(!isV48())return false;
  v48ExpireSession();
  if(!v48MenuContext)v48BeginMenu(v48AuthTaskTitle(pending,s1state));
  v48StopPhoneTimers();
  v48ClosePhoneSheet(false);
  v48CloseQuickHelp(false);
  closeMenuDrawer();closeConsult();closeMethodSheet();closeAcctSheet();closePwKeypad();
  v48Origin=JSON.parse(JSON.stringify(s1state));
  v48Pending=pending;
  v48Flow=V48Auth.begin(v48Session,v48Registration,{change,phoneOnly:pending?.phoneOnly===true});
  v48Flow.taskTitle=v48AuthTaskTitle(pending,v48Origin);
  v48Flow.phoneDetails={name:'',dob:'',gender:'',carrier:'',phone:V48_DEMO_INBOUND_PHONE,agreed:false};
  s1state.acctPw='';s1state.page='v48auth';s1state.title=v48Flow.taskTitle;
  renderS1();
  if(v48Flow.step==='identity')v48SpeakName();
  return true;
}
function v48Require(pending){
  if(!isV48())return false;
  v48ExpireSession();
  if(pending?.phoneOnly){
    if(v48Session.phoneVerified&&v48Session.expiresAt>Date.now())return false;
    return v48StartAuth(pending);
  }
  const verified=V48Auth.isAccountVerified(v48Session,v48Session.accountId,Date.now());
  if(verified){
    if(v48MenuContext)v48MenuContext.accountId=v48Session.accountId;
    return false;
  }
  return v48StartAuth(pending);
}
function v48ProtectedPage(patch){
  if(['order','creditbuy','creditsell'].includes(patch.page))return true;
  return patch.page==='result'&&[
    'filled','unfilled','reserved','holdings','balance','trades','misu','myacct','acctfind','idpwfind','idpwreset','idrelease','idpwpin','purpose','purposestatus',
    'rights','rightsOffer','rightsDissent','rightsAppraisal','rightsStatus','ipo','ipohist','iporesult',
    'song','xfer','songres','cashflow','pnl','transfer','withdrawable','autotransfer','applygroup','authmgmt','authbio','authrevoke',
    'untactstatus','untactwithdraw','untactotp','untactotpcancel','untactclose','untactpw','accidentcancel','creditext','certbal','certtx','certforeign','certgains'
  ].includes(patch.resultKey);
}
function v48PrepareMyInfo(state){
  if(!isV48()||!v48Session.accountId||state.flow==='accountNumbers')return;
  state.selectedAccount=v48Session.accountId;
  const owner=V47MyInfo.DATA.ids.find(x=>x.accounts.includes(state.selectedAccount));
  state.selectedId=owner?.id||'';
  if(state.flow==='idPassword')state.step='newIdPassword';
  if(state.flow==='dormantRelease')state.step='v48DormantConfirm';
}
function v48Resume(){
  const pending=v48Pending, origin=v48Origin;
  v48Pending=null;v48Flow=null;v48Origin=null;
  if(origin)Object.assign(s1state,origin);
  if(v48MenuContext)v48MenuContext.accountId=v48Session.accountId;
  v48SyncAccount();s1state.acctPw='';
  if(pending?.kind==='myinfo'){startV47MyInfo(pending.title);return;}
  if(pending?.kind==='untact'){startV47Untact(pending.title);return;}
  if(pending?.kind==='document'){v48OpenDocument(pending.id);return;}
  if(pending?.kind==='purpose'){v48OpenPurpose();return;}
  if(pending?.kind==='legacy'){s1state.authNext=pending.destination;gotoAuthNext();return;}
  if(pending?.kind==='page'){s1nav(pending.patch);return;}
  if(s1state.v47MyInfo)v48PrepareMyInfo(s1state.v47MyInfo);
  if(s1state.v47Untact)s1state.v47Untact.account=v48Session.accountId;
  renderS1();
}
function v48Apply(event){
  if(!isV48()||!v48Flow)return;
  if(v48ExpireSession())return;
  v48ClosePhoneSheet(false);
  v48CloseQuickHelp(false);
  const result=V48Auth.transition(v48Flow,v48Session,v48Registration,event);
  if(result.error){
    const error=document.getElementById('v48AuthError');
    if(error){error.textContent=result.error;error.focus();}
    return;
  }
  v48Flow=result.flow;v48Session=result.session;v48Registration=result.registration;
  v48ScheduleSessionExpiry();
  if(v48Flow.step!=='otp')v48StopPhoneTimers();
  if(v48Flow.step==='complete'){
    v48SaveRegistration();v48Resume();return;
  }
  if(v48Flow.step==='cancelled'){
    if(v48MenuContext&&v48SameLocation(v48Origin,v48MenuContext.origin.state)){v48CloseMenu();return;}
    const origin=v48Origin;v48Flow=null;v48Origin=null;v48Pending=null;
    if(origin)Object.assign(s1state,origin);else s1state.page='home';
    v48SyncAccount();renderS1();return;
  }
  // Phone information and OTP share one form; keep its DOM and scroll position.
  const phoneForm=document.querySelector('[data-v48-phone-form]');
  if(phoneForm&&['PHONE_REQUEST','PHONE_EDIT'].includes(event.type)){
    document.getElementById('v48AuthError').textContent='';
    v48MountPhoneAuth();
    if(event.type==='PHONE_REQUEST')phoneForm.querySelector('#v48Otp').focus({preventScroll:true});
    return;
  }
  // Collapse the account list and reveal credentials in place, without rebuilding the page.
  if(['SELECT_ACCOUNT','BACK'].includes(event.type)&&['accounts','password'].includes(v48Flow.step)&&v48MountAccountAuth())return;
  renderS1();
}
function v48SpeakName(){
  if(!isV48()||!v48Registration||!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;
  window.speechSynthesis.cancel();
  const speech=new SpeechSynthesisUtterance(`${v48Registration.name} 고객님이 맞으십니까?`);
  speech.lang='ko-KR';speech.rate=0.9;window.speechSynthesis.speak(speech);
}
function v48AccountChange(){
  if(s1state.page==='result'&&['purposestatus','purpose'].includes(s1state.resultKey)){
    v48StartAuth({kind:'purpose',title:'금융거래목적확인서'},!!v48Session.accountId);return;
  }
  v48StartAuth({kind:'return'},!!v48Session.accountId);
}
function v48AccountBar(){
  const a=V48Auth.account(v48Session.accountId);
  if(!a)return '';
  return `<div class="v48-account-bar"><strong class="v48-account-label">${v48AccountText(V48Auth.formatAccount(a.id))} [${a.type}]</strong><button type="button" class="v48-soft-button" data-v48-change-account>계좌변경</button></div>`;
}
function v48AccountText(value){
  if(!isV48()||v48Session.phoneVerified)return value;
  const digits=String(value).replace(/-/g,'');
  return /^\d{8}$/.test(digits)?`${digits.slice(0,2)}**-**${digits.slice(-2)}`:value;
}
function v48ShowAccountBar(){
  if(s1state.page==='v47myinfo'&&s1state.v47MyInfo?.flow==='accountNumbers')return false;
  return v48Session.accountId && (v48ProtectedPage(s1state)||['v47myinfo','v47untact','iodresult','isaresult','certstatus','untactstatusresult'].includes(s1state.page));
}
function v48UpdatePhoneStage(form){
  const requested=v48Flow.step==='otp',otp=form.querySelector('#v48Otp'),submit=form.querySelector('[type="submit"]');
  const carrier=V48Auth.carriers.find(item=>item.id===v48Flow.phoneDetails.carrier);
  const carrierLabel=form.querySelector('[data-v48-carrier-label]'),carrierText=carrier?.label||'통신사';
  if(carrierLabel.textContent!==carrierText)carrierLabel.textContent=carrierText;
  form.querySelector('[data-v48-carrier-open]').classList.toggle('is-empty',!carrier);
  form.querySelector('[data-v48-carrier-open]').setAttribute('aria-label',`통신사 선택${carrier?': '+carrier.label:''}`);
  form.querySelector('[data-v48-consent-open]').setAttribute('aria-checked',String(v48Flow.phoneDetails.agreed));
  form.toggleAttribute('data-v48-otp-form',requested);
  form.querySelector('.v48-phone-otp').hidden=!requested;
  form.querySelector('.v48-otp-notice').hidden=!requested;
  otp.disabled=!requested;
  const code=requested?(v48Flow.phoneOtp||''):'';
  if(otp.value!==code)otp.value=code;
  const seconds=requested?Math.max(0,Math.ceil((v48Flow.otpExpiresAt-Date.now())/1000)):0;
  const timer=form.querySelector('[data-v48-otp-time]');
  timer.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
  timer.setAttribute('aria-label',`인증번호 유효시간 ${Math.floor(seconds/60)}분 ${seconds%60}초`);
  timer.classList.toggle('expired',requested&&seconds===0);
  const status=form.querySelector('[data-v48-otp-status]');
  const message=requested&&seconds===0?'유효시간이 지났어요. 인증번호를 다시 요청해 주세요.':'';
  if(status.textContent!==message)status.textContent=message;
  status.hidden=!message;
  submit.textContent=requested?'인증 완료':'인증번호 요청';
  submit.disabled=!!V48Auth.phoneRequestError(v48Flow.phoneDetails)||(requested&&!!V48Auth.phoneVerifyError(otp.value,v48Flow.otpExpiresAt));
}
function v48MountPhoneAuth(){
  v48StopPhoneTimers();
  v48ClosePhoneSheet(false);
  const form=document.querySelector('[data-v48-phone-form]');
  if(!isV48()||!form||!['phone','otp'].includes(v48Flow?.step))return;
  v48UpdatePhoneStage(form);
  if(v48Flow.step!=='otp')return;
  const expiresAt=v48Flow.otpExpiresAt;
  const active=()=>isV48()&&s1state.page==='v48auth'&&form.isConnected&&v48Flow?.step==='otp'&&v48Flow.otpExpiresAt===expiresAt;
  const tick=()=>{
    if(!active()){v48StopPhoneTimers();return;}
    v48UpdatePhoneStage(form);
    if(Date.now()>=expiresAt)v48StopPhoneTimers();
  };
  if(Date.now()>=expiresAt)return;
  v48PhoneCountdown=setInterval(tick,1000);
  if(!v48Flow.otpAutoFilled&&v48Flow.otpAutoFillAt){
    // Static demo only: emulate incoming SMS after two seconds, without submitting.
    v48PhoneSmsDemo=setTimeout(()=>{
      if(!active()||Date.now()>=expiresAt)return;
      if(!form.querySelector('#v48Otp').value){
        v48Flow.phoneOtp='123456';v48Flow.otpAutoFilled=true;
        v48UpdatePhoneStage(form);
      } else v48Flow.otpAutoFillAt=0;
    },Math.max(0,v48Flow.otpAutoFillAt-Date.now()));
  }
}
function v48SyncPhoneForm(form=document.querySelector('[data-v48-phone-form]')){
  if(!isV48()||!form||!['phone','otp'].includes(v48Flow?.step))return;
  const details={name:form.querySelector('#v48Name').value,dob:form.querySelector('#v48Dob').value,gender:form.querySelector('#v48Gender').value,carrier:form.querySelector('#v48Carrier').value,phone:form.querySelector('#v48Phone').value,agreed:form.querySelector('#v48PhoneConsent').checked};
  const changed=Object.keys(details).some(key=>details[key]!==v48Flow.phoneDetails?.[key]);
  v48Flow.phoneDetails=details;
  if(v48Flow.step==='otp'&&changed){v48Apply({type:'PHONE_EDIT'});return;}
  v48Flow.phoneOtp=v48Flow.step==='otp'?form.querySelector('#v48Otp').value:'';
  v48UpdatePhoneStage(form);
}
function renderV48PhoneForm(f){
  const details=f.phoneDetails||{name:'',dob:'',gender:'',carrier:'',phone:V48_DEMO_INBOUND_PHONE,agreed:false};
  const requested=f.step==='otp';
  const carrier=V48Auth.carriers.find(item=>item.id===details.carrier);
  return `<h2>본인명의 휴대폰으로 인증해주세요</h2><p>안전한 업무 처리를 위해 본인확인이 필요해요.</p>
    <form data-v48-phone-form ${requested?'data-v48-otp-form':''}>
      <div class="v48-phone-fields">
        <div class="v48-phone-pill v48-phone-name"><label for="v48Name">이름</label><input id="v48Name" autocomplete="name" maxlength="40" placeholder="이름 입력" value="${v47Esc(details.name)}" required></div>
        <div class="v48-phone-pill v48-birth-input">
          <label for="v48Dob">주민번호</label><input id="v48Dob" inputmode="numeric" maxlength="6" placeholder="앞 6자리" aria-label="생년월일 6자리" value="${v47Esc(details.dob)}" required>
          <span class="v48-birth-divider" aria-hidden="true">–</span><div class="v48-birth-tail"><input id="v48Gender" inputmode="numeric" maxlength="1" placeholder="●" aria-label="주민등록번호 뒷자리 첫 숫자" value="${v47Esc(details.gender)}" required><span class="v48-birth-mask" aria-label="나머지 6자리는 입력하지 않습니다">●●●●●●</span></div>
        </div>
        <div class="v48-phone-pill v48-mobile-input"><input type="hidden" id="v48Carrier" value="${v47Esc(details.carrier)}"><button type="button" class="v48-carrier-trigger${carrier?'':' is-empty'}" data-v48-carrier-open aria-label="통신사 선택${carrier?': '+carrier.label:''}" aria-haspopup="dialog" aria-expanded="false" aria-controls="v48PhoneSheet"><span data-v48-carrier-label>${carrier?.label||'통신사'}</span>${I.chev}</button><span class="v48-mobile-divider" aria-hidden="true"></span><input id="v48Phone" aria-label="휴대폰번호" type="tel" inputmode="tel" maxlength="13" autocomplete="tel" placeholder="휴대폰번호" value="${v47Esc(details.phone)}" required></div>
      </div>
      <input type="checkbox" id="v48PhoneConsent" hidden ${details.agreed?'checked':''}>
      <button type="button" class="v48-phone-consent-row" data-v48-consent-open role="checkbox" aria-checked="${details.agreed}" aria-label="휴대폰 인증 약관 전체동의 (필수)" aria-haspopup="dialog" aria-expanded="false" aria-controls="v48PhoneSheet"><span class="v48-phone-check" aria-hidden="true">✓</span><span class="v48-phone-consent-label">휴대폰 인증 약관 전체동의 <b>(필수)</b></span><span class="v48-phone-consent-detail" aria-hidden="true">${I.chev}</span></button>
      <div class="v48-phone-otp" ${requested?'':'hidden'}><div class="v48-phone-pill v48-otp-input"><label for="v48Otp">인증번호</label><input id="v48Otp" aria-label="인증번호" aria-describedby="v48OtpHelp" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="숫자 6자리" value="${v47Esc(f.phoneOtp||'')}" ${requested?'':'disabled'}><span role="timer" data-v48-otp-time>3:00</span><button type="button" data-v48-otp-resend>재요청</button></div><p role="status" data-v48-otp-status hidden></p></div>
      <button class="v48-auth-button" type="submit" ${V48Auth.phoneRequestError(details)||(requested&&V48Auth.phoneVerifyError(f.phoneOtp,f.otpExpiresAt))?'disabled':''}>${requested?'인증 완료':'인증번호 요청'}</button>
      <section class="v48-otp-notice" aria-labelledby="v48OtpNoticeTitle" ${requested?'':'hidden'}><h3 id="v48OtpNoticeTitle">안내사항</h3><p id="v48OtpHelp" class="v48-otp-help">인증문자가 수신되지 않을 경우 키움금융센터 대표번호<span class="v48-otp-help-number">(1544-9000)</span>가 차단 되었는지 확인해주세요.</p></section>
    </form>`;
}
function renderV48AccountAuth(f){
  const password=f.step==='password';
  const rows=V48Auth.accounts.map(x=>{
    const current=f.change&&x.id===f.previousAccount,verified=V48Auth.isAccountVerified(v48Session,x.id,Date.now());
    const selected=password&&x.id===f.selectedAccount,collapsed=password&&!selected;
    const number=v48AccountText(V48Auth.formatAccount(x.id));
    return `<div class="v48-account-row${selected?' is-selected':''}${collapsed?' is-collapsed':''}" ${collapsed?'inert aria-hidden="true"':''}><div class="v48-account-row-inner"><button type="button" data-v48-account="${x.id}" ${current?'disabled aria-label="현재 계좌 '+number+' '+x.type+(verified?' 인증완료':'')+'"':''} ${selected?'aria-expanded="false" aria-controls="v48AccountChoices" aria-label="'+number+' '+x.type+' · 계좌 다시 선택"':''}><strong class="v48-account-label">${number} [${x.type}]</strong>${verified?'<span class="v48-account-verified">인증완료</span>':`<span class="v48-account-select" aria-hidden="true">${current?'현재 계좌':I.chev}</span>`}</button></div></div>`;
  }).join('');
  const registeredAccount=V48Auth.account(f.selectedAccount);
  const heading=f.quick?'<h2>계좌비밀번호를 입력해 주세요</h2><p>퀵넘버플러스에 등록된 계좌로 본인확인을 진행해요.</p>':'<h2>업무를 처리할 계좌를 선택해주세요</h2><p>계좌선택 후 계좌비밀번호를 입력해주세요.</p>';
  const accountList=f.quick?`<div class="v48-selected-account"><strong class="v48-account-label">${v48AccountText(V48Auth.formatAccount(registeredAccount.id))} [${registeredAccount.type}]</strong></div>`:`<div class="v48-account-list" id="v48AccountChoices" role="group" aria-label="계좌 선택">${rows}</div>`;
  const consent=f.offerEnrollment?`<div class="v48-quick-consent-row"><label class="v48-quick-consent-label"><input id="v48QuickConsent" type="checkbox" ${f.consent?'checked':''}><span class="v48-phone-check" aria-hidden="true">✓</span><span class="v48-phone-consent-label">퀵넘버플러스 등록에 동의해요 <b>(선택)</b></span></label><button type="button" class="v48-phone-consent-detail" data-v48-quick-help aria-label="퀵넘버플러스 등록 안내" aria-haspopup="dialog" aria-expanded="false" aria-controls="v48QuickHelp">${I.chev}</button></div>`:'';
  return `${heading}
    ${consent}
    <div class="v48-account-step${password?' is-password':''}"${f.quick?'':' data-v48-account-auth'}>
      ${accountList}
      <div class="v48-password-panel" ${password?'':'inert aria-hidden="true"'}><div class="v48-password-panel-inner">
        <form data-v48-password-form>
          <div class="v48-phone-pill v48-password-input"><input id="v48Password" type="password" readonly inputmode="none" maxlength="8" autocomplete="off" placeholder="계좌 비밀번호 입력 (숫자 4~8자리)" aria-label="계좌 비밀번호 입력 (숫자 4~8자리)" aria-haspopup="dialog" aria-expanded="false" aria-controls="v48PasswordKeypad" data-v48-password-open></div>
          <button class="v48-auth-button" type="submit" disabled>확인</button>
        </form>
        <div class="v48-document-support v48-password-support"><p>계좌비밀번호를 잊으셨나요?</p><button type="button" data-v48-password-help aria-haspopup="dialog" aria-expanded="false" aria-controls="v48PasswordHelp">재설정하기</button></div>
      </div></div>
    </div>`;
}
function v48MountAccountAuth(){
  const root=document.querySelector('[data-v48-account-auth]');
  if(!root)return false;
  const password=v48Flow.step==='password';
  let focus=root.querySelector('.is-selected [data-v48-account]');
  root.classList.toggle('is-password',password);
  root.querySelectorAll('.v48-account-row').forEach(row=>{
    const button=row.querySelector('[data-v48-account]'),selected=password&&button.dataset.v48Account===v48Flow.selectedAccount;
    const collapsed=password&&!selected;
    row.classList.toggle('is-selected',selected);row.classList.toggle('is-collapsed',collapsed);
    row.inert=collapsed;
    if(collapsed)row.setAttribute('aria-hidden','true');else row.removeAttribute('aria-hidden');
    if(selected){
      button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','v48AccountChoices');
      button.setAttribute('aria-label',button.querySelector('.v48-account-label').textContent+' · 계좌 다시 선택');focus=button;
    }else{
      button.removeAttribute('aria-expanded');button.removeAttribute('aria-controls');
      if(!button.disabled)button.removeAttribute('aria-label');
    }
  });
  const panel=root.querySelector('.v48-password-panel');panel.inert=!password;
  if(password)panel.removeAttribute('aria-hidden');else panel.setAttribute('aria-hidden','true');
  // Credentials must never carry over when reopening or selecting another account.
  root.querySelector('#v48Password').value='';v48SyncPasswordForm();
  document.getElementById('v48AuthError').textContent='';
  focus?.focus({preventScroll:true});
  return true;
}
function renderV48Auth(){
  if(!v48Flow)return '';
  const f=v48Flow, a=V48Auth.account(f.selectedAccount);
  const button=(label,attr,secondary=false)=>`<button type="button" class="v48-auth-button${secondary?' secondary':''}" ${attr}>${label}</button>`;
  let content='';
  if(f.step==='identity')content=`<h2>${v47Esc(v48MaskedName(v48Registration.name))} 고객님이 맞으십니까?</h2><p>안내된 고객명이 본인과 일치하는지 확인해 주세요.</p><div class="v48-auth-actions v48-identity-actions">${button('예','data-v48-identity="yes"')}${button('아니오','data-v48-identity="no"',true)}</div>`;
  else if(f.step==='phone'||f.step==='otp')content=renderV48PhoneForm(f);
  else if(['accounts','password'].includes(f.step))content=renderV48AccountAuth(f);
  else if(f.step==='changeOffer'||f.step==='changeChannels')content=`<h2>퀵넘버플러스 계좌를 변경할까요?</h2><p>선택한 ${a.type} ${V48Auth.mask(a.id)} 계좌로 퀵넘버플러스 등록 계좌를 변경할 수 있어요.</p>${f.step==='changeOffer'?`<div class="v48-auth-actions">${button('변경할게요','data-v48-change-decision="yes"')}${button('변경 없이 이번만 이용','data-v48-change-decision="no"',true)}</div>`:`<p>등록 계좌 변경은 영웅문S# 또는 상담원을 통해 진행해 주세요.</p><div class="v48-auth-actions">${button('영웅문S#에서 변경','data-v48-change-channel="app"')}${button('상담원 연결','data-v48-change-channel="agent"',true)}${button('변경 없이 업무 계속하기','data-v48-change-continue',true)}</div>`}`;
  return `<section class="v48-auth${['phone','otp'].includes(f.step)?' v48-auth-phone':['accounts','password'].includes(f.step)?' v48-auth-password':''}" aria-labelledby="v48AuthTaskTitle"><header><button type="button" data-v48-back aria-label="이전 화면">${I.back}</button><h1 id="v48AuthTaskTitle">${v47Esc(f.taskTitle||v48AuthTaskTitle(v48Pending,v48Origin||{}))}</h1></header><div class="v48-auth-body">${content}<p id="v48AuthError" class="v48-auth-error" role="alert" tabindex="-1"></p></div></section>`;
}
function v48UpdateDemoControls(){
  const controls=document.getElementById('v48DemoControls');
  if(!controls)return;
  controls.hidden=!(isV48()&&sianScheme==='s1');
  const select=controls.querySelector('select');
  select.value=v48Registration?'registered':'unregistered';
}
function v48DemoFill(){
  if(!isV48()||s1state.page!=='v48auth')return false;
  for(const [id,value] of [['v48Name','홍길동'],['v48Dob','900101'],['v48Gender','1'],['v48Carrier','skt'],['v48Phone','01012345678'],['v48Otp','123456'],['v48Password','1234']]){
    const input=document.getElementById(id);
    if(input&&!(id==='v48Otp'&&v48Flow?.step!=='otp')&&!(v48Flow?.step==='otp'&&['v48Name','v48Dob','v48Gender','v48Carrier','v48Phone'].includes(id)))input.value=value;
  }
  const consent=document.getElementById('v48PhoneConsent');if(consent)consent.checked=true;
  v48SyncPhoneForm();
  v48SyncPasswordForm();
  return true;
}
function handleV48Click(t){
  if(!isV48())return false;
  if(v48ExpireSession())return true;
  if(t.closest('[data-skipauth]')){
    if(v48Session.accountId)v48ResetSession();
    else {v48Session={...V48Auth.createSession(),phoneVerified:true,accountId:V48Auth.accounts[0].id,verifiedAccounts:[V48Auth.accounts[0].id],expiresAt:Date.now()+V48Auth.SESSION_DURATION,demoBypass:true};v48SyncAccount();v48ScheduleSessionExpiry();}
    // Explicit sidebar demo control only; never persist this authentication.
    selectSian('s1','v48');return true;
  }
  if(t.closest('[data-v48-demo-reconnect]')){v48ResetSession();selectSian('s1','v48');return true;}
  if(t.closest('[data-demo-fill-phone], [data-demo-fill-account]')&&v48DemoFill())return true;
  if(t.closest('[data-v48-change-account], [data-acctchange], [data-ordacct], [data-acctsel]')){v48AccountChange();return true;}
  if(t.closest('[data-v48-quick-help]')){v48OpenQuickHelp();return true;}
  if(t.closest('[data-v48-password-open]')){v48OpenPasswordSheet('keypad');return true;}
  if(t.closest('[data-v48-carrier-open]')){v48OpenPhoneSheet('carrier');return true;}
  if(t.closest('[data-v48-consent-open]')){v48OpenPhoneSheet('terms');return true;}
  if(t.closest('[data-v48-otp-resend]')){
    v48SyncPhoneForm();v48Apply({type:'PHONE_REQUEST',...v48Flow.phoneDetails});return true;
  }
  if(t.closest('[data-v48-back]')){v48Apply({type:'BACK'});return true;}
  const match=t.closest('[data-v48-identity]');if(match){v48Apply({type:'IDENTITY',matches:match.dataset.v48Identity==='yes'});return true;}
  const account=t.closest('[data-v48-account]');if(account){
    if(v48Flow?.step==='password'&&account.dataset.v48Account===v48Flow.selectedAccount)v48Apply({type:'BACK'});
    else v48Apply({type:'SELECT_ACCOUNT',accountId:account.dataset.v48Account});
    return true;
  }
  const change=t.closest('[data-v48-change-decision]');if(change){v48Apply({type:'CHANGE_DECISION',changeRegistration:change.dataset.v48ChangeDecision==='yes'});return true;}
  if(t.closest('[data-v48-change-continue]')){v48Apply({type:'CONTINUE_WITHOUT_CHANGE'});return true;}
  if(t.closest('[data-v48-password-help]')){v48OpenPasswordSheet('reset');return true;}
  const channel=t.closest('[data-v48-change-channel]');
  if(channel){
    if(channel.dataset.v48ChangeChannel==='app')openAppLink('v48quickchange');
    else s1nav({page:'agent',title:'상담원 연결',agentLabel:'퀵넘버플러스 등록 계좌 변경',noHome:true});
    return true;
  }
  if(t.closest('[data-v48-dormant-confirm]')){s1state.v47MyInfo.step='complete';s1state.v47MyInfo.completed=true;renderS1();return true;}
  return false;
}
document.addEventListener('input',event=>{
  if(!isV48())return;
  const form=event.target.closest('[data-v48-phone-form]');
  if(form)v48SyncPhoneForm(form);
  if(event.target.id==='v48Password')v48SyncPasswordForm();
});

document.addEventListener('keydown',event=>{
  if(isV48()&&event.target.matches('[data-v48-password-open]')&&['Enter',' '].includes(event.key)){
    event.preventDefault();v48OpenPasswordSheet('keypad');
  }
});

document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible')v48ExpireSession();
});
document.addEventListener('submit',event=>{
  if(!isV48()||!event.target.matches('[data-v48-phone-form], [data-v48-otp-form], [data-v48-password-form]'))return;
  event.preventDefault();
  const value=id=>document.getElementById(id)?.value||'';
  if(event.target.matches('[data-v48-phone-form]')){
    v48SyncPhoneForm(event.target);
    if(v48Flow.step==='otp')v48Apply({type:'PHONE_VERIFY',otp:value('v48Otp')});
    else v48Apply({type:'PHONE_REQUEST',...v48Flow.phoneDetails});
  }
  else {
    const password=value('v48Password'),consent=document.getElementById('v48QuickConsent')?.checked===true;
    document.getElementById('v48Password').value='';
    v48Apply({type:'PASSWORD',password,consent});
  }
});
document.addEventListener('change',event=>{
  if(!isV48())return;
  const phoneForm=event.target.closest('[data-v48-phone-form]');
  if(phoneForm)v48SyncPhoneForm(phoneForm);
  if(event.target.id==='v48QuickConsent'&&v48Flow)v48Flow.consent=event.target.checked;
  if(event.target.matches('[data-v48-demo-customer]')){
    v48Registration=event.target.value==='registered'?{accountId:V48Auth.accounts[0].id,name:'홍길동'}:null;
    v48SaveRegistration();v48ResetSession();selectSian('s1','v48');
  }
});
