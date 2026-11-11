#!/usr/bin/env node
// สร้าง TRANSLATION_REVIEW.md ใหม่จากค่าจริงใน lib/client.js
// ใช้เมื่อคำแปลถูกแก้หลายจุดแล้ว เอกสารล้าสมัย
// รัน: node tools/build-translation-review.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientPath = path.join(root, 'lib', 'client.js');
const outPath = path.join(root, 'TRANSLATION_REVIEW.md');
const src = fs.readFileSync(clientPath, 'utf8');

// อ่านรายการคีย์ที่เคยถูกตั้งข้อสงสัย (เก็บเป็นรายชื่อคีย์เท่านั้น)
let keys = [];
if (fs.existsSync(outPath)) {
  const text = fs.readFileSync(outPath, 'utf8');
  keys = [...text.matchAll(/^- `([^`]+)`/gm)].map((m) => m[1]);
}
if (keys.length === 0) {
  console.error('ไม่พบรายการคีย์เดิมใน TRANSLATION_REVIEW.md');
  process.exit(2);
}

// พจนานุกรมจริง
const dicts = {};
const body = src.match(/const thDicts = \{([\s\S]*?)\n\};/)[1];
let ns = null;
for (const line of body.split('\n')) {
  const a = line.match(/^\s*"([^"]+)":\s*\{/);
  if (a) { ns = a[1]; dicts[ns] = dicts[ns] || {}; continue; }
  const b = line.match(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$/);
  if (b && ns) dicts[ns][b[1]] = b[2];
}

const rows = keys.map((key) => {
  let val = null;
  for (let j = key.lastIndexOf('.'); j > 0; j = key.lastIndexOf('.', j - 1)) {
    const n = key.slice(0, j), k = key.slice(j + 1);
    if (dicts[n] && k in dicts[n]) { val = dicts[n][k]; break; }
  }
  return { key, val };
});

const out = [
  '# รายการตรวจทานคำแปล',
  '',
  'ข้อความเหล่านี้ถูกตั้งข้อสงสัยโดย heuristic (คำที่ปรากฏครั้งเดียวและมีสระ/วรรณยุกต์) แต่**ไม่ได้หมายความว่าผิด** — หลายรายการถูกต้องอยู่แล้ว',
  'สำหรับแต่ละรายการ ให้อ่านข้อความในบริบทจริง แล้วแก้เฉพาะรายการที่ผิดจริงเท่านั้น',
  '',
  '> ⚠️ ค่าด้านล่างดึงจาก `lib/client.js` ณ เวลาที่สร้างไฟล์นี้ ถ้ามีการแก้ภายหลัง ให้รันสคริปต์นี้ใหม่',
  '',
  'วิธีแก้: แก้ที่ข้อความใน `lib/client.js` (ภายใน `const thDicts`) คงชื่อคีย์และ `{placeholders}` ไว้ให้เหมือนเดิมทุกตัว',
  '',
  `จำนวนรายการ: ${rows.length}`,
  '',
  ...rows.map((r) => `- \`${r.key}\`  \n  ${r.val === null ? '(ไม่พบคีย์ใน lib/client.js)' : r.val}`),
  '',
].join('\n');

fs.writeFileSync(outPath, out);
console.log(`เขียน TRANSLATION_REVIEW.md แล้ว ${rows.length} รายการ`);
console.log('คีย์ที่หาไม่เจอ:', rows.filter((r) => r.val === null).length);
