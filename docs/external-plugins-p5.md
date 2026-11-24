# ตรวจข้อมูลคำแปลปลั๊กอินภายนอก (รอบ P5)

วันที่ตรวจ: 2026-11-17
โฟลเดอร์ที่ตรวจ: `/data/user/0/com.dsh.android/files/home/.dsh/tmp/dsh-thai-locale-edit`
วิธีตรวจ: รันคำสั่งจริงทีละชุด แล้วคัดลอกผลดิบมาไว้ในรายงานนี้ ไม่มีการประมาณตัวเลขใด ๆ
ตัวเลข "ที่นับได้" ทุกตัวมาจากคำสั่งที่แสดงไว้ข้าง ๆ กัน

## ตารางสรุป

| ชุดข้อมูล | ที่อ้าง | ที่นับได้ | ผล | หมายเหตุ |
|---|---|---|---|---|
| `plugin-locales/cards/th.txt` | 196 แพ็กเกจ, TAB คั่น 3 คอลัมน์ | 196 บรรทัด / 196 แพ็กเกจไม่ซ้ำ / ทุกบรรทัดมี 3 คอลัมน์ | ตรง | แต่คำอ้างใน AGENTS.md ว่า 196 นี้ "รวมปลั๊กอินทดลอง" **ไม่ตรง** ดูข้อ 1.1 |
| `plugin-locales/ui/*.json` | 9 ปลั๊กอิน รวม 625 รายการ | 9 ไฟล์ รวม 625 คีย์ | ตรง | มี 1 คีย์ค่าว่าง และ 6 ค่าที่ไม่มีอักษรไทย ดูข้อ 2.2 |
| `plugin-locales/dict/our-free-model.txt` | 873 คีย์ | 873 | ตรง | |
| `plugin-locales/dict/amd-free-model.txt` | 188 คีย์ | 188 | ตรง | `wc -l` ได้ 187 เพราะไฟล์ไม่มีขึ้นบรรทัดใหม่ท้ายไฟล์ ดูข้อ 3.2 |
| `plugin-locales/experimental/` | 22 แพ็กเกจ + `index.json` | 22 โฟลเดอร์ (มี `th.json` ครบ) + `index.json` 22 รายการ | ตรง | 1 รายการใน `index.json` ชื่อยังเป็นอังกฤษล้วน ดูข้อ 4.2 |
| `market/` | ตลาด + 23 หมวด + 57 คำอธิบาย | 23 หมวดในสคริปต์, คำอธิบาย 45 + 12 = 57 | ตรงบางส่วน | ยืนยัน "23 หมวด" ได้แค่ในสคริปต์ ต้นฉบับไม่มีในโปรเจกต์ ดูข้อ 5 |
| `locale/en.json` + `locale/th.json` | ชื่อและคำอธิบายปลั๊กอินตัวเอง | 2 คีย์เท่ากันทั้งสองไฟล์ | ตรง | รูปแบบชื่อไม่เหมือนกัน ดูข้อ 6.2 |

สรุปสั้น: ตรง 6 ชุดจาก 6 ชุดในแง่ตัวเลขที่นับได้ แต่เจอปัญหาข้อความอ้างไม่ตรงกับไฟล์จริง 1 จุด (ข้อ 1.1) และปัญหาคุณภาพข้อมูล 4 จุด

---

## 1. `plugin-locales/cards/th.txt`

### 1.1 นับบรรทัดและโครงสร้าง

```bash
cd plugin-locales/cards
wc -l th.txt
awk -F'\t' '{print NF}' th.txt | sort | uniq -c
cut -f1 th.txt | sort | uniq -d | wc -l
cut -f1 th.txt | sort -u | wc -l
```

ผลจริง:

```
196 th.txt
    196 3
0
196
```

- 196 บรรทัด, ทุกบรรทัดแบ่งด้วย TAB ได้ 3 คอลัมน์พอดี (ไม่มีบรรทัดที่ 2 หรือ 4 คอลัมน์)
- ไม่มีแพ็กเกจซ้ำเลย (uniq -d ว่าง)
- จำนวนแพ็กเกจไม่ซ้ำ = 196 เท่ากับจำนวนบรรทัด แปลว่าไม่มีบรรทัดว่างคั่น

### 1.2 ชื่อหรือคำอธิบายที่ยังเป็นอังกฤษล้วน

