import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseDicts, placeholders } from '../tools/lib/parse-dicts.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'lib', 'client.js'), 'utf8');
const { th, roast } = parseDicts(src);
const sourceDir = join(root, 'tools', 'roast-source');

test('ไฟล์ต้นทางที่เขียนแล้ว ต้องเป็น namespace ที่มีจริง', () => {
  const files = readdirSync(sourceDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
  const unknown = files.map((f) => f.replace(/\.json$/, '')).filter((ns) => !th[ns]);
  assert.deepEqual(unknown, [], 'ไฟล์ต้นทางที่ไม่มี namespace รองรับ: ' + unknown.join(', '));
});

test('ไฟล์ต้นทางมีคีย์ตรงกับไทยธรรมดาทุกคีย์', () => {
  const problems = [];
  for (const ns of Object.keys(th)) {
    const file = join(sourceDir, ns + '.json');
    if (!existsSync(file)) continue;
    const entries = JSON.parse(readFileSync(file, 'utf8'));
    const thaiKeys = Object.keys(th[ns]);
    const extra = Object.keys(entries).filter((k) => !(k in th[ns]));
    const missing = thaiKeys.filter((k) => !(k in entries));
    if (missing.length) problems.push(`${ns}: ขาด ${missing.length} คีย์`);
    if (extra.length) problems.push(`${ns}: เกิน ${extra.length} คีย์`);
  }
  assert.deepEqual(problems, []);
});

test('placeholder ในไฟล์ต้นทางตรงกับไทยธรรมดา', () => {
  const problems = [];
  for (const ns of Object.keys(th)) {
    const file = join(sourceDir, ns + '.json');
    if (!existsSync(file)) continue;
    const entries = JSON.parse(readFileSync(file, 'utf8'));
    for (const key of Object.keys(entries)) {
      if (!(key in th[ns])) continue;
      if (placeholders(th[ns][key]) !== placeholders(entries[key])) problems.push(`${ns}.${key}`);
    }
  }
  assert.deepEqual(problems.slice(0, 10), []);
});

test('บล็อก thRoastDicts ที่สร้างแล้วตรงกับไฟล์ต้นทาง', () => {
  assert.ok(roast, 'ไม่พบบล็อก thRoastDicts');
  const problems = [];
  for (const ns of Object.keys(th)) {
    const file = join(sourceDir, ns + '.json');
    if (!existsSync(file)) continue;
    const entries = JSON.parse(readFileSync(file, 'utf8'));
    for (const key of Object.keys(entries)) {
      if (roast[ns]?.[key] !== entries[key]) problems.push(`${ns}.${key}`);
    }
  }
  assert.deepEqual(problems.slice(0, 10), [], 'ต้องรัน node tools/build-roast.mjs ก่อน');
});
