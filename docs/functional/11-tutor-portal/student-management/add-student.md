# Add New Student

## Overview

The Add New Student feature allows tutors to create student records with contact, family, lesson, and billing information in a single, streamlined form.

## UX Design Rationale

### Problem Statement

Adding a new student requires capturing multiple categories of information:
1. Student identity (name, type, status, contact)
2. Student optional details (birthday, gender, school, academic info)
3. Family information (for children)
4. Lesson settings (duration, category)
5. Billing method (per lesson, monthly, hourly)
6. Invoice scheduling (frequency, due dates)

The challenge: How to collect this information without overwhelming the user or creating unnecessary friction.

### Options Considered

| Approach | Pros | Cons |
|----------|------|------|
| **Multi-step wizard** | Focused, less overwhelming | More clicks, slower for repeat users, hard to compare sections |
| **Single long form** | Everything visible, fast for power users | Overwhelming, high abandonment |
| **Ask what to enter first** | Personalized | Extra decision point, adds friction |
| **Progressive disclosure** | Best of both worlds | Requires careful design |

### Decision: Structured Single Page with Inline Expansion

For **power users performing repeated tasks** (tutors adding many students over time), UX research shows:

> "Wizards work best for infrequent, complex, branching tasks. For frequent tasks, power users prefer seeing everything at once with good defaults."

**Key principles applied:**

1. **Three primary sections always visible** — Student, Family, Lessons & Billing
2. **Inline expansion per section** — Each section has its own "+ Add more..." rather than one big "Show More Fields" button
3. **Smart defaults** — Sensible pre-selections minimize decisions
4. **Merge related concerns** — Billing method + Invoice scheduling in one section
5. **Single page** — No wizard steps, no separate invoicing page

### Form Structure

```
┌─────────────────────────────────────────────────────────────┐
│  STUDENT                                        [Required]  │
│  Name, Type, Status, Contact                                │
│  + Add birthday, gender, school...              [Optional]  │
├─────────────────────────────────────────────────────────────┤
│  FAMILY                                    (Children only)  │
│  Select existing OR Create new                              │
│  + Add guardian address, details...             [Optional]  │
├─────────────────────────────────────────────────────────────┤
│  LESSONS & BILLING                                          │
│  Duration, Category, Billing method, Price                  │
│  + Set up automatic invoicing                   [Optional]  │
├─────────────────────────────────────────────────────────────┤
│  NOTES                                          [Optional]  │
└─────────────────────────────────────────────────────────────┘
```

---

## Access

Always available in student management.

## Workflow

### Step 1: Open Form

1. User initiates add student action
2. Single-page student creation form displays
3. Smart defaults pre-populated

### Step 2: Complete Primary Sections

**Section 1: Student Information (Required)**

Core fields (always visible):
- **First Name** — Required
- **Last Name** — Required
- **Student Type** — Child (default) or Adult
- **Status** — Active (default), Trial, Waiting, Lead, or Inactive
- **Email Address** — Optional, validated format
- **Phone Number** — Optional, validated format
- **SMS Capable** — Checkbox, default checked when phone provided

Expandable fields (via "+ Add birthday, gender, school..."):
- Gender
- Birthday
- School (autocomplete)
- Subjects (multi-select, autocomplete)
- Skill Level
- Skype Username
- FaceTime ID
- Referrer (autocomplete from previous entries)
- Student Since (date)

**Section 2: Family Information (Children Only)**

This section only displays when Student Type = Child. Adults are independent (no family assignment).

Family assignment options:
- **Add to existing family** — Combobox to search/select
- **Create new family** — Inline guardian entry

If adding to existing family:
- Search by family name, parent name, or email
- Selecting a family links student to that family's billing and contacts
- Child inherits family address

If creating new family:

Core guardian fields (always visible):
- Guardian First Name — Required
- Guardian Last Name — Required
- Guardian Email OR Mobile — At least one required
- SMS Capable — Checkbox, default checked

Expandable fields (via "+ Add guardian address..."):
- Address (street)
- City
- State (combobox for US, text field otherwise)

Family name auto-generated from guardian's last name (e.g., "Smith Family").

