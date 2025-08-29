import React from 'react'
import { buildShareUrl } from '../../utils/share'

/**
 * ShareButton — small component that delegates link generation to utils.
 * Uses Web Share API when available, falls back to clipboard + prompt.
 */
export default function ShareButton({ position }) {
  const onShare = async () => {
    const url = buildShareUrl(position)
    const shareData = {
      title: 'My Location',
      text: position ? `My location: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : 'Open my location tracker',
      url
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // share cancelled or failed — fall through to clipboard fallback
      }
    }

    try {
      await navigator.clipboard.writeText(url)
      // small non-blocking UX feedback; replace with toast in real app
      alert('Link copied to clipboard!')
    } catch {
      // last resort: show a prompt for manual copy
      window.prompt('Copy link:', url)
    }
  }

  return <button onClick={onShare} aria-label="Share location">Share</button>
}
