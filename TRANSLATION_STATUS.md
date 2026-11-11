# สถานะการตรวจคำแปลไทย

ติดตามการตรวจทาน **ด้วยมนุษย์** — `tools/check-translations.mjs` ตรวจได้แค่รูปแบบอักษร
(อักษรจีน/ลาว วรรณยุกต์ซ้ำ สระผิดที่) แต่ตัดสินไม่ได้ว่าคำแปลอ่านแล้วเป็นธรรมชาติหรือไม่

## สถานะ

| สถานะ | ความหมาย |
|---|---|
| `pending` | ยังไม่มีคนอ่านในบริบทจริง |
| `reviewed` | คนอ่านภาษาไทยตรวจแล้ว ใช้ได้ |
| `wontfix` | ตรวจแล้ว ตั้งใจเก็บไว้อย่างนี้ (เช่น เป็นชื่อเฉพาะ) |

## สรุป

| สถานะ | จำนวน |
|---|---|
| `pending` | 178 |
| `reviewed` | 0 |
| `wontfix` | 0 |
| **รวม** | **178** |

> **ทุก 178 รายการยังเป็น `pending`** — ยังไม่มีคนอ่านภาษาไทยตรวจสักรายการ

คอลัมน์ "แก้ค่าแล้ว" บอกแค่ว่าระหว่างทำชุดคำแปลไทย ค่าใน `lib/client.js`
ต่างจาก snapshot ที่ heuristic บันทึกไว้หรือไม่ (49 รายการต่าง, 129 รายการเท่าเดิม)
**ไม่ใช่หลักฐานว่าตรวจแล้ว** — การนับเป็น `reviewed` ต้องมีคนอ่านในบริบทจริงแล้วเปลี่ยนสถานะเอง

## วิธีตรวจและอัปเดตสถานะ

1. เปิด `TRANSLATION_REVIEW.md` อ่านรายการในบริบทจริงทีละชุด (แนะนำชุดละ 20–30 คีย์)
2. ถ้าคำแปลผิด แก้ค่าใน `lib/client.js`
3. รัน `node tools/check-translations.mjs` ให้ **ข้อผิดพลาด 0** และคีย์ยัง **4601**
4. เปลี่ยนสถานะในตารางล่างจาก `pending` เป็น `reviewed` หรือ `wontfix`

## ตารางตรวจ (178 รายการ)

