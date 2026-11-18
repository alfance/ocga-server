import fs from 'node:fs';
process.chdir('dist/assets');
let s=fs.readFileSync('index-Y4llPcQR.js','utf8');
const a='onDidOpen:({window:popoutWindow})=>{injectStylesIntoWindow(popoutWindow)}';
if(s.split(a).length!==2)throw new Error('match');
s=s.replace(a,()=>'onDidOpen:({window:popoutWindow})=>{injectStylesIntoWindow(popoutWindow);const wt=setInterval(()=>{if(popoutWindow.closed){clearInterval(wt);setTimeout(()=>{const p=containerApi.getPanel(api.id);p&&p.api.location.type==="popout"&&(onPopout?.(api.id,!1),p.api.moveTo({position:"right"}))},300)}},500)}');
fs.writeFileSync('index-Y4llPcQR.js',s);
