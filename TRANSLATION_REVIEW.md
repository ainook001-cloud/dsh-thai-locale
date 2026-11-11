# รายการตรวจทานคำแปล

ข้อความเหล่านี้ถูกตั้งข้อสงสัยโดย heuristic (คำที่ปรากฏครั้งเดียวและมีสระ/วรรณยุกต์) แต่**ไม่ได้หมายความว่าผิด** — หลายรายการถูกต้องอยู่แล้ว
สำหรับแต่ละรายการ ให้อ่านข้อความในบริบทจริง แล้วแก้เฉพาะรายการที่ผิดจริงเท่านั้น

> ⚠️ ค่าด้านล่างดึงจาก `lib/client.js` ณ เวลาที่สร้างไฟล์นี้ ถ้ามีการแก้ภายหลัง ให้รันสคริปต์นี้ใหม่

วิธีแก้: แก้ที่ข้อความใน `lib/client.js` (ภายใน `const thDicts`) คงชื่อคีย์และ `{placeholders}` ไว้ให้เหมือนเดิมทุกตัว

จำนวนรายการ: 178

- `chat.message.context.snapshot.supersedes`  
  แทนที่สแนปช็อตก่อนหน้า
- `chat.message.failure.accountSignInRequired`  
  ลงชื่อเข้าใช้ DeepSeek และตรวจสอบว่าปลายทางรองรับการยืนยันตัวตนบัญชี
- `command.description.compact`  
  ย่อประวัติการสนทนาที่เก่ากว่า
- `conversation.attachment.pathUnsupported`  
  เส้นทางมีอักขระที่ใช้ไม่ได้ เปลี่ยนชื่อแล้วลองใหม่
- `conversation.detail.event.neighbors`  
  เหตุการณ์ข้างเคียง
- `conversation.detail.location`  
  บรรทัด {line} คอลัมน์ {column}
- `conversation.detail.plugins.count`  
  {count} ปลั๊กอินไดนามิก
- `conversation.detail.trace.derived`  
  เหตุการณ์ที่สืบมา
- `conversation.detail.yes`  
  ใช่
- `conversation.hero.headline`  
  ก้าวสู่น่านน้ำใหม่
- `conversation.row.commandArguments`  
  อาร์กิวเมนต์คำสั่ง
- `conversation.tool.title.ralph`  
  รันลูป ralph
- `model.error.sessionInUse`  
  เซสชันนี้ถูกใช้งานอยู่ อาจมี DSH ตัวอื่นกำลังรันอยู่ (เช่น dsh web หรือแอปเดสก์ท็อป) ปิดตัวอื่นก่อนแล้วลองใหม่
- `question.error.resubmit`  
  คำตอบไม่ทันก่อนงานเดินต่อ ส่งอีกครั้ง
- `question.nav.cancel`  
  ละทิ้งคำถามทั้งหมด
- `question.reply.label`  
  ตอบคำถามก่อนหน้าที่ค้างอยู่
- `schedule.manager.delivery.retention`  
  กฎการเก็บรักษา
- `schedule.manager.rule.weekdays`  
  จันทร์ถึงศุกร์
- `schedule.manager.timing.zoneNoStored`  
  งานแบบครั้งเดียวเก็บเฉพาะเวลาที่จะทำงาน ไม่ได้เก็บเขตเวลา วันที่และเวลาจะตีความตามเขตเวลาที่เลือก
- `schedule.manager.timing.zoneSearch`  
  ค้นหาด้วย UTC offset, IANA ID หรือชื่อเมือง
- `shortcuts.invalid`  
  การตั้งค่าทางลัดใน {location} เสียหาย สำรองและซ่อมการตั้งค่านี้ แล้ว {reload}
- `shortcuts.application`  
  แอปพลิเคชัน
- `sidebarBrowser.guide.description`  
  ท่องเว็บเพจ
- `sidebarTerminal.inputFull`  
  บัฟเฟอร์อินพุตเต็ม เชื่อมต่อใหม่แล้วลองอีกครั้ง
- `trajectory.section.betweenTurns`  
  ระหว่างเทิร์น
- `trajectory.timeline.ttftDecoding`  
  TTFT {ttft} · ถอดรหัส {decoding}
- `dsh-opencode-patch.description`  
  คืนค่าเฮดเดอร์ต้นทางของเกตเวย์ OpenCode Zen การยึดติดเซสชัน ความเข้ากันได้ของโมเดลฟรี และการแสดงโควต้า Go แบบเรียลไทม์
