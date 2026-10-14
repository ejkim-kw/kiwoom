(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.V48Documents=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function localDate(now=new Date()){
    return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  }
  function createDraft(documentName,contact='',profile={}){
    return {documentName,date:localDate(),startDate:'',endDate:'',language:'국문',englishName:'',purpose:documentName==='잔고증명서'?'비자발급':'',otherPurpose:'',copies:'1',contact,disclosure:'일부',delivery:'이메일신청',email:String(profile.email||'').trim(),address:String(profile.deliveryAddress??profile.address??'').trim()};
  }
  function validate(draft,document,today=localDate()){
    const value={...draft};
    for(const key of Object.keys(value))if(typeof value[key]==='string')value[key]=value[key].trim();
    const fail=(field,error)=>({field,error});
    const validDate=date=>/^\d{4}-\d{2}-\d{2}$/.test(date||'')&&!Number.isNaN(Date.parse(date))&&new Date(date).toISOString().slice(0,10)===date;
    if(document.mode==='date'&&(!validDate(value.date)||value.date>today))return fail('date','오늘 또는 이전 날짜로 기준일을 선택해주세요.');
    if(document.mode==='period'){
      if(!validDate(value.startDate))return fail('startDate','조회 시작일을 선택해주세요.');
      if(!validDate(value.endDate)||value.endDate<value.startDate||value.endDate>today)return fail('endDate','시작일부터 오늘 사이의 종료일을 선택해주세요.');
    }
    if(!value.purpose)return fail('purpose','용도를 입력해주세요.');
    if(!/^[1-9]\d*$/.test(value.copies||''))return fail('copies','신청매수를 1매 이상 입력해주세요.');
    if(document.name==='잔고증명서'){
      if(!['국문','영문'].includes(value.language))return fail('language','신청구분을 선택해주세요.');
      if(value.language==='영문'&&!value.englishName)return fail('englishName','영문명을 입력해주세요.');
      if(value.language==='국문')value.englishName='';
      if(!['비자발급','기타'].includes(value.purpose))return fail('purpose','용도를 선택해주세요.');
      if(value.purpose==='기타'&&!value.otherPurpose)return fail('otherPurpose','기타 용도를 직접 입력해주세요.');
      if(value.purpose!=='기타')value.otherPurpose='';
      if(!/^0\d{8,10}$/.test(value.contact.replace(/[\s-]/g,'')))return fail('contact','연락처를 확인해주세요.');
      if(!['일부','전체'].includes(value.disclosure))return fail('disclosure','고객정보공개 범위를 선택해주세요.');
      if(!['이메일신청','우편신청'].includes(value.delivery))return fail('delivery','수령방법을 선택해주세요.');
      if(value.delivery==='이메일신청'){
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))return fail('email','이메일주소를 확인해주세요.');
        value.address='';
      }else{
        if(!value.address)return fail('address','수령처주소를 입력해주세요.');
        value.email='';
      }
    }
    return {error:'',request:{...value,documentName:document.name,mode:document.mode,appliedAt:today.replaceAll('-','.'),issuedAt:'',status:'처리중'}};
  }
  function summaryRows(request){
    const date=value=>(value||'').replaceAll('-','.');
    const rows=[['서류명',request.documentName],['처리상태',request.status||'처리중'],['신청일',request.appliedAt],['발급일',request.issuedAt||'']];
    if(request.mode==='date')rows.push(['기준일',date(request.date)]);
    else rows.push(['조회기간',`${date(request.startDate)} ~ ${date(request.endDate)}`]);
    if(request.documentName==='잔고증명서'){
      rows.push(['신청구분',request.language]);
      if(request.language==='영문')rows.push(['영문명',request.englishName]);
    }
    rows.push(['용도',request.purpose==='기타'?`기타 · ${request.otherPurpose}`:request.purpose],['신청매수',`${request.copies}매`]);
    if(request.documentName==='잔고증명서')rows.push(['연락처',request.contact],['고객정보공개',request.disclosure],['수령방법',request.delivery],request.delivery==='이메일신청'?['이메일주소',request.email]:['수령처주소',request.address]);
    return rows;
  }
  return {localDate,createDraft,validate,summaryRows};
});
