# Getting Started with the Design System

**Welcome!** This guide will help you start using our design system effectively, whether you're a designer, developer, or product manager.

**Last Updated**: 2026-01-04

---

## Why We Have a Design System

This design system was created to solve real problems:

- **"I'm not sure how to style this button"** → Clear component specifications
- **"Every page looks different"** → Consistent patterns and components
- **"Onboarding new team members takes too long"** → Centralized documentation
- **"I don't know if I'm meeting accessibility standards"** → Built-in WCAG compliance

**Result**: Faster development, better UX, and consistent experiences.

---

## Quick Start (5 Minutes)

### 1. Explore the Demo

Open [design-system-demo.html](design-system-demo.html) to see all components in action.

**What to look for**:
- How components look and behave
- Spacing and alignment patterns
- Color usage and semantic meaning
- Interaction states (hover, focus, active, disabled)

### 2. Understand the Three Principles

Our design philosophy:

1. **Minimalism** - Every element serves a purpose
2. **Clarity** - Visual hierarchy guides attention
3. **Efficiency** - Keyboard shortcuts and smart defaults

### 3. Bookmark Key Resources

- [Component Library](component-library.md) - All components and specifications
- [Design Patterns](design-patterns.md) - Common interaction patterns
- [Color System](color-system.md) - Color palette and usage
- [Design Tokens](design-tokens.md) - Formalized values (spacing, colors, etc.)

---

## Your First 30 Minutes

### For Designers

1. **Review the [Brand Identity](brand-identity.md)**
   - Understand our brand principles and personality
   - Learn our tone of voice

