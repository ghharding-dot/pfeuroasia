import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(import.meta.url);
const runFile = promisify(execFile);
const destination = path.join(root, "app/lib/conciergeSnapshot.json");
const previous = fs.existsSync(destination) ? JSON.parse(fs.readFileSync(destination, "utf8")) : { pages: {} };
// Load the public registry without instantiating storage or adviser services.
function loadSource(file, dependencies = {}) {
  const output = ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }
  }).outputText;
  const exports = {};
  new Function("require", "exports", output)(name => dependencies[name] || (name === "react/jsx-runtime" ? require(name) : {}), exports);
  return exports;
}
const seo = loadSource("app/lib/seo.tsx");
const articles = loadSource("app/lib/knowledgeArticles.ts");
const guides = loadSource("app/lib/searchGuides.ts");
const knowledge = loadSource("app/lib/conciergeKnowledge.ts", { "./seo": seo, "./knowledgeArticles": articles, "./searchGuides": guides, "./conciergeSnapshot.json": { default: previous } });
const registry = knowledge.publicPageRegistry();
const pages = {};
let fetched = 0, retained = 0;
let index = 0;
async function worker() {
  while (index < registry.length) {
    const page = registry[index++];
    const url = new URL(page.href, "https://www.pfeuroasia.com");
    // Changing listings stay in the live, approval-filtered catalogue, not in this bundle.
    if (url.pathname === "/properties" || /^\/properties\//.test(url.pathname) || /fairmont|vault|collaborators|private-portfolio|\/access|\/adviser/.test(url.pathname)) continue;
    if (Object.values(guides.searchGuides).some(g => page.href === `/guides/${g.slug}`)) continue;
    if (!["www.pfeuroasia.com", "www.pfiberia.com"].includes(url.hostname)) continue;
    try {
      let html;
      if (process.env.CONCIERGE_SNAPSHOT_CURL === "true") {
        const result = await runFile("curl", ["--fail", "--silent", "--show-error", "--max-time", "12", url.href], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
        html = result.stdout;
      } else {
        const response = await fetch(url, { signal: AbortSignal.timeout(8000), redirect: "error" });
        if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) throw new Error("Page unavailable");
        html = await response.text();
      }
      const text = knowledge.htmlText(html).slice(0, 6500);
      if (text.length < 80) throw new Error("Empty page");
      pages[page.href] = { text, capturedAt: new Date().toISOString() }; fetched++;
    } catch {
      if (previous.pages[page.href]) { pages[page.href] = previous.pages[page.href]; retained++; }
      console.warn("Concierge snapshot: retaining available reference for", page.href);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
if (!Object.keys(pages).length) throw new Error("No public concierge knowledge available");
fs.writeFileSync(destination, JSON.stringify({ generatedAt: new Date().toISOString(), pages }));
console.log(`Concierge knowledge: ${fetched} public pages captured, ${retained} previous references retained.`);
