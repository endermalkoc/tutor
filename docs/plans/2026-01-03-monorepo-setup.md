# Monorepo Setup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create complete Turborepo monorepo structure with all apps, packages, and initial configurations.

**Architecture:** Turborepo + pnpm workspaces managing 3 apps (marketing, web, mobile) and 5 packages (api, database, ui, config, e2e). Type-safe development with tRPC, Drizzle ORM, and shared UI components.

**Tech Stack:** Turborepo, pnpm, Next.js 14, Expo, tRPC, Drizzle, Supabase, shadcn/ui, Vitest, Playwright

---

## Task 1: Create Root Configuration Files

**Files:**
- Create: `turbo.json`
- Create: `pnpm-workspace.yaml`
- Modify: `package.json`
- Create: `.gitignore`
- Create: `.env.example`

**Step 1: Create turbo.json**

Create the Turborepo configuration:

```bash
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".expo/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test:e2e": {
      "dependsOn": ["build"],
      "cache": false
    },
    "lint": {
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "cache": true
    },
    "clean": {
      "cache": false
    }
  }
}
EOF
```

**Step 2: Create pnpm-workspace.yaml**

```bash
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF
```

**Step 3: Create/update root package.json**

```bash
cat > package.json << 'EOF'
{
  "name": "tutor-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "clean": "turbo clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^1.11.0",
    "typescript": "^5.3.0"
  },
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.x",
    "pnpm": ">=8.x"
  }
}
EOF
```

**Step 4: Create comprehensive .gitignore**

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.lcov
.nyc_output

# Production builds
.next/
out/
dist/
build/
.expo/
.expo-shared/

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Misc
.DS_Store
*.pem
.turbo

# Environment variables
.env
.env*.local
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db

# Playwright
test-results/
playwright-report/
playwright/.cache/
EOF
```

**Step 5: Create .env.example**

```bash
cat > .env.example << 'EOF'
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# Sentry
SENTRY_DSN=

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/trpc
NEXT_PUBLIC_MARKETING_URL=http://localhost:3001
EOF
```

**Step 6: Commit root configuration**

```bash
git add turbo.json pnpm-workspace.yaml package.json .gitignore .env.example
git commit -m "chore: add root monorepo configuration files"
```

---

## Task 2: Create Directory Structure

**Files:**
- Create directories for all apps and packages

**Step 1: Create app directories**

```bash
mkdir -p apps/marketing/src/app
mkdir -p apps/marketing/src/components
mkdir -p apps/marketing/src/styles
mkdir -p apps/marketing/public
mkdir -p apps/marketing/e2e

mkdir -p apps/web/src/app
mkdir -p apps/web/src/components
mkdir -p apps/web/src/lib
mkdir -p apps/web/src/styles
mkdir -p apps/web/public
mkdir -p apps/web/__tests__
mkdir -p apps/web/e2e

mkdir -p apps/mobile/src/app
mkdir -p apps/mobile/src/components
mkdir -p apps/mobile/src/lib
mkdir -p apps/mobile/assets
mkdir -p apps/mobile/__tests__
```

**Step 2: Create package directories**

```bash
mkdir -p packages/api/src/routers
mkdir -p packages/api/__tests__

mkdir -p packages/database/src/schema
mkdir -p packages/database/src/migrations
mkdir -p packages/database/__tests__

mkdir -p packages/ui/src/components
mkdir -p packages/ui/src/hooks
mkdir -p packages/ui/src/lib
mkdir -p packages/ui/__tests__

mkdir -p packages/config/eslint
mkdir -p packages/config/typescript
mkdir -p packages/config/tailwind

