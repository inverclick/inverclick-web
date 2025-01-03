import crypto from "crypto";

/**
 * Generates a unique code based on the current timestamp.
 *
 * @param {number} [length=6] The length of the unique code.
 * @returns {string} A unique code as a hexadecimal string.
 */
export function generateUniqueCode(length = 6): string {
  const timestamp = Date.now().toString();

  const hash = crypto.createHash("sha256");

  hash.update(timestamp);

  const unique = hash.digest("hex");

  return unique.slice(0, length).toUpperCase();
}
