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

### Billing & Credits
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Make-Up Credits | Integer | No | Number of unused makeup lesson credits (default: 0) |

### Organization
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Tags | Many-to-Many | No | Tags assigned to student for grouping and filtering (see Tag entity) |

### Additional Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Note | Text | No | Free-form notes about the student |

## Relationships

- **Contact**: A student references a Contact (one-to-one, required) - Contains name, email, phone, birthday, gender, communication preferences
- **Family**: A student belongs to a Family (many-to-one, required)
- **Studio**: Inherited through Family - Students belong to the studio their family is assigned to
- **Tutors**: A student can be assigned to one or more Tutors (many-to-many) - Teachers responsible for the student
- **Events**: A student can have many Events/sessions (one-to-many)
- **Tags**: A student can have multiple Tags (many-to-many) - Each tag has name, color, and description for flexible categorization (see [Tag Entity](./tag.md))
- **User**: A student may have an associated User account for student portal access (one-to-one, optional)
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

## Calculated/Derived Fields

These fields are calculated on-demand or derived from related entities and are not stored directly on the Student entity:

| Field | Calculation | Description |
|-------|-------------|-------------|
| Age | Calculated from Contact.Birthday | Current age of student |
| Attendance Average | (Attended Sessions / Total Scheduled Sessions) × 100 | Percentage of attended vs scheduled sessions |
| Last Lesson | MAX(Event.StartDate) WHERE Event.Status = Completed | Date of most recent completed lesson |
| Next Lesson | MIN(Event.StartDate) WHERE Event.Status = Scheduled AND StartDate > NOW | Date and time of next scheduled lesson |
| Student Login | User.LastLogin (if User exists) | Last time student logged into student portal |
| Parent Login | EXISTS(Guardian.User) | Whether parent/guardian has portal access |
| Card on File | Family.HasPaymentMethod | Whether payment card is on file for family (from Family entity) |

## Business Rules

1. **Contact Required**: Every student must have an associated Contact record
2. **Child Student Requirements**: Child students (Student Type = Child) must be linked to a Family with parent/guardian information
3. **Active Status Validation**: Students with Active status should have upcoming or recent sessions
4. **Price Validation**: Price must be greater than or equal to 0
5. **Default Duration**: Must be a positive integer (typically 15, 30, 45, 60, 90, or 120 minutes)
6. **Communication Preferences**: Inherited from Contact entity (see Contact for SMS/Email reminder rules)
7. **Make-Up Credits**: Cannot be negative; default is 0 for new students
8. **Tutor Assignment**: Students should have at least one assigned tutor (recommended, not required)
9. **Tag Organization**: Tags are optional but recommended for efficient student management and filtering

## Validations

- Contact reference is required
- Family reference is required
- Price must be a valid decimal number >= 0
- Default Duration must be a positive integer
- Make-Up Credits must be >= 0
- Status must be one of the defined enum values
- Student Type must be one of the defined enum values
- Lesson Category must be one of the defined enum values

## Notes

- Students can be imported in bulk via CSV/Excel (see Tutor Portal > Importing Students)
- Contact information (name, email, phone, birthday, gender, etc.) is stored in the referenced Contact entity
- Communication platform IDs (Skype, FaceTime) are stored in the Contact entity
- Communication preferences (email/SMS reminders) are managed in the Contact entity
- Student Type affects UI/UX and access control for student portal
- A Student may or may not have an associated User account (for student portal access)
- Make-Up Credits can be modified through bulk actions in Student Management
- Tags provide flexible organization and filtering capabilities in student lists
- Multiple tutors can be assigned to a single student for team teaching or subject-specific instruction
- Calculated fields (Age, Attendance Average, Last/Next Lesson) are derived in real-time and not stored
- See [Student List](../11-tutor-portal/student-management/student-list.md) for available columns and display options
