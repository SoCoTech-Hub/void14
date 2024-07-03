### Table: licenses

Stores information about licenses used, including custom licenses and core licenses.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the license.
- **custom**: `BIT(1)`, Flag indicating whether the license is custom (`1`) or a core license (`0`). Custom licenses can be updated or deleted, while core licenses cannot.
- **enabled**: `BIT(1)`, Flag indicating whether the license is enabled (`1`) or not (`0`).
- **full_name**: `LONGTEXT` (nullable), Full name or description of the license.
- **short_name**: `VARCHAR(255)` (nullable), Short name or abbreviation of the license.
- **sort_order**: `MEDIUMINT(7)`, Sort order of the license.
- **source**: `VARCHAR(255)` (nullable), Source or origin of the license.
- **version**: `BIGINT(19)`, Version number of the license.

---

This schema should provide a comprehensive structure for managing licenses within the system. If you need further details or have specific requirements for how licenses should be managed, feel free to let me know!
