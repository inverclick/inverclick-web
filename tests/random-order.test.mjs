import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { Script } from 'node:vm';
import ts from 'typescript';

function load(relative, globals = {}) {
  const filename = new URL(relative, import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename.pathname,
  });
  const exports = {};
  new Script(outputText, { filename: filename.pathname }).runInNewContext({ exports, ...globals });
  return exports;
}

const sequence = (...values) => () => values.shift();
const ids = (items) => items.map((item) => item.id).join('');
const items = (...list) => list.map((id) => ({ id, name: id, city: null, department: null }));

const { orderRandomly } = load('../lib/random-order.ts');
const { filterByText } = load('../lib/project-search.ts');

test('orders by a random rank per id without mutating the input', () => {
  const catalog = items('a', 'b', 'c', 'd');
  assert.equal(ids(orderRandomly(catalog, new Map(), sequence(0.7, 0.1, 0.9, 0.4))), 'bdac');
  assert.equal(ids(catalog), 'abcd');
});

test('new results keep known items in place and slot new ones in at random', () => {
  const ranks = new Map();
  assert.equal(ids(orderRandomly(items('a', 'b', 'c'), ranks, sequence(0.7, 0.1, 0.9))), 'bac');
  // Another server order, plus "d" and without "c".
  assert.equal(ids(orderRandomly(items('d', 'b', 'a'), ranks, sequence(0.5))), 'bda');
});

test('filtering by text keeps the random order', () => {
  const ordered = orderRandomly(items('nexo', 'lino', 'torre nexo'), new Map(), sequence(0.9, 0.5, 0.1));
  assert.equal(filterByText(ordered, 'nexo').map((p) => p.id).join(','), 'torre nexo,nexo');
});

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => { data[key] = value; },
  };
}

test('ranks survive in sessionStorage for the tab', () => {
  const sessionStorage = fakeStorage();
  const storage = load('../lib/random-order.ts', { window: { sessionStorage } });
  const ranks = storage.loadSessionRanks();
  storage.orderRandomly(items('a', 'b'), ranks, sequence(0.2, 0.8));
  storage.saveSessionRanks(ranks);

  const restored = storage.loadSessionRanks();
  assert.equal(restored.get('a'), 0.2);
  assert.equal(restored.get('b'), 0.8);
});

test('unavailable or corrupt storage falls back to a fresh order', () => {
  const throwing = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  const blocked = load('../lib/random-order.ts', { window: { sessionStorage: throwing } });
  assert.equal(blocked.loadSessionRanks().size, 0);
  assert.doesNotThrow(() => blocked.saveSessionRanks(new Map([['a', 0.1]])));

  const corrupt = load('../lib/random-order.ts', {
    window: { sessionStorage: fakeStorage({ 'inverclick:projects-random-order': '{"a":"x","b":0.3}' }) },
  });
  assert.deepEqual(JSON.parse(JSON.stringify([...corrupt.loadSessionRanks()])), [['b', 0.3]]);
});
