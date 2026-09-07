"use client";

import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import Link from "next/link";

import * as yup from "yup";

export type StepOneFormValues = {
  email: string;
};

export type SignUpFormStepOneProps = Readonly<{
  loading: boolean;
  initialValues: StepOneFormValues;
  onNext: (values: StepOneFormValues) => void;
}>;

export function SignUpFormStepOne({
  loading,
  initialValues,
  onNext,
}: SignUpFormStepOneProps) {
  const form = useFormik<StepOneFormValues>({
    initialValues,
    validationSchema: createFormSchema(),
    onSubmit: ({ email }) => onNext({ email }),
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
            classNames={{ container: "mb-6" }}
            properties={{
              input: {
                type: "email",
                placeholder: "Correo electrónico",
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
  });
};
