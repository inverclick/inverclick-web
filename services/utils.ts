import { Currency } from "@/contexts/CurrencyContext";
import { IHOUSING_TYPE } from "@/types/project";

const API = process.env.NEXT_PUBLIC_API;
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export const getDepartments = async (): Promise<{
  success: boolean;
  message: string;
  data: { departamento: string }[];
}> => {
  try {
    const response = await fetch(API + "/utils/departments");
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: String(error),
      data: [],
    };
  }
};

export const getCities = async (
  department: string | null
): Promise<{
  success: boolean;
  message: string;
  data: { municipio: string }[];
}> => {
  try {
    if (!department)
      return { success: false, message: "No department provided", data: [] };
    const response = await fetch(
      API + "/utils/cities?department=" + department
    );
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Error fetching cities",
      data: [],
    };
  }
};

export const getGraphicPriceRange = async (): Promise<{
  success: boolean;
  message: string;
  data: { goal: number }[];
}> => {
  try {
    const response = await fetch(API + "/utils/price-range", {
      cache: "no-cache",
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Error fetching data",
      data: [],
    };
  }
};

export const getHousingTypes = async (): Promise<{
  success: boolean;
  message: string;
  data: IHOUSING_TYPE[];
}> => {
  try {
    const response = await fetch(API + "/housing-type", { cache: "no-cache" });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Error fetching data",
      data: [],
    };
  }
};

export const getProjectCharacteristics = async (): Promise<{
  success: boolean;
  message: string;
  data: { label: string; _id: string }[];
}> => {
  try {
    const response = await fetch(API + "/utils/project-characteristics", {
      cache: "no-cache",
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Error fetching data",
      data: [],
    };
  }
};

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
  return `${BUCKET_URL}${imageId}`;
} 
