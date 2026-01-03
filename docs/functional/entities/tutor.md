# Tutor Entity

## Overview
The Tutor entity represents an individual tutor who provides tutoring services. Tutors reference a Contact entity for their personal and contact information, and belong to a tutor group for organizational purposes.

## Core Attributes

### Contact Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Contact | Reference | Yes | Reference to Contact entity (contains name, email, phone, birthday, etc.) |

### Professional Information
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Bio | Text | No | Professional biography or description |
| Specialties | String/Array | No | Subject areas or specialties |
| Qualifications | Text | No | Educational background, certifications, credentials |

### Settings
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Active | Boolean | Yes | Whether the tutor is currently active (default: true) |

## Relationships

- **Contact**: A tutor references a Contact (one-to-one, required) - Contains name, email, phone, communication preferences
- **Tutor Group**: A tutor belongs to a Tutor Group (many-to-one, required)
- **Students**: A tutor can have multiple Students through their tutor group (one-to-many)
- **Events/Sessions**: A tutor can have multiple Events/sessions (one-to-many)
- **User**: A tutor has an associated User account for login (one-to-one, required)

## Business Rules

1. **Contact Required**: Every tutor must have an associated Contact record
2. **Tutor Group Required**: Every tutor must belong to a tutor group
3. **User Account Required**: Tutors must have a User account to access the tutor portal
4. **Active Status**: Only active tutors can create new sessions and accept new students
5. **Single Tutor Group**: A tutor can only belong to one tutor group at a time

## Validations

- Contact reference is required
- Tutor Group reference is required
- Active must be a boolean value
- User account reference is required

## Notes

- Tutors inherit all contact information from the Contact entity
- In a multi-tutor setup, tutors within the same tutor group can share students and resources
- For individual tutors, they have their own tutor group with only themselves as a member
- Deactivating a tutor (Active = false) prevents new bookings but preserves historical data
- Tutor's professional information (bio, specialties, qualifications) may be displayed on their public website/profile
