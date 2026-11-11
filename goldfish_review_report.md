# รายงานตรวจปลาทอง — dsh-thai-locale

ผู้ตรวจ: ปลาทอง (เอเจนต์เกิดใหม่ ไม่มีบริบทเดิม)
วันที่: 2026-11-12 · โหมด: อ่านอย่างเดียว (ไม่มีการแก้ไฟล์โปรเจกต์)
รีโปที่ตรวจ: `/storage/emulated/0/AI storage/dsh-thai-locale` (51 ไฟล์ ไม่นับรายงานนี้)

## สรุป

- พบ **15 ข้อ** — CRITICAL 1 · MAJOR 1 · MINOR 13
- ข้อร้ายแรงที่สุด: **ข้อความไทยที่จัดส่งจริงใน `lib/client.js` มีอักษรเพี้ยน 10 จุด** (เช่น `ยังไม่ ดต้ ิดตั้ง`, `ไม่มสี ิทธิ์เขียน`) ขณะที่เอกสารยืนยันว่า "ข้อผิดพลาด 0" — ตัวตรวจไม่ได้ตรวจรูปแบบนี้
- ข้อรองลงมา: `TRANSLATION_REVIEW.md` และ `TRANSLATION_STATUS.md` อ้างข้อความที่มีอักษรเพี้ยน/ไม่มีอยู่จริงในไฟล์คำแปล

## ตารางตรวจ

| สิ่งที่ตรวจ | ผลจริง (วัดเอง) | ที่เอกสารอ้าง | ผล |
|---|---|---|---|
| `package.json` version | `1.0.6` | เอกสารบางไฟล์อ้าง 1.0.5 | ❌ (F3, F4, F6) |
| `package.json` files[] | 15 รายการ | ครอบทุกไฟล์ที่เอกสารลิงก์ | ❌ (F10) |
| `package.json` scripts[] | `check`, `install-locales`, `test` | ตรงกับที่เอกสารใช้ | ✅ |
| จำนวนคีย์คำแปล | 4,601 คีย์ / 75 namespace | 4,601 / 75 | ✅ |
| `node tools/check-translations.mjs` | 4,601 คีย์, ข้อผิดพลาด 0, คำเตือน 0 (exit 0) | "ข้อผิดพลาด 0" | ✅ (แต่ดู F1) |
| `node --test tests/*.test.mjs` | 6 pass / 0 fail / 0 skipped | 6 ข้อ | ✅ |
| `node --check` ทุกไฟล์ JS | 6 ไฟล์ ผ่านหมด | progress_report อ้าง "5 ไฟล์" | ❌ (F5) |
| JSON ทั้งรีโป | 28 ไฟล์ parse ผ่านหมด | 28 ไฟล์ | ✅ |
| หมวดตลาด (`CATEGORIES`) | 23 หมวด | 23 หมวด | ✅ |
| `market/data/th` | agi 45 + wsl 12 = 57 | 57 (agi 45, wsl 12) | ✅ |
| `plugin-locales/experimental` | 22 แพ็กเกจ + index.json | 22 ตัว | ✅ |
| `TRANSLATION_REVIEW.md` | 178 รายการ | 178 | ✅ (แต่เนื้อหาเพี้ยน F2) |
| `TRANSLATION_STATUS.md` | 178 แถว, pending 178, ใช่ 49 / ไม่ 129 | 178, 49, 129 | ✅ |
| อักษร CJK ทั้งรีโป | 0 บรรทัด | "ไม่มีอักษรจีน" | ✅ |
| อักษรลาว / วรรณยุกต์ซ้ำ / zero-width | 0 | ตัวตรวจรายงาน 0 | ✅ |
| อักษรไทยเรียงผิดลำดับ (เว้นวรรคก่อนเครื่องหมาย) | client.js 6 บรรทัด, review 11 บรรทัด | เอกสารไม่ได้กล่าวถึง | ❌ (F1, F2) |
| คำสั่งที่เอกสารบอกให้รัน | `npm`/`npx`/`dsh`/`python3` ไม่มีในเครื่องนี้ | เอกสารใช้คำสั่งเหล่านี้เป็นหลัก | ❌ (F9) |
| NOTICE: แหล่งที่มา/ลิขสิทธิ์ | ตรงกับไฟล์จริง (22 แพ็กเกจ, agi 45, wsl 12, MIT/CC0/CC BY-NC-SA) | — | ✅ (ยกเว้นจำนวนไฟล์ F6) |
| ตัวเลข 5,324 รายการในแคตตาล็อก | ตรวจไม่ได้ (ไม่มี index.json ต้นฉบับในรีโป) | 5,324 | ⚠️ UNVERIFIED (F11) |

