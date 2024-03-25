import type { ICOMPANY } from "./company"

export interface IPROJECT {
  _id: string
  name: string
  address: string
  videos: string[] | null
  characteristics: Array<{ label: string, icon: string }>
  department: string
  city: string
  company: ICOMPANY | string
  description: string
  nearServices: Array<{ label: string, icon: string }>
  photos: string[]
  location: {
    lat: number
    lng: number
  }
}

export interface IPROJECT_POPULATED extends IPROJECT {
  company: ICOMPANY
}