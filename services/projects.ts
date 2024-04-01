
import type { IBLUEPRINT, IBLUEPRINT_POPULATED } from "@/types/blueprint"
import { IPROJECT_POPULATED } from "@/types/project"

const API = process.env.NEXT_PUBLIC_API 

export const getAllProjects = async (queryParams: string): Promise<{ success: boolean, message: string, data: IBLUEPRINT_POPULATED[], count: number }> => {
  try {
    const response = await fetch(API + '/project/preview' + queryParams, { cache: 'force-cache' })
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

export const getProjectById = async (id: string): Promise<{ success: boolean, message: string, project: IPROJECT_POPULATED | undefined, blueprints: IBLUEPRINT[] }> => {
  try {
    const response = await fetch(API + '/project/review/' + id, { cache: 'force-cache' })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching projects',
      project: undefined,
      blueprints: []
    }
  }
}
