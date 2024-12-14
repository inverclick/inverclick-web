import { cn } from "@/lib/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { User } from "lucide-react";
import { ComponentProps } from "react";

import Image from "next/image";
import Link from "next/link";

import "@/app/styles/animations.css";

type LoginButtonProps = Readonly<ComponentProps<typeof Link>>;

export const LoginButton = ({
  className,
  ...props
}: Omit<LoginButtonProps, "href">) => {
  return (
    <Link
      className={cn(
        "relative slide-button border-2 border-primary-600 shadow-2xl cursor-pointer rounded-full",
        className
      )}
      {...props}
      href="/auth/sign-in"
    >
      {/* <Image
        unoptimized
        className="object-cover"
        src="/main-page/user.svg"
        height="36"
        width="36"
        alt="Inverclick - ingresar"
      /> */}
      <Icon
        icon={User}
        className="absolute top-1/2 left-2.5 -translate-y-1/2"
      />
      <span>Ingresar</span>
    </Link>
  );
};
