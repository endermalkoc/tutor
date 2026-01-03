# Disaster Recovery

**Last Updated:** 2026-01-03

This document provides step-by-step procedures for recovering from various disaster scenarios.

---

## Overview

A disaster recovery plan ensures business continuity when critical failures occur.

**Key Metrics:**
- **RTO** (Recovery Time Objective): How quickly we can restore service
- **RPO** (Recovery Point Objective): How much data we can afford to lose

---

## Recovery Time/Point Objectives

| Service | RTO | RPO | Recovery Method |
|---------|-----|-----|-----------------|
| **Web apps** | < 5 min | 0 | Vercel rollback |
| **Mobile (OTA)** | < 5 min | 0 | EAS rollback |
| **Database** | < 15 min | Near-zero | Supabase PITR |
| **API** | < 5 min | 0 | Serverless auto-recovery |
| **Storage** | < 30 min | < 24 hours | S3 restore |

---

## Disaster Scenarios

### 1. Data Corruption Detected

**Severity:** 🔴 Critical

**Symptoms:**
- Incorrect data in database
- Reports of missing or wrong information
- Data validation errors

**Recovery Procedure:**

```
PHASE 1: IMMEDIATE (0-5 minutes)
├─ Enable maintenance mode
├─ Stop all background jobs
├─ Identify corruption timestamp
└─ Notify team via Slack #incidents

PHASE 2: ASSESSMENT (5-15 minutes)
├─ Determine scope of corruption
├─ Identify affected tables/records
├─ Check if PITR can restore
└─ Document findings

PHASE 3: RECOVERY (15-30 minutes)
├─ Use Supabase PITR to restore
├─ Create temporary staging database
└─ Run integration tests

PHASE 4: VERIFICATION (30-45 minutes)
├─ Compare critical records
├─ Check data integrity
└─ Run smoke tests

PHASE 5: RESTORATION (45-60 minutes)
├─ Swap database connection
├─ Remove maintenance mode
├─ Resume background jobs
└─ Monitor error rates

PHASE 6: POST-MORTEM (1-3 days)
├─ Document root cause
├─ Implement prevention
└─ Update runbook
```

**Commands:**

```bash
# 1. Enable maintenance mode (Vercel)
vercel env add MAINTENANCE_MODE true production

# 2. Stop Inngest jobs
# (via Inngest dashboard - pause all functions)

# 3. Restore database via PITR
# (via Supabase dashboard - Database → Backups → PITR)

# 4. Run integration tests
pnpm test:integration --env=staging

# 5. Update database URL in Vercel
vercel env add SUPABASE_URL <new-database-url> production

# 6. Redeploy
vercel --prod

# 7. Remove maintenance mode
vercel env rm MAINTENANCE_MODE production
```

---

### 2. Accidental Data Deletion

**Severity:** 🟠 High

**Symptoms:**
- User reports missing data
- Unexpected empty tables/records
- Deletion logs show large batch deletes

**Recovery Procedure:**

**Option A: Recent Deletion (< 7 days)**
```bash
# Use PITR to restore to just before deletion
# 1. Identify deletion timestamp from logs
# 2. Supabase Dashboard → PITR
# 3. Select timestamp 5 minutes before deletion
# 4. Restore to new project
# 5. Export deleted data
# 6. Import to production
```

**Option B: Export from Backup**
```bash
# 1. Find backup containing data
supabase db dump --db-url <backup-db> --data-only --table=<table>

# 2. Filter only deleted records
# (manually or via SQL)

# 3. Import back to production
psql $PROD_DB_URL < deleted_records.sql
```

**Time to Recover:** 15-30 minutes

---

### 3. Bad Migration Deployed

**Severity:** 🟠 High

**Symptoms:**
- Application errors after deployment
- Database schema mismatch errors
- Failed queries

**Recovery Procedure:**

**Option A: Rollback Application**
```bash
# 1. Rollback web app
vercel rollback <previous-deployment-url>

# 2. Rollback mobile OTA
# (via EAS dashboard - republish previous update)

# 3. Rollback database migration manually
# (write reverse SQL in Supabase SQL Editor)
```

**Option B: Fix Forward**
```bash
# 1. Create fix migration
pnpm --filter @repo/database db:generate

# 2. Apply locally and test
pnpm --filter @repo/database db:migrate

# 3. Deploy fix
git add packages/database/migrations/*
git commit -m "fix: correct migration issue"
git push
```

**Time to Recover:** 5-15 minutes (rollback) or 15-30 minutes (fix forward)

---

### 4. Supabase Outage

**Severity:** 🔴 Critical

**Symptoms:**
- Cannot connect to database
- API returning 500 errors
- Supabase status page shows incident

**Recovery Procedure:**

```
IMMEDIATE (0-5 minutes)
├─ Check https://status.supabase.com
├─ Display maintenance banner
└─ Update status page

COMMUNICATION (5-15 minutes)
├─ Post to Twitter/status page
├─ Email affected users (if > 30 min)
└─ Update every 30 minutes

MONITORING (Ongoing)
├─ Monitor Supabase status
├─ Track user reports
└─ Prepare communication

RECOVERY (When Supabase Restores)
├─ Run health checks
├─ Verify data integrity
├─ Resume normal operations
└─ Send recovery notification
```

**No action needed** - wait for Supabase to restore service.

**Time to Recover:** Dependent on Supabase (typically < 1 hour)

---

### 5. Complete Application Failure

**Severity:** 🔴 Critical

**Symptoms:**
- Website/app completely down
- All API requests failing
- Monitoring alerts firing

**Recovery Procedure:**

