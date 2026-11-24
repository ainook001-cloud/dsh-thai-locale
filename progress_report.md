# รายงานความคืบหน้า — COMPLETE-ALL ถึง v1.5.1

วันที่: 2026-11-17 (อัปเดตล่าสุด) · เวอร์ชันล่าสุดที่ปล่อยแล้ว: **1.5.1**

ไฟล์นี้เป็นรายงานรวมของงาน COMPLETE-ALL ที่ทำหลังจาก v1.5.0 — ตั้งแต่ตรวจคุณภาพคำแปล
ตรวจ Desktop/core compat ไปจนถึงเครื่องมือตรวจ coverage
รายงานละเอียดอยู่ใน [docs/complete-all-report.md](docs/complete-all-report.md)

## 1. สรุปตาม P (P0–P5)

| P | หัวข้อ | สถานะ |
|---|---|---|
| P0 | Desktop Compatibility | **ทดสอบไม่ได้** — เครื่องนี้ไม่มี DSH Desktop / Electron |
| P1 | Human Translation QA | **เสร็จ** — ตรวจ 178 รายการ, ถูกอยู่แล้ว 170, แก้ 8 |
| P2 | Automated UI Testing | **เสร็จบางส่วน** — อ่านข้อความบนจอจริง 6 หมวดไทยครบ; เปลี่ยนภาษา/fallback ยังไม่ได้ทดสอบ |
| P3 | DSH Core Compatibility | **เสร็จ** — API เข้ากันได้กับ `0.2.2-rc.3`, ไม่มี breaking change |
| P4 | Translation Coverage | **เสร็จ** — ภายใน 0 ผิด; เทียบซอร์ส zh/en ได้ 8 ns / 143 คีย์ ตรงหมด |
| P5 | External Plugins | **เสร็จ** — ตรง 6/6 ชุด (196 การ์ด, 625 คีย์, 873+188, 22 experimental, 57+23 ตลาด) |

## 2. แก้คำแปล 8 รายการ (P1)

ตรวจ `TRANSLATION_REVIEW.md` ทั้ง 178 รายการ — **ถูกอยู่แล้ว 170 · แก้ 8**
ทุกข้ออ้างต้นทาง `zh`/`en` จริงจากแพ็กเกจที่ติดตั้ง เช่น

- `pluginManager.restartReasonModuleComparison` — เติม "บนดิสก์" ตาม zh `与磁盘上的文件`
- `settings.anyBg.uiProduced` — "โปรดักชัน" → "ผลงานที่ได้" ตาม zh `产出物`
- `thinking-api.intro` — "ด้วยบทบาท" → "เพราะบทบาท" ตาม en `developer-role rejection`

รายการทั้งหมดอยู่ใน [docs/translation-qa-p1.md](docs/translation-qa-p1.md)

## 3. เครื่องมือใหม่

| ไฟล์ | ทำอะไร |
|---|---|
| `tools/check-coverage.mjs` | ตรวจ coverage 3 ทาง: `th` กับ `th-roast`, เทียบซอร์ส `zh`/`en` ของเอนจิน, จับคีย์ที่ไม่มีต้นทาง รันด้วย `npm run coverage` |
| `CHANGELOG.md` | ประวัติ v1.0.0 → v1.5.1 |

## 4. แก้ตามผลตรวจปลาทอง + ตรวจ P5

| ข้อ | ปัญหา | แก้เป็น |
|---|---|---|
| B1 | ไม่มีนิยาม "เสร็จ" ของ COMPLETE-ALL | เพิ่มนิยาม 2 ระดับ + เกณฑ์ PASS 6 ข้อ |
| B2 | สองสำเนา ไม่ระบุตัวจริง | ยืนยัน md5 + กฎ `cmp` ก่อนทดสอบ UI |
| B3 | เกณฑ์ P1 ชนสคีมาเดิม | เขียนให้ตรง `pending`/`reviewed`/`wontfix` |
| B4 | P4 อ้างเครื่องมือที่ไม่มี | สร้าง `tools/check-coverage.mjs` |
| P5 | คีย์ขยะ `" 轮"` ค่า 0 ไบต์ | ลบ (ใน `plugin-locales/ui/compaction-threshold.json`) |
| P5 | `AGENTS.md` อ้าง 196 การ์ดผิด | แก้เป็น 192 `@deepseek-ai` + 4 ตัวนอกขอบเขต |

## 5. ผลรันชุดทดสอบ (5 ตัว)

```
node --check lib/client.js             PASS
node tools/check-translations.mjs      4,601 คีย์, 0 ข้อผิดพลาด, 0 คำเตือน
node tools/check-roast.mjs             0 ข้อผิดพลาด, ยังไม่เขียน 0
node tools/check-coverage.mjs          0 ข้อผิดพลาด, เทียบซอร์ส 8 ns / 143 คีย์ ตรงหมด
node --test tests/*.test.mjs           10/10 ผ่าน
```

ชุดทดสอบตอนนี้มี 10 ข้อ (เดิม 6 ข้อ) — เพิ่มเคสภาษา `th-roast` กับ coverage ของชุดกวน

## 6. ยังไม่ได้ทำ

1. **ทดสอบเปลี่ยนภาษา/fallback บนจอจริง** — ลองด้วยเครื่องมือ `ui` 5 วิธีแล้วนำทางไปหน้าตั้งค่าไม่ได้ ต้องทดสอบด้วยมือ (การตั้งค่า → ภาษา → เลือก `ไทย (กวนตีน)`)
2. **DSH Desktop** — ยังไม่มีเครื่องทดสอบ
3. **P1 บางกลุ่มตัดสินจากความอ่านออก** โดยไม่ได้เทียบต้นทาง (voice-input, tokenSaver, amdFreeModel, ourFreeModel, deletetool, dsh-opencode-patch) และเป็นการตรวจโดย AI ไม่ใช่ human sign-off