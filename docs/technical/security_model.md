# Security Model

**Last Updated:** 2026-01-03

This document defines the security architecture, policies, and threat mitigation strategies for the platform.

---

## Security Layers

```
┌─────────────────────────────────────────┐
│  Layer 1: Network Security              │  HTTPS, CORS, DDoS protection
├─────────────────────────────────────────┤
│  Layer 2: Application Security          │  Authentication, Input validation
├─────────────────────────────────────────┤
│  Layer 3: API Security                  │  Authorization, Rate limiting
├─────────────────────────────────────────┤
│  Layer 4: Database Security             │  RLS, Encryption at rest
├─────────────────────────────────────────┤
│  Layer 5: Secrets Management            │  Vercel/EAS secrets, no hardcoded keys
└─────────────────────────────────────────┘
```

---

## Authentication Strategy

### Technology: Supabase Auth

| Feature | Implementation | Security Benefit |
|---------|----------------|------------------|
| **JWT Tokens** | Signed with secret, short expiration | Prevents token forgery |
| **Refresh Tokens** | Secure HTTP-only cookies | Prevents XSS attacks |
| **Password Hashing** | bcrypt (automatic via Supabase) | Protects against rainbow table attacks |
| **Email Verification** | Required before access | Prevents fake accounts |
| **Rate Limiting** | 5 attempts per 5 minutes | Prevents brute force attacks |

### Supported Authentication Methods

| Method | Use Case | Security Level |
|--------|----------|----------------|
| **Email/Password** | Default for all users | Medium (requires strong password policy) |
| **Magic Links** | Passwordless login | High (email account security) |
| **OAuth (Google, GitHub)** | Social login | High (delegated to trusted providers) |
| **Phone/SMS** | Optional 2FA | High (second factor) |

### Password Policy

- **Minimum length**: 8 characters
- **Complexity**: Mix of letters, numbers, symbols (enforced by Supabase)
- **Compromised passwords**: Checked against haveibeenpwned database
- **Password reset**: Time-limited tokens, one-time use

---

## Authorization Strategy

### Row Level Security (RLS)

**Pattern**: Database-level authorization policies

**Benefits:**
- Cannot be bypassed in application code
- Automatic enforcement across all queries
- Reduces application-level authorization logic
- Scales with database performance

### Key RLS Policies

#### 1. **User Profile Access**

```sql
-- Users can only view and edit their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

#### 2. **Session Access**

```sql
-- Students and tutors can only view their own sessions
CREATE POLICY "Users can view their sessions"
  ON sessions FOR SELECT
  USING (
    auth.uid() = student_id OR
    auth.uid() = tutor_id
  );

-- Only tutors can create sessions
CREATE POLICY "Only tutors can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tutors
      WHERE tutors.user_id = auth.uid()
      AND tutors.id = sessions.tutor_id
    )
  );
```

#### 3. **Payment Data**

```sql
-- Users can only view their own payment history
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Payments are read-only for users (created via webhooks)
-- No INSERT/UPDATE/DELETE policies for users
```

### Role-Based Access (Future)

**Current**: Binary roles (tutor vs student) via separate tables

**Future Multi-Tenancy**:
```sql
-- Add role-based permissions
CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id),
  organization_id UUID REFERENCES organizations(id),
  role TEXT CHECK (role IN ('admin', 'tutor', 'student', 'parent')),
  PRIMARY KEY (user_id, organization_id)
);
```

---

## Input Validation

### Validation Strategy: Zod Schemas

**Every tRPC procedure** uses Zod for runtime validation:

```typescript
// Example: Session creation
export const sessionsRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        tutorId: z.string().uuid(),
        studentId: z.string().uuid(),
        startTime: z.date().min(new Date(), 'Must be future date'),
        duration: z.number().min(15).max(480), // 15min - 8hrs
        notes: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Input is validated and typed!
    }),
});
```

**Security Benefits:**
- Prevents injection attacks (SQL, XSS, etc.)
- Type coercion vulnerabilities eliminated
- Ensures data integrity
- Clear error messages for debugging

### Sanitization

| Input Type | Sanitization | Library |
|------------|--------------|---------|
| **HTML** | Strip all HTML tags | DOMPurify (client-side) |
| **SQL** | Parameterized queries | Drizzle ORM (automatic) |
| **File uploads** | Validate MIME type, size | Supabase Storage |
| **URLs** | Validate protocol, domain | Zod URL validation |

---

## API Security

### CORS Configuration

**Development:**
- Web app: `http://localhost:3000`
- Marketing: `http://localhost:3001`
- Mobile (Expo): `/^exp:\/\/.*$/` (regex for Expo DevTools)

