### Table: scale

Defines grading scales.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course to which the scale belongs.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the scale.
- **description_format**: `TINYINT(3)`, Format of the description.
- **name**: `VARCHAR(255)`, Name of the scale.
- **scale**: `LONGTEXT(2147483647)`, Scale values.
- **created_at**: `BIGINT(19)`, Timestamp when the scale was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the scale was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created the scale.

---

### Table: scale_history

History table for grading scales.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed on the scale (e.g., created, modified, deleted).
- **course_id**: `BIGINT(19)`, ID of the course to which the scale belongs.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the scale.
- **logged_user**: `BIGINT(19)` (Nullable), ID of the user who last modified this scale.
- **name**: `VARCHAR(255)`, Name of the scale.
- **old_id**: `BIGINT(19)`, ID of the old scale before modification.
- **scale**: `LONGTEXT(2147483647)`, Scale values.
- **source**: `VARCHAR(255)` (Nullable), Source of the modification (e.g., manual, module, import).
- **created_at**: `BIGINT(19)` (Nullable), Timestamp when the scale was created.
- **updated_at**: `BIGINT(19)` (Nullable), Timestamp when the scale was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created or modified the scale.
