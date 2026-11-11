"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { Markers } from "@/components/projects/marker-list";
import { ENV_VARS } from "@/global/env";
import { ProjectToDisplay } from "@/types/domain/projects";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { Locate } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

const INITIAL_CENTER = { lat: 4.5709, lng: -74.2973 };
const INITIAL_ZOOM = 6;
// Zoom when focusing a single project (roughly a neighborhood).
const PROJECT_ZOOM = 15;
// Room the search field takes at the top of the map when framing results.
const FIT_PADDING = { top: 130, bottom: 80, left: 48, right: 48 };

export type MyMap2Props = Readonly<{
  projects: ProjectToDisplay[];
  /** The typed text has not been applied to `projects` yet. */
  filtering?: boolean;
}>;

export function Map2({ projects, filtering = false }: MyMap2Props) {
  return (
    <APIProvider apiKey={ENV_VARS.GOOGLE_MAP_KEY}>
      <MyMap2Content projects={projects} filtering={filtering} />
    </APIProvider>
  );
}

function MyMap2Content({ projects, filtering = false }: MyMap2Props) {
  const setProjects = useProjectsPageStore((state) => state.setProjects);
  const focusRequest = useProjectsPageStore((state) => state.focusRequest);
  const loadingResults = useProjectsPageStore((state) => state.loadingResults);
  const select = useProjectsPageStore((state) => state.select);
  const [showCenterButton, setShowCenterButton] = useState(false);

  const map = useMap();

  // Memoized so the debounced function (and the effect below) only change
  // with the map or the results.
  const sortByVisibility = useCallback(() => {
    if (!map) return;

    const mapBounds = map.getBounds();

    if (!mapBounds) return;

    // Sort first the ones that are inside the bounds. The sort is stable, so
    // each group keeps the session's random order.
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
  }, [map, projects, setProjects]);

  const onBoundsChanged = useDebounceCallback(sortByVisibility, 500);

  // Re-sort when the results change (search, filters), not only on map moves.
  useEffect(() => {
    onBoundsChanged();
  }, [projects, onBoundsChanged]);

  // Show "Centrar" whenever the camera is away from the initial view.
  const onIdle = useCallback(() => {
    if (!map) return;
    const center = map.getCenter();
    const atInitial =
      !!center &&
      map.getZoom() === INITIAL_ZOOM &&
      Math.abs(center.lat() - INITIAL_CENTER.lat) < 0.001 &&
      Math.abs(center.lng() - INITIAL_CENTER.lng) < 0.001;
    setShowCenterButton(!atInitial);
  }, [map]);

  const onCenter = () => {
    if (!map) return;
    setShowCenterButton(false);
    map.setZoom(INITIAL_ZOOM);
    map.panTo(INITIAL_CENTER);
  };

  // Move the camera when the search asks for a project or for the results.
  const handledFocus = useRef(0);
  useEffect(() => {
    if (!map || !focusRequest || focusRequest.nonce === handledFocus.current) {
      return;
    }
    // Frame the results only once they are loaded and the text is applied.
    if (focusRequest.kind === "fit" && (loadingResults || filtering)) return;
    handledFocus.current = focusRequest.nonce;

    if (focusRequest.kind === "project") {
      const project = projects.find((p) => p.id === focusRequest.projectId);
      if (!project) return;
      map.setZoom(PROJECT_ZOOM);
      map.panTo({ lat: project.latitude, lng: project.longitude });
      // Open the card once the cluster has split and the marker is on the map.
      google.maps.event.addListenerOnce(map, "idle", () => select(project.id));
      return;
    }

    if (projects.length === 1) {
      map.setZoom(PROJECT_ZOOM - 1);
      map.panTo({ lat: projects[0].latitude, lng: projects[0].longitude });
    } else if (projects.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      for (const project of projects) {
        bounds.extend({ lat: project.latitude, lng: project.longitude });
      }
      map.fitBounds(bounds, FIT_PADDING);
    }
  }, [map, focusRequest, loadingResults, filtering, projects, select]);

  return (
    <>
      <Map
        mapId={ENV_VARS.GOOGLE_MAP_ID}
        defaultTilt={45}
        defaultZoom={INITIAL_ZOOM}
        defaultCenter={INITIAL_CENTER}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onBoundsChanged={onBoundsChanged}
        onDragstart={() => setShowCenterButton(true)}
        onIdle={onIdle}
      />
      <Markers projects={projects} />
      {showCenterButton ? (
        <button
          type="button"
          onClick={onCenter}
          aria-label="Centrar mapa"
          title="Vuelve a la posición y al zoom iniciales"
          className="absolute bottom-6 left-1/2 z-10 flex min-h-11 -translate-x-1/2 animate-fade-in items-center gap-2 rounded-full bg-[#141414] px-4 py-3 text-sm font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-opacity animate-duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414] active:opacity-80"
        >
          <Locate className="h-[18px] w-[18px]" aria-hidden />
          Centrar
        </button>
      ) : null}
    </>
  );
}
