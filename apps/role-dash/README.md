### Table: role

Moodle roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the role.
- **archetype**: `VARCHAR(30)`, Role archetype, used during install and role reset.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the role, empty descriptions may be automatically localized.
- **name**: `VARCHAR(255)`, Name of the role, empty names are automatically localized.
- **short_name**: `VARCHAR(100)`, Short name of the role.
- **sort_order**: `INT(3)`, Sort order of the role.

---

### Table: role_allow_assign

Defines which roles can assign other roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role that can assign.
- **allow_assign_id**: `BIGINT(19)`, ID of the role that can be assigned.

---

### Table: role_allow_override

Defines which roles can override other roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role that can override.
- **allow_override_id**: `BIGINT(19)`, ID of the role that can be overridden.

---

### Table: role_allow_switch

Defines which roles a user is allowed to switch to.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role the user has.
- **allow_switch_id**: `BIGINT(19)`, ID of the role the user is allowed to switch to.

---

### Table: role_allow_view

Defines which roles a user is allowed to view.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role the user has.
- **allow_view_id**: `BIGINT(19)`, ID of the role the user is allowed to view.

---

### Table: role_assignments

Assigning roles in different contexts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Plugin responsible for the role assignment, empty when manually assigned.
- **context_id**: `BIGINT(19)`, Context ID where the role is assigned.
- **item_id**: `BIGINT(19)`, ID of the enrolment/auth instance responsible for this role assignment.
- **modifier_id**: `BIGINT(19)`, ID of the user who modified the role assignment.
- **role_id**: `BIGINT(19)`, ID of the assigned role.
- **sort_order**: `INT(3)`, Sort order of the role assignment.
- **created_at**: `BIGINT(19)`, Timestamp when the role assignment was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the role assignment was modified.
- **user_id**: `BIGINT(19)`, ID of the user to whom the role is assigned.

---

### Table: role_capabilities

Permission has to be signed, overriding a capability for a particular role.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **capability**: `VARCHAR(255)`, The capability name.
- **context_id**: `BIGINT(19)`, Context ID where the capability is applied.
- **permission**: `BIGINT(19)`, Permission level for the capability.
- **role_id**: `BIGINT(19)`, ID of the role the capability applies to.
- **created_at**: `BIGINT(19)`, Timestamp when the capability was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the capability was modified.
- **user_id**: `BIGINT(19)`, ID of the user who modified the capability.

---

### Table: role_context_levels

Lists which roles can be assigned at which context levels.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_level**: `BIGINT(19)`, Context level where the role can be assigned.
- **role_id**: `BIGINT(19)`, ID of the role.

---

### Table: role_names

Role names in native strings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID where the role name is used.
- **name**: `VARCHAR(255)`, Name of the role.
- **role_id**: `BIGINT(19)`, ID of the role.
