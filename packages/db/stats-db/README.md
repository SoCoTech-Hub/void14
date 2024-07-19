### Table: stats_dailies

To accumulate daily stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.

---

### Table: stats_monthlies

To accumulate monthly stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.

---

### Table: stats_user_dailies

To accumulate daily stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_user_monthlies

To accumulate monthly stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_user_weeklies

To accumulate weekly stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_weeklies

To accumulate weekly stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
