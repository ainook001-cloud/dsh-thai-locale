#!/usr/bin/env node
// ติดตั้งคำแปลไทยของชื่อ/คำอธิบายปลั๊กอินทดลอง เข้าโฟลเดอร์ locale ของแพ็กเกจในเอนจิน DSH
//
// วิธีใช้:
//   node tools/install-plugin-locales.mjs [พาธเอนจิน/node_modules/@deepseek-ai]
//
// ⚠️ พฤติกรรมการเขียนไฟล์ — โปรดอ่านก่อนรัน
//   • เขียน/อัปเดตเฉพาะไฟล์ `locale/th.json` เท่านั้น
//   • **ถ้ามี th.json อยู่แล้ว จะถูกเขียนทับ** ด้วยไฟล์จากรีโปนี้ (ไม่มีการ merge)
//     ถ้าคุณแก้ th.json ไว้เอง ให้สำรองก่อนรัน
//   • ไม่แตะ en.json, zh.json หรือไฟล์อื่นของแอป (ไม่ได้อ่านและไม่ได้เขียน)
//   • รันซ้ำได้ ผลลัพธ์เท่าเดิม (idempotent) เพราะเขียนทับด้วยเนื้อหาเดิม
//
// ไฟล์ที่ติดตั้งจะอยู่ในโฟลเดอร์เอนจิน ซึ่งเป็นของที่มากับ APK —
// อัปเดตแอปหรือใช้ Safe Mode แล้วไฟล์จะหาย ให้รันสคริปต์นี้อีกครั้ง
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcRoot = path.join(root, "plugin-locales", "experimental");

const defaultTarget = path.join(
  process.env.DSH_ENGINE_NODE_MODULES ?? "/data/user/0/com.dsh.android/files/engine/node_modules",
  "@deepseek-ai",
);
const target = process.argv[2] || defaultTarget;

if (!fs.existsSync(target)) {
  console.error("ไม่พบโฟลเดอร์เอนจิน:", target);
  process.exit(2);
}
if (!fs.existsSync(path.join(srcRoot, "index.json"))) {
  console.error("ไม่พบ plugin-locales/experimental/index.json");
  process.exit(2);
}

const entries = JSON.parse(fs.readFileSync(path.join(srcRoot, "index.json"), "utf8"));
let written = 0;
let overwritten = 0;
const skipped = [];

for (const entry of entries) {
  const pkgDir = entry.pkg.slice(entry.pkg.indexOf("/") + 1); // @deepseek-ai/x -> x
  const from = path.join(srcRoot, pkgDir, "th.json");
  const to = path.join(target, pkgDir, "locale", "th.json");
  // แตะเฉพาะแพ็กเกจที่แอปมีอยู่จริง (มี locale/en.json) — แพ็กเกจอื่นข้ามไป
  if (!fs.existsSync(path.join(target, pkgDir, "locale", "en.json"))) {
    skipped.push(pkgDir);
    continue;
  }
  if (fs.existsSync(to)) overwritten++;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  written++;
}

console.log(`เขียน th.json ${written} ไฟล์ ที่ ${target}`);
if (overwritten) console.log(`  ในจำนวนนี้เขียนทับไฟล์เดิม ${overwritten} ไฟล์ (เนื้อหาจากรีโปนี้ ไม่ได้ merge)`);
if (skipped.length) console.log("ข้าม (ไม่พบ en.json):", skipped.join(", "));
console.log("ไม่แตะ en.json / zh.json หรือไฟล์อื่นของแอป");
console.log("ต้องรีสตาร์ท DSH ให้ชื่อปลั๊กอินอ่านใหม่");
