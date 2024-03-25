
import type { IBLUEPRINT_POPULATED } from "@/types/blueprint"

const API = process.env.NEXT_PUBLIC_API 

export const getAllProjects = async (queryParams: string): Promise<{ success: boolean, message: string, data: IBLUEPRINT_POPULATED[], count: number }> => {
  try {
    const response = await fetch(API + '/project/preview' + queryParams)
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching projects',
      data: [],
      count: 0
    }
  }
}
