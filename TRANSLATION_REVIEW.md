# รายการตรวจทานคำแปล

ข้อความต่อไปนี้มีคำที่ปรากฏในไฟล์เพียงที่เดียว และมีสระหรือวรรณยุกต์ไทยอยู่ด้วย — รูปแบบแบบนี้มักเป็นคำที่พิมพ์ผิด แต่นี่เป็นแค่การคาดเดา (heuristic) จึงมีหลายรายการที่ถูกต้องแล้ว สำหรับแต่ละรายการ ให้อ่านข้อความในบริบทจริง แล้วแก้เฉพาะรายการที่ผิดจริงเท่านั้น จากนั้นรัน `npm run check`

วิธีแก้: แก้ที่ข้อความใน `lib/client.js` (ภายใน `const thDicts`) คงชื่อคีย์และ `{placeholders}` ไว้ให้เหมือนเดิมทุกตัว

จำนวนรายการ: 178

- `chat.message.context.snapshot.supersedes` (suspicious: `สแนปช็อ`, `ตก่อน`)  
  แทนที่สแนปช็อตก่อนหน้า
- `chat.message.failure.accountSignInRequired` (suspicious: `ลงชื่อ`)  
  โปรดลงชื่อเข้าใช้ DeepSeek และตรวจสอบว่าปลายทางคำขอรองรับการยืนยันตัวตนบัญชี
- `command.description.compact` (suspicious: `ประวัติการ`)  
  ย่อประวัติการสนทนาที่เก่ากว่า
- `conversation.attachment.pathUnsupported` (suspicious: `อักขระ`)  
  เส้นทางมีอักขระที่อ้างอิงไม่ได้ โปรดเปลี่ยนชื่อแล้วลองใหม่
- `conversation.detail.event.neighbors` (suspicious: `เคียง`)  
  เหตุการณ์ข้างเคียง
- `conversation.detail.location` (suspicious: `คอลัมน์`)  
  บรรทัด {line} คอลัมน์ {column}
- `conversation.detail.plugins.count` (suspicious: `ไดนามิก`)  
  {count} ปลั๊กอินไดนามิก
- `conversation.detail.trace.derived` (suspicious: `สืบ`)  
  เหตุการณ์ที่สืบมา
- `conversation.detail.yes` (suspicious: `ใช่`)  
  ใช่
- `conversation.hero.headline` (suspicious: `ก้าว`, `น่าน`)  
  ก้าวสู่น่านน้ำใหม่
- `conversation.row.commandArguments` (suspicious: `อาร์กิวเมนต์`)  
  อาร์กิวเมนต์คำสั่ง
- `conversation.tool.title.ralph` (suspicious: `ลูป`)  
  รันลูป ralph
- `model.error.sessionInUse` (suspicious: `ยอินส`)  
  เซสชันนี้ถูกใช้งานอยู่ อาจเป็นโดยอินสแตนซ์ DSH อื่นที่กำลังรัน (เช่น dsh web หรือแอปเดสก์ท็อป) โปรดปิดอินสแตนซ์ DSH อื่นแล้วลองอีกครั้ง
- `question.error.resubmit` (suspicious: `ไม่ทัน`)  
  คำตอบไม่ทันก่อนงานดำเนินต่อไป; โปรดส่งอีกครั้ง
- `question.nav.cancel` (suspicious: `ละทิ้ง`)  
  ละทิ้งคำถามทั้งหมด
- `question.reply.label` (suspicious: `หน้าที่`)  
  ตอบคำถามก่อนหน้าที่ค้างอยู่
- `schedule.manager.delivery.retention` (suspicious: `รักษา`)  
  กฎการเก็บรักษา
- `schedule.manager.rule.weekdays` (suspicious: `จันทร์`, `ศุกร์`)  
  จันทร์ถึงศุกร์
- `schedule.manager.timing.zoneNoStored` (suspicious: `ตีความ`)  
  งานแบบครั้งเดียวเก็บเฉพาะเวลาที่จะทำงาน ไม่ได้เก็บเขตเวลา วันที่และเวลาจะตีความตามเขตเวลาที่เลือก
- `schedule.manager.timing.zoneSearch` (suspicious: `เมือง`)  
  ค้นหาด้วย UTC offset, IANA ID หรือชื่อเมือง
- `shortcuts.invalid` (suspicious: `ซ่อม`)  
  การตั้งค่าทางลัดใน {location} เสียหาย สำรองและซ่อมการตั้งค่านี้ แล้ว {reload}
- `shortcuts.application` (suspicious: `แอปพลิเคชัน`)  
  แอปพลิเคชัน
- `sidebarBrowser.guide.description` (suspicious: `เว็บเพจ`)  
  ท่องเว็บเพจ
- `sidebarTerminal.inputFull` (suspicious: `บัฟเฟอร์`)  
  บัฟเฟอร์อินพุตเต็ม เชื่อมต่อใหม่แล้วลองอีกครั้ง
- `trajectory.section.betweenTurns` (suspicious: `หว่าง`)  
  ระหว่างเทิร์น
- `trajectory.timeline.ttftDecoding` (suspicious: `ถอดรหัส`)  
  TTFT {ttft} · ถอดรหัส {decoding}
- `dsh-opencode-patch.description` (suspicious: `ยึด`)  
  คืนค่าเฮดเดอร์ต้นทางของเกตเวย์ OpenCode Zen การยึดติดเซสชัน ความเข้ากันได้ของโมเดลฟรี และการแสดงโควต้า Go แบบเรียลไทม์
