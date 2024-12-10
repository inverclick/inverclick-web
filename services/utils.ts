import { Currency } from "@/contexts/CurrencyContext";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

/**
 * Formats the price based on the currency.
 * If the currency is "COP", the price is formatted with the following rules:
 * - If the price is greater than or equal to 1,000,000, it is formatted as "$X.XM".
 * - If the price is greater than or equal to 1,000, it is formatted as "$X.XK".
 * - Otherwise, it is formatted as "$X".
 * If the currency is not "COP", the price is returned as is.
 *
 * @param price - The price to be formatted.
 * @param currency - The currency of the price.
 * @returns The formatted price.
 */
export const limitPrice = (price: number, currency: Currency) => {
  if (currency === "COP") {
    if (price >= 1_000_000) {
      return "$" + (price / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (price >= 1000) {
      return "$" + (price / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return "$" + price;
    }
  }

  return price;
};

/**
 * Returns the asset URL for the given image ID.
 * @param imageId - The ID of the image.
 * @returns The asset URL.
 */
export function getAssetUrl(imageId: string): string {
  return `${BUCKET_URL}/${imageId}`;
}

/**
 * Clones the elements of an array a specified number of times.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The array to be cloned.
 * @param {number} times - The number of times to clone the array.
 * @returns {T[]} A new array containing the elements of the original array cloned the specified number of times.
 */
export function cloneItems<T>(arr: T[], times: number): T[] {
  // Create an empty array to hold the result
  const result: T[] = [];

  // Loop `times` number of times
  for (let i = 0; i < times; i++) {
    // Concatenate the original array to the result
    result.push(...arr);
  }

  return result;
}
