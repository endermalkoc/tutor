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
| **Vercel Serverless Functions** | Node.js runtime for tRPC API routes (full Node.js API support) |
| **Supabase** | Backend-as-a-Service platform (PostgreSQL, Realtime, Edge Functions) |
| **Drizzle ORM** | Lightweight, type-safe ORM for TypeScript |
| **Inngest** | Background job queue for async tasks (emails, reminders, webhooks) |

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

## Monitoring & Observability

| Technology | Purpose |
|------------|---------|
| **Sentry** | Application monitoring, error tracking, and performance insights |
| **Axiom** | Structured logging and log analysis for serverless environments |
| **PostHog** | Product analytics, feature flags, session replay, and user behavior tracking |
| **Better Stack** | Uptime monitoring and incident management for API endpoints |

---

## Testing

| Technology | Purpose |
|------------|---------|
| **Vitest** | Fast unit and integration testing framework powered by Vite |
| **Playwright** | End-to-end testing across all modern browsers |

---

## Search

| Technology | Purpose |
|------------|---------|
| **PostgreSQL Full-Text Search** | Built-in search for tutors, students, and sessions using tsvector/tsquery |

---

## Internationalization (i18n)

| Technology | Purpose |
|------------|---------|
| **next-intl** | Type-safe internationalization for Next.js applications |
| **i18next + react-i18next** | Internationalization framework for React Native mobile app |
| **expo-localization** | Device locale detection and localization utilities for Expo |

---

## Content Management

| Technology | Purpose |
|------------|---------|
| **MDX** | Markdown with JSX for marketing blog content (stored in repository) |
| **next-mdx-remote** | Render MDX content in Next.js with full component support |

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
│  Next.js Web App                │  Expo Mobile App              │
│  ├── shadcn/ui Components       │  ├── React Native Reusables   │
│  ├── Tailwind CSS               │  ├── Expo Router              │
│  ├── next-intl (i18n)           │  ├── i18next (i18n)           │
│  └── tRPC Client                │  └── tRPC Client              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  tRPC Router (Type-safe API)                                    │
│  └── Deployed on Vercel Serverless Functions (Node.js)          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Supabase PostgreSQL                                            │
│  ├── Drizzle ORM (Type-safe queries)                            │
│  ├── Row Level Security (RLS)                                   │
│  ├── Full-Text Search (tsvector/tsquery)                        │
│  └── Realtime Subscriptions (session updates, messages)         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICES LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Auth & Storage    │  Payments  │  Communication │  Background  │
│  ┌──────────────┐  │  ┌───────┐ │  ┌──────────┐  │  ┌────────┐ │
│  │ Supabase     │  │  │ Lemon │ │  │ Resend   │  │  │Inngest │ │
│  │ Auth         │  │  │Squeezy│ │  │ (Email)  │  │  │ (Jobs) │ │
│  │ + Storage    │  │  │       │ │  │          │  │  │        │ │
│  └──────────────┘  │  └───────┘ │  └──────────┘  │  └────────┘ │
│                                                                  │
│  Observability Stack                                            │
│  ┌────────┐  ┌─────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Sentry │  │ Axiom   │  │ PostHog      │  │ Better Stack │   │
│  │(Errors)│  │ (Logs)  │  │ (Analytics)  │  │  (Uptime)    │   │
│  └────────┘  └─────────┘  └──────────────┘  └──────────────┘   │
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

## Local Development Setup

### Prerequisites

```bash
# Required installations
Node.js 24.x
pnpm 10.x
Docker Desktop (for Supabase CLI)
```

### Initial Setup

```bash
# 1. Clone repository
git clone <repository-url>
cd tutor

# 2. Install dependencies
pnpm install

# 3. Install Supabase CLI
pnpm add -g supabase

# 4. Start local Supabase (PostgreSQL + Auth + Storage + Realtime)
supabase start

# This will output:
# - API URL: http://localhost:54321
# - DB URL: postgresql://postgres:postgres@localhost:54322/postgres
# - Anon key: <anon-key>
# - Service role key: <service-role-key>

# 5. Copy environment variables
cp .env.example .env.local

# Update .env.local with local Supabase credentials from step 4

# 6. Run database migrations
pnpm --filter @repo/database db:migrate

# 7. Seed database with test data
pnpm --filter @repo/database db:seed

# 8. Start development servers
pnpm dev
```

### Seed Data

Development seed data includes:
- 5 sample tutors (Math, English, Science, History, Music)
- 10 sample students
- 20 upcoming and past sessions
- Sample payments and subscriptions

**Seed Script Location**: `packages/database/src/seed.ts`

### Resetting Local Database

```bash
# Reset and reseed local database
supabase db reset
pnpm --filter @repo/database db:seed
```

### Local Services

When running locally via `pnpm dev`:
- **Web App**: http://localhost:3000
- **Mobile App**: Expo DevClient (scan QR code)
- **Marketing Site**: http://localhost:3001
- **Supabase Studio**: http://localhost:54323
- **Inngest Dev Server**: http://localhost:8288

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

## Search Implementation

