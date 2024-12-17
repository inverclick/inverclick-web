"use client";
import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { ProjectCard } from "../shared/ProjectCard";
import { ProjectToDisplay } from "@/types/project";

interface Props {
  project: ProjectToDisplay;
  open: string;
  closeModal: () => void;
  openModal: (id: string) => void;
}

export const CustomMarker = ({
  project,
  open,
  closeModal,
  openModal,
}: Props) => {
  return (
    <Marker
      position={{ lat: project.latitude, lng: project.longitude }}
      onClick={() => openModal(project.id!)}
    >
      {open === project.id ? (
        <InfoWindow onCloseClick={closeModal}>
          <ProjectCard project={project} />
        </InfoWindow>
      ) : null}
    </Marker>
  );
};
