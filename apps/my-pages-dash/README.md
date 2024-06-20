### Table: my_pages

This table stores extra user pages for the My Moodle system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the page.
- **name**: `VARCHAR(200)`, The name of the page (freeform text).
- **private**: `BIT(1)`, Indicates whether the page is private (`1`, dashboard) or public (`0`, profile).
- **sort_order**: `MEDIUMINT(7)`, The order of the pages for a user.
- **userid**: `BIGINT(19)`, The user who owns this page or `0` for system defaults.
