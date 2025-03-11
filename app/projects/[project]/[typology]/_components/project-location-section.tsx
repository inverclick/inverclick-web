"use client";

import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { DraftProject } from "@/app/projects/[project]/[typology]/preview/_services/get-draft-project";
import { ENV_VARS } from "@/global/env";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { ComponentProps, useEffect, useState } from "react";

export type ProjectLocationProps = {
  project: Project | DraftProject;
} & ComponentProps<"section">;

export const ProjectLocationSection = ({
  project,
  ...props
}: ProjectLocationProps) => {
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

  return isLoaded ? (
    <section className={cn("flex flex-col", props.className)} {...props}>
      <Typography variant="h3" className="mb-4">
        Ubicación
      </Typography>
      <Typography className="mb-4">
        Colombia, {project.department?.name ?? "N/A"},{" "}
        {project.city?.name ?? "N/A"} / {project.address}
      </Typography>
      {project.latitude && project.longitude && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: project.latitude, lng: project.longitude }}
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
          <Marker
            position={{ lat: project.latitude, lng: project.longitude }}
          />
        </GoogleMap>
      )}
    </section>
  ) : null;
};

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
