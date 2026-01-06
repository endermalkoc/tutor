# Invoice Scheduling Settings

## Overview

Reusable component for configuring automatic invoice generation schedules. Used in multiple contexts including new family setup and family settings.

## Settings

### Billing Cycle Start Date

**Question:** When does the next billing cycle start?

- Date picker to select start date
- Defaults to today's date or first of next month

### Invoice Type

**Question:** Invoice for upcoming lessons or previous lessons?

**Options:**

1. **Upcoming lessons (Prepaid)** - Invoice generated at start of billing cycle for lessons in that period
2. **Previous lessons (Postpaid)** - Invoice generated at end of billing cycle for lessons completed

### Auto-Invoicing Schedule

**Question:** How often should invoices be generated?

**Options:**

#### Weekly

- Additional field: **Every how many weeks?** (1-4, default: 1)
- Example: "Every 2 weeks"

#### Monthly

- Additional field: **Every how many months?** (1-12, default: 1)
- Additional field: **Billing cycle starts on:**
  - First day of the month
  - First Sunday of the month
  - First Monday of the month
- Example: "Every 1 month, starting first day of month"

#### Annual

- Billing cycle is 12 months from start date
- No additional fields needed

### Invoice Creation Timing

**Question:** When should the invoice be created?

**Options:**

1. **First day of billing cycle** - Invoice created automatically when cycle begins
2. **Custom date** - Choose number of days before or after cycle start
   - Additional field: Days before/after cycle start (-30 to +30)

### Due Date

**Question:** When is payment due?

**Options:**

1. **No due date** - Invoice has no specific due date
2. **Custom** - Choose specific number of days
   - Additional field: Number of days after invoice date

## Default Values

- Billing Cycle Start: First of next month
- Invoice Type: Previous lessons (Postpaid)
- Schedule: Monthly, every 1 month, first day of month
- Invoice Creation: First day of billing cycle
- Due Date: Net 30

## Validation

- Billing cycle start date must be today or in the future
- Weekly interval: 1-4 weeks
- Monthly interval: 1-12 months
- Custom invoice creation days: -30 to +30
- Custom due date days: 1-90

## Usage Contexts

1. **New Family Setup** (Step 2 of Add Student) - [add-student-invoicing.md](../student-management/add-student-invoicing.md)
2. **Family Settings** - Edit existing family invoicing configuration
3. **Bulk Family Update** - Apply schedule to multiple families
