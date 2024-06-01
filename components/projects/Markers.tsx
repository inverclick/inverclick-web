import { useCurrencyContext } from "@/contexts/CurrencyContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { limitPrice } from "@/services/utils";
import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
import {
  GridAlgorithm,
  Marker,
  MarkerClusterer,
} from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const DATA_URI = `data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNjUxZWUzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMjAiIG9wYWNpdHk9Ii45IiByPSI3MCIgLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTIwIiBvcGFjaXR5PSIuMyIgcj0iOTAiIC8+Cjwvc3ZnPg==`;

type MarkerProps = Readonly<{
  blueprints: IBLUEPRINT_POPULATED[];
}>;

export function Markers({ blueprints }: MarkerProps) {
  const { convert, currency } = useCurrencyContext();

  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        algorithm: new GridAlgorithm({}),
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
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {blueprints.map((blueprint) => {
        return (
          <AdvancedMarker
            key={blueprint.project._id}
            position={{
              lat: blueprint.project.location.lat,
              lng: blueprint.project.location.lng,
            }}
            ref={(marker) => setMarkerRef(marker, blueprint.project._id)}
          >
            <div className="bg-white py-1 px-2 rounded-full border-[1px] border-neutral-400 shadow-md">
              <span className="text-black font-medium">
                {currency === "COP"
                  ? limitPrice(blueprint.price, currency)
                  : currencyFormatter(convert(blueprint.price), currency)}{" "}
                {currency}
              </span>
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}
