import type { ICOMPANY } from "./company"

export interface IPROJECT {
  _id: string
  name: string
  address: string
  videos: string[] | null
  logo: string
  id: string
  stratum: number
  characteristics: string[]
  department: string
  city: string
  company: ICOMPANY | string
  description: string
  photos: string[]
  housingState: HOUSING_STATE_TYPE
  deadline?: string
  location: {
    lat: number
    lng: number
  }
}

export interface IPROJECT_POPULATED extends IPROJECT {
  company: ICOMPANY
}

export type HOUSING_STATE_TYPE = 'new' | 'off-plan' | 'used'

export enum HOUSING_STATE_ENUM {
  NEW = 'new',
  OFF_PLAN = 'off-plan',
  USED = 'used'
}

export enum HOUSING_STATE_LABEL {
  NEW = 'Nuevo',
  OFF_PLAN = 'Sobre plano',
  USED = 'Usado',

  new = 'Nuevo',
  'off-plan' = 'Sobre plano',
  used = 'Usado',
}