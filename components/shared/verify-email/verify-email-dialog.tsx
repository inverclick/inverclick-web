"use client";

import {
  OTP_CODE_LENGTH,
  OtpCodeInput,
} from "@/components/shared/otp-code-input/otp-code-input";
import { useUser } from "@/contexts/user-context";
import {
  getAuthErrorMessage,
  sendSignInOtp,
  verifyEmailOtp,
} from "@/services/auth/client-auth";
import { createClient } from "@/services/supabase/browser-client";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export type VerifyEmailDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>;

type Step = "intro" | "code";

/**
 * Lets a signed-in client finish verifying their email. Registration no longer
 * sends an OTP, so this is the second of the two ways
 * `user_clients.is_email_confirmed` can flip to true — the other being a normal
 * OTP sign-in.
 */
export const VerifyEmailDialog = ({
  open,
  onOpenChange,
}: VerifyEmailDialogProps) => {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const { user } = useUser();

  const [step, setStep] = useState<Step>("intro");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const email = user?.email ?? "";

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setStep("intro");
      setCode("");
    }
  };

  const handleSend = async () => {
    setSending(true);

    try {
      await sendSignInOtp(supabase, email);

      setStep("code");
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "send"));
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (nextCode: string) => {
    setVerifying(true);

    try {
      await verifyEmailOtp(supabase, { email, code: nextCode });

      toast.success("¡Listo! Tu correo quedó verificado");
      handleOpenChange(false);

      // Refresh so the server layout re-reads the flag and the menu entry goes away.
      router.refresh();
    } catch (error) {
      toast.error(getAuthErrorMessage(error, "verify"));
      setCode("");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md !rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            {step === "intro" ? (
              <ShieldCheck className="h-8 w-8" />
            ) : (
              <MailCheck className="h-8 w-8" />
            )}
          </div>

          <DialogTitle className="mb-2 text-2xl font-semibold tracking-[-0.02em] text-slate-900">
            {step === "intro" ? "Valida tu correo" : "Revisa tu correo"}
          </DialogTitle>

          <DialogDescription className="mb-6 text-base text-slate-500">
            {step === "intro" ? (
              <>
                Te enviaremos un código de 6 dígitos a{" "}
                <span className="font-semibold text-slate-700">{email}</span>{" "}
                para confirmar que es tuyo.
              </>
            ) : (
              <>
                Escribe el código que enviamos a{" "}
                <span className="font-semibold text-slate-700">{email}</span>
              </>
            )}
          </DialogDescription>

          {step === "intro" ? (
            <Button
              type="button"
              className="w-full"
              isLoading={sending}
              onClick={handleSend}
            >
              Enviar código
            </Button>
          ) : (
            <div className="flex w-full flex-col">
              <OtpCodeInput
                autoFocus
                className="mb-4"
                value={code}
                onChange={setCode}
                onComplete={handleVerify}
                disabled={verifying}
              />
              <Button
                type="button"
                className="mb-2 w-full"
                isLoading={verifying}
                disabled={code.length !== OTP_CODE_LENGTH}
                onClick={() => handleVerify(code)}
              >
                Validar correo
              </Button>
              <Button
                type="button"
                variant="link"
                className="self-center text-sm text-slate-500"
                onClick={handleSend}
                isLoading={sending}
              >
                Enviar un nuevo código
              </Button>
              <Button
                type="button"
                variant="link"
                className="self-center text-sm text-slate-500"
                onClick={() => {
                  setStep("intro");
                  setCode("");
                }}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Volver
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
