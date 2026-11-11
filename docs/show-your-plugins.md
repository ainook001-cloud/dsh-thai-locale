# ประกาศสำหรับ DSH GitHub Discussions → Show Your Plugins!

ไฟล์นี้เก็บข้อความพร้อมคัดลอกไปโพสต์ มีสองฉบับ: **อังกฤษ** (สำหรับโพสต์จริง)
และ **ไทย** (คำอธิบายให้เจ้าของโปรเจกต์อ่าน)

ก่อนโพสต์ให้เตรียม **ภาพหน้าจอ 1–2 ภาพ หรือ GIF** ตามกติกาของกลุ่ม

---

## ฉบับภาษาอังกฤษ — คัดลอกไปโพสต์ได้เลย

**Title:**
`dsh-thai-locale — full Thai UI for DeepSeek Harness (4,601 strings + plugin cards + market)`

**Body:**

```markdown
## What it is

**dsh-thai-locale** adds a Thai (`th`) UI language to DeepSeek Harness — the whole
interface, not just a few labels.

- **4,601 UI strings** translated across **75 namespaces** (chat, settings, plugins,
  permissions, schedules, terminal, voice input, …)
- Registers the `th` locale and **switches to Thai automatically on install**
- Fallback order `th → zh → en`, so a missing key never shows a blank label
- Works on **DSH Web and DSH Desktop** (same Web UI under Electron)

### Extras that go beyond the UI itself

| Extra | What it does |
|---|---|
| **22 experimental plugin cards** | Thai names + descriptions for the experimental plugin list (Agent Teams, Voice Input, Auto Review, Persistent Terminal, Session Search, Ralph Loop, Custom Plugin Market, …) |
| **Plugin market metadata** | Thai market name, market description and **all 23 categories**, plus **57 translated plugin descriptions** |

### Engineering notes

- **Zero runtime dependencies**, no network calls, no `localStorage`/`sessionStorage`
- Every locale registration is wrapped in `try/catch` — one failing namespace cannot
  disable the whole plugin
- Ships a dependency-free checker (`npm run check`) that validates the dictionary for
  CJK leftovers, Lao look-alike code points, doubled tone marks and misplaced vowels
- Installer script for the plugin-card locales writes **only new `th.json` files** and
  never modifies files shipped by the app

## Install

```bash
dsh plugin --profile web add dsh-thai-locale
```

Then open DSH → **Settings → Language → ไทย**

To add Thai names for the experimental plugin cards:

```bash
node tools/install-plugin-locales.mjs
```

(Restart DSH once — plugin display names are read at boot.)

## Known limitations (being upfront)

- **Tested on DSH Web only.** DSH Desktop is expected to work (it runs the same Web UI
  under Electron) but has **not** been verified by a real Desktop install.
- **No automated UI tests.** The checker validates the dictionary for CJK leftovers, Lao
  look-alike code points, doubled tone marks and misplaced vowels — it cannot judge whether
  a translation reads well.
- **178 strings are queued for manual review** in `TRANSLATION_REVIEW.md`. Many are already
  correct; the file exists because a heuristic flagged them.
- **Market plugin descriptions: 57 of 5,324 translated.** Categories, market name and
  description are complete.
- Some UI text may still show Chinese or English through the `th → zh → en` fallback.

## Where this is posted

Primary target: **DSH GitHub Discussions → Show Your Plugins!**
Follow-ups that suit better: **DSH Discussions → Q&A** (when asking for testers or
translation review) and the **Awesome DeepSeek Harness** list.

## Links

- Repo: https://github.com/ainook001-cloud/dsh-thai-locale
- Releases: https://github.com/ainook001-cloud/dsh-thai-locale/releases
- Changelog: see the release notes (1.0.0 → 1.0.4)

## Unofficial

This is an **independent community plugin**. It is **not** affiliated with,
endorsed by, or sponsored by DeepSeek AI. The names "DeepSeek" and "DSH" are
used only to describe compatibility. Trademarks belong to their owners.

## Credits & licenses

I did not write the source strings — I translated them. Here is exactly where
each part comes from and what license it carries:

| Part | Where it came from | License |
|---|---|---|
| UI strings being translated (4,601 keys) | [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | **MIT**, Copyright (c) 2026 DeepSeek |
| Experimental plugin names/descriptions (22 packages) | `locale/en.json` + `locale/zh.json` in `@deepseek-ai/dsh-experimental-*` shipped with DSH | **MIT**, Copyright (c) 2026 DeepSeek |
| Plugin market catalog (23 categories, 5,324 entries) | [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | **CC0-1.0** (public domain) |
| Individual plugin descriptions in the market | **Each plugin's own author** | Belongs to each author — this project claims no rights over them |
| Thai translations, icon, scripts, docs (this project) | This repo | **CC BY-NC-SA 4.0** |

Full details are in [NOTICE](https://github.com/ainook001-cloud/dsh-thai-locale/blob/dsh-thai-locale-main/NOTICE).

### One thing worth knowing about the license

The original DSH strings are MIT; my translations and this project as a whole are
**CC BY-NC-SA 4.0** (non-commercial, share-alike). If you need the original strings
for commercial use, take them from DeepSeek Harness under MIT — that right comes
from them, not from me.

## Status

| Part | Coverage |
|---|---|
| UI strings | **4,601 / 4,601** (75 namespaces) |
| Market metadata (name, description, 23 categories) | complete |
| Market plugin descriptions | **57 / 5,324** — growing one category at a time (agi 45, wsl 12) |
| Experimental plugin cards | **22 / 22** |
| Tested platforms | DSH Web `0.2.1-rc.2` ✅ · DSH Desktop ⏳ not yet tested |

Feedback and translation corrections are very welcome — especially from native
Thai speakers who spot awkward wording. The repo keeps a review list
(`TRANSLATION_REVIEW.md`) of strings worth a second look.
```

