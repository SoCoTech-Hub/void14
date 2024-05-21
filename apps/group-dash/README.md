## Grouping Dashboard

### Table: groupings

#### Description

A `grouping` is a collection of groups.

#### Fields

- **configdata**: `LONGTEXT`, Extra configuration data, may be used by group UI tools.
- **courseid**: `BIGINT(19)`, ID of the course associated with the grouping.
- **description**: `LONGTEXT`, Description of the grouping.
- **descriptionformat**: `TINYINT(3)`, Format of the description field.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grouping.
- **idnumber**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(255)`, Short human-readable unique name for the grouping.
- **timecreated**: `BIGINT(19)`, Timestamp of grouping creation.
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groupings_groups

#### Description

The `groupings_groups` table links a grouping to a group, allowing groups to be in multiple groupings.

#### Fields

- **groupid**: `BIGINT(19)`, ID of the group.
- **groupingid**: `BIGINT(19)`, ID of the grouping.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **timeadded**: `BIGINT(19)`, Timestamp of when the group was added to the grouping.

---

### Table: groups

#### Description

Each record in the `groups` table represents a group.

#### Fields

- **courseid**: `BIGINT(19)`, ID of the course associated with the group.
- **description**: `LONGTEXT`, Description of the group.
- **descriptionformat**: `TINYINT(3)`, Format of the description field.
- **enrolmentkey**: `VARCHAR(50)`, Key for enrolling in the group.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the group.
- **idnumber**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(254)`, Short human-readable unique name for the group.
- **picture**: `BIGINT(19)`, ID of the picture associated with the group.
- **timecreated**: `BIGINT(19)`, Timestamp of group creation.
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groups_members

#### Description

The `groups_members` table links a user to a group.

#### Fields

- **component**: `VARCHAR(100)`, Moodle component that added the group membership (e.g., `auth_myplugin`), or blank if added manually.
- **groupid**: `BIGINT(19)`, ID of the group.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **itemid**: `BIGINT(19)`, Defines the instance of the component that created the entry, or default (0) if not applicable.
- **timeadded**: `BIGINT(19)`, Timestamp of when the user was added to the group.
- **userid**: `BIGINT(19)`, ID of the user.

---

This detailed information about the `groupings`, `groupings_groups`, `groups`, and `groups_members` tables provides a comprehensive understanding of how group-related data is structured and managed within Moodle's database schema.
