# Family

**Only displayed when Student Type = Child**

For Adult students, this section is hidden. This is a **Secondary Section**.

---

## View Mode

**Note:** This section does NOT have a section-level Edit button. Each contact has its own Edit button for per-contact editing.

### Primary Contact

Primary contact is visually distinguished with a left border accent (primary color).

| Field | Display Format |
|-------|----------------|
| Name | Title + Full name (e.g., "Mrs. Jennifer Chen") |
| Role | "Primary Contact" (with spacing between name and role) |
| Relationship | Optional - e.g., "Mother", "Father", "Grandmother", "Aunt", "Foster Parent" |
| Display Format | "Primary Contact · Mother" (relationship shown inline if provided) |
| Emergency Badge | Red badge with first-aid icon if marked as emergency contact |
| Email | Mailto link (or "Not provided") |
| Phone Numbers | Structured list showing each phone with type label (Mobile/Home/Work) and SMS icon for capable numbers |
| Address | Full formatted address (or "No address") |
| Show Details Toggle | Expandable link to reveal preferences and private note (reduces visual clutter) |
| Contact Actions | Quick action buttons: Call, Email, Message |
| Edit Button | Inline Edit button to edit this contact only |

#### Show Details (collapsed by default)

When "Show details" is clicked, reveals:

| Field | Display Format |
|-------|----------------|
| Preferences | Badges showing: Invoice Recipient (if enabled), Email Reminders (if enabled), SMS Reminders (if enabled) |
| Private Note | Yellow highlighted box with lock icon showing private note (only visible to tutor) |

Toggle text changes to "Hide details" when expanded. Caret icon rotates to indicate state.

### Additional Contacts

- Listed below primary contact
- Same fields as primary contact (Title + Name, phone list, Show details toggle)
- Role displays as "Contact" with optional relationship inline (with spacing between name and role)
- Each contact has their own address; if same as primary, displays full address with "(same as [Primary Name])" note
- Phone numbers shown in structured list with type labels (Mobile/Home/Work)
- Emergency Badge shown if marked as emergency contact
- "Show details" toggle to reveal preferences and private note (same behavior as primary contact)
- Quick action buttons (Call, Email, Message) for each contact
- Overflow menu (⋮) with actions: Set as Primary Contact, Mark as Emergency Contact, Delete Contact
- Edit button for per-contact editing

### Siblings

- List of other students in the same family
- Each sibling shows: Name, Status badge
- Clicking sibling name navigates to their detail page

### Billing Indicator

A minimal billing indicator appears at the bottom of the Family section, providing quick visibility without the full billing details (which live in the Billing & Invoices tab).

**Display:**
- Single line showing: Rate + Balance (if overdue, show warning)
- Link to Billing & Invoices tab

**Examples:**
- Normal: `$50/lesson` → [View billing](../billing-invoices.md)
- Overdue: `$50/lesson · ⚠️ $200 overdue` → [View billing](../billing-invoices.md)
- Credit: `$50/lesson · $50 credit` → [View billing](../billing-invoices.md)

**Rationale:** This provides just enough billing awareness for lesson prep (knowing the rate) while keeping the Overview focused on the teaching relationship. Urgent financial issues (overdue balances) are surfaced with a warning indicator.

---

## Edit Mode (Per-Contact)

Each contact has its own Edit button. Clicking it expands the edit form inline within that contact's card. Only one contact can be edited at a time.

**Benefits of per-contact editing:**
- Smaller, focused forms (8 fields vs 32+ for 4 contacts)
- User edits one contact at a time - matches real usage patterns
- Less overwhelming, fewer accidental edits
- No giant scroll through massive forms

### Per Contact Fields

**Basic Information** (First Name and Last Name on same row)

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Title | Select | Optional - Mr., Mrs., Ms., Dr., Prof. |
| Relationship | Select + Text | Optional - Mother, Father, Stepmother, Stepfather, Grandmother, Grandfather, Aunt, Uncle, Sibling, Foster Parent, Other. When "Other" is selected, shows text input for custom relationship (e.g., "Au Pair", "Nanny", "Family Friend") |
| Email | Email input | At least email or mobile number required |

**Phone Numbers**

