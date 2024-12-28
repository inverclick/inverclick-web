"use client";

import {
  PRE_REGISTRATION_DESCRIPTION,
  PRE_REGISTRATION_TITLE,
} from "@/components/shared/pre-registration/messages";
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
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Turnstile from "react-turnstile";

import * as yup from "yup";

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

      const body = (await response.json()) as APIResponse<PreRegistrationType>;

      setIsLoading(false);
      setIsPreRegistrationOpen(false);

      if (!body.success) {
        return toast.error(body.message);
      }

      if (response.status === 303) {
        toast.success(body.message);

        return router.push(`/auth/sign-in?email=${email}`);
      }

      setPreRegistration(body.data);

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
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-xl"
      >
        <DialogHeader>
          <DialogTitle>{PRE_REGISTRATION_TITLE}</DialogTitle>
          <DialogDescription>{PRE_REGISTRATION_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <FormikProvider value={form}>
          <Form id="pre-registration" className="my-4">
            <InputFormikNT
              id="name"
              classNames={{
                container: "mb-4",
              }}
              properties={{
                input: {
                  placeholder: "Nombre",
                },
              }}
            />
            <InputFormikNT
              id="email"
              classNames={{
                container: "mb-4",
              }}
              properties={{
                input: {
                  placeholder: "Correo electrónico",
                },
              }}
            />
            <PhoneInputFormikNT
              id="phone"
              classNames={{
                container: "mb-4",
              }}
              properties={{
                phoneInput: {
                  placeholder: "Teléfono",
                  customLabels: {
                    input: "Busca el país",
                    notFound: "País no encontrado",
                  },
                },
              }}
            />
            <InputFormikNT
              id="nickname"
              properties={{
                input: {
                  placeholder: "Cómo quieres que te llamemos",
                },
              }}
            />
            <div className="mt-6">
              <Turnstile
                sitekey={ENV_VARS.TURNSTILE_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                fixedSize={true}
                size="flexible"
                theme="light"
              />
            </div>
          </Form>
        </FormikProvider>
        <DialogFooter>
          <Button form="pre-registration" type="submit" isLoading={isLoading}>
            Continuar
          </Button>
        </DialogFooter>
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
