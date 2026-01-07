# Student Detail - Homework Tab

## Purpose

The Homework tab displays all homework assignments for the student, including assigned work, submissions, grades, and feedback.

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ FILTERS & ACTIONS                                               │
│ [Status ▼] [Subject ▼] [Date Range ▼]         [+ Assign Work]   │
├─────────────────────────────────────────────────────────────────┤
│ HOMEWORK SUMMARY                                                │
│ Total: 24  |  Submitted: 20  |  Pending: 3  |  Overdue: 1       │
├─────────────────────────────────────────────────────────────────┤
│ HOMEWORK LIST                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Title           Subject   Due Date   Status      Grade      │ │
│ │ Chapter 5 Qs    Math      Jan 10     Submitted   A          │ │
│ │ Essay Draft     English   Jan 12     Pending     —          │ │
│ │ Practice Set    Math      Jan 5      Overdue     —          │ │
│ │ ...                                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Filters

### Status Filter

| Option | Description |
|--------|-------------|
| All | All homework (default) |
| Pending | Assigned but not yet submitted |
| Submitted | Student has submitted work |
| Graded | Tutor has reviewed and graded |
| Overdue | Past due date, not submitted |

### Subject Filter

- Multi-select from student's assigned subjects
- "All Subjects" option

### Date Range Filter

| Option | Description |
|--------|-------------|
| All Time | No date filtering |
| This Week | Current week |
| This Month | Current month |
| Last Month | Previous month |
| Custom | Date picker for range |

---

## Homework Summary

Quick statistics:

| Metric | Description |
|--------|-------------|
| Total | Total homework assignments |
| Submitted | Submitted (awaiting review or graded) |
| Pending | Assigned but not due yet |
| Overdue | Past due date without submission |

---

## Homework List

### Columns

| Column | Description | Sortable |
|--------|-------------|----------|
| Title | Assignment title/description | Yes |
| Subject | Subject area | Yes |
| Assigned | Date assigned | Yes |
| Due Date | Due date | Yes (default, ascending) |
| Status | Current status badge | Yes |
| Grade | Grade if reviewed (or "—") | Yes |
| Actions | Row action menu | No |

### Default Sort

- Sorted by Due Date, ascending (soonest due first)
- Overdue items highlighted

### Status Badges

| Status | Color | Description |
|--------|-------|-------------|
| Pending | Blue | Assigned, not yet due |
| Submitted | Green | Student submitted, awaiting review |
| Graded | Gray | Reviewed with grade/feedback |
| Overdue | Red | Past due date, no submission |
| Late | Amber | Submitted after due date |

---

## Assign Homework

User clicks "+ Assign Work" button:

### Assignment Form

| Field | Type | Required |
|-------|------|----------|
| Title | Text input | Yes |
| Description | Textarea | No |
| Subject | Select from student's subjects | Yes |
| Due Date | Date picker | Yes |
| Due Time | Time picker | No (defaults to end of day) |
| Attachments | File upload (multiple) | No |
| Instructions | Rich text or plain text | No |

### Assignment Actions

| Action | Behavior |
|--------|----------|
| Save as Draft | Saves without notifying student |
| Assign | Saves and optionally notifies student/family |
| Cancel | Discards form |

---

## Homework Detail

Click on homework row to view full details:

### Detail Panel/Page Content

**Assignment Information**

| Field | Description |
|-------|-------------|
| Title | Assignment title |
| Description | Full description text |
| Subject | Subject area |
| Assigned Date | When homework was assigned |
| Due Date | When homework is due |
| Status | Current status |
| Attachments | Files attached by tutor |

**Submission Information** (if submitted)

| Field | Description |
|-------|-------------|
| Submitted Date | When student submitted |
| Submitted Files | Files uploaded by student |
| Student Notes | Any notes from student |

**Review Information** (if graded)

| Field | Description |
|-------|-------------|
| Grade | Letter grade, percentage, or points |
| Feedback | Tutor's feedback comments |
| Reviewed Date | When tutor reviewed |

---

## Row Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| View | Open homework detail | Always |
| Edit | Modify assignment details | Before submission |
| Grade | Open grading interface | After submission |
| Send Reminder | Notify student about pending work | Pending/Overdue |
| Delete | Remove assignment | With confirmation |

---

## Grading Interface

When tutor clicks "Grade" on a submitted homework:

### Grading Form

| Field | Type | Description |
|-------|------|-------------|
| Grade | Input or select | Configurable: Letter (A-F), Percentage, Points, Pass/Fail |
| Feedback | Textarea | Written feedback for student |
| Attachments | File upload | Marked-up files, additional resources |

### Grading Actions

| Action | Behavior |
|--------|----------|
| Save Grade | Saves grade and feedback |
| Save & Notify | Saves and notifies student/family |
| Cancel | Discards changes |

---

## Empty State

If no homework exists:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    📝                                           │
│                                                                 │
│              No homework assigned yet                           │
│                                                                 │
│       Assign homework to track student progress                 │
│             and provide structured practice.                    │
│                                                                 │
│              [+ Assign First Homework]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Notifications

### To Student/Family

| Event | Notification |
|-------|--------------|
| New Assignment | "New homework assigned: [Title]" |
| Due Reminder | "Homework due tomorrow: [Title]" |
| Overdue | "Homework overdue: [Title]" |
| Graded | "Homework graded: [Title] - [Grade]" |

### Notification Preferences

- Respect student/family notification settings
- Email and/or in-app notifications
- Optional SMS for urgent reminders

---

## Pagination

- Default: 25 items per page
- Options: 25, 50, 100
- Maintains filter state when paginating

---

## Export

Export homework history:

| Format | Includes |
|--------|----------|
| CSV | All homework data without attachments |
| PDF | Formatted report with grades summary |

---

## Accessibility

- Table follows accessible patterns
- Status badges have text labels
- File attachments have descriptive names
- Form fields have associated labels
- Due date warnings announced to screen readers
