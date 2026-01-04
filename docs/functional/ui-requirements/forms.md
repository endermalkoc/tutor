# Forms

## Overview
Forms are used throughout the platform for data entry and editing (creating students, scheduling sessions, processing payments, etc.). This document defines UI patterns and interaction guidelines for form elements.

## Input Type Selection Guidelines

### Radio Buttons vs Dropdowns

**Use Radio Buttons when:**
- There are 2-5 options
- All options should be visible at once
- Options are mutually exclusive
- Selection is required (not optional)
- Reduces cognitive load and prevents validation errors

**Examples:**
- Student Type: Adult | Child (2 options)
- Status: Active | Trial | Waiting | Lead | Inactive (5 options)
- Gender: Male | Female | Other | Prefer not to say (4 options)
- Billing Type: Per Lesson | Monthly | Package (3 options)

**Use Dropdowns when:**
- There are 6+ options
- Space is constrained
- Options can be grouped/categorized
- Selection is optional
- Users are familiar with the options

**Examples:**
- Country selection (100+ options)
- School selection (many options, searchable)
- Time zone selection (many options)
- Subject selection with categories

**Use Multi-Select Checkboxes when:**
- User can select multiple options
- All options should be visible
- There are 2-10 options

**Examples:**
- Days of week
- Notification preferences
- Enabled features

### Visual Treatment

**Radio Buttons:**
- Vertically stacked for better scannability
- Horizontal layout acceptable for 2-3 short options
- Clear labels with adequate touch targets (minimum 44x44 points on mobile)
- Selected state visually distinct
- Group related options with fieldset/legend

**Dropdowns:**
- Clear placeholder text (e.g., "Select status...")
- Show selected value clearly
- Accessible keyboard navigation
- Search/filter for long lists

## Search and Autocomplete Patterns

### Family/Entity Selection

**Pattern: Searchable Dropdown (Combobox)**

When selecting from existing entities (families, students, schools, etc.):

**Interaction:**
1. User clicks dropdown/input field
2. Options display with search capability
3. User types to filter options
4. User selects from filtered results or creates new

**Features:**
- Real-time search/filter as user types
- Fuzzy matching for typos
- Recent selections displayed first
- "Create New" option always visible
- Clear selection (X button)
- Keyboard navigation (arrow keys, Enter, Escape)

**Example - Family Selection:**
```
┌─────────────────────────────────────┐
│ Family *                            │
│ ┌─────────────────────────────────┐ │
│ │ Search families...          [▼] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Results:                            │
│ ┌─────────────────────────────────┐ │
│ │ + Create New Family             │ │
│ ├─────────────────────────────────┤ │
│ │ Smith Family (3 students)       │ │
│ │ Johnson Family (1 student)      │ │
│ │ Williams Family (2 students)    │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Search Behavior:**
- Search across multiple fields (family name, guardian names, student names)
- Highlight matching text in results
- Show context (e.g., "3 students")
- Handle no results gracefully ("No families found. Create new?")

**Mobile Considerations:**
- Full-screen search overlay on mobile
- Large touch targets
- Virtual keyboard optimization
- Voice input support (optional)

### School/Reference Data Selection

**Pattern: Autocomplete Input**

For reference data with large datasets:

**Interaction:**
1. User types in input field
2. Suggestions appear below input after 2-3 characters
3. User selects from suggestions or continues typing
4. Free-form text allowed if no match (creates new entry)

**Features:**
- Debounced search (300ms delay)
- Minimum character threshold (2-3 characters)
- Maximum suggestions displayed (5-10)
- Show "View all results" if more than max
- Allow free-form entry (not restricted to list)

## Form Organization

### Progressive Disclosure

**Show More Fields Pattern:**

Use progressive disclosure to reduce initial form complexity while providing access to all fields.

**When to Use:**
- Forms with 15+ total fields
- Mix of required and optional fields
- Some fields rarely used
- Forms used frequently (need quick mode)

**Implementation:**
- Start with essential fields visible (5-10 fields)
- "Show More Fields" toggle button
- Expand to reveal optional/advanced fields
- "Hide Additional Fields" to collapse
- Save user preference (optional)

**Visual Treatment:**
```
┌────────────────────────────────────┐
│ Required Fields                    │
│ [field] [field] [field]            │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ ▼ Show More Fields             │ │
│ └────────────────────────────────┘ │
│                                    │
│ [collapsed state]                  │
└────────────────────────────────────┘