- `dsh-opencode-patch.endpointHint`  
  เลือกตระกูลเอนด์พอยต์ที่จะส่งคำขอไป อัตโนมัติตามที่อยู่แคตตาล็อกของเกตเวย์เอง อีกสองตัวเลือกบังคับเลือกเอง ตระกูลเก่าและใหม่มีสิทธิ์แยกกันและตอบทั้งคู่ เลือกอันที่บัญชีของคุณใช้งานได้จริง
- `dsh-opencode-patch.storeInspectOrg`  
  องค์กร
- `dsh-opencode-patch.purgeCatalogUnread`  
  ไม่ได้ลบอะไร แต่อ่านแคตตาล็อกไม่ได้ — ลองใหม่เมื่อออนไลน์
- `dsh-opencode-patch.usageSummaryNote`  
  OpenCode เผยแพร่เป็นเปอร์เซ็นต์ต่อช่วงเวลาและไม่มีตัวเลขยอดคงเหลือ ดังนั้น \"เหลือ\" คือส่วนต่างของเปอร์เซ็นต์เดียวกัน — ไม่ใช่ตัวเลขเงิน แผน tier ก็หาไม่ได้เช่นกัน
- `dsh-opencode-patch.usageOverflowBilling`  
  ค่าใช้จ่ายเซสชันแบ่งตามที่แต่ละเทิร์นรัน: คำขอแผน Go หักจากโควต้า Go คำขอ Zen หักจากยอด Zen เมื่อแผน Go ล้น เกตเวย์จะหักส่วนล้นไปที่ Zen — OpenCode ไม่เผยแพร่สัดส่วนในโควต้ากับส่วนเกิน
- `voice-input.setup.estimateNote`  
  นี่เป็นเพียงการประมาณ เครือข่ายช้าอาจใช้เวลานานกว่า ไฟล์ที่ดาวน์โหลดแล้วจะถูกใช้ซ้ำ โมเดลที่ไม่ได้ใช้งานจะคืนหน่วยความจำโดยอัตโนมัติ
- `voice-input.downloadAdvice.certificate`  
  ตรวจสอบนาฬิกาของระบบ ใบรับรองที่เชื่อถือได้ และพร็อกซีของเครื่องที่รัน DSH แล้วลองใหม่
- `voice-input.downloadAdvice.http`  
  ยืนยันว่าที่อยู่ดาวน์โหลดใช้งานได้และพร็อกซีเข้าถึงบริการดาวน์โหลดได้ หรือลองใหม่ภายหลัง
- `voice-input.sourceAutoHelp`  
  เลือกแหล่งที่ตอบสนองก่อนเป็นอันดับแรก หากดาวน์โหลดไม่สำเร็จจะลองแหล่งอื่น
- `voice-input.en`  
  อังกฤษ
- `voice-input.yue`  
  กวางตุ้ง
- `voice-input.ja`  
  ญี่ปุ่น
- `voice-input.ko`  
  เกาหลี
- `settings.account.onboardingWelcome`  
  ยินดีต้อนรับสู่
- `settings.account.onboardingCreditDescription`  
  DeepSeek Harness คิดเครดิตตามจำนวน token ที่โมเดลและเครื่องมือใช้งาน เติมเครดิตล่วงหน้าไว้ งานของคุณจะรันต่อได้ไม่สะดุด ยอดคงเหลือจะถูกใช้เฉพาะตอนที่เอเจนต์กำลังทำงาน
- `settings.account.onboardingOffice`  
  งานเอกสารและงานสร้างสรรค์
- `settings.account.onboardingOfficeDescription`  
  แก้ไขเอกสาร จัดระเบียบข้อมูล สร้างพรีเซนต์ และอื่น ๆ
- `settings.account.onboardingCompactDescription`  
  เห็นแค่ผลลัพธ์ในหน้าจอที่สะอาดเรียบง่าย
- `settings.account.onboardingStandard`  
  เฉพาะประเด็นสำคัญ
- `settings.account.onboardingStandardDescription`  
  เน้นผลลัพธ์ แสดงเฉพาะขั้นตอนและแอ็กชันที่สำคัญที่สุด
- `settings.anyBg.descColor`  
  ลากวงล้อหรือพิมพ์ค่าที่แน่นอน — ทั้ง UI เปลี่ยนตามทันที
- `settings.anyBg.descFont`  
  สลับฟอนต์ของอินเทอร์เฟซด้วยไฟล์ฟอนต์ของคุณ และร่างโครงข้อความแต่ละพื้นที่ให้อ่านชัดบนวอลเปเปอร์ที่ยุ่ง
