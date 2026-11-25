/* Menu contract transcribed from 261123_메뉴구조도.jpg. */
(function (root) {
  'use strict';
  const groups = [
    {id:'personal', name:'내 정보', alias:'My 정보', icon:'person', tone:'blue'},
    {id:'requests', name:'신청 내역', icon:'clipboard', tone:'violet'},
    {id:'transfer', name:'출금정지 풀기', icon:'wallet', tone:'red'},
    {id:'papers', name:'증명서 발급', icon:'document', tone:'blue'},
    {id:'submission', name:'서류 제출', icon:'upload', tone:'violet'},
    {id:'credit', name:'신용·대출', icon:'coin', tone:'amber'},
    {id:'subscription', name:'청약', icon:'calendar', tone:'blue'},
    {id:'security', name:'인증·보안', icon:'shield', tone:'violet'},
    {id:'incident', name:'사고 신고', icon:'warning', tone:'red'}
  ];
  const rows = [
    {"id":"info","group":"personal","original":"내 정보 확인하기","label":"내 정보 확인하기","level":3,"channels":["app","staff"],"description":"등록된 고객정보와 보유 계좌를 한곳에서 볼 수 있습니다.","keywords":"계좌번호 아이디 ID 주소 연락처 장기미접속 마케팅","kind":"info","features":["연락처·주소와 마케팅 수신매체 확인","계좌별 연결 은행계좌와 아이디 상태 확인"]},
    {"id":"name-change","group":"personal","original":"이름·주민번호 변경","label":"이름 주민번호 바꾸기","level":3,"channels":["staff"],"description":"이름이나 주민등록번호가 바뀌었을 때 등록 정보를 변경합니다.","keywords":"개명 주민등록번호 변경","kind":"name-change","features":["조회한 계좌의 개명 신청 가능 여부 확인","변경 항목에 맞는 서류 제출 URL 받기"]},
    {"id":"cdd","group":"personal","original":"고객확인정보 등록하기","label":"고객확인정보 등록","level":3,"channels":["app","staff"],"description":"금융거래에 필요한 고객확인정보를 등록합니다.","keywords":"CDD EDD KYC","kind":"cdd","features":["직업·거래 목적·자금 원천 입력","거주 국가와 주소 등록"]},
    {"id":"resume","group":"requests","original":"계좌개설 이어하기","label":"계좌개설 진행내역","level":2,"channels":["staff","opening"],"description":"중단한 계좌개설을 이어서 진행할 수 있습니다.","keywords":"계좌 개설 이어하기","kind":"resume","features":["현재 단계와 남은 절차 확인","계좌개설앱으로 이동"]},
    {"id":"applications","group":"requests","original":"비대면업무 신청내역","label":"비대면업무 신청내역","level":2,"channels":["staff","opening"],"description":"비대면으로 신청한 업무의 진행 상황을 확인합니다.","keywords":"비대면 접수현황 신청 진행","kind":"applications","features":["신청한 업무와 처리 상태 확인","보완 요청 내용 확인·서류 제출"]},
    {"id":"certificate-history","group":"requests","original":"증명서 신청내역","label":"증명서 신청내역","level":3,"channels":["staff"],"description":"발급을 신청한 증명서를 한곳에서 볼 수 있습니다.","keywords":"서류 발급현황 증명서 내역","kind":"certificate-history","features":["접수번호와 신청 정보 확인","새 증명서 선택"]},
    {"id":"outbound","group":"requests","original":"출고 신청내역","label":"출고 신청내역","level":3,"channels":["staff"],"description":"선택한 계좌의 주식 출고 신청내역을 확인합니다.","keywords":"주식 출고 이관","kind":"outbound","features":["계좌별 주식 출고 신청 여부 확인"]},
    {"id":"dormant","group":"transfer","original":"장기미사용 풀기","label":"장기미사용 해제","level":3,"channels":["app","staff"],"description":"오랫동안 사용하지 않아 출금이 제한된 계좌를 확인합니다.","keywords":"휴면 오랜만에 입출금","kind":"dormant","features":["선택한 계좌의 제한 여부 확인","금융거래목적확인서 등록"]},
    {"id":"limit","group":"transfer","original":"이체한도 풀기","label":"이체한도 제한 해제","level":3,"channels":["app","staff"],"description":"이체한도 때문에 출금할 수 없는 계좌를 확인합니다.","keywords":"입출금 한도제한","kind":"limit","features":["선택한 계좌의 한도 제한 여부 확인","영웅문S#에서 해제할 서류 확인"]},
    {"id":"trading","group":"transfer","original":"거래중지 풀기(단기간다수계좌)","label":"거래중지 해제(단기간다수계좌)","level":3,"channels":["app","staff"],"description":"단기간에 여러 계좌를 개설해 거래가 중지된 경우에 이용하세요.","keywords":"거래 중지 단기간 다수 계좌","kind":"trading","features":["거래중지 사유 확인","금융거래목적확인서 등록"]},
    {"id":"certificate","group":"papers","original":"잔고증명서","label":"잔고증명서","level":3,"channels":["app","staff"],"description":"선택한 계좌의 잔고증명서를 신청합니다.","keywords":"증명서 발급 잔고증명서","kind":"certificate","features":["국문·영문과 발급 용도 선택","기준일과 신청 매수 지정"]},
    {"id":"certificate-trades","group":"papers","original":"거래내역서","label":"거래내역서","level":3,"channels":["app","staff"],"description":"선택한 계좌의 거래내역서를 신청합니다.","keywords":"증명서 발급 거래내역서","kind":"certificate","features":["거래 기간과 증명 용도 선택","신청 매수와 수령 이메일 확인"]},
    {"id":"certificate-income","group":"papers","original":"금융소득내역서","label":"금융소득내역서","level":3,"channels":["app","staff"],"description":"선택한 계좌의 금융소득내역서를 신청합니다.","keywords":"증명서 발급 금융소득내역서","kind":"certificate","features":["금융소득 조회 연도 선택","고객정보 공개 범위 지정"]},
    {"id":"certificate-bank","group":"papers","original":"은행이체거래내역서","label":"은행이체거래내역서","level":3,"channels":["staff"],"description":"선택한 계좌의 은행이체거래내역서를 신청합니다.","keywords":"증명서 발급 은행이체거래내역서","kind":"certificate","features":["이체·입출금 구분과 외화 포함 여부 선택","조회 기간과 직인 날인 지정"]},
    {"id":"certificate-withholding","group":"papers","original":"원천징수내역서","label":"원천징수내역서","level":3,"channels":["app","staff"],"description":"선택한 계좌의 원천징수내역서를 신청합니다.","keywords":"증명서 발급 원천징수내역서","kind":"certificate","features":["주민등록번호 기준 원천징수 기간 선택","신청 매수와 수령 이메일 확인"]},
    {"id":"certificate-resident","group":"papers","original":"주민번호별계좌조회","label":"주민번호별계좌조회","level":3,"channels":["staff"],"description":"선택한 계좌의 주민번호별계좌조회를 신청합니다.","keywords":"증명서 발급 주민번호별계좌조회","kind":"certificate","features":["계좌 조회 기준일 선택","고객정보 공개 범위 지정"]},
    {"id":"certificate-domestic-outbound","group":"papers","original":"국내주식일출고상세내역","label":"국내주식일출고상세내역","level":3,"channels":["staff"],"description":"선택한 계좌의 국내주식일출고상세내역을 신청합니다.","keywords":"증명서 발급 국내주식일출고상세내역","kind":"certificate","features":["국내주식 출고 기간 선택","고객정보 공개 범위 지정"]},
    {"id":"certificate-foreign-transfer","group":"papers","original":"해외주식입출고상세내역","label":"해외주식입출고상세내역","level":3,"channels":["staff"],"description":"선택한 계좌의 해외주식입출고상세내역을 신청합니다.","keywords":"증명서 발급 해외주식입출고상세내역","kind":"certificate","features":["해외주식 입출고 기간 선택","고객정보 공개 범위 지정"]},
    {"id":"certificate-foreign-tax","group":"papers","original":"해외주식양도소득내역서","label":"해외주식양도소득내역서","level":3,"channels":["staff"],"description":"선택한 계좌의 해외주식양도소득내역서를 신청합니다.","keywords":"증명서 발급 해외주식양도소득내역서","kind":"certificate","features":["종목별 내역과 조회 연도·분기 선택","신청 매수 지정"]},
    {"id":"certificate-foreign-dividend","group":"papers","original":"해외주식배당입금내역서","label":"해외주식배당입금내역서","level":3,"channels":["staff"],"description":"선택한 계좌의 해외주식배당입금내역서를 신청합니다.","keywords":"증명서 발급 해외주식배당입금내역서","kind":"certificate","features":["배당 입금 조회 연도 선택","직인 날인 여부 지정"]},
    {"id":"certificate-foreign-paid-tax","group":"papers","original":"해외증권원납세액명세서","label":"해외증권원납세액명세서","level":3,"channels":["staff"],"description":"선택한 계좌의 해외증권원납세액명세서를 신청합니다.","keywords":"증명서 발급 해외증권원납세액명세서","kind":"certificate","features":["외국 납부세액 조회 연도 선택","직인 날인 여부 지정"]},
    {"id":"certificate-derivatives-tax","group":"papers","original":"파생상품양도소득세계산명세서","label":"파생상품양도소득세계산명세서","level":3,"channels":["staff"],"description":"선택한 계좌의 파생상품양도소득세계산명세서를 신청합니다.","keywords":"증명서 발급 파생상품양도소득세계산명세서","kind":"certificate","features":["양도소득세 조회 연도 선택","신청 매수와 직인 날인 지정"]},
    {"id":"documents","group":"submission","original":"서민형ISA","label":"서민형ISA","level":3,"channels":["staff"],"description":"서민형 ISA 가입·만기연장에 필요한 소득증빙서류를 제출합니다.","keywords":"서민형ISA 서류 제출","kind":"documents","features":["ISA 신청내역과 서류 제출 상태 확인","디지털폼으로 연결되는 서류제출 URL 받기"],"formTask":"isa"},
    {"id":"documents-etp","group":"submission","original":"레버리지ETP","label":"레버리지ETP","level":3,"channels":["staff"],"description":"다른 증권사의 거래내역으로 레버리지 ETP 거래 경험을 확인합니다.","keywords":"레버리지ETP 서류 제출","kind":"documents","features":["적격투자자 등록 신청 상태 확인","타사 거래확인서 제출 URL 받기"],"formTask":"leverage"},
    {"id":"documents-domestic","group":"submission","original":"국내선물옵션 거래확인서","label":"국내선물옵션 거래확인서","level":3,"channels":["staff"],"description":"국내선물옵션 적격투자자 등록에 필요한 증빙을 제출합니다.","keywords":"국내선물옵션 거래확인서 서류 제출","kind":"documents","features":["국내선물옵션 등록 신청 상태 확인","증빙서류 제출 URL 받기"],"formTask":"domestic-futures"},
    {"id":"documents-foreign","group":"submission","original":"해외선물옵션 거래확인서","label":"해외선물옵션 거래확인서","level":3,"channels":["staff"],"description":"해외선물옵션 적격투자자 등록에 필요한 증빙을 제출합니다.","keywords":"해외선물옵션 거래확인서 서류 제출","kind":"documents","features":["해외선물옵션 등록 신청 상태 확인","증빙서류 제출 URL 받기"],"formTask":"overseas-futures"},
    {"id":"unpaid","group":"credit","original":"미수금 확인하기","label":"미수금 조회","level":3,"channels":["app","staff"],"description":"현재 계좌에 추가로 입금할 금액이 있는지 확인합니다.","keywords":"미수금 반대매매","kind":"unpaid","features":["미수금과 입금 필요 금액 조회","미수금 처리 상태 확인"]},
    {"id":"extension","group":"credit","original":"신용/대출 만기연장","label":"신용/대출 만기연장","level":3,"channels":["staff"],"description":"만기가 다가오는 대출의 연장을 신청합니다.","keywords":"신용 대출 만기 연장","kind":"extension","features":["대출금액과 연장 후 만기일 확인","연장 가능 대출 신청"]},
    {"id":"repayment","group":"credit","original":"신용/대출 현금상환","label":"신용/대출 현금상환","level":3,"channels":["app","staff"],"description":"계좌에 있는 예수금으로 대출금을 상환합니다.","keywords":"신용 대출 현금 상환","kind":"repayment","features":["대출 잔액과 상환 가능 금액 조회","일부 금액 또는 전액 상환 신청"]},
    {"id":"rights","group":"subscription","original":"유상청약","label":"유상청약","level":1,"channels":["app","staff","ivr"],"description":"유상청약에 필요한 정보와 이용 방법을 안내합니다.","keywords":"유상증자 청약 권리","kind":"rights","features":["청약 전 확인할 권리·수량·납입 금액 안내","청약을 신청할 이용 방법 선택"],"faqAction":"유상청약 신청하기"},
    {"id":"ipo","group":"subscription","original":"공모주청약","label":"공모주청약","level":1,"channels":["app","staff","ivr"],"description":"공모주 청약 전 확인할 사항을 안내합니다.","keywords":"공모주 IPO 청약 일정","kind":"ipo","features":["종목별 일정·증거금 확인 방법 안내","청약 신청 및 배정 결과 확인 경로 안내"],"faqAction":"공모주청약 신청하기"},
    {"id":"buyback","group":"subscription","original":"반대의사 및 매수청구","label":"반대의사 및 매수청구","level":1,"channels":["app","staff","ivr"],"description":"권리 행사 기간과 신청 방법을 안내합니다.","keywords":"주식매수청구 반대 의사","kind":"buyback","features":["반대의사와 매수청구의 차이 확인","권리를 행사할 이용 방법 선택"],"faqAction":"반대의사·매수청구 신청하기"},
    {"id":"ars-order","group":"security","original":"ARS 주문설정","label":"ARS 주문설정","level":1,"channels":["staff","ivr"],"description":"음성 ARS 주문 서비스의 이용 방법을 안내합니다.","keywords":"ARS 주문 설정","kind":"ars-order","features":["음성 ARS 주문 이용 절차 확인","설정 변경을 위한 상담원·음성 ARS 연결"],"faqAction":"ARS 주문 설정하기"},
    {"id":"certificate-guide","group":"security","original":"공동인증서","label":"공동인증서 발급 안내","level":1,"channels":["app","staff"],"description":"필요한 정보를 확인한 후 영웅문S#에서 공동인증서를 발급합니다.","keywords":"공동 인증서 발급 갱신","kind":"certificate-guide","features":["발급에 필요한 아이디·계좌번호 확인","발급을 위해 영웅문S#으로 이동"],"faqAction":"공동인증서 발급 방법 선택하기"},
    {"id":"otp","group":"security","original":"실물 OTP 조회","label":"실물 OTP 조회","level":3,"channels":["staff"],"description":"이 계좌에 연결된 실물 OTP를 확인합니다.","keywords":"OTP 실물 보안매체","kind":"otp","features":["제조사·일련번호·등록일 조회","이용 상태 확인 및 분실 신고 방법 안내"]},
    {"id":"fraud","group":"incident","original":"보이스피싱","label":"보이스피싱","level":1,"channels":["staff"],"description":"보이스피싱 피해가 의심되면 상담원 연결로 사고 접수 방법을 확인합니다.","keywords":"금융 사기 피해","kind":"fraud","features":["상담 전에 준비할 거래 정보 확인","사고 접수를 위한 상담원 연결"],"faqAction":"보이스피싱 신고하기"},
    {"id":"withdrawal-stop","group":"incident","original":"출금정지","label":"출금정지","level":1,"channels":["staff","ivr"],"description":"계좌 출금 정지 접수 방법과 확인 사항을 안내합니다.","keywords":"계좌 출금 정지 사고등록","kind":"withdrawal-stop","features":["대상 계좌와 정지 절차 안내","상담원 또는 음성 ARS 연결"],"faqAction":"출금정지 신청하기"},
    {"id":"card-loss","group":"incident","original":"카드분실","label":"카드분실","level":1,"channels":["staff"],"description":"분실한 카드의 사고 접수 방법을 안내합니다.","keywords":"제휴 카드 분실 사고","kind":"card-loss","features":["분실 신고에 필요한 정보 확인","카드 사고 접수를 위한 상담원 연결"],"faqAction":"카드분실 신고하기"},
    {"id":"otp-loss","group":"incident","original":"OTP사고","label":"OTP사고","level":1,"channels":["staff","ivr"],"description":"OTP 분실·도난 시 사고 접수 방법을 안내합니다.","keywords":"OTP 분실 도난 사고등록","kind":"otp-loss","features":["분실·도난 시 사용 정지 절차 확인","사고 접수를 위한 상담원·음성 ARS 연결"],"faqAction":"OTP 사고 신고하기"},
    {"id":"mistake","group":"incident","original":"잘못 보낸 돈 돌려받기","label":"착오송금 반환 신청","level":3,"channels":["staff"],"description":"돈을 잘못 보냈을 때 반환을 요청할 수 있습니다.","keywords":"잘못 입금 실수로 보낸 돈 돌려받기 착오 송금","kind":"mistake","features":["송금 내역 선택 및 반환 요청 금액 입력","신청 사유 선택 후 반환 요청"]}
  ];
  const faq = {
    rights:[['유상청약은 어디에서 신청하나요?','영웅문S#, 상담원 또는 음성 ARS에서 안내받을 수 있습니다. 아래에서 이용 방법을 선택해 주세요.'],['청약 전에 무엇을 확인하나요?','보유 종목의 청약 권리, 청약 기간, 수량과 납입 금액을 확인합니다. 종목별 조건은 해당 공시와 청약 안내에서 확인해 주세요.'],['청약 결과는 어디에서 확인하나요?','신청한 매체의 청약 내역에서 확인합니다. 이 화면은 안내용이며 청약 신청을 접수하지 않습니다.'],['청약 기간이 지났다면 어떻게 하나요?','종목과 권리 종류에 따라 안내가 달라질 수 있습니다. 상담원에게 해당 종목의 처리 가능 여부를 확인해 주세요.']],
    ipo:[['공모주 청약 일정은 어디에서 확인하나요?','영웅문S#의 공모주 청약 안내에서 종목별 일정과 조건을 확인합니다. 배정·환불 일정도 함께 확인해 주세요.'],['청약 전에 준비할 것은 무엇인가요?','청약 가능 계좌, 신청 기간과 증거금을 확인해 주세요. 구체적인 조건은 해당 공모주 안내를 따릅니다.'],['청약 내용을 변경할 수 있나요?','접수한 매체에서 변경·취소 가능 여부를 확인합니다. 종목별 마감 시각과 상태에 따라 처리 가능 여부가 달라집니다.'],['배정 결과와 환불 내역은 어디에서 보나요?','영웅문S#의 청약 내역과 계좌 거래내역에서 확인할 수 있습니다. 확인이 어려우면 상담원에게 문의해 주세요.']],
    buyback:[['반대의사와 매수청구는 어떻게 다른가요?','서로 다른 권리 행사 단계입니다. 해당 종목의 공시에서 대상, 절차와 각각의 신청 기간을 확인해 주세요.'],['신청은 어디에서 하나요?','영웅문S#, 상담원 또는 음성 ARS에서 이용 가능 여부를 확인할 수 있습니다.'],['보유 주식이면 모두 신청할 수 있나요?','취득 시점 등 종목별 요건을 확인해야 합니다. 이 안내 화면만으로 신청 자격이 확정되지는 않습니다.'],['신청 내역은 어떻게 확인하나요?','신청한 매체에서 접수 상태와 수량을 확인합니다. 문의할 때 종목명과 신청 정보를 준비해 주세요.']],
    'ars-order':[['ARS 주문은 어떻게 이용하나요?','음성 ARS로 연결한 후 주문 서비스 안내에 따라 진행합니다. 연결 전 계좌와 이용 가능 여부를 확인해 주세요.'],['ARS 주문 설정을 변경하고 싶어요.','상담원 또는 음성 ARS에서 설정 안내를 받을 수 있습니다. 이 화면에서는 주문 설정을 변경하지 않습니다.'],['인증이 되지 않으면 어떻게 하나요?','입력 정보를 다시 확인하고 반복 실패 시 상담원에게 문의해 주세요. 비밀번호나 인증번호를 타인에게 알려주지 마세요.'],['디지털 ARS에서 주문할 수 있나요?','이 페이지는 서비스 안내를 제공합니다. 실제 주문은 연결한 매체의 절차를 따릅니다.']],
    'certificate-guide':[['공동인증서는 어디에서 발급하나요?','공동인증서는 영웅문S#에서 발급합니다. 디지털 ARS에서는 발급 안내와 필요한 정보 확인만 제공합니다.'],['이동 전에 무엇을 준비하나요?','아이디, 계좌번호와 보안매체 등 앱의 발급 절차에 필요한 정보를 확인해 주세요. 실제 필요 항목은 앱 안내를 따릅니다.'],['앱으로 이동하면 디지털 ARS는 어떻게 되나요?','영웅문S#으로 이동하면 디지털 ARS가 종료됩니다. 이곳의 인증·입력 정보가 앱에 자동 전달되지 않습니다.'],['아이디나 계좌번호가 기억나지 않아요.','앱 이동 전에 내 정보 메뉴에서 확인할 수 있습니다. 해당 업무에는 휴대폰과 계좌 인증이 필요합니다.']],
    fraud:[['금융사기가 의심되면 어떻게 하나요?','화면 하단에서 상담원 연결을 선택해 사고 접수 안내를 받습니다. 이 FAQ 열람만으로 신고가 접수되지는 않습니다.'],['상담 전에 무엇을 확인하나요?','의심 거래의 시각, 금액과 관련 내역을 확인해 주세요. 계좌 비밀번호·인증번호는 타인에게 전달하지 마세요.'],['출금을 막고 싶어요.','사고 상담에서 출금 정지 필요 여부를 함께 전달해 주세요. 출금정지 메뉴에서도 연결 안내를 받을 수 있습니다.'],['접수 결과는 어떻게 확인하나요?','연결한 상담원에서 접수 여부와 후속 절차를 확인해 주세요.']],
    'withdrawal-stop':[['출금정지는 어떻게 신청하나요?','상담원 또는 음성 ARS로 연결해 대상 계좌와 정지 절차를 안내받습니다.'],['이 화면에서 바로 정지되나요?','이 화면은 연결 안내용입니다. 연결 매체에서 본인확인과 접수를 마쳐야 처리 여부를 확인할 수 있습니다.'],['다시 출금하려면 어떻게 하나요?','정지 사유와 계좌 상태에 따라 해제 절차가 달라질 수 있으므로 상담원에게 확인해 주세요.']],
    'card-loss':[['카드를 잃어버렸어요.','상담원로 연결해 카드 분실 사고를 접수합니다. 카드 종류와 연결 계좌를 확인해 주세요.'],['재발급도 함께 신청할 수 있나요?','카드 종류와 발급 기관에 따라 절차가 달라질 수 있습니다. 분실 접수 시 재발급 방법을 함께 확인해 주세요.'],['분실한 카드를 다시 찾았어요.','사고 접수 상태와 사용 가능 여부를 확인한 후 사용해 주세요.']],
    'otp-loss':[['OTP를 분실했어요.','상담원 또는 음성 ARS로 연결해 사고 접수와 사용 정지 절차를 확인합니다.'],['등록된 OTP 정보는 어디에서 보나요?','인증·보안 > 실물 OTP 조회에서 인증 후 확인할 수 있습니다.'],['새 OTP를 사용하려면 어떻게 하나요?','새 보안매체 등록과 기존 OTP 해지 절차를 상담원에게 확인해 주세요.']]
  };
  const services = rows.map(s=>({...s,faq:faq[s.id]||null,faqTopics:s.id==='ipo'?{schedule:0,history:3}:null}));
const auxiliaryServices = [
    {id:'certificate-account-proof', group:'papers', original:'증권계좌 확인서', label:'증권계좌 확인서',
      level:3, channels:['staff'], kind:'certificate', keywords:'증권계좌 확인서 계좌 증명',
      description:'선택한 증권계좌의 개설 정보를 확인하는 서류를 신청합니다.',
      features:['계좌 확인 기준일 선택','고객정보 공개 범위와 직인 날인 지정']},
    {
      id:'password-change', group:'personal', original:'비밀번호 바꾸기', label:'비밀번호 재설정',
      level:1, channels:['app','staff'], kind:'password-guide',
      keywords:'계좌 비밀번호 변경 증권계좌 비밀번호 재설정 아이디 비밀번호 ID 비밀번호 공동인증서 비밀번호 비밀번호 바꾸기',
      passwordTypes:[
        {id:'account', label:'증권계좌 비밀번호', use:'계좌 인증용', format:'숫자 4~8자리'},
        {id:'id', label:'아이디 비밀번호', use:'로그인용', format:'영문 소문자와 숫자를 조합한 5~8자리'},
        {id:'certificate', label:'공동인증서 비밀번호', use:'전자서명용', format:'영문 소문자·숫자·특수문자를 모두 포함한 10자리 이상'}
      ]
    },
    {"id":"documents-derivatives","group":"submission","original":"파생상품 서류제출하기","label":"파생상품 서류제출","level":3,"channels":["staff"],"description":"국내 또는 해외 선물옵션 적격투자자 등록에 필요한 증빙을 제출합니다.","keywords":"파생상품 선물옵션 서류 제출","kind":"documents","features":["제출할 시장 선택","거래확인서 등 증빙서류 제출 URL 받기"]},{"id":"documents-supplement","group":"submission","original":"보완서류 제출","label":"비대면업무 보완서류 제출","level":3,"channels":["staff"],"description":"비대면 신청에서 보완을 요청한 서류를 확인합니다.","keywords":"비대면 보완","kind":"documents","features":["보완 요청 사유와 대상 서류 확인","보완서류 제출 URL 받기"],"formTask":"supplement"}];
  const scenarios = [["비밀번호 바꾸기","lock","password-change"],["이름 주민번호 바꾸기","edit","name-change"],["비대면 접수내역보기","monitor","applications"],["증명서 신청내역보기","document","certificate-history"],["장기미사용 풀기","person","dormant"],["서민형ISA 서류제출하기","edit","documents"],["레버리지ETP 서류제출하기","chart","documents-etp"],["파생상품 서류제출하기","document","documents-derivatives"],["신용/대출 만기연장","coin","extension"],["신용/대출 현금상환","wallet","repayment"],["잘못 보낸 돈 돌려받기","wallet","mistake"]];
  auxiliaryServices.push({
    id: 'withdrawal-status', group: 'transfer', original: '출금정지풀기', label: '출금정지 사유 및 해제 방법',
    level: 3, channels: ['app', 'staff'], keywords: '입출금이 안돼요 거래중지 출금 제한',
    description: '본인인증 후 내 계좌의 출금정지 사유를 확인해 주세요.\n해제 가능한 제한은 여기서 바로 풀 수 있습니다.',
    features: [
      '장기간 거래가 없었던 계좌',
      '단기간에 여러 계좌를 개설한 경우',
      '이체한도가 제한된 경우',
      '신분증 진위 확인이 완료되지 않은 경우'
    ],
    intro: {
      title: '여기서 바로 출금정지를 풀어보세요',
      checklistTitle: '출금정지는 이런 경우에 설정될 수 있어요'
    }
  });
  function service(id) {return services.find(s=>s.id===id)||auxiliaryServices.find(s=>s.id===id);}
  function authStep(id,auth) {const s=service(id);return !s?'invalid':s.level===1?null:!auth.phone?'phone':s.level===3&&!auth.account?'account':null;}
  function normalizeSearch(text) {
    return text.replace(/[\s·/]/g, '').toLowerCase();
  }
  function search(query, {menuOnly = false} = {}) {
    if (!query.trim()) return menuOnly ? services : [];
    const term = normalizeSearch(query);
    if (!term) return [];
    const source = menuOnly ? services : [...services, ...auxiliaryServices];
    return source.filter(item => {
      const group = groups.find(g => g.id === item.group);
      const fields = [item.label, item.original, menuOnly ? '' : item.keywords, group.name, group.alias];
      return normalizeSearch(fields.join(' ')).includes(term);
    });
  }
  function validAmount(v,max) {return /^(?:[1-9]\d*|[1-9]\d{0,2}(?:,\d{3})+)$/.test(v)&&Number(v.replace(/,/g,''))<=max;}
  // Reference content only; these prototype values are not a live contact-center feed.
  const trafficSkills = [
    {id:'domestic',name:'국내주식',description:'주식 주문 · 체결내역 조회',status:'보통',tone:''},
    {id:'credentials',name:'아이디/비밀번호 · 인증서',description:'신규 계좌 · 공동인증서',status:'보통',tone:''},
    {id:'credit',name:'미수 · 신용대출',description:'미수 · 신용대출 약정 · 계좌 조회 · 대출 신청 · ETF 문의',status:'혼잡',tone:'warning'},
    {id:'rights',name:'권리',description:'권리 · 공모주 · 제증명서',status:'혼잡',tone:'warning'},
    {id:'system',name:'시스템',description:'HTS · MTS 등 시스템 이용',status:'보통',tone:''},
    {id:'derivatives',name:'선물옵션',description:'선물옵션 · ELW',status:'여유',tone:'success'},
    {id:'overseas',name:'해외주식',description:'해외주식 · 국내복귀계좌',status:'혼잡',tone:'warning'},
    {id:'products',name:'금융상품',description:'연금 · ISA · 서민형 가입서류 · 펀드 · 채권 · ELS · 계좌 상세',status:'보통',tone:''},
    {id:'cfd',name:'CFD',description:'국내·해외주식 CFD · 환헤지 · 상품선물옵션',status:'여유',tone:'success'}
  ];
  const homeNotices = [{
    id:'ipo',
    title:'공모주 청약 일정 안내',
    summary:'공모주 청약을 준비하시는 고객님께 안내드립니다.',
    demoNote:'이 공지는 공모주 청약 준비·일정·신청내역 확인 경로를 안내하는 시연 콘텐츠입니다. 실시간 종목·일정·공시를 제공하지 않습니다.',
    sections:[
      {title:'청약 일정 확인',body:'종목별 청약 기간과 배정·환불 일정은 영웅문S#에서 확인합니다.',action:{label:'청약 일정 확인 방법 보기',id:'ipo',topic:'schedule'}},
      {title:'청약 전 확인사항',items:['청약할 종목과 청약 시작일·마감일','종목별 신청 조건과 청약 가능 수량','청약증거금과 계좌 잔액']},
      {title:'신청내역 확인',body:'신청한 매체에서 청약 내역과 처리 결과를 확인합니다. 배정 결과·환불 내역의 확인 방법을 아래에서 안내합니다.',action:{label:'청약내역 확인 방법 보기',id:'ipo',topic:'history'}}
    ]
  }, {
    id:'withdrawal',
    title:'출금정지 해제 안내',
    summary:'출금이 어려울 때는 계좌에 적용된 제한 사유와 해제 방법을 확인할 수 있습니다.',
    sections:[
      {title:'계좌별 제한 사유 확인',body:'휴대폰과 계좌 인증을 마치면 선택한 계좌의 제한 사유를 볼 수 있습니다.'},
      {title:'해제 방법 확인',body:'제한 사유에 따라 필요한 절차가 다릅니다. 계좌를 조회해 해당하는 방법을 확인해 주세요.',action:{label:'출금정지 사유 확인하기',id:'withdrawal-status'}}
    ],
    demoNote:'시연 계좌에 설정된 출금정지 사유와 해제 방법을 안내합니다.'
  }];
  const demoAccountPins = { '12345678': '1234', '87654321': '1234', '24681357': '12345678' };
  const data={groups,services,auxiliaryServices,scenarios,service,authStep,search,validAmount,homeTrafficStatus:'혼잡',trafficSkills,homeNotices,demoAccountPins};
  if(typeof module!=='undefined'&&module.exports)module.exports=data;else root.ARSData=data;
})(typeof window!=='undefined'?window:globalThis);
