# Design Patterns & Guidelines

**Last Updated**: 2026-01-04
**Design Theme**: Modern Minimalist

## Overview

This document defines interaction patterns, design principles, and best practices for the tutor management application. These patterns ensure consistency, usability, and a cohesive user experience across all features.

---

## Design Philosophy

### Minimalism
- **Clean interfaces**: Remove unnecessary visual elements
- **Functional design**: Every element serves a purpose
- **Breathing room**: Generous spacing and whitespace
- **Subtle interactions**: Gentle transitions and hover states
- **Unobtrusive**: Let content and functionality take center stage

### Clarity
- **Clear hierarchy**: Visual weight guides user attention
- **Scannable layouts**: Easy to find information quickly
- **Obvious actions**: Primary actions are visually distinct
- **Immediate feedback**: System responds to all user actions
- **Error prevention**: Validate and guide users proactively

### Efficiency
- **Keyboard support**: All actions accessible via keyboard
- **Smart defaults**: Pre-fill common values
- **Progressive disclosure**: Hide complexity until needed
- **Inline actions**: Minimize navigation and page loads
- **Bulk operations**: Enable efficient management of multiple items

---

## Interaction Patterns

### Form Patterns

#### Standard Form Layout
- **Two-column grid** on desktop, single column on mobile
- **Related fields grouped** in sections with clear headings
- **Required fields marked** with asterisk and color
- **Help text placed** below inputs for clarification
- **Progressive disclosure** for advanced/optional fields

#### Form Validation
1. **Inline validation** on blur for immediate feedback
2. **Submit-time validation** for comprehensive checks
3. **Validation summary** at top of form with jump links
4. **Error highlighting** with color, border, and icon
5. **Accessible error messages** linked via `aria-describedby`

**Validation Timing**:
- **On Blur**: Check required fields, format validation
- **On Input**: Clear errors as user types
- **On Submit**: Full validation with summary

**Error Display**:
```
┌─────────────────────────────────────┐
│ ⚠ Please correct the following:    │
│ → First name is required            │ ← Links to field
│ → Invalid email format              │
└─────────────────────────────────────┘

[First Name]  ← Red border, red background
⚠ First name is required  ← Error message below
```

---

### Search & Select Patterns

#### Autocomplete Search
Used for searching and selecting from existing items (families, schools, etc.).

**Interaction Flow**:
1. User focuses search input
2. Dropdown appears with all options
3. User types to filter results
4. User selects an option or creates new
5. Selection displayed, search input hidden

**Components**:
- Search input with icon
- Dropdown results with sections
- "Create New" option at bottom
- Selected state display
- Clear button to reset

**Visual States**:
```
Search Mode:
┌──────────────────────────────────┐
│ 🔍 Search families...            │
└──────────────────────────────────┘
    ┌──────────────────────────────┐
    │ EXISTING FAMILIES            │
    │ Smith Family (3 students)    │
    │ Johnson Family (1 student)   │
    │ ──────────────────────────   │
    │ ➕ Create New Family         │
    └──────────────────────────────┘

Selected Mode:
┌──────────────────────────────────┐
│ ✓ Smith Family (3 students)  [×] │
└──────────────────────────────────┘
```

**Keyboard Navigation**:
- `↑↓` to navigate results
- `Enter` or `Space` to select
- `Esc` to close dropdown
- `Tab` to move to next field

---

#### Multi-Select Pattern
Used for selecting multiple items (subjects, categories, etc.).

**Implementation**:
- Standard `<select multiple>` element
- Help text indicates keyboard shortcut (Ctrl/Cmd + Click)
- Selected items visually highlighted
- Accessible via keyboard

---

### Progressive Disclosure

#### Collapsible Sections
Used to hide optional or advanced fields until needed.

**Pattern**:
1. Section starts collapsed
2. Toggle button shows/hides content
3. Button text changes based on state
4. Smooth expand/collapse animation
5. `aria-expanded` attribute updates

