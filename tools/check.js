// src/game.html の <script> を全部取り出して、文法エラーがないか確かめる
const fs=require('fs'), vm=require('vm'), path=require('path');
const f=path.join(__dirname,'..','src','game.html');
const html=fs.readFileSync(f,'utf8');
const re=/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g; let m, n=0;
while((m=re.exec(html))){ if(m[1]&&/\bsrc=/.test(m[1])) continue; n++;
  try{ new vm.Script(m[2],{filename:'game.html#script'+n}); }
  catch(e){ console.error('文法エラー (script '+n+'):',e.message); process.exit(1); } }
const v=(html.match(/const VER='([^']+)'/)||[])[1];
const spans=(html.match(/<span class="verNo">([^<]+)<\/span>/g)||[]).map(s=>s.replace(/<[^>]+>/g,''));
if(!v||spans.length!==2||spans.some(s=>s!==v)){ console.error('バージョン表記がそろっていません: VER='+v+' verNo='+spans.join(',')); process.exit(1); }
console.log('OK: script '+n+'個に文法エラーなし / ver '+v);
