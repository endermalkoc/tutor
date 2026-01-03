# Monorepo Structure Design

**Date:** 2026-01-03
**Status:** Approved
**Author:** Design Session (Brainstorming)

---

## Overview

This document outlines the complete monorepo structure for our tutor management SaaS platform, similar to TutorBird. The platform will consist of a marketing site, web application, and mobile app, all sharing common packages for maximum code reuse and type safety.

---

## Technology Decisions

### Monorepo Management
- **Turborepo**: Build orchestration with smart caching
- **pnpm workspaces**: Package management and dependency resolution

### Applications
1. **Marketing App** (Next.js): Landing page and marketing content
2. **Web App** (Next.js): Main application for desktop users
3. **Mobile App** (Expo): iOS and Android native applications

### Shared Packages
1. **api**: tRPC routers - shared backend logic
2. **database**: Drizzle ORM schemas and migrations
3. **email**: React Email templates for transactional emails
4. **constants**: Shared constants, enums, and validation schemas
5. **config**: Shared TypeScript, ESLint, and Tailwind configurations

### Testing Strategy
- **Unit Tests**: Vitest across all packages and apps
- **E2E Tests**: Playwright in both shared package and app-specific folders
  - `packages/e2e`: Cross-app workflows (auth, booking, payments)
  - `apps/*/e2e`: App-specific test scenarios

---

## Complete Folder Structure

```
tutor/
├── apps/
│   ├── marketing/              # Next.js - Landing & marketing site
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── [locale]/   # i18n locale routing
│   │   │   │       ├── page.tsx    # Landing page
│   │   │   │       ├── pricing/
│   │   │   │       ├── about/
│   │   │   │       ├── blog/
│   │   │   │       │   ├── page.tsx        # Blog index
│   │   │   │       │   └── [slug]/page.tsx # Blog post
│   │   │   │       └── layout.tsx
│   │   │   ├── components/     # Marketing-specific components
│   │   │   ├── lib/
│   │   │   │   └── blog.ts     # MDX blog utilities
│   │   │   ├── messages/       # i18n translations
│   │   │   │   ├── en.json
│   │   │   │   └── es.json
│   │   │   ├── i18n.ts         # next-intl configuration
│   │   │   └── styles/
│   │   ├── content/
│   │   │   └── blog/           # MDX blog posts
│   │   │       ├── 2024-01-15-welcome.mdx
│   │   │       └── ...
│   │   ├── public/             # Static assets
│   │   ├── e2e/                # Marketing-specific E2E tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   ├── middleware.ts       # i18n middleware
│   │   └── playwright.config.ts
│   │
│   ├── web/                    # Next.js - Main web application
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── [locale]/   # i18n locale routing
│   │   │   │       ├── (auth)/     # Auth routes (login, signup)
│   │   │   │       ├── (dashboard)/    # Protected routes
│   │   │   │       │   ├── students/
│   │   │   │       │   ├── tutors/
│   │   │   │       │   ├── sessions/
│   │   │   │       │   ├── payments/
│   │   │   │       │   └── settings/
│   │   │   │       └── layout.tsx
│   │   │   ├── components/     # Web-specific components
│   │   │   ├── lib/            # Utilities, tRPC client setup
│   │   │   │   └── analytics.ts # PostHog setup
│   │   │   ├── messages/       # i18n translations
│   │   │   │   ├── en.json
│   │   │   │   └── es.json
│   │   │   ├── i18n.ts         # next-intl configuration
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── e2e/                # Web-specific E2E tests
│   │   ├── __tests__/          # Unit tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   ├── middleware.ts       # i18n + auth middleware
│   │   ├── playwright.config.ts
│   │   └── vitest.config.ts
│   │
│   └── mobile/                 # Expo - iOS & Android
│       ├── src/
│       │   ├── app/            # Expo Router
│       │   │   ├── (tabs)/     # Bottom tab navigation
│       │   │   │   ├── index.tsx
│       │   │   │   ├── sessions.tsx
│       │   │   │   ├── students.tsx
│       │   │   │   └── profile.tsx
│       │   │   ├── (auth)/     # Auth screens
│       │   │   │   ├── login.tsx
│       │   │   │   └── signup.tsx
│       │   │   └── _layout.tsx
│       │   ├── components/     # Mobile-specific components
│       │   ├── i18n/           # i18next configuration
│       │   │   ├── index.ts
│       │   │   └── locales/
│       │   │       ├── en.json
│       │   │       └── es.json
│       │   └── lib/            # Mobile utilities, tRPC client
│       ├── assets/             # Images, fonts, icons
│       ├── __tests__/          # Unit tests
│       ├── app.json            # Expo configuration
│       ├── eas.json            # EAS Build configuration
│       ├── package.json
│       ├── tsconfig.json
│       └── vitest.config.ts
│
├── packages/
│   ├── api/                    # tRPC API layer
│   │   ├── src/
│   │   │   ├── routers/
│   │   │   │   ├── tutors.ts
│   │   │   │   ├── students.ts
│   │   │   │   ├── sessions.ts
│   │   │   │   ├── payments.ts
│   │   │   │   ├── auth.ts
│   │   │   │   └── index.ts    # Combined app router
│   │   │   ├── inngest/        # Background jobs
│   │   │   │   ├── client.ts   # Inngest client
│   │   │   │   └── functions/
│   │   │   │       ├── session-reminders.ts
│   │   │   │       ├── email-notifications.ts
│   │   │   │       └── index.ts
│   │   │   ├── lib/
│   │   │   │   └── logger.ts   # Axiom logger
│   │   │   ├── trpc.ts         # tRPC initialization
│   │   │   ├── context.ts      # Request context (auth, db)
│   │   │   └── index.ts
│   │   ├── __tests__/          # API unit tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   │
│   ├── database/               # Drizzle ORM & schemas
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── tutors.ts
│   │   │   │   ├── students.ts
│   │   │   │   ├── sessions.ts
│   │   │   │   ├── payments.ts
│   │   │   │   ├── users.ts
│   │   │   │   ├── organizations.ts
│   │   │   │   └── index.ts
│   │   │   ├── migrations/     # Drizzle migration files
│   │   │   ├── client.ts       # Supabase client setup
│   │   │   ├── migrate.ts      # Migration runner
│   │   │   ├── seed.ts         # Development seed data
│   │   │   └── index.ts
│   │   ├── __tests__/          # Schema tests
│   │   ├── drizzle.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   │
│   ├── email/                  # React Email templates
│   │   ├── src/
│   │   │   ├── templates/
│   │   │   │   ├── booking-confirmation.tsx
│   │   │   │   ├── session-reminder.tsx
│   │   │   │   ├── cancellation.tsx
│   │   │   │   ├── welcome.tsx
│   │   │   │   └── password-reset.tsx
│   │   │   ├── components/     # Reusable email components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   └── footer.tsx
│   │   │   └── index.ts
│   │   ├── __tests__/          # Email template tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   │
│   ├── constants/              # Shared constants & enums
│   │   ├── src/
│   │   │   ├── roles.ts        # User roles enum
│   │   │   ├── sessions.ts     # Session duration constants
│   │   │   ├── payments.ts     # Payment status enums
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                 # Shared configurations
│   │   ├── eslint/
│   │   │   ├── next.js         # ESLint for Next.js
│   │   │   ├── expo.js         # ESLint for Expo
│   │   │   └── base.js         # Base ESLint config
│   │   ├── typescript/
│   │   │   ├── base.json       # Base tsconfig
│   │   │   ├── nextjs.json     # Next.js tsconfig
│   │   │   └── expo.json       # Expo tsconfig
│   │   ├── tailwind/
│   │   │   └── base.js         # Base Tailwind preset
│   │   └── package.json
│   │
│   └── e2e/                    # Shared E2E tests
│       ├── tests/
│       │   ├── auth-flow.spec.ts
│       │   ├── booking-session-flow.spec.ts
│       │   ├── payment-flow.spec.ts
│       │   └── tutor-student-matching.spec.ts
│       ├── fixtures/           # Test fixtures and helpers
│       ├── playwright.config.ts
│       └── package.json
│
├── docs/
│   ├── plans/                  # Design documents
│   │   └── 2026-01-03-monorepo-structure-design.md
│   ├── TECH_STACK.md          # Technology stack documentation
│   └── API.md                  # API documentation (future)
│
├── .github/
│   └── workflows/
│       ├── ci.yml              # Continuous integration
│       └── ...
│
├── turbo.json                  # Turborepo pipeline configuration
├── pnpm-workspace.yaml         # pnpm workspace definition
├── package.json                # Root package.json
├── .gitignore
├── .env.example                # Example environment variables
├── CLAUDE.md                   # AI assistant context
└── README.md                   # Project overview
```

