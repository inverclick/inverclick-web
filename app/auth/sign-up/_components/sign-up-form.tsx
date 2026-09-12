"use client";

import {
  SignUpFormStepOne,
  StepOneFormValues,
} from "@/app/auth/sign-up/_components/sign-up-form-step-one";
import { SignUpFormStepTwo } from "@/app/auth/sign-up/_components/sign-up-form-step-two";
import {
  USER_CREATED,
  WELCOME_BACK,
} from "@/app/auth/sign-up/_constants/messages";
import { useClientAuthFlow } from "@/hooks/use-client-auth-flow";
import { toast } from "sonner";

export function SignUpForm() {
  /**
   * A hard navigation, not `router.push`: the session cookie was just written
   * on the client and the header reads the user from the server layout. A soft
   * navigation races `router.refresh()` and lands on /projects still showing
   * the signed-out header.
   */
  const goToProjects = (message: string) => () => {
    toast.success(message);
    window.location.assign("/projects");
  };

  const {
    step,
    email,
    loading,
    resending,
    submitRegistration,
    submitCode,
    resendCode,
    backToForm,
  } = useClientAuthFlow({
    onRegistered: goToProjects(USER_CREATED),
    onSignedIn: goToProjects(WELCOME_BACK),
  });

  const handleStepOneNext = (values: StepOneFormValues) =>
    submitRegistration(values);

  return (
    <>
      {step === "form" && (
        <SignUpFormStepOne loading={loading} onNext={handleStepOneNext} />
      )}
      {step === "code" && (
        <SignUpFormStepTwo
          email={email}
          loading={loading}
          resending={resending}
          onBack={backToForm}
          onResend={resendCode}
          onNext={submitCode}
        />
      )}
    </>
  );
}
