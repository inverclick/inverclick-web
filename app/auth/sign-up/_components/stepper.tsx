"use client";

import { cn } from "@inverclick/inverclick-ui/lib";
import { ComponentProps } from "react";

export type StepperProps = ComponentProps<"div">;

export function Stepper({ children, className, ...props }: StepperProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-16", className)}
      {...props}
    >
      {children}
    </div>
  );
}
