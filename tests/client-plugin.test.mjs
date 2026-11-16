import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'lib', 'client.js'), 'utf8');

function boot() {
  const regs = [];
  const calls = { langs: [], dicts: [], locale: [], disposed: 0 };
  const sandbox = {
    window: { __ModuleLoader__: { load: (e) => regs.push(e) } },
    console: { log: () => {}, warn: () => {}, error: () => {} },
    module: {},
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: 'lib/client.js' });
  const entry = regs[0];
  const runtime = {
    addLanguage: (l) => { calls.langs.push(l); return () => { calls.disposed++; }; },
    register: (ns, d) => { calls.dicts.push({ ns, d }); return () => { calls.disposed++; }; },
    setLocale: (id) => { calls.locale.push(id); },
  };
  const dispose = entry.factory().apply({ locale: runtime });
  return { entry, calls, dispose };
}

test('ลงทะเบียน entry เดียวชื่อ dsh-thai-locale', () => {
  const { entry } = boot();
  assert.equal(entry.id, 'dsh-thai-locale');
});

test('เพิ่มภาษา th พร้อม fallback en และ th-roast fallback th', () => {
  const { calls } = boot();
  assert.equal(calls.langs.length, 2);
  const th = calls.langs.find((l) => l.id === 'th');
  const roast = calls.langs.find((l) => l.id === 'th-roast');
  assert.ok(th, 'th ไม่ถูกเพิ่ม');
  assert.ok(roast, 'th-roast ไม่ถูกเพิ่ม');
  assert.equal(th.fallback, 'en');
  assert.equal(roast.fallback, 'th');
});

test('ลงทะเบียนทุก namespace', () => {
  const { calls } = boot();
  assert.equal(calls.dicts.length, 75);
});

test('ทุก namespace มีคีย์ไทย และทุก namespace ที่เขียนแล้วมี th-roast', () => {
  const { calls } = boot();
  let withRoast = 0;
  let roastKeys = 0;
  for (const { ns, d } of calls.dicts) {
    assert.ok(d && d.th && Object.keys(d.th).length > 0, ns + ' ว่าง');
    if (!d['th-roast']) continue;
    withRoast++;
    // th-roast เก็บเฉพาะคีย์ที่เขียนใหม่ คีย์ที่เหลือ fallback ไปไทยธรรมดาเอง
    assert.ok(Object.keys(d['th-roast']).length <= Object.keys(d.th).length, ns + ' th-roast มีคีย์เกิน th');
    roastKeys += Object.keys(d['th-roast']).length;
  }
  assert.ok(withRoast > 0, 'ไม่มี namespace ใดมี th-roast');
  console.log('    # namespace ที่มีชุดกวน: ' + withRoast + '/75, คีย์: ' + roastKeys);
});

test('ตั้ง locale เป็น th', () => {
  const { calls } = boot();
  assert.deepEqual(calls.locale, ['th']);
});

test('dispose ทำงาน และเรียก cleanup ครบ', () => {
  const { calls, dispose } = boot();
  const expected = calls.langs.length + calls.dicts.length;
  assert.equal(calls.disposed, 0);
  assert.equal(typeof dispose, 'function');
  dispose();
  assert.equal(calls.disposed, expected);
});
