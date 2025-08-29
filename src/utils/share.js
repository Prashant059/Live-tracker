/**
 * Utility for building share links. Kept tiny & deterministic for easy testing.
 */
export function buildShareUrl(position) {
  const url = new URL(window.location.href)
  if (position && typeof position.lat === 'number' && typeof position.lng === 'number') {
    url.searchParams.set('lat', position.lat.toFixed(6))
    url.searchParams.set('lng', position.lng.toFixed(6))
  } else {
    url.searchParams.delete('lat')
    url.searchParams.delete('lng')
  }
  return url.toString()
}
