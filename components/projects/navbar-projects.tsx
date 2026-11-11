"use client";

import { MENU_OPTIONS } from "@/components/shared/header/header";
import { HeaderLink } from "@/components/shared/header/header-link";
import { InverclickDropdownMenu } from "@/components/shared/inverclick-dropdown-menu/inverclick-dropdown-menu";
import { ProfileDropdown } from "@/components/shared/profile-dropdown/profile-dropdown";
import { Button } from "@inverclick/inverclick-ui/button";
import { useLayoutEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const PUBLISH_URL = "https://company.inverclick.com/";

/**
 * Header of the projects page. The menu links show inline whenever they fit
 * in the header's width (it lives in a resizable panel, so the viewport width
 * says little); only when they don't, they collapse into the hamburger menu.
 */
export function NavbarProjects() {
  const headerRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [linksFit, setLinksFit] = useState(true);

  // An invisible copy of the full row tells how wide it needs to be; compare
  // it with the header's width on every resize (window or panel handle).
  useLayoutEffect(() => {
    const header = headerRef.current;
    const measure = measureRef.current;
    if (!header || !measure) return;
    // Keep the copy's links out of the keyboard order (React 18 has no
    // `inert` prop).
    measure.inert = true;

    const update = () => {
      const style = getComputedStyle(header);
      const available =
        header.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      setLinksFit(measure.scrollWidth <= available);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="navbar-projects"
      ref={headerRef}
      className="relative left-0 right-0 hidden overflow-hidden bg-white p-4 shadow-md md:flex"
    >
      <nav aria-label="Principal" className="flex w-full items-center gap-6">
        <NavbarRow showLinks={linksFit} />
      </nav>

      {/* Same row with every link, laid out at its natural width but never
          shown or reachable: only used to measure. */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 flex w-max items-center gap-6"
      >
        <NavbarRow showLinks measuring />
      </div>
    </header>
  );
}

function NavbarRow({
  showLinks,
  measuring = false,
}: {
  showLinks: boolean;
  measuring?: boolean;
}) {
  return (
    <>
      <Link href="/" className="shrink-0">
        <Image
          unoptimized
          width="107"
          height="60"
          className="w-[120px] cursor-pointer md:w-[90px] xl:w-[107px] 2xl:w-[120px]"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
      </Link>

      {showLinks && (
        <div className="flex items-center gap-5">
          {MENU_OPTIONS.map(({ name, url }) => (
            <HeaderLink key={name} name={name} url={url} size="small" />
          ))}
        </div>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-3">
        <Button size="xs" variant="outline-primary" asChild>
          <Link href={PUBLISH_URL} target="_blank">
            Publicar
          </Link>
        </Button>
        {!showLinks && <InverclickDropdownMenu />}
        {measuring ? (
          // Stand-in with the profile button's size, so the copy doesn't
          // mount a second profile menu.
          <span className="block h-9 w-9" />
        ) : (
          <ProfileDropdown size="small" />
        )}
      </div>
    </>
  );
}