mkdir -p packages/e2e/tests
mkdir -p packages/e2e/fixtures
```

**Step 3: Verify directory structure**

```bash
ls -la apps/
ls -la packages/
```

Expected: All directories created successfully

**Step 4: Commit directory structure**

```bash
git add apps/ packages/
git commit -m "chore: create monorepo directory structure" --allow-empty
```

---

## Task 3: Setup Marketing App (Next.js)

**Files:**
- Create: `apps/marketing/package.json`
- Create: `apps/marketing/tsconfig.json`
- Create: `apps/marketing/next.config.js`
- Create: `apps/marketing/tailwind.config.ts`
- Create: `apps/marketing/postcss.config.js`
- Create: `apps/marketing/src/app/layout.tsx`
- Create: `apps/marketing/src/app/page.tsx`

**Step 1: Create package.json**

```bash
cat > apps/marketing/package.json << 'EOF'
{
  "name": "marketing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@repo/ui": "workspace:*",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > apps/marketing/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

**Step 3: Create next.config.js**

```bash
cat > apps/marketing/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  reactStrictMode: true,
}

module.exports = nextConfig
EOF
```

**Step 4: Create tailwind.config.ts**

```bash
cat > apps/marketing/tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
EOF
```

**Step 5: Create postcss.config.js**

```bash
cat > apps/marketing/postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

**Step 6: Create root layout**

```bash
cat > apps/marketing/src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TutorBird - Tutor Management Platform',
  description: 'Manage your tutoring business with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF
```

**Step 7: Create landing page**

```bash
cat > apps/marketing/src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">TutorBird Marketing Site</h1>
      <p className="mt-4 text-lg text-gray-600">
        Landing page coming soon...
      </p>
    </main>
  )
}
EOF
```

**Step 8: Create globals.css**

```bash
cat > apps/marketing/src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

**Step 9: Commit marketing app**

```bash
git add apps/marketing/
git commit -m "feat: add marketing app (Next.js)"
```

---

