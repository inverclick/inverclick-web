import type { ICOMPANY } from "./company"

export interface IPROJECT {
  _id: string
  name: string
  address: string
  videos: string[] | null
  logo: string
  id: string
  stratum: number
  characteristics: {label: string, _id: string}[]
  department: string
  city: string
  company: ICOMPANY | string
  description: string
  photos: string[]
  housingState: HOUSING_STATE_TYPE
  housingType: IHOUSING_TYPE | string
  deadline?: string
  urbanism: string[]
  location: {
    lat: number
    lng: number
  },
  updatedAt: string
  createdAt: string
}

export interface IPROJECT_POPULATED extends IPROJECT {
  company: ICOMPANY
  housingType: IHOUSING_TYPE
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

export interface IHOUSING_TYPE {
  _id: string
  label: string
}