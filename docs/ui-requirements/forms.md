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

## Accessibility Patterns (WCAG 2.1 AA)

### Semantic HTML Structure

**Always use proper semantic elements:**

```html
<!-- Form wrapper -->
<form id="formName" onsubmit="handleSubmit(event); return false;" novalidate>

  <!-- Sections for major groupings -->
  <section class="section">
    <h2 class="section-title">Section Name</h2>

    <!-- Radio groups need fieldset -->
    <fieldset>
      <legend class="required">
        Field Label
        <span class="sr-only">required</span>
      </legend>
      <div class="radio-group horizontal" role="radiogroup" aria-required="true">
        <div class="radio-option">
          <input type="radio" id="option1" name="field" value="value1" checked aria-checked="true">
          <label for="option1">Option 1</label>
        </div>
      </div>
    </fieldset>

  </section>

</form>
```

**Why:**
- Screen readers announce form landmarks
- Proper document structure for navigation
- Native HTML validation support
- Better browser autofill

---

### ARIA Labels and Attributes

**Required ARIA for all forms:**

| Element Type | Required ARIA |
|--------------|---------------|
| **Text inputs** | `aria-label` or `aria-labelledby`, `aria-describedby` for help text, `aria-invalid` for errors, `aria-required` for required fields |
| **Radio groups** | `role="radiogroup"`, `aria-required`, each radio has `aria-checked` |
| **Checkboxes** | Proper `<label for="">` association, `aria-describedby` for help text |
| **Combobox/Search** | `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"` |
| **Error messages** | `role="alert"`, linked via `aria-describedby` |
| **Buttons** | `aria-label` if icon-only, `type="button|submit"` explicit |
| **Modals** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |

**Example - Complete accessible input:**

```html
<div class="form-group">
  <label for="email" class="required">
    Email Address
    <span class="sr-only">required</span>
  </label>
  <input
    type="email"
    id="email"
    name="email"
    inputmode="email"
    autocomplete="email"
    placeholder="you@example.com"
    required
    aria-required="true"
    aria-describedby="emailError emailHelp"
    aria-invalid="false">
  <span class="help-text" id="emailHelp">We'll never share your email</span>
  <span class="error-message" id="emailError" role="alert"></span>
</div>
```

---

### Screen Reader Only Text

**Pattern for hiding visual elements from screen readers:**

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Use cases:**
- Hidden "required" text for asterisks
- Additional context for icons
- Skip navigation links
- Visually hidden labels when design shows placeholder

---

### Color Contrast Requirements

**WCAG 2.1 Level AA:**
- Normal text (< 18px): **4.5:1 minimum**
- Large text (≥ 18px or 14px bold): **3:1 minimum**
- Interactive elements: **3:1 minimum**

**Recommended colors for accessibility:**

```css
/* Text colors on white background */
--text-primary: #1a202c;      /* 16.1:1 - Headings */
--text-secondary: #2d3748;    /* 12.6:1 - Labels */
--text-tertiary: #4a5568;     /* 7.5:1 - Help text */
--text-muted: #718096;        /* 4.2:1 - FAIL, don't use */

/* Error colors */
--error-text: #c53030;        /* 4.8:1 - Errors */
--error-bg: #fff5f5;          /* Background for error inputs */
--error-border: #fc8181;      /* Border for error inputs */

/* Success colors */
--success-text: #22543d;      /* 7.9:1 - Success messages */
--success-bg: #ebf8ff;        /* Background for success */

/* Focus indicators */
--focus-ring: #4299e1;        /* Must be 3:1 against background */
```

**Testing:**
- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools: Lighthouse accessibility audit
- Browser extension: WAVE or Axe DevTools

---

### Keyboard Navigation

**All interactive elements must be keyboard accessible:**

**Tab Order:**
1. Logical flow (top to bottom, left to right)
2. Skip links at top (optional but recommended)
3. Forms follow visual layout
4. Modals trap focus

**Keyboard Shortcuts:**

