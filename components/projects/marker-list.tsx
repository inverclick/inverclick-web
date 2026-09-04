import { ProjectCard } from "@/components/shared/project-card";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency } from "@/lib/format-currency";
import { limitPrice } from "@/services/utils";
import { ProjectToDisplay } from "@/types/domain/projects";
import {
  Marker,
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";

const DATA_URI = `data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjUxZWUzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMjAiIG9wYWNpdHk9Ii45IiByPSI3MCIgLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTIwIiBvcGFjaXR5PSIuMyIgcj0iOTAiIC8+Cjwvc3ZnPg==`;

export type MarkerProps = Readonly<{
  projects: ProjectToDisplay[];
}>;

export function Markers({ projects = [] }: MarkerProps) {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const [selectedProjectKey, setSelectedProjectKey] = useState<string | null>(
    null
  );

  const [visitedMarkers, setVisitedMarkers] = useState<{
    [key: string]: boolean;
  }>({});

  const { convert, currency } = useCurrencyContext((s) => s);

  const selectedBlueprint = useMemo(
    () =>
      projects && selectedProjectKey
        ? projects.find((blueprint) => blueprint.id === selectedProjectKey)!
        : null,
    [selectedProjectKey, projects]
  );

  const map = useMap();

  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({
      map,
      algorithm: new SuperClusterAlgorithm({
        radius: 120,
      }),
      renderer: {
        render(cluster, stats, map) {
          return new google.maps.Marker({
            position: cluster.position,
            icon: {
              url: DATA_URI,
              scaledSize: new google.maps.Size(50, 50),
            },
            label: {
              text: String(cluster.count),
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "bold",
            },
          });
        },
      },
    });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;

    map.addListener("click", () => {
      setSelectedProjectKey(null);
    });
  }, [map]);

  return (
    <>
      {projects.map((project) => {
        const isCurrentOpen = selectedProjectKey === project.id;
        const isVisited = visitedMarkers[project.id];
        return (
          <AdvancedMarker
            key={project.id}
            position={{
              lat: project.latitude,
              lng: project.longitude,
            }}
            ref={(marker) => setMarkerRef(marker, project.id)}
            onClick={() => {
              setSelectedProjectKey(project.id);

              if (!visitedMarkers[project.id]) {
                setVisitedMarkers((prev) => ({
                  ...prev,
                  [project.id]: true,
                }));
              }
            }}
          >
            <div
              className={`${
                isCurrentOpen
                  ? "bg-primary-700"
                  : isVisited
                    ? "bg-primary-100"
                    : "bg-white"
              } whitespace-nowrap rounded-full border-[1px] border-primary-600 px-2 py-1 shadow-md ${
                isCurrentOpen ? "text-white" : "text-black"
              } `}
            >
              <span className="font-medium">
                {currency === "COP"
                  ? limitPrice(project.typologies[0].price, currency)
                  : formatCurrency(
                      convert(project.typologies[0].price),
                      currency
                    )}{" "}
                {currency}
              </span>
            </div>
          </AdvancedMarker>
        );
      })}

      {selectedBlueprint && selectedProjectKey && (
        <InfoWindow
          anchor={markers[selectedProjectKey]}
          onCloseClick={() => {
            setSelectedProjectKey(null);
          }}
        >
          <ProjectCardWrapper
            projects={projects}
            selectedProjectKey={selectedProjectKey}
          />
        </InfoWindow>
      )}
    </>
  );
}

function ProjectCardWrapper({
  projects,
  selectedProjectKey,
}: Readonly<{
  projects: ProjectToDisplay[];
  selectedProjectKey: string;
}>) {
  const project = projects.find((p) => p.id === selectedProjectKey)!;

  return <ProjectCard project={project} />;
}
