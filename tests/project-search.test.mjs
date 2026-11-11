import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { Script } from 'node:vm';
import ts from 'typescript';

function load(relative) {
  const filename = new URL(relative, import.meta.url);
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename.pathname,
  });
  const exports = {};
  new Script(outputText, { filename: filename.pathname }).runInNewContext({ exports });
  return exports;
}

const search = load('../lib/project-search.ts');

const medellin = { id: 1, name: 'Medellín' };
const antioquia = { id: 5, name: 'Antioquia' };
const pereira = { id: 2, name: 'Pereira' };
const risaralda = { id: 6, name: 'Risaralda' };
const necocli = { id: 3, name: 'Necoclí' };
const cali = { id: 4, name: 'Cali' };
const valle = { id: 7, name: 'Valle del Cauca' };

const project = (id, name, city, department) => ({
  id, name, photos: [], city, department, typologies: [{ id: `t-${id}` }],
});

const catalog = [
  project('a', 'Nexo 14', pereira, risaralda),
  project('b', 'Lino Condominio', pereira, risaralda),
  project('c', 'Torre Nexo', medellin, antioquia),
  project('d', 'Mirador del Río', medellin, antioquia),
  project('e', 'Annex Plaza', cali, valle),
  project('f', 'Brisas del Mar', necocli, antioquia),
  project('g', 'Ñandú Living', medellin, antioquia),
];

const ids = (projects) => projects.map((p) => p.id).join('');
const plain = (value) => JSON.parse(JSON.stringify(value));

test('normalizes case and accents, including ñ', () => {
  assert.equal(search.normalize('Medellín NECOCLÍ Ñandú').value, 'medellin necocli nandu');
  assert.deepEqual(plain(search.tokenize('  Medellín, Antioquia ')), ['medellin', 'antioquia']);
});

test('free text matches every word against name, city or department', () => {
  assert.equal(ids(search.filterByText(catalog, 'medellin')), 'cdg');
  assert.equal(ids(search.filterByText(catalog, 'nexo pereira')), 'a');
  assert.equal(ids(search.filterByText(catalog, 'NANDU')), 'g');
  assert.equal(ids(search.filterByText(catalog, 'zzz')), '');
  // Blank text returns the same list, untouched.
  assert.equal(search.filterByText(catalog, '   '), catalog);
});

test('works with the card shape, whose city and department have no ids', () => {
  const card = { name: 'Nexo 14', city: { name: 'Pereira' }, department: { name: 'Risaralda' } };
  assert.equal(search.matchesProject(card, 'pereira nexo'), true);
  assert.equal(search.matchesProject({ ...card, city: null }, 'pereira'), false);
});

test('suggests cities grouped with their project count, best match first', () => {
  const { locations } = search.getSearchSuggestions(catalog, 'ne');
  assert.deepEqual(plain(locations[0]), { cityId: 3, departmentId: 5, label: 'Necoclí, Antioquia', count: 1 });
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'antioquia').locations.map((l) => [l.label, l.count])), [
    ['Medellín, Antioquia', 3], ['Necoclí, Antioquia', 1],
  ]);
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'medellin antioquia').locations.map((l) => l.cityId)), [1]);
});

test('suggests projects by name, letting other words match the city', () => {
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'nexo').projects.map((s) => s.project.id)), ['a', 'c']);
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'nex').projects.map((s) => s.project.id)), ['a', 'c', 'e']);
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'nexo medellin').projects.map((s) => s.project.id)), ['c']);
  assert.equal(search.getSearchSuggestions(catalog, 'nexo').projects[0].location, 'Pereira, Risaralda');
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, 'pereira').projects), []);
});

test('caps suggestions and returns nothing for an empty query', () => {
  const many = Array.from({ length: 12 }, (_, i) => project(`p${i}`, `Torre ${i}`, { id: 100 + i, name: `Torres ${i}` }, antioquia));
  const result = search.getSearchSuggestions(many, 'torre');
  assert.equal(result.projects.length, 5);
  assert.equal(result.locations.length, 3);
  assert.deepEqual(plain(search.getSearchSuggestions(catalog, ' ')), { locations: [], projects: [] });
});

test('popular cities are ordered by project count', () => {
  assert.deepEqual(plain(search.getPopularLocations(catalog, 2).map((l) => l.label)), [
    'Medellín, Antioquia', 'Pereira, Risaralda',
  ]);
});

test('highlights the matched part in the original text, accents included', () => {
  const md = (segments) => segments.map((s) => (s.bold ? `**${s.text}**` : s.text)).join('');
  assert.equal(md(search.highlight('Medellín, Antioquia', 'medellin')), '**Medellín**, Antioquia');
  assert.equal(md(search.highlight('Necoclí, Antioquia', 'NE')), '**Ne**coclí, Antioquia');
  assert.equal(md(search.highlight('Nexo 14', 'nexo 1')), '**Nexo** **1**4');
  assert.equal(md(search.highlight('Ñandú Living', 'nan')), '**Ñan**dú Living');
  assert.equal(md(search.highlight('Annex Nexo', 'nex')), 'Annex **Nex**o');
  assert.equal(md(search.highlight('Torre Nexo', '')), 'Torre Nexo');
});
