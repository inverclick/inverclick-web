/**
 * Format a date as a string in the format "YYYY-MM-DD".
 *
 * @param {Date} date The date to format
 * @returns {string} The formatted date string
 */
export function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
