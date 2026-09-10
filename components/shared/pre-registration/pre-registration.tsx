"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import {
  AuthMode,
  completeClientSignUp,
  getAuthErrorMessage,
  isMissingExistingUserError,
  sendOtp,
} from "@/services/auth/otp-client-auth";
import { createClient } from "@/services/supabase/browser-client";
import { Button } from "@inverclick/inverclick-ui/button";
import { Dialog, DialogContent } from "@inverclick/inverclick-ui/dialog";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Form, FormikProvider, useFormik } from "formik";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";
import Image from "next/image";

const INPUT_CLASSNAMES = {
  container: "mb-0",
  input:
    "h-14 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400",
  error: "mt-1 text-xs",
};

type Step = "email" | "code" | "profile";

export const PreRegistration = () => {
  const { isPreRegistrationOpen } = usePreRegistration();

  return <>{isPreRegistrationOpen && <PreRegistrationContent />}</>;
};

const PreRegistrationContent = () => {
  const supabase = createClient();
  const router = useRouter();

  const {
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    setPreRegistration,
    setWelcomeDialogOpen,
    setWelcomeDialogVariant,
  } = usePreRegistration();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const finish = async ({
    id,
    email: finalEmail,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  }) => {
    setPreRegistration({ id, leadId: id, name, email: finalEmail, nickname: null });
    setIsPreRegistrationOpen(false);
    setWelcomeDialogVariant(authMode === "signup" ? "new" : "existing");
    setWelcomeDialogOpen(true);
    router.refresh();
  };

  const handleEmailSubmit = async ({ email: nextEmail }: { email: string }) => {
    try {
      setLoading(true);

      const existingUserOtpResult = await sendOtp(supabase, nextEmail, false);
      let nextAuthMode: AuthMode = "existing";

      if (existingUserOtpResult.error) {
        if (!isMissingExistingUserError(existingUserOtpResult.error)) {
          throw existingUserOtpResult.error;
        }

        const signupOtpResult = await sendOtp(supabase, nextEmail, true);

        if (signupOtpResult.error) {
          throw signupOtpResult.error;
        }

        nextAuthMode = "signup";
      }

      setEmail(nextEmail);
      setAuthMode(nextAuthMode);
      setStep("code");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      const { error } = await sendOtp(supabase, email, authMode === "signup");

      if (error) {
        throw error;
      }

      toast.success("Te enviamos un nuevo código");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setResending(false);
    }
  };

  const handleCodeSubmit = async ({ code }: { code: string }) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) {
        throw error;
      }

      if (authMode === "signup") {
        setStep("profile");
        return;
      }

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      const existingName =
        (authUser?.user_metadata?.full_name as string | undefined) || email;

      await finish({ id: authUser?.id ?? "", email, name: existingName });
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "verify"));
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async ({
    firstNames,
    lastNames,
    phone,
  }: {
    firstNames: string;
    lastNames: string;
    phone: string;
  }) => {
    try {
      setLoading(true);

      const { authUser, fullName } = await completeClientSignUp(supabase, {
        email,
        firstNames,
        lastNames,
        phone,
      });

      await finish({ id: authUser.id, email, name: fullName });
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "profile"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isPreRegistrationOpen}
      onOpenChange={setIsPreRegistrationOpen}
    >
      <DialogContent
        hideCloseButton
        onOpenAutoFocus={(event: Event) => event.preventDefault()}
        className="max-w-4xl !p-0 !rounded-2xl"
      >
        <section className="flex">
          <div className="flex flex-col justify-between gap-6 !rounded-l-2xl bg-purple-100 min-w-[40%] pb-10">
            <div className="p-5 md:p-8 xl:p-10 flex flex-col md:gap-8 xl:gap-12 !pb-0">
              <Image
                unoptimized
                width="200"
                height="40"
                className="mix-blend-multiply h-auto max-w-32"
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
            {step === "email" && (
              <EmailStep loading={loading} onSubmit={handleEmailSubmit} />
            )}
            {step === "code" && (
              <CodeStep
                email={email}
                loading={loading}
                resending={resending}
                onResend={handleResend}
                onSubmit={handleCodeSubmit}
              />
            )}
            {step === "profile" && (
              <ProfileStep loading={loading} onSubmit={handleProfileSubmit} />
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

function EmailStep({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (values: { email: string }) => void;
}) {
  const form = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
    }),
    onSubmit,
  });

  return (
    <FormikProvider value={form}>
      <Form id="pre-registration-email" className="flex h-full flex-col gap-4">
        <div className="space-y-1 pb-1">
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
            Cuéntanos para <span className="text-[#5b3df5]">ayudarte mejor</span>
          </h3>
          <p className="text-base font-medium text-slate-400">
            Ingresa tu correo para comenzar.
          </p>
        </div>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
          <InputFormikNT
            id="email"
            classNames={INPUT_CLASSNAMES}
            properties={{
              input: { type: "email", placeholder: "Correo electrónico" },
            }}
          />
        </div>

        <Button
          form="pre-registration-email"
          type="submit"
          isLoading={loading}
          className="mt-1 h-14 w-full rounded-xl bg-[#5b3df5] text-base font-semibold text-white shadow-[0_18px_40px_rgba(91,61,245,0.28)] hover:bg-[#5032ef]"
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
  onResend,
  onSubmit,
}: {
  email: string;
  loading: boolean;
  resending: boolean;
  onResend: () => void;
  onSubmit: (values: { code: string }) => void;
}) {
  const form = useFormik({
    initialValues: { code: "" },
    validationSchema: yup.object().shape({
      code: yup
        .string()
        .required()
        .matches(/^\d{6}$/, "El código debe tener 6 dígitos"),
    }),
    onSubmit,
  });

  return (
    <FormikProvider value={form}>
      <Form id="pre-registration-code" className="flex h-full flex-col gap-4">
        <div className="space-y-1 pb-1">
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
            Confirma que <span className="text-[#5b3df5]">eres tú</span>
          </h3>
          <p className="text-base font-medium text-slate-400">
            Te enviamos un código a <span className="font-semibold">{email}</span>
          </p>
        </div>

        <InputFormikNT
          id="code"
          classNames={INPUT_CLASSNAMES}
          properties={{
            input: {
              inputMode: "numeric",
              maxLength: 6,
              placeholder: "Código de 6 dígitos",
            },
          }}
        />

        <Button
          type="button"
          variant="link"
          className="self-start"
          onClick={onResend}
          isLoading={resending}
        >
          Enviar un nuevo código
        </Button>

        <Button
          form="pre-registration-code"
          type="submit"
          isLoading={loading}
          className="mt-1 h-14 w-full rounded-xl bg-[#5b3df5] text-base font-semibold text-white shadow-[0_18px_40px_rgba(91,61,245,0.28)] hover:bg-[#5032ef]"
        >
          <span>Confirmar</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Form>
    </FormikProvider>
  );
}

