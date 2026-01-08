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

## Phase 2: Student Detail Layout Components ✅ COMPLETE

### 2.1 StudentHeader Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/StudentHeader.tsx`
- [x] Large avatar with initials (uses Avatar component)
- [x] Student name with next lesson badge
- [x] Status badges (Child/Adult, Active/Trial/etc.)
- [x] Meta row: email, phone, family link, teaching duration
- [x] Action buttons: Schedule Lesson (primary), More actions dropdown
- [x] Support Adult vs Child view toggle
- [x] Added to ComponentShowcase

### 2.2 StudentDetailTabs Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/StudentDetailTabs.tsx`
- [x] Tab items: Overview, Lessons, Homework, Messages, Billing & Invoices, Transactions, Files
- [x] Use React Router `NavLink` for active states
- [x] Added to ComponentShowcase

---

## Phase 3: Section Card Component (Edit/View Pattern) ✅ COMPLETE

> **Note:** SectionCard and DataGrid are reusable design system components, so they were created in `components/design-system/` instead of as page-specific components.

### 3.1 SectionCard Component
- [x] Create `wireframes/src/components/design-system/SectionCard.tsx`
- [x] Props: `title`, `variant: 'primary' | 'secondary'`, `collapsible?`, `defaultCollapsed?`
- [x] View mode vs Edit mode toggle
- [x] Edit button in header
- [x] Collapsed summary display
- [x] Form actions (Cancel/Save) for edit mode
- [x] Exported from design-system index.ts
- [x] Added to ComponentShowcase

### 3.2 DataGrid Component (for view mode display)
- [x] Create `wireframes/src/components/design-system/DataGrid.tsx`
- [x] Props: `columns?: 2 | 3 | 4`, `items: { label: string, value: React.ReactNode }[]`
- [x] Responsive grid layout
- [x] Exported from design-system index.ts
- [x] Added to ComponentShowcase

---

## Phase 4: Overview Tab Components ✅ COMPLETE

### 4.1 PreLessonCard Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/PreLessonCard.tsx`
- [x] Gradient background styling
- [x] Collapsible content
- [x] Grid layout: Last Lesson, Homework Status, Recent Note
- [x] Conditional display (only show if lesson is upcoming)

### 4.2 LessonSettingsSection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/LessonSettingsSection.tsx`
- [x] View mode: Subjects (tags), Duration, Category, Skill Level, Tags
- [x] Edit mode: Form with TagInput for subjects, Select for duration/category/level
- [x] Uses SectionCard wrapper

### 4.3 ContactSection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/ContactSection.tsx`
- [x] View mode: Email, Phone, SMS status, Last contacted
- [x] Adult-only: Address fields
- [x] Notification switches: Email/SMS reminders
- [x] Edit mode: Form fields + switches
- [x] Uses SectionCard wrapper

### 4.4 FamilySection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/FamilySection.tsx`
- [x] Guardian cards list
- [x] Siblings section
- [x] Billing indicator row
- [x] Add Contact button + inline form

### 4.5 GuardianCard Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/GuardianCard.tsx`
- [x] Props: `isPrimary`, `guardian` data object
- [x] View mode: Name, role, emergency badge, contact info
- [x] Expandable details: additional phones, address, preferences, private note
- [x] Edit mode: Full form for all fields
- [x] Action buttons: Call, Email, Message
- [x] Menu: Set as Primary, Emergency toggle, Delete

### 4.6 NotesSection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/NotesSection.tsx`
- [x] Quick add input (expandable textarea)
- [x] Pinned note display with actions
- [x] Notes list with hover actions (pin, edit, delete)
- [x] "Show all X notes" button

### 4.7 PersonalDetailsSection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/PersonalDetailsSection.tsx`
- [x] Default collapsed with summary
- [x] View: Name, Type, Status, Gender, Birthday, School, Referrer, Since
- [x] Edit: Full form
- [x] Uses SectionCard wrapper with collapsible

### 4.8 RecentLessonsSection Component
- [x] Create `wireframes/src/pages/StudentDetailPage/components/RecentLessonsSection.tsx`
- [x] Simple table: Date, Time, Duration, Status, Notes
- [x] "View All" link to Lessons tab
- [x] Status badges: Attended, Cancelled, etc.

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

**Phase 2 ✅ Complete:**
3. ~~StudentHeader component~~
4. ~~StudentDetailTabs component~~

**Phase 3 ✅ Complete:**
5. ~~SectionCard component~~ (used by multiple sections)
6. ~~DataGrid component~~ (used in view modes)

**Phase 4 ✅ Complete:**
7. ~~PreLessonCard~~
8. ~~LessonSettingsSection~~
9. ~~ContactSection~~
10. ~~GuardianCard~~
11. ~~FamilySection~~
12. ~~NotesSection~~
13. ~~PersonalDetailsSection~~
14. ~~RecentLessonsSection~~

**Next up (Phase 5-6):**
15. Assemble StudentDetailPage
16. Wire up routing
17. Implement other tabs incrementally

---

## File Structure

```
wireframes/src/
├── components/
│   ├── design-system/
│   │   ├── SectionCard.tsx ✅ (reusable)
│   │   ├── SectionCard.css ✅
│   │   ├── DataGrid.tsx ✅ (reusable)
│   │   ├── DataGrid.css ✅
│   │   └── index.ts ✅ (exports all design system components)
│   └── layout/
│       ├── PageHeader.tsx (existing - has Breadcrumb + PageHeader)
│       └── PageHeader.css (existing)
└── pages/
    └── StudentDetailPage/
        ├── StudentDetailPage.tsx
        ├── StudentDetailPage.css
        ├── components/
        │   ├── index.ts ✅
        │   ├── StudentHeader.tsx ✅
        │   ├── StudentHeader.css ✅
        │   ├── StudentDetailTabs.tsx ✅
        │   ├── PreLessonCard.tsx ✅
        │   ├── PreLessonCard.css ✅
        │   ├── LessonSettingsSection.tsx ✅
        │   ├── ContactSection.tsx ✅
        │   ├── ContactSection.css ✅
        │   ├── FamilySection.tsx ✅
        │   ├── FamilySection.css ✅
        │   ├── GuardianCard.tsx ✅
        │   ├── GuardianCard.css ✅
        │   ├── NotesSection.tsx ✅
        │   ├── NotesSection.css ✅
        │   ├── PersonalDetailsSection.tsx ✅
        │   ├── RecentLessonsSection.tsx ✅
        │   ├── RecentLessonsSection.css ✅
        │   └── index.ts ✅
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
| Phase 2 | 2 | Medium | ✅ Complete |
| Phase 3 | 2 | Medium | ✅ Complete |
| Phase 4 | 8 | Medium-High | ✅ Complete |
| Phase 5 | 2 | Medium | Pending |
| Phase 6 | 6 | Medium | Pending |

**Total:** ~20 new component files (Phase 1 components already existed)

**Recommended approach:** Complete Phases 2-5 first for a functional Overview tab, then incrementally add other tabs.
