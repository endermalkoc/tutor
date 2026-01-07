# Family

**Only displayed when Student Type = Child**

For Adult students, this section is hidden. This is a **Secondary Section**.

---

## View Mode

### Primary Contact

Primary contact is visually distinguished with a left border accent (primary color).

| Field | Display Format |
|-------|----------------|
| Name | Full name |
| Role | "Primary Contact" |
| Relationship | Optional - e.g., "Mother", "Father", "Grandmother", "Aunt", "Foster Parent" |
| Display Format | "Primary Contact · Mother" (relationship shown inline if provided) |
| Emergency Badge | Red badge with first-aid icon if marked as emergency contact |
| Email | Mailto link (or "Not provided") |
| Phone | Tel link with SMS icon if capable |
| Address | Full formatted address (or "No address") |
| Contact Actions | Quick action buttons: Call, Email, Message |

### Additional Contacts

- Listed below primary contact
- Same fields as primary contact
- Role displays as "Contact" with optional relationship inline
- Each contact has their own address; if same as primary, displays full address with "(same as [Primary Name])" note
- Emergency Badge shown if marked as emergency contact
- Quick action buttons (Call, Email, Message) for each contact
- Overflow menu (⋮) with actions: Set as Primary Contact, Mark as Emergency Contact, Delete Contact

### Siblings

- List of other students in the same family
- Each sibling shows: Name, Status badge
- Clicking sibling name navigates to their detail page

---

## Edit Mode

### Per Contact Fields

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Relationship | Select + Text | Optional - Mother, Father, Stepmother, Stepfather, Grandmother, Grandfather, Aunt, Uncle, Sibling, Foster Parent, Other. When "Other" is selected, shows text input for custom relationship (e.g., "Au Pair", "Nanny", "Family Friend") |
| Email | Email input | At least email or phone required |
| Phone | Tel input | At least email or phone required |
| SMS Capable | Checkbox | Only shown if phone provided |
| Emergency Contact | Checkbox | Marks this person as an emergency contact; multiple contacts can be emergency contacts |

### Address Fields (per contact)

| Field | Input Type | Validation |
|-------|------------|------------|
| Same as Primary | Checkbox | Only shown for additional contacts; hides address fields when checked |
| Street | Text input | Optional |
| City | Text input | Optional |
| State | Combobox (US) or text input | Optional |
| Zip | Text input | Optional |

---

## Contact Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| Add Contact | Expands inline Add Contact panel | Always available |
| Delete Contact | Opens confirmation dialog before removing contact | Only for non-primary contacts |
| Set as Primary | Promotes contact to primary (current primary becomes regular contact) | Only for non-primary contacts |
| Mark as Emergency | Toggles emergency contact status | All contacts |

---

## Add Contact Panel

Inline expandable panel for adding a new contact. Displayed below existing contacts with a dashed border to indicate it's an action area.

### Collapsed State

- Shows "➕ Add Contact" with expand indicator
- Clicking expands to reveal the form

### Expanded State Fields

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Relationship | Select + Text | Optional - includes "Other" with custom text input |
| Email | Email input | At least email or phone required |
| Phone | Tel input | At least email or phone required |
| Emergency Contact | Checkbox | Optional |
| Same as Primary | Checkbox | Default checked; unchecking reveals address fields |
| Street | Text input | Optional (hidden when "Same as Primary" checked) |
| City | Text input | Optional |
| State | Combobox | Optional |
| Zip | Text input | Optional |

### Actions

- **Cancel**: Collapses panel, clears form
- **Add Contact**: Validates and saves new contact, collapses panel

### Benefits of Inline Panel

- User can see existing contacts while adding new one
- No context switch or modal overlay
- Easier to cancel (just collapse)
- Better for adding multiple contacts in succession

---

## Delete Confirmation

When deleting a contact, show confirmation dialog:
- **Title**: "Delete Contact"
- **Message**: "Are you sure you want to remove [Contact Name] as a contact? This action cannot be undone."
- **Actions**: Cancel (secondary), Delete Contact (danger/red)

---

## Family Actions

| Action | Description |
|--------|-------------|
| Change Family | Opens family selection to reassign student |
