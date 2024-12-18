import { cn } from "@/lib/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { User } from "lucide-react";
import { ComponentProps } from "react";

import Link from "next/link";

import "@/app/styles/animations.css";

export type LoginButtonProps = Readonly<ComponentProps<typeof Link>>;

export const LoginButton = ({
  className,
  ...props
}: Omit<LoginButtonProps, "href">) => {
  return (
    <Link
      className={cn(
        "relative rounded-full slide-button bg-secondary",
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
      <Icon icon={User} className="absolute top-1/2 left-3 -translate-y-1/2" />
      <span>Ingresar</span>
    </Link>
  );
};
