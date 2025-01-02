import {
  goToProject,
  goToProjects,
  goToProjectsWithFilters,
  questionAboutInverclick,
  questionAboutProject,
  scheduleAnAppointment,
  simulateCredit,
  voidFunction,
} from "@/components/shared/chatbot/functions";

declare global {
  interface Window {
    [key: string]: (...args: unknown[]) => Promise<unknown> | unknown;
    goToProjects: typeof goToProjects;
    goToProjectsWithFilters: typeof goToProjectsWithFilters;
    simulateCredit: typeof simulateCredit;
    goToProject: typeof goToProject;
    questionAboutProject: typeof questionAboutProject;
    questionAboutInverclick: typeof questionAboutInverclick;
    scheduleAnAppointment: typeof scheduleAnAppointment;
    voidFunction: typeof voidFunction;
  }
}
