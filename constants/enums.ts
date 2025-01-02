import {
  ChatbotSenderEnum,
  HousingStateEnum,
  HousingTypeEnum,
  ProjectClassEnum,
  ProjectPlanEnum,
  ProjectStatusEnum,
  SubscriptionStatusEnum,
  UserRoleEnum,
} from "@/types/domain/enums";

export const CHATBOT_SENDER: Record<ChatbotSenderEnum, ChatbotSenderEnum> = {
  USER: "USER",
  BOT: "BOT",
};

export const USER_ROLE: Record<UserRoleEnum, UserRoleEnum> = {
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  INVESTOR: "INVESTOR",
  LEAD: "LEAD",
};

export const HOUSING_STATE: Record<HousingStateEnum, HousingStateEnum> = {
  NEW: "NEW",
  OFF_PLAN: "OFF_PLAN",
  USED: "USED",
};

export const HOUSING_TYPE: Record<HousingTypeEnum, HousingTypeEnum> = {
  APARTAMENTO: "APARTAMENTO",
  BODEGA: "BODEGA",
  CASA: "CASA",
  LOTE: "LOTE",
};

export const PROJECT_STATUS: Record<ProjectStatusEnum, ProjectStatusEnum> = {
  DRAFT: "DRAFT",
  SUSPENDED: "SUSPENDED",
  PENDING: "PENDING",
  PUBLISHED: "PUBLISHED",
  REJECTED: "REJECTED",
};

export const PROJECT_CLASS: Record<ProjectClassEnum, ProjectClassEnum> = {
  DRAFT: "DRAFT",
  PROJECT: "PROJECT",
};

export const PROJECT_PLAN: Record<ProjectPlanEnum, ProjectPlanEnum> = {
  LITE: "LITE",
  PLUS: "PLUS",
  ENTERPRISE: "ENTERPRISE",
};

export const SUBSCRIPTION_STATUS: Record<
  SubscriptionStatusEnum,
  SubscriptionStatusEnum
> = {
  NOT_ACQUIRED: "NOT_ACQUIRED",
  PAID: "PAID",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  PAYMENT_REJECTED: "PAYMENT_REJECTED",
  MEMBERSHIP_CANCELLED: "MEMBERSHIP_CANCELLED",
  PAYMENT_EXPIRED: "PAYMENT_EXPIRED",
};
