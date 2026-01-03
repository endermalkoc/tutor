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

### Mobile & Web

| Technology | Purpose |
|------------|---------|
| **Expo React Native** | Cross-platform mobile development (iOS, Android, Web) |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |
| **shadcn/ui** | High-quality, accessible, and customizable component library |

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
| **Vitest** | Fast unit testing framework powered by Vite |
| **Jest** | JavaScript testing framework for unit and integration tests |
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
│  └── Deployed on Vercel Edge Functions                          │
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
│              │    │  Jest        │    │  (Preview &  │
│              │    │  Playwright  │    │   Production)│
└──────────────┘    └──────────────┘    └──────────────┘
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

# Sentry
SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Version Requirements

| Technology | Minimum Version |
|------------|-----------------|
| Node.js | 24.x (LTS) |
| pnpm | 10.x |
| TypeScript | 5.9.x |
| React | 19.x |
| Expo SDK | 54+ |
