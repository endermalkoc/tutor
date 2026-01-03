# Data Migration

**Last Updated:** 2026-01-03

This document explains how to create, test, and deploy database schema changes using Drizzle ORM migrations.

---

## Overview

We use **Drizzle ORM** for type-safe database migrations. Migrations are automatically generated from schema changes and applied via CI/CD.

**Key Principles:**
- Schema is the source of truth
- Migrations are auto-generated
- Test locally before pushing
- CI/CD applies to staging then production

---

## Migration Workflow

### Step-by-Step Process

```
1. Modify Schema
   ↓
2. Generate Migration
   ↓
3. Review Generated SQL
   ↓
4. Apply Locally
   ↓
5. Test Changes
   ↓
6. Commit Migration File
   ↓
7. CI/CD Auto-Applies
```

---

## 1. Modify Schema

Edit files in `packages/database/src/schema/`:

```typescript
// packages/database/src/schema/sessions.ts
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tutorId: uuid('tutor_id').notNull(),
  studentId: uuid('student_id').notNull(),
  subject: text('subject').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  duration: integer('duration_minutes').notNull(), // NEW FIELD
  status: text('status').notNull(),
  // ... other fields
});
```

---

## 2. Generate Migration

```bash
# Generate migration from schema changes
pnpm --filter @repo/database db:generate
```

**What This Does:**
- Compares current schema with database state
- Generates SQL migration file
- Creates file in `packages/database/src/migrations/`

**Output:**
```
✔ Generated migration: 0003_add_duration_to_sessions.sql
```

---

## 3. Review Generated SQL

**Always review the generated migration file!**

```bash
# Location
packages/database/src/migrations/0003_add_duration_to_sessions.sql
```

**Example Migration:**
```sql
-- Migration: 0003_add_duration_to_sessions
-- Created: 2026-01-03

ALTER TABLE sessions ADD COLUMN duration_minutes INTEGER NOT NULL DEFAULT 60;
```

**Check For:**
- Correctness (does it match your intent?)
- Data loss risks (dropping columns?)
- Default values for NOT NULL columns
- Index creation for new columns
- Foreign key constraints

---

## 4. Apply Locally

```bash
# Apply migration to local database
pnpm --filter @repo/database db:migrate
```

**What This Does:**
- Runs all pending migrations
- Updates `__drizzle_migrations` table
- Applies changes to local PostgreSQL

**Expected Output:**
```
✔ Applying migration: 0003_add_duration_to_sessions.sql
✔ Migration applied successfully
```

---

## 5. Test Changes

### Verify Schema

```bash
# Open Supabase Studio
pnpm db:studio

# Or connect via psql
psql postgresql://postgres:postgres@localhost:54322/postgres
```

### Test Queries

```typescript
// packages/database/src/__tests__/sessions.test.ts
import { db } from '../client';
import { sessions } from '../schema';

test('can insert session with duration', async () => {
  const [session] = await db.insert(sessions).values({
    tutorId: 'tutor-123',
    studentId: 'student-456',
    subject: 'Math',
    startTime: new Date(),
    endTime: new Date(),
    duration: 60, // NEW FIELD
    status: 'scheduled',
  }).returning();

  expect(session.duration).toBe(60);
});
```

### Reseed Database

```bash
# Reset and reseed to test with fresh data
supabase db reset
pnpm --filter @repo/database db:seed
```

---

## 6. Commit Migration File

```bash
# Add migration file
git add packages/database/src/migrations/0003_add_duration_to_sessions.sql

# Also add schema changes
git add packages/database/src/schema/sessions.ts

# Commit with descriptive message
git commit -m "migration: add duration field to sessions table"

# Push to GitHub
git push
```

**Commit Message Format:**
```
migration: <description>

- What changed
- Why it changed
- Any breaking changes or data impacts
```

---

## 7. CI/CD Auto-Applies

When you merge to `main`, GitHub Actions automatically:

```yaml
jobs:
  migrate-staging:
    - Apply migration to staging database
    - Run integration tests
    - If successful, proceed

  migrate-production:
    - Apply migration to production database
    - Verify success
    - Deploy application code
```

**See:** [CI/CD Pipeline](./ci_cd_pipeline.md) for details

---

## Common Migration Scenarios

### Adding a Column

```typescript
// Add optional column (safe)
export const tutors = pgTable('tutors', {
  // ... existing fields
  bio: text('bio'), // Nullable - safe to add
});

// Add required column (needs default)
export const tutors = pgTable('tutors', {
  // ... existing fields
  isActive: boolean('is_active').notNull().default(true),
});
```

**Generated SQL:**
```sql
-- Safe: nullable column
ALTER TABLE tutors ADD COLUMN bio TEXT;

-- Safe: NOT NULL with default
ALTER TABLE tutors ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
```

