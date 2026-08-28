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
  function createSession(taskId,requiredCount){
    return {taskId,documents:Array(Math.max(0,requiredCount||0)).fill(null),status:'draft',receiptNo:'',submittedAt:''};
  }
  function attachDocument(session,index,method){
    if(!session || !['camera','file','gallery'].includes(method) || index<0 || index>=session.documents.length) return session;
    const documents=session.documents.slice();
    documents[index]={method,attached:true};
    return {...session,documents};
  }
  function canSubmit(session){
    return !!session && session.documents.length>0 && session.documents.every(x=>x&&x.attached);
  }
  function submit(session){
    if(!canSubmit(session)) return {session,error:'필수 서류를 모두 첨부해 주세요.'};
    const now=new Date();
    const date=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('');
    const receiptNo=`DF-${date}-${String(Math.floor(Math.random()*10000)).padStart(4,'0')}`;
    return {session:{...session,status:'received',receiptNo,submittedAt:now.toLocaleString('ko-KR')},error:''};
  }
  return {STATUSES,createSession,attachDocument,canSubmit,submit};
});
