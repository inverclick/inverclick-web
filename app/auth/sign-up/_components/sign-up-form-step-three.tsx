"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { PhoneInputFormikNT } from "@inverclick/inverclick-ui/phone-input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import Link from "next/link";

import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

export type StepThreeFormValues = {
  firstNames: string;
  lastNames: string;
  phone: string;
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
    onSubmit: ({ firstNames, lastNames, phone }) =>
      onNext({ firstNames, lastNames, phone }),
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-8 text-center">
        Cuéntanos cómo debemos llamarte
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-up-step-three-form" className="flex w-full flex-col">
          <InputFormikNT
            id="firstNames"
            classNames={{ container: "mb-4" }}
            properties={{ input: { placeholder: "Nombres" } }}
          />
          <InputFormikNT
            id="lastNames"
            classNames={{ container: "mb-4" }}
            properties={{ input: { placeholder: "Apellidos" } }}
          />
          <PhoneInputFormikNT
            id="phone"
            classNames={{ container: "mb-6" }}
            properties={{
              phoneInput: {
                defaultCountry: "CO",
                placeholder: "Número de celular",
              },
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
    firstNames: yup.string().required(),
    lastNames: yup.string().required(),
    phone: yup
      .string()
      .required("El número de celular es obligatorio")
      .test(
        "is-valid-phone",
        "El número de celular no es válido",
        (value) => !!value && isValidPhoneNumber(value)
      ),
  });
};
