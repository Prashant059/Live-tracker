import React from 'react'
import MapView from './components/map/MapView'
import ShareButton from './components/controls/ShareButton'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import useGeolocation from './hooks/useGeolocation'

/**
 * App — Composition root. Keep this file focused on layout and composition.
 * Business logic lives in hooks, small components & utils.
 */
export default function App() {
  const { position, accuracy, error, isWatching, start, stop } =
    useGeolocation(true) // auto-start by default (configurable)

  return (
    <div className="container">
      <Header
        isWatching={isWatching}
        onStart={start}
        onStop={stop}
        shareButton={<ShareButton position={position} />}
      />

      <main className="panel" role="main">
        <div className="status" aria-live="polite">
          <span className="live-dot" aria-hidden />
          <div>
            <div>
              {isWatching ? 'Tracking live' : 'Tracking paused'}
              {position && (
                <span className="coords"> {' '}({position.lat.toFixed(6)}, {position.lng.toFixed(6)}) ± {Math.round(accuracy)}m</span>
              )}
            </div>
            {error && <div style={{color:'#F87171'}}>Error: {error}</div>}
          </div>
        </div>

        <div className="map-wrap" aria-label="Map showing location">
          <MapView position={position} accuracy={accuracy} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
