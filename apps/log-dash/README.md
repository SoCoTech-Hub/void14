### Table: log_display

#### Description

Specifies a Moodle table and field for a particular module/action.

#### Fields

- **action**: `VARCHAR(40)`, Specifies the action performed.
- **component**: `VARCHAR(100)`, Specifies the owner of the log action.
- **field**: `VARCHAR(200)`, Specifies the field of the table.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the entry.
- **module**: `VARCHAR(20)`, Module related to the action.
- **mtable**: `VARCHAR(30)`, Moodle table associated with the action.

---

### Table: log_queries

#### Description

Logged database queries.

#### Fields

- **backtrace**: `LONGTEXT`, PHP execution trace.
- **error**: `MEDIUMINT(7)`, Indicates if there was an error.
- **exectime**: `DECIMAL(10)`, Query execution time in seconds as a float.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **info**: `LONGTEXT`, Detailed information such as error text.
- **qtype**: `MEDIUMINT(7)`, Query type constant.
- **sqlparams**: `LONGTEXT`, Query parameters.
- **sqltext**: `LONGTEXT`, Query SQL.
- **timelogged**: `BIGINT(19)`, Timestamp when log info was stored into the database.

---

### Table: logstore_standard_log

#### Description

Standard log table.

#### Fields

- **action**: `VARCHAR(100)`, Specifies the action performed.
- **anonymous**: `BIT(1)`, Indicates if the event was anonymous at the time of triggering.
- **component**: `VARCHAR(100)`, Specifies the component related to the action.
- **contextid**: `BIGINT(19)`, Context ID associated with the action.
- **contextinstanceid**: `BIGINT(19)`, Context instance ID associated with the action.
- **contextlevel**: `BIGINT(19)`, Context level associated with the action.
- **courseid**: `BIGINT(19)`, Course ID associated with the action.
- **crud**: `VARCHAR(1)`, Specifies the CRUD operation performed.
- **edulevel**: `BIT(1)`, Educational level associated with the action.
- **eventname**: `VARCHAR(255)`, Name of the event.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **ip**: `VARCHAR(45)`, IP address associated with the action.
- **objectid**: `BIGINT(19)`, Object ID associated with the action.
- **objecttable**: `VARCHAR(50)`, Table name associated with the object.
- **origin**: `VARCHAR(10)`, Specifies the origin of the action (e.g., CLI, cron, WS).
- **other**: `LONGTEXT`, Additional information related to the action.
- **realuserid**: `BIGINT(19)`, Real user ID when logged in as another user.
- **relateduserid**: `BIGINT(19)`, Related user ID associated with the action.
- **target**: `VARCHAR(100)`, Target related to the action.
- **timecreated**: `BIGINT(19)`, Timestamp of when the log entry was created.
- **userid**: `BIGINT(19)`, User ID associated with the action.

---

These tables play a crucial role in logging various activities within the Moodle system, such as user actions, database queries, and standard event logs. If you need further clarification on any specific aspect of logging or have additional questions, feel free to ask!
