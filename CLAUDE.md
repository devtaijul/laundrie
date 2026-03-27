# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
yarn dev              # Start dev server with Turbopack

# Database
yarn prepare:db       # Push schema to DB and regenerate Prisma client
yarn studio           # Open Prisma Studio GUI
yarn seed             # Seed database with initial data (admin user, referral codes)

# Build & Deploy
yarn build            # Runs prepare:db then next build
yarn start            # Start production server

# Code Quality
yarn lint             # Run ESLint
```

No test suite is configured — the codebase has no jest/vitest config files.

## Architecture

**Laundrie** is a multi-role laundry service platform built on Next.js 15 App Router with four distinct user experiences gated by role:

- **(public)** — Landing page, pricing, about, contact
- **(auth)** — Login, signup, password reset
- **(dashboard)** — Customer-facing order flow and account management
- **(admin)** — Full business management (customers, drivers, orders, finance, reviews, settings)
- **(driver)** — Driver pickup/delivery workflow

### Data Flow

Server Actions in `src/actions/` are the primary mutation layer — they talk directly to Prisma. API routes exist only for Stripe (`/api/create-payment-intent`, `/api/webhooks/stripe`) and NextAuth (`/api/auth/[...nextauth]`).

### Authentication

`src/auth.ts` configures NextAuth with JWT strategy and a Credentials provider that supports two login methods:
1. Email + password
2. Phone number + OTP

Role (`USER`, `ADMIN`, `DRIVER`) and `useType` (`PERSONAL`, `BUSINESS`) are embedded in the JWT and available in session. Route protection is enforced via Next.js middleware using these session values.

### Database

PostgreSQL via Prisma. Key models:

- **User** — Unified table for customers, admins, and drivers (differentiated by `role`)
- **Order** — Core entity with status enum (`PENDING → PROCESSING → PICKUP_SCHEDULED → PICKED_UP → DELIVERY_SCHEDULED → DELIVERED`), pricing breakdown, and bag/item counts
- **OrderEvent** — Append-only event log for order timeline (used in tracking UI)
- **Payment** — Mirrors Stripe payment intent status
- **Business / Website** — Singleton config tables for business settings

Schema lives in `prisma/schema.prisma`. After schema changes, run `yarn prepare:db` (dev) or `prisma migrate` (production).

### Key Conventions

- **Path alias:** `@/*` maps to `src/*`
- **UI components:** shadcn/ui ("new-york" style) in `src/components/ui/` — add new ones via `npx shadcn add`
- **Validation:** Zod schemas colocated with forms; `@hookform/resolvers/zod` bridges to React Hook Form
- **Custom hooks:** `use-async-action.ts` wraps server actions with loading/error state — prefer this over manual useState for action calls
- **Notifications:** Sonner toaster (imported in root layout) — use `toast.success/error` directly
- **Styling:** Tailwind CSS v4 with CSS variables for theming; `cn()` utility from `src/lib/utils.ts` for conditional classes

### Environment Variables

Required vars (see `.env` for current dev values):
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret
- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` — Stripe keys
- `RESEND_API_KEY` — Email delivery
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — Address autocomplete
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` — Form protection
- `R2_*` — Cloudflare R2 for file storage

### Notable Config

`next.config.ts` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` — TypeScript and ESLint errors won't fail the build.

The `react-email-starter/` directory is a separate package for developing and previewing email templates; it's not part of the Next.js build.
