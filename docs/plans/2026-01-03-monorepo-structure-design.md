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
3. **ui**: shadcn/ui components and custom UI elements
4. **config**: Shared TypeScript, ESLint, and Tailwind configurations

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
│   │   │   ├── app/            # Next.js App Router
│   │   │   │   ├── page.tsx    # Landing page
│   │   │   │   ├── pricing/
│   │   │   │   ├── about/
│   │   │   │   ├── blog/
│   │   │   │   └── layout.tsx
│   │   │   ├── components/     # Marketing-specific components
│   │   │   └── styles/
│   │   ├── public/             # Static assets
│   │   ├── e2e/                # Marketing-specific E2E tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   └── playwright.config.ts
│   │
│   ├── web/                    # Next.js - Main web application
│   │   ├── src/
│   │   │   ├── app/            # App Router
│   │   │   │   ├── (auth)/     # Auth routes (login, signup)
│   │   │   │   ├── (dashboard)/    # Protected routes
│   │   │   │   │   ├── students/
│   │   │   │   │   ├── tutors/
│   │   │   │   │   ├── sessions/
│   │   │   │   │   ├── payments/
│   │   │   │   │   └── settings/
│   │   │   │   └── layout.tsx
│   │   │   ├── components/     # Web-specific components
│   │   │   ├── lib/            # Utilities, tRPC client setup
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── e2e/                # Web-specific E2E tests
│   │   ├── __tests__/          # Unit tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
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
│       │   └── lib/            # Mobile utilities, tRPC client
│       ├── assets/             # Images, fonts, icons
│       ├── __tests__/          # Unit tests
│       ├── app.json            # Expo configuration
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
│   │   │   │   └── index.ts
│   │   │   ├── migrations/     # Drizzle migration files
│   │   │   ├── client.ts       # Supabase client setup
│   │   │   └── index.ts
│   │   ├── __tests__/          # Schema tests
│   │   ├── drizzle.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   │
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   └── ...         # More shadcn/ui components
│   │   │   ├── hooks/          # Shared React hooks
│   │   │   │   ├── use-toast.ts
│   │   │   │   └── use-media-query.ts
│   │   │   ├── lib/
│   │   │   │   └── utils.ts    # cn() helper, etc.
│   │   │   └── index.ts
│   │   ├── __tests__/          # Component tests
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts  # Base Tailwind config
│   │   └── vitest.config.ts
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
- Deployed as Vercel Serverless Functions (Node.js runtime)
- Both web and mobile apps call the same endpoints
- Environment-specific base URLs via environment variables
- Supports full tRPC features without edge runtime limitations

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
    "type-check": "turbo type-check",
    "clean": "turbo clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.0"
  },
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=22.x",
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
3. `packages/ui` - shadcn/ui components & custom UI
4. `packages/config` - Shared configs (TS, ESLint, Tailwind)
5. `packages/e2e` - Shared Playwright E2E tests

---

## Technology Stack

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for complete details.

**Key Technologies:**
- Frontend: React 19, Next.js 15, Expo SDK 54+, Tailwind CSS, shadcn/ui
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
- shadcn/ui as component foundation
- Shared via `packages/ui`
- Customizable and owned by the project
- Tailwind CSS for styling

### Code Sharing
- Business logic in `packages/api` (tRPC routers)
- UI components in `packages/ui`
- Database schema in `packages/database`
- Import via workspace protocol: `@repo/api`, `@repo/ui`, etc.

---

## Project Structure Philosophy

### Apps vs Packages
- **Apps**: Deployable applications with their own entry points
- **Packages**: Shared code consumed by apps

### When to Create a Package
- Code used by 2+ apps
- Logical separation of concerns (API, DB, UI)
- Shared configurations

### When to Keep Code in App
- App-specific components or logic
- One-off features or pages
- App-specific routing

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
- UI components: 70%+ coverage
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

### API (Vercel Edge Functions)
- Deployed with `apps/web`
- Available at `/api/trpc/*`

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

# Sentry
SENTRY_DSN=your_sentry_dsn

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
          node-version: 22
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
          node-version: 22
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
          node-version: 22
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
          node-version: 22
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
          node-version: 22
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
          node-version: 22
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
          node-version: 22
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

**Rate Limiting:**
```typescript
// apps/web/middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}
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
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.ALLOWED_ORIGINS || 'https://tutorapp.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Authorization, Content-Type' },
        ],
      },
    ];
  },
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

## Implementation Next Steps

1. **Create Folder Structure**: Generate all directories and initial files
2. **Initialize Packages**: Set up package.json files with dependencies
3. **Configure Turborepo**: Create turbo.json with pipeline
4. **Set Up TypeScript**: Configure tsconfig files across workspace
5. **Initialize Database**: Create initial Drizzle schemas
6. **Set Up tRPC**: Create base router and context
7. **Configure Environment Variables**: Set up .env files and Turborepo config
8. **Install Dependencies**: Run `pnpm install`
9. **Set Up Security**: Implement RLS policies, rate limiting, CORS
10. **Configure CI/CD**: Create GitHub Actions workflows
11. **Set Up Mobile Infrastructure**: Configure Expo Notifications, EAS
12. **Create Example Components**: Basic shadcn/ui setup
13. **Configure Testing**: Set up Vitest and Playwright
14. **Documentation**: Create README and getting started guide

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
- **Shared Components**: UI consistency guaranteed
- **Unified Testing**: Same test frameworks everywhere

---

## Potential Challenges & Solutions

### Challenge: Initial Setup Complexity
**Solution**: Follow implementation steps sequentially. Start with basic structure, add complexity gradually.

### Challenge: Dependency Management
**Solution**: Use pnpm's strict dependency resolution. Explicitly declare all dependencies.

### Challenge: Build Time
**Solution**: Turborepo's caching will help. Only changed packages rebuild.

### Challenge: Mobile-Web UI Differences
**Solution**: Keep shared UI primitives generic. App-specific styling in apps.

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
