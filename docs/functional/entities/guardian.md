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

## Display Behavior

### Primary Phone Number
When displaying guardian contact information in compact views (e.g., student detail page), only one phone number is shown initially:
1. **Mobile** - Show mobile number if available (preferred for SMS capability)
2. **Home** - Show home number if no mobile exists
3. **Work** - Show work number only if no mobile or home exists

### Expandable Details
The following information is hidden under a "Show details" toggle:
- Additional phone numbers (Home, Work) beyond the primary
- Address
- Communication preferences (Invoice Recipient, Email/SMS Reminders)
- Private notes

This reduces visual clutter while keeping essential contact info (email + one phone) immediately accessible.

### Add/Edit Pattern
Both adding and editing guardian contacts use **inline forms** for consistency:
- **Edit**: Clicking edit on an existing contact transforms the card into an editable form in place
- **Add**: Clicking "Add Contact" reveals a new inline form card (styled with dashed border to indicate new item)

This maintains spatial consistency—users learn one interaction pattern for managing contacts. The inline approach keeps context visible and avoids disruptive modal/drawer overlays for what are contextual operations within the Family section.

## Notes

- Guardians inherit all contact information fields from the Contact entity (name, email, phone numbers, etc.)
- Multiple guardians can be associated with the same student through the Family entity
- The Preferred Invoice Recipient setting helps determine which guardian receives billing communications
- Show in Student Portal Contacts allows guardians to control their visibility to students (useful for separated parents or privacy preferences)
- Guardians may or may not have User accounts for accessing the student portal
