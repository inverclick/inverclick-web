"use client";

import { USER_ALREADY_EXISTS } from "@/app/auth/sign-up/_constants/messages";
import { isUserAlreadyRegistered } from "@/app/auth/sign-up/_services/is-user-already-registered";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import * as yup from "yup";

export type StepOneFormValues = {
  email: string;
  phone: string;
};

export type SignUpFormStepOneProps = Readonly<{
  initialValues: StepOneFormValues;
  onNext: (values: StepOneFormValues) => void;
}>;

export function SignUpFormStepOne({
  initialValues,
  onNext,
}: SignUpFormStepOneProps) {
  const [loading, setLoading] = useState(false);

  const form = useFormik<StepOneFormValues>({
    initialValues,
    validationSchema: createFormSchema(),
    onSubmit: async ({ email, phone }) => {
      setLoading(true);

      const userAlreadyRegistered = await isUserAlreadyRegistered({ email });

      if (userAlreadyRegistered) {
        setLoading(false);

        toast.success(USER_ALREADY_EXISTS);
        return;
      }

      setLoading(false);

      onNext({ email, phone });
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        ¡Empecemos!
      </Typography>
      <Typography className="mb-8">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/sign-in" className="font-bold">
          Inicia sesión
        </Link>
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-one-form" className="flex w-full flex-col">
          <InputFormikNT
            id="email"
            classNames={{ container: "mb-4" }}
            properties={{
              input: {
                type: "email",
                placeholder: "Correo electrónico",
              },
            }}
          />
          <PhoneInputFormikNT
            id="phone"
            classNames={{
              container: "mb-6",
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
          <Button
            type="submit"
            form="sign-up-step-one-form"
            className="mb-8 w-full"
            isLoading={loading}
          >
            Siguiente
          </Button>
          <Typography className="mb-8 text-center">
            Al registrarte, aceptas nuestras{" "}
            <Link href="/policy" className="font-bold">
              Políticas de Privacidad
            </Link>{" "}
            y{" "}
            <Link href="/terms-conditions" className="font-bold">
              Términos y Condiciones
            </Link>
          </Typography>
          <DownloadAppModal />
          <Button variant="link" className="mt-4 lg:hidden">
            <Link href="/">Soy constructora</Link>
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
}

const createFormSchema = () => {
  return yup.object().shape({
    email: yup.string().email().required(),
    phone: yup.string().required(),
  });
};