## รายการข้อบกพร่อง

### F1 — CRITICAL — VERIFIED
ไฟล์: `lib/client.js` บรรทัด 3072, 3074, 3075, 3082, 3083, 3084, 3111, 3112, 3113, 3129

ข้อความที่พบ (คัดตรงจากไฟล์):
```
3072:   "statusNotInstalled": "ยังไม่ ดต้ ิดตั้ง",
3074:   "statusUpdateAvailable": "มอี ัอัปเดต",
3075:   "sourceNotInstalled": "ยังไม่ ดต้ ิดตั้ง",
3082:   "installGithubTimeoutTitle": "เกินเวลาอย่างที่ GitHub",
3083:   "installGithubFailedDescription": "ลองแหลง ติดตั้งอื่น",
3084:   "installUseGithubMirror": "ใช้ ิร์เรอรใ์ นจีน",
3111:   "installEnableNow": "เปิดใช้ ันาที",
3112:   "installDetailsShow": "แสดงรายละเอยีดการติดตั้ง",
3113:   "installDetailsHide": "ซ้อนรายละเอยีดการติดตั้ง",
3129:   "installFailurePermission": "ไม่มสี ิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้",
```
ทำไมผิด: สระ/วรรณยุกต์ถูกสลับฝั่งกับพยัญชนะ และมีช่องว่างโผล่กลางคำ ("ดต้ ิดตั้ง" ควรเป็น "ได้ติดตั้ง", "มอี" ควรเป็น "มี", "รายละเอยีด" ควรเป็น "รายละเอียด", "ซ้อน" ควรเป็น "ซ่อน") ข้อความเหล่านี้คือข้อความที่ผู้ใช้เห็นจริงบนหน้าจอปลั๊กอิน จึงทำให้ปลั๊กอินภาษาไทยแสดงข้อความที่อ่านไม่รู้เรื่อง และขัดกับคำยืนยันในเอกสารว่า "ข้อผิดพลาด 0" / "ตรวจรูปแบบอักษรแล้ว" เพราะตัวตรวจ `tools/check-translations.mjs` ไม่มีกฎจับ "ช่องว่างก่อนเครื่องหมายประกอบ" หรือ "สระอยู่ผิดฝั่ง"

ข้อความที่ควรเป็น:
```
3072:   "statusNotInstalled": "ยังไม่ได้ติดตั้ง",
3074:   "statusUpdateAvailable": "มีอัปเดต",
3075:   "sourceNotInstalled": "ยังไม่ได้ติดตั้ง",
3082:   "installGithubTimeoutTitle": "หมดเวลารอ GitHub",
3083:   "installGithubFailedDescription": "ลองแหล่งติดตั้งอื่น",
3084:   "installUseGithubMirror": "ใช้มิเรอร์ในจีน",
3111:   "installEnableNow": "เปิดใช้ทันที",
3112:   "installDetailsShow": "แสดงรายละเอียดการติดตั้ง",
3113:   "installDetailsHide": "ซ่อนรายละเอียดการติดตั้ง",
3129:   "installFailurePermission": "ไม่มีสิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้",
```
(3111/3084 เดาจากชื่อคีย์ — ควรเทียบกับต้นฉบับ en/zh ก่อนแก้)