**Visual Design**:
- Dashed border container
- Prominent toggle button
- Icon/text change on toggle
- Keyboard hint displayed

```
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
  ┌────────────────────────┐
│ │ Show More Fields  ⌥M  │ │
  └────────────────────────┘
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘

After toggle:
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
  ┌────────────────────────────┐
│ │ Hide Additional Fields  ⌥M│ │
  └────────────────────────────┘
│ ────────────────────────────  │
  [Additional fields appear]
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

---

#### Conditional Field Display
Fields appear/disappear based on user selections.

**Pattern**:
- When user selects "Create New Family"
- Guardian information section appears
- When user selects existing family
- Guardian fields hidden

**Implementation**:
- Smooth fade-in animation
- Clear visual indication of new content
- Scrolls into view if needed
- Focused element if appropriate

---

### Confirmation Patterns

#### Inline Confirmation
Used for potentially destructive or duplicate actions.

**Pattern**:
1. System detects duplicate/issue
2. Warning message appears inline
3. User presented with choice
4. Action proceeds or cancels

**Example - Duplicate Detection**:
```
⚠ Possible Duplicate Student
A student with a similar name exists in the
Smith Family. Are you sure you want to create
a new student?

[Yes, Create New Student] [No, Let Me Review]
```

**Timing**:
- Triggered on blur of name fields
- Only shows when family selected
- Can be overridden once

---

#### Modal Confirmation
Used for significant actions requiring full attention.

**Pattern**:
1. User initiates action
2. Modal overlay appears
3. Content dims behind modal
4. User confirms or cancels
5. Modal closes, action executes

**Components**:
- Overlay with blur
- Centered modal card
- Clear heading and message
- Action buttons (primary + secondary)
- Focus trap within modal
- `Esc` key to dismiss

---

### Feedback Patterns

#### Success Modal
Displayed after successful form submission.

**Pattern**:
1. Form submits successfully
2. Modal appears with success message
3. User presented with next actions
4. Modal can be dismissed

**Next Actions Presented**:
- View created item
- Schedule related action
- Create another item
- Return to list

```
┌─────────────────────────────┐
│  ✓ Student Added Successfully│
│                              │
│  Student "John Doe" has been │
│  added successfully.         │
│                              │
│  [View Student Details]      │
│  [Schedule First Lesson]     │
│  [Add Another Student]       │
│  [Return to Student List]    │
└─────────────────────────────┘
```

---

#### Loading States
Shown during asynchronous operations.

**Button Loading State**:
```
Before: [Create Student]
During: [⟳ Creating Student...]  ← Disabled, spinner
After:  [Create Student]
```

**Pattern**:
- Button text changes to indicate action
- Spinner icon appears
- Button disabled during operation
- Can't be clicked multiple times

---

#### Error Notifications

**Network Error** (Toast notification):
- Appears in top-right corner
- Slides in from right
- Displays error message
- Offers retry action
- Can be dismissed
- Auto-dismiss after timeout (optional)

```
╔════════════════════════════╗
║ ⚠ Network Error           ║
║ Unable to save student     ║
║ record. Check connection.  ║
║                            ║
║ [Retry] [Dismiss]          ║
╚════════════════════════════╝
```

**Form Validation Errors**:
- Validation summary at top
- Inline errors below fields
- Fields highlighted with border/background
- Clickable links to jump to errors
- `aria-live` for screen readers

---

### Navigation Patterns

#### Form Actions
Positioned at bottom of form in footer.

**Layout**:
- Secondary action on left (Cancel)
- Primary action on right (Submit)
- Full width on mobile (stacked, reverse order)
- Keyboard hints shown

```
Desktop:
┌────────────────────────────────┐
│ [Cancel Esc]    [Create ⌘↵] │
└────────────────────────────────┘

