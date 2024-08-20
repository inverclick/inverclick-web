import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps } from "react";

type AppButtonProps = Readonly<ComponentProps<typeof Link>>;

export const AppButton = ({
  className,
  ...props
}: Omit<AppButtonProps, "href">) => {
  return (
    <Link
      href="/app"
      className={cn(
        "hidden md:block slide-app-button z-30 cursor-pointer drop-shadow-2xl animate-tada animate-delay-800",
        className
      )}
      {...props}
    >
      <Image
        unoptimized
        className=" object-cover shadow-2xl"
        src="/main-page/download_app.svg"
        width="40"
        height="80"
        alt="Inverclick descarga la app"
      />
      <span className="ml-2">
        &nbsp;&nbsp;Descarga&nbsp;nuestra&nbsp;app&nbsp;&nbsp;
      </span>
    </Link>
  );
};
