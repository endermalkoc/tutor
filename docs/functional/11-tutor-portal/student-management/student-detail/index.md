# Student Detail Page

## Overview

The Student Detail page provides a comprehensive view of a student's information, family, lessons, homework, communications, billing, and files. It uses a tabbed interface with a persistent header showing key student information.

## Access

- Click any student row in the [Student List](../student-list.md)
- Direct URL navigation: `/students/{studentId}`
- Links from other pages (invoices, family detail, etc.)

## Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Students > [Student Name]                           │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ STUDENT HEADER (sticky)                                     │ │
│ │ Name, Type, Status, Contact, Family Link                    │ │
│ │                                        [Actions Menu]       │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ [Overview] [Lessons] [Homework] [Messages] [Billing & Invoices] │
│ [Transactions] [Files]                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      Tab Content Area                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Student Header

The header remains visible across all tabs, providing persistent context about which student the user is viewing.

### Header Content

| Element | Description |
|---------|-------------|
| **Student Name** | Full name (First Last), displayed prominently |
| **Student Type** | Badge: "Child" or "Adult" |
| **Status** | Badge with status-appropriate color: Active, Trial, Waiting, Lead, Inactive |
| **Email** | Clickable mailto link (if provided) |
| **Phone** | Clickable tel link with SMS indicator if capable (if provided) |
| **Family Name** | For children only - displayed as text (family details shown in Overview tab) |
| **Actions Menu** | Dropdown with available actions |

### Header Actions Menu

| Action | Description | Availability |
|--------|-------------|--------------|
| **Schedule Lesson** | Opens lesson scheduling flow | Always |
| **Send Message** | Opens message composer | Always |
| **Edit Student** | Enters edit mode on Overview tab | Always |
| **Change Status** | Quick status change dropdown | Always |
| **Archive Student** | Moves student to archived state | Active students |
| **Restore Student** | Restores from archived state | Archived students |
| **Delete Student** | Permanently removes student | With confirmation |

---

## Tab Navigation

### Tabs

| Tab | Description | Content Spec |
|-----|-------------|--------------|
| **Overview** | Student info, family details, lesson settings, notes | [overview.md](./overview.md) |
| **Lessons** | Attendance history and lesson notes | [lessons.md](./lessons.md) |
| **Homework** | Homework submissions and status | [homework.md](./homework.md) |
| **Messages** | Communication history with student/family | [messages.md](./messages.md) |
| **Billing & Invoices** | Billing settings and family invoices (shared across siblings) | [billing-invoices.md](./billing-invoices.md) |
| **Transactions** | Family transactions (shared across siblings) | [transactions.md](./transactions.md) |
| **Files** | Student attachments and documents | [files.md](./files.md) |

### Default Tab

- **Overview** is the default tab when navigating to student detail
- Tab selection persists in URL (e.g., `/students/123/lessons`)
- Browser back/forward navigates between tabs

### Tab Behavior

- Tabs load content on selection (not pre-loaded)
- Active tab visually indicated
- Tab state preserved when switching between tabs
- URL updates to reflect current tab

---

## Edit Mode Pattern

For editable sections (Student Info, Family Info in Overview tab):

### View Mode (Default)

- Data displayed in readable format
- "Edit" button visible in section header
- Fields are not interactive

### Edit Mode

- Triggered by clicking "Edit" button
- Fields become editable inputs
- "Save" and "Cancel" buttons appear
- Other sections remain in view mode
- Unsaved changes warning if navigating away

### Edit Flow

1. User clicks "Edit" on a section
2. Section transitions to edit mode
3. User modifies fields
4. User clicks "Save" or "Cancel"
5. If Save: Validate → Save → Return to view mode with success feedback
6. If Cancel: Discard changes → Return to view mode

---

## Family-Level Data Notice

For tabs showing family-level data (Invoices, Transactions):

- Display notice: "Showing all [invoices/transactions] for [Family Name]"
- If family has multiple students, data is shared across all siblings
- Actions taken affect the entire family, not just the current student

---

## Navigation

### Breadcrumbs

```
Students > [Student Name]
```

- "Students" links back to student list
- Current student name is not clickable

### Back Navigation

- Browser back button returns to previous page (typically student list)
- If coming from another context (e.g., invoice detail), returns there

---

## Empty States

Each tab handles its own empty state. Common pattern:

- Centered illustration or icon
- Descriptive message explaining what would appear
- Call-to-action button when applicable

---

## Loading States

- Header loads first with student basic info
- Tab content shows loading indicator while fetching
- Skeleton loaders for content areas

---

## Error Handling

### Student Not Found

- If student ID doesn't exist or user lacks access
- Display error page with message
- Link to return to student list

### Tab Load Error

- If tab content fails to load
- Display error message within tab area
- Retry button to attempt reload

---

## Responsive Behavior

Note: Primary interface is desktop. Mobile app is separate.

- Header remains full-width
- Tabs scroll horizontally if needed
- Content area adapts to available width

---

## Accessibility

- Tabs follow ARIA tabs pattern (role="tablist", role="tab", role="tabpanel")
- Arrow keys navigate between tabs
- Enter/Space activates tab
- Tab panels have appropriate aria-labelledby
- Focus management when switching tabs
