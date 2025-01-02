import {
  HousingStateEnum,
  HousingTypeEnum,
  ProjectPlanEnum,
} from "@/types/domain/enums";

export const PROJECT_PLAN_LABEL: Record<ProjectPlanEnum, string> = {
  LITE: "Lite",
  PLUS: "Plus",
  ENTERPRISE: "Enterprise",
};

export const HOUSING_STATE_LABEL: Record<HousingStateEnum, string> = {
  NEW: "Nuevo",
  OFF_PLAN: "Sobre plano",
  USED: "Usado",
};

export const HOUSING_TYPE_LABEL: Record<HousingTypeEnum, string> = {
  APARTAMENTO: "Apartamento",
  BODEGA: "Bodega",
  CASA: "Casa",
  LOTE: "Lote",
};
