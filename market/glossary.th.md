# ทะเบียนคำศัพท์ภาษาไทยของตลาด (glossary)

กฎหลัก: **คำที่เป็นชื่อเฉพาะหรือชื่อเทคโนโลยี ให้คงรูปอังกฤษไว้** อย่าแปลและอย่าทับศัพท์เอง
ถ้าเจอคำที่ยังไม่มีในทะเบียน ให้เพิ่มในหมวดที่ตรงก่อนใช้

---

## 1. คำที่ห้ามแปล (คงรูปอังกฤษทุกกรณี)

| คำ | เหตุผล |
|---|---|
| `dsh` / `DSH` / `DeepSeek Harness` | ชื่อผลิตภัณฑ์ |
| `MCP` | ชื่อโปรโตคอล |
| `Cordis` | ชื่อระบบปลั๊กอิน |
| `WSL`, `WSL2` | ชื่อเทคโนโลยีของวินโดวส์ |
| `PowerShell`, `cmd.exe`, `Git Bash`, `bash` | ชื่อเชลล์/โปรแกรม |
| `Git`, `GitHub`, `npm`, `pnpm`, `cron`, `SQLite`, `FTS5`, `RRF` | ชื่อเครื่องมือ/เทคนิค |
| `AGI`, `LLM`, `MoA`, `Mixture-of-Agents`, `MCP server` | ชื่อแนวคิด/สถาปัตยกรรม |
| ชื่อปลั๊กอินทุกตัว (เช่น `dsh-wsl-tool`) | ต้องตรงกับชื่อบน npm |
| ชื่อไฟล์/พาธ (เช่น `.wslconfig`, `wsl.conf`, `.life/`, `agent/turn-stopping`) | ใช้ตรงตัวเท่านั้น |

## 2. คำที่แปลไทยแล้วใช้ให้ตรงกันทุกหมวด

| อังกฤษ | ไทยที่ใช้ |
|---|---|
| agent | เอเจนต์ |
| subagent / sub-agent | ซับเอเจนต์ |
| agent preset | พรีเซ็ตเอเจนต์ |
| session | เซสชัน |
| turn | เทิร์น |
| workspace | เวิร์กสเปซ / พื้นที่ทำงาน |
| tool | เครื่องมือ |
| tool call | การเรียกเครื่องมือ |
| prompt | พรอมป์ |
| system prompt | พรอมป์ระบบ |
| context | บริบท |
| memory | ความจำ |
| skill | สกิล |
| plugin | ปลั๊กอิน |
| preset | พรีเซ็ต |
| panel | แผง |
| sidebar | แถบข้าง |
| composer | ช่องพิมพ์ |
| token | โทเคน |
| setting | การตั้งค่า |
| workflow | ลำดับงาน |
| automation | ระบบอัตโนมัติ |
| review | ตรวจ / ทบทวน |
| verify | ตรวจสอบ |
| evidence | หลักฐาน |
| dependency | ส่วนพึ่งพา |
| build | บิลด์ |
| install | ติดตั้ง |
| release | รีลีส / เวอร์ชันเผยแพร่ |
| repository | รีโป |
| commit | คอมมิต |
| default | ค่าเริ่มต้น |
| fallback | ตัวสำรอง |
| test | ทดสอบ |

## 3. แยกตามหมวด — คำเฉพาะของแต่ละหมวด

### wsl
- คงรูป: `WSL`, `WSL2`, `distro`, `distributions` (เขียนว่า "ดิสโทร" ได้), `/mnt`, `UNC`, `portproxy`, `socat`, `Lucky`, `Explorer`, `Startup`
- แปล: distribution → ดิสโทร · reverse proxy → รีเวิร์สพร็อกซี · long-running process → งานที่ใช้เวลานาน

### agi
- คงรูป: `AGI`, `MoA`, `Mixture-of-Agents`, `LLM`, `SQLite`, `FTS5`, `RRF`, `Cordis`, `Antigravity`, `Muse`, `CLI`, `J-Space`, `L3+`
- แปล: metacognition → การรู้คิดชั้นสูง · continual learning → การเรียนรู้ต่อเนื่อง · world model → แบบจำลองโลก · evaluator → ผู้ประเมิน · false-call/deny → ปฏิเสธการเรียก · judge → ผู้ตัดสิน

### ui
- คงรูป: ชื่อ CSS/โทเคน เช่น `--dsw-*`, ชื่อปลั๊กอิน
- แปล: theme → ธีม · layout → เลย์เอาต์ · animation → แอนิเมชัน · font size → ขนาดตัวอักษร

### tools
- คงรูป: ชื่อเครื่องมือ/คำสั่ง (`grep`, `rg`, `read`, `edit`, `bash`)
- แปล: capability → ความสามารถ · permission → สิทธิ์

### session
- คงรูป: `rpcId`, ชื่ออีเวนต์ (`turn/end`, `agent/inbox/claimed`)
- แปล: transcript → ประวัติการสนทนา · fork → แตกสาขา · archive → เก็บเข้าคลัง

### workflow
- คงรูป: `cron`, ชื่อคิว/ทริกเกอร์
- แปล: trigger → ตัวกระตุ้น · schedule → ตารางเวลา · pipeline → สายงาน

### dev
- คงรูป: `node`, `pnpm`, `tsc`, `esbuild`, ชื่อพาธ
- แปล: runtime → รันไทม์ · debug → ดีบัก · hot reload → โหลดใหม่แบบร้อน

### model
- คงรูป: ชื่อโมเดลและผู้ให้บริการ (เช่น `deepseek-v4.1-flash`, `OpenAI`, `AMD`)
- แปล: provider → ผู้ให้บริการ · reasoning effort → ระดับการให้เหตุผล · quota → โควตา

### security
- คงรูป: `uid`, `root`, `SELinux`, `sandbox` (เขียน "แซนด์บ็อกซ์")
- แปล: permission → สิทธิ์ · approval → การอนุมัติ · privilege → สิทธิ์พิเศษ

### market
- คงรูป: `index.json`, `format`, ชื่อแพ็กเกจ npm
- แปล: index → ดัชนี/คลังรายการ · catalog → แคตตาล็อก · install command → คำสั่งติดตั้ง

### หมวดอื่น ๆ ที่ยังไม่ได้แปล
ตามหมวด: `usage`, `theme`, `identity`, `memory`, `browser`, `vision`, `voice`, `docs`, `skill`, `git`, `notify`, `remote`, `fun`
— ยังไม่มีคำอธิบายแปล ให้เพิ่มคำเฉพาะลงในหมวดนั้นเมื่อเริ่มแปล

## 4. คำที่เคยชนกัน (แก้แล้ว)

| ปัญหา | วิธีแก้ |
|---|---|
| "workspace" แปลได้ทั้ง "เวิร์กสเปซ" และ "พื้นที่ทำงาน" ทำให้ชื่อเมนูกับคำอธิบายไม่ตรงกัน | ใช้ **เวิร์กสเปซ** ในคำอธิบาย และ **พื้นที่ทำงาน** เฉพาะชื่อเมนูในแอป |
| "preset" ทับกับ "agent preset" | เดี่ยว ๆ ใช้ **พรีเซ็ต** · เต็มใช้ **พรีเซ็ตเอเจนต์** |
| "turn" ถูกแปลเป็น "รอบ" ในบางที่ ทำให้สับสนกับ "round" | ใช้ **เทิร์น** เท่านั้น |
| "session" ถูกแปลเป็น "ช่วงสนทนา" ในบางที่ | ใช้ **เซสชัน** เท่านั้น |