```javascript
document.addEventListener('keydown', function(e) {
  // Submit form: Ctrl/Cmd + Enter
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    document.querySelector('form').requestSubmit();
  }

  // Cancel: Escape
  if (e.key === 'Escape' && !modalOpen) {
    handleCancel();
  }

  // Custom shortcuts: Alt + Letter
  if (e.altKey && e.key === 'm') {
    e.preventDefault();
    toggleMoreFields();
  }
});
```

**Show keyboard hints in UI:**

```html
<button type="submit">
  Save
  <span class="keyboard-hint">⌘Enter</span>
</button>
```

```css
.keyboard-hint {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  font-size: 11px;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .keyboard-hint {
    display: none; /* Hide on mobile */
  }
}
```

---

### Focus Management

**Visible focus indicators:**

```css
/* Modern focus-visible (only for keyboard) */
input:focus-visible,
button:focus-visible,
select:focus-visible {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
}

/* Fallback for older browsers */
input:focus,
button:focus,
select:focus {
  outline: 2px solid #4299e1;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}
```

**Modal focus trap:**

```javascript
function showModal() {
  const modal = document.getElementById('modal');
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  // Store previous focus
  window.previousFocus = document.activeElement;

  // Show modal and focus first element
  modal.classList.add('visible');
  modal.setAttribute('aria-hidden', 'false');
  firstFocusable.focus();

  // Trap focus
  function trapFocus(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === 'Escape') {
      closeModal();
    }
  }

  modal.addEventListener('keydown', trapFocus);
  window.modalTrapHandler = trapFocus;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('visible');
  modal.setAttribute('aria-hidden', 'true');

  // Remove trap
  if (window.modalTrapHandler) {
    modal.removeEventListener('keydown', window.modalTrapHandler);
  }

  // Restore focus
  if (window.previousFocus) {
    window.previousFocus.focus();
  }
}
```

---

## Real-Time Validation Patterns

### When to Validate

**Three validation triggers:**

1. **On Blur** (field loses focus) - Best for most fields
2. **On Input** (as user types) - Use sparingly, for format validation only
3. **On Submit** - Final validation before submission

**Validation timing matrix:**

| Field Type | On Input | On Blur | On Submit |
|------------|----------|---------|-----------|
| Required text | ❌ No | ✅ Yes | ✅ Yes |
| Email format | ❌ No | ✅ Yes | ✅ Yes |
| Phone format | ✅ Format only | ✅ Validate | ✅ Yes |
| Password strength | ✅ Show meter | ✅ Validate | ✅ Yes |
| Confirm password | ❌ No | ✅ Match check | ✅ Yes |
| Credit card | ✅ Format only | ✅ Luhn check | ✅ Yes |