### PostgreSQL Full-Text Search

**Use Cases:**
- Search tutors by name, subjects, bio, qualifications
- Search students by name, email, grade level
- Search sessions by notes, subject, location

**Implementation:**

```typescript
// packages/database/src/schema/tutors.ts
import { sql } from 'drizzle-orm';

export const tutors = pgTable('tutors', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
  subjects: text('subjects').array(),
  // Search vector (auto-updated via trigger)
  searchVector: tsvector('search_vector'),
});

// Create search index
CREATE INDEX tutors_search_idx ON tutors USING GIN(search_vector);

// Auto-update trigger
CREATE TRIGGER tutors_search_update
  BEFORE INSERT OR UPDATE ON tutors
  FOR EACH ROW EXECUTE FUNCTION
  tsvector_update_trigger(
    search_vector, 'pg_catalog.english',
    name, bio, subjects
  );
```

**Usage via tRPC:**

```typescript
// packages/api/src/routers/tutors.ts
export const tutorsRouter = router({
  search: publicProcedure
    .input(z.object({ query: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(tutors)
        .where(
          sql`search_vector @@ plainto_tsquery('english', ${input.query})`
        )
        .orderBy(
          sql`ts_rank(search_vector, plainto_tsquery('english', ${input.query})) DESC`
        )
        .limit(20);
    }),
});
```

**Future Enhancements:**
- Add fuzzy matching for typo tolerance
- Weighted ranking (name > subjects > bio)
- Consider Meilisearch upgrade if search becomes critical feature

---

## Background Jobs Architecture

### Inngest Implementation

**Use Cases:**
- Session reminders (15min, 1hr, 24hr before)
- Email notifications (new bookings, cancellations)
- Webhook retries (Lemon Squeezy, external APIs)
- Report generation (weekly analytics, invoices)
- Data cleanup (expired sessions, old notifications)

**Setup:**

```typescript
// packages/api/src/inngest/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'tutor-app',
  eventKey: process.env.INNGEST_EVENT_KEY,
});
```

**Example: Session Reminders**

```typescript
// packages/api/src/inngest/functions/session-reminders.ts
import { inngest } from '../client';

export const sessionReminder = inngest.createFunction(
  { id: 'session-reminder' },
  { event: 'session/created' },
  async ({ event, step }) => {
    const session = event.data;

    // Schedule reminder 24 hours before
    await step.sleep('24h-before', session.startTime - 24 * 60 * 60 * 1000);
    await step.run('send-24h-reminder', async () => {
      await sendPushNotification({
        userId: session.studentId,
        title: 'Session Tomorrow',
        body: `Your session with ${session.tutorName} is tomorrow`,
      });
    });

    // Schedule reminder 1 hour before
    await step.sleep('1h-before', session.startTime - 60 * 60 * 1000);
    await step.run('send-1h-reminder', async () => {
      await sendPushNotification({
        userId: session.studentId,
        title: 'Session in 1 Hour',
        body: `Your session starts soon`,
      });
    });
  }
);
```

