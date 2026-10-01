import { supabase } from "@/services/supabase/supabase";
import { PostgrestSingleResponse, QueryData } from "@supabase/supabase-js";
import { cache } from "react";

export type GetProjectParams = {
  projectId: string;
};

export const getProject = ({ projectId }: GetProjectParams) => {
  return (
    supabase
      .from("projects")
      .select(
        `*,
      typologies(*),
      department:departments(*),
      city:cities(*),
      company:companies(*),
      characteristics:project_characteristics(*, characteristic:characteristics(*)),
      plan:project_plans(*)
      `
      )
      .eq("id", projectId)
      .eq("status", "PUBLISHED")
      // `maybeSingle` devuelve `null` si el proyecto no existe o no está
      // publicado, para que la página responda 404 en vez de lanzar un error.
      .maybeSingle()
      .throwOnError()
  );
};

/**
 * `generateMetadata` y la página piden el mismo proyecto en cada request:
 * `cache` hace que compartan una sola consulta. Es `async` a propósito, porque
 * el query builder de Supabase vuelve a ejecutar la consulta cada vez que se
 * le hace `await`; la promesa que devuelve la función sí se resuelve una vez.
 */
export const getProjectOnce = cache(async (projectId: string) => {
  return getProject({ projectId });
});

export type GetProjectResponse = PostgrestSingleResponse<Project>;

export type Project = QueryData<ReturnType<typeof getProject>>;
