# Icon System

**Version**: 1.0
**Last Updated**: 2026-01-04

---

## Philosophy

Icons extend our minimalist design language through:

- **Consistent stroke weight** (2px)
- **Rounded endpoints and corners**
- **Optical balance**, not mathematical perfection
- **Clear meaning at small sizes**
- **Purposeful, not decorative**

Icons should communicate quickly and disappear into the interface, supporting but never dominating the content.

---

## Grid System

### Base Grid: 24×24px

```
┌─────────────────────────┐
│  2px padding           │
│  ┌─────────────────┐   │
│  │                 │   │
│  │   20×20 active  │   │
│  │   drawing area  │   │
│  │                 │   │
│  └─────────────────┘   │
│                         │
└─────────────────────────┘
```

**Key Dimensions**:
- **Base grid**: 24×24px
- **Safe area**: 2px padding on all sides
- **Active drawing area**: 20×20px
- **Stroke width**: 2px
- **Corner radius**: 1-2px (for rounded rectangles)

---

## Size Scale

### Available Sizes

| Size Token | Dimensions | Use Case | Example |
|------------|-----------|----------|---------|
| **xs** | 12px | Inline with small text, badges | Notification count icons |
| **sm** | 16px | Inline with body text | Text formatting icons |
| **md** | 20px | Buttons, form elements | Search icon in input |
| **lg** | 24px | Section headers, cards | Card action icons |
| **xl** | 32px | Page headers, prominent actions | Main navigation icons |
| **2xl** | 48px | Empty states, modals, celebrations | Empty state illustration icons |

### Scaling Guidelines

Icons should be designed at **24×24px base** and scale proportionally.

**✅ DO**:
- Export at exact multiples when possible (12px, 24px, 48px)
- Maintain stroke weight proportionally
- Test readability at smallest size (12px)

**❌ DON'T**:
- Scale unevenly (stretch or squash)
- Use sizes not in the scale
- Make icons smaller than 12px

---

## Stroke & Style

### Stroke Properties

```css
stroke-width: 2px;
stroke-linecap: round;
stroke-linejoin: round;
fill: none; /* Outlined style by default */
```

### Style: Outlined (Primary)

**Why outlined**:
- Lighter visual weight
- Consistent with minimalist philosophy
- Scales better at small sizes
- Works well on various backgrounds

**When to use filled**:
- Icon is selected/active state
- Needs more visual emphasis
- Specific semantic meaning (e.g., filled star = favorited)

---

## Color Usage

### Default State

```css
color: #64748b; /* Slate 500 - Tertiary text */
```

**Why**: Recedes appropriately, doesn't compete with content.

### Interactive States

```css
/* Hover */
color: #0ea5e9; /* Brand blue */

/* Active/Selected */
color: #0ea5e9; /* Brand blue */
fill: #0ea5e9; /* Fill for selected icons */

/* Disabled */
color: #cbd5e1; /* Slate 300 */
opacity: 0.5;
```

### Semantic Colors

```css
/* Success */
color: #059669; /* Emerald 600 */

/* Warning */
color: #d97706; /* Amber 600 */

/* Error */
color: #dc2626; /* Red 600 */

/* Info */
color: #2563eb; /* Blue 600 */
```

### On Colored Backgrounds

```css
/* On dark backgrounds */
color: #ffffff; /* White */

/* On brand buttons */
color: #ffffff; /* White */
```

---

## Standard Icon Set

### Navigation & Actions

```html
<!-- Search -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="9" r="6"/>
  <path d="M13.5 13.5L17 17"/>
</svg>

<!-- Close (X) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4L16 16M4 16L16 4"/>
</svg>

<!-- Plus (Add) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 4V16M4 10H16"/>
</svg>

<!-- Chevron Down -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 8L10 13L15 8"/>
</svg>

<!-- Edit (Pencil) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14 2L18 6L8 16H4V12L14 2Z"/>
</svg>

<!-- Delete (Trash) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 6H17M8 3H12M5 6L6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19H12C12.5304 19 13.0391 18.7893 13.4142 18.4142C13.7893 18.0391 14 17.5304 14 17L15 6"/>
  <path d="M8 10V15M12 10V15"/>
</svg>
```

### Status & Feedback

