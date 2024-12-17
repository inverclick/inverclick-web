import { HousingStateEnum } from "@/types/housing-state";
import { HousingTypeEnum } from "@/types/housing-type";

export const HOUSING_STATE_ENUM: Record<HousingStateEnum, HousingStateEnum> = {
  NEW: "NEW",
  OFF_PLAN: "OFF_PLAN",
  USED: "USED",
};

export const HOUSING_STATE_LABEL: Record<HousingStateEnum, string> = {
  NEW: "Nuevo",
  OFF_PLAN: "Sobre plano",
  USED: "Usado",
};

export const HOUSING_TYPE_ENUM: Record<HousingTypeEnum, HousingTypeEnum> = {
  APARTAMENTO: "APARTAMENTO",
  BODEGA: "BODEGA",
  CASA: "CASA",
  LOTE: "LOTE",
};

export const HOUSING_TYPE_LABEL: Record<HousingTypeEnum, string> = {
  APARTAMENTO: "Apartamento",
  BODEGA: "Bodega",
  CASA: "Casa",
  LOTE: "Lote",
};
