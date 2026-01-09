# Add Transaction

## Overview
Allows tutors to record financial transactions for a student/family. The form adapts based on the selected transaction type.

## Entry Points
- "Add Transaction" button in the Transactions tab header
- Quick action dropdown with transaction type options

## Transaction Type Selection

User first selects the transaction type, which determines the form fields shown:

| Type | Description | Form Fields |
|------|-------------|-------------|
| Payment | Record money received | Student, Date, Amount, Description |
| Refund | Record money returned | Student, Date, Amount, Description |
| Charge | Record amount owed | Student, Date, Amount, Category, Description, Recurrence |
| Discount | Record discount applied | Student, Date, Amount, Category, Description, Recurrence |

---

## Form Fields

### Common Fields (All Types)

#### Student
- **Type**: Select dropdown
- **Required**: Yes
- **Behavior**:
  - Preselected with current student when accessed from student detail page
  - Shows all students in the family
  - Format: "Student Name"

#### Date
- **Type**: Date picker
- **Required**: Yes
- **Default**: Today's date
- **Validation**: Cannot be in the future for Payment/Refund

#### Amount
- **Type**: Currency input
- **Required**: Yes
- **Validation**: Must be greater than 0
- **Format**: Shows currency symbol, allows decimal input

#### Description
- **Type**: Text input
- **Required**: No
- **Placeholder**: Varies by type
  - Payment: "e.g., Check #1234, Venmo, Cash"
  - Refund: "e.g., Cancelled lesson refund"
  - Charge: "e.g., January lessons"
  - Discount: "e.g., Sibling discount"

### Charge/Discount Only Fields

#### Category
- **Type**: Select dropdown
- **Required**: No
- **Options**: User-defined categories (e.g., "Lessons", "Materials", "Late Fee", "Referral Bonus")
- **Behavior**: Can create new category inline

#### Recurrence
- **Type**: Toggle + configuration
- **Required**: No
- **Default**: One-time (no recurrence)
- **Behavior**: When enabled, shows recurrence configuration
- **Reference**: See [Recurrence](../../../../entities/recurrence.md)

---

## Form Layout

### Compact Mode (Inline Add)
For quick entry without leaving the transactions list:
- Single row form at top of transactions table
- Type selector as segmented control
- Essential fields only (Student, Date, Amount)
- "Add" button to submit

### Full Mode (Modal/Slide-over)
For complete transaction entry:
- Full form with all fields
- Recurrence configuration (for Charge/Discount)
- Preview of transaction before saving

---

## Behavior

### On Submit
1. Validate all required fields
2. Create transaction record
3. Update family balance
4. If recurring, schedule future transactions
5. Show success feedback
6. Return to transactions list with new transaction visible

### Validation Messages
| Field | Condition | Message |
|-------|-----------|---------|
| Amount | Empty or zero | "Amount is required" |
| Amount | Negative | "Amount must be greater than 0" |
| Date | Empty | "Date is required" |
| Date | Future (Payment/Refund) | "Payment date cannot be in the future" |
| Recurrence | End date before start | "End date must be after start date" |

### Cancel Behavior
- If form has changes, confirm before discarding
- Return to transactions list

---

## Quick Add Actions

The "Add Transaction" button can be a dropdown with quick options:

| Option | Action |
|--------|--------|
| Record Payment | Opens form with Payment type preselected |
| Record Refund | Opens form with Refund type preselected |
| Add Charge | Opens form with Charge type preselected |
| Add Discount | Opens form with Discount type preselected |

---

## Success Feedback

After successful creation:
- Toast notification: "[Type] of $[Amount] recorded"
- Transaction appears at top of list (if sorted by date desc)
- For recurring: "Recurring [type] created. Next occurrence: [date]"

---

## Related Specs
- [Transaction Entity](../../../../entities/transaction.md)
- [Recurrence Entity](../../../../entities/recurrence.md)