```html
<!-- Checkmark (Success) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 10L8 14L16 6"/>
</svg>

<!-- Warning Triangle -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M10 2L18 17H2L10 2Z"/>
  <path d="M10 8V12"/>
  <circle cx="10" cy="15" r="0.5" fill="currentColor"/>
</svg>

<!-- Error Circle -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="10" r="8"/>
  <path d="M10 6V10"/>
  <circle cx="10" cy="14" r="0.5" fill="currentColor"/>
</svg>

<!-- Info Circle -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="10" r="8"/>
  <path d="M10 10V14"/>
  <circle cx="10" cy="6" r="0.5" fill="currentColor"/>
</svg>
```

### Common Elements

```html
<!-- User (Person) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="6" r="3"/>
  <path d="M4 18C4 15 6.5 13 10 13C13.5 13 16 15 16 18"/>
</svg>

<!-- Calendar -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="4" width="14" height="14" rx="2"/>
  <path d="M3 8H17"/>
  <path d="M7 2V6M13 2V6"/>
</svg>

<!-- Clock -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="10" r="8"/>
  <path d="M10 5V10L13 13"/>
</svg>

<!-- Settings (Gear) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="10" cy="10" r="2"/>
  <path d="M10 2L11 5L14 4L15 7L18 8L17 11L18 14L15 15L14 18L11 17L10 20L9 17L6 18L5 15L2 14L3 11L2 8L5 7L6 4L9 5L10 2Z"/>
</svg>

<!-- Menu (Hamburger) -->
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 6H17M3 10H17M3 14H17"/>
</svg>
```

---

## Usage Guidelines

### DO:

✅ **Use icons from the standard set**
- Maintains consistency
- Already tested for clarity

✅ **Maintain consistent sizing**
- Use size tokens (xs, sm, md, lg, xl, 2xl)
- Never use arbitrary sizes

✅ **Provide text labels for accessibility**
```html
<button aria-label="Add student">
  <svg>...</svg>
</button>
```

✅ **Use semantic colors**
- Success = green
- Error = red
- Warning = amber
- Default = gray

✅ **Align icons with text**
```css
.icon-with-text {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
```

### DON'T:

❌ **Mix icon styles** (outlined + filled)
- Pick one style and stick to it
- Exception: filled for active/selected states

❌ **Use icons smaller than 12px**
- Below 12px, icons become illegible
- Use text or badges instead

❌ **Rely on icons alone to convey meaning**
- Always include text label or aria-label
- Icons supplement, they don't replace text

❌ **Use decorative icons**
- Every icon should serve a functional purpose
- If it doesn't add clarity, remove it

❌ **Create custom icons without guidelines**
- Follow grid system
- Maintain stroke weight
- Test at multiple sizes

---

## Icon + Text Patterns

### Button with Icon

```html
<!-- Icon left -->
<button class="btn btn-primary">
  <svg width="20" height="20">...</svg>
  <span>Add Student</span>
</button>

<!-- Icon right -->
<button class="btn btn-secondary">
  <span>Open Menu</span>
  <svg width="20" height="20">...</svg>
</button>

<!-- Icon only (include aria-label) -->
<button class="btn btn-icon" aria-label="Close">
  <svg width="20" height="20">...</svg>
</button>
```

### Input with Icon

```html
<!-- Leading icon (search) -->
<div class="input-with-icon">
  <svg class="input-icon-left" width="20" height="20">...</svg>
  <input type="text" placeholder="Search students...">
</div>

<!-- Trailing icon (clear) -->
<div class="input-with-icon">
  <input type="text" value="John Doe">
  <button class="input-icon-right" aria-label="Clear">
    <svg width="20" height="20">...</svg>
  </button>
</div>
```

### Status with Icon

```html
<!-- Success message -->
<div class="message message-success">
  <svg width="20" height="20" style="color: #059669;">...</svg>
  <span>Student added successfully!</span>
</div>

<!-- Error message -->
<div class="message message-error">
  <svg width="20" height="20" style="color: #dc2626;">...</svg>
  <span>Please enter a valid email address.</span>
</div>
```

---

## Creating New Icons

### When to Create Custom Icons

Only create custom icons when:
1. No standard icon conveys the meaning
2. The concept is specific to education/tutoring
3. It will be used in 3+ places

### Design Process

1. **Start with 24×24px artboard**
2. **Use 2px padding** (active area: 20×20px)
3. **Draw with 2px stroke**, rounded caps and joins
4. **Simplify**: Remove unnecessary details
5. **Test at 16px**: Must be recognizable
6. **Optimize SVG**: Remove unnecessary attributes
7. **Add to standard set**: Document in this file

