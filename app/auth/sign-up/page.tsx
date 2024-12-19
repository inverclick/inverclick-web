"use client";

import { StepOne } from "@/components/auth/sign-up/step-one";
import { StepThree } from "@/components/auth/sign-up/step-three";
import { StepTwo } from "@/components/auth/sign-up/step-two";
import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";

import "react-phone-input-2/lib/style.css";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="flex-grow lg:divided-background-2">
          <article className="grid grid-cols-1 lg:grid-cols-2 place-content-center max-w-screen-2xl h-full mx-auto">
            <LeftSection />
            <RightSection />
          </article>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function RightSection() {
  return (
    <div className="relative flex justify-center items-center p-content lg:p-content-full">
      <h2 className="text-center lg:text-left text-3xl lg:text-5xl font-bold">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary-500">VERTE!</span>
        </p>
      </h2>
    </div>
  );
}

function LeftSection() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <StepOne />}
      {step === 2 && (
        <StepTwo
          onBack={() => {
            setStep(1);
          }}
        />
      )}
      {step === 3 && (
        <StepThree
          onBack={() => {
            setStep(2);
          }}
        />
      )}
      <Stepper>
        <StepButton
          onClick={() => setStep(1)}
          active={step > 1}
          current={step === 1}
          text="1"
        />
        <StepButton
          onClick={() => setStep(2)}
          active={step > 2}
          current={step === 2}
          text="2"
        />
        <StepButton
          onClick={() => setStep(3)}
          active={step > 3}
          current={step === 3}
          text="3"
        />
      </Stepper>
    </div>
  );
}

type StepperProps = Readonly<{}> & ComponentProps<"div">;

function Stepper({ children, className, ...props }: StepperProps) {
  return (
    <div
      className={cn("flex gap-16 justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type StepButtonProps = Readonly<{
  text: string;
  current: boolean;
  active: boolean;
  onClick: () => void;
}> &
  ComponentProps<"button">;

function StepButton({
  text,
  current,
  active,
  className,
  onClick,
  ...props
}: StepButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn("relative step  border rounded-full", className, {
        "border-transparent": current || active,
        "border-slate-400": !(current || active),
        "w-10 h-10": current || active,
        "w-8 h-8": !(current || active),
        "bg-primary-600 text-white": current || active,
        "bg-white": !(current || active),
      })}
      {...props}
    >
      {(current || active) && text}
    </button>
  );
}
