(() => {
  'use strict';
  const catalog = window.DigitalFormCatalog;
  const params = new URLSearchParams(location.search);
  const switchView = document.getElementById('demo-digital-form');
  const service = document.getElementById('df-service');
  if (!switchView) {
    let large = params.get('large') === '1';
    try { large ||= localStorage.getItem('fresh-ars-20261112-large')==='true'; } catch (_) { /* An issued link also carries this preference. */ }
    document.documentElement.classList.toggle('large-type',large);
  }
  const defaultTask = catalog.find(item => item.id === 'rename');
  const requestedTask = params.get('task');
  let task = requestedTask === null ? defaultTask : catalog.find(item => item.id === requestedTask);
  if (requestedTask === 'rename' && params.has('change')) {
    task = window.getIdentityChangeTask(params.get('change'));
  }
  service.innerHTML = `<header class="df-bar">
    <svg class="logo-mark" viewBox="0 0 40 48" role="img" aria-label="키움증권"><path fill="#29267a" d="M5 17h7v12l10-12h8L17 32l12 12H18l-6-8v8H5z"/><path fill="#e5007e" d="m15 12 23-8-6 25-5-9-12 14-6-6 13-13z"/></svg>
    <button id="df-back" type="button" class="icon-button" aria-label="첨부 목록 닫기" hidden></button>
    </header><main id="df-main" tabindex="-1"></main><footer id="df-actions" hidden></footer>`;
  const main = document.getElementById('df-main');
  const actions = document.getElementById('df-actions');
  const tools = document.getElementById(switchView ? 'demo-console' : 'df-tools');
  const sheet = document.getElementById('df-sheet');
  const fileInput = document.getElementById('df-file');
  const display = document.querySelector('.device-display');
  const desktop = matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
  const maxFiles = 10;
  const maxBytes = 10 * 1024 * 1024;
  const accept = '.jpg,.jpeg,.png,.bmp,.pdf';
  function initialState() {
    return {
      page: task ? 'start' : 'unavailable', variant: task?.variants?.[0], minor: Boolean(task?.requiresMinorInfo),
      choices: new Map(), toggles: new Map(), files: new Map(), childName: '', childAccount: '', editedChildFields: new Set(),
      attachment: null, draftFiles: [], errors: [], registrationScroll: 0,
      status: '', receivedAt: null, submittedTitles: []
    };
  }
  const state = initialState();
  const paths = {
    check: 'm5 12 4 4L19 6', next: 'm9 5 7 7-7 7', down: 'm6 9 6 6 6-6', close: 'm6 6 12 12M18 6 6 18',
    file: 'M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 16h6', plus: 'M12 5v14M5 12h14',
    trash: 'M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7',
    camera: 'M3 7h4l2-3h6l2 3h4v13H3z M15.5 13a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0',
    photo: 'M3 4h18v16H3zM4 17l5-6 4 4 3-3 4 5M16 8h.01'
  };
  const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path pathLength="1" d="'+paths[name]+'"/></svg>';
  const esc = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const checked = value => value ? ' checked' : '';
  const checkbox = (attributes, label, value) => '<label class="check df-toggle"><input type="checkbox" '+attributes+checked(value)+'>'+icon('check')+'<span>'+esc(label)+'</span></label>';
  const button = (label, action, disabled=false) => '<button class="btn" type="button" data-do="'+action+'"'+(disabled?' disabled':'')+'>'+esc(label)+'</button>';
  const rows = pairs => pairs.map(([k,v]) => '<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('');
  const docFiles = doc => state.files.get(doc.id) || [];
  const groups = () => [...(task.groups || []), ...(state.variant?.groups || []), ...(state.minor ? task.minorGroups || [] : [])];
  const groupKey = group => group.documents.map(doc => doc.id).join('|');
  const isToggle = group => group.optional || group.toggleLabel;
  const enabled = group => !isToggle(group) || (state.toggles.get(groupKey(group)) ?? Boolean(group.defaultOn));
  const choice = group => state.choices.get(groupKey(group)) || group.documents[0]?.id;
  function requiredDocs() {
    const all = groups().filter(enabled).flatMap(group => group.chooseOne
      ? group.documents.filter(doc => doc.id === choice(group)) : group.documents);
    return [...new Map(all.map(doc => [doc.id,doc])).values()];
  }
  function taskHeading() {
    return '<h1>김키움님의 '+esc(task.title)+'</h1>';
  }
  function preparationGuide() {
    const active = groups().filter(enabled);
    const required = active.filter(group => !group.chooseOne).flatMap(group => group.documents);
    const names = docs => [...new Set(docs.map(doc => doc.title))].join(', ');
    const lines = [];
    if (required.length) {
      const criterion = state.variant ? '‘'+state.variant.title+'’ 기준으로 ' : '';
      lines.push(criterion+'필요한 서류는 '+names(required)+'입니다.');
    }
    for (const group of active.filter(group => group.chooseOne)) {
      lines.push(names(group.documents)+' 중 한 가지를 준비해 주세요.');
    }
    if (task.allowMinor && !state.minor) {
      lines.push('미성년자를 대신해 제출할 때에는 '+names(task.minorGroups.flatMap(group => group.documents))+'도 필요합니다.');
    }
    if (state.variant) lines.push('등록 단계에서 증빙 기준을 변경할 수 있습니다.');
    return lines.map(line => '<p class="df-intro">'+esc(line)+'</p>').join('');
  }
  const docById = id => groups().flatMap(group => group.documents).find(doc => doc.id === id);
  function childError(key) {
    if (key === 'childAccount') return /^\d+$/.test(state.childAccount) ? '' : '미성년자 계좌번호를 숫자로 입력해 주세요.';
    return state.childName.trim() ? '' : '미성년자 성명을 입력해 주세요.';
  }
  const canSubmit = () => requiredDocs().every(doc => docFiles(doc).length > 0)
    && (!state.minor || (!childError('childAccount') && !childError('childName')));
  const statusLabels = {received:'접수 완료', processing:'처리 중', supplement:'보완 처리 중', complete:'처리 완료'};
  const taskPicker = tools.querySelector('#df-task-picker');
  const taskChoices = taskPicker.querySelector('.console-options');
  taskChoices.innerHTML = catalog.map(item =>
    '<button type="button" data-do="choose-task" data-id="'+esc(item.id)+'">'+esc(item.title)+'</button>'
  ).join('');
  const attachmentClose = document.getElementById('df-back');
  attachmentClose.innerHTML = icon('close');
  const statusOptions = document.getElementById('df-status-options');
  statusOptions.querySelector('.console-options').innerHTML = Object.entries(statusLabels).map(([id,label]) =>
    '<button type="button" data-do="set-status" data-id="'+id+'">'+label+'</button>').join('');
  const steps = ['서류 등록','접수 완료','처리 중','처리 완료'];
  let opener;
  function closeTools() {
    taskPicker.open = false;
    if (tools.hasAttribute('popover') && tools.matches(':popover-open')) tools.hidePopover();
  }
  function resize() {
    if (service.hidden) return;
    const box = display.getBoundingClientRect();
    const scale = desktop.matches ? Math.min(1, box.width / 370) : 1;
    display.parentElement.style.setProperty('--df-scale', scale);
    sheet.style.setProperty('--sheet-width', box.width+'px');
    sheet.style.setProperty('--sheet-left', box.left+'px');
    sheet.style.setProperty('--sheet-bottom', Math.max(0, innerHeight-box.bottom)+'px');
    sheet.style.setProperty('--sheet-height', box.height+'px');
    updateFog();
  }
  function updateFog() {
    if (service.hidden) return;
    const last = main.lastElementChild?.lastElementChild;
    const bounds = main.getBoundingClientRect();
    const viewport = window.visualViewport;
    const bottom = Math.min(bounds.bottom, viewport ? viewport.offsetTop + viewport.height : innerHeight);
    const more = last && last.getBoundingClientRect().bottom > bottom + 1 && bottom > bounds.top + 28;
    document.documentElement.classList.toggle('more-service-content', Boolean(more));
    if (more) display.style.setProperty('--fog-bottom', (display.getBoundingClientRect().bottom - bottom) + 'px');
  }
  function layout() {
    if (!switchView) {
      closeTools();
      tools.toggleAttribute('popover', !desktop.matches);
    }
    resize();
  }
  function showSheet(title, content) {
    closeTools();
    if (!sheet.open) opener = document.activeElement;
    sheet.innerHTML = '<div class="sheet-inner"><div class="sheet-handle" aria-hidden="true"></div><div class="sheet-head"><h2 id="df-sheet-title">'+esc(title)+'</h2><button type="button" data-do="close-sheet" class="icon-button" aria-label="닫기">'+icon('close')+'</button></div><div class="sheet-body">'+content+'</div></div>';
    resize();
    if (!sheet.open) sheet.showModal();
  }
  function closeSheet() {
    if (sheet.open) sheet.close();
    if (opener?.isConnected) opener.focus({preventScroll:true});
  }
  function timeline(active) {
    return '<ol class="df-timeline">'+steps.map((label,i) => {
      const selected = i === active-1;
      const receipt = i===1 && state.receivedAt ? '<dl class="df-summary">'+rows([receiptTime()])+'</dl>' : '';
      const issue = i===2 && state.status==='supplement' ? '<div class="df-summary"><span class="df-status-em">보완 처리 중</span></div>' : '';
      return '<li class="'+(selected?'current':i<active-1?'done':'')+'"'+(selected?' aria-current="step"':'')+'><b aria-hidden="true">'+(i<active-1?icon('check'):i+1)+'</b><strong>'+label+'</strong>'+receipt+issue+'</li>';
    }).join('')+'</ol>';
  }
  function receiptTime() {
    return ['접수 일시',state.receivedAt.toLocaleString('ko-KR',{dateStyle:'medium',timeStyle:'short'})];
  }
  function fileRow(file, i, draft) {
    const size = file.size<1024*1024 ? Math.max(1,Math.round(file.size/1024))+'KB' : (file.size/1024/1024).toFixed(1)+'MB';
    return '<div class="df-file"><i class="df-icon-tile">'+icon('file')+'</i><span>'+esc(file.name)+'<small>'+size+'</small></span>'+ (draft ? '<button class="icon-button" type="button" data-do="delete-file" data-index="'+i+'" aria-label="'+esc(file.name)+' 삭제">'+icon('trash')+'</button>' : '')+'</div>';
  }
  function uploadButton(doc, label) {
    return '<button type="button" class="df-upload" data-do="upload" data-id="'+esc(doc.id)+'">'+icon('file')+esc(label)+'<span class="df-plus">'+icon('plus')+'</span></button>';
  }
  function attachments(doc) {
    const files = docFiles(doc);
    return files.map((file,i)=>fileRow(file,i,false)).join('')+uploadButton(doc,files.length?'첨부 파일 관리하기':'파일 첨부하기');
  }
  function exampleButton(doc) {
    return '<button type="button" class="df-example-btn" data-do="example" data-id="'+esc(doc.id)+'" aria-label="'+esc(doc.title)+' 예시 보기"><span>예시 보기</span></button>';
  }
  function documentTitle(doc) {
    return '<span><strong class="df-doc-label">'+esc(doc.title)+'</strong>'+(doc.hint?'<small class="df-doc-hint">'+esc(doc.hint)+'</small>':'')+'</span>';
  }
  function groupHTML(group, index) {
    const title = group.title || (group.chooseOne?'다음 중 한 가지를 선택해 주세요':'');
    const toggle = isToggle(group);
    const heading = toggle
      ? checkbox('data-group="'+index+'"',group.toggleLabel || title || '추가 서류 제출',enabled(group))
      : title && (group.documents.length>1 || group.chooseOne) ? '<h2 class="df-heading">'+esc(title)+'</h2>' : '';
    let docs = '';
    if (enabled(group)) {
      if (group.chooseOne) {
        const selected = group.documents.find(doc=>doc.id===choice(group));
        docs = group.documents.map(doc=>'<div class="df-row df-choice"><label><input type="radio" name="group-'+index+'" value="'+esc(doc.id)+'" data-choice="'+index+'"'+checked(doc===selected)+'>'+documentTitle(doc)+'</label>'+exampleButton(doc)+'</div>').join('')+attachments(selected);
      } else {
        docs = group.documents.map(doc=>'<div class="df-doc"><div class="df-row">'+documentTitle(doc)+exampleButton(doc)+'</div>'+attachments(doc)+'</div>').join('');
      }
    }
    return '<section class="df-group">'+heading+docs+'</section>';
  }
  function childField(key, id, label, attributes) {
    const error = state.editedChildFields.has(key) ? childError(key) : '';
    return `<div class="field"><label class="field-label" for="${id}">${label}</label>
      <input id="${id}" data-child="${key}" autocomplete="off" required ${attributes} value="${esc(state[key])}"
        aria-describedby="${id}-error"${error ? ' aria-invalid="true"' : ''}>
      <p id="${id}-error" class="df-error" aria-live="polite">${esc(error)}</p></div>`;
  }
  function registration() {
    const variants = task.variants?.length ? '<button type="button" data-do="variants" class="choice-field df-variant" aria-haspopup="dialog"><span>'+esc(state.variant.title)+'</span>'+icon('down')+'</button>' : '';
    const baseGroups = [...task.groups,...(state.variant?.groups || [])];
    let minor = task.allowMinor ? checkbox('id="df-minor"','미성년자를 대신해 제출합니다',state.minor) : '';
    if (state.minor) {
      minor += (task.minorGroups || []).map((group,i)=>groupHTML(group,baseGroups.length+i)).join('');
      minor += childField('childAccount', 'df-child-account', '미성년자 계좌번호', 'inputmode="numeric" maxlength="16" placeholder="숫자만 입력"');
      minor += childField('childName', 'df-child-name', '미성년자 성명', 'maxlength="40" placeholder="이름 입력"');
    }
    return '<div class="df-section"><p class="df-step"><b class="df-bullet">1</b>서류 등록</p>'+taskHeading()+'<p class="df-intro">'+esc(task.description)+'</p><p class="df-limit">JPG, PNG, BMP, PDF 파일을 한 개당 10MB까지 첨부할 수 있습니다.</p>'+variants+'</div><div class="df-section">'+baseGroups.map(groupHTML).join('')+'</div>'+(minor?'<section class="df-section">'+minor+'</section>':'');
  }
  function upload() {
    const doc = state.attachment;
    const list = state.draftFiles.map((f,i)=>fileRow(f,i,true)).join('') || '<div class="df-empty">'+icon('file')+'첨부한 파일이 없습니다.</div>';
    const full = state.draftFiles.length >= maxFiles;
    const error = state.errors.length ? '<div class="df-error" id="df-upload-error" role="alert">'+state.errors.map(message=>'<div>'+esc(message)+'</div>').join('')+'</div>' : '';
    const capacity = full ? (error ? ' aria-disabled="true"' : ' disabled') : '';
    const invalid = error ? ' aria-invalid="true" aria-describedby="df-upload-error"' : '';
    return `<div class="df-section"><h1><span class="df-task-context">${esc(task.title)}</span> ${esc(doc.title)} 첨부</h1>
      <p class="df-intro">${doc.cameraOnly ? '카메라로 신분증을 촬영해 주세요.' : '서류를 촬영하거나 저장된 파일을 선택해 주세요.'}</p>
      <p class="df-limit">파일당 최대 10MB · ${doc.cameraOnly ? 'JPG, PNG, BMP' : 'JPG, PNG, BMP, PDF'}</p>
      <button class="df-upload" type="button" data-do="methods"${capacity}${invalid}>${icon('file')}파일 첨부하기<span class="df-plus">${icon('plus')}</span></button>
      ${error}</div><div class="df-toolbar"><span>첨부 ${state.draftFiles.length} / ${maxFiles}</span>
      <button type="button" data-do="clear-files"${state.draftFiles.length ? '' : ' disabled'}>전체 삭제</button></div><div class="df-section">${list}</div>`;
  }
  function paint({keepScroll=false,focus=false}={}) {
    let content = '', primary = '';
    const scroll = keepScroll ? main.scrollTop : 0;
    attachmentClose.hidden = state.page !== 'attachment';
    for (const option of taskChoices.children) {
      const current = option.dataset.id === task?.id;
      option.setAttribute('aria-pressed', String(current));
      if (option.dataset.id === 'rename') option.textContent = current ? task.title : defaultTask.title;
    }
    document.getElementById('df-sample').disabled = !['start','register','attachment'].includes(state.page);
    statusOptions.hidden = !state.receivedAt;
    for (const option of statusOptions.querySelectorAll('button')) {
      option.setAttribute('aria-pressed', String(option.dataset.id === state.status));
    }
    if (state.page==='unavailable') {
      content = '<div class="df-section"><h1>서류 제출 링크 확인</h1><p class="df-intro">안내받은 업무별 서류 제출 링크를 다시 확인해 주세요.</p></div>';
    } else if (state.page==='start') {
      content = '<div class="df-section">'+taskHeading()+preparationGuide()+timeline(1)+'</div>';
      primary = button('서류 등록하기','begin');
    } else if (state.page==='register') {
      content = registration();
      primary = button('서류 제출하기','submit',!canSubmit());
    } else if (state.page==='attachment') {
      content = upload();
      primary = button('첨부 파일 등록하기','save-files',!state.draftFiles.length && !docFiles(state.attachment).length);
    } else if (state.page==='status') {
      const complete = state.status==='complete';
      const status = '<p class="df-step">서류 '+statusLabels[state.status]+'</p>';
      const submitted = '<p class="df-intro">제출한 서류는 '+esc(state.submittedTitles.join(', '))+'입니다.</p>';
      content = '<div class="df-section'+(complete?' df-done':'')+'">'
        +(complete?'<span class="df-done-icon">'+icon('check')+'</span>':'')
        +status+taskHeading()+submitted+(complete?'':timeline(state.status==='received'?2:3))+'</div>';
      primary = state.status==='supplement' ? button('서류 보완하기','begin') : button('접수 내역 확인하기','receipt');
    }
    main.innerHTML = content;
    actions.innerHTML = primary;
    actions.hidden = !primary;
    main.scrollTop = scroll;
    if (focus) main.focus({preventScroll:true});
    updateFog();
  }
  function example(id) {
    const doc = docById(id);
    const identity = /신분증|사원증/.test(doc.title);
    let entries;
    if (doc.id==='isa-income') entries = [['발급 용도','개인종합자산관리계좌 가입용'],['소득자','김키움'],['귀속연도','20XX년'],['총급여액','○○○원']];
    else if (doc.id==='renamed-id') entries = [['개명 후 성명','김키움'],['주민등록번호','○○○○○○-○○○○○○○'],['발급일','20XX.XX.XX']];
    else if (doc.id==='name-record') entries = [['변경 전 성명','김○○'],['변경 후 성명','김키움'],['주민등록번호','○○○○○○-○○○○○○○'],['발급일','20XX.XX.XX']];
    else if (identity) entries = [['성명','김키움'],['발급일','20XX.XX.XX'],['발급기관','○○ 기관']];
    else if (/거래|잔고|계좌개설/.test(doc.title)) entries = [['금융회사','○○ 증권'],['계좌 명의','김키움'],['거래 내역','상품명 · 기간 · 금액'],['발급일','20XX.XX.XX']];
    else if (/관계증명서/.test(doc.title)) entries = [['발급 대상','김키움'],['가족 사항','성명 · 관계'],['발급일','20XX.XX.XX']];
    else entries = [['성명 또는 법인명','김키움 / ○○ 법인'],['증빙 내용','업무별 확인 항목'],['작성일','20XX.XX.XX']];
    const portrait = identity ? '<div class="df-specimen-photo" aria-hidden="true"><svg viewBox="0 0 48 56"><circle cx="24" cy="17" r="8"/><path d="M7 48c0-20 34-20 34 0z"/></svg></div>' : '';
    const paper = '<figure class="df-specimen'+(identity?' is-id':'')+'" aria-label="'+esc(doc.title)+' 예시 문서"><span class="df-watermark" aria-hidden="true">예시</span><figcaption>'+esc(doc.title)+'</figcaption><div class="df-specimen-body">'+portrait+'<dl>'+rows(entries)+'</dl></div><div class="df-specimen-note">서류 확인용 예시</div></figure>';
    const notes = task.id === 'professional'
      ? [...doc.notes, '여러 장으로 발급된 서류는 모든 페이지가 선명하게 보이도록 첨부해 주세요.']
      : doc.notes;
    const guide = '<ul class="checklist">'+notes.map(note=>'<li>'+esc(note)+'</li>').join('')+'</ul>';
    showSheet(doc.title+' 예시',guide+paper+'<div class="sheet-actions">'+button('확인하기','close-sheet')+'</div>');
  }
  function methodSheet() {
    const methods = state.attachment.cameraOnly ? [['camera','카메라로 촬영하기']] : [['camera','카메라로 촬영하기'],['photo','사진에서 선택하기'],['file','파일에서 선택하기']];
    showSheet('첨부 방법 선택', methods.map(([id,name])=>'<button type="button" class="df-method" data-do="pick" data-id="'+id+'"><i class="df-icon-tile">'+icon(id)+'</i>'+name+'</button>').join(''));
  }
  function pick(method) {
    closeSheet();
    fileInput.value = '';
    fileInput.accept = method==='file' ? accept : 'image/jpeg,image/png,image/bmp';
    fileInput.multiple = method!=='camera';
    if (method==='camera') fileInput.setAttribute('capture','environment');
    else fileInput.removeAttribute('capture');
    fileInput.click();
  }
  function addFiles(files) {
    state.errors = [];
    for (const file of files) {
      const extension = file.name.split('.').pop().toLowerCase();
      const validExt = ['jpg','jpeg','png','bmp',...(state.attachment.cameraOnly?[]:['pdf'])].includes(extension);
      const validMime = !file.type || /^(image\/(jpeg|pjpeg|png|bmp|x-ms-bmp)|application\/pdf)$/i.test(file.type);
      if (!validExt || !validMime || !file.size || file.size>maxBytes) {
        state.errors.push(file.name+' 파일을 첨부할 수 없습니다. 파일 형식과 용량을 확인해 주세요.');
      } else if (state.draftFiles.length>=maxFiles) {
        state.errors.push('한 서류에는 파일을 10개까지 첨부할 수 있습니다.');
        break;
      } else {
        state.draftFiles.push({name:file.name,size:file.size});
      }
    }
    paint({keepScroll:true});
    if (state.errors.length) main.querySelector('[data-do="methods"]').focus();
  }
  function leaveFiles(save) {
    if (save) state.files.set(state.attachment.id,[...state.draftFiles]);
    state.page = 'register';
    const id = state.attachment.id;
    state.attachment = null; state.draftFiles = []; state.errors = [];
    paint();
    main.scrollTop = state.registrationScroll;
    main.querySelector('[data-do="upload"][data-id="'+CSS.escape(id)+'"]')?.focus({preventScroll:true});
  }
  function submit() {
    if (!canSubmit()) return;
    state.submittedTitles = requiredDocs().map(doc=>doc.title);
    state.receivedAt = new Date();
    state.status = 'received'; state.page = 'status';
    paint({focus:true});
  }
  function sample() {
    closeTools();
    if (state.page==='attachment') {
      const doc = state.attachment;
      addFiles([{name:doc.title+(doc.cameraOnly?'.jpg':'.pdf'),size:32768}]);
    } else {
      state.page = 'register';
      for (const doc of requiredDocs()) {
        if (!docFiles(doc).length) state.files.set(doc.id,[{name:doc.title+(doc.cameraOnly?'.jpg':'.pdf'),size:32768}]);
      }
      if (state.minor) {
        if (childError('childName')) state.childName = '김키움';
        if (childError('childAccount')) state.childAccount = '12345678';
      }
      paint({focus:true});
    }
    document.getElementById('df-feedback').textContent='현재 업무의 시연 서류를 채웠습니다.';
  }
  function resetForm() {
    closeSheet(); closeTools(); opener = null; fileInput.value = '';
    Object.assign(state, initialState());
    paint({focus:!service.hidden});
    document.getElementById('df-feedback').textContent='디지털폼 시연을 초기화했습니다.';
  }
  document.addEventListener('click', event => {
    const control = event.target.closest('[data-do]');
    if (!control || control.disabled || control.getAttribute('aria-disabled') === 'true') return;
    const {do:action,id,index} = control.dataset;
    switch(action) {
      case 'choose-task': {
        const next = catalog.find(item => item.id === id);
        if (!next) break;
        closeTools();
        if (next.id !== task?.id) {
          if (!switchView) {
            const url = new URL(location.href);
            url.searchParams.set('task', next.id);
            url.searchParams.delete('change');
            location.assign(url.href);
            break;
          }
          task = next;
          fileInput.value = '';
          opener = null;
          Object.assign(state, initialState());
          document.getElementById('df-feedback').textContent = '';
          paint();
        }
        main.focus({preventScroll:true});
        break;
      }
      case 'begin': state.page='register'; paint({focus:true}); break;
      case 'example': example(id); break;
      case 'close-sheet': closeSheet(); break;
      case 'upload':
        state.registrationScroll=main.scrollTop; state.attachment=docById(id);
        state.draftFiles=[...docFiles(state.attachment)]; state.errors=[]; state.page='attachment';
        paint({focus:true}); break;
      case 'methods': methodSheet(); break;
      case 'pick': pick(id); break;
      case 'save-files': leaveFiles(true); break;
      case 'delete-file': state.draftFiles.splice(Number(index),1); state.errors=[]; paint({keepScroll:true}); break;
      case 'clear-files': state.draftFiles=[]; state.errors=[]; paint({keepScroll:true}); break;
      case 'variants': showSheet('업무 유형 선택',task.variants.map(v=>'<button class="df-method" type="button" data-do="variant" data-id="'+esc(v.id)+'">'+esc(v.title)+(state.variant===v?icon('check'):'')+'</button>').join('')); break;
      case 'variant': state.variant=task.variants.find(v=>v.id===id); closeSheet(); paint({keepScroll:true}); main.querySelector('[data-do="variants"]').focus({preventScroll:true}); break;
      case 'submit': submit(); break;
      case 'receipt': showSheet('접수 내역','<h3>'+esc(task.title)+'</h3><dl class="df-summary">'+rows([receiptTime(),['제출 서류',state.submittedTitles.join(', ')],['처리 상태',statusLabels[state.status]]])+'</dl><div class="sheet-actions">'+button('확인하기','close-sheet')+'</div>'); break;
      case 'sample': sample(); break;
      case 'reset': resetForm(); break;
      case 'set-status':
        if (!state.receivedAt || !Object.hasOwn(statusLabels,id)) break;
        closeTools();
        state.status=id; state.page='status'; paint({focus:!desktop.matches}); break;
    }
  });
  main.addEventListener('change',event=>{
    const input = event.target;
    if (input.id==='df-minor') state.minor=input.checked;
    else if (input.dataset.group!==undefined) state.toggles.set(groupKey(groups()[input.dataset.group]),input.checked);
    else if (input.dataset.choice!==undefined) state.choices.set(groupKey(groups()[input.dataset.choice]),input.value);
    else return;
    const selector = input.id ? '#df-minor' : input.name ? 'input[name="'+input.name+'"]:checked' : '[data-group="'+input.dataset.group+'"]';
    paint({keepScroll:true}); main.querySelector(selector)?.focus({preventScroll:true});
  });
  main.addEventListener('input',event=>{
    const input = event.target, key = input.dataset.child;
    if (!key) return;
    state[key] = input.value;
    state.editedChildFields.add(key);
    const message = childError(key);
    const error = document.getElementById(input.id+'-error');
    if (error.textContent !== message) error.textContent = message;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    } else {
      input.removeAttribute('aria-invalid');
    }
    actions.querySelector('button').disabled=!canSubmit();
  });
  fileInput.addEventListener('change',()=>{ if(state.attachment) addFiles(fileInput.files); fileInput.value=''; });
  sheet.addEventListener('click',event=>{ if (event.target===sheet) closeSheet(); });
  attachmentClose.addEventListener('click',()=>leaveFiles(false));
  if (switchView) {
    const ars = document.getElementById('service-viewport');
    const skip = document.querySelector('.skip-link');
    let arsScroll = 0;
    function togglePreview() {
      const opening = service.hidden;
      closeTools();
      if (opening) arsScroll = window.ARSViewport.scrollY;
      ars.hidden = opening;
      service.hidden = !opening;
      document.body.classList.toggle('df-preview', opening);
      skip.href = opening ? '#df-main' : '#main';
      switchView.textContent = opening ? '디지털 ARS 목업 보기' : '디지털폼 목업 보기';
      if (opening) {
        window.scrollTo(0, 0);
        resize();
        main.focus({preventScroll:true});
      } else {
        window.ARSViewport.refresh();
        window.ARSViewport.scrollTo(0, arsScroll);
        const arsMain = ars.querySelector('main');
        if (arsMain) { arsMain.tabIndex = -1; arsMain.focus({preventScroll:true}); }
      }
    }
    switchView.addEventListener('click', togglePreview);
    tools.querySelector('[data-action="reset"]').addEventListener('click', () => {
      task = defaultTask;
      resetForm();
    });
  }
  desktop.addEventListener('change',layout);
  new ResizeObserver(resize).observe(display);
  main.addEventListener('scroll',updateFog,{passive:true});
  window.visualViewport?.addEventListener('scroll',updateFog,{passive:true});
  window.visualViewport?.addEventListener('resize',updateFog);
  layout();
  paint();
})();
