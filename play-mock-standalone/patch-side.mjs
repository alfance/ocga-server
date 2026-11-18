// Moves the Game Assistant out of the dock into a full-height right column (own level, beside the top bar).
import fs from 'node:fs';
const js = 'dist/assets/index-Y4llPcQR.js';
let s = fs.readFileSync(js, 'utf8');
const rep = (a, b) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error(n + ' matches for ' + a.slice(0, 60)); s = s.replace(a, () => b); };
const i = s.indexOf('handleComposerToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;');
const endMark = 'setComposerOpen(!0)},[]);window.__gaOpen=handleComposerToggle;';
const j = s.indexOf(endMark, i);
if (i < 0 || j < 0) throw new Error('toggle not found');
s = s.slice(0, i) + 'handleComposerToggle=reactExports.useCallback(()=>{window.__gaSide&&window.__gaSide(!0),setComposerOpen(!0)},[]);window.__gaSetOpen=setComposerOpen;window.__gaOpen=handleComposerToggle;' + s.slice(j + endMark.length);
rep('if(!p){prev="grid";setComposerOpen(!1);return}', 'if(!p){prev="grid";return}');
rep('prev=loc;setComposerOpen(loc==="popout"||vis)', 'prev=loc');
fs.writeFileSync(js, s);