- `settings.anyBg.descBackground`  
  อัปโหลดรูปภาพหรือวิดีโอเป็นวอลเปเปอร์และวางได้อิสระ หรือให้อัลกอริทึมวาดพื้นหลังแบบเคลื่อนไหว
- `settings.anyBg.descProfile`  
  ใช้พรีเซ็ตคลิกเดียว บันทึกหลายโปรไฟล์แบบมีชื่อ ตั้งเวลาสลับกลางวัน/กลางคืน หรือส่งออก/นำเข้าธีมเต็ม
- `settings.anyBg.colorHint`  
  เลือกเฉดจากวงกลมด้านนอก ปรับความเข้มและความสว่างในสี่เหลี่ยม คลิกสองครั้งที่สไลเดอร์เพื่อรีเซ็ต
- `settings.anyBg.swatchTitle`  
  สวอตช์ด่วน
- `settings.anyBg.uiProduced`  
  โปรดักชัน
- `settings.anyBg.captionInkLabel`  
  หมึกคำบรรยาย
- `settings.anyBg.tpEnabled`  
  ปกป้องพื้นผิวของบุคคลที่สาม
- `settings.anyBg.tpHint`  
  ปลั๊กอินนี้ทำให้โทเคนพื้นหลังของโฮสต์บางส่วนโปร่งแสง วอลเปเปอร์จะทะลุมาเห็น ปลั๊กอินอื่นที่ทาสีพื้นผิวด้วยโทเคนเดียวกันจะโปร่งแสงตามและชนกับข้อความที่เลื่อนข้างใต้ เมื่อเปิดใช้ ปลั๊กอินเหล่านั้นจะถูกตรวจจับและพื้นผิวของมันถูกตรึงให้มีความหนาแน่นที่อ่านได้ — นอกเหนือจากสไลเดอร์
- `settings.anyBg.strokeHint`  
  วาดโครงข้อความต่อพื้นที่: ความกว้าง 0 ปิด, \"auto\" เลือกสีตรงข้ามของสีข้อความ และ \"theme\" ตามสีหลักปัจจุบัน บล็อกโค้ดและไอคอนถูกยกเว้นอัตโนมัติเพื่อไม่ให้ไวยากรณ์หลายสีเลอะ
- `settings.anyBg.strokeAuto`  
  คอนทราสต์อัตโนมัติ
- `settings.anyBg.bgModeStretch`  
  ยืด
- `settings.anyBg.bgModeTile`  
  เรียงกระเบื้อง
- `settings.anyBg.bgModeCenter`  
  กึ่งกลาง
- `settings.anyBg.editorHint`  
  ลากเพื่อย้าย; เลื่อนหรือบีบสองนิ้วเพื่อซูม
- `settings.anyBg.bgMeshDesc`  
  เกรเดียนต์หลายก้อนนุ่ม
- `settings.anyBg.bgShaderDesc`  
  แอนิเมชันแสงไหล
- `settings.anyBg.bgPatternDesc`  
  พื้นผิวเรขาคณิตสม่ำเสมอ
- `settings.anyBg.presetNebula`  
  เนบิวลา
- `settings.anyBg.presetNoise`  
  นอยส์ไหล
- `settings.anyBg.presetWaves`  
  คลื่น
- `settings.anyBg.presetPoly`  
  โลว์โพลี
- `settings.anyBg.presetStarfield`  
  ทุ่งดาว
- `settings.anyBg.schemeHint`  
  \"Auto\" ตามความสว่างของพื้นหลังก่อน (ความสว่างของสีหลักเป็นตัวสำรองเท่านั้น); บังคับสว่าง/มืดจะสร้างจานสีใหม่ในทิศนั้น — เมื่อไม่มีสีหลักที่เลือก ใช้จานสีเทากลาง
- `settings.anyBg.presetGalleryTitle`  
  พรีเซ็ตลักษณะ
- `settings.anyBg.presetDesc_minimal`  
  พื้นผิวเกือบทึบ ไม่มีฝ้า
- `settings.anyBg.presetName_midnight`  
  เที่ยงคืน
- `settings.anyBg.presetName_cyber`  
  ไซเบอร์
- `settings.anyBg.presetDesc_cyber`  
  ม่วงชมพูสด พื้นผิวเลือน
- `settings.anyBg.presetName_warm`  
  แสงแดดอุ่น
