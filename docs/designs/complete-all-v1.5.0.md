# COMPLETE-ALL — แผนงานและรายงานผล (แก้ตามผลตรวจปลาทอง รอบ 2)

ผู้เขียน: ainook001-cloud
วันที่: 2026-11-17
สถานะ: แก้ตามผลตรวจปลาทองแล้ว (4 ร้ายแรง · 7 กลาง · 5 เล็ก)

## นิยาม "เสร็จ" ของ COMPLETE-ALL (แก้ข้อ B1)

คําว่า COMPLETE-ALL ใช้ไม่ได้กับงานนี้ตรง ๆ เพราะ P0 ต้องมีเครื่อง Desktop ที่ไม่มี
จึงนิยามเป็นสองระดับ และต้องรายงานทั้งสองระดับ

**ระดับที่ 1 — เสร็จบนเครื่องนี้ (ทําได้ครบ)**

ทุกข้อต่อไปนี้ต้องจริงพร้อมกัน

| # | เกณฑ์ | วิธีพิสูจน์ |
|---|---|---|
| 1 | ชุดตรวจทั้ง 4 ผ่าน | `node --check`, `check-translations`, `check-roast`, `node --test` |
| 2 | P1 ตรวจครบ 178 รายการ | ตารางใน `docs/translation-qa-p1.md` มีครบ 178 แถว |
| 3 | P2 ตรวจ UI เท่าที่เครื่องมือเปิดถึง | ตารางหน้าจอที่ตรวจใน `docs/complete-all-report.md` |
| 4 | P4 สอดคล้องภายในโปรเจกต์ | missing 0, extra 0, placeholder ไม่ตรง 0 |
| 5 | P5 ตัวเลขที่อ้างตรงกับที่นับได้ | ตารางใน `docs/external-plugins-p5.md` |
| 6 | งานที่ทําไม่ได้ ต้องมีหลักฐานระบุเหตุผล | ระบุคําสั่งที่รันแล้วได้ผลว่าไม่มี |

**ระดับที่ 2 — เสร็จทั้งสองแพลตฟอร์ม (ทําไม่ได้ที่นี่)**

ต้องมีผลทดสอบจริงบน DSH Desktop: ติดตั้ง, เปิดใช้, เปลี่ยนภาษา, fallback
**เครื่องนี้ทําไม่ได้ เพราะไม่มี DSH Desktop และไม่มี Electron** (หลักฐานด้านล่าง)

**ข้อสรุปที่จะรายงาน**: ระดับ 1 ทําได้ · ระดับ 2 ทําไม่ได้บนเครื่องนี้
**ห้ามเขียนว่า "COMPLETE-ALL สมบูรณ์" โดยไม่ระบุว่าระดับไหน**

## สองสําเนา — ที่ไหนคือตัวจริง (แก้ข้อ B2)

ตรวจ md5 จริง ณ 2026-11-17

| ไฟล์ | `~/.dsh/tmp/dsh-thai-locale-edit` (git repo) | `/storage/emulated/0/AI storage/dsh-thai-locale` |
|---|---|---|
| `lib/client.js` | `ccb6f635` | `ccb6f635` (ตรง) |
| `package.json` | `9b5ad58f` | `9b5ad58f` (ตรง) |
| `TRANSLATION_STATUS.md` | `1a467b3c` | `1a467b3c` (ตรง) |
| `TRANSLATION_REVIEW.md` | `3f9838f8` | `4e15c594` (**ต่าง**) |

**ที่ตั้งและบทบาท**

- `~/.dsh/tmp/dsh-thai-locale-edit` = **ที่ทํางานจริง** มี `.git` ต่อกับ GitHub
- `/storage/emulated/0/AI storage/dsh-thai-locale` = **ที่ที่ DSH โหลดจริง** เพราะ
  `~/.dsh/profiles/web/node_modules/dsh-thai-locale` เป็น symlink มาที่นี่ ไม่ใช่ git repo

**ผลที่ตามมา (สาเหตุที่ต้องมีกฎนี้)**: แก้ไฟล์ใน tmp แล้วรันทดสอบด้วยเครื่องมือ `ui`
จะเป็นการทดสอบโค้ดอีกก๊อป ไม่ใช่ที่เพิ่งแก้

