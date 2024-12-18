"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { Markers } from "@/components/projects/markers";
import { ENV_VARS } from "@/global/env";
import { ProjectToDisplay } from "@/types/project";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useDebounceCallback } from "usehooks-ts";

type MyMap2Props = Readonly<{
  projects: ProjectToDisplay[];
}>;

export function Map2({ projects }: MyMap2Props) {
  return (
    <APIProvider apiKey={ENV_VARS.GOOGLE_MAP_KEY}>
      <MyMap2Content projects={projects} />
    </APIProvider>
  );
}

type MyMap2ContentProps = Readonly<{
  projects: ProjectToDisplay[];
}>;

function MyMap2Content({ projects }: MyMap2ContentProps) {
  const setProjects = useProjectsPageStore((state) => state.setProjects);

  const map = useMap();

  const onBoundsChanged = useDebounceCallback(() => {
    if (!map) return;

    const mapBounds = map.getBounds();

    if (!mapBounds) return;

    // Sort first the ones that are inside the bounds
    const sortedBlueprints = projects
      .map((blueprint) => {
        const location = new google.maps.LatLng(
          blueprint.latitude,
          blueprint.longitude
        );

        return {
          blueprint,
          location,
          isInside: mapBounds.contains(location),
        };
      })
      .sort((a, b) => {
        if (a.isInside && !b.isInside) return -1;
        if (!a.isInside && b.isInside) return 1;
        return 0;
      })
      .map(({ blueprint }) => blueprint);

    setProjects(sortedBlueprints);
  }, 500);

  return (
    <>
      <Map
        mapId={ENV_VARS.GOOGLE_MAP_ID}
        defaultTilt={45}
        defaultZoom={6}
        defaultCenter={{ lat: 4.5709, lng: -74.2973 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onBoundsChanged={onBoundsChanged}
      />
      <Markers projects={projects} />
    </>
  );
}
