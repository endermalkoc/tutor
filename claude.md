# Project Documentation Goals & Guidelines

## CRITICAL: Keep All Artifacts in Sync

**Functional Specifications, Wireframes, API Code, UI Code, Components, Design Systems, Unit Tests, and End-to-End Tests must ALWAYS be kept in sync.**

When updating ANY of these artifacts:
1. **Check related artifacts** - Identify what else needs to change
2. **Update together** - Don't leave artifacts out of sync
3. **Verify consistency** - Ensure behavior matches across all layers

| If you change... | Also update... |
|------------------|----------------|
| Functional Spec | Wireframes, UI Code, Tests |
| Wireframe | React Components, Functional Spec (if behavior changed) |
| Design System | All wireframes and UI components using that pattern |
| API Code | Functional Spec, UI Code, Tests |
| UI Code | Tests, Wireframes (if behavior visible) |

---

## CRITICAL: Design System Compliance

**ALL wireframes, UI prototypes, and interface implementations MUST conform to the design system.**

**Design System Location**: `docs/ui-requirements/design-system/design-system.html`

Before creating or modifying ANY UI:
1. **ALWAYS** open and review `design-system.html` first
2. **COPY** component HTML/CSS directly from the design system
3. **NEVER** create custom styles for standard components (buttons, inputs, selects, dropdowns, etc.)
4. **MATCH** exact colors, spacing, typography, and border-radius values

If a component doesn't exist in the design system, add it to the design system FIRST, then use it in wireframes.

---

## CRITICAL: Spec-First Workflow

**Before making any changes to wireframes or implementations, ensure the related spec is updated first.**

### Workflow

1. **Check the spec** - Read the relevant functional spec (`docs/functional/`) for the feature being modified
2. **Update if needed** - If the spec doesn't sufficiently describe the behavior you're implementing, update it first
3. **Then implement** - Only after the spec is complete, make changes to wireframes or code

### Why Spec-First?

- Specs are the source of truth for business logic and behavior
- Forces thinking through edge cases before implementation
- Keeps documentation in sync with actual behavior
- Makes it easier for others to understand design decisions

### Examples

**Changing phone number display behavior:**
1. First update `docs/functional/entities/guardian.md` with display priority rules
2. Then modify the wireframe HTML

**Adding a new validation rule:**
1. First document the rule in the relevant entity or workflow spec
2. Then implement in wireframes/code

---

## Functional Specifications Philosophy

### UI Element Specification Approach

**Goal**: Keep functional specifications focused on user interactions, workflows, and business logic rather than prescriptive UI implementation details.

**Rationale**:
- Functional specs will be used as input for a UI design agent to create actual interface designs
- Overly-specific UI elements (buttons, dropdowns, modals) in functional specs constrain design exploration
- Mixing WHAT the system does with HOW it looks makes specs brittle and harder to maintain
- Separating concerns allows UI/UX evolution without rewriting business logic

### Guidelines

**✅ DO specify:**
- User goals and actions
- Workflows and user journeys (Select → Configure → Confirm → Execute)
- Business rules and validation logic
- State changes and system responses
- Data requirements and relationships
- Error conditions and handling
- Interaction patterns (e.g., "multi-select pattern", "confirmation flow")

**❌ AVOID specifying:**
- Exact UI components ("blue dropdown button with 15px padding")
- Visual layout details ("modal dialog with three buttons")
- Specific control types unless critical to functionality
- Colors, spacing, typography
- Precise positioning and alignment

**✔️ ACCEPTABLE (when needed for clarity):**
- General interaction types ("user selects from available options")
- Reference to established patterns ("standard bulk action flow")
- Mentioning component categories for context ("filterable list", "multi-step form")

### Documentation Structure

1. **Functional Specs** (`docs/functional/`) - Business logic, workflows, rules
2. **UI Requirements** (`docs/ui-requirements/`) - UI specifications for forms, lists, and other interfaces
3. **Design System** (`docs/ui-requirements/design-system/`) - Complete visual design system
4. **Wireframes** (`docs/wireframes/`) - Interactive HTML prototypes

### Keep Specs DRY

When a component or workflow is reusable across multiple contexts:

1. Create a single spec file for the reusable component
2. Reference it from other specs - don't duplicate field definitions
3. Only document context-specific behavior in the referencing spec

**Example:**
```markdown
<!-- Good: Reference the shared spec -->
Display the [Invoice Scheduling Settings](../invoicing/invoice-scheduling.md) form.

<!-- Bad: Duplicating field definitions that exist elsewhere -->
**Fields displayed:**
1. Billing Cycle Start Date...
2. Invoice Type...
```

### Delete Obsolete Specs

When a feature is removed or consolidated elsewhere:

- **DELETE** the obsolete spec file entirely
- **DO NOT** keep deprecated/obsolete specs with "DEPRECATED" markers
- Update any files that referenced the deleted spec to point to the new location
- Keep the codebase clean — obsolete documentation creates confusion

---

## Design System & UI Creation Guidelines

### Design System as Source of Truth

**Location**: `docs/ui-requirements/design-system/design-system.html`

