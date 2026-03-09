# Ottercut AI — Copilot Instructions

## Project

Ottercut AI is an AI video editor that removes pauses, filler words, and retakes from talking-head videos. Built on a LaunchKit SaaS template.

## Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Auth**: Clerk — user IDs are **TEXT** (`user_2abc…`), never UUID
- **Database**: Supabase PostgreSQL + pgvector (RLS enabled, service-role bypass)
- **Payments**: Stripe (Starter $49 / Creator $99 / Pro $199)
- **Backend (Sprint 3+)**: FastAPI (Python), Inngest job queue
- **UI**: shadcn/ui + Radix primitives, Lucide React icons, indigo/purple palette

## Key Patterns

### Server Actions (`src/lib/{feature}/actions.ts`)

```ts
"use server";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/admin";

// 1. Get userId from Clerk — NEVER trust the client
// 2. Use admin client (service role) to bypass RLS
// 3. Validate input with Zod before DB ops
// 4. Handle PGRST116 (not found) gracefully
```

### File Layout

- `src/app/(dashboard|marketing|auth)/` — route groups
- `src/lib/{feature}/actions.ts` — Server Actions (`'use server'`)
- `src/lib/{feature}/server.ts` — server utilities
- `src/lib/{feature}/client.ts` — client hooks/utils
- `src/types/{feature}.ts` — domain types; `database.ts` is auto-generated
- `src/config/features.ts` — feature flags + `planFeatures` per-tier limits
- `src/constants/subscription-tiers.ts` — tier enum, limits, helpers
- `supabase/migrations/` — numbered SQL files (`001_`, `002_`, …)

### Database Rules

- `user_id TEXT` (Clerk IDs), **not** UUID
- Always enable RLS; add service-role policy for full access
- Use `TIMESTAMPTZ DEFAULT NOW()` for `created_at` / `updated_at`
- Add `updated_at` trigger on every table
- Index foreign keys and frequently-queried columns
- Regenerate types after migration: `npm run types:generate`

### TypeScript Rules

- No `any` — use `unknown` or proper types
- Validate all user input server-side with Zod (`src/lib/validations/`)
- Export domain types from `src/types/{feature}.ts`

### UI Rules

- Use existing shadcn/ui components (`Button`, `Card`, `Input`, etc.)
- Mobile-first, responsive, accessible (ARIA + keyboard nav)
- Match indigo primary / dark-theme design tokens in `src/config/site.ts`

## Commands

```bash
npm run dev            # localhost:3000
npm run build          # production build
npm run lint           # ESLint
npm run types:generate # regenerate src/types/database.ts
```

## Current State

Sprint 1 — Data Layer + Project Shell. See `CLAUDE.md` for full sprint deliverables, `docs/project_mgmt/MVP_BUILD_PLAN.md` for the 6-sprint roadmap, and `docs/project_mgmt/TECH_SPEC.md` for architecture details.

**New agent?** Start with [`docs/project_mgmt/AGENT_QUICKSTART.md`](docs/project_mgmt/AGENT_QUICKSTART.md) for task assignments and copy-paste patterns.

## Git

Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`). Never commit `.env` files.
