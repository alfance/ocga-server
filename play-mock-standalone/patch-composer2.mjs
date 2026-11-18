import fs from 'node:fs';
const js='index-Y4llPcQR.js', css='index-DkIuH5f8.css';
let s=fs.readFileSync(js,'utf8');
const rep=(a,b)=>{const n=s.split(a).length-1;if(n!==1)throw new Error(n+' matches for '+a.slice(0,60));s=s.replace(a,()=>b);};
rep('event.api.onDidLayoutChange(()=>{const p=event.api.getPanel("composer");setComposerOpen(!!p&&p.group.api.isVisible)}),',
 '(()=>{let prev="grid",w=300;event.api.onDidLayoutChange(()=>{const p=event.api.getPanel("composer");if(!p){prev="grid";setComposerOpen(!1);return}const loc=p.api.location.type,vis=p.group.api.isVisible;if(loc==="grid"&&vis&&prev==="grid"&&p.group.api.width>0)w=p.group.api.width;if(prev==="popout"&&loc==="grid"){p.group.api.setVisible(!0);requestAnimationFrame(()=>p.group.api.setSize({width:w}))}prev=loc;setComposerOpen(loc==="popout"||vis)})})(),');
rep('width:14,height:14,viewBox:"0 0 16 16"','width:16,height:16,viewBox:"0 0 16 16"');
rep(',jsxRuntimeExports.jsx("span",{key:"t",children:"AI"})]}),jsxRuntimeExports.jsx("div",{className:"sr-dock-container',']}),jsxRuntimeExports.jsx("div",{className:"sr-dock-container');
fs.writeFileSync(js,s);
let c=fs.readFileSync(css,'utf8');
const i=c.indexOf('\n.composer-tab{');if(i<0)throw 'css';
c=c.slice(0,i)+'\n.composer-tab{--cb:var(--hawkins-theme-surface-highlight,#2d2d2d);position:fixed;right:0;top:140px;z-index:50;width:32px;height:40px;padding:0;display:flex;align-items:center;justify-content:center;border:1px solid transparent;border-right:0;border-radius:8px 0 0 8px;background:linear-gradient(var(--cb),var(--cb)) padding-box,linear-gradient(180deg,#4061e7,#e5486f) border-box;color:var(--hawkins-theme-foreground,#fff);cursor:pointer;box-shadow:-2px 2px 8px rgba(0,0,0,.4)}\n.composer-tab:hover{width:36px}\n';
fs.writeFileSync(css,c);
