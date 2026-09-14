import { createClient } from "@/services/supabase/browser-client";
import { supabase } from "@/services/supabase/supabase";
import { ProjectToDisplay } from "@/types/domain/projects";

/**
 * `types/database.ts` se regenera con `gen:types`; mientras no se corra después
 * de crear `client_favorite_projects`, el cliente tipado no conoce la tabla.
 * Se accede con el cliente del navegador sin tipar y se tipa el resultado a
 * mano. Ver `03 Supabase (BD)/SQL/2026-09-13_client_favorite_projects.sql`.
 */
const TABLE = "client_favorite_projects";

type FavoriteRow = { project_id: string };

function browserDb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createClient() as any;
}

/** Ids de los proyectos que el cliente tiene marcados. */
export async function getFavoriteProjectIds(
  clientId: string
): Promise<string[]> {
  const { data, error } = await browserDb()
    .from(TABLE)
    .select("project_id")
    .eq("client_id", clientId);

  if (error) throw error;

  return (data as FavoriteRow[] | null)?.map((row) => row.project_id) ?? [];
}

/**
 * Marca un favorito. La PK compuesta hace que marcar dos veces sea inofensivo,
 * así que se usa `upsert` y no hace falta consultar antes.
 */
export async function addFavoriteProject(clientId: string, projectId: string) {
  const { error } = await browserDb()
    .from(TABLE)
    .upsert(
      { client_id: clientId, project_id: projectId },
      { onConflict: "client_id,project_id" }
    );

  if (error) throw error;
}

export async function removeFavoriteProject(
  clientId: string,
  projectId: string
) {
  const { error } = await browserDb()
    .from(TABLE)
    .delete()
    .eq("client_id", clientId)
    .eq("project_id", projectId);

  if (error) throw error;
}

/**
 * Trae los proyectos marcados, con lo que necesita `ProjectCard` para pintarse.
 * Se piden por id y no por join para no depender de los tipos generados.
 */
export async function getFavoriteProjects(
  projectIds: string[]
): Promise<ProjectToDisplay[]> {
  if (projectIds.length === 0) return [];

  const { data, error } = await supabase
    .from("projects")
    .select(
      `*,
      typologies(*),
      department:departments(*),
      city:cities(*),
      company:companies(*)`
    )
    .eq("status", "PUBLISHED")
    .in("id", projectIds);

  if (error) throw error;

  return (data ?? []) as unknown as ProjectToDisplay[];
}
