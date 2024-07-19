### Table: page

Each record represents a page and its configuration data in the system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the page.
- **content**: `LONGTEXT(2147483647)` (Nullable), The content of the page.
- **content_format**: `SMALLINT(5)`, Format of the content (e.g., HTML, plain text).
- **course_id**: `BIGINT(19)`, The ID of the course this page belongs to.
- **display**: `SMALLINT(5)`, Display settings for the page.
- **display_options**: `LONGTEXT(2147483647)` (Nullable), Options for displaying the page.
- **intro**: `LONGTEXT(2147483647)` (Nullable), Introduction or description for the page.
- **intro_format**: `SMALLINT(5)`, Format of the intro field (e.g., HTML, plain text).
- **legacy_files**: `SMALLINT(5)`, Legacy file handling settings.
- **legacy_files_last**: `BIGINT(19)` (Nullable), Timestamp of the last legacy file modification.
- **name**: `VARCHAR(255)`, The name of the page.
- **revision**: `BIGINT(19)`, Incremented each time the file changes, used to solve browser caching issues.
- **created_at**: `BIGINT(19)`, Timestamp of the creation of the page.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the page.
