"use client";

import { IBLUEPRINT_POPULATED } from "@/types/blueprint";

import { create } from "zustand";

export type ProjectStore = {
  blueprints: IBLUEPRINT_POPULATED[];
  setBlueprints: (blueprints: IBLUEPRINT_POPULATED[]) => void;
};

export const useProjectsPageStore = create<ProjectStore>((set) => ({
  blueprints: [] as IBLUEPRINT_POPULATED[],
  setBlueprints: (blueprints: IBLUEPRINT_POPULATED[]) => set({ blueprints }),
}));