This single HTML file contains ALL component styles, colors, spacing, and patterns. It is the authoritative reference for all UI work.

### When Creating New Wireframes or UI

**MANDATORY WORKFLOW**:
1. Open `design-system.html` in browser
2. Find the component you need (button, input, select, dropdown, card, etc.)
3. Copy the HTML structure and CSS exactly
4. Do NOT modify colors, spacing, border-radius, or typography

### Wireframe Creation Checklist

Before creating a new wireframe:
- [ ] Open and review `design-system.html`
- [ ] Identify which existing components to use
- [ ] Copy component HTML/CSS from design system
- [ ] Ensure WCAG AA accessibility compliance
- [ ] Include proper ARIA attributes and keyboard navigation
- [ ] Test responsive behavior (mobile breakpoint: 768px)
- [ ] Connect navigation to related wireframes (see below)

### Wireframe Navigation & Connectivity

**All wireframes must be navigable** - users should be able to click through the prototype flow without hitting dead ends.

**Required Navigation Elements:**

1. **Breadcrumbs** - Link back to parent pages (e.g., "Students" → `student-list.html`)
2. **Cancel/Back buttons** - Navigate to logical previous page
3. **Success actions** - After form submission, navigate to result page or list view
4. **Multi-step flows** - Connect each step to the next/previous step

**Navigation Rules:**

| Element | Should Navigate To |
|---------|-------------------|
| Breadcrumb links | Parent list/page (use relative paths like `student-list.html`) |
| Cancel button | Previous page or list view (with confirmation if form is dirty) |
| Back button | Previous step in multi-step flow |
| Submit/Create button | Next step, or back to list with success feedback |
| "View" actions in toasts | Detail page for the created item |

**Implementation Pattern:**

```javascript
// Cancel with dirty form check
function handleCancel() {
    if (formIsDirty) {
        showConfirmationModal();
    } else {
        window.location.href = 'parent-list.html';
    }
}

// Multi-step navigation
function goToNextStep() {
    window.location.href = 'step-2.html';
}

function goBack() {
    window.location.href = 'step-1.html';
}
```

**Relative Paths**: Always use relative paths (e.g., `student-list.html`) not absolute paths or `#`. This ensures wireframes work when opened locally.

**Current Wireframe Flow:**
```
student-list.html
    ↓ "Add Student" button
add-student.html (Step 1)
    ↓ "Continue to Invoicing" (new family) OR "Create Student" (existing family)
add-student-invoicing.html (Step 2)
    ↓ "Create Student"
student-list.html (with success toast)
```

### Creating New Components

**Only create new components when** no existing component in `design-system.html` meets the need.

**REQUIRED: Add to design system FIRST**:
1. Add the new component to `design-system.html` with all states (default, hover, focus, active, disabled, error)
2. Use existing color variables, spacing scale, and typography
3. Follow the minimalist philosophy (clarity, simplicity, efficiency)
4. Include accessibility requirements (ARIA, keyboard navigation)
5. THEN copy to wireframes

### Design System Compliance

**✅ DO**:
- Use exact color values from color system (`#0ea5e9`, not "similar blue")
- Use defined spacing scale (8px, 16px, 24px, 32px, 48px)
- Use typography scale (32px/20px/15px/13px/12px)
- Use standard border radius (8px, 12px, 16px, 24px)
- Apply consistent transitions (`0.3s cubic-bezier(0.4, 0, 0.2, 1)`)
- Follow minimal radio/checkbox styling (no heavy borders or backgrounds)

**❌ DON'T**:
- Introduce new colors without updating color system
- Create custom spacing values
- Use different animation timings or easing functions
- Add heavy borders/backgrounds to radio buttons or checkboxes
- Skip accessibility attributes
- Ignore responsive breakpoints

### Design Philosophy: Modern Minimalist

All UI work must align with these core principles:

**Minimalism**:
- Every element serves a purpose
- Subtle, gentle interactions
- Generous whitespace and breathing room
- Functional over decorative

**Clarity**:
- Clear visual hierarchy
- Obvious primary actions
- Immediate feedback on all interactions
- Proactive validation and guidance

**Efficiency**:
- Keyboard accessibility everywhere
- Smart defaults and pre-filled values
- Progressive disclosure of complexity
- Minimize navigation and page loads

### Example Transformation

**Before (too prescriptive):**
```markdown
The Delete button opens a modal dialog with a warning message and two buttons: Cancel and Confirm Delete.
```

**After (interaction-focused):**
```markdown
User initiates delete action. System prompts for confirmation before executing the destructive operation. User can cancel or proceed with deletion.
```

---

## Current Status

**Last Updated**: 2026-01-04

**Completed**:
- ✅ Established Modern Minimalist design system
- ✅ Created comprehensive component library
- ✅ Documented design patterns and guidelines
- ✅ Built interactive design system demo (HTML)
- ✅ Defined color system, typography, and spacing scales
- ✅ Created wireframe checklist and compliance guidelines

**In Progress**:
- Refactoring existing functional specifications to align with interaction-focused approach
- Applying design system to all new wireframes and UI work

**Design System Location**: `docs/ui-requirements/design-system/design-system.html`
