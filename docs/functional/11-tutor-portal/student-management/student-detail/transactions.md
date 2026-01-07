# Student Detail - Transactions Tab

## Purpose

The Transactions tab displays all financial transactions for the student's family, including payments received, charges, credits, and adjustments. Since transactions are managed at the family level, this shows all family transactions.

## Family-Level Notice

```
┌─────────────────────────────────────────────────────────────────┐
│ ℹ️  Showing all transactions for Smith Family                   │
│     Account Balance: $50.00 credit                              │
└─────────────────────────────────────────────────────────────────┘
```

This notice appears at the top showing family context and current balance.

---

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ FAMILY NOTICE & BALANCE                                         │
├─────────────────────────────────────────────────────────────────┤
│ FILTERS & ACTIONS                                               │
│ [Type ▼] [Date Range ▼] [Search...]        [+ Record Payment]   │
├─────────────────────────────────────────────────────────────────┤
│ TRANSACTION SUMMARY                                             │
│ Charges: $2,400  |  Payments: $2,450  |  Balance: $50 credit    │
├─────────────────────────────────────────────────────────────────┤
│ TRANSACTION LIST                                                │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Date       Type       Description         Amount   Balance  │ │
│ │ Jan 6      Payment    Check #1234         +$200    $50 cr   │ │
│ │ Jan 1      Charge     INV-0042            -$200    -$150    │ │
│ │ Dec 15     Payment    Card ending 4242    +$200    $50 cr   │ │
│ │ Dec 1      Charge     INV-0038            -$200    -$150    │ │
│ │ ...                                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Account Balance

Displayed prominently showing:

| Balance Type | Display |
|--------------|---------|
| Credit | "$50.00 credit" (green) - Family has overpaid |
| Zero | "$0.00" (neutral) - Account is settled |
| Owing | "$150.00 owing" (red) - Outstanding balance |

---

## Filters

### Type Filter

| Option | Description |
|--------|-------------|
| All | All transaction types (default) |
| Payments | Payments received |
| Charges | Charges/debits |
| Credits | Credit adjustments |
| Adjustments | Manual adjustments |
| Refunds | Refunds issued |

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

- Searches description, reference numbers, notes
- Real-time filtering

---

## Transaction Summary

Financial overview for filtered range:

| Metric | Description |
|--------|-------------|
| Charges | Sum of charges in range |
| Payments | Sum of payments in range |
| Balance | Running balance (or filtered total) |

---

## Transaction List

### Columns

| Column | Description | Sortable |
|--------|-------------|----------|
| Date | Transaction date | Yes (default, descending) |
| Type | Transaction type badge | Yes |
| Description | Transaction description | Yes |
| Reference | Check #, card info, invoice # | No |
| Student | Associated student (if any) | Yes |
| Amount | Transaction amount (+/-) | Yes |
| Balance | Running balance after transaction | No |
| Actions | Row action menu | No |

### Type Badges

| Type | Color | Icon | Description |
|------|-------|------|-------------|
| Payment | Green | ✓ | Payment received |
| Charge | Gray | — | Charge/debit |
| Credit | Blue | + | Credit adjustment |
| Adjustment | Amber | ± | Manual adjustment |
| Refund | Red | ↩ | Refund issued |

### Amount Display

- Payments: Green, prefixed with "+"
- Charges: Red/neutral, prefixed with "-"
- Credits: Blue, prefixed with "+"
- Refunds: Red, prefixed with "-"

---

## Row Actions

| Action | Description | Availability |
|--------|-------------|--------------|
| View Details | Open transaction detail | Always |
| Edit | Modify transaction | Manual entries only |
| Void | Cancel transaction | Not void |
| Delete | Remove transaction | Manual, recent only |

---

## Record Payment

User clicks "+ Record Payment" button:

### Payment Form

| Field | Type | Description |
|-------|------|-------------|
| Amount | Currency | Payment amount (required) |
| Date | Date picker | Payment date (defaults to today) |
| Method | Select | Payment method |
| Reference | Text | Check #, transaction ID |
| Apply To | Multi-select | Which invoices to apply to |
| Student | Select | Associated student (optional) |
| Notes | Textarea | Payment notes |