Mobile:
┌────────────────────────────────┐
│      [Create Student]          │
│      [Cancel]                  │
└────────────────────────────────┘
```

---

#### Keyboard Shortcuts
Provide power-user efficiency.

**Standard Shortcuts**:
- `Ctrl/Cmd + Enter`: Submit form
- `Esc`: Cancel/Close modal
- `Alt + M`: Toggle more fields
- `Tab`: Navigate forward
- `Shift + Tab`: Navigate backward

**Display**:
- Shown as subtle hints next to buttons
- Hidden on mobile
- Documented in help/documentation

---

## Component Usage Guidelines

### When to Use Each Component

#### Radio Buttons vs. Dropdowns
- **Radio Buttons**: 2-5 mutually exclusive options, all visible
- **Dropdowns**: 5+ options, or when space is constrained

#### Checkboxes vs. Listbox
- **Checkboxes**: 1-5 independent options, all visible at once
- **Listbox**: 5+ options in a scrollable, compact list with multi-select capability

#### Multi-Select Dropdown vs. Listbox
- **Multi-Select Dropdown**: Native browser control, good for simple lists
- **Listbox**: Custom styled, better visual feedback, scrollable, more control over behavior

#### Buttons vs. Links
- **Buttons**: Actions that change state (submit, save, delete)
- **Links**: Navigation to another page or section

#### Modals vs. Inline
- **Modals**: Require immediate attention, block other actions
- **Inline**: Contextual information, can be ignored

#### Toast vs. Inline Notifications
- **Toast**: Temporary, non-critical feedback
- **Inline**: Persistent, context-specific information

---

## Layout Guidelines

### Container & Spacing

**Container Width**:
- Max width: 840px
- Centered on page
- Full width on mobile

**Padding**:
- Desktop: 40px horizontal, 48px top for header
- Mobile: 24px all around
- Form body: 40px desktop, 24px mobile

**Section Spacing**:
- Between sections: 48px
- Between form rows: 24px
- Between form groups: 24px
- Between label and input: 8px

### Grid System

**Two-Column Form**:
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 24px;
```

**Breakpoint**: 768px
- Above: Two columns
- Below: Single column

**Full-Width Rows**:
- Add `.single` class
- Used for wide inputs (address, notes)
- Used for radio/checkbox groups

---

## Typography Scale

### Hierarchy
1. **Page Title** (32px, light) - Main page heading
2. **Section Title** (20px, semibold) - Content sections
3. **Subsection Title** (15px, semibold) - Subsections
4. **Body Text** (15px, normal) - Default text
5. **Label** (13px, medium) - Form labels
6. **Help Text** (12px, normal) - Supporting text
7. **Small Text** (11px, bold) - Tags, badges, section headers

### Line Height
- **Headings**: 1.2
- **Body**: 1.6
- **Labels**: 1.4

---

## Color Usage Guidelines

### Text Hierarchy
1. **Primary**: `#1e293b` - Main content
2. **Secondary**: `#475569` - Labels, less emphasis
3. **Tertiary**: `#64748b` - Help text, meta info
4. **Disabled**: `#94a3b8` - Placeholders, disabled state

### Background Hierarchy
1. **White**: Primary background
2. **Light Gray** (`#fafafa`): Input backgrounds
3. **Lighter Gray** (`#f8fafc`): Section backgrounds
4. **Gradient**: Page background for depth

### Action Colors
- **Primary Action**: Blue gradient
- **Secondary Action**: White with border
- **Destructive**: Red (not implemented yet)
- **Success**: Green

### State Colors
- **Default**: Gray tones
- **Hover**: Blue accents
- **Focus**: Blue border + ring
- **Error**: Red
- **Warning**: Amber
- **Success**: Green
- **Info**: Light blue

---

## Accessibility Requirements

### Keyboard Navigation
✅ All interactive elements keyboard accessible
✅ Logical tab order
✅ Visible focus indicators
✅ Skip links where appropriate
✅ No keyboard traps

### Screen Readers
✅ Semantic HTML elements
✅ ARIA labels for icons and custom controls
✅ ARIA live regions for dynamic content
✅ Descriptive link and button text
✅ Form labels properly associated

