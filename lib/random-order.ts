/**
 * Shuffles items by giving each id a random rank the first time it is seen.
 * Known items keep their rank, so filtering or reloading never reorders them;
 * only new items land at a random position. Same as the mobile app.
 */
export function orderRandomly<T extends { id: string }>(
  items: T[],
  ranks: Map<string, number>,
  random: () => number = Math.random
): T[] {
  for (const item of items) {
    if (!ranks.has(item.id)) ranks.set(item.id, random());
  }
  return items.slice().sort((a, b) => ranks.get(a.id)! - ranks.get(b.id)!);
}

const STORAGE_KEY = "inverclick:projects-random-order";

/**
 * Ranks for this browser tab. sessionStorage keeps the order across reloads and
 * back navigation; a new tab or visit starts a new order. Storage can be
 * unavailable (private mode, blocked cookies): then the order lasts the page.
 */
export function loadSessionRanks(): Map<string, number> {
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const entries = Object.entries(
        JSON.parse(saved) as Record<string, unknown>
      ).filter(
        (entry): entry is [string, number] => typeof entry[1] === "number"
      );
      return new Map(entries);
    }
  } catch {
    // Fall through to a fresh order.
  }
  return new Map();
}

export function saveSessionRanks(ranks: Map<string, number>) {
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Object.fromEntries(ranks))
    );
  } catch {
    // Not persisting only means a reload reshuffles.
  }
}