**กฎที่ต้องทําทุกครั้งก่อนทดสอบ UI**

```bash
SRC="$HOME/.dsh/tmp/dsh-thai-locale-edit"
DST="/storage/emulated/0/AI storage/dsh-thai-locale"
cp -f "$SRC/lib/client.js" "$DST/lib/"
cmp -s "$SRC/lib/client.js" "$DST/lib/client.js" && echo "ตรงกันแล้ว" || echo "ยังไม่ตรง ห้ามทดสอบ"
```

## P0 — Desktop Compatibility

### ผล: **ทดสอบไม่ได้ (Environment Blocked)** — ยืนยันด้วยคําสั่งที่รันได้จริง

```bash
ls /data/user/0/com.dsh.android/files/engine/node_modules/ | grep -ci "desktop\|electron"
# → 0
ls -d /data/user/0/com.dsh.android/files/engine/node_modules/@deepseek-ai/*desktop*
# → ไม่พบ
```

หมายเหตุ: พาธเต็ม `/data/user/0/com.dsh.android/files/engine/node_modules`
(คําสั่ง `ls -d engine` ในรีโปใช้ไม่ได้ เพราะรีโปไม่มีโฟลเดอร์นั้น)

### สิ่งที่ตรวจจากซอร์สได้ (ทําแล้ว)

| หัวข้อ | ผล |
|---|---|
| Locale Bridge | `__DSH_LOCALE__` 1 จุดใน `dsh-client-locale/lib/client.js` ใช้เป็นสะพานอ่าน `languages` + `preference` |
| ไม่มีสะพานแล้วพังไหม | ไม่พัง — ตกไป `resolveInitialLocale` → `detectBrowserLocale` → `en` |
| Client Plugin Loader | `dsh.client.platform: "web"` — Desktop (Electron) โหลด Web UI ชุดเดียวกัน |
| Native Shell | ปลั๊กอินนี้ไม่แตะเลย มีแค่ `lib/client.js` กับ `lib/index.js` ที่ว่างเปล่า |

## P1 — Human Translation QA

**แก้ข้อ B3**: สคีมาสถานะของโปรเจกต์มีแค่ `pending` / `reviewed` / `wontfix`
**ไม่ใช่** `ถูกอยู่แล้ว` / `แก้แล้ว` / `ยังไม่ตรวจ` ตามที่ร่างแรกเขียนไว้

**เกณฑ์ผ่านของ P1**

| สถานะใน `TRANSLATION_STATUS.md` | ใช้เมื่อ |
|---|---|
| `pending` | ยังไม่มีใครอ่านด้วยตา — **ค่าเริ่มต้นของทุกแถว** |
| `reviewed` | มีคนอ่านข้อความจริงใน `lib/client.js` แล้ว และตัดสินว่าถูกต้องหรือแก้แล้ว |
| `wontfix` | อ่านแล้วเห็นว่าไม่ควรแก้ พร้อมเหตุผล |

`reviewed` บังคับให้มี "คนอ่าน" จริงตามที่ไฟล์ระบุ ห้ามเปลี่ยนสถานะด้วยสคริปต์

**ข้อที่ต้องทําเพิ่ม (ปลาทองชี้ ยังไม่มีในร่างแรก)**

178 คีย์ที่ P1 ตรวจ **มีอยู่ใน `tools/roast-source/*.json` 90 คีย์** (นับเองด้วยสคริปต์)

ผลคือ: แก้ค่าไทยใน `thDicts` แล้ว **ชุดกวนไม่ตามไปด้วย** เพราะ `build-roast.mjs`
เขียนเฉพาะบล็อก `thRoastDicts` และ `check-roast.mjs` จับแค่ placeholder ไม่จับถ้อยคําที่หลุดกัน

**ขั้นตอนที่ต้องเพิ่มใน P1**: ทุกครั้งที่แก้ค่าไทยของคีย์ที่มีใน `roast-source`
ต้องแก้ไฟล์ `tools/roast-source/<ns>.json` ด้วย แล้วรัน `node tools/build-roast.mjs`

