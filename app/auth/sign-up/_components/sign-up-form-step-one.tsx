"use client";

import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import Link from "next/link";

import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

export type StepOneFormValues = {
  fullName: string;
  phone: string;
  email: string;
};

export type SignUpFormStepOneProps = Readonly<{
  loading: boolean;
  onNext: (values: StepOneFormValues) => void;
}>;

export function SignUpFormStepOne({ loading, onNext }: SignUpFormStepOneProps) {
  const form = useFormik<StepOneFormValues>({
    initialValues: { fullName: "", phone: "", email: "" },
    validationSchema: createFormSchema(),
    onSubmit: onNext,
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
            id="fullName"
            classNames={{ container: "mb-4" }}
            properties={{
              input: {
                autoComplete: "name",
                placeholder: "Nombre completo",
              },
            }}
          />
          <PhoneInputFormikNT
            id="phone"
            classNames={{ container: "mb-4" }}
            properties={{
              phoneInput: {
                defaultCountry: "CO",
                placeholder: "Número de celular",
              },
            }}
          />
          <InputFormikNT
            id="email"
            classNames={{ container: "mb-6" }}
            properties={{
              input: {
                type: "email",
                autoComplete: "email",
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
            Crear mi cuenta
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
  });
};