**Production:**
- Whitelist only: `https://tutorapp.com`, `https://www.tutorapp.com`
- No wildcards (prevents CORS bypass)

### Request Authentication

```typescript
// tRPC context extracts and verifies JWT
export const createContext = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { data: { user } } = await supabase.auth.getUser(token);

  return {
    user,        // null if not authenticated
    db,
    supabase,
  };
};

// Protected procedures require authentication
export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

### Rate Limiting

**Current**: Not implemented (low traffic expected for v1)

**Future**: Implement when scaling
```typescript
// Example: Upstash Rate Limit
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

// In tRPC middleware
const { success } = await ratelimit.limit(ctx.user.id);
if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
```

---

## Data Protection

### Encryption

| Data Type | At Rest | In Transit | Key Management |
|-----------|---------|------------|----------------|
| **Database** | AES-256 (Supabase) | TLS 1.3 | Managed by Supabase |
| **File Storage** | AES-256 (S3) | TLS 1.3 | Managed by Supabase |
| **JWT Tokens** | N/A | HTTPS only | Supabase Auth secret |
| **API Requests** | N/A | TLS 1.3 | Let's Encrypt certs |
| **Mobile Secure Storage** | OS keychain | TLS 1.3 | OS-managed |

### Sensitive Data Handling

| Data Type | Storage Policy | Access Policy |
|-----------|---------------|---------------|
| **Passwords** | Never stored (only hashes) | Never retrieved |
| **Payment Info** | Stored by Lemon Squeezy (PCI compliant) | Never touch our servers |
| **SSN/Tax IDs** | Not collected | N/A |
| **Email Addresses** | Encrypted at rest | Only for user's own data |
| **Session Notes** | Encrypted at rest | RLS enforced |

### Data Retention

| Data Type | Retention Period | Deletion Policy |
|-----------|-----------------|-----------------|
| **User accounts** | Until user requests deletion | Hard delete after 30-day grace |
| **Session history** | 2 years | Soft delete (anonymize) |
| **Payment records** | 7 years (tax compliance) | Archived, not deleted |
| **Logs** | 30 days | Automatic deletion (Axiom) |
| **Error traces** | 90 days | Automatic deletion (Sentry) |

---

## Mobile Security

### Expo Security Features

| Feature | Implementation | Security Benefit |
|---------|----------------|------------------|
| **Expo SecureStore** | OS keychain storage | Secure token storage |
| **Biometric Auth** | Face ID / Touch ID | Additional authentication layer |
| **Certificate Pinning** | TLS cert validation | Prevents MITM attacks |
| **Code Obfuscation** | Hermes engine | Makes reverse engineering harder |

### Mobile-Specific Threats

| Threat | Mitigation |
|--------|------------|
| **Jailbroken/Rooted devices** | Detect and warn (not block) |
| **Screen recording** | Mark sensitive screens as secure |
| **Clipboard snooping** | Clear clipboard after password paste |
| **Insecure storage** | Use SecureStore, never AsyncStorage for tokens |

---

## Payment Security

### Lemon Squeezy (Merchant of Record)

**Security Benefits:**
- PCI DSS Level 1 compliant (we're not)
- No credit card data touches our servers
- Handles 3D Secure, fraud detection
- Tax compliance built-in

### Webhook Security

```typescript
// Verify webhook signature
const signature = req.headers['x-signature'];
const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
const digest = hmac.update(rawBody).digest('hex');

