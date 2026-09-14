"use client";

import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/shared/project-card";
import { useFavorites } from "@/contexts/favorites-context";
import { useUser } from "@/contexts/user-context";
import { getFavoriteProjects } from "@/services/projects/favorite-projects";
import { ProjectToDisplay } from "@/types/domain/projects";
import { Button } from "@inverclick/inverclick-ui/button";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

import Link from "next/link";

const FAVORITE_PROJECTS_QUERY_KEY = "favorite-projects";

export function FavoritesContent() {
  const { user } = useUser();
  const { favoriteProjectIds, isLoading: isLoadingIds } = useFavorites();

  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: [FAVORITE_PROJECTS_QUERY_KEY, favoriteProjectIds],
    queryFn: () => getFavoriteProjects(favoriteProjectIds),
    enabled: Boolean(user),
  });

  if (!user) {
    return (
      <EmptyState
        title="Inicia sesión para ver tus favoritos"
        description="Guarda los proyectos que te interesan y encuéntralos aquí cuando vuelvas."
        action={{ label: "Iniciar sesión", href: "/auth/sign-in" }}
      />
    );
  }

  const isLoading = isLoadingIds || isLoadingProjects;

  if (isLoading) {
    return (
      <section>
        <Heading />
        <ul className="grid justify-items-center gap-x-2 gap-y-10 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <ProjectCardSkeleton />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const visibleProjects = sortByFavoriteOrder(
    projects ?? [],
    favoriteProjectIds
  );

  if (visibleProjects.length === 0) {
    return (
      <EmptyState
        title="Todavía no tienes favoritos"
        description="Toca el corazón en un proyecto para guardarlo y tenerlo a mano aquí."
        action={{ label: "Explorar proyectos", href: "/projects" }}
      />
    );
  }

  return (
    <section>
      <Heading count={visibleProjects.length} />
      <ul className="grid justify-items-center gap-x-2 gap-y-10 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
        {visibleProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Heading({ count }: Readonly<{ count?: number }>) {
  return (
    <div className="mb-8">
      <Typography variant="h1">Mis favoritos</Typography>
      {count !== undefined && (
        <Typography className="mt-2 text-muted-foreground">
          {count === 1 ? "1 proyecto guardado" : `${count} proyectos guardados`}
        </Typography>
      )}
    </div>
  );
}

type EmptyStateProps = Readonly<{
  title: string;
  description: string;
  action: { label: string; href: string };
}>;

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section
      data-element="favorites-empty-state"
      className="flex flex-col items-center justify-center gap-3 py-24 text-center"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-100">
        <Icon icon={Heart} className="size-8 text-primary" />
      </span>
      <Typography variant="h3">{title}</Typography>
      <Typography className="max-w-md text-muted-foreground">
        {description}
      </Typography>
      <Button asChild className="mt-2">
        <Link href={action.href}>{action.label}</Link>
      </Button>
    </section>
  );
}

/**
 * La consulta a `projects` no conserva el orden de los ids, así que se reordena
 * según la lista de favoritos para que el listado sea estable entre recargas.
 */
function sortByFavoriteOrder(
  projects: ProjectToDisplay[],
  favoriteProjectIds: string[]
) {
  const byId = new Map(projects.map((project) => [project.id, project]));

  return favoriteProjectIds
    .map((id) => byId.get(id))
    .filter((project): project is ProjectToDisplay => Boolean(project));
}
