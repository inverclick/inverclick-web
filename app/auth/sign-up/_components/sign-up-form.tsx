"use client";

import {
  SignUpFormStepOne,
  StepOneFormValues,
} from "@/app/auth/sign-up/_components/sign-up-form-step-one";
import {
  SignUpFormStepThree,
  StepThreeFormValues,
} from "@/app/auth/sign-up/_components/sign-up-form-step-three";
import {
  SignUpFormStepTwo,
  StepTwoFormValues,
} from "@/app/auth/sign-up/_components/sign-up-form-step-two";
import { StepButton } from "@/app/auth/sign-up/_components/step-button";
import { Stepper } from "@/app/auth/sign-up/_components/stepper";
import { USER_CREATED } from "@/app/auth/sign-up/_constants/messages";
import { createClient } from "@/services/supabase/browser-client";
import { signUp } from "@/services/user/sign-up";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type SignUpValues = StepOneFormValues &
  StepTwoFormValues &
  StepThreeFormValues;

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState<Partial<SignUpValues>>({
    email: "",
    phone: "",
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1);

  const router = useRouter();

  return (
    <>
      {step === 1 && (
        <SignUpFormStepOne
          initialValues={{
            email: formValues.email || "",
            phone: formValues.phone || "",
          }}
          onNext={({ email, phone }) => {
            setFormValues((prev) => {
              return {
                ...prev,
                email,
                phone,
              };
            });

            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <SignUpFormStepTwo
          onBack={() => {
            setStep(1);
          }}
          initialValues={{
            name: formValues.name || "",
            nickname: formValues.nickname || "",
          }}
          onNext={({ name, nickname }) => {
            setFormValues((prev) => {
              return {
                ...prev,
                name,
                nickname,
              };
            });

            setStep(3);
          }}
        />
      )}
      {step === 3 && (
        <SignUpFormStepThree
          loading={loading}
          initialValues={{
            password: formValues.password || "",
            confirmPassword: formValues.confirmPassword || "",
          }}
          onNext={async ({ password, confirmPassword }) => {
            try {
              setLoading(true);

              const values: Partial<SignUpValues> = {
                ...formValues,
                password,
                confirmPassword,
              };

              setFormValues(values);

              await signUp(createClient())({
                email: values.email as string,
                phone: values.phone as string,
                name: values.name as string,
                nickname: values.nickname || null,
                password: values.password as string,
              });

              setLoading(false);

              toast.success(USER_CREATED);

              router.push("/auth/sign-in");
            } catch (error) {
              setLoading(false);

              if (error instanceof Error) {
                toast.error(error.message);
              }
            }
          }}
          onBack={() => {
            setStep(2);
          }}
        />
      )}
      <Stepper className="mt-8">
        <StepButton active={step > 1} current={step === 1} text="1" />
        <StepButton active={step > 2} current={step === 2} text="2" />
        <StepButton active={step > 3} current={step === 3} text="3" />
      </Stepper>
    </>
  );
}
