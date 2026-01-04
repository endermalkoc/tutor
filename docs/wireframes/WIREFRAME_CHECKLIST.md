# Wireframe Creation Checklist

Use this checklist when creating new wireframes from functional specifications.

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

- [ ] Create directory: `docs/wireframes/[feature-category]/`
- [ ] Read functional spec thoroughly
- [ ] Identify all user workflows (steps 1, 2, 3...)
- [ ] List all fields (required vs optional)
- [ ] Note validation rules
- [ ] Note conditional logic (if/then scenarios)

### 2. Generate Initial Wireframe

**Using Claude Code (Recommended):**

```bash
# Example prompt:
Generate an interactive HTML wireframe for the feature specified in:
docs/functional/[path-to-spec].md

Requirements:
- Include all workflows from the spec
- Show all required and optional fields
- Implement validation rules
- Make it interactive (client-side only)
- Follow the style of docs/wireframes/student-management/add-student.html
- Save to docs/wireframes/[category]/[feature-name].html
```

**Checklist for Generated Wireframe:**

- [ ] All workflows from spec are represented
- [ ] Required fields are marked with asterisk (*)
- [ ] Optional fields are included (may be hidden/collapsible)
- [ ] Form sections match functional spec sections
- [ ] Validation rules are implemented (client-side)
- [ ] Error messages match business rules
- [ ] Success confirmation is shown
- [ ] Mobile-responsive design
- [ ] Accessible HTML (semantic tags, labels)

### 3. Verify Against Functional Spec

Go through each section of the functional spec and verify:

**Overview:**
- [ ] Wireframe shows the feature purpose clearly
- [ ] Access requirements are reflected (if applicable)

**Workflow:**
- [ ] Each step in the workflow has a corresponding UI element
- [ ] User actions are clear and intuitive
- [ ] System responses are shown (validation, confirmation, etc.)
- [ ] Step transitions make sense

**Business Rules:**
- [ ] Conditional logic is implemented (e.g., "If Student Type = Child, show guardian fields")
- [ ] Constraints are enforced (e.g., "Price must be >= 0")
- [ ] Default values are pre-populated

**Validations:**
- [ ] Required field validation implemented
- [ ] Format validation shown (email, phone, etc.)
- [ ] Business logic validation demonstrated
- [ ] Error messages match spec

**Integration Points:**
- [ ] Related entities are selectable (dropdowns, autocomplete)
- [ ] Relationships are clear (e.g., Student → Family → Guardian)

**User Experience Features:**
- [ ] All UX features from spec are present
- [ ] Smart defaults are set
- [ ] Progressive disclosure (show/hide) is implemented
- [ ] Help text and tooltips are included

### 4. Test Interactions

- [ ] Click through all workflows
- [ ] Test form submission (happy path)
- [ ] Test validation errors (sad path)
- [ ] Test conditional logic (if/then scenarios)
- [ ] Test "Show More Fields" or collapsible sections
- [ ] Test cancel/back actions
- [ ] Test success confirmation
- [ ] Test on mobile viewport
- [ ] Test keyboard navigation
- [ ] Test with screen reader (basic accessibility)

### 5. Review & Iterate

**Self-Review:**
- [ ] Does the wireframe make sense without reading the spec?
- [ ] Is the user flow intuitive?
- [ ] Are there any confusing elements?
- [ ] Is the layout clean and organized?
- [ ] Do error messages help the user fix issues?

**Stakeholder Review:**
- [ ] Share HTML file with product owner
- [ ] Share with UX designer (if available)
- [ ] Share with 1-2 developers
- [ ] Gather feedback on:
  - Workflow clarity
  - Missing elements
  - Confusing interactions
  - Technical feasibility

**Iterate:**
- [ ] Address feedback
- [ ] Update wireframe
- [ ] Re-test
- [ ] Get final approval

### 6. Documentation

- [ ] Add wireframe to index (update README.md)
- [ ] Document any deviations from spec (and why)
- [ ] Note any assumptions made
- [ ] Link wireframe to functional spec (both ways)
- [ ] Add status badge (Draft, Review, Approved, Implemented)

### 7. Version Control

