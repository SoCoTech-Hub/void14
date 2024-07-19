### Table: urls

Each record is one URL resource.
This table stores information about URL resources, including their associated courses, display options, introduction text, and any parameters related to the URL.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this URL resource is part of.
- **display**: `SMALLINT(5)`, Display type for the URL resource.
- **display_options**: `LONGTEXT(2147483647)`, Options for displaying the URL.
- **external_url**: `LONGTEXT(2147483647)`, The actual URL being referenced.
- **intro**: `LONGTEXT(2147483647)`, Introduction or description of the URL resource.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **name**: `VARCHAR(255)`, Name of the URL resource.
- **parameters**: `LONGTEXT(2147483647)`, Parameters associated with the URL.
- **created_at**: `BIGINT(19)`, Timestamp of when this URL resource was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when this URL resource was last modified.

---
