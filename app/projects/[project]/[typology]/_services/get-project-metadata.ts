import { supabase } from "@/services/supabase";

export type GetProjectMetadataParams = {
  projectId: string;
};

export const getProjectMetadata = ({ projectId }: GetProjectMetadataParams) => {
  return supabase
    .from("projects")
    .select("name, description, typologies(id, name)")
    .eq("id", projectId)
    .single();
};
