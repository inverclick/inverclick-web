"use client";

import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { useUser } from "@/contexts/user-context";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import Link from "next/link";

import * as yup from "yup";

export function SignInForm() {
  const [loading, setLoading] = useState(false);

  const { signIn } = useUser();

  const searchParams = useSearchParams();

  const form = useFormik({
    initialValues: {
      email: searchParams.get("email") || "",
      password: "",
    },
    validationSchema: createFormSchema(),
    onSubmit: async ({ email, password }) => {
      setLoading(true);

      await signIn({
        email,
        password,
      });

      setLoading(false);
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Typography variant="h3" className="mb-8 text-center">
        <span className="block">Escribe el correo electrónico</span>
        <span className="block">asociado a tu cuenta de Inverclick</span>
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-in-form" className="flex w-full flex-col">
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
          <InputFormikNT
            id="password"
            classNames={{
              container: "w-full mb-4",
            }}
            properties={{
              input: {
                type: "password",
                placeholder: "Contraseña",
              },
            }}
          />
          <Link
            href="/auth/forgot-password"
            className="mb-6 self-start text-primary"
          >
            He olvidado mi contraseña
          </Link>
          <Button
            form="sign-in-form"
            type="submit"
            isLoading={loading}
            className="mb-4"
          >
            Iniciar sesión
          </Button>
          <Button variant="link" className="mb-4">
            <Link href="/auth/sign-up">Crear una cuenta</Link>
          </Button>
          <DownloadAppModal />
          <Button variant="link" className="lg:hidden">
            <Link href="https://company.inverclick.com">Soy constructora</Link>
          </Button>
        </Form>
      </FormikProvider>
    </div>
  );
}

const createFormSchema = () => {
  return yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
};
