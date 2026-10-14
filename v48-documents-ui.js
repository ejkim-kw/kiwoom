/* Ver 4.8 document requests stay in this prototype session; nothing is sent externally. */
const v48SubmittedDocuments=[];
function v48DocumentStatusItem(request){
  return {n:request.documentName,st:request.status,stc:'wait',d:`${request.appliedAt} 신청 · 접수 완료`,re:false,appliedAt:request.appliedAt,issuedAt:request.issuedAt,request};
}
function renderV48CertificateCard(item,detailId,expanded=false){
  const [, ...progress]=(item.d||'').split(' · ');
  const rows=item.request?V48Documents.summaryRows(item.request):[['서류명',item.n],['처리상태',item.st],['신청일',item.appliedAt],['발급일',item.stc==='done'?item.issuedAt:''],['진행내용',progress.join(' · ')||item.st]];
  return `<article class="iod-v45-card v48-cert-item${expanded?' is-expanded':''}">
    <button type="button" class="v48-cert-card-toggle" data-v48-cert-detail="${detailId}" aria-expanded="${expanded}" aria-controls="${detailId}" aria-label="${v47Esc(item.n)} 상세내용 ${expanded?'접기':'펼치기'}"></button>
    <div class="v48-cert-summary"><time class="v48-cert-date" datetime="${item.appliedAt.replaceAll('.','-')}">${v47Esc(item.appliedAt)}</time><span class="v48-cert-separator" aria-hidden="true">·</span><h3 class="v48-cert-name" title="${v47Esc(item.n)}">${v47Esc(item.n)}</h3><span class="iod-badge v48-cert-badge ${item.stc}">${v47Esc(item.st)}</span></div>
    <dl id="${detailId}" class="v48-cert-detail"${expanded?'':' hidden'}>${rows.map(([label,value])=>`<div class="v45-kv-row"><dt class="v45-kv-k">${v47Esc(label)}</dt><dd class="v45-kv-v">${v47Esc(value)}</dd></div>`).join('')}</dl>
  </article>`;
}
function renderV48DocumentForm(state){
  const doc=V47Untact.getDocuments(state).find(item=>item.name===state.selectedDocument);
  const balance=doc.name==='잔고증명서';
  const registered=V48Documents.createDraft(doc.name,V48_DEMO_INBOUND_PHONE,V47MyInfo.DATA.accountProfile);
  if(state.v48DocumentDraft?.documentName!==doc.name)state.v48DocumentDraft=registered;
  Object.assign(state.v48DocumentDraft,{email:registered.email,address:registered.address});
  const draft=state.v48DocumentDraft,today=V48Documents.localDate();
  const input=(name,label,type='text',extra='',hidden=false)=>`<div class="v48-document-field" data-document-row="${name}"${hidden?' hidden':''}><label for="v48Doc-${name}">${label}</label>${name==='copies'?'<div class="v48-document-number">':''}<input id="v48Doc-${name}" name="${name}" type="${type}" value="${v47Esc(draft[name])}" ${extra}${hidden?' disabled':''}>${name==='copies'?'<span>매</span></div>':''}</div>`;
  const select=(name,label,options)=>`<label class="v48-document-field"><span>${label}</span><select name="${name}" aria-label="${label}">${options.map(option=>`<option${draft[name]===option?' selected':''}>${option}</option>`).join('')}</select></label>`;
  const segmented=(name,label,options)=>`<div class="v48-document-field v48-document-segment-row"><span id="v48Doc-${name}-label">${label}</span><div class="v48-document-segments" role="group" aria-labelledby="v48Doc-${name}-label">${options.map(option=>`<label><input type="radio" name="${name}" value="${option}"${draft[name]===option?' checked':''}><span>${option}</span></label>`).join('')}</div></div>`;
  const recipient=(name,label,hidden)=>`<div class="v48-document-field" data-document-row="${name}"${hidden?' hidden':''}><span>${label}</span><p class="v48-document-registered-value">${v47Esc(draft[name])||'등록된 정보가 없어요.'}</p></div>`;
  const date=doc.mode==='date'?input('date','기준일','date',`max="${today}"`):input('startDate','시작일','date',`max="${today}"`)+input('endDate','종료일','date',`max="${today}"`);
  const fields=balance?`
    <p class="v48-document-notice">※ 기준일을 당일로 신청한 경우 당일 출금(고)가 제한됩니다.</p>
    ${date}${select('language','신청구분',['국문','영문'])}
    ${input('englishName','영문명','text','placeholder="직접입력" autocomplete="off"',draft.language!=='영문')}
    ${select('purpose','용도',['비자발급','기타'])}
    ${input('otherPurpose','기타 입력','text','placeholder="직접입력"',draft.purpose!=='기타')}
    ${input('copies','신청매수','number','min="1" step="1" inputmode="numeric" aria-label="신청매수 (매)"')}
    ${input('contact','연락처','tel','placeholder="숫자 입력" autocomplete="tel"')}
    ${segmented('disclosure','고객정보공개',['일부','전체'])}
    ${segmented('delivery','수령방법',['이메일신청','우편신청'])}
    ${recipient('email','이메일주소',draft.delivery!=='이메일신청')}
    ${recipient('address','수령처주소',draft.delivery!=='우편신청')}`:
    `${date}${input('purpose','용도','text','placeholder="예: 금융기관 제출"')}${input('copies','신청매수','number','min="1" step="1" inputmode="numeric" aria-label="신청매수 (매)"')}`;
  return `<div class="v45-authpage v48-document-page">${v47UntactTop(state)}<div class="iod-v45-body">
    <div class="toss-dhead"><h2 class="td-title">신청 정보를 입력해주세요.</h2><p class="td-desc">${v47Esc(doc.name)} 발급에 필요한 정보에요.</p></div>
    <form data-v48-document-form novalidate><div class="v48-document-form-card">${fields}</div><p class="v48-document-error" id="v48DocumentError" role="alert" hidden></p><button type="submit" class="v48-auth-button v48-lookup-action"${V48Documents.validate(draft,doc).error?' disabled':''}>신청</button></form>
  </div></div>`;
}
function v48MountDocumentForm(root){
  if(!isV48())return;
  root.querySelector('[data-v48-document-home]')?.addEventListener('click',()=>{s1state.v47Untact=null;v48GoHome();});
  const form=root.querySelector('[data-v48-document-form]');if(!form)return;
  const state=s1state.v47Untact,doc=V47Untact.getDocuments(state).find(item=>item.name===state.selectedDocument);
  const save=()=>{
    for(const field of form.querySelectorAll('input[name],select[name],textarea[name]')){
      if(field.type==='radio'&&!field.checked)continue;
      state.v48DocumentDraft[field.name]=field.value;
    }
  };
  const sync=()=>{
    save();
    const draft=state.v48DocumentDraft;
    for(const [name,visible] of [['englishName',draft.language==='영문'],['otherPurpose',draft.purpose==='기타'],['email',draft.delivery==='이메일신청'],['address',draft.delivery==='우편신청']]){
      const row=form.querySelector(`[data-document-row="${name}"]`);if(!row)continue;
      row.hidden=!visible;
      const input=row.querySelector('input,textarea');if(input)input.disabled=!visible;
    }
    const result=V48Documents.validate(draft,doc);
    form.querySelector('[type="submit"]').disabled=!!result.error;
    if(!result.error){form.querySelector('.v48-document-error').hidden=true;form.querySelectorAll('[aria-invalid]').forEach(field=>field.removeAttribute('aria-invalid'));}
  };
  form.addEventListener('input',sync);
  form.addEventListener('change',sync);
  form.addEventListener('submit',event=>{
    event.preventDefault();sync();
    const result=V48Documents.validate(state.v48DocumentDraft,doc);
    const error=form.querySelector('.v48-document-error');
    form.querySelectorAll('[aria-invalid]').forEach(field=>field.removeAttribute('aria-invalid'));
    if(result.error){
      error.hidden=false;error.textContent=result.error;
      const field=form.querySelector(`[name="${result.field}"]`);
      field?.setAttribute('aria-invalid','true');
      (field?.hidden?field.nextElementSibling:field)?.focus();
      error.scrollIntoView({block:'nearest'});return;
    }
    const request={...result.request,accountId:v48Session.accountId};
    v48SubmittedDocuments.push(v48DocumentStatusItem(request));
    s1state.v47Untact={...state,request,step:'complete',completed:true};renderS1();
  });
  sync();
}
function renderV48DocumentDone(state){
  return `<div class="v45-authpage v48-document-page v48-document-complete">${v47UntactTop(state)}<div class="iod-v45-body">
    <div class="toss-dhead"><h2 class="td-title">서류 신청이 완료됐어요</h2><p class="td-desc">${v47Esc(state.selectedDocument)} 신청내역을 확인해주세요.</p></div>
    ${renderV48CertificateCard(v48DocumentStatusItem(state.request),'v48DocumentCompleteDetail',true)}
    <div class="v48-auth-actions v48-document-actions">
      <button type="button" class="v48-auth-button v48-lookup-action" data-v48-document-home>확인</button>
      <button type="button" class="v48-auth-button secondary" data-v48self="self-2">신청내역조회</button>
    </div>
  </div></div>`;
}