### F2 — MAJOR — VERIFIED
ไฟล์: `TRANSLATION_REVIEW.md` บรรทัด 190, 198, 200, 202, 208, 218, 228, 236, 240, 244, 246, 252, 254, 260, 262, 264, 266, 268, 270 (และอื่น ๆ)
ไฟล์: `TRANSLATION_STATUS.md` บรรทัด 149, 157

ข้อความที่พบ (ตัวอย่างคัดตรง):
```
TRANSLATION_REVIEW.md:202:  ชื่อแพ็กเกจปลั๊กอินคอื ชื่อแพ็กเกจ npm (เช่น dsh-xxx หรือ @author/plugin): ส่วนที้ถัดจาก dsh plugin add หรือ pnpm add ในคําสั่งติดตั้งที README ของปลั๊กอินชุนชน
TRANSLATION_REVIEW.md:268:  โปรไฟล์นรี้ ันโดยไม่ม HMR หยุดมันแล้วถอดถอนแพ็กเกจดว้ ย dsh plugin
TRANSLATION_REVIEW.md:200:  ไม่มอี งค์ป์ ระกอบที้ตรงกับคําค้น
TRANSLATION_REVIEW.md:228:  ใช้ ิร์เรอรใ์ นจีน
TRANSLATION_STATUS.md:149: | 110 | `pluginManager.installUseGithubMirror` | `pending` | ไม่ | `ใช้ ิร์เรอรใ์ นจีน` |
TRANSLATION_STATUS.md:157: | 118 | `pluginManager.installFailurePermission` | `pending` | ไม่ | `ไม่มสี ิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้` |
```
ทำไมผิด: คำที่อ้างว่าเป็น "ค่าปัจจุบัน" ไม่มีอยู่จริงใน `lib/client.js` เลย (เทียบทีละคีย์แล้ว: `คอื`, `ชุนชน`, `นรี้` ไม่พบใน client.js แม้แต่ครั้งเดียว) แปลว่าเอกสารทั้งสองไฟล์พาคนตรวจไปดูข้อความที่ไม่มีอยู่ · อีกทั้งใน 178 รายการ มี 49 รายการที่ค่าใน `lib/client.js` ถูกแก้ไปแล้ว แต่เอกสารยังแสดงค่าเก่าโดยไม่เตือน (คำอธิบายเรื่อง snapshot อยู่ที่ `TRANSLATION_STATUS.md:26` แต่ไม่มีใน `TRANSLATION_REVIEW.md`)

ข้อความที่ควรเป็น (คัดจาก `lib/client.js` จริง):
```
pluginManager.installGuideIdHint: ชื่อแพ็กเกจปลั๊กอินคือชื่อแพ็กเกจ npm (เช่น dsh-xxx หรือ @author/plugin): ส่วนที่ถัดจาก dsh plugin add หรือ pnpm add ในคําสั่งติดตั้งที่ README ของปลั๊กอินนั้น
pluginManager.reasonStopProfile: โปรไฟล์นี้รันโดยไม่มี HMR หยุดมันแล้วถอดถอนแพ็กเกจด้วย dsh plugin
pluginManager.partsFilterEmpty: ไม่มีองค์ประกอบที่ตรงกับคําค้น
```
และควรเพิ่มบรรทัดใต้หัวเรื่องของ `TRANSLATION_REVIEW.md` ว่า "ค่าที่แสดงเป็น snapshot เก่า อาจไม่ตรงกับ `lib/client.js` ปัจจุบัน"

### F3 — MINOR — VERIFIED
ไฟล์: `docs/show-your-plugins.md:91`
ที่พบ: `- Changelog: see the release notes (1.0.0 → 1.0.5)`
ทำไมผิด: `package.json:3` เป็น `"version": "1.0.6"`
ควรเป็น: `- Changelog: see the release notes (1.0.0 → 1.0.6)`

### F4 — MINOR — VERIFIED
ไฟล์: `progress_report.md:3`
ที่พบ: `วันที่: 2026-11-12 · เวอร์ชันล่าสุดที่ปล่อยแล้ว: 1.0.5 (ยังไม่ bump รอบนี้)`
ทำไมผิด: manifest เป็น 1.0.6 แล้ว และ `VERSIONING.md:7–9,15` ก็ยกตัวอย่างบนฐาน 1.0.6
ควรเป็น: `วันที่: 2026-11-12 · เวอร์ชันล่าสุดที่ปล่อยแล้ว: 1.0.6`