**Why:**
- On-input validation is annoying (user hasn't finished typing)
- On-blur gives user chance to complete field
- Always validate on submit as final check

---

### Inline Validation Implementation

**Pattern for blur validation:**

```javascript
function setupInlineValidation() {
  // Required field validation
  document.getElementById('firstName').addEventListener('blur', function() {
    validateRequired(this, 'firstNameError', 'First name is required');
  });

  // Email format validation
  document.getElementById('email').addEventListener('blur', function() {
    validateEmail(this, 'emailError');
  });

  // Phone formatting (on input)
  document.getElementById('phone').addEventListener('input', function() {
    formatPhoneNumber(this);
  });

  // Clear errors on input (immediate feedback)
  document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

function validateRequired(field, errorId, message) {
  const errorEl = document.getElementById(errorId);

  if (!field.value.trim()) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

function validateEmail(field, errorId) {
  const errorEl = document.getElementById(errorId);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (field.value && !emailRegex.test(field.value)) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
    errorEl.textContent = 'Please enter a valid email address';
    errorEl.classList.add('visible');
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

function clearFieldError(field) {
  field.removeAttribute('aria-invalid');
  field.classList.remove('error');

  const errorId = field.getAttribute('aria-describedby');
  if (errorId) {
    const errorIds = errorId.split(' ');
    errorIds.forEach(id => {
      const errorEl = document.getElementById(id);
      if (errorEl && errorEl.classList.contains('error-message')) {
        errorEl.classList.remove('visible');
      }
    });
  }
}

// Call on page load
window.addEventListener('DOMContentLoaded', setupInlineValidation);
```

---

### Phone Number Auto-Formatting

**Pattern for US phone numbers:**

```javascript
function formatPhoneNumber(input) {
  // Remove all non-digits
  let value = input.value.replace(/\D/g, '');

  // Limit to 10 digits
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  // Format: (XXX) XXX-XXXX
  if (value.length >= 6) {
    input.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
  } else if (value.length >= 3) {
    input.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else {
    input.value = value;
  }
}

// Usage
<input
  type="tel"
  id="phone"
  inputmode="tel"
  autocomplete="tel"
  placeholder="(555) 123-4567"
  oninput="formatPhoneNumber(this)">
```

---

### Error Display Patterns

**Visual error states:**

```css
/* Error input styling */
input.error,
select.error,
textarea.error,
input[aria-invalid="true"],
select[aria-invalid="true"],
textarea[aria-invalid="true"] {
  border-color: #fc8181 !important;
  background: #fff5f5;
}

/* Error message */
.error-message {
  color: #c53030;
  font-size: 12px;
  margin-top: 4px;
  display: none;
}

.error-message.visible {
  display: block;
}

/* Error icon (optional) */
.error-message::before {
  content: '⚠ ';
  font-weight: bold;
}
```

**HTML structure:**

```html
<div class="form-group">
  <label for="email" class="required">Email</label>
  <input
    type="email"
    id="email"
    aria-describedby="emailError"
    aria-invalid="false">
  <span class="error-message" id="emailError" role="alert"></span>
</div>
```

---

## Loading States and Feedback

### Submit Button Loading State

**Pattern for async form submission:**

```javascript
function submitForm(event) {
  event.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const originalContent = submitBtn.innerHTML;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtn.innerHTML = `
    <span class="spinner"></span>
    Saving...
  `;

  // Perform validation
  const isValid = validateForm();

  if (isValid) {
    // Simulate API call
    fetch('/api/save', {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then(response => response.json())
    .then(data => {
      // Success
      showSuccessModal(data);

      // Reset button
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalContent;
    })
    .catch(error => {
      // Error
      showErrorMessage(error);

      // Reset button
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalContent;
    });
  } else {
    // Validation failed - reset button
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = originalContent;

    // Scroll to first error
    const firstError = document.querySelector('.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
  }
}
```

**Spinner CSS:**

```css
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

### Progress Indicators

**For multi-step forms:**

```html
<div class="form-progress">
  <div class="progress-steps">
    <div class="progress-step active">
      <div class="step-number">1</div>
      <div class="step-label">Basic Info</div>
    </div>
    <div class="progress-connector"></div>
    <div class="progress-step">
      <div class="step-number">2</div>
      <div class="step-label">Contact</div>
    </div>
    <div class="progress-connector"></div>
    <div class="progress-step complete">
      <div class="step-number">✓</div>
      <div class="step-label">Review</div>
    </div>
  </div>
</div>
```

```css
.progress-step {
  opacity: 0.4;
  transition: opacity 0.3s;
}

.progress-step.active {
  opacity: 1;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-step.active .step-number {
  background: #4299e1;
  color: white;
}

.progress-step.complete .step-number {
  background: #48bb78;
  color: white;
}
```

---

## Advanced Search/Combobox Pattern

### Searchable Dropdown (Family Selection Example)

**Complete ARIA combobox implementation:**

```html
<div class="form-group">
  <label for="familySearch" class="required">
    Family
    <span class="help-text-inline">Search existing or create new</span>
  </label>

  <!-- Selected state (shown after selection) -->
  <div class="selected-family" id="selectedFamily" role="status" aria-live="polite">
    <div class="selected-family-content">
      <svg class="selected-icon" width="20" height="20" fill="currentColor" aria-hidden="true">
        <!-- Checkmark icon -->
      </svg>
      <span id="selectedFamilyName"></span>
    </div>
    <button
      class="clear-selection"
      onclick="clearSelection()"
      aria-label="Clear family selection"
      type="button">
      ×
    </button>
  </div>

  <!-- Search state (shown before selection) -->
  <div class="search-container" id="searchContainer">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="20" height="20" aria-hidden="true">
        <!-- Search icon -->
      </svg>
      <input
        type="text"
        id="familySearch"
        placeholder="Search families..."
        role="combobox"
        aria-expanded="false"
        aria-controls="searchResults"
        aria-autocomplete="list"
        aria-label="Search for existing family or create new"
        onfocus="showResults()"
        oninput="debounce(filterResults, 300)(this.value)">
    </div>

    <div class="search-results" id="searchResults" role="listbox">
      <div class="result-section-header">Existing Families</div>

      <div class="search-result" role="option" tabindex="0">
        <div class="result-name">Smith Family</div>
        <div class="result-meta">3 students</div>
      </div>

      <div class="results-divider" role="separator"></div>

      <div class="search-result create-new" role="option" tabindex="0">
        <svg width="20" height="20" aria-hidden="true"><!-- Plus icon --></svg>
        <span>Create New Family</span>
      </div>
    </div>
  </div>

  <span class="error-message" id="familyError" role="alert"></span>
</div>
```

**JavaScript for search/select:**

```javascript
let selectedId = null;

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function showResults() {
  const results = document.getElementById('searchResults');
  const input = document.getElementById('familySearch');
  results.classList.add('visible');
  input.setAttribute('aria-expanded', 'true');
}

function hideResults() {
  setTimeout(() => {
    const results = document.getElementById('searchResults');
    const input = document.getElementById('familySearch');
    results.classList.remove('visible');
    input.setAttribute('aria-expanded', 'false');
  }, 200);
}

function filterResults(searchText) {
  const results = document.querySelectorAll('.search-result:not(.create-new)');
  const searchLower = searchText.toLowerCase();

  results.forEach(result => {
    const name = result.querySelector('.result-name').textContent.toLowerCase();
    result.style.display = name.includes(searchLower) ? 'block' : 'none';
  });
}

function selectOption(id, name) {
  selectedId = id;

  // Hide search, show selected
  document.getElementById('searchContainer').style.display = 'none';
  document.getElementById('selectedFamily').classList.add('visible');
  document.getElementById('selectedFamilyName').textContent = name;

  // Update ARIA
  document.getElementById('familySearch').setAttribute('aria-expanded', 'false');
}

function clearSelection() {
  selectedId = null;

  // Show search, hide selected
  document.getElementById('selectedFamily').classList.remove('visible');
  document.getElementById('searchContainer').style.display = 'block';
  document.getElementById('familySearch').value = '';
  document.getElementById('familySearch').focus();
}

// Keyboard navigation for results
function handleResultKeydown(event, id, name) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    selectOption(id, name);
  }
}
```

**Styling:**

```css
.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  pointer-events: none;
}