**ต้องแก้ไฟล์สถานะที่ล้าก่อน**: `TRANSLATION_STATUS.md` อ้างข้อความเก่า 5 แถว
(บรรทัด 148, 149, 152, 156, 157) เช่นบรรทัด 148 อ้าง `เกินเวลาอย่างที่ GitHub`
แต่โค้ดจริงเป็น `GitHub ใช้เวลานานเกินกําหนด`

**`TRANSLATION_REVIEW.md`**: ใน tmp ตรงกับโค้ดแล้ว 178/178 (รัน `build-translation-review.mjs` ใหม่แล้ว)
แต่ใน `/storage/...` ล้า 3 บรรทัด — **ต้องคัดลอกทับ** ตามกฎสองสําเนาด้านบน

## P2 — Automated UI Testing

### สิ่งที่ทําได้จริงและทําแล้ว

ใช้เครื่องมือ `ui` อ่านข้อความบนจอจริงของแอปนี้ ได้ **302 บรรทัด**

| หมวด | ตัวอย่างที่เห็นบนจอ | ผล |
|---|---|---|
| เมนูหลัก | เซสชันใหม่, ปลั๊กอิน, เชื่อมต่อ AI, งานอัตโนมัติ, พื้นที่ทํางาน | ไทยครบ PASS |
| สถานะ | กําลังรัน, 3 ซับเอเจนต์กําลังรัน | ไทยครบ PASS |
| การแจ้งเตือน | เข้าสู่ระบบ DeepSeek แล้ว, โหมดมาตรฐาน, 16 ซับเอเจนต์ | ไทยครบ PASS |
| ระหว่างทํางาน | ส่งคําขอไปยังโมเดลใหม่แล้ว (4/5) · 4 วินาที, รันคําสั่งแล้ว, แก้ไฟล์แล้ว | ไทยครบ PASS |
| แจ้งข้อผิดพลาด | ประมวลผลล้มเหลว, รอบนี้ทํางานล้มเหลว | ไทยครบ PASS |
| ข้อจํากัด | ใช้ได้เฉพาะข้อความสุดท้ายของเทิร์นที่เสร็จแล้ว | ไทยครบ PASS |

### ข้อความอังกฤษที่หลุด 3 จุด — ไม่ใช่ข้อบกพร่องของปลั๊กอินนี้

บนจอเห็น `Connection error.`, `TRANSPORT`, `UNKNOWN`

```bash
grep -rl "Connection error" /data/user/0/com.dsh.android/files/engine/node_modules/ --include="*.js"
# → @anthropic-ai/sdk/core/error.js, openai/core/error.js, @google/genai/dist/node/index.cjs
grep -c "Connection error" lib/client.js     # → 0
```

เป็นข้อความ error จาก SDK ผู้ให้บริการโมเดล ไม่อยู่ในระบบแปลของ DSH ปลั๊กอินแตะไม่ได้

### ทําไม่ได้

Desktop (ไม่มีเครื่อง) · ตรวจทุกหน้าจอทั้ง 75 namespace (เครื่องมือ `ui` เปิดถึงเฉพาะที่นำทางไปถึง) · Playwright/Selenium (ไม่มีเบราว์เซอร์แยก และโปรเจกต์ห้ามเพิ่ม dependency)

## P3 — DSH Core Compatibility

**แก้ข้อผิดในร่างแรก**: ร่างแรกเขียนว่า "ไม่มีเครือข่ายยืนยันรุ่นล่าสุด" — **ไม่จริง**
ยิง `registry.npmjs.org` ได้ HTTP 200 และ rันการเทียบจริงแล้ว

| รายการ | ค่าจริง | ผล |
|---|---|---|
| เอนจินที่ติดตั้ง | `0.2.1-rc.2` | — |
| `engines.dsh` | `>=0.2.1-rc.2 <0.3.0` | ครอบคลุมรุ่นที่ติดตั้ง PASS |
| npm dist-tags ของ `@deepseek-ai/dsh` | `latest 0.2.2-rc.1` / `next 0.2.2-rc.3` | อยู่ในช่วง constraint PASS |
| dependency | ไม่มี | PASS |
| ต้องใช้ `compatibility.json` override ไหม | ไม่ต้อง | PASS |

