# Invoice Entity

## Overview
The Invoice entity represents a bill sent to a family for services rendered. Invoices aggregate transactions into line items and track invoice status, payment, and communication with families.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Family | Reference | Yes | Reference to Family this invoice is for |
| Invoice Date | Date | Yes | Date the invoice was created |
| Invoice Type | String | Yes | Type of invoice (standard, interim, final, etc.) |

### Date Range
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Start Date | Date | No | Start date of billing period (for period invoices) |
| End Date | Date | No | End date of billing period (for period invoices) |
| Due Date | Date | No | Date payment is due |

### Notes & Communication
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Footer Note | Text | No | Note displayed at bottom of invoice (visible to family) |
| Private Note | Text | No | Internal note not visible to family |
| Email Date | Date | No | Date invoice was emailed to family |

### Status & Totals
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Is Archived | Boolean | Yes | Whether invoice is archived (default: false) |
| Total Amount | Decimal | Yes | Total amount due on invoice |

## Relationships

- **Family**: An invoice belongs to a Family (many-to-one, required)
- **Line Items**: An invoice has multiple InvoiceLineItems (one-to-many)

## Invoice Types

| Type | Description |
|------|-------------|
| Standard | Regular periodic invoice (e.g., monthly) |
| Interim | Mid-period invoice for immediate charges |
| Final | Final invoice when closing an account |
| Adjustment | Invoice containing adjustments or corrections |

## Business Rules

1. **Family Required**: Every invoice must be associated with a family
2. **Invoice Date Required**: Invoice Date must be provided
3. **Total Amount Calculation**: Total Amount should equal sum of all line item amounts
4. **Period Validation**: If Start Date is provided, End Date should also be provided and must be after Start Date
5. **Due Date**: Due Date should be after or equal to Invoice Date
6. **Email Tracking**: Email Date tracks when invoice was sent to family
7. **Archive Status**: Archived invoices are read-only and not editable

## Validations

- Family reference is required
- Invoice Date is required
- Invoice Type must be one of the defined types
- Total Amount is required and must be >= 0
- If Start Date is provided, End Date must also be provided
- If End Date is provided, it must be after Start Date
- If Due Date is provided, it must be after or equal to Invoice Date

## Notes

- Invoices are sent to families, not individual students
- Line items link invoices to specific transactions
- Total Amount is typically calculated from line items but stored for performance
- Footer Note can include payment instructions, thank you message, etc.
- Private Note is for internal record-keeping and not shown to families
- Email Date tracking helps monitor communication with families
- Archived invoices are historical records and cannot be modified
- Invoice periods (Start Date to End Date) typically align with billing cycles (weekly, monthly, etc.)
- Invoices can be generated manually or automatically based on transactions
- The system should support multiple invoice formats/templates
