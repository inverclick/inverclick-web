"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import * as yup from "yup";

export type StepTwoFormValues = {
  code: string;
};

export type SignUpFormStepTwoProps = Readonly<{
  email: string;
  loading: boolean;
  resending: boolean;
  onBack: () => void;
  onResend: () => void;
  onNext: (values: StepTwoFormValues) => void;
}>;

export function SignUpFormStepTwo({
  email,
  loading,
  resending,
  onBack,
  onResend,
  onNext,
}: SignUpFormStepTwoProps) {
  const form = useFormik<StepTwoFormValues>({
    initialValues: { code: "" },
    validationSchema: createFormSchema(),
    onSubmit: ({ code }) => onNext({ code }),
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        Confirma que eres tú
      </Typography>
      <Typography className="mb-8 text-center">
        Te enviamos un código a <span className="font-bold">{email}</span>
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-two-form" className="flex w-full flex-col">
          <InputFormikNT
            id="code"
            classNames={{ container: "mb-4" }}
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
            className="mb-6 self-start"
            onClick={onResend}
            isLoading={resending}
          >
            Enviar un nuevo código
          </Button>
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
              isLoading={loading}
            >
              Confirmar
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

const createFormSchema = () => {
  return yup.object().shape({
    code: yup
      .string()
      .required()
      .matches(/^\d{6}$/, "El código debe tener 6 dígitos"),
  });
};
