"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import Link from "next/link";

import * as yup from "yup";

export type StepThreeFormValues = {
  password: string;
  confirmPassword: string;
};

export type SignUpFormStepThreeProps = Readonly<{
  loading: boolean;
  initialValues: StepThreeFormValues;
  onBack: () => void;
  onNext: (values: StepThreeFormValues) => void;
}>;

export function SignUpFormStepThree({
  loading,
  initialValues,
  onBack,
  onNext,
}: SignUpFormStepThreeProps) {
  const form = useFormik<StepThreeFormValues>({
    initialValues,
    validationSchema: createFormSchema(),
    onSubmit: ({ password, confirmPassword }) => {
      onNext({ password, confirmPassword });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Typography variant="h3" className=" text-center  mb-8">
        Ya casi puedes iniciar sesión
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-three-form" className="flex flex-col w-full">
          <InputFormikNT
            id="password"
            classNames={{ container: "mb-4" }}
            properties={{
              input: { type: "password", placeholder: "Contraseña" },
            }}
          />
          <InputFormikNT
            id="confirmPassword"
            classNames={{ container: "mb-6" }}
            properties={{
              input: { type: "password", placeholder: "Confirmar contraseña" },
            }}
          />
          <div className="grid grid-cols-2 gap-4 mb-8 w-full">
            <Button
              type="button"
              variant="secondary"
              className="flex-grow"
              onClick={onBack}
            >
              Volver
            </Button>
            <Button
              type="submit"
              form="sign-up-step-three-form"
              className="flex-grow"
              isLoading={loading}
            >
              Registrarme
            </Button>
          </div>
          <Typography className="text-center">
            Al registrarte, aceptas nuestras{" "}
            <Link href="/policy" className="font-bold underline">
              Políticas de Privacidad
            </Link>{" "}
            y{" "}
            <Link href="/terms-conditions" className="font-bold underline">
              Términos y Condiciones
            </Link>
          </Typography>
        </Form>
      </FormikProvider>
    </div>
  );
}

const createFormSchema = () => {
  return yup.object().shape({
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden"),
  });
};
