# Student Detail Page - React Migration Plan

This document outlines the plan to convert the HTML wireframe `student-detail.html` and related tab files to React components.

## Overview

**Source Files:**
- `docs/wireframes/student-management/student-detail.html` (Overview tab - main file)
- `docs/wireframes/student-management/student-detail-lessons.html`
- `docs/wireframes/student-management/student-detail-homework.html`
- `docs/wireframes/student-management/student-detail-messages.html`
- `docs/wireframes/student-management/student-detail-invoices.html`
- `docs/wireframes/student-management/student-detail-transactions.html`
- `docs/wireframes/student-management/student-detail-files.html`

**Target Location:** `wireframes/src/pages/StudentDetailPage/`

---

## Phase 1: Shared Layout Components ✅ COMPLETE

> **Note:** Breadcrumb and PageHeader already existed in `components/layout/`. Added showcase demos instead.

### 1.1 Breadcrumb Component
- [x] Already exists at `wireframes/src/components/layout/PageHeader.tsx`
- [x] Props: `items: { label: string, href?: string }[]`
- [x] Exported from `components/layout/index.ts`
- [x] Added to ComponentShowcase

### 1.2 PageHeader Component
- [x] Already exists at `wireframes/src/components/layout/PageHeader.tsx`
- [x] Props: `title`, `subtitle?`, `breadcrumbs?`, `actions?`
- [x] Exported from `components/layout/index.ts`
- [x] Added to ComponentShowcase

---

## Phase 2: Student Detail Layout Components

### 2.1 StudentHeader Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/StudentHeader.tsx`
- [ ] Large avatar with initials
- [ ] Student name with next lesson badge
- [ ] Status badges (Child/Adult, Active/Trial/etc.)
- [ ] Meta row: email, phone, family link, teaching duration
- [ ] Action buttons: Schedule Lesson (primary), More actions dropdown
- [ ] Support Adult vs Child view toggle

### 2.2 StudentDetailTabs Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/StudentDetailTabs.tsx`
- [ ] Tab items: Overview, Lessons, Homework, Messages, Billing & Invoices, Transactions, Files
- [ ] Use React Router `NavLink` for active states
- [ ] Leverage existing Tabs design system component

---

## Phase 3: Section Card Component (Edit/View Pattern)

### 3.1 SectionCard Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/SectionCard.tsx`
- [ ] Props: `title`, `variant: 'primary' | 'secondary'`, `collapsible?`, `defaultCollapsed?`
- [ ] View mode vs Edit mode toggle
- [ ] Edit button in header
- [ ] Collapsed summary display
- [ ] Form actions (Cancel/Save) for edit mode

### 3.2 DataGrid Component (for view mode display)
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/DataGrid.tsx`
- [ ] Props: `columns?: 2 | 3 | 4`, `items: { label: string, value: React.ReactNode }[]`
- [ ] Responsive grid layout

---

## Phase 4: Overview Tab Components

### 4.1 PreLessonCard Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/PreLessonCard.tsx`
- [ ] Gradient background styling
- [ ] Collapsible content
- [ ] Grid layout: Last Lesson, Homework Status, Recent Note
- [ ] Conditional display (only show if lesson is upcoming)

### 4.2 LessonSettingsSection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/LessonSettingsSection.tsx`
- [ ] View mode: Subjects (tags), Duration, Category, Skill Level, Tags
- [ ] Edit mode: Form with TagInput for subjects, Select for duration/category/level
- [ ] Uses SectionCard wrapper

### 4.3 ContactSection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/ContactSection.tsx`
- [ ] View mode: Email, Phone, SMS status, Last contacted
- [ ] Adult-only: Address fields
- [ ] Notification switches: Email/SMS reminders
- [ ] Edit mode: Form fields + switches
- [ ] Uses SectionCard wrapper

### 4.4 FamilySection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/FamilySection.tsx`
- [ ] Guardian cards list
- [ ] Siblings section
- [ ] Billing indicator row
- [ ] Add Contact button + inline form

### 4.5 GuardianCard Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/GuardianCard.tsx`
- [ ] Props: `isPrimary`, `guardian` data object
- [ ] View mode: Name, role, emergency badge, contact info
- [ ] Expandable details: additional phones, address, preferences, private note
- [ ] Edit mode: Full form for all fields
- [ ] Action buttons: Call, Email, Message
- [ ] Menu: Set as Primary, Emergency toggle, Delete

### 4.6 NotesSection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/NotesSection.tsx`
- [ ] Quick add input (expandable textarea)
- [ ] Pinned note display with actions
- [ ] Notes list with hover actions (pin, edit, delete)
- [ ] "Show all X notes" button

### 4.7 PersonalDetailsSection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/PersonalDetailsSection.tsx`
- [ ] Default collapsed with summary
- [ ] View: Name, Type, Status, Gender, Birthday, School, Referrer, Since
- [ ] Edit: Full form
- [ ] Uses SectionCard wrapper with collapsible

### 4.8 RecentLessonsSection Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/components/RecentLessonsSection.tsx`
- [ ] Simple table: Date, Time, Duration, Status, Notes
- [ ] "View All" link to Lessons tab
- [ ] Status badges: Attended, Cancelled, etc.

