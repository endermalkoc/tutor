# Illustration Guidelines

**Version**: 1.0
**Last Updated**: 2026-01-04

---

## Overview

Illustrations bring warmth and personality to our minimalist interface while supporting clarity and understanding. They should feel professional, approachable, and purposeful—never decorative for decoration's sake.

**Style**: Modern minimalist line art with selective spot color

---

## Illustration Style

### Core Characteristics

1. **Simple Geometric Shapes**
   - Circles, rounded rectangles, basic polygons
   - Clean, recognizable silhouettes
   - Avoid complex organic shapes

2. **Consistent Stroke Weight**
   - 2px stroke (matching icon system)
   - Rounded line caps and joins
   - Outlined style (not filled)

3. **Limited Detail, Maximum Clarity**
   - Communicate concept with minimum lines
   - Remove anything that doesn't add meaning
   - Prioritize recognition over realism

4. **Selective Spot Color**
   - Primary line color: #1e293b (slate 800)
   - Accent elements: #0ea5e9 (brand blue)
   - Background fills: #f8fafc (slate 50) sparingly
   - Mostly line art, minimal fills

5. **Friendly but Professional**
   - Avoid overly playful or childish
   - Warm without being cartoony
   - Approachable but trustworthy

---

## Color Palette

### Primary Colors

```css
/* Line Colors */
--illustration-line-primary: #1e293b;   /* Slate 800 - Main lines */
--illustration-line-secondary: #94a3b8; /* Slate 400 - Secondary elements */
--illustration-line-accent: #0ea5e9;    /* Brand blue - Highlights */

/* Fill Colors (Use Sparingly) */
--illustration-fill-bg: #f8fafc;        /* Slate 50 - Background elements */
--illustration-fill-accent: #e0f2fe;    /* Blue 100 - Accent fills */
--illustration-fill-subtle: #f1f5f9;    /* Slate 100 - Very subtle fills */
```

### Usage Guidelines

