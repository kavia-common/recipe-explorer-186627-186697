# Ocean Recipes — Remix Frontend

A responsive recipe explorer built with Remix. Browse, search, and view recipe details. This app uses mock data so it runs without any backend.

- 📖 [Remix docs](https://remix.run/docs)

## Quick Start

Install dependencies and run the dev server (port 3000):

```bash
npm install
npm run dev
```

Open http://localhost:3000

- Home page: search input with debounced filtering and a responsive grid of recipe cards
- Click a card to view details at `/recipes/:id`

## Environment Variables

This frontend respects the following env variables for future integration (not required for local mock mode):

- VITE_API_BASE: Base URL for future API calls
- VITE_BACKEND_URL: Alternative backend origin
- VITE_FRONTEND_URL, VITE_WS_URL, VITE_NODE_ENV, VITE_ENABLE_SOURCE_MAPS, VITE_PORT, VITE_TRUST_PROXY, VITE_LOG_LEVEL, VITE_HEALTHCHECK_PATH, VITE_FEATURE_FLAGS, VITE_EXPERIMENTS_ENABLED

No credentials are required. If set, these variables can be read using `import.meta.env.VITE_*` in loaders/actions or client code.

## Production

Build and start:

```bash
npm run build
npm start
```

Artifacts:
- `build/server`
- `build/client`

## Styling

The app follows the “Ocean Professional” theme using Tailwind and a small custom stylesheet at `app/styles/theme.css`:
- Primary #2563EB, Secondary/Success #F59E0B, Error #EF4444
- Background #f9fafb, Surface #ffffff, Text #111827
- Subtle gradients, rounded corners, smooth transitions