---

## Shared API Architecture

Both web and mobile apps consume the same tRPC API from `packages/api`. This ensures:

1. **Type Safety**: End-to-end TypeScript types from database to client
2. **Code Reuse**: Business logic defined once, used everywhere
3. **Consistency**: Same data structures and validation across platforms

**Example Usage:**

```typescript
// packages/api/src/routers/tutors.ts
export const tutorsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(tutors);
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), ... }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(tutors).values(input);
    })
});

// Both apps/web and apps/mobile use identically:
import { api } from '@repo/api';
const tutors = await api.tutors.getAll();
```

**API Deployment:**
- Deployed as Vercel Serverless Functions (Node.js runtime, NOT Edge Functions)
- Both web and mobile apps call the same endpoints
- Environment-specific base URLs via environment variables
- Full Node.js API support required for tRPC, Drizzle ORM, and Inngest

---

## Root Configuration Files

### turbo.json

Defines the build pipeline and task dependencies:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".expo/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test:e2e": {
      "dependsOn": ["build"],
      "cache": false
    },
    "lint": {
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "cache": true
    }
  }
}
```

### pnpm-workspace.yaml

Defines workspace packages:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Root package.json

Workspace-level scripts and dependencies:

```json
{
  "name": "tutor-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "lint": "turbo lint",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,md,json}\"",
    "type-check": "turbo type-check",
    "clean": "turbo clean && rm -rf node_modules",
    "db:generate": "pnpm --filter @repo/database db:generate",
    "db:migrate": "pnpm --filter @repo/database db:migrate",
    "db:studio": "pnpm --filter @repo/database db:studio",
    "db:seed": "pnpm --filter @repo/database db:seed",
    "inngest:dev": "npx inngest-cli@latest dev"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.0",
    "prettier": "^3.2.0"
  },
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=24.x",
    "pnpm": ">=10.x"
  }
}
```

---

## CLAUDE.md Content

The CLAUDE.md file provides AI assistants with essential project context:

```markdown
# Tutor Management SaaS Platform

## Project Overview

A comprehensive tutor management platform enabling tutoring businesses to manage:
- Student enrollment and profiles
- Tutor onboarding and scheduling
- Session booking and tracking
- Payments and subscriptions
- Analytics and reporting

