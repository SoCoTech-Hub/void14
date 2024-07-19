# Task Dash

## Tables

List of Tables with their function described below:

### Table: task_adhocs

List of adhoc tasks waiting to run.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **blocking**: `TINYINT(3)`, Indicates if the task blocks others (default 0).
- **classname**: `VARCHAR(255)`, The name of the class extending `adhoc_task` to run when this task is executed.
- **component**: `VARCHAR(255)`, The component that triggered this adhoc task.
- **custom_data**: `LONGTEXT(2147483647)`, Custom data to be passed to the adhoc task, must be serializable using `json_encode()`.
- **fail_delay**: `BIGINT(19)`, Delay before retrying the task after failure.
- **host_name**: `VARCHAR(255)`, Hostname where the task is running.
- **next_runtime**: `BIGINT(19)`, The next scheduled runtime of the task.
- **pid**: `BIGINT(19)`, Process ID that is running the task.
- **created_at**: `BIGINT(19)`, Timestamp of adhoc task creation.
- **updated_at**: `BIGINT(19)`, Time when the task was started.
- **user_id**: `BIGINT(19)`, User ID associated with the task.

---

### Table: task_logs

The log table for all tasks.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **classname**: `VARCHAR(255)`, The class of the task being run.
- **component**: `VARCHAR(255)`, The component that the task belongs to.
- **db_reads**: `BIGINT(19)`, The number of DB reads performed during the task.
- **db_writes**: `BIGINT(19)`, The number of DB writes performed during the task.
- **host_name**: `VARCHAR(255)`, Hostname where the task was executed.
- **output**: `LONGTEXT(2147483647)`, Output of the task.
- **pid**: `BIGINT(19)`, PHP process ID that was running the task.
- **result**: `BOOLEAN(1)`, Whether the task was successful or not. 0 = pass; 1 = fail.
- **type**: `SMALLINT(5)`, The type of task. Scheduled task = 0; Adhoc task = 1.
- **created_at**: `DECIMAL(20)`, The end time of the task.
- **updated_at**: `DECIMAL(20)`, The start time of the task.
- **user_id**: `BIGINT(19)`, The user ID that the task was configured to run as (Adhoc tasks only).

---

### Table: task_schedules

List of scheduled tasks to be run by cron.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **blocking**: `BOOLEAN(1)`, Block the entire cron when this task is running (default 0).
- **classname**: `VARCHAR(255)`, The class extending `scheduled_task` to be called when running this task.
- **component**: `VARCHAR(255)`, The component this scheduled task belongs to.
- **customised**: `TINYINT(3)`, Used on upgrades to prevent overwriting custom schedules (default 0).
- **day**: `VARCHAR(90)`, Day of the month the task should run.
- **day_of_week**: `VARCHAR(25)`, Day of the week the task should run.
- **disabled**: `BOOLEAN(1)`, Indicates if the task is disabled (default 0).
- **fail_delay**: `BIGINT(19)`, Delay before retrying the task after failure.
- **hostname**: `VARCHAR(255)`, Hostname where the task is running.
- **hour**: `VARCHAR(70)`, Hour the task should run.
- **last_runtime**: `BIGINT(19)`, Last runtime of the task.
- **minute**: `VARCHAR(200)`, Minute the task should run.
- **month**: `VARCHAR(30)`, Month the task should run.
- **next_runtime**: `BIGINT(19)`, Next scheduled runtime of the task.
- **pid**: `BIGINT(19)`, PHP process ID that is running the task.
- **time_started**: `BIGINT(19)`, Time when the task was started.
