# Contact Entity

## Overview
The Contact entity is a base entity that stores common contact information. Users, Students, Parents/Guardians, and other entities inherit or reference Contact for their contact details.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| First Name | String | Yes | Contact's first name |
| Last Name | String | Yes | Contact's last name |
| Email Address | String | No | Contact's email address |
| Phone Number | String | No | Contact's phone number |
| SMS Capable | Boolean | Yes | Whether the phone number can receive SMS messages (default: false) |

### Personal Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Gender | String | No | Contact's gender |
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
| Send SMS Reminders | Boolean | Yes | Whether to send SMS reminders (default: true if SMS capable) |

## Relationships

- **User**: A User may reference a Contact (one-to-one)
- **Student**: A Student references a Contact (one-to-one, required)
- **Parent/Guardian**: A Parent/Guardian references a Contact (one-to-one, required)

## Business Rules

1. **SMS Reminders**: SMS reminders can only be enabled if Phone Number is provided and SMS Capable is true
2. **Email Reminders**: Email reminders can only be enabled if Email Address is provided
3. **Phone Format**: Phone Number should follow valid phone format if provided
4. **Email Format**: Email Address must be valid email format if provided

## Validations

- First Name and Last Name are required and must not be empty
- Email Address must be valid email format if provided
- Phone Number should follow valid phone format if provided
- Birthday must be a valid date in the past if provided
- If Send SMS Reminders is true, Phone Number must exist and SMS Capable must be true
- If Send Email Reminders is true, Email Address must exist

## Notes

- Contact is a reusable entity that prevents duplication of contact information across different entity types
- Not all Contacts are Users - a Contact becomes a User when they have login credentials
- Contact information can be shared (e.g., same email/phone for parent and student in some cases)