- `dsh-opencode-patch.endpointHint` (suspicious: `กูล`)  
  เลือกตระกูลเอนด์พอยต์ที่จะส่งคำขอไป อัตโนมัติตามที่อยู่แคตตาล็อกของเกตเวย์เอง อีกสองตัวเลือกบังคับเลือกเอง ตระกูลเก่าและใหม่มีสิทธิ์แยกกันและตอบทั้งคู่ เลือกอันที่บัญชีของคุณใช้งานได้จริง
- `dsh-opencode-patch.storeInspectOrg` (suspicious: `องค์กร`)  
  องค์กร
- `dsh-opencode-patch.purgeCatalogUnread` (suspicious: `ออนไลน์`)  
  ไม่ได้ลบอะไร แต่อ่านแคตตาล็อกไม่ได้ — ลองใหม่เมื่อออนไลน์
- `dsh-opencode-patch.usageSummaryNote` (suspicious: `เปอร์เซ็นต์`, `เปอร์เซ็นต์`, `หาไม่`)  
  OpenCode เผยแพร่เป็นเปอร์เซ็นต์ต่อช่วงเวลาและไม่มีตัวเลขยอดคงเหลือ ดังนั้น "เหลือ" คือส่วนต่างของเปอร์เซ็นต์เดียวกัน — ไม่ใช่ตัวเลขเงิน แผน tier ก็หาไม่ได้เช่นกัน
- `dsh-opencode-patch.usageOverflowBilling` (suspicious: `นรัน`)  
  ค่าใช้จ่ายเซสชันแบ่งตามที่แต่ละเทิร์นรัน: คำขอแผน Go หักจากโควต้า Go คำขอ Zen หักจากยอด Zen เมื่อแผน Go ล้น เกตเวย์จะหักส่วนล้นไปที่ Zen — OpenCode ไม่เผยแพร่สัดส่วนในโควต้ากับส่วนเกิน
- `voice-input.setup.estimateNote` (suspicious: `ช้า`)  
  นี่เป็นเพียงการประมาณ เครือข่ายช้าอาจใช้เวลานานกว่า ไฟล์ที่ดาวน์โหลดแล้วจะถูกใช้ซ้ำ โมเดลที่ไม่ได้ใช้งานจะคืนหน่วยความจำโดยอัตโนมัติ
- `voice-input.downloadAdvice.certificate` (suspicious: `นาฬิกา`)  
  ตรวจสอบนาฬิกาของระบบ ใบรับรองที่เชื่อถือได้ และพร็อกซีของเครื่องที่รัน DSH แล้วลองใหม่
- `voice-input.downloadAdvice.http` (suspicious: `ว่าที่`)  
  ยืนยันว่าที่อยู่ดาวน์โหลดใช้งานได้และพร็อกซีเข้าถึงบริการดาวน์โหลดได้ หรือลองใหม่ภายหลัง
- `voice-input.sourceAutoHelp` (suspicious: `อันดับ`)  
  เลือกแหล่งที่ตอบสนองก่อนเป็นอันดับแรก หากดาวน์โหลดไม่สำเร็จจะลองแหล่งอื่น
- `voice-input.en` (suspicious: `อังกฤษ`)  
  อังกฤษ
- `voice-input.yue` (suspicious: `กวางตุ้ง`)  
  กวางตุ้ง
- `voice-input.ja` (suspicious: `ญี่ปุ่น`)  
  ญี่ปุ่น
- `voice-input.ko` (suspicious: `เกาหลี`)  
  เกาหลี
- `settings.account.onboardingWelcome` (suspicious: `ต้อนรับ`)  
  ยินดีต้อนรับสู่
- `settings.account.onboardingCreditDescription` (suspicious: `สะดุด`)  
  DeepSeek Harness คิดเครดิตตามจำนวน token ที่โมเดลและเครื่องมือใช้งาน เติมเครดิตล่วงหน้าไว้เพื่อให้งานของคุณรันต่อได้ไม่สะดุด ยอดคงเหลือจะถูกใช้เฉพาะตอนที่เอเจนต์กำลังทำงาน
- `settings.account.onboardingOffice` (suspicious: `สร้างสรรค์`)  
  งานเอกสารและงานสร้างสรรค์
- `settings.account.onboardingOfficeDescription` (suspicious: `เซนต์`)  
  แก้ไขเอกสาร จัดระเบียบข้อมูล สร้างพรีเซนต์ และอื่น ๆ
- `settings.account.onboardingCompactDescription` (suspicious: `เรียบ`)  
  เห็นแค่ผลลัพธ์ในหน้าจอที่สะอาดเรียบง่าย
- `settings.account.onboardingStandard` (suspicious: `ประเด็น`)  
  เฉพาะประเด็นสำคัญ
- `settings.account.onboardingStandardDescription` (suspicious: `เน้น`)  
  เน้นผลลัพธ์ แสดงเฉพาะขั้นตอนและแอ็กชันที่สำคัญที่สุด
- `settings.anyBg.descColor` (suspicious: `ล้อ`)  
  ลากวงล้อหรือพิมพ์ค่าที่แน่นอน — ทั้ง UI เปลี่ยนตามทันที