**Deployment:**
- **Development**: Inngest Dev Server (http://localhost:8288)
- **Production**: Inngest Cloud (auto-scales, built-in retries)
- **Webhook Endpoint**: `apps/web/app/api/inngest/route.ts`

---

## Observability Stack

### Axiom (Structured Logging)

```typescript
// packages/api/src/lib/logger.ts
import { Axiom } from '@axiomhq/js';

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
  dataset: process.env.AXIOM_DATASET,
});

export const logger = {
  info: (message: string, metadata?: Record<string, any>) => {
    axiom.ingest('app-logs', [{ level: 'info', message, ...metadata }]);
  },
  error: (message: string, error: Error, metadata?: Record<string, any>) => {
    axiom.ingest('app-logs', [{
      level: 'error',
      message,
      error: error.message,
      stack: error.stack,
      ...metadata
    }]);
  },
};

// Usage in tRPC context
export const createContext = async ({ req }) => {
  logger.info('API request', {
    path: req.url,
    method: req.method,
    userId: user?.id
  });

  return { db, user };
};
```

### PostHog (Product Analytics)

```typescript
// apps/web/src/lib/analytics.ts
import posthog from 'posthog-js';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: 'https://app.posthog.com',
  capture_pageviews: true,
  capture_pageleave: true,
});

// Track events
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    posthog.capture(event, properties);
  },
  identify: (userId: string, traits?: Record<string, any>) => {
    posthog.identify(userId, traits);
  },
};

// Usage
analytics.track('session_booked', {
  tutorId,
  studentId,
  duration: 60
});
```

**PostHog Features Used:**
- Event tracking (user actions, conversions)
- Feature flags (gradual rollouts)
- Session replay (debugging user issues)
- Funnel analysis (booking conversion rates)

### Better Stack (Uptime Monitoring)

**Monitored Endpoints:**
- `https://tutorapp.com/api/health` (every 30s)
- `https://tutorapp.com` (web app homepage)
- `https://tutorapp.com/api/trpc/health` (tRPC health check)

**Alerts:**
- Slack: #alerts channel
- Email: team@tutorapp.com
- Incident response: Auto-create GitHub issue

---

## Internationalization (i18n)

### Web App (next-intl)

```typescript
// apps/web/src/i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));

// apps/web/src/app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Usage
import { useTranslations } from 'next-intl';

export default function BookingPage() {
  const t = useTranslations('booking');

  return <h1>{t('title')}</h1>; // "Book a Session"
}
```

### Mobile App (i18next)

```typescript
// apps/mobile/src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, es: { translation: es } },
    lng: Localization.locale.split('-')[0], // 'en', 'es', etc.
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Usage
import { useTranslation } from 'react-i18next';

export default function BookingScreen() {
  const { t } = useTranslation();

  return <Text>{t('booking.title')}</Text>;
}
```

**Supported Languages (v1):**
- English (en) - Primary
- Spanish (es)

**Translation Management:**
- JSON files in repository (`/messages/*.json`, `/locales/*.json`)
- Future: Consider Phrase or Lokalise for translation workflow

---

## Content Management (Marketing Blog)

### MDX Files

```
apps/marketing/content/blog/
├── 2024-01-15-tutoring-best-practices.mdx
├── 2024-02-10-online-learning-tips.mdx
└── 2024-03-05-choosing-right-tutor.mdx
```

### Blog Post Structure

```mdx
---
title: "10 Best Practices for Online Tutoring"
description: "Proven strategies to maximize student engagement in virtual sessions"
author: "Jane Doe"
publishedAt: "2024-01-15"
image: "/blog/tutoring-best-practices.jpg"
tags: ["tutoring", "online-learning", "best-practices"]
---

# 10 Best Practices for Online Tutoring

Online tutoring has transformed education...

<Callout type="tip">
  Pro tip: Always test your screen share before sessions!
</Callout>
```

### Rendering Blog Posts

```typescript
// apps/marketing/app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogPost } from '@/lib/blog';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <MDXRemote source={post.content} components={{ Callout }} />
    </article>
  );
}
```

**Custom MDX Components:**
- `<Callout>` - Highlighted tips/warnings
- `<CodeBlock>` - Syntax-highlighted code
- `<VideoEmbed>` - YouTube/Vimeo embeds
- `<Newsletter>` - Email signup form

---

## Backup & Disaster Recovery

### Database Backups

**Supabase Automated Backups:**
- **Frequency**: Daily backups at 02:00 UTC
- **Retention**: 7 days (Pro plan), 30 days (Team plan)
- **Type**: Full database snapshots
- **Location**: Supabase infrastructure (geo-redundant)

**Point-in-Time Recovery (PITR):**
- Available on Pro plan and above
- Restore to any point in last 7 days
- RTO (Recovery Time Objective): ~15 minutes
- RPO (Recovery Point Objective): 0 (real-time replication)

### Manual Backups

```bash
# Export production database (pre-migration)
pnpm --filter @repo/database db:export

# Creates: backups/prod-backup-2024-01-15.sql
```

### Disaster Recovery Plan

**Scenario 1: Data Corruption**
1. Identify corruption time via Axiom logs
2. Use PITR to restore to pre-corruption state
3. Verify data integrity via test suite
4. Update application to prevent recurrence

**Scenario 2: Accidental Deletion**
1. Immediately pause application (maintenance mode)
2. Use PITR or latest backup
3. Verify missing data restored
4. Resume application, notify affected users

**Scenario 3: Supabase Outage**
- **Status Page**: https://status.supabase.com
- **Fallback**: Read-only mode via cached data
- **Communication**: Status banner on app, social media updates

### Backup Testing

```bash
# Quarterly backup restore test
# 1. Restore latest backup to staging environment
supabase db restore --db-url $STAGING_DB_URL backups/latest.sql

# 2. Run integration tests against restored data
pnpm test:integration

# 3. Verify critical user flows
pnpm test:e2e --env=staging
```

---

## Architecture Decisions

### Single-Tenant (v1)

**Decision**: Launch as single-tenant platform serving one tutoring business.

**Rationale:**
- Faster time to market (no multi-tenancy complexity)
- Simpler RLS policies and data model
- Lower infrastructure costs initially
- Easier to validate product-market fit

**Future Migration Path:**
When expanding to multi-tenant:
1. Add `organization_id` to all tables
2. Update RLS policies to check organization membership
3. Add subdomain routing (`acme.tutorapp.com`)
4. Migrate existing data to "default organization"

**Database Schema Preparation:**
```sql
-- Even in single-tenant v1, include org_id (default to single org)
CREATE TABLE sessions (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL DEFAULT 'default-org-uuid',
  tutor_id UUID NOT NULL,
  student_id UUID NOT NULL,
  -- ...
);

-- This allows zero-downtime upgrade to multi-tenant later
```

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

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Observability
SENTRY_DSN=
AXIOM_TOKEN=
AXIOM_DATASET=
NEXT_PUBLIC_POSTHOG_KEY=
BETTERSTACK_API_KEY=

# App URLs
NEXT_PUBLIC_APP_URL=
EXPO_PUBLIC_API_URL=
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