Similar to [TutorBird](https://www.tutorbird.com/), supporting both individual tutors
and multi-tutor businesses.

---

## Architecture

**Monorepo Structure:**
- Build System: Turborepo
- Package Manager: pnpm workspaces
- Version Control: Git

**Applications:**
1. `apps/marketing` - Next.js marketing site (landing, pricing, blog)
2. `apps/web` - Next.js web application (main platform)
3. `apps/mobile` - Expo mobile app (iOS & Android)

**Shared Packages:**
1. `packages/api` - tRPC routers (shared backend logic)
2. `packages/database` - Drizzle ORM schemas & migrations
3. `packages/email` - React Email templates
4. `packages/constants` - Shared enums & constants
5. `packages/config` - Shared configs (TS, ESLint, Tailwind)
6. `packages/e2e` - Shared Playwright E2E tests

---

## Technology Stack

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for complete details.

**Key Technologies:**
- Frontend: React 19, Next.js 16, Expo SDK 54+, Tailwind CSS, shadcn/ui
- Backend: tRPC (Vercel Serverless Functions), Supabase (PostgreSQL), Drizzle ORM
- Auth: Supabase Auth with Row Level Security
- Payments: Lemon Squeezy
- Email: Resend + React Email
- Storage: Supabase Storage
- Mobile Infrastructure: Expo Notifications, FCM, AsyncStorage, EAS Build/Update
- Deployment: Vercel (web), EAS (mobile)
- Testing: Vitest (unit), Playwright (E2E)
- Monitoring: Sentry

---

## Development Workflow

### Setup
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
pnpm --filter @repo/database db:migrate

# Start all apps in development
pnpm dev
```

### Common Commands
```bash
pnpm dev                 # Start all apps in dev mode
pnpm build               # Build all apps and packages
pnpm test                # Run all unit tests
pnpm test:e2e            # Run E2E tests
pnpm lint                # Lint all packages
pnpm type-check          # TypeScript type checking
```

### App-Specific Development
```bash
pnpm --filter marketing dev    # Marketing site only
pnpm --filter web dev          # Web app only
pnpm --filter mobile dev       # Mobile app only
```

---

## Key Patterns & Conventions

### Type Safety
- **tRPC**: End-to-end type safety from database to client
- All API calls are fully typed without code generation
- Zod schemas for runtime validation

### Authentication
- Supabase Auth for user management
- Row Level Security (RLS) on database tables
- JWT tokens passed via tRPC context

### Database
- Drizzle ORM for type-safe queries
- Schema defined in `packages/database/src/schema/`
- Migrations managed via `drizzle-kit`

### UI Components
- shadcn/ui components live in each app (no shared UI package)
- Each app manages its own component library
- Web apps use shadcn/ui directly
- Mobile uses React Native Reusables
- Tailwind CSS for web styling

### Code Sharing
- Business logic in `packages/api` (tRPC routers)
- Email templates in `packages/email`
- Constants & enums in `packages/constants`
- Database schema in `packages/database`
- Import via workspace protocol: `@repo/api`, `@repo/email`, `@repo/constants`, etc.

---

## Project Structure Philosophy

### Apps vs Packages
- **Apps**: Deployable applications with their own entry points
- **Packages**: Shared code consumed by apps

### When to Create a Package
- Code used by 2+ apps (API, database, email templates)
- Logical separation of concerns (API, DB, constants)
- Shared configurations
- Business logic that needs to be consistent across platforms

### When to Keep Code in App
- App-specific components (including UI components)
- One-off features or pages
- App-specific routing
- Platform-specific implementations

---

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# Sentry
SENTRY_DSN=

# App URLs
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_URL=
```

---

## Testing Strategy

### Unit Tests (Vitest)
- All packages have `__tests__/` folders
- Run with `pnpm test`
- Fast, isolated tests for business logic

### E2E Tests (Playwright)
- **Shared** (`packages/e2e`): Cross-app user flows
- **App-specific** (`apps/*/e2e`): App-specific scenarios
- Run with `pnpm test:e2e`

### Test Coverage Goals
- API routers: 80%+ coverage
- Email templates: 70%+ coverage
- Critical user flows: 100% E2E coverage

---

## Deployment

### Web Apps (Vercel)
- `apps/marketing`: Auto-deployed from `main` branch
- `apps/web`: Auto-deployed from `main` branch
- Preview deployments for all PRs

### Mobile App (EAS)
- iOS: TestFlight → App Store
- Android: Internal testing → Google Play
- OTA updates for minor changes

---

## Git Workflow

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- Pull requests required for all merges
- GitHub Actions for CI/CD

---

## Support & Resources

- **Documentation**: `/docs` folder
- **Tech Stack**: `docs/TECH_STACK.md`
- **Design Docs**: `docs/plans/`
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
```

---

## Mobile Infrastructure Architecture

### Push Notifications

**Technology Stack:**
- **Expo Notifications**: Cross-platform notification API
- **Firebase Cloud Messaging (FCM)**: Notification delivery service
- **Supabase Edge Functions**: Trigger notifications on database events

**Use Cases:**
- Session reminders (15min, 1hr, 24hr before)
- New booking requests
- Tutor/student messages
- Payment confirmations
- Schedule changes

**Implementation:**
```typescript
// packages/api/src/routers/notifications.ts
export const notificationsRouter = router({
  sendSessionReminder: protectedProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Send via Expo Push Notifications
      await sendPushNotification({
        to: userPushToken,
        title: "Session in 1 hour",
        body: "Your session with [Tutor Name] starts soon"
      });
    })
});
```

### Offline Support

**Strategy: AsyncStorage + React Query Persistence**

```typescript
// apps/mobile/src/lib/trpc.ts
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Persist queries for offline access
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

**Offline-First Features:**
- View upcoming sessions (cached)
- View student/tutor profiles (cached)
- Draft session notes (local storage, sync on reconnect)
- View payment history (cached)

### Calendar Integration

**Implementation:**
```typescript
// apps/mobile/src/lib/calendar.ts
import * as Calendar from 'expo-calendar';

export async function addSessionToCalendar(session: Session) {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    await Calendar.createEventAsync(defaultCalendarId, {
      title: `Session with ${session.tutor.name}`,
      startDate: session.startTime,
      endDate: session.endTime,
      location: session.location,
      notes: session.notes,
    });
  }
}
```

### Mobile Payments

**Flow:**
1. User taps "Subscribe" or "Buy Credits" in mobile app
2. App opens Lemon Squeezy checkout in in-app browser
3. User completes payment
4. Lemon Squeezy redirects back to app via deep link
5. App refreshes user subscription status via tRPC

**Deep Linking:**
```typescript
// apps/mobile/app.json
{
  "expo": {
    "scheme": "tutorapp",
    "ios": {
      "associatedDomains": ["applinks:tutorapp.com"]
    },
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": { "scheme": "tutorapp" }
        }
      ]
    }
  }
}
```

### EAS Build & Update Strategy

**Build Profiles:**
```json
// apps/mobile/eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json"
      }
    }
  }
}
```

**Update Strategy:**
- **OTA Updates**: JavaScript-only changes deployed instantly
- **Native Builds**: Required for native module changes
- **Automatic Updates**: Download in background, apply on next launch
- **Rollback**: Instantly revert bad updates via EAS dashboard

---

## Database Migration Strategy

### Automated CI/CD Workflow

**Development Process:**
1. Modify schema in `packages/database/src/schema/`
2. Generate migration: `pnpm --filter @repo/database db:generate`
3. Review SQL in `packages/database/src/migrations/[timestamp]_[name].sql`
4. Apply locally: `pnpm --filter @repo/database db:migrate`
5. Test changes locally
6. Commit migration file to git