- `settings.anyBg.descFont` (suspicious: `อร์เฟ`, `ซด้วย`, `ชัด`, `ยุ่ง`)  
  สลับฟอนต์ของอินเทอร์เฟซด้วยไฟล์ฟอนต์ของคุณ และร่างโครงข้อความแต่ละพื้นที่ให้อ่านชัดบนวอลเปเปอร์ที่ยุ่ง
- `settings.anyBg.descBackground` (suspicious: `อิสระ`, `อัล`, `ทึม`)  
  อัปโหลดรูปภาพหรือวิดีโอเป็นวอลเปเปอร์และวางได้อิสระ หรือให้อัลกอริทึมวาดพื้นหลังแบบเคลื่อนไหว
- `settings.anyBg.descProfile` (suspicious: `มีชื่อ`)  
  ใช้พรีเซ็ตคลิกเดียว บันทึกหลายโปรไฟล์แบบมีชื่อ ตั้งเวลาสลับกลางวัน/กลางคืน หรือส่งออก/นำเข้าธีมเต็ม
- `settings.anyBg.colorHint` (suspicious: `สี่เหลี่ยม`)  
  เลือกเฉดจากวงกลมด้านนอก ปรับความเข้มและความสว่างในสี่เหลี่ยม คลิกสองครั้งที่สไลเดอร์เพื่อรีเซ็ต
- `settings.anyBg.swatchTitle` (suspicious: `วอตช์`)  
  สวอตช์ด่วน
- `settings.anyBg.uiProduced` (suspicious: `ดัก`)  
  โปรดักชัน
- `settings.anyBg.captionInkLabel` (suspicious: `หมึก`)  
  หมึกคำบรรยาย
- `settings.anyBg.tpEnabled` (suspicious: `ปกป้อง`)  
  ปกป้องพื้นผิวของบุคคลที่สาม
- `settings.anyBg.tpHint` (suspicious: `ทะลุ`, `ทาสี`)  
  ปลั๊กอินนี้ทำให้โทเคนพื้นหลังของโฮสต์จำนวนหนึ่งโปร่งแสงเพื่อให้วอลเปเปอร์ทะลุ ปลั๊กอินอื่นที่ทาสีพื้นผิวด้วยโทเคนเดียวกันจะโปร่งแสงตามและชนกับข้อความที่เลื่อนข้างใต้ เมื่อเปิดใช้ ปลั๊กอินเหล่านั้นจะถูกตรวจจับและพื้นผิวของมันถูกตรึงให้มีความหนาแน่นที่อ่านได้ — นอกเหนือจากสไลเดอร์
- `settings.anyBg.strokeHint` (suspicious: `สีต`, `ไวยากรณ์`)  
  วาดโครงข้อความต่อพื้นที่: ความกว้าง 0 ปิด, "auto" เลือกสีตรงข้ามของสีข้อความ และ "theme" ตามสีหลักปัจจุบัน บล็อกโค้ดและไอคอนถูกยกเว้นอัตโนมัติเพื่อไม่ให้ไวยากรณ์หลายสีเลอะ
- `settings.anyBg.strokeAuto` (suspicious: `สต์`)  
  คอนทราสต์อัตโนมัติ
- `settings.anyBg.bgModeStretch` (suspicious: `ยืด`)  
  ยืด
- `settings.anyBg.bgModeTile` (suspicious: `กระเบื้อง`)  
  เรียงกระเบื้อง
- `settings.anyBg.bgModeCenter` (suspicious: `กึ่งกลาง`)  
  กึ่งกลาง
- `settings.anyBg.editorHint` (suspicious: `นิ้ว`)  
  ลากเพื่อย้าย; เลื่อนหรือบีบสองนิ้วเพื่อซูม
- `settings.anyBg.bgMeshDesc` (suspicious: `ก้อน`, `นุ่ม`)  
  เกรเดียนต์หลายก้อนนุ่ม
- `settings.anyBg.bgShaderDesc` (suspicious: `แอนิเมชัน`)  
  แอนิเมชันแสงไหล
- `settings.anyBg.bgPatternDesc` (suspicious: `เรขาคณิต`, `สม่ำเสมอ`)  
  พื้นผิวเรขาคณิตสม่ำเสมอ
- `settings.anyBg.presetNebula` (suspicious: `เนบิวลา`)  
  เนบิวลา
- `settings.anyBg.presetNoise` (suspicious: `นอยส์`)  
  นอยส์ไหล
- `settings.anyBg.presetWaves` (suspicious: `คลื่น`)  
  คลื่น
- `settings.anyBg.presetPoly` (suspicious: `โลว์`)  
  โลว์โพลี
- `settings.anyBg.presetStarfield` (suspicious: `ทุ่ง`)  
  ทุ่งดาว
- `settings.anyBg.schemeHint` (suspicious: `ทิศ`)  
  "Auto" ตามความสว่างของพื้นหลังก่อน (ความสว่างของสีหลักเป็นตัวสำรองเท่านั้น); บังคับสว่าง/มืดจะสร้างจานสีใหม่ในทิศนั้น — เมื่อไม่มีสีหลักที่เลือก ใช้จานสีเทากลาง
- `settings.anyBg.presetGalleryTitle` (suspicious: `เซ็`, `ตลักษณะ`)  
  พรีเซ็ตลักษณะ
- `settings.anyBg.presetDesc_minimal` (suspicious: `เกือบ`)  
  พื้นผิวเกือบทึบ ไม่มีฝ้า
- `settings.anyBg.presetName_midnight` (suspicious: `เที่ยง`)  
  เที่ยงคืน
