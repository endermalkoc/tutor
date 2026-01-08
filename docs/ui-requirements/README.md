# UI Requirements

**Last Updated**: 2026-01-08

## Overview

This directory contains all UI/UX requirements, specifications, and design system documentation for the tutor management application.

---

## Wireframe Development Approach

### React Component-Based Wireframes

We use a **React-based wireframe system** located at `/wireframes/` in the project root. This approach provides:

1. **Faster Iteration** - Smaller component files are easier to modify and test
2. **Production-Ready Components** - Components can be directly used in the Next.js application
3. **Consistent Design System** - Single source of truth for all UI components
4. **Better Maintainability** - Changes to a component propagate everywhere automatically

### Getting Started with Wireframes

```bash
cd wireframes
npm install
npm run dev
```

The wireframe app runs on `http://localhost:5173` with hot module replacement for instant feedback.

### Wireframe Structure

```
wireframes/
├── src/
│   ├── components/
│   │   ├── design-system/    # Core UI components (Button, Input, Modal, etc.)
│   │   └── layout/           # Layout components (Sidebar, AppLayout, PageHeader)
│   ├── pages/                # Wireframe pages (will mirror app structure)
│   └── styles/               # Design tokens and base styles
└── package.json
```

### Migrating to Production (Next.js)

Components are designed to work with minimal changes in Next.js:

1. **Add `'use client'` directive** - For components with interactivity (onClick, useState, etc.)
2. **Props in, callbacks out** - Components receive data via props, don't fetch internally
3. **Standard React patterns** - Hooks, event handlers, controlled inputs all transfer directly

**Example:**
```tsx
// Wireframe component
export function Button({ variant, onClick, children }) { ... }

// Next.js usage (add 'use client' at file top)
'use client';
export function Button({ variant, onClick, children }) { ... }
```

---

## Directory Structure

### 📐 [design-system/](./design-system/)
Complete visual design system including color palette, typography, components, and interaction patterns.

**Contains**:
- [Color System](./design-system/color-system.md) - Complete color palette with semantic meanings
- [Component Library](./design-system/component-library.md) - Reusable UI components with specifications
- [Design Patterns](./design-system/design-patterns.md) - Interaction patterns and best practices
- [Design System Demo](./design-system/design-system.html) - Live interactive showcase of all components
- [Design System README](./design-system/README.md) - Quick reference guide

### 📝 UI Requirement Documents

#### [forms.md](./forms.md)
Comprehensive UI requirements for form interactions, validation patterns, and user input handling.

#### [lists.md](./lists.md)
UI requirements for list views, data tables, and collection displays.

---

## Quick Links

### For Designers
- Start with: [Design System Demo](./design-system/design-system-demo.html) - Visual reference
- Reference: [Color System](./design-system/color-system.md) - Color palette
- Reference: [Component Library](./design-system/component-library.md) - Components catalog

### For Developers
- Start with: [Component Library](./design-system/component-library.md) - Code-ready components
- Reference: [Design Patterns](./design-system/design-patterns.md) - Implementation patterns
- Reference: Form/List specs for detailed requirements

### For Product/UX
- Start with: [Design Patterns](./design-system/design-patterns.md) - Interaction patterns
- Reference: forms.md and lists.md for detailed UI flows

---

## Design Philosophy

### Modern Minimalist
Our UI follows a minimalist design philosophy emphasizing:
- **Clarity**: Clear visual hierarchy and obvious actions
- **Efficiency**: Smart defaults and keyboard accessibility
- **Simplicity**: Clean interfaces with generous spacing
- **Consistency**: Reusable patterns and components

---

## How to Use This Documentation

### Creating New Features
1. Review relevant UI requirement docs (forms.md, lists.md)
2. Reference [Design Patterns](./design-system/design-patterns.md) for interaction patterns
3. Use components from [Component Library](./design-system/component-library.md)
4. Follow [Color System](./design-system/color-system.md) for all visual elements
5. Test against [Design System Demo](./design-system/design-system-demo.html)

### Making Design Decisions
1. Check if a pattern exists in [Design Patterns](./design-system/design-patterns.md)
2. Review component usage guidelines
3. Ensure WCAG AA accessibility compliance
4. Test with keyboard navigation
5. Verify responsive behavior

---

## Related Documentation

- **Functional Specifications**: `../functional/` - Business logic and requirements
- **Wireframes**: `../wireframes/` - Visual prototypes and mockups
- **Project Instructions**: `../../CLAUDE.md` - Overall project guidelines

---

## Contributing

When updating UI requirements:
- Update the "Last Updated" date
- Keep design system in sync with actual implementations
- Document new patterns and components
- Update the demo page when adding components
- Ensure accessibility compliance

---

## Questions?

For questions about UI requirements or the design system, please create an issue or discussion in the project repository.
