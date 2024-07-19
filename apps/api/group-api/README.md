## Grouping Dashboard

### Table: groupings **

#### Description

A `grouping` is a collection of groups.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grouping.
- **config_data**: `LONGTEXT`, Extra configuration data, may be used by group UI tools.
- **course_id**: `BIGINT(19)`, ID of the course associated with the grouping.
- **description**: `LONGTEXT`, Description of the grouping.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **id_number**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(255)`, Short human-readable unique name for the grouping.
- **time_created**: `BIGINT(19)`, Timestamp of grouping creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groupings_groups **

#### Description

The `groupings_groups` table links a grouping to a group, allowing groups to be in multiple groupings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **group_id**: `BIGINT(19)`, ID of the group.
- **grouping_id**: `BIGINT(19)`, ID of the grouping.
- **time_added**: `BIGINT(19)`, Timestamp of when the group was added to the grouping.

---

### Table: groups **

#### Description

Each record in the `groups` table represents a group.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the group.
- **course_id**: `BIGINT(19)`, ID of the course associated with the group.
- **description**: `LONGTEXT`, Description of the group.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **enrolment_key**: `VARCHAR(50)`, Key for enrolling in the group.
- **id_number**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(254)`, Short human-readable unique name for the group.
- **picture**: `BIGINT(19)`, ID of the picture associated with the group.
- **time_created**: `BIGINT(19)`, Timestamp of group creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groups_members **

#### Description

The `groups_members` table links a user to a group.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Moodle component that added the group membership (e.g., `auth_myplugin`), or blank if added manually.
- **group_id**: `BIGINT(19)`, ID of the group.
- **itemid**: `BIGINT(19)`, Defines the instance of the component that created the entry, or default (0) if not applicable.
- **time_added**: `BIGINT(19)`, Timestamp of when the user was added to the group.
- **user_id**: `BIGINT(19)`, ID of the user.

---

This detailed information about the `groupings`, `groupings_groups`, `groups`, and `groups_members` tables provides a comprehensive understanding of how group-related data is structured and managed within Moodle's database schema.