**เทียบ API ระหว่าง `dsh-client-locale` 0.2.1-rc.2 กับ 0.2.2-rc.3**

```bash
addLanguage(input)                    # signature เดียวกัน
register(ns, localeOrDicts, dict)     # signature เดียวกัน
setLocale                             # 5 จุดเท่ากัน
__DSH_LOCALE__                        # 1 จุดเท่ากัน
```

**ข้อจํากัดของการตรวจนี้**: เทียบเฉพาะแพ็กเกจ `dsh-client-locale` ไม่ได้เทียบทั้งเอนจิน
และเป็นการอ่านซอร์ส ไม่ได้รันจริงบน 0.2.2

## P4 — Translation Coverage

**แก้ข้อ B4**: ร่างแรกอ้างว่า "ตรวจ placeholder/missing/obsolete ทําแล้วผ่านหมด"
แต่ **ไม่มีเครื่องมือนั้นในโปรเจกต์**

```bash
grep -c "placeholder\|missing\|obsolete" tools/check-translations.mjs   # → 0
```

ตัวที่ตรวจ placeholder จริงคือ `tools/check-roast.mjs` (บรรทัด 46) และ **เทียบ `th` กับ `th-roast` เท่านั้น** ไม่ได้เทียบกับ source อังกฤษ

**สิ่งที่ทําได้และทําแล้ว** (เขียนสคริปต์ตรวจเองชั่วคราว ไม่ได้อยู่ในโปรเจกต์)

| หัวข้อ | ผล |
|---|---|
| คีย์ `th` | 4,601 / 75 namespace |
| คีย์ `th-roast` | 4,601 |
| missing key | 0 |
| extra key | 0 |
| placeholder ไม่ตรง | 0 |

**ถ้าต้องการให้ตรวจซ้ําได้ในอนาคต ต้องเพิ่ม `tools/check-coverage.mjs`** — ร่างแรกไม่ได้ระบุ จึงเป็นงานที่ยังไม่ได้ทํา

**เทียบกับ source อังกฤษของ DSH ครบชุด: ทําไม่ได้** — เอนจินมีพจนานุกรม `zh`/`en` แค่บางตัว และ `locale/*.json` เป็น metadata ไม่ใช่พจนานุกรม UI จับคู่ namespace ได้ 18 จาก 75

## P5 — External Plugins

อยู่ระหว่างตรวจโดยผู้ช่วยแยกบริบท ผลอยู่ใน `docs/external-plugins-p5.md`
ตรวจเฉพาะ ID ที่มีหลักฐานในไฟล์โปรเจกต์ ไม่สร้างชื่อขึ้นเอง

## สรุป PASS/FAIL แยกแพลตฟอร์ม

| งาน | DSH Web | DSH Desktop |
|---|---|---|
| ชุดตรวจ 4 ตัว | PASS | PASS (ไฟล์เดียวกัน) |
| ตรวจข้อความบนจอจริง | PASS บางส่วน (6 หมวด) | **ทดสอบไม่ได้** |
| เปลี่ยนภาษา / fallback | ยังไม่ได้ทดสอบบนจอ | **ทดสอบไม่ได้** |
| P1 178 รายการ | ต้องแก้ STATUS ที่ล้าก่อน | เหมือนกัน |
| P4 coverage ภายใน | PASS | PASS |
| P4 เทียบ source | **ทําไม่ได้** | **ทําไม่ได้** |
| P5 | อยู่ระหว่างตรวจ | อยู่ระหว่างตรวจ |

## ข้อจํากัดที่ต้องยอมรับ

1. **Desktop ไม่ได้ทดสอบเลย** — ไม่มีเครื่อง ห้ามอ้างว่ารองรับ
2. **P4 เทียบ source ครบชุดทําไม่ได้** และยังไม่มีเครื่องมือถาวรสําหรับตรวจซ้ํา
3. **P2 ครอบคลุมไม่ครบทุกหน้าจอ**
4. **แก้ค่าไทยแล้วชุดกวนไม่ตาม** ถ้าไม่แก้ `tools/roast-source` ด้วย — ยังไม่มีตัวจับ
