#!/usr/bin/env node
// Checks the Thai translations in lib/client.js for common corruption patterns.
// No dependencies. Usage: node tools/check-translations.mjs [path/to/client.js]
// Exit code 1 means hard errors were found; warnings never fail the run.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] || path.join(root, "lib", "client.js");
const src = fs.readFileSync(file, "utf8");

// The dictionary is the JSON object between "const thDicts = " and the end of the wrapper.
const startMarker = "const thDicts = ";
const endMarker = "\nfunction apply(ctx)";
const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) {
  console.error("Could not find the thDicts block in", file);
  process.exit(2);
}
const dicts = JSON.parse(src.slice(start + startMarker.length, end).replace(/[;\s]+$/, ""));

const THAI = /[\u0E00-\u0E7F]/;
const LAO = /[\u0E80-\u0EFF]/;          // Lao look-alikes: a common corruption source
const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
const MARK_RUN = /([\u0E31\u0E34-\u0E3A\u0E47-\u0E4E])\1/;  // same combining mark twice
const TONE_TWICE = /[\u0E48-\u0E4B][\u0E48-\u0E4B]/;          // two tone marks on one syllable
const ABOVE_BELOW = "\u0E31\u0E34-\u0E3A";
const TONE = "\u0E48-\u0E4B";
const TONE_BEFORE_VOWEL = new RegExp(`[${TONE}][${ABOVE_BELOW}\u0E47]`); // tone must come after the vowel
const TWO_UPPER_VOWELS = new RegExp(`[\u0E31\u0E34-\u0E37][\u0E31\u0E34-\u0E37]`);
const LEADING_MARK = new RegExp(`^[${ABOVE_BELOW}${TONE}\u0E47\u0E4D]`);  // a syllable cannot start with a mark

const errors = [];
const warnings = [];
let total = 0;
const seg = new Intl.Segmenter("th", { granularity: "word" });

for (const ns of Object.keys(dicts)) {
  for (const key of Object.keys(dicts[ns])) {
    total++;
    const id = `${ns}.${key}`;
    const value = dicts[ns][key];
    if (typeof value !== "string") { errors.push(`${id}: value is not a string`); continue; }
    if (CJK.test(value)) errors.push(`${id}: contains CJK (Chinese/Japanese) characters`);
    if (!THAI.test(value)) continue;  // English-only values are allowed (brand/command names)
    if (LAO.test(value)) errors.push(`${id}: contains Lao look-alike characters: ${value}`);
    if (MARK_RUN.test(value)) errors.push(`${id}: repeated combining mark: ${value}`);
    if (TONE_TWICE.test(value)) warnings.push(`${id}: two tone marks together: ${value}`);
    for (const { segment } of seg.segment(value)) {
      if (!THAI.test(segment)) continue;
      if (TONE_BEFORE_VOWEL.test(segment)) warnings.push(`${id}: tone mark before vowel in "${segment}"`);
      if (TWO_UPPER_VOWELS.test(segment)) warnings.push(`${id}: two vowel marks in "${segment}"`);
      if (LEADING_MARK.test(segment)) warnings.push(`${id}: word starts with a mark: "${segment}"`);
    }
  }
}

console.log(`Checked ${total} keys in ${path.relative(root, file)}`);
console.log(`Errors:   ${errors.length}`);
for (const e of errors.slice(0, 50)) console.log("  ERROR  " + e);
console.log(`Warnings: ${warnings.length} (possible typos, see TRANSLATION_REVIEW.md)`);
for (const w of warnings.slice(0, 50)) console.log("  WARN   " + w);
if (warnings.length > 50) console.log(`  ... and ${warnings.length - 50} more`);
process.exit(errors.length ? 1 : 0);
