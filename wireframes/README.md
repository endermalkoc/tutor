# Wireframes - React Component Library

This is a React-based wireframe system for the Tutor Management application. Components here are designed to be directly transferable to the production Next.js application.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the component showcase.

## Project Structure

```
src/
├── components/
│   ├── design-system/      # Core UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Tag.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   ├── Avatar.tsx
│   │   ├── Alert.tsx
│   │   ├── Toast.tsx
│   │   ├── Pagination.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts        # Exports all components
│   └── layout/             # Layout components
│       ├── Sidebar.tsx
│       ├── PageHeader.tsx
│       ├── AppLayout.tsx
│       └── index.ts
├── pages/                  # Wireframe pages
│   └── ComponentShowcase.tsx
├── styles/
│   ├── design-tokens.css   # CSS custom properties (colors, spacing, etc.)
│   └── base.css            # Base styles and utilities
├── App.tsx
└── main.tsx
```

## Design System Components

All design system components are in `src/components/design-system/`. Import them from the index:

```tsx
import { Button, Badge, Input, Modal } from './components/design-system';
```

### Available Components

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
| `MetricCard` | Card variant for displaying metrics |
| `Table` | Data table with sortable headers |
| `Modal` | Dialog overlay |
| `Tabs` | Tab navigation (standard and filter variants) |
| `Avatar` | User avatar with initials or image |
| `Alert` | Info, success, warning, error alerts |
| `Toast` | Temporary notification |
| `Pagination` | Page navigation |
| `EmptyState` | Empty data placeholder |

## Migrating Wireframes

Existing HTML wireframes in `docs/wireframes/` will be migrated to this React project incrementally:

1. **Student Management**
   - [ ] `student-list.html` → `pages/students/StudentList.tsx`
   - [ ] `add-student.html` → `pages/students/AddStudent.tsx`
   - [ ] `student-detail.html` → `pages/students/StudentDetail.tsx`

2. **Calendar** (future)
3. **Invoices** (future)
4. **Settings** (future)

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

## Design Tokens

CSS custom properties are defined in `src/styles/design-tokens.css`. These match the design system in `docs/ui-requirements/design-system/`.

Key token categories:
- **Colors**: `--gray-*`, `--primary-*`, `--success-*`, `--warning-*`, `--error-*`
- **Semantic**: `--bg-*`, `--fg-*`, `--border-*`
- **Spacing**: `--space-1` through `--space-12` (4px grid)
- **Typography**: `--font-sans`, `--font-mono`
- **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
