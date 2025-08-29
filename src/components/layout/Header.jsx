import React from 'react'

/**
 * Header — presentational component with slots for actions.
 * Keep markup simple and accessible.
 */
export default function Header({ isWatching, onStart, onStop, shareButton }) {
  return (
    <header className="app-header">
      <h1><span className="dot" /> Location Tracker — Pro</h1>
      <div className="controls">
        {!isWatching ? (
          <button onClick={onStart} aria-label="Start tracking">Start</button>
        ) : (
          <button onClick={onStop} aria-label="Stop tracking">Stop</button>
        )}
        {shareButton}
      </div>
    </header>
  )
}
