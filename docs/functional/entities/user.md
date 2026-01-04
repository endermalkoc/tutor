# User Entity

## Overview
The User entity represents a person with login credentials and access to the system. Users reference Contact for their personal information and belong to a Studio. A User can have one or more roles (Teacher, Student, Parent) within the system.

## Core Attributes

### Account Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Contact | Reference | Yes | Reference to Contact entity (contains name, email, phone, etc.) |
| Studio | Reference | Yes | Reference to Studio this user belongs to |
| Login Enabled | Boolean | Yes | Whether this user can log into the system (default: true) |

## Relationships

- **Contact**: A user references a Contact (one-to-one, required) - Contains personal and contact information
- **Studio**: A user belongs to a Studio (many-to-one, required)
- **Address**: A user may reference an Address (many-to-one, optional)
- **Phones**: A user can have multiple Phones through UserPhone junction table (one-to-many)
- **Teacher**: A user may be a Teacher (one-to-one, optional)
- **Student**: A user may be a Student (one-to-one, optional)
- **Guardian/Parent**: A user may be a Guardian/Parent (one-to-one, optional)
- **Privileges**: A user has multiple UserPrivileges for access control (one-to-many)
- **Messaging Apps**: A user can have multiple messaging app accounts (one-to-many)
- **Event Attendees**: A user can be an attendee of multiple events (one-to-many)

## Business Rules

1. **Contact Required**: Every user must have an associated Contact record
2. **Studio Required**: Every user must belong to a studio
3. **Unique Email**: Email address (from Contact) must be unique across the system
4. **Login Enabled**: Users must have Login Enabled = true to authenticate
5. **Role Assignment**: A user can have one or more roles (Teacher, Student, Parent) or just be a system user without specific role
6. **Data Isolation**: Users can only access data within their assigned studio (multi-tenancy)

## Validations

- Contact reference is required
- Studio reference is required
- Login Enabled must be a boolean value
- Email from Contact must be unique if login is enabled

## Notes

- User is the authentication/authorization entity - Contact stores the personal information
- Not all Contacts are Users - Contacts without login credentials don't have User records
- A User can simultaneously be a Teacher, Student, and Parent (e.g., a tutor who takes lessons from another tutor)
- User Privileges control what actions a user can perform within the system
- Disabling login (Login Enabled = false) prevents authentication but preserves user data
- User is scoped to a Studio - cannot access data from other studios
- The User-Contact separation allows for Contacts without login credentials (e.g., young children, emergency contacts)
