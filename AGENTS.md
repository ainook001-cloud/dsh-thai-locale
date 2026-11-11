# AGENTS.md — คู่มือสำหรับ AI coding agent

ไฟล์นี้เขียนขึ้นสำหรับ AI coding agent (Claude Code, Codex, Cursor และเครื่องมือที่คล้ายกัน) มนุษย์ควรอ่าน README.md ก่อน

## โปรเจกต์นี้คืออะไร

`dsh-thai-locale` เป็นปลั๊กอินของ DSH (DeepSeek Harness) ที่เพิ่มภาษาไทย (`th`) ให้ UI ของ DSH ใช้ได้ทั้ง DSH Web และ DSH Desktop (Electron ที่รัน Web UI ชุดเดียวกัน) เป็นชุดคำแปล ไม่ใช่แอปพลิเคชัน ไม่มี runtime dependency และไม่เรียกเครือข่าย

## โครงสร้าง

| พาธ | หน้าที่ |
|---|---|
| `package.json` | manifest ของปลั๊กอิน บล็อก `dsh` ชี้ไปที่ไฟล์แพตช์และตั้ง platform ของ client เป็น `web` (Web GUI ใช้ค่านี้ตัดสินใจโหลด client) ส่วน `files` จำกัดสิ่งที่จะเผยแพร่ขึ้น npm |
| `cordis.patch.yml` | แพตช์ฝั่ง host ที่แทรกแถวของปลั๊กอินนี้เข้าไปในการตั้งค่าที่ประกอบขึ้น อย่าเปลี่ยน id ถ้าไม่ได้อัปเดต manifest |
| `lib/index.js` | ฝั่ง host ตั้งใจให้ว่าง (`apply()` ไม่ทำอะไร) |
| `lib/client.js` | ฝั่ง client และเป็นแหล่งความจริงเดียวของคำแปล DSH โหลดตอนรัน |
| `locale/en.json`, `locale/th.json` | ชื่อและคำอธิบายปลั๊กอินที่แสดงในรายการปลั๊กอินของ DSH |
| `icon.svg` | ไอคอนปลั๊กอิน: ธงชาติไทย สร้างด้วย `tools/generate-icon.py` (Python 3, ไม่บังคับ) |
| `NOTICE` | การระบุที่มาของเนื้อหาที่มาจาก DeepSeek Harness (MIT) เก็บไว้เมื่อเปลี่ยนข้อความสัญญาอนุญาต |
| `tools/check-translations.mjs` | ตัวตรวจแบบไม่พึ่ง dependency หารูปแบบความเสียหาย รันด้วย `node tools/check-translations.mjs` (หรือ `npm run check`) |
| `TRANSLATION_REVIEW.md` | รายการข้อความที่น่าสงสัยว่าอาจยังพิมพ์ผิด |
| `TRANSLATION_STATUS.md` | สถานะการตรวจคำแปล 178 รายการ (pending / reviewed / wontfix) |
| `VERSIONING.md` | กฎการขึ้นเลขเวอร์ชัน (major / minor / patch / เลขตัวที่สี่) |
| `tests/client-plugin.test.mjs` | รัน `lib/client.js` จริงใน vm sandbox — รันด้วย `node --test tests/*.test.mjs` |
| `tools/install-plugin-locales.mjs` | เขียน `th.json` ของปลั๊กอินทดลองเข้าโฟลเดอร์เอนจิน (เขียนทับถ้ามีอยู่) |
| `tools/build-translation-review.mjs` | สร้าง `TRANSLATION_REVIEW.md` ใหม่จากค่าจริงใน `lib/client.js` |
| `plugin-locales/experimental/` | ชื่อและคำอธิบายภาษาไทยของปลั๊กอินทดลอง 22 แพ็กเกจ |
| `market/` | คำแปลตลาดปลั๊กอิน (ตลาด + 23 หมวด + 57 คำอธิบาย) พร้อมตัวรวม |
| `docs/` | `show-your-plugins.md` (ข้อความโพสต์ประกาศ) และ `testing.md` (การทดสอบ 3 ชั้น) |
| `progress_report.md` | รายงานความคืบหน้าแต่ละรอบ |

## โค้ดฝั่ง client ทำงานอย่างไร

`lib/client.js` เป็น wrapper ครอบพจนานุกรมหนึ่งก้อน:

```js
window.__ModuleLoader__.load({ id: "dsh-thai-locale", factory: () => { /* ... */ } });
```

ภายใน factory:
- `const thDicts = { "<namespace>": { "<key>": "<ข้อความไทย>" } }` เก็บคำแปล (ราว 4,600 คีย์ ในราว 75 namespace) นี่คือส่วนที่แก้
- `apply(ctx)` ใช้ `ctx.locale` (`runtime`) เรียก `addLanguage({ id: "th", label: "ไทย", fallback: "zh" })` (ห่อ try/catch), จากนั้น `runtime.register(ns, { th: dict })` ทุก namespace, แล้ว `runtime.setLocale("th")` ทุกคำสั่งห่อ try/catch โดยตั้งใจ: จุดเดียวล้มเหลวต้องไม่ปิดปลั๊กอินทั้งตัว
- `exports.inject = ["locale"]` และ `exports.name = "dsh-thai-locale"` เป็นสิ่งที่ DSH ต้องการ