**Primary lines** (#1e293b):
- Main subject outlines
- Structural elements
- Important details

**Secondary lines** (#94a3b8):
- Background objects
- Less important details
- Texture and depth

**Accent color** (#0ea5e9):
- Key focal point
- Interactive elements in illustration
- One per illustration maximum

**Fills**:
- Use sparingly (10-20% of illustration)
- Create depth, not decoration
- Maintain light, airy feel

---

## Size Guidelines

### Recommended Sizes

| Use Case | Size | Example |
|----------|------|---------|
| **Empty States** | 200-240px square | No students yet, no search results |
| **Modals** | 120-160px square | Success confirmations, important alerts |
| **Inline** | 80-100px square | Onboarding tips, help sections |
| **Hero** | 300-400px wide | Landing pages, major sections |

### Responsive Behavior

```css
/* Desktop */
.illustration-large {
  width: 240px;
  height: 240px;
}

/* Tablet */
@media (max-width: 768px) {
  .illustration-large {
    width: 180px;
    height: 180px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .illustration-large {
    width: 160px;
    height: 160px;
  }
}
```

---

## Use Cases

### 1. Empty States

**Purpose**: Make empty screens friendly and encouraging.

**When to use**:
- No students in database yet
- No search results found
- No upcoming lessons scheduled
- First-time user experience

**Illustration approach**:
- Simple, optimistic imagery
- Centered, prominent placement
- Paired with helpful message and call-to-action
- Size: 200-240px

**Example concepts**:
- **No students**: Open book with person outline
- **No results**: Magnifying glass with question mark
- **No lessons**: Empty calendar with clock
- **Getting started**: Path leading to destination

### 2. Success Celebrations

**Purpose**: Reinforce positive actions with visual delight.

**When to use**:
- Student added successfully
- Lesson completed
- Milestone reached
- Data imported successfully

**Illustration approach**:
- Include checkmark or success symbol
- Add motion lines or confetti elements
- Keep playful but professional
- Size: 120-160px

**Example concepts**:
- **Success**: Checkmark with subtle radiating lines
- **Milestone**: Trophy or star with sparkles
- **Completion**: Filled progress circle
- **Achievement**: Rising arrow or growing plant

### 3. Onboarding & Education

**Purpose**: Guide new users through features and concepts.

**When to use**:
- Welcome screens
- Feature tutorials
- Setup wizards
- Contextual help

**Illustration approach**:
- Directional arrows showing flow
- Highlighted interface elements
- Step-by-step visual guides
- Size: 120-200px

**Example concepts**:
- **Welcome**: Waving hand with platform preview
- **Tutorial**: Arrow pointing to key feature
- **Setup**: Checklist with some items completed
- **Help**: Information symbol with context

### 4. Error Recovery

**Purpose**: Soften error messages and guide recovery.

**When to use**:
- Network errors
- Permission issues
- System errors
- Failed operations

**Illustration approach**:
- Avoid negative imagery (broken, sad faces)
- Show path to recovery
- Keep simple and calm
- Size: 120-160px

**Example concepts**:
- **Network error**: Disconnected wifi or plug
- **Permission**: Locked folder or door
- **Not found**: Empty box or location pin
- **Retry**: Circular arrow (refresh)

---

## Creation Guidelines

### Design Process

1. **Concept Sketch**
   - Start with rough pencil/digital sketch
   - Focus on clear silhouette
   - Identify key focal point

2. **Simplify**
   - Remove unnecessary details
   - Combine shapes where possible
   - Ensure concept clear in 5 seconds

3. **Construct on Grid**
   - Use 8px grid for alignment
   - Start with 2px stroke
   - Round caps and joins
   - Align to pixel grid

4. **Add Color**
   - Primary lines: slate 800
   - Identify one accent element: brand blue
   - Add subtle fills sparingly
   - Test in grayscale (should still work)

5. **Optimize SVG**
   - Remove unnecessary groups
   - Combine paths where possible
   - Clean up attributes
   - Compress file size

6. **Test at Size**
   - View at actual usage size
   - Ensure clarity at 160px
   - Check responsive scaling
   - Verify accessibility

### Technical Specifications

```svg
<svg
  width="240"
  height="240"
  viewBox="0 0 240 240"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Illustration content -->
</svg>
```

**Attributes**:
- `viewBox="0 0 240 240"` - Allows scaling
- `fill="none"` - Outlined style default
- Clean, semantic naming for paths
- Use `<g>` groups sparingly

**Stroke Properties**:
```svg
stroke="#1e293b"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
```

---

## Example: Empty State Illustration

### "No Students Yet"

**Concept**: Open book with simple person outline

```svg
<svg width="240" height="240" viewBox="0 0 240 240" fill="none">
  <!-- Book -->
  <rect
    x="60" y="100"
    width="120" height="90"
    rx="8"
    stroke="#1e293b"
    stroke-width="2"
    fill="#f8fafc"
  />
  <!-- Book spine -->
  <line
    x1="120" y1="100"
    x2="120" y2="190"
    stroke="#94a3b8"
    stroke-width="2"
  />
  <!-- Book pages (lines) -->
  <line x1="80" y1="120" x2="110" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="80" y1="130" x2="110" y2="130" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="120" x2="160" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="130" y1="130" x2="160" y2="130" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Person (simple) -->
  <circle
    cx="120" cy="50" r="16"
    stroke="#0ea5e9"
    stroke-width="2"
    fill="none"
  />
  <path
    d="M100 80 Q120 70 140 80"
    stroke="#0ea5e9"
    stroke-width="2"
    fill="none"
  />
</svg>
```

**Usage**:
```html
<div class="empty-state">
  <svg class="empty-illustration">...</svg>
  <h3>No Students Yet</h3>
  <p>Add your first student to get started with tutoring management.</p>
  <button class="btn btn-primary">Add Student</button>
</div>
```

---

## Animation Guidelines

### When to Animate

- ✅ Illustrations appearing on screen (fade in)
- ✅ Success celebrations (scale, sparkle)
- ✅ Drawing-in effect for onboarding
- ❌ Continuous looping animations
- ❌ Distracting motion on static screens

### Animation Examples

**Fade In**:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.illustration-enter {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Draw In** (SVG Stroke Animation):
```css
.illustration-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  .illustration-enter,
  .illustration-path {
    animation: none;
  }
}
```

---

## Accessibility

### Alt Text Guidelines

**Always provide meaningful alt text**:

```html
<!-- Good -->
<img
  src="no-students.svg"
  alt="Empty state showing an open book, indicating no students have been added yet"
>

<!-- Bad -->
<img src="no-students.svg" alt="Illustration">
```

**Decorative illustrations**:
```html
<img src="decorative.svg" alt="" aria-hidden="true">
```

### Color Contrast

- Illustrations must meet WCAG AA contrast ratio (3:1 for graphics)
- Primary lines (#1e293b) on white background meet AA+
- Test accent colors against backgrounds

### Don't Rely on Illustration Alone

Illustrations supplement text, never replace it:
```html
<!-- Good -->
<div class="empty-state">
  <img src="no-results.svg" alt="">
  <h3>No Results Found</h3>
  <p>Try adjusting your search</p>
</div>

<!-- Bad - illustration only -->
<div class="empty-state">
  <img src="no-results.svg" alt="No results">
</div>
```

---

## Do's and Don'ts

### ✅ DO:

- Keep simple and minimal
- Use consistent 2px stroke weight
- Align to 8px grid
- Use spot color for emphasis
- Test at actual usage size
- Provide meaningful alt text
- Respect reduced motion preferences
- Use for empty states, success, onboarding

### ❌ DON'T:

- Create complex, detailed illustrations
- Mix illustration styles
- Use illustrations purely for decoration
- Rely on color alone to convey meaning
- Overuse accent colors
- Create illustrations smaller than 80px
- Use offensive or exclusive imagery
- Add unnecessary animations

---

## File Organization

### Naming Convention

**Pattern**: `illustration-{context}-{name}.svg`

Examples:
- `illustration-empty-no-students.svg`
- `illustration-success-student-added.svg`
- `illustration-error-network.svg`
- `illustration-onboarding-welcome.svg`

### Directory Structure

```
/assets/illustrations/
├── empty-states/
│   ├── illustration-empty-no-students.svg
│   ├── illustration-empty-no-results.svg
│   └── illustration-empty-no-lessons.svg
├── success/
│   ├── illustration-success-checkmark.svg
│   ├── illustration-success-milestone.svg
│   └── illustration-success-import.svg
├── onboarding/
│   ├── illustration-onboarding-welcome.svg
│   ├── illustration-onboarding-tour.svg
│   └── illustration-onboarding-setup.svg
└── errors/
    ├── illustration-error-network.svg
    ├── illustration-error-permission.svg
    └── illustration-error-not-found.svg
```

---

## Tools & Resources

### Recommended Tools

1. **Figma** - Vector design, collaboration
2. **Illustrator** - Professional vector editing
3. **Inkscape** - Free, open-source vector editor
4. **SVGOMG** - SVG optimization

### Optimization

After creating SVG, optimize using:
- Remove unnecessary attributes
- Combine paths
- Round coordinates
- Remove hidden elements
- Compress file size

**SVGOMG Settings**:
- Precision: 2
- Enable: Remove viewBox, merge paths, remove hidden elements
- Disable: Remove unknown attributes (keep accessibility)

---

## Review Checklist

Before publishing an illustration:

- [ ] Follows minimalist line art style
- [ ] Uses 2px stroke weight
- [ ] Aligned to 8px grid
- [ ] Uses color palette (primary lines, one accent)
- [ ] Fills used sparingly (< 20%)
- [ ] Tested at actual usage size (160px, 240px)
- [ ] SVG optimized (clean code)
- [ ] Alt text provided
- [ ] Meaningful, not decorative
- [ ] Professional and inclusive
- [ ] Respects reduced motion
- [ ] File properly named and organized

---

## Version History

- **1.0** (2026-01-04): Initial illustration guidelines
  - Defined minimalist line art style
  - Established color palette
  - Created size guidelines
  - Documented use cases
  - Provided creation process
