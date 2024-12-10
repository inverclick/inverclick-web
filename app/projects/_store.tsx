"use client";

import { ProjectToDisplay } from "@/types/project";

import { create } from "zustand";

export type ProjectStore = {
  projects: ProjectToDisplay[];
  setProjects: (blueprints: ProjectToDisplay[]) => void;
};

export const useProjectsPageStore = create<ProjectStore>((set) => ({
  projects: [] as ProjectToDisplay[],
  setProjects: (projects: ProjectToDisplay[]) => set({ projects }),
}));
