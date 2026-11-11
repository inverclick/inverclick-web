/** Minimum legal age (age of majority in Colombia). */
export const MINIMUM_AGE = 18;

/**
 * Completed years between `birthDate` and `today`.
 *
 * Compares year/month/day in local time, so the result does not depend on the
 * time of day or the time zone. Someone born on Feb 29 turns a year older on
 * Mar 1 in non-leap years. A future `birthDate` gives a negative number and an
 * invalid date gives NaN.
 *
 * @param {Date} birthDate The date of birth
 * @param {Date} today The reference date (defaults to now)
 * @returns {number} The age in completed years
 */
export function getAge(birthDate: Date, today: Date = new Date()): number {
  const years = today.getFullYear() - birthDate.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  return hadBirthdayThisYear ? years : years - 1;
}

/**
 * Whether someone born on `birthDate` has reached `MINIMUM_AGE` by `today`.
 * Turning 18 today counts as an adult; a future or invalid date does not.
 *
 * @param {Date} birthDate The date of birth
 * @param {Date} today The reference date (defaults to now)
 * @returns {boolean} True when the person is of legal age
 */
export function isAdult(birthDate: Date, today: Date = new Date()): boolean {
  return getAge(birthDate, today) >= MINIMUM_AGE;
}
