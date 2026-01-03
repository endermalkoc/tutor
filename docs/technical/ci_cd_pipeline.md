# CI/CD Pipeline

**Last Updated:** 2026-01-03

This document provides the complete GitHub Actions workflow configuration for continuous integration and deployment.

---

## Overview

Our CI/CD pipeline uses **GitHub Actions** for automated testing and deployment.

**Key Workflows:**
- **CI** (`ci.yml`) - Runs on every pull request
- **Deploy** (`deploy.yml`) - Runs on merge to `main`

---

## Pull Request Workflow

**File:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint & Format Check
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

      - name: Lint
        run: pnpm turbo lint

      - name: Format check
        run: pnpm turbo format:check

  type-check:
    name: TypeScript Type Check
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

      - name: Type check
        run: pnpm turbo type-check

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
          node-version: 24
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm turbo test
        env:
          SUPABASE_URL: ${{ secrets.TEST_SUPABASE_URL }}
          SUPABASE_ANON_KEY: ${{ secrets.TEST_SUPABASE_ANON_KEY }}

  build:
    name: Build All Apps
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

      - name: Build
        run: pnpm turbo build

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
          node-version: 24
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: pnpm turbo test:e2e
        env:
          PLAYWRIGHT_TEST_BASE_URL: http://localhost:3000
```

---

## Production Deployment Workflow

**File:** `.github/workflows/deploy.yml`

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
          node-version: 24
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
        run: echo "Vercel auto-deploys via GitHub integration"
      # Vercel GitHub integration handles deployment automatically

  deploy-mobile:
    name: Deploy Mobile OTA Update
    needs: migrate-database
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

      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Publish EAS Update
        run: cd apps/mobile && eas update --auto --non-interactive
```

---

## Required GitHub Secrets

**Repository Settings → Secrets and variables → Actions**

| Secret Name | Description | Where to Get |
|-------------|-------------|--------------|
| `TEST_SUPABASE_URL` | Staging database URL | Supabase dashboard |
| `TEST_SUPABASE_ANON_KEY` | Staging anon key | Supabase dashboard |
| `PROD_SUPABASE_URL` | Production database URL | Supabase dashboard |
| `PROD_SERVICE_KEY` | Production service role key | Supabase dashboard |
| `EXPO_TOKEN` | Expo authentication token | `eas login && eas whoami` |

---

## Vercel Integration

**Setup:**
1. Install Vercel GitHub app
2. Connect repository
3. Configure build settings:
   - **Framework**: Next.js
   - **Build Command**: `cd ../.. && pnpm turbo build --filter=web...`
   - **Install Command**: `pnpm install --frozen-lockfile`
   - **Output Directory**: `apps/web/.next`

**Auto-Deployment:**
- Every push to `main` → Production deployment
- Every PR → Preview deployment

---

## Workflow Triggers

### Pull Request Workflow Triggers

```yaml
on:
  pull_request:
    branches: [main, develop]
```

**Runs on:**
- Opening a PR
- Pushing new commits to PR
- Updating PR

### Deploy Workflow Triggers

```yaml
on:
  push:
    branches: [main]
```

**Runs on:**
- Merging PR to `main`
- Direct push to `main` (protected, should not happen)

---

## Caching Strategy

### pnpm Cache

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 24
    cache: 'pnpm'  # Caches pnpm store
```

**Benefits:**
- Faster dependency installation
- Reduced bandwidth usage
- Consistent across runs

### Turborepo Cache

Turborepo automatically caches build outputs locally. For CI:

```yaml
# Optional: Remote caching with Vercel
- name: Build
  run: pnpm turbo build
  env:
    TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
    TURBO_TEAM: ${{ secrets.TURBO_TEAM }}
```

---

## Status Checks

**Required checks before merge:**
- ✅ Lint & format check
- ✅ Type check
- ✅ Unit tests
- ✅ Build succeeds
- ✅ E2E tests (optional, can be slow)

**Configure in GitHub:**
Repository → Settings → Branches → Branch protection rules

---

## Troubleshooting

### Workflow Fails on `pnpm install`

**Solution:**
- Check `pnpm-lock.yaml` is committed
- Ensure Node.js version matches (24.x)
- Clear GitHub Actions cache

### Tests Fail in CI but Pass Locally

**Solution:**
- Check environment variables are set in GitHub Secrets
- Verify test database is accessible
- Review test logs for specific failures

### Deployment Stuck

**Solution:**
- Check GitHub Actions status page
- Verify Vercel/EAS tokens are valid
- Review workflow logs for errors

---

For related documentation:
- [Deployment Strategy](./deployment_strategy.md) - Deployment process and strategy
- [Environment Configuration](./environment_configuration.md) - Setting up secrets
- [Data Migration](./data_migration.md) - Database migration in CI/CD
