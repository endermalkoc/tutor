# Testing Strategy

**Last Updated:** 2026-01-03

This document outlines the testing approach, frameworks, and quality goals for the platform.

---

## Overview

The testing strategy balances **speed**, **confidence**, and **maintainability** through a combination of unit tests, integration tests, and end-to-end tests.

---

## Testing Frameworks

| Framework | Purpose | Why Chosen |
|-----------|---------|------------|
| **Vitest** | Unit & integration tests | Fast, Vite-powered, excellent TypeScript support, compatible with Jest |
| **Playwright** | End-to-end tests | Cross-browser, reliable, excellent debugging, supports parallel execution |

---

## Testing Pyramid

```
        ╱▔▔▔▔▔▔▔▔▔▔╲
       ╱  E2E Tests  ╲     ← Slow, expensive, high confidence
      ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲
     ╱  Integration   ╲    ← Medium speed, tests boundaries
    ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲
   ╱   Unit Tests      ╲   ← Fast, cheap, foundational
  ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔╲
```

---

## Test Coverage Goals

### By Component

| Component | Coverage Goal | Priority |
|-----------|--------------|----------|
| **API routers** (tRPC) | 80%+ | High |
| **Database schemas** | 100% (via integration tests) | High |
| **Email templates** | 70%+ | Medium |
| **Utility functions** | 90%+ | Medium |
| **UI components** | 60%+ | Low |

### By Test Type

| Test Type | Coverage | Focus |
|-----------|----------|-------|
| **Unit Tests** | Broad | Business logic, utilities, pure functions |
| **Integration Tests** | Targeted | API endpoints, database operations, auth flows |
| **E2E Tests** | Critical paths | User journeys, payment flows, booking workflows |

### Critical User Flows (100% E2E Coverage Required)

1. **Authentication**
   - Sign up
   - Login
   - Password reset
   - Session management

2. **Booking Flow**
   - Search tutors
   - Book session
   - Receive confirmation
   - Session reminders

3. **Payment Flow**
   - Add payment method
   - Subscribe to plan
   - Process payment
   - Handle payment failures

4. **Session Management**
   - View upcoming sessions
   - Cancel session
   - Complete session
   - Leave review

---

## Test Organization

### Monorepo Structure

```
tutor/
├── packages/
│   ├── api/
│   │   ├── src/
│   │   │   └── routers/
│   │   │       └── tutors.ts
│   │   └── __tests__/
│   │       └── routers/
│   │           └── tutors.test.ts      # Unit/integration tests
│   │
│   ├── database/
│   │   ├── src/
│   │   │   └── schema/
│   │   └── __tests__/                   # Schema validation tests
│   │
│   ├── email/
│   │   ├── src/templates/
│   │   └── __tests__/                   # Template rendering tests
│   │
│   └── e2e/                             # Shared E2E tests
│       ├── tests/
│       │   ├── auth-flow.spec.ts        # Cross-app flows
│       │   ├── booking-flow.spec.ts
│       │   └── payment-flow.spec.ts
│       └── playwright.config.ts
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   ├── __tests__/                   # App-specific unit tests
│   │   ├── e2e/                         # App-specific E2E tests
│   │   └── vitest.config.ts
│   │
│   └── mobile/
│       ├── src/
│       └── __tests__/                   # Mobile-specific tests
```

### Test Location Guidelines

| Test Type | Location | Reasoning |
|-----------|----------|-----------|
| **Unit tests** | `__tests__/` next to source | Fast feedback, close to code |
| **Integration tests** | `packages/*/__tests__/` | Test package boundaries |
| **Shared E2E tests** | `packages/e2e/` | Cross-app user flows |
| **App-specific E2E** | `apps/*/e2e/` | Platform-specific scenarios |

---

## Testing Approach by Layer

### API Layer (tRPC)

**What to Test:**
- Input validation (Zod schemas)
- Business logic correctness
- Authorization rules
- Error handling

**Example:**
```typescript
// packages/api/__tests__/routers/tutors.test.ts
describe('tutorsRouter', () => {
  it('requires authentication to create tutor', async () => {
    const caller = appRouter.createCaller({ user: null, db });
    await expect(caller.tutors.create({ name: 'John' }))
      .rejects.toThrow('UNAUTHORIZED');
  });

  it('creates tutor with valid data', async () => {
    const caller = appRouter.createCaller({ user: mockUser, db });
    const tutor = await caller.tutors.create({ name: 'John', ... });
    expect(tutor.name).toBe('John');
  });
});
```

