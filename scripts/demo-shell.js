// Mobile presentation controls reuse the desktop sidebar and its existing handlers.
(() => {
  const panel=document.getElementById('demoControlPanel');
  const launcher=document.querySelector('.demo-launcher');
  const backdrop=document.querySelector('.demo-panel-backdrop');
  const mobile=window.matchMedia('(max-width:700px)');
  const customerScreens=[...document.querySelectorAll('#mainStage,.stage>.dars-deck')];
  let opened=false,launcherHidden=false;

  function render(){
    const floating=mobile.matches&&opened;
    document.body.classList.toggle('demo-panel-open',floating);
    document.body.classList.toggle('demo-launcher-hidden',launcherHidden);
    launcher.setAttribute('aria-expanded',String(floating));
    launcher.setAttribute('aria-label',floating?'시연 설정 닫기':'시연 설정 열기');
    backdrop.hidden=!floating;
    panel.inert=mobile.matches&&!floating;
    if(mobile.matches){
      panel.setAttribute('role','dialog');
      panel.setAttribute('aria-modal','true');
      panel.setAttribute('aria-labelledby','demoControlTitle');
    } else {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-modal');
      panel.removeAttribute('aria-labelledby');
    }
    customerScreens.forEach(screen=>{screen.inert=floating;});
  }
  function closePanel(restoreFocus=true){
    opened=false;
    render();
    if(restoreFocus&&mobile.matches&&!launcherHidden)launcher.focus();
  }
  launcher.addEventListener('click',()=>{
    if(opened){closePanel();return;}
    opened=true;
    render();
    panel.querySelector('[data-demo-panel-close]').focus();
  });
  document.querySelectorAll('[data-demo-panel-close]').forEach(button=>button.addEventListener('click',()=>closePanel()));
  panel.querySelector('[data-demo-launcher-hide]').addEventListener('click',()=>{
    launcherHidden=true;
    closePanel(false);
    const screen=customerScreens.find(item=>item.getClientRects().length);
    if(screen){screen.setAttribute('tabindex','-1');screen.focus({preventScroll:true});}
  });
  // Let existing delegated version and demo actions finish before closing the panel.
  panel.addEventListener('click',event=>{
    if(mobile.matches&&event.target.closest('.ref-item,.func-item,[data-v48-demo-reconnect]'))setTimeout(()=>closePanel(),0);
  });
  document.addEventListener('keydown',event=>{
    if(!mobile.matches||!opened)return;
    if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();closePanel();return;}
    if(event.key!=='Tab')return;
    const focusable=[...panel.querySelectorAll('button,select,input,summary,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&(document.activeElement===first||!panel.contains(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!panel.contains(document.activeElement))){event.preventDefault();first.focus();}
  },true);
  mobile.addEventListener('change',()=>{
    const hadFocus=panel.contains(document.activeElement);
    opened=false;
    render();
    if(mobile.matches&&hadFocus&&!launcherHidden)launcher.focus();
  });
  render();
})();