```bash
node -e '
const fs=require("fs");
const hasThai=s=>/[\u0E00-\u0E7F]/.test(s);
const lines=fs.readFileSync("th.txt","utf8").split("\n").filter(l=>l.length);
let enTitle=[],enDesc=[],empty=[];
lines.forEach((l,i)=>{const p=l.split("\t");
  if(!p[0].trim()||!p[1].trim()||!p[2].trim()) empty.push(i+1);
  if(!hasThai(p[1])) enTitle.push(p[0]);
  if(!hasThai(p[2])) enDesc.push(p[0]);});
console.log("empty",empty.length,"titleNoThai",enTitle.length,"descNoThai",enDesc.length);
'
```

ผลจริง:

```
empty 0 titleNoThai 0 descNoThai 0
```

คอลัมน์ชื่อและคอลัมน์คำอธิบายมีอักษรไทยครบทั้ง 196 บรรทัด ไม่มีคอลัมน์ว่าง

### 1.3 ปัญหาจริงของชุดนี้: คำอ้างใน AGENTS.md

`AGENTS.md` บรรทัด 26 เขียนว่า:

> `tools/install-plugin-cards.mjs` | เขียน `th.json` ของการ์ดปลั๊กอิน 196 แพ็กเกจ (ทดลอง + หลัก + ที่ติดตั้งเอง)

ตรวจไฟล์จริง:

```bash
grep -c "experimental" plugin-locales/cards/th.txt
cut -f1 plugin-locales/cards/th.txt | sed 's|/.*||;s|@||' | sort | uniq -c | sort -rn
```

ผลจริง:

```
0
    192 deepseek-ai
      1 dsh-token-frugal
      1 dsh-our-free-model
      1 dsh-ops
      1 dsh-opencode-patch
```

`plugin-locales/experimental/index.json` มี 22 แพ็กเกจ ชื่อขึ้นต้นด้วย `@deepseek-ai/dsh-experimental-` ทั้งหมด และ **ไม่มีตัวไหนโผล่ใน `cards/th.txt` เลย** (ตรวจแล้ว 0/22)

```bash
node -e '
const fs=require("fs");
const cards=fs.readFileSync("plugin-locales/cards/th.txt","utf8").split("\n").filter(x=>x).map(l=>l.split("\t")[0]);
const idx=JSON.parse(fs.readFileSync("plugin-locales/experimental/index.json","utf8")).map(e=>e.pkg);
console.log(idx.filter(p=>cards.includes(p)).length,"/",idx.length);
'
```

ผลจริง: `0 / 22`

อ่านโค้ด `tools/install-plugin-cards.mjs` ตั้งแต่บรรทัด 19 ถึง 39 แล้ว มันอ่านไฟล์เดียวคือ `plugin-locales/cards/th.txt` แล้ววนเขียน `locale/th.json` ตามรายการในไฟล์นั้น ไม่ได้อ่าน `experimental/` เลย ส่วนปลั๊กอินทดลองใช้สคริปต์อีกตัวคือ `tools/install-plugin-locales.mjs` (AGENTS.md บรรทัด 25)

แปลว่าเลข 196 ถูก แต่คำขยายความ "(ทดลอง + หลัก + ที่ติดตั้งเอง)" ผิด — 196 ตัวนี้คือ 192 ปลั๊กอินหลักใต้ `@deepseek-ai` + 4 ตัวที่ไม่ขึ้นขอบเขต (`dsh-token-frugal`, `dsh-our-free-model`, `dsh-ops`, `dsh-opencode-patch`) ไม่มีปลั๊กอินทดลองอยู่ในนั้น

ข้อควรระวัง: 196 = 192 + 4 และก็เท่ากับ (170 + 22 + 4) ด้วย ถ้าดูแค่ผลรวมจะแยกไม่ออกว่ามีปลั๊กอินทดลองอยู่หรือไม่ ต้องนับตามจริงถึงจะเห็น

---

## 2. `plugin-locales/ui/*.json`

### 2.1 จำนวนไฟล์และคีย์

```bash
cd plugin-locales/ui
ls *.json | wc -l
node -e '
const fs=require("fs");let tot=0;
for(const f of fs.readdirSync(".").filter(x=>x.endsWith(".json"))){
  const o=JSON.parse(fs.readFileSync(f,"utf8"));const k=Object.keys(o).length;tot+=k;
  console.log(f,k);}
console.log("TOTAL",tot);'
```

