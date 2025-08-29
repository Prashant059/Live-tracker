# Location Tracker — Pro (React + Vite + Leaflet)

A production-structured example for tracking and sharing location using HTML5 Geolocation and OpenStreetMap (Leaflet).

## What I improved over a beginner version
- Modular folder layout for scale
- Clear separation: components, hooks, utils, styles
- Accessible, small presentational components
- Configurable hook (auto-start)
- Proper cleanup and error handling
- Comments and small helper utils for testability

## Quick start
```bash
npm install
npm run dev
# open http://localhost:5173 and allow location permission
```

## Deploy
- Netlify / Vercel: build `npm run build`, publish `dist`
- HTTPS required for geolocation in production

## Notes
- This example uses OpenStreetMap tiles. Be polite with tile usage.
- For continuous remote live tracking you'd need a backend and socket-based updates; this project focuses on client-side shareable links.
