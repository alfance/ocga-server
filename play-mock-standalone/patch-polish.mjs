import fs from 'node:fs';
const edit = (file, pairs) => {
  let s = fs.readFileSync(file, 'utf8');
  for (const [a, b] of pairs) {
    const n = s.split(a).length - 1;
    if (n !== 1) throw new Error(`${file}: ${n} matches for ${a.slice(0, 70)}`);
    s = s.replace(a, () => b);
  }
  fs.writeFileSync(file, s);
};
edit('dist/assets/SopAccountDropdown-C2BeFb0J.js', [
  ['jsxRuntimeExports.jsx("span",{className:styles$9.badge,children:"\u2726 AI Summary"}),', '!customLabel&&jsxRuntimeExports.jsx("span",{className:styles$9.badge,children:"\u2726 AI Summary"}),'],
  ['className:styles$9.severityLabel,children:customLabel||', 'className:styles$9.severityLabel,style:customLabel?{fontWeight:700}:void 0,children:customLabel||'],
]);
edit('dist/assets/index-Y4llPcQR.js', [
  ['label:"\u26A0 Can\u2019t play game"', 'label:"Can\u2019t play game"'],
]);
let css = fs.readFileSync('dist/assets/index-DkIuH5f8.css', 'utf8');
if (css.split('right:0;top:76px;z-index:50').length !== 2) throw new Error('css');
css = css.replace('right:0;top:76px;z-index:50', 'right:0;top:calc(76px + var(--ga-banner-h,0px));z-index:50');
fs.writeFileSync('dist/assets/index-DkIuH5f8.css', css);
