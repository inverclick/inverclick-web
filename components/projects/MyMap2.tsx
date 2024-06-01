"use client";

import { Markers } from "@/components/projects/Markers";
import { ENV_VARS } from "@/global/env";
import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

type MyMap2Props = Readonly<{
  blueprints: IBLUEPRINT_POPULATED[];
}>;

export function MyMap2({ blueprints }: MyMap2Props) {
  return (
    <APIProvider apiKey={ENV_VARS.GOOGLE_MAP_KEY}>
      <Map
        mapId={ENV_VARS.GOOGLE_MAP_ID}
        defaultTilt={45}
        defaultZoom={6}
        defaultCenter={{ lat: 4.5709, lng: -74.2973 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
      <Markers blueprints={blueprints} />
    </APIProvider>
  );
}
