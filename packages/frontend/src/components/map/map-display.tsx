import type { ILocation } from '@shared/domain/ILocation'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { MapEvents } from './map-events'

import 'leaflet/dist/leaflet.css'

interface MapDisplayProps {
  position: ILocation
  title: string
  minHeight?: number
  onLocationSelect?: (location: ILocation) => void
}

// Automatically center the map on position change
function ChangeView({ center }: { center: ILocation }) {
  const map = useMap()
  map.setView([center.latitude, center.longitude])
  return null
}

export function MapDisplay({
  position,
  title,
  minHeight = 100,
  onLocationSelect
}: MapDisplayProps) {
  // Extrating coodinates
  const coord: [number, number] = [position.latitude, position.longitude]

  return (
    <MapContainer
      zoom={13}
      center={coord}
      className={`w-full h-full min-h-${minHeight} rounded-md overflow-hidden`}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Allows click on map and update location manually; for testing/demo purposes */}
      {onLocationSelect && <MapEvents onMapClick={onLocationSelect} />}

      <Marker position={coord}>
        <Popup>{title}</Popup>
      </Marker>
      <ChangeView center={position} />
    </MapContainer>
  )
}
