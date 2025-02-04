declare function sa_event(
  eventName: string,
  metadata?: Record<string, string | number | boolean | Date>
): void;

export class SimpleAnalytics {
  public static viewProjectAsRegisteredUser({
    projectId,
  }: {
    projectId: string;
  }): void {
    sa_event("view_project_as_registered_user", { projectId });
  }

  public static viewProjectDescription({
    projectId,
  }: {
    projectId: string;
  }): void {
    sa_event("view_project_description", { projectId });
  }

  public static viewProjectTypologies({
    projectId,
  }: {
    projectId: string;
  }): void {
    sa_event("view_project_typologies", { projectId });
  }

  public static viewProjectUrbanism({
    projectId,
  }: {
    projectId: string;
  }): void {
    sa_event("view_project_urbanism", { projectId });
  }

  public static viewProjectCreditSimulator({
    projectId,
  }: {
    projectId: string;
  }): void {
    sa_event("view_project_credit_simulator", { projectId });
  }
}