**CI/CD Process (GitHub Actions):**
```yaml
# .github/workflows/deploy.yml
jobs:
  migrate-staging:
    runs-on: ubuntu-latest
    steps:
      - name: Run migrations on staging
        run: pnpm --filter @repo/database db:migrate
        env:
          SUPABASE_URL: ${{ secrets.STAGING_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.STAGING_SERVICE_KEY }}

      - name: Run integration tests
        run: pnpm test:integration

  migrate-production:
    needs: migrate-staging
    runs-on: ubuntu-latest
    steps:
      - name: Run migrations on production
        run: pnpm --filter @repo/database db:migrate
        env:
          SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.PROD_SERVICE_KEY }}
```

### Migration Commands

```json
// packages/database/package.json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "tsx src/migrate.ts",
    "db:push": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

### Rollback Strategy

**Manual Rollback:**
```sql
-- Via Supabase SQL Editor
-- 1. Identify migration to rollback
SELECT * FROM __drizzle_migrations ORDER BY created_at DESC;

-- 2. Manually reverse the changes (write reverse SQL)
-- 3. Delete migration record
DELETE FROM __drizzle_migrations WHERE id = [migration_id];
```

**Best Practices:**
- Always test migrations on staging first
- Keep migrations small and focused
- Write reversible migrations when possible
- Document breaking changes in migration file comments
- Backup database before major schema changes

---

## Environment Management Strategy

### Local Development

**File Structure:**
```bash
tutor/
├── .env.example          # Template (committed)
├── .env.local            # Local overrides (gitignored)
├── .env.test             # Test environment (committed)
├── apps/
│   ├── web/
│   │   └── .env.local    # Web-specific overrides (gitignored)
│   └── mobile/
│       └── .env.local    # Mobile-specific overrides (gitignored)
└── packages/
    └── database/
        └── .env.local    # Database-specific overrides (gitignored)
```

**Root .env.example:**
```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Resend
RESEND_API_KEY=your_resend_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Observability
SENTRY_DSN=your_sentry_dsn
AXIOM_TOKEN=your_axiom_token
AXIOM_DATASET=app-logs
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
BETTERSTACK_API_KEY=your_betterstack_key

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/trpc

# Mobile (Expo)
EXPO_PUBLIC_API_URL=http://localhost:3000/api/trpc
```

### Turborepo Environment Configuration

**turbo.json:**
```json
{
  "globalEnv": [
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY"
  ],
  "pipeline": {
    "build": {
      "env": [
        "NEXT_PUBLIC_*",
        "EXPO_PUBLIC_*"
      ]
    }
  }
}
```

### Production Secrets Management

| Environment | Platform | Method |
|-------------|----------|--------|
| **Web (Next.js)** | Vercel | Environment Variables in project settings |
| **Mobile** | EAS | EAS Secrets (`eas secret:create`) |
| **Database** | Supabase | Dashboard settings (auto-provided) |
| **CI/CD** | GitHub | Repository secrets |

**Vercel Setup:**
```bash
# Set via Vercel dashboard or CLI
vercel env add SUPABASE_URL production
vercel env add LEMON_SQUEEZY_API_KEY production
```

**EAS Secrets:**
```bash
# Set via EAS CLI
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.tutorapp.com/trpc
```

### Environment-Specific Behavior

```typescript
// packages/api/src/config.ts
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  rateLimit: {
    enabled: isProduction,
    maxRequests: isDevelopment ? 1000 : 100,
    windowMs: 60 * 1000, // 1 minute
  },
};
```

---

## CI/CD Pipeline Architecture

### GitHub Actions Workflows

**Pull Request Workflow** (`.github/workflows/ci.yml`):
```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo lint
      - run: pnpm turbo format:check

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo type-check

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo test
        env:
          SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.TEST_SUPABASE_ANON_KEY }}

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm turbo build

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps
      - run: pnpm turbo test:e2e
        env:
          PLAYWRIGHT_TEST_BASE_URL: http://localhost:3000
```

**Production Deployment Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  migrate-database:
    name: Migrate Database
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - name: Run migrations on production
        run: pnpm --filter @repo/database db:migrate
        env:
          SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.PROD_SERVICE_KEY }}

  deploy-web:
    name: Deploy Web Apps
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deployment
        run: echo "Vercel auto-deploys on push to main"
      # Vercel GitHub integration handles deployment automatically

  deploy-mobile:
    name: Update Mobile App
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: pnpm install --frozen-lockfile
      - name: Publish EAS Update
        run: cd apps/mobile && eas update --auto --non-interactive
```

### Vercel Integration

**Configuration:**
- **Framework Preset**: Next.js
- **Build Command**: `cd ../.. && pnpm turbo build --filter=web...`
- **Output Directory**: `apps/web/.next`
- **Install Command**: `pnpm install --frozen-lockfile`

**Environment Variables:**
- Synced from Vercel dashboard
- Separate configs for Preview and Production
- Auto-injected into build process

### EAS Integration

**Update Workflow:**
```bash
# Manual OTA update
eas update --branch production --message "Fix session booking bug"

# Automated via GitHub Actions (on merge to main)
eas update --auto --non-interactive
```

**Build Workflow:**
```bash
# Preview build (for testing)
eas build --platform all --profile preview

# Production build (for app stores)
eas build --platform all --profile production
eas submit --platform all
```

---

## Security Architecture

### API Layer Security

**Authentication & Authorization:**
```typescript
// packages/api/src/context.ts
import { createSupabaseClient } from '@repo/database';

export const createContext = async ({ req, res }) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');

  const supabase = createSupabaseClient();

  if (token) {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      return {
        user,
        db: drizzle(supabase),
        supabase,
      };
    }
  }

  return {
    user: null,
    db: drizzle(supabase),
    supabase,
  };
};

// Protected procedure
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      db: ctx.db,
      supabase: ctx.supabase,
    },
  });
});
```

**Input Validation:**
```typescript
// packages/api/src/routers/sessions.ts
import { z } from 'zod';

export const sessionsRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        tutorId: z.string().uuid(),
        studentId: z.string().uuid(),
        startTime: z.date().min(new Date(), 'Session must be in the future'),
        duration: z.number().min(15).max(480), // 15min - 8hrs
        notes: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Input automatically validated by Zod
      return ctx.db.insert(sessions).values({
        ...input,
        createdBy: ctx.user.id,
      });
    }),
});
```

### Database Security (Row Level Security)

