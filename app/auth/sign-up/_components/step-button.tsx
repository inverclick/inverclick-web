"use client";

import { cn } from "@inverclick/inverclick-ui/lib";
import { ComponentProps } from "react";

export type StepButtonProps = Readonly<{
  text: string;
  current: boolean;
  active: boolean;
  onClick?: () => void;
}> &
  ComponentProps<"button">;

export function StepButton({
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
      className={cn("step relative rounded-full border", className, {
        "border-transparent": current || active,
        "border-slate-400": !(current || active),
        "h-10 w-10": current || active,
        "h-8 w-8": !(current || active),
        "bg-primary-600 text-white": current || active,
        "bg-white": !(current || active),
      })}
      {...props}
    >
      {(current || active) && text}
    </button>
  );
}
