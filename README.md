# HackSpain landing

Marketing site for [HackSpain](https://hackspain.com) (Hack Spain 2026 hackathon, Madrid). Built with **Astro** (server output on Vercel), **React** islands for interactive sections, **Tailwind CSS v4**, and **Motion** for animation.

- **Language:** Spanish (public copy); legacy `/en/...` and `/es/...` paths redirect to unprefixed URLs
- **Signup:** server API at `/api/signup` backed by **PostgreSQL** (Neon) via **Drizzle ORM**

## Requirements

- [Node.js](https://nodejs.org/) **≥ 22.12**
- [pnpm](https://pnpm.io/) (used for install and scripts)

## Setup

```sh
pnpm install
cp .env.example .env
```

Set `DATABASE_URL` in `.env` to a PostgreSQL connection string when you need signup persistence or local API testing. Without it, static pages still run; the signup endpoint expects a configured database.

Apply schema to your database when using Drizzle (see [Database](#database)).

## Commands

| Command | Description |
| :------ | :---------- |
| `pnpm dev` | Dev server (default [localhost:4321](http://localhost:4321)) |
| `pnpm build` | Production build to `./dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro check` | Astro + TypeScript checks |
| `pnpm assets:quiver` | Quiver asset pipeline (`scripts/quiver-generate-assets.mjs`) |
| `pnpm assets:quiver:tiles` | Tile illustrations only |
| `pnpm assets:quiver:tiles+heroes` | Tiles + hero illustrations |

## Database

Drizzle is configured for PostgreSQL (`drizzle.config.ts`, schema in `src/db/schema.ts`).

| Command | Description |
| :------ | :---------- |
| `pnpm db:generate` | Generate migrations from schema changes |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:push` | Push schema (handy in development) |

## Project layout

```text
src/
├── components/hackspain/   # React + shared UI for the landing
├── data/                   # SEO copy, routes metadata, llms.txt
├── db/                     # Drizzle client and schema
├── layouts/                # Astro layouts
└── pages/                  # Routes and API
```

Deployment targets **Vercel** (`@astrojs/vercel`); analytics use `@vercel/analytics` when enabled in production.

## Docs

- [Astro](https://docs.astro.build/)
- [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview)