# Environment Configuration

**Last Updated:** 2026-01-03

This document explains how to configure environment variables for development, staging, and production environments.

---

## Overview

We use environment variables for configuration across all applications and packages using:
- **Turborepo**: Global environment variable management
- **`.env` files**: Local development configuration
- **Vercel**: Web app production secrets
- **EAS**: Mobile app production secrets
- **GitHub Secrets**: CI/CD credentials

---

## Environment Files

### File Structure

```
tutor/
├── .env.example          # Template (committed to git)
├── .env.local            # Local development (gitignored)
├── .env.test             # Test environment (committed)
├── apps/
│   ├── web/
│   │   └── .env.local    # Web-specific overrides (gitignored)
│   └── mobile/
│       └── .env.local    # Mobile-specific overrides (gitignored)
└── packages/
    └── database/
        └── .env.local    # Database-specific (gitignored)
```

### .env.example (Template)

**Location:** `tutor/.env.example`

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_STORE_ID=your_store_id
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret

# Resend
RESEND_API_KEY=your_resend_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Observability
SENTRY_DSN=your_sentry_dsn
AXIOM_TOKEN=your_axiom_token
AXIOM_DATASET=app-logs
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
BETTERSTACK_API_KEY=your_betterstack_key

# App URLs (Development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/trpc

# Mobile (Expo)
EXPO_PUBLIC_API_URL=http://localhost:3000/api/trpc
```

### .env.local (Development)

**Location:** `tutor/.env.local` (create from .env.example)

```bash
# Copy template
cp .env.example .env.local

# Edit with your local Supabase credentials
# (from `supabase start` output)
```

---

## Environment Variable Naming

### Conventions

| Prefix | Exposed To | Example | Use Case |
|--------|-----------|---------|----------|
| `NEXT_PUBLIC_*` | Browser (Next.js) | `NEXT_PUBLIC_APP_URL` | Public URLs, API endpoints |
| `EXPO_PUBLIC_*` | Mobile app | `EXPO_PUBLIC_API_URL` | Mobile API configuration |
| (no prefix) | Server only | `SUPABASE_SERVICE_ROLE_KEY` | Secrets, API keys |

**⚠️ CRITICAL:** Never use `NEXT_PUBLIC_` or `EXPO_PUBLIC_` for secrets!

---

## Turborepo Configuration

### Global Environment Variables

**Location:** `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalEnv": [
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NODE_ENV"
  ],
  "pipeline": {
    "build": {
      "env": [
        "NEXT_PUBLIC_*",
        "EXPO_PUBLIC_*"
      ]
    }
  }
}
```

**What This Does:**
- `globalEnv`: Variables that affect all tasks
- `pipeline.build.env`: Variables that affect builds
- Turborepo invalidates cache when these change

---

## Production Secrets Management

### Web Apps (Vercel)

**Set via Dashboard:**
1. Go to project settings
2. Environment Variables tab
3. Add variables for each environment

**Or via CLI:**
```bash
# Install Vercel CLI
pnpm add -g vercel

# Set production variable
vercel env add SUPABASE_URL production

# Set preview variable (for PR deployments)
vercel env add SUPABASE_URL preview

# Set development variable
vercel env add SUPABASE_URL development
```

**Environment Scopes:**
- **Production**: Deployed from `main` branch
- **Preview**: PR deployments
- **Development**: `vercel dev` local development

### Mobile App (EAS)

**Set via CLI:**
```bash
# Install EAS CLI
pnpm add -g eas-cli

# Create secret
eas secret:create --scope project --name EXPO_PUBLIC_API_URL --value https://api.tutorapp.com/trpc

# List secrets
eas secret:list

# Delete secret
eas secret:delete --name EXPO_PUBLIC_API_URL
```

**Access in Code:**
```typescript
// Automatically available in environment
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

### CI/CD (GitHub Secrets)

**Set via GitHub:**
1. Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add name and value

**Common Secrets:**
- `PROD_SUPABASE_URL`
- `PROD_SUPABASE_SERVICE_ROLE_KEY`
- `STAGING_SUPABASE_URL`
- `EXPO_TOKEN`
- `VERCEL_TOKEN`