- `settings.anyBg.presetDesc_warm`  
  สีหลักเหลืองอำพันบนพื้นผิวสว่างทึบ
- `settings.anyBg.profilesEmpty`  
  ยังไม่มีโปรไฟล์ที่บันทึก ปรับหน้าตาก่อน แล้วกด \"บันทึกปัจจุบัน\" เพื่อสลับกลับได้ทุกเมื่อ
- `settings.agentPreset.guideStandardExplanation`  
  ดูวิธีทำงานและเลือกใช้เมื่อไหร่ได้ในหัวข้อคู่มือด้านล่าง
- `settings.pluginInventory.moduleLabel`  
  โมดูล
- `sidebarExcel.formulaWarning`  
  ไฟล์งานนี้มีสูตร ผลลัพธ์ที่แสดงอาจขาดหายหรือคลาดเคลื่อน
- `sidebarExcel.unsupportedNotice`  
  ตัวดูตัวอย่างนี้ไม่รองรับ {features} ในไฟล์งานนี้ เปิดด้วยแอปของระบบเพื่อประสบการณ์เต็มรูปแบบ
- `sidebarOffice.invalid`  
  ดูตัวอย่างไฟล์ Office นี้ไม่ได้ อาจเสียหาย ตั้งรหัสผ่านไว้ หรือนามสกุลไฟล์ไม่ถูกต้อง
- `thinking-api.intro`  
  ตั้งค่า API ภายนอกที่รองรับโหมดการคิดได้ในคลิกเดียว โดยไม่ต้องกังวลเรื่องถูกปฏิเสธด้วยบทบาท developer
- `pluginMarket.factSourceCode`  
  ซอร์สโค้ด
- `pluginMarket.versionPrerelease`  
  รุ่นก่อนวางจำหน่าย
- `pluginManager.error`  
  อ่านปลั๊กอินได้ไม่ครบ อาจเนื่องจากปัญหาเครือข่าย
- `pluginManager.restartReasonHostModule`  
  การเปลี่ยนแปลงถึงมอดูลที่ DSH โหลดไว้เอง
- `pluginManager.restartReasonModuleComparison`  
  DSH เทียบปลั๊กอินที่โหลดกับไฟล์ด้วยกันไม่ได้
- `pluginManager.metadataError`  
  ข้อมูลกำกับแพ็กเกจผิด: {error}
- `pluginManager.previewAlt`  
  ตัวอย่างฟีเจอร์ของ {name}
- `pluginManager.previewUnavailable`  
  แสดงตัวอย่างฟีเจอร์ไม่ได้
- `pluginManager.sourceTitle`  
  แหล่งที่มา
- `pluginManager.partsFilterEmpty`  
  ไม่มีองค์ประกอบที่ตรงกับคำค้น
- `pluginManager.installGuideIdHint`  
  ชื่อแพ็กเกจปลั๊กอินคือชื่อแพ็กเกจ npm (เช่น dsh-xxx หรือ @author/plugin): ส่วนที่ถัดจาก dsh plugin add หรือ pnpm add ในคำสั่งติดตั้งที่ README ของปลั๊กอินนั้น
- `pluginManager.installPathTemplateHint`  
  แทนที่ส่วนนี้ด้วยพาธไปยังโฟลเดอร์ท้องถิ่นของคุณจริง
- `pluginManager.installGuideSafety`  
  ติดตั้งแต่ปลั๊กอินที่คุณไว้ใจ: มันรันด้วยสิทธิ์ของคุณ และอาจทำให้ DeepSeek Harness เสียหายหรือข้อมูลรั่วไหลได้
- `pluginManager.installUpgradeNotice`  
  ปลั๊กอินทางการแบบดาวน์โหลดได้จะมีปุ่มอัปเดตเมื่อเวอร์ชันต่างจาก DSH ส่วนปลั๊กอินอื่นต้องถอดถอนแล้วติดตั้งใหม่เพื่ออัปเดต
- `pluginManager.registryLegend`  
  npm registry ที่ดาวน์โหลดปลั๊กอินมาจากที่นั่น
- `pluginManager.registryDefault`  
  Registry เบื้องต้น
- `pluginManager.registryCustom`  
  แอดเดรสตั้งเอง
- `pluginManager.registryCustomInvalid`  
  กรอกแอดเดรสที่ขึ้นต้นด้วย http:// หรือ https://
- `pluginManager.installProblemInvalid`  
  นี่ไม่ใช่ชื่อแพ็กเกจหรือแอดเดรสที่ติดตั้งได้: {reason}
