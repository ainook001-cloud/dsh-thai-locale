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

test('เพิ่มภาษา th พร้อม fallback zh', () => {
  const { calls } = boot();
  assert.equal(calls.langs.length, 1);
  assert.equal(calls.langs[0].id, 'th');
  assert.equal(calls.langs[0].fallback, 'zh');
});

test('ลงทะเบียนทุก namespace', () => {
  const { calls } = boot();
  assert.equal(calls.dicts.length, 75);
});

test('ทุก namespace มีคีย์ภายใน', () => {
  const { calls } = boot();
  for (const { ns, d } of calls.dicts) {
    assert.ok(d && d.th && Object.keys(d.th).length > 0, ns + ' ว่าง');
  }
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
