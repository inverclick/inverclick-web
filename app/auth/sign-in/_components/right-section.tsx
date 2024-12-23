"use client";

import { OrSeparator } from "@/components/shared/or-separator/or-separator";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { useUser } from "@/contexts/user-context";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import * as yup from "yup";

export const RightSection = () => {
  const { signIn } = useUser();

  const searchParams = useSearchParams();

  const form = useFormik({
    initialValues: {
      email: searchParams.get("email") || "",
      password: "",
    },
    validationSchema: createFormSchema(),
    onSubmit: async ({ email, password }) => {
      await signIn({
        email,
        password,
      });
    },
  });

  return (
    <div className="flex flex-col justify-center items-center w-full p-content-full">
      <Typography variant="h3" className="text-center mb-8">
        <span className="block">Escribe el correo electrónico</span>
        <span className="block">asociado a tu cuenta de Inverclick</span>
      </Typography>
      <FormikProvider value={form}>
        <Form id="sign-in-form" className="flex flex-col gap-4 w-full">
          <InputFormikNT
            id="email"
            classNames={{
              container: "w-full",
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
              container: "w-full",
            }}
            properties={{
              input: {
                type: "password",
                placeholder: "Contraseña",
              },
            }}
          />
          <Link href="/" className="self-start text-primary mb-4">
            He olvidado mi contraseña
          </Link>
          <Button form="sign-in-form" type="submit">
            Iniciar sesión
          </Button>
          <OrSeparator />
          <Button variant="link">
            <Link href="/auth/sign-up">Crear una cuenta</Link>
          </Button>
          <DownloadAppModal />
          <Link href="/" className="lg:hidden text-primary">
            Soy constructora
          </Link>
        </Form>
      </FormikProvider>
    </div>
  );
};

const createFormSchema = () => {
  return yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
};
