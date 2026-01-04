# Entities

This section defines the core data entities used throughout the platform. These entity definitions serve as a reference for all features and screens.

## Base Entities

- [Contact](./contact.md) - Base entity for personal information (name, email, gender, birthday, messaging apps)
- [Address](./address.md) - Physical address entity (street, city, state, postal code, country)
- [Phone](./phone.md) - Phone number entity with type and SMS capabilities

## Organizational Entities

- [Studio](./studio.md) - Top-level organizational unit (individual tutor or tutoring center)
- [Family](./family.md) - Household grouping for billing, links students and guardians

## People Entities

- [User](./user.md) - Person with login credentials and system access
- [Tutor](./tutor.md) - Tutor/teacher profile, professional information (references Contact and User)
- [Student](./student.md) - Student profile, academic details, lesson settings (references Contact and User)
- [Guardian](./guardian.md) - Parent/guardian information, billing preferences (references Contact and User)

## Scheduling & Events

- [Event](./event.md) - Tutoring sessions, appointments, scheduled events
- [Instrument](./instrument.md) - Musical instruments or subject areas taught/learned
- [Location](./location.md) - Physical locations for events (referenced in schema)

## Financial Management

- [Transaction](./transaction.md) - Financial transactions (charges, payments, credits)
- [Invoice](./invoice.md) - Bills sent to families for services rendered

## Other Entities

- [School](./school.md) - Educational institutions that students attend

## Reference Tables

- [Reference Tables](./reference-tables.md) - Lookup tables for standardized values:
  - **Student-Related**: StudentStatus, StudentType, SkillLevel
  - **Teacher-Related**: PayrollType
  - **Financial**: BillingType, PricingType
  - **Event & Scheduling**: EventType, FrequencyType, AttendanceStatus
  - **Contact & Communication**: Gender, PhoneType, AddressType, Country, MessagingAppType
  - **Organization**: Category, Location

## Entity Relationships Overview

```
Studio (top-level)
├── Users
│   ├── Tutors
│   ├── Students (via Families)
│   └── Guardians (via Families)
├── Families
│   ├── Students
│   ├── Guardians
│   ├── Transactions
│   └── Invoices
├── Events
│   ├── Teachers
│   ├── Attendees (Students/Users)
│   └── Locations
└── Schools

Contact (base for personal info)
├── User (1:1)
├── Addresses (many:1)
└── Phones (many:many via UserPhone)
```

---

**Note:** Each entity definition includes:
- Entity overview and purpose
- Core attributes/fields
- Relationships to other entities
- Business rules and validations
- States/status values (if applicable)
- Implementation notes
