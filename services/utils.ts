import { Currency } from "@/contexts/CurrencyContext"
import { IHOUSING_TYPE } from "@/types/project"

const API = process.env.NEXT_PUBLIC_API 

export const getDepartments = async (): Promise<{ success: boolean, message: string, data: {departamento: string}[]  }> => {
  try {
    const response = await fetch(API + '/utils/departments')
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: String(error),
      data: [],
    }
  }
}

export const getCities = async (department: string | null): Promise<{ success: boolean, message: string, data: {municipio: string}[]  }> => {
  try {
    if(!department) return { success: false, message: 'No department provided', data: [] }
    const response = await fetch(API + '/utils/cities?department=' + department)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching cities',
      data: [],
    }
  }
}

export const getGraphicPriceRange = async (): Promise<{ success: boolean, message: string, data: {goal: number}[]  }> => {
  try {
    const response = await fetch(API + '/utils/price-range', { cache: 'no-cache' })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching data',
      data: [],
    }
  }
}

export const getHousingTypes = async (): Promise<{ success: boolean, message: string, data: IHOUSING_TYPE[]  }> => {
  try {
    const response = await fetch(API + '/housing-type', { cache: 'no-cache' })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching data',
      data: [],
    }
  }
}

export const getProjectCharacteristics = async (): Promise<{ success: boolean, message: string, data: {label: string, _id: string}[]  }> => {
  try {
    const response = await fetch(API + '/utils/project-characteristics', { cache: 'no-cache' })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching data',
      data: [],
    }
  }
}

/**
 * Formats the price based on the currency.
 * If the currency is "COP", the price is formatted as follows:
 * - If the price is greater than or equal to 1,000,000, it is divided by 1,000,000 and displayed in millions.
 * - If the price is greater than or equal to 1,000, it is divided by 1,000 and displayed in thousands.
 * - Otherwise, the price is displayed as is.
 * For other currencies, the price is displayed as is.
 * @param price - The price to be formatted.
 * @param currency - The currency of the price.
 * @returns The formatted price with the currency symbol.
 * 
 * - Dividing by 1000000 leaves the millions.
 * - Calling toFixed(1) leaves a single decimal place.
 * - Calling replace removes the decimal places of value 0.
 * 
 * @example
 * limitPrice(1000000, "COP") // "1M COP"
 * limitPrice(100000, "COP") // "100K COP"
 * limitPrice(1000, "COP") // "1K COP"
 * limitPrice(100, "COP") // "100 COP"
 * limitPrice(1000000, "USD") // "1000000 USD"
 * limitPrice(100000, "USD") // "100000 USD"
 * limitPrice(1000, "USD") // "1000 USD"
 * limitPrice(100, "USD") // "100 USD"
 * limitPrice(1000000, "EUR") // "1000000 EUR"
 * limitPrice(100000, "EUR") // "100000 EUR"
 * limitPrice(1000, "EUR") // "1000 EUR"
 * limitPrice(100, "EUR") // "100 EUR"
 */
export const limitPrice = (price: number, currency: Currency) => {
  if (currency === "COP") {
    if (price >= 1_000_000) {
      return (
        (price / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M " + currency
      );
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + "K " + currency;
    } else {
      return price + " " + currency;
    }
  }

  return price + " " + currency;
}