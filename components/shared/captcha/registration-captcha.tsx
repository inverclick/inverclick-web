"use client";

import { ENV_VARS } from "@/global/env";
import { cn } from "@/lib/utils";
import { CAPTCHA_WIDGET_ERROR_MESSAGE } from "@/services/auth/captcha";
import { useCallback, useRef, useState } from "react";
import Turnstile, { BoundTurnstileObject } from "react-turnstile";

export type RegistrationCaptchaProps = Readonly<{
  className?: string;
  /** El widget no pudo cargar o resolver el reto. */
  failed: boolean;
  onLoad: (widgetId: string, boundTurnstile: BoundTurnstileObject) => void;
  onVerify: (token: string, boundTurnstile: BoundTurnstileObject) => void;
  onExpire: () => void;
  onError: () => void;
}>;

/**
 * Widget de Cloudflare Turnstile del registro de usuario. Se pinta igual en el
 * popup de "Ver información" y en /auth/sign-up; el estado lo maneja
 * `useRegistrationCaptcha`.
 */
export const RegistrationCaptcha = ({
  className,
  failed,
  ...callbacks
}: RegistrationCaptchaProps) => {
  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)}>
      <Turnstile
        sitekey={ENV_VARS.TURNSTILE_SITE_KEY}
        size="flexible"
        theme="light"
        language="es"
        refreshExpired="auto"
        {...callbacks}
      />
      {failed && (
        <p className="text-center text-xs text-destructive">
          {CAPTCHA_WIDGET_ERROR_MESSAGE}
        </p>
      )}
    </div>
  );
};

export type UseRegistrationCaptcha = {
  /** Vacío mientras no haya un reto resuelto y vigente. */
  token: string;
  reset: () => void;
  captchaProps: Omit<RegistrationCaptchaProps, "className">;
};

/**
 * Estado del captcha del registro.
 *
 * El token es de un solo uso y caduca a los pocos minutos, así que se limpia al
 * expirar y hay que llamar a `reset` cada vez que el usuario se queda en el
 * formulario tras un envío fallido.
 */
export const useRegistrationCaptcha = (): UseRegistrationCaptcha => {
  const [token, setToken] = useState("");
  const [failed, setFailed] = useState(false);

  /** Instancia del widget, para poder pedirle un token nuevo. */
  const widget = useRef<BoundTurnstileObject | null>(null);

  const onLoad = useCallback(
    (_widgetId: string, boundTurnstile: BoundTurnstileObject) => {
      widget.current = boundTurnstile;
    },
    []
  );

  const onVerify = useCallback(
    (nextToken: string, boundTurnstile: BoundTurnstileObject) => {
      widget.current = boundTurnstile;

      setFailed(false);
      setToken(nextToken);
    },
    []
  );

  const onExpire = useCallback(() => setToken(""), []);

  const onError = useCallback(() => {
    setToken("");
    setFailed(true);
  }, []);

  const reset = useCallback(() => {
    setToken("");
    widget.current?.reset();
  }, []);

  return {
    token,
    reset,
    captchaProps: { failed, onLoad, onVerify, onExpire, onError },
  };
};