---

## ฉบับภาษาไทย — สรุปให้เจ้าของโปรเจกต์อ่าน

### สิ่งที่ผมแก้จากร่างเดิมของคุณ

| จุด | เดิม | ที่แก้ |
|---|---|---|
| คําอธิบาย | บอกแค่ "เป็นปลั๊กอิน DSH" | ระบุชัดว่าแปล **4,601 ข้อความ / 75 หมวด** และมีของแถม 2 อย่าง (การ์ดปลั๊กอินทดลอง 22 ตัว, metadata ตลาด) |
| ลิงก์ | ยังไม่มี | ใส่ repo + releases |
| คําระบุไม่เป็นทางการ | คําเดียว | เขียนเป็นประโยคเต็ม พร้อมบอกว่าเครื่องหมายการค้าเป็นของเจ้าของ |
| **เครดิตแหล่งที่มา** | ไม่มี | **ตาราง 5 แถว** บอกว่าส่วนไหนมาจากไหน ลิขสิทธิ์ใคร ใบอนุญาตอะไร |
| สัญญาอนุญาต | ไม่ระบุ | ระบุทั้งของโปรเจกต์ (CC BY-NC-SA 4.0) และของต้นฉบับ (MIT / CC0-1.0) |
| สถานะงาน | ไม่มี | ตารางความคืบหน้า บอกตรง ๆ ว่าคําอธิบายปลั๊กอินแปลแล้ว 57/5,324 |
| ภาพหน้าจอ | กติกากําหนด แต่ยังไม่มี | **ต้องใส่** — แคป 1–2 ภาพ (ดูด้านล่าง) |

### เครดิตที่ต้องเขียน (ตรวจสอบจาก GitHub API แล้ว ไม่ใช่การเดา)

| ส่วน | เจ้าของ | สัญญาอนุญาต |
|---|---|---|
| ข้อความ UI 4,601 คีย์ | DeepSeek (DeepSeek Harness) | MIT — `Copyright (c) 2026 DeepSeek` |
| ชื่อ/คําอธิบายปลั๊กอินทดลอง 22 ตัว | DeepSeek (`@deepseek-ai/dsh-experimental-*`) | MIT |
| แคตตาล็อกตลาด 5,324 รายการ | awesome-dsh-plugin | **CC0-1.0** (สาธารณสมบัติ) |
| คําอธิบายปลั๊กอินแต่ละตัว | **ผู้เขียนปลั๊กอินตัวนั้น ๆ** | ของเจ้าของแต่ละราย |
| คําแปลไทย + ไอคอน + สคริปต์ + เอกสาร | โปรเจกต์นี้ | CC BY-NC-SA 4.0 |

⚠️ จุดที่ต้องระวังตอนโพสต์
1. **อย่าเขียนว่า "ผมเขียนปลั๊กอินนี้"** — เขียนว่า "ผมแปล" เพราะต้นฉบับเป็นของ DeepSeek
2. **อย่าเขียนว่า "100% แปลครบทุกอย่าง"** — เพราะคําอธิบายปลั๊กอินในตลาดยัง 57/5,324
3. **ระบุ CC BY-NC-SA** ให้ชัด เพราะมีเงื่อนไขห้ามใช้เชิงพาณิชย์ + ShareAlike ที่คนใช้ต่อต้องรู้

### ภาพหน้าจอที่ควรถ่าย (กติกากลุ่มกําหนด)

ถ่าย 2 ภาพนี้พอ:
1. **หน้าจอแชทที่เป็นไทย** — เห็นข้อความไทยจริงในการใช้งาน
2. **หน้าตั้งค่าที่เป็นไทย** หรือ **หน้าตลาดปลั๊กอินที่มีชื่อตลาด/23 หมวดเป็นไทย**

ถ้าจะทํา GIF: อัดตอนกดเปลี่ยนภาษาเป็นไทยแล้วหน้าจอเปลี่ยนทันที (สั้น ๆ 3–5 วินาที)
