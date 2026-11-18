import fs from 'node:fs';
const f='dist/assets/index-Y4llPcQR.js';let s=fs.readFileSync(f,'utf8');
const a='np&&np.group.api.setVisible(!0);onPopout?.(api.id,!1)';
if(s.split(a).length!==2)throw new Error('match');
s=s.replace(a,()=>'np&&np.group.api.setVisible(!0);api.id==="composer"&&np&&requestAnimationFrame(()=>np.group.api.setSize({width:400}));onPopout?.(api.id,!1)');
s=s.replace('window.__dock=event.api,',()=>'');
fs.writeFileSync(f,s);
