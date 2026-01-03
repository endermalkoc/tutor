# Infrastructure

**Last Updated:** 2026-01-03

This document defines the hosting platforms, services, resource allocation, and scaling strategy.

---

## Overview

The platform uses **managed services** and **serverless infrastructure** to minimize operational overhead and maximize scalability.

**Philosophy**: Buy, don't build infrastructure

---

## Hosting Platforms

### Vercel (Web Apps)

**Hosts:**
- Marketing site (`tutorapp.com`)
- Web application (`app.tutorapp.com`)
- API (Serverless Functions)

**Features Used:**
- Edge network (global CDN)
- Serverless Functions (Node.js 24.x)
- Preview deployments
- Automatic SSL
- DDoS protection

**Resource Limits:**
| Resource | Free Tier | Pro Tier (Current) |
|----------|-----------|-------------------|
| **Bandwidth** | 100 GB/month | 1 TB/month |
| **Function execution** | 100 GB-hours | 1000 GB-hours |
| **Edge requests** | Unlimited | Unlimited |
| **Build minutes** | 6000/month | Unlimited |

### Expo Application Services (Mobile)

**Hosts:**
- iOS app (via App Store)
- Android app (via Google Play)

**Features Used:**
- EAS Build (native builds)
- EAS Update (OTA updates)
- EAS Submit (app store submission)

**Resource Limits:**
| Resource | Included |
|----------|----------|
| **Builds** | 30 free/month, then $0.60/build |
| **Updates** | Unlimited |
| **Bandwidth** | 1 GB free, then $0.10/GB |

---

## Backend Services

### Supabase (Database & Backend)

**Services Used:**
- PostgreSQL database
- Authentication (Supabase Auth)
- Object storage (Supabase Storage)
- Realtime subscriptions

**Current Plan**: Pro ($25/month)

**Resource Limits:**
| Resource | Pro Tier |
|----------|----------|
| **Database size** | 8 GB included |
| **Bandwidth** | 250 GB/month |
| **Storage** | 100 GB |
| **Concurrent connections** | ~100 (pgBouncer pooling) |

**Scaling Triggers:**
- Database > 7 GB → Upgrade to Team plan
- Concurrent connections > 80 → Add read replicas
- Bandwidth > 200 GB → Optimize or upgrade

### Lemon Squeezy (Payments)

**Purpose**: Merchant of Record for subscription payments

**Pricing**: 5% + payment processing fees

**Features:**
- PCI compliance handled
- Global tax compliance
- Subscription management
- Webhooks for events

### Resend (Email)

**Purpose**: Transactional email delivery

**Current Plan**: Free tier (100 emails/day)

**Resource Limits:**
| Plan | Emails/month | Cost |
|------|-------------|------|
| **Free** | 3,000 | $0 |
| **Pro** | 50,000 | $20/month |

**Scaling Trigger**: > 2,500 emails/month → Upgrade to Pro

### Inngest (Background Jobs)

**Purpose**: Durable background job execution

**Current Plan**: Free tier (10k steps/month)

**Resource Limits:**
| Plan | Steps/month | Cost |
|------|------------|------|
| **Free** | 10,000 | $0 |
| **Pro** | 1M | $50/month |

**Scaling Trigger**: > 8,000 steps/month → Upgrade to Pro

---

## Observability Services

### Sentry (Error Tracking)

**Current Plan**: Team ($26/month)

**Limits**: 50k errors/month

### Axiom (Logging)

**Current Plan**: Free tier (500 MB/month)

**Limits**: 500 MB logs/month

### PostHog (Analytics)

**Current Plan**: Free tier (1M events/month)

**Limits**: 1M events/month, unlimited session replays

### Better Stack (Uptime)

**Current Plan**: Free tier (10 monitors)

**Limits**: 10 monitors, 1-minute intervals

---

## Resource Allocation

### Development Environment

**Local Resources:**
- Docker Desktop (4 GB RAM allocated)
- Local Supabase (PostgreSQL + supporting services)
- Node.js 24.x (pnpm package manager)

**Cloud Resources:**
- None (fully local development)

### Staging Environment

**Database**: Shared Supabase project

**Hosting**: Vercel preview deployments

**Purpose**:
- PR testing
- Integration testing
- Demo environment

### Production Environment

**Compute:**
- Vercel Serverless Functions (auto-scaling)
- No dedicated servers

**Database:**
- Supabase Pro (dedicated instance)
- Connection pooling (pgBouncer)

**Storage:**
- Supabase Storage (S3-compatible)
- CDN via Supabase

---

## Scaling Strategy

