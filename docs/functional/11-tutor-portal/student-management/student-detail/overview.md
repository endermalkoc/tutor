# Student Detail - Overview Tab

## Purpose

The Overview tab serves as the **relationship portal** for a student, helping tutors prepare for lessons and understand their teaching relationship at a glance. It prioritizes actionable information (next lesson, recent context) over administrative data (billing, personal details).

## Design Principles

1. **Relationship over records** - Present information as a teaching relationship, not a database entry
2. **Future-focused** - Lead with what's next (upcoming lesson), not just what was
3. **Contextual surfacing** - Show relevant notes and reminders before lessons
4. **Progressive disclosure** - Primary info visible, secondary info collapsible

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ STUDENT HEADER (Sticky)                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Avatar | Name | Badges | Next Lesson | Contact | Family     │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PRE-LESSON CONTEXT                                   [Collapse] │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Last lesson recap | Homework status | Today's focus         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ LESSON SETTINGS (Primary)                               [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Subjects, duration, category, skill level                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ CONTACT & NOTIFICATIONS (Secondary)                     [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Email, phone, notification preferences                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ FAMILY (Secondary, Child only)                          [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Guardian info + Address + Siblings                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ NOTES                                            [+ Quick Add]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Private tutor notes with inline add                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ BILLING SUMMARY (Collapsed by default)               [Expand]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Compact: Rate + Balance | Expanded: Full details            │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PERSONAL DETAILS (Collapsed by default)              [Expand]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Birthday, school, referrer, student since                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Student Header (Sticky)

The header provides identity and key context, remaining visible while scrolling.

### Display Elements

| Element | Description |
|---------|-------------|
| Avatar | Initials with colored background based on name |
| Full Name | Student's first and last name (prominent) |
| Student Type Badge | "Child" or "Adult" |
| Status Badge | Active (green), Trial (indigo), Waiting (amber), Lead (cyan), Inactive (gray) |
| Next Lesson | Date/time of upcoming scheduled lesson, or "No upcoming lessons" |
| Relationship Duration | "Teaching since Sep 2024 (4 months)" |
| Contact Icons | Email and phone quick-access icons |
| Family Link | For children: "Primary Contact: [Name]" or "[Relationship]: [Name]" (e.g., "Mother: Jennifer Chen") with link to family |

### Next Lesson Display

| State | Display |
|-------|---------|
| Lesson today | "Today at 3:00 PM" (highlighted) |
| Lesson this week | "Tomorrow at 3:00 PM" or "Friday at 3:00 PM" |
| Lesson scheduled | "Jan 15 at 3:00 PM" |
| No lessons | "No upcoming lessons" with "Schedule" action |

### Header Actions

| Action | Type | Behavior |
|--------|------|----------|
| Schedule Lesson | Primary button | Opens lesson scheduling flow |
| More Actions | Icon button with dropdown | Edit Student, Change Status, Send Message, Archive, Delete |

---

## Pre-Lesson Context

Helps tutors prepare for upcoming lessons by surfacing relevant recent context.

### Display Conditions

- **Expanded by default** when next lesson is within 48 hours
- **Collapsed** when no lesson scheduled within 48 hours
- **Hidden** when no lessons have occurred yet

### Content

| Field | Description |
|-------|-------------|
| Last Lesson Summary | Date, topics covered, brief outcome |
| Homework Status | Assigned items and completion status if tracked |
| Recent Notes | Most recent tutor note (truncated) |
| Suggested Focus | AI-suggested or manually set focus for next lesson |

### Actions

| Action | Behavior |
|--------|----------|
| View Full Lesson History | Switches to Lessons tab |
| Add Lesson Note | Opens quick note input |

### Empty State

If no previous lessons:
- Message: "First lesson coming up!"
- Prompt: "Add notes about what you'd like to cover"

---

## Lesson Settings (Primary Section)

Core lesson configuration used frequently by tutors.

### View Mode

| Field | Display Format |
|-------|----------------|
| Subjects | Subject tag badges (visually distinct from custom tags) |
| Default Duration | e.g., "30 minutes", "45 minutes", "60 minutes" |
| Lesson Category | "Individual" or "Group" |
| Skill Level | Text with optional progress indicator |
| Tags | Custom tag badges (outlined style, distinct from subjects) |

### Tag Differentiation

- **Subject tags**: Filled background with primary color family
- **Custom tags**: Outlined/bordered style with neutral color

### Edit Mode

