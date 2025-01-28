import { HeaderLink } from "@/components/shared/header/header-link";
import { InverclickDropdownMenu } from "@/components/shared/inverclick-dropdown-menu/inverclick-dropdown-menu";
import { ProfileDropdown } from "@/components/shared/profile-dropdown/profile-dropdown";
import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import { PropsWithChildren } from "react";

import Image from "next/image";
import Link from "next/link";

export const MENU_OPTIONS = [
  { name: "Nosotros", url: "/about-us" },
  { name: "Proyectos", url: "/projects" },
  { name: "Financiación", url: "/financing" },
  { name: "Otros servicios", url: "/other-services" },
  // { name: "Blog", url: "/blog" },
];

export const LEFT_MENU_OPTIONS = MENU_OPTIONS.slice(0, 3);

export const RIGHT_MENU_OPTIONS = MENU_OPTIONS.slice(3);

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <MobileHeader />
      <DesktopHeader />
    </header>
  );
}

function MobileHeader() {
  return (
    <div className="flex h-full items-center justify-between px-6 py-4 lg:hidden">
      <Link href="/">
        <Image
          unoptimized
          width="170"
          height="60"
          className="w-[120px] animate-slide-in-top md:w-[140px] xl:w-[155px] 2xl:w-[170px]"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </Link>
      <div className="flex items-center gap-4">
        <InverclickDropdownMenu />
        <ProfileDropdown size="small" />
      </div>
    </div>
  );
}

function DesktopHeader() {
  return (
    <div
      className={cn(
        "mx-auto hidden h-full max-w-screen-2xl grid-cols-3 items-center gap-4 px-6 py-4 lg:grid"
      )}
    >
      <MenuOptions options={LEFT_MENU_OPTIONS} />
      <Link href="/" className="cursor-pointer place-self-center">
        <Image
          unoptimized
          width="170"
          height="60"
          className={cn(
            "w-[120px] animate-slide-in-top md:w-[90px] xl:w-[107px] 2xl:w-[120px]"
          )}
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </Link>
      <MenuOptions options={RIGHT_MENU_OPTIONS} align="right">
        <li className="flex items-center gap-4 xl:gap-8">
          <Button size="sm" variant="outline-primary" asChild>
            <Link href="https://company.inverclick.com/" target="_blank">
              Publicar
            </Link>
          </Button>
          <ProfileDropdown />
        </li>
      </MenuOptions>
    </div>
  );
}

type MenuOptionsProps = Readonly<{
  options: { name: string; url: string }[];
  align?: "left" | "right";
}> &
  PropsWithChildren;

function MenuOptions({ options, align = "left", children }: MenuOptionsProps) {
  return (
    <ul
      className={cn("flex items-center gap-4 xl:gap-8", {
        "justify-self-start": align === "left",
        "justify-self-end": align === "right",
      })}
    >
      {options.map(({ name, url }) => (
        <li key={name} className="flex">
          <HeaderLink name={name} url={url} />
        </li>
      ))}
      {children}
    </ul>
  );
}
