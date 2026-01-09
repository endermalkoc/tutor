# Transaction Entity

## Overview
The Transaction entity represents a financial transaction associated with a family. Transactions track money flow between the tutor and family - money owed (charges), money received (payments), money returned (refunds), and discounts applied.

## Transaction Types

| Type | Direction | Description |
|------|-----------|-------------|
| Payment | Money In | Records payment received from family |
| Refund | Money Out | Records money returned to family |
| Charge | Money Owed | Records amount family owes (not yet paid) |
| Discount | Reduces Owed | Records a discount applied to family account |

---

## Payment Transaction

Records money received from a family.

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student | Reference | Yes | Student this payment is for (preselect current student when accessed from student context) |
| Date | Date | Yes | Date payment was received |
| Amount | Decimal | Yes | Payment amount (positive value) |
| Description | String | No | Notes about the payment (e.g., "Check #1234", "Venmo") |

### Behavior
- When accessed from a student's page, that student is preselected
- User can select a different student from the same family
- Amount is always positive (money received)

---

## Refund Transaction

Records money returned to a family. Same structure as Payment.

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student | Reference | Yes | Student this refund is for |
| Date | Date | Yes | Date refund was issued |
| Amount | Decimal | Yes | Refund amount (positive value) |
| Description | String | No | Reason for refund |

### Behavior
- Same student selection behavior as Payment
- Amount is always positive (represents money going out)

---

## Charge Transaction

Records an amount the family owes that hasn't been paid yet.

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student | Reference | Yes | Student this charge is for |
| Date | Date | Yes | Date charge was incurred |
| Amount | Decimal | Yes | Charge amount (positive value) |
| Category | Reference | No | Category for organization (e.g., "Lessons", "Materials", "Late Fee") |
| Description | String | No | Description of what the charge is for |
| Recurrence | Object | No | Recurrence settings (see [Recurrence](./recurrence.md)) |

### Behavior
- Charges increase the family's balance owed
- Can be one-time or recurring
- Category helps with reporting and filtering

---

## Discount Transaction

Records a discount applied to the family account. Same structure as Charge.

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student | Reference | Yes | Student this discount applies to |
| Date | Date | Yes | Date discount was applied |
| Amount | Decimal | Yes | Discount amount (positive value) |
| Category | Reference | No | Category for organization (e.g., "Referral Bonus", "Multi-Student Discount") |
| Description | String | No | Reason for discount |
| Recurrence | Object | No | Recurrence settings (see [Recurrence](./recurrence.md)) |

### Behavior
- Discounts reduce the family's balance owed
- Can be one-time or recurring (e.g., ongoing multi-student discount)

---

## Core Attributes (All Types)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ID | UUID | Yes | Unique identifier |
| Family | Reference | Yes | Reference to Family (derived from Student) |
| Transaction Type | Enum | Yes | One of: payment, refund, charge, discount |
| Created At | Timestamp | Yes | When the transaction was created |
| Updated At | Timestamp | Yes | When the transaction was last modified |

## Relationships

- **Family**: A transaction belongs to a Family (many-to-one, derived from Student)
- **Student**: A transaction is associated with a Student (many-to-one, required)
- **Category**: Charge and Discount transactions may reference a Category (many-to-one, optional)
- **Invoice Line Items**: A transaction can appear on multiple invoice line items (one-to-many)

## Business Rules

1. **Student Required**: Every transaction must be associated with a student
2. **Family Derived**: Family is derived from the selected student
3. **Amount Validation**: Amount must be positive and non-zero
4. **Date Required**: Transaction date must be provided
5. **Category Scope**: Categories are only applicable to Charge and Discount types
6. **Recurrence Scope**: Recurrence is only applicable to Charge and Discount types
7. **Student Selection Context**: When creating from a student's page, that student is preselected but can be changed to another student in the same family

## Validations

- Student reference is required
- Amount is required, must be positive and non-zero
- Transaction Date is required
- Transaction Type must be one of: payment, refund, charge, discount
- If Recurrence is specified, it must follow the Recurrence entity rules
- Student must belong to the family context (if creating from family view)

## Notes

- All amounts are stored as positive values; the transaction type determines the direction
- Payment and Refund are simpler types focused on money movement
- Charge and Discount support categories and recurrence for more complex scenarios
- Recurring charges/discounts automatically generate new transaction records based on the pattern
- Transaction history provides an audit trail of all financial activity
- Family balance = Sum(Charges) - Sum(Payments) - Sum(Discounts) + Sum(Refunds)
