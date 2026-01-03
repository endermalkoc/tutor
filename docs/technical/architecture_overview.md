# Architecture Overview

**Last Updated:** 2026-01-03

This document provides a high-level overview of the system architecture, design patterns, and architectural decisions.

---

## System Architecture

### High-Level Layers

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

## Monorepo Structure

### Applications (3)

```
apps/
├── marketing/     # Next.js - Landing page, blog, marketing content
├── web/          # Next.js - Main application (dashboard, features)
└── mobile/       # Expo - iOS & Android native applications
```

### Shared Packages (6)

```
packages/
├── api/          # tRPC routers - shared backend logic
├── database/     # Drizzle ORM schemas and migrations
├── email/        # React Email templates
├── constants/    # Shared enums, constants, validation schemas
├── config/       # Shared TypeScript, ESLint, Tailwind configs
└── e2e/          # Shared Playwright E2E tests
```

**Rationale:**
- **Code reuse**: Business logic defined once in `packages/api`
- **Type safety**: End-to-end TypeScript types from database to UI
- **Consistency**: Same data structures across web and mobile
- **Independent deployment**: Apps deploy separately
- **Team collaboration**: Clear boundaries between concerns

---

## Design Patterns & Principles

### 1. **Type-Safe API Layer (tRPC)**

**Pattern**: RPC-style API with end-to-end type safety

```typescript
// Define once in packages/api
export const tutorsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(tutors);
  }),
});

// Use in web app with full type safety
const tutors = await api.tutors.getAll(); // Fully typed!

// Use in mobile app - same types
const tutors = await api.tutors.getAll(); // Fully typed!
```

**Benefits:**
- No code generation required
- Compile-time type errors
- Automatic autocomplete
- Refactor with confidence

### 2. **Row Level Security (RLS)**

**Pattern**: Database-level authorization

```sql
CREATE POLICY "Users can only view their own sessions"
  ON sessions FOR SELECT
  USING (auth.uid() = student_id OR auth.uid() = tutor_id);
```

**Benefits:**
- Security enforced at database level
- Can't bypass in application code
- Automatic enforcement across all queries
- Reduces application-level authorization code

### 3. **Background Jobs (Inngest)**

**Pattern**: Event-driven background processing

```typescript
// Trigger event
await inngest.send({
  name: 'session/created',
  data: { sessionId: session.id },
});

// Handler runs in background
inngest.createFunction(
  { id: 'session-reminders' },
  { event: 'session/created' },
  async ({ event }) => {
    // Send reminders at scheduled times
  }
);
```

**Benefits:**
- Durable execution (survives crashes)
- Built-in retries
- Observable (see all job runs)
- Decouples request/response from long-running tasks

### 4. **Serverless Architecture**

**Pattern**: Deploy functions, not servers

**Benefits:**
- Auto-scaling (0 to infinity)
- Pay-per-use pricing
- No server management
- Global edge deployment

**Trade-offs:**
- Cold starts (mitigated by Vercel edge)
- Stateless (use database/cache for state)

### 5. **Monorepo with Turborepo**

**Pattern**: Multiple apps and packages in one repository

**Benefits:**
- Shared code without publishing packages
- Atomic commits across apps
- Smart caching (only rebuild what changed)
- Unified tooling and CI/CD

---

## Data Flow Patterns

### 1. **User Authentication Flow**

```
User Login
    ↓
Supabase Auth (JWT token)
    ↓
tRPC Context (verify token)
    ↓
Protected Procedure (check auth)
    ↓
Database Query (with RLS enforcement)
    ↓
Response to Client
```

### 2. **Session Booking Flow**

```
User Books Session
    ↓
tRPC Mutation (validate input)
    ↓
Database Insert (create session)
    ↓
Inngest Event (session/created)
    ↓
Background Jobs:
  ├── Send confirmation email
  ├── Schedule reminders
  └── Add to calendar

Response to Client (immediate)
```

### 3. **Payment Flow**

```
User Subscribes
    ↓
Redirect to Lemon Squeezy
    ↓
User Completes Payment
    ↓
Webhook to Our API
    ↓
Verify Signature
    ↓
Update Database (subscription status)
    ↓
Redirect User Back to App
```

---

## Architectural Decisions

### 1. **Single-Tenant Architecture (v1)**

**Decision**: Launch as single-tenant platform serving one organization

**Rationale:**
- Faster time to market (no multi-tenancy complexity)
- Simpler RLS policies and queries
- Lower infrastructure costs
- Easier product validation

**Future Path:**
- Database includes `organization_id` columns with default values
- Can upgrade to multi-tenant with schema migration
- Subdomain routing can be added later

### 2. **No Shared UI Package**

**Decision**: Each app manages its own UI components

**Rationale:**
- Web and mobile have fundamentally different UI paradigms
- shadcn/ui (copy-paste model) doesn't fit shared package pattern
- Mobile uses React Native Reusables (different component library)
- Avoids forcing unified design that doesn't work on both platforms

**Implementation:**
- Web apps use shadcn/ui components
- Mobile uses React Native Reusables
- Share business logic in `packages/api`

### 3. **Vercel Serverless Functions (not Edge)**

**Decision**: Use Node.js runtime, not Edge runtime