### F5 — MINOR — VERIFIED
ไฟล์: `progress_report.md:56`
ที่พบ: `node --check  ทุกสคริปต์ ผ่าน (5 ไฟล์)`
ทำไมผิด: รีโปมีไฟล์ JS/MJS 6 ไฟล์ (`lib/client.js`, `lib/index.js`, `market/build-th.mjs`, `tests/client-plugin.test.mjs`, `tools/check-translations.mjs`, `tools/install-plugin-locales.mjs`) และตรวจแล้วผ่านทั้ง 6
ควรเป็น: `node --check ทุกสคริปต์ ผ่าน (6 ไฟล์)`

### F6 — MINOR — VERIFIED
ไฟล์: `NOTICE:6`
ที่พบ: `รายการนี้ตรวจจากไฟล์จริงในรีโป (46 ไฟล์) ณ เวอร์ชัน 1.0.5`
ทำไมผิด: นับจริงได้ 51 ไฟล์ (ไม่นับ `goldfish_review_report.md` ที่ผู้ตรวจสร้าง) และเวอร์ชันคือ 1.0.6
ควรเป็น: `รายการนี้ตรวจจากไฟล์จริงในรีโป (51 ไฟล์) ณ เวอร์ชัน 1.0.6`

### F7 — MINOR — VERIFIED
ไฟล์: `market/build-th.mjs:6–7`
ที่พบ: `เฉพาะส่วนที่เป็น "คําศัพท์ของตลาด" คือ ชื่อตลาด คําอธิบายตลาด และชื่อหมวดทั้ง 23 / ส่วนชื่อ/คําอธิบายของปลั๊กอินแต่ละตัวคงเดิม`
ทำไมผิด: โค้ดไฟล์เดียวกันบรรทัด 72–104 อ่าน `data/th/*.json` แล้วเขียน `plugin.description.th` ลงไปจริง (บรรทัด 100: `plugin.description = { ...(plugin.description ?? {}), th: text }`) และ `market/README.md:10` ก็บรรยายว่าตัวรวมเติม "คําอธิบายปลั๊กอินที่แปลแล้ว" — หัวไฟล์จึงขัดกับโค้ดของตัวเอง
ควรเป็น: `... และคําอธิบายปลั๊กอินรายตัวที่แปลแล้วใน data/th/<หมวด>.json (เฉพาะรายการที่ชื่อและหมวดตรงกับต้นฉบับ)`

### F8 — MINOR — VERIFIED
ไฟล์: `CONTRIBUTING.md:19`
ที่พบ: ``3. ตรวจด้วยคําสั่ง `node --check lib/client.js` และ `npm run check` ต้องแสดง `Errors: 0` ``
ทำไมผิด: `tools/check-translations.mjs:61` พิมพ์ `ข้อผิดพลาด: N` (ภาษาไทย) ไม่มีคำว่า `Errors:` เลย ผู้ทำตามจะหาข้อความนั้นไม่เจอ
ควรเป็น: ``... ต้องแสดง `ข้อผิดพลาด: 0` ``

### F9 — MINOR — VERIFIED
ไฟล์: `README.md:32`, `docs/show-your-plugins.md:52` (`dsh plugin --profile web add dsh-thai-locale`), `README.md:62` / `AGENTS.md:20,54` / `CONTRIBUTING.md:19` / `docs/show-your-plugins.md:43` / `TRANSLATION_REVIEW.md:3` (`npm run check`), `AGENTS.md:69` (`python3 tools/generate-icon.py`)
ทำไมผิด: บนเครื่องนี้ `command -v` ไม่พบ `npm`, `npx`, `dsh`, `python3` (มีแค่ `node` กับ `pnpm`) คำสั่งหลักในเอกสารจึงรันบนเครื่องผู้ดูแลไม่ได้ ต้องเดาเองว่าใช้ `node tools/check-translations.mjs` แทน
ควรเป็น: ทุกที่ที่เขียน `npm run check` ให้เติมทางเลือก: `npm run check` (หรือ `node tools/check-translations.mjs` ถ้าเครื่องไม่มี npm) และในหัวข้อติดตั้งให้หมายเหตุว่าต้องมี `dsh` CLI ก่อน

