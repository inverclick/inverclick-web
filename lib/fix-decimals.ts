export function fixDecimals(value: number, decimals: number = 2): number {
  /**
   * Rounds a number to the specified number of decimal places.
   *
   * @example
   * fixDecimals(123.456789, 2) // 123.46
   * fixDecimals(1.23456789, 4) // 1.2346
   * fixDecimals(0.0000009, 8) // 0.00000090
   * @param {number} value - The number to round.
   * @param {number} [decimals=2] - The number of decimal places to round to.
   * @returns {number} The rounded number.
   */
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
