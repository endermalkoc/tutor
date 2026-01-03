# API Design

**Last Updated:** 2026-01-03

This document defines the API structure, conventions, and design patterns using tRPC.

---

## Overview

The API layer uses **tRPC** for end-to-end type-safe RPC-style APIs consumed by both web and mobile apps.

**Key Principles:**
- **Type safety**: No code generation, full TypeScript inference
- **Single source of truth**: API defined once in `packages/api`
- **Consistent patterns**: Standardized naming, error handling, validation
- **Serverless-first**: Designed for Vercel Serverless Functions

---

## API Architecture

### Router Organization

```
packages/api/src/
├── routers/
│   ├── tutors.ts          # Tutor-related operations
│   ├── students.ts        # Student-related operations
│   ├── sessions.ts        # Session booking & management
│   ├── payments.ts        # Payment operations
│   ├── auth.ts            # Authentication operations
│   └── index.ts           # Combined app router
├── trpc.ts                # tRPC initialization
├── context.ts             # Request context (auth, db)
└── lib/
    └── logger.ts          # Axiom logger
```

### Router Structure

```typescript
// packages/api/src/routers/index.ts
import { router } from '../trpc';
import { tutorsRouter } from './tutors';
import { studentsRouter } from './students';
import { sessionsRouter } from './sessions';
import { paymentsRouter } from './payments';
import { authRouter } from './auth';

export const appRouter = router({
  tutors: tutorsRouter,
  students: studentsRouter,
  sessions: sessionsRouter,
  payments: paymentsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
```

---

## Naming Conventions

### Procedure Names

| Pattern | Example | Use Case |
|---------|---------|----------|
| `get{Entity}` | `getTutor` | Get single entity by ID |
| `getAll` / `list` | `getAllTutors` | Get list of entities |
| `search` | `searchTutors` | Search with filters/query |
| `create` | `createSession` | Create new entity |
| `update` | `updateProfile` | Update existing entity |
| `delete` / `remove` | `deleteSession` | Delete entity |
| `{action}{Entity}` | `bookSession`, `cancelSession` | Specific actions |

### Router Names

- **Plural nouns**: `tutorsRouter`, `sessionsRouter`
- **Descriptive**: `authRouter` (not `userRouter` for auth operations)
- **Domain-focused**: Organized by business domain, not technical layer

---

## Procedure Types

### 1. **Query** (Read Operations)

```typescript
// packages/api/src/routers/tutors.ts
export const tutorsRouter = router({
  // Get single tutor by ID
  getTutor: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const tutor = await ctx.db.query.tutors.findFirst({
        where: eq(tutors.id, input.id),
      });
      if (!tutor) throw new TRPCError({ code: 'NOT_FOUND' });
      return tutor;
    }),

  // Get all active tutors
  getAllTutors: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.query.tutors.findMany({
        where: eq(tutors.isActive, true),
      });
    }),

  // Search tutors with filters
  searchTutors: publicProcedure
    .input(z.object({
      query: z.string().min(2).optional(),
      subjects: z.array(z.string()).optional(),
      maxRate: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      // Implementation...
    }),
});
```

**Use Cases:**
- Fetching data
- Search operations
- List views
- Detail views

### 2. **Mutation** (Write Operations)

```typescript
export const sessionsRouter = router({
  // Create new session
  createSession: protectedProcedure
    .input(z.object({
      tutorId: z.string().uuid(),
      studentId: z.string().uuid(),
      startTime: z.date().min(new Date()),
      duration: z.number().min(15).max(480),
      subject: z.string(),
      notes: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create session
      const [session] = await ctx.db
        .insert(sessions)
        .values({
          ...input,
          status: 'scheduled',
        })
        .returning();

      // Trigger background job
      await inngest.send({
        name: 'session/created',
        data: { sessionId: session.id },
      });

      return session;
    }),

  // Cancel session
  cancelSession: protectedProcedure
    .input(z.object({
      sessionId: z.string().uuid(),
      reason: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Implementation...
    }),
});
```

**Use Cases:**
- Creating records
- Updating records
- Deleting records
- State transitions (book, cancel, complete)

### 3. **Subscription** (Real-time Updates)

**Current**: Not implemented (v1)

**Future**: Use Supabase Realtime for live updates
```typescript
// Future implementation
export const sessionsRouter = router({
  onSessionUpdate: protectedProcedure
    .input(z.object({ sessionId: z.string().uuid() }))
    .subscription(async ({ ctx, input }) => {
      // Subscribe to Supabase Realtime
    }),
});
```

