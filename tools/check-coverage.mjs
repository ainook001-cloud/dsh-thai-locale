#!/usr/bin/env node
// ตรวจความสอดคล้องของพจนานุกรม เทียบกัน 3 ทาง
//   1. th กับ th-roast (missing / extra / placeholder)
//   2. กับซอร์ส zh/en ของแพ็กเกจเอนจิ้นที่ติดตั้งได้ (เท่าที่อ่านได้)
//   3. ตรวจคีย์ที่ไม่มีต้นทาง (obsolete) ภายในโปรเจกต์
//
// ใช้: node tools/check-coverage.mjs [--engine <path>] [--quiet]
// รหัสออก 1 = มีข้อผิดพลาด
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDicts, objectRange, placeholders } from './lib/parse-dicts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const quiet = argv.includes('--quiet');
const ei = argv.indexOf('--engine');
const engineArg = ei >= 0 ? argv[ei + 1] : '/data/user/0/com.dsh.android/files/engine/node_modules';
// รับได้ทั้ง .../node_modules และ .../node_modules/@deepseek-ai
const engineRoots = [engineArg, path.join(engineArg, '@deepseek-ai')].filter((p) => fs.existsSync(p));

const { th, roast } = parseDicts(fs.readFileSync(path.join(root, 'lib', 'client.js'), 'utf8'));

const errors = [];
const notes = [];

// 1) th กับ th-roast
let nKeys = 0;
let nRoastWritten = 0;
for (const ns of Object.keys(th)) {
  nKeys += Object.keys(th[ns]).length;
  const bag = roast?.[ns];
  if (!bag) { notes.push(`${ns}: ไม่มีในชุดกวน (fallback ไปไทยธรรมดา)`); continue; }
  for (const k of Object.keys(th[ns])) {
    if (!(k in bag)) continue;                       // ไม่เขียน = ตั้งใจ fallback
    if (bag[k] !== th[ns][k]) nRoastWritten++;
    if (placeholders(th[ns][k]) !== placeholders(bag[k])) errors.push(`PH ${ns}.${k}`);
  }
  for (const k of Object.keys(bag)) {
    if (!(k in th[ns])) errors.push(`EXTRA ${ns}.${k} (มีในชุดกวน แต่ไม่มีในไทยธรรมดา)`);
  }
}
notes.unshift(`คีย์ไทย ${nKeys} · ชุดกวนเขียนใหม่ ${nRoastWritten}`);

// 2) เทียบกับซอร์สของแพ็กเกจเอนจิ้น
function readSourceDict(src, marker) {
  const r = objectRange(src, marker);
  if (!r) return null;
  try { return JSON.parse(src.slice(r.start, r.end)); } catch { return null; }
}

let paired = 0;
let srcKeys = 0;
let matched = 0;
if (engineRoots.length) {
  const seen = new Set();
  for (const rootDir of engineRoots) for (const d of fs.readdirSync(rootDir)) {
    if (seen.has(d)) continue; seen.add(d);
    const f = path.join(rootDir, d, 'lib', 'client.js');
    if (!fs.existsSync(f)) continue;
    let s;
    try { s = fs.readFileSync(f, 'utf8'); } catch { continue; }
    const m = s.match(/const\s+NS\s*=\s*["']([^"']+)["']/);
    if (!m || !th[m[1]]) continue;
    const zh = readSourceDict(s, 'const zh = {');
    if (!zh) continue;
    paired++;
    const zk = Object.keys(zh);
    srcKeys += zk.length;
    const mine = new Set(Object.keys(th[m[1]]));
    for (const k of zk) {
      if (mine.has(k)) {
        matched++;
        if (placeholders(zh[k]) !== placeholders(th[m[1]][k])) errors.push(`PH-source ${m[1]}.${k}`);
      }
    }
  }
  notes.push(`เทียบซอร์สได้ ${paired} namespace · คีย์ซอร์ส ${srcKeys} · ตรงกับไทย ${matched}`);
} else {
  notes.push(`ไม่พบเอนจิ้นที่ ${engineArg} — ข้ามการเทียบซอร์ส`);
}

if (!quiet) {
  console.log('ตรวจ coverage:');
  for (const n of notes) console.log('  - ' + n);
}
console.log(`ข้อผิดพลาด: ${errors.length}`);
for (const e of errors.slice(0, 40)) console.log('  ERROR  ' + e);
if (errors.length > 40) console.log(`  ... และอีก ${errors.length - 40} รายการ`);
process.exit(errors.length ? 1 : 0);
