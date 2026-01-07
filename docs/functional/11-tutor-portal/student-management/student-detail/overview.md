# Student Detail - Overview Tab

## Purpose

The Overview tab serves as the dashboard for a student, displaying key information at a glance: student details, family information, billing summary, and recent lesson activity.

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ STUDENT INFORMATION                                    [Edit]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Core fields + optional fields (if populated)                │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ FAMILY                                                 [Edit]   │
│ (Only displayed for Child student type)                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Guardian info + Address + Siblings                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ BILLING SUMMARY                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Billing method, rate, account balance                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ RECENT LESSONS                                      [View All]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Last 5 lessons with date, duration, status                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ NOTES                                                  [Edit]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Private tutor notes                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section 1: Student Information

Displays all student details captured during [Add Student](../add-student.md) flow.

### View Mode

**Core Fields (Always Displayed)**

| Field | Display Format |
|-------|----------------|
| First Name | Text |
| Last Name | Text |
| Student Type | Badge: "Child" or "Adult" |
| Status | Colored badge: Active (green), Trial (blue), Waiting (amber), Lead (gray), Inactive (gray) |
| Email | Mailto link (or "Not provided") |
| Phone | Tel link with SMS icon if capable (or "Not provided") |

**Optional Fields (Displayed if Populated)**

| Field | Display Format |
|-------|----------------|
| Gender | Text |
| Birthday | Formatted date (e.g., "January 15, 2015") with calculated age |
| School | Text |
| Subjects | Comma-separated list or tags |
| Skill Level | Text |
| Skype Username | Text with copy button |
| FaceTime ID | Text with copy button |
| Referrer | Text |
| Student Since | Formatted date |

**Lesson Settings (Always Displayed)**

| Field | Display Format |
|-------|----------------|
| Lesson Category | "Individual" or "Group" |
| Default Duration | e.g., "30 minutes", "45 minutes", "60 minutes" |

### Edit Mode

When user clicks "Edit":

- Section expands to show all fields (including empty optional fields)
- Fields become editable inputs matching [Add Student](../add-student.md) field types
- "Save" and "Cancel" buttons appear in section header
- Same validation rules as Add Student apply

### Edit Fields

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Student Type | Select (Child/Adult) | Required. Changing from Child to Adult removes family association |
| Status | Select | Required |
| Email | Email input | Valid email format if provided |
| Phone | Tel input | Valid phone format if provided |
| SMS Capable | Checkbox | Only shown if phone provided |
| Gender | Select | Optional |
| Birthday | Date picker | Optional, must be in past |
| School | Autocomplete text | Optional |
| Subjects | Multi-select autocomplete | Optional |
| Skill Level | Select | Optional |
| Skype Username | Text input | Optional |
| FaceTime ID | Text input | Optional |
| Referrer | Autocomplete text | Optional |
| Student Since | Date picker | Optional |
| Lesson Category | Select | Required |
| Default Duration | Select or custom input | Required, positive number |

---

## Section 2: Family

**Only displayed when Student Type = Child**

For Adult students, this section is hidden.

### View Mode

**Family Header**

| Element | Description |
|---------|-------------|
| Family Name | e.g., "Smith Family" |
| Created | Date family was created |

**Primary Guardian**

| Field | Display Format |
|-------|----------------|
| Name | Full name |
| Relationship | e.g., "Mother", "Father", "Guardian" (if captured) |
| Email | Mailto link (or "Not provided") |
| Phone | Tel link with SMS icon if capable |

**Additional Guardians** (if any)

- Listed below primary guardian
- Same fields as primary guardian

**Address** (if provided)

| Field | Display Format |
|-------|----------------|
| Street | Text |
| City | Text |
| State | Text |
| Full Address | Combined, formatted address |

**Siblings** (if any)

- List of other students in the same family
- Each sibling shows: Name, Status badge
- Clicking sibling name navigates to their detail page

### Edit Mode

When user clicks "Edit":

- Guardian fields become editable
- Address fields become editable
- Cannot change family assignment here (must create new family or reassign)
- Cannot edit siblings from this view (navigate to their detail page)

**Editable Fields**

| Field | Input Type | Validation |
|-------|------------|------------|
| Guardian First Name | Text input | Required |
| Guardian Last Name | Text input | Required |
| Guardian Email | Email input | At least email or phone required |
| Guardian Phone | Tel input | At least email or phone required |
| SMS Capable | Checkbox | Only shown if phone provided |
| Street | Text input | Optional |
| City | Text input | Optional |
| State | Combobox (US) or text input | Optional |

**Family Actions**

| Action | Description |
|--------|-------------|
| Change Family | Opens family selection to reassign student to different family |
| Add Guardian | Opens form to add another guardian to this family |

---

## Section 3: Billing Summary

Displays current billing configuration and account status. Read-only in Overview; edit in dedicated billing settings.

### Display Fields

| Field | Display Format |
|-------|----------------|
| Billing Method | "Per Lesson", "Monthly Flat Rate", "Hourly Rate", or "Manual Invoicing" |
| Rate | Formatted currency (e.g., "$50.00 per lesson", "$200.00 per month") |
| Auto-Invoicing | "Enabled" with schedule summary, or "Disabled" |
| Account Balance | Formatted currency with positive/negative indicator |
| Outstanding Invoices | Count of unpaid invoices with total amount |

### Actions

| Action | Behavior |
|--------|----------|
| View Invoices | Switches to Invoices tab |
| View Transactions | Switches to Transactions tab |
| Edit Billing Settings | Opens billing settings modal or navigates to billing configuration |

### Family Notice

For families with multiple students:
- Display: "Billing is managed at the family level for [Family Name]"

---

## Section 4: Recent Lessons

Shows the last 5 lessons for quick reference.

### Display Per Lesson

| Field | Display Format |
|-------|----------------|
| Date | Formatted date (e.g., "Mon, Jan 6, 2025") |
| Time | Formatted time range (e.g., "3:00 PM - 3:30 PM") |
| Duration | e.g., "30 min" |
| Status | Badge: Attended (green), Cancelled (red), No-show (amber), Scheduled (blue) |
| Notes Preview | Truncated first line of lesson notes (if any) |

### Empty State

If no lessons exist:
- Message: "No lessons recorded yet"
- Action: "Schedule First Lesson" button

### Actions

| Action | Behavior |
|--------|----------|
| View All | Switches to Lessons tab |
| Click Lesson Row | Opens lesson detail (if applicable) |

---

## Section 5: Notes

Private tutor notes about the student. Not visible to students or families.

### View Mode

- Display formatted note text
- Show "Last updated: [date]" if notes exist
- Show "No notes" placeholder if empty

### Edit Mode

- Textarea input
- Auto-save or explicit save button
- Character limit indicator (if any)

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
