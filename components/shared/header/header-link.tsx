"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type HeaderLinkProps = Readonly<{
  name: string;
  url: string;
}>;

export function HeaderLink({ name, url }: HeaderLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={cn("hover:text-primary font-medium", {
        "text-primary": isActive,
      })}
    >
      {name}
    </Link>
  );
}