if (signature !== digest) {
  return new Response('Invalid signature', { status: 401 });
}
```

**Additional Protections:**
- HTTPS only endpoints
- Idempotency keys (prevent duplicate charges)
- Webhook replay protection (timestamp validation)

---

## Secrets Management

### Storage Locations

| Environment | Storage | Access Method |
|-------------|---------|---------------|
| **Development** | `.env.local` (gitignored) | Environment variables |
| **Production Web** | Vercel Environment Variables | `process.env.*` |
| **Production Mobile** | EAS Secrets | `process.env.EXPO_PUBLIC_*` |
| **CI/CD** | GitHub Secrets | Workflow environment |

### Secret Rotation Policy

| Secret Type | Rotation Frequency | Process |
|-------------|-------------------|---------|
| **API Keys** | Every 90 days | Manual, triggered via calendar |
| **JWT Secret** | Yearly | Coordinated with Supabase support |
| **Webhook Secrets** | On compromise | Immediate via service dashboard |
| **Database Credentials** | Never (managed by Supabase) | N/A |

### What NOT to Commit

❌ **Never commit:**
- `.env.local` files
- API keys or secrets
- Private keys or certificates
- Access tokens
- Database credentials
- Service account keys

✅ **Safe to commit:**
- `.env.example` (template without values)
- Public API endpoints
- Non-sensitive configuration
- `NEXT_PUBLIC_*` variables (exposed to browser anyway)

---

## Monitoring & Incident Response

### Security Monitoring

| Event | Alert Threshold | Response |
|-------|----------------|----------|
| **Failed login attempts** | 5 per user per 5min | Lock account, email notification |
| **Unusual API activity** | 100 req/min per IP | Rate limit, investigate |
| **Database errors** | > 1% error rate | Alert #incidents Slack channel |
| **Payment failures** | Any webhook signature fail | Alert immediately |

### Incident Response Plan

**1. Detection** (0-5 minutes)
- Automated alerts via Sentry, Better Stack, Axiom
- Manual reports via support email

**2. Triage** (5-15 minutes)
- Assess severity (critical, high, medium, low)
- Determine affected users
- Check if ongoing attack

**3. Containment** (15-30 minutes)
- Block malicious IPs
- Revoke compromised tokens
- Enable maintenance mode if needed

**4. Remediation** (30-120 minutes)
- Fix vulnerability
- Deploy patch
- Verify fix in staging first

**5. Communication** (Immediate)
- Notify affected users via email
- Post status update on app
- Update incident log

**6. Post-Mortem** (1-3 days)
- Document root cause
- Implement prevention measures
- Update runbook

---

## Compliance & Privacy

### GDPR Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Right to access** | API endpoint for data export |
| **Right to deletion** | Hard delete within 30 days |
| **Right to portability** | JSON export of all user data |
| **Privacy by design** | Minimal data collection |
| **Consent management** | Cookie consent banner |
| **Data processing agreements** | With all third-party services |

### Data Processing Locations

| Service | Data Location | GDPR Compliant |
|---------|---------------|----------------|
| **Supabase** | EU region (configurable) | Yes |
| **Vercel** | Global edge (configurable) | Yes |
| **Lemon Squeezy** | US/EU | Yes |
| **Resend** | US | Yes (DPA available) |
| **Sentry** | US | Yes (DPA available) |

---

## Security Best Practices

### For Developers

✅ **DO:**
- Use Zod for all input validation
- Never bypass RLS policies
- Test auth logic thoroughly
- Use `NEXT_PUBLIC_*` only for truly public data
- Run `npm audit` regularly
- Keep dependencies updated
- Use TypeScript strict mode

❌ **DON'T:**
- Hardcode secrets in code
- Trust client-side validation alone
- Expose service role keys to client
- Log sensitive data (passwords, tokens)
- Use `eval()` or `innerHTML`
- Skip input sanitization

### Security Checklist (Pre-Deploy)

- [ ] All secrets in environment variables
- [ ] RLS policies enabled on all tables
- [ ] CORS configured correctly
- [ ] Input validation on all endpoints
- [ ] HTTPS enforced
- [ ] No console.log with sensitive data
- [ ] Webhook signatures verified
- [ ] Error messages don't leak info
- [ ] Dependencies up to date (`npm audit`)
- [ ] Security headers configured

---

## Known Limitations (v1)

### Intentionally NOT Implemented (Yet)

| Feature | Reason | Future Plan |
|---------|--------|-------------|
| **Rate limiting** | Low traffic expected | Add when scaling |
| **DDoS protection** | Vercel provides basic | Upgrade to Cloudflare if needed |
| **Web Application Firewall** | Not needed at current scale | Add with Cloudflare |
| **IP whitelisting** | Hinders user experience | Only for admin endpoints |
| **Multi-factor authentication** | Optional feature | Add in v2 |

---

For implementation details and code examples, see:
- [TECH_STACK.md](../TECH_STACK.md) - Security implementation guide
- [Monorepo Structure Design](../plans/2026-01-03-monorepo-structure-design.md) - Security architecture examples
