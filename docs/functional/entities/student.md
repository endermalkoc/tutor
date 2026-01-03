# Student Entity

## Overview
The Student entity represents an individual student in the tutor's roster. Students reference a Contact entity for their personal and contact information, and include student-specific attributes for academic information, lesson preferences, and billing settings.

## Core Attributes

### Contact Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Contact | Reference | Yes | Reference to Contact entity (contains name, email, phone, birthday, etc.) |

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

- **Contact**: A student references a Contact (one-to-one, required) - Contains name, email, phone, birthday, communication preferences
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

1. **Contact Required**: Every student must have an associated Contact record
2. **Child Student Requirements**: Child students (Student Type = Child) must be linked to a Family with parent/guardian information
3. **Active Status Validation**: Students with Active status should have upcoming or recent sessions
4. **Price Validation**: Price must be greater than or equal to 0
5. **Default Duration**: Must be a positive integer (typically 15, 30, 45, 60, 90, or 120 minutes)
6. **Communication Preferences**: Inherited from Contact entity (see Contact for SMS/Email reminder rules)

## Validations

- Contact reference is required
- Price must be a valid decimal number >= 0
- Default Duration must be a positive integer
- Status must be one of the defined enum values
- Student Type must be one of the defined enum values
- Lesson Category must be one of the defined enum values

## Notes

- Students can be imported in bulk via CSV/Excel (see Tutor Portal > Importing Students)
- Contact information (name, email, phone, birthday, etc.) is stored in the referenced Contact entity
- Communication platform IDs (Skype, FaceTime) are stored in the Contact entity
- Communication preferences (email/SMS reminders) are managed in the Contact entity
- Student Type affects UI/UX and access control for student portal
- A Student may or may not have an associated User account (for student portal access)
