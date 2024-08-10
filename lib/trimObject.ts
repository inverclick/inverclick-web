/**
 * Trims an object by removing empty string values.
 *
 * @param obj - The object to be trimmed.
 * @returns A new object with empty string values removed.
 */
export function trimObject(obj: Record<string, any>) {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== "") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
