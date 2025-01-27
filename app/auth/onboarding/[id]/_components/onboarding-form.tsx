"use client";

import {
  ACCOUNT_CREATED_SIGN_IN,
  ERROR_CREATING_ACCOUNT,
  ONBOARDING_FORM_DESCRIPTION,
  ONBOARDING_FORM_TITLE,
} from "@/app/auth/onboarding/[id]/_constants/messages";
import { User } from "@/app/auth/onboarding/[id]/_services/get-user";
import { CHATBOT_MESSAGES_LOCAL_STORAGE_KEY } from "@/constants/chatbot-messages";
import { PRE_REGISTRATION_COOKIE_NAME } from "@/constants/pre-registration";
import { createClient } from "@/services/supabase/browser-client";
import { Button } from "@inverclick/inverclick-ui/button";
import { InputFormikNT } from "@inverclick/inverclick-ui/input-formik";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Form, FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Cookies from "js-cookie";

import * as yup from "yup";

export type OnboardingFormProps = Readonly<{
  user: User;
}>;

export const OnboardingForm = ({ user }: OnboardingFormProps) => {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: createFormSchema(),
    onSubmit: async ({ password }) => {
      setLoading(true);

      try {
        const { data: signUp, error: signUpError } = await supabase.auth.signUp(
          {
            email: user.email,
            password,
          }
        );

        if (!signUp.user) {
          throw new Error(ERROR_CREATING_ACCOUNT);
        }

        if (signUpError) {
          throw new Error(signUpError.message);
        }

        await supabase.auth.signOut();

        const { error: updateUserError } = await supabase
          .from("users")
          .update({
            id: signUp.user.id,
            is_confirmed: true,
          })
          .eq("email", user.email)
          .select("*");

        if (updateUserError) {
          throw new Error(updateUserError.message);
        }

        setLoading(false);

        Cookies.remove(PRE_REGISTRATION_COOKIE_NAME);
        localStorage.removeItem(CHATBOT_MESSAGES_LOCAL_STORAGE_KEY);

        toast.success(ACCOUNT_CREATED_SIGN_IN);

        router.push(`/auth/sign-in?email=${user.email}`);
      } catch (error) {
        setLoading(false);

        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <FormikProvider value={form}>
      <Form id="onboarding-form" className="flex w-full max-w-lg flex-col">
        <Typography variant="h4" className="mb-4">
          {ONBOARDING_FORM_TITLE}
        </Typography>
        <Typography className="mb-6">{ONBOARDING_FORM_DESCRIPTION}</Typography>
        <InputFormikNT
          id="password"
          label="Contraseña"
          classNames={{ container: "mb-4" }}
          properties={{
            input: {
              type: "password",
            },
          }}
        />
        <InputFormikNT
          label="Confirmar contraseña"
          id="confirmPassword"
          classNames={{ container: "mb-4" }}
          properties={{
            input: {
              type: "password",
            },
          }}
        />
        <Button form="onboarding-form" type="submit" isLoading={loading}>
          Continuar
        </Button>
      </Form>
    </FormikProvider>
  );
};

const createFormSchema = () => {
  return yup.object().shape({
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), ""], "Las contraseñas no coinciden"),
  });
};
