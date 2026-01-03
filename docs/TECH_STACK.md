# Tech Stack

## Overview

This document outlines the technology stack for our SaaS application, built with a modern, type-safe, and scalable architecture.

---

## Package Manager

| Technology | Purpose |
|------------|---------|
| **pnpm** | Fast, disk space efficient package manager with strict dependency management |

---

## Frontend

### Web

| Technology | Purpose |
|------------|---------|
| **Next.js** | React framework with App Router, server components, and edge rendering |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |
| **shadcn/ui** | High-quality, accessible, and customizable component library |

### Mobile

| Technology | Purpose |
|------------|---------|
| **Expo React Native** | Cross-platform mobile development (iOS, Android) with native APIs |
| **Expo Router** | File-based routing for React Native |
| **React Native Reusables** | shadcn/ui-style components adapted for React Native |

### Mobile Infrastructure

| Technology | Purpose |
|------------|---------|
| **Expo Notifications** | Push notifications for session reminders, new bookings, and messages |
| **Firebase Cloud Messaging (FCM)** | Push notification delivery service for iOS and Android |
| **AsyncStorage + React Query** | Offline data persistence and automatic sync when connection restored |
| **expo-calendar** | Native calendar integration for adding tutoring sessions |
| **expo-linking** | Deep linking for in-app payment flows (Lemon Squeezy checkout) |
| **EAS Build** | Cloud-based native builds for iOS and Android |
| **EAS Update** | Over-the-air (OTA) updates for JavaScript changes without app store review |

---

## Backend & API

| Technology | Purpose |
|------------|---------|
| **tRPC** | End-to-end type-safe APIs without code generation |
| **Supabase** | Backend-as-a-Service platform (PostgreSQL, Realtime, Edge Functions) |
| **Drizzle ORM** | Lightweight, type-safe ORM for TypeScript |

---

## Authentication

| Technology | Purpose |
|------------|---------|
| **Supabase Auth** | Authentication and authorization with Row Level Security (RLS) |

Supported auth methods:
- Email/Password
- Magic Links
- OAuth providers (Google, GitHub, Apple, etc.)
- Phone/SMS authentication

---

## Payments & Subscriptions

| Technology | Purpose |
|------------|---------|
| **Lemon Squeezy** | Merchant of Record for SaaS subscriptions, handling taxes, compliance, and billing |

Features:
- Subscription management
- Usage-based billing
- Global tax compliance
- License key generation
- Affiliate program support

---

## File Storage

| Technology | Purpose |
|------------|---------|
| **Supabase Storage** | S3-compatible object storage with CDN and image transformations |

---

## Email

| Technology | Purpose |
|------------|---------|
| **Resend** | Developer-first email API for transactional emails |
| **React Email** | Build responsive email templates with React components |

---

## Monitoring & Error Tracking

| Technology | Purpose |
|------------|---------|
| **Sentry** | Application monitoring, error tracking, and performance insights |

---

## Testing

| Technology | Purpose |
|------------|---------|
| **Vitest** | Fast unit and integration testing framework powered by Vite |
| **Playwright** | End-to-end testing across all modern browsers |

---

## Deployment & Hosting

| Technology | Purpose |
|------------|---------|
| **Vercel** | Frontend deployment with edge functions, preview deployments, and analytics |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Expo React Native (iOS / Android / Web)                        │
│  ├── shadcn/ui Components                                       │
│  ├── Tailwind CSS                                               │
│  └── tRPC Client                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  tRPC Router (Type-safe API)                                    │
│  └── Deployed on Vercel Serverless Functions                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Supabase                                                       │
│  ├── PostgreSQL Database                                        │
│  ├── Drizzle ORM (Type-safe queries)                            │
│  ├── Row Level Security (RLS)                                   │
│  └── Realtime Subscriptions                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICES LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Supabase    │  │ Supabase    │  │ Lemon Squeezy           │  │
│  │ Auth        │  │ Storage     │  │ (Payments)              │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
│  ┌─────────────┐  ┌─────────────────────────────────────────┐   │
│  │ Resend      │  │ Sentry                                  │   │
│  │ (Email)     │  │ (Monitoring)                            │   │
│  └─────────────┘  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Development Workflow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Develop    │───▶│     Test     │───▶│    Deploy    │
│              │    │              │    │              │
│  pnpm dev    │    │  Vitest      │    │  Vercel      │
│              │    │  Playwright  │    │  (Preview &  │
│              │    │              │    │   Production)│
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## Database Migration Strategy

