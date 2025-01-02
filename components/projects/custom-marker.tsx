"use client";

import { ProjectCard } from "@/components/shared/project-card";
import { ProjectToDisplay } from "@/types/domain/projects";
import { InfoWindow, Marker } from "@react-google-maps/api";

export type CustomMarkerProps = {
  project: ProjectToDisplay;
  open: string;
  closeModal: () => void;
  openModal: (id: string) => void;
};

export const CustomMarker = ({
  project,
  open,
  closeModal,
  openModal,
}: CustomMarkerProps) => {
  return (
    <Marker
      position={{ lat: project.latitude, lng: project.longitude }}
      onClick={() => openModal(project.id)}
    >
      {open === project.id ? (
        <InfoWindow onCloseClick={closeModal}>
          <ProjectCard project={project} />
        </InfoWindow>
      ) : null}
    </Marker>
  );
};