```bash
# Commit wireframe
git add docs/wireframes/[category]/[feature-name].html
git add docs/wireframes/README.md  # if updated
git commit -m "feat: add wireframe for [feature-name]

Based on functional spec: docs/functional/[path-to-spec].md
Demonstrates workflows: [list key workflows]
Status: [Draft/Review/Approved]"
```

- [ ] Commit to git
- [ ] Reference functional spec commit (if new)
- [ ] Tag version (if major milestone)
- [ ] Create PR for review (if required)

## Post-Implementation

After the feature is built:

- [ ] Compare implementation to wireframe
- [ ] Note any significant deviations
- [ ] Update wireframe if needed (optional)
- [ ] Mark wireframe status as "Implemented"
- [ ] Archive or keep for historical reference

## Quality Checklist

### Adherence to CLAUDE.md Philosophy

- [ ] ✅ Wireframe is based ON the functional spec (not the other way around)
- [ ] ✅ Functional spec remains UI-agnostic (no wireframe-specific language added to spec)
- [ ] ✅ Wireframe interprets workflows, doesn't define them
- [ ] ✅ Business logic lives in spec, visual representation in wireframe
- [ ] ✅ Clear separation: Spec = WHAT, Wireframe = HOW

### Technical Quality

- [ ] Valid HTML5
- [ ] Semantic markup (proper use of form, label, button, etc.)
- [ ] Responsive design (mobile-first or adaptive)
- [ ] Keyboard accessible
- [ ] No JavaScript errors in console
- [ ] Works in modern browsers (Chrome, Firefox, Safari, Edge)

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

## Templates

### Wireframe Prompt Template

```
Generate an interactive HTML wireframe for [FEATURE_NAME] based on the functional specification at:

docs/functional/[PATH_TO_SPEC].md

Requirements:
1. Include all user workflows from the spec
2. Show all required fields (marked with *)
3. Include optional fields (may be hidden by default)
4. Implement validation rules (client-side)
5. Show error messages for validation failures
6. Include success confirmation
7. Make it responsive (mobile + desktop)
8. Follow the style and structure of docs/wireframes/student-management/add-student.html
9. Save to docs/wireframes/[CATEGORY]/[FEATURE_NAME].html

Key Workflows to Demonstrate:
- [Workflow 1]
- [Workflow 2]
- [Workflow 3]

Business Rules to Implement:
- [Rule 1]
- [Rule 2]
- [Rule 3]
```

### Commit Message Template

```
feat: add wireframe for [feature-name]

Based on functional spec: docs/functional/[path]
Demonstrates workflows:
- [Workflow 1]
- [Workflow 2]

Status: [Draft/Review/Approved]
Reviewed by: [Names or N/A]
```

### README Update Template

```markdown
#### ✓ [Feature Name] (`category/feature-name.html`)

**Features Demonstrated:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

**Based On:** `docs/functional/[path-to-spec].md`

**Status:** [Draft/Review/Approved/Implemented]
```

## Common Issues & Solutions

### Issue: Wireframe doesn't match all workflows in spec

**Solution:** Review spec section by section, check off each workflow, ensure all are present

### Issue: Validation logic is too complex for client-side HTML

**Solution:** Simplify for wireframe purposes, add note that full validation happens server-side

### Issue: Stakeholder wants different UI than wireframe shows

**Solution:** That's fine! Wireframes are exploration. Update based on feedback. Don't update functional spec unless business logic changes.

### Issue: Functional spec is too vague to create wireframe

**Solution:** Flag this as a documentation gap. Either:
1. Update functional spec with more detail (recommended)
2. Make assumptions and document them
3. Ask spec author for clarification

### Issue: Wireframe is getting too complex/large

**Solution:**
1. Break into multiple wireframes (wizard steps, tabs, etc.)
2. Use simplified version for wireframe, note "See full spec for complete details"
3. Consider if spec itself is too complex (needs breaking down)

## Success Criteria

A wireframe is complete when:

✅ **All boxes checked** in this checklist
✅ **Stakeholders approve** (or N/A for solo projects)
✅ **Developers understand** what to build
✅ **Workflows are clear** and testable
✅ **Functional spec is unchanged** (no UI prescription added)
✅ **Version controlled** and documented

---

**Remember:** Wireframes are a design tool, not a contract. They explore solutions to the problems defined in functional specs. Iterate freely, but keep functional specs stable and UI-agnostic.

---

**Last Updated:** 2026-01-04
