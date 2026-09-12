"use client";

import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@inverclick/inverclick-ui/input-otp";

export const OTP_CODE_LENGTH = 6;

export type OtpCodeInputProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  /** Renders the slots in red while an invalid code is on screen. */
  invalid?: boolean;
  autoFocus?: boolean;
  className?: string;
  slotClassName?: string;
}>;

/**
 * Six-slot code entry shared by every surface that challenges the user with an
 * OTP. Callers pass their own slot styling so the control matches the design it
 * sits in, while the behaviour (paste, autofill, auto-submit) stays identical.
 */
export const OtpCodeInput = ({
  value,
  onChange,
  onComplete,
  disabled,
  invalid,
  autoFocus,
  className,
  slotClassName,
}: OtpCodeInputProps) => {
  return (
    <InputOTP
      maxLength={OTP_CODE_LENGTH}
      value={value}
      onChange={onChange}
      onComplete={onComplete}
      disabled={disabled}
      autoFocus={autoFocus}
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="one-time-code"
      aria-label="Código de verificación"
      aria-invalid={invalid}
      containerClassName={cn("w-full justify-center", className)}
    >
      <InputOTPGroup className="w-full justify-between gap-2 sm:gap-3">
        {Array.from({ length: OTP_CODE_LENGTH }, (_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className={cn(
              "h-14 flex-1 rounded-xl border !border-l text-lg font-semibold transition-colors",
              "border-slate-200 bg-white text-slate-800",
              invalid && "border-destructive text-destructive",
              slotClassName
            )}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};
