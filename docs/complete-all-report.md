# COMPLETE-ALL — Progress Report

โปรเจกต์: dsh-thai-locale
Baseline: `v1.5.0` → ปัจจุบัน commit `457d447` (ยังไม่ push)
วันที่: 2026-11-17
เครื่องที่ตรวจ: Android / DSH engine `0.2.1-rc.2`

## นิยาม "เสร็จ" ที่ใช้ในรายงานนี้

- **ระดับ 1 (เสร็จบนเครื่องนี้)** = งานที่ทําได้บนเครื่องนี้เสร็จครบ + งานที่ทําไม่ได้มีหลักฐานระบุเหตุผล
- **ระดับ 2 (เสร็จทั้งสองแพลตฟอร์ม)** = มีผลทดสอบจริงบน DSH Desktop ด้วย

**ผล: ระดับ 1 เสร็จ · ระดับ 2 ทําไม่ได้บนเครื่องนี้**

## สรุปแต่ละ P

| P | สถานะ | หลักฐาน |
|---|---|---|
| P0 Desktop | **ทดสอบไม่ได้ (Blocked)** | `grep -ci "desktop\|electron"` = 0 · ไม่มี `@deepseek-ai/*desktop*` |
| P1 Translation QA | **เสร็จ** | 178/178 รายการ — ถูกอยู่แล้ว 170, แก้ 8 · `docs/translation-qa-p1.md` |
| P2 UI Testing | **เสร็จบางส่วน** | 6 หมวดข้อความบนจอไทยครบ · อังกฤษหลุด 3 จุดมาจาก SDK ไม่ใช่ DSH |
| P3 DSH Core | **เสร็จ** | API เข้ากันได้กับ `0.2.2-rc.3` ไม่มี breaking change |
| P4 Coverage | **เสร็จในขอบเขตที่ทําได้** | missing 0 · extra 0 · placeholder ไม่ตรง 0 |
| P5 External Plugins | **เสร็จ** | ตรง 6/6 ชุด · แก้ปัญหาจริง 2 จุด |

## PASS/FAIL แยกแพลตฟอร์ม

| งาน | DSH Web | DSH Desktop |
|---|---|---|
| `node --check lib/client.js` | PASS | PASS (ไฟล์เดียวกัน) |
| `node tools/check-translations.mjs` | PASS — 4,601 คีย์, 0 ผิด, 0 เตือน | PASS |
| `node tools/check-roast.mjs` | PASS — 0 ผิด, ยังไม่เขียน 0 | PASS |
| `node --test tests/*.test.mjs` | PASS 10/10 | PASS |
| ตรวจข้อความบนจอจริง | PASS 6 หมวด | **ทดสอบไม่ได้** |
| เปลี่ยนภาษา / fallback | **ยังไม่ได้ทดสอบบนจอ** | **ทดสอบไม่ได้** |
| P4 เทียบ source อังกฤษ | **ทําไม่ได้** | **ทําไม่ได้** |

## สิ่งที่แก้ในรอบนี้

**จากผลตรวจปลาทอง (4 ร้ายแรง · 7 กลาง · 5 เล็ก)**

| ข้อ | ปัญหา | แก้เป็น |
|---|---|---|
| B1 | ไม่มีนิยาม "เสร็จ" | เพิ่มนิยาม 2 ระดับ + เกณฑ์ PASS 6 ข้อ |
| B2 | สองสําเนา ไม่ระบุตัวจริง | ยืนยันด้วย md5: `tmp` = ที่ทํางาน (git), `/storage/...` = ที่ DSH โหลด + ใส่คําสั่ง `cmp` บังคับก่อนทดสอบ UI |
| B3 | เกณฑ์ P1 ชนสคีมาเดิม | เขียนเกณฑ์ใหม่ให้ตรง `pending`/`reviewed`/`wontfix` |
| B4 | P4 อ้างเครื่องมือที่ไม่มี | ตัดข้ออ้าง ระบุว่าเป็นสคริปต์ชั่วคราว |
| — | พาธในเอกสารรันไม่ได้ | ใส่พาธเต็ม |
| — | ระบุ "ไม่มีเครือข่าย" ทั้งที่ยิง npm ได้ | แก้ให้ตรง + บันทึกผลเทียบ API จริง |
| — | `TRANSLATION_STATUS.md` ล้า 6 แถว | sync กับโค้ดจริง |
| — | คีย์ `" 轮"` ค่า 0 ไบต์ | ลบ (คีย์ขยะ) |
| — | `AGENTS.md` อ้าง 196 การ์ดผิด | แก้เป็น 192 `@deepseek-ai` + 4 ตัวนอกขอบเขต |
| — | แก้ค่าไทยแล้วชุดกวนไม่ตาม | ปรับ `roast-source` 4 คีย์ + rebuild |

**จาก P1 (8 คีย์)**

`command.description.compact`, `pluginManager.restartReasonHostModule`, `pluginManager.restartReasonModuleComparison`, `pluginManager.registryLegend`, `pluginManager.reasonNotRemovable`, `settings.anyBg.uiProduced`, `settings.anyBg.descColor`, `thinking-api.intro` — ทุกตัวอ้างต้นทาง zh/en จริงจากแพ็กเกจที่ติดตั้ง

## สิ่งที่ยังไม่เสร็จ / ยังไม่ยืนยัน

1. **P0 Desktop** — ต้องมีเครื่อง Desktop จริง ไม่มีทางทําเสร็จที่นี่
2. **เปลี่ยนภาษาและ fallback บนจอจริง** — ยังไม่มีหลักฐานการทดสอบ (ต้องกดเปลี่ยนภาษาใน การตั้งค่า → ภาษา แล้วอ่านผล)
3. **P1 บางกลุ่มตัดสินจากความอ่านออก** ไม่ได้เทียบต้นทาง: `voice-input`, `tokenSaver`, `amdFreeModel`, `ourFreeModel`, `deletetool`, `dsh-opencode-patch`, `dsh-android-mobile` บางคีย์, `pluginManager` บางส่วน
4. **P1 ตรวจโดย AI** ไม่ใช่ human sign-off — กํากับใน `TRANSLATION_STATUS.md` บรรทัด 11 และ 26 แล้ว
5. **P4 ยังไม่มีเครื่องมือถาวร** สําหรับตรวจซ้ํา (ถ้าต้องการ ต้องสร้าง `tools/check-coverage.mjs`)
6. **`settings.agentPreset.guideStandardExplanation`** ต้นทางเป็นอาร์เรย์ markdown หลายบรรทัด (คีย์จริงใช้ `.0`/`.1`) ปล่อยไว้ ไม่แก้

## สิ่งที่รักษาไว้ได้ครบ (ไม่เสียหาย)

- ภาษาไทยปกติ 4,601 คีย์ / 75 namespace
- ไทยกวนตีนครบ 75 namespace (เขียนใหม่ 2,988 · คงเดิม 1,613)
- fallback `th → en` และ `th-roast → th → en`
- ข้อมูลการ์ดปลั๊กอิน 196 · ตลาด 57 + 23 หมวด · UI 9 ปลั๋กอิน 625 คีย์ · พจนานุกรม 2 ตัว (873 + 188) · experimental 22

## สถานะ git

commit ในเครื่อง 5 ตัวหลัง `v1.5.0`: `8652ead`, `d3a4189`, `a65ba43`, `457d447` (+ `70d8d67` ก่อนหน้า)
**ยังไม่ push ขึ้น GitHub และยังไม่สร้าง release ใหม่** ตามกฎห้าม deploy โดยไม่ได้รับอนุญาต
