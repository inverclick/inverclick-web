"use client";

import { ProjectToDisplay } from "@/types/domain/projects";
import { create } from "zustand";

/**
 * Asks the map to move: center on one project and open its card, or frame the
 * current results. `nonce` makes repeated requests for the same target fire.
 */
export type MapFocusRequest =
  | { kind: "project"; projectId: string; nonce: number }
  | { kind: "fit"; nonce: number };

export type ProjectStore = {
  /** Projects shown in the list, in display order. */
  projects: ProjectToDisplay[];
  setProjects: (blueprints: ProjectToDisplay[]) => void;
  /** Free text typed in the map search. */
  searchText: string;
  setSearchText: (text: string) => void;
  /** The URL filters changed and new results are loading. */
  loadingResults: boolean;
  setLoadingResults: (loading: boolean) => void;
  /** Marker whose card is open on the map. */
  selectedProjectId: string | null;
  select: (projectId: string | null) => void;
  focusRequest: MapFocusRequest | null;
  focusProject: (projectId: string) => void;
  fitResults: () => void;
};

let nonce = 0;

export const useProjectsPageStore = create<ProjectStore>((set) => ({
  projects: [] as ProjectToDisplay[],
  setProjects: (projects: ProjectToDisplay[]) => set({ projects }),
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
  loadingResults: false,
  setLoadingResults: (loadingResults) => set({ loadingResults }),
  selectedProjectId: null,
  select: (selectedProjectId) => set({ selectedProjectId }),
  focusRequest: null,
  focusProject: (projectId) =>
    set({ focusRequest: { kind: "project", projectId, nonce: ++nonce } }),
  fitResults: () => set({ focusRequest: { kind: "fit", nonce: ++nonce } }),
}));
