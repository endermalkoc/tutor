# Tutor Management Platform

A modern SaaS platform for tutoring businesses to manage students, sessions, and payments.

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Web**: Next.js 16, Tailwind CSS, shadcn/ui
- **Mobile**: Expo (React Native), Expo Router
- **API**: tRPC, Zod validation
- **Database**: Supabase (PostgreSQL), Drizzle ORM
- **Auth**: Supabase Auth
- **Payments**: Lemon Squeezy
- **Email**: Resend + React Email
- **Background Jobs**: Inngest

## Prerequisites

- Node.js 24+
- pnpm 10+
- Docker (for local Supabase)

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd tutor/src
pnpm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see comments in the file).

### 3. Start local Supabase

```bash
pnpm supabase start
```

Copy the output credentials to your `.env.local`.

### 4. Run database migrations

```bash
pnpm db:migrate
pnpm db:seed  # Optional: seed with sample data
```

### 5. Start development servers

```bash
pnpm dev
```

This starts:
- Web app: http://localhost:3000
- Marketing site: http://localhost:3001
- Mobile: Expo DevClient

## Project Structure

```
src/
├── apps/
│   ├── marketing/     # Marketing site (Next.js)
│   ├── web/           # Main web app (Next.js)
│   └── mobile/        # Mobile app (Expo)
├── packages/
│   ├── api/           # tRPC routers
│   ├── database/      # Drizzle schema & migrations
│   ├── email/         # React Email templates
│   ├── constants/     # Shared types & validation
│   ├── config/        # Shared configs (TS, ESLint, etc.)
│   └── e2e/           # Playwright E2E tests
└── supabase/          # Supabase config & migrations
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all code |
| `pnpm format` | Format all code with Prettier |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm clean` | Remove build artifacts |

### Database Commands

| Command | Description |
|---------|-------------|
| `pnpm db:generate` | Generate migrations from schema |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:seed` | Seed development data |
| `pnpm db:studio` | Open Drizzle Studio |

## Development

### Adding a new package

1. Create folder in `packages/`
2. Add `package.json` with `name: "@repo/package-name"`
3. Reference from other packages: `"@repo/package-name": "workspace:*"`

### Running specific apps

```bash
pnpm --filter web dev      # Only web app
pnpm --filter mobile dev   # Only mobile app
```

## Deployment

- **Web apps**: Deployed via Vercel
- **Mobile**: Built via EAS, distributed via App Store / Google Play
- **Database**: Hosted on Supabase

See `docs/technical/deployment_strategy.md` for details.

## License

Private - All rights reserved