ผลจริง:

```
9
any-background.json 196
boot-guard.json 70
compaction-threshold.json 23
opencode-patch.json 116
ops.json 52
plugin-guard.json 38
plugin-save-token.json 45
plugin-thinking-api.json 38
token-saver.json 47
TOTAL 625
```

ตรงกับ README.md ตารางบรรทัด 115–127 ทั้งสองด้าน: ชื่อไฟล์ทั้ง 9 ตรงกับชื่อปลั๊กอินในตาราง และยอดรวม 625 ตรง (ผลบวก: 196+70+23+116+52+38+45+38+47 = 625)

### 2.2 คีย์ว่างและค่ายังเป็นอังกฤษ

```bash
node -e '
const fs=require("fs");
const hasThai=s=>/[\u0E00-\u0E7F]/.test(s);
for(const f of fs.readdirSync(".").filter(x=>x.endsWith(".json")).sort()){
  const o=JSON.parse(fs.readFileSync(f,"utf8"));
  let empty=[],noThai=[];
  for(const [k,v] of Object.entries(o)){
    if(typeof v!=="string")continue;
    if(v.trim()==="")empty.push(k); else if(!hasThai(v))noThai.push(k+" => "+v);}
  console.log(f,"empty",empty.length,JSON.stringify(empty),"noThai",noThai.length,JSON.stringify(noThai));}'
```

ผลจริง (ย่อเฉพาะที่พบ):

```
compaction-threshold.json empty 1 [" 轮"] noThai 0 []
plugin-thinking-api.json empty 0 [] noThai 6
  ["智谱 GLM => Zhipu GLM","通义千问 => Qwen","火山引擎 => Volcano Engine",
   "百川 => Baichuan","阶跃星辰 => StepFun","腾讯混元 => Hunyuan"]
ไฟล์อื่นอีก 7 ไฟล์: empty 0 noThai 0
```

สองจุดนี้แยกกันดู:

1. `compaction-threshold.json` มี 1 คีย์ที่ค่าเป็นสตริงว่าง ตรวจไบต์จริงแล้วค่าเป็น `Buffer` ยาว 0 (ว่างจริง ไม่ใช่เว้นวรรค) ส่วนคีย์คือ `" 轮"` ซึ่งเป็นเศษข้อความจีนที่มีเว้นวรรคนำหน้า ตัวคีย์ไม่เกี่ยวกับจำนวนคีย์ (ยังนับ 23 ครบ) แต่ค่านี้ทำให้ข้อความบนจอจะหายไปหนึ่งจุดถ้าคีย์นั้นถูกเรียกใช้
2. `plugin-thinking-api.json` มี 6 ค่าที่ไม่มีอักษรไทยเลย ค่าทั้ง 6 เป็นการถอดเสียงชื่อผู้ให้บริการเป็นอักษรโรมัน ไม่ใช่คำแปลไทย (คีย์จีน → ค่าโรมัน) ถ้าดูตาม `market/glossary.th.md` ที่บอกว่าชื่อเฉพาะคงรูปอังกฤษไว้ การคง `Zhipu GLM` / `Qwen` / `Volcano Engine` ก็เข้าข่ายตั้งใจ แต่ `Baichuan`, `StepFun`, `Hunyuan` เป็นการทับศัพท์แบบจีนกลาง ซึ่งคนไทยส่วนใหญ่อ่านแล้วไม่รู้ว่าเป็นเจ้าไหน ผมคิดว่าควรมีคำไทยกำกับ เช่น `Baichuan (ไป่ชวน)` แต่ไม่ถึงขั้นผิด

หมายเหตุ: จำนวน 196 ของ `any-background.json` ไม่เกี่ยวกับ 196 แพ็กเกจของการ์ดเลย คีย์ของไฟล์นี้คือข้อความ UI ภาษาจีน (เช่น `主题`, `外观定制`, `色彩`) ไม่ใช่ชื่อแพ็กเกจ อ่านผ่าน ๆ จะเข้าใจผิดว่าตรงกันได้ง่ายมาก

---

## 3. `plugin-locales/dict/*.txt`

### 3.1 นับคีย์

