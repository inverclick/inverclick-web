"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import Link from "next/link";

export type HeaderLinkProps = Readonly<{
  name: string;
  url: string;
  size?: "small" | "large";
}>;

export function HeaderLink({ name, url, size = "large" }: HeaderLinkProps) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(url);

  return (
    <Link
      href={url}
      className={cn("whitespace-nowrap font-medium hover:text-primary", {
        "text-xs 2xl:text-sm": size === "small",
        "text-primary": isActive,
      })}
    >
      {name}
    </Link>
  );
}