- `settings.anyBg.presetName_cyber` (suspicious: `ไซเบอร์`)  
  ไซเบอร์
- `settings.anyBg.presetDesc_cyber` (suspicious: `ชมพู`, `เลือน`)  
  ม่วงชมพูสด พื้นผิวเลือน
- `settings.anyBg.presetName_warm` (suspicious: `อุ่น`)  
  แสงแดดอุ่น
- `settings.anyBg.presetDesc_warm` (suspicious: `เหลือง`, `อำพัน`)  
  สีหลักเหลืองอำพันบนพื้นผิวสว่างทึบ
- `settings.anyBg.profilesEmpty` (suspicious: `หน้าตา`)  
  ยังไม่มีโปรไฟล์ที่บันทึก ปรับหน้าตาก่อน แล้วกด "บันทึกปัจจุบัน" เพื่อสลับกลับได้ทุกเมื่อ
- `settings.agentPreset.guideStandardExplanation` (suspicious: `ไหร่`, `หัวข้อ`)  
  ดูวิธีทำงานและเลือกใช้เมื่อไหร่ได้ในหัวข้อคู่มือด้านล่าง
- `settings.pluginInventory.moduleLabel` (suspicious: `โมดูล`)  
  โมดูล
- `sidebarExcel.formulaWarning` (suspicious: `เคลื่อน`)  
  ไฟล์งานนี้มีสูตร ผลลัพธ์ที่แสดงอาจขาดหายหรือคลาดเคลื่อน
- `sidebarExcel.unsupportedNotice` (suspicious: `ประสบการณ์`)  
  ตัวดูตัวอย่างนี้ไม่รองรับ {features} ในไฟล์งานนี้ เปิดด้วยแอปของระบบเพื่อประสบการณ์เต็มรูปแบบ
- `sidebarOffice.invalid` (suspicious: `นามสกุล`)  
  ดูตัวอย่างไฟล์ Office นี้ไม่ได้ อาจเสียหาย ตั้งรหัสผ่านไว้ หรือนามสกุลไฟล์ไม่ถูกต้อง
- `thinking-api.intro` (suspicious: `กังวล`)  
  ตั้งค่า API ภายนอกที่รองรับโหมดการคิดได้ในคลิกเดียว โดยไม่ต้องกังวลเรื่องถูกปฏิเสธด้วยบทบาท developer
- `pluginMarket.factSourceCode` (suspicious: `ซอร์สโค้ด`)  
  ซอร์สโค้ด
- `pluginMarket.versionPrerelease` (suspicious: `จำหน่าย`)  
  รุ่นก่อนวางจำหน่าย
- `pluginManager.error` (suspicious: `เนื่องจาก`)  
  อ่านปลั๊กอินได้ไม่ครบ อาจเนื่องจากปัญหาเครือข่าย
- `pluginManager.restartReasonHostModule` (suspicious: `ดูล`)  
  การเปลี่ยนแปลงถึงมอดูลที่ DSH โหลดไว้เอง
- `pluginManager.restartReasonModuleComparison` (suspicious: `ยกัน`)  
  DSH เทียบปลั๊กอินที่โหลดกับไฟล์ ดว้ ยกันไม่ได้
- `pluginManager.metadataError` (suspicious: `มลู`)  
  ข้อ มลู กำกับแพ็กเกจผิด: {error}
- `pluginManager.previewAlt` (suspicious: `อรข์`)  
  ตัว อย่างฟีเจอรข์ อง {name}
- `pluginManager.previewUnavailable` (suspicious: `อรไ์`)  
  แสดงตัว อย่างฟีเจอรไ์ ม่ได้
- `pluginManager.sourceTitle` (suspicious: `ล่ง`)  
  แหล่งที้มา
- `pluginManager.partsFilterEmpty` (suspicious: `บที้`)  
  ไม่มอี งค์ป์ ระกอบที้ตรงกับคำค้น
- `pluginManager.installGuideIdHint` (suspicious: `คอื`, `ชุน`)  
  ชื่อแพ็กเกจปลั๊กอินคอื ชื่อแพ็กเกจ npm (เช่น dsh-xxx หรือ @author/plugin): ส่วนที้ถัดจาก dsh plugin add หรือ pnpm add ในคำสั่งติดตั้งที README ของปลั๊กอินชุนชน
- `pluginManager.installPathTemplateHint` (suspicious: `คุน`)  
  แทนที่ส่วนนี้ด้วยพาธไปยังโฟลเดอร์ท้องถิ่นของคุนจริง
- `pluginManager.installGuideSafety` (suspicious: `สล่`, `รั่ว`)  
  ติดตั้งแต้ปลั๊กอินทีคุ่นไว้ว้ างใจ: มันรันด้วยสิทธิ์ของคุ่น และอาจทำให้ DeepSeek Harness เสียหายหรือข้อมูสล่งออกแบบรั่วได้
- `pluginManager.installUpgradeNotice` (suspicious: `เสน้`)  
  ปลั๊กอินทางการแบบเรียกอันได้จะเสน้ อ่ ปุ่มอัปเดตเมื่อเวอร์ชันที้ต่างกันจาก DSH ส่วนปลั๊กอินอื่นตอง้ ถอดถอนแล้ว ติดตั้งใหม้เพื่ออัปเดต
- `pluginManager.registryLegend` (suspicious: `วน์`, `นั่น`)  
  npm registry ทีโดาวน์โหลดปลั๊กอินมาจากนั่น