2. **Study the [Color System](color-system.md)**
   - Primary: Sky blue (#0ea5e9)
   - Success: Emerald green (#10b981)
   - Error: Red (#ef4444)
   - Neutrals: Slate grays

3. **Explore [Icon System](icon-system.md) & [Illustration Guidelines](illustration-guidelines.md)**
   - 2px stroke weight for icons
   - Minimalist line art for illustrations
   - When to use each

4. **Open Figma/Sketch** (if you have design files)
   - Or start creating based on the demo HTML

### For Developers

1. **Read [Design Tokens](design-tokens.md)**
   - Spacing scale: Multiples of 8px
   - Color variables
   - Typography scale
   - Z-index scale

2. **Review [Component Library](component-library.md)**
   - Copy-paste ready HTML/CSS
   - All component states documented
   - Accessibility attributes included

3. **Study [Design Patterns](design-patterns.md)**
   - Form validation flow
   - Autocomplete search & select
   - Progressive disclosure
   - Modal confirmation

4. **Clone the demo HTML**
   - Use it as a starting template
   - Reference component styles

---

## Master These 5 Components First

Start with the building blocks:

### 1. Text Input

**Why first**: Foundation of all forms.

```html
<div class="form-field">
  <label for="name">Full Name <span class="required">*</span></label>
  <input type="text" id="name" placeholder="Enter name">
  <span class="help-text">Used for official records</span>
</div>
```

**Key features**:
- 44px minimum height (touch-friendly)
- Border radius: 12px
- Transitions on hover/focus
- Clear error/success states

### 2. Primary Button

**Why**: Core action pattern.

```html
<button class="btn btn-primary">Save Changes</button>
```

**Key features**:
- Gradient background (brand colors)
- 48px height minimum
- Box shadow for depth
- Hover: lifts 2px
- Loading state available

### 3. Form Layout (Two-Column Grid)

**Why**: Most forms use this pattern.

```css
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```

### 4. Validation Messages

**Why**: Error handling is critical.

```html
<!-- Error -->
<span class="error-message">
  <svg width="16" height="16"><!-- Error icon --></svg>
  This field is required
</span>

<!-- Success -->
<span class="success-message">
  <svg width="16" height="16"><!-- Checkmark icon --></svg>
  Looks good!
</span>
```

### 5. Loading State

**Why**: Asynchronous feedback is essential.

```html
<button class="btn btn-primary" disabled>
  <span class="spinner"></span>
  Saving...
</button>
```

**Once you master these 5, everything else builds on them.**

---

## Common Decision Trees

### "Which input component should I use?"

```
Choosing from 2-5 options, all should be visible?
  → Radio buttons

Choosing from 5+ options, space constrained?
  → Dropdown select

Selecting multiple items from short list (< 7)?
  → Checkboxes

Selecting multiple items from long list (7+)?
  → Listbox (multi-select)

Searching for existing item OR creating new?
  → Autocomplete search & select

Free text entry?
  → Text input
```

### "Which button style should I use?"

```
Primary action on page (save, submit, add)?
  → Primary button (gradient blue)

Secondary action (cancel, back)?
  → Secondary button (outlined)

Destructive action (delete, remove)?
  → Destructive button (red)

Subtle action, low hierarchy?
  → Ghost button (text only)
```

### "Should I use a modal or inline expansion?"

```
Requires full user attention (confirmation, complex form)?
  → Modal dialog

Additional optional information?
  → Progressive disclosure (inline expansion)

Quick reference info?
  → Tooltip (hover)

Supplementary details?
  → Accordion / collapsible section
```

---

## Common Mistakes (And How to Fix Them)

### ❌ Mistake 1: Custom Spacing Values

```css
/* Wrong */
margin: 18px;
padding: 22px;

/* Right - use the scale */
margin: 16px;   /* var(--space-4) */
padding: 24px;  /* var(--space-6) */
```

**Why it matters**: Inconsistent spacing breaks visual rhythm.

### ❌ Mistake 2: Wrong Button Hierarchy

```html
<!-- Wrong: Two primary buttons side by side -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-primary">Cancel</button>

<!-- Right: One primary, one secondary -->
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary">Cancel</button>
```

**Why it matters**: Users don't know which action to take.

### ❌ Mistake 3: Missing Loading States

```javascript
// Wrong - button stays static during save
function save() {
  await api.saveStudent(data);
}

// Right - show loading state
function save() {
  button.disabled = true;
  button.innerHTML = '<span class="spinner"></span> Saving...';
  await api.saveStudent(data);
  button.disabled = false;
  button.innerHTML = 'Save';
}
```

**Why it matters**: Users don't know if action is processing.

### ❌ Mistake 4: Errors Without Solutions

```html
<!-- Wrong -->
<span class="error-message">Invalid email</span>

<!-- Right -->
<span class="error-message">
  Please enter a valid email address like name@example.com
</span>
```

**Why it matters**: Users need guidance to fix errors.

### ❌ Mistake 5: Skipping Accessibility

```html
<!-- Wrong -->
<button><svg>...</svg></button>

<!-- Right -->
<button aria-label="Delete student">
  <svg>...</svg>
</button>
```

**Why it matters**: Screen readers can't convey meaning.

---

## Your First Page: Step-by-Step

Let's build a simple "Add Student" form together.

### Step 1: Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add Student</title>
  <link rel="stylesheet" href="design-system.css">
</head>
<body>
  <main id="main-content">
    <h1>Add Student</h1>
    <!-- Form goes here -->
  </main>
</body>
</html>
```

### Step 2: Form Container

```html
<form class="form">
  <div class="form-grid">
    <!-- Fields go here -->
  </div>

  <div class="form-actions">
    <!-- Buttons go here -->
  </div>
</form>
```

### Step 3: Add Fields

```html
<div class="form-grid">
  <!-- First Name -->
  <div class="form-field">
    <label for="firstName">First Name <span class="required">*</span></label>
    <input type="text" id="firstName" required>
  </div>

  <!-- Last Name -->
  <div class="form-field">
    <label for="lastName">Last Name <span class="required">*</span></label>
    <input type="text" id="lastName" required>
  </div>

  <!-- Email (full width) -->
  <div class="form-field" style="grid-column: 1 / -1;">
    <label for="email">Email</label>
    <input type="email" id="email">
    <span class="help-text">Used to send lesson reminders</span>
  </div>
</div>
```

### Step 4: Add Actions

```html
<div class="form-actions">
  <button type="submit" class="btn btn-primary">Add Student</button>
  <button type="button" class="btn btn-secondary">Cancel</button>
</div>
```

### Step 5: Add Validation

```javascript
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate
  if (!firstName.value) {
    showError(firstName, 'Please enter first name');
    return;
  }

  // Save
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner"></span> Saving...';

  try {
    await api.saveStudent({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value
    });
    showSuccess('Student added successfully!');
  } catch (error) {
    showError(form, 'Could not save student. Please try again.');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Add Student';
  }
});
```

**Congratulations!** You've built your first form using the design system.

---

## Next Steps

### Week 1: Build Confidence
- [ ] Review all documentation
- [ ] Build 2-3 simple forms
- [ ] Experiment with components in the demo
- [ ] Ask questions in team chat/meetings

### Week 2: Dive Deeper
- [ ] Study [Design Patterns](design-patterns.md) in detail
- [ ] Implement autocomplete search pattern
- [ ] Add progressive disclosure to a form
- [ ] Review accessibility requirements

### Week 3: Master Advanced Patterns
- [ ] Build complete page layouts
- [ ] Implement modal confirmations
- [ ] Add validation flows
- [ ] Create custom components (if needed)

### Ongoing
- [ ] Reference design system for every new feature
- [ ] Contribute improvements and examples
- [ ] Share learnings with team
- [ ] Maintain consistency

---

## When to Deviate from the Design System

**Rare**, but sometimes necessary:

### ✅ Acceptable Reasons:
- Component doesn't exist and is truly unique
- Accessibility requires different approach
- Technical constraints demand different solution
- User research shows pattern doesn't work

### Process for Deviation:
1. **Document why** standard doesn't work
2. **Propose alternative** with rationale
3. **Get team review** (designer + developer)
4. **Consider adding to system** if reusable
5. **Update documentation** if pattern changes

---

## Getting Help

### Documentation
- **Component not working?** → Check [Component Library](component-library.md)
- **Pattern unclear?** → See [Design Patterns](design-patterns.md)
- **Color question?** → Review [Color System](color-system.md)
- **Accessibility concern?** → See [Design Patterns - Accessibility](design-patterns.md#accessibility-requirements)

### Team Resources
- **Design questions**: Ask design lead
- **Development questions**: Ask tech lead
- **Pattern questions**: Discuss in team meeting
- **Accessibility questions**: Consult accessibility specialist

---

## Contributing to the Design System

Found something missing or unclear?

### How to Contribute:
1. **Identify the gap** (missing component, unclear docs, etc.)
2. **Create proposal** (sketch, write-up, code example)
3. **Get feedback** from team
4. **Implement** (update docs, demo, components)
5. **Share** with team for adoption

### What to Contribute:
- New component specifications
- Improved documentation
- Additional examples
- Better patterns
- Bug fixes
- Accessibility improvements

---

## Success Metrics

You'll know you're using the design system well when:

✅ **Your pages look consistent** with rest of application
✅ **You can build forms quickly** (< 30 min for simple form)
✅ **You don't need to ask** basic styling questions
✅ **Users say** interfaces are "clean" and "easy to use"
✅ **Accessibility tests pass** (WCAG AA+)
✅ **Code reviews** focus on logic, not styling

---

## Final Tips

1. **Start small**: Master basic components first
2. **Reference often**: Keep documentation open while working
3. **Copy examples**: Use demo HTML as starting point
4. **Ask questions**: Better to ask than guess
5. **Be consistent**: Follow the system, even when tempted to customize
6. **Think users**: Accessibility and UX come first
7. **Contribute back**: Share improvements with team

---

**Welcome to the design system!** You're now equipped to create consistent, accessible, delightful experiences. Happy building!

---

## Quick Reference Card

```
COLORS:
  Brand: #0ea5e9
  Success: #10b981
  Error: #ef4444

SPACING (8px scale):
  Small: 8px, 16px
  Medium: 24px, 32px
  Large: 48px, 64px

TYPOGRAPHY:
  Heading: 32px / 600
  Subheading: 20px / 600
  Body: 15px / 400
  Label: 13px / 500
  Help: 12px / 400

BUTTONS:
  Primary: Gradient blue
  Secondary: Outlined
  Destructive: Red
  Height: 48px min

INPUTS:
  Height: 44px min
  Border: 1.5px
  Radius: 12px

BREAKPOINT:
  Mobile: < 768px
  Desktop: ≥ 768px
```

Print this and keep it handy! 📋
