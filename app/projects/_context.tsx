"use client";

import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProjectPageContextValue = createContext({
  blueprints: [] as IBLUEPRINT_POPULATED[],
  setBlueprints: (blueprints: IBLUEPRINT_POPULATED[]) => {},
});

export function ProjectsPageContext({
  children,
  initialBlueprints,
}: Readonly<{
  initialBlueprints: IBLUEPRINT_POPULATED[];
}> &
  PropsWithChildren) {
  const [blueprints, setBlueprints] =
    useState<IBLUEPRINT_POPULATED[]>(initialBlueprints);

  useEffect(() => {
    setBlueprints(initialBlueprints);
  }, [initialBlueprints]);

  const context = useMemo(
    () => ({
      blueprints,
      setBlueprints,
    }),
    [blueprints, setBlueprints]
  );

  return (
    <ProjectPageContextValue.Provider value={context}>
      {children}
    </ProjectPageContextValue.Provider>
  );
}

export function usePageContext() {
  return useContext(ProjectPageContextValue);
}
