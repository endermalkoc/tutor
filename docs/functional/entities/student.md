# Student Entity

## Overview
The Student entity represents an individual student in the tutor's roster. Students can be linked to families and have various attributes for contact information, lesson preferences, and billing settings.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| First Name | String | Yes | Student's first name |
| Last Name | String | Yes | Student's last name |
| Email Address | String | No | Student's email address |
| Phone Number | String | No | Student's phone number |
| SMS Capable | Boolean | Yes | Whether the phone number can receive SMS messages |

### Personal Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Gender | String | No | Student's gender |
| Birthday | Date | No | Student's date of birth |

### Communication Platforms
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Skype Username | String | No | Skype username for online sessions |
| FaceTime ID | String | No | FaceTime ID for online sessions |

### Academic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| School | String | No | Name of school the student attends |
| Subjects | String/Array | No | Subjects the student is being tutored in |
| Skill Level | String | No | Student's current skill level |

### Account Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Student Since | Date | No | Date when student started with the tutor |
| Referrer | String | No | How the student was referred to the tutor |
| Status | Enum | Yes | Active, Trial, Waiting, Lead, Inactive |
| Student Type | Enum | Yes | Adult or Child |

### Communication Preferences
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Send Email Lesson Reminders | Boolean | Yes | Whether to send email reminders for upcoming lessons |
| Send SMS Lesson Reminders | Boolean | Yes | Whether to send SMS reminders for upcoming lessons |

### Lesson Settings
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Lesson Category | Enum | Yes | Lesson, Group Lesson, Vacation |
| Default Duration | Integer | Yes | Default lesson duration in minutes |
| Default Billing | Reference | Yes | Reference to BillingType entity |
| Price | Decimal | Yes | Lesson price amount |
| PriceType | Reference | Yes | Reference to PriceType entity |

### Additional Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Note | Text | No | Free-form notes about the student |

## Relationships

- **Family**: A student belongs to a Family (many-to-one)
- **Events**: A student can have many Events/sessions (one-to-many)
- **BillingType**: References a billing type configuration
- **PriceType**: References a price type configuration (hourly, per session, package, etc.)

## Status Values

| Status | Description |
|--------|-------------|
| Active | Currently active student with regular sessions |
| Trial | Student in trial period |
| Waiting | Student waiting to start or resume lessons |
| Lead | Potential student, not yet enrolled |
| Inactive | No longer taking lessons |

## Student Type Values

| Type | Description |
|------|-------------|
| Adult | Adult student (18+ or emancipated) |
| Child | Minor student (requires parent/guardian oversight) |

## Lesson Category Values

| Category | Description |
|----------|-------------|
| Lesson | Standard one-on-one lesson |
| Group Lesson | Group tutoring session |
| Vacation | Vacation/break period (not billable) |

## Business Rules

1. **SMS Reminders**: SMS reminders can only be enabled if Phone Number is provided and SMS Capable is true
2. **Email Reminders**: Email reminders can only be enabled if Email Address is provided
3. **Child Student Requirements**: Child students must be linked to a Family with parent/guardian information
4. **Active Status Validation**: Students with Active status should have upcoming or recent sessions
5. **Price Validation**: Price must be greater than or equal to 0
6. **Default Duration**: Must be a positive integer (typically 15, 30, 45, 60, 90, or 120 minutes)

## Validations

- First Name and Last Name are required and must not be empty
- Email Address must be valid email format if provided
- Phone Number should follow valid phone format if provided
- Birthday must be a valid date in the past if provided
- Price must be a valid decimal number >= 0
- Default Duration must be a positive integer

## Notes

- Students can be imported in bulk via CSV/Excel (see Tutor Portal > Importing Students)
- Communication platform IDs (Skype, FaceTime) enable quick access to online session links
- Student Type affects UI/UX and access control for student portal