---

## Authentication Patterns

### Context Creation

```typescript
// packages/api/src/context.ts
export const createContext = async ({ req, res }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  let user = null;
  if (token) {
    const { data } = await supabase.auth.getUser(token);
    user = data.user;
  }

  return {
    user,
    db: drizzle(supabase),
    supabase,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
```

### Procedure Definitions

```typescript
// packages/api/src/trpc.ts
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // Now guaranteed non-null
    },
  });
});
```

### Usage Pattern

```typescript
export const tutorsRouter = router({
  // Public: Anyone can view
  getAllTutors: publicProcedure.query(/*...*/),

  // Protected: Must be logged in
  createTutor: protectedProcedure.mutation(/*...*/),

  // Protected + Role check
  updateTutor: protectedProcedure
    .input(z.object({ id: z.string().uuid(), /*...*/ }))
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const tutor = await ctx.db.query.tutors.findFirst({
        where: eq(tutors.id, input.id),
      });

      if (tutor.userId !== ctx.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      // Update...
    }),
});
```

---

## Input Validation

### Zod Schema Patterns

```typescript
import { z } from 'zod';

// Reusable schemas
const uuidSchema = z.string().uuid();
const emailSchema = z.string().email();
const futureTimeSchema = z.date().min(new Date(), 'Must be future date');

// Complex validation
const sessionInputSchema = z.object({
  tutorId: uuidSchema,
  studentId: uuidSchema,
  startTime: futureTimeSchema,
  endTime: futureTimeSchema,
  duration: z.number().min(15).max(480),
  subject: z.string().min(1).max(100),
  notes: z.string().max(1000).optional(),
}).refine(
  (data) => data.endTime > data.startTime,
  { message: 'End time must be after start time' }
);

export const sessionsRouter = router({
  create: protectedProcedure
    .input(sessionInputSchema)
    .mutation(async ({ ctx, input }) => {
      // Input is validated and typed!
    }),
});
```

### Validation Patterns

| Pattern | Example | Use Case |
|---------|---------|----------|
| **Required fields** | `z.string()` | Mandatory data |
| **Optional fields** | `z.string().optional()` | Optional data |
| **Default values** | `z.string().default('en')` | Fallback values |
| **Min/Max** | `z.string().min(1).max(100)` | Length constraints |
| **Enums** | `z.enum(['scheduled', 'completed'])` | Fixed options |
| **Arrays** | `z.array(z.string())` | Lists |
| **Nested objects** | `z.object({ name: z.string() })` | Complex structures |
| **Refinements** | `.refine((data) => ...)` | Custom validation |

---

## Error Handling

### tRPC Error Codes

```typescript
import { TRPCError } from '@trpc/server';

// Standard errors
throw new TRPCError({ code: 'UNAUTHORIZED' });      // 401
throw new TRPCError({ code: 'FORBIDDEN' });         // 403
throw new TRPCError({ code: 'NOT_FOUND' });         // 404
throw new TRPCError({ code: 'BAD_REQUEST' });       // 400
throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' }); // 500

// With custom message
throw new TRPCError({
  code: 'BAD_REQUEST',
  message: 'Session already booked for this time',
});

// With metadata
throw new TRPCError({
  code: 'CONFLICT',
  message: 'Email already exists',
  cause: error,
});
```

### Error Handling Pattern

```typescript
export const tutorsRouter = router({
  getTutor: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      try {
        const tutor = await ctx.db.query.tutors.findFirst({
          where: eq(tutors.id, input.id),
        });

        if (!tutor) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Tutor not found',
          });
        }

        return tutor;
      } catch (error) {
        // Log error
        logger.error('Failed to fetch tutor', error, {
          tutorId: input.id,
          userId: ctx.user?.id,
        });

        // Re-throw tRPC errors
        if (error instanceof TRPCError) throw error;

        // Wrap unknown errors
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch tutor',
          cause: error,
        });
      }
    }),
});
```

---

## Response Patterns

### Simple Response

```typescript
// Return entity directly
return tutor;

// Return array
return tutors;
```

### Paginated Response

