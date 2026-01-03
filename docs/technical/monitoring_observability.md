# Monitoring & Observability

**Last Updated:** 2026-01-03

This document defines the observability stack, monitoring approach, and incident response procedures.

---

## Overview

Observability provides visibility into system health, performance, and user behavior through **errors**, **logs**, **metrics**, and **analytics**.

**Stack:**
- **Sentry**: Error tracking & performance monitoring
- **Axiom**: Structured logging for serverless
- **PostHog**: Product analytics & feature flags
- **Better Stack**: Uptime monitoring & alerts

---

## Error Tracking (Sentry)

### What We Track

| Error Type | Scope | Alert Threshold |
|------------|-------|-----------------|
| **Unhandled exceptions** | All apps | Immediate |
| **API errors** | tRPC procedures | > 1% error rate |
| **Failed transactions** | Payments, bookings | Immediate |
| **Performance issues** | Slow API calls (> 1s) | > 5% of requests |

### Sensitive Data Scrubbing

```typescript
// Automatically scrub sensitive data
Sentry.init({
  beforeSend(event) {
    // Remove auth headers
    if (event.request?.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.cookies;
    }

    // Redact email addresses
    if (event.user?.email) {
      event.user.email = event.user.email.replace(/.+@/, '***@');
    }

    return event;
  },
});
```

### Error Context

Every error includes:
- User ID (if authenticated)
- Request ID
- API endpoint
- User agent
- Environment (dev/staging/prod)
- Release version

---

## Structured Logging (Axiom)

### Log Levels

| Level | Use Case | Example |
|-------|----------|---------|
| **info** | Normal operations | "User logged in", "Session created" |
| **warn** | Recoverable issues | "Rate limit approached", "Deprecated API used" |
| **error** | Failures | "Payment failed", "Database connection lost" |
| **debug** | Development only | "Query executed", "Cache hit" |

### Log Structure

```typescript
logger.info('Session created', {
  sessionId: session.id,
  tutorId: session.tutorId,
  studentId: session.studentId,
  startTime: session.startTime,
  duration: session.duration,
  userId: ctx.user.id,
  requestId: ctx.requestId,
});
```

### Querying Logs

```
// Find all failed payments in last hour
['level'] == 'error' && ['message'] == 'Payment failed' && ['@timestamp'] > ago(1h)

// User activity timeline
['userId'] == 'user-123' | sort by ['@timestamp'] desc
```

---

## Product Analytics (PostHog)

### Key Events Tracked

| Event | Properties | Purpose |
|-------|-----------|---------|
| `session_booked` | tutorId, duration, subject | Conversion tracking |
| `payment_completed` | amount, plan | Revenue tracking |
| `user_signed_up` | method (email/oauth) | Acquisition tracking |
| `search_performed` | query, results_count | Search optimization |
| `tutor_profile_viewed` | tutorId | Engagement tracking |

### Feature Flags

```typescript
// Check if feature is enabled for user
const showNewBookingFlow = posthog.isFeatureEnabled('new-booking-flow');

if (showNewBookingFlow) {
  return <NewBookingFlow />;
}
return <OldBookingFlow />;
```

### Session Replay

**When to Use:**
- Debugging user-reported issues
- Understanding drop-off points
- Analyzing confusing UI interactions

**Privacy:**
- Mask all input fields by default
- Exclude sensitive pages (payment forms)

---

## Uptime Monitoring (Better Stack)

### Monitored Endpoints

| Endpoint | Frequency | Timeout | Alert On |
|----------|-----------|---------|----------|
| `GET /api/health` | 30s | 5s | 2 consecutive failures |
| `GET /` | 60s | 10s | 3 consecutive failures |
| `GET /api/trpc/health` | 30s | 5s | 2 consecutive failures |

### Alert Channels

- **Slack**: #alerts (all incidents)
- **Email**: team@tutorapp.com (critical only)
- **SMS**: On-call engineer (critical only)

---

## Dashboards

### Application Health Dashboard

**Metrics:**
- Error rate (last 24h)
- API response time (p50, p95, p99)
- Active users (last 24h)
- Deployment frequency
- Failed deployments

### Business Metrics Dashboard

**Metrics:**
- Sessions booked (today/week/month)
- Revenue (MRR, total)
- Active tutors/students
- Conversion rate (signup → booking)
- Churn rate

---

## Alerting Strategy

### Alert Levels

| Level | Response Time | Examples |
|-------|---------------|----------|
| **Critical** | Immediate (< 5min) | API down, payment system failure |
| **High** | < 30min | Error rate spike, database issues |
| **Medium** | < 2 hours | Performance degradation |
| **Low** | Next business day | Low disk space, deprecated API usage |

### Alert Fatigue Prevention

- **Aggregate similar alerts**: Group related errors
- **Smart thresholds**: Dynamic based on traffic patterns
- **Snooze capability**: Temporarily silence known issues
- **Auto-resolve**: Clear alerts when issue resolves

---

## Incident Response

### Incident Severity

| Severity | Definition | Example |
|----------|------------|---------|
| **P0** | Service down | API completely unavailable |
| **P1** | Major degradation | Payment processing failing |
| **P2** | Partial degradation | Slow API responses |
| **P3** | Minor issue | UI bug affecting small % of users |

### Response Procedure

```
1. Detection (0-5min)
   ├─ Automatic: Monitoring alerts
   └─ Manual: User reports

2. Triage (5-15min)
   ├─ Assess severity
   ├─ Identify affected users
   └─ Check if ongoing attack

3. Contain (15-30min)
   ├─ Block malicious IPs
   ├─ Enable maintenance mode (if needed)
   └─ Revoke compromised tokens

4. Fix (30-120min)
   ├─ Identify root cause
   ├─ Deploy fix
   └─ Verify resolution

5. Communicate (Ongoing)
   ├─ Update status page
   ├─ Notify affected users
   └─ Post-mortem (within 3 days)
```

---

## Performance Monitoring

### Core Web Vitals

| Metric | Target | Current |
|--------|--------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5s | TBD |
| **FID** (First Input Delay) | < 100ms | TBD |
| **CLS** (Cumulative Layout Shift) | < 0.1 | TBD |

### API Performance

| Metric | Target | Alert If |
|--------|--------|----------|
| **p50 response time** | < 200ms | > 500ms |
| **p95 response time** | < 500ms | > 1s |
| **p99 response time** | < 1s | > 2s |
| **Error rate** | < 0.1% | > 1% |

---

## Observability Best Practices

### DO

✅ Log with structured data (JSON)
✅ Include request IDs for tracing
✅ Use appropriate log levels
✅ Track business metrics, not just technical
✅ Set up alerts before incidents happen
✅ Test alert channels regularly

### DON'T

❌ Log sensitive data (passwords, tokens)
❌ Create alerts that fire too often
❌ Ignore warnings until they become errors
❌ Track vanity metrics without action plan
❌ Over-rely on one tool
❌ Forget to monitor third-party services

---

For implementation details, see:
- [Tech Stack](./tech_stack.md) - Monitoring tools and services
- [Infrastructure](./infrastructure.md) - Service configuration