```bash
cd plugin-locales/dict
for f in *.txt; do echo "$f NR=$(awk 'END{print NR}' "$f") equals=$(grep -c '^[^=]*=' "$f")"; done
cut -d= -f1 amd-free-model.txt | sort | uniq -d
cut -d= -f1 our-free-model.txt | sort | uniq -d
```

ผลจริง:

```
amd-free-model.txt NR=188 equals=188
our-free-model.txt NR=873 equals=873
(uniq -d ทั้งสองไฟล์ ไม่มีผลลัพธ์ = ไม่มีคีย์ซ้ำ)
```

ตรงทั้งคู่: our-free-model 873 และ amd-free-model 188 ตามที่ README.md บรรทัด 14 อ้าง

### 3.2 กับดักการนับที่เจอจริง

ถ้าใช้ `wc -l` จะได้แบบนี้:

```bash
wc -l dict/our-free-model.txt dict/amd-free-model.txt
```

ผลจริง:

```
   873 dict/our-free-model.txt
   187 dict/amd-free-model.txt
```

`amd-free-model.txt` ได้ 187 ไม่ใช่ 188 เพราะไฟล์**ไม่มีอักขระขึ้นบรรทัดใหม่ปิดท้ายไฟล์** ตรวจไบต์ท้ายไฟล์ด้วย `tail -c 120 ... | od -c` แล้วไบต์สุดท้ายเป็น `262` (อักษรไทย) ไม่ใช่ `\n`

ถ้าใครนับด้วย `wc -l` แล้วรายงานว่า 187 จะกลายเป็นรายงานผิดทั้งที่ไฟล์ถูก ครั้งหน้าควรรันเป็น `awk 'END{print NR}'` หรือ `grep -c` แทน

---

## 4. `plugin-locales/experimental/`

### 4.1 จำนวนโฟลเดอร์และไฟล์

```bash
cd plugin-locales
find experimental -mindepth 1 -maxdepth 1 -type d | wc -l
find experimental -type f | wc -l
find experimental -maxdepth 1 -type f
for d in experimental/*/; do echo "$d -> $(ls "$d")"; done
```

ผลจริง:

```
22
23
experimental/index.json
experimental/dsh-experimental-agent-team-profile/ -> th.json
experimental/dsh-experimental-agent-team/ -> th.json
... (รวม 22 โฟลเดอร์ ทุกโฟลเดอร์มีไฟล์ชื่อ th.json ไฟล์เดียว)
```

22 แพ็กเกจ + `index.json` 1 ไฟล์ = 23 ไฟล์ ตรงตามที่ AGENTS.md บรรทัด 32 อ้าง

### 4.2 ความสอดคล้องระหว่าง `index.json` กับโฟลเดอร์

```bash
cd plugin-locales/experimental
node -e '
const fs=require("fs");
const idx=JSON.parse(fs.readFileSync("index.json","utf8"));
const dirs=fs.readdirSync(".").filter(d=>fs.statSync(d).isDirectory()).sort();
console.log("entries",idx.length,"dirs",dirs.length);
const missing=dirs.filter(d=>!JSON.stringify(idx).includes(d));
const extra=idx.map(e=>e.pkg).filter(p=>!dirs.includes(p.replace("@deepseek-ai/","")));
console.log("dirs not in index:",JSON.stringify(missing));
console.log("index entries without dir:",JSON.stringify(extra));
'
```

ผลจริง:

```
entries 22 dirs 22
dirs not in index: []
index entries without dir: []
```

ตรงกัน 22 ต่อ 22 ไม่มีตัวเกินตัวขาด ชื่อแพ็กเกจใน `index.json` ไม่ซ้ำ และทุกโฟลเดอร์มี `th.json` ที่ parse ได้ (ไม่มีไฟล์ JSON เสีย)

`th.json` ทุกไฟล์มีคีย์เดียวคือ `meta` ซึ่งข้างในมี `title` + `description` ตรงตามรูปแบบเดียวกับที่ `install-plugin-cards.mjs` เขียน ใช้ได้ทั้ง 22 ไฟล์

### 4.3 ชื่อที่ยังเป็นอังกฤษล้วน

```bash
node -e '
const o=require("./index.json");
o.forEach((e,i)=>{if(!/[\u0E00-\u0E7F]/.test(e.title))console.log(i,JSON.stringify(e))});'
```

ผลจริง:

```
20 {"pkg":"@deepseek-ai/dsh-experimental-tool-worktree","title":"Git worktree",
    "description":"ให้เอเจนต์สร้างสาขา Git และ worktree ใหม่ แล้วทํางานต่อในนั้น"}
```

