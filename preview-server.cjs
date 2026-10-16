// Run with `node preview-server.cjs`. Serves only the prototype's public assets.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawn} = require('node:child_process');
const host = '127.0.0.1';
const port = 4178;
const url = `http://${host}:${port}/index.html?v=v48`;
const marker = 'kiwoom-local-preview';
const root = fs.realpathSync(__dirname);
const logPath = path.join(os.tmpdir(), 'kiwoom-preview-server.log');
const publicFiles = new Set(['index.html','style.css','v48-home.css','app.js','digital-form.js','v47-self-service.js','v47-myinfo.js','v47-untact.js','v48-documents.js','v48-documents-ui.js','v48-auth.js','v48-auth-ui.js','v48-menu-data.js','v48-home.js','v48-search.js','v48-navigation.js']);
['content-data.js','content-model.js','content-runtime.js','local-editor.js','local-editor.css'].forEach(name=>publicFiles.add(name));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2'};

function serve(){
  const server = http.createServer((req,res)=>{
    if(![`${host}:${port}`,`localhost:${port}`].includes(req.headers.host) || !['GET','HEAD'].includes(req.method)) {res.writeHead(403).end();return;}
    res.setHeader('X-Preview-Server',marker);
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Content-Type-Options','nosniff');
    try {
      const pathname = decodeURIComponent(new URL(req.url,url).pathname);
      if(pathname==='/__preview_health') {res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'}).end(marker);return;}
      const name = pathname==='/'?'index.html':pathname.slice(1);
      const extension = path.extname(name).toLowerCase();
      const asset = /^(assets|레퍼런스)\//.test(name) && ['.svg','.png','.jpg','.jpeg','.webp','.ico','.woff2'].includes(extension);
      if(name.includes('..') || name.includes('\\') || (!publicFiles.has(name) && !asset)) {res.writeHead(404).end();return;}
      const file = fs.realpathSync(path.join(root,name));
      if(!file.startsWith(root+path.sep) || !fs.statSync(file).isFile()) {res.writeHead(404).end();return;}
      res.writeHead(200,{'Content-Type':types[extension]});
      if(req.method==='HEAD')res.end();else fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
    }catch{res.writeHead(404).end();}
  });
  server.on('error',error=>{console.error(error.message);process.exitCode=1;});
  server.listen(port,host,()=>console.log(`${new Date().toISOString()} Ready: ${url}`));
}

function probe(){
  return new Promise(resolve=>{
    const request=http.get(`http://${host}:${port}/__preview_health`,res=>{
      const own=res.statusCode===200 && res.headers['x-preview-server']===marker;
      res.resume();resolve(own?'ready':'occupied');
    });
    request.setTimeout(1000,()=>request.destroy());
    request.on('error',()=>resolve('offline'));
  });
}

async function start(){
  const state=await probe();
  if(state==='ready'){console.log(`Already running: ${url}`);return;}
  if(state==='occupied')throw new Error(`Port ${port} is used by another service. It was left unchanged.`);
  const output=fs.openSync(logPath,'a');
  const child=spawn(process.execPath,[__filename,'--serve'],{cwd:root,detached:true,windowsHide:true,stdio:['ignore',output,output]});
  let launchError;
  child.on('error',error=>{launchError=error;});
  child.unref();fs.closeSync(output);
  for(let attempt=0;attempt<30;attempt++){
    if(launchError)throw launchError;
    if(await probe()==='ready'){console.log(`Ready: ${url}`);return;}
    await new Promise(resolve=>setTimeout(resolve,100));
  }
  throw new Error(`Preview did not start. Check ${logPath}`);
}
if(process.argv.includes('--serve'))serve();
else start().catch(error=>{console.error(error.message);process.exitCode=1;});
