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

const { MINIMUM_AGE, getAge, isAdult } = load('../lib/is-adult.ts');

// Local-time dates (month is 1-based here), like the ones the calendar returns.
const date = (year, month, day) => new Date(year, month - 1, day);
const today = date(2026, 11, 11);

test('the minimum age is 18', () => {
  assert.equal(MINIMUM_AGE, 18);
});

test('turning 18 today counts as an adult, the day before does not', () => {
  assert.equal(isAdult(date(2008, 11, 11), today), true);
  assert.equal(isAdult(date(2008, 11, 12), today), false);
});

test('compares month and day, not just the year', () => {
  assert.equal(isAdult(date(2008, 10, 30), today), true);
  assert.equal(isAdult(date(2008, 12, 1), today), false);
  assert.equal(getAge(date(2008, 12, 1), today), 17);
  assert.equal(getAge(date(2000, 1, 1), today), 26);
});

test('minors, babies and future dates are not adults', () => {
  for (const birth of [date(2015, 5, 5), date(2026, 1, 1), date(2026, 12, 31), date(2030, 1, 1)]) {
    assert.equal(isAdult(birth, today), false);
  }
  assert.ok(getAge(date(2030, 1, 1), today) < 0);
});

test('adults of any age are accepted', () => {
  for (const birth of [date(1990, 6, 15), date(1960, 1, 1), date(1930, 3, 3)]) {
    assert.equal(isAdult(birth, today), true);
  }
});

test('a Feb 29 birthday turns 18 on Mar 1 in non-leap years and on Feb 29 in leap years', () => {
  const leapBirth = date(2008, 2, 29);
  assert.equal(isAdult(leapBirth, date(2026, 2, 28)), false);
  assert.equal(isAdult(leapBirth, date(2026, 3, 1)), true);
  assert.equal(isAdult(date(2004, 2, 29), date(2022, 2, 28)), false);
  assert.equal(isAdult(date(2008, 2, 29), date(2026, 2, 28)), false);
  assert.equal(isAdult(date(2012, 2, 29), date(2030, 3, 1)), true);
});

test('the time of day does not matter', () => {
  const birth = new Date(2008, 10, 11, 23, 59, 59);
  assert.equal(isAdult(birth, new Date(2026, 10, 11, 0, 0, 1)), true);
});

test('an invalid date is not an adult', () => {
  assert.equal(isAdult(new Date(NaN), today), false);
});

test('defaults to the current date', () => {
  const year = new Date().getFullYear();
  assert.equal(isAdult(date(year - 19, 1, 1)), true);
  assert.equal(isAdult(date(year - 17, 12, 31)), false);
});