- `pluginManager.installProblemInstalled`  
  ปลั๊กอินนี้ติดตั้งแล้ว ถ้าต้องการอัปเดตเวอร์ชัน ให้ถอดถอนแล้วติดตั้งใหม่อีกครั้ง
- `pluginManager.installProblemShipped`  
  ปลั๊กอินนี้มากับ DSH; อัปเดต DSH จะอัปเดตให้เอง
- `pluginManager.statusMissingFiles`  
  แพ็กเกจไม่พร้อมใช้
- `pluginManager.installGithubTimeoutTitle`  
  เกินเวลาอย่างที่ GitHub
- `pluginManager.installUseGithubMirror`  
  ใช้มิเรอร์ในจีน
- `pluginManager.installAwaitingAcceptance`  
  รอ Host ยอมรับการติดตั้ง การยกเลิกจะลองใหม่อัตโนมัติตามการยืนยัน
- `pluginManager.installBackgroundApplying`  
  กำลังนำการติดตั้งไปใช้ ยกเลิกไม่ได้ ดูความคืบหน้าการติดตั้ง
- `pluginManager.installStarting`  
  กำลังเตรียืมติดตั้ง…
- `pluginManager.installCancelled`  
  ยกเลิกการติดตั้งแล้ว ปลั๊กอินยังไม่ได้ใช้งาน และอาจเหลือไฟล์ที่ดาวน์โหลด
- `pluginManager.installFailureNetwork`  
  การเชื่อมต่อเครือข่ายล้มเหลว
- `pluginManager.installFailureNetworkHost`  
  ถึง {host} ไม่ได้: แอดเดรส GitHub หรือลิงก์ .tgz ไม่ผ่าน registry เครื่องนี้ต้องถึงโดยตรงหรือผ่าน proxy ถ้าปลั๊กอินนี้มีบน npm ด้วย ให้กรอกชื่อแพ็กเกจแทน
- `pluginManager.installFailureDiskFull`  
  พื้นทีแว่นเต็ม ยุติการติดตั้ง
- `pluginManager.installFailurePermission`  
  ไม่มีสิทธิ์เขียน จึงติดตั้งปลั๊กอินไม่ได้
- `pluginManager.installFailureBuildBlockedManual`  
  pnpm บล็อกสคริปต์ติดตั้ง อนุญาตใน allowBuilds ของ pnpm-workspace.yaml แล้วลองใหม่
- `pluginManager.installFailureIntegrity`  
  แพ็กเกจที่ดาวน์โหลดไม่ผ่านการตรวจสอบความสมบูรณ์
- `pluginManager.terminalFailed`  
  ล้มเหลว
- `pluginManager.installDoneOtherVersion`  
  ตามนโยบายความปลอดภัยของห่วงโซ่อุปทาน pnpm (minimumReleaseAge) เวอร์ชันที่เผยแพร่ใหม่กว่าช่วงอายุกำหนดยังไม่ถูกติดตั้งอัตโนมัติ การติดตั้งนี้ยังใช้ {installed} แทนเวอร์ชันล่าสุด {version} ซึ่งเวอร์ชันที่เผยแพร่ใหม่อาจยังผ่านช่วงรอไม่ครบและอาจมีโค้ดอันตรายหรือข้อบกพร่องที่ยังไม่พบ ถ้าต้องการ {version} ให้ถอดถอนเวอร์ชันปัจจุบันแล้วติดตั้ง {exact} เพื่อขอรับเวอร์ชันนั้น
- `pluginManager.installApprovalDescription`  
  แพ็กเกจเหล่านี้มีสคริปต์ติดตั้งที่ pnpm ยังไม่ได้รัน
- `pluginManager.installApprovalConsequence`  
  เมื่ออนุญาต สคริปต์จะรันที่นี่ด้วยสิทธิ์ของคุณ และการอนุญาตจะบันทึกในโปรไฟล์นี้
- `pluginManager.reasonUnaddressable`  
  แพตช์โปรไฟล์ระบุรายการนี้ไม่ได้อย่างเจาะจง
- `pluginManager.reasonAlreadyInstalled`  
  แพ็กเกจนี้ติดตั้งแล้ว ถอดถอนก่อนติดตั้งเวอร์ชันอื่น
- `pluginManager.reasonAmbiguousInstall`  
  ไม่สามารถบอกได้ว่าติดตั้งแพ็กเกจใดจากสิ่งที่เปลี่ยนแปลง
