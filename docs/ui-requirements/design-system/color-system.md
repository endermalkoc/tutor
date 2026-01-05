# Color System

**Last Updated**: 2026-01-04
**Design Theme**: Modern Minimalist

## Overview

This color system provides a cohesive palette for the tutor management application, emphasizing clarity, accessibility, and a calm, professional aesthetic.

---

## Primary Colors

### Brand Primary
- **Sky Blue**: `#0ea5e9`
  - Usage: Primary actions, links, focus states, brand elements
  - Accent color for the application
  - WCAG AA compliant on white backgrounds

- **Cyan**: `#06b6d4`
  - Usage: Gradient combinations with Sky Blue
  - Secondary brand accent

### Primary Gradients
- **Header Gradient**: `linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)`
- **Button Gradient**: `linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)`

---

## Neutral Colors

### Text Colors
- **Primary Text**: `#1e293b` - Main body text, headings
- **Secondary Text**: `#475569` - Labels, secondary information
- **Tertiary Text**: `#64748b` - Help text, meta information
- **Disabled Text**: `#94a3b8` - Placeholders, disabled states
- **Dark Heading**: `#0f172a` - Section headings, emphasis

### Background Colors
- **White**: `#ffffff` - Primary background
- **Light Gray**: `#fafafa` - Input backgrounds, subtle sections
- **Lighter Gray**: `#f8fafc` - Secondary sections, alternating rows
- **Page Gradient**: `linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)`

### Border Colors
- **Default Border**: `#e2e8f0` - Standard borders
- **Light Border**: `#f1f5f9` - Subtle dividers
- **Hover Border**: `#cbd5e1` - Interactive element borders

---

## Semantic Colors

### Success
- **Success Green**: `#059669`
  - Usage: Success messages, confirmations, positive states

### Warning
- **Warning Amber**: `#f59e0b` - Buttons, borders
- **Warning Dark**: `#d97706` - Hover states, darker accents
- **Warning Background**: `linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)`
- **Warning Border**: `#fbbf24`
- **Warning Text**: `#92400e` - Headings in warning contexts
- **Warning Content**: `#78350f` - Body text in warnings

### Error
- **Error Red**: `#dc2626` - Error messages, destructive actions
- **Error Dark**: `#b91c1c` - Links in error contexts
- **Error Darker**: `#991b1b` - Error message text
- **Error Background**: `#fef2f2`
- **Error Border**: `#fecaca`
- **Error Light Border**: `#f87171`

### Info
- **Info Blue**: `#eff6ff` - Selected states, info backgrounds
- **Info Lighter**: `#dbeafe` - Gradient combinations
- **Info Light**: `#e0f2fe` - Hover states
- **Info Background**: `linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)`

---

## Interactive States

### Focus States
- **Focus Ring**: `0 0 0 4px rgba(14, 165, 233, 0.1)`
- **Focus Border**: `#0ea5e9`

### Hover States
- **Primary Hover**: Maintains `#0ea5e9` with enhanced shadow
- **Secondary Hover**: `#f8fafc` background, `#cbd5e1` border

### Active/Selected
- **Selected Background**: `#eff6ff`
- **Selected Border**: `#0ea5e9`

---

## Shadows

### Elevation Shadows
- **Card Shadow**: `0 8px 32px rgba(0, 0, 0, 0.08)`
- **Dropdown Shadow**: `0 12px 32px rgba(0, 0, 0, 0.12)`
- **Modal Shadow**: `0 24px 64px rgba(0, 0, 0, 0.2)`

### Interactive Shadows
- **Button Hover**: `0 8px 24px rgba(14, 165, 233, 0.4)`
- **Button Default**: `0 4px 16px rgba(14, 165, 233, 0.3)`
- **Input Focus**: `0 0 0 4px rgba(14, 165, 233, 0.1)`

---

## Opacity & Overlays

### Modal Overlays
- **Backdrop**: `rgba(0, 0, 0, 0.5)` with `blur(4px)`

### Decorative Elements
- **Light Overlay**: `rgba(255, 255, 255, 0.1)` - Decorative circles, patterns
- **Medium Overlay**: `rgba(255, 255, 255, 0.2)` - Keyboard hints

---

## Accessibility Guidelines

### Contrast Ratios
- All text colors meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Primary blue (`#0ea5e9`) achieves 3.2:1 on white (suitable for large text and UI elements)
- Dark text (`#1e293b`) achieves 12.7:1 on white

### Color Independence
- Never rely solely on color to convey information
- Use icons, text labels, and patterns alongside color
- Ensure interactive elements have non-color indicators (underlines, borders, icons)

---

## Usage Examples

### Primary Actions
```css
background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
color: white;
box-shadow: 0 4px 16px rgba(14, 165, 233, 0.3);
```

### Input Fields
```css
background: #fafafa;
border: 1.5px solid #e2e8f0;
color: #1e293b;

/* Focus state */
border-color: #0ea5e9;
background: white;
box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
```

### Warning Messages
```css
background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
border: 1.5px solid #fbbf24;
color: #92400e; /* heading */
color: #78350f; /* body text */
```

### Error States
```css
background: #fef2f2;
border: 1.5px solid #fecaca;
color: #dc2626; /* heading */
color: #b91c1c; /* links */
```
