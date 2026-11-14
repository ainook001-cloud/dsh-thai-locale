#!/usr/bin/env node
/**
 * แปะคำแปลไทยลงข้อความ UI ของปลั๊กอินที่ติดตั้งไว้
 *
 * ที่มา: plugin-locales/ui/<ชื่อปลั๊กอิน>.json — แต่ละไฟล์คือ { "ข้อความต้นฉบับ": "คำแปลไทย" }
 * วิธีทำงาน: อ่านไฟล์ client ของปลั๊กอิน แล้วแทนที่สตริงต้นฉบับด้วยคำแปล (แทนแบบตรงตัว)
 *
 * ⚠️ เขียนทับไฟล์ของปลั๊กอิน — สำรองเป็น <ไฟล์>.th-bak ครั้งแรกก่อนเขียน
 * ⚠️ อัปเดตปลั๊กอินแล้วไฟล์จะถูกทับ คำแปลหาย ต้องรันสคริปต์นี้อีกครั้ง
 *
 * วิธีใช้:
 *   node tools/install-plugin-ui.mjs
 *   node tools/install-plugin-ui.mjs <พาธ node_modules ของโปรไฟล์>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const uiDir = path.join(root, 'plugin-locales', 'ui');
const nm =
  process.argv[2] ??
  path.join(process.env.HOME ?? '', '.dsh', 'profiles', 'web', 'node_modules');

if (!fs.existsSync(uiDir)) {
  console.error('ไม่พบโฟลเดอร์คำแปล:', uiDir);
  process.exit(2);
}

/** ไฟล์ client ของแต่ละปลั๊กอิน (relative ไปยังโฟลเดอร์แพ็กเกจ) */
const entryFile = {
  'any-background': 'lib/client.js',
  'opencode-patch': 'lib/client.js',
  'boot-guard': 'lib/client.js',
  ops: 'lib/client.js',
  'token-saver': 'client.js',
  'plugin-save-token': 'lib/client.js',
  'plugin-guard': 'lib/client.js',
  'compaction-threshold': 'lib/client.js',
  'plugin-thinking-api': 'lib/client.js',
};

let plugins = 0;
let strings = 0;
const skipped = [];

for (const file of fs.readdirSync(uiDir)) {
  if (!file.endsWith('.json')) continue;
  const name = file.slice(0, -5);
  const rel = entryFile[name];
  if (!rel) { skipped.push(name + ' (ไม่มีในรายการ)'); continue; }

  const target = path.join(nm, 'dsh-' + name, rel);
  if (!fs.existsSync(target)) { skipped.push(name + ' (ไม่ได้ติดตั้ง)'); continue; }

  const bak = target + '.th-bak';
  if (!fs.existsSync(bak)) fs.copyFileSync(target, bak);

  let s = fs.readFileSync(target, 'utf8');
  const map = JSON.parse(fs.readFileSync(path.join(uiDir, file), 'utf8'));
  // เรียงจากยาวไปสั้น เพื่อไม่ให้คำสั้นกินประโยคยาว
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  let n = 0;
  for (const k of keys) if (s.includes(k)) { s = s.split(k).join(map[k]); n++; }

  fs.writeFileSync(target, s);
  plugins++;
  strings += n;
  console.log(`  ${name}: ${n}/${keys.length} ข้อความ`);
}

console.log(`\nแปะคำแปลแล้ว ${strings} ข้อความ ใน ${plugins} ปลั๊กอิน`);
if (skipped.length) console.log('ข้าม:', skipped.join(', '));
console.log('ไฟล์ต้นฉบับสำรองไว้ที่ <ไฟล์>.th-bak');
console.log('ต้องรีสตาร์ท DSH (หรือโหลดหน้าใหม่) ให้ข้อความใหม่มีผล');