# Data Model

**Last Updated:** 2026-01-03

This document describes the database schema, entity relationships, and data modeling decisions.

---

## Overview

The platform uses **PostgreSQL** (via Supabase) with **Drizzle ORM** for type-safe database interactions.

**Key Principles:**
- **Type safety**: Drizzle schema generates TypeScript types
- **Single-tenant (v1)**: All tables include `organization_id` for future multi-tenancy
- **Row Level Security**: Database-level authorization enforcement
- **Soft deletes**: Critical data marked as deleted, not removed

---

## Core Entities

### Entity Relationship Diagram

```
┌─────────────────┐
│  organizations  │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐       ┌─────────────────┐
│     users       │◀──────│   auth.users    │ (Supabase Auth)
└────────┬────────┘  1:1  └─────────────────┘
         │
         ├─────────────────────────┐
         │ 1:N                     │ 1:N
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│     tutors      │       │    students     │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:N                     │ 1:N
         │          sessions       │
         └──────────►│◄────────────┘
                     │
                     │ 1:N
                     ▼
            ┌─────────────────┐
            │     reviews     │
            └─────────────────┘

┌─────────────────┐
│    payments     │
└────────┬────────┘
         │ N:1
         ▼
┌─────────────────┐
│ subscriptions   │
└─────────────────┘
```

---

## Table Schemas

### 1. **organizations**

**Purpose**: Multi-tenancy support (prepared for v2)

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `name` | TEXT | NOT NULL | Organization name |
| `created_at` | TIMESTAMP | NOT NULL | Default: `CURRENT_TIMESTAMP` |
| `updated_at` | TIMESTAMP | NOT NULL | Auto-updated on change |

**v1 Behavior:**
- Single default organization: `00000000-0000-0000-0000-000000000001`
- All records reference this organization
- Future: Supports multiple organizations with isolated data

---

### 2. **users**

**Purpose**: User profile data (extends Supabase auth.users)

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | References `auth.users(id)` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `email` | TEXT | UNIQUE, NOT NULL | From auth.users |
| `full_name` | TEXT | NOT NULL | Display name |
| `avatar_url` | TEXT | NULLABLE | Profile picture |
| `phone` | TEXT | NULLABLE | Contact number |
| `timezone` | TEXT | NOT NULL | Default: 'UTC' |
| `locale` | TEXT | NOT NULL | Default: 'en' |
| `created_at` | TIMESTAMP | NOT NULL | Account creation time |
| `updated_at` | TIMESTAMP | NOT NULL | Last profile update |

**RLS Policies:**
```sql
-- Users can view and update their own profile only
CREATE POLICY "users_select_own" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id);
```

---

### 3. **tutors**

**Purpose**: Tutor-specific profile data

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `user_id` | UUID | FOREIGN KEY, UNIQUE | References `users(id)` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `bio` | TEXT | NULLABLE | Professional background |
| `subjects` | TEXT[] | NOT NULL | Array of subjects (e.g., ['Math', 'Physics']) |
| `qualifications` | TEXT | NULLABLE | Education, certifications |
| `hourly_rate` | DECIMAL(10,2) | NOT NULL | USD per hour |
| `availability` | JSONB | NULLABLE | Weekly schedule |
| `is_active` | BOOLEAN | NOT NULL | Default: true |
| `search_vector` | TSVECTOR | GENERATED | For full-text search |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Indexes:**
- GIN index on `search_vector` for full-text search
- Index on `is_active` for filtering

**RLS Policies:**
```sql
-- Anyone can view active tutors
CREATE POLICY "tutors_select_active" ON tutors FOR SELECT USING (is_active = true);

-- Tutors can update their own profile
CREATE POLICY "tutors_update_own" ON tutors FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### 4. **students**

**Purpose**: Student-specific profile data

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `user_id` | UUID | FOREIGN KEY, UNIQUE | References `users(id)` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `grade_level` | TEXT | NULLABLE | e.g., "9th Grade", "College" |
| `learning_goals` | TEXT | NULLABLE | Student's objectives |
| `parent_email` | TEXT | NULLABLE | For minors |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**RLS Policies:**
```sql
-- Students can view and update their own profile
CREATE POLICY "students_select_own" ON students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "students_update_own" ON students FOR UPDATE
  USING (auth.uid() = user_id);
