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
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-8 text-center">
        Continúa creando tu cuenta
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-two-form" className="flex w-full flex-col">
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
          <div className="mb-8 grid w-full grid-cols-2 gap-4">
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
