"use client";

import { useFavorites } from "@/contexts/favorites-context";
import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Heart } from "lucide-react";
import { ComponentProps } from "react";

export type SaveFavoriteProps = Readonly<{
  projectId: string;
  isIconOnly?: boolean;
}> &
  ComponentProps<typeof Button>;

/**
 * Botón de guardar/quitar de favoritos. Cuando el proyecto está guardado el
 * corazón se pinta relleno en morado; si no, queda como un icono normal.
 */
export const SaveFavorite = ({
  projectId,
  isIconOnly = false,
  ...props
}: SaveFavoriteProps) => {
  const { isFavorite, isPending, toggleFavorite } = useFavorites();

  const saved = isFavorite(projectId);

  return (
    <Button
      variant="outline"
      aria-pressed={saved}
      aria-label={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      disabled={isPending(projectId)}
      {...props}
      className={cn(props.className)}
      onClick={(event) => {
        props.onClick?.(event);
        toggleFavorite(projectId);
      }}
    >
      <Icon
        icon={Heart}
        className={cn({ "fill-primary text-primary": saved })}
      />
      {!isIconOnly && (saved ? "Guardado" : "Guardar")}
    </Button>
  );
};
