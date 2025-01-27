"use client";

import { cn } from "@/lib/utils";
import React, { ComponentProps, useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

export type AppButtonProps = Readonly<ComponentProps<typeof Link>>;

export const AppButton = ({
  className,
  ...props
}: Omit<AppButtonProps, "href">) => {
  // 20s
  const INTERVAL = 20000;

  const appButtonRef = useRef<HTMLAnchorElement>(null);

  // Run animate-tada each minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (appButtonRef.current) {
        appButtonRef.current.classList.remove("animate-tada");
        void appButtonRef.current.offsetWidth;
        appButtonRef.current.classList.add("animate-tada");
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      ref={appButtonRef}
      href="/app"
      className={cn(
        "slide-app-button z-30 hidden animate-tada cursor-pointer drop-shadow-2xl animate-delay-0 md:block",
        className
      )}
      {...props}
    >
      <Image
        unoptimized
        className="object-cover shadow-2xl"
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