function ProfileStep({
  loading,
  onSubmit,
}: {
  loading: boolean;
  onSubmit: (values: {
    firstNames: string;
    lastNames: string;
    phone: string;
  }) => void;
}) {
  const form = useFormik({
    initialValues: { firstNames: "", lastNames: "", phone: "" },
    validationSchema: yup.object().shape({
      firstNames: yup.string().required(),
      lastNames: yup.string().required(),
      phone: yup
        .string()
        .required("El número de celular es obligatorio")
        .test(
          "is-valid-phone",
          "El número de celular no es válido",
          (value) => !!value && isValidPhoneNumber(value)
        ),
    }),
    onSubmit,
  });

  return (
    <FormikProvider value={form}>
      <Form
        id="pre-registration-profile"
        className="flex h-full flex-col gap-4"
      >
        <div className="space-y-1 pb-1">
          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
            Cuéntanos <span className="text-[#5b3df5]">cómo te llamas</span>
          </h3>
          <p className="text-base font-medium text-slate-400">
            Así podemos ayudarte mejor.
          </p>
        </div>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
          <InputFormikNT
            id="firstNames"
            classNames={INPUT_CLASSNAMES}
            properties={{ input: { placeholder: "Nombres" } }}
          />
        </div>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
          <InputFormikNT
            id="lastNames"
            classNames={INPUT_CLASSNAMES}
            properties={{ input: { placeholder: "Apellidos" } }}
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

        <Button
          form="pre-registration-profile"
          type="submit"
          isLoading={loading}
          className="mt-1 h-14 w-full rounded-xl bg-[#5b3df5] text-base font-semibold text-white shadow-[0_18px_40px_rgba(91,61,245,0.28)] hover:bg-[#5032ef]"
        >
          <span>Continuar</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Form>
    </FormikProvider>
  );
}
