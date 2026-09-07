"use client";

import { useUser } from "@/contexts/user-context";
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
import { cn } from "@inverclick/inverclick-ui/lib";
import { User } from "lucide-react";

import Link from "next/link";

export type ProfileDropdownProps = {
  size?: "small" | "large";
};

export const ProfileDropdown = ({ size = "large" }: ProfileDropdownProps) => {
  const { user, signOut } = useUser();

  return (
    <>
      {!user && (
        <Button
          variant="outline-primary"
          rounded="full"
          size={size === "large" ? "icon" : "small-icon"}
        >
          <Link href="/auth/sign-in">
            <Icon icon={User} />
          </Link>
        </Button>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline-primary"
              rounded="full"
              size={size === "large" ? "icon" : "small-icon"}
            >
              {user.name[0]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
