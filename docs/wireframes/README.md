# UI Wireframes

This directory contains interactive HTML wireframes generated from functional specifications.

## Workflow: Functional Specs → Wireframes → Implementation

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Functional Spec (docs/functional/)                      │
│    • Business logic, workflows, validations                │
│    • No UI prescription (per CLAUDE.md philosophy)         │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 2. AI-Generated Wireframe (YOU ARE HERE)                   │
│    • Interactive HTML prototype                            │
│    • Based on functional spec requirements                 │
│    • Demonstrates user workflows                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 3. Review & Refine                                          │
│    • Test interactions                                      │
│    • Gather stakeholder feedback                           │
│    • Iterate on design                                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 4. Optional: Export to Design Tool                         │
│    • Import to Figma/Excalidraw for polish                 │
│    • Add branding, design system                           │
│    • Create production-ready mockups                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│ 5. Implementation                                           │
│    • Reference: Functional spec (logic) + Wireframe (UI)   │
│    • Build actual feature                                  │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
docs/wireframes/
├── README.md (this file)
├── student-management/
│   ├── add-student.html ✓ Complete
│   ├── delete-students.html (pending)
│   ├── update-prices.html (pending)
│   └── ...
├── session-management/ (pending)
└── payments-billing/ (pending)
```

## How to Use Wireframes

### Viewing Wireframes

1. **Open in Browser:**
   ```bash
   # Windows
   start docs/wireframes/student-management/add-student.html

   # Mac/Linux
   open docs/wireframes/student-management/add-student.html
   ```

2. **Test Interactions:**
   - Fill out forms
   - Toggle hidden fields
   - Test validations
   - Experience user workflows

3. **Share with Stakeholders:**
   - Send HTML file directly
   - Host on GitHub Pages
   - Use local development server

### Generating New Wireframes

#### Option 1: Using Claude Code (Recommended)

```bash
# Ask Claude to generate wireframe from functional spec
claude "Generate wireframe for docs/functional/.../feature-name.md"
```

**Example prompt:**
```
Generate an interactive HTML wireframe based on the functional specification at:
docs/functional/11-tutor-portal/session-management/schedule-lesson.md

