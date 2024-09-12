"use client";

import {
  LEFT_MENU_OPTIONS,
  MENU_OPTIONS,
  RIGHT_MENU_OPTIONS,
  UserLink,
} from "@/components/shared/header/header";
import { HeaderLink } from "@/components/shared/header/header-link";
import { Menu } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import DisplayTRM from "./DisplayTRM";

const MEDIA_QUERY = 1024;

export default function NavbarProjects() {
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
      className="hidden bg-white shadow-md md:flex px-4 py-2 right-0 left-0"
    >
      <nav className="flex gap-3 w-full justify-between">
        {headerPosition === "normal" ? (
          <div className="flex-1 flex items-center gap-3">
            {LEFT_MENU_OPTIONS.map(({ name, url }) => (
              <HeaderLink key={name} name={name} url={url} size="small" />
            ))}
          </div>
        ) : null}
        <a href="/">
          <Image
            unoptimized
            width="107"
            height="60"
            className="w-[120px] md:w-[90px] xl:w-[107px] 2xl:w-[120px] cursor-pointer"
            src="/main-page/inverclick-logo.avif"
            alt="Inverclick logo"
          />
        </a>
        <div className="flex-1 gap-3 flex justify-end items-center !text-xs !2xl:text-sm">
          {headerPosition === "responsive" ? (
            <Menubar className="border-0 p-0 h-min">
              <MenubarMenu>
                <MenubarTrigger className="p-0 border-2 rounded-md border-primary-600 ">
                  <Menu className="h-4 w-4 text-primary-600 cursor-pointer m-1" />
                </MenubarTrigger>
                <MenubarContent>
                  {MENU_OPTIONS.map(({ name, url }) => (
                    <MenubarItem asChild key={name}>
                      <a
                        href={url}
                        className="text-sm text-primary-600 !hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in"
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  ))}
                  <MenubarLabel>
                    <DisplayTRM />
                  </MenubarLabel>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <>
              {RIGHT_MENU_OPTIONS.map(({ name, url }) => (
                <HeaderLink key={name} name={name} url={url} size="small" />
              ))}
              <DisplayTRM />
            </>
          )}
          <UserLink />
        </div>
      </nav>
    </header>
  );
}
