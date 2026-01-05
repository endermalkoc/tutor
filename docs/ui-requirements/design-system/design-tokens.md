# Design Tokens

**Version**: 1.0
**Last Updated**: 2026-01-04

---

## Overview

Design tokens are the atomic building blocks of our design system. They define the visual DNA of our interface through formalized, reusable values for colors, spacing, typography, and more.

**Purpose**: Ensure consistency across all components and make design updates scalable.

---

## Color Tokens

### Primary Palette

```css
/* Brand Colors */
--color-brand-primary: #0ea5e9;      /* Sky blue */
--color-brand-secondary: #06b6d4;    /* Cyan */
--color-brand-gradient: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);

/* Text Colors */
--color-text-primary: #0f172a;       /* Slate 900 - Headings, labels */
--color-text-secondary: #475569;     /* Slate 600 - Body text */
--color-text-tertiary: #64748b;      /* Slate 500 - Help text, meta */
--color-text-disabled: #94a3b8;      /* Slate 400 - Disabled */
--color-text-inverted: #ffffff;      /* White - On dark backgrounds */

/* Background Colors */
--color-bg-primary: #ffffff;         /* White - Main background */
--color-bg-secondary: #f8fafc;       /* Slate 50 - Section background */
--color-bg-tertiary: #fafafa;        /* Off-white - Input default */
--color-bg-hover: #f1f5f9;          /* Slate 100 - Hover states */
--color-bg-selected: #eff6ff;        /* Blue 50 - Selected states */

/* Border Colors */
--color-border-default: #e2e8f0;     /* Slate 200 - Default borders */
--color-border-hover: #cbd5e1;       /* Slate 300 - Hover borders */
--color-border-focus: #0ea5e9;       /* Brand - Focus states */
--color-border-divider: #f1f5f9;     /* Slate 100 - Subtle dividers */
```

### Semantic Colors

```css
/* Success States */
--color-success: #10b981;            /* Emerald 500 */
--color-success-bg: #f0fdf4;         /* Green 50 */
--color-success-border: #86efac;     /* Green 300 */
--color-success-text: #059669;       /* Emerald 600 */

/* Error States */
--color-error: #ef4444;              /* Red 500 */
--color-error-bg: #fef2f2;           /* Red 50 */
--color-error-border: #f87171;       /* Red 400 */
--color-error-text: #dc2626;         /* Red 600 */

/* Warning States */
--color-warning: #f59e0b;            /* Amber 500 */
--color-warning-bg: #fffbeb;         /* Amber 50 */
--color-warning-border: #fcd34d;     /* Amber 300 */
--color-warning-text: #d97706;       /* Amber 600 */

/* Info States */
--color-info: #3b82f6;               /* Blue 500 */
--color-info-bg: #eff6ff;            /* Blue 50 */
--color-info-border: #93c5fd;        /* Blue 300 */
--color-info-text: #2563eb;          /* Blue 600 */
```

---

## Spacing Scale

**Base Unit**: 8px

```css
/* Spacing Tokens */
--space-0: 0;
--space-1: 4px;      /* 0.5 × base */
--space-2: 8px;      /* 1 × base */
--space-3: 12px;     /* 1.5 × base */
--space-4: 16px;     /* 2 × base */
--space-5: 20px;     /* 2.5 × base */
--space-6: 24px;     /* 3 × base */
--space-8: 32px;     /* 4 × base */
--space-10: 40px;    /* 5 × base */
--space-12: 48px;    /* 6 × base */
--space-16: 64px;    /* 8 × base */
--space-20: 80px;    /* 10 × base */
```

### Spacing Usage Guidelines

| Token | Common Use Cases |
|-------|------------------|
| `space-1` (4px) | Tight inline spacing, icon gaps |
| `space-2` (8px) | Label-to-input, checkbox-to-label |
| `space-3` (12px) | Padding inside small buttons |
| `space-4` (16px) | Padding inside inputs, small card padding |
| `space-5` (20px) | Padding inside buttons, compact layouts |
| `space-6` (24px) | Gap between form fields, card padding |
| `space-8` (32px) | Section padding, large gaps |
| `space-10` (40px) | Page padding, major section gaps |
| `space-12` (48px) | Large section spacing |
| `space-16` (64px) | Major page sections |

---

## Typography Tokens

### Font Families

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "Courier New", Courier, monospace;
```

### Font Sizes

```css
--font-size-xs: 12px;    /* Small labels, meta text */
--font-size-sm: 13px;    /* Labels, help text */
--font-size-base: 15px;  /* Body text, inputs */
--font-size-lg: 20px;    /* Section headings */
--font-size-xl: 32px;    /* Page headings */
```

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights

```css
--line-height-tight: 1.2;    /* Headings */
--line-height-normal: 1.5;   /* Body text */
--line-height-relaxed: 1.75; /* Longer paragraphs */
```

---

## Border Radius Tokens

```css
--radius-sm: 8px;     /* Small elements (badges, pills) */
--radius-md: 12px;    /* Default (inputs, buttons, cards) */
--radius-lg: 16px;    /* Large cards, modals */
--radius-xl: 24px;    /* Extra large containers */
--radius-full: 9999px; /* Pills, avatars (circular) */
```

---

## Shadow Tokens

```css
/* Elevation Shadows */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 12px 32px rgba(0, 0, 0, 0.16);

/* Button Shadows */
--shadow-button: 0 4px 16px rgba(14, 165, 233, 0.3);
--shadow-button-hover: 0 8px 24px rgba(14, 165, 233, 0.4);

