"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

import "@/app/styles/animations.css";

type ContactButtonProps = Readonly<ComponentProps<"div">>;

export const ContactButton = ({ className, ...props }: ContactButtonProps) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "z-30 relative rounded-full slide-button bg-secondary",
        {
          "bg-primary text-primary-foreground": pathname !== "/",
        },
        className
      )}
      {...props}
    >
      {/* <Image
        unoptimized
        className="object-cover"
        src="/main-page/contact.svg"
        height="36"
        width="36"
        alt="Inverclick - contacto"
      /> */}
      <Icon icon={Mail} className="absolute top-1/2 left-3 -translate-y-1/2" />
      <span>Contáctenos</span>
    </div>
  );
};
