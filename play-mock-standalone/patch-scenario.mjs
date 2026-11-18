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

// 1. Second mock game
edit('dist/assets/index-CTqDrwBd.js', [
  ['mockGames=[{id:MOCK_GAME_ID,title:"Local Mock Game"}]', 'mockGames=[{id:MOCK_GAME_ID,title:"Local Mock Game"},{id:"999002",title:"Playable test"}]'],
]);

// 2. Summary banner: custom label + Investigate action
edit('dist/assets/SopAccountDropdown-C2BeFb0J.js', [
  ['const{severity,text:text2}=summary,bannerClass', 'const{severity,text:text2,label:customLabel,onInvestigate}=summary,bannerClass'],
  ['children:SEVERITY_LABEL[severity]}),jsxRuntimeExports.jsx("span",{className:styles$9.text,children:text2})]}),',
   'children:customLabel||SEVERITY_LABEL[severity]}),jsxRuntimeExports.jsx("span",{className:styles$9.text,children:text2})]}),onInvestigate&&jsxRuntimeExports.jsx("button",{type:"button",onClick:onInvestigate,style:{display:"inline-flex",alignItems:"center",gap:4,marginRight:8,padding:"4px 10px",border:"1px solid currentColor",borderRadius:4,background:"transparent",color:"inherit",font:"inherit",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"},children:"\u2726 Investigate"}),'],
]);

// 3. Play: fail for "Playable test" until the PIN is reset, expose panel opener
edit('dist/assets/index-Y4llPcQR.js', [
  ['(async()=>{if(isDisconnected)try{await refetchChannels()}',
   '(async()=>{if(isDisconnected&&selectedGame?.value==="999002"&&!window.__ga?.pinFixed){setTimeout(()=>setPerformanceSummary({severity:"fail",label:"\u26A0 Can\u2019t play game",text:"Invalid Test Account PIN. The provided PIN does not match the one associated with the test account. Please verify and try again. (code: VALIDATION_INVALID_PREVIEW_PIN)",onInvestigate:()=>window.__gaInvestigate?.()}),900);return}if(isDisconnected)try{await refetchChannels()}'],
  ['},[start,disconnect,isDisconnected,refetchChannels,telemetry]);reactExports.useEffect(()=>{headless&&selectedChannel',
   '},[start,disconnect,isDisconnected,refetchChannels,telemetry,selectedGame]);reactExports.useEffect(()=>{headless&&selectedChannel'],
  [';return headless?jsxRuntimeExports.jsx("div",{style:{width:"100vw"', ';window.__gaOpen=handleComposerToggle;return headless?jsxRuntimeExports.jsx("div",{style:{width:"100vw"'],
]);

// 4. Bridge script
edit('dist/index.html', [
  ['<script type="module" crossorigin src="/assets/index-CTqDrwBd.js"></script>', '<script src="/ga-bridge.js"></script>\n      <script type="module" crossorigin src="/assets/index-CTqDrwBd.js"></script>'],
]);
