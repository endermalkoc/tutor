# Transaction Entity

## Overview
The Transaction entity represents a financial transaction (charge or payment) associated with a family. Transactions can be one-time or recurring, and can be linked to specific students or apply to the entire family.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Family | Reference | Yes | Reference to Family this transaction belongs to |
| Student | Reference | No | Reference to Student if transaction is student-specific |
| Category | Reference | No | Reference to Category for organization |
| Transaction Type | String | Yes | Type of transaction (charge, payment, credit, adjustment) |

### Financial Details
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Amount | Decimal | Yes | Transaction amount (positive for charges, negative for payments) |
| Transaction Date | Date | Yes | Date the transaction occurred |
| Description | String | No | Description of the transaction |
| Charge Type | String | No | Type of charge (lesson, material, late fee, etc.) |

### Recurring Transactions
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Is Recurring | Boolean | Yes | Whether this is a recurring transaction (default: false) |
| Recurrence Pattern | String | No | Pattern for recurring transaction (weekly, monthly, etc.) |
| Recurrence End | Date | No | End date for recurring transaction |

## Relationships

- **Family**: A transaction belongs to a Family (many-to-one, required)
- **Student**: A transaction may be associated with a Student (many-to-one, optional)
- **Category**: A transaction may reference a Category (many-to-one, optional)
- **Invoice Line Items**: A transaction can appear on multiple invoice line items (one-to-many)

## Transaction Types

| Type | Description |
|------|-------------|
| Charge | Amount owed by family (lesson fee, material cost, etc.) |
| Payment | Payment received from family |
| Credit | Credit applied to family account (refund, discount, etc.) |
| Adjustment | Manual adjustment to account balance |

## Business Rules

1. **Family Required**: Every transaction must be associated with a family
2. **Amount Validation**: Amount must be non-zero
3. **Transaction Date Required**: Transaction Date must be provided
4. **Recurring Pattern**: If Is Recurring is true, Recurrence Pattern must be specified
5. **Student Association**: Student reference must belong to the same family as the transaction
6. **Category Scope**: If Category is specified, it should be appropriate for the Transaction Type

## Validations

- Family reference is required
- Amount is required and must be non-zero
- Transaction Date is required
- Transaction Type must be one of the defined types
- If Is Recurring is true, Recurrence Pattern must be provided
- If Student is specified, it must belong to the same family
- If Recurrence End is specified, it must be after Transaction Date

## Notes

- Transactions are the foundation of the financial system
- Family is the billing unit - all transactions are associated with families
- Student-specific transactions allow tracking expenses per student within a family
- Recurring transactions automatically generate new transaction records based on the pattern
- Transactions can be included in invoices via InvoiceLineItem relationships
- Positive amounts represent money owed, negative amounts represent payments/credits
- Categories help organize transactions for reporting and filtering
- Transaction history provides an audit trail of all financial activity