### Design Checklist

- [ ] Designed on 24×24px grid
- [ ] 2px stroke weight
- [ ] Rounded line caps and joins
- [ ] Optical alignment (not just mathematical)
- [ ] Recognizable at 16px
- [ ] Consistent visual weight with other icons
- [ ] SVG optimized (clean code)
- [ ] Documented with usage examples

---

## Accessibility

### ARIA Labels

**Required** for icon-only buttons:

```html
<!-- Good -->
<button aria-label="Delete student">
  <svg>...</svg>
</button>

<!-- Bad -->
<button>
  <svg>...</svg>
</button>
```

### Decorative Icons

If icon is purely decorative, hide from screen readers:

```html
<div>
  <svg aria-hidden="true">...</svg>
  <span>Visible text here</span>
</div>
```

### Color Contrast

- Icons must meet WCAG AA contrast ratio (4.5:1)
- Default gray (#64748b) on white meets AA
- Test semantic colors against their backgrounds

---

## Icon Animation

### Hover/Focus

```css
.icon-interactive {
  color: #64748b;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-interactive:hover,
.icon-interactive:focus {
  color: #0ea5e9;
}
```

### Loading Spinner

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.icon-loading {
  animation: spin 1s linear infinite;
}
```

### Success Checkmark

```css
@keyframes checkmark {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.icon-success {
  animation: checkmark 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Guidelines for Animation

- **Respect reduced motion**:
```css
@media (prefers-reduced-motion: reduce) {
  .icon-animated {
    animation: none;
  }
}
```

- **Keep subtle**: Icons animate to support, not to distract
- **Keep quick**: Animations < 0.5s
- **Purposeful only**: Animate for feedback (success, loading, state change)

---

## Icon Library Resources

### Recommended Icon Sets

Our system is compatible with:

1. **Heroicons** (https://heroicons.com)
   - Outlined style matches our philosophy
   - 2px stroke weight
   - MIT license

2. **Lucide** (https://lucide.dev)
   - Consistent stroke weight
   - Wide variety
   - ISC license

3. **Feather Icons** (https://feathericons.com)
   - Minimalist outlined style
   - 24px base grid
   - MIT license

### Customization

When using external icon sets:
1. Verify 2px stroke weight
2. Confirm rounded line caps
3. Test at multiple sizes
4. Ensure license compatibility
5. Optimize SVG code

---

## File Organization

### SVG File Naming

**Pattern**: `icon-{name}-{size}.svg`

Examples:
- `icon-search-20.svg`
- `icon-user-24.svg`
- `icon-calendar-16.svg`

### Directory Structure

```
/assets/icons/
├── navigation/
│   ├── icon-menu.svg
│   ├── icon-close.svg
│   └── icon-search.svg
├── actions/
│   ├── icon-add.svg
│   ├── icon-edit.svg
│   └── icon-delete.svg
├── status/
│   ├── icon-success.svg
│   ├── icon-error.svg
│   └── icon-warning.svg
└── common/
    ├── icon-user.svg
    ├── icon-calendar.svg
    └── icon-clock.svg
```

---

## Examples in Context

### Form Field with Validation

```html
<!-- Error state -->
<div class="form-field error">
  <label for="email">Email</label>
  <input type="email" id="email" value="invalid">
  <div class="error-message">
    <svg width="16" height="16" style="color: #dc2626;">
      <!-- Error icon -->
    </svg>
    <span>Please enter a valid email address</span>
  </div>
</div>

<!-- Success state -->
<div class="form-field success">
  <label for="name">Full Name</label>
  <input type="text" id="name" value="John Doe">
  <div class="success-message">
    <svg width="16" height="16" style="color: #059669;">
      <!-- Checkmark icon -->
    </svg>
    <span>Looks good!</span>
  </div>
</div>
```

### Card Actions

```html
<div class="card">
  <div class="card-header">
    <h3>John Doe</h3>
    <div class="card-actions">
      <button aria-label="Edit student">
        <svg width="20" height="20"><!-- Edit icon --></svg>
      </button>
      <button aria-label="Delete student">
        <svg width="20" height="20"><!-- Delete icon --></svg>
      </button>
    </div>
  </div>
</div>
```

---

## Version History

- **1.0** (2026-01-04): Initial icon system established
  - Defined grid system (24×24px base)
  - Documented size scale (xs through 2xl)
  - Created standard icon set
  - Established usage guidelines
