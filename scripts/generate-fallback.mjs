#!/usr/bin/env node
/**
 * Generate the development-only content fallback from legacy/data.js.
 *
 * The fallback lets the UI run before a Supabase project is connected. It is
 * never used in production: lib/content/local.ts only loads it in development
 * when NEXT_PUBLIC_SUPABASE_URL is still a placeholder.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(path.join(ROOT, "data", "medil-editorial.js"), "utf8");
const start = source.indexOf("{");
const end = source.lastIndexOf("}");

if (start === -1 || end === -1) {
  console.error("data/medil-editorial.js does not contain the MEDIL_EDITORIAL object.");
  process.exit(1);
}

const editorial = JSON.parse(source.slice(start, end + 1));
const output = path.join(ROOT, "lib", "content", "fallback.json");

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(editorial, null, 2)}\n`, "utf8");

console.log(
  `Wrote ${path.relative(ROOT, output)}: ` +
    `${editorial.courses.length} courses, ${editorial.exercises.length} exercises, ` +
    `${editorial.papers.length} papers, ${editorial.threads.length} threads.`,
);
