# Performance

**Last Updated:** 2026-01-03

This document defines performance targets, optimization strategies, and performance budgets.

---

## Overview

Performance is critical for user experience and conversion rates. We optimize for **perceived performance** as much as actual speed.

**Priorities:**
1. Time to Interactive (TTI)
2. API response time
3. Mobile app responsiveness
4. Database query performance

---

## Performance Targets

### Web Applications

| Metric | Target | Threshold | Current |
|--------|--------|-----------|---------|
| **First Contentful Paint (FCP)** | < 1.0s | < 1.8s | TBD |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 4.0s | TBD |
| **Time to Interactive (TTI)** | < 3.0s | < 5.0s | TBD |
| **First Input Delay (FID)** | < 100ms | < 300ms | TBD |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.25 | TBD |

**Network Conditions**: Simulated 3G (good)

### Mobile Applications

| Metric | Target | Threshold | Current |
|--------|--------|-----------|---------|
| **App startup time** | < 2s | < 3s | TBD |
| **Screen transition** | < 200ms | < 500ms | TBD |
| **List scroll performance** | 60 FPS | 45 FPS | TBD |
| **Time to first data** | < 1s | < 2s | TBD |

**Network Conditions**: 4G LTE

### API Performance

| Metric | Target | Threshold | Current |
|--------|--------|-----------|---------|
| **p50 response time** | < 200ms | < 500ms | TBD |
| **p95 response time** | < 500ms | < 1s | TBD |
| **p99 response time** | < 1s | < 2s | TBD |
| **Error rate** | < 0.1% | < 1% | TBD |
| **Availability** | > 99.9% | > 99.5% | TBD |

### Database Performance

| Metric | Target | Threshold | Current |
|--------|--------|-----------|---------|
| **Simple query** | < 10ms | < 50ms | TBD |
| **Complex query** | < 50ms | < 200ms | TBD |
| **Full-text search** | < 100ms | < 500ms | TBD |
| **Write operation** | < 20ms | < 100ms | TBD |

---

## Performance Budgets

### JavaScript Bundle Size

| Application | Budget | Current | Notes |
|-------------|--------|---------|-------|
| **Marketing site** | < 100 KB (gzipped) | TBD | Minimal JS, mostly static |
| **Web app (initial)** | < 200 KB (gzipped) | TBD | Core app + auth |
| **Web app (route)** | < 50 KB (gzipped) | TBD | Per-route code splitting |
| **Mobile app** | < 5 MB (total) | TBD | React Native bundle |

### Image Optimization

| Format | Max Size | Quality | Notes |
|--------|----------|---------|-------|
| **Hero images** | 200 KB | 80% | WebP with JPEG fallback |
| **Thumbnails** | 20 KB | 75% | Lazy loaded |
| **Avatars** | 10 KB | 70% | Cached aggressively |
| **Icons** | SVG | N/A | Inline critical, lazy load others |

### Network Requests

| Page Type | Request Budget | Current | Notes |
|-----------|---------------|---------|-------|
| **Marketing pages** | < 20 requests | TBD | Minimize third-party scripts |
| **Web app pages** | < 30 requests | TBD | tRPC batching helps |
| **API calls** | < 5 per action | TBD | Batch where possible |

---

## Optimization Strategies

### Frontend Optimization

#### 1. **Code Splitting**

```typescript
// apps/web/next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['@repo/ui', 'lucide-react'],
  },
};

// Dynamic imports for heavy components
const SessionCalendar = dynamic(() => import('./SessionCalendar'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't render on server
});
```

#### 2. **Image Optimization**

```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={tutor.avatarUrl}
  alt={tutor.name}
  width={100}
  height={100}
  loading="lazy"
  quality={75}
  placeholder="blur"
/>
```

#### 3. **Font Optimization**

```typescript
// apps/web/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  variable: '--font-inter',
});
```

#### 4. **Prefetching**

```tsx
// Prefetch on hover for instant navigation
<Link href="/tutors/123" prefetch>
  View Tutor
</Link>
```

---

### API Optimization

#### 1. **Request Batching**

```typescript
// tRPC automatically batches requests made within 10ms
// These 3 requests = 1 HTTP call
const tutors = api.tutors.getAll.useQuery();
const sessions = api.sessions.getMySessions.useQuery();
const payments = api.payments.getMyPayments.useQuery();
```

#### 2. **Selective Data Fetching**

```typescript
// Only fetch needed fields
export const tutorsRouter = router({
  getList: publicProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select({
        id: tutors.id,
        name: tutors.name,
        subjects: tutors.subjects,
        hourlyRate: tutors.hourlyRate,
        // Don't fetch bio, qualifications, etc.
      })
      .from(tutors);
  }),
});
```

#### 3. **Parallel Queries**

```typescript
// Fetch independent data in parallel
const [tutor, sessions, reviews] = await Promise.all([
  ctx.db.query.tutors.findFirst({ where: eq(tutors.id, id) }),
  ctx.db.query.sessions.findMany({ where: eq(sessions.tutorId, id) }),
  ctx.db.query.reviews.findMany({ where: eq(reviews.revieweeId, id) }),
]);
```

