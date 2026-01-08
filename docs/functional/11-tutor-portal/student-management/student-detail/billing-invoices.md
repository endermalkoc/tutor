# Student Detail - Billing & Invoices Tab

## Purpose

The Billing & Invoices tab consolidates all financial information for a student's family in one place. It displays billing configuration (how the family is charged), auto-invoicing settings (when invoices are generated), and the complete invoice history. Since billing is managed at the family level, this shows settings and invoices for all students in the family.

## Design Rationale

This tab tells the complete "money story" by grouping:
1. **Cause** — Billing settings define how charges are calculated
2. **Mechanism** — Auto-invoicing schedules automatic invoice generation
3. **Effect** — Invoices show the result of billing activities

This consolidation removes billing configuration from the Overview tab, allowing Overview to focus purely on the teaching relationship.

---

## Family-Level Notice

```
┌─────────────────────────────────────────────────────────────────┐
│ ℹ️  Billing managed for Smith Family                            │
│     Includes charges for John, Emma, and Michael.               │
└─────────────────────────────────────────────────────────────────┘
```

This notice appears at the top of the tab when the family has multiple students.

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ FAMILY NOTICE (if multiple students)                            │
├─────────────────────────────────────────────────────────────────┤
│ BILLING SETTINGS                                        [Edit]  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Method: Per Lesson    Rate: $50.00/lesson                   │ │
│ │                                                             │ │
│ │ Auto-Invoicing: Monthly on the 1st | Next: Feb 1, 2025      │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ INVOICE SUMMARY                                                 │
│ Total: $2,400  |  Paid: $2,000  |  Outstanding: $400            │
├─────────────────────────────────────────────────────────────────┤
│ FILTERS & ACTIONS                                               │
│ [Status ▼] [Date Range ▼] [Search...]          [+ New Invoice]  │
├─────────────────────────────────────────────────────────────────┤
│ INVOICE LIST                                                    │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Invoice #   Date       Due Date    Amount    Status         │ │
│ │ INV-0042    Jan 1      Jan 15      $200.00   Outstanding    │ │
│ │ INV-0038    Dec 1      Dec 15      $200.00   Paid           │ │
│ │ INV-0034    Nov 1      Nov 15      $200.00   Paid           │ │
│ │ ...                                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Billing Settings Section

The billing settings card appears at the top of the tab, providing immediate context for the invoices below.

### View Mode (Default)

Displays billing configuration in a compact, scannable format:

| Field | Display Format | Example |
|-------|----------------|---------|
| Billing Method | Label | "Per Lesson", "Monthly Flat Rate", "Hourly Rate", or "Manual Invoicing" |
| Rate | Currency with unit | "$50.00 per lesson", "$200.00 per month", "$75.00 per hour" |
| Auto-Invoicing | Schedule summary | "Monthly on the 1st" or "Disabled" |
| Next Invoice | Date (if auto-invoicing enabled) | "February 1, 2025" |

### Edit Mode

User clicks "Edit" button to modify billing settings. Opens inline edit or modal with:

**Billing Method**

| Option | Description |
|--------|-------------|
| Per Lesson | Fixed amount per lesson |
| Monthly Flat Rate | Fixed amount per month regardless of lessons |
| Hourly Rate | Amount per hour of instruction |
| Manual Invoicing | No automatic rate calculation |

**Rate**

- Currency input field
- Required when billing method is not "Manual Invoicing"
- Format validated (positive number)

**Auto-Invoicing Configuration**

Display the [Invoice Scheduling Settings](../../invoicing/invoice-scheduling.md) form.

Quick presets available:
- No auto-invoicing (default)
- Simple Monthly — Invoice monthly on 1st, due on receipt
- Bi-weekly — Invoice every 2 weeks
- Custom — Full configuration options

### Edit Actions

| Action | Behavior |
|--------|----------|
| Save | Validates and saves billing settings |
| Cancel | Discards changes, returns to view mode |

### Validation

- Rate must be positive number if billing method selected
- Auto-invoicing start date must be today or future
- Changes take effect for future invoices only

---

## Filters

### Status Filter

| Option | Description |
|--------|-------------|
| All | All invoices (default) |
| Draft | Created but not sent |
| Outstanding | Sent, awaiting payment |
| Paid | Fully paid |
| Partially Paid | Some payment received |
| Overdue | Past due date, not paid |
| Void | Cancelled invoices |

### Date Range Filter

| Option | Description |
|--------|-------------|
| All Time | No date filtering |
| This Month | Current month |
| Last Month | Previous month |
| This Quarter | Current quarter |
| This Year | Current year |
| Custom | Date picker for range |

### Search

- Searches invoice number, notes, line item descriptions
- Real-time filtering

---

## Invoice Summary

Quick financial overview:

| Metric | Description |
|--------|-------------|
| Total | Sum of all invoices in filtered range |
| Paid | Sum of paid invoices |
| Outstanding | Sum of unpaid/partially paid invoices |

---

## Invoice List

### Columns

| Column | Description | Sortable |
|--------|-------------|----------|
| Invoice # | Unique invoice number | Yes |
| Date | Invoice creation date | Yes (default, descending) |
| Due Date | Payment due date | Yes |
| Amount | Total invoice amount | Yes |
| Paid | Amount paid (if partial) | Yes |
| Balance | Remaining balance | Yes |
| Status | Invoice status badge | Yes |
| Actions | Row action menu | No |

