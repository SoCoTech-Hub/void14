### Table: upgrade_logs

This table records detailed information about upgrade processes, including any backtraces, details, and information about the plugin and version involved in the upgrade. It categorizes log entries by type and associates them with specific users and timestamps.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **backtrace**: `LONGTEXT(2147483647)`, Detailed backtrace information.
- **details**: `LONGTEXT(2147483647)`, Detailed log information.
- **info**: `VARCHAR(255)`, General information about the upgrade log entry.
- **plugin**: `VARCHAR(100)`, The plugin related to this upgrade log entry.
- **target_version**: `VARCHAR(100)`, Version of the plugin or core specified in version.php at the time of upgrade logging.
- **type**: `BIGINT(19)`, Type of log entry: 0 = info, 1 = notice, 2 = error.
- **version**: `VARCHAR(100)`, The plugin or main version if known.
- **created_at**: `BIGINT(19)`, Timestamp of when this log entry was created.
- **updates_at**: `BIGINT(19)`, Timestamp of when this log entry was last modified.
- **userid**: `BIGINT(19)`, ID of the user associated with this log entry.
