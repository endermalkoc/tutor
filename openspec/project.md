# Project Context

## Purpose

Tutor Management SaaS Platform - A comprehensive platform for tutors and tutoring centers to manage their business operations including:

- **Student & Family Management**: Track students, guardians, and family relationships
- **Scheduling**: Book and manage tutoring sessions, handle recurring appointments
- **Financial Operations**: Invoicing, payments, transaction tracking
- **Communication**: Notifications, messaging, email/SMS reminders
- **Portals**: Separate interfaces for tutors and students/parents
- **Reporting**: Business analytics, session reports, financial metrics

The platform is designed as a single-tenant v1 application with multi-tenancy capabilities prepared for future expansion.

## Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router, server components
- **React 19** - UI library
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library (copy-paste model)
- **Phosphor React** - Icon library
- **next-intl** - Internationalization

### Mobile

- **Expo SDK 54+** - React Native cross-platform mobile
- **Expo Router** - File-based navigation
- **React Native Reusables** - shadcn/ui patterns for mobile
- **i18next** - Mobile internationalization

### Backend & API

- **tRPC** - End-to-end type-safe API layer
- **Vercel Serverless Functions** - Node.js runtime
- **Drizzle ORM** - Lightweight, type-safe database ORM
- **Inngest** - Background job queue with durable execution

### Database

- **PostgreSQL** (via Supabase) - Primary database
- **PostgreSQL Full-Text Search** - Search functionality (v1)

### Authentication & Authorization

- **Supabase Auth** - JWT tokens, multiple auth methods
- **Row Level Security (RLS)** - Database-level authorization

### Payments

- **Lemon Squeezy** - Merchant of Record for tax compliance

### Infrastructure

- **Supabase Storage** - S3-compatible file storage
- **Resend + React Email** - Transactional emails
- **Vercel** - Web app hosting with edge deployment
- **EAS** - Mobile builds and OTA updates

### Observability

- **Sentry** - Error tracking and performance monitoring
- **Axiom** - Structured logging
- **PostHog** - Product analytics and feature flags
- **Better Stack** - Uptime monitoring

### Development Tools

- **pnpm** - Package manager (monorepo support)
- **Turborepo** - Monorepo build system with smart caching
- **TypeScript 5.3+** - Full type coverage
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Project Conventions

### Code Style

- **TypeScript Strict Mode**: Full type safety across the stack
- **Prettier**: Automatic code formatting (v3.2.0+)
- Use **Zod** for all input validation
- Use **parameterized queries** via Drizzle ORM (automatic SQL injection prevention)
- Never hardcode secrets in code
- Use `NEXT_PUBLIC_*` only for truly public data
- Avoid `eval()` or `innerHTML`
- Log sensitive data never (passwords, tokens)

### Architecture Patterns

**Monorepo Structure:**

```
apps/
├── marketing/     # Next.js - Landing page, blog
├── web/          # Next.js - Main application
└── mobile/       # Expo - iOS & Android

packages/
├── api/          # tRPC routers - shared backend logic
├── database/     # Drizzle ORM schemas and migrations
├── email/        # React Email templates
├── constants/    # Shared enums, constants, validation schemas
├── config/       # Shared TypeScript, ESLint, Tailwind configs
└── e2e/          # Shared Playwright E2E tests
```

**Key Patterns:**

- **tRPC**: RPC-style API with end-to-end type safety
- **Row Level Security (RLS)**: Database-level authorization enforcement
- **Background Jobs via Inngest**: Event-driven processing with built-in retries
- **Serverless Architecture**: Deploy functions, not servers
- **No Shared UI Package**: Web uses shadcn/ui, mobile uses React Native Reusables

### Testing Strategy

**Testing Pyramid:**

- **Unit Tests**: Vitest - Business logic, utilities, pure functions (80%+ coverage for API)
- **Integration Tests**: Test API endpoints, database operations, auth flows
- **E2E Tests**: Playwright - Critical user journeys (100% coverage required)