### F10 — MINOR — VERIFIED
ไฟล์: `package.json:29–45` (`files`)
ที่พบ: ไม่มี `TRANSLATION_REVIEW.md`, `CONTRIBUTING.md`, `AGENTS.md`, `icon.svg`
ทำไมผิด: `README.md:103` และ `README.md:159` ส่งผู้อ่านไปที่ `TRANSLATION_REVIEW.md` และ `AGENTS.md:18` อ้าง `icon.svg` — แต่ไฟล์เหล่านี้ไม่ถูกเผยแพร่ขึ้น npm (`AGENTS.md:13` เองก็บอกว่า `files` คือรายการที่ขึ้น npm) คนที่ติดตั้งจาก npm จะเปิดลิงก์ไม่เจอ
ควรเป็น: เพิ่ม `"TRANSLATION_REVIEW.md"`, `"CONTRIBUTING.md"`, `"AGENTS.md"`, `"icon.svg"` เข้า `files` (หรือถ้าตั้งใจไม่เผยแพร่ ให้แก้ README ให้ชี้ไปที่ GitHub แทน)

### F11 — MINOR — UNVERIFIED
ไฟล์: `README.md:145,160`, `docs/show-your-plugins.md:127`, `market/README.md:20`
ที่พบ: `57 / 5,324`
ทำไมผิด: รีโปไม่มี `index.json` ต้นฉบับของแคตตาล็อก (NOTICE:54 ระบุเองว่าไม่มี) จึงยืนยันเลข 5,324 จากไฟล์ในรีโปไม่ได้ — เป็นตัวเลขที่อ้างลอย
ควรเป็น: เติมที่มา เช่น `57 / 5,324 (นับจาก index.json ของ awesome-dsh-plugin ณ วันที่ ...)` หรือตัดตัวส่วนออก

### F12 — MINOR — UNVERIFIED
ไฟล์: `package.json:26–28`
ที่พบ: `"engines": { "dsh": "^0.2.0" }`
ทำไมผิด: เอกสารทุกที่ระบุว่าทดสอบกับ `0.2.1-rc.2` แต่ตามกฎ semver ช่วง `^0.2.0` ไม่รับ prerelease (`0.2.1-rc.2`) เพราะไม่มี comparator ที่เป็น prerelease ของคู่เดียวกัน — ถ้า DSH บังคับใช้ `engines.dsh` ปลั๊กอินอาจถูกข้ามบนเวอร์ชันที่อ้างว่าทดสอบแล้ว (ผลตอนรันจริงยังไม่ได้ทดสอบในรอบนี้)
ควรเป็น: `"dsh": "^0.2.1-rc.2"` (หรือ `">=0.2.1-rc.2 <0.3.0"`)

### F13 — MINOR — VERIFIED
ไฟล์: `progress_report.md:12,14`
ที่พบ: `| B4 | ... | 1.0.5 | บรรทัด 89 |` และ `| B6 | ... | หัวข้อบรรทัด 105, 130 |`
ทำไมผิด: ข้อความ changelog อยู่ที่ `docs/show-your-plugins.md:91` (ไม่ใช่ 89) และหัวข้อที่อ้างถึงอยู่ที่ `README.md:112` และ `README.md:137` (ไม่ใช่ 105, 130)
ควรเป็น: `บรรทัด 91` และ `หัวข้อบรรทัด 112, 137`