After clicking:

┌────────────────────────────────────┐
│ Required Fields                    │
│ [field] [field] [field]            │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ ▲ Hide Additional Fields       │ │
│ └────────────────────────────────┘ │
│                                    │
│ Optional Information               │
│ [field] [field] [field]            │
│ [field] [field]                    │
└────────────────────────────────────┘
```

### Collapsible Sections

**When to Use:**
- Long forms with logical groupings
- Sections user may want to skip
- Forms with conditional sections

**Features:**
- Expand/collapse animation
- Remember section state
- Show validation errors in collapsed sections
- "Expand All" / "Collapse All" option

### Multi-Step Forms (Wizards)

**When to Use:**
- Complex workflows (5+ steps)
- Sequential decision-making
- Each step has dependencies

**Features:**
- Progress indicator (step X of Y)
- Previous/Next navigation
- Save draft capability
- Validation per step

## Inline Entity Creation

### Quick Add Pattern

**Use Case:** Creating related entities without leaving current form

**Example - Creating New Family:**

When user selects "Create New Family" from dropdown:
- Inline form appears below/within current form
- Highlighted or visually distinct (border, background color)
- Required fields for new entity shown
- Can cancel and return to selection
- On save, new entity automatically selected

**Visual Treatment:**
```
┌────────────────────────────────────┐
│ Family * [Create New Family ▼]    │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ New Family Information         │ │
│ │ ─────────────────────────────  │ │
│ │ Guardian First Name *          │ │
│ │ Guardian Last Name *           │ │
│ │ Email or Phone * (at least one)│ │
│ │ [more fields...]               │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

**Conditional Visibility:**
- Related fields appear/disappear based on selection
- Smooth animation (slide in/fade in)
- Clear visual separation from main form
- Can have own "Show More Fields" section

## Field-Level Features

### Required Fields

**Indicators:**
- Asterisk (*) after label
- "Required" badge (optional)
- Visual distinction (bold label, colored border)

**Validation:**
- Inline validation on blur (losing focus)
- Inline validation on submit
- Error message below field
- Field border turns red
- Focus moves to first error on submit

### Optional Fields

**Indicators:**
- "(optional)" text after label
- OR no indicator (required fields marked instead)

### Help Text and Tooltips

**Help Text (below field):**
- Use for format examples ("MM/DD/YYYY")
- Use for field descriptions
- Use for validation hints
- Gray text, smaller font
- Always visible

**Tooltips (on hover/click):**
- Use for complex explanations
- Use for business rule clarifications
- Icon (?) or (i) next to label
- Popover on hover (desktop)
- Tap to show (mobile)

**Examples:**
```
┌────────────────────────────────────┐
│ Phone Number                       │
│ ┌────────────────────────────────┐ │
│ │ (555) 123-4567                 │ │
│ └────────────────────────────────┘ │
│ Format: (XXX) XXX-XXXX             │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Default Duration (?) *             │
│ ┌────────────────────────────────┐ │
│ │ 30                             │ │
│ └────────────────────────────────┘ │
│ Minutes                            │
│                                    │
│ Tooltip: "This sets the default   │
│ lesson duration for this student. │
│ Can be changed per session."      │
└────────────────────────────────────┘
```

### Smart Defaults

**Pre-populate fields when:**
- Value is correct 90%+ of the time
- Reduces user effort significantly
- Based on user context or previous entries

**Examples:**
- Country: User's country or most common
- Status: "Active" for new students
- Duration: 30 minutes
- Current date for date fields

**Conditional Defaults:**
- Auto-check "SMS Capable" when phone number entered
- Auto-enable email reminders when email provided
- Copy address from related entity (optional)

