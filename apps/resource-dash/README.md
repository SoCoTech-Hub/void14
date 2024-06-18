### Table: resources

Each record represents a resource and its configuration data.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **course_id**: `BIGINT` NOT NULL, Foreign key reference to the course this resource is part of.
- **display**: `BOOLEAN` NOT NULL, Display settings for the resource.
- **display_options**: `TEXT`, Display options for the resource.
- **filter_files**: `SMALLINT` NOT NULL, Filter files settings.
- **intro**: `TEXT`, Introduction text for the resource.
- **intro_format**: `SMALLINT` NOT NULL, Format of the introduction text.
- **legacy_files**: `SMALLINT` NOT NULL, Settings for legacy files.
- **legacy_files_last**: `BIGINT`, Timestamp of the last legacy file.
- **name**: `VARCHAR(255)` NOT NULL, Name of the resource.
- **revision**: `BIGINT` NOT NULL, Revision number of the resource, incremented when a file changes to solve browser caching issues.
- **to_be_migrated**: `BOOLEAN` NOT NULL, Indicator if the resource is to be migrated.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.

---

### Table: resource_olds

Backup of all old resource instances from version 1.9.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **all_text**: `TEXT`, Text of the old resource.
- **cm_id**: `BIGINT`, Foreign key reference to the course module ID.
- **course_id**: `BIGINT` NOT NULL, Foreign key reference to the course this old resource is part of.
- **intro**: `TEXT`, Introduction text for the old resource.
- **intro_format**: `SMALLINT` NOT NULL, Format of the introduction text.
- **migrated**: `BOOLEAN` NOT NULL, Indicator if the old resource has been migrated.
- **name**: `VARCHAR(255)` NOT NULL, Name of the old resource.
- **new_id**: `BIGINT`, New ID for the migrated resource.
- **new_module**: `VARCHAR(50)`, New module name for the migrated resource.
- **old_id**: `BIGINT`, Old ID for the resource.
- **type**: `VARCHAR(30)`, Type of the old resource.
- **reference**: `VARCHAR(255)`, Reference for the old resource.
- **options**: `VARCHAR(255)`, Options for the old resource.
- **popup**: `TEXT`, Popup settings for the old resource.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.
