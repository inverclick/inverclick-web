"use client";

import { useUser } from "@/contexts/user-context";
import {
  addFavoriteProject,
  getFavoriteProjectIds,
  removeFavoriteProject,
} from "@/services/projects/favorite-projects";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

export type FavoritesContextType = {
  favoriteProjectIds: string[];
  isFavorite: (projectId: string) => boolean;
  isPending: (projectId: string) => boolean;
  /** True mientras se cargan los favoritos del cliente en sesión. */
  isLoading: boolean;
  /** Null si no hay sesión de cliente: guardar exige cuenta. */
  canUseFavorites: boolean;
  toggleFavorite: (projectId: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const FavoritesContext = createContext({} as FavoritesContextType);

/**
 * Estado compartido de favoritos del cliente en sesión.
 *
 * Los ids se cargan una vez por sesión y el toggle es optimista: la fuente de
 * verdad es la tabla `client_favorite_projects` (protegida por RLS), así que al
 * recargar o volver a entrar el estado se relee de la base y no del navegador.
 */
export function FavoritesProvider({ children }: PropsWithChildren) {
  const { user } = useUser();

  const clientId = user?.client?.id ?? null;

  const [favoriteProjectIds, setFavoriteProjectIds] = useState<string[]>([]);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (!clientId) {
      setFavoriteProjectIds([]);
      return;
    }

    setIsLoading(true);

    try {
      setFavoriteProjectIds(await getFavoriteProjectIds(clientId));
    } catch {
      setFavoriteProjectIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleFavorite = useCallback(
    async (projectId: string) => {
      if (!clientId) {
        toast.error("Inicia sesión para guardar proyectos");
        return;
      }

      const wasFavorite = favoriteProjectIds.includes(projectId);

      // Optimista: la UI responde ya y se revierte si la base falla.
      setFavoriteProjectIds((current) =>
        wasFavorite
          ? current.filter((id) => id !== projectId)
          : [...current, projectId]
      );
      setPendingIds((current) => [...current, projectId]);

      try {
        if (wasFavorite) {
          await removeFavoriteProject(clientId, projectId);
        } else {
          await addFavoriteProject(clientId, projectId);
        }
      } catch {
        setFavoriteProjectIds((current) =>
          wasFavorite
            ? [...current, projectId]
            : current.filter((id) => id !== projectId)
        );

        toast.error("No pudimos guardar el cambio. Inténtalo de nuevo");
      } finally {
        setPendingIds((current) => current.filter((id) => id !== projectId));
      }
    },
    [clientId, favoriteProjectIds]
  );

  const value = useMemo<FavoritesContextType>(
    () => ({
      favoriteProjectIds,
      isFavorite: (projectId) => favoriteProjectIds.includes(projectId),
      isPending: (projectId) => pendingIds.includes(projectId),
      isLoading,
      canUseFavorites: Boolean(clientId),
      toggleFavorite,
      refresh: load,
    }),
    [favoriteProjectIds, pendingIds, isLoading, clientId, toggleFavorite, load]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
