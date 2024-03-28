'use client'
import { IBLUEPRINT_POPULATED } from '@/types/blueprint'
import React, { useState } from 'react'
import { Marker, InfoWindow } from '@react-google-maps/api';
import { ProjectCard } from '../shared/ProjectCard';

interface Props {
  blueprint: IBLUEPRINT_POPULATED
  open: string
  closeModal: () => void
  openModal: (id: string) => void 
}

export const CustomMarker = ({blueprint, open, closeModal, openModal}: Props) => {
  return (
    <Marker 
      position={{ lat: blueprint.project.location.lat, lng: blueprint.project.location.lng }} 
      onClick={() => openModal(blueprint._id!)}
    >
      { open === blueprint._id ?
        <InfoWindow onCloseClick={closeModal}>
          
            <ProjectCard blueprint={blueprint} />
          
        </InfoWindow>
        : null
      }
    </Marker>
  )
}
