/**
 * Returns a random element from the given array.
 *
 * @example
 * const numbers = [1, 2, 3];
 * const randomElement = getRandomElement(numbers);
 * console.log(randomElement); // 1 or 2 or 3
 *
 * @template T The type of the elements in the array.
 * @param {T[]} array The array from which to select an element.
 * @return {T} A random element from the given array.
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