## Task 4: Setup Web App (Next.js)

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.js`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/postcss.config.js`
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.tsx`

**Step 1: Create package.json**

```bash
cat > apps/web/package.json << 'EOF'
{
  "name": "web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@repo/api": "workspace:*",
    "@repo/database": "workspace:*",
    "@repo/ui": "workspace:*",
    "@tanstack/react-query": "^5.17.0",
    "@trpc/client": "^10.45.0",
    "@trpc/react-query": "^10.45.0",
    "@trpc/server": "^10.45.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > apps/web/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/nextjs.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

**Step 3: Create next.config.js**

```bash
cat > apps/web/next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/api'],
  reactStrictMode: true,
}

module.exports = nextConfig
EOF
```

**Step 4: Create tailwind.config.ts**

```bash
cat > apps/web/tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
EOF
```

**Step 5: Create postcss.config.js**

```bash
cat > apps/web/postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
```

**Step 6: Create vitest.config.ts**

```bash
cat > apps/web/vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
EOF
```

**Step 7: Create root layout**

```bash
cat > apps/web/src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TutorBird - Tutor Management',
  description: 'Manage students, tutors, and sessions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF
```

**Step 8: Create home page**

```bash
cat > apps/web/src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">TutorBird Web App</h1>
      <p className="mt-4 text-lg text-gray-600">
        Dashboard coming soon...
      </p>
    </main>
  )
}
EOF
```

**Step 9: Create globals.css**

```bash
cat > apps/web/src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

**Step 10: Commit web app**

```bash
git add apps/web/
git commit -m "feat: add web app (Next.js with tRPC)"
```

---

## Task 5: Setup Mobile App (Expo)

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/tsconfig.json`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/vitest.config.ts`
- Create: `apps/mobile/src/app/_layout.tsx`
- Create: `apps/mobile/src/app/index.tsx`

**Step 1: Create package.json**

```bash
cat > apps/mobile/package.json << 'EOF'
{
  "name": "mobile",
  "version": "1.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "dev": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build": "expo export",
    "lint": "eslint .",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "@repo/api": "workspace:*",
    "@repo/ui": "workspace:*",
    "@tanstack/react-query": "^5.17.0",
    "@trpc/client": "^10.45.0",
    "@trpc/react-query": "^10.45.0",
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "expo-status-bar": "~1.11.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@repo/config": "workspace:*",
    "@types/react": "~18.2.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > apps/mobile/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/expo.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
```

**Step 3: Create app.json**

```bash
cat > apps/mobile/app.json << 'EOF'
{
  "expo": {
    "name": "TutorBird",
    "slug": "tutorbird-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.tutorbird.mobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.tutorbird.mobile"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "scheme": "tutorbird",
    "plugins": ["expo-router"]
  }
}
EOF
```

**Step 4: Create vitest.config.ts**

```bash
cat > apps/mobile/vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
EOF
```

**Step 5: Create root layout**

```bash
cat > apps/mobile/src/app/_layout.tsx << 'EOF'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  )
}
EOF
```

**Step 6: Create index screen**

```bash
cat > apps/mobile/src/app/index.tsx << 'EOF'
import { View, Text, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TutorBird Mobile</Text>
      <Text style={styles.subtitle}>Coming soon...</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#666',
  },
})
EOF
```

**Step 7: Create placeholder assets**

```bash
echo "# Placeholder for icon.png" > apps/mobile/assets/icon.png
echo "# Placeholder for splash.png" > apps/mobile/assets/splash.png
echo "# Placeholder for adaptive-icon.png" > apps/mobile/assets/adaptive-icon.png
echo "# Placeholder for favicon.png" > apps/mobile/assets/favicon.png
```

**Step 8: Commit mobile app**

```bash
git add apps/mobile/
git commit -m "feat: add mobile app (Expo)"
```

---

## Task 6: Setup Config Package

**Files:**
- Create: `packages/config/package.json`
- Create: `packages/config/typescript/base.json`
- Create: `packages/config/typescript/nextjs.json`
- Create: `packages/config/typescript/expo.json`
- Create: `packages/config/eslint/base.js`
- Create: `packages/config/eslint/next.js`
- Create: `packages/config/eslint/expo.js`

**Step 1: Create package.json**

```bash
cat > packages/config/package.json << 'EOF'
{
  "name": "@repo/config",
  "version": "1.0.0",
  "private": true,
  "files": [
    "eslint",
    "typescript",
    "tailwind"
  ]
}
EOF
```

**Step 2: Create base TypeScript config**

```bash
cat > packages/config/typescript/base.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true
  }
}
EOF
```

**Step 3: Create Next.js TypeScript config**

```bash
cat > packages/config/typescript/nextjs.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "noEmit": true
  },
  "exclude": ["node_modules"]
}
EOF
```

**Step 4: Create Expo TypeScript config**

```bash
cat > packages/config/typescript/expo.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-native",
    "lib": ["ES2020"],
    "allowSyntheticDefaultImports": true
  }
}
EOF
```

**Step 5: Create base ESLint config**

```bash
cat > packages/config/eslint/base.js << 'EOF'
module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}
EOF
```

**Step 6: Create Next.js ESLint config**

```bash
cat > packages/config/eslint/next.js << 'EOF'
module.exports = {
  extends: ['next/core-web-vitals', './base.js'],
}
EOF
```

**Step 7: Create Expo ESLint config**

```bash
cat > packages/config/eslint/expo.js << 'EOF'
module.exports = {
  extends: ['expo', './base.js'],
}
EOF
```

**Step 8: Commit config package**

```bash
git add packages/config/
git commit -m "feat: add shared config package"
```

---

## Task 7: Setup UI Package

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/tailwind.config.ts`
- Create: `packages/ui/src/lib/utils.ts`
- Create: `packages/ui/src/components/button.tsx`
- Create: `packages/ui/src/index.ts`

**Step 1: Create package.json**

```bash
cat > packages/ui/package.json << 'EOF'
{
  "name": "@repo/ui",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "lint": "eslint .",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  },
  "peerDependencies": {
    "react": "^18.2.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > packages/ui/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/base.json",
  "compilerOptions": {
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
EOF
```

