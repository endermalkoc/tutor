# Recurrence Entity

## Overview
The Recurrence entity defines a repeating pattern for transactions (charges and discounts). It specifies how often a transaction repeats, when it starts, and when (or if) it ends.

---

## Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Frequency | Enum | Yes | How often the transaction repeats (daily, weekly, monthly, yearly) |
| Start Date | Date | Yes | When the recurring pattern begins |
| End Type | Enum | Yes | How the recurrence ends (indefinitely, until_date) |
| End Date | Date | Conditional | Date when recurrence ends (required if End Type is "until_date") |

---

## Frequency Types

### Daily
Repeats on selected days of the week.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Days of Week | Array | Yes | One or more days (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) |

**Examples:**
- Every Monday and Wednesday
- Every weekday (Mon-Fri)
- Every Tuesday, Thursday, Saturday

### Weekly
Repeats every X weeks.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Interval | Integer | Yes | Number of weeks between occurrences (minimum: 1) |

**Examples:**
- Every week (interval = 1)
- Every 2 weeks (interval = 2)
- Every 4 weeks (interval = 4)

### Monthly
Repeats every X months on a specific day pattern.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Interval | Integer | Yes | Number of months between occurrences (minimum: 1) |
| Day Type | Enum | Yes | How to determine the day: "day_of_month" or "weekday_of_month" |
| Day of Month | Integer | Conditional | Day number 1-31 (required if Day Type is "day_of_month") |
| Weekday Ordinal | Enum | Conditional | first, second, third, fourth, last (required if Day Type is "weekday_of_month") |
| Weekday | Enum | Conditional | Day of week (required if Day Type is "weekday_of_month") |

**Examples:**
- Monthly on day 8 (interval = 1, Day Type = day_of_month, Day of Month = 8)
- Monthly on the second Thursday (interval = 1, Day Type = weekday_of_month, Ordinal = second, Weekday = Thursday)
- Every 3 months on the last Friday (interval = 3, Day Type = weekday_of_month, Ordinal = last, Weekday = Friday)

### Yearly
Repeats every X years.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Interval | Integer | Yes | Number of years between occurrences (minimum: 1) |

**Examples:**
- Every year (interval = 1)
- Every 2 years (interval = 2)

---

## End Type Options

| Value | Description |
|-------|-------------|
| indefinitely | Recurrence continues forever until manually stopped |
| until_date | Recurrence ends on a specific date |

---

## Examples

### Tuesday/Thursday Lessons
- **Use case**: Student has lessons twice a week
- **Configuration**:
  - Frequency = daily
  - Days of Week = [Tuesday, Thursday]
  - End Type = indefinitely
- **Result**: Charge created every Tuesday and Thursday

### Bi-Weekly Lesson Fee
- **Use case**: Lesson fee for every-other-week schedule
- **Configuration**:
  - Frequency = weekly
  - Interval = 2
  - End Type = indefinitely
- **Result**: Charge created every 2 weeks

### Monthly on the 1st
- **Use case**: Monthly lesson package billed on the 1st
- **Configuration**:
  - Frequency = monthly
  - Interval = 1
  - Day Type = day_of_month
  - Day of Month = 1
  - End Type = indefinitely
- **Result**: Charge created on the 1st of every month

### Monthly on Second Saturday Until Summer
- **Use case**: Special Saturday class until summer break
- **Configuration**:
  - Frequency = monthly
  - Interval = 1
  - Day Type = weekday_of_month
  - Weekday Ordinal = second
  - Weekday = Saturday
  - End Type = until_date
  - End Date = June 30, 2025
- **Result**: Charge created on the second Saturday of each month until June 30

### Annual Registration Fee
- **Use case**: Yearly admin fee
- **Configuration**:
  - Frequency = yearly
  - Interval = 1
  - End Type = indefinitely
- **Result**: Charge created once per year

---

## Business Rules

1. **Days of Week Required for Daily**: If Frequency is "daily", at least one day must be selected
2. **Interval Minimum**: Interval must be at least 1 for weekly, monthly, yearly
3. **Day of Month Validation**: Day of Month must be 1-31; system handles months with fewer days gracefully
4. **End Date Validation**: If End Type is "until_date", End Date must be after Start Date
5. **Start Date Required**: Start Date determines when the first occurrence is created

## Behavior

### Creating Recurring Transactions
When a transaction with recurrence is created:
1. The initial transaction is created based on the pattern starting from Start Date
2. The system schedules future transactions based on the recurrence pattern
3. Future transactions are generated automatically at the appropriate time

### Modifying Recurrence
- Changes to recurrence settings affect future occurrences only
- Past transactions are not modified
- User can cancel remaining occurrences at any time

### Stopping Recurrence
User can stop a recurring transaction by:
1. Changing End Type to "until_date" with today's date
2. Manually canceling the recurrence
3. Deleting the parent recurring transaction (affects future only)

### Edge Cases
- **Day 31 in February**: If Day of Month is 31 and month has fewer days, use last day of month
- **Fifth weekday**: If "fifth Thursday" doesn't exist in a month, skip that month

---

## UI Display Patterns

Show a human-readable summary of the recurrence:

| Configuration | Display |
|--------------|---------|
| Daily, Mon/Wed/Fri | "Every Monday, Wednesday, Friday" |
| Weekly, interval 1 | "Every week" |
| Weekly, interval 2 | "Every 2 weeks" |
| Monthly, day 15 | "Monthly on day 15" |
| Monthly, second Thursday | "Monthly on the second Thursday" |
| Yearly, interval 1 | "Every year" |
| End Type = indefinitely | (no suffix) |
| End Type = until_date, Dec 31 | "until Dec 31, 2025" |

**Full examples:**
- "Every Monday, Wednesday, Friday"
- "Every 2 weeks until Jun 30, 2025"
- "Monthly on the second Thursday"
- "Every year"

---

## Notes

- Recurrence is only applicable to Charge and Discount transaction types
- Payment and Refund are always one-time transactions
- The recurrence component should be reusable across different contexts
- Consider showing a preview of the next 3-5 occurrences when setting up recurrence
