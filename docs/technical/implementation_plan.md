# Implementation Plan: Project Scaffolding

**Last Updated:** 2026-01-07

**Location:** All scaffolding code lives in `src/`

This document outlines the phased approach for setting up the Tutor Management SaaS platform scaffolding. Each phase builds upon the previous one, allowing for incremental progress and validation.

---


## Phase 1: Monorepo Foundation

**Goal:** Establish the pnpm monorepo structure with Turborepo build system and shared configurations.

### Checklist

- [x] Initialize pnpm workspace
  - [x] Create `pnpm-workspace.yaml` defining apps and packages
  - [x] Create root `package.json` with workspace scripts
  - [x] Set `packageManager` field to `pnpm@10.x`

- [x] Configure Turborepo
  - [x] Create `turbo.json` with task pipelines (build, lint, test, dev)
  - [x] Define `globalEnv` for shared environment variables
  - [x] Configure task dependencies and caching

- [x] Create folder structure
  ```
  src/
  ├── apps/
  │   ├── marketing/     # (placeholder)
  │   ├── web/           # (placeholder)
  │   └── mobile/        # (placeholder)
  ├── packages/
  │   ├── api/           # (placeholder)
  │   ├── database/      # (placeholder)
  │   ├── email/         # (placeholder)
  │   ├── constants/     # (placeholder)
  │   ├── config/        # Shared configurations
  │   └── e2e/           # (placeholder)
  └── (tooling to be added)
  ```

- [x] Set up shared configurations (`packages/config`)
  - [x] TypeScript base config (`tsconfig.base.json`)
  - [x] ESLint shared config
  - [x] Prettier config (`.prettierrc`)
  - [x] Tailwind preset for web apps

- [x] Create root development files
  - [x] `.gitignore` (node_modules, .env.local, .turbo, etc.)
  - [x] `.nvmrc` with Node.js 24
  - [x] `.env.example` template
  - [x] `README.md` with setup instructions

- [x] Validate setup
  - [x] Run `pnpm install` successfully
  - [x] Run `pnpm turbo build` (should complete with empty packages)

---

## Phase 2: Database Layer

**Goal:** Set up Supabase with Drizzle ORM, create the initial schema, and configure migrations.

### Checklist

- [ ] Initialize `packages/database`
  - [ ] Create `package.json` with Drizzle dependencies
  - [ ] Set up TypeScript configuration
  - [ ] Create `drizzle.config.ts`

- [ ] Configure Supabase
  - [ ] Initialize Supabase project (`supabase init`)
  - [ ] Configure `supabase/config.toml`
  - [ ] Create production Supabase project (dashboard)
  - [ ] Document connection strings in `.env.example`

- [ ] Create Drizzle schema (`packages/database/src/schema/`)
  - [ ] `organizations.ts` - Multi-tenancy foundation
  - [ ] `users.ts` - User profiles
  - [ ] `tutors.ts` - Tutor-specific data
  - [ ] `students.ts` - Student-specific data
  - [ ] `sessions.ts` - Tutoring sessions
  - [ ] `reviews.ts` - Session feedback
  - [ ] `payments.ts` - Payment records
  - [ ] `subscriptions.ts` - Subscription management
  - [ ] `index.ts` - Export all schemas

- [ ] Set up database utilities
  - [ ] Create database client (`src/client.ts`)
  - [ ] Export typed query helpers
  - [ ] Configure connection pooling

- [ ] Create migration workflow
  - [ ] Generate initial migration (`db:generate`)
  - [ ] Create migration apply script (`db:migrate`)
  - [ ] Create migration status script (`db:status`)

- [ ] Create seed script
  - [ ] Default organization (required first)
  - [ ] Sample tutors (5)
  - [ ] Sample students (10)
  - [ ] Sample sessions (20)
  - [ ] Sample reviews and payments

- [ ] Add package scripts
  - [ ] `db:generate` - Generate migrations from schema
  - [ ] `db:migrate` - Apply pending migrations
  - [ ] `db:seed` - Seed development data
  - [ ] `db:studio` - Open Drizzle Studio
  - [ ] `db:reset` - Reset and reseed database