### Visual
✅ WCAG AA contrast ratios (minimum 4.5:1)
✅ Don't rely on color alone
✅ Text resizable to 200%
✅ Clear focus indicators
✅ Sufficient click/tap targets (44x44px minimum)

### Forms
✅ Labels for all inputs
✅ Required fields clearly marked
✅ Error messages associated with inputs
✅ Validation errors announced
✅ Autocomplete attributes for common fields

---

## Animation & Motion

### Principles
- **Purposeful**: Animations should communicate or guide
- **Subtle**: Gentle, not distracting
- **Fast**: 200-400ms for most transitions
- **Natural**: Easing functions for organic feel

### Easing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` - Most transitions
- **Linear**: `linear` - Loading spinners
- **Ease-out**: `ease-out` - Entering elements
- **Ease-in-out**: `ease-in-out` - Floating animations

### When to Animate
✅ Page/component entry (fade in, slide in)
✅ State changes (expand/collapse)
✅ Hover/focus feedback
✅ Loading indicators
✅ Success/error feedback

❌ Don't animate:
- Text reading content
- Critical information
- When user has reduced motion preference

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Mobile Considerations
- **Touch targets**: Minimum 44x44px
- **Simplified layouts**: Single column
- **Reduced chrome**: Less padding, smaller headers
- **Bottom sheets**: For dropdowns and selectors
- **Sticky header**: Keep context visible
- **Hidden hints**: Keyboard shortcuts not shown

### Mobile-Specific Patterns
- **Form inputs**: Use appropriate `inputmode`
- **Phone inputs**: Auto-format as user types
- **Date pickers**: Native mobile pickers
- **Select dropdowns**: Native mobile select

### Breakpoints
- **768px**: Primary breakpoint for mobile/desktop

---

## Performance Guidelines

### Optimization
- **Debounce search**: 300ms delay on autocomplete
- **Lazy load**: Heavy components loaded when needed
- **Minimize reflows**: Batch DOM updates
- **CSS animations**: Use `transform` and `opacity`
- **Reduce bundle**: Code split where appropriate

### Loading Strategy
1. Critical CSS inline
2. Progressive enhancement
3. Skeleton screens for slow content
4. Optimistic UI updates

---

## Form Submission Flow

### Standard Flow
```
1. User fills form
2. User clicks Submit
3. Button shows loading state
4. Client-side validation runs
5a. If errors: Show validation summary + inline errors
5b. If valid: Send to server
6a. If network error: Show error notification, preserve data
6b. If success: Show success modal
7. User chooses next action
```

### Error Recovery
- **Network errors**: Preserve form data, allow retry
- **Validation errors**: Focus first error, show summary
- **Server errors**: Show message, preserve data

### Data Persistence
- Cache form data before submit
- On error, data remains filled
- On success, clear form (or navigate away)

---

## Best Practices

### Do's ✅
- Provide immediate feedback to user actions
- Use consistent spacing and alignment
- Make clickable areas large enough
- Provide keyboard shortcuts for common actions
- Test with screen readers
- Support browser autofill
- Preserve user data on errors
- Show loading states for async operations
- Use semantic HTML
- Progressive enhancement

### Don'ts ❌
- Don't disable submit button after first click (show loading instead)
- Don't lose user data on errors
- Don't rely on color alone to convey information
- Don't use generic error messages
- Don't hide critical information
- Don't create keyboard traps
- Don't overuse animations
- Don't ignore mobile users
- Don't make assumptions about user input
- Don't skip error states

---

## Future Patterns

### Bulk Actions
Pattern for selecting and acting on multiple items.

### Inline Editing
Pattern for editing items without navigation.

### Drag and Drop
Pattern for reordering or organizing items.

### Advanced Filtering
Pattern for complex search and filter operations.

### Empty States
Pattern for displaying helpful content when lists are empty.

### Onboarding
Pattern for guiding new users through features.