### Horizontal Scaling (Current)

**Serverless Functions:**
- Auto-scale to demand
- No configuration needed
- Pay-per-use

**Database:**
- Single instance with connection pooling
- Handles ~100 concurrent connections

### Vertical Scaling (When Needed)

**Database Upgrade Path:**
```
Pro Plan (8 GB)
  ↓
Team Plan (32 GB)
  ↓
Enterprise (Custom)
```

**When to Upgrade:**
- Database size > 80% of limit
- Connection pool exhausted regularly
- Query performance degrades

### Read Replicas (Future)

**When to Add:**
- Read queries > 1000/second
- Write latency affects reads
- Geographic distribution needed

**Implementation:**
```typescript
// Read from replica
const replicas = drizzle(supabaseReadReplica);
const tutors = await replicas.query.tutors.findMany();

// Write to primary
const primary = drizzle(supabasePrimary);
await primary.insert(sessions).values(newSession);
```

---

## Geographic Distribution

### Current Setup

**Web Apps (Vercel):**
- Edge network: Global CDN
- Serverless functions: US East (primary)
- Automatic routing to nearest edge

**Database (Supabase):**
- Single region: US East (us-east-1)

**Mobile Apps:**
- App Store: Global distribution
- Google Play: Global distribution

### Multi-Region (Future)

**When Needed:**
- User base > 50% outside US
- Latency > 200ms for major markets
- Compliance requires data residency

**Implementation:**
- Add Supabase read replicas in EU, Asia
- Route API calls to nearest region
- Replicate Supabase Storage to regions

---

## Cost Management

### Current Monthly Costs (Estimated)

| Service | Plan | Cost |
|---------|------|------|
| **Vercel** | Pro | $20 |
| **Supabase** | Pro | $25 |
| **Lemon Squeezy** | Usage-based | 5% of revenue |
| **Resend** | Free | $0 |
| **Inngest** | Free | $0 |
| **Sentry** | Team | $26 |
| **Axiom** | Free | $0 |
| **PostHog** | Free | $0 |
| **Better Stack** | Free | $0 |
| **EAS** | Usage-based | ~$20 |
| **Domain** | Annual | $1/month |
| **Total** | | **~$92/month** |

### Cost Optimization

**Current:**
- Use free tiers where possible
- Serverless (pay-per-use) for compute
- Aggressive caching to reduce bandwidth

**Future:**
- Monitor usage trends
- Optimize database queries
- Implement CDN for assets
- Use Turborepo caching to reduce build minutes

---

## Disaster Recovery

### Backup Strategy

**Database:**
- Automated daily backups (Supabase)
- Point-in-time recovery (7 days)
- Manual backups before major migrations

**Code:**
- Git repository (GitHub)
- All infrastructure as code

**Configuration:**
- Environment variables in Vercel/EAS
- Documented in repository

### Recovery Time Objectives (RTO)

| Service | RTO | Recovery Method |
|---------|-----|-----------------|
| **Web apps** | < 5 min | Vercel rollback |
| **Mobile (OTA)** | < 5 min | EAS rollback |
| **Database** | < 15 min | Supabase PITR |
| **API** | < 5 min | Serverless auto-recovery |

---

## Infrastructure as Code

### Current Approach

**Managed Services:**
- Configuration via dashboards
- Environment variables in Vercel/EAS secrets
- Database migrations via Drizzle

**Not Using IaC Tools:**
- No Terraform/Pulumi (not needed for managed services)
- No Kubernetes (serverless approach)

### Future Consideration

**When to Adopt IaC:**
- Team size > 10
- Multiple environments to manage
- Complex infrastructure dependencies
- Compliance requirements

---

## Security Hardening

### Network Security

- **HTTPS only**: All endpoints
- **CORS**: Strict origin whitelist
- **DDoS protection**: Via Vercel
- **Firewall**: Supabase connection restrictions

### Access Control

- **Principle of least privilege**: Service accounts with minimal permissions
- **MFA**: Required for all admin accounts
- **IP restrictions**: Admin endpoints only from trusted IPs (future)

---

## Monitoring Infrastructure

**What We Monitor:**
- Service uptime (Better Stack)
- Error rates (Sentry)
- Resource usage (Vercel/Supabase dashboards)
- Cost trends (manual monthly review)

**Alerts:**
- Service downtime: Immediate
- Cost spike (> 50% increase): Daily digest
- Resource limits (> 80%): Weekly review

---

For implementation details, see:
- [TECH_STACK.md](../TECH_STACK.md) - Service setup
- [Deployment Strategy](./deployment_strategy.md) - CI/CD infrastructure