### Removing a Column

```typescript
// 1. Make column nullable first (separate migration)
export const tutors = pgTable('tutors', {
  oldField: text('old_field'), // Was .notNull()
});

// 2. Deploy code that doesn't use field

// 3. Remove from schema (new migration)
export const tutors = pgTable('tutors', {
  // oldField removed
});
```

**Why Two Steps?**
- Allows rollback if needed
- Prevents data loss
- Code can handle both states

### Renaming a Column

```typescript
// DON'T use Drizzle rename - do manual migration:

// 1. Add new column
ALTER TABLE tutors ADD COLUMN new_name TEXT;

// 2. Copy data
UPDATE tutors SET new_name = old_name;

// 3. Update code to use new_name

// 4. Drop old column (after deploy)
ALTER TABLE tutors DROP COLUMN old_name;
```

### Adding an Index

```typescript
// packages/database/src/schema/sessions.ts
import { index } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  // ... fields
}, (table) => ({
  tutorTimeIdx: index('sessions_tutor_time_idx')
    .on(table.tutorId, table.startTime),
}));
```

**Generated SQL:**
```sql
CREATE INDEX sessions_tutor_time_idx ON sessions(tutor_id, start_time);
```

---

## Migration Safety Checklist

Before generating migration:
- [ ] Schema changes are backwards compatible
- [ ] New NOT NULL columns have defaults
- [ ] No data loss from column removals
- [ ] Indexes added for new foreign keys

Before committing:
- [ ] Migration file reviewed
- [ ] Applied and tested locally
- [ ] Seed data works with changes
- [ ] Tests pass

Before deploying:
- [ ] Migration tested on staging
- [ ] No breaking changes for current code
- [ ] Rollback plan documented

---

## Rollback Strategies

### Scenario 1: Migration Not Yet Applied

```bash
# Simply don't commit the migration file
git reset HEAD packages/database/src/migrations/0003_*.sql

# Or revert the commit
git revert <commit-hash>
```

### Scenario 2: Applied Locally, Not Pushed

```bash
# Reset local database
supabase db reset

# Re-apply all migrations except the bad one
# (remove the migration file first)
pnpm --filter @repo/database db:migrate
```

### Scenario 3: Applied in Production

**Manual Rollback via Supabase SQL Editor:**

```sql
-- 1. Write reverse migration
ALTER TABLE sessions DROP COLUMN duration_minutes;

-- 2. Delete migration record
DELETE FROM __drizzle_migrations
WHERE name = '0003_add_duration_to_sessions';
```

**OR Use Point-in-Time Recovery:**
- Go to Supabase dashboard
- Database → Backups
- Restore to time before migration

---

## Migration Commands Reference

```bash
# Development
pnpm --filter @repo/database db:generate  # Generate migration
pnpm --filter @repo/database db:migrate   # Apply migrations
pnpm --filter @repo/database db:push      # Push schema (dev only, no migration files)
pnpm --filter @repo/database db:studio    # Open database UI

# Check migration status
pnpm --filter @repo/database db:status    # See pending migrations

# Production (via CI/CD)
# Migrations applied automatically on deploy
```

---

## Troubleshooting

### Migration Generation Fails

**Problem:** `No schema changes detected`

**Solution:**
- Ensure schema files are saved
- Check TypeScript types are correct
- Try `pnpm --filter @repo/database db:generate --force`

### Migration Conflicts

**Problem:** `Migration already exists`

**Solution:**
```bash
# Check migration status
pnpm --filter @repo/database db:status

# If duplicate, delete and regenerate
rm packages/database/src/migrations/0003_*.sql
pnpm --filter @repo/database db:generate
```

### Foreign Key Errors

**Problem:** `violates foreign key constraint`

**Solution:**
- Ensure referenced table/column exists
- Add foreign key constraint AFTER data migration
- Use `DEFERRABLE INITIALLY DEFERRED` for circular dependencies

---

## Best Practices

### DO

✅ Always review generated SQL
✅ Test migrations locally first
✅ Use descriptive migration names
✅ Add comments for complex migrations
✅ Keep migrations small and focused
✅ Document breaking changes
✅ Back up before major migrations

### DON'T

❌ Edit old migration files
❌ Skip migration file review
❌ Deploy migrations without testing
❌ Drop columns without data migration
❌ Use `db:push` in production
❌ Manually edit database in production
❌ Rush complex migrations

---

For related documentation:
- [Data Model](./data_model.md) - Database schema design
- [Deployment Strategy](./deployment_strategy.md) - How migrations are deployed
- [Backup](./backup.md) - Database backup procedures
- [Disaster Recovery](./disaster_recovery.md) - Recovery from bad migrations
