"use client";

import { useChatbot } from "@/contexts/chatbot-context";
import { usePreRegistration } from "@/contexts/pre-registration-context";
import { ENV_VARS } from "@/global/env";
import { PreRegistrationValues } from "@/types/pre-registration";
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
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Turnstile from "react-turnstile";

import * as yup from "yup";

export const PreRegistration = () => {
  const { isPreRegistrationOpen } = usePreRegistration();

  return <>{isPreRegistrationOpen && <PreRegistrationContent />}</>;
};

const PreRegistrationContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const { shouldOpenChatbot, setIsChatOpen } = useChatbot();

  const {
    isPreRegistrationOpen,
    setIsPreRegistrationOpen,
    setPreRegistration,
  } = usePreRegistration();

  const router = useRouter();

  const form = useFormik<PreRegistrationValues>({
    validateOnMount: true,
    initialValues: { name: "", email: "" },
    validationSchema: createFormSchema(),
    onSubmit: async ({ name, email }) => {
      setIsLoading(true);

      const response = await fetch("/api/pre-registration", {
        body: JSON.stringify({
          name,
          email,
          captchaToken,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        setIsLoading(false);
        alert("Error de validación, intenta de nuevo.");
        return;
      }

      const preRegistration = await response.json();

      setPreRegistration(preRegistration);
      setIsPreRegistrationOpen(false);

      setIsLoading(false);

      if (shouldOpenChatbot) {
        setIsChatOpen(true);
      }

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
          <DialogTitle>
            Accede a nuestro asistente virtual y descubre toda nuestra oferta
          </DialogTitle>
          <DialogDescription>
            Nuestro asistente te ayudará a encontrar inmuebles ideales, simular
            créditos, conocer opciones de financiación y resolver tus dudas
            sobre la compra de vivienda de manera sencilla y clara.
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={form}>
          <Form id="pre-registration" className="my-4">
            <InputFormikNT
              id="name"
              form={form}
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
              form={form}
              properties={{
                input: {
                  id: "email",
                  placeholder: "Correo electrónico",
                },
              }}
            />
            <div className="mt-4">
              <Turnstile
                sitekey={ENV_VARS.TURNSTILE_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
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
  });
}