### Status Badges

| Status | Color | Description |
|--------|-------|-------------|
| Draft | Gray | Not yet sent to family |
| Outstanding | Blue | Sent, awaiting payment |
| Partially Paid | Amber | Some payment received |
| Paid | Green | Fully paid |
| Overdue | Red | Past due date |
| Void | Gray strikethrough | Cancelled |

---

## Row Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| View | Open invoice detail | Always |
| Edit | Modify invoice | Draft only |
| Send | Email invoice to family | Draft, Outstanding |
| Record Payment | Open payment recording | Outstanding, Partially Paid |
| Download PDF | Generate PDF version | Always |
| Duplicate | Create copy of invoice | Always |
| Void | Cancel invoice | Not Void, Not Paid |
| Delete | Remove invoice | Draft only |

---

## Create Invoice

User clicks "+ New Invoice" button:

### Invoice Form

**Header Information**

| Field | Type | Default |
|-------|------|---------|
| Invoice Number | Auto-generated or custom | Auto: INV-0043 |
| Invoice Date | Date picker | Today |
| Due Date | Date picker | Based on terms |
| Payment Terms | Select | Family default |

**Line Items**

| Field | Type | Description |
|-------|------|-------------|
| Description | Text | Service/item description |
| Student | Select | Which student (optional) |
| Quantity | Number | Units or hours |
| Rate | Currency | Price per unit |
| Amount | Calculated | Quantity × Rate |

Actions per line item:
- Add Line Item
- Remove Line Item
- Reorder (drag)

**Summary**

| Field | Calculated |
|-------|------------|
| Subtotal | Sum of line items |
| Tax | If applicable |
| Credits Applied | From family credit balance |
| Total | Final amount due |

**Additional Options**

| Field | Type | Description |
|-------|------|-------------|
| Notes | Textarea | Appears on invoice |
| Internal Notes | Textarea | Tutor-only notes |
| Attachments | File upload | Supporting documents |

### Invoice Actions

| Action | Behavior |
|--------|----------|
| Save as Draft | Saves without sending |
| Save & Send | Saves and emails to family |
| Cancel | Discards invoice |

---

## Invoice Detail View

Clicking an invoice opens full details:

### Invoice Header

| Field | Description |
|-------|-------------|
| Invoice Number | e.g., INV-0042 |
| Status | Current status with badge |
| Invoice Date | When created |
| Due Date | When payment due |
| Family | Family name |

### Line Items Table

Full list of charges with:
- Description
- Student (if assigned)
- Quantity
- Rate
- Amount

### Payment History

List of payments applied to this invoice:
- Payment date
- Amount
- Method
- Transaction reference

### Invoice Totals

- Subtotal
- Tax (if any)
- Credits applied
- Total
- Amount paid
- Balance due

### Actions in Detail View

| Action | Behavior |
|--------|----------|
| Edit | Modify invoice (if editable) |
| Send/Resend | Email to family |
| Record Payment | Open payment form |
| Download PDF | Generate PDF |
| Print | Open print dialog |
| Void | Cancel invoice |

---

## Record Payment

Quick payment recording from invoice:

### Payment Form

| Field | Type | Description |
|-------|------|-------------|
| Amount | Currency | Payment amount (defaults to balance) |
| Date | Date picker | Payment date (defaults to today) |
| Method | Select | Cash, Check, Card, Transfer, Other |
| Reference | Text | Check number, transaction ID |
| Notes | Textarea | Payment notes |

### Payment Actions

| Action | Behavior |
|--------|----------|
| Record Payment | Creates transaction, updates invoice |
| Record & Send Receipt | Records and emails receipt |
| Cancel | Discards form |

---

## Send Invoice

When sending invoice to family:

### Send Options

| Field | Type | Description |
|-------|------|-------------|
| Recipients | Multi-select | Which guardians to email |
| Subject | Text | Email subject (pre-filled) |
| Message | Textarea | Optional message body |
| Attach PDF | Checkbox | Include PDF attachment |

### Send Actions

| Action | Behavior |
|--------|----------|
| Send | Emails invoice |
| Preview | Shows email preview |
| Cancel | Returns to invoice |

---

## Empty State

If no invoices exist:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    📄                                           │
│                                                                 │
│              No invoices yet                                    │
│                                                                 │
│       Create invoices to bill for lessons and services          │
│                                                                 │
│              [+ Create First Invoice]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Bulk Actions

When multiple invoices selected:

| Action | Description |
|--------|-------------|
| Send Selected | Email all selected invoices |
| Download PDFs | Download as ZIP file |
| Void Selected | Void all selected (with confirmation) |

---

## Auto-Invoicing Behavior

When auto-invoicing is enabled in the Billing Settings section:

- Invoices are automatically created based on the configured schedule
- New invoices appear in the invoice list with "Draft" status (or sent automatically if configured)
- The "Next invoice" date shown in Billing Settings updates after each generation
- Tutors receive notification when auto-invoices are created

---

## Pagination

- Default: 25 invoices per page
- Options: 25, 50, 100
- Maintains filter state

---

## Export

| Format | Description |
|--------|-------------|
| CSV | Spreadsheet with invoice data |
| PDF (Batch) | ZIP file with all invoice PDFs |

Export respects current filters.

---

## Accessibility

- Table follows accessible patterns
- Status badges have text labels
- Financial amounts properly formatted
- Form fields have labels
- Actions clearly labeled