**Automated CI/CD Migration Workflow:**

```bash
# Development
pnpm --filter @repo/database db:generate  # Generate migration from schema changes
pnpm --filter @repo/database db:migrate   # Apply locally

# CI/CD (GitHub Actions)
# Migrations run automatically on merge to main before deployment
# 1. Run migrations against staging database
# 2. Run integration tests
# 3. If successful, run migrations against production
# 4. Deploy applications
```

**Migration Files:**
- Location: `packages/database/src/migrations/`
- Generated by: `drizzle-kit generate:pg`
- Applied by: `drizzle-kit migrate` in GitHub Actions

**Rollback Strategy:**
- All migrations tracked in `__drizzle_migrations` table
- Rollback requires manual intervention via Supabase SQL editor
- Critical: Test migrations in staging environment first

**Development Workflow:**
1. Modify schema in `packages/database/src/schema/`
2. Run `pnpm db:generate` to create migration file
3. Review generated SQL in migration file
4. Run `pnpm db:migrate` to apply locally
5. Commit migration file to git
6. CI/CD applies migration automatically on merge

---

## Environment Management

**Strategy: Turborepo + .env files + Vercel/EAS Secrets**

### Local Development

```bash
# Root .env.local (gitignored)
SUPABASE_URL=your_local_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# Apps inherit from root or override
apps/web/.env.local
apps/mobile/.env.local
```

### Turborepo Environment Variables

```json
// turbo.json
{
  "globalEnv": ["SUPABASE_URL", "SUPABASE_ANON_KEY"],
  "pipeline": {
    "build": {
      "env": ["NEXT_PUBLIC_*"]
    }
  }
}
```

### Production Secrets

| Platform | Method | Variables |
|----------|--------|-----------|
| **Web Apps** | Vercel Environment Variables | All `NEXT_PUBLIC_*`, API keys |
| **Mobile** | EAS Secrets | `EXPO_PUBLIC_*`, API keys |
| **Database** | Supabase Dashboard | Connection strings, service role keys |

### Environment Files

```bash
.env.example          # Template for all required variables (committed)
.env.local            # Local development overrides (gitignored)
.env.test             # Test environment variables (committed)
apps/web/.env.local   # App-specific overrides (gitignored)
```

**Security Best Practices:**
- Never commit `.env.local` files
- Use `NEXT_PUBLIC_*` prefix only for client-safe variables
- Use `EXPO_PUBLIC_*` prefix for React Native client variables
- Store secrets in Vercel/EAS, not in code
- Rotate API keys regularly

---

## CI/CD Pipeline

**GitHub Actions Workflow** (`.github/workflows/ci.yml`)

### On Pull Request

```yaml
name: CI

on: [pull_request]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 24.x
      - Setup pnpm
      - Install dependencies (with cache)
      - Run type checking (turbo type-check)
      - Run linting (turbo lint)
      - Run unit tests (turbo test)
      - Run E2E tests (turbo test:e2e)
      - Build all apps (turbo build)
```

### On Merge to Main

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  migrate-database:
    runs-on: ubuntu-latest
    steps:
      - Run migrations against production database
      - Verify migration success

  deploy-web:
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - Vercel deployment triggered automatically
      - Preview URL available for QA

  deploy-mobile:
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - EAS Build (if native changes)
      - EAS Update (if JS-only changes)
