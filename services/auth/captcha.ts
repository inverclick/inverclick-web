/**
 * Verificación antibots (Cloudflare Turnstile) del registro de usuario.
 *
 * El widget corre en el navegador y devuelve un token de un solo uso; quien lo
 * valida contra Cloudflare es la ruta `/api/auth/verify-captcha`, porque la
 * clave secreta no puede salir del servidor.
 *
 * Alcance deliberado: sólo el registro (popup de "Ver información" y
 * /auth/sign-up). El inicio de sesión y la solicitud de información de un
 * proyecto no llevan captcha.
 */

const VERIFY_ENDPOINT = "/api/auth/verify-captcha";

/** El widget todavía no entregó un token (recién cargado, o expirado). */
export const CAPTCHA_PENDING_MESSAGE =
  "Estamos verificando que no eres un robot, espera un momento e inténtalo de nuevo";

/** Cloudflare rechazó el token, o no se pudo consultar. */
export const CAPTCHA_FAILED_MESSAGE =
  "No pudimos verificar que eres una persona. Inténtalo de nuevo";

/** El widget no cargó: normalmente un bloqueador o la red del usuario. */
export const CAPTCHA_WIDGET_ERROR_MESSAGE =
  "No se pudo cargar la verificación antibots. Revisa tu conexión o desactiva el bloqueador de anuncios";

/**
 * Valida el token contra Cloudflare. Cualquier respuesta que no sea un éxito
 * explícito cuenta como fallo: el registro no debe continuar a ciegas.
 *
 * El token se consume aquí, así que tras llamar a esta función hay que pedirle
 * uno nuevo al widget antes de reintentar.
 */
export const verifyCaptchaToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const result = (await response.json()) as { success?: boolean };

    return response.ok && result.success === true;
  } catch {
    return false;
  }
};
