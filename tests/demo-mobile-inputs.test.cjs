const test=require('node:test');
const assert=require('node:assert/strict');
const {viewportBox,revealDelta,mount}=require('../scripts/demo-mobile-inputs.js');

test('keyboard geometry supports visual-only resize, Safari panning, and layout resize',()=>{
  assert.deepEqual(viewportBox({height:480,offsetTop:0,scale:1},844),{top:0,height:480,inset:364});
  assert.deepEqual(viewportBox({height:420,offsetTop:80,scale:1},844),{top:80,height:420,inset:344});
  assert.deepEqual(viewportBox({height:480,offsetTop:0,scale:1},480),{top:0,height:480,inset:0});
  assert.deepEqual(viewportBox({height:844,offsetTop:0,scale:1},844),{top:0,height:844,inset:0});
  assert.deepEqual(viewportBox({height:422,offsetTop:60,scale:2},844),{top:0,height:844,inset:0});
});

test('scroll only as far as necessary and keep a tall field aligned at its top',()=>{
  const visible={top:120,bottom:480};
  assert.equal(revealDelta({top:200,bottom:246},visible),0);
  assert.equal(revealDelta({top:470,bottom:516},visible),52);
  assert.equal(revealDelta({top:100,bottom:146},visible),-36);
  assert.equal(revealDelta({top:180,bottom:650},visible),44);
});

test('keyboard resize reveals the active OTP and completion button without moving focus',()=>{
  const styles=new Map(),listeners={},viewportListeners={},frames=[];
  const stage={classList:{contains:name=>name==='stage'}};
  const scroller={parentElement:stage,classList:{contains:()=>false},scrollTop:0,scrollHeight:950,
    get clientHeight(){return Number.parseFloat(styles.get('--demo-viewport-height'))-120;},
    getBoundingClientRect(){return {top:120,bottom:120+this.clientHeight};}};
  const pill={parentElement:scroller,getBoundingClientRect:()=>({top:640-scroller.scrollTop,bottom:686-scroller.scrollTop})};
  const submit={getBoundingClientRect:()=>({bottom:746-scroller.scrollTop})};
  const field={id:'v48Otp',isConnected:true,disabled:false,matches:()=>true,getClientRects:()=>[{}],
    closest:selector=>selector==='.stage'?stage:selector.includes('.v48-phone-pill')?pill:selector==='form'?{querySelector:()=>submit}:null,
    focus(){doc.activeElement=this;}};
  const doc={activeElement:field,documentElement:{style:{setProperty:(key,value)=>styles.set(key,value),removeProperty:key=>styles.delete(key)}},addEventListener:(name,fn)=>listeners[name]=fn};
  const viewport={height:844,offsetTop:0,scale:1,addEventListener:(name,fn)=>viewportListeners[name]=fn};
  const win={document:doc,innerHeight:844,visualViewport:viewport,matchMedia:()=>({matches:true,addEventListener(){}}),
    requestAnimationFrame:fn=>{frames.push(fn);return frames.length;},setTimeout:()=>1,clearTimeout(){},addEventListener(){},getComputedStyle:()=>({overflowY:'auto'})};
  const api=mount(win),flush=()=>{while(frames.length)frames.shift()();};
  flush();api.focus(field);flush();assert.equal(scroller.scrollTop,0);
  viewport.height=430;viewportListeners.resize();flush();
  assert.equal(doc.activeElement,field);
  assert.equal(styles.get('--demo-viewport-height'),'430px');
  assert.ok(pill.getBoundingClientRect().top>=136);
  assert.ok(submit.getBoundingClientRect().bottom<=414);
  viewport.height=844;viewportListeners.resize();flush();
  assert.equal(styles.get('--demo-viewport-inset'),'0px');
});
