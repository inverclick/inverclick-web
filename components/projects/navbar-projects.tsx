"use client";

import {
  LEFT_MENU_OPTIONS,
  RIGHT_MENU_OPTIONS,
} from "@/components/shared/header/header";
import { HeaderLink } from "@/components/shared/header/header-link";
import { InverclickDropdownMenu } from "@/components/shared/inverclick-dropdown-menu/inverclick-dropdown-menu";
import { ProfileDropdown } from "@/components/shared/profile-dropdown/profile-dropdown";
import { Button } from "@inverclick/inverclick-ui/button";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const MEDIA_QUERY = 1024;

export function NavbarProjects() {
  const scrollableDivRef = useRef(null);

  const [headerPosition, setHeaderPosition] = useState<"normal" | "responsive">(
    "normal"
  );

  useEffect(() => {
    if (scrollableDivRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === scrollableDivRef.current) {
            const { width } = entry.contentRect;
            if (width <= MEDIA_QUERY && headerPosition === "normal") {
              setHeaderPosition("responsive");
            } else if (width > MEDIA_QUERY && headerPosition === "responsive") {
              setHeaderPosition("normal");
            }
          }
        }
      });

      resizeObserver.observe(scrollableDivRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [headerPosition]);

  return (
    <header
      id="navbar-projects"
      ref={scrollableDivRef}
      className="left-0 right-0 hidden bg-white p-4 shadow-md md:flex"
    >
      <nav className="flex w-full justify-between gap-3">
        {headerPosition === "normal" ? (
          <div className="flex flex-1 items-center gap-3">
            {LEFT_MENU_OPTIONS.map(({ name, url }) => (
              <HeaderLink key={name} name={name} url={url} size="small" />
            ))}
          </div>
        ) : null}
        <Link href="/">
          <Image
            unoptimized
            width="107"
            height="60"
            className="w-[120px] cursor-pointer md:w-[90px] xl:w-[107px] 2xl:w-[120px]"
            src="/main-page/inverclick-logo.avif"
            alt="Inverclick logo"
          />
        </Link>
        <div className="!2xl:text-sm flex flex-1 items-center justify-end gap-3 !text-xs">
          {headerPosition === "responsive" && (
            <Button size="xs" variant="outline-primary" asChild>
              <Link href="https://company.inverclick.com/" target="_blank">
                Publicar
              </Link>
            </Button>
          )}
          {headerPosition === "responsive" ? (
            <InverclickDropdownMenu />
          ) : (
            <>
              {RIGHT_MENU_OPTIONS.map(({ name, url }) => (
                <HeaderLink key={name} name={name} url={url} size="small" />
              ))}
              <Button size="xs" variant="outline-primary">
                <Link href="https://company.inverclick.com/" target="_blank">
                  Publicar
                </Link>
              </Button>
            </>
          )}
          <ProfileDropdown size="small" />
        </div>
      </nav>
    </header>
  );
}