**Supabase RLS Policies:**
```sql
-- Users can only view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Tutors can view all their sessions
CREATE POLICY "Tutors can view their sessions"
  ON sessions FOR SELECT
  USING (
    auth.uid() = tutor_id OR
    auth.uid() = student_id
  );

-- Only tutors can create sessions
CREATE POLICY "Only tutors can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tutors
      WHERE tutors.user_id = auth.uid()
      AND tutors.id = sessions.tutor_id
    )
  );

-- Payments are read-only for users
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);
```

### CORS Configuration

```typescript
// apps/web/next.config.js
const getAllowedOrigins = () => {
  if (process.env.NODE_ENV === 'development') {
    return [
      'http://localhost:3000',      // Web app
      'http://localhost:3001',      // Marketing site
      /^exp:\/\/.*$/,               // Expo development (matches exp://192.168.x.x:xxxx)
    ];
  }
  return process.env.ALLOWED_ORIGINS?.split(',') || ['https://tutorapp.com'];
};

module.exports = {
  async headers() {
    const allowedOrigins = getAllowedOrigins();

    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: allowedOrigins.join(',') },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ];
  },
};
```

### Middleware Execution Order

Next.js middleware executes in a specific order. Here's how to chain multiple middleware functions:

```typescript
// apps/web/lib/middleware-chain.ts
import { NextResponse } from 'next/server';
import type { NextRequest, NextMiddleware } from 'next/server';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export function chain(
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}
```

```typescript
// apps/web/middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { chain } from '@/lib/middleware-chain';

// 1. Internationalization middleware (must run first for locale detection)
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: true,
});

// 2. Authentication middleware
const authMiddleware = (next: NextMiddleware) => {
  return async (request: NextRequest) => {
    const token = request.cookies.get('auth-token');

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return next(request);
  };
};

// Chain middleware in order: i18n → auth
export default chain([
  (next) => (req) => intlMiddleware(req),
  authMiddleware,
]);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

**Execution Flow:**
1. **i18n Middleware**: Detects and sets locale, rewrites URLs with locale prefix
2. **Auth Middleware**: Checks authentication, redirects unauthorized users

**For Marketing App** (no auth needed):
```typescript
// apps/marketing/middleware.ts
import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### Mobile Security

**Secure Storage:**
```typescript
// apps/mobile/src/lib/auth.ts
import * as SecureStore from 'expo-secure-store';

export async function storeAuthToken(token: string) {
  await SecureStore.setItemAsync('auth_token', token, {
    keychainAccessible: SecureStore.WHEN_UNLOCKED,
  });
}

export async function getAuthToken() {
  return await SecureStore.getItemAsync('auth_token');
}
```

**Biometric Authentication:**
```typescript
import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateWithBiometrics() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access sensitive data',
      fallbackLabel: 'Use passcode',
    });

    return result.success;
  }

  return false;
}
```

### Payment Security

**Webhook Signature Verification:**
```typescript
// apps/web/app/api/webhooks/lemon-squeezy/route.ts
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('x-signature');

  const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!);
  const digest = hmac.update(body).digest('hex');

  if (signature !== digest) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Process webhook
  const event = JSON.parse(body);
  // ...
}
```

### Monitoring & Incident Response

**Sentry Configuration:**
```typescript
// apps/web/sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Scrub sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.['Authorization'];
    }
    return event;
  },
});
```

**Failed Login Monitoring:**
```typescript
// packages/api/src/routers/auth.ts
export const authRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.supabase.auth.signInWithPassword(input);

      if (result.error) {
        // Log failed attempt
        await ctx.db.insert(authLogs).values({
          email: input.email,
          action: 'login_failed',
          ipAddress: ctx.req.ip,
          timestamp: new Date(),
        });

        // Check for brute force (5 failed attempts in 5 minutes)
        const recentFailures = await ctx.db.query.authLogs.findMany({
          where: and(
            eq(authLogs.email, input.email),
            gte(authLogs.timestamp, new Date(Date.now() - 5 * 60 * 1000))
          ),
        });

        if (recentFailures.length >= 5) {
          // Trigger alert
          await sendSecurityAlert({
            type: 'brute_force',
            email: input.email,
            count: recentFailures.length,
          });
        }
      }

      return result;
    }),
});
```

---

## Architecture Decisions

### Single-Tenant Architecture (v1)

**Decision**: Launch as single-tenant platform serving one tutoring business.

**Rationale:**
- **Faster Time to Market**: No multi-tenancy complexity (org routing, data isolation)
- **Simpler Development**: Straightforward RLS policies and data queries
- **Lower Initial Costs**: Reduced infrastructure and testing overhead
- **Product Validation**: Easier to validate product-market fit with one customer
- **Team Focus**: Concentrate on core features rather than tenant management

**Database Design Consideration:**
Even in v1, include `organization_id` column with default value to enable future multi-tenancy upgrade:

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001' REFERENCES organizations(id),
  tutor_id UUID NOT NULL REFERENCES tutors(id),
  student_id UUID NOT NULL REFERENCES students(id),
  -- ... other columns
);
```

**Seed Data Must Include Default Organization:**

```typescript
// packages/database/src/seed.ts
import { db } from './client';
import { organizations, tutors, students, sessions } from './schema';

const DEFAULT_ORG_ID = '00000000-0000-0000-0000-000000000001';

async function seed() {
  // 1. Create default organization FIRST
  await db.insert(organizations).values({
    id: DEFAULT_ORG_ID,
    name: 'Default Organization',
  });

  // 2. Then create all other data
  await db.insert(tutors).values([
    { organizationId: DEFAULT_ORG_ID, name: 'John Doe', /* ... */ },
    // ...
  ]);

  await db.insert(students).values([
    { organizationId: DEFAULT_ORG_ID, name: 'Jane Smith', /* ... */ },
    // ...
  ]);

  await db.insert(sessions).values([
    { organizationId: DEFAULT_ORG_ID, tutorId: '...', /* ... */ },
    // ...
  ]);
}

