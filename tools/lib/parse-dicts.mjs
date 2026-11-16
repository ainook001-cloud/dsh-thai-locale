// อ่านและเขียนบล็อกพจนานุกรมใน lib/client.js โดยไม่ใช้ eval
// ใช้ร่วมกันระหว่าง tools/build-roast.mjs กับ tools/check-roast.mjs

const TH_MARK = "const thDicts = ";
const ROAST_MARK = "const thRoastDicts = ";

// หาช่วง { ... } ที่สมดุล เริ่มจากตำแหน่งของเครื่องหมายปีกกาเปิดตัวแรกหลัง marker
export function objectRange(src, marker) {
  const at = src.indexOf(marker);
  if (at < 0) return null;
  const start = src.indexOf("{", at + marker.length);
  if (start < 0) return null;
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let i = start; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === quote) quote = "";
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
    if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return { start, end: i + 1 };
  }
  return null;
}

export function parseObject(src, marker) {
  const range = objectRange(src, marker);
  if (!range) throw new Error("หาบล็อก " + marker.trim() + " ไม่เจอ");
  return { value: JSON.parse(src.slice(range.start, range.end)), range };
}

export function parseDicts(src) {
  const th = parseObject(src, TH_MARK);
  const roast = objectRange(src, ROAST_MARK) ? parseObject(src, ROAST_MARK) : null;
  return { th: th.value, roast: roast && roast.value, roastRange: roast && roast.range };
}

export function replaceRoastBlock(src, dict) {
  const range = objectRange(src, ROAST_MARK);
  const block = ROAST_MARK + JSON.stringify(dict, null, 1) + ";";
  if (!range) {
    const applyAt = src.indexOf("\nfunction apply(ctx)");
    if (applyAt < 0) throw new Error("หา function apply(ctx) ไม่เจอ");
    return src.slice(0, applyAt) + "\n" + block + "\n" + src.slice(applyAt);
  }
  return src.slice(0, range.start - ROAST_MARK.length) + block + src.slice(range.end);
}

export function placeholders(text) {
  return (String(text).match(/\{\w+\}/g) || []).sort().join(",");
}