**Access in Workflows:**
```yaml
# .github/workflows/deploy.yml
- name: Run migrations
  run: pnpm --filter @repo/database db:migrate
  env:
    SUPABASE_URL: ${{ secrets.PROD_SUPABASE_URL }}
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.PROD_SERVICE_KEY }}
```

---

## Environment-Specific Configuration

### Development

```env
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_URL=http://localhost:54321
```

### Staging

```env
# Set in Vercel (preview environment)
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tutor-staging.vercel.app
SUPABASE_URL=https://staging-xxxxx.supabase.co
```

### Production

```env
# Set in Vercel (production environment)
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tutorapp.com
SUPABASE_URL=https://prod-xxxxx.supabase.co
```

---

## Security Best Practices

### DO

✅ Use `.env.local` for local development
✅ Add `.env.local` to `.gitignore`
✅ Use `NEXT_PUBLIC_*` only for truly public data
✅ Store secrets in Vercel/EAS, not in code
✅ Rotate API keys regularly (every 90 days)
✅ Use different keys for dev/staging/prod
✅ Document required variables in `.env.example`

### DON'T

❌ Commit `.env.local` files
❌ Hardcode secrets in code
❌ Use production secrets in development
❌ Expose service role keys to client
❌ Share secrets via Slack/email
❌ Use same secrets across environments
❌ Leave unused secrets in place

---

## Secret Rotation

### Rotation Schedule

| Secret Type | Frequency | Process |
|-------------|-----------|---------|
| **API Keys** | Every 90 days | Manual, triggered by calendar |
| **JWT Secrets** | Yearly | Coordinate with Supabase support |
| **Webhook Secrets** | On compromise | Immediate via service dashboard |
| **Database Credentials** | Never (managed by Supabase) | N/A |

### Rotation Process

```bash
# 1. Generate new key in service dashboard
# (e.g., Lemon Squeezy, Resend)

# 2. Update in all environments
vercel env rm RESEND_API_KEY production
vercel env add RESEND_API_KEY production  # Enter new key

eas secret:delete --name RESEND_API_KEY
eas secret:create --scope project --name RESEND_API_KEY --value new_key

# 3. Update GitHub Secrets
# (via repository settings)

# 4. Deploy applications to pick up new keys
vercel --prod
eas update --auto

# 5. Verify services still work
# 6. Delete old keys from service dashboard
```

---

## Troubleshooting

### Environment Variable Not Loading

**Problem:** `process.env.MY_VAR` is `undefined`

**Solutions:**
1. Check variable is in `.env.local`
2. Restart development server
3. Verify variable name (case-sensitive)
4. Check Turborepo configuration includes it
5. For browser access, ensure it has `NEXT_PUBLIC_` prefix

### Different Values in Development vs Production

**Problem:** Works locally, fails in production

**Solutions:**
1. Check Vercel environment variables are set
2. Verify correct environment scope (production vs preview)
3. Check for typos in variable names
4. Redeploy application after adding variables

### Mobile App Can't Access Variables

**Problem:** `process.env.EXPO_PUBLIC_*` is `undefined`

**Solutions:**
1. Ensure variable starts with `EXPO_PUBLIC_`
2. Check EAS secrets are set
3. Rebuild app (not just OTA update)
4. Verify variable in `eas.json` if needed

---

## Complete Variable Reference

See `.env.example` for the complete, up-to-date list of all required environment variables.

**Critical Variables:**
- `SUPABASE_URL` - Database connection
- `SUPABASE_SERVICE_ROLE_KEY` - Admin database access
- `NEXT_PUBLIC_API_URL` - API endpoint for web app
- `EXPO_PUBLIC_API_URL` - API endpoint for mobile app

---

For related documentation:
- [Local Development Setup](./local_development_setup.md) - Initial environment setup
- [Deployment Strategy](./deployment_strategy.md) - Production environment configuration
- [Security Model](./security_model.md) - Security best practices