seed().catch(console.error);
```

**Future Multi-Tenant Migration Path:**
When expanding to serve multiple organizations:

1. **Schema Changes**:
   - Remove default constraint from `organization_id`
   - Add `organizations` table with settings
   - Add user-to-organization membership table

2. **RLS Policy Updates**:
   ```sql
   -- Example: Update session policy
   CREATE POLICY "Users can only view their org's sessions"
     ON sessions FOR SELECT
     USING (
       organization_id IN (
         SELECT organization_id
         FROM user_organizations
         WHERE user_id = auth.uid()
       )
     );
   ```

3. **Routing**:
   - Implement subdomain routing (`acme.tutorapp.com`)
   - Add organization detection middleware
   - Update tRPC context with organization ID

4. **Data Migration**:
   - Migrate existing data to "default organization"
   - Zero-downtime migration using database triggers

**Estimated Migration Effort**: 2-3 weeks with proper preparation

---

## Search Implementation

### PostgreSQL Full-Text Search

**Use Cases:**
- Search tutors by name, subjects, bio, qualifications
- Search students by name, email, grade level
- Search sessions by notes, subject, location

**Implementation in Schema:**

```typescript
// packages/database/src/schema/tutors.ts
import { pgTable, uuid, text, tsvector, index } from 'drizzle-orm/pg-core';

export const tutors = pgTable('tutors', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizationId: uuid('organization_id').notNull().default('default-org-uuid'),
  name: text('name').notNull(),
  bio: text('bio'),
  subjects: text('subjects').array(),
  qualifications: text('qualifications'),
  // Auto-updated search vector
  searchVector: tsvector('search_vector'),
}, (table) => ({
  searchIdx: index('tutors_search_idx').using('gin', table.searchVector),
}));
```

**Database Triggers:**

```sql
-- Auto-update search vector on insert/update
CREATE OR REPLACE FUNCTION tutors_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.subjects::text,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.bio,'')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.qualifications,'')), 'D');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tutors_search_update
  BEFORE INSERT OR UPDATE ON tutors
  FOR EACH ROW
  EXECUTE FUNCTION tutors_search_trigger();
```

**tRPC Search Endpoint:**

```typescript
// packages/api/src/routers/tutors.ts
import { z } from 'zod';
import { sql } from 'drizzle-orm';

export const tutorsRouter = router({
  search: publicProcedure
    .input(z.object({
      query: z.string().min(2).max(100),
      limit: z.number().min(1).max(50).default(20)
    }))
    .query(async ({ ctx, input }) => {
      const searchQuery = input.query.trim();

      return ctx.db
        .select({
          id: tutors.id,
          name: tutors.name,
          bio: tutors.bio,
          subjects: tutors.subjects,
          // Relevance rank
          rank: sql<number>`ts_rank(search_vector, plainto_tsquery('english', ${searchQuery}))`,
        })
        .from(tutors)
        .where(
          sql`search_vector @@ plainto_tsquery('english', ${searchQuery})`
        )
        .orderBy(sql`rank DESC`)
        .limit(input.limit);
    }),
});
```

**Future Enhancements:**
- Fuzzy matching using PostgreSQL `pg_trgm` extension
- Configurable search weights per field
- Search analytics tracking via PostHog
- Consider upgrading to Meilisearch if search becomes critical feature

---

## Background Jobs with Inngest

### Use Cases

1. **Session Reminders**:
   - 24 hours before session
   - 1 hour before session
   - 15 minutes before session

2. **Email Notifications**:
   - New booking confirmations
   - Cancellation notifications
   - Weekly tutor/student summaries

3. **Webhook Processing**:
   - Lemon Squeezy payment webhooks (with retries)
   - External calendar sync

4. **Scheduled Tasks**:
   - Daily session cleanup (mark no-shows)
   - Weekly analytics report generation
   - Monthly invoice generation

### Implementation

**Inngest Client Setup:**

```typescript
// packages/api/src/inngest/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'tutor-app',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});

// Event types for type safety
export type Events = {
  'session/created': { sessionId: string };
  'session/cancelled': { sessionId: string; reason: string };
  'payment/succeeded': { paymentId: string; userId: string };
  'user/registered': { userId: string; email: string };
};
```

**Session Reminder Function:**

```typescript
// packages/api/src/inngest/functions/session-reminders.ts
import { inngest } from '../client';
import { db } from '@repo/database';
import { sessions } from '@repo/database/schema';
import { eq } from 'drizzle-orm';

export const sessionReminders = inngest.createFunction(
  {
    id: 'session-reminders',
    name: 'Send Session Reminders',
  },
  { event: 'session/created' },
  async ({ event, step }) => {
    const { sessionId } = event.data;

    // Fetch session details
    const session = await step.run('fetch-session', async () => {
      return db.query.sessions.findFirst({
        where: eq(sessions.id, sessionId),
        with: {
          tutor: true,
          student: true,
        },
      });
    });

    if (!session) return;

    // Schedule 24-hour reminder
    await step.sleepUntil('24h-before', new Date(session.startTime.getTime() - 24 * 60 * 60 * 1000));

    await step.run('send-24h-reminder', async () => {
      await sendPushNotification({
        userId: session.studentId,
        title: 'Session Tomorrow',
        body: `Your session with ${session.tutor.name} is tomorrow at ${formatTime(session.startTime)}`,
        data: { sessionId, type: 'reminder' },
      });
    });

    // Schedule 1-hour reminder
    await step.sleepUntil('1h-before', new Date(session.startTime.getTime() - 60 * 60 * 1000));

    await step.run('send-1h-reminder', async () => {
      await sendPushNotification({
        userId: session.studentId,
        title: 'Session in 1 Hour',
        body: `Your session with ${session.tutor.name} starts soon`,
        data: { sessionId, type: 'reminder' },
      });
    });
  }
);
```

**Inngest Webhook Endpoint:**

```typescript
// apps/web/app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest } from '@repo/api/inngest/client';
import { sessionReminders } from '@repo/api/inngest/functions/session-reminders';
import { emailNotifications } from '@repo/api/inngest/functions/email-notifications';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sessionReminders,
    emailNotifications,
    // ... other functions
  ],
});
```

**Triggering Jobs from tRPC:**

```typescript
// packages/api/src/routers/sessions.ts
export const sessionsRouter = router({
  create: protectedProcedure
    .input(createSessionSchema)
    .mutation(async ({ ctx, input }) => {
      // Create session
      const [session] = await ctx.db.insert(sessions).values(input).returning();

      // Trigger background job
      await inngest.send({
        name: 'session/created',
        data: { sessionId: session.id },
      });

      return session;
    }),
});
```

### Local Development

```bash
# Terminal 1: Start Inngest dev server
npx inngest-cli@latest dev

