// Post-build: write a per-route index.html with that page's own <title>/meta tags,
// so crawlers that don't run JS see the right metadata (the app is client-side only).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import seoConfig from "../config/seoConfig.js";

const dist = new URL("../dist", import.meta.url).pathname;
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const setContent = (html, attr, value, content) =>
  html.replace(
    new RegExp(`(<meta\\s+(?:data-rh="true"\\s+)?${attr}="${value}"\\s+content=")[^"]*(")`, "i"),
    (_, a, b) => `${a}${esc(content)}${b}`
  );

let count = 0;
for (const meta of Object.values(seoConfig)) {
  const path = new URL(meta.url).pathname.replace(/^\/|\/$/g, "");
  if (!path) continue; // Home is the root index.html, already correct

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);
  html = setContent(html, "name", "description", meta.description);
  html = setContent(html, "property", "og:title", meta.title);
  html = setContent(html, "property", "og:description", meta.description);
  html = setContent(html, "property", "og:url", meta.url);
  html = setContent(html, "name", "twitter:title", meta.title);
  html = setContent(html, "name", "twitter:description", meta.description);
  html = html.replace("</head>", `  <link rel="canonical" href="${esc(meta.url)}" />\n</head>`);

  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  count++;
}
console.log(`prerender-meta: wrote ${count} route pages`);
