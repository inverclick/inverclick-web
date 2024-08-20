import "@/app/styles/animations.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ComponentProps } from "react";

type ContactButtonProps = Readonly<ComponentProps<"div">>;

export const ContactButton = ({ className, ...props }: ContactButtonProps) => {
  return (
    <div
      className={cn(
        "z-30 border-2 border-primary-600 slide-button shadow-2xl cursor-pointer rounded-full",
        className
      )}
      {...props}
    >
      <Image
        unoptimized
        className="object-cover"
        src="/main-page/contact.svg"
        height="36"
        width="36"
        alt="Inverclick - contacto"
      />
      <span>Contáctenos</span>
    </div>
  );
};