**Critical Flows Requiring E2E:**

1. Authentication (signup, login, password reset)
2. Session booking flow
3. Payment flow
4. Session management

**Test Commands:**

```bash
pnpm test              # Run all tests
pnpm test:e2e          # Run E2E tests
pnpm --filter @repo/api test  # Package-specific tests
```

### Git Workflow

- **Main branch**: `main` - Production deployments
- **Feature branches**: `feature/*` - New features
- **PR-based workflow** with required checks:
  - Lint & format check
  - Type check
  - Unit tests
  - Build
  - E2E tests
- **Claude Code Integration**: `@claude` mentions in issues/PRs for AI assistance

## Domain Context

### Core Entities

**Organizational:**

- **Studio**: Top-level organizational unit (tutor or tutoring center)
- **Family**: Household grouping for billing, links students and guardians
- **Tag**: Flexible labeling system for categorizing students

**People:**

- **User**: Person with login credentials and system access
- **Tutor**: Teacher profile with professional information
- **Student**: Student profile with academic details and lesson settings
- **Guardian**: Parent/guardian with billing preferences
- **Contact**: Base entity for personal information (name, email, birthday)

**Scheduling:**

- **Event**: Tutoring sessions, appointments, scheduled events
- **Subject**: Subject areas or topics taught

**Financial:**

- **Transaction**: Charges, payments, credits
- **Invoice**: Bills sent to families

### Entity Relationships

```
Studio (top-level)
├── Users (Tutors, Students, Guardians)
├── Families
│   ├── Students
│   ├── Guardians
│   ├── Transactions
│   └── Invoices
├── Events
│   ├── Teachers
│   ├── Attendees
│   └── Locations
├── Tags (many:many with Students)
└── Schools
```

## Important Constraints

### Security Requirements

- **RLS policies** must be enabled on all database tables
- **Zod validation** required for all tRPC procedure inputs
- **Webhook signatures** must be verified for external services
- **HTTPS enforced** on all endpoints
- **CORS configured** with specific domain whitelist (no wildcards)
- Never bypass RLS policies in application code

### Technical Constraints

- **Node.js 24.x** minimum runtime
- **PostgreSQL** as primary database (no NoSQL)
- **Single-tenant v1** architecture (multi-tenancy prepared in schema)
- **Serverless functions** have stateless limitations
- **Connection pooling** via Supabase (max ~100 connections)

### Business Constraints

- **PCI compliance** handled by Lemon Squeezy (credit card data never touches our servers)
- **Payment records** retained 7 years for tax compliance
- **User data** subject to deletion requests (30-day grace period)

## External Dependencies

### Critical Services (app cannot function without)

| Service      | Purpose                               |
| ------------ | ------------------------------------- |
| **Supabase** | PostgreSQL database, Auth, Storage    |
| **Vercel**   | Web app hosting, serverless functions |

### Graceful Degradation Services

| Service           | Purpose            | Failure Mode          |
| ----------------- | ------------------ | --------------------- |
| **Lemon Squeezy** | Payment processing | Webhook retries       |
| **Resend**        | Email delivery     | Queue and retry       |
| **Inngest**       | Background jobs    | Built-in retries      |
| **Sentry**        | Error tracking     | Errors logged locally |

### Third-Party Integrations

- **Google Calendar / Outlook / iCal** - Calendar sync
- **Zoom / Google Meet** - Video conferencing (planned)
- **FCM / Expo Notifications** - Push notifications

## Documentation Structure

- `docs/functional/` - Business logic, workflows, user stories
- `docs/technical/` - Architecture, tech stack, infrastructure
- `docs/ui-requirements/` - UI specifications for forms, lists, and interfaces
- `wireframes/` - React/Vite-based interactive prototypes

**Design System Location:**
- Components: `wireframes/src/components/design-system/`
- Design Tokens: `wireframes/src/styles/design-tokens.css`
- Component Showcase: `wireframes/src/pages/ComponentShowcase.tsx`
