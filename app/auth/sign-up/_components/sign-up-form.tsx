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
import {
  CODE_RESENT,
  USER_CREATED,
} from "@/app/auth/sign-up/_constants/messages";
import {
  AuthMode,
  completeClientSignUp,
  getAuthErrorMessage,
  isMissingExistingUserError,
  sendOtp,
} from "@/services/auth/otp-client-auth";
import { createClient } from "@/services/supabase/browser-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function SignUpForm() {
  const supabase = createClient();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleStepOneNext = async ({ email: nextEmail }: StepOneFormValues) => {
    try {
      setLoading(true);

      const existingUserOtpResult = await sendOtp(supabase, nextEmail, false);
      let nextAuthMode: AuthMode = "existing";

      if (existingUserOtpResult.error) {
        if (!isMissingExistingUserError(existingUserOtpResult.error)) {
          throw existingUserOtpResult.error;
        }

        const signupOtpResult = await sendOtp(supabase, nextEmail, true);

        if (signupOtpResult.error) {
          throw signupOtpResult.error;
        }

        nextAuthMode = "signup";
      }

      setEmail(nextEmail);
      setAuthMode(nextAuthMode);
      setStep(2);
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      const { error } = await sendOtp(supabase, email, authMode === "signup");

      if (error) {
        throw error;
      }

      toast.success(CODE_RESENT);
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setResending(false);
    }
  };

  const handleStepTwoNext = async ({ code }: StepTwoFormValues) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (error) {
        throw error;
      }

      if (authMode === "existing") {
        router.refresh();
        router.push("/projects");
        return;
      }

      setStep(3);
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "verify"));
    } finally {
      setLoading(false);
    }
  };

  const handleStepThreeNext = async ({
    firstNames,
    lastNames,
    phone,
  }: StepThreeFormValues) => {
    try {
      setLoading(true);

      await completeClientSignUp(supabase, {
        email,
        firstNames,
        lastNames,
        phone,
      });

      toast.success(USER_CREATED);

      router.refresh();
      router.push("/projects");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "profile"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {step === 1 && (
        <SignUpFormStepOne
          loading={loading}
          initialValues={{ email }}
          onNext={handleStepOneNext}
        />
      )}
      {step === 2 && (
        <SignUpFormStepTwo
          email={email}
          loading={loading}
          resending={resending}
          onBack={() => setStep(1)}
          onResend={handleResend}
          onNext={handleStepTwoNext}
        />
      )}
      {step === 3 && (
        <SignUpFormStepThree
          loading={loading}
          initialValues={{ firstNames: "", lastNames: "", phone: "" }}
          onBack={() => setStep(2)}
          onNext={handleStepThreeNext}
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