| Field | Input Type | Validation |
|-------|------------|------------|
| Mobile Number | Tel input | At least email or mobile number required |
| SMS Capable | Checkbox | Displayed inline next to Mobile Number field |
| Home Number | Tel input | Optional |
| Work Number | Tel input | Optional |

### Address Fields (per contact)

| Field | Input Type | Validation |
|-------|------------|------------|
| Same as Primary | Checkbox | Only shown for additional contacts; hides address fields when checked |
| Street | Text input | Optional |
| City | Text input | Optional |
| State | Combobox (US) or text input | Optional |
| Zip | Text input | Optional |

### Preferences

| Field | Input Type | Validation |
|-------|------------|------------|
| Set as Primary Contact | Checkbox | Only shown for non-primary contacts; promotes to primary when saved |
| Emergency Contact | Checkbox | Marks this person as an emergency contact; multiple contacts can be emergency contacts |
| Should Receive Invoices | Checkbox | Whether to send invoices to this contact |
| Send Email Reminders | Checkbox | Whether to send email lesson reminders |
| Send SMS Reminders | Checkbox | Whether to send SMS lesson reminders (only effective if mobile is SMS capable) |

### Private Note

| Field | Input Type | Validation |
|-------|------------|------------|
| Private Note | Textarea | Optional - confidential notes about this contact (not visible to the contact themselves). Displays helper text: "This note is private and not visible to the contact." |

---

## Contact Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| Add Contact | Opens slide-in drawer from right side | Always available |
| Delete Contact | Opens confirmation dialog before removing contact | Only for non-primary contacts |
| Set as Primary | Promotes contact to primary (current primary becomes regular contact) | Only for non-primary contacts |
| Mark as Emergency | Toggles emergency contact status | All contacts |

---

## Add Contact Drawer

Slide-in drawer panel from the right side for adding a new contact. Uses drawer pattern to reduce vertical disruption in the main content area.

### Trigger

- "Add Contact" button with dashed border style below existing contacts
- Clicking opens the drawer overlay

### Drawer Behavior

- Slides in from the right side of the screen
- Semi-transparent overlay covers the main content
- Clicking overlay or pressing Escape closes the drawer
- Body scroll is disabled while drawer is open
- Drawer has fixed header (title + close button), scrollable body, and fixed footer (action buttons)
- Width: 480px (100% on mobile)

### Drawer Fields

**Basic Information** (First Name and Last Name on same row)

| Field | Input Type | Validation |
|-------|------------|------------|
| First Name | Text input | Required |
| Last Name | Text input | Required |
| Title | Select | Optional - Mr., Mrs., Ms., Dr., Prof. |
| Relationship | Select + Text | Optional - includes "Other" with custom text input |
| Email | Email input | At least email or mobile number required |

**Phone Numbers**

| Field | Input Type | Validation |
|-------|------------|------------|
| Mobile Number | Tel input | At least email or mobile number required |
| SMS Capable | Checkbox | Displayed inline next to Mobile Number field |
| Home Number | Tel input | Optional |
| Work Number | Tel input | Optional |

**Address**

| Field | Input Type | Validation |
|-------|------------|------------|
| Same as Primary | Checkbox | Default checked; unchecking reveals address fields |
| Street | Text input | Optional (hidden when "Same as Primary" checked) |
| City | Text input | Optional |
| State | Combobox | Optional |
| Zip | Text input | Optional |

**Preferences**

| Field | Input Type | Validation |
|-------|------------|------------|
| Set as Primary Contact | Checkbox | Optional - sets this new contact as the primary contact |
| Emergency Contact | Checkbox | Optional |
| Should Receive Invoices | Checkbox | Optional |
| Send Email Reminders | Checkbox | Optional |
| Send SMS Reminders | Checkbox | Optional |

**Private Note**

| Field | Input Type | Validation |
|-------|------------|------------|
| Private Note | Textarea | Optional - confidential notes about this contact |

### Footer Actions

- **Cancel**: Closes drawer, clears form
- **Add Contact**: Validates and saves new contact, closes drawer

### Benefits of Drawer Pattern

- Reduces vertical disruption in the main content area
- Form has dedicated space without pushing content down
- Full form is visible without scrolling the main page
- Easier to focus on the task of adding a contact
- Overlay provides clear visual separation
- Escape key and overlay click provide easy dismissal

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
