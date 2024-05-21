# Filter Dash

## Tables

List of Tables with their function described below:

### Table: filter_active

#### Description

The `filter_active` table stores information about which filters are active in specific contexts within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **active**: `SMALLINT(5)`, Indicates whether the filter is active in the given context. Possible values:, `+1`: On, `-1`: Off, No row with this contextid: Inherit, `-9999` (when contextid points to the system context): Filter is completely disabled.
- **context_id**: `BIGINT(19)`, References the `id` field in the `context` table, indicating the context in which the filter is active.
- **filter**: `VARCHAR(32)`, The internal name of the filter (e.g., 'tex').
- **sort_order**: `BIGINT(19)`, The order in which filters should be applied. Only relevant if `contextid` points to the system context. In other cases, this field should contain `0`.

### Table: filter_config

#### Description

The `filter_config` table stores per-context configuration settings for filters in Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, References the `id` field in the `context` table, indicating the context for the filter configuration.
- **filter**: `VARCHAR(32)`, The internal name of the filter (e.g., 'tex').
- **name**: `VARCHAR(255)`, The configuration variable name for the filter.
- **value**: `LONGTEXT`, The corresponding configuration variable value for the filter.
