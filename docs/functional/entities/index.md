# Entities

This section defines the core data entities used throughout the platform. These entity definitions serve as a reference for all features and screens.

## Base Entities

- [Contact](./contact.md) - Base entity for contact information (name, email, phone, communication preferences)

## Core Entities

- [Tutor](./tutor.md) - Tutor profile, professional information, belongs to tutor group (references Contact)
- [Student](./student.md) - Student profile, academic details, lesson settings (references Contact)
- [Guardian](./guardian.md) - Parent/guardian information, billing preferences, portal visibility (references Contact)
- [Family](./family.md) - Family/household grouping, links students and guardians, belongs to tutor group
- [Event](./event.md) - Tutoring sessions, appointments, scheduled events

---

**Note:** Each entity definition should include:
- Entity overview and purpose
- Core attributes/fields
- Relationships to other entities
- Business rules and validations
- States/status values (if applicable)