### Database Layer

**What to Test:**
- Schema constraints
- Relations
- Migrations (don't break existing data)

**Approach:**
- Use in-memory SQLite for fast tests
- Use Supabase test instance for migration tests

### Email Templates

**What to Test:**
- Renders without errors
- Contains required content
- Links are correct

**Example:**
```typescript
// packages/email/__tests__/templates/booking-confirmation.test.tsx
it('renders booking confirmation email', () => {
  const html = render(<BookingConfirmation session={mockSession} />);
  expect(html).toContain('Your session is confirmed');
  expect(html).toContain(mockSession.tutor.name);
});
```

### End-to-End Tests

**What to Test:**
- Complete user journeys
- Cross-app integrations
- Visual regressions (optional)

**Example:**
```typescript
// packages/e2e/tests/booking-flow.spec.ts
test('student can book a session', async ({ page }) => {
  await page.goto('/login');
  await login(page, 'student@example.com');

  await page.goto('/tutors');
  await page.click('text=Book Session');
  await page.selectOption('[name=time]', '2024-01-15T10:00');
  await page.click('button:has-text("Confirm Booking")');

  await expect(page.locator('.success')).toContainText('Session booked');
});
```

---

## Test Data Strategy

### Unit & Integration Tests
- **Use factories** for test data generation
- **Mock external services** (Lemon Squeezy, Resend)
- **Use test database** with seed data reset between tests

### E2E Tests
- **Use stable test data** (seeded test accounts)
- **Isolate test runs** (unique user per test)
- **Clean up after tests** (optional, can reset DB)

---

## Continuous Integration

### PR Checks (All Must Pass)

```yaml
CI Pipeline:
├── Lint & Format Check          (~30s)
├── Type Check                    (~1min)
├── Unit Tests                    (~2min)
├── Build                         (~3min)
└── E2E Tests                     (~5min)
                                  ─────────
                        Total:    ~11min
```

### CI Configuration

```yaml
# .github/workflows/ci.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run unit tests
        run: pnpm turbo test

      - name: Run E2E tests
        run: pnpm turbo test:e2e
```

---

## Test Performance

### Speed Targets

| Test Type | Target | Current |
|-----------|--------|---------|
| Unit tests (all packages) | <2 minutes | TBD |
| E2E tests (critical paths) | <5 minutes | TBD |
| Full CI pipeline | <15 minutes | TBD |

### Optimization Strategies

- **Parallel execution**: Run tests across multiple workers
- **Selective testing**: Only test changed packages (Turborepo)
- **Caching**: Cache dependencies and build artifacts
- **Test splitting**: Distribute E2E tests across CI runners

---

## Testing Best Practices

### DO

✅ Test behavior, not implementation
✅ Write descriptive test names
✅ Keep tests independent and isolated
✅ Mock external dependencies
✅ Use factories for test data
✅ Test error cases
✅ Keep E2E tests focused on critical paths

### DON'T

❌ Test framework internals (React, Next.js)
❌ Test third-party libraries
❌ Couple tests to implementation details
❌ Share state between tests
❌ Write overly complex test setups
❌ Test everything with E2E tests

---

## Testing Commands

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter @repo/api test

# Run tests in watch mode
pnpm --filter @repo/api test -- --watch

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm --filter e2e test:e2e -- --ui

# Generate coverage report
pnpm test -- --coverage
```

---

## Quality Gates

### Before Merging PR

- ✅ All tests pass
- ✅ Coverage doesn't decrease
- ✅ No new linting errors
- ✅ Type check passes

### Before Deploying to Production

- ✅ All CI checks pass
- ✅ E2E tests pass against staging
- ✅ Manual QA for critical flows
- ✅ Smoke tests pass after deployment

---

## Future Improvements

### Planned

- **Visual regression testing** with Playwright
- **Performance testing** for API endpoints
- **Load testing** for critical paths
- **Contract testing** for mobile-web API integration
- **Mutation testing** for test suite quality

### Under Consideration

- **Snapshot testing** for UI components
- **Accessibility testing** automation
- **Security testing** integration
- **Code coverage reporting** (Codecov)

---

For implementation examples and setup instructions, see:
- [TECH_STACK.md](../TECH_STACK.md) - Testing framework setup
- [Monorepo Structure Design](../plans/2026-01-03-monorepo-structure-design.md) - Test organization
