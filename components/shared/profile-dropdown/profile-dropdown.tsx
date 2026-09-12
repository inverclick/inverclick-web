"use client";

import { VerifyEmailDialog } from "@/components/shared/verify-email/verify-email-dialog";
import { useUser } from "@/contexts/user-context";
import { needsEmailConfirmation } from "@/services/user/get-user";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@inverclick/inverclick-ui/dropdown-menu";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { MailWarning, User } from "lucide-react";
import { useState } from "react";

import Link from "next/link";

export type ProfileDropdownProps = {
  size?: "small" | "large";
};

export const ProfileDropdown = ({ size = "large" }: ProfileDropdownProps) => {
  const { user, signOut } = useUser();

  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);

  const mustVerifyEmail = needsEmailConfirmation(user);
  const buttonSize = size === "large" ? "icon" : "small-icon";

  if (!user) {
    return (
      <Button variant="outline-primary" rounded="full" size={buttonSize} asChild>
        <Link href="/auth/sign-in" aria-label="Iniciar sesión">
          <Icon icon={User} />
        </Link>
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline-primary"
            rounded="full"
            size={buttonSize}
            className="relative"
            aria-label={
              mustVerifyEmail
                ? "Mi cuenta — falta validar tu correo"
                : "Mi cuenta"
            }
          >
            {user.name[0]?.toUpperCase()}
            {mustVerifyEmail && (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-amber-500"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs font-normal text-slate-500">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {mustVerifyEmail && (
            <>
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-amber-700 focus:bg-amber-50 focus:text-amber-800"
                onSelect={() => setIsVerifyEmailOpen(true)}
              >
                <MailWarning className="h-4 w-4 shrink-0" />
                <span>Completar validación de correo</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem className="cursor-pointer" onSelect={signOut}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <VerifyEmailDialog
        open={isVerifyEmailOpen}
        onOpenChange={setIsVerifyEmailOpen}
      />
    </>
  );
};