```

### Vercel Integration

- **Preview Deployments**: Automatic for every PR
- **Production Deployment**: Automatic on merge to `main`
- **Environment Variables**: Synced from Vercel dashboard
- **Build Command**: `turbo build --filter=web...`

### EAS Integration

- **Development Builds**: On-demand via `eas build --profile development`
- **Preview Builds**: Automatic for QA testing
- **Production Builds**: Manual trigger for app store submission
- **OTA Updates**: Automatic for non-native changes

**Pipeline Stages:**

1. **Lint & Format** (~30s)
   - ESLint across all packages
   - Prettier format checking

2. **Type Check** (~1min)
   - TypeScript compilation
   - Type checking across monorepo

3. **Unit Tests** (~2min)
   - Vitest tests for all packages
   - Coverage reporting

4. **Build** (~3min)
   - Turborepo cached builds
   - Next.js production builds
   - Package compilation

5. **E2E Tests** (~5min)
   - Playwright tests against preview deployment
   - Critical user flows validation

6. **Deploy** (~2min)
   - Database migrations
   - Vercel production deployment
   - EAS updates (if applicable)

---

## Security

### API Security

| Layer | Implementation |
|-------|----------------|
| **Authentication** | Supabase Auth with JWT tokens via tRPC context |
| **Authorization** | Row Level Security (RLS) policies in PostgreSQL |
| **Rate Limiting** | Vercel Edge Config + middleware rate limiting (100 req/min per IP) |
| **CORS** | Next.js API routes with allowed origins whitelist |
| **Input Validation** | Zod schemas on all tRPC procedures |
| **SQL Injection** | Drizzle ORM parameterized queries (automatic protection) |

### Application Security

**Authentication Flow:**
```typescript
// tRPC context with Supabase Auth
export const createContext = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  return {
    user,
    db: drizzle(supabaseClient)
  };
};

// Protected procedure
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

**Row Level Security (RLS):**
```sql
-- Example: Students can only view their own sessions
CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = student_id OR auth.uid() = tutor_id);
```

**Environment Security:**
- API keys stored in Vercel/EAS secrets
- Service role keys never exposed to client
- HTTPS enforced on all endpoints
- Secure cookie settings (httpOnly, sameSite, secure)

**Mobile Security:**
- Expo SecureStore for sensitive local data
- Certificate pinning for API requests
- Jailbreak/root detection (optional)
- Biometric authentication for sensitive actions

**Payment Security:**
- PCI compliance handled by Lemon Squeezy (Merchant of Record)
- No credit card data stored in application
- Webhook signature verification for payment events

**Monitoring & Incident Response:**
- Sentry error tracking with sensitive data scrubbing
- Failed authentication attempt logging
- Unusual activity alerts via Supabase
- Regular security dependency updates via Dependabot

---

## Key Benefits

### Type Safety
- **tRPC**: End-to-end type safety from backend to frontend
- **Drizzle ORM**: Type-safe database queries
- **TypeScript**: Full type coverage across the entire stack

### Developer Experience
- **pnpm**: Fast installs and efficient disk usage
- **Expo**: Hot reloading and streamlined mobile development
- **shadcn/ui**: Copy-paste components, full ownership

### Scalability
- **Supabase**: Auto-scaling PostgreSQL with connection pooling
- **Vercel**: Edge deployment with automatic scaling
- **Lemon Squeezy**: Handles billing complexity as you scale

### Cost Efficiency
- **Supabase Free Tier**: Generous limits for development and small apps
- **Vercel Free Tier**: Suitable for development and low-traffic production
- **Lemon Squeezy**: No upfront costs, percentage-based pricing

---

## Environment Variables

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

# App
NEXT_PUBLIC_APP_URL=
```

---

## Version Requirements

| Technology | Minimum Version |
|------------|-----------------|
| Node.js | 24.x |
| pnpm | 10.x |
| TypeScript | 5.3+ |
| React | 19.x |
| Next.js | 16.x |
| Expo SDK | 54+ |
