# Tool Cohort Dash

## Tables

List of Tables with their function described below:

### Table: tool_cohort_roles

Mapping of users to cohort role assignments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cohort_id**: `BIGINT(19)`, The cohort to sync.
- **role_id**: `BIGINT(19)`, The role to assign.
- **user_modified**: `BIGINT(19)`, Who last modified this record.
- **created_at**: `BIGINT(19)`, The time this record was created.
- **updated_at**: `BIGINT(19)`, The time this record was modified.
- **user_id**: `BIGINT(19)`, The user to sync.
