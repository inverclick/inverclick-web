import { Tables } from "@/services/supabase";
import type { ICOMPANY } from "./company";
import { Typology } from "./typologies";

export type IPROJECT = Tables<'projects'>['Row']
export interface ProjectToDisplay extends IPROJECT {
  typologies: Typology[]
  department: Tables<'departments'>['Row']
  city: Tables<'cities'>['Row']
  company: ICOMPANY
}
export interface IPROJECT_POPULATED extends IPROJECT {
  company: ICOMPANY;
  housingType: IHOUSING_TYPE;
}

export type HOUSING_STATE_TYPE = Tables<'projects'>["Row"]["housing_state"];

export const HOUSING_STATE_ENUM: Record<HOUSING_STATE_TYPE, HOUSING_STATE_TYPE> = {
  NEW: "NEW",
  OFF_PLAN: "OFF_PLAN",
  USED: "USED",
}

export const HOUSING_STATE_LABEL: Record<HOUSING_STATE_TYPE, string> = {
  NEW: "Nuevo",
  OFF_PLAN: "Sobre plano",
  USED: "Usado",
}

export type IHOUSING_TYPE = Tables<'projects'>["Row"]["housing_type"];

export const HOUSING_TYPE_ENUM: Record<IHOUSING_TYPE, IHOUSING_TYPE> = {
  APARTAMENTO: "APARTAMENTO",
  BODEGA: "BODEGA",
  CASA: "CASA",
  LOTE: "LOTE",
}

export const HOUSING_TYPE_LABEL: Record<IHOUSING_TYPE, string> = {
  APARTAMENTO: "Apartamento",
  BODEGA: "Bodega",
  CASA: "Casa",
  LOTE: "Lote",
}


export type IPROJECT_LOCATION = {
  _id: string;
  location: {
    lat: number;
    lng: number;
  };
};
