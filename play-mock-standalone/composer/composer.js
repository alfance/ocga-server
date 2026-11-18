(() => {
  const $ = (s) => document.querySelector(s);
  const text = $('#text'), send = $('#send'), dd = $('#dropdown'), hist = $('#history');
  const field = dd.querySelector('.field'), menu = dd.querySelector('.menu');
  const SC = window.GAScenarios;

  /* ── Composer behavior ─────────────────────────────────────────────── */
  text.dataset.placeholder = `Ask anything, e.g. “${SC.suggestion}”`;
  const update = () => { send.disabled = !text.textContent.trim(); };
  text.addEventListener('input', update);
  text.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !text.textContent.trim() && !e.shiftKey) {
      // Tab accepts the suggestion shown as the placeholder.
      e.preventDefault();
      text.textContent = SC.suggestion;
      update();
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!send.disabled) send.click(); }
  });
  send.addEventListener('click', () => {
    const value = text.textContent.trim();
    text.textContent = '';
    update();
    submit(value);
  });

  const toggle = (open) => { menu.hidden = !open; field.setAttribute('aria-expanded', open); };
  field.addEventListener('click', (e) => { e.stopPropagation(); toggle(menu.hidden); });
  menu.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) { $('#ddLabel').textContent = li.textContent; toggle(false); }
  });
  // Continue-in-MCP menu: Claude opens claude.ai in a new window, Slack is still a placeholder.
  const mcp = $('#mcp'), mcpBtn = mcp.querySelector('.mcp-btn'), mcpMenu = mcp.querySelector('.menu');
  const toggleMcp = (open) => { mcpMenu.hidden = !open; mcpBtn.setAttribute('aria-expanded', open); };
  mcpBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(false); toggleMcp(mcpMenu.hidden); });
  mcpMenu.addEventListener('click', (e) => {
    const url = e.target.closest('li')?.dataset.url;
    if (url) window.open(url, '_blank', 'noopener');
    toggleMcp(false);
  });
  field.addEventListener('click', () => toggleMcp(false));
  document.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-remove="attachment"]');
    if (rm) rm.closest('.attachment').remove();
    if (e.target.closest('#removeContext')) $('#context').hidden = true;
    toggle(false);
    toggleMcp(false);
  });

  /* ── Conversation history (saved in localStorage until cleared) ────── */
  const KEY = 'game-assistant.history.v1';
  const PAGE_KEY = 'game-assistant.page';
  const PENDING_KEY = 'game-assistant.pending';
  const read = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  // Scripted demo messages belong to the Play page load that created them, so a page refresh resets the demo.
  const getPage = () => read(PAGE_KEY);
  const STEPS = [
    { icon: 'globe', title: 'Searching the web for the user’s request', done: 'Searched content for your request' },
    { icon: 'step-database', title: 'Accessing data from Slate Manager', done: 'Searched content for your request' },
    { icon: 'globe', title: 'Putting it all together', done: 'Piecing together the response' },
  ];
  const REASONING = 'Scanning the current session for matching logs and metrics. Comparing resource usage against the configured envelope. Flagging anything that needs a closer look.';
  const timers = new Map();
  let epoch = 0;
  let messages = [];
  try { messages = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { messages = []; }
  messages = messages.filter((m) => m.role !== 'status' && (!m.scn || m.scn === getPage()));

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(messages)); } catch (e) { /* storage unavailable */ } };
  const icon = (n, size, cls = '') => `<img class="ic ${cls}" src="icons/${n}.svg" width="${size}" height="${size}" alt="">`;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function answerFor(q) {
    const short = q.length > 60 ? q.slice(0, 57) + '...' : q;
    return `Based on the available data, here are the results matching your request “${short}”. The session shows 4 warnings and 1 error in the last 5 minutes, CPU peaked at 92% and GPU at 88%. This is a placeholder response.`;
  }

  function stepsHtml(m) {
    return m.steps.map((s, i) => {
      const def = STEPS[i];
      return `<div class="step${s.done ? '' : ' running'}"><div class="icon">${icon(def.icon, 16)}</div><div class="txt"><div class="title">${esc(def.title)}</div><div class="sub">${s.done ? esc(def.done) : 'Working on it'}</div></div></div>`;
    }).join('');
  }

  function aiHtml(m) {
    const thinking = m.phase === 'thinking';
    const head = thinking
      ? '<img class="spin" src="icons/loader.svg" width="16" height="16" alt=""><span class="label">Thinking...</span>'
      : `<span class="label">Thought for ${m.secs}s</span>`;
    const body = `<div class="r-body"${m.open ? '' : ' hidden'}><p class="r-text">${esc(REASONING)}</p><div class="chain">${stepsHtml(m)}</div></div>`;
    const caret = icon(m.open ? 'chevron-up' : 'chevron-down', 16);
    const shown = m.answer.split(' ').slice(0, m.shown).join(' ');
    const answer = m.shown > 0 ? `<div class="ai-bubble"><p class="${m.phase === 'answering' ? 'cursor' : ''}">${esc(shown)}</p></div>` : '';
    const rx = m.phase === 'done'
      ? `<div class="rx"><button data-act="copy" aria-label="Copy">${icon('copy', 16)}</button><button data-act="regen" aria-label="Regenerate">${icon('refresh', 16)}</button><button data-act="up" aria-label="Good response" class="${m.rx === 'up' ? 'active' : ''}">${icon('thumbs-up', 16)}</button><button data-act="down" aria-label="Bad response" class="${m.rx === 'down' ? 'active' : ''}">${icon('thumbs-down', 16)}</button></div>`
      : '';
    return `<div class="reasoning"><button class="r-head" data-act="toggle" aria-expanded="${m.open}">${head}${caret}</button>${body}</div>${answer}${rx}`;
  }

  function approvalHtml(b) {
    const btn = (x) => `<button class="abtn ${x.variant || 'secondary'}" data-act="blk" data-b="${x.act}" ${b.used ? 'disabled' : ''}>${esc(x.label)}</button>`;
    return `<div class="blk approval"><div class="ap-body"><div class="ap-title">${esc(b.title)}</div><div class="ap-desc">${esc(b.desc)}</div>${b.showDetails ? `<div class="ap-details">${b.details}</div>` : ''}</div><div class="ap-foot"><div class="ap-actions">${b.buttons.map(btn).join('')}</div><button class="abtn tertiary" data-act="details">${b.showDetails ? 'Hide details' : 'Show details'}</button></div></div>`;
  }

  function blockHtml(b) {
    if (b.tone === 'approval') return approvalHtml(b);
    const sel = b.select
      ? `<select class="sel" data-sel ${b.used ? 'disabled' : ''}>${b.select.options.map((o) => `<option${o === (b.sel || b.select.value) ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
      : '';
    const btns = b.buttons
      ? `<div class="btns">${b.buttons.map((x) => `<button class="btn${x.primary ? ' primary' : ''}" data-act="blk" data-b="${x.act}" ${b.used ? 'disabled' : ''}>${esc(x.label)}</button>`).join('')}</div>`
      : '';
    const meta = b.meta ? `<div class="blk-meta">${esc(b.meta)}</div>` : '';
    const inner = `${b.html}${sel}${btns}`;
    return `<div class="blk ${b.tone || 'card'}">${b.tone === 'report' ? `<div class="rc">${inner}</div>` : inner}</div>${meta}`;
  }

  function msgHtml(m, i) {
    if (m.role === 'user') return `<div class="msg user" data-i="${i}"><div class="bubble">${esc(m.text)}</div></div>`;
    if (m.role === 'say') return `<div class="msg ai" data-i="${i}"><div class="ai-bubble"><p>${esc(m.text)}</p></div></div>`;
    if (m.role === 'status') return `<div class="msg" data-i="${i}"><div class="pill"><span>${esc(m.text)}</span><img class="spin" src="icons/loader.svg" width="14" height="14" alt=""></div></div>`;
    if (m.role === 'block') return `<div class="msg blkmsg" data-i="${i}">${blockHtml(m)}</div>`;
    return `<div class="msg ai" data-i="${i}">${aiHtml(m)}</div>`;
  }

  function render(scroll) {
    if (!messages.length) {
      hist.innerHTML = '<div class="empty"><svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M6 1l1.4 3.6L11 6 7.4 7.4 6 11 4.6 7.4 1 6l3.6-1.4L6 1zm6 6l.9 2.1L15 10l-2.1.9L12 13l-.9-2.1L9 10l2.1-.9L12 7z"/></svg><strong>Game Assistant</strong><span>Ask about this session, its logs or its performance.</span></div>';
      return;
    }
    const keep = hist.scrollTop;
    hist.innerHTML = messages.map(msgHtml).join('');
    hist.scrollTop = scroll ? hist.scrollHeight : keep;
  }

  function later(m, ms, fn) {
    const list = timers.get(m) || [];
    list.push(setTimeout(fn, ms));
    timers.set(m, list);
  }
  const cancel = (m) => { (timers.get(m) || []).forEach(clearTimeout); timers.delete(m); };

  function finish(m) {
    cancel(m);
    m.steps = STEPS.map(() => ({ done: true }));
    m.shown = m.answer.split(' ').length;
    m.phase = 'done';
    m.secs = m.secs || 3;
    m.open = false;
  }

  function run(m) {
    cancel(m);
    const started = Date.now();
    Object.assign(m, { phase: 'thinking', steps: [], shown: 0, open: true, rx: null });
    STEPS.forEach((_, i) => {
      later(m, 600 + i * 800, () => { m.steps.push({ done: false }); render(true); });
      later(m, 1300 + i * 800, () => { m.steps[i].done = true; render(true); });
    });
    later(m, 600 + STEPS.length * 800 + 200, () => {
      m.secs = Math.max(1, Math.round((Date.now() - started) / 1000));
      m.phase = 'answering';
      m.open = false;
      m.shown = 1;
      render(true);
      const total = m.answer.split(' ').length;
      const tick = () => {
        m.shown += 2;
        if (m.shown >= total) { m.shown = total; m.phase = 'done'; save(); render(true); return; }
        render(true);
        later(m, 35, tick);
      };
      later(m, 35, tick);
    });
    render(true);
  }

  /* ── Scripted scenarios ────────────────────────────────────────────── */
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel('game-assistant') : null;
  const seen = new Set();

  function makeApi() {
    const mine = epoch;
    const live = () => mine === epoch;
    const add = (m) => { if (live()) { messages.push({ ...m, scn: getPage() }); save(); render(true); } };
    return {
      user: (t) => add({ role: 'user', text: t }),
      say: (t) => add({ role: 'say', text: t }),
      status(t) {
        if (!live()) return;
        messages = messages.filter((m) => m.role !== 'status');
        if (t) messages.push({ role: 'status', text: t, scn: getPage() });
        save();
        render(true);
      },
      block(b) {
        if (!live()) return;
        const hit = b.key && messages.find((m) => m.role === 'block' && m.key === b.key);
        if (hit) Object.assign(hit, b); else messages.push({ role: 'block', scn: getPage(), ...b });
        save();
        render(true);
      },
      remove(key) {
        if (!live()) return;
        messages = messages.filter((m) => m.key !== key);
        save();
        render(false);
      },
      wait: (ms) => new Promise((r) => setTimeout(r, ms)),
      focusInput: () => text.focus(),
      notify: (type) => { if (channel) channel.postMessage({ type }); },
    };
  }

  function consumePending() {
    const raw = read(PENDING_KEY);
    if (!raw) return;
    let req;
    try { req = JSON.parse(raw); } catch (e) { return; }
    try { localStorage.removeItem(PENDING_KEY); } catch (e) { /* storage unavailable */ }
    if (!req || seen.has(req.id) || req.pageId !== getPage()) return;
    seen.add(req.id);
    SC.investigate(makeApi());
  }
  if (channel) channel.onmessage = (e) => { if (e.data && e.data.type === 'investigate') consumePending(); };

  function clearAll() {
    epoch += 1;
    messages.forEach(cancel);
    messages = [];
    save();
    render(false);
  }

  function submit(value) {
    if (!value) return;
    if (value === '/clear') { clearAll(); return; }
    if (/playab/i.test(value)) { SC.playability(makeApi(), value); return; }
    messages.push({ role: 'user', text: value });
    const m = { role: 'ai', answer: answerFor(value), steps: [], shown: 0, phase: 'thinking', open: true, secs: 0 };
    messages.push(m);
    run(m);
    save();
  }

  hist.addEventListener('change', (e) => {
    const s = e.target.closest('[data-sel]');
    if (!s) return;
    const m = messages[Number(s.closest('.msg').dataset.i)];
    if (m) { m.sel = s.value; save(); }
  });

  // Bottom bar (BETA / History / Clear conversation), as in the Figma Prompt composer.
  $('.actions').addEventListener('click', (e) => {
    if (e.target.closest('[data-act="clear"]')) clearAll();
  });

  hist.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'clear') { clearAll(); return; }
    if (act === 'history') return;
    const host = btn.closest('.msg');
    const m = host && messages[Number(host.dataset.i)];
    if (!m) return;
    if (act === 'blk') {
      if (m.used) return;
      m.used = true;
      const value = m.sel || (m.select && m.select.value);
      save();
      render(false);
      SC.act(btn.dataset.b, { value }, makeApi());
      return;
    }
    if (act === 'details') { m.showDetails = !m.showDetails; save(); render(false); return; }
    if (act === 'toggle') { m.open = !m.open; save(); render(false); }
    if (act === 'copy') { try { navigator.clipboard.writeText(m.answer); } catch (err) { /* clipboard blocked */ } }
    if (act === 'up' || act === 'down') { m.rx = m.rx === act ? null : act; save(); render(false); }
    if (act === 'regen') { run(m); save(); }
  });

  // A reload mid-answer cannot resume, so finish those messages as they stand.
  messages.forEach((m) => { if (m.role === 'ai' && m.phase !== 'done') finish(m); });
  update();
  render(true);
  consumePending();
})();
