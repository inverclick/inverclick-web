import {
  goToProject,
  goToProjects,
  goToProjectsWithFilters,
  questionAboutInverclick,
  questionAboutProject,
  simulateCreditByQuotaValue,
  simulateCreditByValueHousing,
} from "@/components/shared/chatbot/functions";

declare global {
  interface Window {
    [key: string]: (...args: unknown[]) => Promise<unknown> | unknown;
    goToProjects: typeof goToProjects;
    goToProjectsWithFilters: typeof goToProjectsWithFilters;
    simulateCreditByQuotaValue: typeof simulateCreditByQuotaValue;
    simulateCreditByValueHousing: typeof simulateCreditByValueHousing;
    goToProject: typeof goToProject;
    questionAboutProject: typeof questionAboutProject;
    questionAboutInverclick: typeof questionAboutInverclick;
  }
}