- `pluginManager.registryDefault` (suspicious: `เงื่น`)  
  Registry เพื่อเงื่น
- `pluginManager.registryCustom` (suspicious: `ตัง`)  
  แอดเดรสตังเอง
- `pluginManager.registryCustomInvalid` (suspicious: `ตั้น`)  
  กรอกแอดเดรสขึ้นตั้นด้วย http:// หรือ https://
- `pluginManager.installProblemInvalid` (suspicious: `ชช่`)  
  นี้ไม่ ชช่ ื่อแพ็กเกจหรือแอดเดรสทีติดตั้งได้: {reason}
- `pluginManager.installProblemInstalled` (suspicious: `ข้น`)  
  ปลั๊กอินนี้ติดตั้งแล้ว ถ้าต้อง ข้นเวอร์ชน ถอดถอนแล้ว ติดตั้งใหม้อีกครั้ง
- `pluginManager.installProblemShipped` (suspicious: `ากับ`)  
  ปลั๊กอินนี้ ากับ DSH; อัปเดต DSH จะอัปเดตให้
- `pluginManager.statusMissingFiles` (suspicious: `เกจไมว่`)  
  แพ็กเกจไมว่ างใช้
- `pluginManager.installGithubTimeoutTitle` (suspicious: `เกนิ`)  
  เกนิ เวลาอย่างที GitHub
- `pluginManager.installUseGithubMirror` (suspicious: `รใ์`, `นจีน`)  
  ใช้ ิร์เรอรใ์ นจีน
- `pluginManager.installAwaitingAcceptance` (suspicious: `ยอมรับ`)  
  รอ Host ยอมรับการติดตั้ง การยกเลิกจะลองใหม่อัตโนมัติตามการยืนยัน
- `pluginManager.installBackgroundApplying` (suspicious: `หน่า`)  
  กำลังนำการติดตั้งไปใช้ ยกเลกิ ไม่ได้ ดูความคืบหน่าการติดตั้ง
- `pluginManager.installStarting` (suspicious: `ยืม`)  
  กำลังเตรียืมติดตั้ง…
- `pluginManager.installCancelled` (suspicious: `เหลอื`)  
  ยกเลกิ การติดตั้งแล้ว ปลั๊กอินยังไม่ ได้ ช้งาน และอาจเหลอื ไฟล์ ี้ดาวนโหลด
- `pluginManager.installFailureNetwork` (suspicious: `ข่า`, `ยลม่`)  
  การเชื่อมตอเครื่องข่ายลม่ สลาย
- `pluginManager.installFailureNetworkHost` (suspicious: `ดผ้`, `ถิง`)  
  ถึง {host} ไม่ได้: แอดเดรส GitHub หรือลิงก์ .tgz ไม่ ดผ้ ่าน registry เครื่องนตี้ ้องถิงโดยตรงหรือผ่าน proxy ถาปลั๊กอินนีมี้ ีบน npm ดว้ ย ให้กรอกชื่อแพ็กเกจแทน
- `pluginManager.installFailureDiskFull` (suspicious: `แว่น`)  
  พื้นทีแว่นเต็ม ยุติการติดตั้ง
- `pluginManager.installFailurePermission` (suspicious: `ทธิ์`)  
  ไม่มสี ิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้
- `pluginManager.installFailureBuildBlockedManual` (suspicious: `บลอ๊กสค`, `อนุ`, `ญตัติ`)  
  pnpm บลอ๊กสคริปตต์ ิดตั้ง อนุญตัติ ี allowBuilds ใน pnpm-workspace.yaml แล้ว ลองใหม้
- `pluginManager.installFailureIntegrity` (suspicious: `บรูณณ์`)  
  แพ็กเกจทีดาวนโหลดผิดการตรวจความสมบรูณณ์
- `pluginManager.terminalFailed` (suspicious: `ลม่`)  
  ลม่
- `pluginManager.installDoneOtherVersion` (suspicious: `ห่วง`, `โซ่`, `อุปทาน`, `กว่าง`, `มอ้`, `อันตราย`)  
  ตามนโยบายความปองกน ห่วงโซ่อุปทานของ pnpm (minimumReleaseAge) เวอร์ชันที้เผยแพร่ใหม่กว่างช่วงอายุกำหนดยังไม่ ดต้ ิดตั้งอัตโนมัติ การติดตั้งนี้ ีงใช {installed} แทนเวอร์เช่นลาสุด {version} ซึ่งเวอร์ชันที้เผยแพร่ใหมอ้ าจยังผ่านช่วงรอไม่ รบและอาจมีโค้ดอันตรายหรือ ข้อ บกพร่องทียังไมพ่ บ ถ้าต้อง การ {version} ถอดถอนเวอร์ชนปัจจุบันแล้ว ติดตั้ง {exact} เพื่อรองขอรบั เวอร์ชนนั้น
- `pluginManager.installApprovalDescription` (suspicious: `ลาท์`)  
  แพ็กเกจเหลาท์ ี้มีสคริปตต์ ิดตั้งที pnpm ยังไม่ได้รัน
- `pluginManager.installApprovalConsequence` (suspicious: `จะบัน`, `ทึก`)  
  เมื่ออนุญาต สคริปต์จะรันที่นี่ด้วยสิทธิ์ของคุณ และการอนุญาตจะบันทึกในโปรไฟล์นี้
