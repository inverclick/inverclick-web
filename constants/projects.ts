import { HousingStateEnum } from "@/types/housing-state";
import { HousingTypeEnum } from "@/types/housing-types";
import { ProjectClass, ProjectStatus } from "@/types/projects";

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

export const PROJECT_CLASS_ENUM: Record<ProjectClass, ProjectClass> = {
  DRAFT: "DRAFT",
  PROJECT: "PROJECT",
};

export const PROJECT_STATUS: Record<ProjectStatus, ProjectStatus> = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  SUSPENDED: "SUSPENDED",
};
