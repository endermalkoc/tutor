# React Wireframe Creation Checklist

Use this checklist when creating new React wireframes from functional specifications.

## Pre-Wireframe: Verify Functional Spec

- [ ] Functional spec exists and is complete
- [ ] Spec follows CLAUDE.md philosophy (interaction-focused, not UI-prescriptive)
- [ ] User workflows are clearly defined
- [ ] Business rules and validations are documented
- [ ] Integration points are identified
- [ ] All required fields are listed
- [ ] Error handling scenarios are covered

## Wireframe Creation

### 1. Setup

- [ ] Review functional spec thoroughly
- [ ] Check design system: `docs/ui-requirements/design-system/design-system.html`
- [ ] Identify all user workflows (steps 1, 2, 3...)
- [ ] List all fields (required vs optional)
- [ ] Note validation rules
- [ ] Note conditional logic (if/then scenarios)
- [ ] Create page directory: `wireframes/src/pages/[PageName]/`

### 2. Create React Components

**Directory Structure:**

```
wireframes/src/pages/[PageName]/
├── [PageName].tsx           # Main page component
├── [PageName].css           # Page-specific styles
├── components/              # Page-specific components
│   ├── index.ts
│   └── [Component].tsx
└── index.ts                 # Exports
```

**Component Checklist:**

- [ ] Use design system components from `components/design-system/`
- [ ] Follow existing component patterns
- [ ] Include proper TypeScript types/interfaces
- [ ] Handle view mode and edit mode (where applicable)
- [ ] Implement mock data for demonstration
- [ ] Add demo controls for testing different states

### 3. Design System Compliance

- [ ] Import components from `components/design-system/`
- [ ] Use CSS variables from design system
- [ ] Follow spacing scale (8px, 16px, 24px, 32px, 48px)
- [ ] Use typography scale (32px/20px/15px/13px/12px)
- [ ] Use standard border radius (8px, 12px, 16px, 24px)
- [ ] Match color system exactly

### 4. Verify Against Functional Spec

**Overview:**
- [ ] Wireframe shows the feature purpose clearly
- [ ] Access requirements are reflected (if applicable)

**Workflow:**
- [ ] Each step in the workflow has a corresponding UI element
- [ ] User actions are clear and intuitive
- [ ] System responses are shown (validation, confirmation, etc.)
- [ ] Step transitions make sense

**Business Rules:**
- [ ] Conditional logic is implemented
- [ ] Constraints are enforced
- [ ] Default values are pre-populated

**Validations:**
- [ ] Required field indicators present
- [ ] Error states designed
- [ ] Business logic validation demonstrated

### 5. Add Routing

- [ ] Add route to `wireframes/src/App.tsx`
- [ ] Add navigation link to sidebar (if applicable)
- [ ] Test URL navigation works
- [ ] Handle route parameters (`:id`, etc.)

### 6. Test Interactions

- [ ] Click through all workflows
- [ ] Test form interactions (inputs, selects, toggles)
- [ ] Test edit/view mode switching
- [ ] Test conditional rendering (if/then scenarios)
- [ ] Test collapsible/expandable sections
- [ ] Test responsive behavior (resize window)
- [ ] Test keyboard navigation
- [ ] Verify no console errors

### 7. Review & Iterate

**Self-Review:**
- [ ] Does the wireframe make sense without reading the spec?
- [ ] Is the user flow intuitive?
- [ ] Are there any confusing elements?
- [ ] Is the layout clean and organized?
- [ ] Do error messages help the user fix issues?

**Code Quality:**
- [ ] Components are properly typed
- [ ] No TypeScript errors
- [ ] CSS follows existing patterns
- [ ] No unused imports or variables
- [ ] Consistent naming conventions

### 8. Documentation

- [ ] Update `docs/wireframes/README.md` with new wireframe
- [ ] Document any assumptions made
- [ ] Link wireframe to functional spec

### 9. Version Control

```bash
git add wireframes/src/pages/[PageName]/
git add wireframes/src/App.tsx  # if routing changed
git add docs/wireframes/README.md  # if updated
git commit -m "feat: add wireframe for [feature-name]

Based on functional spec: docs/functional/[path-to-spec].md
Demonstrates workflows: [list key workflows]"
```

## Quality Checklist

### Adherence to CLAUDE.md Philosophy

- [ ] Wireframe is based ON the functional spec (not the other way around)
- [ ] Functional spec remains UI-agnostic
- [ ] Wireframe interprets workflows, doesn't define them
- [ ] Business logic lives in spec, visual representation in wireframe
- [ ] Clear separation: Spec = WHAT, Wireframe = HOW

### Technical Quality

- [ ] Valid TypeScript (no type errors)
- [ ] Proper React patterns (hooks, state management)
- [ ] Responsive design
- [ ] Keyboard accessible
- [ ] No console errors
- [ ] Works in modern browsers

### UX Quality

- [ ] Intuitive navigation
- [ ] Clear call-to-action buttons
- [ ] Consistent visual hierarchy
- [ ] Helpful error messages
- [ ] Loading states (if applicable)
- [ ] Empty states (if applicable)
- [ ] Success confirmations

### Completeness

- [ ] All workflows covered
- [ ] All fields included
- [ ] All validations shown
- [ ] All business rules demonstrated
- [ ] Edge cases considered
- [ ] Error scenarios handled

## Common Patterns

### Editable Sections

Use `SectionCard` component with edit mode:

```tsx
<SectionCard
  title="Section Title"
  variant="secondary"
  editable
  onSave={handleSave}
  onCancel={handleCancel}
  editContent={<EditForm />}
>
  <ViewContent />
</SectionCard>
```

### Data Display

Use `DataGrid` for label/value pairs:

```tsx
<DataGrid
  columns={2}
  items={[
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
  ]}
/>
```

### Tab Navigation

Use React Router for tab content:

```tsx
<Routes>
  <Route index element={<OverviewTab />} />
  <Route path="lessons" element={<LessonsTab />} />
</Routes>
```

### Demo Controls

Add toggle for testing different states:

```tsx
<div className="demo-controls">
  <label>
    <input
      type="checkbox"
      checked={isAdult}
      onChange={(e) => setIsAdult(e.target.checked)}
    />
    Adult Student View
  </label>
</div>
```

## Success Criteria

A wireframe is complete when:

- [ ] All boxes checked in this checklist
- [ ] Stakeholders can click through workflows
- [ ] Developers understand what to build
- [ ] Workflows are clear and testable
- [ ] Functional spec is unchanged (no UI prescription added)
- [ ] Version controlled and documented

---

**Last Updated:** 2026-01-08