| Field | Input Type | Validation |
|-------|------------|------------|
| Subjects | Multi-select autocomplete | Optional |
| Default Duration | Select or custom input | Required, positive number |
| Lesson Category | Select | Required |
| Skill Level | Select | Optional |
| Tags | Multi-select autocomplete | Optional, create new inline |

---

## Contact & Notifications (Secondary Section)

Communication preferences and contact information.

### View Mode

| Field | Display Format |
|-------|----------------|
| Email | Mailto link (or "Not provided") |
| Phone | Tel link (or "Not provided") |
| SMS Capable | "Yes" or "No" (only shown if phone provided) |
| Address | Full formatted address (only for Adult students) |
| Last Contacted | "3 days ago" or "Never" |
| Email Lesson Reminders | Toggle switch (On/Off) |
| SMS Lesson Reminders | Toggle switch (On/Off) - only shown if phone provided |

### Edit Mode

| Field | Input Type | Validation |
|-------|------------|------------|
| Email | Email input | Valid email format if provided |
| Phone | Tel input | Valid phone format if provided |
| SMS Capable | Checkbox | Only shown if phone provided |
| Email Lesson Reminders | Toggle switch | Default on |
| SMS Lesson Reminders | Toggle switch | Default on, only shown if phone provided |

**Address Fields (Adult students only):**

| Field | Input Type | Validation |
|-------|------------|------------|
| Street | Text input | Optional |
| City | Text input | Optional |
| State | Combobox (US) or text input | Optional |
| Zip | Text input | Optional |

---

## Family (Secondary Section)

**Only displayed when Student Type = Child**

For Adult students, this section is hidden.

### View Mode

**Primary Contact**

Primary contact is visually distinguished with a left border accent (primary color).

| Field | Display Format |
|-------|----------------|
| Name | Full name |
| Role | "Primary Contact" |
| Relationship | Optional - e.g., "Mother", "Father", "Grandmother", "Aunt", "Foster Parent" |
| Display Format | "Primary Contact · Mother" (relationship shown inline if provided) |
| Emergency Badge | Red badge with first-aid icon if marked as emergency contact |
| Email | Mailto link (or "Not provided") |
| Phone | Tel link with SMS icon if capable |
| Address | Full formatted address (or "No address") |
| Contact Actions | Quick action buttons: Call, Email, Message |

**Additional Contacts** (if any)

- Listed below primary contact
- Same fields as primary contact
- Role displays as "Contact" with optional relationship inline
- Each contact has their own address; if same as primary, displays full address with "(same as [Primary Name])" note
- Emergency Badge shown if marked as emergency contact
- Quick action buttons (Call, Email, Message) for each contact
- Overflow menu (⋮) with actions: Set as Primary Contact, Mark as Emergency Contact, Delete Contact

**Siblings** (if any)

- List of other students in the same family
- Each sibling shows: Name, Status badge
- Clicking sibling name navigates to their detail page

### Edit Mode

**Per Contact Fields:**

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Relationship | Select + Text | Optional - Mother, Father, Stepmother, Stepfather, Grandmother, Grandfather, Aunt, Uncle, Sibling, Foster Parent, Other. When "Other" is selected, shows text input for custom relationship (e.g., "Au Pair", "Nanny", "Family Friend") |
| Email | Email input | At least email or phone required |
| Phone | Tel input | At least email or phone required |
| SMS Capable | Checkbox | Only shown if phone provided |
| Emergency Contact | Checkbox | Marks this person as an emergency contact; multiple contacts can be emergency contacts |

**Address Fields (per contact):**

| Field | Input Type | Validation |
|-------|------------|------------|
| Same as Primary | Checkbox | Only shown for additional contacts; hides address fields when checked |
| Street | Text input | Optional |
| City | Text input | Optional |
| State | Combobox (US) or text input | Optional |
| Zip | Text input | Optional |

### Contact Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| Add Contact | Opens Add Contact dialog | Always available |
| Delete Contact | Opens confirmation dialog before removing contact | Only for non-primary contacts |
| Set as Primary | Promotes contact to primary (current primary becomes regular contact) | Only for non-primary contacts |
| Mark as Emergency | Toggles emergency contact status | All contacts |

### Add Contact Dialog

Modal dialog for adding a new contact to the family.

**Fields:**

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Relationship | Select + Text | Optional - includes "Other" with custom text input |
| Email | Email input | At least email or phone required |
| Phone | Tel input | At least email or phone required |
| Emergency Contact | Checkbox | Optional |
| Same as Primary | Checkbox | Default checked; unchecking reveals address fields |
| Street | Text input | Optional (hidden when "Same as Primary" checked) |
| City | Text input | Optional |
| State | Combobox | Optional |
| Zip | Text input | Optional |

