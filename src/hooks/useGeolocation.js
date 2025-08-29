import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * useGeolocation — encapsulates geolocation watch logic.
 * - Auto-start configurable
 * - Proper cleanup on unmount
 * - Returns: position, accuracy, error, isWatching, start, stop
 */
export default function useGeolocation(autoStart = false) {
  const [position, setPosition] = useState(null)
  const [accuracy, setAccuracy] = useState(0)
  const [error, setError] = useState(null)
  const [isWatching, setIsWatching] = useState(false)
  const watchIdRef = useRef(null)

  const onSuccess = useCallback((pos) => {
    const { latitude, longitude, accuracy } = pos.coords
    setPosition({ lat: latitude, lng: longitude })
    setAccuracy(accuracy ?? 0)
    setError(null)
  }, [])

  const onError = useCallback((err) => {
    setError(err?.message ?? 'Location error')
  }, [])

  const start = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported.')
      return
    }
    if (watchIdRef.current != null) return // already active

    const id = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 10000
    })
    watchIdRef.current = id
    setIsWatching(true)
  }, [onSuccess, onError])

  const stop = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsWatching(false)
  }, [])

  useEffect(() => {
    if (autoStart) start()
    return () => stop()
  }, [autoStart, start, stop])

  return { position, accuracy, error, isWatching, start, stop }
}
