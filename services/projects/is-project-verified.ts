import { PROJECT_PLAN } from "@/constants/enums";
import { ProjectPlanEnum } from "@/types/domain/enums";

export function isProjectVerified(plan: ProjectPlanEnum) {
  return plan === PROJECT_PLAN.PLUS || plan === PROJECT_PLAN.ENTERPRISE;
}