ชื่อเรื่อง 21 จาก 22 มีอักษรไทย ตัวที่ไม่ใช่คือ "Git worktree" ซึ่งเป็นชื่อเทคโนโลยีตาม glossary ที่บอกให้คงรูปอังกฤษ ผมเห็นว่าไม่ควรแก้เป็นไทย แต่คำอธิบายข้าง ๆ เป็นไทยแล้ว และตัวคำว่า `worktree` เองก็ไม่ใช่คำที่คนไทยทั่วไปรู้จัก ถ้าจะให้อ่านง่ายขึ้นอาจเติมวงเล็บอธิบายสั้น ๆ แต่ไม่จำเป็น

---

## 5. `market/`

สิ่งที่โปรเจกต์อ้าง อยู่ใน `market/README.md`:

| บรรทัด | ข้อความ |
|---|---|
| 10 | เติมชื่อตลาด คำอธิบายตลาด **ชื่อ 23 หมวด** และคำอธิบายปลั๊กอินที่แปลแล้ว |
| 19 | ชื่อ **23 หมวด** \| ไทยครบ |
| 20 | คำอธิบายปลั๊กอิน \| **57 รายการ** — `agi` 45, `wsl` 12 |

### 5.1 คำอธิบายปลั๊กอิน 57 รายการ

```bash
cd market
for f in data/th/*.json; do echo "$f keys=$(node -e "console.log(Object.keys(require('./$f')).length)")"; done
node -e '
const fs=require("fs");
const a=JSON.parse(fs.readFileSync("data/th/agi.json","utf8"));
const w=JSON.parse(fs.readFileSync("data/th/wsl.json","utf8"));
const ka=Object.keys(a),kw=Object.keys(w);
const hasThai=s=>/[\u0E00-\u0E7F]/.test(s);
console.log("agi",ka.length,"wsl",kw.length,"union",new Set([...ka,...kw]).size);
console.log("dup ระหว่างสองไฟล์:",ka.filter(k=>kw.includes(k)).length);
console.log("agi noThai",ka.filter(k=>!hasThai(a[k])).length,"wsl noThai",kw.filter(k=>!hasThai(w[k])).length);
console.log("agi empty",ka.filter(k=>!a[k].trim()).length,"wsl empty",kw.filter(k=>!w[k].trim()).length);'
```

ผลจริง:

```
data/th/agi.json keys=45
data/th/wsl.json keys=12
agi 45 wsl 12 union 57
dup ระหว่างสองไฟล์: 0
agi noThai 0 wsl noThai 0
agi empty 0 wsl empty 0
```

ตรง: agi 45, wsl 12, รวม 57 และไม่มีคีย์ซ้ำข้ามไฟล์ ไม่มีค่าว่าง ไม่มีค่าที่เป็นอังกฤษล้วน (ทุกค่าเป็นคำอธิบายไทย)

### 5.2 หมวด 23 หมวด — ยืนยันได้บางส่วน

```bash
cd market
grep -n "CATEGORIES" build-th.mjs
sed -n '19,44p' build-th.mjs
```

ผลจริง — บล็อก `const CATEGORIES = {` เริ่มบรรทัด 20 และมี 23 คีย์:

```
agi, ui, usage, theme, model, identity, session, memory, tools, wsl, browser,
vision, voice, docs, skill, workflow, git, notify, dev, security, remote,
market, fun
```

นับได้ 23 รายการ ตรงกับเลขที่อ้าง

แต่มีข้อจำกัดที่ต้องพูดให้ชัด: ตัวเลข 23 ที่นับได้นี้คือ **จำนวนคีย์ในสคริปต์ของโปรเจกต์** ไม่ใช่จำนวนหมวดของตลาดต้นฉบับ สคริปต์อ่านจำนวนหมวดจริงจาก `index.metadata.categories` ของไฟล์ต้นฉบับ (บรรทัด 57) และค่านั้นต้องส่งเข้ามาทาง argv (บรรทัด 13: `const [, , SRC, OUT] = process.argv`) ซึ่ง**ไฟล์ต้นฉบับ `index.json` ไม่มีอยู่ในโปรเจกต์นี้**

