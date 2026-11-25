// 업무와 필요서류는 2026-11-24 공개 디지털폼의 업무 목록 및 서류 안내를 기준으로 구성했다.
// https://ejkim-kw.github.io/kiwoom/
(function () {
  function documentItem(id, title, hint, notes, cameraOnly = false) {
    return { id, title, hint, notes, cameraOnly };
  }
  function all(title, documents) {
    return { title, documents };
  }
  function conditional(title, toggleLabel, documents, defaultOn = false) {
    return { title, toggleLabel, defaultOn, documents };
  }
  const tradingRecord = documentItem('trading-record', '타사 거래확인서',
    '최근 1개월 이내 발급한 확인서에 자필로 서명해 주세요.',
    ['최근 한 달 안에 발급받은 확인서를 준비해 주세요. 발급 회사와 상품명, 거래기간이 보여야 합니다.',
      '확인서 아래에 직접 서명한 후 첨부해 주세요.']);
  const minorGroup = all('법정대리인 확인 서류', [
    documentItem('guardian-id', '법정대리인 신분증', '주민등록증 또는 운전면허증 원본을 촬영해 주세요.',
      ['법정대리인의 실물 신분증(주민등록증 또는 운전면허증)을 직접 촬영해 주세요. 사본이나 화면 캡처는 접수할 수 없습니다.',
        '가장자리 네 곳이 사진에 들어오고, 이름·얼굴 사진·발급기관이 빛에 가리지 않아야 합니다.'], true),
    documentItem('minor-family', '가족관계증명서', '미성년자 기준으로 최근 3개월 이내 발급한 상세 증명서입니다.',
      ['미성년 자녀를 발급 대상자로 선택하고 증명서 종류는 ‘상세’로 발급해 주세요.',
        '최근 3개월 이내 발급본에서 자녀와 법정대리인의 관계가 확인되어야 합니다.'])
  ]);
  const futuresProofs = {
    title: '제출할 증빙서류 선택', chooseOne: true, documents: [
      documentItem('finance-license', '금융자격증', '금융자격 보유를 증명하는 서류입니다.',
        ['사전교육 면제 자격에는 투자자산운용사, 금융투자분석사, 재무위험관리사, CFA, FRM 등이 있습니다.',
          '보유자 이름과 자격명·자격번호가 보이게 첨부해 주세요. 유효기간이 있으면 만료 전인지 확인해 주세요.']),
      documentItem('industry-career', '금융투자업계 종사자 증빙', '금융자격증과 금융투자회사 경력증명서를 함께 첨부해 주세요.',
        ['금융자격증과 금융투자회사 경력증명서를 모두 첨부해 주세요. 두 서류의 이름이 같아야 합니다.',
          '경력증명서에 회사명과 담당 업무, 1년 이상의 근무기간이 표시되어야 합니다.']),
      tradingRecord
    ]
  };
  const familyProof = documentItem('relationship', '가족관계증명서 또는 혼인관계증명서',
    '최근 90일 이내 발급된 증명서 중 하나를 준비해 주세요.',
    ['가족관계증명서 또는 혼인관계증명서 중 해당하는 서류 한 가지를 첨부해 주세요. 발급일은 최근 90일 이내여야 합니다.']);
  const spouseProofs = [
    documentItem('spouse-consent', '배우자 개인(신용)정보 동의서', '배우자의 수집·이용 및 제공 동의서입니다.',
      ['부부합산으로 신청할 때 배우자 명의의 개인(신용)정보 수집·이용 및 제공동의서를 첨부해 주세요.']),
    documentItem('spouse-id', '배우자 신분증', '합산 대상인 배우자의 신분증입니다.',
      ['소득이나 자산을 함께 산정할 배우자 명의의 신분증을 준비해 주세요.'])
  ];
  const personalIncome = documentItem('personal-income', '본인 소득금액증명원',
    '국세청 홈택스에서 본인 기준으로 발급해 주세요.',
    ['국세청 홈택스에서 신청인 명의로 ‘소득금액증명’을 발급해 주세요. ISA 가입용 소득확인증명서와 구분해 주세요.']);
  const professionalVariants = [
    { id: 'income-self', title: '소득 · 본인 연소득', groups: [all('본인 소득 증빙', [personalIncome])] },
    { id: 'income-couple', title: '소득 · 부부합산 연소득', groups: [all('부부합산 소득 증빙', [
      personalIncome, documentItem('spouse-income', '배우자 소득금액증명원', '배우자 기준으로 홈택스에서 발급해 주세요.',
        ['부부합산으로 신청하면 홈택스에서 발급한 배우자 명의의 소득금액증명원도 필요합니다. 본인 서류와 각각 첨부해 주세요.']), familyProof, ...spouseProofs
    ])] }
  ];
  const qualifications = [
    ['accountant', '공인회계사', '등록증서', '한국공인회계사회 발급 · 유효기간 이내'],
    ['appraiser', '감정평가사', '등록증서', '한국감정평가사협회 발급 · 유효기간 이내'],
    ['tax-accountant', '세무사', '등록증서', '한국세무사회가 발급한 유효한 등록증서를 준비해 주세요.', '세무사 자격증으로는 등록 여부를 확인할 수 없습니다.'],
    ['lawyer', '변호사', '변호사 신분증', '대한변호사협회 발급 신분증의 앞면과 뒷면을 첨부해 주세요.', '협회의 등록증명원은 제출 서류로 인정되지 않습니다.'],
    ['patent-attorney', '변리사', '등록증서', '대한변리사회가 발급한 등록증서입니다.'],
    ['investment-manager', '투자자산운용사', '자격시험 합격증', '금융투자협회 자격시험센터 발급 · 최근 90일 이내'],
    ['investment-analyst', '금융투자분석사', '자격시험 합격증', '금융투자협회 자격시험센터 발급 · 최근 90일 이내'],
    ['domestic-risk', '국내 재무위험관리사', '자격시험 합격증', '금융투자협회 자격시험센터 발급 · 최근 90일 이내'],
    ['international-risk', '국제 재무위험관리사', '합격증서', 'GARP가 발급한 국제 재무위험관리사 합격증서입니다.']
  ];
  for (const [id, profession, proof, hint, exception] of qualifications) {
    const notes = [hint, exception].filter(Boolean);
    const documents = [documentItem(id + '-proof', proof, hint, notes)];
    if (id === 'investment-manager' || id === 'investment-analyst') {
      documents.push(documentItem('investment-registration', '금융투자전문인력등록확인서',
        '금융투자협회에서 등록이력 1년 이상을 확인할 수 있어야 합니다.',
        ['금융투자협회가 발급한 확인서에 전문인력 등록이력이 1년 이상 표시되어야 합니다.']));
    }
    const careerHint = id === 'accountant' || id === 'appraiser'
      ? '협회 발급분은 인정되지 않습니다. 해당 분야에서 1년 이상 근무한 경력을 확인해 주세요.'
      : '해당 분야에서 1년 이상 근무한 경력을 확인할 수 있어야 합니다.';
    documents.push(documentItem(id + '-career', '경력증명서', careerHint,
      [profession + ' 분야의 근무기간이 1년 이상임을 확인할 수 있는 최근 90일 이내 발급본을 준비해 주세요.',
        ...(['accountant','appraiser'].includes(id) ? ['협회에서 발급한 경력증명서는 인정되지 않습니다.'] : [])]));
    professionalVariants.push({ id: 'expert-' + id, title: '전문자격 · ' + profession, groups: [all('자격·경력 증빙', documents)] });
  }
  const assetCommon = all('자산 공통서류', [familyProof,
    documentItem('residence', '주민등록등본', '신청인 기준으로 90일 이내 발급해 주세요.',
      ['발급 대상은 신청인 본인입니다. 발급일이 최근 90일 이내인지 확인해 주세요.']),
    documentItem('personal-credit', '본인 신용정보조회서', '한국신용정보원 크레딧포유에서 발급한 서류입니다.',
      ['한국신용정보원의 크레딧포유에서 본인 신용정보조회서를 발급해 주세요. 발급한 날의 다음 영업일부터 신청할 수 있습니다.'])
  ]);
  const assetBalance = conditional('금융자산 증빙', '본인의 타 금융회사 잔고를 합산합니다', [
    documentItem('asset-balance', '금융회사 잔고증명서', '신청일 전일 기준 잔고를 준비해 주세요.',
      ['다른 금융회사의 본인 잔고를 합산하면 신청 전날 기준 잔고증명서를 준비해 주세요. 본인 명의의 키움증권 잔고는 서류 제출을 생략할 수 있습니다.'])
  ], true);
  const realEstate = all('비거주 부동산 증빙', [
    documentItem('property-register', '등기사항전부증명서', '말소사항이 포함된 등기 서류입니다.',
      ['거주하지 않는 본인 소유 부동산의 등기사항전부증명서를 말소사항까지 포함해 발급해 주세요. 발급 다음 영업일부터 신청할 수 있습니다.']),
    documentItem('property-value', '기준시가 서류', '신청 부동산의 기준시가가 표시된 서류입니다.',
      ['합산하려는 비거주 부동산의 소재지와 기준시가를 확인할 수 있는 서류를 첨부해 주세요.']),
    documentItem('property-lease', '임대차계약서', '현재 임대차 계약기간이 포함되어야 합니다.',
      ['현재 계약기간이 적힌 임대차계약서를 준비해 주세요. 계약서를 제출해야 해당 부동산이 자산으로 인정됩니다.'])
  ]);
  const mortgage = conditional('담보대출 증빙', '거주 부동산에 담보대출이 있습니다', [
    documentItem('mortgage-record', '금융거래확인서', '신청일 전일 발급한 확인서입니다.',
      ['거주 중인 부동산의 담보대출을 확인하는 서류입니다. 신청 전날 발급한 금융거래확인서와 부채증명서를 각각 첨부해 주세요.']),
    documentItem('mortgage-debt', '부채증명서', '신청일 전일 발급한 증명서입니다.',
      ['거주 중인 부동산의 담보대출 잔액을 확인할 수 있어야 합니다. 금융거래확인서와 부채증명서 모두 신청 전날 발급해 주세요.'])
  ]);
  for (const [id, title] of [['financial', '금융자산'], ['property', '비거주 부동산'], ['combined', '금융자산과 비거주 부동산']]) {
    const includeFinances = id !== 'property';
    const spouseAssets = [...spouseProofs, documentItem('spouse-credit', '배우자 신용정보조회서',
      '한국신용정보원 크레딧포유 발급본입니다.', ['배우자 자산을 합산하면 크레딧포유에서 배우자 명의로 신용정보조회서를 발급해 주세요.'])];
    if (includeFinances) spouseAssets.push(documentItem('spouse-balance', '배우자 금융회사 잔고증명서',
      '신청일 전일 기준이며 배우자 명의의 키움증권 잔고도 포함합니다.',
      ['배우자 이름과 신청 전날의 잔고가 표시된 증명서를 첨부해 주세요. 배우자 명의의 키움증권 잔고도 증명서가 필요합니다.']));
    const groups = [assetCommon];
    if (includeFinances) groups.push(assetBalance);
    if (id !== 'financial') groups.push(realEstate);
    groups.push(conditional('배우자 자산 증빙', '배우자의 자산도 합산합니다', spouseAssets), mortgage);
    professionalVariants.push({ id: 'assets-' + id, title: '자산 · ' + title, groups });
  }

  window.DigitalFormCatalog = [
    {
      id: 'isa', title: 'ISA 서민형 증빙서류 제출', description: '서민형 가입 자격을 확인할 소득 증빙을 등록합니다.',
      groups: [all('소득 증빙서류', [documentItem('isa-income', '소득확인증명서', '개인종합자산관리계좌 가입용 · 홈택스 발급',
        ['홈택스에서 ‘개인종합자산관리계좌 가입용’을 선택하고 프린터 출력용으로 발급해 주세요.',
          '총 2장을 모두 첨부해 주세요. 열람이나 미리보기 화면을 캡처한 자료는 접수할 수 없습니다.',
          '발급 용도, 귀속연도와 총급여액이 보이는지 확인해 주세요.'])])],
      allowMinor: true, minorGroups: [minorGroup]
    },
    {
      id: 'leverage', title: '레버리지ETP 적격투자자 등록', description: '국내 레버리지ETP의 타사 거래 경험을 확인합니다.',
      groups: [all('거래 증빙서류', [tradingRecord])]
    },
    {
      id: 'domestic-futures', title: '국내선물옵션 적격투자자 등록', description: '자격이나 거래 경험을 확인할 서류 한 종류를 선택해 주세요.',
      groups: [futuresProofs]
    },
    {
      id: 'overseas-futures', title: '해외선물옵션 적격투자자 등록', description: '자격이나 거래 경험을 확인할 서류 한 종류를 선택해 주세요.',
      groups: [futuresProofs]
    },
    {
      id: 'minor', title: '미성년자 업무처리 (대리인)', description: '미성년자와 법정대리인의 관계를 확인합니다.',
      groups: [minorGroup], requiresMinorInfo: true
    },
    {
      id: 'corporate', title: '법인계좌 업무처리 (대리인)', description: '법인을 대리할 자격을 확인할 증빙 한 종류를 준비해 주세요.',
      groups: [{ title: '대리인 증빙 선택', chooseOne: true, documents: [
        documentItem('authorization', '법인대표자 위임장 및 법인인감증명서', '두 서류를 함께 첨부해 주세요.',
          ['위임할 업무를 적고 법인인감을 찍은 위임장과 법인인감증명서를 같은 항목에 첨부해 주세요.',
            '두 서류의 법인명과 대표자명이 같아야 합니다.']),
        documentItem('employment', '재직증명서', '신청 당일 발급본을 준비해 주세요.',
          ['신청하는 날 발급된 서류에 회사명, 대리인의 성명과 현재 재직 여부가 표시되어야 합니다.',
            '발급 담당자 정보나 회사 직인이 포함되어 있는지 확인해 주세요.']),
        documentItem('request-letter', '금융거래 요청 공문', '법인 명의로 작성한 공문입니다.',
          ['법인 명의의 문서번호와 시행일, 요청하는 업무와 거래 대상 계좌가 적힌 공문을 준비해 주세요.',
            '법인 직인 또는 담당자를 확인할 수 있는 정보가 필요합니다.']),
        documentItem('employee-card', '사원증', '소속 법인과 대리인의 이름을 확인합니다.',
          ['회사명과 대리인의 이름·사진이 보이도록 사원증 앞면 전체를 촬영해 주세요.',
            '유효기간이 적혀 있다면 신청일에 유효한 사원증인지 확인해 주세요.'])
      ] }]
    },
    {
      id: 'identity', title: '본인확인용 신분증 제출', description: '주민등록증이나 운전면허증 원본을 촬영해 주세요.',
      groups: [all('신분 확인', [documentItem('identity', '신분증', '실물 촬영',
        ['본인의 주민등록증 또는 운전면허증 원본을 직접 촬영해 주세요. 스캔 이미지나 화면 캡처는 접수할 수 없습니다.',
          '빛이 반사되지 않도록 놓고 이름, 얼굴 사진, 발급기관이 선명한지 확인해 주세요.'], true)])]
    },
    {
      id: 'rename', title: '개명 서류 제출', description: '이름 변경 이력과 현재 성명을 확인합니다.',
      groups: [all('개명 확인 서류', [
        documentItem('renamed-id', '개명 후 신분증 원본', '개명한 성명과 주민등록번호 전체가 표시된 신분증을 촬영해 주세요.',
          ['개명한 이름의 신분증 원본을 직접 촬영해 주세요. 유효기간 한 달 이내인 임시신분증도 사용할 수 있습니다.',
            '바뀐 이름과 주민등록번호 전체가 보여야 합니다. 스캔 이미지나 화면 캡처는 접수할 수 없습니다.'], true),
        documentItem('name-record', '주민등록초본', '최근 90일 이내 발급된 성명 변경이력 포함 초본입니다.',
          ['‘개인인적사항 변경내용’을 포함해 발급한 최근 90일 이내의 초본을 준비해 주세요.',
            '변경 전후 이름, 주민등록번호 전체, 발급기관 직인이 표시되어야 합니다.',
            'PDF나 스캔·촬영본을 첨부할 수 있습니다. 열람용 서류나 미리보기 화면은 접수할 수 없습니다.'])
      ])]
    },
    {
      id: 'professional', title: '개인전문투자자 증빙서류 제출', description: '소득, 전문자격, 자산 중 해당하는 기준을 선택해 주세요.',
      groups: [
        all('신청인 확인', [documentItem('investor-id', '본인 신분증', '주민등록증 또는 운전면허증을 준비해 주세요.',
          ['신청인 본인의 주민등록증 또는 운전면허증을 준비해 주세요.'])]),
        conditional('투자경험 증빙', '투자경험을 별도 서류로 증빙합니다', [
          documentItem('experience-balance', '개인전문투자자 증빙용 잔고증명서', '키움증권에서 투자경험 요건을 충족한 경우 이 증빙을 생략할 수 있습니다.',
            ['최근 5년 중 1년 이상 금융투자상품의 월말평균 잔고가 5천만원 이상임을 확인하는 증명서입니다.',
              '키움증권 거래만으로 투자경험 요건을 충족하면 별도 투자경험 증빙은 생략할 수 있습니다.']),
          documentItem('account-opening', '계좌개설확인서', '신청일이나 전일 기준으로 발급해 주세요.',
            ['개설 후 1년이 지난 계좌의 확인서를 준비해 주세요. 발급일은 신청 당일 또는 전날이어야 합니다.'])
        ], true)
      ], variants: professionalVariants
    },
    {
      id: 'overseas-leverage', title: '해외 레버리지ETP 적격투자자 등록', description: '해외 레버리지ETP의 타사 거래 경험을 확인합니다.',
      groups: [all('거래 증빙서류', [tradingRecord])]
    },
    {
      id: 'futures-deposit', title: '선물옵션 기본예탁금 전입', description: '기본예탁금 유형이 기재된 거래확인서를 준비해 주세요.',
      groups: [all('기본예탁금 증빙', [documentItem('derivatives-confirmation', '파생상품 거래확인서', '기본예탁금 유형 표시',
        ['기본예탁금 유형을 확인할 수 있는 파생상품 거래확인서를 첨부해 주세요.',
          '발급 금융회사, 고객 성명과 발급일을 읽을 수 있도록 문서 전체를 담아 주세요.'])])]
    },
    {
      id: 'supplement', title: '보완서류 제출', description: '보완 안내에서 요청받은 서류를 등록해 주세요.',
      groups: [all('보완 요청 서류', [documentItem('supplement-document', '보완 요청 서류', '요청받은 서류를 첨부해 주세요.',
        ['보완 안내에서 요청받은 항목을 확인하고, 해당 서류를 읽을 수 있도록 전체 페이지를 첨부해 주세요.'])])]
    },
    {
      id: 'other', title: '기타 서류 제출', description: '안내받은 기타 업무 서류를 등록합니다.',
      groups: [all('기타 서류', [documentItem('other-document', '기타 서류', '안내에 따라 사진 또는 파일로 첨부해 주세요.',
        ['안내받은 서류는 사진 또는 PDF 등의 파일로 최대 10개까지 첨부할 수 있습니다.',
          '문서의 가장자리가 잘리지 않고 글자를 읽을 수 있는지 확인해 주세요.'])])]
    }
  ];

  const renameTask = window.DigitalFormCatalog.find(task => task.id === 'rename');
  const residentProof = documentItem('resident-change-record', '주민등록번호 변경 확인 서류',
    '주민등록번호가 변경되었음을 확인할 수 있는 서류입니다.',
    ['안내받은 변경 확인 서류의 내용이 잘리지 않도록 촬영하거나 파일로 첨부해 주세요.']);
  const changeTasks = new Map([
    ['name', renameTask],
    ['resident', {
      id: 'rename', title: '주민등록번호 변경 서류 제출', description: '주민등록번호 변경 사실을 확인합니다.',
      groups: [all('주민등록번호 변경 서류', [residentProof])]
    }],
    ['both', {
      id: 'rename', title: '이름·주민등록번호 변경 서류 제출', description: '개명과 주민등록번호 변경 사실을 함께 확인합니다.',
      groups: [all('변경 확인 서류', [...renameTask.groups[0].documents, residentProof])]
    }]
  ]);
  window.getIdentityChangeTask = change => changeTasks.get(change);
})();
