import { IHOUSING_TYPE } from "@/types/project"

const API = process.env.NEXT_PUBLIC_API 

export const getDepartments = async (): Promise<{ success: boolean, message: string, data: {departamento: string}[]  }> => {
  try {
    const response = await fetch(API + '/utils/departments')
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching departments',
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