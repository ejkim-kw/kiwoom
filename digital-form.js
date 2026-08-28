(function(root,factory){
  if(typeof module==='object'&&module.exports) module.exports=factory();
  else root.DigitalForm=factory();
})(typeof self!=='undefined'?self:this,function(){
  const STATUSES=[
    {id:'received',label:'접수완료'},
    {id:'processing',label:'처리중'},
    {id:'supplementRequested',label:'보완요청'},
    {id:'supplementing',label:'보완중'},
    {id:'completed',label:'처리완료'}
  ];
  const ALL_METHODS=['camera','file','gallery'];
  function documentGuide(description,notes,checks,sample,showFullRrn){
    return {title:'서류안내',description,notes,checks,sample,showFullRrn:!!showFullRrn};
  }
  const GUIDES={
    guardianId:documentGuide('법정대리인 본인 여부를 확인하는 신분증 원본이에요.',['주민등록증 또는 운전면허증 실물을 준비해 주세요.','빛 반사 없이 신분증의 네 모서리가 모두 보이게 촬영해 주세요.','스캔본·사본·화면 캡처 이미지는 처리할 수 없어요.'],['성명','사진','발급기관'],'assets/identity-card-sample.svg'),
    family:documentGuide('미성년자와 법정대리인의 가족관계를 확인하는 증명서예요.',['미성년자 본인을 기준으로 발급해 주세요.','발급일로부터 3개월 이내 서류만 사용할 수 있어요.','법정대리인과의 관계가 확인되도록 상세로 발급해 주세요.'],['발급대상자','가족관계','발급일자'],'assets/family-relation-sample.svg'),
    corporateAuth:documentGuide('법인대표자가 대리인에게 업무를 위임한 사실을 확인하는 서류예요.',['위임장과 법인인감증명서를 한 항목에 함께 첨부해 주세요.','위임장에 법인인감이 날인되어 있는지 확인해 주세요.','법인명과 대표자명이 두 서류에서 일치해야 해요.'],['법인명','위임업무','법인인감'],'assets/corporate-authorization-sample.svg'),
    employment:documentGuide('대리인이 해당 법인에 재직 중임을 확인하는 증명서예요.',['신청 당일 발급된 재직증명서를 첨부해 주세요.','법인명·성명·재직상태가 선명하게 보여야 해요.','발급 담당자 또는 직인이 포함되어야 해요.'],['법인명','성명','발급일자'],'assets/employment-certificate-sample.svg'),
    requestLetter:documentGuide('법인이 금융거래 업무를 공식적으로 요청한 공문이에요.',['법인 명의의 문서번호와 시행일자가 표시되어야 해요.','요청 업무와 대상 계좌가 명확하게 기재되어야 해요.','법인 직인 또는 담당자 확인정보가 필요해요.'],['문서번호','요청업무','법인직인'],'assets/financial-request-sample.svg'),
    employeeCard:documentGuide('대리인의 소속과 재직 여부를 확인하는 사원증이에요.',['사원증 앞면 전체가 한 화면에 보이게 촬영해 주세요.','회사명·성명·사진을 가리지 말아 주세요.','유효기간이 있다면 만료 여부를 확인해 주세요.'],['회사명','성명','사진'],'assets/employee-card-sample.svg'),
    identity:documentGuide('고객 본인 여부를 확인하는 신분증 원본이에요.',['주민등록증 또는 운전면허증 실물을 직접 촬영해 주세요.','빛 반사 없이 글자와 사진이 선명해야 해요.','스캔본·캡처본은 처리할 수 없어요.'],['성명','사진','발급기관'],'assets/identity-card-sample.svg'),
    renamedId:documentGuide('개명 후 이름을 확인할 수 있는 신분증 원본이에요.',['개명 후 신분증 또는 유효기간 한 달 이내 임시신분증을 준비해 주세요.','주민등록번호 뒷자리가 모두 표시되어야 해요.','스캔본·캡처본은 처리할 수 없어요.'],['개명 후 성명','주민등록번호 전체','유효기간'],'assets/rename-id-sample.svg',true),
    residentAbstract:documentGuide('개명 전·후 성명 변경 이력을 확인하는 주민등록초본이에요.',['90일 이내 발급분이며 변경 전 이름이 표시되어야 해요.','개인인적사항 변경내용을 포함하고 발급기관 직인이 있어야 해요.','주민등록번호 뒷자리가 모두 표시되어야 하며 열람용은 처리할 수 없어요.'],['성명 변경이력','주민등록번호 전체','발급일자'],'assets/resident-register-abstract-sample.svg',true),
    income:documentGuide('ISA 서민형 가입 자격을 확인하기 위해 국세청 홈택스에서 발급하는 서류예요.',['발급 용도는 ‘개인종합자산관리계좌 가입용’을 선택해 주세요.','프린터 출력용으로 2매 모두 첨부해 주세요.','열람용 화면이나 미리보기 이미지는 처리할 수 없어요.'],['발급 용도','귀속연도','총급여액'],'assets/income-certificate-sample.svg'),
    financeLicense:documentGuide('사전교육 이수 면제 대상 금융자격을 확인하는 증빙이에요.',['투자자산운용사·금융투자분석사·재무위험관리사·CFA·FRM 등이 가능해요.','성명·자격명·자격번호가 선명하게 보여야 해요.','유효기간이 있는 자격은 만료 여부를 확인해 주세요.'],['성명','자격명','자격번호'],'assets/financial-license-sample.svg'),
    industryProof:documentGuide('금융자격과 금융투자회사 경력 1년 이상을 함께 확인하는 증빙이에요.',['금융자격증과 경력증명서를 함께 첨부해 주세요.','경력증명서에 회사명·근무기간·담당업무가 표시되어야 해요.','두 서류의 성명이 동일해야 해요.'],['금융자격','근무기간','담당업무'],'assets/finance-employment-proof-sample.svg'),
    tradingConfirmation:documentGuide('타 금융회사에서의 거래 경험을 확인하는 거래확인서예요.',['발급일로부터 1개월 이내 서류를 첨부해 주세요.','하단에 고객의 자필서명이 반드시 있어야 해요.','회사명·거래상품·거래기간이 선명해야 해요.'],['발급일자','거래상품','자필서명'],'assets/trading-confirmation-sample.svg'),
    derivativesConfirmation:documentGuide('기본예탁금 유형을 확인할 수 있는 파생상품 거래확인서예요.',['발급 금융회사와 고객 성명이 표시되어야 해요.','기본예탁금 유형이 반드시 기재되어 있어야 해요.','문서 전체와 발급일자가 선명하게 보여야 해요.'],['기본예탁금 유형','발급회사','발급일자'],'assets/derivatives-confirmation-sample.svg')
    ,other:documentGuide('업무 처리에 참고할 서류를 자유롭게 첨부할 수 있어요.',['사진 또는 PDF 등 준비한 양식을 첨부해 주세요.','서류는 최대 10개까지 추가할 수 있어요.','글자와 문서 전체가 선명하게 보이는지 확인해 주세요.'],['최대 10개','사진·파일 가능'],'assets/generic-attachment-sample.svg')
  };
  const TASKS={
    minor:{category:'업무',title:'미성년자 업무처리 (대리인)',requirementMode:'all',guide:'법정대리인 확인을 위해 아래 서류를 모두 첨부해 주세요.',docs:[
      {name:'법정대리인 신분증',description:'주민등록증 또는 운전면허증 원본을 촬영해 주세요. 실물 촬영만 가능하며 스캔본·사본은 처리할 수 없어요.',methods:['camera'],guide:GUIDES.guardianId},
      {name:'가족관계증명서',description:'미성년자 기준으로 최근 3개월 이내 발급된 서류가 필요해요. 법정대리인 관계가 확인되어야 해요.',methods:ALL_METHODS,guide:GUIDES.family}
    ]},
    corporate:{category:'업무',title:'법인계좌 업무처리 (대리인)',requirementMode:'any',guide:'아래 네 가지 증빙 중 제출 가능한 서류 1개를 선택해 첨부해 주세요.',docs:[
      {name:'법인대표자의 위임장 및 법인인감증명서',description:'법인대표자의 위임장과 법인인감증명서를 함께 첨부해 주세요.',methods:ALL_METHODS,guide:GUIDES.corporateAuth},
      {name:'재직증명서',description:'신청 당일 발급된 재직증명서가 필요해요.',methods:ALL_METHODS,guide:GUIDES.employment},
      {name:'금융거래 요청 공문',description:'법인 명의로 작성된 금융거래 요청 공문을 첨부해 주세요.',methods:ALL_METHODS,guide:GUIDES.requestLetter},
      {name:'사원증',description:'소속 법인과 본인 이름을 확인할 수 있는 사원증을 첨부해 주세요.',methods:ALL_METHODS,guide:GUIDES.employeeCard}
    ]},
    identity:{category:'업무',title:'본인확인용',requirementMode:'all',guide:'본인 확인을 위해 신분증 원본을 직접 촬영해 주세요.',docs:[
      {name:'신분증',description:'주민등록증 또는 운전면허증 실물을 촬영해 주세요. 스캔본·캡처본은 처리할 수 없어요.',methods:['camera'],guide:GUIDES.identity}
    ]},
    rename:{category:'업무',title:'개명',requirementMode:'all',guide:'개명 사실 확인과 계좌 명의 변경을 위해 아래 서류를 모두 첨부해 주세요.',docs:[
      {name:'신분증 원본',description:'개명 후 신분증 또는 유효기간 한 달 이내 임시신분증 중 하나를 촬영해 주세요. 주민번호 뒷자리가 표시되어야 하며 스캔본·캡처본은 처리할 수 없어요.',methods:['camera'],guide:GUIDES.renamedId},
      {name:'주민등록초본',description:'90일 이내 발급분으로 변경 전 이름·주민번호 뒷자리·직인이 표시되어야 해요. 개인인적사항 변경내용을 체크해 발급해 주세요. PDF·스캔·캡처본은 가능하지만 열람용·미리보기 화면은 처리할 수 없어요.',methods:ALL_METHODS,guide:GUIDES.residentAbstract}
    ]},
    isa:{category:'금융상품',title:'ISA 서민형 증빙서류 제출',requirementMode:'all',guide:'서민형 가입 자격 확인을 위해 아래 서류를 첨부해 주세요.',docs:[
      {name:'소득확인증명서',description:'개인종합자산관리계좌 가입용으로 국세청 홈택스에서 프린터 출력용 2매를 발급해 첨부해 주세요.',methods:ALL_METHODS,guide:GUIDES.income}
    ]},
    futuresQualified:{category:'선물옵션',title:'선물옵션 적격투자자',requirementMode:'any',guide:'해당되는 자격 증빙 중 1개 이상을 첨부해 주세요.',docs:[
      {name:'금융자격증',description:'투자자산운용사·금융투자분석사·재무위험관리사·CFA·FRM 등의 자격증을 제출하면 사전교육 이수가 면제돼요.',methods:ALL_METHODS,guide:GUIDES.financeLicense},
      {name:'금융투자업계종사자 증빙',description:'금융자격증과 금융투자회사 업무경력 1년 이상을 함께 확인할 수 있어야 해요. 사전교육 및 모의투자 이수가 면제돼요.',methods:ALL_METHODS,guide:GUIDES.industryProof},
      {name:'타사 거래확인서',description:'1개월 이내 발급된 서류로 하단에 자필서명이 필요해요. 사전교육 및 모의투자 이수가 면제돼요.',methods:ALL_METHODS,guide:GUIDES.tradingConfirmation}
    ]},
    leverageEtp:{category:'국내주식',title:'레버리지ETP 적격투자자',requirementMode:'all',guide:'적격투자자 등록을 위해 거래확인서를 첨부해 주세요.',docs:[
      {name:'타사 거래확인서',description:'1개월 이내 발급된 서류로 하단에 자필서명이 필요해요.',methods:ALL_METHODS,guide:GUIDES.tradingConfirmation}
    ]},
    overseasLeverageEtp:{category:'해외주식',title:'해외레버리지ETP 적격투자자',requirementMode:'all',guide:'적격투자자 등록을 위해 거래확인서를 첨부해 주세요.',docs:[
      {name:'타사 거래확인서',description:'1개월 이내 발급된 서류로 하단에 자필서명이 필요해요.',methods:ALL_METHODS,guide:GUIDES.tradingConfirmation}
    ]},
    futuresDeposit:{category:'선물옵션',title:'선물옵션 기본예탁금 전입',requirementMode:'all',guide:'기본예탁금 전입을 위해 거래확인서를 첨부해 주세요.',docs:[
      {name:'파생상품 거래확인서',description:'기본예탁금 유형이 기재된 거래확인서가 필요해요.',methods:ALL_METHODS,guide:GUIDES.derivativesConfirmation}
    ]},
    other:{category:'업무',title:'기타',detailTitle:'서류를 첨부해주세요',requirementMode:'any',maxAttachments:10,guide:'어떤 양식이든 최대 10개까지 첨부할 수 있어요.',docs:[
      {name:'서류 첨부',description:'사진 또는 파일 형식의 서류를 자유롭게 첨부해 주세요.',methods:ALL_METHODS,guide:GUIDES.other}
    ]}
  };
  function categoryClass(category){
    return {업무:'business',금융상품:'finance',선물옵션:'futures',국내주식:'domestic',해외주식:'overseas'}[category]||'business';
  }
  function requirementLabel(task){
    if(!task || task.docs.length<=1) return '';
    return task.requirementMode==='any'?'아래 서류 중 1개만 선택':'아래 서류 모두 필요';
  }
  function createSession(taskId,requiredCount,requirementMode){
    return {taskId,documents:Array(Math.max(0,requiredCount||0)).fill(null),requirementMode:requirementMode||'all',status:'draft',receiptNo:'',submittedAt:''};
  }
  function attachDocument(session,index,method){
    if(!session || !['camera','file','gallery'].includes(method) || index<0 || index>=session.documents.length) return session;
    const documents=session.documents.slice();
    documents[index]={method,attached:true};
    return {...session,documents};
  }
  function canSubmit(session){
    if(!session || !session.documents.length) return false;
    return session.requirementMode==='any'
      ? session.documents.some(x=>x&&x.attached)
      : session.documents.every(x=>x&&x.attached);
  }
  function attachDemoDocuments(session){
    if(!session) return session;
    const task=TASKS[session.taskId];
    if(!task) return session;
    const limit=session.requirementMode==='any'?1:session.documents.length;
    let next=session;
    for(let index=0;index<limit;index++){
      const method=(task.docs[index]&&task.docs[index].methods&&task.docs[index].methods[0])||'file';
      next=attachDocument(next,index,method);
    }
    return next;
  }
  function visibleAttachmentCount(session,maxAttachments){
    if(!session) return 0;
    const attached=session.documents.filter(Boolean).length;
    return Math.min(maxAttachments||session.documents.length,Math.max(1,attached+1));
  }
  function submit(session){
    if(!canSubmit(session)) return {session,error:'필수 서류를 모두 첨부해 주세요.'};
    const now=new Date();
    const date=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('');
    const receiptNo=`DF-${date}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`;
    return {session:{...session,status:'received',receiptNo,submittedAt:now.toLocaleString('ko-KR')},error:''};
  }
  return {STATUSES,TASKS,categoryClass,requirementLabel,createSession,attachDocument,attachDemoDocuments,visibleAttachmentCount,canSubmit,submit};
});