- `pluginManager.reasonNotBundle`  
  แพ็กเกจนี้ไม่ได้ประกาศบันเดิล จึงบริหารจัดการเป็นปลั๊กอินไม่ได้
- `pluginManager.reasonNotRemovable`  
  แพ็กเกจนี้ไม่ได้ถูกโปรไฟล์ครอบครอง หรือการบริหารจัดการปลั๊กอินต้องใช้ตัวจัดการ
- `pluginManager.reasonStopProfile`  
  โปรไฟล์นี้รันโดยไม่มี HMR หยุดมันแล้วถอดถอนแพ็กเกจด้วย dsh plugin
- `pluginManager.reasonBundleInUse`  
  การตั้งค่าอื่นยังใช้องค์ประกอบของบันเดิลนี้อยู่ ต้องปิดมันก่อน
- `settings.shell.timeoutMsHint`  
  หนึ่งคำสั่งรันได้นานเท่าใดก่อนจะถูกบังคับหยุด
- `settings.webSearch.maxUsesHint`  
  โมเดลเสริมอาจรันการค้นหาได้กี่ครั้งภายในคำขอ Messages เดียว ใช้เฉพาะกับ Messages API
- `cotTranslation.privacy`  
  เหตุผลแบบขยายจะถูกส่งไปยังบริการที่เลือก อาจมีโค้ดส่วนตัวหรือรายละเอียดแชตอยู่
- `session-inspector.object.accessor`  
  [Getter / Setter, ยังไม่ประเมิน]
- `session-inspector.object.absent`  
  [สล็อตว่าง]
- `settings.subagent.subagentModelSelectionOff`  
  เอเจนต์ย่อยใช้ค่าเริ่มต้นที่ตั้งไว้หรือสืบทอดโมเดลของเอเจนต์แม่ ตัวเลือกโมเดลที่บันทึกไว้ยังคงอยู่
- `dsh-android-mobile.privileged.wlStep1`  
  กดปุ่ม \"จับคู่ดีบักไร้สาย\" ด้านล่างในหน้านี้ — จะมีแจ้งเตือนค้างในแถบแจ้งเตือนบอกว่าต้องไปที่ไหนต่อ
- `dsh-android-mobile.privileged.rootNote`  
  เครื่องมือ root จะลงทะเบียนเฉพาะเมื่อตรวจพบ uid 0 เท่านั้น วิธีตรวจคือรัน su -c id -u จริง ๆ แล้วดูว่าผลเป็น 0 หรือไม่ ไม่ใช่ดูว่าไฟล์ su มีอยู่ไหม — สามกรณีที่ไฟล์มีแต่ยกระดับไม่ได้คือ su หลอก, ติด Magisk แต่ยังไม่อนุญาต, และ root ใช้ไม่ได้หลังอัปเกรด ผลจะแคชไว้ 24 ชั่วโมง
- `dsh-android-mobile.bubble.how2`  
  ลากเพื่อย้าย ปล่อยแล้วจะดูดไปขอบจอที่ใกล้ที่สุดและจำตำแหน่งไว้
- `dsh-android-mobile.bubble.note2`  
  ฟองลอยได้ข้อมูลจากสถานะของ foreground service ประมาณวินาทีละครั้ง ไม่กินแบตเพิ่ม — เอนจินทำงานอยู่แล้ว
- `dsh-android-mobile.contact.how3`  
  รหัสเป็นตัวเลขล้วนและเลือกไม่ได้ (ปลั๊กอินนี้ปิดการเลือกข้อความทั้งระบบ) จึงต้องใช้ปุ่มคัดลอก
- `dsh-android-mobile.contact.notesTitle`  
  เคล็ดลับการรายงานปัญหา
- `dsh-android-mobile.contact.note1`  
  เล่าแบบ \"ขั้นตอนไหน คาดหวังอะไร ได้อะไรจริง\" — หาสาเหตุง่ายกว่า \"ใช้ไม่ได้\" มาก
- `dsh-android-mobile.logs.how1`  
  แตะ \"เปิดตัวดูบันทึก\" — เป็นหน้าจอเนทีฟ และใช้ได้แม้เอนจินไม่เคยเริ่ม
- `dsh-android-mobile.logs.note2`  
  เนื้อความข้อความไม่ถูกบันทึก — เก็บเฉพาะเมตาดาตา (เซสชันใด เมื่อไร แอ็กชันอะไร)
