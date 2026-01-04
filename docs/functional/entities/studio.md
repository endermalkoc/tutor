# Studio Entity

## Overview
The Studio entity represents the top-level organizational unit in the system. It can represent an individual tutor's business or a tutoring organization with multiple tutors. Studios own all data in the system including users, families, students, teachers, events, and transactions.

## Core Attributes

### Basic Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Name | String | Yes | Studio name (e.g., "Smith Tutoring", "ABC Learning Center") |
| Code | String | Yes | Unique code/identifier for the studio |
| Description | String | No | Description of the studio |

### Contact Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Address | Reference | No | Reference to Address entity |
| Phone | String | No | Studio contact phone number |
| Email | String | No | Studio contact email address |
| Website | String | No | Studio website URL |

### Settings
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Is Active | Boolean | Yes | Whether the studio is currently active (default: true) |

## Relationships

- **Address**: A studio may reference an Address (many-to-one, optional)
- **Users**: A studio has multiple Users (one-to-many)
- **Teachers**: A studio has multiple Teachers (one-to-many)
- **Students**: A studio has multiple Students (one-to-many)
- **Guardians/Parents**: A studio has multiple Parents (one-to-many)
- **Families**: A studio has multiple Families (one-to-many)
- **Events**: A studio has multiple Events/sessions (one-to-many)
- **Transactions**: A studio has multiple Transactions (one-to-many)
- **Invoices**: Invoices are scoped to families within a studio
- **Schools**: A studio can track multiple Schools (one-to-many)
- **Messaging Apps**: A studio can have multiple messaging app integrations (one-to-many)

## Business Rules

1. **Top-Level Scope**: Studio is the top-level organizational unit - all data belongs to a studio
2. **Data Isolation**: Data from one studio cannot be accessed by users of another studio (multi-tenancy)
3. **Unique Code**: Studio code must be unique across the system
4. **Active Status**: Inactive studios cannot create new bookings or transactions
5. **Single Studio vs Multi-Studio**:
   - Individual tutors have their own studio with only themselves as a teacher
   - Tutoring organizations have one studio with multiple teachers

## Validations

- Name is required and must not be empty
- Code is required, must be unique, and should follow a specific format (e.g., alphanumeric, no spaces)
- Email must be valid email format if provided
- Website must be valid URL format if provided
- Phone should follow valid phone format if provided

## Notes

- Studio represents what was previously called "Tutor Group" in earlier specifications
- In a multi-tenant SaaS, each studio has its own isolated data
- Individual tutors operate as a single-teacher studio
- Tutoring centers/organizations operate as multi-teacher studios
- Studio settings and preferences apply to all users within the studio
- Deactivating a studio (Is Active = false) suspends all operations but preserves data
