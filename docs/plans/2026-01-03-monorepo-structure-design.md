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
- Deployed as Vercel Edge Functions
- Both web and mobile apps call the same endpoints
- Environment-specific base URLs via environment variables

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
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.x",
    "pnpm": ">=8.x"
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
- Frontend: React 18, Next.js 14, Expo, Tailwind CSS, shadcn/ui
- Backend: tRPC, Supabase (PostgreSQL), Drizzle ORM
- Auth: Supabase Auth with Row Level Security
- Payments: Lemon Squeezy
- Email: Resend + React Email
- Storage: Supabase Storage
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

## Implementation Next Steps

1. **Create Folder Structure**: Generate all directories and initial files
2. **Initialize Packages**: Set up package.json files with dependencies
3. **Configure Turborepo**: Create turbo.json with pipeline
4. **Set Up TypeScript**: Configure tsconfig files across workspace
5. **Initialize Database**: Create initial Drizzle schemas
6. **Set Up tRPC**: Create base router and context
7. **Install Dependencies**: Run `pnpm install`
8. **Create Example Components**: Basic shadcn/ui setup
9. **Configure Testing**: Set up Vitest and Playwright
10. **Documentation**: Create README and getting started guide

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