- `dsh-android-mobile.logs.note3`  
  โอเวอร์เลย์ตอนเปิด/แครชก็มีปุ่ม \"ดูบันทึก\" สำหรับตอนที่แอปเองเปิดไม่ขึ้น
- `settings.tokenSaver.saver.card.desc`  
  ลดการใช้บริบทและความหน่วงอย่างมาก ด้วยการบีบอัดผลลัพธ์เครื่องมือ ปรับรูปพรอมต์ และตอบในเครื่อง
- `settings.tokenSaver.saver.prompts.desc`  
  ปรับรูปพรอมต์ระบบและความหนาแน่นของประวัติสนทนา โดยไม่สูญเสียข้อกำหนด
- `settings.tokenSaver.saver.prompts.cavemanDesc`  
  ตัดคำฟุ่มเฟือยและสำนวนเยิ่นเย้อออกจากพรอมต์
- `settings.tokenSaver.saver.prompts.ponytail`  
  สไตล์ Ponytail
- `settings.tokenSaver.saver.prompts.ponytailDesc`  
  โหมดขี้เกียจแบบซีเนียร์: ตอบกระชับ ต่อต้านการสร้างเกินจำเป็น
- `settings.tokenSaver.saver.local.desc`  
  ตอบคำถามเชิงกลไกทั่วไปในเครื่องด้วย 0ms และใช้ 0 token
- `settings.amdFreeModel.section.keyHint`  
  เข้าสู่ระบบที่ developer.amd.com.cn แล้วไปเอาที่หน้าโปรไฟล์ คีย์อยู่ในเครื่องนี้เท่านั้น
- `better-dsh-session-deletetool.batch.desc`  
  ทุกบทสนทนา จัดกลุ่มตามเวิร์กสเปซ ใต้แต่ละแถวคือเอเจนต์ย่อยและบทสนทนาที่แยกสาขา ขยายได้ทีละระดับ ติ๊กแถวหนึ่งจะลบทุกอย่างใต้แถวนั้น ติ๊กเอเจนต์ย่อยตัวเดียวจะลบเฉพาะตัวนั้น ลบแล้วกู้คืนไม่ได้
- `better-dsh-session-deletetool.batch.workspaceAll`  
  เลือกทุกบทสนทนาในเวิร์กสเปซนี้
- `settings.ourFreeModel.effects.enabled`  
  เอฟเฟกต์ภาพ
- `settings.ourFreeModel.effects.hint`  
  สลับแสงเรืองพื้นหลัง เบลอแบบกระจก และการเคลื่อนไหวประดับ ฟีเจอร์ตู้ปลาและโมเดลยังใช้ได้ตามปกติ
- `settings.ourFreeModel.hint.region`  
  โมเดลนี้ถูกกั้นตามประเทศของ egress เมื่อพร็อกซีเปลี่ยน egress การตรวจครั้งถัดไปจะย้ายมันเข้ากลุ่มที่ใช้ได้เอง
- `settings.ourFreeModel.tag.kiloChannel`  
  ช่อง Kilo · พูลฟรี (ผู้ให้บริการต้นทางอาจบันทึกพรอมต์ — อย่าส่งเนื้อหาที่ละเอียดอ่อน)
- `settings.ourFreeModel.roster.noLane`  
  โมเดล EAC แบบร่วมจ่ายใช้ไม่ได้ในการประกอบนี้: โฮสต์ไม่ได้ระบุโปรไฟล์เดสก์ท็อปหรือเว็บที่รู้จัก จึงไม่ได้โหลดเลนนี้
- `settings.ourFreeModel.section.egressHint`  
  ส่งทราฟฟิกการอนุมานและการตรวจผ่านพร็อกซี เพื่อลดขีดจำกัดอัตราต่อ IP
- `settings.ourFreeModel.egress.direct`  
  ขณะปิด คำขอจะออกตรง; ที่อยู่ถือเป็นข้อมูลรับรอง — เก็บไว้ในตั้งค่าของเครื่องนี้เท่านั้น ไม่ถูกส่งไปกับเพย์โหลด API ปกติ อ่านได้เฉพาะผ่านปุ่มเปิดเผย และถูกปิดบังไว้ที่นี่โดยค่าเริ่มต้น
- `settings.ourFreeModel.speed.estimated`  
  ประวัติก่อนอัปเกรดเป็นการประมาณจากคำขอต้นทาง; เทิร์นแม่นยำหลังอัปเกรด
