import { supabase as defaultClient } from "@/services/supabase/supabase";

/**
 * Lightweight list of every published project for the map search: enough to
 * suggest projects and cities (with counts) regardless of the active filters,
 * plus the cheapest typology to link to a project the filters hide.
 */
export type ProjectSearchEntry = {
  id: string;
  name: string | null;
  photos: string[];
  city: { id: number; name: string } | null;
  department: { id: number; name: string } | null;
  typologies: { id: string }[];
};

export async function getProjectSearchIndex(
  supabase = defaultClient
): Promise<ProjectSearchEntry[]> {
  const { data } = await supabase
    .from("projects")
    .select(
      "id, name, photos, city:cities(id, name), department:departments(id, name), typologies!inner(id, price)"
    )
    .eq("status", "PUBLISHED")
    .order("price", { referencedTable: "typologies", ascending: true })
    .limit(1, { referencedTable: "typologies" })
    .returns<ProjectSearchEntry[]>();

  return data ?? [];
}
