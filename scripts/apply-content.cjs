// Validate a user-exported local edit file before writing the publishable module.
const fs=require('node:fs');
const path=require('node:path');
const M=require('../content-model.js');
const catalog=require('../v48-menu-data.js');
function importContent(source,target=path.join(__dirname,'../content-data.js')){
  const stat=fs.statSync(source);if(stat.size>2*1024*1024)throw new Error('편집 파일은 2 MB 이하여야 합니다.');
  const data=M.validate(JSON.parse(fs.readFileSync(source,'utf8').replace(/^\uFEFF/,'')),catalog);
  fs.writeFileSync(target,M.toScript(data),'utf8');
  return data;
}
if(require.main===module){
  try{
    if(!process.argv[2])throw new Error('사용법: npm run apply:content -- "저장한 편집 파일.json"');
    const data=importContent(path.resolve(process.argv[2]));
    console.log(`편집 내용을 content-data.js에 반영했습니다. 문구 ${data.copies.length+Object.keys(data.labels).length}개 / 메뉴 순서 ${Object.keys(data.itemOrder).length+(data.categoryOrder.length?1:0)}개. 다음 단계: npm run test:demo`);
  }catch(error){console.error(error.message);process.exitCode=1;}
}
module.exports={importContent};
