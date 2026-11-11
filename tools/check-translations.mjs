#!/usr/bin/env node
// ตรวจคำแปลไทยใน lib/client.js หารูปแบบความเสียหายที่พบบ่อย
// ไม่มี dependency วิธีใช้: node tools/check-translations.mjs [path/to/client.js]
// รหัสออก 1 = เจอข้อผิดพลาดร้ายแรง ส่วนคำเตือนไม่ทำให้รันล้มเหลว
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] || path.join(root, "lib", "client.js");
const src = fs.readFileSync(file, "utf8");

// พจนานุกรมคือออบเจ็กต์ JSON ระหว่าง "const thDicts = " กับท้ายของ wrapper
const startMarker = "const thDicts = ";
const endMarker = "\nfunction apply(ctx)";
const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) {
  console.error("หาบล็อก thDicts ไม่เจอใน", file);
  process.exit(2);
}
const dicts = JSON.parse(src.slice(start + startMarker.length, end).replace(/[;\s]+$/, ""));

const THAI = /[\u0E00-\u0E7F]/;
const LAO = /[\u0E80-\u0EFF]/;          // อักษรลาวที่หน้าตาคล้ายไทย: ต้นเหตุความเสียหายที่พบบ่อย
const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
const MARK_RUN = /([\u0E31\u0E34-\u0E3A\u0E47-\u0E4E])\1/;  // เครื่องหมายประกอบซ้ำสองครั้ง
const TONE_TWICE = /[\u0E48-\u0E4B][\u0E48-\u0E4B]/;          // วรรณยุกต์สองตัวในพยางค์เดียว
const ABOVE_BELOW = "\u0E31\u0E34-\u0E3A";
const TONE = "\u0E48-\u0E4B";
const TONE_BEFORE_VOWEL = new RegExp(`[${TONE}][${ABOVE_BELOW}\u0E47]`); // วรรณยุกต์ต้องมาหลังสระ
const TWO_UPPER_VOWELS = new RegExp(`[\u0E31\u0E34-\u0E37][\u0E31\u0E34-\u0E37]`);
const LEADING_MARK = new RegExp(`^[${ABOVE_BELOW}${TONE}\u0E47\u0E4D]`);  // พยางค์เริ่มด้วยเครื่องหมายไม่ได้
// เครื่องหมายประกอบติดช่องว่าง = อักษรเพี้ยน เช่น ดต้ ิดตั้ง / มอี ัอัปเดต
const SPACE_BEFORE_MARK = /\s[ั-\u0E3A\u0E47-\u0E4E]/;

const errors = [];
const warnings = [];
let total = 0;
const seg = new Intl.Segmenter("th", { granularity: "word" });

for (const ns of Object.keys(dicts)) {
  for (const key of Object.keys(dicts[ns])) {
    total++;
    const id = `${ns}.${key}`;
    const value = dicts[ns][key];
    if (typeof value !== "string") { errors.push(`${id}: ค่าไม่ใช่สตริง`); continue; }
    if (CJK.test(value)) errors.push(`${id}: มีอักษรจีน/ญี่ปุ่น (CJK)`);
    if (!THAI.test(value)) continue;  // English-only values are allowed (brand/command names)
    if (LAO.test(value)) errors.push(`${id}: มีอักษรลาวที่หน้าตาคล้ายไทย: ${value}`);
    if (SPACE_BEFORE_MARK.test(value)) errors.push(`${id}: เครื่องหมายประกอบติดช่องว่าง: ${value}`);
    if (MARK_RUN.test(value)) errors.push(`${id}: เครื่องหมายประกอบซ้ำ: ${value}`);
    if (TONE_TWICE.test(value)) warnings.push(`${id}: วรรณยุกต์สองตัวติดกัน: ${value}`);
    for (const { segment } of seg.segment(value)) {
      if (!THAI.test(segment)) continue;
      if (TONE_BEFORE_VOWEL.test(segment)) warnings.push(`${id}: วรรณยุกต์มาก่อนสระใน "${segment}"`);
      if (TWO_UPPER_VOWELS.test(segment)) warnings.push(`${id}: สระสองตัวใน "${segment}"`);
      if (LEADING_MARK.test(segment)) warnings.push(`${id}: คำเริ่มด้วยเครื่องหมาย: "${segment}"`);
    }
  }
}

console.log(`ตรวจแล้ว ${total} คีย์ใน ${path.relative(root, file)}`);
console.log(`ข้อผิดพลาด: ${errors.length}`);
for (const e of errors.slice(0, 50)) console.log("  ERROR  " + e);
console.log(`คำเตือน:   ${warnings.length} (อาจพิมพ์ผิด ดู TRANSLATION_REVIEW.md)`);
for (const w of warnings.slice(0, 50)) console.log("  WARN   " + w);
if (warnings.length > 50) console.log(`  ... และอีก ${warnings.length - 50} รายการ`);
process.exit(errors.length ? 1 : 0);