.search-input-wrapper input {
  padding-left: 40px;
}

.search-results {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #cbd5e0;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
}

.search-results.visible {
  display: block;
}

.result-section-header {
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  background: #f7fafc;
  position: sticky;
  top: 0;
}

.search-result {
  padding: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-result:hover,
.search-result:focus {
  background: #f7fafc;
  outline: none;
}

.selected-family {
  display: none;
  padding: 14px 16px;
  background: #ebf8ff;
  border: 2px solid #4299e1;
  border-radius: 8px;
}

.selected-family.visible {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-selection {
  background: transparent;
  border: none;
  color: #4299e1;
  cursor: pointer;
  padding: 12px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 4px;
}

.clear-selection:hover {
  background: rgba(66, 153, 225, 0.2);
}

/* Mobile optimization */
@media (max-width: 768px) {
  .search-results {
    position: fixed;
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
    max-height: 50vh;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
  }
}
```

---

## Mobile-Specific Patterns

### Input Mode and Autocomplete

**Always use appropriate inputmode for mobile keyboards:**

```html
<!-- Email -->
<input type="email" inputmode="email" autocomplete="email" placeholder="you@example.com">

<!-- Phone -->
<input type="tel" inputmode="tel" autocomplete="tel" placeholder="(555) 123-4567">

<!-- Numeric (ZIP, duration, quantity) -->
<input type="text" inputmode="numeric" autocomplete="postal-code" placeholder="12345">

<!-- Decimal (price, amount) -->
<input type="number" inputmode="decimal" step="0.01" placeholder="0.00">

<!-- Name fields -->
<input type="text" autocomplete="given-name" placeholder="First name">
<input type="text" autocomplete="family-name" placeholder="Last name">

<!-- Address fields -->
<input type="text" autocomplete="street-address" placeholder="Street address">
<input type="text" autocomplete="address-level2" placeholder="City">
<input type="text" autocomplete="address-level1" placeholder="State">
<input type="text" autocomplete="country-name" placeholder="Country">
```

**Why:**
- Correct keyboard layout appears (email has @, tel has numbers)
- Browser autofill works properly
- Better UX on mobile devices

---

### Touch Target Sizes

**WCAG 2.5.5 (Level AAA): Minimum 44×44 CSS pixels**

```css
/* Inputs already have adequate height */
input, select, textarea {
  min-height: 44px;
  padding: 10px 12px;
}

/* Radio buttons and checkboxes need padding */
.radio-option,
.checkbox-group {
  padding: 8px;
  margin: -8px; /* Negative margin maintains visual spacing */
  min-height: 44px;
  min-width: 44px;
}

.radio-option input[type="radio"],
.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

/* Buttons */
.btn {
  min-height: 44px;
  padding: 12px 24px;
}

/* Icon buttons */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}
```

---

### Sticky Headers on Mobile

**Keep form context visible while scrolling:**

```css
@media (max-width: 768px) {
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .form-progress {
    position: sticky;
    top: 60px; /* Below header */
    z-index: 99;
    background: white;
  }
}
```

---

### Mobile Form Layout

**Stack fields vertically on mobile:**

```css
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr; /* Single column on mobile */
  }

  .actions {
    flex-direction: column-reverse; /* Primary button on top */
  }

  .btn {
    width: 100%; /* Full-width buttons */
  }
}
```

---

## Implementation Checklist

### For Every Form

**Before development:**
- [ ] Reviewed functional spec for business requirements
- [ ] Identified all required vs optional fields
- [ ] Planned validation rules
- [ ] Designed mobile layout
- [ ] Considered accessibility from start

**During development:**
- [ ] Wrapped in `<form>` element
- [ ] Used `<fieldset>` and `<legend>` for radio groups
- [ ] Added all ARIA labels and attributes
- [ ] Implemented inline validation (blur + submit)
- [ ] Added loading state to submit button
- [ ] Tested keyboard navigation (Tab, Enter, Escape)
- [ ] Added appropriate `inputmode` and `autocomplete`
- [ ] Ensured 44×44px touch targets
- [ ] Made responsive (mobile-first)

**Testing:**
- [ ] Screen reader test (NVDA, JAWS, or VoiceOver)
- [ ] Keyboard-only navigation
- [ ] Color contrast check (WCAG AA)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Lighthouse accessibility audit (90+ score)
- [ ] Form submission with validation errors
- [ ] Form submission success flow
- [ ] Cancel/back button behavior

---

**Last Updated:** 2026-01-04

**Related Documents:**
- [Lists UI Requirements](./lists.md)
- [Add Student Functional Spec](../11-tutor-portal/student-management/add-student.md)
- [Add Student Wireframe](../../wireframes/student-management/add-student.html)

**Reference Implementation:**
See `docs/wireframes/student-management/add-student.html` for a complete implementation of all patterns documented here.