- `pluginManager.reasonUnaddressable` (suspicious: `แพตช์`, `รนีไ้`, `ด้อย่`)  
  แพตช์โปรไฟล์ระบุรายการนีไ้ มไ่ ด้อย่างเจาะจง
- `pluginManager.reasonAlreadyInstalled` (suspicious: `จนี`)  
  แพ็กเกจนีตี้ ิดตั้งแล้ว ถอดถอนก่อนติดตั้งเวอร์ชนอื่น
- `pluginManager.reasonAmbiguousInstall` (suspicious: `ไมส่`, `ไดว้`)  
  ไมส่ ามารถบอกไดว้ ่าติดตั้งแพ็กเกจใดจากสิ่งทีเปลี่ยนแปลง
- `pluginManager.reasonNotBundle` (suspicious: `จัต`)  
  แพ็กเกจนีไ้ ม่ประกาศบันเดิล จึงบริหารจัตเป็นปลั๊กอินไม่ได้
- `pluginManager.reasonNotRemovable` (suspicious: `ถู้`)  
  แพ็กเกจนีไ้ ม่ไดถู้ กโปรไฟล์ครอบครอง หรือการบริหารจัตงปลั๊กอินตอง้ การมัน
- `pluginManager.reasonStopProfile` (suspicious: `นรี้`, `จดว้`)  
  โปรไฟล์นรี้ ันโดยไม่ม HMR หยุดมันแล้วถอดถอนแพ็กเกจดว้ ย dsh plugin
- `pluginManager.reasonBundleInUse` (suspicious: `นอื่น`, `งบันเดิ`)  
  การตั้งค่านอื่นยังใช้องค์ป์ ระกอบของบันเดิลนอยู่ ตอง้ ปิดมันก่อน
- `settings.shell.timeoutMsHint` (suspicious: `เท่าใด`)  
  หนึ่งคำสั่งรันได้นานเท่าใดก่อนจะถูกบังคับหยุด
- `settings.webSearch.maxUsesHint` (suspicious: `เสริม`)  
  โมเดลเสริมอาจรันการค้นหาได้กี่ครั้งภายในคำขอ Messages เดียว ใช้เฉพาะกับ Messages API
- `cotTranslation.privacy` (suspicious: `ยู่`)  
  เหตุผลแบบขยายจะถูกส่งไปยังบริการที่เลือก อาจมีโค้ดส่วนตัวหรือรายละเอียดแชตอยู่
- `session-inspector.object.accessor` (suspicious: `ประเมิน`)  
  [Getter / Setter, ยังไม่ประเมิน]
- `session-inspector.object.absent` (suspicious: `สล็อต`)  
  [สล็อตว่าง]
- `settings.subagent.subagentModelSelectionOff` (suspicious: `สืบทอด`)  
  เอเจนต์ย่อยใช้ค่าเริ่มต้นที่ตั้งไว้หรือสืบทอดโมเดลของเอเจนต์แม่ ตัวเลือกโมเดลที่บันทึกไว้ยังคงอยู่
- `dsh-android-mobile.privileged.wlStep1` (suspicious: `ที่ไหน`)  
  กดปุ่ม "จับคู่ดีบักไร้สาย" ด้านล่างในหน้านี้ — จะมีแจ้งเตือนค้างในแถบแจ้งเตือนบอกว่าต้องไปที่ไหนต่อ
- `dsh-android-mobile.privileged.rootNote` (suspicious: `กรณี`)  
  เครื่องมือ root จะลงทะเบียนเฉพาะเมื่อตรวจพบ uid 0 เท่านั้น วิธีตรวจคือรัน su -c id -u จริง ๆ แล้วดูว่าผลเป็น 0 หรือไม่ ไม่ใช่ดูว่าไฟล์ su มีอยู่ไหม — สามกรณีที่ไฟล์มีแต่ยกระดับไม่ได้คือ su หลอก, ติด Magisk แต่ยังไม่อนุญาต, และ root ใช้ไม่ได้หลังอัปเกรด ผลจะแคชไว้ 24 ชั่วโมง
- `dsh-android-mobile.bubble.how2` (suspicious: `ดูด`, `ใกล้`)  
  ลากเพื่อย้าย ปล่อยแล้วจะดูดไปขอบจอที่ใกล้ที่สุดและจำตำแหน่งไว้
- `dsh-android-mobile.bubble.note2` (suspicious: `กิน`)  
  ฟองลอยได้ข้อมูลจากสถานะของ foreground service ประมาณวินาทีละครั้ง ไม่กินแบตเพิ่ม — เอนจินทำงานอยู่แล้ว
- `dsh-android-mobile.contact.how3` (suspicious: `ล้วน`)  
  รหัสเป็นตัวเลขล้วนและเลือกไม่ได้ (ปลั๊กอินนี้ปิดการเลือกข้อความทั้งระบบ) จึงต้องใช้ปุ่มคัดลอก
- `dsh-android-mobile.contact.notesTitle` (suspicious: `เคล็ด`)  
  เคล็ดลับการรายงานปัญหา
- `dsh-android-mobile.contact.note1` (suspicious: `เล่า`, `หวัง`)  
  เล่าแบบ "ขั้นตอนไหน คาดหวังอะไร ได้อะไรจริง" — หาสาเหตุง่ายกว่า "ใช้ไม่ได้" มาก
- `dsh-android-mobile.logs.how1` (suspicious: `แม้`)  
  แตะ "เปิดตัวดูบันทึก" — เป็นหน้าจอเนทีฟ และใช้ได้แม้เอนจินไม่เคยเริ่ม
