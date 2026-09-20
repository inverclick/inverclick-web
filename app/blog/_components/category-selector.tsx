"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@inverclick/inverclick-ui/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { Fragment } from "react";

import Link from "next/link";

export type CategoryOption = Readonly<{
  /** `null` = todas las categorías. */
  slug: string | null;
  label: string;
  href: string;
  count: number;
}>;

export type CategorySelectorProps = Readonly<{
  options: CategoryOption[];
  activeSlug: string | null;
}>;

/**
 * Selector de categoría. Cada opción es un enlace a la página de esa
 * categoría (URL propia, indexable), no un filtro que solo vive en el cliente.
 */
export function CategorySelector({
  options,
  activeSlug,
}: CategorySelectorProps) {
  const activeOption =
    options.find((option) => option.slug === activeSlug) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          rounded="full"
          className="max-w-full gap-2 font-medium"
        >
          <span className="truncate">{activeOption.label}</span>
          <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[min(23rem,90vw)]">
        {options.map((option, index) => {
          const isActive = option.slug === activeSlug;

          return (
            <Fragment key={option.href}>
              {index === 1 && <DropdownMenuSeparator />}
              <DropdownMenuItem asChild>
                <Link
                  href={option.href}
                  aria-current={isActive ? "page" : undefined}
                  className="flex cursor-pointer items-center justify-between gap-4 py-2"
                >
                  <span className={isActive ? "font-semibold" : undefined}>
                    {option.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-gray-400">
                    {option.count}
                    <Check
                      aria-hidden="true"
                      className={
                        isActive
                          ? "size-4 text-primary-600"
                          : "size-4 opacity-0"
                      }
                    />
                  </span>
                </Link>
              </DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
