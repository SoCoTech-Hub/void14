### Table: resource

Each record is one resource and its config data.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this resource is part of.
- **display**: `BOOLEAN(1)`, Display settings for the resource.
- **display_options**: `LONGTEXT(2147483647)`, Display options for the resource.
- **filter_files**: `SMALLINT(5)`, Filter files settings.
- **intro**: `LONGTEXT(2147483647)`, Introduction text for the resource.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **legacy_files**: `SMALLINT(5)`, Settings for legacy files.
- **legacy_files_last**: `BIGINT(19)`, Timestamp of the last legacy file.
- **name**: `VARCHAR(255)`, Name of the resource.
- **revision**: `BIGINT(19)`, Revision number of the resource, incremented when a file changes to solve browser caching issues.
- **to_be_migrated**: `BOOLEAN(1)`, Indicator if the resource is to be migrated.
- **created_at**: `BIGINT(19)`, Created time.
- **updated_at**: `BIGINT(19)`, Last modified time.

---

### Table: resource_old

Backup of all old resource instances from version 1.9.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **all_text**: `LONGTEXT(2147483647)`, Text of the old resource.
- **cm_id**: `BIGINT(19)`, Foreign key reference to the course module ID.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this old resource is part of.
- **intro**: `LONGTEXT(2147483647)`, Introduction text for the old resource.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **migrated**: `BIGINT(19)`, Indicator if the old resource has been migrated.
- **name**: `VARCHAR(255)`, Name of the old resource.
- **new_id**: `BIGINT(19)`, New ID for the migrated resource.
- **new_module**: `VARCHAR(50)`, New module name for the migrated resource.
- **old_id**: `BIGINT(19)`, Old ID for the resource.
- **type**: `VARCHAR(30)`, Type of the old resource.
- **reference**: `VARCHAR(255)`, Reference for the old resource.
- **options**: `VARCHAR(255)`, Options for the old resource.
- **popup**: `LONGTEXT(2147483647)`, Popup settings for the old resource.
- **created_at**: `BIGINT(19)`, Last modified time.
- **updated_at**: `BIGINT(19)`, Last modified time.
