### Table: log_displays **

#### Description

Specifies a Moodle table and field for a particular module/action.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the entry.
- **action**: `VARCHAR(40)`, Specifies the action performed.
- **component**: `VARCHAR(100)`, Specifies the owner of the log action.
- **field**: `VARCHAR(200)`, Specifies the field of the table.
- **module**: `VARCHAR(20)`, Module related to the action.
- **m_table**: `VARCHAR(30)`, Moodle table associated with the action.

---

### Table: log_queries **

#### Description

Logged database queries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **back_trace**: `LONGTEXT`, PHP execution trace.
- **error**: `MEDIUMINT(7)`, Indicates if there was an error.
- **exec_time**: `DECIMAL(10)`, Query execution time in seconds as a float.
- **info**: `LONGTEXT`, Detailed information such as error text.
- **q_type**: `MEDIUMINT(7)`, Query type constant.
- **sql_params**: `LONGTEXT`, Query parameters.
- **sql_text**: `LONGTEXT`, Query SQL.
- **time_logged**: `BIGINT(19)`, Timestamp when log info was stored into the database.

---

### Table: logstore_standard_logs **

#### Description

Standard log table.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **action**: `VARCHAR(100)`, Specifies the action performed.
- **anonymous**: `BIT(1)`, Indicates if the event was anonymous at the time of triggering.
- **component**: `VARCHAR(100)`, Specifies the component related to the action.
- **context_id**: `BIGINT(19)`, Context ID associated with the action.
- **context_instance_id**: `BIGINT(19)`, Context instance ID associated with the action.
- **context_level**: `BIGINT(19)`, Context level associated with the action.
- **course_id**: `BIGINT(19)`, Course ID associated with the action.
- **crud**: `VARCHAR(1)`, Specifies the CRUD operation performed.
- **edu_level**: `BIT(1)`, Educational level associated with the action.
- **event_name**: `VARCHAR(255)`, Name of the event.
- **ip**: `VARCHAR(45)`, IP address associated with the action.
- **object_id**: `BIGINT(19)`, Object ID associated with the action.
- **object_table**: `VARCHAR(50)`, Table name associated with the object.
- **origin**: `VARCHAR(10)`, Specifies the origin of the action (e.g., CLI, cron, WS).
- **other**: `LONGTEXT`, Additional information related to the action.
- **real_user_id**: `BIGINT(19)`, Real user ID when logged in as another user.
- **related_user_id**: `BIGINT(19)`, Related user ID associated with the action.
- **target**: `VARCHAR(100)`, Target related to the action.
- **time_created**: `BIGINT(19)`, Timestamp of when the log entry was created.
- **user_id**: `BIGINT(19)`, User ID associated with the action.

---

These tables play a crucial role in logging various activities within the Moodle system, such as user actions, database queries, and standard event logs. If you need further clarification on any specific aspect of logging or have additional questions, feel free to ask!
