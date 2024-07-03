### Table: reportbuilder_audiences

Defines report audience.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **class_name**: `VARCHAR(255)`, The class name for the audience.
- **config_data**: `TEXT`, Configuration data for the audience.
- **heading**: `VARCHAR(255)`, Heading for the audience.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_audience ON reportbuilder_audience(report_id);`

---

### Table: reportbuilder_columns

Represents a report column.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **aggregation**: `VARCHAR(32)`, The aggregation type for the column.
- **column_order**: `INTEGER`, Order of the column.
- **heading**: `VARCHAR(255)`, Heading for the column.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **sort_direction**: `BOOLEAN`, Direction for sorting.
- **sort_enabled**: `BOOLEAN` DEFAULT FALSE, Indicates whether sorting is enabled.
- **sort_order**: `INTEGER`, Order for sorting.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the column.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_column ON reportbuilder_column(report_id);`
- `CREATE INDEX idx_user_id_column ON reportbuilder_column(user_id);`
- `CREATE INDEX idx_user_modified_column ON reportbuilder_column(user_modified);`

---

### Table: reportbuilder_filters

Represents a report filter/condition.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **filter_order**: `INTEGER`, Order of the filter.
- **heading**: `VARCHAR(255)`, Heading for the filter.
- **is_condition**: `BOOLEAN` DEFAULT FALSE, Indicates whether the filter is a condition.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the filter.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_filter ON reportbuilder_filter(report_id);`
- `CREATE INDEX idx_user_id_filter ON reportbuilder_filter(user_id);`
- `CREATE INDEX idx_user_modified_filter ON reportbuilder_filter(user_modified);`

---

### Table: reportbuilder_reports

Represents a report.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **area**: `VARCHAR(100)`, Area to which the report belongs.
- **component**: `VARCHAR(100)`, Component that the report is part of.
- **condition_data**: `TEXT`, Condition data for the report.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context.
- **item_id**: `BIGINT`, ID of the item.
- **name**: `VARCHAR(255)`, Name of the report.
- **settings_data**: `TEXT`, Settings data for the report.
- **source**: `VARCHAR(255)`, Source of the report.
- **type**: `SMALLINT`, Type of the report.
- **unique_rows**: `BOOLEAN` DEFAULT FALSE, Indicates whether the report has unique rows.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_context_id_report ON reportbuilder_report(context_id);`
- `CREATE INDEX idx_user_id_report ON reportbuilder_report(user_id);`
- `CREATE INDEX idx_user_modified_report ON reportbuilder_report(user_modified);`

---

### Table: reportbuilder_schedules

Represents a report schedule.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **audiences**: `TEXT`, Audiences for the schedule.
- **enabled**: `BOOLEAN` DEFAULT TRUE, Indicates whether the schedule is enabled.
- **format**: `VARCHAR(255)`, Format of the schedule.
- **message**: `TEXT`, Message for the schedule.
- **message_format**: `BIGINT`, Format of the message.
- **name**: `VARCHAR(255)`, Name of the schedule.
- **recurrence**: `BIGINT`, Recurrence interval of the schedule.
- **report_empty**: `BOOLEAN` DEFAULT FALSE, Indicates whether the report is empty.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **subject**: `VARCHAR(255)`, Subject of the schedule.
- **time_last_sent**: `TIMESTAMP`, Timestamp of when the schedule was last sent.
- **time_next_send**: `TIMESTAMP`, Timestamp of when the schedule will next be sent.
- **time_scheduled**: `TIMESTAMP`, Timestamp of when the schedule is set.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **user_view_as**: `BIGINT`, ID of the user viewing as.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_schedule ON reportbuilder_schedule(report_id);`
- `CREATE INDEX idx_user_id_schedule ON reportbuilder_schedule(user_id);`
- `CREATE INDEX idx_user_modified_schedule ON reportbuilder_schedule(user_modified);`
