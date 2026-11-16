#!/usr/bin/env node
// ตรวจคุณภาพชุดภาษาไทยกวนตีน (th-roast) เทียบกับไทยธรรมดา (th)
// ไม่มี dependency: node tools/check-roast.mjs [path/to/client.js]
// รหัสออก 1 = มี error, คำเตือนไม่ทำให้ล้มเหลว
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDicts, placeholders } from "./lib/parse-dicts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] || path.join(root, "lib", "client.js");
const src = fs.readFileSync(file, "utf8");
const { th, roast } = parseDicts(src);

if (!roast) {
  console.error("ไม่พบบล็อก thRoastDicts ใน " + file);
  process.exit(2);
}

const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
const LAO = /[\u0E80-\u0EFF]/;
const THAI = /[\u0E00-\u0E7F]/;
const DUP = /(นะ|ครับ|ค่ะ|สิ|เลย|นะเออ)[\s]*(นะ|ครับ|ค่ะ|สิ|เลย|นะเออ)/;
const MAX_RATIO = 1.6;
const MAX_LEN = 120;

const errors = [];
const warnings = [];
let total = 0;
let changed = 0;
let pending = 0;

for (const ns of Object.keys(th)) {
  const bag = roast[ns];
  if (!bag) { pending += Object.keys(th[ns]).length; continue; }
  for (const key of Object.keys(th[ns])) {
    total++;
    const id = `${ns}.${key}`;
    const base = th[ns][key];
    const value = bag[key];
    if (value === undefined) { pending++; continue; }
    if (typeof value !== "string") { errors.push(`${id}: ค่าไม่ใช่สตริง`); continue; }
    if (CJK.test(value)) errors.push(`${id}: CJK มีอักษรจีน/ญี่ปุ่น`);
    if (LAO.test(value)) errors.push(`${id}: LAO มีอักษรลาว`);
    if (value.normalize("NFC") !== value) errors.push(`${id}: NFC ข้อความไม่อยู่ในรูป NFC`);
    if (placeholders(base) !== placeholders(value)) errors.push(`${id}: PH placeholder ไม่ตรง`);
    if (DUP.test(value)) errors.push(`${id}: DUP คำท้ายซ้ำ — ${value}`);
    if (value.length > MAX_LEN) warnings.push(`${id}: LONG ยาว ${value.length} เกิน ${MAX_LEN} — ${value}`);
    if (value !== base) {
      changed++;
      if (base.length > 0 && value.length > base.length * MAX_RATIO) {
        warnings.push(`${id}: RATIO ยาวเกิน ${MAX_RATIO} เท่าของไทยเดิม — "${base}" → "${value}"`);
      }
      if (base.length < 8 && THAI.test(base) && value.length > base.length + 6) {
        warnings.push(`${id}: SHORT เติมคำบนป้ายสั้น — "${base}" → "${value}"`);
      }
    }
  }
  for (const key of Object.keys(bag)) {
    if (!(key in th[ns])) errors.push(`${ns}.${key}: EXTRA คีย์นี้ไม่มีในไทยธรรมดา`);
  }
}

const same = total - changed;
console.log(`ตรวจชุดกวน ${total} คีย์ใน ${path.relative(root, file)} — เขียนแล้ว ${changed} คีย์, คงเดิม ${same}, ยังไม่เขียน ${pending} (fallback ไปไทยธรรมดา)`);
console.log(`ข้อผิดพลาด: ${errors.length}`);
for (const e of errors.slice(0, 40)) console.log("  ERROR  " + e);
if (errors.length > 40) console.log(`  ... และอีก ${errors.length - 40} รายการ`);
console.log(`คำเตือน:   ${warnings.length}`);
for (const w of warnings.slice(0, 40)) console.log("  WARN   " + w);
if (warnings.length > 40) console.log(`  ... และอีก ${warnings.length - 40} รายการ`);
process.exit(errors.length ? 1 : 0);