- `dsh-android-mobile.logs.note2` (suspicious: `เมื่อไร`)  
  เนื้อความข้อความไม่ถูกบันทึก — เก็บเฉพาะเมตาดาตา (เซสชันใด เมื่อไร แอ็กชันอะไร)
- `dsh-android-mobile.logs.note3` (suspicious: `ชก็`)  
  โอเวอร์เลย์ตอนเปิด/แครชก็มีปุ่ม "ดูบันทึก" สำหรับตอนที่แอปเองเปิดไม่ขึ้น
- `settings.tokenSaver.saver.card.desc` (suspicious: `ความหน่วง`)  
  ลดการใช้บริบทและความหน่วงอย่างมาก ด้วยการบีบอัดผลลัพธ์เครื่องมือ ปรับรูปพรอมต์ และตอบในเครื่อง
- `settings.tokenSaver.saver.prompts.desc` (suspicious: `สูญ`)  
  ปรับรูปพรอมต์ระบบและความหนาแน่นของประวัติสนทนา โดยไม่สูญเสียข้อกำหนด
- `settings.tokenSaver.saver.prompts.cavemanDesc` (suspicious: `ฟุ่มเฟือย`, `เยิ่นเย้อ`)  
  ตัดคำฟุ่มเฟือยและสำนวนเยิ่นเย้อออกจากพรอมต์
- `settings.tokenSaver.saver.prompts.ponytail` (suspicious: `สไตล์`)  
  สไตล์ Ponytail
- `settings.tokenSaver.saver.prompts.ponytailDesc` (suspicious: `เกียจ`, `ซีเนียร์`, `ต้าน`)  
  โหมดขี้เกียจแบบซีเนียร์: ตอบกระชับ ต่อต้านการสร้างเกินจำเป็น
- `settings.tokenSaver.saver.local.desc` (suspicious: `เชิงกล`)  
  ตอบคำถามเชิงกลไกทั่วไปในเครื่องด้วย 0ms และใช้ 0 token
- `settings.amdFreeModel.section.keyHint` (suspicious: `แล้วไป`)  
  เข้าสู่ระบบที่ developer.amd.com.cn แล้วไปเอาที่หน้าโปรไฟล์ คีย์อยู่ในเครื่องนี้เท่านั้น
- `better-dsh-session-deletetool.batch.desc` (suspicious: `ได้ที`)  
  ทุกบทสนทนา จัดกลุ่มตามเวิร์กสเปซ ใต้แต่ละแถวคือเอเจนต์ย่อยและบทสนทนาที่แยกสาขา ขยายได้ทีละระดับ ติ๊กแถวหนึ่งจะลบทุกอย่างใต้แถวนั้น ติ๊กเอเจนต์ย่อยตัวเดียวจะลบเฉพาะตัวนั้น ลบแล้วกู้คืนไม่ได้
- `better-dsh-session-deletetool.batch.workspaceAll` (suspicious: `เวิร์กสเป`, `ซนี้`)  
  เลือกทุกบทสนทนาในเวิร์กสเปซนี้
- `settings.ourFreeModel.effects.enabled` (suspicious: `เอฟเฟกต์`)  
  เอฟเฟกต์ภาพ
- `settings.ourFreeModel.effects.hint` (suspicious: `เรือง`, `ประดับ`, `ตู้`)  
  สลับแสงเรืองพื้นหลัง เบลอแบบกระจก และการเคลื่อนไหวประดับ ฟีเจอร์ตู้ปลาและโมเดลยังใช้ได้ตามปกติ
- `settings.ourFreeModel.hint.region` (suspicious: `กั้น`)  
  โมเดลนี้ถูกกั้นตามประเทศของ egress เมื่อพร็อกซีเปลี่ยน egress การตรวจครั้งถัดไปจะย้ายมันเข้ากลุ่มที่ใช้ได้เอง
- `settings.ourFreeModel.tag.kiloChannel` (suspicious: `อย่า`)  
  ช่อง Kilo · พูลฟรี (ผู้ให้บริการต้นทางอาจบันทึกพรอมต์ — อย่าส่งเนื้อหาที่ละเอียดอ่อน)
- `settings.ourFreeModel.roster.noLane` (suspicious: `รู้จัก`)  
  โมเดล EAC แบบร่วมจ่ายใช้ไม่ได้ในการประกอบนี้: โฮสต์ไม่ได้ระบุโปรไฟล์เดสก์ท็อปหรือเว็บที่รู้จัก จึงไม่ได้โหลดเลนนี้
- `settings.ourFreeModel.section.egressHint` (suspicious: `ฟิก`, `ผ่า`)  
  ส่งทราฟฟิกการอนุมานและการตรวจผ่านพร็อกซี เพื่อลดขีดจำกัดอัตราต่อ IP
- `settings.ourFreeModel.egress.direct` (suspicious: `เพย์`, `ปิดบัง`)  
  ขณะปิด คำขอจะออกตรง; ที่อยู่ถือเป็นข้อมูลรับรอง — เก็บไว้ในตั้งค่าของเครื่องนี้เท่านั้น ไม่ถูกส่งไปกับเพย์โหลด API ปกติ อ่านได้เฉพาะผ่านปุ่มเปิดเผย และถูกปิดบังไว้ที่นี่โดยค่าเริ่มต้น