**Step 1: Identify Scope**
```bash
# Check if it's just one service or all
curl https://tutorapp.com/api/health
curl https://tutorapp.com

# Check Vercel status
https://www.vercel-status.com

# Check Supabase status
https://status.supabase.com
```

**Step 2: Quick Fixes**
```bash
# Rollback last deployment
vercel rollback

# Restart Supabase (if local issue)
supabase restart

# Check environment variables
vercel env ls
```

**Step 3: If Still Down**
```bash
# Deploy known-good version
git checkout <last-working-commit>
vercel --prod --force

# Or use Vercel dashboard to promote old deployment
```

**Time to Recover:** 5-10 minutes

---

### 6. Compromised Secrets

**Severity:** 🔴 Critical

**Symptoms:**
- Unauthorized access detected
- Suspicious API usage
- Security alert from service provider

**Recovery Procedure:**

```
IMMEDIATE (0-5 minutes)
├─ Revoke compromised secrets
├─ Block suspicious IPs
└─ Enable 2FA on all accounts

ROTATION (5-30 minutes)
├─ Generate new API keys
├─ Update Vercel secrets
├─ Update EAS secrets
├─ Update GitHub Secrets
└─ Redeploy applications

INVESTIGATION (30 minutes - 2 hours)
├─ Review access logs
├─ Identify breach source
├─ Document findings
└─ Report to security team

PREVENTION (1-3 days)
├─ Update security policies
├─ Implement additional controls
└─ Train team
```

**Commands:**
```bash
# 1. Revoke API keys (via service dashboards)

# 2. Generate new keys

# 3. Update Vercel
vercel env rm SUPABASE_SERVICE_ROLE_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# 4. Update EAS
eas secret:delete --name SUPABASE_SERVICE_ROLE_KEY
eas secret:create --scope project --name SUPABASE_SERVICE_ROLE_KEY

# 5. Update GitHub Secrets
# (via repository settings)

# 6. Redeploy
vercel --prod
eas update --auto
```

**Time to Recover:** 15-45 minutes

---

## Communication Plan

### Internal Communication

**Slack Channels:**
- `#incidents` - Real-time updates
- `#engineering` - Technical details
- `#leadership` - Executive updates

**Update Frequency:**
- Critical: Every 15 minutes
- High: Every 30 minutes
- Medium: Hourly

### External Communication

**Status Page:** (Future - setup status.io)

**Twitter/Social Media:**
```
Template:
"We're experiencing issues with [service].
Our team is investigating.
Updates: [status page link]"
```

**Email (if > 1 hour downtime):**
```
Subject: Service Disruption Update

We're currently experiencing technical difficulties
affecting [services]. Our team is actively working
to restore service.

Current Status: [description]
Expected Resolution: [timeframe]

We apologize for the inconvenience and will provide
updates every 30 minutes.
```

---

## Post-Incident Review

**Schedule:** Within 3 days of incident

**Participants:**
- Engineering lead
- Affected team members
- Optional: Product, Support

**Template:**

```markdown
# Post-Incident Review: [Incident Title]

**Date:** YYYY-MM-DD
**Severity:** Critical/High/Medium
**Duration:** X hours Y minutes

## Timeline
- HH:MM - Incident detected
- HH:MM - Team notified
- HH:MM - Root cause identified
- HH:MM - Fix deployed
- HH:MM - Service restored

## Impact
- Users affected: X
- Services down: [list]
- Data lost: None/[description]

## Root Cause
[Detailed explanation]

## Resolution
[What we did to fix it]

## Lessons Learned
### What Went Well
- [positive points]

### What Could Be Improved
- [areas for improvement]

## Action Items
- [ ] [Prevention measure]
- [ ] [Monitoring improvement]
- [ ] [Documentation update]
- [ ] [Team training]
```

---

## Prevention Measures

### Proactive Monitoring

- **Uptime monitoring** (Better Stack)
- **Error tracking** (Sentry)
- **Performance monitoring** (Vercel Analytics)
- **Database monitoring** (Supabase dashboard)

### Regular Testing

- **Backup restore tests**: Quarterly
- **Failover tests**: Bi-annually
- **Disaster recovery drills**: Annually

### Documentation

- **Runbooks** up to date
- **Contact list** current
- **Recovery procedures** tested

---

## Emergency Contacts

| Role | Responsibility | Contact |
|------|---------------|---------|
| **On-Call Engineer** | First responder | Slack #incidents |
| **Database Admin** | Database recovery | [contact] |
| **DevOps Lead** | Infrastructure | [contact] |
| **CTO** | Executive decisions | [contact] |

**External:**
- Supabase Support: support@supabase.com
- Vercel Support: support@vercel.com

---

## Recovery Checklist

**Immediate:**
- [ ] Identify issue severity
- [ ] Notify team (#incidents)
- [ ] Enable maintenance mode (if needed)
- [ ] Stop background jobs (if needed)

**Investigation:**
- [ ] Determine root cause
- [ ] Assess scope and impact
- [ ] Identify affected users
- [ ] Document findings

**Recovery:**
- [ ] Execute recovery procedure
- [ ] Test in staging first
- [ ] Apply to production
- [ ] Verify service restored

**Post-Recovery:**
- [ ] Monitor for issues
- [ ] Communicate resolution
- [ ] Schedule post-mortem
- [ ] Update runbook

---

For related documentation:
- [Backup](./backup.md) - Backup procedures and testing
- [Monitoring & Observability](./monitoring_observability.md) - Incident detection
- [Deployment Strategy](./deployment_strategy.md) - Rollback procedures
