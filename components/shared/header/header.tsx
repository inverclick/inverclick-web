import DisplayTRM from "@/components/projects/DisplayTRM";
import { HeaderLink } from "@/components/shared/header/header-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

const MENU_OPTIONS = [
  { name: "Nosotros", url: "/" },
  { name: "Proyectos", url: "/projects" },
  { name: "Financiación", url: "/financing" },
  { name: "Otros servicios", url: "/" },
  { name: "Blog", url: "/blog" },
];

const LEFT_MENU_OPTIONS = MENU_OPTIONS.slice(0, 3);

const RIGHT_MENU_OPTIONS = MENU_OPTIONS.slice(3);

type HeaderProps = Readonly<{
  size?: "small" | "large";
}>;

export function Header({ size = "large" }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <MobileHeader size={size} />
      <DesktopHeader size={size} />
    </header>
  );
}

type MobileHeaderProps = HeaderProps;

function MobileHeader({ size }: MobileHeaderProps) {
  return (
    <div className="flex lg:hidden justify-between items-center h-full px-6 py-4">
      <a href="/">
        <Image
          unoptimized
          width="170"
          height="60"
          className="animate-slide-in-top w-[120px] md:w-[140px] xl:w-[155px] 2xl:w-[170px]"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </a>
      <div className="flex items-center gap-4">
        <DisplayTRM />
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 border-2 border-primary rounded-md cursor-pointer">
            <Menu className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {MENU_OPTIONS.map(({ name, url }) => (
              <DropdownMenuItem key={name} className="text-primary">
                {name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <UserLink />
      </div>
    </div>
  );
}

type DesktopHeaderProps = HeaderProps;

function DesktopHeader({ size }: DesktopHeaderProps) {
  return (
    <div
      className={cn(
        "hidden lg:grid grid-cols-3 gap-4 items-center h-full px-6 py-4 max-w-screen-2xl mx-auto",
        {
          "px-3 py-2": size === "small",
        }
      )}
    >
      <MenuOptions options={LEFT_MENU_OPTIONS} size={size} />
      <a href="/" className="place-self-center cursor-pointer">
        <Image
          unoptimized
          width="170"
          height="60"
          className={cn(
            "animate-slide-in-top w-[120px] md:w-[140px] xl:w-[155px] 2xl:w-[170px]",
            {
              "w-[120px] md:w-[90px] xl:w-[107px] 2xl:w-[120px]":
                size === "small",
            }
          )}
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </a>
      <MenuOptions options={RIGHT_MENU_OPTIONS} size={size} align="right">
        <li className="flex items-center gap-4">
          <DisplayTRM />
          <UserLink />
        </li>
      </MenuOptions>
    </div>
  );
}

type MenuOptionsProps = Readonly<{
  options: { name: string; url: string }[];
  size?: "small" | "large";
  align?: "left" | "right";
}> &
  PropsWithChildren;

function MenuOptions({
  options,
  size,
  align = "left",
  children,
}: MenuOptionsProps) {
  return (
    <ul
      className={cn("flex gap-4 xl:gap-8 items-center", {
        "!gap-3": size === "small",
        "justify-self-start": align === "left",
        "justify-self-end": align === "right",
      })}
    >
      {options.map(({ name, url }) => (
        <li key={name} className="flex">
          <HeaderLink name={name} url={url} size={size} />
        </li>
      ))}
      {children}
    </ul>
  );
}

function UserLink() {
  return (
    <Link
      href="/auth/sign-in"
      className="border-2 border-primary rounded-full cursor-pointer"
    >
      <Image
        unoptimized
        width="25"
        height="25"
        src="/main-page/user.svg"
        alt="User link"
      />
    </Link>
  );
}
