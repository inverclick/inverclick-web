import DisplayTRM from "@/components/projects/DisplayTRM";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

const MENU_OPTIONS_LEFT = [
  { name: "Nosotros", url: "/" },
  { name: "Proyectos", url: "/projects" },
  { name: "Financiación", url: "/financing" },
];

const MENU_OPTIONS_RIGHT = [
  { name: "Otros servicios", url: "/" },
  { name: "Blog", url: "/" },
];

export const MyHeaderAllServices = () => {
  return (
    <header className="fixed bg-white top-0 left-0 right-0 shadow-lg px-6 pb-4 pt-3 flex items-end xl:items-center justify-center z-10">
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
};

const DesktopMenu = () => (
  <div className="hidden md:grid grid-cols-3 sm:gap-6 xl:gap-8 justify-center items-center w-full lg:mx-10 xl:mx-12 2xl:mx-14 max-w-screen-2xl mx-auto">
    <div className="grid grid-cols-3 justify-items-center place-items-center">
      {MENU_OPTIONS_LEFT.map(({ name, url }) => (
        <a
          key={name}
          href={url}
          className="text-xs sm:text-sm xl:text-base text-primary-600 hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in"
        >
          {name}
        </a>
      ))}
    </div>
    <a href="/" className="flex justify-center cursor-pointer">
      <Image
        unoptimized
        width="170"
        height="60"
        className="animate-slide-in-top w-[120px] md:w-[140px] xl:w-[155px] 2xl:w-[170px] self-center"
        src="/main-page/inverclick-logo.avif"
        alt="Inverclick logo"
      />
    </a>
    <div className="grid grid-cols-3 justify-items-center place-items-center">
      {MENU_OPTIONS_RIGHT.map(({ name, url }) => (
        <a
          key={name}
          href={url}
          className="text-xs sm:text-sm xl:text-base text-primary-600 hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in"
        >
          {name}
        </a>
      ))}
      <div className="flex items-center gap-4">
        <DisplayTRM />
        <a
          className="border-2 border-primary-600 rounded-full cursor-pointer hover:scale-105 transition-all ease-in"
          href="/"
        >
          <Image
            unoptimized
            width="28"
            height="28"
            className="min-h-7 min-w-7"
            src="/main-page/user.svg"
            alt="Login de usuarios"
          />
        </a>
      </div>
    </div>
  </div>
);

const MobileMenu = () => (
  <div className="flex md:hidden gap-3 sm:gap-6 xl:gap-8 justify-between items-end w-full">
    <Image
      unoptimized
      width="170"
      height="60"
      className="animate-slide-in-top w-[120px] md:w-[140px] xl:w-[170px]"
      src="/main-page/inverclick-logo.avif"
      alt="Inverclick logo"
    />
    <div className="flex justify-center items-end gap-4">
      <DisplayTRM />
      <Menubar className="border-0 p-0 h-min">
        <MenubarMenu>
          <MenubarTrigger className="p-0 border-2 rounded-md border-primary-600 ">
            <Menu className="h-4 w-4 text-primary-600 cursor-pointer m-1 " />
          </MenubarTrigger>
          <MenubarContent>
            {[...MENU_OPTIONS_LEFT, ...MENU_OPTIONS_RIGHT].map(
              ({ name, url }) => (
                <MenubarItem asChild key={name}>
                  <a
                    href={url}
                    className="text-sm xl:text-base text-primary-600 !hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in"
                  >
                    {name}
                  </a>
                </MenubarItem>
              )
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <a
        className="border-2 border-primary-600 rounded-full cursor-pointer hover:scale-105 transition-all ease-in"
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
