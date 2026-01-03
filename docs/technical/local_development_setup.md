# Local Development Setup

**Last Updated:** 2026-01-03

This document provides step-by-step instructions for setting up the development environment on your local machine.

---

## Prerequisites

### Required Software

```bash
Node.js 24.x
pnpm 10.x
Docker Desktop (required for local Supabase development)
Git
```

**Note:** Docker Desktop is essential for running `supabase start` locally, which provides PostgreSQL, Auth, Storage, and Realtime services.

### Installation

#### 1. Node.js & pnpm

```bash
# Install Node.js 24.x (via nvm recommended)
nvm install 24
nvm use 24

# Install pnpm globally
npm install -g pnpm@10

# Verify installations
node --version   # Should be v24.x.x
pnpm --version   # Should be 10.x.x
```

#### 2. Docker Desktop

- **macOS/Windows**: Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow [official installation guide](https://docs.docker.com/engine/install/)

**Verify:**
```bash
docker --version
docker ps  # Should not error
```

---

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd tutor
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

This will install dependencies for all apps and packages in the monorepo.

### 3. Install Supabase CLI

```bash
# Install globally
pnpm add -g supabase

# Verify installation
supabase --version
```

### 4. Start Local Supabase

```bash
# Start local Supabase services (PostgreSQL + Auth + Storage + Realtime)
supabase start
```

**Expected Output:**
```
API URL: http://localhost:54321
GraphQL URL: http://localhost:54321/graphql/v1
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
Inbucket URL: http://localhost:54324
JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save these values!** You'll need them for environment configuration.

### 5. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env.local
```

Update `.env.local` with the Supabase credentials from step 4:

```env
# Supabase (from `supabase start` output)
SUPABASE_URL=http://localhost:54321
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App URLs (local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/trpc
EXPO_PUBLIC_API_URL=http://localhost:3000/api/trpc
```

See [Environment Configuration](./environment_configuration.md) for complete list.

### 6. Run Database Migrations

```bash
# Apply all migrations to local database
pnpm --filter @repo/database db:migrate
```

This creates all tables, indexes, and constraints.

### 7. Seed Development Data

```bash
# Populate database with test data
pnpm --filter @repo/database db:seed
```

**⚠️ CRITICAL:** The seed script MUST create the default organization first before any other data.

**Seed Data Includes:**
- Default organization
- 5 sample tutors (Math, English, Science, History, Music)
- 10 sample students
- 20 upcoming and past sessions
- Sample payments and subscriptions

### 8. Start Development Servers

```bash
# Start all apps (marketing, web, mobile)
pnpm dev
```

**Or start individual apps:**
```bash
pnpm --filter marketing dev    # Marketing site only
pnpm --filter web dev          # Web app only
pnpm --filter mobile dev       # Mobile app only
```

---

## Local Services

When running locally via `pnpm dev`, the following services are available:

| Service | URL | Description |
|---------|-----|-------------|
| **Web App** | http://localhost:3000 | Main application |
| **Marketing Site** | http://localhost:3001 | Landing page |
| **Mobile App** | Expo DevClient | Scan QR code in terminal |
| **Supabase Studio** | http://localhost:54323 | Database management UI |
| **Inngest Dev Server** | http://localhost:8288 | Background jobs UI |

**Note:** Ensure these ports are available before starting development.

---

## Resetting Local Database

If you need to reset your local database to a clean state:

```bash
# Reset database to initial state
supabase db reset

# Re-run migrations and seed data
pnpm --filter @repo/database db:migrate
pnpm --filter @repo/database db:seed
```

**Warning:** This will delete ALL local data.

---

## Stopping Services

### Stop Development Servers

Press `Ctrl+C` in the terminal where `pnpm dev` is running.

### Stop Supabase

```bash
supabase stop
```

### Stop Inngest Dev Server

Press `Ctrl+C` in the Inngest terminal.

---

## Troubleshooting

### Port Already in Use

**Problem:** `Error: Port 3000 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Docker Not Running

**Problem:** `Cannot connect to the Docker daemon`

**Solution:**
- Ensure Docker Desktop is running
- On macOS/Windows: Check system tray for Docker icon
- On Linux: `sudo systemctl start docker`

### Supabase Won't Start

**Problem:** `Error starting Supabase`

**Solution:**
```bash
# Stop all Supabase services
supabase stop

# Remove all containers and volumes
docker compose down -v

# Start fresh
supabase start
```

### Migration Failures

**Problem:** `Error applying migration`

**Solution:**
```bash
# Check current migration status
pnpm --filter @repo/database db:status

# Reset database if needed
supabase db reset
pnpm --filter @repo/database db:migrate
```

### pnpm Install Fails

**Problem:** `ENOENT: no such file or directory`

**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove all node_modules
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Reinstall
pnpm install
```

---

## Development Workflow

### Typical Day-to-Day Flow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
pnpm install

# 3. Run migrations (if any new ones)
pnpm --filter @repo/database db:migrate

# 4. Start development
pnpm dev

# 5. Make changes, test, commit

# 6. Stop services when done
# Ctrl+C in terminals
```

### Working on Specific Features

```bash
# Database changes
pnpm --filter @repo/database db:generate  # Generate migration
pnpm --filter @repo/database db:migrate   # Apply locally

# API changes
pnpm --filter @repo/api test              # Run API tests

# Web app changes
pnpm --filter web dev                     # Start web app only

# Mobile app changes
pnpm --filter mobile dev                  # Start mobile app only
```

---

## IDE Setup

### VS Code (Recommended)

**Recommended Extensions:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- Expo Tools (for mobile development)

**Workspace Settings:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.workingDirectories": [
    "apps/web",
    "apps/mobile",
    "apps/marketing",
    "packages/*"
  ]
}
```

---

## Next Steps

After setup is complete:

1. **Explore the codebase:**
   - Read [Monorepo Structure](../plans/2026-01-03-monorepo-structure-design.md)
   - Review [Architecture Overview](./architecture_overview.md)

2. **Make your first change:**
   - Create a feature branch
   - Make changes
   - Run tests: `pnpm test`
   - Commit and push

3. **Learn the development workflow:**
   - [Data Migration](./data_migration.md) - Database changes
   - [Environment Configuration](./environment_configuration.md) - Environment variables
   - [CI/CD Pipeline](./ci_cd_pipeline.md) - Deployment process

---

## Common Commands Reference

```bash
# Install dependencies
pnpm install

# Start all apps
pnpm dev

# Run tests
pnpm test                      # All tests
pnpm test:e2e                  # E2E tests only

# Linting & formatting
pnpm lint                      # Lint all code
pnpm format                    # Format all code
pnpm type-check                # TypeScript check

# Database
pnpm db:generate               # Generate migration
pnpm db:migrate                # Apply migrations
pnpm db:seed                   # Seed data
pnpm db:studio                 # Open Supabase Studio

# Build
pnpm build                     # Build all apps

# Clean
pnpm clean                     # Remove build artifacts
```

---

For more details, see:
- [Data Migration](./data_migration.md) - Managing database changes
- [Environment Configuration](./environment_configuration.md) - Environment setup
- [Testing Strategy](./testing_strategy.md) - Running tests
