/**
 * In-memory project search: accent- and case-insensitive matching on the
 * project name and its city/department, suggestion ranking and highlighting.
 * Same rules as the mobile app (inverclick-app/utils/project-search.ts).
 */

type Named = { name: string } | null;

/** Anything with a name and a place can be matched by free text. */
export type MatchableProject = {
  name: string | null;
  city: Named;
  department: Named;
};

/** Suggestions also need ids to group projects by city. */
export type SearchableProject = {
  id: string;
  name: string | null;
  city: { id: number; name: string } | null;
  department: { id: number; name: string } | null;
};

export type TextSegment = { text: string; bold: boolean };

export type LocationSuggestion = {
  cityId: number;
  departmentId: number;
  label: string;
  count: number;
};

export type ProjectSuggestion<P extends SearchableProject> = {
  project: P;
  location: string;
};

export type SearchSuggestions<P extends SearchableProject> = {
  locations: LocationSuggestion[];
  projects: ProjectSuggestion<P>[];
};

const DIACRITICS = /[̀-ͯ]/g;
const WORD_CHAR = /[a-z0-9]/;

type Normalized = { value: string; sourceIndex: number[] };

/**
 * Lowercases and strips accents one character at a time, remembering where each
 * normalized character came from so matches can be highlighted in the original.
 */
export function normalize(text: string): Normalized {
  let value = "";
  const sourceIndex: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const folded = text[i]
      .normalize("NFD")
      .replace(DIACRITICS, "")
      .toLowerCase();
    for (let j = 0; j < folded.length; j++) {
      value += folded[j];
      sourceIndex.push(i);
    }
  }
  return { value, sourceIndex };
}

/** Query words, normalized. Punctuation separates words: "Medellín, Antioquia". */
export function tokenize(query: string): string[] {
  return normalize(query)
    .value.split(/[^a-z0-9]+/)
    .filter(Boolean);
}

// Lower is better: 0 = the field starts with the token, 1 = a word starts with
// it, 2 = it appears inside a word.
type Match = { score: number; index: number };

function findMatch(field: string, token: string): Match | null {
  let firstIndex = -1;
  for (
    let index = field.indexOf(token);
    index !== -1;
    index = field.indexOf(token, index + 1)
  ) {
    if (index === 0) return { score: 0, index };
    if (!WORD_CHAR.test(field[index - 1])) return { score: 1, index };
    if (firstIndex === -1) firstIndex = index;
  }
  return firstIndex === -1 ? null : { score: 2, index: firstIndex };
}

export const locationLabel = (project: MatchableProject) =>
  [project.city?.name, project.department?.name].filter(Boolean).join(", ");

/** True when every query word appears in the name, city or department. */
export function matchesProject(project: MatchableProject, query: string) {
  const tokens = tokenize(query);
  if (!tokens.length) return true;
  const haystack = normalize(
    `${project.name ?? ""} ${locationLabel(project)}`
  ).value;
  return tokens.every((token) => haystack.includes(token));
}

export function filterByText<P extends MatchableProject>(
  projects: P[],
  query: string
): P[] {
  if (!tokenize(query).length) return projects;
  return projects.filter((project) => matchesProject(project, query));
}

function groupLocations(projects: SearchableProject[]) {
  const groups = new Map<number, LocationSuggestion>();
  for (const project of projects) {
    if (!project.city || !project.department) continue;
    const existing = groups.get(project.city.id);
    if (existing) existing.count++;
    else
      groups.set(project.city.id, {
        cityId: project.city.id,
        departmentId: project.department.id,
        label: locationLabel(project),
        count: 1,
      });
  }
  return Array.from(groups.values());
}

const byCountThenLabel = (a: LocationSuggestion, b: LocationSuggestion) =>
  b.count - a.count || a.label.localeCompare(b.label, "es");

/** Cities with the most projects, for the empty-query panel. */
export function getPopularLocations(projects: SearchableProject[], limit = 5) {
  return groupLocations(projects).sort(byCountThenLabel).slice(0, limit);
}

/**
 * Cities whose name/department contain every query word, and projects whose
 * name contains at least one word (the rest may match their city). Best match
 * first: start of the text, then start of a word, then anywhere.
 */
export function getSearchSuggestions<P extends SearchableProject>(
  projects: P[],
  query: string,
  { maxLocations = 3, maxProjects = 5 } = {}
): SearchSuggestions<P> {
  const tokens = tokenize(query);
  if (!tokens.length) return { locations: [], projects: [] };

  const locations: LocationSuggestion[] = [];
  const locationScores = new Map<number, number>();
  for (const location of groupLocations(projects)) {
    const label = normalize(location.label).value;
    let score = Infinity;
    let matchesAll = true;
    for (const token of tokens) {
      const match = findMatch(label, token);
      if (!match) {
        matchesAll = false;
        break;
      }
      score = Math.min(score, match.score);
    }
    if (!matchesAll) continue;
    locations.push(location);
    locationScores.set(location.cityId, score);
  }
  locations.sort(
    (a, b) =>
      locationScores.get(a.cityId)! - locationScores.get(b.cityId)! ||
      byCountThenLabel(a, b)
  );

  const projectMatches: { project: P; score: number }[] = [];
  for (const project of projects) {
    const name = normalize(project.name ?? "").value;
    const place = normalize(locationLabel(project)).value;
    let best = Infinity;
    let matchesAll = true;
    for (const token of tokens) {
      const inName = findMatch(name, token);
      if (inName) best = Math.min(best, inName.score);
      else if (!place.includes(token)) {
        matchesAll = false;
        break;
      }
    }
    if (matchesAll && best !== Infinity)
      projectMatches.push({ project, score: best });
  }
  projectMatches.sort(
    (a, b) =>
      a.score - b.score ||
      (a.project.name ?? "").localeCompare(b.project.name ?? "", "es")
  );

  return {
    locations: locations.slice(0, maxLocations),
    projects: projectMatches.slice(0, maxProjects).map(({ project }) => ({
      project,
      location: locationLabel(project),
    })),
  };
}

/** Splits `text` into plain and bold parts, bolding the best match of each query word. */
export function highlight(text: string, query: string): TextSegment[] {
  const { value, sourceIndex } = normalize(text);
  const ranges: [number, number][] = [];
  for (const token of tokenize(query)) {
    const match = findMatch(value, token);
    if (!match) continue;
    const start = sourceIndex[match.index];
    const end = sourceIndex[match.index + token.length - 1] + 1;
    ranges.push([start, end]);
  }
  ranges.sort((a, b) => a[0] - b[0]);

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (end <= cursor) continue;
    const from = Math.max(start, cursor);
    if (from > cursor)
      segments.push({ text: text.slice(cursor, from), bold: false });
    segments.push({ text: text.slice(from, end), bold: true });
    cursor = end;
  }
  if (cursor < text.length)
    segments.push({ text: text.slice(cursor), bold: false });
  // Merge neighbors of the same weight, e.g. two adjacent matched words.
  return segments.reduce<TextSegment[]>((merged, segment) => {
    const last = merged[merged.length - 1];
    if (last && last.bold === segment.bold) last.text += segment.text;
    else merged.push({ ...segment });
    return merged;
  }, []);
}
