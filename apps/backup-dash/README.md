# Backup - Dash

Backups of courses

## Tables

List of Tables with their function described below:

### backup_controllers

To store the backup_controllers as they are used

#### Fields

- id
- backup_id \* unique id of the backup
- checksum \* checksum of the backup_controller object
- controller \* serialised backup_controller object
- execution \* type of execution (immediate/delayed)
- execution_time \* epoch secs when the backup should be executed (for delayed backups only)
- format \* format of the backup (moodle/imscc…)
- interactive \* is the backup interactive (1-yes/0-no)
- item_id \* id of the module/section/activity being backup
- operation \* backup Type of operation (backup/restore)
- progress \* The backup or restore progress as a floating point number
- purpose \* purpose (target) of the backup (general, import, hub…)
- status \* current status of the backup (configured, ui, running…)
- type \* Type of the backup (activity/section/course)
- created_at \* time the controller was created
- updated_at \* last time the controller was modified
- user_id \* user that owns/performs the backup

### backup_courses

To store every course backup status

#### Fields

- id
- course_id
- last_status
- last_start_time
- last_end_time
- next_start_time

### backup_logs

To store all the logs from backup and restore operations

#### Fields

- id
- backup_id \* backupid the log record belongs to
- log_level \* level of the log (debug…error)
- message \* text logged
- created_at \* timestamp this log entry was created
- updated_at
