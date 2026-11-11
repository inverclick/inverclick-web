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

const seo = load('../app/projects/[project]/[typology]/_services/project-seo.ts');
const plain = (value) => JSON.parse(JSON.stringify(value));

const project = (overrides = {}) => ({
  id: 'p1',
  name: 'Canaan Living',
  description: '',
  address: 'Pereira, Risaralda, Colombia',
  housing_type: 'APARTAMENTO',
  latitude: 4.8087,
  longitude: -75.6906,
  photos: ['projects-photos/a.jpg', 'projects-photos/b.jpg'],
  created_at: '2026-10-01T00:00:00Z',
  updated_at: '2026-10-20T00:00:00Z',
  city: { name: 'Pereira' },
  department: { name: 'Risaralda' },
  ...overrides,
});
const typology = { id: 't1', name: 'Tipo A', price: 380000000, area: 44.1, rooms: 2, bathrooms: 1 };

test('the canonical path includes /projects', () => {
  assert.equal(seo.projectPath('p1', 't1'), '/projects/p1/t1');
});

test('title names the project, the city and the typology', () => {
  assert.equal(seo.projectTitle(project(), typology), 'Canaan Living en Pereira – Tipo A');
  assert.equal(seo.projectTitle(project({ city: null }), { ...typology, name: '' }), 'Canaan Living');
});

test('without its own text, the description is built from the data', () => {
  const description = seo.projectDescription(project(), typology);
  assert.match(description, /^Canaan Living: Apartamentos en Pereira, Risaralda desde \$380\.000\.000 COP\./);
  assert.match(description, /2 habitaciones, 1 baño, 44\.1 m²\./);
  assert.ok(description.length <= 155);
});

test('a long description loses its Markdown and is cut at a word', () => {
  const text = '## Vive en **Canaan**\n\nUn [proyecto](https://x.co) con piscina, gimnasio y zonas verdes. '.repeat(5);
  const description = seo.projectDescription(project({ description: text }), typology);
  assert.ok(description.length <= 155, description.length);
  assert.ok(description.endsWith('…'));
  assert.doesNotMatch(description, /[#*\[\]()]/);
  assert.match(description, /^Vive en Canaan Un proyecto con piscina/);
});

test('JSON-LD describes the listing, its offer, place and breadcrumb', () => {
  const data = plain(seo.projectJsonLd({
    project: project(),
    typology,
    baseUrl: 'https://inverclick.com',
    assetUrl: (path) => `https://cdn.test/${path}`,
  }));
  const [listing, breadcrumb] = data['@graph'];
  assert.equal(data['@context'], 'https://schema.org');
  assert.equal(listing['@type'], 'RealEstateListing');
  assert.equal(listing.url, 'https://inverclick.com/projects/p1/t1');
  assert.deepEqual(listing.image, ['https://cdn.test/projects-photos/a.jpg', 'https://cdn.test/projects-photos/b.jpg']);
  assert.deepEqual(listing.offers, {
    '@type': 'Offer', price: 380000000, priceCurrency: 'COP',
    availability: 'https://schema.org/InStock', url: 'https://inverclick.com/projects/p1/t1',
  });
  assert.equal(listing.about['@type'], 'Apartment');
  assert.deepEqual(listing.about.address, {
    '@type': 'PostalAddress', streetAddress: 'Pereira, Risaralda, Colombia',
    addressLocality: 'Pereira', addressRegion: 'Risaralda', addressCountry: 'CO',
  });
  assert.deepEqual(listing.about.geo, { '@type': 'GeoCoordinates', latitude: 4.8087, longitude: -75.6906 });
  assert.equal(listing.about.floorSize.unitCode, 'MTK');
  assert.equal(breadcrumb['@type'], 'BreadcrumbList');
  assert.equal(breadcrumb.itemListElement[1].item, 'https://inverclick.com/projects/p1/t1');
});

test('JSON-LD text cannot close its script tag', () => {
  const json = seo.serializeJsonLd({ name: '</script><script>alert(1)</script>' });
  assert.doesNotMatch(json, /</);
  assert.equal(JSON.parse(json).name, '</script><script>alert(1)</script>');
});