---

### Database Optimization

#### 1. **Indexing Strategy**

```sql
-- Frequently queried columns
CREATE INDEX sessions_tutor_time_idx ON sessions(tutor_id, start_time DESC);
CREATE INDEX sessions_student_time_idx ON sessions(student_id, start_time DESC);

-- Partial indexes for common filters
CREATE INDEX sessions_scheduled_idx ON sessions(status) WHERE status = 'scheduled';

-- Composite indexes for complex queries
CREATE INDEX tutors_active_rate_idx ON tutors(is_active, hourly_rate) WHERE is_active = true;
```

#### 2. **Query Optimization**

```typescript
// BAD: N+1 query problem
const sessions = await db.query.sessions.findMany();
for (const session of sessions) {
  const tutor = await db.query.tutors.findFirst({
    where: eq(tutors.id, session.tutorId),
  });
}

// GOOD: Join or include
const sessions = await db.query.sessions.findMany({
  with: {
    tutor: true, // Drizzle auto-joins
  },
});
```

#### 3. **Connection Pooling**

```typescript
// Supabase provides pgBouncer connection pooling
// Max connections: 100 (configurable)
// Pool mode: Transaction (recommended for serverless)
```

---

### Caching Strategy

#### 1. **Client-Side Caching**

```typescript
// React Query caching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 minutes
      cacheTime: 10 * 60 * 1000,    // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Aggressive caching for static data
const { data } = api.tutors.getTutor.useQuery(
  { id },
  { staleTime: Infinity } // Never refetch
);
```

#### 2. **Server-Side Caching**

```typescript
// Cache expensive computations
import { unstable_cache } from 'next/cache';

const getTutorStats = unstable_cache(
  async (tutorId: string) => {
    // Expensive aggregation
    return stats;
  },
  ['tutor-stats'],
  { revalidate: 3600 } // 1 hour
);
```

#### 3. **CDN Caching**

```typescript
// apps/web/next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

### Mobile Optimization

#### 1. **List Virtualization**

```tsx
// Use FlatList for long lists
import { FlatList } from 'react-native';

<FlatList
  data={tutors}
  renderItem={({ item }) => <TutorCard tutor={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews
/>
```

#### 2. **Image Caching**

```tsx
// Use expo-image for better caching
import { Image } from 'expo-image';

<Image
  source={{ uri: tutor.avatarUrl }}
  cachePolicy="memory-disk"
  placeholder={blurhash}
  transition={200}
/>
```

#### 3. **Offline Support**

```typescript
// React Query persistence
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

// Persist queries for offline access
persistQueryClient({
  queryClient,
  persister,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});
```

---

## Performance Monitoring

### Real User Monitoring (RUM)

**Tools:**
- Sentry Performance Monitoring
- Vercel Analytics
- PostHog Session Replay

**Metrics Tracked:**
- Page load times
- API response times
- Error rates
- User interactions

### Synthetic Monitoring

**Tools:**
- Lighthouse CI (in GitHub Actions)
- Better Stack uptime checks

**Tests:**
- Homepage load time
- Critical user flows
- API endpoint health

### Performance Testing

```bash
# Lighthouse CI in GitHub Actions
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://tutorapp.com
      https://app.tutorapp.com
    uploadArtifacts: true
    temporaryPublicStorage: true
```

---

## Performance Debugging

### Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| **Chrome DevTools** | Profiling, network analysis | Development |
| **React DevTools Profiler** | Component render performance | React optimization |
| **Expo Performance Monitor** | Mobile FPS, memory | Mobile optimization |
| **Sentry Performance** | Production monitoring | Production issues |

### Common Issues & Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| **Large bundle** | Slow page loads | Code splitting, tree shaking |
| **Unoptimized images** | Slow LCP | Use Next.js Image, WebP format |
| **N+1 queries** | Slow API calls | Use joins, eager loading |
| **Missing indexes** | Slow database queries | Add appropriate indexes |
| **Blocking requests** | Delayed interactivity | Lazy load, defer non-critical |

---

## Performance Culture

### Best Practices

✅ **DO:**
- Measure before optimizing
- Set performance budgets
- Monitor Core Web Vitals
- Test on real devices
- Optimize critical rendering path
- Use production builds for testing

❌ **DON'T:**
- Premature optimization
- Ignore mobile performance
- Skip performance testing in CI
- Optimize without data
- Sacrifice UX for speed

### Performance Checklist

**Before Deploy:**
- [ ] Lighthouse score > 90
- [ ] Bundle size within budget
- [ ] Images optimized
- [ ] Critical CSS inlined
- [ ] No render-blocking resources
- [ ] Database queries indexed
- [ ] API responses < 500ms (p95)

---

For implementation details, see:
- [TECH_STACK.md](../TECH_STACK.md) - Performance tooling setup
- [Architecture Overview](./architecture_overview.md) - Performance characteristics