```typescript
export const tutorsRouter = router({
  getAllTutors: publicProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const offset = (input.page - 1) * input.pageSize;

      const [items, totalCount] = await Promise.all([
        ctx.db.query.tutors.findMany({
          limit: input.pageSize,
          offset,
        }),
        ctx.db.select({ count: sql`count(*)` }).from(tutors),
      ]);

      return {
        items,
        pagination: {
          page: input.page,
          pageSize: input.pageSize,
          totalCount: totalCount[0].count,
          totalPages: Math.ceil(totalCount[0].count / input.pageSize),
        },
      };
    }),
});
```

### Cursor-Based Pagination

```typescript
// For infinite scroll
export const sessionsRouter = router({
  getInfiniteSessions: protectedProcedure
    .input(z.object({
      cursor: z.string().uuid().optional(),
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.query.sessions.findMany({
        where: input.cursor
          ? lt(sessions.createdAt, input.cursor)
          : undefined,
        limit: input.limit + 1, // Fetch one extra to check if there's more
        orderBy: desc(sessions.createdAt),
      });

      let nextCursor: string | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
```

---

## Client Usage

### Web App (Next.js)

```typescript
// apps/web/src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api';

export const api = createTRPCReact<AppRouter>();

// apps/web/src/app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

const queryClient = new QueryClient();
const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc',
      headers: () => ({
        authorization: `Bearer ${getToken()}`,
      }),
    }),
  ],
});

export function Providers({ children }) {
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
}

// Usage in components
import { api } from '@/lib/trpc';

export function TutorList() {
  const { data, isLoading } = api.tutors.getAllTutors.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map((tutor) => (
        <li key={tutor.id}>{tutor.name}</li>
      ))}
    </ul>
  );
}
```

### Mobile App (Expo)

```typescript
// apps/mobile/src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/api';
import { httpBatchLink } from '@trpc/client';
import * as SecureStore from 'expo-secure-store';

export const api = createTRPCReact<AppRouter>();

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: process.env.EXPO_PUBLIC_API_URL!,
      headers: async () => {
        const token = await SecureStore.getItemAsync('auth_token');
        return {
          authorization: token ? `Bearer ${token}` : '',
        };
      },
    }),
  ],
});

// Usage in components
import { api } from '@/lib/trpc';

export function TutorListScreen() {
  const { data, isLoading } = api.tutors.getAllTutors.useQuery();

  if (isLoading) return <ActivityIndicator />;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
}
```

---

## Performance Optimization

### Batching

tRPC automatically batches requests made within 10ms into a single HTTP request.

```typescript
// These 3 requests are batched into 1 HTTP call
const tutors = api.tutors.getAllTutors.useQuery();
const sessions = api.sessions.getMySessions.useQuery();
const payments = api.payments.getMyPayments.useQuery();
```

### Selective Data Fetching

```typescript
// Only fetch what you need
export const tutorsRouter = router({
  getTutorSummary: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({
          id: tutors.id,
          name: tutors.name,
          subjects: tutors.subjects,
          hourlyRate: tutors.hourlyRate,
        })
        .from(tutors)
        .where(eq(tutors.id, input.id));
    }),
});
```

### Caching Strategy

```typescript
// Client-side caching with React Query
const { data } = api.tutors.getTutor.useQuery(
  { id: tutorId },
  {
    staleTime: 5 * 60 * 1000,     // 5 minutes
    cacheTime: 10 * 60 * 1000,    // 10 minutes
    refetchOnWindowFocus: false,
  }
);
```

---

## API Versioning Strategy

### Current Approach (v1)

**No explicit versioning** - Single version API

**Rationale:**
- tRPC provides end-to-end type safety, making breaking changes immediately visible
- Monorepo allows atomic updates across web and mobile
- Control both client and server deployment

**Current State:**
```typescript
// packages/api/src/routers/index.ts
export const appRouter = router({
  tutors: tutorsRouter,
  students: studentsRouter,
  sessions: sessionsRouter,
  // ... other routers
});
```

### When Breaking Changes Are Needed

**Option 1: Additive Changes (Preferred)**

Add new procedures alongside old ones, deprecate gracefully:

```typescript
export const tutorsRouter = router({
  // Old procedure - keep for backward compatibility
  getTutor: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      // Old implementation
    }),

  // New procedure with enhanced functionality
  getTutorDetailed: publicProcedure
    .input(z.object({
      id: z.string().uuid(),
      includeReviews: z.boolean().optional(),
      includeStats: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      // New implementation with additional features
    }),
});
```