**Section 3: Lessons & Billing**

Lesson settings (always visible):
- **Lesson Category** — Individual (default) or Group
- **Default Duration** — Select: 30 min (default), 45, 60, 90, or Custom

Billing method (always visible):
- **No automatic billing** — Manual invoicing only
- **Per lesson** — $ amount per lesson (default selection)
- **Monthly flat rate** — $ amount per month
- **Hourly rate** — $ amount per hour

Expandable invoicing (via "+ Set up automatic invoicing"):

Quick preset dropdown:
- **No auto-invoicing** (default) — Manual invoice creation
- **Simple Monthly** — Invoice monthly on 1st, due on receipt
- **Bi-weekly** — Invoice every 2 weeks
- **Custom...** — Reveals full configuration

Full configuration (when Custom selected):
- Billing cycle start date
- Invoice type (Prepaid/Postpaid)
- Schedule frequency (Weekly/Monthly/Annual)
- Invoice creation timing
- Payment due date terms

See [Invoice Scheduling Settings](../invoicing/invoice-scheduling.md) for detailed field specifications.

**Section 4: Notes (Optional)**

- Private tutor notes textarea
- Only visible to tutors, not shared with students or families

### Step 3: Save

1. User clicks "Create Student"
2. System validates all fields
3. If validation passes:
   - Student record created
   - Contact record created/linked
   - Family association established (if child)
   - Invoicing configuration applied (if set)
   - Success toast displayed with options
4. If validation fails:
   - Inline error messages displayed
   - Focus moves to first error

---

## Form Validation

### Required Field Validation

- First Name and Last Name must be provided
- Student Type must be selected
- Status must be selected
- If Student Type = Child, family must be selected or created
- If creating new family, guardian name and at least email or phone required

### Format Validation

- Email must be valid email format if provided
- Phone number must follow valid format if provided
- Price must be >= 0 if provided
- Duration must be positive integer if custom

### Business Logic Validation

- If Student Type = Child, family assignment is required
- If Student Type = Child and creating new family, guardian information required
- If Student Type = Adult, no family section displayed
- If billing method selected (not "None"), price field required

---

## Smart Defaults

| Field | Default Value | Rationale |
|-------|---------------|-----------|
| Student Type | Child | Most common for tutoring |
| Status | Active | Optimistic, ready to schedule |
| Duration | 30 minutes | Industry standard |
| Billing Method | Per lesson | Most flexible starting point |
| Auto-invoicing | None | Opt-in to complexity |
| SMS Capable | Checked | Assume modern phones |

---

## Success Confirmation

After save, display toast notification:

- "Student [Name] added successfully"
- Action buttons:
  - **Add another to this family** — Clears form, keeps family selected
  - **View student** — Navigate to student detail page
- Toast auto-dismisses after 10 seconds
- Clicking outside dismisses immediately

---

## Error Handling

### Duplicate Detection

- Check for existing students with same name in same family
- Warn if potential duplicate detected
- Allow user to proceed or cancel

### Validation Errors

- Inline error messages below invalid fields
- Error styling on field border
- Focus automatically moves to first error

### Network Errors

- Retry mechanism for save failures
- Data preserved if network error occurs
- Clear error message with retry option

---

## Cancel Behavior

- If form has unsaved changes, show confirmation modal
- "Discard changes?" with Keep editing / Discard options
- If no changes, navigate directly to student list

---

## Integration Points

- **Student Entity** — Creates student record
- **Contact Entity** — Creates/updates contact information
- **Family Entity** — Links to family or creates new family
- **Guardian Entity** — Creates guardian if new family
- **Invoice Settings** — Stores invoicing configuration on family

---

## Responsive Behavior

- On mobile (< 768px):
  - Sidebar hidden
  - Form sections stack vertically
  - Full-width inputs
  - Buttons stack vertically in footer

---

## Accessibility

- All form fields have associated labels
- Required fields marked with asterisk and aria-required
- Error messages linked via aria-describedby
- Keyboard navigation for all interactive elements
- Focus management on section expansion
- Color not sole indicator of state (icons + text for errors)
