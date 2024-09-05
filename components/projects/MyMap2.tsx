"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { Markers } from "@/components/projects/Markers";
import { ENV_VARS } from "@/global/env";
import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useDebounceCallback } from "usehooks-ts";

type MyMap2Props = Readonly<{
  blueprints: IBLUEPRINT_POPULATED[];
}>;

export function MyMap2({ blueprints }: MyMap2Props) {
  return (
    <APIProvider apiKey={ENV_VARS.GOOGLE_MAP_KEY}>
      <MyMap2Content blueprints={blueprints} />
    </APIProvider>
  );
}

type MyMap2ContentProps = Readonly<{
  blueprints: IBLUEPRINT_POPULATED[];
}>;

function MyMap2Content({ blueprints }: MyMap2ContentProps) {
  const setBlueprints = useProjectsPageStore((state) => state.setBlueprints);

  const map = useMap();

  const onBoundsChanged = useDebounceCallback(() => {
    if (!map) return;

    const mapBounds = map.getBounds();

    if (!mapBounds) return;

    // Sort first the ones that are inside the bounds

    const sortedBlueprints = blueprints
      .map((blueprint) => {
        const location = new google.maps.LatLng(
          blueprint.project.location.lat,
          blueprint.project.location.lng
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

    setBlueprints(sortedBlueprints);
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
      <Markers blueprints={blueprints} />
    </>
  );
}
