import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { limitPrice } from "@/services/utils";
import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import {
  Marker,
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer";
import { AdvancedMarker, InfoWindow, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectCard } from "../shared/ProjectCard";

const DATA_URI = `data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjUxZWUzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMjAiIG9wYWNpdHk9Ii45IiByPSI3MCIgLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTIwIiBvcGFjaXR5PSIuMyIgcj0iOTAiIC8+Cjwvc3ZnPg==`;

type MarkerProps = Readonly<{
  blueprints: IBLUEPRINT_POPULATED[];
}>;

export function Markers({ blueprints }: MarkerProps) {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const [selectedBlueprintKey, setSelectedBlueprintKey] = useState<
    string | null
  >(null);

  const [visitedMarkers, setVisitedMarkers] = useState<{
    [key: string]: boolean;
  }>({});

  const { convert, currency } = useCurrencyContext();

  const selectedBlueprint = useMemo(
    () =>
      blueprints && selectedBlueprintKey
        ? blueprints.find(
            (blueprint) => blueprint.project._id === selectedBlueprintKey
          )!
        : null,
    [blueprints, selectedBlueprintKey]
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
  }, []);

  useEffect(() => {
    if (!map) return;

    map.addListener("click", () => {
      setSelectedBlueprintKey(null);
    });
  }, [map]);

  return (
    <>
      {blueprints.map((blueprint) => {
        const isCurrentOpen = selectedBlueprintKey === blueprint.project._id;
        const isVisited = visitedMarkers[blueprint.project._id];
        return (
          <AdvancedMarker
            key={blueprint.project._id}
            position={{
              lat: blueprint.project.location.lat,
              lng: blueprint.project.location.lng,
            }}
            ref={(marker) => setMarkerRef(marker, blueprint.project._id)}
            onClick={() => {
              setSelectedBlueprintKey(blueprint.project._id);

              if (!visitedMarkers[blueprint.project._id]) {
                setVisitedMarkers((prev) => ({
                  ...prev,
                  [blueprint.project._id]: true,
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
              } py-1 px-2 rounded-full border-[1px] border-primary-600 shadow-md ${
                isCurrentOpen ? "text-white" : "text-black"
              } `}
            >
              <span className=" font-medium">
                {currency === "COP"
                  ? limitPrice(blueprint.price, currency)
                  : currencyFormatter(convert(blueprint.price), currency)}{" "}
                {currency}
              </span>
            </div>
          </AdvancedMarker>
        );
      })}

      {selectedBlueprint && selectedBlueprintKey && (
        <InfoWindow
          anchor={markers[selectedBlueprintKey]}
          onCloseClick={() => {
            setSelectedBlueprintKey(null);
          }}
        >
          <ProjectCard blueprint={selectedBlueprint} />
        </InfoWindow>
      )}
    </>
  );
}
