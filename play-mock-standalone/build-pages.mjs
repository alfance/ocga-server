// Builds a GitHub Pages-ready copy of dist/ into docs/ (dist/ itself is left untouched, so
// `npm start` keeps working at the site root).
//
// GitHub Pages project sites live under /<repo>/, but the bundle assumes it is served from "/":
//   - index.html and a handful of JS strings use absolute "/assets/..." URLs
//   - the Vite preload helper builds "/" + dep URLs
//   - react-router's createBrowserRouter has no basename, so /<repo>/play would not match /play
// This script patches all of those to use window.__BASE_PATH__, which a tiny inline script in
// index.html derives from the URL the page was loaded from (so it works for any repo name).
// 404.html + the same inline script make a reload of /<repo>/play work (Pages has no SPA fallback).
//
// Usage: node build-pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const out = path.join(root, 'docs');

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(dist, out, {
    recursive: true,
    filter: src => {
        const name = path.basename(src);
        return !name.endsWith('.bak') && !name.startsWith('._') && name !== '.DS_Store';
    },
});

const BASE = '(window.__BASE_PATH__||"")';

// Every patch must hit the expected number of times, so a changed bundle fails loudly instead of
// silently producing a half-working site.
const replaceExactly = (text, from, to, expected, label) => {
    const parts = text.split(from);
    if (parts.length - 1 !== expected) {
        throw new Error(`${label}: expected ${expected} match(es) of ${from}, found ${parts.length - 1}`);
    }
    return parts.join(to);
};

// --- JS patches -------------------------------------------------------------------------------
const assetsDir = path.join(out, 'assets');
let absoluteAssetStrings = 0;
let preloadHelpers = 0;
let routerBasenames = 0;

for (const file of fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'))) {
    const filePath = path.join(assetsDir, file);
    let text = fs.readFileSync(filePath, 'utf8');
    const original = text;

    // "/assets/foo.png" and "/user.png" string literals -> base-prefixed
    text = text.replace(/"(\/(?:assets\/[^"]+|user\.png))"/g, (_m, p1) => {
        absoluteAssetStrings++;
        return `(${BASE}+"${p1}")`;
    });

    // Vite dynamic-import / CSS preload helper
    const preloadFrom = 'assetsURL=function(dep2){return"/"+dep2}';
    if (text.includes(preloadFrom)) {
        text = replaceExactly(text, preloadFrom, `assetsURL=function(dep2){return ${BASE}+"/"+dep2}`, 1, file);
        preloadHelpers++;
    }

    // react-router createBrowserRouter: honor the base path
    const routerFrom = 'basename:void 0,future:_extends({},void 0,{v7_prependBasename:!0})';
    if (text.includes(routerFrom)) {
        text = replaceExactly(
            text,
            routerFrom,
            'basename:window.__BASE_PATH__||void 0,future:_extends({},void 0,{v7_prependBasename:!0})',
            1,
            file,
        );
        routerBasenames++;
    }

    if (text !== original) fs.writeFileSync(filePath, text);
}

if (absoluteAssetStrings !== 14) throw new Error(`expected 14 absolute asset strings, patched ${absoluteAssetStrings}`);
if (preloadHelpers !== 1) throw new Error(`expected 1 preload helper, patched ${preloadHelpers}`);
if (routerBasenames !== 1) throw new Error(`expected 1 router basename, patched ${routerBasenames}`);

// --- index.html ---------------------------------------------------------------------------------
const bootScript = `<script>
            // Base path = the directory this index.html was served from (e.g. "/my-repo"), so the
            // site works under any GitHub Pages project path or at a domain root.
            (function () {
                var base = new URL('.', document.baseURI).pathname.replace(/\\/$/, '');
                window.__BASE_PATH__ = base;
                var params = new URLSearchParams(location.search);
                var redirected = params.get('p'); // set by 404.html after a deep-link reload
                var target = redirected != null ? redirected : location.pathname === base + '/' ? '/play' : null;
                if (target) history.replaceState(null, '', base + target + location.hash);
            })();
        </script>`;

let html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
html = replaceExactly(html, 'href="/', 'href="./', 15, 'index.html href');
html = replaceExactly(html, 'src="/assets/', 'src="./assets/', 1, 'index.html src');
// Keep <meta charset> within the first 1024 bytes, so the script goes right after it.
const charsetMeta = '<meta charset="utf-8" />';
html = replaceExactly(html, charsetMeta, `${charsetMeta}\n        ${bootScript}`, 1, 'index.html head');
fs.writeFileSync(path.join(out, 'index.html'), html);

// --- 404.html (SPA fallback for reloads of /<repo>/play) -------------------------------------------
const notFound = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Redirecting...</title>
        <script>
            // GitHub Pages serves this file for any unknown path. Send the visitor to the app's
            // index.html with the original path in ?p= so index.html can restore it.
            // On *.github.io project sites the first path segment is the repo name. On a custom
            // domain or user/org site (served from "/") set SEGMENTS_TO_KEEP to 0.
            var SEGMENTS_TO_KEEP = location.hostname.endsWith('github.io') ? 1 : 0;
            var segs = location.pathname.split('/');
            var base = segs.slice(0, 1 + SEGMENTS_TO_KEEP).join('/');
            var rest = '/' + segs.slice(1 + SEGMENTS_TO_KEEP).join('/');
            // Guard: never redirect twice (e.g. a wrong SEGMENTS_TO_KEEP would otherwise loop forever).
            if (location.search.indexOf('p=') === -1) {
                location.replace(location.origin + base + '/?p=' + encodeURIComponent(rest + location.search) + location.hash);
            } else {
                document.body.textContent = 'Page not found. Open the site root instead.';
            }
        </script>
    </head>
    <body></body>
</html>
`;
fs.writeFileSync(path.join(out, '404.html'), notFound);

// Disable Jekyll processing (it would ignore files/folders starting with "_").
fs.writeFileSync(path.join(out, '.nojekyll'), '');

console.log(`Built ${path.relative(process.cwd(), out) || out}: ${absoluteAssetStrings} asset strings, router basename, preload helper patched.`);
