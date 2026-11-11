import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { Script } from 'node:vm';
import ts from 'typescript';

// Runs the real TS modules without Next or a backend: imports are mocked.
function load(relative, modules = {}, globals = {}) {
  const filename = new URL(relative, import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename.pathname,
  });
  const exports = {};
  new Script(outputText, { filename: filename.pathname }).runInNewContext({
    exports, AbortController, setTimeout, clearTimeout, ...globals,
    require: (name) => {
      if (Object.hasOwn(modules, name)) return modules[name];
      throw new Error(`Unmocked import: ${name}`);
    },
  });
  return exports;
}

// Objects built inside a vm context have another Object.prototype: compare plain copies.
const plain = (value) => JSON.parse(JSON.stringify(value));

const rates = load('../lib/credit-rates.ts');
const { CREDIT_RATE_KEYS, CREDIT_RATE_KEY_LIST, parseCreditRates } = rates;
const DEFAULTS = plain(rates.DEFAULT_CREDIT_RATES);

const seed = [
  { key: 'app_credit_ea_by_value', value: '0.1645' },
  { key: 'app_credit_ea_by_quota', value: '0.11' },
  { key: 'app_credit_nmv_by_value', value: '0.012771856489323164' },
  { key: 'app_credit_nmv_by_quota', value: '0.008734593823551902' },
];
// The seed rows with some values replaced: override({ app_credit_ea_by_value: '0.17' }).
const override = (changes) => seed.map((row) => ({ key: row.key, value: changes[row.key] ?? row.value }));
const parse = (rows) => plain(parseCreditRates(rows));

test('the seeded database rows give exactly the default rates', () => {
  assert.deepEqual(parse(seed), DEFAULTS);
});

test('the defaults are the monthly equivalents of the effective annual rates', () => {
  for (const { ea, nmv } of [DEFAULTS.value, DEFAULTS.quota]) {
    assert.ok(Math.abs(nmv - (Math.pow(1 + ea, 1 / 12) - 1)) < 1e-15);
  }
});

test('reads the rates changed in the database, mode by mode', () => {
  const parsed = parse(override({ app_credit_ea_by_value: '0.17', app_credit_nmv_by_value: '0.0131' }));
  assert.deepEqual(parsed.value, { ea: 0.17, nmv: 0.0131 });
  assert.deepEqual(parsed.quota, DEFAULTS.quota);
});

test('without rows (or without data) every mode keeps its defaults', () => {
  for (const empty of [[], null, undefined]) assert.deepEqual(parse(empty), DEFAULTS);
});

test('a mode with a missing key keeps both defaults, never half and half', () => {
  const rows = override({ app_credit_ea_by_value: '0.2' }).filter((row) => row.key !== 'app_credit_nmv_by_value');
  assert.deepEqual(parse(rows).value, DEFAULTS.value);
});

test('invalid values (percentages, commas, signs, text, zero) fall back to the defaults', () => {
  for (const bad of ['', '16.45', '1', '0', '0.0', '0,1645', '-0.1', '.1645', '0.1645 ', '0.1645\n', '0.1645%', '1e-2', 'abc', '0.1234567890123456789']) {
    const parsed = parse(override({ app_credit_ea_by_quota: bad }));
    assert.deepEqual(parsed.quota, DEFAULTS.quota, JSON.stringify(bad));
    assert.deepEqual(parsed.value, DEFAULTS.value);
  }
});

test('ignores unrelated rows', () => {
  assert.deepEqual(parse([...seed, { key: 'app_wpp_contact', value: '573001234567' }]), DEFAULTS);
});

test('the key list covers exactly the four rate keys', () => {
  assert.deepEqual([...CREDIT_RATE_KEY_LIST].sort(), [
    'app_credit_ea_by_quota', 'app_credit_ea_by_value',
    'app_credit_nmv_by_quota', 'app_credit_nmv_by_value',
  ]);
  assert.equal(CREDIT_RATE_KEYS.value.nmv, 'app_credit_nmv_by_value');
  assert.equal(CREDIT_RATE_KEYS.quota.ea, 'app_credit_ea_by_quota');
});

function serviceHarness() {
  let response = { data: seed, error: null };
  const queries = [];
  const client = {
    from(table) {
      const query = { table };
      queries.push(query);
      const builder = {
        select(columns) { query.columns = columns; return builder; },
        in(column, values) { query.in = [column, values]; return builder; },
        abortSignal(signal) { query.signal = signal; return Promise.resolve(response); },
      };
      return builder;
    },
  };
  // unstable_cache is the identity here: caching belongs to Next, not to this code.
  const service = load('../services/get-credit-rates.ts', {
    '@/lib/credit-rates': rates,
    '@/services/supabase/supabase': { supabase: client },
    'next/cache': { unstable_cache: (fn) => fn },
  });
  return { getCreditRates: async () => plain(await service.getCreditRates()), queries, respond(next) { response = next; } };
}

test('the service asks app_config for the four rate keys, with a timeout signal', async () => {
  const { getCreditRates, queries } = serviceHarness();
  assert.deepEqual(await getCreditRates(), DEFAULTS);
  assert.equal(queries.length, 1);
  assert.equal(queries[0].table, 'app_config');
  assert.equal(queries[0].columns, 'key, value');
  assert.equal(queries[0].in[0], 'key');
  assert.deepEqual([...queries[0].in[1]].sort(), [...CREDIT_RATE_KEY_LIST].sort());
  assert.ok(queries[0].signal);
});

test('the service returns the rates stored in the database', async () => {
  const { getCreditRates, respond } = serviceHarness();
  respond({ data: override({ app_credit_ea_by_quota: '0.09', app_credit_nmv_by_quota: '0.0072' }), error: null });
  const result = await getCreditRates();
  assert.deepEqual(result.quota, { ea: 0.09, nmv: 0.0072 });
  assert.deepEqual(result.value, DEFAULTS.value);
});

test('the service never throws: a database error or a missing table gives the defaults', async () => {
  const { getCreditRates, respond } = serviceHarness();
  respond({ data: null, error: { code: 'PGRST205', message: 'Could not find the table public.app_config' } });
  assert.deepEqual(await getCreditRates(), DEFAULTS);
  respond({ data: [], error: null });
  assert.deepEqual(await getCreditRates(), DEFAULTS);
});