/* Focus Shadow */
--shadow-focus: 0 0 0 4px rgba(14, 165, 233, 0.1);
```

---

## Z-Index Scale

**Purpose**: Manage stacking context consistently.

```css
--z-base: 0;           /* Default layer */
--z-dropdown: 100;     /* Dropdowns, autocomplete results */
--z-sticky: 200;       /* Sticky headers, navigation */
--z-fixed: 300;        /* Fixed elements */
--z-modal-backdrop: 400; /* Modal overlay */
--z-modal: 500;        /* Modal content */
--z-popover: 600;      /* Popovers, tooltips */
--z-toast: 700;        /* Toast notifications */
```

### Z-Index Usage Guidelines

- Never use arbitrary z-index values
- Always use tokens from the scale
- Higher values only when absolutely necessary
- Document any deviation with clear rationale

---

## Transition Tokens

```css
/* Duration */
--duration-fast: 0.15s;      /* Quick micro-interactions */
--duration-normal: 0.3s;     /* Default transitions */
--duration-slow: 0.5s;       /* Major state changes */

/* Easing Functions */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);  /* Default easing */
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1);  /* Enter animations */
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);  /* Exit animations */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful */

/* Complete Transitions */
--transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Icon Sizes

```css
--icon-xs: 12px;   /* Inline with small text */
--icon-sm: 16px;   /* Inline with body text */
--icon-md: 20px;   /* Buttons, form elements */
--icon-lg: 24px;   /* Section headers, cards */
--icon-xl: 32px;   /* Page headers */
--icon-2xl: 48px;  /* Empty states, modals */
```

---

## Breakpoints

```css
/* Responsive Breakpoints */
--breakpoint-mobile: 480px;   /* Small phones */
--breakpoint-tablet: 768px;   /* Tablets, large phones */
--breakpoint-desktop: 1024px; /* Small desktops */
--breakpoint-wide: 1280px;    /* Wide desktops */
```

### Media Query Usage

```css
/* Mobile-first approach */
@media (min-width: 768px) {
  /* Tablet and up */
}

@media (min-width: 1024px) {
  /* Desktop and up */
}
```

---

## Container Widths

```css
--container-sm: 640px;   /* Narrow content (forms, articles) */
--container-md: 768px;   /* Default content width */
--container-lg: 1024px;  /* Wide content (dashboards) */
--container-xl: 1280px;  /* Full-width layouts */
```

---

## Grid Tokens

```css
--grid-columns: 12;           /* Standard 12-column grid */
--grid-gutter: 24px;          /* Gap between columns */
--grid-gutter-mobile: 16px;   /* Gap on mobile */
```

---

## Opacity Tokens

```css
--opacity-disabled: 0.5;      /* Disabled elements */
--opacity-hover: 0.9;         /* Subtle hover dimming */
--opacity-overlay: 0.6;       /* Modal backdrops */
--opacity-transparent: 0;
--opacity-full: 1;
```

---

## Touch Target Sizes

**WCAG Guideline**: Minimum 44×44px for touch targets

```css
--touch-target-min: 44px;     /* Minimum (WCAG AA) */
--touch-target-comfortable: 48px; /* Comfortable size */
--touch-target-large: 56px;   /* Large, easy to tap */
```

### Touch Target Guidelines

- Buttons: 48px height minimum
- Radio buttons/checkboxes: 44px hit area (visual can be smaller)
- Input fields: 44px height minimum
- Links in paragraphs: Ensure adequate line height

---

## Usage Examples

### Button Using Tokens

```css
.btn-primary {
  padding: var(--space-4) var(--space-8);
  background: var(--color-brand-gradient);
  color: var(--color-text-inverted);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  box-shadow: var(--shadow-button);
  transition: var(--transition-normal);
  min-height: var(--touch-target-comfortable);
}

.btn-primary:hover {
  box-shadow: var(--shadow-button-hover);
  transform: translateY(-2px);
}
```

### Input Using Tokens

```css
.input {
  padding: var(--space-4);
  background: var(--color-bg-tertiary);
  border: 1.5px solid var(--color-border-default);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  min-height: var(--touch-target-min);
  transition: var(--transition-fast);
}

.input:focus {
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-focus);
  background: var(--color-bg-primary);
}
```

---

## Token Naming Convention

**Pattern**: `--{category}-{property}-{variant}`

**Examples**:
- `--color-text-primary`
- `--space-6`
- `--shadow-button-hover`
- `--radius-md`

**Benefits**:
- Predictable names
- Easy autocomplete
- Clear hierarchy
- Scalable

---

## Maintenance Guidelines

### When to Add New Tokens

✅ **DO create new tokens when**:
- The value will be reused in 3+ places
- It represents a semantic concept (success, error, warning)
- It improves consistency
- It enables theming

❌ **DON'T create new tokens when**:
- Value is truly one-off and contextual
- It duplicates an existing token
- It's overly specific to one component

### Versioning

- Increment version when adding/removing tokens
- Document breaking changes
- Provide migration guide for removed tokens

---

## Design Token Benefits

1. **Consistency**: Single source of truth for values
2. **Maintainability**: Update once, applies everywhere
3. **Scalability**: Easy to add new components
4. **Theming**: Foundation for light/dark modes
5. **Collaboration**: Clear language between design and development
6. **Accessibility**: Formalized touch targets, contrast ratios, etc.

---

## Next Steps

- Migrate existing CSS to use design tokens
- Create CSS custom properties file for web implementation
- Set up design token pipeline (Figma → Code)
- Create automated token documentation

---

**Version History**:
- 1.0 (2026-01-04): Initial design tokens formalized
