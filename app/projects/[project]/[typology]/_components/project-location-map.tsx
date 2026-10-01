"use client";

import { ProjectLocationMapPlaceholder } from "@/app/projects/[project]/[typology]/_components/project-location-map-placeholder";
import { ENV_VARS } from "@/global/env";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export type ProjectLocationMapProps = Readonly<{
  latitude: number;
  longitude: number;
}>;

/**
 * Mapa de Google de la sección de ubicación. Vive en su propio archivo para
 * que `ProjectLocationSection` lo cargue con `next/dynamic` sólo cuando el
 * usuario se acerca a la sección: el script de Maps y sus tiles no compiten
 * con la carga inicial de la página.
 */
export default function ProjectLocationMap({
  latitude,
  longitude,
}: ProjectLocationMapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "inverclick-google-map-script",
    googleMapsApiKey: ENV_VARS.GOOGLE_MAP_KEY,
  });

  useEffect(() => {
    if (map) {
      const draftMap = map;
      draftMap.setTilt(45);
      setMap(draftMap);
    }
  }, [map]);

  if (!isLoaded) return <ProjectLocationMapPlaceholder />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }}
      tilt={20}
      zoom={12}
      onLoad={(map) => setMap(map)}
      options={mapOptions}
      onClick={() => {
        if (map) map.setOptions({ gestureHandling: "greedy" });
      }}
      onMouseOut={() => {
        if (map) map.setOptions({ gestureHandling: "auto" });
      }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const mapOptions: google.maps.MapOptions = {
  gestureHandling: "auto",
  styles: [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#c2c2c2",
        },
        {
          weight: 2,
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ],
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};
