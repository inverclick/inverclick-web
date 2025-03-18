import { ENV_VARS } from "@/global/env";
import { canContinueToProjectPreview } from "@/middlewares/can-continue-to-project-preview";
import { handlePreRegistration } from "@/middlewares/handle-pre-registration";
import { handleTRM } from "@/middlewares/handle-trm";
import { updateSession } from "@/middlewares/update-session";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (!canContinueToProjectPreview(request)) {
    return NextResponse.redirect(new URL("/", ENV_VARS.BASE_URL));
  }

  const response = NextResponse.next({ request });

  await handlePreRegistration(request, response);

  await handleTRM(request, response);

  return await updateSession(request, response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