- [ ] Validate setup
  - [ ] Start local Supabase (`supabase start`)
  - [ ] Run migrations successfully
  - [ ] Seed data successfully
  - [ ] Query data via Drizzle Studio

---

## Phase 3: API Layer

**Goal:** Create the tRPC API package with type-safe routers connected to the database.

### Checklist

- [ ] Initialize `packages/api`
  - [ ] Create `package.json` with tRPC dependencies
  - [ ] Set up TypeScript configuration
  - [ ] Add dependency on `@repo/database`

- [ ] Set up tRPC foundation
  - [ ] Create tRPC context (`src/context.ts`)
  - [ ] Create tRPC instance (`src/trpc.ts`)
  - [ ] Define base procedures (public, protected)
  - [ ] Export app router type

- [ ] Create routers (`src/routers/`)
  - [ ] `users.ts` - User profile CRUD
  - [ ] `tutors.ts` - Tutor management + search
  - [ ] `students.ts` - Student management
  - [ ] `sessions.ts` - Session booking + history
  - [ ] `reviews.ts` - Review CRUD
  - [ ] `payments.ts` - Payment queries
  - [ ] `subscriptions.ts` - Subscription management
  - [ ] `index.ts` - Merge all routers

- [ ] Set up input validation
  - [ ] Install Zod
  - [ ] Create shared validation schemas in `packages/constants`
  - [ ] Apply to all procedure inputs

- [ ] Configure authentication context
  - [ ] Parse JWT from request headers
  - [ ] Validate with Supabase Auth
  - [ ] Attach user to context
  - [ ] Create `protectedProcedure` middleware

- [ ] Validate setup
  - [ ] TypeScript compiles without errors
  - [ ] Router types export correctly
  - [ ] Can call procedures programmatically in tests

---

## Phase 4: Web Applications

**Goal:** Set up the Next.js marketing site and main web application with tRPC integration.

### Checklist

- [ ] Initialize `apps/marketing` (Next.js)
  - [ ] Create Next.js 16 app with App Router
  - [ ] Configure Tailwind CSS
  - [ ] Set up MDX for blog content
  - [ ] Configure next-intl (i18n)
  - [ ] Create basic pages (home, features, pricing, blog)

- [ ] Initialize `apps/web` (Next.js)
  - [ ] Create Next.js 16 app with App Router
  - [ ] Configure Tailwind CSS
  - [ ] Set up shadcn/ui component library
  - [ ] Configure next-intl (i18n)
  - [ ] Install Phosphor icons

- [ ] Set up tRPC client in `apps/web`
  - [ ] Create tRPC client configuration
  - [ ] Set up React Query provider
  - [ ] Create API route handler (`/api/trpc/[trpc]`)
  - [ ] Export typed hooks

- [ ] Create layout structure (`apps/web`)
  - [ ] Root layout with providers
  - [ ] Auth layout (login, signup)
  - [ ] Dashboard layout (sidebar, header)
  - [ ] Marketing layout (shared with marketing app)

- [ ] Set up authentication pages
  - [ ] Login page
  - [ ] Signup page
  - [ ] Forgot password page
  - [ ] Auth callback handler