ดังนั้นยืนยันไม่ได้ว่า:
- ตลาดต้นฉบับมี 23 หมวดจริง
- slug ทั้ง 23 ในสคริปต์ตรงกับ slug จริงของต้นฉบับ (ถ้าไม่ตรง ตัวที่เหลือจะไปโผล่ในบรรทัด `หมวดที่ยังไม่มีคําแปล` ตอนรัน)
- 57 ชื่อปลั๊กอินใน `data/th/` มีจริงและอยู่หมวดถูก (สคริปต์ตรวจข้อนี้ตอนบรรทัด 72–108 ซึ่งต้องใช้ต้นฉบับ)

สิ่งที่ยืนยันได้คือรูปทรงข้อมูลในโปรเจกต์เองดี: ไฟล์แยกตามหมวด มี 2 ไฟล์คือ `agi.json` และ `wsl.json` ตรงกับ 2 หมวดที่มีคำอธิบาย

ถ้าต้องการปิดช่องนี้ ต้องเอา `index.json` ต้นฉบับของตลาดมาวางแล้วรัน

```bash
node market/build-th.mjs <index-ต้นฉบับ>.json /tmp/out.json
```

แล้วอ่านบรรทัดสรุปสองบรรทัดท้าย ถ้าไม่มีต้นฉบับ ก็จบแค่เท่านี้

---

## 6. `locale/en.json` และ `locale/th.json`

### 6.1 คีย์

```bash
node -e '
const en=require("./locale/en.json"),th=require("./locale/th.json");
const flat=(o,p="")=>Object.entries(o).flatMap(([k,v])=>typeof v==="object"&&v?flat(v,p+k+"."):[p+k]);
const a=flat(en).sort(),b=flat(th).sort();
console.log("en",a);console.log("th",b);console.log("equal",JSON.stringify(a)===JSON.stringify(b));'
```

ผลจริง:

```
en [ 'meta.description', 'meta.title' ]
th [ 'meta.description', 'meta.title' ]
equal true
```

คีย์ตรงกันเป๊ะทั้งสองไฟล์ ไม่มีคีย์เกินหรือขาด

### 6.2 เนื้อหา

```json
// locale/en.json
{ "meta": {
  "title": "dsh-thai-locale",
  "description": "Thai UI locale for DSH Web: registers the locales `th` and `th-roast` (fallback th → en, th-roast → th → en) and Thai dictionaries for every built-in client namespace." } }

// locale/th.json
{ "meta": {
  "title": "ปลั๊กอินภาษาไทย",
  "description": "ชุดภาษาไทยสําหรับ DSH Web — ลงทะเบียนภาษา th และ th-roast (fallback th → en, th-roast → th → en) และคําแปลไทยสําหรับ namespace ของ client ที่มีมาให้" } }
```

รูปแบบชื่อไม่เหมือนกัน: ไฟล์อังกฤษใช้ชื่อแพ็กเกจ `dsh-thai-locale` ไฟล์ไทยใช้ชื่อที่คนอ่านเข้าใจ `ปลั๊กอินภาษาไทย` ผมคิดว่าแบบนี้ใช้ได้และอ่านง่ายกว่า เพราะผู้ใช้ที่เห็นชื่อไทยจะรู้ทันทีว่าปลั๊กอินนี้ทำอะไร ส่วนคนที่เปิดไฟล์อังกฤษมักเป็นนักพัฒนาที่ต้องการชื่อแพ็กเกจจริงเพื่อไปค้น npm — แต่ถ้าจะให้สม่ำเสมอ ควรเขียนกำกับไว้ในไฟล์ใดไฟล์หนึ่งว่าเจตนาให้ต่างกัน ไม่ใช่ความพลาด

---

## ปัญหาที่พบ เรียงตามความรุนแรง

**1. คำอ้างใน AGENTS.md ไม่ตรงกับไฟล์จริง (ควรแก้)**
บรรทัด 26 อ้างว่า 196 แพ็กเกจใน `cards/th.txt` = "ทดลอง + หลัก + ที่ติดตั้งเอง" แต่ไฟล์จริงไม่มีปลั๊กอินทดลองเลย (0/22) และโค้ด `install-plugin-cards.mjs` ก็ไม่ได้อ่านโฟลเดอร์ `experimental/` ผลคือคนที่อ่าน AGENTS.md จะเข้าใจผิดว่าอัปเดตไฟล์เดียวแล้วปลั๊กอินทดลองได้การ์ดไทยไปด้วย ซึ่งไม่จริง — ปลั๊กอินทดลองต้องรัน `tools/install-plugin-locales.mjs` แยก แก้ข้อความให้ตรงหรือระบุชัดว่า 196 = 192 หลัก + 4 ปลั๊กอินที่ไม่ขึ้นขอบเขต

