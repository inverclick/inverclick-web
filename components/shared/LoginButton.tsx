import "@/app/styles/animations.css";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ComponentProps } from "react";

type LoginButtonProps = Readonly<ComponentProps<typeof Link>>;

export const LoginButton = ({ className, ...props }: Omit<LoginButtonProps, 'href'>) => {
  return (
    <Link
      className={cn(
        " slide-button border-2 border-primary-600 shadow-2xl cursor-pointer rounded-full",
        className
      )}
      {...props}
      href='/auth/sign-in'
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
    </Link>
  );
};
