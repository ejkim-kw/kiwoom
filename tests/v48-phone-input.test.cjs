const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');

function setup(mobile=true){
  const actions=[],selections=[];
  const context=vm.createContext({V48Auth:require('../v48-auth.js'),document:{addEventListener(){}},localStorage:{getItem(){return null;}},
    window:{matchMedia:()=>({matches:mobile}),DemoMobileInputs:{focus:field=>actions.push(field.selector)}}});
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../v48-auth-ui.js'),'utf8'),context);
  context.form={querySelector:selector=>({selector,select:()=>selections.push(selector)})};
  context.open=kind=>actions.push(kind);
  vm.runInContext("v48OpenPhoneSheet=open;v48Flow={step:'phone',phoneDetails:{name:'시연',dob:'900101',gender:'',carrier:'',phone:'010-1234-5678',agreed:false}};",context);
  return {actions,selections,context,run:code=>vm.runInContext(code,context),input:(id,value,extra={})=>{
    context.event={target:{id,value},inputType:'insertText',...extra};
    vm.runInContext('v48AdvancePhoneInput(event,form)',context);
  }};
}

test('six birth digits advance, valid next digit opens carrier, incomplete input stays put',()=>{
  const s=setup();s.input('v48Dob','90010');s.input('v48Gender','9');
  assert.deepEqual(s.actions,[]);
  s.input('v48Dob','900101');s.input('v48Gender','1');
  assert.deepEqual(s.actions,['#v48Gender','carrier']);
  assert.deepEqual(s.selections,['#v48Gender']);
  assert.equal(s.run('v48Flow.phoneDetails.agreed'),false);
});

test('deletion and IME composition do not trigger automatic navigation',()=>{
  const s=setup();s.input('v48Dob','900101',{inputType:'deleteContentBackward'});
  s.input('v48Gender','1',{isComposing:true});assert.deepEqual(s.actions,[]);
});

test('desktop phone preview follows the same guided entry sequence',()=>{
  const desktop=setup(false);desktop.input('v48Dob','900101');desktop.input('v48Gender','1');
  assert.deepEqual(desktop.actions,['#v48Gender','carrier']);
  assert.deepEqual(desktop.selections,['#v48Gender']);
});

test('existing carrier leads to terms and completed consent leads to request without submission',()=>{
  const s=setup();s.run("v48Flow.phoneDetails.carrier='skt';v48Flow.phoneDetails.gender='1';");
  s.input('v48Gender','1');assert.deepEqual(s.actions,['terms']);
  s.run('v48Flow.phoneDetails.agreed=true;');s.input('v48Gender','1');
  assert.deepEqual(s.actions,['terms','[type="submit"]']);
  assert.equal(s.run('v48Flow.step'),'phone');
  s.run("v48Flow.phoneDetails.phone='010';v48NextPhoneField(form);");
  assert.equal(s.actions.at(-1),'#v48Phone');
});

test('OTP help is replaced by the current error, expiry takes priority, retry restores help',()=>{
  const s=setup(),nodes=new Map();
  const get=selector=>{
    if(!nodes.has(selector))nodes.set(selector,{value:'',textContent:'',hidden:false,attributes:{},classList:{toggle(){}},setAttribute(key,value){this.attributes[key]=value;}});
    return nodes.get(selector);
  };
  s.context.form={querySelector:get,toggleAttribute(){}};
  s.run("v48Flow.step='otp';v48Flow.phoneDetails.gender='1';v48Flow.phoneDetails.carrier='skt';v48Flow.phoneDetails.agreed=true;v48Flow.phoneOtp='123456';v48Flow.otpExpiresAt=Date.now()+180000;v48UpdatePhoneStage(form);");
  assert.equal(get('#v48OtpHelp').hidden,false);
  assert.equal(get('[data-v48-otp-status]').hidden,true);
  s.run("v48Flow.phoneOtpError='인증번호가 일치하지 않아요. 다시 확인해 주세요.';v48UpdatePhoneStage(form);");
  assert.equal(get('#v48OtpHelp').hidden,true);
  assert.match(get('[data-v48-otp-status]').textContent,/일치하지/);
  assert.equal(get('#v48Otp').attributes['aria-invalid'],'true');
  assert.equal(get('#v48Otp').attributes['aria-describedby'],'v48OtpStatus');
  s.run('v48Flow.otpExpiresAt=Date.now()-1;v48UpdatePhoneStage(form);');
  assert.match(get('[data-v48-otp-status]').textContent,/유효시간/);
  assert.equal(get('[type="submit"]').disabled,true);
  s.run("v48Flow.phoneOtpError='';v48Flow.phoneOtp='';v48Flow.otpExpiresAt=Date.now()+180000;v48UpdatePhoneStage(form);");
  assert.equal(get('#v48OtpHelp').hidden,false);
  assert.equal(get('[data-v48-otp-status]').hidden,true);
  assert.equal(get('#v48Otp').attributes['aria-invalid'],'false');
});
