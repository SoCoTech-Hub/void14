# Backup Management

## Tables

This README provides an overview of the tables in the Backup Management application, along with their fields and functions.

### Table: backup_controllers

This table stores the backup controllers as they are used.

#### Fields

- **backupid**: VARCHAR(32) \* Unique ID of the backup.
- **checksum**: VARCHAR(32) \* Checksum of the backup_controller object.
- **controller**: LONGTEXT(2147483647) \* Serialized backup_controller object.
- **execution**: SMALLINT(5) \* Type of execution (immediate/delayed).
- **executiontime**: BIGINT(19) \* Epoch seconds when the backup should be executed (for delayed backups only).
- **format**: VARCHAR(20) \* Format of the backup (Moodle/IMSCC).
- **id**: BIGINT(19)
- **interactive**: SMALLINT(5) \* Is the backup interactive (1-yes/0-no).
- **itemid**: BIGINT(19) \* ID of the module/section/activity being backed up.
- **operation**: VARCHAR(20) \* Type of operation (backup/restore).
- **progress**: DECIMAL(15) \* The backup or restore progress as a floating point number.
- **purpose**: SMALLINT(5) \* Purpose (target) of the backup (general, import, hub).
- **status**: SMALLINT(5) \* Current status of the backup (configured, UI, running).
- **created_at**: BIGINT(19) \* Time the controller was created.
- **updated_at**: BIGINT(19) \* Last time the controller was modified.
- **type**: VARCHAR(10) \* Type of the backup (activity/section/course).
- **userid**: BIGINT(19) \* User that owns/performs the backup.

### Table: backup_courses

This table stores every course backup status.

#### Fields

- **courseid**: BIGINT(19)
- **id**: BIGINT(19)
- **lastendtime**: BIGINT(19)
- **laststarttime**: BIGINT(19)
- **laststatus**: VARCHAR(1)
- **nextstarttime**: BIGINT(19)

### Table: backup_logs

This table stores all the logs from backup and restore operations.

#### Fields

- **backupid**: VARCHAR(32) \* Backup ID the log record belongs to.
- **id**: BIGINT(19)
- **loglevel**: SMALLINT(5) \* Level of the log (debug/error).
- **message**: LONGTEXT(2147483647) \* Text logged.
- **created_at**: BIGINT(19) \* Timestamp this log entry was created.
