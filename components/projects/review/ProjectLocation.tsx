'use client'
import { ENV_VARS } from '@/global/env';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react'

interface Props {
  lat: number
  lng: number
  department: string
  city: string
  address: string
}

export const ProjectLocation = ({lat, lng, address, city, department}: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const { isLoaded } = useJsApiLoader({
    id: 'inverclick-google-map-script',
    googleMapsApiKey: ENV_VARS.GOOGLE_MAP_KEY
  })

  useEffect(() => {
    if(map){
      const draftMap = map
      draftMap.setTilt(45)
      setMap(draftMap)
    }
  }, [map])

  return isLoaded ? (
    <div className='my-4'>
      <p className='font-medium text-2xl mb-5'>Ubicación</p>
      <p className='md:max-w-lg text-base text-pretty font-light mb-4'>Colombia, {department}, {city} / {address}</p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat, lng}}
        tilt={20}
        zoom={12}
        onLoad={map => setMap(map)}
        options={mapOptions}
      >
       <Marker position={{lat, lng}} /> 
      </GoogleMap>
    </div>
  ) : <></>
}

const containerStyle = {
  width: '100%',
  height: '400px'
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