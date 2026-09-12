"use client";

import {
  OTP_CODE_LENGTH,
  OtpCodeInput,
} from "@/components/shared/otp-code-input/otp-code-input";
import { Button } from "@inverclick/inverclick-ui/button";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useState } from "react";

export type SignUpFormStepTwoProps = Readonly<{
  email: string;
  loading: boolean;
  resending: boolean;
  onBack: () => void;
  onResend: () => void;
  onNext: (code: string) => void;
}>;

/**
 * Only reached when the email already belongs to a client: the account exists,
 * so instead of registering we finish signing them in with a code.
 */
export function SignUpFormStepTwo({
  email,
  loading,
  resending,
  onBack,
  onResend,
  onNext,
}: SignUpFormStepTwoProps) {
  const [code, setCode] = useState("");

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        Ya tienes una cuenta
      </Typography>
      <Typography className="mb-8 text-center">
        Te enviamos un código a <span className="font-bold">{email}</span> para
        terminar de iniciar sesión
      </Typography>
      <div className="flex w-full flex-col">
        <OtpCodeInput
          autoFocus
          className="mb-4"
          value={code}
          onChange={setCode}
          onComplete={onNext}
          disabled={loading}
        />
        <Button
          type="button"
          variant="link"
          className="mb-6 self-start"
          onClick={onResend}
          isLoading={resending}
        >
          Enviar un nuevo código
        </Button>
        <div className="mb-8 grid w-full grid-cols-2 gap-4">
          <Button
            type="button"
            variant="secondary"
            className="flex-grow"
            onClick={onBack}
          >
            Volver
          </Button>
          <Button
            type="button"
            className="flex-grow"
            isLoading={loading}
            disabled={code.length !== OTP_CODE_LENGTH}
            onClick={() => onNext(code)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