ลำดับ fallback ตอนรันคือ th → zh → en คีย์ไทยที่ขาดจะแสดงจีนหรืออังกฤษแทน

## กฎการแก้คำแปล

1. แก้เฉพาะค่าภายใน `thDicts` ห้ามเปลี่ยนชื่อคีย์ สลับลำดับ namespace หรือแตะ wrapper เว้นแต่งานนั้นเป็นเรื่อง wrapper
2. คง `{placeholder}` ทุกตัวให้เหมือนต้นฉบับ ทั้งชื่อและปีกกา เช่น `{count}`, `{value}`, `{toolName}`
3. ห้ามใส่อักษร CJK (จีน/ญี่ปุ่น) ในค่าภาษาไทย
4. ห้ามใช้อักษรลาว (U+0E80–U+0EFF) ในข้อความไทย รูปร่างคล้ายอักษรไทยแต่เป็นคนละโค้ดพอยต์
5. ใช้ Unicode แบบ NFC ห้ามเขียนเครื่องหมายประกอบซ้ำ
6. ชื่อแบรนด์ ชื่อผลิตภัณฑ์ ชื่อคำสั่ง (เช่น `/plan`, `compact`, `Bash`) ศัพท์โปรโตคอล (`API Key`, `Base URL`, `TTFT`) และชื่อเครื่องมือ คงเป็นภาษาอังกฤษ
7. คำอังกฤษทั่วไปในป้าย UI ให้ใช้ไทยก่อน ตัวอย่างที่ใช้แล้ว: feedback → ข้อเสนอแนะ, skill → สกิล, Route ID → รหัสเส้นทาง, Call ID → รหัสการเรียก
8. ห้ามเพิ่มการเรียกเครือข่าย `eval` `localStorage` `sessionStorage` หรือที่เก็บข้อมูลเบราว์เซอร์อื่น ๆ ใน `lib/client.js`
9. ห้ามเพิ่ม dependency โปรเจกต์นี้ตั้งใจไม่มีเลย

## ตรวจสอบก่อนส่งงาน

```bash
node --check lib/client.js     # ไวยากรณ์
node tools/check-translations.mjs   # ตัวตรวจคําแปล ต้องรายงานข้อผิดพลาด: 0
```

และยืนยันจำนวนคีย์ไม่เปลี่ยน (4601 ตอนที่เขียน) เว้นแต่ตั้งใจเพิ่มหรือลบคีย์

## ข้อจำกัดที่ทราบ

- รีโปนี้ไม่มีไฟล์ต้นฉบับภาษาอังกฤษ จึงยืนยันความครอบคลุมของคีย์ทั้งชุดที่นี่ไม่ได้ อย่ากลับไปอ้าง "100%" ถ้าไม่มีต้นฉบับให้เทียบ
- บางคำยังสงสัยว่าพิมพ์ผิด รายการอยู่ใน `TRANSLATION_REVIEW.md` ให้แก้ตามบริบท หลายรายการถูกต้องอยู่แล้ว
- ประกาศรองรับทั้ง DSH Web และ DSH Desktop (Desktop เป็น Electron ที่รัน Web UI ชุดเดียวกัน) แต่ยังไม่ได้ทดสอบติดตั้งจริงบนเดสก์ท็อป
- คำสั่งติดตั้งใน README (`dsh plugin --profile web add dsh-thai-locale`) ตรวจกับซอร์สโค้ด DSH แล้วว่าเป็นคำสั่งที่ถูกต้อง
- namespace อย่าง `dsh-android-mobile.*` และ `dsh-android-market` ถูกรวมไว้ด้วย อาจไม่ได้ใช้บนแพลตฟอร์ม web

## ไอคอน

ไอคอนคือธงชาติไทยที่วาดเป็นธงพลิ้วบนพื้นโค้งมน ถ้าจะเปลี่ยน ให้แก้ `tools/generate-icon.py` แล้วรัน `python3 tools/generate-icon.py` ห้ามใส่โลโก้ DeepSeek หรือเครื่องหมายการค้าของบุคคลที่สามลงในไอคอน

## การตั้งเวอร์ชัน

ตามธรรมเนียมของ maintainer: แก้เล็ก ๆ และแก้คำผิด เพิ่มเลขตัวท้าย (1.0.0 → 1.0.1) อัปเดตใหญ่หรือมีฟีเจอร์ใหม่เยอะจึงเพิ่มเลขกลาง การเปลี่ยนเล็กมาก ๆ ใช้เลขส่วนที่สี่ได้ (1.0.1.1)

## สัญญาอนุญาต

CC BY-NC-SA 4.0 ดู LICENSE ผลงานที่ส่งเข้ามาถือว่าอยู่ภายใต้สัญญาอนุญาตเดียวกัน
