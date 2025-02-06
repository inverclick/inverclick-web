declare function sa_event(
  eventName: string,
  metadata?: Record<string, string | number | boolean | Date>
): void;

export class SimpleAnalytics {
  public static safelyTriggerEvent(
    eventName: string,
    metadata?: Record<string, string | number | boolean | Date>
  ): void {
    if (sa_event) {
      sa_event(eventName, metadata);
    }
  }

  public static viewProjectAsRegisteredUser({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_as_registered_user", {
      projectId,
    });
  }

  public static viewProjectDescription({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_description", {
      projectId,
    });
  }

  public static viewProjectTypologies({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_typologies", {
      projectId,
    });
  }

  public static viewProjectUrbanism({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_urbanism", { projectId });
  }

  public static viewProjectCreditSimulator({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_credit_simulator", {
      projectId,
    });
  }
}
