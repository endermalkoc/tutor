# Phone Entity

## Overview
The Phone entity represents a phone number with associated metadata like phone type and SMS capabilities. Multiple phones can be associated with contacts through junction tables.

## Core Attributes

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Number | String | Yes | Phone number |
| Phone Type | Reference | Yes | Reference to PhoneType (Mobile, Home, Work) |
| SMS Capable | Boolean | Yes | Whether this phone number can receive SMS messages (default: false) |
| SMS Reminders | Boolean | Yes | Whether to send SMS reminders to this number (default: false) |

## Relationships

- **PhoneType**: A phone references a PhoneType (many-to-one, required)
- **Users**: A phone can be associated with multiple Users through UserPhone junction table (many-to-many)
- **Schools**: A phone can be associated with multiple Schools through SchoolPhone junction table (many-to-many)

## Business Rules

1. **Phone Type Required**: Every phone must have a phone type (Mobile, Home, Work, etc.)
2. **SMS Reminders Validation**: SMS Reminders can only be enabled if SMS Capable is true
3. **Unique per User**: A user can have multiple phones, but typically one per phone type
4. **Primary Phone**: One phone per user should be marked as primary in the UserPhone junction

## Validations

- Number is required and must not be empty
- Number should follow valid phone format
- Phone Type reference is required
- If SMS Reminders is true, SMS Capable must be true

## Notes

- Phone numbers are shared entities - the same phone number could theoretically be associated with multiple contacts
- Phone Type allows for categorization (Mobile, Home, Work, Emergency, etc.)
- SMS capabilities are tracked per phone number, not per contact
- The UserPhone junction table tracks which phone is primary for a given user
