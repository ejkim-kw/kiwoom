// Keep the focused field inside the visible part of the phone when its keyboard opens.
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root?.document)root.DemoMobileInputs=api.mount(root);
})(typeof window==='undefined'?null:window,function(){
  function viewportBox(viewport,innerHeight){
    if(!viewport||Math.abs((viewport.scale||1)-1)>.05)return {top:0,height:innerHeight,inset:0};
    const top=Math.max(0,viewport.offsetTop||0),height=Math.max(1,viewport.height);
    return {top,height,inset:Math.max(0,innerHeight-top-height)};
  }
  function revealDelta(field,visible,margin=16){
    const top=visible.top+margin,bottom=visible.bottom-margin;
    if(field.top<top||field.bottom-field.top>bottom-top)return field.top-top;
    return Math.max(0,field.bottom-bottom);
  }
  function mount(win){
    const doc=win.document,mobile=win.matchMedia('(max-width:700px)'),viewport=win.visualViewport;
    const editable='input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]),textarea,[contenteditable="true"]';
    let frame=0,settle=0,pending=null;
    const inCustomerView=el=>el?.isConnected&&el.closest('.stage')&&!el.closest('#demoControlPanel')&&!el.closest('[inert]');
    function update(){
      frame=0;
      const style=doc.documentElement.style;
      if(!mobile.matches){
        ['--demo-viewport-height','--demo-viewport-top','--demo-viewport-inset'].forEach(key=>style.removeProperty(key));
        pending=null;return;
      }
      const box=viewportBox(viewport,win.innerHeight);
      style.setProperty('--demo-viewport-height',`${box.height}px`);
      style.setProperty('--demo-viewport-top',`${box.top+(win.scrollY||0)}px`);
      style.setProperty('--demo-viewport-inset',`${box.inset}px`);
      const field=pending;pending=null;
      if(!inCustomerView(field)||!field.getClientRects().length)return;
      const target=(field.id==='v48Otp'?field.closest('.v48-phone-otp'):null)||field.closest('.v48-phone-pill,.v48-input-field')||field;
      for(let parent=target.parentElement;parent&&!parent.classList.contains('stage');parent=parent.parentElement){
        if(!/(auto|scroll)/.test(win.getComputedStyle(parent).overflowY)||parent.scrollHeight<=parent.clientHeight)continue;
        const bounds=parent.getBoundingClientRect(),rect=target.getBoundingClientRect();
        const visible={top:Math.max(box.top,bounds.top),bottom:Math.min(box.top+box.height,bounds.bottom)};
        if(visible.bottom<=visible.top)continue;
        // Show the completion action with the OTP whenever both fit above the keyboard.
        const submit=field.id==='v48Otp'?field.closest('form')?.querySelector('[type="submit"]'):null;
        const end=submit?.getBoundingClientRect().bottom;
        const bottom=end&&end-rect.top<=visible.bottom-visible.top-32?end:rect.bottom;
        const delta=revealDelta({top:rect.top,bottom},visible);
        if(Math.abs(delta)>1)parent.scrollTop+=delta;
      }
    }
    function refresh(field){
      if(field)pending=field;
      if(!frame)frame=win.requestAnimationFrame(update);
    }
    function reveal(field){
      if(!mobile.matches||!inCustomerView(field))return;
      refresh(field);
      win.clearTimeout(settle);
      settle=win.setTimeout(()=>{if(doc.activeElement===field)refresh(field);},300);
    }
    function focus(field){
      if(!field||field.disabled)return;
      field.focus({preventScroll:true});reveal(field);
    }
    doc.addEventListener('focusin',event=>{if(event.target.matches(editable))reveal(event.target);});
    doc.addEventListener('input',event=>{if(event.target===doc.activeElement&&event.target.matches(editable))reveal(event.target);});
    const resized=()=>refresh(inCustomerView(doc.activeElement)?doc.activeElement:null);
    viewport?.addEventListener('resize',resized);
    viewport?.addEventListener('scroll',resized);
    win.addEventListener('resize',resized);
    win.addEventListener('scroll',resized);
    mobile.addEventListener('change',resized);
    refresh();
    return {focus,reveal};
  }
  return {viewportBox,revealDelta,mount};
});
