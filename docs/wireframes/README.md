# UI Wireframes

This directory contains documentation for the interactive React wireframes.

## Workflow: Functional Specs → React Wireframes → Implementation

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Functional Spec (docs/functional/)                      │
│    • Business logic, workflows, validations                │
│    • No UI prescription (per CLAUDE.md philosophy)         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 2. React Wireframe (wireframes/src/)                       │
│    • Interactive React components                          │
│    • Based on functional spec requirements                 │
│    • Demonstrates user workflows                           │
│    • Uses design system components                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 3. Review & Refine                                          │
│    • Run dev server to test interactions                   │
│    • Gather stakeholder feedback                           │
│    • Iterate on design                                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 4. Implementation                                           │
│    • Reference: Functional spec (logic) + Wireframe (UI)   │
│    • Build production feature                              │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
wireframes/src/
├── components/
│   ├── design-system/       # Reusable design system components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── SectionCard.tsx
│   │   ├── DataGrid.tsx
│   │   └── ...
│   └── layout/              # Layout components
│       ├── PageHeader.tsx
│       └── Sidebar.tsx
├── pages/
│   ├── StudentListPage/     # Student list wireframe
│   └── StudentDetailPage/   # Student detail wireframe
│       ├── StudentDetailPage.tsx
│       ├── components/      # Page-specific components
│       └── tabs/            # Tab content components
└── App.tsx                  # Routing and app shell
```

## How to Use Wireframes

### Running the Dev Server

```bash
cd wireframes
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

### Viewing Wireframes

1. **Navigate to pages** - Use the sidebar or direct URLs
2. **Test interactions** - Fill forms, toggle states, click actions
3. **Test responsive design** - Resize browser window
4. **Use demo controls** - Toggle Adult/Child views, etc.

### Creating New Wireframes

1. **Read the functional spec** - Understand requirements
2. **Review design system** - Check `docs/ui-requirements/design-system/design-system.html`
3. **Create page component** - In `wireframes/src/pages/`
4. **Use design system components** - Import from `components/design-system/`
5. **Add routing** - Update `App.tsx` with new route

## Current Wireframes

### Student List (`/students`)

**Features:**
- Global search across multiple fields
- Status and tag filtering
- Sortable columns
- Bulk selection and actions
- Pagination
- Responsive design

**Based On:** `docs/functional/11-tutor-portal/student-management/student-list.md`

### Student Detail (`/students/:id`)

**Features:**
- Student header with actions
- Tab navigation (Overview, Lessons, Homework, Messages, Invoices, Transactions, Files)
- Overview tab with editable sections
- Pre-lesson card
- Family/Guardian management
- Notes with pin/unpin
- Demo toggle for Adult/Child views

**Based On:** `docs/functional/11-tutor-portal/student-management/` specs

## Design Principles (Per CLAUDE.md)

1. **Generated FROM functional specs** (not the other way around)
2. **Functional specs remain UI-agnostic** (describes WHAT, not HOW)
3. **Wireframes show HOW** (visual interpretation of workflows)
4. **Use design system components** (maintain consistency)
5. **Separation of concerns:**
   - Functional Spec = Business logic, rules, validations
   - Wireframe = Visual representation, layout, UX patterns

## Adding New Components

### Design System Components

For reusable components (buttons, inputs, cards):

1. Add to `wireframes/src/components/design-system/`
2. Export from `design-system/index.ts`
3. Follow existing patterns and styling
4. Reference `docs/ui-requirements/design-system/design-system.html`

### Page-Specific Components

For components used only in one page:

1. Add to `wireframes/src/pages/[PageName]/components/`
2. Export from local `index.ts`
3. Keep co-located with page

## Version Control

```bash
# Commit wireframe changes
git add wireframes/src/
git commit -m "feat: add wireframe for [feature-name]

Based on functional spec: docs/functional/[path-to-spec].md
Demonstrates workflows: [list key workflows]"
```

---

**Last Updated:** 2026-01-08
**Status:** Active - React wireframe development
