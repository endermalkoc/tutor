# Guardian Entity

## Overview
The Guardian entity represents a parent or guardian responsible for a student. Guardians reference a Contact entity for their personal and contact information, and include guardian-specific attributes for billing and portal visibility.

## Core Attributes

### Contact Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Contact | Reference | Yes | Reference to Contact entity (contains name, email, phone, birthday, etc.) |

### Guardian-Specific Settings
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Preferred Invoice Recipient | Boolean | Yes | Whether this guardian is the preferred recipient for invoices (default: false) |
| Show in Student Portal Contacts | Boolean | Yes | Whether this guardian's contact info is displayed in the student portal (default: true) |

## Relationships

- **Contact**: A guardian references a Contact (one-to-one, required) - Contains name, email, phone, communication preferences
- **Family**: A guardian belongs to a Family (many-to-one, required)
- **Students**: A guardian can be associated with multiple students through Family (one-to-many)
- **Invoices**: A guardian receives invoices for their family (one-to-many through Family)
- **Studio**: Inherited through Family - Guardians belong to the studio their family is assigned to

## Business Rules

1. **Contact Required**: Every guardian must have an associated Contact record
2. **Family Required**: Every guardian must belong to a Family
3. **Preferred Invoice Recipient**: Only one guardian per family should be marked as the preferred invoice recipient
4. **Portal Visibility**: If Show in Student Portal Contacts is false, the guardian's information is hidden from students in the student portal

## Validations

- Contact reference is required
- Family reference is required
- Preferred Invoice Recipient must be a boolean value
- Show in Student Portal Contacts must be a boolean value

## Notes

- Guardians inherit all contact information fields from the Contact entity (name, email, phone numbers, etc.)
- Multiple guardians can be associated with the same student through the Family entity
- The Preferred Invoice Recipient setting helps determine which guardian receives billing communications
- Show in Student Portal Contacts allows guardians to control their visibility to students (useful for separated parents or privacy preferences)
- Guardians may or may not have User accounts for accessing the student portal