- `settings.ourFreeModel.speed.estimated` (suspicious: `แม่นยำ`)  
  ประวัติก่อนอัปเกรดเป็นการประมาณจากคำขอต้นทาง; เทิร์นแม่นยำหลังอัปเกรด
- `settings.ourFreeModel.forward.lanWarn` (suspicious: `ไฟร์วอลล์`, `ทำได้`)  
  ขณะเปิดอยู่ ใครก็ตามที่เข้าถึงเครื่องนี้ได้จะใช้โควตาฟรีของมันด้วยคีย์นั้นได้ เปิดเฉพาะบนเครือข่ายที่คุณเชื่อถือ และจำกัดแหล่งที่มาด้วยไฟร์วอลล์ถ้าทำได้
- `settings.ourFreeModel.picks.sub` (suspicious: `ประโยชน์`)  
  ชุดโปรเจกต์โอเพนซอร์สของผู้เขียนคนเดียวกัน: พาเอเจนต์ไปสู่เดสก์ท็อปแบบเนทีฟ ทำให้ปลั๊กอินหลายร้อยตัวทำงานร่วมกัน และทำงานวิดีโอและงานออกแบบบนเครื่องนี้ หากมีประโยชน์ ดาวคือคำขอบคุณที่พวกเขาเข้าใจ
- `settings.ourFreeModel.picks.foot` (suspicious: `สลิป`, `สนับสนุน`, `ชัดเจน`)  
  ดาวคือสลิปเงินเดือนเดียวที่โปรเจกต์โอเพนซอร์สได้รับ — มันตัดสินว่าผู้เขียนจะมีเวลาให้ได้อีกแค่ไหน ทุกโปรเจกต์ที่นี่ฟรี โอเพนซอร์ส และไม่มีโฆษณา; คลิกเดียวคือการสนับสนุนที่ชัดเจนที่สุด
- `settings.ourFreeModel.picks.design.body` (suspicious: `ผลิต`, `ไปป์`)  
  ปลั๊กอินผลิตวิดีโอและออกแบบในเครื่องสำหรับ DeepSeek Harness: ตัดต่อหลายแทร็ก เทมเพลตและระบบดีไซน์ แคนวาสดูตัวอย่างแบบเนทีฟ และการส่งออกที่เป็นไฟล์จริง ทั้งไปป์ไลน์รันบนเครื่องนี้ ฟุตเทจและโปรเจกต์จึงอยู่ในดิสก์ของคุณเอง
- `settings.ourFreeModel.eac.pillCompat` (suspicious: `ผ่อน`, `ผัน`)  
  ช่วงผ่อนผัน
- `settings.ourFreeModel.sponsor.bannerDescription` (suspicious: `พาร์ตเนอร์`, `คุ้ม`)  
  พาร์ตเนอร์รีเลย์อย่างเป็นทางการของ OFM ให้บริการเข้าถึง API โมเดลที่เสถียร เปิด และคุ้มค่า รองรับ Claude, ChatGPT, Grok, Gemini, GLM, Kimi และ DeepSeek ตั้งค่าครั้งเดียวใช้ได้ทั่วถึงใน Codex, Gemini CLI, Claude Code และเครื่องมือนักพัฒนาอื่น ๆ ชวนคนอื่นรับเงินคืน 10%
- `settings.ourFreeModel.eac.tankLabel` (suspicious: `กดดัน`)  
  แรงกดดันของพูลร่วมจ่าย
- `settings.ourFreeModel.gw.sub` (suspicious: `แก่`)  
  ให้บริการโมเดลในช่องทางผ่าน API ที่เข้ากันได้กับ OpenAI แก่เครื่องนี้และ LAN: เอนด์พอยต์ คีย์ และพอร์ตรีเลย์อยู่ที่นี่
- `settings.ourFreeModel.saver.sub` (suspicious: `อ้วน`)  
  บีบอัดคำขอก่อนออกจากเครื่องนี้: ผลลัพธ์เครื่องมือถูกเข้ารหัสใหม่ พรอมต์ถูกลดความอ้วน และห้าคำตอบถูกสร้างในเครื่องโดยไม่เรียกต้นทาง
- `settings.ourFreeModel.saver.cavemanWhat` (suspicious: `ห้วน`, `ทักทาย`)  
  ตอบห้วน: ตัดคำทักทายและการอธิบายซ้ำ เก็บข้อสรุปและโค้ดไว้
- `settings.ourFreeModel.saver.localHint` (suspicious: `เดิน`)  
  คำตอบของห้าคำขอนี้อยู่ในเนื้อคำขอแล้ว การส่งต่อไปจะเสียการเดินทางหนึ่งรอบและโควตาต้นทางกับคำถามที่มีคำตอบเดียว
- `settings.ourFreeModel.routing.chainsHint` (suspicious: `อ้าง`)  
  เชนถูกเก็บตามลำดับที่คุณใส่; เชนที่อ้างโมเดลซึ่งตอนนี้ใช้ไม่ได้จะถูกเก็บตามที่เขียน และกลับมาเองเมื่อเลนนั้นกลับมา
- `settings.ourFreeModel.routing.emptyHint` (suspicious: `เสมือน`, `ล่ม`)  
  เชนคือโมเดลเสมือน: เลือกในตัวเลือกโมเดล แล้วคำขอจะลองโมเดลจริงบนเชนตามลำดับ ใช้เพื่อครอบคลุมช่วงที่เลนล่ม
- `settings.ourFreeModel.routing.strategy` (suspicious: `กลยุทธ์`)  
  กลยุทธ์
