import { DisplayTRM } from "@/components/projects/display-trm";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@inverclick/inverclick-ui/menubar";
import { Menu } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const MENU_OPTIONS = [
  { name: "Nosotros", url: "/" },
  { name: "Financiación", url: "/financing" },
  { name: "Otros servicios", url: "/" },
];

export const ProjectHeader = () => {
  return (
    <header className="left-0 right-0 z-10 flex items-end justify-between bg-white px-6 pb-4 pt-3 shadow-lg xl:items-center">
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
};

const DesktopMenu = () => (
  <div className="mx-auto hidden w-full max-w-screen-2xl items-center justify-center sm:gap-6 md:flex xl:gap-8">
    <div className="flex flex-1 items-end sm:gap-6 xl:gap-8">
      {MENU_OPTIONS.map(({ name, url }) => (
        <a
          key={name}
          href={url}
          className="cursor-pointer text-xs font-medium text-primary-600 transition-colors ease-in hover:text-primary-800 sm:text-sm xl:text-base"
        >
          {name}
        </a>
      ))}
    </div>
    <Link href="/" className="cursor-pointer">
      <Image
        unoptimized
        width="170"
        height="60"
        className="w-[120px] animate-slide-in-top md:w-[140px] xl:w-[155px] 2xl:w-[170px]"
        src="/main-page/inverclick-logo.avif"
        alt="Inverclick logo"
      />
    </Link>
    <div className="flex flex-1 items-center justify-end sm:gap-4 xl:gap-6">
      <DisplayTRM />
      <a
        className="cursor-pointer rounded-full border-2 border-primary-600 transition-all ease-in hover:scale-105"
        href="/"
      >
        <Image
          unoptimized
          width="30"
          height="30"
          src="/main-page/user.svg"
          alt="Inverclick logo"
        />
      </a>
    </div>
  </div>
);

const MobileMenu = () => (
  <div className="flex w-full items-end justify-between gap-3 sm:gap-6 md:hidden xl:gap-8">
    <Image
      unoptimized
      width="170"
      height="60"
      className="w-[120px] animate-slide-in-top md:w-[140px] xl:w-[170px]"
      src="/main-page/inverclick-logo.avif"
      alt="Inverclick logo"
    />
    <div className="flex items-end justify-center gap-4">
      <DisplayTRM />
      <Menubar className="h-min border-0 p-0">
        <MenubarMenu>
          <MenubarTrigger className="rounded-md border-2 border-primary-600 p-0">
            <Menu className="m-1 h-4 w-4 cursor-pointer text-primary-600" />
          </MenubarTrigger>
          <MenubarContent>
            {MENU_OPTIONS.map(({ name, url }) => (
              <MenubarItem asChild key={name}>
                <a
                  href={url}
                  className="!hover:text-primary-800 cursor-pointer text-sm font-medium text-primary-600 transition-colors ease-in xl:text-base"
                >
                  {name}
                </a>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <a
        className="cursor-pointer rounded-full border-2 border-primary-600 transition-all ease-in hover:scale-105"
        href="/"
      >
        <Image
          unoptimized
          width="25"
          height="25"
          src="/main-page/user.svg"
          alt="Inverclick logo"
        />
      </a>
    </div>
  </div>
);
