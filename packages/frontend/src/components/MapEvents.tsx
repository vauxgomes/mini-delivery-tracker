import { useMapEvents } from 'react-leaflet'
import type { ILocation } from '@shared/domain/ILocation'

interface MapEventsProps {
  onMapClick: (location: ILocation) => void
}

export function MapEvents({ onMapClick }: MapEventsProps) {
  useMapEvents({
    click: (e) => {
      onMapClick({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      })
    }
  })

  return null
}
