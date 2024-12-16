import { supabase } from "./supabase";

export const getProjectsPriceRange = async () => {
  const draftData = Array.from({ length: 50 }, () => ({ goal: 0 }));

  const { data: typologies, error } = await supabase
    .from("typologies")
    .select("price");

  if (error) throw error;

  if (typologies) {
    for (const blueprint of typologies) {
      const goal = Math.floor(blueprint.price / 20000000);
      if (goal < 50) draftData[goal].goal++;
    }
  }

  return draftData;
};