### F14 — MINOR — VERIFIED
ไฟล์: `AGENTS.md:13–20` (ตารางโครงสร้าง)
ที่พบ: ตารางมีแค่ `package.json`, `cordis.patch.yml`, `lib/index.js`, `lib/client.js`, `locale/*.json`, `icon.svg`, `NOTICE`, `tools/check-translations.mjs`, `TRANSLATION_REVIEW.md`
ทำไมผิด: ไม่มี `tests/`, `docs/`, `market/`, `plugin-locales/`, `tools/install-plugin-locales.mjs`, `progress_report.md`, `VERSIONING.md` ทั้งที่ไฟล์เหล่านี้มีจริงและเอเจนต์ต้องใช้ (เช่น `node --test tests/*.test.mjs`)
ควรเป็น: เติมแถวให้ครบทั้ง 7 รายการข้างต้น

### F15 — MINOR — VERIFIED
ไฟล์: `README.md:24`
ที่พบ: `| Node.js | ไม่จําเป็นสําหรับการใช้งาน ใช้เฉพาะตอนตรวจคําแปล |` อยู่หลังบล็อกอ้างอิง (บรรทัด 21–23) จึงหลุดออกจากตารางข้อกำหนด (บรรทัด 15–19)
ทำไมผิด: มาร์กดาวน์จะเรนเดอร์บรรทัดนี้เป็นข้อความดิบ ไม่ใช่แถวตาราง
ควรเป็น: ย้ายบรรทัดนี้ขึ้นไปต่อท้ายบรรทัด 19 (ก่อนบรรทัดว่าง) แล้วคงบล็อกอ้างอิงไว้ใต้ตาราง

## ข้อที่ผ่าน

- นับคีย์/namespace: 4,601 คีย์ 75 namespace ตรงกับ README, AGENTS, docs, NOTICE
- `node tools/check-translations.mjs` → ข้อผิดพลาด 0 คำเตือน 0 (exit 0) และตัวตรวจทำตามที่ `docs/testing.md:11–12` เขียนไว้จริง
- `node --test tests/*.test.mjs` → ผ่าน 6 ล้ม 0 ข้าม 0 ตรงกับ `docs/testing.md:23–32`
- `node --check` ผ่านทั้ง 6 ไฟล์; JSON 28 ไฟล์ parse ผ่านหมด
- ไม่พบอักษร CJK, อักษรลาว, zero-width หรือเครื่องหมายซ้ำในไฟล์ใดของรีโป
- หมวดตลาด 23 หมวด (นับจาก `CATEGORIES` ใน `market/build-th.mjs:20–44`), `data/th` = agi 45 + wsl 12 = 57
- `plugin-locales/experimental` = 22 แพ็กเกจ + `index.json`; NOTICE ไล่ชื่อครบ 22 ตัว
- `TRANSLATION_STATUS.md` = 178 แถว, pending 178, "ใช่" 49, "ไม่" 129 ตรงกับที่เขียนในบรรทัด 18–26
- NOTICE ระบุสัญญาอนุญาตตรงกับ `LICENSE` (CC BY-NC-SA 4.0) และแยก MIT ของ DSH / CC0 ของแคตตาล็อกได้ถูกต้อง
- `TRANSLATION_STATUS.md` ไม่มีคำว่า `pendinguhan` แล้ว (progress_report B1 แก้จริง)
- `docs/testing.md` ไม่มีอักษรจีนแล้ว (progress_report B8 แก้จริง)

## หมายเหตุวิธีตรวจ

- ตัวเลขทุกตัวในรายงานนี้วัดเองด้วยคำสั่งในเครื่อง: `node tools/check-translations.mjs`, `node --test tests/*.test.mjs`, `node --check`, `find` และสคริปต์นับชั่วคราวที่รันในหน่วยความจำ (ไม่เขียนลงรีโป)
- F11, F12 ทำเครื่องหมาย UNVERIFIED เพราะต้องมีไฟล์ต้นฉบับแคตตาล็อกและต้องรัน DSH จริงตามลำดับ
- การตรวจอักษรไทยใช้กฎตายตัว (ช่องว่างก่อนเครื่องหมายประกอบ) จึงยืนยันได้เฉพาะจุดที่ยกมา ไม่ได้แปลว่าข้อความที่เหลือทั้งหมดถูกต้อง
