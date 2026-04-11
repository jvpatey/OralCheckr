# OralCheckr (monorepo)

Full-stack oral health assessment and habit tracking: **React + Vite** frontend and **Express + Sequelize** API in one repository.

| App | Path | Stack |
|-----|------|--------|
| Web | [`apps/web`](apps/web) | React 18, TypeScript, Vite |
| API | [`apps/api`](apps/api) | Node.js, Express, TypeScript, Sequelize |

**Live demo:** [jvpatey.github.io/OralCheckr](https://jvpatey.github.io/OralCheckr/)

Product details, screenshots, and feature list: [apps/web/README.md](apps/web/README.md).  
API endpoints and server env vars: [apps/api/README.md](apps/api/README.md).

## Prerequisites

- Node.js (v18+ recommended)
- MySQL (local dev) or PostgreSQL (production-style)
- npm

## Run locally

**1. API** (from repo root):

```bash
cd apps/api
npm install
# Create .env — see variables listed in apps/api/README.md
npm run dev
```

Default API URL: `http://localhost:3000`. Health check: `GET http://localhost:3000/health`.

**2. Web** (second terminal):

```bash
cd apps/web
npm install
```

Create `apps/web/.env`:

```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

```bash
npm run dev
```

The API must allow your web origin in CORS (see `apps/api/src/config/corsConfig.ts`). Local Vite typically uses `http://localhost:5173`.

## Deployments

- **Frontend (GitHub Pages):** workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys from `apps/web`.
- **Backend (Render):** connect this repository and set **Root Directory** to `apps/api`. Build: `npm install && npm run build:prod`. Start: `npm start`.

## Repository layout

```
apps/
  web/     # Vite React app (GitHub Pages)
  api/     # Express API (e.g. Render)
.github/
  workflows/
```

## Render (API)

1. Open your Render web service for the API.
2. Connect it to this GitHub repository and branch you deploy from (e.g. `master`).
3. Set **Root Directory** to `apps/api`.
4. **Build command:** `npm install && npm run build:prod` — **Start command:** `npm start`.
5. Deploy and verify `GET /health` and that the live site can reach the API.
