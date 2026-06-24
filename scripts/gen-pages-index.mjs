#!/usr/bin/env node
/**
 * Generate a static index.html for GitHub Pages from the Vite client build.
 *
 * TanStack Start is SSR-first and does not emit a static index.html. GitHub
 * Pages serves only static files, so we synthesize one that loads the built
 * client entry. The app uses createHashHistory on the client, so this single
 * HTML file handles every route.
 */
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = "dist/client";
const ASSETS_DIR = join(CLIENT_DIR, "assets");

if (!existsSync(ASSETS_DIR)) {
  console.error(`[gen-index] ${ASSETS_DIR} not found — run \`bun run build\` first.`);
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
const entry = files.find((f) => /^index-.*\.js$/.test(f));
const css = files.find((f) => /\.css$/.test(f));

if (!entry) {
  console.error("[gen-index] Could not find client entry assets/index-*.js");
  process.exit(1);
}

const base = process.env.BASE_PATH
  ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, "")}/`
  : "/";

const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Pakt Payments — варианты баннера</title>
    <meta name="description" content="Сравнение трёх вариантов уведомления о проблемах с SSL на странице оплаты." />
${css ? `    <link rel="stylesheet" href="${base}assets/${css}" />\n` : ""}    <script type="module" crossorigin src="${base}assets/${entry}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
writeFileSync(join(CLIENT_DIR, "404.html"), html);
console.log(`[gen-index] Wrote ${CLIENT_DIR}/index.html (entry=${entry}, css=${css ?? "none"}, base=${base})`);