**Step 3: Create tailwind.config.ts**

```bash
cat > packages/ui/tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
EOF
```

**Step 4: Create utils**

```bash
cat > packages/ui/src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF
```

**Step 5: Create button component**

```bash
cat > packages/ui/src/components/button.tsx << 'EOF'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
EOF
```

**Step 6: Create index.ts**

```bash
cat > packages/ui/src/index.ts << 'EOF'
export * from './components/button'
export * from './lib/utils'
EOF
```

**Step 7: Commit ui package**

```bash
git add packages/ui/
git commit -m "feat: add ui package with button component"
```

---

## Task 8: Setup Database Package

**Files:**
- Create: `packages/database/package.json`
- Create: `packages/database/tsconfig.json`
- Create: `packages/database/drizzle.config.ts`
- Create: `packages/database/src/client.ts`
- Create: `packages/database/src/schema/users.ts`
- Create: `packages/database/src/schema/index.ts`
- Create: `packages/database/src/index.ts`

**Step 1: Create package.json**

```bash
cat > packages/database/package.json << 'EOF'
{
  "name": "@repo/database",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg",
    "db:studio": "drizzle-kit studio",
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "drizzle-orm": "^0.29.0",
    "postgres": "^3.4.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "drizzle-kit": "^0.20.0",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > packages/database/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
EOF
```

**Step 3: Create drizzle.config.ts**

```bash
cat > packages/database/drizzle.config.ts << 'EOF'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema/index.ts',
  out: './src/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.SUPABASE_URL || '',
  },
} satisfies Config
EOF
```

**Step 4: Create Supabase client**

```bash
cat > packages/database/src/client.ts << 'EOF'
import { createClient } from '@supabase/supabase-js'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Drizzle client for type-safe queries
const connectionString = process.env.DATABASE_URL || supabaseUrl
const client = postgres(connectionString)
export const db = drizzle(client)
EOF
```

**Step 5: Create users schema**

```bash
cat > packages/database/src/schema/users.ts << 'EOF'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: text('role', { enum: ['student', 'tutor', 'admin'] }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
EOF
```

**Step 6: Create schema index**

```bash
cat > packages/database/src/schema/index.ts << 'EOF'
export * from './users'
EOF
```

**Step 7: Create package index**

```bash
cat > packages/database/src/index.ts << 'EOF'
export * from './client'
export * from './schema'
EOF
```

**Step 8: Commit database package**

```bash
git add packages/database/
git commit -m "feat: add database package with Drizzle ORM"
```

---

## Task 9: Setup API Package

**Files:**
- Create: `packages/api/package.json`
- Create: `packages/api/tsconfig.json`
- Create: `packages/api/src/trpc.ts`
- Create: `packages/api/src/context.ts`
- Create: `packages/api/src/routers/users.ts`
- Create: `packages/api/src/routers/index.ts`
- Create: `packages/api/src/index.ts`

**Step 1: Create package.json**

```bash
cat > packages/api/package.json << 'EOF'
{
  "name": "@repo/api",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "type-check": "tsc --noEmit",
    "test": "vitest"
  },
  "dependencies": {
    "@repo/database": "workspace:*",
    "@trpc/server": "^10.45.0",
    "superjson": "^2.2.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@repo/config": "workspace:*",
    "typescript": "^5.3.0",
    "vitest": "^1.0.0"
  }
}
EOF
```

**Step 2: Create tsconfig.json**

```bash
cat > packages/api/tsconfig.json << 'EOF'
{
  "extends": "@repo/config/typescript/base.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
EOF
```

**Step 3: Create tRPC initialization**

```bash
cat > packages/api/src/trpc.ts << 'EOF'
import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new Error('Unauthorized')
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
EOF
```

**Step 4: Create context**

