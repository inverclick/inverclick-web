"use client";

import { cn } from "@inverclick/inverclick-ui/lib";
import { ComponentProps } from "react";

export type StepperProps = ComponentProps<"div">;

export function Stepper({ children, className, ...props }: StepperProps) {
  return (
    <div
      className={cn("flex gap-16 justify-center items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