```

---

### 5. **sessions**

**Purpose**: Tutoring session bookings and history

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `tutor_id` | UUID | FOREIGN KEY | References `tutors(id)` |
| `student_id` | UUID | FOREIGN KEY | References `students(id)` |
| `subject` | TEXT | NOT NULL | Session topic |
| `start_time` | TIMESTAMP | NOT NULL | Session start (UTC) |
| `end_time` | TIMESTAMP | NOT NULL | Session end (UTC) |
| `duration_minutes` | INTEGER | NOT NULL | Duration in minutes |
| `status` | TEXT | NOT NULL | 'scheduled', 'completed', 'cancelled', 'no_show' |
| `location` | TEXT | NULLABLE | Physical or virtual (Zoom link) |
| `notes` | TEXT | NULLABLE | Session notes (private) |
| `session_notes` | TEXT | NULLABLE | Post-session summary |
| `created_at` | TIMESTAMP | NOT NULL | Booking time |
| `updated_at` | TIMESTAMP | NOT NULL | Last status change |
| `cancelled_at` | TIMESTAMP | NULLABLE | Cancellation time |
| `cancelled_by` | UUID | NULLABLE | Who cancelled (user_id) |
| `cancellation_reason` | TEXT | NULLABLE | Reason for cancellation |

**Indexes:**
- Index on `(tutor_id, start_time)` for tutor schedule queries
- Index on `(student_id, start_time)` for student session list
- Index on `status` for filtering

**RLS Policies:**
```sql
-- Tutors and students can view their own sessions
CREATE POLICY "sessions_select_own" ON sessions FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM tutors WHERE id = tutor_id
      UNION
      SELECT user_id FROM students WHERE id = student_id
    )
  );

-- Only tutors can create sessions
CREATE POLICY "sessions_insert_tutor" ON sessions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tutors
      WHERE tutors.user_id = auth.uid()
      AND tutors.id = sessions.tutor_id
    )
  );
```

---

### 6. **reviews**

**Purpose**: Session ratings and feedback

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `session_id` | UUID | FOREIGN KEY, UNIQUE | References `sessions(id)` |
| `reviewer_id` | UUID | FOREIGN KEY | User who left review |
| `reviewee_id` | UUID | FOREIGN KEY | User being reviewed |
| `rating` | INTEGER | CHECK (1-5) | Star rating |
| `comment` | TEXT | NULLABLE | Written feedback |
| `is_visible` | BOOLEAN | NOT NULL | Default: true (for moderation) |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**Constraints:**
- One review per session
- Rating must be 1-5

**RLS Policies:**
```sql
-- Anyone can view visible reviews
CREATE POLICY "reviews_select_visible" ON reviews FOR SELECT
  USING (is_visible = true);

-- Session participants can create reviews
CREATE POLICY "reviews_insert_participant" ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_id
      AND (s.tutor_id = reviewee_id OR s.student_id = reviewee_id)
      AND s.status = 'completed'
    )
  );
```

---

### 7. **payments**

**Purpose**: Payment transaction records

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `user_id` | UUID | FOREIGN KEY | References `users(id)` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `lemon_squeezy_id` | TEXT | UNIQUE | External payment ID |
| `amount` | DECIMAL(10,2) | NOT NULL | Amount in USD |
| `currency` | TEXT | NOT NULL | Default: 'USD' |
| `status` | TEXT | NOT NULL | 'pending', 'succeeded', 'failed', 'refunded' |
| `payment_method` | TEXT | NULLABLE | e.g., 'card', 'paypal' |
| `description` | TEXT | NULLABLE | Payment description |
| `metadata` | JSONB | NULLABLE | Additional data from Lemon Squeezy |
| `created_at` | TIMESTAMP | NOT NULL | |

**RLS Policies:**
```sql
-- Users can only view their own payments
CREATE POLICY "payments_select_own" ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- No INSERT/UPDATE/DELETE for users (only via webhooks)
```

---

### 8. **subscriptions**

**Purpose**: Subscription plan management

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PRIMARY KEY | Default: `gen_random_uuid()` |
| `user_id` | UUID | FOREIGN KEY | References `users(id)` |
| `organization_id` | UUID | FOREIGN KEY | References `organizations(id)` |
| `lemon_squeezy_id` | TEXT | UNIQUE | External subscription ID |
| `plan_name` | TEXT | NOT NULL | e.g., 'Pro', 'Basic' |
| `status` | TEXT | NOT NULL | 'active', 'cancelled', 'expired', 'paused' |
| `current_period_start` | TIMESTAMP | NOT NULL | Billing period start |
| `current_period_end` | TIMESTAMP | NOT NULL | Billing period end |
| `cancel_at_period_end` | BOOLEAN | NOT NULL | Default: false |
| `metadata` | JSONB | NULLABLE | Additional data |
| `created_at` | TIMESTAMP | NOT NULL | |
| `updated_at` | TIMESTAMP | NOT NULL | |

**RLS Policies:**
```sql
-- Users can only view their own subscription
CREATE POLICY "subscriptions_select_own" ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
```

---

## Data Relationships

### One-to-One

- `users` ↔ `tutors` (a user can be a tutor)
- `users` ↔ `students` (a user can be a student)
- `sessions` ↔ `reviews` (one review per session)

**Note**: A user can be both a tutor AND a student (separate records in both tables)

### One-to-Many

- `organizations` → `users` (one org has many users)
- `tutors` → `sessions` (one tutor has many sessions)
- `students` → `sessions` (one student has many sessions)
- `users` → `payments` (one user has many payments)
- `users` → `subscriptions` (one user has many subscriptions over time)

### Many-to-Many

**Currently**: None

**Future**:
- `tutors` ↔ `subjects` (if subjects become a separate table)
- `sessions` ↔ `tags` (for categorization)

---

## Data Integrity Constraints

### Foreign Keys

All foreign keys use `ON DELETE CASCADE` or `ON DELETE SET NULL`:

| Relationship | Delete Behavior | Reason |
|-------------|-----------------|--------|
| `users.id` → `tutors.user_id` | CASCADE | Delete tutor profile if user deleted |
| `users.id` → `students.user_id` | CASCADE | Delete student profile if user deleted |
| `sessions.tutor_id` → `tutors.id` | RESTRICT | Cannot delete tutor with sessions |
| `sessions.student_id` → `students.id` | RESTRICT | Cannot delete student with sessions |
| `reviews.session_id` → `sessions.id` | CASCADE | Delete reviews if session deleted |

### Check Constraints

```sql
-- Sessions must have valid times
ALTER TABLE sessions
  ADD CONSTRAINT sessions_time_check
  CHECK (end_time > start_time);

