# Backup

**Last Updated:** 2026-01-03

This document explains the backup strategy, procedures, and testing for database and application data.

---

## Overview

We use **automated** and **manual** backup strategies to ensure data can be recovered in case of failure or corruption.

**Backup Types:**
- **Automated daily backups** (Supabase)
- **Point-in-Time Recovery** (PITR)
- **Manual pre-migration backups**
- **Code backups** (Git)

---

## Automated Database Backups

### Supabase Automated Backups

**Configuration:**
- **Frequency**: Daily at 02:00 UTC
- **Retention**:
  - Free tier: 7 days
  - Pro tier: 7 days (with PITR)
  - Team tier: 30 days
- **Type**: Full PostgreSQL database dumps
- **Location**: Supabase infrastructure (geo-redundant)

**Access Backups:**
1. Go to Supabase Dashboard
2. Project → Database → Backups
3. View list of available backups
4. Download or restore as needed

**No configuration required** - happens automatically!

---

## Point-in-Time Recovery (PITR)

**Available on:** Pro plan and above

**Capabilities:**
- Restore to any point within retention period
- Near-zero RPO (Recovery Point Objective)
- ~15 minute RTO (Recovery Time Objective)

**How to Use:**
1. Supabase Dashboard → Database → Backups
2. Click "Point in Time Recovery"
3. Select timestamp to restore to
4. Choose restoration target:
   - New project (safest)
   - Current project (overwrites)
5. Confirm and wait for restoration

**Use Cases:**
- Recover from accidental data deletion
- Rollback bad migration
- Restore before data corruption

---

## Manual Backups

### Pre-Migration Backups

**When:** Before every major database migration

**Script:** `packages/database/src/backup.ts`

```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';

const execAsync = promisify(exec);

async function backup() {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `backups/backup-${timestamp}.sql`;

  // Create backups directory
  await fs.mkdir('backups', { recursive: true });

  // Run pg_dump
  const { stdout, stderr } = await execAsync(
    `pg_dump ${process.env.DATABASE_URL} > ${filename}`
  );

  if (stderr) {
    console.error('Backup failed:', stderr);
    process.exit(1);
  }

  console.log(`✅ Backup created: ${filename}`);
}

backup().catch(console.error);
```

**Run Manually:**
```bash
# Before major migration
pnpm --filter @repo/database db:backup
```

**Output:** `packages/database/backups/backup-2026-01-03.sql`

---

## Backup Testing

### Quarterly Restore Test

**Schedule:** First Monday of each quarter

**Procedure:**
```bash
# 1. Download latest production backup
# (via Supabase dashboard)

# 2. Restore to staging database
supabase db restore --db-url $STAGING_DB_URL backups/latest.sql

# 3. Verify critical data
psql $STAGING_DB_URL -c "SELECT COUNT(*) FROM users;"
psql $STAGING_DB_URL -c "SELECT COUNT(*) FROM sessions;"
psql $STAGING_DB_URL -c "SELECT COUNT(*) FROM payments;"

# 4. Run integration tests
pnpm test:integration --env=staging

# 5. Run E2E tests
pnpm test:e2e --env=staging

# 6. Document results
echo "Backup restore test $(date): SUCCESS" >> backup-test-log.txt
```

**Success Criteria:**
- All tables present
- Row counts match expected values
- Tests pass
- Application can connect and query

---

## What We Backup

### Database (Supabase)

**Backed Up:**
- All tables and data
- Indexes
- Functions
- Triggers
- RLS policies

**NOT Backed Up Automatically:**
- Supabase Storage files (separate backup needed)
- API keys and secrets (stored in Vercel/EAS)

### Storage (Supabase Storage)

**Manual Backup Required:**

```bash
# Download all storage files
supabase storage download --recursive bucket-name local-backup/

# Or use S3-compatible tools
aws s3 sync s3://supabase-bucket local-backup/ --profile supabase
```

**Frequency:** Monthly (or before major changes)

### Code (Git)

**Automatic via GitHub:**
- All code pushed to GitHub is backed up
- GitHub provides redundancy
- No manual backup needed

**Best Practice:** Tag important releases
```bash
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### Configuration

**Backed Up in Git:**
- Environment variable templates (`.env.example`)
- Turborepo configuration
- Package configurations

**NOT in Git (stored in platforms):**
- Actual secret values (Vercel/EAS)
- GitHub Secrets

**Backup Method:** Document in secure password manager or vault

---

## Backup Retention Policy

| Data Type | Retention Period | Storage Location |
|-----------|-----------------|------------------|
| **Database (automated)** | 7-30 days | Supabase |
| **Database (manual)** | 90 days | Local/S3 |
| **Storage files** | 30 days | Local/S3 |
| **Code** | Forever | GitHub |
| **Secrets** | N/A | Password manager |

**Cleanup:**
```bash
# Delete backups older than 90 days
find packages/database/backups -name "backup-*.sql" -mtime +90 -delete
```

---

## Backup Security

### Encryption

**Database Backups:**
- Encrypted at rest by Supabase
- Downloaded backups should be encrypted locally:

```bash
# Encrypt backup before storing
gpg --symmetric --cipher-algo AES256 backup-2026-01-03.sql

# Decrypt when needed
gpg backup-2026-01-03.sql.gpg
```

### Access Control

**Who Can Access Backups:**
- Database admin role only
- Requires Supabase service role key
- 2FA required on Supabase account

**Storage:**
- Never commit backups to Git
- Store encrypted in secure location (S3 with access controls)
- Limit download access to authorized personnel

---

## Backup Checklist

### Daily (Automated)

- [ ] Automated Supabase backup runs (check logs)

### Weekly

- [ ] Verify latest backup exists in Supabase dashboard
- [ ] Check backup size is reasonable (not 0 bytes)

### Monthly

- [ ] Download and encrypt production backup
- [ ] Backup Supabase Storage files
- [ ] Verify backup restore test schedule

### Quarterly

- [ ] Perform full backup restore test
- [ ] Review backup retention policy
- [ ] Clean up old manual backups

### Before Major Changes

- [ ] Create manual backup
- [ ] Verify backup completed successfully
- [ ] Document backup location and timestamp

---

## Troubleshooting

### Backup Not Found

**Problem:** Expected backup missing in Supabase dashboard

**Solutions:**
- Check backup schedule (02:00 UTC daily)
- Verify Pro plan is active
- Contact Supabase support

### Backup Too Large

**Problem:** Backup file is huge, slow to download

**Solutions:**
- Use PITR instead of full backup for recovery
- Compress backup: `gzip backup.sql`
- Archive old data before backing up

### Restore Fails

**Problem:** `Error restoring backup`

**Solutions:**
- Check database is empty before restore
- Verify PostgreSQL version compatibility
- Try PITR instead of manual restore
- Contact Supabase support

---

## Recovery Scenarios

See [Disaster Recovery](./disaster_recovery.md) for detailed procedures:
- Accidental data deletion
- Bad migration rollback
- Database corruption
- Complete system failure

---

For related documentation:
- [Disaster Recovery](./disaster_recovery.md) - Recovery procedures
- [Data Migration](./data_migration.md) - Migration rollback using backups
- [Infrastructure](./infrastructure.md) - Backup infrastructure
