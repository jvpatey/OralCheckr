# OralCheckr

**Personalized oral health assessments, habit tracking, and analytics** — a full-stack monorepo with a React + Vite frontend and an Express + Sequelize API.

[**Live demo →**](https://jvpatey.github.io/OralCheckr/)

---

## Highlights

| Feature | What you get |
| --- | --- |
| **Assessment** | Guided questionnaire, oral health score, and tailored recommendations |
| **Suggested habits** | Add habits to your tracker in one tap from recommendation cards |
| **Visit summary** | Printable summary of your last assessment to share at appointments |
| **Habits & analytics** | Daily logging, month and year views, trends, and heatmaps |
| **Sign-in options** | Email/password, Google OAuth, or **Continue as guest** |
| **Guest upgrade** | Questionnaire, habits, and logs carry over when you create an account |
| **Experience** | Redesigned welcome and dashboard, light/dark theme, responsive layout |

---

## Stack

| Layer | Location | Technologies |
| --- | --- | --- |
| **Web** | [`apps/web`](apps/web) | React 18, TypeScript, Vite, React Query, styled-components, Bootstrap |
| **API** | [`apps/api`](apps/api) | Node.js, Express, TypeScript, Sequelize (MySQL / PostgreSQL) |

More detail: [apps/web/README.md](apps/web/README.md) (product walkthrough & screenshots) · [apps/api/README.md](apps/api/README.md) (endpoints & environment variables).

---

## Prerequisites

- Node.js (v18+ recommended)
- MySQL for local development, or PostgreSQL for production-style setups
- npm

---

## Run locally

**1. API** (terminal one — from repo root):

```bash
cd apps/api
npm install
# Create apps/api/.env — variables are listed in apps/api/README.md
npm run dev
```

Default base URL: `http://localhost:3000` · Health: `GET http://localhost:3000/health`

**2. Web** (terminal two):

```bash
cd apps/web
npm install
```

Create `apps/web/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

```bash
npm run dev
```

The API must allow your web origin in CORS (`apps/api/src/config/corsConfig.ts`). Vite usually serves at `http://localhost:5173`.

---

## Deployments

| Target | Notes |
| --- | --- |
| **Frontend (GitHub Pages)** | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys `apps/web` |
| **Backend (Render)** | Connect the repo, set **Root Directory** to `apps/api` · Build: `npm install && npm run build:prod` · Start: `npm start` |

---

## Repository layout

```
apps/
  web/          # Vite React app (GitHub Pages)
  api/          # Express API (e.g. Render)
.github/
  workflows/
```
