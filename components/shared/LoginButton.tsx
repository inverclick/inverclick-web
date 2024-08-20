import "@/app/styles/animations.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ComponentProps } from "react";

type LoginButtonProps = Readonly<ComponentProps<"div">>;

export const LoginButton = ({ className, ...props }: LoginButtonProps) => {
  return (
    <div
      className={cn(
        " slide-button border-2 border-primary-600 shadow-2xl cursor-pointer rounded-full",
        className
      )}
      {...props}
    >
      <Image
        unoptimized
        className="object-cover"
        src="/main-page/user.svg"
        height="36"
        width="36"
        alt="Inverclick - ingresar"
      />
      <span>Ingresar</span>
    </div>
  );
};
