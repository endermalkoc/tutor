# Student Detail - Overview Tab

## Purpose

The Overview tab serves as the **relationship portal** for a student, helping tutors prepare for lessons and understand their teaching relationship at a glance. It prioritizes actionable information (next lesson, recent context) over administrative data (billing, personal details).

## Design Principles

1. **Relationship over records** - Present information as a teaching relationship, not a database entry
2. **Future-focused** - Lead with what's next (upcoming lesson), not just what was
3. **Contextual surfacing** - Show relevant notes and reminders before lessons
4. **Progressive disclosure** - Primary info visible, secondary info collapsible

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ STUDENT HEADER (Sticky)                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Avatar | Name | Badges | Next Lesson | Contact | Family     │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PRE-LESSON CONTEXT                                   [Collapse] │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Last lesson recap | Homework status | Today's focus         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ LESSON SETTINGS (Primary)                               [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Subjects, duration, category, skill level                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ CONTACT & NOTIFICATIONS (Secondary)                     [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Email, phone, notification preferences                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ FAMILY (Secondary, Child only)                          [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Guardian info + Address + Siblings                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ NOTES                                            [+ Quick Add]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Private tutor notes with inline add                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ BILLING SUMMARY (Collapsed by default)               [Expand]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Compact: Rate + Balance | Expanded: Full details            │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PERSONAL DETAILS (Collapsed by default)              [Expand]   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Birthday, school, referrer, student since                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Panel Documentation

| Panel | File | Priority |
|-------|------|----------|
| [Student Header](./header.md) | `header.md` | Sticky |
| [Pre-Lesson Context](./pre-lesson-context.md) | `pre-lesson-context.md` | Contextual |
| [Lesson Settings](./lesson-settings.md) | `lesson-settings.md` | Primary |
| [Contact & Notifications](./contact-notifications.md) | `contact-notifications.md` | Secondary |
| [Family](./family.md) | `family.md` | Secondary (Child only) |
| [Notes](./notes.md) | `notes.md` | Secondary |
| [Billing Summary](./billing-summary.md) | `billing-summary.md` | Collapsed |
| [Personal Details](./personal-details.md) | `personal-details.md` | Collapsed |

---

## Section Priority & Behavior

### Primary Sections
- Always visible, full visual weight
- Lesson Settings

### Secondary Sections
- Visible but lighter visual treatment
- Contact & Notifications
- Family (for children)
- Notes

### Collapsed Sections
- Show summary line only by default
- Expand on click
- Remember user preference per session
- Billing Summary
- Personal Details

---

## Validation

### Student Type Change

If changing Student Type from Child to Adult:
1. Warn: "Changing to Adult will remove family association"
2. Require confirmation before saving
3. On confirm: Remove family link, hide Family section

If changing Student Type from Adult to Child:
1. Prompt to select or create family
2. Cannot save without family assignment

### Required Field Changes

- First Name and Last Name always required
- Status always required
- For Child: Family association required

---

## Success Feedback

After saving changes:
- Success toast: "[Section name] updated successfully"
- Section returns to view mode
- Updated data immediately reflected

---

## Error Handling

### Save Errors

- Display inline validation errors below invalid fields
- Network errors show toast with retry option
- Form data preserved on error

### Data Load Errors

- If section fails to load, show error message with retry button
- Other sections remain functional