```bash
cat > packages/api/src/context.ts << 'EOF'
import { db, supabase } from '@repo/database'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext(opts: FetchCreateContextFnOptions) {
  const authHeader = opts.req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  let user = null
  if (token) {
    const { data } = await supabase.auth.getUser(token)
    user = data.user
  }

  return {
    db,
    supabase,
    user,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
EOF
```

**Step 5: Create users router**

```bash
cat > packages/api/src/routers/users.ts << 'EOF'
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { users } from '@repo/database'
import { eq } from 'drizzle-orm'

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(users)
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, input.id))
      return user
    }),

  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        role: z.enum(['student', 'tutor', 'admin']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [user] = await ctx.db.insert(users).values(input).returning()
      return user
    }),
})
EOF
```

**Step 6: Create root router**

```bash
cat > packages/api/src/routers/index.ts << 'EOF'
import { router } from '../trpc'
import { usersRouter } from './users'

export const appRouter = router({
  users: usersRouter,
})

export type AppRouter = typeof appRouter
EOF
```

**Step 7: Create package index**

```bash
cat > packages/api/src/index.ts << 'EOF'
export * from './routers'
export * from './trpc'
export * from './context'
export type { AppRouter } from './routers'
EOF
```

**Step 8: Commit api package**

```bash
git add packages/api/
git commit -m "feat: add api package with tRPC routers"
```

---

## Task 10: Setup E2E Package

**Files:**
- Create: `packages/e2e/package.json`
- Create: `packages/e2e/playwright.config.ts`
- Create: `packages/e2e/tests/example.spec.ts`

**Step 1: Create package.json**

```bash
cat > packages/e2e/package.json << 'EOF'
{
  "name": "@repo/e2e",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@repo/config": "workspace:*",
    "typescript": "^5.3.0"
  }
}
EOF
```

**Step 2: Create playwright.config.ts**

```bash
cat > packages/e2e/playwright.config.ts << 'EOF'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'pnpm --filter web dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
EOF
```

**Step 3: Create example test**

```bash
cat > packages/e2e/tests/example.spec.ts << 'EOF'
import { test, expect } from '@playwright/test'

test.describe('Example E2E Test', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/TutorBird/)
  })
})
EOF
```

**Step 4: Commit e2e package**

```bash
git add packages/e2e/
git commit -m "feat: add e2e testing package with Playwright"
```

---

## Task 11: Create CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

**Step 1: Create CLAUDE.md**

```bash
cat > CLAUDE.md << 'EOF'
# Tutor Management SaaS Platform

## Project Overview

A comprehensive tutor management platform enabling tutoring businesses to manage:
- Student enrollment and profiles
- Tutor onboarding and scheduling
- Session booking and tracking
- Payments and subscriptions
- Analytics and reporting

Similar to [TutorBird](https://www.tutorbird.com/), supporting both individual tutors and multi-tutor businesses.

---

## Architecture

**Monorepo Structure:**
- Build System: Turborepo
- Package Manager: pnpm workspaces
- Version Control: Git

**Applications:**
1. `apps/marketing` - Next.js marketing site (landing, pricing, blog)
2. `apps/web` - Next.js web application (main platform)
3. `apps/mobile` - Expo mobile app (iOS & Android)

**Shared Packages:**
1. `packages/api` - tRPC routers (shared backend logic)
2. `packages/database` - Drizzle ORM schemas & migrations
3. `packages/ui` - shadcn/ui components & custom UI
4. `packages/config` - Shared configs (TS, ESLint, Tailwind)
5. `packages/e2e` - Shared Playwright E2E tests

---

## Technology Stack

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for complete details.

**Key Technologies:**
- Frontend: React 18, Next.js 14, Expo, Tailwind CSS, shadcn/ui
- Backend: tRPC, Supabase (PostgreSQL), Drizzle ORM
- Auth: Supabase Auth with Row Level Security
- Payments: Lemon Squeezy
- Email: Resend + React Email
- Storage: Supabase Storage
- Deployment: Vercel (web), EAS (mobile)
- Testing: Vitest (unit), Playwright (E2E)
- Monitoring: Sentry

---

## Development Workflow

### Setup
```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations (after setting up Supabase)
pnpm --filter @repo/database db:migrate

