import DisplayTRM from "@/components/projects/DisplayTRM";
import { HeaderLink } from "@/components/shared/header/header-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Image from "next/image";

const MENU_OPTIONS = [
  { name: "Nosotros", url: "/" },
  { name: "Proyectos", url: "/projects" },
  { name: "Financiación", url: "/financing" },
  { name: "Otros servicios", url: "/" },
  { name: "Blog", url: "/blog" },
];

const LEFT_MENU_OPTIONS = MENU_OPTIONS.slice(0, 3);

const RIGHT_MENU_OPTIONS = MENU_OPTIONS.slice(3);

export function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-lg z-50">
      <MobileHeader />
      <DesktopHeader />
    </header>
  );
}

function MobileHeader() {
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
        <a
          className="border-2 border-primary rounded-full cursor-pointer"
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
}

function DesktopHeader() {
  return (
    <div className="hidden lg:grid grid-cols-3 gap-4 items-center h-full px-6 py-4 max-w-screen-2xl mx-auto">
      <ul className="flex gap-4 xl:gap-8 items-center">
        {LEFT_MENU_OPTIONS.map(({ name, url }) => (
          <li key={name}>
            <HeaderLink name={name} url={url} />
          </li>
        ))}
      </ul>
      <a href="/" className="place-self-center cursor-pointer">
        <Image
          unoptimized
          width="170"
          height="60"
          className="animate-slide-in-top w-[120px] md:w-[140px] xl:w-[155px] 2xl:w-[170px]"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </a>
      <ul className="flex gap-4 xl:gap-8 justify-self-end items-center">
        {RIGHT_MENU_OPTIONS.map(({ name, url }) => (
          <li key={name}>
            <HeaderLink name={name} url={url} />
          </li>
        ))}
        <li className="flex items-center gap-4">
          <DisplayTRM />
          <a
            className="border-2 border-primary rounded-full cursor-pointer"
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
        </li>
      </ul>
    </div>
  );
}