---

## Phase 5: Main Student Detail Page

### 5.1 StudentDetailPage Component
- [ ] Create `wireframes/src/pages/StudentDetailPage/StudentDetailPage.tsx`
- [ ] Create `wireframes/src/pages/StudentDetailPage/StudentDetailPage.css`
- [ ] Compose all sections for Overview tab
- [ ] State management for edit modes
- [ ] Demo control for Adult/Child toggle (like HTML wireframe)

### 5.2 Routing Setup
- [ ] Add route `/students/:id` to App.tsx
- [ ] Add route for each tab: `/students/:id/lessons`, etc.

---

## Phase 6: Other Tab Pages (can be done incrementally)

### 6.1 LessonsTab
- [ ] Read and analyze `student-detail-lessons.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/LessonsTab.tsx`
- [ ] Lesson list with filters
- [ ] Lesson cards/rows

### 6.2 HomeworkTab
- [ ] Read and analyze `student-detail-homework.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/HomeworkTab.tsx`

### 6.3 MessagesTab
- [ ] Read and analyze `student-detail-messages.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/MessagesTab.tsx`

### 6.4 InvoicesTab
- [ ] Read and analyze `student-detail-invoices.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/InvoicesTab.tsx`

### 6.5 TransactionsTab
- [ ] Read and analyze `student-detail-transactions.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/TransactionsTab.tsx`

### 6.6 FilesTab
- [ ] Read and analyze `student-detail-files.html`
- [ ] Create `wireframes/src/pages/StudentDetailPage/tabs/FilesTab.tsx`

---

## Implementation Notes

### Design System Components to Use
- `Badge` - status badges
- `Button` - actions
- `Card` - section containers
- `Checkbox`, `Switch` - form controls
- `Dropdown` - action menus
- `FormSection`, `FormGroup`, `FormLabel` - form structure
- `Input`, `Textarea`, `Select` - form inputs
- `Tag`, `TagInput`, `TagList` - subjects and tags
- `Table` - recent lessons
- `Tabs` - tab navigation
- `Avatar` - student avatar
- `Modal` - confirmations (delete contact, etc.)

### CSS Strategy
- Use design system CSS variables
- Component-specific styles in co-located CSS files
- Follow existing patterns from StudentListPage

### State Management
- Local component state for edit modes
- Props for student data (mock data for wireframe)
- Consider context for shared student state across tabs

---

## Suggested Order of Implementation

**Phase 1 ✅ Complete:**
1. ~~Breadcrumb component~~ (already existed)
2. ~~PageHeader component~~ (already existed)

**Next up (Phase 2-3):**
3. StudentHeader component
4. StudentDetailTabs component
5. SectionCard component (used by multiple sections)
6. DataGrid component (used in view modes)

**Then Overview sections (Phase 4):**
7. PreLessonCard
8. LessonSettingsSection
9. ContactSection
10. GuardianCard
11. FamilySection
12. NotesSection
13. PersonalDetailsSection
14. RecentLessonsSection

**Finally (Phase 5-6):**
15. Assemble StudentDetailPage
16. Wire up routing
17. Implement other tabs incrementally

---

## File Structure

```
wireframes/src/
├── components/
│   └── layout/
│       ├── PageHeader.tsx (existing - has Breadcrumb + PageHeader)
│       └── PageHeader.css (existing)
└── pages/
    └── StudentDetailPage/
        ├── StudentDetailPage.tsx
        ├── StudentDetailPage.css
        ├── components/
        │   ├── StudentHeader.tsx
        │   ├── StudentHeader.css
        │   ├── StudentDetailTabs.tsx
        │   ├── StudentDetailTabs.css
        │   ├── SectionCard.tsx
        │   ├── SectionCard.css
        │   ├── DataGrid.tsx
        │   ├── DataGrid.css
        │   ├── PreLessonCard.tsx
        │   ├── PreLessonCard.css
        │   ├── LessonSettingsSection.tsx
        │   ├── ContactSection.tsx
        │   ├── FamilySection.tsx
        │   ├── GuardianCard.tsx
        │   ├── GuardianCard.css
        │   ├── NotesSection.tsx
        │   ├── NotesSection.css
        │   ├── PersonalDetailsSection.tsx
        │   ├── RecentLessonsSection.tsx
        │   └── index.ts
        ├── tabs/
        │   ├── LessonsTab.tsx
        │   ├── HomeworkTab.tsx
        │   ├── MessagesTab.tsx
        │   ├── InvoicesTab.tsx
        │   ├── TransactionsTab.tsx
        │   └── FilesTab.tsx
        └── index.ts
```

---

## Estimated Effort

| Phase | Components | Complexity | Status |
|-------|------------|------------|--------|
| Phase 1 | 2 | Low | ✅ Complete |
| Phase 2 | 2 | Medium | Pending |
| Phase 3 | 2 | Medium | Pending |
| Phase 4 | 8 | Medium-High | Pending |
| Phase 5 | 2 | Medium | Pending |
| Phase 6 | 6 | Medium | Pending |

**Total:** ~20 new component files (Phase 1 components already existed)

**Recommended approach:** Complete Phases 2-5 first for a functional Overview tab, then incrementally add other tabs.
