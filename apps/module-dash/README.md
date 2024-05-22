### Table: modules

This table stores information about the modules available on the site.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the module.
- **cron**: `BIGINT(19)`, The interval in seconds between cron executions for this module.
- **lastcron**: `BIGINT(19)`, The timestamp of the last cron execution for this module.
- **name**: `VARCHAR(20)`, The name of the module.
- **search**: `VARCHAR(255)`, Search path for the module.
- **visible**: `BIT(1)`, Indicates whether the module is visible (`1`) or not (`0`).
