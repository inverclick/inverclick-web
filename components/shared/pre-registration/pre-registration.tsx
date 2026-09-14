"use client";

import {
  RegistrationCaptcha,
  useRegistrationCaptcha,
} from "@/components/shared/captcha/registration-captcha";
import {
  OTP_CODE_LENGTH,
  OtpCodeInput,
} from "@/components/shared/otp-code-input/otp-code-input";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import {
  RegistrationValues,
  SubmitRegistrationResult,
  useClientAuthFlow,
} from "@/hooks/use-client-auth-flow";
import { CAPTCHA_PENDING_MESSAGE } from "@/services/auth/captcha";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Form, FormikProvider, useFormik } from "formik";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as yup from "yup";
import Image from "next/image";

const INPUT_CLASSNAMES = {
  container: "mb-0",
  input:
    "h-14 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400",
  error: "mt-1 text-xs",
};

const PRIMARY_BUTTON_CLASSNAME =
  "mt-1 h-14 w-full rounded-xl bg-[#5b3df5] text-base font-semibold text-white shadow-[0_18px_40px_rgba(91,61,245,0.28)] hover:bg-[#5032ef]";

export const PreRegistration = () => {
  const { isPreRegistrationOpen } = usePreRegistration();

  return <>{isPreRegistrationOpen && <PreRegistrationContent />}</>;
};

