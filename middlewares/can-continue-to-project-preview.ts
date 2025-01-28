import { ENV_VARS } from "@/global/env";
import { isProjectPreviewPath } from "@/lib/is-project-preview-path";
import { NextRequest } from "next/server";

/**
 * This middleware checks if the user is allowed to navigate to a project preview page.
 * The rule is simple: the user must come from the company website, otherwise they are
 * redirected to the main page.
 *
 * @param request The NextRequest object.
 * @returns A boolean indicating if the user can navigate to the preview page.
 */
export function canContinueToProjectPreview(request: NextRequest): boolean {
  const isPreviewPath = isProjectPreviewPath(request.nextUrl.pathname);

  if (isPreviewPath) {
    const refererHeader = request.headers.get("referer");

    if (!refererHeader) {
      return false;
    }

    const refererUrl = new URL(refererHeader);
    const isValidReferer =
      refererUrl.origin === ENV_VARS.COMPANY_BASE_URL ||
      refererUrl.origin === ENV_VARS.TEAM_BASE_URL;

    return isValidReferer;
  }

  return true;
}
