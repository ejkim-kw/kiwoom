/* Field order follows the certificate application designs. */
(function (root) {
  'use strict';
  const templates = {
    certificate: ['language', 'englishName', 'date', 'purpose', 'purposeDetail', 'copies'],
    'certificate-trades': ['startDate', 'endDate', 'purpose', 'purposeDetail', 'copies'],
    'certificate-income': ['year'],
    'certificate-bank': ['transferKind', 'direction', 'currency', 'startDate', 'endDate', 'copies', 'seal'],
    'certificate-withholding': ['startDate', 'endDate', 'copies'],
    'certificate-derivatives-tax': ['year', 'copies', 'seal'],
    'certificate-foreign-tax': ['byStock', 'year', 'quarter', 'copies'],
    'certificate-account-proof': ['date', 'seal'],
    'certificate-foreign-dividend': ['year', 'seal'],
    'certificate-foreign-paid-tax': ['year', 'seal'],
    'certificate-resident': ['date'],
    'certificate-domestic-outbound': ['startDate', 'endDate'],
    'certificate-foreign-transfer': ['startDate', 'endDate']
  };
  const fields = {
    language: {label:'발급 언어', choices:['국문', '영문']},
    englishName: {label:'영문명', placeholder:'여권에 적힌 영문 이름', maxlength:80},
    date: {label:'기준일', type:'date'},
    startDate: {label:'신청 시작일', type:'date'},
    endDate: {label:'신청 종료일', type:'date'},
    purpose: {label:'용도', options:['비자 발급', '소득 증빙', '기타']},
    purposeDetail: {label:'기타 용도', placeholder:'서류를 사용할 곳이나 목적', maxlength:80},
    copies: {label:'신청 매수', inputmode:'numeric', placeholder:'예) 1', unit:'매'},
    transferKind: {label:'이체 구분', choices:['전체', '카드이체', '통장이체']},
    direction: {label:'입출금 구분', choices:['전체', '입금', '출금']},
    currency: {label:'외화 거래', choices:['제외', '포함']},
    byStock: {label:'종목별 내역', choices:['필요', '불필요']},
    year: {label:'대상 연도'},
    quarter: {label:'분기', options:['전체', '1분기', '2분기', '3분기', '4분기']},
    phone: {label:'연락처', type:'tel', inputmode:'tel', placeholder:'숫자만 입력'},
    disclosure: {label:'고객정보 공개 범위', choices:['일부', '전체']},
    email: {label:'수령 이메일', readonly:true, hint:'이메일 주소는 영웅문S#에서 변경할 수 있습니다.'},
    seal: {label:'직인 날인', choices:['필요', '불필요']}
  };
  function localDate(date = new Date()) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  }
  function activeFields(id, values, today = localDate()) {
    const keys = templates[id];
    const names = [...keys.filter(name => name !== 'seal'), 'phone', 'disclosure', 'email'];
    if (keys.includes('seal')) names.push('seal');
    return names.filter(name => name !== 'purposeDetail' || values.purpose === '기타').map(name => {
      const spec = {...fields[name], name};
      if (name === 'englishName' && values.language !== '영문') {
        spec.label = '영문명 (선택)';
        spec.required = false;
      }
      if (name === 'year') {
        const last = Number(today.slice(0,4)) - Number(id === 'certificate-foreign-tax');
        spec.options = Array.from({length:last - 1999}, (_, i) => (last - i) + '년');
        spec.initial = spec.options[0];
        if (id === 'certificate-foreign-tax') spec.hint = '직전 연도까지 신청할 수 있습니다.';
      }
      if (spec.choices) spec.initial = spec.choices[0];
      if (spec.type === 'date') { spec.initial = today; spec.max = today; }
      if (id === 'certificate' && name === 'date') spec.hint = '오늘을 기준일로 신청하면 당일 출금·출고가 제한됩니다.';
      if (id === 'certificate-trades' && name === 'purpose') spec.options = ['거래내역 증빙', '기타'];
      if (id === 'certificate-bank' && name === 'endDate') spec.hint = '최대 1년, 외화 거래를 포함하면 최대 6개월까지 선택할 수 있습니다.';
      if (name === 'quarter') spec.initial = '전체';
      return spec;
    });
  }
  function afterMonths(day, months) {
    const [y,m,d] = day.split('-').map(Number);
    const lastDay = new Date(y, m + months, 0).getDate();
    return localDate(new Date(y, m - 1 + months, Math.min(d, lastDay)));
  }
  function validate(id, values, today = localDate()) {
    for (const field of activeFields(id, values, today)) {
      const name = field.name, value = String(values[name] || '').trim();
      if (!value && field.required !== false) return [name, field.label + ' 항목을 확인해 주세요.'];
      const choices = field.options || field.choices;
      if (choices && !choices.includes(value)) return [name, field.label + ' 항목을 선택해 주세요.'];
      if (field.type === 'date' && (!/^\d{4}-\d{2}-\d{2}$/.test(value) || localDate(new Date(value + 'T12:00:00')) !== value || value > today)) {
        return [name, '오늘까지의 날짜를 선택해 주세요.'];
      }
    }
    if (values.englishName && !/^[a-z][a-z .'-]*$/i.test(values.englishName.trim())) return ['englishName','영문명을 영문자로 입력해 주세요.'];
    if (values.startDate > values.endDate) return ['endDate','종료일을 시작일과 같거나 이후로 선택해 주세요.'];
    if (id === 'certificate-bank' && values.endDate > afterMonths(values.startDate, values.currency === '포함' ? 6 : 12)) {
      return ['endDate', values.currency === '포함' ? '외화 거래를 포함하면 최대 6개월까지 신청할 수 있습니다.' : '한 번에 최대 1년까지 신청할 수 있습니다.'];
    }
    if (templates[id].includes('copies') && !/^[1-9]\d*$/.test(values.copies)) return ['copies','신청 매수를 1 이상의 정수로 입력해 주세요.'];
    if (!/^0\d{8,10}$/.test(values.phone.replace(/[- ]/g,''))) return ['phone','연락처를 지역번호 또는 010을 포함해 입력해 주세요.'];
    return null;
  }
  function receiptItems(id, values, account, today = localDate()) {
    const items = [['증권계좌번호', account]];
    for (const field of activeFields(id, values, today)) {
      const {name} = field;
      if (!values[name] || name === 'endDate') continue;
      if (name === 'startDate') items.push(['신청 기간', values.startDate + ' ~ ' + values.endDate]);
      else items.push([fields[name].label, values[name] + (field.unit || '')]);
    }
    return items;
  }
  const model = {catalog:Object.keys(templates), activeFields, validate, receiptItems};
  if (typeof module !== 'undefined' && module.exports) module.exports = model;
  else root.ARSCertificates = model;
})(typeof window !== 'undefined' ? window : globalThis);