# Start all apps in development
pnpm dev
```

### Common Commands
```bash
pnpm dev                 # Start all apps in dev mode
pnpm build               # Build all apps and packages
pnpm test                # Run all unit tests
pnpm test:e2e            # Run E2E tests
pnpm lint                # Lint all packages
pnpm type-check          # TypeScript type checking
```

### App-Specific Development
```bash
pnpm --filter marketing dev    # Marketing site only (port 3001)
pnpm --filter web dev          # Web app only (port 3000)
pnpm --filter mobile dev       # Mobile app only (Expo)
```

---

## Key Patterns & Conventions

### Type Safety
- **tRPC**: End-to-end type safety from database to client
- All API calls are fully typed without code generation
- Zod schemas for runtime validation

### Authentication
- Supabase Auth for user management
- Row Level Security (RLS) on database tables
- JWT tokens passed via tRPC context

### Database
- Drizzle ORM for type-safe queries
- Schema defined in `packages/database/src/schema/`
- Migrations managed via `drizzle-kit`

### UI Components
- shadcn/ui as component foundation
- Shared via `packages/ui`
- Customizable and owned by the project
- Tailwind CSS for styling

### Code Sharing
- Business logic in `packages/api` (tRPC routers)
- UI components in `packages/ui`
- Database schema in `packages/database`
- Import via workspace protocol: `@repo/api`, `@repo/ui`, etc.

---

## Project Structure

```
tutor/
├── apps/
│   ├── marketing/       # Next.js marketing site (port 3001)
│   ├── web/            # Next.js web app (port 3000)
│   └── mobile/         # Expo mobile app
├── packages/
│   ├── api/            # tRPC routers
│   ├── database/       # Drizzle ORM & schemas
│   ├── ui/             # Shared UI components
│   ├── config/         # Shared configs
│   └── e2e/            # Shared E2E tests
├── docs/               # Documentation
├── turbo.json          # Turborepo config
└── pnpm-workspace.yaml # pnpm workspaces
```

---

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_STORE_ID=
LEMON_SQUEEZY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=

# Sentry
SENTRY_DSN=

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/trpc
NEXT_PUBLIC_MARKETING_URL=http://localhost:3001
```

---

## Testing Strategy

### Unit Tests (Vitest)
- All packages have `__tests__/` folders
- Run with `pnpm test`
- Fast, isolated tests for business logic

### E2E Tests (Playwright)
- **Shared** (`packages/e2e`): Cross-app user flows
- **App-specific** (`apps/*/e2e`): App-specific scenarios
- Run with `pnpm test:e2e`

### Test Coverage Goals
- API routers: 80%+ coverage
- UI components: 70%+ coverage
- Critical user flows: 100% E2E coverage

---

## Deployment

### Web Apps (Vercel)
- `apps/marketing`: Auto-deployed from `main` branch to custom domain
- `apps/web`: Auto-deployed from `main` branch to app domain
- Preview deployments for all PRs

### Mobile App (EAS)
- iOS: TestFlight → App Store
- Android: Internal testing → Google Play
- OTA updates for minor changes

### API (Vercel Edge Functions)
- Deployed with `apps/web`
- Available at `/api/trpc/*`

---

## Git Workflow

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches
- Pull requests required for all merges
- GitHub Actions for CI/CD

---

## Important Notes

### Workspace Dependencies
- Use `workspace:*` protocol for internal packages
- Example: `"@repo/ui": "workspace:*"`

### Port Assignments
- Marketing: 3001
- Web App: 3000
- Mobile (Expo): 8081

