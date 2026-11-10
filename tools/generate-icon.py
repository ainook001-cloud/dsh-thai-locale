# สร้าง icon.svg: ธงชาติไทยพลิ้วบนพื้นโค้งมน
# รันจากรากโปรเจกต์: python3 tools/generate-icon.py
# แถบสีถูกสุ่มตามคลื่นไซน์เพื่อให้พลิ้วเหมือนผ้า
import math

TILE = 64
X0, X1 = 10.0, 54.0          # ขอบซ้าย (ด้านเสา) และขอบขวาของธง
Y0, H = 17.0, 30.0           # ขอบบนและความสูงของธง (ธงไทยอัตราส่วน 2:3)
BAND = H / 6.0               # ธงไทย: แดง 1 ขาว 1 น้ำเงิน 2 ขาว 1 แดง 1
STEPS = 22

def wave_y(x, base):
    """ระยะเหลื่อมแนวตั้งของผ้าที่ตำแหน่งแนวนอน x"""
    t = (x - X0) / (X1 - X0)                 # 0 ที่เสา, 1 ที่ขอบอิสระ
    amp = 0.4 + 1.4 * t                      # คลื่นแรงขึ้นเมื่อเข้าใกล้ขอบอิสระ
    return base + amp * math.sin(2 * math.pi * 1.1 * t + 0.6)

def band_polygon(top, bottom):
    """รูปหลายเหลี่ยมปิดของแถบสีหนึ่งแถบระหว่างสองแถว (หน่วยของธง)"""
    pts_top = []
    pts_bot = []
    for i in range(STEPS + 1):
        x = X0 + (X1 - X0) * i / STEPS
        pts_top.append((x, wave_y(x, Y0 + top)))
        pts_bot.append((x, wave_y(x, Y0 + bottom)))
    pts = pts_top + list(reversed(pts_bot))
    return "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + " Z"

def flag_outline():
    pts_top = [(X0 + (X1 - X0) * i / STEPS, wave_y(X0 + (X1 - X0) * i / STEPS, Y0)) for i in range(STEPS + 1)]
    pts_bot = [(X0 + (X1 - X0) * i / STEPS, wave_y(X0 + (X1 - X0) * i / STEPS, Y0 + H)) for i in range(STEPS + 1)]
    pts = pts_top + list(reversed(pts_bot))
    return "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + " Z"

bands = [
    (0.0, BAND, "#A51931"),          # แดง
    (BAND, 2 * BAND, "#FFFFFF"),     # ขาว
    (2 * BAND, 4 * BAND, "#241D4F"), # น้ำเงิน (กว้างสองเท่า อยู่กลาง)
    (4 * BAND, 5 * BAND, "#FFFFFF"), # ขาว
    (5 * BAND, 6 * BAND, "#A51931"), # แดง
]

band_paths = "\n".join(
    f'    <path d="{band_polygon(a, b)}" fill="{c}"/>' for a, b, c in bands
)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{TILE}" height="{TILE}" viewBox="0 0 {TILE} {TILE}">
  <!-- ไอคอนธงชาติไทยแบบพลิ้วเบา ๆ สร้างโดย tools/generate-icon.py; แก้สคริปต์นั้นแล้วรันใหม่เพื่อเปลี่ยนไฟล์นี้ -->
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#E4EAF5"/>
    </linearGradient>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.35"/>
      <stop offset="0.55" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.12"/>
    </linearGradient>
    <clipPath id="flagClip">
      <path d="{flag_outline()}"/>
    </clipPath>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-color="#1E2A4A" flood-opacity="0.28"/>
    </filter>
  </defs>

  <!-- พื้นโค้งมนพร้อมขอบนุ่ม -->
  <rect x="0.5" y="0.5" width="{TILE - 1}" height="{TILE - 1}" rx="14" fill="url(#tile)" stroke="#D5DDEB" stroke-width="1"/>

  <!-- ธง: แถบสี แล้วตามด้วยเงาวาวที่รูปทรงเดียวกับผ้า -->
  <g filter="url(#shadow)">
    <g clip-path="url(#flagClip)">
{band_paths}
      <path d="{flag_outline()}" fill="url(#sheen)"/>
    </g>
  </g>
</svg>
'''
open("icon.svg", "w", encoding="utf-8").write(svg)
print("เขียนแล้ว", len(svg), "ไบต์")
