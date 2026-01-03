# Tech Stack

**Last Updated:** 2026-01-03

This document outlines the core technology choices for the Tutor Management SaaS platform.

---

## Overview

The platform is built as a **monorepo** using modern, type-safe technologies optimized for developer experience and scalability.

---

## Package Manager

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **pnpm** | Package management | Fast, disk-efficient, strict dependency management, excellent monorepo support |

---

## Frontend

### Web Applications

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 16** | React framework for web apps | App Router, server components, edge rendering, excellent DX |
| **Tailwind CSS** | Utility-first styling | Rapid UI development, consistent design system, small bundle size |
| **shadcn/ui** | Component library | High-quality, accessible, fully customizable (copy-paste model) |
| **next-intl** | Internationalization | Type-safe, Next.js optimized, server/client support |

### Mobile Application

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Expo React Native** | Cross-platform mobile (iOS/Android) | Unified codebase, native APIs, excellent DX, OTA updates |
| **Expo Router** | File-based routing | Consistent with Next.js patterns, type-safe navigation |
| **React Native Reusables** | Component library | shadcn/ui patterns adapted for React Native |
| **i18next** | Mobile internationalization | React Native standard, flexible, AsyncStorage integration |

---

## Backend & API

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **tRPC** | Type-safe API layer | End-to-end type safety without codegen, excellent DX |
| **Vercel Serverless Functions** | Node.js runtime for APIs | Full Node.js support, auto-scaling, integrated with Next.js |
| **Supabase** | Backend-as-a-Service | PostgreSQL, Auth, Storage, Realtime in one platform |
| **Drizzle ORM** | Database ORM | Lightweight, type-safe, SQL-like syntax, excellent performance |
| **Inngest** | Background job queue | Durable execution, built-in retries, excellent observability |

---

## Database

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **PostgreSQL** (via Supabase) | Primary database | ACID compliance, full-text search, robust, scalable |
| **PostgreSQL Full-Text Search** | Search functionality | Built-in, no additional service, good for v1 scale |

---

## Authentication & Authorization

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Supabase Auth** | User authentication | Multiple auth methods, JWT tokens, integrated with database |
| **Row Level Security (RLS)** | Authorization | Database-level security, automatic enforcement |

---

## Payments & Subscriptions

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Lemon Squeezy** | Merchant of Record | Handles tax compliance, global billing, no PCI burden |

---

## File Storage

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Supabase Storage** | Object storage | S3-compatible, integrated with auth, CDN, image transformations |

---

## Email

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Resend** | Transactional email API | Developer-first, excellent deliverability, simple API |
| **React Email** | Email templates | Build emails with React components, responsive by default |

---

## Monitoring & Observability

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Sentry** | Error tracking & performance | Industry standard, excellent React/Next.js integration |
| **Axiom** | Structured logging | Optimized for serverless, fast queries, generous free tier |
| **PostHog** | Product analytics | Feature flags, session replay, funnels, self-hostable option |
| **Better Stack** | Uptime monitoring | Simple, reliable, incident management |

---

## Development Tools

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **TypeScript** | Type safety | Industry standard, excellent tooling, catches errors early |
| **Turborepo** | Monorepo build system | Smart caching, task pipelines, significantly faster builds |
| **Prettier** | Code formatting | Consistent code style, automatic formatting, CI/CD integration |
| **Vitest** | Unit testing | Fast, Vite-powered, excellent TypeScript support |
| **Playwright** | E2E testing | Cross-browser, reliable, excellent debugging tools |

---

## Content Management

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **MDX** | Marketing blog content | Markdown + React components, version-controlled |
| **next-mdx-remote** | MDX rendering | Server-side rendering, component support |

---

## Deployment & Hosting

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Vercel** | Web app hosting | Integrated with Next.js, edge functions, preview deployments |
| **EAS (Expo Application Services)** | Mobile builds & updates | Native builds, OTA updates, streamlined app store submission |

---

## Mobile Infrastructure

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Expo Notifications** | Push notifications | Cross-platform, integrated with Expo ecosystem |
| **Firebase Cloud Messaging (FCM)** | Notification delivery | Reliable delivery, iOS and Android support |
| **AsyncStorage + React Query** | Offline support | Persistent cache, automatic sync on reconnection |
| **expo-calendar** | Calendar integration | Native calendar access, session reminders |
| **expo-linking** | Deep linking | In-app payment flows, app navigation |

---

## Version Requirements

### Runtime & Frameworks

| Technology | Minimum Version |
|------------|-----------------|
| Node.js | 24.x |
| pnpm | 10.x |
| TypeScript | 5.3+ |
| React | 19.x |
| Next.js | 16.x |
| Expo SDK | 54+ |

### Development Tools

| Technology | Minimum Version |
|------------|-----------------|
| Turborepo | 1.11.0+ |
| Prettier | 3.2.0+ |
| Vitest | Latest |
| Playwright | Latest |
| Docker Desktop | Latest |

---

## Key Benefits

### Type Safety
- **tRPC**: End-to-end type safety from database to UI
- **Drizzle ORM**: Type-safe database queries
- **TypeScript**: Full type coverage across the entire stack

### Developer Experience
- **pnpm + Turborepo**: Fast installs and cached builds
- **Expo**: Hot reloading and streamlined mobile development
- **shadcn/ui**: Copy-paste components with full ownership

### Scalability
- **Supabase**: Auto-scaling PostgreSQL with connection pooling
- **Vercel**: Edge deployment with automatic scaling
- **Serverless Architecture**: Pay-per-use, infinite scale potential

### Cost Efficiency
- **Generous Free Tiers**: Supabase, Vercel, Lemon Squeezy suitable for early stage
- **Serverless Pricing**: Only pay for actual usage
- **Single-Tenant v1**: Lower complexity and infrastructure costs initially

---

## Architecture Decisions

### Single-Tenant (v1)
- **Decision**: Launch as single-tenant platform
- **Rationale**: Faster time to market, simpler development, easier product validation
- **Future Path**: Database schema prepared for multi-tenancy upgrade (organization_id columns)

### No Shared UI Package
- **Decision**: Each app manages its own UI components
- **Rationale**: Web and mobile have fundamentally different UI paradigms
- **Implementation**: Web uses shadcn/ui, mobile uses React Native Reusables

### PostgreSQL Full-Text Search (v1)
- **Decision**: Use built-in PostgreSQL search instead of dedicated search service
- **Rationale**: Sufficient for v1 scale, no additional service to manage
- **Future Path**: Can upgrade to Meilisearch or Algolia if search becomes critical

---

## Alternative Considerations

### Technologies Considered but Not Chosen

| Technology | Why Not Chosen |
|------------|----------------|
| **Prisma ORM** | Heavier than Drizzle, slower migrations, larger runtime |
| **GraphQL** | More complexity than needed, tRPC provides type safety without schema |
| **AWS** | Higher complexity, Vercel/Supabase provide better DX for our use case |
| **Stripe** | Lemon Squeezy handles tax compliance as Merchant of Record |
| **Algolia/Meilisearch** | Overkill for v1, PostgreSQL FTS sufficient initially |

---

For implementation details, setup instructions, and configuration examples, see:
- [Local Development Setup](./local_development_setup.md) - Development environment setup
- [Architecture Overview](./architecture_overview.md) - System architecture
