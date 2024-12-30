"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import Link from "next/link";

import * as yup from "yup";

export type StepTwoFormValues = {
  name: string;
  nickname: string;
};

export type SignUpFormStepTwoProps = Readonly<{
  initialValues: StepTwoFormValues;
  onBack: () => void;
  onNext: (values: StepTwoFormValues) => void;
}>;

export function SignUpFormStepTwo({
  initialValues,
  onBack,
  onNext,
}: SignUpFormStepTwoProps) {
  const form = useFormik<StepTwoFormValues>({
    initialValues,
    validationSchema: createFormSchema(),
    onSubmit: ({ name, nickname }) => {
      onNext({ name, nickname });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Typography variant="h3" className="text-center mb-8">
        Continúa creando tu cuenta
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-two-form" className="flex flex-col w-full">
          <InputFormikNT
            id="name"
            classNames={{ container: "mb-4" }}
            properties={{ input: { placeholder: "Nombre" } }}
          />
          <InputFormikNT
            id="nickname"
            classNames={{ container: "mb-6" }}
            properties={{
              input: { placeholder: "Cómo quieres que te llamemos" },
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
              form="sign-up-step-two-form"
              className="flex-grow"
            >
              Siguiente
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
    name: yup.string().required(),
    nickname: yup.string().min(0),
  });
};
