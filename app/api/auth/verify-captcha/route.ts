import { ENV_VARS } from "@/global/env";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

/**
 * Valida contra Cloudflare el token que generó el widget de Turnstile.
 *
 * Vive en el servidor porque `TURNSTILE_SECRET_KEY` no es pública. Sólo lo
 * consume el registro de usuario (el popup de "Ver información" y
 * /auth/sign-up): ni el inicio de sesión ni el formulario de solicitud de
 * información de un proyecto pasan por aquí, a propósito.
 *
 * Falla cerrado: si falta el secreto o Cloudflare no responde, el registro no
 * continúa.
 */
export async function POST(request: Request) {
  const secret = ENV_VARS.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error(
      "[captcha] Falta TURNSTILE_SECRET_KEY: el registro queda bloqueado"
    );

    return Response.json(
      { success: false, reason: "not-configured" },
      { status: 500 }
    );
  }

  const token = await readToken(request);

  if (!token) {
    return Response.json(
      { success: false, reason: "missing-token" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
      cache: "no-store",
    });

    const result = (await response.json()) as SiteverifyResponse;

    if (!result.success) {
      return Response.json(
        {
          success: false,
          reason: "rejected",
          errorCodes: result["error-codes"] ?? [],
        },
        { status: 400 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[captcha] Cloudflare no respondió la verificación", error);

    return Response.json(
      { success: false, reason: "unavailable" },
      { status: 502 }
    );
  }
}

/** El cuerpo lo arma el navegador: puede no ser JSON o no traer el token. */
const readToken = async (request: Request) => {
  try {
    const body = (await request.json()) as { token?: unknown };

    return typeof body.token === "string" ? body.token.trim() : "";
  } catch {
    return "";
  }
};
