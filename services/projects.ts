
import type { IBLUEPRINT, IBLUEPRINT_POPULATED } from "@/types/blueprint"
import { IPROJECT, IPROJECT_POPULATED } from "@/types/project"
import { supabase } from "./supabase"

const API = process.env.NEXT_PUBLIC_API 

export const getProjectById = async (id: string): Promise<{ success: boolean, message: string, project: IPROJECT_POPULATED | undefined, blueprints: IBLUEPRINT[] }> => {
  try {
    const response = await fetch(API + '/project/review/' + id, { cache: 'no-cache' })
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

export const getProjectPreviewById = async (id: string): Promise<{ success: boolean, message: string, project: IPROJECT_POPULATED | undefined, blueprints: IBLUEPRINT[] }> => {
  try {
    const response = await fetch(API + '/project/preview/' + id, { cache: 'no-cache' })
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

export const getProjectsPriceRange = async () => {
  const draftData = Array.from({ length: 50 }, () => ({ goal: 0 }))

  const { data: typologies, error } = await supabase
    .from('typologies')
    .select('price')

  if (error) throw error

  if (typologies) {
    for (const blueprint of typologies) {
      const goal = Math.floor(blueprint.price / 20000000)
      if (goal < 50) draftData[goal].goal++
    }
  }

  return draftData
}