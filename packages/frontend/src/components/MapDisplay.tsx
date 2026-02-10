import type { ILocation } from '@shared/domain/ILocation'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { MapEvents } from './MapEvents'

import 'leaflet/dist/leaflet.css'

interface MapDisplayProps {
  position: ILocation
  title: string
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
  onLocationSelect
}: MapDisplayProps) {
  const coord: [number, number] = [position.latitude, position.longitude]

  return (
    <MapContainer
      center={coord}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
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
