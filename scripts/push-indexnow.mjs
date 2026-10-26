// Forwards to scripts/indexnow-submit.mjs, which posts the canonical clean
// sitemap URLs (no .html) to https://api.indexnow.org/indexnow.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const script = fileURLToPath(new URL("./indexnow-submit.mjs", import.meta.url));
const child = spawn(process.execPath, [script, ...process.argv.slice(2)], { stdio: "inherit" });
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