### First Time Setup
1. Clone repository
2. Run `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Set up Supabase project and add credentials
5. Run `pnpm dev` to start all apps

---

## Support & Resources

- **Documentation**: `/docs` folder
- **Tech Stack**: `docs/TECH_STACK.md`
- **Design Docs**: `docs/plans/`
- **Issues**: GitHub Issues
EOF
```

**Step 2: Commit CLAUDE.md**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with project context"
```

---

## Task 12: Create README.md

**Files:**
- Create: `README.md`

**Step 1: Create README.md**

```bash
cat > README.md << 'EOF'
# TutorBird - Tutor Management SaaS Platform

A comprehensive platform for managing tutoring businesses, built with a modern, type-safe monorepo architecture.

## Features

- 🎓 Student and tutor management
- 📅 Session scheduling and tracking
- 💳 Payments and subscriptions
- 📱 Mobile app (iOS & Android)
- 🌐 Web application
- 🎨 Marketing website

## Tech Stack

- **Frontend**: React, Next.js, Expo
- **Backend**: tRPC, Supabase, Drizzle ORM
- **Styling**: Tailwind CSS, shadcn/ui
- **Monorepo**: Turborepo, pnpm
- **Testing**: Vitest, Playwright

See [docs/TECH_STACK.md](./docs/TECH_STACK.md) for complete details.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local

# Start development servers
pnpm dev
```

The apps will be available at:
- Marketing site: http://localhost:3001
- Web app: http://localhost:3000
- Mobile app: Expo Dev Tools

## Development

```bash
# Start all apps
pnpm dev

# Build all apps
pnpm build

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Project Structure

```
tutor/
├── apps/
│   ├── marketing/    # Next.js marketing site
│   ├── web/          # Next.js web app
│   └── mobile/       # Expo mobile app
├── packages/
│   ├── api/          # tRPC API layer
│   ├── database/     # Drizzle ORM schemas
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configs
│   └── e2e/          # E2E tests
└── docs/             # Documentation
```

## Documentation

- [Tech Stack](./docs/TECH_STACK.md)
- [Monorepo Structure](./docs/plans/2026-01-03-monorepo-structure-design.md)
- [CLAUDE.md](./CLAUDE.md) - AI assistant context

## License

Private - All rights reserved
EOF
```

**Step 2: Commit README.md**

```bash
git add README.md
git commit -m "docs: add README with getting started guide"
```

---

## Task 13: Install Dependencies

**Step 1: Install all dependencies**

```bash
pnpm install
```

Expected: All packages installed successfully

**Step 2: Verify installation**

```bash
pnpm --filter @repo/ui type-check
pnpm --filter @repo/api type-check
pnpm --filter @repo/database type-check
```

Expected: Type checking passes for all packages

**Step 3: Commit lockfile**

```bash
git add pnpm-lock.yaml
git commit -m "chore: add pnpm lockfile"
```

---

## Task 14: Verify Build

**Step 1: Build all packages**

```bash
pnpm build
```

Expected: All apps build successfully (or show helpful errors if env vars missing)

**Step 2: Verify apps can start**

```bash
# Test marketing app (background)
pnpm --filter marketing dev &
MARKETING_PID=$!
sleep 5
kill $MARKETING_PID

# Test web app (background)
pnpm --filter web dev &
WEB_PID=$!
sleep 5
kill $WEB_PID
```

Expected: Both apps start without critical errors

**Step 3: Create final commit**

```bash
git add -A
git commit -m "chore: verify monorepo setup complete"
```

---

## Summary

This plan creates a complete Turborepo monorepo with:

✅ 3 apps (marketing, web, mobile)
✅ 5 packages (api, database, ui, config, e2e)
✅ Full TypeScript configuration
✅ tRPC API setup
✅ Drizzle ORM configuration
✅ Shared UI components
✅ Testing setup (Vitest + Playwright)
✅ CLAUDE.md and README.md

**Next steps after completion:**
1. Set up Supabase project
2. Add environment variables
3. Run database migrations
4. Start building features