# Terminal 2: Start app
pnpm dev
```

Inngest Dev UI available at: http://localhost:8288

---

## Observability Implementation

### Structured Logging with Axiom

**Logger Setup:**

```typescript
// packages/api/src/lib/logger.ts
import { Axiom } from '@axiomhq/js';

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
  dataset: process.env.AXIOM_DATASET || 'app-logs',
});

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  userId?: string;
  organizationId?: string;
  requestId?: string;
  [key: string]: any;
}

export const logger = {
  info: (message: string, context?: LogContext) => {
    axiom.ingest('app-logs', [{
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...context,
    }]);
  },

  error: (message: string, error: Error, context?: LogContext) => {
    axiom.ingest('app-logs', [{
      level: 'error',
      message,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      timestamp: new Date().toISOString(),
      ...context,
    }]);
  },

  warn: (message: string, context?: LogContext) => {
    axiom.ingest('app-logs', [{
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...context,
    }]);
  },
};

// Flush logs on serverless function shutdown
process.on('beforeExit', async () => {
  await axiom.flush();
});
```

**Usage in tRPC Context:**

```typescript
// packages/api/src/context.ts
import { logger } from './lib/logger';

export const createContext = async ({ req, res }) => {
  const requestId = req.headers.get('x-request-id') || crypto.randomUUID();

  logger.info('API Request', {
    requestId,
    path: req.url,
    method: req.method,
    userAgent: req.headers.get('user-agent'),
  });

  return {
    requestId,
    db,
    user: null, // Set after auth
  };
};
```

### Product Analytics with PostHog

**Web Setup:**

```typescript
// apps/web/src/lib/analytics.ts
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    capture_pageviews: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-private]',
    },
  });
}

export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(event, properties);
    }
  },

  identify: (userId: string, traits?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, traits);
    }
  },

  reset: () => {
    if (typeof window !== 'undefined') {
      posthog.reset();
    }
  },
};
```

**Event Tracking:**

```typescript
// Track session booking
analytics.track('session_booked', {
  tutorId,
  studentId,
  duration: 60,
  subject: 'Math',
  source: 'web_app',
});

// Track user signup
analytics.identify(user.id, {
  email: user.email,
  role: 'student',
  plan: 'free',
});
```

### Uptime Monitoring with Better Stack

**Monitored Endpoints:**
- `GET /api/health` - API health check (30s interval)
- `GET /` - Web app homepage (60s interval)
- `GET /api/trpc/health` - tRPC-specific health (30s interval)

**Health Check Endpoint:**

```typescript
// apps/web/app/api/health/route.ts
import { db } from '@repo/database';

export async function GET() {
  try {
    // Check database
    await db.execute('SELECT 1');

    // Check Supabase
    const supabaseHealth = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`);

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        supabase: supabaseHealth.ok ? 'up' : 'down',
      },
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
    }, { status: 503 });
  }
}
```

---

## Internationalization (i18n) Implementation

### Web App (next-intl)

**Configuration:**

```typescript
// apps/web/src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
```

**Middleware:**

```typescript
// apps/web/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

**Translation Files:**

```json
// apps/web/src/messages/en.json
{
  "common": {
    "appName": "TutorApp",
    "loading": "Loading...",
    "error": "Something went wrong"
  },
  "booking": {
    "title": "Book a Session",
    "selectTutor": "Select a tutor",
    "selectDate": "Choose a date",
    "confirm": "Confirm Booking"
  }
}
```

```json
// apps/web/src/messages/es.json
{
  "common": {
    "appName": "TutorApp",
    "loading": "Cargando...",
    "error": "Algo salió mal"
  },
  "booking": {
    "title": "Reservar una Sesión",
    "selectTutor": "Selecciona un tutor",
    "selectDate": "Elige una fecha",
    "confirm": "Confirmar Reserva"
  }
}
```

### Mobile App (i18next)

**Configuration:**

```typescript
// apps/mobile/src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import es from './locales/es.json';

const LANGUAGE_STORAGE_KEY = 'app-language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: Localization.locale.split('-')[0],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Persist language preference
i18n.on('languageChanged', (lng) => {
  AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
```

---

## MDX Blog Implementation

### File Structure

```
apps/marketing/content/blog/
├── 2024-01-15-getting-started.mdx
├── 2024-02-10-tutor-best-practices.mdx
└── 2024-03-05-student-success-tips.mdx
```

### Blog Post Template

```mdx
---
title: "10 Best Practices for Online Tutoring"
description: "Proven strategies to maximize student engagement in virtual sessions"
author: "Jane Doe"
authorImage: "/authors/jane-doe.jpg"
publishedAt: "2024-01-15"
updatedAt: "2024-01-20"
image: "/blog/tutoring-best-practices.jpg"
tags: ["tutoring", "online-learning", "best-practices"]
featured: true
---

# 10 Best Practices for Online Tutoring

Online tutoring has transformed education, but success requires intentional strategies...

## 1. Test Technology Before Each Session

<Callout type="tip">
  Always test your screen share, microphone, and camera 10 minutes before the session starts.
</Callout>

## 2. Create an Engaging Environment

Use virtual backgrounds, props, and interactive tools to keep students engaged.

<VideoEmbed url="https://youtube.com/..." />

## 3. Set Clear Expectations

...
```

### Rendering Blog Posts

```typescript
// apps/marketing/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    author: string;
    publishedAt: string;
    image: string;
    tags: string[];
    featured?: boolean;
  };
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_PATH);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const fullPath = path.join(BLOG_PATH, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as BlogPost['frontmatter'],
        content,
      };
    })
    .sort((a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
```

```typescript
// apps/marketing/app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/blog';
import { Callout, VideoEmbed, CodeBlock } from '@/components/mdx';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.frontmatter.title}</h1>
      <p className="text-muted-foreground">{post.frontmatter.description}</p>

      <MDXRemote
        source={post.content}
        components={{
          Callout,
          VideoEmbed,
          CodeBlock,
        }}
      />
    </article>
  );
}
```

---

## Backup & Disaster Recovery

### Automated Database Backups

**Supabase Configuration:**
- **Frequency**: Daily at 02:00 UTC
- **Retention**:
  - Free: 7 days
  - Pro: 7 days (PITR available)
  - Team: 30 days
- **Type**: Full PostgreSQL dumps
- **Location**: Geo-redundant cloud storage

**Point-in-Time Recovery (PITR):**
- Available on Pro plan and above
- Restore to any point within retention period
- RTO (Recovery Time Objective): ~15 minutes
- RPO (Recovery Point Objective): Near-zero (continuous WAL archiving)

### Manual Backup Procedures

**Pre-Migration Backup:**

```bash
# Add to database package.json scripts
{
  "scripts": {
    "db:backup": "tsx src/backup.ts",
    "db:restore": "tsx src/restore.ts"
  }
}
```

```typescript
// packages/database/src/backup.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function backup() {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `backups/backup-${timestamp}.sql`;

  await fs.mkdir('backups', { recursive: true });

  const { stdout, stderr } = await execAsync(
    `pg_dump ${process.env.DATABASE_URL} > ${filename}`
  );

  console.log(`✅ Backup created: ${filename}`);
}

