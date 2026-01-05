# Color System

**Last Updated**: 2026-01-04
**Design Theme**: Modern Minimalist - Twilight Purple

## Overview

This color system provides a cohesive palette for the tutor management application, emphasizing creativity, sophistication, wisdom, and innovation through a refined purple color scheme.

---

## Primary Colors

### Brand Primary
- **Violet**: `#7c3aed`
  - Usage: Primary actions, links, focus states, brand elements
  - Accent color for the application
  - WCAG AA compliant on white backgrounds
  - Conveys: Creativity, sophistication, wisdom

- **Light Violet**: `#a78bfa`
  - Usage: Gradient combinations with Violet
  - Secondary brand accent
  - Hover states and highlights

### Primary Gradients
- **Header Gradient**: `linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)`
- **Button Gradient**: `linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)`

---

## Neutral Colors

### Text Colors (Zinc Scale)
- **Primary Text**: `#18181b` (Zinc 900) - Main body text, headings
- **Secondary Text**: `#52525b` (Zinc 600) - Labels, secondary information
- **Tertiary Text**: `#71717a` (Zinc 500) - Help text, meta information
- **Disabled Text**: `#a1a1aa` (Zinc 400) - Placeholders, disabled states
- **Dark Heading**: `#18181b` (Zinc 900) - Section headings, emphasis

### Background Colors
- **White**: `#ffffff` - Primary background
- **Light Gray**: `#fafafa` (Zinc 50) - Input backgrounds, subtle sections
- **Lighter Gray**: `#f5f3ff` (Violet 50) - Secondary sections, alternating rows
- **Page Gradient**: `linear-gradient(135deg, #fafaf9 0%, #f5f3ff 100%)`

### Border Colors (Zinc Scale)
- **Default Border**: `#e4e4e7` (Zinc 200) - Standard borders
- **Light Border**: `#f5f3ff` (Violet 50) - Subtle dividers
- **Hover Border**: `#d4d4d8` (Zinc 300) - Interactive element borders

---

## Semantic Colors

### Success
- **Success Green**: `#10b981` (Emerald 500)
  - Usage: Success messages, confirmations, positive states
- **Success Dark**: `#059669` (Emerald 600) - Icons, emphasis
- **Success Light**: `#34d399` (Emerald 400) - Dark mode variant

### Warning
- **Warning Amber**: `#f59e0b` (Amber 500) - Buttons, borders
- **Warning Dark**: `#d97706` (Amber 600) - Hover states, darker accents
- **Warning Background**: `linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)`
- **Warning Border**: `#fbbf24` (Amber 400)
- **Warning Text**: `#92400e` (Amber 800) - Headings in warning contexts
- **Warning Content**: `#78350f` (Amber 900) - Body text in warnings

### Error
- **Error Red**: `#ef4444` (Red 500) - Error messages, destructive actions
- **Error Dark**: `#dc2626` (Red 600) - Emphasis, borders
- **Error Darker**: `#991b1b` (Red 800) - Error message text
- **Error Background**: `#fef2f2` (Red 50)
- **Error Border**: `#fecaca` (Red 200)
- **Error Light**: `#f87171` (Red 400)

### Info (Purple-tinted)
- **Info Purple**: `#faf5ff` (Violet 50) - Selected states, info backgrounds
- **Info Lighter**: `#e9d5ff` (Violet 200) - Gradient combinations
- **Info Light**: `#d8b4fe` (Violet 300) - Hover states
- **Info Background**: `linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)`

---

## Interactive States

### Focus States
- **Focus Ring**: `0 0 0 4px rgba(124, 58, 237, 0.1)`
- **Focus Border**: `#7c3aed`

### Hover States
- **Primary Hover**: `#6d28d9` (Violet 700) or maintains `#7c3aed` with enhanced shadow
- **Secondary Hover**: `#fafafa` background, `#d4d4d8` border
- **Background Hover**: `rgba(124, 58, 237, 0.05)` - Subtle purple tint

### Active/Selected
- **Selected Background**: `#faf5ff` (Violet 50)
- **Selected Border**: `#7c3aed`
- **Selected Accent**: `rgba(124, 58, 237, 0.08)` - For radio/checkbox selections

---

## Shadows

### Elevation Shadows
- **Card Shadow**: `0 8px 32px rgba(0, 0, 0, 0.08)`
- **Dropdown Shadow**: `0 12px 32px rgba(0, 0, 0, 0.12)`
- **Modal Shadow**: `0 24px 64px rgba(0, 0, 0, 0.2)`

### Interactive Shadows (Purple-tinted)
- **Button Hover**: `0 8px 24px rgba(124, 58, 237, 0.4)`
- **Button Default**: `0 4px 16px rgba(124, 58, 237, 0.3)`
- **Input Focus**: `0 0 0 4px rgba(124, 58, 237, 0.1)`

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
- Primary violet (`#7c3aed`) achieves 3.5:1 on white (suitable for large text and UI elements)
- Zinc 900 text (`#18181b`) achieves excellent contrast on white backgrounds
- The zinc scale provides warmer neutrals that complement the purple palette

### Color Independence
- Never rely solely on color to convey information
- Use icons, text labels, and patterns alongside color
- Ensure interactive elements have non-color indicators (underlines, borders, icons)

---

## Usage Examples

### Primary Actions
```css
background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);
color: white;
box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
```

### Input Fields
```css
background: #fafafa;
border: 1.5px solid #e4e4e7;
color: #18181b;

/* Focus state */
border-color: #7c3aed;
background: white;
box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
```

### Radio/Checkbox Interactive States
```css
/* Hover background */
background: rgba(124, 58, 237, 0.05);

/* Checked/selected background */
background: rgba(124, 58, 237, 0.08);

/* Accent color */
accent-color: #7c3aed;
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
color: #991b1b; /* body text */
```

### Info/Selected States
```css
background: linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%);
border: 2px solid #7c3aed;
color: #18181b;
```

---

## Design Philosophy: Twilight Purple

**Emotional Impact:**
- **Creativity**: Purple stimulates imagination and creative thinking
- **Sophistication**: Conveys professionalism and refined taste
- **Wisdom**: Associated with knowledge, learning, and expertise
- **Innovation**: Modern and forward-thinking aesthetic

**Best Use Cases:**
- Advanced courses and professional development
- Creative subjects (art, music, writing)
- Graduate-level and adult education
- Innovation-focused learning platforms

**Zinc Scale Benefits:**
- Warmer, more sophisticated than traditional grays
- Complements purple without competing
- Creates a cohesive, harmonious palette
- Maintains excellent readability and accessibility
