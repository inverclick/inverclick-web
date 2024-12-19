"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";

import * as yup from "yup";

export const SignupNewsletter = () => {
  const form = useFormik({
    initialValues: { email: "" },
    validationSchema: SCHEMA,
    onSubmit: () => {},
  });

  return (
    <FormikProvider value={form}>
      <Form
        id="signup-newsletter-form"
        className="flex flex-col gap-2 md:max-w-sm xl:max-w-md text-base md:text-lg"
      >
        <Typography>
          Suscríbete <span className="text-primary font-medium">GRATIS</span>{" "}
          para recibir consejos y noticias de inversión.
        </Typography>
        <InputFormikNT
          id="email"
          properties={{
            input: { placeholder: "Ingresa tu correo electrónico" },
          }}
        />
        <div className="flex items-end justify-end">
          <Button form="signup-newsletter-form" type="submit">
            Suscribirse
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};

const SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
});
