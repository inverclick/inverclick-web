'use client'
import { ENV_VARS } from '@/global/env';
import type { IBLUEPRINT_POPULATED } from '@/types/blueprint';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react'
import { CustomMarker } from './CustomMarker';

interface Props {
  blueprints: IBLUEPRINT_POPULATED[]
}

export const MyMap = ({blueprints}: Props) => {
  const [open, setOpen] = useState('')
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isLoaded } = useJsApiLoader({
    id: 'inverclick-google-map-script',
    googleMapsApiKey: ENV_VARS.GOOGLE_MAP_KEY
  })
  
  const closeModal = () => setOpen('')
  const openModal = (id: string) => setOpen(id)

  useEffect(() => {
    if(map){
      const draftMap = map
      draftMap.setTilt(45)
      setMap(draftMap)
    }
  }, [map])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        tilt={20}
        zoom={6}
        onLoad={map => setMap(map)}
        options={mapOptions}
      >
        {blueprints.map(blueprint => 
          <CustomMarker 
            key={blueprint._id} 
            blueprint={blueprint} 
            open={open}
            openModal={openModal}
            closeModal={closeModal}
          />
        )}
      </GoogleMap>
  ) : <></>
}

const containerStyle = {
  width: '100%x',
  height: '100vh'
};

const center = {
  lat: 4.5709,
  lng: -74.2973
};

const mapOptions = {
  styles: [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c2c2c2"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ],
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};