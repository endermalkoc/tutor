# Family Entity

## Overview
The Family entity represents a household grouping that links students and guardians together for billing and communication purposes. Families belong to a tutor group and have associated invoices and transactions.

## Core Attributes

### Billing Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Has Payment Method | Boolean | No | Whether a payment card/method is on file for this family (default: false) |
| Payment Method Type | String | No | Type of payment method on file (e.g., Credit Card, Bank Account, etc.) |
| Last 4 Digits | String | No | Last 4 digits of payment method for identification |

## Relationships

- **Studio**: A family belongs to a Studio (many-to-one, required)
- **Students**: A family has multiple Students (one-to-many)
- **Guardians**: A family has multiple Guardians (one-to-many)
- **Invoices**: A family has multiple Invoices (one-to-many)
- **Transactions**: A family has multiple Transactions (one-to-many)

## Business Rules

1. **Studio Required**: Every family must belong to a studio
2. **Multiple Students**: A family can have one or more students
3. **Multiple Guardians**: A family can have one or more guardians (at least one recommended)
4. **Preferred Invoice Recipient**: One guardian in the family should be marked as the preferred invoice recipient for billing
5. **Family-Level Billing**: Invoices and transactions are associated with the family, not individual students
6. **Single Studio**: A family can only belong to one studio at a time
7. **Payment Method Security**: Actual payment details (full card numbers, CVV, etc.) should NOT be stored - use payment gateway tokens
8. **Payment Method Display**: Only store Has Payment Method flag and last 4 digits for display purposes

## Validations

- Studio reference is required
- At least one student should be associated with the family
- At least one guardian should be associated with the family (recommended)
- If Has Payment Method is true, Last 4 Digits should be provided
- Last 4 Digits must be exactly 4 numeric characters if provided

## Notes

- Family is a relationship entity that groups students and guardians for billing purposes
- Families are the billing unit - invoices are sent to families, not individual students
- All students in a family can be viewed and managed together
- Guardians in a family can be associated with all students in that family
- When a family changes studios, all associated students and data move with it
- Payment method information is stored at the family level for streamlined billing
- "Card on File" indicator shown in student lists is derived from Family.Has Payment Method
- Actual payment processing uses tokenized payment methods from payment gateway (Stripe, Square, etc.)