-- Ratings must be 1-5
ALTER TABLE reviews
  ADD CONSTRAINT reviews_rating_check
  CHECK (rating >= 1 AND rating <= 5);

-- Payment amounts must be positive
ALTER TABLE payments
  ADD CONSTRAINT payments_amount_check
  CHECK (amount > 0);
```

---

## Indexes & Performance

### Primary Indexes

- All `id` columns (PRIMARY KEY automatically indexed)
- `users.email` (UNIQUE automatically indexed)

### Secondary Indexes

```sql
-- Search indexes
CREATE INDEX tutors_search_idx ON tutors USING GIN(search_vector);

-- Query performance indexes
CREATE INDEX sessions_tutor_time_idx ON sessions(tutor_id, start_time DESC);
CREATE INDEX sessions_student_time_idx ON sessions(student_id, start_time DESC);
CREATE INDEX sessions_status_idx ON sessions(status) WHERE status = 'scheduled';

-- Foreign key indexes (for JOIN performance)
CREATE INDEX payments_user_idx ON payments(user_id);
CREATE INDEX subscriptions_user_idx ON subscriptions(user_id);
```

---

## Full-Text Search

### Search Vector Generation

```sql
-- Auto-update search vector on INSERT/UPDATE
CREATE OR REPLACE FUNCTION tutors_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.subjects::text,'')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.bio,'')), 'C') ||
    setweight(to_tsvector('english', coalesce(NEW.qualifications,'')), 'D');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tutors_search_update
  BEFORE INSERT OR UPDATE ON tutors
  FOR EACH ROW
  EXECUTE FUNCTION tutors_search_trigger();
```

### Search Query

```typescript
// packages/api/src/routers/tutors.ts
export const tutorsRouter = router({
  search: publicProcedure
    .input(z.object({ query: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(tutors)
        .where(
          sql`search_vector @@ plainto_tsquery('english', ${input.query})`
        )
        .orderBy(
          sql`ts_rank(search_vector, plainto_tsquery('english', ${input.query})) DESC`
        );
    }),
});
```

---

## Migrations Strategy

### Migration Files Location

```
packages/database/src/migrations/
├── 0000_initial_schema.sql
├── 0001_add_organizations.sql
├── 0002_add_search_vectors.sql
└── ...
```

### Migration Workflow

```bash
# 1. Modify schema in packages/database/src/schema/
# 2. Generate migration
pnpm --filter @repo/database db:generate

# 3. Review generated SQL
# 4. Apply locally
pnpm --filter @repo/database db:migrate

# 5. Commit migration file
git add packages/database/src/migrations/*
git commit -m "migration: add full-text search to tutors"

# 6. CI/CD applies to production automatically
```

---

## Seed Data (Development)

### Default Organization

```typescript
const DEFAULT_ORG_ID = '00000000-0000-0000-0000-000000000001';

await db.insert(organizations).values({
  id: DEFAULT_ORG_ID,
  name: 'Default Organization',
});
```

**CRITICAL**: Organization must be created first before any other data.

### Sample Data

- 5 tutors (Math, English, Science, History, Music)
- 10 students
- 20 sessions (past and upcoming)
- Sample reviews and payments

---

## Future Schema Enhancements

### Multi-Tenancy (v2)

```sql
-- Add organization membership table
CREATE TABLE user_organizations (
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  role TEXT NOT NULL,  -- 'admin', 'tutor', 'student'
  PRIMARY KEY (user_id, organization_id)
);

-- Update RLS policies to check organization membership
```

### Advanced Features

```sql
-- Session tags (categorization)
CREATE TABLE session_tags (
  session_id UUID REFERENCES sessions(id),
  tag TEXT NOT NULL,
  PRIMARY KEY (session_id, tag)
);

-- Tutor availability schedules
CREATE TABLE tutor_availability (
  id UUID PRIMARY KEY,
  tutor_id UUID REFERENCES tutors(id),
  day_of_week INTEGER,  -- 0-6 (Sunday-Saturday)
  start_time TIME,
  end_time TIME
);

-- Messages between tutors and students
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  read_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL
);
```

---

For implementation details and Drizzle ORM examples, see:
- [Data Migration](./data_migration.md) - Database migration workflow
- [Local Development Setup](./local_development_setup.md) - Database setup commands
