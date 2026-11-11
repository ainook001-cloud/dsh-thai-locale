#!/usr/bin/env node
/**
 * สร้าง index.json ภาษาไทยสำหรับตลาดปลั๊กอิน DSH
 *
 * อ่าน index.json ต้นฉบับ (format 1 ของ awesome-dsh-plugin) แล้วเติมภาษาไทย
 * เฉพาะส่วนที่เป็น "คำศัพท์ของตลาด" คือ ชื่อตลาด คำอธิบายตลาด และชื่อหมวดทั้ง 23
 * และคำอธิบายปลั๊กอินรายตัวที่แปลแล้วใน data/th/<หมวด>.json (เฉพาะรายการที่ชื่อและหมวดตรงกับต้นฉบับ)
 *
 * รัน: node build-th.mjs <index.json ต้นฉบับ> <ไฟล์ปลายทาง>
 */
import fs from 'node:fs'

const [, , SRC, OUT] = process.argv
if (!SRC || !OUT) {
  console.error('ใช้: node build-th.mjs <ต้นฉบับ> <ปลายทาง>')
  process.exit(1)
}

/** ชื่อหมวดภาษาไทย */
const CATEGORIES = {
  agi: 'โครงสร้าง AGI',
  ui: 'ปรับแต่งหน้าจอ',
  usage: 'การใช้และค่าใช้จ่าย',
  theme: 'ธีมและรูปลักษณ์',
  model: 'โมเดลและผู้ให้บริการ',
  identity: 'ตัวตนและการสื่อสาร',
  session: 'เซสชันและข้อความ',
  memory: 'ความจำ',
  tools: 'เครื่องมือและความสามารถ',
  wsl: 'WSL และการเชื่อมกับวินโดวส์',
  browser: 'เบราว์เซอร์และเว็บ',
  vision: 'ภาพและการมองเห็น',
  voice: 'เสียงและเครื่องเสียง',
  docs: 'เอกสารและการแสดงผล',
  skill: 'สกิล',
  workflow: 'ลำดับงานและระบบอัตโนมัติ',
  git: 'Git และการตรวจโค้ด',
  notify: 'การแจ้งเตือนและการเชื่อมต่อ',
  dev: 'การพัฒนาและรันระบบ',
  security: 'ความปลอดภัยและสิทธิ์',
  remote: 'รีโมตและมือถือ',
  market: 'ตลาดและตัวจัดการปลั๊กอิน',
  fun: 'ของเล่นและความสนุก',
}

const index = JSON.parse(fs.readFileSync(SRC, 'utf8'))

if (index.format !== 1) throw new Error('ไฟล์ต้นฉบับไม่ใช่ format 1')

index.title = { ...(index.title ?? {}), th: 'ตลาดปลั๊กอิน DSH' }
index.description = {
  ...(index.description ?? {}),
  th: 'รวมปลั๊กอินของ DeepSeek Harness (dsh) ที่ค้นหาได้ พร้อมคำสั่งติดตั้งและลิงก์ต้นทาง',
}

let missing = 0
for (const [slug, entry] of Object.entries(index.metadata.categories)) {
  const th = CATEGORIES[slug]
  if (th === undefined) {
    missing++
    continue
  }
  entry.title = { ...(entry.title ?? {}), th }
}

fs.writeFileSync(OUT, JSON.stringify(index))
console.log('เขียนแล้ว:', OUT)
console.log('ปลั๊กอิน:', index.plugins.length)
console.log('หมวดที่แปล:', Object.keys(CATEGORIES).length - missing, '/', Object.keys(index.metadata.categories).length)
if (missing > 0) console.log('หมวดที่ยังไม่มีคำแปล:', missing)

// ─── คำอธิบายปลั๊กอินรายตัว: รวมจากไฟล์แยกตามหมวด (data/th/<หมวด>.json) ───
const TH_DIR = new URL('./data/th/', import.meta.url)
let files = []
try {
  files = fs.readdirSync(TH_DIR).filter((name) => name.endsWith('.json'))
} catch {
  files = []
}

const byName = new Map(index.plugins.map((p) => [p.name, p]))
let translated = 0
let skipped = 0
for (const file of files.sort()) {
  const category = file.slice(0, -5)
  const words = JSON.parse(fs.readFileSync(new URL(file, TH_DIR), 'utf8'))
  let hit = 0
  const wrong = []
  for (const [name, text] of Object.entries(words)) {
    const plugin = byName.get(name)
    if (plugin === undefined) {
      wrong.push(name + '(ไม่มีในตลาด)')
      continue
    }
    const own = plugin.metadata?.category ?? '?'
    if (own !== category) {
      wrong.push(name + '(อยู่หมวด ' + own + ')')
      continue
    }
    plugin.description = { ...(plugin.description ?? {}), th: text }
    hit++
  }
  translated += hit
  skipped += wrong.length
  console.log('  -', category + ':', hit, wrong.length > 0 ? 'ไม่ตรง ' + wrong.length + ': ' + wrong.join(', ') : '')
}

console.log('คำอธิบายที่แปลเป็นไทย:', translated, '/', index.plugins.length, '(' + files.length + ' หมวด)')
if (skipped > 0) console.log('ข้ามไป', skipped, 'รายการ')

fs.writeFileSync(OUT, JSON.stringify(index))
console.log('เขียนไฟล์แล้ว:', OUT)