| # | คีย์ | สถานะ | แก้ค่าแล้ว | ค่าปัจจุบัน |
|---|---|---|---|---|
| 1 | `chat.message.context.snapshot.supersedes` | `pending` | ไม่ | `แทนที่สแนปช็อตก่อนหน้า` |
| 2 | `chat.message.failure.accountSignInRequired` | `pending` | ใช่ | `ลงชื่อเข้าใช้ DeepSeek และตรวจสอบว่าปลายทางรองรับการยืนยันตัวตนบัญชี` |
| 3 | `command.description.compact` | `pending` | ไม่ | `ย่อประวัติการสนทนาที่เก่ากว่า` |
| 4 | `conversation.attachment.pathUnsupported` | `pending` | ใช่ | `เส้นทางมีอักขระที่ใช้ไม่ได้ เปลี่ยนชื่อแล้วลองใหม่` |
| 5 | `conversation.detail.event.neighbors` | `pending` | ไม่ | `เหตุการณ์ข้างเคียง` |
| 6 | `conversation.detail.location` | `pending` | ไม่ | `บรรทัด {line} คอลัมน์ {column}` |
| 7 | `conversation.detail.plugins.count` | `pending` | ไม่ | `{count} ปลั๊กอินไดนามิก` |
| 8 | `conversation.detail.trace.derived` | `pending` | ไม่ | `เหตุการณ์ที่สืบมา` |
| 9 | `conversation.detail.yes` | `pending` | ไม่ | `ใช่` |
| 10 | `conversation.hero.headline` | `pending` | ไม่ | `ก้าวสู่น่านน้ำใหม่` |
| 11 | `conversation.row.commandArguments` | `pending` | ไม่ | `อาร์กิวเมนต์คำสั่ง` |
| 12 | `conversation.tool.title.ralph` | `pending` | ไม่ | `รันลูป ralph` |
| 13 | `model.error.sessionInUse` | `pending` | ใช่ | `เซสชันนี้ถูกใช้งานอยู่ อาจมี DSH ตัวอื่นกำลังรันอยู่ (เช่น dsh web หรือแอปเดสก์ท็อป) ปิดตัวอื่นก่อนแล้วลองใหม่` |
| 14 | `question.error.resubmit` | `pending` | ใช่ | `คำตอบไม่ทันก่อนงานเดินต่อ ส่งอีกครั้ง` |
| 15 | `question.nav.cancel` | `pending` | ไม่ | `ละทิ้งคำถามทั้งหมด` |
| 16 | `question.reply.label` | `pending` | ไม่ | `ตอบคำถามก่อนหน้าที่ค้างอยู่` |
| 17 | `schedule.manager.delivery.retention` | `pending` | ไม่ | `กฎการเก็บรักษา` |
| 18 | `schedule.manager.rule.weekdays` | `pending` | ไม่ | `จันทร์ถึงศุกร์` |
| 19 | `schedule.manager.timing.zoneNoStored` | `pending` | ไม่ | `งานแบบครั้งเดียวเก็บเฉพาะเวลาที่จะทำงาน ไม่ได้เก็บเขตเวลา วันที่และเวลาจะตีความตามเขตเวลาที่เลือก` |
| 20 | `schedule.manager.timing.zoneSearch` | `pending` | ไม่ | `ค้นหาด้วย UTC offset, IANA ID หรือชื่อเมือง` |
| 21 | `shortcuts.invalid` | `pending` | ไม่ | `การตั้งค่าทางลัดใน {location} เสียหาย สำรองและซ่อมการตั้งค่านี้ แล้ว {reload}` |
| 22 | `shortcuts.application` | `pending` | ไม่ | `แอปพลิเคชัน` |
| 23 | `sidebarBrowser.guide.description` | `pending` | ไม่ | `ท่องเว็บเพจ` |
| 24 | `sidebarTerminal.inputFull` | `pending` | ไม่ | `บัฟเฟอร์อินพุตเต็ม เชื่อมต่อใหม่แล้วลองอีกครั้ง` |
| 25 | `trajectory.section.betweenTurns` | `pending` | ไม่ | `ระหว่างเทิร์น` |
| 26 | `trajectory.timeline.ttftDecoding` | `pending` | ไม่ | `TTFT {ttft} · ถอดรหัส {decoding}` |
| 27 | `dsh-opencode-patch.description` | `pending` | ไม่ | `คืนค่าเฮดเดอร์ต้นทางของเกตเวย์ OpenCode Zen การยึดติดเซสชัน ความเข้ากันได้ของโมเดลฟรี และการแสดงโควต้า Go แบบเรียลไทม์` |
| 28 | `dsh-opencode-patch.endpointHint` | `pending` | ไม่ | `เลือกตระกูลเอนด์พอยต์ที่จะส่งคำขอไป อัตโนมัติตามที่อยู่แคตตาล็อกของเกตเวย์เอง อีกสองตัวเลือกบังคับเลือกเอง ตระกูลเก่าและใหม่มีสิทธิ์แยกกันและตอบทั้งคู่ เลือกอันที่บัญชีของคุณใช้งานได้จริง` |
| 29 | `dsh-opencode-patch.storeInspectOrg` | `pending` | ไม่ | `องค์กร` |
| 30 | `dsh-opencode-patch.purgeCatalogUnread` | `pending` | ไม่ | `ไม่ได้ลบอะไร แต่อ่านแคตตาล็อกไม่ได้ — ลองใหม่เมื่อออนไลน์` |
| 31 | `dsh-opencode-patch.usageSummaryNote` | `pending` | ใช่ | `OpenCode เผยแพร่เป็นเปอร์เซ็นต์ต่อช่วงเวลาและไม่มีตัวเลขยอดคงเหลือ ดังนั้น \"เหลือ\" คือส่วนต่างของเปอร์เซ็นต์เดียวกัน — ไม่ใช่ตัวเลขเงิน แผน tier ก็หาไม่ได้เช่นกัน` |
| 32 | `dsh-opencode-patch.usageOverflowBilling` | `pending` | ไม่ | `ค่าใช้จ่ายเซสชันแบ่งตามที่แต่ละเทิร์นรัน: คำขอแผน Go หักจากโควต้า Go คำขอ Zen หักจากยอด Zen เมื่อแผน Go ล้น เกตเวย์จะหักส่วนล้นไปที่ Zen — OpenCode ไม่เผยแพร่สัดส่วนในโควต้ากับส่วนเกิน` |
| 33 | `voice-input.setup.estimateNote` | `pending` | ไม่ | `นี่เป็นเพียงการประมาณ เครือข่ายช้าอาจใช้เวลานานกว่า ไฟล์ที่ดาวน์โหลดแล้วจะถูกใช้ซ้ำ โมเดลที่ไม่ได้ใช้งานจะคืนหน่วยความจำโดยอัตโนมัติ` |
| 34 | `voice-input.downloadAdvice.certificate` | `pending` | ไม่ | `ตรวจสอบนาฬิกาของระบบ ใบรับรองที่เชื่อถือได้ และพร็อกซีของเครื่องที่รัน DSH แล้วลองใหม่` |
| 35 | `voice-input.downloadAdvice.http` | `pending` | ไม่ | `ยืนยันว่าที่อยู่ดาวน์โหลดใช้งานได้และพร็อกซีเข้าถึงบริการดาวน์โหลดได้ หรือลองใหม่ภายหลัง` |
| 36 | `voice-input.sourceAutoHelp` | `pending` | ไม่ | `เลือกแหล่งที่ตอบสนองก่อนเป็นอันดับแรก หากดาวน์โหลดไม่สำเร็จจะลองแหล่งอื่น` |
| 37 | `voice-input.en` | `pending` | ไม่ | `อังกฤษ` |
| 38 | `voice-input.yue` | `pending` | ไม่ | `กวางตุ้ง` |
| 39 | `voice-input.ja` | `pending` | ไม่ | `ญี่ปุ่น` |
| 40 | `voice-input.ko` | `pending` | ไม่ | `เกาหลี` |
| 41 | `settings.account.onboardingWelcome` | `pending` | ไม่ | `ยินดีต้อนรับสู่` |
| 42 | `settings.account.onboardingCreditDescription` | `pending` | ใช่ | `DeepSeek Harness คิดเครดิตตามจำนวน token ที่โมเดลและเครื่องมือใช้งาน เติมเครดิตล่วงหน้าไว้ งานของคุณจะรันต่อได้ไม่สะดุด ยอดคงเหลือจะถูกใช้เฉพาะตอนที่เอเจนต์กำลังทำงาน` |
| 43 | `settings.account.onboardingOffice` | `pending` | ไม่ | `งานเอกสารและงานสร้างสรรค์` |
| 44 | `settings.account.onboardingOfficeDescription` | `pending` | ไม่ | `แก้ไขเอกสาร จัดระเบียบข้อมูล สร้างพรีเซนต์ และอื่น ๆ` |
| 45 | `settings.account.onboardingCompactDescription` | `pending` | ไม่ | `เห็นแค่ผลลัพธ์ในหน้าจอที่สะอาดเรียบง่าย` |
| 46 | `settings.account.onboardingStandard` | `pending` | ไม่ | `เฉพาะประเด็นสำคัญ` |
| 47 | `settings.account.onboardingStandardDescription` | `pending` | ไม่ | `เน้นผลลัพธ์ แสดงเฉพาะขั้นตอนและแอ็กชันที่สำคัญที่สุด` |
| 48 | `settings.anyBg.descColor` | `pending` | ไม่ | `ลากวงล้อหรือพิมพ์ค่าที่แน่นอน — ทั้ง UI เปลี่ยนตามทันที` |
| 49 | `settings.anyBg.descFont` | `pending` | ไม่ | `สลับฟอนต์ของอินเทอร์เฟซด้วยไฟล์ฟอนต์ของคุณ และร่างโครงข้อความแต่ละพื้นที่ให้อ่านชัดบนวอลเปเปอร์ที่ยุ่ง` |
| 50 | `settings.anyBg.descBackground` | `pending` | ไม่ | `อัปโหลดรูปภาพหรือวิดีโอเป็นวอลเปเปอร์และวางได้อิสระ หรือให้อัลกอริทึมวาดพื้นหลังแบบเคลื่อนไหว` |
| 51 | `settings.anyBg.descProfile` | `pending` | ไม่ | `ใช้พรีเซ็ตคลิกเดียว บันทึกหลายโปรไฟล์แบบมีชื่อ ตั้งเวลาสลับกลางวัน/กลางคืน หรือส่งออก/นำเข้าธีมเต็ม` |
| 52 | `settings.anyBg.colorHint` | `pending` | ไม่ | `เลือกเฉดจากวงกลมด้านนอก ปรับความเข้มและความสว่างในสี่เหลี่ยม คลิกสองครั้งที่สไลเดอร์เพื่อรีเซ็ต` |
| 53 | `settings.anyBg.swatchTitle` | `pending` | ไม่ | `สวอตช์ด่วน` |
| 54 | `settings.anyBg.uiProduced` | `pending` | ไม่ | `โปรดักชัน` |
| 55 | `settings.anyBg.captionInkLabel` | `pending` | ไม่ | `หมึกคำบรรยาย` |
| 56 | `settings.anyBg.tpEnabled` | `pending` | ไม่ | `ปกป้องพื้นผิวของบุคคลที่สาม` |
| 57 | `settings.anyBg.tpHint` | `pending` | ใช่ | `ปลั๊กอินนี้ทำให้โทเคนพื้นหลังของโฮสต์บางส่วนโปร่งแสง วอลเปเปอร์จะทะลุมาเห็น ปลั๊กอินอื่นที่ทาสีพื้นผิวด้วยโทเคนเดียวกันจะโปร่งแสงตามและชนกับข้อความที่เลื่อนข้างใต้ เมื่อเปิดใช้ ปลั๊กอินเหล่านั้นจะถูกตรวจจับและพื้นผิวของมันถูกตรึงให้มีความหนาแน่นที่อ่านได้ — นอกเหนือจากสไลเดอร์` |
| 58 | `settings.anyBg.strokeHint` | `pending` | ใช่ | `วาดโครงข้อความต่อพื้นที่: ความกว้าง 0 ปิด, \"auto\" เลือกสีตรงข้ามของสีข้อความ และ \"theme\" ตามสีหลักปัจจุบัน บล็อกโค้ดและไอคอนถูกยกเว้นอัตโนมัติเพื่อไม่ให้ไวยากรณ์หลายสีเลอะ` |
| 59 | `settings.anyBg.strokeAuto` | `pending` | ไม่ | `คอนทราสต์อัตโนมัติ` |
| 60 | `settings.anyBg.bgModeStretch` | `pending` | ไม่ | `ยืด` |
| 61 | `settings.anyBg.bgModeTile` | `pending` | ไม่ | `เรียงกระเบื้อง` |
| 62 | `settings.anyBg.bgModeCenter` | `pending` | ไม่ | `กึ่งกลาง` |
| 63 | `settings.anyBg.editorHint` | `pending` | ไม่ | `ลากเพื่อย้าย; เลื่อนหรือบีบสองนิ้วเพื่อซูม` |
| 64 | `settings.anyBg.bgMeshDesc` | `pending` | ไม่ | `เกรเดียนต์หลายก้อนนุ่ม` |
| 65 | `settings.anyBg.bgShaderDesc` | `pending` | ไม่ | `แอนิเมชันแสงไหล` |
| 66 | `settings.anyBg.bgPatternDesc` | `pending` | ไม่ | `พื้นผิวเรขาคณิตสม่ำเสมอ` |
| 67 | `settings.anyBg.presetNebula` | `pending` | ไม่ | `เนบิวลา` |
| 68 | `settings.anyBg.presetNoise` | `pending` | ไม่ | `นอยส์ไหล` |
| 69 | `settings.anyBg.presetWaves` | `pending` | ไม่ | `คลื่น` |
| 70 | `settings.anyBg.presetPoly` | `pending` | ไม่ | `โลว์โพลี` |
| 71 | `settings.anyBg.presetStarfield` | `pending` | ไม่ | `ทุ่งดาว` |
| 72 | `settings.anyBg.schemeHint` | `pending` | ใช่ | `\"Auto\" ตามความสว่างของพื้นหลังก่อน (ความสว่างของสีหลักเป็นตัวสำรองเท่านั้น); บังคับสว่าง/มืดจะสร้างจานสีใหม่ในทิศนั้น — เมื่อไม่มีสีหลักที่เลือก ใช้จานสีเทากลาง` |
| 73 | `settings.anyBg.presetGalleryTitle` | `pending` | ไม่ | `พรีเซ็ตลักษณะ` |
| 74 | `settings.anyBg.presetDesc_minimal` | `pending` | ไม่ | `พื้นผิวเกือบทึบ ไม่มีฝ้า` |
| 75 | `settings.anyBg.presetName_midnight` | `pending` | ไม่ | `เที่ยงคืน` |
| 76 | `settings.anyBg.presetName_cyber` | `pending` | ไม่ | `ไซเบอร์` |
| 77 | `settings.anyBg.presetDesc_cyber` | `pending` | ไม่ | `ม่วงชมพูสด พื้นผิวเลือน` |
| 78 | `settings.anyBg.presetName_warm` | `pending` | ไม่ | `แสงแดดอุ่น` |
| 79 | `settings.anyBg.presetDesc_warm` | `pending` | ไม่ | `สีหลักเหลืองอำพันบนพื้นผิวสว่างทึบ` |
| 80 | `settings.anyBg.profilesEmpty` | `pending` | ใช่ | `ยังไม่มีโปรไฟล์ที่บันทึก ปรับหน้าตาก่อน แล้วกด \"บันทึกปัจจุบัน\" เพื่อสลับกลับได้ทุกเมื่อ` |
| 81 | `settings.agentPreset.guideStandardExplanation` | `pending` | ไม่ | `ดูวิธีทำงานและเลือกใช้เมื่อไหร่ได้ในหัวข้อคู่มือด้านล่าง` |
| 82 | `settings.pluginInventory.moduleLabel` | `pending` | ไม่ | `โมดูล` |
| 83 | `sidebarExcel.formulaWarning` | `pending` | ไม่ | `ไฟล์งานนี้มีสูตร ผลลัพธ์ที่แสดงอาจขาดหายหรือคลาดเคลื่อน` |
| 84 | `sidebarExcel.unsupportedNotice` | `pending` | ไม่ | `ตัวดูตัวอย่างนี้ไม่รองรับ {features} ในไฟล์งานนี้ เปิดด้วยแอปของระบบเพื่อประสบการณ์เต็มรูปแบบ` |
| 85 | `sidebarOffice.invalid` | `pending` | ไม่ | `ดูตัวอย่างไฟล์ Office นี้ไม่ได้ อาจเสียหาย ตั้งรหัสผ่านไว้ หรือนามสกุลไฟล์ไม่ถูกต้อง` |
| 86 | `thinking-api.intro` | `pending` | ไม่ | `ตั้งค่า API ภายนอกที่รองรับโหมดการคิดได้ในคลิกเดียว โดยไม่ต้องกังวลเรื่องถูกปฏิเสธด้วยบทบาท developer` |
| 87 | `pluginMarket.factSourceCode` | `pending` | ไม่ | `ซอร์สโค้ด` |
| 88 | `pluginMarket.versionPrerelease` | `pending` | ไม่ | `รุ่นก่อนวางจำหน่าย` |
| 89 | `pluginManager.error` | `pending` | ไม่ | `อ่านปลั๊กอินได้ไม่ครบ อาจเนื่องจากปัญหาเครือข่าย` |
| 90 | `pluginManager.restartReasonHostModule` | `pending` | ไม่ | `การเปลี่ยนแปลงถึงมอดูลที่ DSH โหลดไว้เอง` |
| 91 | `pluginManager.restartReasonModuleComparison` | `pending` | ใช่ | `DSH เทียบปลั๊กอินที่โหลดกับไฟล์ด้วยกันไม่ได้` |
| 92 | `pluginManager.metadataError` | `pending` | ใช่ | `ข้อมูลกำกับแพ็กเกจผิด: {error}` |
| 93 | `pluginManager.previewAlt` | `pending` | ใช่ | `ตัวอย่างฟีเจอร์ของ {name}` |
| 94 | `pluginManager.previewUnavailable` | `pending` | ใช่ | `แสดงตัวอย่างฟีเจอร์ไม่ได้` |
| 95 | `pluginManager.sourceTitle` | `pending` | ใช่ | `แหล่งที่มา` |
| 96 | `pluginManager.partsFilterEmpty` | `pending` | ใช่ | `ไม่มีองค์ประกอบที่ตรงกับคำค้น` |
| 97 | `pluginManager.installGuideIdHint` | `pending` | ใช่ | `ชื่อแพ็กเกจปลั๊กอินคือชื่อแพ็กเกจ npm (เช่น dsh-xxx หรือ @author/plugin): ส่วนที่ถัดจาก dsh plugin add หรือ pnpm add ในคำสั่งติดตั้งที่ README ของปลั๊กอินนั้น` |
| 98 | `pluginManager.installPathTemplateHint` | `pending` | ใช่ | `แทนที่ส่วนนี้ด้วยพาธไปยังโฟลเดอร์ท้องถิ่นของคุณจริง` |
| 99 | `pluginManager.installGuideSafety` | `pending` | ใช่ | `ติดตั้งแต่ปลั๊กอินที่คุณไว้ใจ: มันรันด้วยสิทธิ์ของคุณ และอาจทำให้ DeepSeek Harness เสียหายหรือข้อมูลรั่วไหลได้` |
| 100 | `pluginManager.installUpgradeNotice` | `pending` | ใช่ | `ปลั๊กอินทางการแบบดาวน์โหลดได้จะมีปุ่มอัปเดตเมื่อเวอร์ชันต่างจาก DSH ส่วนปลั๊กอินอื่นต้องถอดถอนแล้วติดตั้งใหม่เพื่ออัปเดต` |
| 101 | `pluginManager.registryLegend` | `pending` | ใช่ | `npm registry ที่ดาวน์โหลดปลั๊กอินมาจากที่นั่น` |
| 102 | `pluginManager.registryDefault` | `pending` | ใช่ | `Registry เบื้องต้น` |
| 103 | `pluginManager.registryCustom` | `pending` | ใช่ | `แอดเดรสตั้งเอง` |
| 104 | `pluginManager.registryCustomInvalid` | `pending` | ใช่ | `กรอกแอดเดรสที่ขึ้นต้นด้วย http:// หรือ https://` |
| 105 | `pluginManager.installProblemInvalid` | `pending` | ใช่ | `นี่ไม่ใช่ชื่อแพ็กเกจหรือแอดเดรสที่ติดตั้งได้: {reason}` |
| 106 | `pluginManager.installProblemInstalled` | `pending` | ใช่ | `ปลั๊กอินนี้ติดตั้งแล้ว ถ้าต้องการอัปเดตเวอร์ชัน ให้ถอดถอนแล้วติดตั้งใหม่อีกครั้ง` |
| 107 | `pluginManager.installProblemShipped` | `pending` | ใช่ | `ปลั๊กอินนี้มากับ DSH; อัปเดต DSH จะอัปเดตให้เอง` |
| 108 | `pluginManager.statusMissingFiles` | `pending` | ใช่ | `แพ็กเกจไม่พร้อมใช้` |
| 109 | `pluginManager.installGithubTimeoutTitle` | `pending` | ใช่ | `เกินเวลาอย่างที่ GitHub` |
| 110 | `pluginManager.installUseGithubMirror` | `pending` | ไม่ | `ใช้ ิร์เรอรใ์ นจีน` |
| 111 | `pluginManager.installAwaitingAcceptance` | `pending` | ไม่ | `รอ Host ยอมรับการติดตั้ง การยกเลิกจะลองใหม่อัตโนมัติตามการยืนยัน` |
| 112 | `pluginManager.installBackgroundApplying` | `pending` | ใช่ | `กำลังนำการติดตั้งไปใช้ ยกเลิกไม่ได้ ดูความคืบหน้าการติดตั้ง` |
| 113 | `pluginManager.installStarting` | `pending` | ไม่ | `กำลังเตรียืมติดตั้ง…` |
| 114 | `pluginManager.installCancelled` | `pending` | ใช่ | `ยกเลิกการติดตั้งแล้ว ปลั๊กอินยังไม่ได้ใช้งาน และอาจเหลือไฟล์ที่ดาวน์โหลด` |
| 115 | `pluginManager.installFailureNetwork` | `pending` | ใช่ | `การเชื่อมต่อเครือข่ายล้มเหลว` |
| 116 | `pluginManager.installFailureNetworkHost` | `pending` | ใช่ | `ถึง {host} ไม่ได้: แอดเดรส GitHub หรือลิงก์ .tgz ไม่ผ่าน registry เครื่องนี้ต้องถึงโดยตรงหรือผ่าน proxy ถ้าปลั๊กอินนี้มีบน npm ด้วย ให้กรอกชื่อแพ็กเกจแทน` |
| 117 | `pluginManager.installFailureDiskFull` | `pending` | ไม่ | `พื้นทีแว่นเต็ม ยุติการติดตั้ง` |
| 118 | `pluginManager.installFailurePermission` | `pending` | ไม่ | `ไม่มสี ิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้` |
| 119 | `pluginManager.installFailureBuildBlockedManual` | `pending` | ใช่ | `pnpm บล็อกสคริปต์ติดตั้ง อนุญาตใน allowBuilds ของ pnpm-workspace.yaml แล้วลองใหม่` |
| 120 | `pluginManager.installFailureIntegrity` | `pending` | ใช่ | `แพ็กเกจที่ดาวน์โหลดไม่ผ่านการตรวจสอบความสมบูรณ์` |
| 121 | `pluginManager.terminalFailed` | `pending` | ใช่ | `ล้มเหลว` |
| 122 | `pluginManager.installDoneOtherVersion` | `pending` | ใช่ | `ตามนโยบายความปลอดภัยของห่วงโซ่อุปทาน pnpm (minimumReleaseAge) เวอร์ชันที่เผยแพร่ใหม่กว่าช่วงอายุกำหนดยังไม่ถูกติดตั้งอัตโนมัติ การติดตั้งนี้ยังใช้ {installed} แทนเวอร์ชันล่าสุด {version} ซึ่งเวอร์ชันที่เผยแพร่ใหม่อาจยังผ่านช่วงรอไม่ครบและอาจมีโค้ดอันตรายหรือข้อบกพร่องที่ยังไม่พบ ถ้าต้องการ {version} ให้ถอดถอนเวอร์ชันปัจจุบันแล้วติดตั้ง {exact} เพื่อขอรับเวอร์ชันนั้น` |
| 123 | `pluginManager.installApprovalDescription` | `pending` | ใช่ | `แพ็กเกจเหล่านี้มีสคริปต์ติดตั้งที่ pnpm ยังไม่ได้รัน` |
| 124 | `pluginManager.installApprovalConsequence` | `pending` | ไม่ | `เมื่ออนุญาต สคริปต์จะรันที่นี่ด้วยสิทธิ์ของคุณ และการอนุญาตจะบันทึกในโปรไฟล์นี้` |
| 125 | `pluginManager.reasonUnaddressable` | `pending` | ใช่ | `แพตช์โปรไฟล์ระบุรายการนี้ไม่ได้อย่างเจาะจง` |
| 126 | `pluginManager.reasonAlreadyInstalled` | `pending` | ใช่ | `แพ็กเกจนี้ติดตั้งแล้ว ถอดถอนก่อนติดตั้งเวอร์ชันอื่น` |
| 127 | `pluginManager.reasonAmbiguousInstall` | `pending` | ใช่ | `ไม่สามารถบอกได้ว่าติดตั้งแพ็กเกจใดจากสิ่งที่เปลี่ยนแปลง` |
| 128 | `pluginManager.reasonNotBundle` | `pending` | ใช่ | `แพ็กเกจนี้ไม่ได้ประกาศบันเดิล จึงบริหารจัดการเป็นปลั๊กอินไม่ได้` |
| 129 | `pluginManager.reasonNotRemovable` | `pending` | ใช่ | `แพ็กเกจนี้ไม่ได้ถูกโปรไฟล์ครอบครอง หรือการบริหารจัดการปลั๊กอินต้องใช้ตัวจัดการ` |
| 130 | `pluginManager.reasonStopProfile` | `pending` | ใช่ | `โปรไฟล์นี้รันโดยไม่มี HMR หยุดมันแล้วถอดถอนแพ็กเกจด้วย dsh plugin` |
| 131 | `pluginManager.reasonBundleInUse` | `pending` | ใช่ | `การตั้งค่าอื่นยังใช้องค์ประกอบของบันเดิลนี้อยู่ ต้องปิดมันก่อน` |
| 132 | `settings.shell.timeoutMsHint` | `pending` | ไม่ | `หนึ่งคำสั่งรันได้นานเท่าใดก่อนจะถูกบังคับหยุด` |
| 133 | `settings.webSearch.maxUsesHint` | `pending` | ไม่ | `โมเดลเสริมอาจรันการค้นหาได้กี่ครั้งภายในคำขอ Messages เดียว ใช้เฉพาะกับ Messages API` |
| 134 | `cotTranslation.privacy` | `pending` | ไม่ | `เหตุผลแบบขยายจะถูกส่งไปยังบริการที่เลือก อาจมีโค้ดส่วนตัวหรือรายละเอียดแชตอยู่` |
| 135 | `session-inspector.object.accessor` | `pending` | ไม่ | `[Getter / Setter, ยังไม่ประเมิน]` |
| 136 | `session-inspector.object.absent` | `pending` | ไม่ | `[สล็อตว่าง]` |
| 137 | `settings.subagent.subagentModelSelectionOff` | `pending` | ไม่ | `เอเจนต์ย่อยใช้ค่าเริ่มต้นที่ตั้งไว้หรือสืบทอดโมเดลของเอเจนต์แม่ ตัวเลือกโมเดลที่บันทึกไว้ยังคงอยู่` |
| 138 | `dsh-android-mobile.privileged.wlStep1` | `pending` | ใช่ | `กดปุ่ม \"จับคู่ดีบักไร้สาย\" ด้านล่างในหน้านี้ — จะมีแจ้งเตือนค้างในแถบแจ้งเตือนบอกว่าต้องไปที่ไหนต่อ` |
| 139 | `dsh-android-mobile.privileged.rootNote` | `pending` | ไม่ | `เครื่องมือ root จะลงทะเบียนเฉพาะเมื่อตรวจพบ uid 0 เท่านั้น วิธีตรวจคือรัน su -c id -u จริง ๆ แล้วดูว่าผลเป็น 0 หรือไม่ ไม่ใช่ดูว่าไฟล์ su มีอยู่ไหม — สามกรณีที่ไฟล์มีแต่ยกระดับไม่ได้คือ su หลอก, ติด Magisk แต่ยังไม่อนุญาต, และ root ใช้ไม่ได้หลังอัปเกรด ผลจะแคชไว้ 24 ชั่วโมง` |
| 140 | `dsh-android-mobile.bubble.how2` | `pending` | ไม่ | `ลากเพื่อย้าย ปล่อยแล้วจะดูดไปขอบจอที่ใกล้ที่สุดและจำตำแหน่งไว้` |
| 141 | `dsh-android-mobile.bubble.note2` | `pending` | ไม่ | `ฟองลอยได้ข้อมูลจากสถานะของ foreground service ประมาณวินาทีละครั้ง ไม่กินแบตเพิ่ม — เอนจินทำงานอยู่แล้ว` |
| 142 | `dsh-android-mobile.contact.how3` | `pending` | ไม่ | `รหัสเป็นตัวเลขล้วนและเลือกไม่ได้ (ปลั๊กอินนี้ปิดการเลือกข้อความทั้งระบบ) จึงต้องใช้ปุ่มคัดลอก` |
| 143 | `dsh-android-mobile.contact.notesTitle` | `pending` | ไม่ | `เคล็ดลับการรายงานปัญหา` |
| 144 | `dsh-android-mobile.contact.note1` | `pending` | ใช่ | `เล่าแบบ \"ขั้นตอนไหน คาดหวังอะไร ได้อะไรจริง\" — หาสาเหตุง่ายกว่า \"ใช้ไม่ได้\" มาก` |
| 145 | `dsh-android-mobile.logs.how1` | `pending` | ใช่ | `แตะ \"เปิดตัวดูบันทึก\" — เป็นหน้าจอเนทีฟ และใช้ได้แม้เอนจินไม่เคยเริ่ม` |
| 146 | `dsh-android-mobile.logs.note2` | `pending` | ไม่ | `เนื้อความข้อความไม่ถูกบันทึก — เก็บเฉพาะเมตาดาตา (เซสชันใด เมื่อไร แอ็กชันอะไร)` |
| 147 | `dsh-android-mobile.logs.note3` | `pending` | ใช่ | `โอเวอร์เลย์ตอนเปิด/แครชก็มีปุ่ม \"ดูบันทึก\" สำหรับตอนที่แอปเองเปิดไม่ขึ้น` |
| 148 | `settings.tokenSaver.saver.card.desc` | `pending` | ไม่ | `ลดการใช้บริบทและความหน่วงอย่างมาก ด้วยการบีบอัดผลลัพธ์เครื่องมือ ปรับรูปพรอมต์ และตอบในเครื่อง` |
| 149 | `settings.tokenSaver.saver.prompts.desc` | `pending` | ไม่ | `ปรับรูปพรอมต์ระบบและความหนาแน่นของประวัติสนทนา โดยไม่สูญเสียข้อกำหนด` |
| 150 | `settings.tokenSaver.saver.prompts.cavemanDesc` | `pending` | ไม่ | `ตัดคำฟุ่มเฟือยและสำนวนเยิ่นเย้อออกจากพรอมต์` |
| 151 | `settings.tokenSaver.saver.prompts.ponytail` | `pending` | ไม่ | `สไตล์ Ponytail` |
| 152 | `settings.tokenSaver.saver.prompts.ponytailDesc` | `pending` | ไม่ | `โหมดขี้เกียจแบบซีเนียร์: ตอบกระชับ ต่อต้านการสร้างเกินจำเป็น` |
| 153 | `settings.tokenSaver.saver.local.desc` | `pending` | ไม่ | `ตอบคำถามเชิงกลไกทั่วไปในเครื่องด้วย 0ms และใช้ 0 token` |
| 154 | `settings.amdFreeModel.section.keyHint` | `pending` | ไม่ | `เข้าสู่ระบบที่ developer.amd.com.cn แล้วไปเอาที่หน้าโปรไฟล์ คีย์อยู่ในเครื่องนี้เท่านั้น` |
| 155 | `better-dsh-session-deletetool.batch.desc` | `pending` | ไม่ | `ทุกบทสนทนา จัดกลุ่มตามเวิร์กสเปซ ใต้แต่ละแถวคือเอเจนต์ย่อยและบทสนทนาที่แยกสาขา ขยายได้ทีละระดับ ติ๊กแถวหนึ่งจะลบทุกอย่างใต้แถวนั้น ติ๊กเอเจนต์ย่อยตัวเดียวจะลบเฉพาะตัวนั้น ลบแล้วกู้คืนไม่ได้` |
| 156 | `better-dsh-session-deletetool.batch.workspaceAll` | `pending` | ไม่ | `เลือกทุกบทสนทนาในเวิร์กสเปซนี้` |
| 157 | `settings.ourFreeModel.effects.enabled` | `pending` | ไม่ | `เอฟเฟกต์ภาพ` |
| 158 | `settings.ourFreeModel.effects.hint` | `pending` | ไม่ | `สลับแสงเรืองพื้นหลัง เบลอแบบกระจก และการเคลื่อนไหวประดับ ฟีเจอร์ตู้ปลาและโมเดลยังใช้ได้ตามปกติ` |
| 159 | `settings.ourFreeModel.hint.region` | `pending` | ไม่ | `โมเดลนี้ถูกกั้นตามประเทศของ egress เมื่อพร็อกซีเปลี่ยน egress การตรวจครั้งถัดไปจะย้ายมันเข้ากลุ่มที่ใช้ได้เอง` |
| 160 | `settings.ourFreeModel.tag.kiloChannel` | `pending` | ไม่ | `ช่อง Kilo · พูลฟรี (ผู้ให้บริการต้นทางอาจบันทึกพรอมต์ — อย่าส่งเนื้อหาที่ละเอียดอ่อน)` |
| 161 | `settings.ourFreeModel.roster.noLane` | `pending` | ไม่ | `โมเดล EAC แบบร่วมจ่ายใช้ไม่ได้ในการประกอบนี้: โฮสต์ไม่ได้ระบุโปรไฟล์เดสก์ท็อปหรือเว็บที่รู้จัก จึงไม่ได้โหลดเลนนี้` |
| 162 | `settings.ourFreeModel.section.egressHint` | `pending` | ไม่ | `ส่งทราฟฟิกการอนุมานและการตรวจผ่านพร็อกซี เพื่อลดขีดจำกัดอัตราต่อ IP` |
| 163 | `settings.ourFreeModel.egress.direct` | `pending` | ไม่ | `ขณะปิด คำขอจะออกตรง; ที่อยู่ถือเป็นข้อมูลรับรอง — เก็บไว้ในตั้งค่าของเครื่องนี้เท่านั้น ไม่ถูกส่งไปกับเพย์โหลด API ปกติ อ่านได้เฉพาะผ่านปุ่มเปิดเผย และถูกปิดบังไว้ที่นี่โดยค่าเริ่มต้น` |
| 164 | `settings.ourFreeModel.speed.estimated` | `pending` | ไม่ | `ประวัติก่อนอัปเกรดเป็นการประมาณจากคำขอต้นทาง; เทิร์นแม่นยำหลังอัปเกรด` |
| 165 | `settings.ourFreeModel.forward.lanWarn` | `pending` | ไม่ | `ขณะเปิดอยู่ ใครก็ตามที่เข้าถึงเครื่องนี้ได้จะใช้โควตาฟรีของมันด้วยคีย์นั้นได้ เปิดเฉพาะบนเครือข่ายที่คุณเชื่อถือ และจำกัดแหล่งที่มาด้วยไฟร์วอลล์ถ้าทำได้` |
| 166 | `settings.ourFreeModel.picks.sub` | `pending` | ไม่ | `ชุดโปรเจกต์โอเพนซอร์สของผู้เขียนคนเดียวกัน: พาเอเจนต์ไปสู่เดสก์ท็อปแบบเนทีฟ ทำให้ปลั๊กอินหลายร้อยตัวทำงานร่วมกัน และทำงานวิดีโอและงานออกแบบบนเครื่องนี้ หากมีประโยชน์ ดาวคือคำขอบคุณที่พวกเขาเข้าใจ` |
| 167 | `settings.ourFreeModel.picks.foot` | `pending` | ไม่ | `ดาวคือสลิปเงินเดือนเดียวที่โปรเจกต์โอเพนซอร์สได้รับ — มันตัดสินว่าผู้เขียนจะมีเวลาให้ได้อีกแค่ไหน ทุกโปรเจกต์ที่นี่ฟรี โอเพนซอร์ส และไม่มีโฆษณา; คลิกเดียวคือการสนับสนุนที่ชัดเจนที่สุด` |
| 168 | `settings.ourFreeModel.picks.design.body` | `pending` | ไม่ | `ปลั๊กอินผลิตวิดีโอและออกแบบในเครื่องสำหรับ DeepSeek Harness: ตัดต่อหลายแทร็ก เทมเพลตและระบบดีไซน์ แคนวาสดูตัวอย่างแบบเนทีฟ และการส่งออกที่เป็นไฟล์จริง ทั้งไปป์ไลน์รันบนเครื่องนี้ ฟุตเทจและโปรเจกต์จึงอยู่ในดิสก์ของคุณเอง` |
| 169 | `settings.ourFreeModel.eac.pillCompat` | `pending` | ไม่ | `ช่วงผ่อนผัน` |
| 170 | `settings.ourFreeModel.sponsor.bannerDescription` | `pending` | ไม่ | `พาร์ตเนอร์รีเลย์อย่างเป็นทางการของ OFM ให้บริการเข้าถึง API โมเดลที่เสถียร เปิด และคุ้มค่า รองรับ Claude, ChatGPT, Grok, Gemini, GLM, Kimi และ DeepSeek ตั้งค่าครั้งเดียวใช้ได้ทั่วถึงใน Codex, Gemini CLI, Claude Code และเครื่องมือนักพัฒนาอื่น ๆ ชวนคนอื่นรับเงินคืน 10%` |
| 171 | `settings.ourFreeModel.eac.tankLabel` | `pending` | ไม่ | `แรงกดดันของพูลร่วมจ่าย` |
| 172 | `settings.ourFreeModel.gw.sub` | `pending` | ไม่ | `ให้บริการโมเดลในช่องทางผ่าน API ที่เข้ากันได้กับ OpenAI แก่เครื่องนี้และ LAN: เอนด์พอยต์ คีย์ และพอร์ตรีเลย์อยู่ที่นี่` |
| 173 | `settings.ourFreeModel.saver.sub` | `pending` | ไม่ | `บีบอัดคำขอก่อนออกจากเครื่องนี้: ผลลัพธ์เครื่องมือถูกเข้ารหัสใหม่ พรอมต์ถูกลดความอ้วน และห้าคำตอบถูกสร้างในเครื่องโดยไม่เรียกต้นทาง` |
| 174 | `settings.ourFreeModel.saver.cavemanWhat` | `pending` | ไม่ | `ตอบห้วน: ตัดคำทักทายและการอธิบายซ้ำ เก็บข้อสรุปและโค้ดไว้` |
| 175 | `settings.ourFreeModel.saver.localHint` | `pending` | ไม่ | `คำตอบของห้าคำขอนี้อยู่ในเนื้อคำขอแล้ว การส่งต่อไปจะเสียการเดินทางหนึ่งรอบและโควตาต้นทางกับคำถามที่มีคำตอบเดียว` |
| 176 | `settings.ourFreeModel.routing.chainsHint` | `pending` | ไม่ | `เชนถูกเก็บตามลำดับที่คุณใส่; เชนที่อ้างโมเดลซึ่งตอนนี้ใช้ไม่ได้จะถูกเก็บตามที่เขียน และกลับมาเองเมื่อเลนนั้นกลับมา` |
| 177 | `settings.ourFreeModel.routing.emptyHint` | `pending` | ไม่ | `เชนคือโมเดลเสมือน: เลือกในตัวเลือกโมเดล แล้วคำขอจะลองโมเดลจริงบนเชนตามลำดับ ใช้เพื่อครอบคลุมช่วงที่เลนล่ม` |
| 178 | `settings.ourFreeModel.routing.strategy` | `pending` | ไม่ | `กลยุทธ์` |
