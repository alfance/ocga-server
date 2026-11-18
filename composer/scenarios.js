/* Scripted demo flows for the Game Assistant. Everything here is fake data.
 * Each flow receives `api` from composer.js:
 *   user(text) say(text) status(text|null) block({key,tone,html,select,buttons,meta}) remove(key)
 *   wait(ms) focusInput() notify(type)
 * `act(name, ctx, api)` handles button clicks (ctx.value is the selected dropdown value). */
window.GAScenarios = (() => {
  const SESSION = '04edf1b0-4991-4847-b075-e9b6039ad759';
  const TESTER = 'mock-tester@netflix.com';
  const QUESTION = `What went wrong with session ${SESSION}? Tester: ${TESTER} Channel: deae8d23-5984-48f1-9ed5-8af9eba9786f Build: 1142088860300496 Error: Invalid Test Account Pin The provided PIN does not match the one associated with the test account. Please verify and try again. (code: VALIDATION_INVALID_PREVIEW_PIN)`;
  const TARGETS = ['My Location (US-East, LAX edge)', 'Reviewer region (EU-West, AMS edge)', 'Reviewer region (APAC, NRT edge)'];
  let run = 0;

  /* ── Example 1: playability check ──────────────────────────────────── */
  const CHECKS = [
    { name: 'Routing to Games Cortex', plain: true },
    { name: "Using skill 'ocga-hardware-health'", ok: 'dev hardware healthy' },
    { name: "Using skill 'geolocation-check'", ok: 'reachable from producer network' },
    { name: "Using skill 'game-performance-check'", ok: '60fps stable' },
    { name: "Using skill 'other-playability-checks'", ok: 'passed' },
  ];
  const mark = (s) => ({ done: '✓', run: '…', queued: ' ', fail: '✕' }[s]);
  function progressHtml(states) {
    return CHECKS.map((c, i) => {
      const s = states[i];
      const tail = c.plain ? '' : ` — ${s === 'done' ? c.ok : s === 'run' ? 'running' : 'queued'}`;
      return `<div class="chk ${s}"><span class="mk">${mark(s)}</span>${c.name}${tail}</div>`;
    }).join('');
  }
  const row = (state, text) => `<div class="chk ${state}"><span class="mk">${mark(state)}</span>${text}</div>`;

  async function playability(api, target, failGeo) {
    const id = `pl${++run}`;
    api.block({ key: `${id}-info`, tone: 'card', html: `<strong>Playability Check — Recommended Build (Game_Dev)</strong><br>Build 1136497017434800 · Channel f4da56c0-f9cb-4689-96d0-381f26eed196<br>Target: ${target}<br>Running automated checks before you play.` });
    const states = CHECKS.map(() => 'queued');
    api.block({ key: `${id}-run`, tone: 'card', html: progressHtml(states) });
    for (let i = 0; i < CHECKS.length; i++) {
      states[i] = 'run';
      api.block({ key: `${id}-run`, html: progressHtml(states) });
      await api.wait(900);
      states[i] = 'done';
      api.block({ key: `${id}-run`, html: progressHtml(states) });
    }
    api.remove(`${id}-run`);
    if (!failGeo) {
      api.block({ key: `${id}-banner`, tone: 'success', html: 'Checks completed successfully. Ready to launch.' });
      api.block({ key: `${id}-res`, tone: 'card', html: row('done', 'OCGA hardware health — healthy') + row('done', 'Geolocation check — 38ms round trip') + row('done', "Using skill 'geolocation-check' — reachable from producer network") + row('done', 'Game performance check — 60fps stable') + row('done', 'Other playability checks — passed') });
      api.block({ key: `${id}-ask`, tone: 'outline', html: "<strong>Check from a different target?</strong><br>Verify this build for a reviewer's region or a specific OCGA appliance before you promote it.", select: { options: TARGETS, value: TARGETS[0] }, buttons: [{ label: 'Steer and Recheck', act: 'recheck', primary: true }], meta: 'Trace:5345345/44' });
    } else {
      api.block({ key: `${id}-banner`, tone: 'error', html: 'Recommended build failed 1 check' });
      api.block({ key: `${id}-res`, tone: 'card', html: row('done', 'OCGA hardware health — healthy') + row('fail', 'Geolocation check — unreachable') + row('done', "Using skill 'geolocation-check' — reachable from producer network") + row('done', 'Game performance check — 60fps stable') + row('done', 'Other playability checks — passed') + '<p>This looks like a routing issue between the target region and the OCGA appliance serving it, not a build problem. Nearest healthy appliance is ocga-4502, 12ms round trip, no packet loss.</p>' });
      api.block({ key: `${id}-ask`, tone: 'outline', html: '<strong>Reroute session to ocga-4502?</strong><br>US-East backup appliance. Cortex can apply this automatically.', buttons: [{ label: 'Steer and Recheck', act: 'reroute', primary: true }, { label: 'Do Not Approve', act: 'deny' }], meta: 'Trace:5345345/44' });
    }
  }

  /* ── Example 2: cannot play, invalid PIN ───────────────────────────── */
  const cell = (s) => `<td>${s}</td>`;
  const REPORT = `<h3>Session Diagnosis</h3>
<p><b>Session:</b> <code>${SESSION}</code><br><b>Game:</b> Playable test ( <code>999002</code> )<br><b>Error:</b> <code>VALIDATION_INVALID_PREVIEW_PIN</code> — the PIN entered at the Content Preview prompt did not match the PIN on the tester account.</p>
<h4>What I found</h4>
<table><tr><th>Check</th><th>Result</th></tr>
<tr>${cell('Account status')}${cell('✅ <b>Active</b> (expires 2027-06-10)')}</tr>
<tr>${cell('Environment')}${cell('✅ <b>Production</b>')}</tr>
<tr>${cell('Country')}${cell('✅ <b>US</b>')}</tr>
<tr>${cell('Game provisioned')}${cell('✅ <b>Playable test</b> is provisioned')}</tr>
<tr>${cell('Internal account')}${cell('✅ <b>Yes</b>')}</tr>
<tr>${cell('PIN validation')}${cell('❌ <b>Failed</b> — wrong PIN entered')}</tr></table>
<h4>Root cause</h4>
<p>The account and provisioning are all in order. The only issue is that the <b>Content Preview PIN entered during the play attempt was incorrect</b>. This is the PIN set when the tester account was created — it's required when launching an unreleased game via Content Preview.</p>
<h4>Fix</h4>
<p>The user can either:</p>
<ol><li><b>Re-enter the correct PIN</b> on the next play attempt, or</li><li><b>Reset the PIN</b> if the original is unknown — this generates a new PIN that can be used going forward.</li></ol>`;

  async function investigate(api) {
    api.user(QUESTION);
    api.status('🔍 Routing your question... | trace:c2fe4d74');
    await api.wait(1400);
    api.status("Using skill `game-access-troubleshooting`");
    await api.wait(1600);
    api.status('Calling MCP `games_inspect_account`');
    await api.wait(1800);
    api.status(null);
    api.block({ tone: 'report', html: REPORT, buttons: [{ label: '✦ Reset PIN', act: 'resetAsk', primary: true }, { label: 'Ask something else', act: 'else' }], meta: 'generated by games_cortex · trace:c2fe4d74 · skills=game-access-troubleshooting · mcp=gamesmcp__games_session_lookup,gamesmcp__games_inspect_account · elapsed=50s · tokens=106k (104k cached) · usd=0.13' });
  }

  async function act(name, ctx, api) {
    if (name === 'recheck') {
      const failing = !String(ctx.value || '').startsWith('My Location');
      return playability(api, ctx.value || TARGETS[0], failing);
    }
    if (name === 'reroute') return playability(api, 'ocga-4502 (US-East backup appliance)', false);
    if (name === 'deny') { api.say('Understood. No changes were made to the routing.'); return undefined; }
    if (name === 'resetAsk') {
      api.status('Preparing the PIN reset...');
      await api.wait(1800);
      api.status(null);
      api.block({
        tone: 'approval',
        title: `Cortex wants to reset the PIN for ${TESTER}`,
        desc: 'This generates a new PIN and the current one stops working immediately. Nothing changes until you approve.',
        details: `Tool: gamesmcp__games_manage_tester_account<br>Action: reset_pin<br>Account: ${TESTER}<br>Game: Playable test (999002)<br>Effect: current PIN is invalidated, a new 4-digit PIN is issued.`,
        buttons: [{ label: 'Approve', act: 'resetGo', variant: 'primary' }, { label: 'Reject', act: 'resetNo', variant: 'destructive' }],
      });
      return undefined;
    }
    if (name === 'resetNo') { api.say('Understood. The request was rejected and the PIN was not changed.'); return undefined; }
    if (name === 'resetGo') {
      api.user(`Yes, please reset the PIN for ${TESTER}`);
      api.status('Thinking...');
      await api.wait(2400);
      api.status(null);
      const pin = String(1000 + Math.floor(Math.random() * 9000));
      api.block({ tone: 'report', html: `<p class="ok-line"><span class="ok-ic"></span>The PIN has been reset successfully.</p><table><tr><th>Detail</th><th>Value</th></tr><tr>${cell('Account')}${cell(`<code>${TESTER}</code>`)}</tr><tr>${cell('New PIN')}${cell(`<code>${pin}</code>`)}</tr></table><p>Use this PIN on the next play attempt for Playable test. The old PIN is no longer valid.</p>`, meta: 'generated by games_cortex · trace:9762a560 · mcp=gamesmcp__games_manage_tester_account · elapsed=12s · tokens=76k (76k cached) · usd=0.05' });
      api.notify('pin-reset');
      return undefined;
    }
    if (name === 'else') { api.say('Sure, what would you like to know?'); api.focusInput(); }
    return undefined;
  }

  return {
    suggestion: 'Why did CPU spike last session?',
    playability: (api, text) => { if (text) api.user(text); return playability(api, TARGETS[0], false); },
    investigate,
    act,
  };
})();
