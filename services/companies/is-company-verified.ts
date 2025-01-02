import { SUBSCRIPTION_STATUS } from "@/constants/enums";
import { SubscriptionStatusEnum } from "@/types/domain/enums";

export function isCompanyVerified(status: SubscriptionStatusEnum) {
  return status === SUBSCRIPTION_STATUS.PAID;
}
