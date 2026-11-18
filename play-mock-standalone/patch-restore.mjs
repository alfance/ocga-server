// Popped-out panels return to their original place in the dock (not all stacked on the right).
import fs from 'node:fs';
const js = 'dist/assets/index-Y4llPcQR.js';
let s = fs.readFileSync(js, 'utf8');
const rep = (a, b) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error(n + ' matches for ' + a.slice(0, 60)); s = s.replace(a, () => b); };
rep('const DockTabHeader=({api,containerApi})=>{',
  'function gaRestorePos(api,id,rg){if(rg&&rg.panels.length===0)return{referenceGroup:rg};if(id==="perf")return{direction:"left"};if(id==="logs"&&api.getPanel("qr")&&api.getPanel("qr").api.location.type==="grid")return{direction:"right",referencePanel:"qr"};const M={perf:["left","player"],logs:["below","player"],qr:["left","logs"],overview:["right","player"],network:["within","perf"]},m=M[id],inGrid=n=>{const p=api.getPanel(n);return!!p&&p.api.location.type==="grid"};if(m){if(inGrid(m[1]))return{direction:m[0],referencePanel:m[1]};if(m[1]!=="player"&&id!=="network"&&inGrid("player"))return{direction:id==="qr"?"below":m[0],referencePanel:"player"}}return{direction:"right"}}const DockTabHeader=({api,containerApi})=>{');
rep('containerApi.addPanel(rg&&rg.panels.length===0?{id:api.id,component:api.id,title:panelTitle,position:{referenceGroup:rg}}:{id:api.id,component:api.id,title:panelTitle,position:{direction:"right"}});const np=containerApi.getPanel(api.id);',
  'containerApi.addPanel({id:api.id,component:api.id,title:panelTitle,position:gaRestorePos(containerApi,api.id,rg)});const np=containerApi.getPanel(api.id);(api.id==="logs"||api.id==="qr")&&np&&np.group.element.classList.add("logs-group");const GW={perf:550,qr:230,overview:280};GW[api.id]&&np&&requestAnimationFrame(()=>requestAnimationFrame(()=>np.group.api.setSize({width:GW[api.id]})));if(api.id==="logs"){const qp=containerApi.getPanel("qr");qp&&requestAnimationFrame(()=>requestAnimationFrame(()=>qp.group.api.setSize({width:230})))}');
fs.writeFileSync(js, s);
