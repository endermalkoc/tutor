# Technical Documentation

This directory contains focused technical reference documentation for the Tutor Management SaaS platform.

---

## Documentation Index

### Core Technical Decisions

- **[Tech Stack](./tech_stack.md)** - Technology choices and rationale for all layers of the application
- **[Architecture Overview](./architecture_overview.md)** - High-level system architecture and design patterns
- **[Data Model](./data_model.md)** - Database schema, relationships, and data integrity
- **[Security Model](./security_model.md)** - Authentication, authorization, and security policies
- **[Testing Strategy](./testing_strategy.md)** - Testing approach, frameworks, and coverage goals

### API & Integration

- **[API Design](./api_design.md)** - tRPC API structure, conventions, naming patterns, and best practices

### Operations

- **[Deployment Strategy](./deployment_strategy.md)** - CI/CD pipeline, environments, release process, and rollback procedures
- **[Monitoring & Observability](./monitoring_observability.md)** - Error tracking, logging, metrics, analytics, and incident response
- **[Infrastructure](./infrastructure.md)** - Hosting platforms, services, resource allocation, and scaling strategy
- **[Performance](./performance.md)** - Performance targets, optimization strategies, budgets, and monitoring

### Implementation

- **[Local Development Setup](./local_development_setup.md)** - Step-by-step setup guide for local development environment
- **[Data Migration](./data_migration.md)** - Creating, testing, and deploying database schema changes
- **[Environment Configuration](./environment_configuration.md)** - Managing environment variables across environments
- **[CI/CD Pipeline](./ci_cd_pipeline.md)** - GitHub Actions workflows and configuration
- **[Backup](./backup.md)** - Backup procedures, testing, and restoration
- **[Disaster Recovery](./disaster_recovery.md)** - Recovery procedures for various disaster scenarios

---

## Purpose

These documents serve as **technical reference guides** that answer "what" and "why" questions:

- **What** technologies are we using?
- **Why** did we choose them?
- **What** are our testing goals?
- **What** security policies do we enforce?

For **implementation details** (how to set up, configure, or use these technologies), refer to:
- [TECH_STACK.md](../TECH_STACK.md) - Comprehensive implementation guide
- [Monorepo Structure Design](../plans/2026-01-03-monorepo-structure-design.md) - Detailed architecture and setup

---

## Document Guidelines

Each document in this directory should:

1. **Focus on decisions, not implementation** - Explain what and why, not how
2. **Be concise** - Quick reference, not comprehensive guides
3. **Stay current** - Update when technology choices change
4. **Link to implementation** - Reference detailed docs for setup/usage

---

Last Updated: 2026-01-03
