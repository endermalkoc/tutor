# Contact Entity

## Overview
The Contact entity is a base entity that stores common personal information. Users, Students, Guardians, Tutors, and other entities reference Contact for their basic details. Contact information like phones and addresses are managed through separate related entities.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Title | Reference | No | Reference to Title entity (Mr., Mrs., Ms., Dr., Prof.) |
| First Name | String | Yes | Contact's first name |
| Last Name | String | Yes | Contact's last name |
| Email Address | String | No | Contact's email address |

### Personal Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Gender | Reference | No | Reference to Gender entity |
| Birthday | Date | No | Contact's date of birth |

### Communication Platforms
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Skype Username | String | No | Skype username for online sessions |
| FaceTime ID | String | No | FaceTime ID for online sessions |

### Communication Preferences
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Send Email Reminders | Boolean | Yes | Whether to send email reminders (default: true if email exists) |
| Send SMS Reminders | Boolean | Yes | Whether to send SMS reminders (default: true if has SMS-capable phone) |

### Additional Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Private Note | Text | No | Confidential notes about the contact (not visible to the contact themselves) |

## Relationships

- **User**: A User references a Contact (one-to-one, required for User)
- **Phones**: A contact can have multiple Phones through UserPhone junction table (one-to-many)
- **Address**: A contact may reference an Address (many-to-one, optional)
- **Title**: A contact may reference a Title (many-to-one, optional)
- **Gender**: A contact may reference a Gender (many-to-one, optional)

## Business Rules

1. **Email Reminders**: Email reminders can only be enabled if Email Address is provided
2. **SMS Reminders**: SMS reminders can only be enabled if contact has at least one phone with SMS Capable set to true
3. **Email Format**: Email Address must be valid email format if provided
4. **Shared Addresses**: Multiple contacts can share the same address (e.g., family members)
5. **Multiple Phones**: Contacts can have multiple phone numbers (mobile, home, work) managed through Phone entity

## Validations

- First Name and Last Name are required and must not be empty
- Email Address must be valid email format if provided
- Birthday must be a valid date in the past if provided
- If Send Email Reminders is true, Email Address must exist
- If Send SMS Reminders is true, contact must have at least one phone with SMS Capable = true

## Notes

- Contact is a base entity that stores personal information separate from role-specific data
- Phone numbers are managed through the separate Phone entity and UserPhone junction table
- Addresses are managed through the separate Address entity
- Title references a Title lookup table (Mr., Mrs., Ms., Dr., Prof.)
- Gender references a Gender lookup table for standardization
- Not all Contacts have User accounts - Contact is the base personal information, User adds login capability
- Communication platform IDs (Skype, FaceTime) enable quick access to online session links
