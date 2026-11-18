# Play Page Mock (standalone)

A pre-built, self-contained copy of the Cloud Games **Play** page running in local mock mode.
There is no source code here: `dist/` is a minified Vite bundle with a few hand edits.
No backend, VPN, login or `npm install` is needed. Only Node.js 18+ (tested on 24).

## Load and render the app

1. From this folder run `npm start` (same as `node server.js`). It must stay running, so start it
   in the background. Use `PORT=8080 npm start` (PowerShell: `$env:PORT=8080; npm start`) for a
   different port. Default port is 4173.
2. Open **http://localhost:4173/play**. Any unknown path falls back to
   `index.html` (single-page app).
3. Check it is up: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/play` should print
   `200`.
4. Press the blue **Play** button (top right). The mock session starts and, after about 2.5 seconds
   of a buffering spinner, shows the demo video, perf graphs, logs and a QR image.
   Press **Stop** to end it. Logs and graphs stop generating when the session is not playing.

To see it rendered, use a real browser or a headless one (the page needs JavaScript and a
viewport of about 1600x1000):

- Browser pane / Chrome tools, if available: open the URL above.
- Headless Edge or Chrome with the DevTools protocol (this is how it was verified):
  `msedge --headless=new --remote-debugging-port=9333 --window-size=1600,1000 about:blank`, then
  navigate to the URL, wait about 5 seconds, click the button whose text is `Play`, wait about 8
  seconds and take a screenshot. Disable the cache (`Network.setCacheDisabled`) or hard-refresh
  after changing any file, otherwise old assets are served from cache.

## What a correct render looks like

- Header with game name "Local Mock Game", Player View / Dev View toggle, Channel `main`, a Play button.
- Dev View panels: Performance (left), video (top right), NGC QR Code and Logs (bottom right).
- After Play: video plays (muted, looping), CPU/GPU lines cross 100% and show red zones after about
  5 seconds, instance count drops below the dashed 50 line, red error rows appear in the logs, the
  Errors chip in the Log Type dropdown counts them, and a QR image replaces the grey loading box.

## Layout

- `server.js`: zero-dependency static server. Serves `dist/`, falls back to `index.html`, and
  supports HTTP Range requests for `.mp4` (needed so the video can play and loop).
- `dist/`: the built app. `dist/assets/game-capture.mp4` is the demo video and
  `dist/assets/qr-placeholder.png` the QR image. Replace those files to change them.
- `build-pages.mjs`: optional. `node build-pages.mjs` makes a GitHub Pages copy in `docs/` with
  base-path patches. Not needed for local use.
- `README.md`: original usage notes (section 6 covers the Pages build).

## Editing guidance (important)

The bundle is minified and there is no source tree, but `dist/assets/*.map` source maps (with
`sourcesContent`) exist and can be read for original component code. All changes are direct string
edits in these built files (the content hashes in the file names are stale on purpose, do not rename):

| File in `dist/assets/` | What lives there |
| --- | --- |
| `index-Y4llPcQR.js` | Play page: video placeholder + buffering loader (`MockGameplayPlaceholder`), QR placeholder (`MockQrPlaceholder`), when logs/metrics are enabled (`mode!==StreamingMode.OPEN`) |
| `SopAccountDropdown-C2BeFb0J.js` | Mock telemetry generator (`startMockTelemetry`: CPU/GPU alert timeline, instance count, error rate), log panel, perf graph, error/screenshot rows, Log Type error chip |
| `SopAccountDropdown-BoDlBFeK.css` | Perf graph styles (screenshots row 52px, time-period buttons, AI Summary banner) |
| `index-DkIuH5f8.css` | Dockview panel theme overrides (tab color, borders) at the end of the file |
| `index-Y4llPcQR.js` (composer patch) | `composer` dock component (iframe to `/composer/composer.html`), `FIXED_PANELS` entry (300px), `handleComposerToggle`, and the "AI" bookmark button `.composer-tab` (styled at the end of `index-DkIuH5f8.css`). Closed by default. Originals: `index-Y4llPcQR.js.bak`, `index-DkIuH5f8.css.bak`; patch script `patch-composer.mjs`. Edit `composer/` then copy to `dist/composer/`. |
| `composer/` (copied to `dist/composer/`) | Game Assistant UI: `composer.html/.css/.js` (input box) and `history.css` (chat history, reasoning, step chain). History is mock, saved in `localStorage` key `game-assistant.history.v1`, cleared by the "Clear conversation" button or typing `/clear`. Edit in `composer/`, then copy to `dist/composer/`. |
| Demo scenarios | `composer/scenarios.js` scripts the "playability check" and "Playable test can't play, invalid PIN" flows. `dist/ga-bridge.js` (loaded from `dist/index.html`) holds the in-memory `window.__ga.pinFixed` flag and the Investigate hand-off, so a page refresh resets the demo. Game "Playable test" (id 999002) is added in `index-CTqDrwBd.js`; its Play failure and the repurposed summary banner (label + Investigate button) are patched in `index-Y4llPcQR.js` and `SopAccountDropdown-C2BeFb0J.js`. `server.js` reads `index.html` once at startup: restart it after editing `dist/index.html`. Patch script: `patch-scenario.mjs`; backups `*.bak`. |
| `index-CTqDrwBd.js` | App shell and mock `/api/*` fetch handlers (`MOCK_TARGET_INSTANCE_COUNT=50`) |

Tips when editing:

- Patch with a script that asserts the match count is exactly 1 before replacing, then run
  `node --input-type=module --check < file.js`. Never reformat or rewrite whole files.
- The app injects its own dockview CSS at runtime after the stylesheets load, so CSS variable
  overrides need higher specificity (the existing override uses a doubled class,
  `.dockview-theme-abyss.dockview-theme-abyss`).
- Do not rebuild from the main repo unless asked: that would discard these edits. Edit the built
  files here, or port the change to the original source (`apps/client/src/app/mocks/`, which is not
  included).
- Keep `*.bak`, `._*` and `.DS_Store` files out of any commit or zip.

## Known behavior and limits

- Everything is fake: games, channels, perf data, logs, the video and the QR image. Scanning the QR
  connects to nothing. The Network Activity table is empty and Player Blobs has no items.
- Instance count is "bad" when it falls **below** the dashed 50 threshold (that is how the original
  chart works), so the mock starts near 58 and dips to about 36.
- The bundle contains Netflix-internal names and code. Do not publish it to a public host.

## Handoff: Message Composer component (next task, not started)

Goal: recreate the Hawkins "Message Composer (alpha)" from Figma as a **standalone, dark-only,
plain HTML/CSS/vanilla JS** component in `composer/` (`composer.html`, `composer.css`,
`composer.js`, plus downloaded SVG icons). Default state and basic behavior only. Do not edit the
minified bundle. Later it can be shown in the Play page through an `<iframe>` to
`composer/composer.html` (not part of this task). Keep token use small: no extra Figma reads beyond
one `get_variable_defs` / `get_design_context` for dark values, one screenshot compare, then fix.

### Figma (read access works via the figma MCP; call `create_session` first with the file key)
- Design file `s6tOWGQALXYNZVQPbBTWgX` (HP_-Toolkit), default variant node `104717:14030`
  ("Border State=Initial, Content=Has content, Variant=Default", 600x85).
- Rich example, file `ea0ZG0adGQfAVYuCPDGAdj` (Kylo-Presentation-2026), node `419:43779`
  (600x157, **dark mode**: attachment, mention chips, context chip, dropdown, send button).
- Do NOT read page node `104616:11310`: it is 344k characters. The page also has 15 composer
  variants (Border State x Content x Variant Default/Small), Chat Message, Reasoning, Clarification
  Card etc. Out of scope for now.
- Downloaded asset URLs from Figma expire after 7 days: curl them into `composer/icons/`.

### Spec already read (from the example node; light-theme fallbacks, dark values still needed)
Anatomy: Message Composer (width 600, max 900) > Content container (1px border, radius 4, border
`--border-gen-ai-start` #4061e7, rendered as a gradient blue to pink/red) > Content area (surface,
radius 4, padding 12, gap 8) containing:
1. Attachment row (optional, 100x64 card: gray-700 bg `rgb(45,45,45)`, 1px `border-subtle`,
   radius 8, padding 8, filename 10px/15px white, 12px pdf icon bottom-left).
2. Composer text: body-1-regular 14px/21px, color `foreground` (rgba(0,0,0,.9) light), flex-wrap
   gap 4, max-height 180. Inline mention chips: bg `#bcd8ff`, text `#1d63c4`, px 4, radius 4.
3. Toolbar (flex, space-between, 32px high): left = 24px icon button `+` (radius 4, padding 4,
   16px icon) then context chip (bg `#f2f2f2`, radius 8, width 195: 12px database icon, 10px/15px
   label ellipsis, 24px x button); right (gap 12) = two dropdowns "Agents API" (and optional
   "Claude 4.6 Sonnet") each 32px high, radius 4, 1px `border-dim`, px 12, 10px/15px text, 16px
   caret-down; then 32x32 send "Chat button" (bg `button--surface-primary` #4061e7, radius 4,
   16px arrow-up icon, disabled look when empty).
4. Disclosure under the box (hidden by default): "Uses AI. Check important details." 10px/15px,
   black 60%.
Fonts: SF Pro Text (fallback stack: -apple-system, "Segoe UI", system-ui). Spacing/radius/border
tokens exist in the app CSS as `--hawkins-dimensions-space-*`, `--hawkins-dimensions-border-radius-*`,
`--hawkins-theme-border-subtle/dim` (dark values already defined in `dist/assets/index-DkIuH5f8.css`
and the hawkins CSS). The Gen-AI composer tokens (`gen-ai-composer--chip-*`, `border-gen-ai-*`) and
the `_body-1-regular` / `_label-0-regular` type tokens are NOT in the bundled Hawkins build, so define
them in `composer.css` as variables named like the Figma tokens, with dark values from Figma.
Behavior: typing enables send, remove attachment, remove context chip, open the dropdowns (mock
options).

### User decisions
Standalone file, dark only (no theme toggle), default state first (no focus/working/idle states or
Small variant yet), plain HTML/CSS/JS, keep tokens low.

### Repo and git state
- The GitHub repo https://github.com/alfance/ocga-server is checked out at
  `D:\Documents\project\ocga-server\ocga-server`. Current branch: `cortex-game-tools` (local only,
  not pushed), branched from `main` at `2a4e7ec` (which holds the Pages build of `docs/`).
- `D:\Documents\project\ocga-server` itself is not a git repo. The user chose to share a zip
  (`play-mock-standalone.zip`) instead of hosting on GitHub Pages (a free-plan Pages site needs a
  public repo). Do not push or publish anything without asking: the bundle holds Netflix-internal code.
- The user prefers answers without em dashes.