- [ ] Configure environment variables
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL`

- [ ] Validate setup
  - [ ] Both apps start with `pnpm dev`
  - [ ] tRPC queries work end-to-end
  - [ ] Hot reload functions correctly
  - [ ] Build completes without errors

---

## Phase 5: Mobile Application

**Goal:** Set up the Expo React Native app with navigation and tRPC integration.

### Checklist

- [ ] Initialize `apps/mobile` (Expo)
  - [ ] Create Expo app with SDK 54+
  - [ ] Configure Expo Router (file-based routing)
  - [ ] Set up React Native Reusables (shadcn-style components)
  - [ ] Configure i18next for internationalization

- [ ] Set up tRPC client
  - [ ] Configure tRPC client for React Native
  - [ ] Set up React Query with AsyncStorage persistence
  - [ ] Create typed hooks

- [ ] Create navigation structure
  - [ ] Tab navigation (Dashboard, Sessions, Profile)
  - [ ] Stack navigation for detail screens
  - [ ] Auth flow screens

- [ ] Set up authentication
  - [ ] Supabase Auth integration
  - [ ] Secure token storage
  - [ ] Auth state management
  - [ ] Deep linking support

- [ ] Configure EAS
  - [ ] Create `eas.json` for build profiles
  - [ ] Configure development, staging, production builds
  - [ ] Set up OTA updates

- [ ] Configure environment variables
  - [ ] `EXPO_PUBLIC_API_URL`
  - [ ] `EXPO_PUBLIC_SUPABASE_URL`
  - [ ] `EXPO_PUBLIC_SUPABASE_ANON_KEY`

- [ ] Validate setup
  - [ ] App starts with `pnpm dev` (Expo DevClient)
  - [ ] tRPC queries work
  - [ ] Navigation functions correctly
  - [ ] EAS build succeeds

---

## Phase 6: External Services Integration

**Goal:** Integrate authentication, payments, email, and background jobs.

### Checklist

- [ ] Set up Supabase Auth
  - [ ] Configure auth providers (email, OAuth)
  - [ ] Set up email templates in Supabase
  - [ ] Create Row Level Security (RLS) policies
  - [ ] Test auth flow end-to-end

- [ ] Set up Lemon Squeezy (payments)
  - [ ] Create Lemon Squeezy account and store
  - [ ] Configure products and variants
  - [ ] Set up webhook endpoint (`/api/webhooks/lemon-squeezy`)
  - [ ] Implement webhook signature verification
  - [ ] Create payment-related tRPC procedures

- [ ] Initialize `packages/email`
  - [ ] Set up React Email components
  - [ ] Create email templates (welcome, session reminder, receipt)
  - [ ] Configure Resend integration
  - [ ] Create send email utility

- [ ] Set up Inngest (background jobs)
  - [ ] Install Inngest SDK
  - [ ] Create Inngest client
  - [ ] Set up API route handler (`/api/inngest`)
  - [ ] Create job functions:
    - [ ] Session reminder emails
    - [ ] Payment webhooks processing
    - [ ] Review request emails

- [ ] Configure environment variables
  - [ ] `LEMON_SQUEEZY_API_KEY`
  - [ ] `LEMON_SQUEEZY_WEBHOOK_SECRET`
  - [ ] `RESEND_API_KEY`
  - [ ] `INNGEST_EVENT_KEY`
  - [ ] `INNGEST_SIGNING_KEY`

- [ ] Validate setup
  - [ ] Auth flow works (signup → login → protected pages)
  - [ ] Test payment flow with Lemon Squeezy sandbox
  - [ ] Email sending works
  - [ ] Background jobs execute and retry

---

## Phase 7: Observability & DevOps

**Goal:** Set up monitoring, logging, analytics, and CI/CD pipelines.

### Checklist

- [ ] Set up Sentry (error tracking)
  - [ ] Create Sentry project
  - [ ] Install Sentry SDK in web apps
  - [ ] Install Sentry SDK in mobile app
  - [ ] Configure source maps upload
  - [ ] Test error reporting

- [ ] Set up Axiom (logging)
  - [ ] Create Axiom account and dataset
  - [ ] Install Axiom SDK
  - [ ] Configure structured logging
  - [ ] Add logging to API layer

- [ ] Set up PostHog (analytics)
  - [ ] Create PostHog project
  - [ ] Install PostHog SDK
  - [ ] Configure event tracking
  - [ ] Set up feature flags (optional)

- [ ] Set up Better Stack (uptime)
  - [ ] Create Better Stack account
  - [ ] Configure uptime monitors
  - [ ] Set up status page (optional)
  - [ ] Configure alerting

- [ ] Create CI/CD pipelines
  - [ ] Create `.github/workflows/ci.yml`
    - [ ] Lint job
    - [ ] Type-check job
    - [ ] Unit test job
    - [ ] Build job
    - [ ] E2E test job
  - [ ] Create `.github/workflows/deploy.yml`
    - [ ] Database migration job
    - [ ] Trigger Vercel deployment
    - [ ] Mobile OTA update job

- [ ] Configure GitHub repository
  - [ ] Add required secrets
  - [ ] Set up branch protection rules
  - [ ] Configure required status checks

- [ ] Configure Vercel
  - [ ] Connect repository
  - [ ] Configure build settings for monorepo
  - [ ] Add environment variables
  - [ ] Enable preview deployments

- [ ] Validate setup
  - [ ] CI passes on PR
  - [ ] Deploy pipeline runs on merge to main
  - [ ] Errors appear in Sentry
  - [ ] Logs appear in Axiom

---

## Phase 8: Development Polish

**Goal:** Finalize development experience with scripts, testing, and documentation.

### Checklist

- [ ] Create development scripts (root `package.json`)
  - [ ] `dev` - Start all apps and services
  - [ ] `build` - Build all packages
  - [ ] `lint` - Lint all code
  - [ ] `format` - Format all code
  - [ ] `type-check` - TypeScript validation
  - [ ] `test` - Run all unit tests
  - [ ] `test:e2e` - Run E2E tests
  - [ ] `clean` - Remove build artifacts

- [ ] Set up Vitest (unit testing)
  - [ ] Configure Vitest in packages
  - [ ] Create test utilities
  - [ ] Write initial tests for API routers
  - [ ] Configure coverage reporting

- [ ] Set up Playwright (E2E testing)
  - [ ] Initialize `packages/e2e`
  - [ ] Configure Playwright
  - [ ] Create test fixtures
  - [ ] Write smoke tests for critical flows

- [ ] Initialize `packages/constants`
  - [ ] Shared enums (session status, payment status, etc.)
  - [ ] Shared validation schemas (Zod)
  - [ ] Type definitions

- [ ] Create comprehensive `.env.example`
  - [ ] All required variables documented
  - [ ] Comments explaining each variable
  - [ ] Default values where appropriate

- [ ] Finalize documentation
  - [ ] Update `README.md` with full setup guide
  - [ ] Document common development tasks
  - [ ] Document deployment process
  - [ ] Add troubleshooting section

- [ ] Final validation
  - [ ] Fresh clone → `pnpm install` → `pnpm dev` works
  - [ ] All tests pass
  - [ ] Build completes without warnings
  - [ ] Documentation is accurate

---

## Phase Dependencies

```
Phase 1 (Foundation)
    │
    ▼
