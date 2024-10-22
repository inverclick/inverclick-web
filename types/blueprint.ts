import type { IPROJECT, IPROJECT_POPULATED } from "./project";

export interface IBLUEPRINT {
  _id?: string;
  name: string;
  project: IPROJECT | string;
  deliveryDate: Date | null;
  area: number;
  privateArea: number;
  housingType: "VIS" | "NO VIS";
  type:
    | "Casa"
    | "Apartamento"
    | "Apartaestudios"
    | "Local"
    | "Oficina"
    | "Bodega"
    | "Apartasuites";
  bathrooms: number;
  blueprints: string[];
  state: "Disponible" | "Planos";
  units: number;
  price: number;
  rooms: number;
  parking: number;
}

export type BLUEPRINT_TYPE =
  | "Casa"
  | "Apartamento"
  | "Apartaestudios"
  | "Local"
  | "Oficina"
  | "Bodega"
  | "Apartasuites";
export type BLUEPRINT_STATE = "Disponible" | "Planos";
export type BLUEPRINT_HOUSING_TYPE = "VIS" | "NO VIS";

export interface IBLUEPRINT_POPULATED extends IBLUEPRINT {
  project: IPROJECT_POPULATED;
}