- `settings.ourFreeModel.forward.lanWarn`  
  ขณะเปิดอยู่ ใครก็ตามที่เข้าถึงเครื่องนี้ได้จะใช้โควตาฟรีของมันด้วยคีย์นั้นได้ เปิดเฉพาะบนเครือข่ายที่คุณเชื่อถือ และจำกัดแหล่งที่มาด้วยไฟร์วอลล์ถ้าทำได้
- `settings.ourFreeModel.picks.sub`  
  ชุดโปรเจกต์โอเพนซอร์สของผู้เขียนคนเดียวกัน: พาเอเจนต์ไปสู่เดสก์ท็อปแบบเนทีฟ ทำให้ปลั๊กอินหลายร้อยตัวทำงานร่วมกัน และทำงานวิดีโอและงานออกแบบบนเครื่องนี้ หากมีประโยชน์ ดาวคือคำขอบคุณที่พวกเขาเข้าใจ
- `settings.ourFreeModel.picks.foot`  
  ดาวคือสลิปเงินเดือนเดียวที่โปรเจกต์โอเพนซอร์สได้รับ — มันตัดสินว่าผู้เขียนจะมีเวลาให้ได้อีกแค่ไหน ทุกโปรเจกต์ที่นี่ฟรี โอเพนซอร์ส และไม่มีโฆษณา; คลิกเดียวคือการสนับสนุนที่ชัดเจนที่สุด
- `settings.ourFreeModel.picks.design.body`  
  ปลั๊กอินผลิตวิดีโอและออกแบบในเครื่องสำหรับ DeepSeek Harness: ตัดต่อหลายแทร็ก เทมเพลตและระบบดีไซน์ แคนวาสดูตัวอย่างแบบเนทีฟ และการส่งออกที่เป็นไฟล์จริง ทั้งไปป์ไลน์รันบนเครื่องนี้ ฟุตเทจและโปรเจกต์จึงอยู่ในดิสก์ของคุณเอง
- `settings.ourFreeModel.eac.pillCompat`  
  ช่วงผ่อนผัน
- `settings.ourFreeModel.sponsor.bannerDescription`  
  พาร์ตเนอร์รีเลย์อย่างเป็นทางการของ OFM ให้บริการเข้าถึง API โมเดลที่เสถียร เปิด และคุ้มค่า รองรับ Claude, ChatGPT, Grok, Gemini, GLM, Kimi และ DeepSeek ตั้งค่าครั้งเดียวใช้ได้ทั่วถึงใน Codex, Gemini CLI, Claude Code และเครื่องมือนักพัฒนาอื่น ๆ ชวนคนอื่นรับเงินคืน 10%
- `settings.ourFreeModel.eac.tankLabel`  
  แรงกดดันของพูลร่วมจ่าย
- `settings.ourFreeModel.gw.sub`  
  ให้บริการโมเดลในช่องทางผ่าน API ที่เข้ากันได้กับ OpenAI แก่เครื่องนี้และ LAN: เอนด์พอยต์ คีย์ และพอร์ตรีเลย์อยู่ที่นี่
- `settings.ourFreeModel.saver.sub`  
  บีบอัดคำขอก่อนออกจากเครื่องนี้: ผลลัพธ์เครื่องมือถูกเข้ารหัสใหม่ พรอมต์ถูกลดความอ้วน และห้าคำตอบถูกสร้างในเครื่องโดยไม่เรียกต้นทาง
- `settings.ourFreeModel.saver.cavemanWhat`  
  ตอบห้วน: ตัดคำทักทายและการอธิบายซ้ำ เก็บข้อสรุปและโค้ดไว้
- `settings.ourFreeModel.saver.localHint`  
  คำตอบของห้าคำขอนี้อยู่ในเนื้อคำขอแล้ว การส่งต่อไปจะเสียการเดินทางหนึ่งรอบและโควตาต้นทางกับคำถามที่มีคำตอบเดียว
- `settings.ourFreeModel.routing.chainsHint`  
  เชนถูกเก็บตามลำดับที่คุณใส่; เชนที่อ้างโมเดลซึ่งตอนนี้ใช้ไม่ได้จะถูกเก็บตามที่เขียน และกลับมาเองเมื่อเลนนั้นกลับมา
- `settings.ourFreeModel.routing.emptyHint`  
  เชนคือโมเดลเสมือน: เลือกในตัวเลือกโมเดล แล้วคำขอจะลองโมเดลจริงบนเชนตามลำดับ ใช้เพื่อครอบคลุมช่วงที่เลนล่ม
- `settings.ourFreeModel.routing.strategy`  
  กลยุทธ์
