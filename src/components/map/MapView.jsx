import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Ensure markers render correctly in modern bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const Recenter = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    if (!position) return
    map.setView([position.lat, position.lng], 16, { animate: true })
  }, [position, map])
  return null
}

/**
 * MapView — Small, focused component responsible for map rendering.
 * Accepts `position` and `accuracy`. If no pos provided reads from URL params (share links).
 */
const getInitialFromURL = () => {
  try {
    const params = new URLSearchParams(window.location.search)
    const lat = parseFloat(params.get('lat'))
    const lng = parseFloat(params.get('lng'))
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
    return { lat, lng }
  } catch {
    return null
  }
}

export default function MapView({ position, accuracy = 0 }) {
  const initial = position ?? getInitialFromURL() ?? { lat: 28.6139, lng: 77.2090 } // Delhi
  const hasPosition = Boolean(position)

  return (
    <MapContainer center={[initial.lat, initial.lng]} zoom={14} style={{height:'100%', width:'100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hasPosition && (
        <>
          <Marker position={[position.lat, position.lng]} />
          {accuracy > 0 && <Circle center={[position.lat, position.lng]} radius={accuracy} pathOptions={{fillOpacity:0.12}} />}
          <Recenter position={position} />
        </>
      )}
    </MapContainer>
  )
}