### Payment Methods

| Method | Additional Fields |
|--------|-------------------|
| Cash | None |
| Check | Check number |
| Credit Card | Last 4 digits, card type |
| Bank Transfer | Reference number |
| Other | Description |

### Invoice Application

- Show outstanding invoices list
- Auto-apply to oldest first (default)
- Or manual selection
- Overpayment creates credit balance

### Payment Actions

| Action | Behavior |
|--------|----------|
| Record | Creates transaction |
| Record & Send Receipt | Records and emails receipt |
| Cancel | Discards form |

---

## Add Credit/Adjustment

For manual balance adjustments:

### Adjustment Form

| Field | Type | Description |
|-------|------|-------------|
| Type | Select | Credit or Adjustment |
| Amount | Currency | Adjustment amount |
| Date | Date picker | Effective date |
| Reason | Select | Predefined reasons |
| Description | Text | Detailed description |
| Student | Select | Associated student (optional) |
| Notes | Textarea | Internal notes |

### Adjustment Reasons

| Reason | Description |
|--------|-------------|
| Cancellation Credit | Credit for cancelled lesson |
| Promotional Credit | Promotional discount |
| Error Correction | Fixing a mistake |
| Goodwill | Customer service gesture |
| Other | Custom reason |

---

## Transaction Detail

Clicking a transaction opens full details:

### Detail Fields

| Field | Description |
|-------|-------------|
| Transaction ID | System-generated ID |
| Date | Transaction date |
| Type | Transaction type |
| Amount | Full amount |
| Method | Payment method (if payment) |
| Reference | External reference |
| Student | Associated student |
| Invoice | Linked invoice (if any) |
| Description | Full description |
| Notes | Internal notes |
| Created | When recorded |
| Created By | Who recorded it |

### Related Information

- Link to associated invoice (if exists)
- Link to associated student
- Audit trail of changes

### Actions in Detail View

| Action | Behavior |
|--------|----------|
| Edit | Modify transaction |
| Print Receipt | Generate printable receipt |
| Email Receipt | Send receipt to family |
| Void | Cancel transaction |
| Close | Return to list |

---

## Void Transaction

When voiding a transaction:

### Void Confirmation

- Warning message explaining impact
- Reason for void (required)
- Option to create reversing entry

### Void Behavior

- Transaction marked as void (not deleted)
- Account balance recalculated
- Linked invoice status may change
- Audit trail preserved

---

## Empty State

If no transactions exist:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    💳                                           │
│                                                                 │
│              No transactions yet                                │
│                                                                 │
│       Transactions appear when payments are recorded            │
│               or invoices are created.                          │
│                                                                 │
│              [+ Record First Payment]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Statements

Generate account statements:

### Statement Options

| Field | Type | Description |
|-------|------|-------------|
| Date Range | Date pickers | Statement period |
| Include | Checkboxes | Charges, Payments, Adjustments |
| Format | Select | PDF or CSV |

### Statement Actions

| Action | Behavior |
|--------|----------|
| Generate | Creates statement file |
| Email Statement | Sends to family |

---

## Recurring Transactions

If family has recurring payment setup:

```
┌─────────────────────────────────────────────────────────────────┐
│ 🔄 Recurring Payment: $200/month on the 1st                     │
│    Card ending 4242                          [Manage Recurring] │
└─────────────────────────────────────────────────────────────────┘
```

---

## Pagination

- Default: 25 transactions per page
- Options: 25, 50, 100
- Maintains filter state

---

## Export

| Format | Description |
|--------|-------------|
| CSV | Spreadsheet with all transaction data |
| PDF Statement | Formatted account statement |

Export respects current filters.

---

## Accessibility

- Table follows accessible patterns
- Amount changes announced (positive/negative)
- Balance clearly indicated
- Form fields properly labeled
- Void confirmations require explicit action