**2. `plugin-locales/ui/compaction-threshold.json` มีคีย์ที่ค่าว่าง (ควรแก้)**
คีย์ `" 轮"` ค่าเป็นสตริงยาว 0 ไบต์ คีย์ยังมีเว้นวรรคนำหน้าติดมาด้วย ถ้าคีย์นี้ถูกเรียกใช้จริงบนหน้าจอ ข้อความตรงนั้นจะว่างเปล่า ไม่มีอะไรให้ผู้ใช้อ่าน ควรหาว่าต้นฉบับจีนของคีย์นี้คืออะไรแล้วเติมคำไทย หรือถ้าตั้งใจให้ว่างก็ควรมีคอมเมนต์กำกับ ไม่ใช่ปล่อยให้ค่าว่างดูเหมือนของที่ลืมแปล

**3. `plugin-locales/ui/plugin-thinking-api.json` 6 ค่าไม่มีอักษรไทย (ควรพิจารณา)**
`Zhipu GLM`, `Qwen`, `Volcano Engine`, `Baichuan`, `StepFun`, `Hunyuan` สามตัวแรกคนไทยพอรู้จัก สามตัวหลังอ่านแล้วไม่รู้ว่าเป็นเจ้าไหน ควรเติมคำไทยกำกับ ไม่ต้องรื้อ เพราะตาม glossary แล้วชื่อเฉพาะคงรูปอังกฤษได้

**4. `plugin-locales/experimental/index.json` ชื่อเดียวไม่มีอักษรไทย (รับได้)**
`Git worktree` ของ `@deepseek-ai/dsh-experimental-tool-worktree` ตามนโยบาย glossary แล้วถูก แต่คำว่า worktree ไม่อยู่ในรายการคำที่คนไทยคุ้น ถ้าจะให้อ่านง่ายขึ้นเติมวงเล็บอธิบายสั้น ๆ ได้

**5. `locale/en.json` กับ `locale/th.json` ใช้ชื่อคนละแบบ (รับได้)**
`dsh-thai-locale` กับ `ปลั๊กอินภาษาไทย` ไม่ผิดอะไร แต่ควรเขียนเจตนาไว้กันคนแก้ทีหลังมาเปลี่ยนให้ตรงกันโดยไม่รู้เหตุผล

**6. กับดักการนับด้วย `wc -l` (ข้อควรระวัง ไม่ใช่บั๊ก)**
`amd-free-model.txt` ไม่มีขึ้นบรรทัดใหม่ท้ายไฟล์ ทำให้ `wc -l` ได้ 187 ขณะที่จำนวนคีย์จริงคือ 188 ครั้งหน้าถ้านับไฟล์ลักษณะเดียวกันให้ใช้ `awk 'END{print NR}'` หรือ `grep -c '='`

---

## สิ่งที่ตรวจไม่ได้ และเพราะอะไร

**1. ตลาดต้นฉบับมี 23 หมวดจริงไหม** — ตรวจไม่ได้ เพราะไฟล์ `index.json` ต้นฉบับ (format 1 ของ awesome-dsh-plugin) ไม่มีอยู่ในโปรเจกต์ `build-th.mjs` รับพาธต้นฉบับทาง argv (บรรทัด 13) และไม่มีการฝังค่าเอาไว้ ยืนยันได้แค่ว่าสคริปต์มีคำแปลชื่อหมวด 23 รายการ ถ้าอยากปิดช่องนี้ต้องหาต้นฉบับมาวางแล้วรันสคริปต์

**2. ชื่อปลั๊กอิน 57 รายการใน `market/data/th/` มีจริงและอยู่หมวดถูกไหม** — ตรวจไม่ได้ด้วยเหตุผลเดียวกัน การตรวจข้อนี้อยู่ใน `build-th.mjs` บรรทัด 72–108 ซึ่งเทียบกับต้นฉบับ ถ้าไม่มีต้นฉบับก็เทียบได้แค่ว่าคีย์ไม่ซ้ำกันเอง

