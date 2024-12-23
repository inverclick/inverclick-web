import { DisplayTRM } from "@/components/projects/display-trm";
import { MENU_OPTIONS } from "@/components/shared/header/header";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@inverclick/inverclick-ui/dropdown-menu";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Menu } from "lucide-react";

import Link from "next/link";

export const InverclickDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline-primary" size="small-icon">
          <Icon icon={Menu} className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {MENU_OPTIONS.map(({ name, url }) => (
          <DropdownMenuItem asChild key={name}>
            <Link href={url}>{name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuLabel>
          <DisplayTRM />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
