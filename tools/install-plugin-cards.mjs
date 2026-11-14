#!/usr/bin/env node
/**
 * ติดตั้งการ์ดปลั๊กอินฉบับไทย (ชื่อ + คำอธิบาย) ให้แพ็กเกจในเอนจินและในโปรไฟล์
 *
 * ที่มา: คำแปลเก็บไว้ใน plugin-locales/cards/th.txt (รูปแบบ: แพ็กเกจ<TAB>ชื่อ<TAB>คำอธิบาย)
 * เขียนเฉพาะไฟล์ locale/th.json — ไฟล์อื่นของแอปไม่ถูกแตะ
 *
 * ⚠️ ถ้ามี th.json อยู่แล้ว จะถูกเขียนทับ
 *
 * วิธีใช้:
 *   node tools/install-plugin-cards.mjs
 *   node tools/install-plugin-cards.mjs <พาธ node_modules ของเอนจิน>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, 'plugin-locales', 'cards', 'th.txt');
const engineRoot =
  process.argv[2] ??
  process.env.DSH_ENGINE_NODE_MODULES ??
  '/data/user/0/com.dsh.android/files/engine/node_modules';
const profileRoot = path.join(process.env.HOME ?? '', '.dsh', 'profiles', 'web', 'node_modules');

if (!fs.existsSync(mapPath)) {
  console.error('ไม่พบไฟล์คำแปล:', mapPath);
  process.exit(2);
}

// อ่านคำแปล
const map = new Map();
for (const line of fs.readFileSync(mapPath, 'utf8').split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const parts = line.split('\t');
  if (parts.length < 3) continue;
  map.set(parts[0].trim(), { title: parts[1].trim(), description: parts[2].trim() });
}
console.log(`คำแปลในไฟล์: ${map.size} รายการ`);

let written = 0;
let overwritten = 0;
const missing = [];

for (const [pkg, text] of map) {
  // หาโฟลเดอร์ของแพ็กเกจ: ลองทั้งเอนจินและโปรไฟล์
  const candidates = [
    path.join(engineRoot, pkg),
    path.join(profileRoot, pkg),
  ];
  const dir = candidates.find((d) => fs.existsSync(path.join(d, 'locale')));
  if (!dir) { missing.push(pkg); continue; }

  const target = path.join(dir, 'locale', 'th.json');
  if (fs.existsSync(target)) overwritten++;
  fs.writeFileSync(target, JSON.stringify({ meta: text }, null, 2) + '\n');
  written++;
}

console.log(`เขียน th.json ${written} ไฟล์`);
if (overwritten) console.log(`  เขียนทับไฟล์เดิม ${overwritten} ไฟล์`);
if (missing.length) {
  console.log(`หาโฟลเดอร์ไม่เจอ ${missing.length} แพ็กเกจ:`);
  for (const m of missing.slice(0, 20)) console.log('  -', m);
}
console.log('ไม่แตะ en.json / zh.json หรือไฟล์อื่นของแอป');
console.log('ต้องรีสตาร์ท DSH ให้ชื่อปลั๊กอินอ่านใหม่');
