/* One service document: desktop phone viewport, full-width mobile page. */
(function () {
  'use strict';
  const screen = document.getElementById('service-viewport');
  const display = screen.closest('.device-display');
  const sheet = document.getElementById('sheet');
  const app = document.getElementById('app');
  const fillButton = document.getElementById('demo-fill');
  const context = document.getElementById('demo-context');
  const values = document.getElementById('demo-values');
  const notes = document.getElementById('demo-notes');
  const notesSection = document.getElementById('demo-notes-section');
  const feedback = document.getElementById('demo-feedback');
  const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
  const root = document.documentElement;
  const demoPanel = document.getElementById('demo-console');
  function syncConsoleLayout() {
    if (desktop.matches && demoPanel.matches(':popover-open')) demoPanel.hidePopover();
    demoPanel.toggleAttribute('popover', !desktop.matches);
  }
  syncConsoleLayout();
  desktop.addEventListener('change', syncConsoleLayout);
  demoPanel.addEventListener('click', event => {
    if (demoPanel.matches(':popover-open') && event.target.closest('#demo-fill, #demo-digital-form, a, [data-action="reset"], #demo-result-tools [data-scenario]')) {
      demoPanel.hidePopover();
    }
  });
  function showLaunchScreen() {
    const splash = document.getElementById('launch-screen');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches) {
      splash.remove();
      return;
    }

    const logo = splash.querySelector('img');
    const behind = [screen, demoPanel, document.querySelector('.mobile-console-trigger'), document.querySelector('.skip-link')];
    behind.forEach(element => { element.inert = true; });
    splash.hidden = false;

    // A delayed or unreadable logo must never block access to the service.
    let timer = window.setTimeout(finish, 3000);
    function finish() {
      if (!splash.isConnected) return;
      window.clearTimeout(timer);
      motion.removeEventListener('change', finish);
      window.removeEventListener('pagehide', finish);
      behind.forEach(element => { element.inert = false; });
      splash.remove();
      document.dispatchEvent(new Event('ars-launch-complete'));
      if (document.activeElement === document.body) {
        const target = app.querySelector('.faq[open] summary') || app.querySelector('main h1, .topbar-title');
        target?.focus({preventScroll: true});
      }
    }
    logo.addEventListener('load', () => {
      if (!splash.isConnected) return;
      window.clearTimeout(timer);
      // 28 frames in the supplied GIF, including the hold on the final logo.
      timer = window.setTimeout(finish, 2000);
    }, {once: true});
    logo.addEventListener('error', finish, {once: true});
    motion.addEventListener('change', finish);
    window.addEventListener('pagehide', finish);
    logo.src = 'assets/kiwoom_logo_animation.gif';
  }
  // Touch and keyboard use native scrolling. A primary mouse drag pans the chip row.
  function enableChipDragging() {
    let drag = null;
    let suppressClickIn = null;
    app.addEventListener('pointerdown', event => {
      suppressClickIn = null;
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      const strip = event.target.closest('.recent-items, .popular-menu-items');
      if (!strip || strip.scrollWidth <= strip.clientWidth) return;
      drag = {strip, pointerId:event.pointerId, x:event.clientX, scrollLeft:strip.scrollLeft};
    });
    function endDrag(event) {
      if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.pointerId)) return;
      drag.strip.classList.remove('chip-dragging');
      drag = null;
    }
    window.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      if (!(event.buttons & 1) || !drag.strip.isConnected) return endDrag(event);
      const delta = event.clientX - drag.x;
      if (!suppressClickIn) {
        if (Math.abs(delta) < 6) return;
        suppressClickIn = drag.strip;
        drag.strip.setPointerCapture(event.pointerId);
        drag.strip.classList.add('chip-dragging');
      }
      drag.strip.scrollLeft = drag.scrollLeft - delta;
    });
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    window.addEventListener('blur', endDrag);
    app.addEventListener('click', event => {
      if (event.detail && suppressClickIn?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        suppressClickIn = null;
      }
    }, true);
  }
  function syncDemoControls() {
    const phone = app.querySelector('#phone-form');
    const account = app.querySelector('#account-form [name="password"]')?.form;
    const selected = account?.querySelector('[name="account"]:checked');
    const code = phone?.querySelector('[name="code"]');
    fillButton.disabled = (!phone && !account) || !!(account && (!selected || account.elements.password.disabled || account.elements.password.readOnly));
    fillButton.dataset.action = code ? 'demo-code' : account ? 'demo-account' : 'demo-phone';
    context.textContent = code ? '인증번호 입력란에 시연 번호를 채웁니다.' : phone ?
      '휴대폰 인증에 필요한 정보를 채웁니다. 약관 동의는 직접 선택해 주세요.' : account ?
      (selected ? '선택한 계좌의 비밀번호를 채웁니다. 인증 버튼은 직접 눌러 주세요.' : '화면 안에서 인증할 계좌를 먼저 선택해 주세요.') :
      '휴대폰·계좌 인증 화면에서 시연 정보를 채울 수 있습니다.';
    values.hidden = !phone && !selected;
    values.textContent = phone ? 'SMS 인증번호 123456' : selected ?
      `계좌 비밀번호 ${window.ARSData.demoAccountPins[selected.value]}` : '';
    const containers = sheet.open ? [app, sheet] : [app];
    const messages = [...new Set(containers.flatMap(el => [...el.querySelectorAll('[data-demo-note]')]
      .map(note => note.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean)))];
    const signature = messages.join('\n');
    if (notes.dataset.signature !== signature) {
      notes.replaceChildren(...messages.map(message => {
        const item = document.createElement('li');
        item.textContent = message;
        return item;
      }));
      notes.dataset.signature = signature;
    }
    notesSection.hidden = !messages.length;
  }
  // A single outline joins the selected tile to its panel, with rounded inner corners.
  function drawMenuOutlines() {
    for (const row of app.querySelectorAll('.menu-row')) {
      const selected = row.querySelector('.category[aria-expanded="true"]');
      const panel = row.querySelector('.category-panel');
      const outline = row.querySelector('.menu-outline');
      if (!selected || !panel || !outline) continue;
      const box = row.getBoundingClientRect();
      const tile = selected.getBoundingClientRect();
      const detail = panel.getBoundingClientRect();
      if (!box.width || !box.height) continue;
      const inset = 0.75, radius = 20, join = 18;
      const left = inset, right = box.width - inset;
      const top = inset, bottom = box.height - inset;
      const start = tile.left - box.left + inset;
      const end = tile.right - box.left - inset;
      const panelTop = detail.top - box.top + inset;
      const first = Math.abs(start - left) < 2;
      const last = Math.abs(end - right) < 2;
      let d = `M ${start + radius} ${top} H ${end - radius} Q ${end} ${top} ${end} ${top + radius}`;
      if (last) {
        d += ` V ${bottom - radius} Q ${end} ${bottom} ${end - radius} ${bottom}`;
      } else {
        d += ` V ${panelTop - join} Q ${end} ${panelTop} ${end + join} ${panelTop}`;
        d += ` H ${right - radius} Q ${right} ${panelTop} ${right} ${panelTop + radius}`;
        d += ` V ${bottom - radius} Q ${right} ${bottom} ${right - radius} ${bottom}`;
      }
      d += ` H ${left + radius} Q ${left} ${bottom} ${left} ${bottom - radius}`;
      if (first) {
        d += ` V ${top + radius} Q ${left} ${top} ${left + radius} ${top}`;
      } else {
        d += ` V ${panelTop + radius} Q ${left} ${panelTop} ${left + radius} ${panelTop}`;
        d += ` H ${start - join} Q ${start} ${panelTop} ${start} ${panelTop - join}`;
        d += ` V ${top + radius} Q ${start} ${top} ${start + radius} ${top}`;
      }
      outline.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      outline.querySelector('path').setAttribute('d', `${d} Z`);
      row.classList.add('outline-ready');
    }
  }
  function syncBounds() {
    const viewport = window.visualViewport;
    const top = viewport?.offsetTop ?? 0;
    root.style.setProperty('--auth-viewport-top', (desktop.matches ? 0 : top) + 'px');
    const bottom = top + (viewport?.height ?? window.innerHeight);
    let sheetLeft = viewport?.offsetLeft ?? 0;
    let sheetWidth = viewport?.width ?? document.documentElement.clientWidth;
    let sheetTop = top;
    let sheetBottom = bottom;
    if (desktop.matches) {
      const glass = display.getBoundingClientRect();
      const service = screen.getBoundingClientRect();
      sheetLeft = glass.left;
      sheetWidth = glass.width;
      sheetTop = glass.top;
      sheetBottom = glass.bottom;
      // Short windows fit the full handset while preserving its minimum logical layout.
      root.style.setProperty('--service-scale', Math.min(1, glass.width / 320));
      root.style.setProperty('--preview-left', `${service.left}px`);
      root.style.setProperty('--preview-height', `${service.height}px`);
    }
    root.style.setProperty('--sheet-left', `${sheetLeft}px`);
    root.style.setProperty('--sheet-bottom', `${window.innerHeight - sheetBottom}px`);
    root.style.setProperty('--sheet-width', `${sheetWidth}px`);
    root.style.setProperty('--sheet-height', `${Math.max(0, sheetBottom - sheetTop)}px`);
    if (sheet.open && app.querySelector('#choose-carrier[aria-expanded="true"]')) {
      const guideBottom = app.querySelector('.auth-guide').getBoundingClientRect().bottom;
      const scale = desktop.matches ? Number(getComputedStyle(app).zoom) || 1 : 1;
      sheet.style.setProperty('--carrier-sheet-room', (sheetBottom - guideBottom) / scale + 'px');
    }
  }
  let observedMain;
  let effectsFrame = 0;
  const contentSize = new ResizeObserver(queueScrollEffects);
  function queueScrollEffects() {
    if (!effectsFrame) effectsFrame = requestAnimationFrame(syncScrollEffects);
  }
  function syncScrollEffects() {
    effectsFrame = 0;
    if (screen.hidden) return;
    const main = app.querySelector('main');
    if (main !== observedMain) {
      contentSize.disconnect();
      observedMain = main;
      if (main) contentSize.observe(main);
    }
    if (!main) {
      root.classList.remove('more-service-content');
      return;
    }
    const dock = main.querySelector('.search-dock');
    const header = app.querySelector('.topbar');
    if (header && (dock || main.classList.contains('auth-page'))) {
      app.style.setProperty('--topbar-height', `${header.offsetHeight}px`);
    }
    if (dock) {
      const box = dock.getBoundingClientRect();
      app.style.setProperty('--search-dock-height', `${dock.offsetHeight}px`);
      dock.classList.toggle('is-pinned', box.top <= header.getBoundingClientRect().bottom + 1);
    }
    const bounds = screen.getBoundingClientRect();
    const viewport = window.visualViewport;
    const visibleTop = Math.max(bounds.top, viewport?.offsetTop || 0);
    const visibleBottom = Math.min(bounds.bottom,
      viewport ? viewport.offsetTop + viewport.height : window.innerHeight);
    const actions = app.querySelector('.sticky-actions');
    const bottom = actions && getComputedStyle(actions).visibility === 'visible'
      ? Math.min(visibleBottom, actions.getBoundingClientRect().top) : visibleBottom;
    // The bottom padding reserves room for buttons. It isn't unread content.
    const content = main.querySelector(':scope > .self-help, :scope > .faq-section') || main;
    let last = content.lastElementChild;
    while (last && !last.getClientRects().length) last = last.previousElementSibling;
    const contentEnd = last?.getBoundingClientRect().bottom ?? visibleTop;
    const more = !screen.inert && !sheet.open && bottom > visibleTop + 28 && contentEnd > bottom + 1;
    root.classList.toggle('more-service-content', more);
    if (more) {
      const anchor = desktop.matches ? display.getBoundingClientRect().bottom : window.innerHeight;
      display.style.setProperty('--fog-bottom', `${Math.max(0, anchor - bottom)}px`);
    }
  }
  const authRow = '#phone-form [data-phone-step], #account-form .account-password-field, #account-form .account-choice';
  function alignAuthField(control, animate) {
    const step = control?.closest(authRow);
    if (!step || sheet.open || document.activeElement !== control) return;
    const main = step.closest('main');
    const guide = main.querySelector('.auth-guide');
    const scroller = desktop.matches ? screen : document.scrollingElement;
    const viewport = window.visualViewport;
    const scrollTopEdge = desktop.matches ? screen.getBoundingClientRect().top : 0;
    const visibleTop = desktop.matches ? scrollTopEdge : (viewport?.offsetTop ?? 0);
    const visibleBottom = desktop.matches ? scrollTopEdge + screen.clientHeight : visibleTop + (viewport?.height ?? scroller.clientHeight);
    const header = app.querySelector('.topbar');
    app.style.setProperty('--topbar-height', header.offsetHeight + 'px');
    const scale = desktop.matches ? Number(getComputedStyle(app).zoom) || 1 : 1;
    const guideBox = guide.getBoundingClientRect();
    const targetTop = visibleTop + header.getBoundingClientRect().height + guideBox.height;
    const field = step.getBoundingClientRect();
    // Keep the full review in view unless the keyboard or sticky guide obscures the field.
    const keepPosition = main.classList.contains('phone-review-page') || ['name','code'].includes(step.dataset.phoneStep);
    if (keepPosition && field.top >= guideBox.bottom - 1 && field.bottom <= visibleBottom) return;

    // A partially revealed form may be shorter than the viewport. Reserve only the
    // remaining space needed to place this field below the instructions.
    let contentTop = field.top;
    if (step.classList.contains('account-password-field')) {
      const list = main.querySelector('.account-choices').getBoundingClientRect();
      const error = step.nextElementSibling;
      const bottom = error?.matches('.field-error') ? error.getBoundingClientRect().bottom : field.bottom;
      // Keep the chosen account and PIN together; leave room for the error above a short keyboard.
      contentTop = Math.min(field.top, Math.max(list.top, bottom - (visibleBottom - targetTop)));
    }
    const height = contentTop - main.getBoundingClientRect().top + scroller.clientHeight - (targetTop - scrollTopEdge);
    main.style.minHeight = Math.ceil(height / scale) + 'px';
    const spaceAboveField = field.top - contentTop;
    const top = step.getBoundingClientRect().top - spaceAboveField - targetTop;
    const smooth = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scroller.scrollBy({top, behavior: smooth ? 'smooth' : 'instant'});
  }
  screen.addEventListener('focusin', event => {
    if (event.target.matches('#phone-form :is(input, #choose-carrier), #account-form input[type=password], #account-form input[type=radio]:focus-visible, .verified-account-view:focus-visible')) {
      requestAnimationFrame(() => alignAuthField(event.target, true));
    }
  });
  window.ARSViewport = {
    focusAuthField(control, animate = true) {
      const alreadyFocused = document.activeElement === control;
      control.focus({preventScroll: !!control.closest(authRow)});
      // Newly focused inputs align on focusin. Position the carrier before its dialog opens.
      if (alreadyFocused || !animate) alignAuthField(control, animate);
    },
    refresh() { syncBounds(); drawMenuOutlines(); syncDemoControls(); queueScrollEffects(); },
    announce(message) { feedback.textContent = message; },
    get scrollY() { return desktop.matches ? screen.scrollTop : window.scrollY; },
    scrollTo(x, y) {
      if (desktop.matches) screen.scrollTo(x, y);
      else window.scrollTo(x, y);
    },
    lock(locked) {
      root.classList.toggle('sheet-open', locked);
      syncBounds();
      syncDemoControls();
      queueScrollEffects();
    }
  };
  // Switching layouts retains the same input/auth state and current scroll position.
  desktop.addEventListener('change', () => {
    if (desktop.matches) {
      const y = window.scrollY;
      window.scrollTo(0, 0);
      screen.scrollTop = y;
    } else {
      const y = screen.scrollTop;
      screen.scrollTop = 0;
      window.scrollTo(0, y);
    }
    syncBounds();
  });
  const observer = new ResizeObserver(() => { syncBounds(); drawMenuOutlines(); syncDemoControls(); queueScrollEffects(); });
  observer.observe(screen);
  observer.observe(app);
  window.addEventListener('resize', syncBounds, { passive: true });
  window.addEventListener('scroll', syncBounds, { passive: true });
  screen.addEventListener('scroll', queueScrollEffects, { passive: true });
  window.addEventListener('scroll', queueScrollEffects, { passive: true });
  function onVisualViewportChange() {
    syncBounds();
    queueScrollEffects();
  }
  window.visualViewport?.addEventListener('resize', onVisualViewportChange, { passive: true });
  window.visualViewport?.addEventListener('resize', () => alignAuthField(document.activeElement, false), { passive: true });
  window.visualViewport?.addEventListener('scroll', onVisualViewportChange, { passive: true });
  document.addEventListener('ars-launch-complete', queueScrollEffects);
  sheet.addEventListener('close', () => { if (!sheet.open) root.classList.remove('sheet-open'); syncDemoControls(); queueScrollEffects(); });
  enableChipDragging();
  showLaunchScreen();
  syncBounds();
})();