Requirements:
- Include all user workflows from the spec
- Show validation rules
- Make it interactive (no backend needed)
- Follow the style of add-student.html
- Save to docs/wireframes/session-management/schedule-lesson.html
```

#### Option 2: Using v0.dev

1. Copy functional spec content
2. Go to https://v0.dev
3. Paste spec and prompt: "Create a wireframe for this feature"
4. Export generated code to HTML file

#### Option 3: Using Other AI Tools

- **Galileo AI** - Text-to-Figma designs
- **Uizard** - AI wireframing
- **ChatGPT with Code Interpreter** - Generate HTML wireframes

### Iterating on Wireframes

1. **Test the wireframe** - Click through workflows
2. **Identify issues** - Note UX problems or missing features
3. **Refine with AI:**
   ```
   Update docs/wireframes/student-management/add-student.html:
   - Make the form responsive on mobile
   - Add inline validation
   - Improve the success confirmation flow
   ```

4. **Save iterations** - Version control with git

## Wireframe Features

### Current Wireframes

#### ✓ Add Student (`student-management/add-student.html`)

**Features Demonstrated:**
- Multi-section form with collapsible areas
- Required field validation
- "Show More Fields" toggle for optional fields
- Dynamic family creation inline
- Guardian information collection
- Smart defaults (Status: Active, Type: Child)
- Success confirmation modal
- Responsive design (desktop + mobile)
- Inline error messaging

**Based On:** `docs/functional/11-tutor-portal/student-management/add-student.md`

**Status:** Complete - Ready for review

---

## Design Principles (Per CLAUDE.md)

### ✅ These Wireframes Follow CLAUDE.md Philosophy

1. **Generated FROM functional specs** (not the other way around)
2. **Functional specs remain UI-agnostic** (describes WHAT, not HOW)
3. **Wireframes show HOW** (visual interpretation of workflows)
4. **Separation of concerns:**
   - Functional Spec = Business logic, rules, validations
   - Wireframe = Visual representation, layout, UX patterns

### Example: How They Work Together

**Functional Spec Says:**
> "User initiates delete action. System prompts for confirmation before executing."

**Wireframe Shows:**
- WHERE the delete button appears
- WHAT the confirmation dialog looks like
- HOW the user confirms or cancels

But the **functional spec** defines:
- WHICH business rules apply (can't delete students with future sessions)
- WHAT data gets affected (student, contact, family relationships)
- WHAT validations run (check for orphaned data)

## Next Steps

### Recommended Wireframes to Create Next

Based on the documentation review, prioritize these features:

1. **Session Management** (HIGH priority)
   - Schedule lesson
   - Edit session
   - Cancel session
   - Recurring sessions

2. **Payments & Billing** (HIGH priority)
   - Process payment
   - Record payment
   - Issue refund

3. **Student Portal** (MEDIUM priority)
   - Student dashboard
   - View schedule
   - View homework

4. **Authentication** (HIGH priority)
   - Login flow
   - Password reset
   - Two-factor authentication

### Workflow Template

For each new feature:

1. ✅ **Write functional spec** (or verify existing)
2. **Generate wireframe** (using AI or manual tools)
3. **Review & iterate** (test with stakeholders)
4. **Commit both** (spec + wireframe version controlled together)
5. **Implement** (reference both documents)

## Tool Recommendations

### For Quick Wireframes (Low-Fidelity)
- **Claude Code** - Generate HTML wireframes from specs ✓ (current approach)
- **Excalidraw** - Simple, git-friendly sketches
- **Whimsical** - Fast wireframing tool

### For Production Designs (High-Fidelity)
- **Figma** - Industry standard (free tier available)
- **Penpot** - Open-source Figma alternative
- **v0.dev** - AI generates production-ready React code

### For Interactive Prototypes
- **HTML files** - Current approach ✓
- **Figma** - Built-in prototyping
- **ProtoPie** - Advanced interactions

## Version Control

### Commit Wireframes with Specs

```bash
git add docs/functional/11-tutor-portal/student-management/add-student.md
git add docs/wireframes/student-management/add-student.html
git commit -m "feat: add student creation wireframe based on functional spec"
```

### Track Iterations

```bash
# Tag major versions
git tag wireframe-add-student-v1

# Link wireframe commits to functional spec commits
git log --oneline docs/functional/11-tutor-portal/student-management/
git log --oneline docs/wireframes/student-management/
```

## FAQ

### Q: Should wireframes be committed to the repository?

**A: Yes.** Wireframes are design documentation and should be version controlled alongside functional specs.

### Q: What if the wireframe doesn't match the final implementation?

**A: That's okay.** Wireframes are a design tool, not a contract. The functional spec defines requirements; wireframes explore solutions.

### Q: Should I update wireframes when code changes?

**A: Optionally.** Update if the change is significant. For minor tweaks, the code is the source of truth.

### Q: Can I use these wireframes in production?

**A: No.** These are prototypes for design exploration. Production code should be:
- Properly architected
- Accessible (WCAG compliant)
- Secure
- Optimized
- Tested

### Q: How detailed should wireframes be?

**A: As detailed as needed for clarity.**
- Early stage: Low-fidelity sketches
- Pre-development: High-fidelity interactive prototypes
- Post-development: Code is the wireframe

## Examples from Other Projects

### Good Wireframe Workflows

1. **GitHub** - Functional specs → Figma designs → Implementation
2. **Linear** - Written specs → Interactive prototypes → Code
3. **Stripe** - API specs + UI wireframes developed in parallel

### Anti-Patterns to Avoid

❌ **Don't:** Write functional specs that prescribe exact UI elements
❌ **Don't:** Create wireframes without understanding business requirements
❌ **Don't:** Skip stakeholder review before implementation
❌ **Don't:** Treat wireframes as rigid requirements

✅ **Do:** Use wireframes to explore design options
✅ **Do:** Iterate based on feedback
✅ **Do:** Keep functional specs and wireframes in sync (conceptually)
✅ **Do:** Version control everything

---

**Last Updated:** 2026-01-04
**Status:** Active workflow for Student Management features
**Next:** Expand to Session Management and Payments features
