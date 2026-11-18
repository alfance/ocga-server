// Bridge between the Play page and the Game Assistant iframe (same origin).
// State lives in memory, so a page refresh resets the "PIN fixed" demo state.
(function () {
  var ga = (window.__ga = { pinFixed: false, pageId: String(Date.now()) });
  try { localStorage.setItem('game-assistant.page', ga.pageId); } catch (e) { /* storage unavailable */ }
  var ch = 'BroadcastChannel' in window ? new BroadcastChannel('game-assistant') : null;
  if (ch) {
    ch.onmessage = function (e) {
      if (e.data && e.data.type === 'pin-reset') ga.pinFixed = true;
    };
  }
  window.__gaInvestigate = function () {
    try { localStorage.setItem('game-assistant.page', ga.pageId); } catch (e) { /* storage unavailable */ }
    var req = { type: 'investigate', id: String(Date.now()), pageId: ga.pageId };
    try { localStorage.setItem('game-assistant.pending', JSON.stringify(req)); } catch (e) { /* storage unavailable */ }
    if (window.__gaOpen) window.__gaOpen();
    if (ch) ch.postMessage(req);
  };
})();

// Keep the assistant bookmark below the top warning/summary banner whenever one is showing.
(function () {
  var root = document.documentElement;
  function sync() {
    var el = document.querySelector('[role="status"][aria-live="polite"]');
    root.style.setProperty('--ga-banner-h', el ? Math.round(el.getBoundingClientRect().height) + 'px' : '0px');
  }
  function start() {
    sync();
    new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', sync);
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();

// Game Assistant as a full-height column on the right (its own level, beside the top bar).
(function () {
  var W = 400, side = null;
  var css = document.createElement('style');
  css.textContent =
    '#ga-side{position:fixed;top:0;right:0;bottom:0;width:' + W + 'px;z-index:60;display:none;flex-direction:column;background:#232323;border-left:1px solid rgba(255,255,255,.08)}' +
    '#ga-side.open{display:flex}' +
    '#ga-side .ga-hd{flex:none;height:32px;display:flex;align-items:center;justify-content:space-between;padding:4px 4px 4px 7px;font-family:"SF Pro Text",-apple-system,"Segoe UI",system-ui,sans-serif}' +
    '#ga-side .ga-chip{display:inline-flex;align-items:center;gap:4px;min-height:24px;padding:4px;border-radius:4px;background:#3d3d3d;color:rgba(255,255,255,.9);font-size:10px;line-height:15px;font-weight:600}' +
    '#ga-side .ga-chip span{padding:0 4px}' +
    '#ga-side button{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:0;border-radius:4px;background:none;cursor:pointer}' +
    '#ga-side .ga-chip button{width:16px;height:16px}' +
    '#ga-side button:hover{background:rgba(255,255,255,.1)}' +
    '#ga-side iframe{flex:1;min-height:0;width:100%;border:0;display:block;background:#232323}' +
    '#app.ga-shifted{width:calc(100vw - ' + W + 'px)!important}';
  document.head ? document.head.appendChild(css) : document.addEventListener('DOMContentLoaded', function () { document.head.appendChild(css); });
  function build() {
    side = document.createElement('aside');
    side.id = 'ga-side';
    side.innerHTML =
      '<div class="ga-hd"><div class="ga-chip"><span>Game Assistant</span><button type="button" data-ga="close" aria-label="Close Game Assistant"><img src="' + (window.__BASE_PATH__||"") + '/composer/icons/x.svg" width="12" height="12" alt=""></button></div>' +
      '<button type="button" data-ga="pop" aria-label="Open in new window"><img src="' + (window.__BASE_PATH__||"") + '/composer/icons/link-out.svg" width="12" height="12" alt=""></button></div>' +
      '<iframe src="' + (window.__BASE_PATH__||"") + '/composer/composer.html" title="Game Assistant"></iframe>';
    side.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ga]');
      if (!b) return;
      if (b.dataset.ga === 'close') set(false);
      else window.open((window.__BASE_PATH__||"") + '/composer/composer.html', '_blank', 'noopener,width=420,height=800');
    });
    document.body.appendChild(side);
  }
  function set(open) {
    if (!side) { if (!open) return; build(); }
    side.classList.toggle('open', open);
    var app = document.getElementById('app');
    if (app) app.classList.toggle('ga-shifted', open);
    if (window.__gaSetOpen) window.__gaSetOpen(open);
    window.dispatchEvent(new Event('resize'));
  }
  window.__gaSide = set;
})();
