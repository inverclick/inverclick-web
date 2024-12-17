import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Heart } from "lucide-react";
import { ComponentProps } from "react";

export type SaveFavoriteProps = Readonly<{ isIconOnly?: boolean }> &
  ComponentProps<typeof Button>;

export const SaveFavorite = ({
  isIconOnly = false,
  ...props
}: SaveFavoriteProps) => {
  return (
    <Button variant="outline" className={cn(props.className)} {...props}>
      <Icon icon={Heart} />
      {!isIconOnly && "Guardar"}
    </Button>
  );
};
