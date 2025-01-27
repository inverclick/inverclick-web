"use client";

import { sendRecoveryPasswordCode } from "@/app/auth/forgot-password/_services/send-recovery-password-code";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import * as yup from "yup";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: createFormSchema(),
    onSubmit: async ({ email }) => {
      try {
        setLoading(true);

        await sendRecoveryPasswordCode({ email });

        router.push(
          `/auth/recover-password?email=${encodeURIComponent(email)}`
        );
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-4 text-center">
        ¿Olvidaste tu contraseña?
      </Typography>
      <Typography className="mb-8">
        Ingresa tu dirección de correo electrónico y te enviaremos un código
        para restablecer tu contraseña
      </Typography>
      <FormikProvider value={form}>
        <Form id="forgot-password-form" className="flex w-full flex-col">
          <InputFormikNT
            id="email"
            classNames={{
              container: "w-full mb-4",
            }}
            properties={{
              input: {
                type: "email",
                placeholder: "Correo electrónico",
              },
            }}
          />
          <Button
            form="forgot-password-form"
            type="submit"
            isLoading={loading}
            className="mb-4"
          >
            Restablecer contraseña
          </Button>
          <Button variant="link">
            <Link href="/auth/sign-in">Volver al inicio de sesión</Link>
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
