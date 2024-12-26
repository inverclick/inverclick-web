import { handlePreRegistration } from "@/middlewares/handle-pre-registration";
import { handleTRM } from "@/middlewares/handle-trm";
import { updateSession } from "@/middlewares/update-session";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Running middleware");

  await handlePreRegistration(request);

  await handleTRM(request);

  return await updateSession(request);
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
