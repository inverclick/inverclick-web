"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { ENV_VARS } from "@/global/env";
import { APIResponse } from "@/types/api";
import {
  PreRegistrationFormValues,
  PreRegistration as PreRegistrationType,
} from "@/types/pre-registration";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { RPNInput } from "@inverclick/inverclick-ui/phone-input";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Form, FormikProvider, useFormik } from "formik";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  MessageCircleMore,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Turnstile from "react-turnstile";

import * as yup from "yup";
import Image from "next/image";

export const PreRegistration = () => {
  const { isPreRegistrationOpen } = usePreRegistration();

  return <>{isPreRegistrationOpen && <PreRegistrationContent />}</>;
};

const PreRegistrationContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const {
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    setPreRegistration,
    setWelcomeDialogOpen,
  } = usePreRegistration();

  const router = useRouter();

  const form = useFormik<PreRegistrationFormValues>({
    validateOnMount: true,
    initialValues: { name: "", email: "", phone: "", nickname: "" },
    validationSchema: createFormSchema(),
    onSubmit: async ({ name, email, phone, nickname }) => {
      setIsLoading(true);

      const response = await fetch("/api/pre-registration", {
        body: JSON.stringify({
          name,
          email,
          phone,
          nickname: nickname.trim() || null,
          captchaToken,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await response.json()) as APIResponse<PreRegistrationType>;

      setIsLoading(false);
      setIsPreRegistrationOpen(false);

      if (!response.ok) {
        toast.error(data.message);

        if (data.code === "already_registered") {
          router.push(`/auth/sign-in?email=${encodeURIComponent(email)}`);
        }

        return;
      }

      setPreRegistration(data.data);

      setWelcomeDialogOpen(true);

      router.refresh();
    },
  });

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
        <FormikProvider value={form}>
          <section className="flex ">
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
              <Form id="pre-registration" className="flex h-full flex-col gap-4">
                <div className="space-y-1 pb-1">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900">
                    Cuéntanos para <span className="text-[#5b3df5]">ayudarte mejor</span>
                  </h3>
                  <p className="text-base font-medium text-slate-400">
                    Ingresa tus datos para comenzar.
                  </p>
                </div>

                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
                  <InputFormikNT
                    id="name"
                    classNames={{
                      container: "mb-0",
                      input:
                        "h-14 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400",
                      error: "mt-1 text-xs",
                    }}
                    properties={{
                      input: {
                        placeholder: "Nombre",
                      },
                    }}
                  />
                </div>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
                  <InputFormikNT
                    id="email"
                    classNames={{
                      container: "mb-0",
                      input:
                        "h-14 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400",
                      error: "mt-1 text-xs",
                    }}
                    properties={{
                      input: {
                        placeholder: "Correo electrónico",
                      },
                    }}
                  />
                </div>

                <PhoneInputFormikNT
                  id="phone"
                  classNames={{
                    container: "mb-0",
                    phoneInput:
                      "h-14 overflow-hidden rounded-xl border border-slate-200 bg-white text-sm text-slate-700 transition-colors focus-within:border-[#8c6bff] focus-within:ring-2 focus-within:ring-[#ede7ff] [&>button]:h-full [&>button]:rounded-none [&>button]:border-0 [&>button]:border-r [&>button]:border-slate-200 [&>button]:bg-transparent [&>button]:px-3 [&>button]:shadow-none hover:[&>button]:bg-slate-50 [&>input]:h-full [&>input]:rounded-none [&>input]:border-0 [&>input]:bg-transparent [&>input]:px-4 [&>input]:text-sm [&>input]:text-slate-700 [&>input]:placeholder:text-slate-400 [&>input]:focus-visible:ring-0",
                    error: "mt-1 text-xs",
                  }}
                  properties={{
                    phoneInput: {
                      placeholder: "Teléfono",
                      customLabels: {
                        input: "Busca el país",
                        notFound: "País no encontrado",
                      },
                      countryOptionsOrder: [
                        "CO",
                        "US",
                        ...RPNInput.getCountries().filter(
                          (country) => !["CO", "US"].includes(country)
                        ),
                      ],
                    },
                  }}
                />

                <div className="relative">
                  <MessageCircleMore className="pointer-events-none absolute left-4 top-7 z-10 h-5 w-5 -translate-y-1/2 text-[#9d6bff]" />
                  <InputFormikNT
                    id="nickname"
                    classNames={{
                      container: "mb-0",
                      input:
                        "h-14 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400",
                      error: "mt-1 text-xs",
                    }}
                    properties={{
                      input: {
                        placeholder: "Cómo quieres que te llamemos",
                      },
                    }}
                  />
                </div>

                {/* <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(91,61,245,0.06)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0eaff] text-[#5b3df5]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Tus datos están seguros</p>
                        <p className="max-w-[22ch] text-xs leading-5 text-slate-500">
                          Usamos tecnología de confianza para proteger tu información.
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      <p className="text-slate-500">Cloudflare</p>
                      <div className="mt-2 flex items-center justify-end gap-2 normal-case tracking-normal">
                        <Link href="/policy" className="text-[10px] font-medium text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline">
                          Privacidad
                        </Link>
                        <span className="text-slate-300">·</span>
                        <Link href="/terms-conditions" className="text-[10px] font-medium text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline">
                          Ayuda
                        </Link>
                      </div>
                    </div>
                  </div>
                </div> */}

                
                <Turnstile
                  sitekey={ENV_VARS.TURNSTILE_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  fixedSize={true}
                  size="flexible"
                  theme="light"
                />

                <Button
                  form="pre-registration"
                  type="submit"
                  isLoading={isLoading}
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
            </div>
          </section>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

function createFormSchema() {
  return yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    nickname: yup.string().min(0),
  });
}
