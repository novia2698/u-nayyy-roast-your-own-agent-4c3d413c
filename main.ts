// u-nayyy-roast-your-own-agent-4c3d413c — entry program (Node 22).
//
// The deliverable of this bounty is a single line of text: a roast of the
// AI agent this team built. The line lives in ROAST.txt next to this file;
// this program reads it, checks it against the gate (UTF-8 text, 1 to 200
// characters, not only whitespace), and writes it to the output directory
// the harness collects as entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here);
const roastPath = join(repoRoot, "ROAST.txt");

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
const targetPath = join(outputDir, "entry.txt");

function fail(message: string): never {
  console.error(`roast-your-own-agent: ${message}`);
  process.exit(1);
}

const raw = readFileSync(roastPath, "utf8");
const line = raw.trim();

if (line.length < 1 || line.length > 200) {
  fail(`roast is ${line.length} characters, gate needs 1 to 200`);
}
if (line.includes("\n")) {
  fail("roast must be a single line");
}
if (line.trim().length === 0) {
  fail("roast is only whitespace");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, line, "utf8");
console.log(`roast-your-own-agent: wrote ${line.length} characters to ${targetPath}`);
console.log(line);
