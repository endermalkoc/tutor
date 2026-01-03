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

### Phone Numbers
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Mobile Number | String | No | Contact's mobile phone number |
| Mobile SMS Capable | Boolean | Yes | Whether the mobile number can receive SMS messages (default: false) |
| Home Number | String | No | Contact's home phone number |
| Home SMS Capable | Boolean | Yes | Whether the home number can receive SMS messages (default: false) |
| Work Number | String | No | Contact's work phone number |
| Work SMS Capable | Boolean | Yes | Whether the work number can receive SMS messages (default: false) |

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

### Address Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Address | Text | No | Contact's physical address (street, city, state/province, postal code, country) |

### Communication Preferences
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Send Email Reminders | Boolean | Yes | Whether to send email reminders (default: true if email exists) |
| Send SMS Reminders | Boolean | Yes | Whether to send SMS reminders (default: true if SMS capable) |

### Additional Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Private Note | Text | No | Confidential notes about the contact (not visible to the contact themselves) |

## Relationships

- **User**: A User may reference a Contact (one-to-one)
- **Student**: A Student references a Contact (one-to-one, required)
- **Guardian**: A Guardian references a Contact (one-to-one, required)

## Business Rules

1. **SMS Reminders**: SMS reminders can only be enabled if at least one phone number is provided with its corresponding SMS Capable flag set to true
2. **Email Reminders**: Email reminders can only be enabled if Email Address is provided
3. **Phone Format**: All phone numbers (Mobile, Home, Work) should follow valid phone format if provided
4. **Email Format**: Email Address must be valid email format if provided
5. **SMS Capable Logic**: SMS Capable flags can only be true if the corresponding phone number is provided

## Validations

- First Name and Last Name are required and must not be empty
- Email Address must be valid email format if provided
- All phone numbers (Mobile, Home, Work) should follow valid phone format if provided
- Birthday must be a valid date in the past if provided
- If Send SMS Reminders is true, at least one phone number must exist with its SMS Capable flag set to true
- If Send Email Reminders is true, Email Address must exist
- If Mobile SMS Capable is true, Mobile Number must be provided
- If Home SMS Capable is true, Home Number must be provided
- If Work SMS Capable is true, Work Number must be provided

## Notes

- Contact is a reusable entity that prevents duplication of contact information across different entity types
- Not all Contacts are Users - a Contact becomes a User when they have login credentials
- Contact information can be shared (e.g., same email/phone for parent and student in some cases)