### Dependent Fields

**Pattern: Show/Hide Based on Selection**

**Example - Reminder Settings:**
- "Send SMS Reminders" only enabled if phone number exists AND "SMS Capable" checked
- Visual treatment: Disabled (grayed out) with tooltip explaining why

**Example - Student Type:**
- If "Child" selected → Family field required, must have guardian
- If "Adult" selected → Family field optional, guardian not required

**Implementation:**
- Immediate visual feedback on change
- Clear disabled state (grayed out, not hidden)
- Tooltip explains why disabled
- Re-enable automatically when conditions met

### Checkboxes

**Single Checkbox:**
- Use for boolean options (yes/no, enabled/disabled)
- Label to the right of checkbox
- Clickable label (entire label activates checkbox)

**Checkbox Groups:**
- Use for multi-select options
- Group with fieldset/legend
- "Select All" / "Deselect All" options (if 5+ options)

**Visual Treatment:**
```
┌────────────────────────────────────┐
│ Communication Preferences          │
│                                    │
│ ☑ Send Email Reminders             │
│ ☑ Send SMS Reminders               │
│ ☐ Show in Student Portal           │
└────────────────────────────────────┘
```

## Validation and Error Handling

### Validation Timing

**Real-time (as user types):**
- Format validation (email, phone, zip)
- Character limits
- Numeric ranges
- Provide immediate feedback

**On Blur (field loses focus):**
- Required field check
- Complex business logic
- Less intrusive than real-time

**On Submit:**
- Final validation of all fields
- Cross-field validation
- Business rule validation
- Server-side validation

### Error Messages

**Inline Errors (per field):**
- Display below field
- Red text with error icon
- Specific, actionable message
- Examples:
  - ❌ "Email is required"
  - ❌ "Phone number must be 10 digits"
  - ❌ "SMS Reminders require SMS Capable phone"

**Error Summary (top of form):**
- List all errors on submit
- Link to each error (click to focus field)
- Count indicator ("3 errors found")
- Dismissible after errors corrected

**Visual Treatment:**
```
┌────────────────────────────────────┐
│ ⚠ 3 errors found:                  │
│ • First name is required           │
│ • Email format is invalid          │
│ • Family must be selected          │
└────────────────────────────────────┘

[form fields...]

┌────────────────────────────────────┐
│ First Name *                       │
│ ┌────────────────────────────────┐ │
│ │                                │ │ ← Red border
│ └────────────────────────────────┘ │
│ ❌ First name is required          │
└────────────────────────────────────┘
```

### Success States