Phase 2 (Database)
    │
    ▼
Phase 3 (API)
    │
    ├──────────────────┐
    ▼                  ▼
Phase 4 (Web)    Phase 5 (Mobile)
    │                  │
    └──────────┬───────┘
               ▼
        Phase 6 (Services)
               │
               ▼
        Phase 7 (DevOps)
               │
               ▼
        Phase 8 (Polish)
```

---

## Notes

- **Phases 4 and 5** can be done in parallel once Phase 3 is complete
- Each phase should be validated before moving to the next
- Commit frequently with descriptive messages
- Create feature branches for each phase
- Don't skip validation steps—they catch issues early

---

## Quick Reference: Key Technologies by Phase

| Phase | Key Technologies |
|-------|-----------------|
| 1 | pnpm, Turborepo, TypeScript, ESLint, Prettier |
| 2 | Supabase, Drizzle ORM, PostgreSQL |
| 3 | tRPC, Zod |
| 4 | Next.js 16, Tailwind CSS, shadcn/ui, next-intl |
| 5 | Expo SDK 54, Expo Router, React Native Reusables, i18next |
| 6 | Supabase Auth, Lemon Squeezy, Resend, React Email, Inngest |
| 7 | Sentry, Axiom, PostHog, Better Stack, GitHub Actions |
| 8 | Vitest, Playwright |
