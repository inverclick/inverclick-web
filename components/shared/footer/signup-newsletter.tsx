"use client";

import { registerUserToNewsletter } from "@/components/shared/footer/services/register-email-to-newsletter";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import * as yup from "yup";

export const SignupNewsletter = () => {
  const [loading, setLoading] = useState(false);
  const [emailRegistered, setEmailRegistered] = useState(false);

  const form = useFormik({
    initialValues: { email: "" },
    validationSchema: createFormSchema(),
    onSubmit: async ({ email }) => {
      setLoading(true);
      try {
        await registerUserToNewsletter(email);
        setEmailRegistered(true);
        form.resetForm();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (emailRegistered && form.values.email) {
      setEmailRegistered(false);
    }
  }, [form.values.email, emailRegistered]);

  return (
    <FormikProvider value={form}>
      <Form
        id="signup-newsletter-form"
        className="flex flex-col gap-4 md:max-w-sm xl:max-w-md text-base md:text-lg"
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
          <Button
            form="signup-newsletter-form"
            type="submit"
            isLoading={loading}
          >
            {!emailRegistered ? "Suscribirse" : "Suscrito"}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};

const createFormSchema = () =>
  yup.object().shape({
    email: yup.string().email().required(),
  });