**Actions:**
- Cancel: Closes dialog without saving
- Add Contact: Validates and saves new contact, closes dialog

### Delete Confirmation

When deleting a contact, show confirmation dialog:
- Title: "Delete Contact"
- Message: "Are you sure you want to remove [Contact Name] as a contact? This action cannot be undone."
- Actions: Cancel (secondary), Delete Contact (danger/red)

### Family Actions

| Action | Description |
|--------|-------------|
| Change Family | Opens family selection to reassign student |

---

## Notes

Private tutor notes about the student. Not visible to students or families.

### View Mode

| Element | Description |
|---------|-------------|
| Note Content | Formatted note text, supports markdown |
| Last Updated | "Last updated: [date]" |
| Quick Add | Inline input field always visible at top |

### Quick Add Feature

- Text input with placeholder: "Add a quick note..."
- Submit on Enter or click "Add" button
- New notes prepend to existing content with timestamp

### Empty State

- Message: "No notes yet"
- Prompt: "Add notes about learning style, goals, or important context"

### Edit Mode (Full)

- Textarea input for editing all notes
- Auto-save or explicit save button
- Character limit indicator (if any)

---

## Billing Summary (Collapsed by Default)

Displays billing overview with minimal visual weight. Expands on demand.

### Collapsed View (Default)

Single line summary:
- "$50/lesson | Balance: $150 credit"
- Link: "View details"

### Expanded View

| Field | Display Format |
|-------|----------------|
| Billing Method | "Per Lesson", "Monthly Flat Rate", "Hourly Rate", or "Manual Invoicing" |
| Rate | Formatted currency (e.g., "$50.00 per lesson") |
| Auto-Invoicing | "Enabled" with schedule summary, or "Disabled" |
| Account Balance | Formatted currency with positive/negative indicator |
| Outstanding Invoices | Count of unpaid invoices with total amount (linked to Invoices tab) |

### Actions

| Action | Behavior |
|--------|----------|
| View Invoices | Switches to Invoices tab |
| Edit Billing Settings | Opens billing settings modal |

### Family Notice

For families with multiple students:
- Display: "Billing is managed at the family level for [Family Name]"

---

## Personal Details (Collapsed by Default)

Optional student information that is less frequently accessed.

### Collapsed View (Default)

Single line summary if data exists:
- "Female, 14 years old, Lincoln Middle School"
- Or: "No personal details" with "Add" link

### Expanded View

| Field | Display Format |
|-------|----------------|
| First Name | Text |
| Last Name | Text |
| Student Type | Badge: "Child" or "Adult" |
| Status | Colored status badge |
| Gender | Text |
| Birthday | Formatted date with calculated age |
| School | Text |
| Referrer | Text |
| Student Since | Formatted date |

### Edit Mode

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Student Type | Select (Child/Adult) | Required |
| Status | Select | Required |
| Gender | Select | Optional |
| Birthday | Date picker | Optional, must be in past |
| School | Autocomplete text | Optional |
| Referrer | Autocomplete text | Optional |
| Student Since | Date picker | Optional |

---

## Progress Indicators (Future Enhancement)

Visual indicators of student trajectory and goal completion.

### Planned Elements

| Element | Description |
|---------|-------------|
| Trend Indicator | Arrow showing improvement/stable/declining |
| Session Streak | "6 consecutive weekly sessions" |
| Goal Progress | Progress bar for defined learning goals |
| Milestone Badges | Achievements displayed on profile |

---

## Section Priority & Behavior

### Primary Sections
- Always visible, full visual weight
- Lesson Settings

### Secondary Sections
- Visible but lighter visual treatment
- Contact & Notifications
- Family (for children)
- Notes

### Collapsed Sections
- Show summary line only by default
- Expand on click
- Remember user preference per session
- Billing Summary
- Personal Details

---

## Validation

### Student Type Change

If changing Student Type from Child to Adult:
1. Warn: "Changing to Adult will remove family association"
2. Require confirmation before saving
3. On confirm: Remove family link, hide Family section

If changing Student Type from Adult to Child:
1. Prompt to select or create family
2. Cannot save without family assignment

### Required Field Changes

- First Name and Last Name always required
- Status always required
- For Child: Family association required

---

## Success Feedback

After saving changes:
- Success toast: "[Section name] updated successfully"
- Section returns to view mode
- Updated data immediately reflected

---

## Error Handling

### Save Errors

- Display inline validation errors below invalid fields
- Network errors show toast with retry option
- Form data preserved on error

### Data Load Errors

- If section fails to load, show error message with retry button
- Other sections remain functional
