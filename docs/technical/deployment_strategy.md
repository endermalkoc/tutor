# Deployment Strategy

**Last Updated:** 2026-01-03

This document defines the deployment pipeline, environments, and release process.

---

## Overview

The platform uses **continuous deployment** with automated pipelines for both web and mobile applications.

**Key Principles:**
- **Automated CI/CD**: Every merge triggers deployment
- **Staging deployments**: Every PR deploys to staging for testing
- **Database migrations first**: Run migrations before deploying code
- **Zero-downtime deployments**: Serverless ensures no service interruption

---

## Environments

### Environment Strategy

| Environment | Purpose | Deployment Trigger | Database |
|-------------|---------|-------------------|----------|
| **Development** | Local development | Manual (`pnpm dev`) | Local Supabase |
| **Staging** | PR review & pre-production testing | Automatic on PR | Staging database |
| **Production** | Live application | Automatic on merge to `main` | Production database |

### Environment Configuration

```typescript
// Determined by environment variables
const environment = process.env.NODE_ENV; // 'development' | 'production'
const isDevelopment = environment === 'development';
const isProduction = environment === 'production';

// Environment-specific config
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  supabaseUrl: process.env.SUPABASE_URL!,
  // ... other config
};
```

---

## Deployment Platforms

### Web Apps (Vercel)

**Deployment Method**: Git-based continuous deployment

```yaml
# Vercel Configuration
Framework Preset: Next.js
Build Command: cd ../.. && pnpm turbo build --filter=web...
Output Directory: apps/web/.next
Install Command: pnpm install --frozen-lockfile
Node.js Version: 24.x
```

**Deployment Flow:**
1. Code pushed to GitHub
2. Vercel webhook triggered
3. Install dependencies (cached)
4. Run Turborepo build
5. Deploy to edge network
6. Health check validates deployment

**Deployment Targets:**
- **Marketing app**: `apps/marketing` → `tutorapp.com`
- **Web app**: `apps/web` → `app.tutorapp.com`

### Mobile App (EAS)

**Deployment Method**: Manual builds, automatic OTA updates

**Build Profiles:**
```json
// apps/mobile/eas.json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "staging": {
      "distribution": "internal",
      "channel": "staging"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

**Deployment Types:**

| Type | When Used | Command | Time |
|------|-----------|---------|------|
| **Native Build** | Native code changed | `eas build --platform all --profile production` | ~20 min |
| **OTA Update** | JS-only changes | `eas update --auto` | ~2 min |

**Deployment Flow:**
1. Merge to `main`
2. GitHub Action triggers EAS update
3. OTA update published
4. Users receive update on next app launch

---

## CI/CD Pipeline

### GitHub Actions Workflow

```
┌─────────────────┐
│  Pull Request   │
└────────┬────────┘
         │
         ├──► Lint & Format Check          (~30s)
         ├──► Type Check                   (~1min)
         ├──► Unit Tests                   (~2min)
         ├──► Build (Turborepo cached)     (~3min)
         └──► E2E Tests (Playwright)       (~5min)
                                           ────────
                                  Total:   ~11min

┌─────────────────┐
│  Merge to Main  │
└────────┬────────┘
         │
         ├──► Database Migration           (~1min)
         ├──► Deploy Web (Vercel)          (~2min)
         ├──► Deploy Mobile (EAS Update)   (~2min)
         └──► Smoke Tests                  (~1min)
                                           ────────
                                  Total:   ~6min
```

### Pull Request Checks

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
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
    runs-on: ubuntu-latest
    steps:
      - run: pnpm turbo type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - run: pnpm turbo test

  build:
    runs-on: ubuntu-latest
    steps:
      - run: pnpm turbo build

  e2e:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - run: npx playwright install --with-deps
      - run: pnpm turbo test:e2e
```

