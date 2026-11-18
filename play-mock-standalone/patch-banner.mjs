import fs from 'node:fs';
const f = 'dist/assets/SopAccountDropdown-C2BeFb0J.js';
let s = fs.readFileSync(f, 'utf8');
const a = 'padding:"4px 10px",border:"1px solid currentColor"';
if (s.split(a).length !== 2) throw new Error('match');
fs.writeFileSync(f, s.replace(a, 'padding:"4px 10px",border:0'));
const c = 'dist/assets/index-DkIuH5f8.css';
fs.appendFileSync(c, '\n._banner_1ud11_1{height:48px;max-height:48px;overflow:hidden;align-items:center;padding-top:0;padding-bottom:0}\n');