const PreRegistrationContent = () => {
  const router = useRouter();

  const {
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    setWelcomeDialogOpen,
    setWelcomeDialogVariant,
  } = usePreRegistration();

  const finish = (variant: "new" | "existing") => () => {
    setIsPreRegistrationOpen(false);
    setWelcomeDialogVariant(variant);
    setWelcomeDialogOpen(true);
    router.refresh();
  };

  const {
    step,
    email,
    loading,
    resending,
    submitRegistration,
    submitCode,
    resendCode,
    backToForm,
  } = useClientAuthFlow({
    onRegistered: finish("new"),
    onSignedIn: finish("existing"),
  });

  return (
    <Dialog
      open={isPreRegistrationOpen}
      onOpenChange={setIsPreRegistrationOpen}
    >
      <DialogContent
        hideCloseButton
        onOpenAutoFocus={(event: Event) => event.preventDefault()}
        className="max-w-4xl !rounded-2xl !p-0"
      >
        <DialogTitle className="sr-only">
          {step === "form"
            ? "Regístrate para ver la información del proyecto"
            : "Confirma tu correo con el código que te enviamos"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {step === "form"
            ? "Ingresa tu nombre, celular y correo para desbloquear la información del proyecto."
            : "Ya tienes una cuenta: escribe el código de 6 dígitos que enviamos a tu correo para iniciar sesión."}
        </DialogDescription>
        <section className="flex">
          <div className="hidden flex-col justify-between gap-6 !rounded-l-2xl bg-purple-100 pb-10 md:flex md:min-w-[40%]">
            <div className="flex flex-col p-5 !pb-0 md:gap-8 md:p-8 xl:gap-12 xl:p-10">
              <Image
                unoptimized
                width="200"
                height="40"
                className="h-auto max-w-32 mix-blend-multiply"
                src="/main-page/inverclick-logo.avif"
                alt="Inverclick logo"
              />
              <h2 className="w-full text-[clamp(22px,2.2vw,40px)] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-900">
                <span className="block">Cuéntanos</span>
                <span className="block">sobre ti y</span>
                <span className="mt-2 block text-[#5b3df5]">encontraremos</span>
                <span className="block text-[#5b3df5]">
                  tu lugar{" "}
                  <span className="relative inline-block">
                    ideal.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 156 18"
                      className="pointer-events-none absolute left-0 top-[calc(100%-0.1rem)] h-[8px] w-full translate-y-1"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M4 12.5C30 8.4 56 7.2 82 7.2C102.7 7.2 123.3 7.96 144 9.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>
            </div>
            <Image
              unoptimized
              width="200"
              height="40"
              className="h-auto w-[310px]"
              src="/preregistro/silla.webp"
              alt="Inverclick logo"
            />
          </div>
          <div className="flex-1 rounded-r-2xl bg-white p-6 md:p-8">
            {step === "form" && (
              <RegistrationStep
                loading={loading}
                onSubmit={submitRegistration}
              />
            )}
            {step === "code" && (
              <CodeStep
                email={email}
                loading={loading}
                resending={resending}
                onBack={backToForm}
                onResend={resendCode}
                onSubmit={submitCode}
              />
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

function RegistrationStep({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (values: RegistrationValues) => Promise<SubmitRegistrationResult>;
}) {
  const captcha = useRegistrationCaptcha();

  const form = useFormik({
    initialValues: { fullName: "", phone: "", email: "" },
    validationSchema: yup.object().shape({
      fullName: yup
        .string()
        .trim()
        .min(3, "Escribe tu nombre completo")
        .required("El nombre completo es obligatorio"),
      phone: yup
        .string()
        .required("El número de celular es obligatorio")
        .test(
          "is-valid-phone",
          "El número de celular no es válido",
          (value) => !!value && isValidPhoneNumber(value)
        ),
      email: yup.string().email().required("El correo es obligatorio"),
    }),
    onSubmit: async (values) => {
      if (!captcha.token) {
        toast.error(CAPTCHA_PENDING_MESSAGE);

        return;
      }

      const result = await onSubmit({ ...values, captchaToken: captcha.token });

      // El token ya se consumió: si el usuario se queda en el formulario, el
      // widget tiene que entregar uno nuevo antes del siguiente intento.
      if (result.status === "captcha-failed" || result.status === "error") {
        captcha.reset();
      }
    },
  });

  return (
    <FormikProvider value={form}>
      <Form id="pre-registration-form" className="flex h-full flex-col gap-4">
        <div className="space-y-1 pb-1">
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
            Cuéntanos para{" "}
            <span className="text-[#5b3df5]">ayudarte mejor</span>
          </h3>
          <p className="text-base font-medium text-slate-400">
            Con estos datos desbloqueas la información del proyecto.
          </p>
        </div>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
          <InputFormikNT
            id="fullName"
            classNames={INPUT_CLASSNAMES}
            properties={{
              input: {
                autoComplete: "name",
                placeholder: "Nombre completo",
              },
            }}
          />
        </div>

        <PhoneInputFormikNT
          id="phone"
          classNames={{
            container: INPUT_CLASSNAMES.container,
            error: INPUT_CLASSNAMES.error,
          }}
          properties={{
            phoneInput: {
              defaultCountry: "CO",
              placeholder: "Número de celular",
            },
          }}
        />

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
          <InputFormikNT
            id="email"
            classNames={INPUT_CLASSNAMES}
            properties={{
              input: {
                type: "email",
                autoComplete: "email",
                placeholder: "Correo electrónico",
              },
            }}
          />
        </div>

        <RegistrationCaptcha className="pt-1" {...captcha.captchaProps} />

        <Button
          form="pre-registration-form"
          type="submit"
          isLoading={loading}
          className={PRIMARY_BUTTON_CLASSNAME}
        >
          <span>Continuar</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="flex items-center justify-center gap-2 pt-1 text-center text-xs font-medium text-[#211460]">
          <LockKeyhole className="h-3.5 w-3.5" />
          <span>Tu información está protegida y no será compartida.</span>
        </div>
      </Form>
    </FormikProvider>
  );
}

function CodeStep({
  email,
  loading,
  resending,
  onBack,
  onResend,
  onSubmit,
}: {
  email: string;
  loading: boolean;
  resending: boolean;
  onBack: () => void;
  onResend: () => void;
  onSubmit: (code: string) => void;
}) {
  const [code, setCode] = useState("");

  const isComplete = code.length === OTP_CODE_LENGTH;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-1 pb-1">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
          Ya tienes cuenta,{" "}
          <span className="text-[#5b3df5]">confirma que eres tú</span>
        </h3>
        <p className="text-base font-medium text-slate-400">
          Te enviamos un código a <span className="font-semibold">{email}</span>
        </p>
      </div>

      <OtpCodeInput
        autoFocus
        value={code}
        onChange={setCode}
        onComplete={onSubmit}
        disabled={loading}
      />

      <Button
        type="button"
        variant="link"
        className="h-auto self-start p-0 text-sm"
        onClick={onResend}
        isLoading={resending}
      >
        Enviar un nuevo código
      </Button>

      <Button
        type="button"
        isLoading={loading}
        disabled={!isComplete}
        onClick={() => onSubmit(code)}
        className={PRIMARY_BUTTON_CLASSNAME}
      >
        <span>Confirmar</span>
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="link"
        className="h-auto self-center p-0 text-sm text-slate-500"
        onClick={onBack}
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Usar otro correo
      </Button>
    </div>
  );
}