**Rationale:**
- Full Node.js API support required for:
  - Drizzle ORM (database queries)
  - Inngest (background jobs)
  - Complex tRPC procedures
- Edge runtime has limitations (no all Node.js APIs)
- Performance is still excellent with serverless functions

### 4. **PostgreSQL Full-Text Search (v1)**

**Decision**: Use built-in PostgreSQL search, not dedicated service

**Rationale:**
- Sufficient for v1 scale (< 100k records)
- No additional service to manage or pay for
- Good performance with proper indexing
- Can upgrade to Meilisearch/Algolia later if needed

**Future Path:**
- Monitor search performance
- If search quality issues or scale limits hit, migrate to Meilisearch

### 5. **Monorepo over Polyrepo**

**Decision**: Single repository for all apps and packages

**Rationale:**
- Atomic changes across multiple packages
- Easier code sharing
- Unified CI/CD and tooling
- Better developer experience with Turborepo caching

**Trade-offs:**
- Larger repository size
- More complex CI (mitigated by Turborepo)

---

## Scalability Considerations

### Current Architecture Supports:

| Resource | Capacity |
|----------|----------|
| **Concurrent Users** | ~10,000 (Vercel serverless auto-scales) |
| **Database Connections** | ~100 (Supabase connection pooling) |
| **API Requests/min** | ~100,000 (serverless scales horizontally) |
| **Storage** | Unlimited (Supabase Storage on S3) |

### Scaling Strategies:

**When to Scale Up:**
1. **Database** (> 100GB data):
   - Upgrade Supabase plan
   - Add read replicas
   - Implement caching layer (Redis)

2. **Search** (> 100k records or complex queries):
   - Migrate to Meilisearch or Algolia
   - Add faceted search capabilities

3. **Background Jobs** (> 100k jobs/day):
   - Inngest auto-scales
   - May need to optimize job functions

4. **File Storage** (> 1TB):
   - Already on S3-compatible storage
   - Add CDN caching (already included with Supabase)

---

## Security Architecture Layers

| Layer | Implementation |
|-------|----------------|
| **Client** | JWT tokens in secure cookies/storage |
| **API** | tRPC context authentication, input validation (Zod) |
| **Database** | Row Level Security (RLS) policies |
| **Network** | HTTPS only, CORS configuration |
| **Secrets** | Vercel/EAS secrets, never in code |

See [Security Model](./security_model.md) for detailed security policies.

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

**Local Development:**
1. Start Supabase locally (`supabase start`)
2. Run database migrations (`pnpm db:migrate`)
3. Seed test data (`pnpm db:seed`)
4. Start all apps (`pnpm dev`)

**CI/CD:**
1. PR opened → Run tests, linting, type-check
2. PR merged → Deploy to preview
3. Manual promotion → Deploy to production

---

## Integration Points

### External Services

| Service | Integration Point | Failure Mode |
|---------|------------------|--------------|
| **Supabase** | Direct PostgreSQL connection | Critical - app cannot function |
| **Lemon Squeezy** | Webhooks for payment events | Graceful - retries via webhook |
| **Resend** | API for transactional emails | Graceful - queue and retry |
| **Inngest** | HTTP for job triggers | Graceful - built-in retries |
| **Sentry** | SDK for error tracking | Graceful - errors logged locally |

---

## Performance Characteristics

### Expected Response Times

| Operation | Target | Notes |
|-----------|--------|-------|
| **API calls** | < 200ms | Average, excluding database |
| **Database queries** | < 50ms | Simple queries with indexes |
| **Page loads (web)** | < 1s | First contentful paint |
| **Mobile app startup** | < 2s | With cached data |

### Caching Strategy

- **Client-side**: React Query (5min stale time)
- **API-level**: No caching (data freshness priority)
- **Database**: Supabase connection pooling
- **CDN**: Vercel edge caching for static assets

---

## Disaster Recovery

### RTO/RPO Goals

| Scenario | RTO (Recovery Time) | RPO (Data Loss) |
|----------|---------------------|-----------------|
| **Database failure** | 15 minutes | Near-zero (PITR) |
| **API service outage** | 5 minutes | N/A (stateless) |
| **Supabase platform outage** | Dependent on Supabase | Near-zero |

See [TECH_STACK.md](../TECH_STACK.md) for detailed backup and disaster recovery procedures.

---

## Future Architecture Considerations

### Multi-Tenancy (v2)

When serving multiple organizations:
1. Add `organization_id` to all queries (already in schema)
2. Update RLS policies to check organization membership
3. Add subdomain routing (`acme.tutorapp.com`)
4. Implement organization-level feature flags

### Real-Time Features (Future)

If needed for live tutoring sessions:
- Supabase Realtime already available
- WebRTC for video (via third-party like Agora)
- Real-time presence indicators

### Microservices (Future)

Current monolith is appropriate for v1. Consider breaking into services if:
- Team size > 20 developers
- Independent scaling needs emerge
- Different tech stacks required for specific features

---

For implementation details, see:
- [TECH_STACK.md](../TECH_STACK.md) - Setup and configuration
- [Monorepo Structure Design](../plans/2026-01-03-monorepo-structure-design.md) - Detailed folder structure
- [Data Model](./data_model.md) - Database schema and relationships
- [Security Model](./security_model.md) - Security policies and implementation
