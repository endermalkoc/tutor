# Family Entity

## Overview
The Family entity represents a household grouping that links students and guardians together for billing and communication purposes. Families belong to a tutor group and have associated invoices and transactions.

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

## Validations

- Studio reference is required
- At least one student should be associated with the family
- At least one guardian should be associated with the family (recommended)

## Notes

- Family is a relationship entity that groups students and guardians for billing purposes
- Families are the billing unit - invoices are sent to families, not individual students
- All students in a family can be viewed and managed together
- Guardians in a family can be associated with all students in that family
- When a family changes studios, all associated students and data move with it
- Family does not have its own attributes beyond the relationships - it serves purely as a grouping mechanism
