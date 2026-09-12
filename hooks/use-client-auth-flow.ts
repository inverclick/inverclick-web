"use client";

import {
  ClientRecord,
  findClientByEmail,
  getAuthErrorMessage,
  isMissingAccountError,
  registerClient,
  sendSignInOtp,
  verifyEmailOtp,
} from "@/services/auth/client-auth";
import { createClient } from "@/services/supabase/browser-client";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export type ClientAuthStep = "form" | "code";

/**
 * Why the user is being asked for a code. Drives the copy each surface shows on
 * the code step, and whether the profile data collected in the form still has
 * to be persisted afterwards.
 */
export type ClientAuthOutcome = "registered" | "signed-in";

export type RegistrationValues = {
  fullName: string;
  phone: string;
  email: string;
};

export type UseClientAuthFlowParams = {
  /** A brand-new account was created and the user is already signed in. */
  onRegistered?: (client: ClientRecord) => void | Promise<void>;
  /** An existing account finished its OTP challenge. */
  onSignedIn?: (client: ClientRecord) => void | Promise<void>;
};

/**
 * Drives the three client authentication flows. Every surface — the
 * "Ver información" dialog, /auth/sign-up and /auth/sign-in — shares this hook
 * so the data flow is identical and only the presentation differs.
 *
 * Flow 1: registration form, email unknown  -> account created, no OTP.
 * Flow 2: registration form, email known    -> OTP to finish signing in.
 * Flow 3: sign-in form (email only)         -> OTP to finish signing in.
 */
export const useClientAuthFlow = ({
  onRegistered,
  onSignedIn,
}: UseClientAuthFlowParams = {}) => {
  const supabase = useMemo(() => createClient(), []);

  const [step, setStep] = useState<ClientAuthStep>("form");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  /**
   * Profile captured on the registration form while the user turned out to
   * already have an account. Kept so it can be saved once the code checks out,
   * instead of asking for it a second time.
   */
  const pendingProfile = useRef<{ fullName: string; phone: string } | null>(
    null
  );

  const reset = useCallback(() => {
    setStep("form");
    setEmail("");
    setLoading(false);
    setResending(false);
    pendingProfile.current = null;
  }, []);

  /** Flows 1 and 2: the registration form was submitted. */
  const submitRegistration = useCallback(
    async ({ fullName, phone, email: nextEmail }: RegistrationValues) => {
      setLoading(true);

      try {
        const existingClient = await findClientByEmail(supabase, nextEmail);

        // Flow 2 — already a client, so this is really a sign-in.
        if (existingClient) {
          await sendSignInOtp(supabase, nextEmail);

          pendingProfile.current = { fullName, phone };
          setEmail(nextEmail);
          setStep("code");

          return { status: "otp-sent" as const };
        }

        // Flow 1 — brand-new client, registered and signed in without an OTP.
        const result = await registerClient(supabase, {
          email: nextEmail,
          fullName,
          phone,
        });

        if (result.status === "requires-otp") {
          await sendSignInOtp(supabase, nextEmail);

          pendingProfile.current = { fullName, phone };
          setEmail(nextEmail);
          setStep("code");

          return { status: "otp-sent" as const };
        }

        await onRegistered?.(result.client);

        return { status: "registered" as const };
      } catch (error) {
        toast.error(getAuthErrorMessage(error, "register"));

        return { status: "error" as const };
      } finally {
        setLoading(false);
      }
    },
    [supabase, onRegistered]
  );

  /** Flow 3: the sign-in form was submitted (email only). */
  const submitSignInEmail = useCallback(
    async (nextEmail: string) => {
      setLoading(true);

      try {
        const existingClient = await findClientByEmail(supabase, nextEmail);

        if (!existingClient) {
          return { status: "not-registered" as const };
        }

        await sendSignInOtp(supabase, nextEmail);

        pendingProfile.current = null;
        setEmail(nextEmail);
        setStep("code");

        return { status: "otp-sent" as const };
      } catch (error) {
        if (isMissingAccountError(error)) {
          return { status: "not-registered" as const };
        }

        toast.error(getAuthErrorMessage(error, "send"));

        return { status: "error" as const };
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const submitCode = useCallback(
    async (code: string) => {
      setLoading(true);

      try {
        const client = await verifyEmailOtp(supabase, {
          email,
          code,
          profile: pendingProfile.current ?? undefined,
        });

        await onSignedIn?.(client);

        return { status: "signed-in" as const };
      } catch (error) {
        toast.error(getAuthErrorMessage(error, "verify"));

        return { status: "error" as const };
      } finally {
        setLoading(false);
      }
    },
    [supabase, email, onSignedIn]
  );

  const resendCode = useCallback(async () => {
    setResending(true);

    try {
      await sendSignInOtp(supabase, email);

      toast.success("Te enviamos un nuevo código");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setResending(false);
    }
  }, [supabase, email]);

  const backToForm = useCallback(() => setStep("form"), []);

  return {
    step,
    email,
    loading,
    resending,
    submitRegistration,
    submitSignInEmail,
    submitCode,
    resendCode,
    backToForm,
    reset,
  };
};
