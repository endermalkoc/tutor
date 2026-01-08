# Wireframes - React Component Library

This is a React-based wireframe system for the Tutor Management application. Components here are designed to be directly transferable to the production Next.js application.

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

## Getting Started

```bash
cd wireframes
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the wireframes.

## Project Structure

```
src/
├── components/
│   ├── design-system/       # Core UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── SectionCard.tsx
│   │   ├── DataGrid.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   └── index.ts         # Exports all components
│   └── layout/              # Layout components
│       ├── Sidebar.tsx
│       ├── PageHeader.tsx
│       ├── AppLayout.tsx
│       └── index.ts
├── pages/                   # Wireframe pages
│   ├── ComponentShowcase.tsx
│   ├── StudentListPage/
│   └── StudentDetailPage/
│       ├── StudentDetailPage.tsx
│       ├── components/      # Page-specific components
│       └── tabs/            # Tab content components
├── styles/
│   ├── design-tokens.css    # CSS custom properties
│   └── base.css             # Base styles and utilities
├── App.tsx                  # Routing
└── main.tsx
```

## Current Wireframes

### Student List (`/students`)

- Global search across multiple fields
- Status and tag filtering
- Sortable columns
- Bulk selection and actions
- Pagination
- Responsive design

**Based On:** `docs/functional/11-tutor-portal/student-management/student-list.md`

### Student Detail (`/students/:id`)

- Student header with actions
- Tab navigation (Overview, Lessons, Homework, Messages, Invoices, Transactions, Files)
- Overview tab with editable sections
- Pre-lesson card
- Family/Guardian management
- Notes with pin/unpin
- Demo toggle for Adult/Child views

**Based On:** `docs/functional/11-tutor-portal/student-management/` specs

### Component Showcase (`/showcase`)

Interactive demonstration of all design system components.

## Design System Components

All components are in `src/components/design-system/`. Import from the index:

```tsx
import { Button, Badge, Input, Modal } from './components/design-system';
```

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, destructive variants |
| `Badge` | Status indicators (default, success, warning, error, etc.) |
| `Input` | Text input with sizes and error state |
| `Textarea` | Multiline text input |
| `Select` | Native select dropdown |
| `Checkbox` | Checkbox with optional label |
| `Radio` | Radio button with optional label |
| `Switch` | Toggle switch |
| `Tag` | Colored tags for categories |
| `Card` | Content container with header/body/footer |
| `SectionCard` | Editable section with view/edit modes |
| `DataGrid` | Label/value pair display grid |
| `Table` | Data table with sortable headers |
| `Modal` | Dialog overlay |
| `Tabs` | Tab navigation (standard and filter variants) |
| `Avatar` | User avatar with initials or image |
| `Alert` | Info, success, warning, error alerts |
| `Toast` | Temporary notification |
| `Pagination` | Page navigation |
| `EmptyState` | Empty data placeholder |

## Creating New Wireframes

1. **Read the functional spec** - Understand requirements
2. **Review design system** - Check `docs/ui-requirements/design-system/design-system.html`
3. **Create page directory** - In `src/pages/[PageName]/`
4. **Use design system components** - Import from `components/design-system/`
5. **Add routing** - Update `App.tsx` with new route
6. **Follow checklist** - See `docs/wireframes/WIREFRAME_CHECKLIST.md`

## Adding New Components

### Design System Components

For reusable components (buttons, inputs, cards):

1. Add to `src/components/design-system/`
2. Export from `design-system/index.ts`
3. Follow existing patterns and styling
4. Reference `docs/ui-requirements/design-system/design-system.html`

### Page-Specific Components

For components used only in one page:

1. Add to `src/pages/[PageName]/components/`
2. Export from local `index.ts`
3. Keep co-located with page

## Design Tokens

CSS custom properties are defined in `src/styles/design-tokens.css`. These match the design system in `docs/ui-requirements/design-system/`.

| Category | Examples |
|----------|----------|
| Colors | `--gray-*`, `--primary-*`, `--success-*`, `--warning-*`, `--error-*` |
| Semantic | `--bg-*`, `--fg-*`, `--border-*` |
| Spacing | `--space-1` through `--space-12` (4px grid) |
| Typography | `--font-sans`, `--font-mono` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |

## Design Principles (Per CLAUDE.md)

1. **Generated FROM functional specs** (not the other way around)
2. **Functional specs remain UI-agnostic** (describes WHAT, not HOW)
3. **Wireframes show HOW** (visual interpretation of workflows)
4. **Use design system components** (maintain consistency)
5. **Separation of concerns:**
   - Functional Spec = Business logic, rules, validations
   - Wireframe = Visual representation, layout, UX patterns

## Moving to Production (Next.js)

Components are designed to require minimal changes for Next.js:

1. **Add `'use client'`** - Interactive components need this directive
2. **Keep props-based data** - Components don't fetch data internally
3. **Standard React patterns** - All hooks and event handlers work the same

```tsx
// In Next.js, just add the directive at the top
'use client';

import { Button, Modal } from '@/components/design-system';
```

---

**Last Updated:** 2026-01-08