backup().catch(console.error);
```

### Disaster Recovery Runbook

**Scenario 1: Data Corruption Detected**

1. **Immediate Actions** (0-5 minutes):
   - Enable maintenance mode via Vercel environment variable
   - Stop all background jobs (pause Inngest)
   - Identify corruption timestamp via Axiom logs

2. **Assessment** (5-15 minutes):
   - Determine scope of corruption
   - Check if PITR can restore to pre-corruption state
   - Notify team via Slack #incidents

3. **Recovery** (15-30 minutes):
   - Use Supabase dashboard to initiate PITR restoration
   - Create temporary staging database for verification
   - Run integration test suite against restored data

4. **Verification** (30-45 minutes):
   - Compare critical records (users, sessions, payments)
   - Check data integrity via checksums
   - Run smoke tests on staging environment

5. **Restoration** (45-60 minutes):
   - Swap production database connection
   - Remove maintenance mode
   - Resume background jobs
   - Monitor error rates via Sentry

6. **Post-Mortem** (1-3 days):
   - Document root cause
   - Implement prevention measures
   - Update runbook with lessons learned

**Scenario 2: Supabase Outage**

1. **Detection**: Better Stack alerts team
2. **Immediate**: Display maintenance banner (cached static page)
3. **Communication**: Update status page, social media
4. **Monitoring**: Check https://status.supabase.com
5. **Recovery**: Automatic when Supabase resolves
6. **Verification**: Run health checks, notify users

### Backup Testing Schedule

**Quarterly Restore Test:**

```bash
# Q1 2024 Test
supabase db restore --db-url $STAGING_DB_URL backups/latest.sql
pnpm --filter @repo/database db:migrate
pnpm test:integration --env=staging
pnpm test:e2e --env=staging
```

**Annual Disaster Recovery Drill:**
- Full team participation
- Simulated data loss scenario
- Time-boxed recovery exercise
- Document findings and improvements

---

## Implementation Next Steps

1. **Create Folder Structure**: Generate all directories and initial files
2. **Initialize Packages**: Set up package.json files with dependencies
3. **Configure Turborepo**: Create turbo.json with pipeline
4. **Set Up TypeScript**: Configure tsconfig files across workspace
5. **Set Up Local Development**: Install Supabase CLI, configure Docker
6. **Initialize Database**: Create initial Drizzle schemas (including organizations table)
7. **Create Seed Data**: Develop seed script (MUST create default organization first)
8. **Set Up tRPC**: Create base router and context
9. **Configure Inngest**: Set up background job infrastructure
10. **Configure Observability**: Set up Axiom, PostHog, Sentry, Better Stack
11. **Set Up i18n**: Configure next-intl for both web and marketing apps, i18next for mobile
12. **Configure MDX**: Set up blog content structure and rendering
13. **Create Email Templates**: Set up React Email package with base templates
14. **Create Constants Package**: Set up shared enums and constants
15. **Configure Environment Variables**: Set up .env files and Turborepo config
16. **Install Dependencies**: Run `pnpm install`
17. **Set Up Security**: Implement RLS policies, CORS, middleware chain
18. **Configure CI/CD**: Create GitHub Actions workflows with format checking
19. **Set Up Mobile Infrastructure**: Configure Expo Notifications, EAS
20. **Configure Testing**: Set up Vitest and Playwright
21. **Documentation**: Create README and getting started guide

---

## Key Benefits of This Structure

### Developer Experience
- **Type Safety**: Catch errors at compile time, not runtime
- **Fast Feedback**: Turborepo caching makes builds blazing fast
- **Code Sharing**: Write once, use everywhere
- **Consistent Tooling**: Same configs across all packages

### Scalability
- **Independent Deployment**: Apps deploy separately
- **Granular Updates**: Change one package without affecting others
- **Team Collaboration**: Clear boundaries between apps and packages

### Maintainability
- **Single Source of Truth**: API logic centralized
- **Consistent Patterns**: Same coding patterns across apps
- **Unified Testing**: Same test frameworks everywhere
- **Shared Business Logic**: Email templates, constants, and validation logic

---

## Potential Challenges & Solutions

### Challenge: Initial Setup Complexity
**Solution**: Follow implementation steps sequentially. Start with basic structure, add complexity gradually.

### Challenge: Dependency Management
**Solution**: Use pnpm's strict dependency resolution. Explicitly declare all dependencies.

### Challenge: Build Time
**Solution**: Turborepo's caching will help. Only changed packages rebuild.

### Challenge: Mobile-Web UI Differences
**Solution**: No shared UI package. Each app manages its own components. Web uses shadcn/ui, mobile uses React Native Reusables.

---

## Success Metrics

- **Build Time**: <3 minutes for full monorepo build
- **Type Safety**: 100% TypeScript coverage
- **Code Sharing**: >60% of code in shared packages
- **Test Coverage**: >75% overall
- **Developer Satisfaction**: Fast local development, clear structure

---

## Conclusion

This monorepo structure provides a solid foundation for building a scalable, type-safe tutor management platform. The separation of concerns between apps and packages, combined with Turborepo's build optimization and tRPC's type safety, creates an excellent developer experience while maintaining production-grade quality.

The structure is designed to grow with the project, allowing new apps or packages to be added easily while maintaining consistency and code quality across the entire codebase.
