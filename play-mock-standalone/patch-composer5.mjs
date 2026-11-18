import fs from 'node:fs';
process.chdir('dist/assets');
let s=fs.readFileSync('index-Y4llPcQR.js','utf8');
const rep=(a,b)=>{if(s.split(a).length!==2)throw new Error('match '+a.slice(0,50));s=s.replace(a,()=>b);};
rep('const panel2=containerApi.getPanel(api.id);if(!panel2)return;const{onPopout}=api.getParameters();',
 'const panel2=containerApi.getPanel(api.id);if(!panel2)return;const refGroupId=panel2.group.id,panelTitle=api.title,{onPopout}=api.getParameters();');
rep('injectStylesIntoWindow(popoutWindow)}',
 'injectStylesIntoWindow(popoutWindow);const wt=setInterval(()=>{if(popoutWindow.closed){clearInterval(wt);setTimeout(()=>{const p=containerApi.getPanel(api.id);if(p&&p.api.location.type==="popout"){containerApi.removePanel(p);const rg=containerApi.getGroup(refGroupId);containerApi.addPanel(rg&&rg.panels.length===0?{id:api.id,component:api.id,title:panelTitle,position:{referenceGroup:rg}}:{id:api.id,component:api.id,title:panelTitle,position:{direction:"right"}});const np=containerApi.getPanel(api.id);np&&np.group.api.setVisible(!0);onPopout?.(api.id,!1)}},300)}},500)}');
fs.writeFileSync('index-Y4llPcQR.js',s);