**Migration Path:**
1. Add new procedure
2. Update clients to use new procedure
3. Monitor old procedure usage
4. Remove old procedure after all clients migrated

**Option 2: Router Namespacing**

Create versioned routers for major changes:

```typescript
// packages/api/src/routers/index.ts
export const appRouter = router({
  // V1 routers (current)
  tutors: tutorsRouter,
  sessions: sessionsRouter,

  // V2 routers (future breaking changes)
  v2: router({
    tutors: tutorsV2Router,
    sessions: sessionsV2Router,
  }),
});

// Usage in client
// V1: api.tutors.getTutor({ id })
// V2: api.v2.tutors.getTutor({ id })
```

**When to Use:**
- Complete redesign of resource structure
- Major data model changes
- Significant authentication changes

**Option 3: Input Schema Evolution**

Evolve input schemas without breaking changes:

```typescript
// Old schema
const oldSchema = z.object({
  name: z.string(),
});

// New schema - backward compatible
const newSchema = z.object({
  name: z.string(),
  displayName: z.string().optional(), // New optional field
});

// Handle both in implementation
.input(newSchema)
.mutation(async ({ ctx, input }) => {
  const name = input.displayName || input.name; // Fallback logic
  // ...
});
```

### Versioning Guidelines

**DO:**
- ✅ Make changes additive when possible
- ✅ Use optional fields for new properties
- ✅ Provide default values for new required fields
- ✅ Document deprecation timeline (3-6 months minimum)
- ✅ Monitor usage of deprecated endpoints
- ✅ Communicate changes to team before deploying

**DON'T:**
- ❌ Remove procedures without deprecation period
- ❌ Change response shape of existing procedures
- ❌ Change input validation to be more restrictive
- ❌ Rename procedures (create new one instead)

### Breaking Change Checklist

Before making a breaking change:

- [ ] Can this be done additively instead?
- [ ] Are all clients under our control?
- [ ] Can we deploy client and server simultaneously?
- [ ] Have we documented the migration path?
- [ ] Have we set a deprecation timeline?
- [ ] Have we added monitoring for old endpoint usage?

### Future Considerations (v2+)

**If Multi-Tenancy or Third-Party API Access:**

Consider formal versioning in URL path:

```typescript
// Route-based versioning
export const appRouter = router({
  v1: router({
    tutors: tutorsV1Router,
  }),
  v2: router({
    tutors: tutorsV2Router,
  }),
});

// Client usage
const apiV1 = createTRPCProxyClient<AppRouter['v1']>({ ... });
const apiV2 = createTRPCProxyClient<AppRouter['v2']>({ ... });
```

**Version Sunset Policy:**
- Minimum support: 12 months after new version release
- Deprecation notices: 6 months before sunset
- Final sunset: Only after usage < 1% of requests

---

## Best Practices

### DO

✅ Use descriptive procedure names
✅ Validate all inputs with Zod
✅ Use proper tRPC error codes
✅ Log errors with context
✅ Return typed responses
✅ Use `protectedProcedure` for auth-required endpoints
✅ Keep procedures focused (single responsibility)
✅ Document complex logic with comments

### DON'T

❌ Skip input validation
❌ Return generic errors without context
❌ Mix authorization logic in multiple places
❌ Return different shapes from same procedure
❌ Use `any` types
❌ Put business logic in context
❌ Create mega-routers (split by domain)
❌ Expose internal database IDs without validation

---

## Testing API Procedures

```typescript
// packages/api/__tests__/routers/tutors.test.ts
import { appRouter } from '../src/routers';
import { createContext } from '../src/context';

describe('tutorsRouter', () => {
  it('requires authentication to create tutor', async () => {
    const ctx = await createContext({ user: null });
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.tutors.create({ name: 'John Doe', /*...*/ })
    ).rejects.toThrow('UNAUTHORIZED');
  });

  it('creates tutor with valid data', async () => {
    const ctx = await createContext({ user: mockUser });
    const caller = appRouter.createCaller(ctx);

    const tutor = await caller.tutors.create({
      name: 'John Doe',
      subjects: ['Math'],
      hourlyRate: 50,
    });

    expect(tutor.name).toBe('John Doe');
    expect(tutor.userId).toBe(mockUser.id);
  });
});
```

---

For implementation examples and setup, see:
- [Tech Stack](./tech_stack.md) - tRPC and technology choices
- [Architecture Overview](./architecture_overview.md) - API architecture and patterns