### Production Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  migrate-database:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - name: Run migrations
        run: pnpm --filter @repo/database db:migrate
        env:
          SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.PROD_SERVICE_KEY }}

  deploy-web:
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - name: Vercel deploys automatically
        run: echo "Vercel GitHub integration handles deployment"

  deploy-mobile:
    needs: migrate-database
    runs-on: ubuntu-latest
    steps:
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: cd apps/mobile && eas update --auto --non-interactive
```

---

## Database Migration Strategy

### Migration Workflow

```
┌────────────────────┐
│ 1. Modify Schema   │  packages/database/src/schema/
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ 2. Generate SQL    │  pnpm db:generate
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ 3. Review SQL      │  packages/database/src/migrations/*.sql
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ 4. Apply Locally   │  pnpm db:migrate
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ 5. Commit to Git   │  git add migrations/ && git commit
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ 6. CI/CD Applies   │  Automatic on merge to main
└────────────────────┘
```

### Migration Safety

**Pre-Deployment Checks:**
- [ ] Migration tested locally
- [ ] Migration tested on staging database
- [ ] Backward compatible with current code
- [ ] No data loss risk
- [ ] Rollback plan documented

**Migration Execution Order:**
1. Run migrations on staging
2. Run integration tests
3. If successful, run migrations on production
4. Deploy application code

### Rollback Strategy

**Scenario 1: Migration Failed**
```bash
# Manually revert via Supabase SQL editor
# Delete migration record
DELETE FROM __drizzle_migrations WHERE id = [migration_id];

# Manually write reverse SQL
# Example: DROP TABLE sessions;
```

**Scenario 2: Migration Succeeded, Code Failed**
```bash
# Redeploy previous version via Vercel
vercel rollback

# Mobile: Rollback OTA update via EAS dashboard
```

---

## Release Process

### Web App Release

**Automatic on Merge to Main:**
1. PR merged to `main`
2. GitHub Action triggers
3. Database migrations run
4. Vercel deployment starts
5. Deployment URL available for QA
6. Production deployment completes
7. Automatic smoke tests run
8. Team notified via Slack

**Manual Promotion (if needed):**
```bash
# Promote specific deployment to production
vercel --prod
```

### Mobile App Release

**Over-The-Air (OTA) Updates:**
```bash
# Automatic via GitHub Actions
eas update --auto --non-interactive

# Manual via CLI
eas update --branch production --message "Fix session booking bug"
```

**Native App Store Releases:**

```bash
# 1. Build for app stores
eas build --platform all --profile production

# 2. Submit to stores
eas submit --platform all

# 3. Release to users (via App Store Connect / Google Play Console)
```

**Release Schedule:**
- **OTA updates**: As needed (instant)
- **Native builds**: Monthly or for breaking changes
- **App store releases**: Every 2-4 weeks

---

## Staging Deployments

### Web App Staging (Vercel)

**Automatic for Every PR:**
- Unique URL: `tutor-pr-123.vercel.app`
- Uses staging environment
- Shared staging database
- Automatic SSL certificate

**Use Cases:**
- Feature review before merge
- Design QA
- Stakeholder demos
- E2E testing in real environment

### Mobile App Staging (EAS)

**Manual Staging Builds:**
```bash
# Build staging version for testing
eas build --platform all --profile staging

# Distribute via TestFlight / Internal Testing
eas submit --platform ios --profile staging
```

---

## Deployment Validation

### Health Checks

```typescript
// apps/web/app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    await db.execute('SELECT 1');

    // Check Supabase
    const supabase = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`);

    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        supabase: supabase.ok ? 'up' : 'down',
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

### Smoke Tests

**Post-Deployment Checks:**
1. **Health endpoint**: `GET /api/health` returns 200
2. **Homepage loads**: Web app accessible
3. **API functional**: tRPC health check passes
4. **Auth works**: Login flow functional
5. **Database connected**: Can query data

```yaml
# Smoke test in GitHub Actions
- name: Run smoke tests
  run: |
    curl -f ${{ secrets.PRODUCTION_URL }}/api/health
    curl -f ${{ secrets.PRODUCTION_URL }}
```

---

## Rollback Procedures

### Web App Rollback

**Via Vercel Dashboard:**
1. Go to project deployments
2. Find last known good deployment
3. Click "Promote to Production"
4. Confirm rollback

**Via Vercel CLI:**
```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

**Time to Rollback**: ~2 minutes

### Mobile App Rollback

**OTA Update Rollback:**
1. Go to EAS dashboard
2. Find previous update
3. Republish to production channel

**Native Build Rollback:**
- Not possible (app store limitation)
- Must submit new build with fix

**Time to Rollback**:
- OTA: ~5 minutes
- Native: Days (app store review)

### Database Rollback

**Point-in-Time Recovery (PITR):**
1. Identify corruption time
2. Use Supabase dashboard
3. Restore to pre-corruption state
4. Verify data integrity

**Manual Rollback:**
```sql
-- Delete problematic migration
DELETE FROM __drizzle_migrations WHERE id = [migration_id];

-- Manually write reverse SQL
-- (Must be prepared in advance)
```

**Time to Rollback**: ~15-30 minutes

---

## Monitoring Deployments

### Deployment Notifications

**Slack Integration:**
- Deployment started
- Deployment succeeded
- Deployment failed
- Rollback initiated

**Email Notifications:**
- Critical failures only
- Daily deployment summary

### Deployment Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Build time** | < 5 min | > 10 min |
| **Deploy frequency** | Daily | N/A |
| **Deployment success rate** | > 95% | < 90% |
| **Time to rollback** | < 5 min | > 15 min |
| **Failed deployments** | < 5% | > 10% |

---

## Deployment Best Practices

### DO

✅ Run migrations before deploying code
✅ Test migrations on staging first
✅ Use feature flags for risky features
✅ Keep deployments small and frequent
✅ Monitor error rates post-deployment
✅ Have rollback plan ready
✅ Tag releases in Git
✅ Document breaking changes

### DON'T

❌ Deploy directly to production
❌ Skip CI checks
❌ Deploy late Friday (no weekend coverage)
❌ Deploy breaking changes without migration plan
❌ Ignore failed health checks
❌ Deploy without testing on staging
❌ Make manual database changes
❌ Deploy multiple features at once

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Database migrations tested on staging
- [ ] Environment variables configured
- [ ] Breaking changes documented
- [ ] Rollback plan prepared
- [ ] Stakeholders notified (if major release)

### During Deployment

- [ ] Monitor deployment progress
- [ ] Watch error rates in Sentry
- [ ] Check health endpoints
- [ ] Run smoke tests
- [ ] Verify critical flows work

### Post-Deployment

- [ ] Confirm deployment success
- [ ] Check error rates (should not spike)
- [ ] Monitor user feedback
- [ ] Update release notes
- [ ] Tag release in Git
- [ ] Notify team in Slack

---

## Deployment Frequency

### Current Targets (v1)

| Application | Frequency | Method |
|-------------|-----------|--------|
| **Web apps** | Multiple times daily | Automatic (Vercel) |
| **Mobile (OTA)** | Daily to weekly | Automatic (EAS Update) |
| **Mobile (native)** | Every 2-4 weeks | Manual (App Store submission) |
| **Database migrations** | As needed with code changes | Automatic (GitHub Actions) |

### Future Goals

- Increase deployment frequency as team grows
- Implement canary deployments for risky changes
- Add automated rollback on error spike
- Improve deployment observability

---

For implementation details, see:
- [CI/CD Pipeline](./ci_cd_pipeline.md) - GitHub Actions workflows
- [Environment Configuration](./environment_configuration.md) - Environment setup
