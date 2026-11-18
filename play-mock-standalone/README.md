# Play Page — Standalone Mock Build

A pre-built, self-contained copy of the Cloud Games **Play** page, running in
local mock mode. The entire React app and all of its dependencies are already
bundled into static files under `dist/` — there is nothing to install and
nothing to connect to.

- No `npm install` required anywhere in this folder (the server has zero
  dependencies).
- No VPN, Netflix backend, or authentication required.
- No real video/WebRTC stream — the player area shows a rotating set of
  placeholder screenshots instead. Game/channel data, logs, and performance
  metrics are all scripted fixtures.

---

## 1. Requirements

Just [Node.js](https://nodejs.org) (any reasonably recent version, 18+) on
the machine — nothing else. No npm registry access, no VPN.

---

## 2. Starting the mock

From inside this folder:

```bash
npm start
```

(`npm run dev` does the exact same thing — both just run `node server.js`.)

Then open the printed URL, e.g. **http://localhost:4173/play**

To use a different port:

```bash
PORT=8080 npm start
```

Stop the server with `Ctrl+C`.

### What you'll see

- The full Play page shell: header, game/channel dropdowns, dock panels,
  performance graph (with error markers), logs, QR code, session summary
  banner.
- Clicking play scripts a fake ~1–2s "connecting → loading → ready" sequence,
  then transitions to a placeholder video area that cycles through a handful
  of static screenshots (no real stream) while the performance graph and logs
  panels fill in with simulated data.
- A few panels intentionally degrade rather than show real data: the Network
  Activity table stays empty, and the Player Blobs tab in Settings has no
  items.

---

## 3. Moving / packaging this to another machine

This whole folder (`play-mock-standalone/`) is fully self-contained — nothing
outside of it is needed, and nothing inside it references the original
monorepo by path.

**To package it:**

```bash
cd play-mock-standalone
zip -r play-mock-standalone.zip . -x '*.DS_Store'
```

(or just copy/drag the folder anywhere — AirDrop, USB drive, shared drive,
`scp`, etc. all work equally well.)

**On the other machine:**

1. Unzip / copy the folder anywhere.
2. Make sure Node.js is installed (`node -v` to check).
3. `cd` into the folder and run `npm start`.

No `git clone`, no `npm install`, no environment variables, no VPN.

---

## 4. Updating the mock

This folder is a **frozen snapshot** — it does not pick up later code
changes on its own. To refresh it after editing the mock-mode source in the
main repo (`apps/client/src/app/mocks/`, `packages/player/src/mocks/`, the
`Play` route itself, etc.), rebuild and re-copy the bundle:

```bash
# From the repo root
cd apps/client
VITE_MOCK_PLAY=true npx vite build

# Then, from the repo root again:
rm -rf play-mock-standalone/dist
cp -R apps/client/build play-mock-standalone/dist
```

That's it — `server.js` and `package.json` in this folder never need to
change; only `dist/` is regenerated.

**Verify before re-packaging/sharing:**

```bash
cd play-mock-standalone
PORT=4174 npm start
# in another terminal:
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4174/play   # expect 200
```

### Changing the mock data itself (games, fixtures, simulated telemetry, etc.)

That source lives in the main repo, not in this folder:

- `apps/client/src/app/mocks/mockPlayFixtures.ts` — static fixture data
  (games, channels, features, identity, SOP account, controllers, session
  info).
- `apps/client/src/app/mocks/mockFetchHandlers.ts` — mocked `/api/*` routes.
  If you add a route, match the real hook's expected response shape (some
  hooks expect a bare array/object, not the `{ data }` wrapper most routes
  use — see the `local-mock-play-mode` Cursor skill in the main repo's
  `.cursor/skills/` for details and gotchas).
- `apps/client/src/app/mocks/mockTelemetry.ts` — simulated logs + perf graph
  metrics.
- `apps/client/src/app/mocks/MockGameplayPlaceholder.tsx` +
  `apps/client/src/app/mocks/assets/gameplay-placeholders/` — the rotating
  placeholder screenshots shown in the video area once a mock session is
  "playing". Swap/add/remove `.png` files in that folder and update the
  `SCREENS` array in the component to change them.
- `packages/player/src/mocks/MockBrowserGamingClient.ts` — the fake gaming
  session lifecycle (loading steps, timing, etc).

After editing any of these, rebuild using the steps in section 4 above.

---

## 5. Troubleshooting

- **Blank page / 404s for `/assets/...`**: make sure you started the server
  from *inside* `play-mock-standalone/` (it serves `./dist` relative to
  `server.js`'s own location, so this should work regardless of your current
  shell directory, but double check `dist/` exists next to `server.js`).
- **Port already in use**: run with a different port, e.g. `PORT=8080 npm
  start`.
- **"Something went wrong" crash on load or on a specific action**: almost
  always a shape mismatch between a mocked `/api/*` response and what a hook
  expects. This build is frozen, so the fix has to happen in the main repo
  (see section 4) and then be rebuilt — it can't be patched in this folder
  directly since the code is minified/bundled.

---

## 6. Publishing to GitHub Pages

`dist/` assumes it is served from the site root (`npm start`). GitHub Pages serves project
sites from `/<repo>/`, so a patched copy is generated into `docs/`:

```bash
node build-pages.mjs
```

This leaves `dist/` untouched and writes a Pages-ready `docs/` (base path detected at runtime,
so it works under any repo name; `404.html` makes reloads of `/<repo>/play` work). The script
fails loudly if the bundle changes and a patch no longer applies.

To publish: put the **contents** of `docs/` at the root of the branch that Pages serves
(Settings → Pages → Deploy from a branch → `/ (root)`, or a root-level `/docs` folder), keep the
`.nojekyll` file, then open `https://<user>.github.io/<repo>/`. On a custom domain or a
user/org site served from `/`, set `SEGMENTS_TO_KEEP` to `0` in `docs/404.html`.