**3. เลข 196 ของการ์ดตรงกับแพ็กเกจที่ติดตั้งจริงในเครื่องไหม** — ตรวจไม่ได้ เพราะต้องอ่านรายการแพ็กเกจใน `node_modules` ของเอนจินและของโปรไฟล์ (`/data/user/0/com.dsh.android/files/engine/node_modules` กับ `$HOME/.dsh/profiles/web/node_modules`) ซึ่งอยู่นอกโฟลเดอร์งานนี้ และสคริปต์เองก็รายงานเป็น "หาโฟลเดอร์ไม่เจอ N แพ็กเกจ" ตอนรัน ไม่ใช่ค่าที่ฝังอยู่ในไฟล์

**4. `wc -l` ของ `cards/th.txt` ตรงกับจำนวนเรกคอร์ดจริงไหมในระดับไบต์** — ตรวจได้แค่ระดับบรรทัด ในรายงานนี้ยึด `awk 'END{print NR}'` และการนับจำนวนคีย์ไม่ซ้ำ ซึ่งได้ 196 เท่ากันทั้งสามวิธี (บรรทัด / NR / uniq) จึงถือว่าตรง ไม่มีช่องให้คลาดเคลื่อนแบบไฟล์ `amd-free-model.txt`

---

## คำสั่งที่ใช้ตรวจทั้งหมด (รวบไว้รันซ้ำได้)

```bash
cd /data/user/0/com.dsh.android/files/home/.dsh/tmp/dsh-thai-locale-edit

# 1 การ์ด
wc -l plugin-locales/cards/th.txt
awk -F'\t' '{print NF}' plugin-locales/cards/th.txt | sort | uniq -c
cut -f1 plugin-locales/cards/th.txt | sort | uniq -d | wc -l
grep -c experimental plugin-locales/cards/th.txt

# 2 UI
ls plugin-locales/ui/*.json | wc -l
node -e 'for(const f of require("fs").readdirSync("plugin-locales/ui"))if(f.endsWith(".json"))console.log(f,Object.keys(require("../plugin-locales/ui/"+f)).length)'

# 3 พจนานุกรม
for f in plugin-locales/dict/*.txt; do echo "$f $(awk 'END{print NR}' "$f")"; done

# 4 ปลั๊กอินทดลอง
find plugin-locales/experimental -mindepth 1 -maxdepth 1 -type d | wc -l
find plugin-locales/experimental -type f | wc -l

# 5 ตลาด
node -e 'console.log(Object.keys(require("./market/data/th/agi.json")).length,Object.keys(require("./market/data/th/wsl.json")).length)'
grep -n "const CATEGORIES" -A 25 market/build-th.mjs

# 6 โลแคลของปลั๊กอินเอง
node -e 'console.log(Object.keys(require("./locale/en.json")),Object.keys(require("./locale/th.json")))'
```

หมายเหตุเรื่องพาธ: โฟลเดอร์งานนี้เข้าถึงได้สองทาง (มี symlink อยู่) ทั้ง
`/data/user/0/com.dsh.android/files/home/.dsh/tmp/dsh-thai-locale-edit` และ
`/data/user/0/com.dsh.android/files/termux/home/.dsh/tmp/dsh-thai-locale-edit`
เป็นโฟลเดอร์เดียวกัน คำสั่งทั้งหมดในรายงานนี้ใช้พาธแบบแรกและรันจากในโฟลเดอร์งาน

ระหว่างตรวจไม่มีการแก้ไฟล์ใด ๆ ในโปรเจกต์ เขียนไฟล์ใหม่ไฟล์เดียวคือรายงานฉบับนี้

`git status --porcelain` หลังตรวจเสร็จได้:

```
 M goldfish_review_report.md
?? docs/external-plugins-p5.md
```

`?? docs/external-plugins-p5.md` คือรายงานฉบับนี้ ส่วน ` M goldfish_review_report.md` **ไม่ใช่ผลของการตรวจรอบนี้** — เวลาที่แก้ไฟล์คือ 2026-11-16 10:06 ซึ่งก่อนหน้าที่จะเริ่มตรวจ (2026-11-17 14:16) และไม่มีคำสั่งใดในรายงานนี้เขียนไฟล์นั้น ผมรายงานไว้ตรงนี้เพื่อไม่ให้เข้าใจผิดว่าเป็นความเสียหายจากรอบนี้
