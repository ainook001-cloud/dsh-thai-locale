#!/usr/bin/env node
// ประกอบไฟล์ tools/roast-source/<namespace>.json เป็นบล็อก thRoastDicts ใน lib/client.js
// ไม่มี dependency, ผลลัพธ์ซ้ำได้ (deterministic)
//   node tools/build-roast.mjs          เขียนทับบล็อกใน lib/client.js
//   node tools/build-roast.mjs --ref    เขียนไฟล์อ้างอิงค่าไทยเดิมลง tools/roast-source/_ref/
//   node tools/build-roast.mjs --check  ตรวจความสอดคล้องโดยไม่เขียนไฟล์
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDicts, replaceRoastBlock, placeholders } from "./lib/parse-dicts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientFile = path.join(root, "lib", "client.js");
const sourceDir = path.join(root, "tools", "roast-source");
const refDir = path.join(sourceDir, "_ref");
const args = new Set(process.argv.slice(2));

const src = fs.readFileSync(clientFile, "utf8");
const { th } = parseDicts(src);
const nsList = Object.keys(th);
const totalKeys = nsList.reduce((n, ns) => n + Object.keys(th[ns]).length, 0);

if (args.has("--ref")) {
  fs.mkdirSync(refDir, { recursive: true });
  for (const ns of nsList) {
    fs.writeFileSync(path.join(refDir, ns + ".json"), JSON.stringify(th[ns], null, 1) + "\n");
  }
  console.log("เขียนไฟล์อ้างอิง " + nsList.length + " ไฟล์ลง " + path.relative(root, refDir));
  process.exit(0);
}

const files = fs
  .readdirSync(sourceDir)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"));

const roast = {};
const problems = [];
const pending = [];
let filled = 0;

for (const file of files) {
  const ns = file.replace(/\.json$/, "");
  if (!th[ns]) {
    problems.push(file + ": namespace นี้ไม่มีใน thDicts");
    continue;
  }
  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(path.join(sourceDir, file), "utf8"));
  } catch (error) {
    problems.push(file + ": อ่าน JSON ไม่ได้ — " + error.message);
    continue;
  }
  const thaiKeys = Object.keys(th[ns]);
  const out = {};
  for (const key of Object.keys(entries)) {
    if (!(key in th[ns])) {
      problems.push(file + ": คีย์ '" + key + "' ไม่มีใน thDicts." + ns);
      continue;
    }
    const value = entries[key];
    const emptyByDesign = th[ns][key] === "" || th[ns][key].trim() === "";
    if (typeof value !== "string" || (value.trim() === "" && !emptyByDesign)) {
      problems.push(file + ": ค่า '" + key + "' ว่างหรือไม่ใช่สตริง");
      continue;
    }
    if (placeholders(th[ns][key]) !== placeholders(value)) {
      problems.push(file + ": placeholder ไม่ตรงที่ '" + key + "'");
      continue;
    }
    out[key] = value;
    filled++;
  }
  const missing = thaiKeys.filter((k) => !(k in out));
  if (missing.length) pending.push(file + ": ยังไม่เขียน " + missing.length + " คีย์");
  // คีย์ที่ยังไม่ได้เขียน "ไม่ต้องใส่" — runtime จะ fallback th-roast → th เอง
  // ทำให้ไฟล์เล็กลงและไม่ต้องก๊อปข้อความไทยซ้ำ
  roast[ns] = out;
}

// namespace ที่ยังไม่มีไฟล์เลย ข้ามไป (fallback ไปไทยธรรมดา) ไม่ต้องใส่ค่าซ้ำ
const absent = nsList.filter((ns) => !roast[ns]);
if (absent.length) pending.push("ยังไม่มีไฟล์ต้นทาง " + absent.length + " namespace: " + absent.slice(0, 6).join(", "));

const ordered = {};
for (const ns of nsList) if (roast[ns]) ordered[ns] = roast[ns];

const summary = `${files.length}/${nsList.length} ไฟล์, ${filled}/${totalKeys} คีย์ที่เขียนใหม่`;
if (problems.length) {
  console.log("พบปัญหา " + problems.length + " รายการ:");
  for (const p of problems.slice(0, 40)) console.log("  - " + p);
  if (problems.length > 40) console.log("  ... และอีก " + (problems.length - 40) + " รายการ");
}


if (pending.length) {
  console.log("ยังไม่ได้เขียน:");
  for (const p of pending.slice(0, 6)) console.log("  - " + p);
}

if (args.has("--check")) {
  console.log(summary);
  process.exit(problems.length ? 1 : 0);
}

fs.writeFileSync(clientFile, replaceRoastBlock(src, ordered));
console.log("เขียนบล็อก thRoastDicts ลง lib/client.js แล้ว — " + summary);
