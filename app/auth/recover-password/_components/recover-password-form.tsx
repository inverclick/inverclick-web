"use client";

import { recoverPasswordAction } from "@/actions/auth/recover-password";
import { PASSWORD_RECOVERED } from "@/app/auth/recover-password/_constants/messages";
import { Button } from "@inverclick/inverclick-ui/button";
import { ErrorMessage } from "@inverclick/inverclick-ui/error-message";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@inverclick/inverclick-ui/input-otp";
import { Label } from "@inverclick/inverclick-ui/label";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Link from "next/link";

import * as yup from "yup";

export function RecoverPasswordForm() {
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const router = useRouter();

  const form = useFormik({
    initialValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: createFormSchema(),
    onSubmit: async ({ code, password }) => {
      try {
        setLoading(true);

        await recoverPasswordAction({
          email,
          code,
          password,
        });

        toast.success(PASSWORD_RECOVERED);

        router.push(`/auth/sign-in?email=${encodeURIComponent(email)}`);
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
    <div className="flex flex-col justify-center items-center w-full">
      {email ? (
        <>
          <Typography variant="h3" className="text-center mb-4">
            Restablece tu contraseña
          </Typography>
          <Typography className="mb-8">
            Introduce el código de verificación enviado a tu correo electrónico
            y establece una nueva contraseña
          </Typography>
          <FormikProvider value={form}>
            <Form id="recovery-password-form" className="flex flex-col w-full">
              <div className="mb-4">
                <Label className="inline-flex mb-2">
                  Código de verificación
                </Label>
                <InputOTP
                  value={form.values.code}
                  onChange={(value) => form.setFieldValue("code", value)}
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {form.touched.code && form.errors.code && (
                  <ErrorMessage className="mt-1">
                    {form.errors.code}
                  </ErrorMessage>
                )}
              </div>
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
              <InputFormikNT
                id="confirmPassword"
                classNames={{
                  container: "w-full mb-6",
                }}
                properties={{
                  input: {
                    type: "password",
                    placeholder: "Confirmar contraseña",
                  },
                }}
              />
              <Button
                form="recovery-password-form"
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
        </>
      ) : (
        <Typography variant="h3" className="text-center">
          Falta el correo
        </Typography>
      )}
    </div>
  );
}

const createFormSchema = () => {
  return yup.object().shape({
    code: yup.string().length(6).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden"),
  });
};
