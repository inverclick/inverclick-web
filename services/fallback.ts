export function fallback<T>(
  value: T | undefined | null,
  type: "string" | "number" | "array" | "object",
  fallback?: T
): T {
  if (value === undefined || value === null) {
    if (fallback !== undefined) {
      return fallback;
    }

    if (type === "string") {
      return "N/A" as T;
    }
    if (type === "number") {
      return 0 as T;
    }
    if (type === "array") {
      return [] as T;
    }
    if (type === "object") {
      return {} as T;
    }
  }

  return value as T;
}
