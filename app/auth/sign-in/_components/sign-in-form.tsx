"use client";

import {
  OTP_CODE_LENGTH,
  OtpCodeInput,
} from "@/components/shared/otp-code-input/otp-code-input";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { useClientAuthFlow } from "@/hooks/use-client-auth-flow";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import * as yup from "yup";

export function SignInForm() {
  const searchParams = useSearchParams();

  const {
    step,
    email,
    loading,
    resending,
    submitSignInEmail,
    submitCode,
    resendCode,
    backToForm,
  } = useClientAuthFlow({
    onSignedIn: () => {
      toast.success("¡Qué bueno verte de nuevo!");

      // Hard navigation so the server layout re-reads the fresh session cookie
      // instead of racing `router.refresh()`.
      window.location.assign("/projects");
    },
  });

  return step === "form" ? (
    <EmailStep
      loading={loading}
      initialEmail={searchParams.get("email") || ""}
      onSubmit={submitSignInEmail}
    />
  ) : (
    <CodeStep
      email={email}
      loading={loading}
      resending={resending}
      onBack={backToForm}
      onResend={resendCode}
      onSubmit={submitCode}
    />
  );
}

type EmailStepProps = Readonly<{
  loading: boolean;
  initialEmail: string;
  onSubmit: (
    email: string
  ) => Promise<{ status: "otp-sent" | "not-registered" | "error" }>;
}>;

function EmailStep({ loading, initialEmail, onSubmit }: EmailStepProps) {
  const form = useFormik({
    initialValues: { email: initialEmail },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("El correo es obligatorio"),
    }),
    onSubmit: async ({ email }, { setFieldError }) => {
      const { status } = await onSubmit(email);

      if (status === "not-registered") {
        setFieldError(
          "email",
          "No encontramos una cuenta con este correo. Crea una para continuar"
        );
      }
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        <span className="block">Escribe el correo electrónico</span>
        <span className="block">asociado a tu cuenta de Inverclick</span>
      </Typography>
      <Typography className="mb-8 text-center text-slate-500">
        Te enviaremos un código de 6 dígitos para entrar. Sin contraseñas.
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-in-form" className="flex w-full flex-col">
          <InputFormikNT
            id="email"
            classNames={{ container: "w-full mb-6" }}
            properties={{
              input: {
                type: "email",
                autoComplete: "email",
                placeholder: "Correo electrónico",
              },
            }}
          />
          <Button
            form="sign-in-form"
            type="submit"
            isLoading={loading}
            className="mb-4"
          >
            Enviar código
          </Button>
          <Button variant="link" className="mb-4" asChild>
            <Link href="/auth/sign-up">Crear una cuenta</Link>
          </Button>
          <DownloadAppModal />
          <Button variant="link" className="lg:hidden" asChild>
            <Link href="https://company.inverclick.com">Soy constructora</Link>
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
}

type CodeStepProps = Readonly<{
  email: string;
  loading: boolean;
  resending: boolean;
  onBack: () => void;
  onResend: () => void;
  onSubmit: (code: string) => void;
}>;

function CodeStep({
  email,
  loading,
  resending,
  onBack,
  onResend,
  onSubmit,
}: CodeStepProps) {
  const [code, setCode] = useState("");

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        Confirma que eres tú
      </Typography>
      <Typography className="mb-8 text-center">
        Te enviamos un código a <span className="font-bold">{email}</span>
      </Typography>
      <div className="flex w-full flex-col">
        <OtpCodeInput
          autoFocus
          className="mb-4"
          value={code}
          onChange={setCode}
          onComplete={onSubmit}
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
        <div className="grid w-full grid-cols-2 gap-4">
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
            onClick={() => onSubmit(code)}
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