**Field-Level Success:**
- Green checkmark (optional)
- Green border (optional)
- Use sparingly (don't overwhelm user)

**Form-Level Success:**
- Modal or toast notification
- Success message with next actions
- Auto-redirect (optional)
- Confetti/celebration (optional, for major actions)

## Form Actions

### Primary vs Secondary Actions

**Primary Action:**
- One primary action per form (e.g., "Create Student", "Save", "Submit")
- Prominent button (larger, colored, right-aligned)
- Keyboard shortcut (Enter to submit)

**Secondary Actions:**
- Cancel, Reset, Save Draft
- Less prominent (outlined, left-aligned, or text button)
- Keyboard shortcut (Escape for cancel)

**Visual Layout:**
```
Desktop:
┌────────────────────────────────────┐
│ [Cancel]              [Create Student] │
│  ↑                           ↑          │
│  Secondary                Primary      │
└────────────────────────────────────┘

Mobile (stacked):
┌────────────────────────────────────┐
│ [Create Student]  ← Primary (top)  │
│ [Cancel]          ← Secondary      │
└────────────────────────────────────┘
```

### Cancel Behavior

**Options:**
1. Return to previous page
2. Close modal/drawer
3. Reset form (if stay on page)

**Confirmation:**
- If unsaved changes exist → Confirm before canceling
- "You have unsaved changes. Discard?"
- Save Draft option (if applicable)

### Submit Behavior

**Loading State:**
- Disable submit button
- Show loading spinner
- Prevent double-submission
- Preserve form data if error occurs

**Success:**
- Show confirmation message
- Offer next actions
- Clear form (if adding another)
- Redirect (if done)

## Mobile Optimizations

### Layout

**Single Column:**
- All fields full-width
- Stacked vertically
- Adequate spacing between fields

**Keyboard Optimization:**
- Correct input types (email, tel, number)
- Auto-capitalize appropriately
- Auto-correct off for names/codes
- Next/Done keyboard actions

### Touch Targets

**Minimum Sizes:**
- Input fields: 44x44 points minimum
- Checkboxes: 44x44 touch area
- Radio buttons: 44x44 touch area
- Buttons: 44x44 points minimum

### Field Focus

**Auto-scroll:**
- Field scrolls to top when focused
- Prevents keyboard covering field
- Smooth animation

**Virtual Keyboard:**
- Doesn't cover focused field
- Form scrollable while keyboard open
- Submit button accessible

## Accessibility

### Keyboard Navigation

**Tab Order:**
- Logical tab order (top to bottom, left to right)
- Skip to content link
- Tab through form fields
- Shift+Tab to reverse
- Enter to submit
- Escape to cancel

### Screen Readers

**Labels:**
- Every input has associated label
- Use `<label for="input-id">` or aria-label
- Group related inputs with fieldset/legend

**Error Announcements:**
- aria-invalid on error fields
- aria-describedby for error messages
- Error summary announced on submit

**Required Fields:**
- aria-required="true"
- Visual indicator (*) with aria-label

### Focus Management

**Visible Focus:**
- Clear focus indicator (outline)
- High contrast focus state
- Focus moves to errors on submit

**Focus Traps:**
- Modal forms trap focus
- Tab cycles within modal
- Focus returns to trigger on close

## Technical Considerations

### Performance

**Large Forms:**
- Progressive rendering
- Debounce search/autocomplete
- Lazy load dropdown options
- Virtual scrolling for long lists

### Data Management

**Auto-save:**
- Save draft periodically
- LocalStorage for persistence
- Restore on page refresh
- Clear on submit/cancel

**Validation:**
- Client-side for UX
- Server-side for security
- Consistent validation rules
- Clear error messages

### State Management

**Form State:**
- Pristine (unchanged)
- Dirty (changed)
- Submitting (in progress)
- Submitted (complete)
- Error (validation failed)

**Field State:**
- Touched (focused then blurred)
- Dirty (value changed)
- Valid/Invalid
- Disabled/Enabled

## User Stories

### Input Selection
- As a user, I want to see all options for 2-5 choice fields using radio buttons so I don't have to click a dropdown
- As a user, I want required fields to use radio buttons so I can't forget to select an option

### Search and Selection
- As a user, I want to search for families when selecting so I can find them quickly without scrolling
- As a user, I want to see recent selections first so I can quickly re-select common options
- As a user, I want to create new entities inline so I don't lose my place in the form

### Progressive Disclosure
- As a user, I want optional fields hidden by default so I can complete forms quickly
- As a user, I want to reveal all fields when needed so I can provide complete information
- As a user, I want my field visibility preferences saved so forms match my workflow

### Validation
- As a user, I want immediate feedback on format errors so I can correct them right away
- As a user, I want clear error messages so I know exactly what to fix
- As a user, I want to see all errors at once so I can fix them efficiently

### Mobile Users
- As a mobile user, I want large touch targets so I can easily tap fields and buttons
- As a mobile user, I want the correct keyboard for each field type so data entry is faster
- As a mobile user, I want searchable dropdowns to use full-screen overlays so they're easier to use

## Dependencies

- Autocomplete/combobox component library
- Form validation library
- State management for form data
- Accessibility testing tools
- Mobile keyboard optimization

---

**Last Updated:** 2026-01-04
**Related Documents:**
- [Lists UI Requirements](./lists.md)
- [Add Student Functional Spec](../11-tutor-portal/student-management/add-student.md)
