# Tool Recyclebin Dash

## Tables

List of Tables with their function described below:

### Table: tool_recyclebin_categories

A list of items in the category recycle bin.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **full_name**: `VARCHAR(255)`, Full name of the category.
- **short_name**: `VARCHAR(255)`, Short name of the category.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was updated.

---

### Table: tool_recyclebin_courses

A list of items in the course recycle bin.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course.
- **module_id**: `BIGINT(19)`, ID of the module.
- **name**: `VARCHAR(255)`, Name of the item.
- **section_id**: `BIGINT(19)`, Section ID.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was updated.
