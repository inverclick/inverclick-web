export class SimpleAnalytics {
  /**
   * Safely triggers an analytics event.
   * @param eventName The name of the event to trigger.
   * @param metadata Optional metadata to include with the event.
   * @returns {void}
   */
  public static safelyTriggerEvent(
    eventName: string,
    metadata?: Record<string, string | number | boolean | Date>
  ): void {
    if (window && window.sa_event) {
      window.sa_event(eventName, metadata);
    }
  }

  /**
   * Triggers an analytics event indicating that a registered user has viewed a project.
   *
   * @param {Object} params - The parameters for the event.
   * @param {string} params.projectId - The unique identifier of the project being viewed.
   * @returns {void}
   */
  public static viewProjectAsRegisteredUser({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_as_registered_user", {
      projectId,
    });
  }

  /**
   * Triggers an analytics event indicating that a user has viewed the description of a project.
   *
   * @param {Object} params - The parameters for the event.
   * @param {string} params.projectId - The unique identifier of the project being viewed.
   * @returns {void}
   */
  public static viewProjectDescription({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_description", {
      projectId,
    });
  }

  /**
   * Triggers an analytics event indicating that a user has viewed the typologies of a project.
   *
   * @param {Object} params - The parameters for the event.
   * @param {string} params.projectId - The unique identifier of the project being viewed.
   * @returns {void}
   */
  public static viewProjectTypologies({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_typologies", {
      projectId,
    });
  }

  /**
   * Triggers an analytics event indicating that a user has viewed the urbanism section of a project.
   *
   * @param {Object} params - The parameters for the event.
   * @param {string} params.projectId - The unique identifier of the project being viewed.
   * @returns {void}
   */
  public static viewProjectUrbanism({
    projectId,
  }: {
    projectId: string;
  }): void {
    SimpleAnalytics.safelyTriggerEvent("view_project_urbanism", { projectId });
  }

  /**
   * Triggers an analytics event indicating that a user has viewed the credit simulator section of a project.
   *
   * @param {Object} params - The parameters for the event.
   * @param {string} params.projectId - The unique identifier of the project being viewed.
   * @returns {void}
   */
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
