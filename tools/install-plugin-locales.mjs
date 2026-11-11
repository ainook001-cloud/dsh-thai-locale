#!/usr/bin/env node
// ติดตั้งคำแปลไทยของชื่อ/คำอธิบายปลั๊กอินทดลองเข้าโฟลเดอร์เอนจินของ DSH
// วิธีใช้: node tools/install-plugin-locales.mjs [พาธengine/node_modules/@deepseek-ai]
// ไม่มี dependency และไม่แก้ไฟล์เดิมของเอนจิน — เขียนเฉพาะไฟล์ th.json ใหม่
// รันซ้ำได้ (เขียนทับเฉพาะ th.json ที่มีอยู่ในโฟลเดอร์นี้)
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
let done = 0;
const skipped = [];
for (const entry of entries) {
  const pkgDir = entry.pkg.slice(entry.pkg.indexOf("/") + 1); // @deepseek-ai/x -> x
  const from = path.join(srcRoot, pkgDir, "th.json");
  const to = path.join(target, pkgDir, "locale", "th.json");
  if (!fs.existsSync(path.join(target, pkgDir, "locale", "en.json"))) {
    skipped.push(pkgDir);
    continue;
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  done++;
}
console.log(`ติดตั้งแล้ว ${done} ไฟล์ที่ ${target}`);
if (skipped.length) console.log("ข้าม (ไม่พบ en.json):", skipped.join(", "));
console.log("ต้องรีสตาร์ท DSH ให้ชื่อปลั๊กอินอ่านใหม่");
