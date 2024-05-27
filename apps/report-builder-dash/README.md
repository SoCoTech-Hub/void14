### Table: reportbuilder_audience

Defines report audience.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **class_name**: `VARCHAR(255)`, The class name for the audience.
- **config_data**: `LONGTEXT(2147483647)`, Configuration data for the audience.
- **heading**: `VARCHAR(255)`, Heading for the audience.
- **report_id**: `BIGINT(19)`, Foreign key to the report.
- **user_modified**: `BIGINT(19)`, Foreign key to the user who last modified the record.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user who created the record.

---

### Table: reportbuilder_column

Represents a report column.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **aggregation**: `VARCHAR(32)`, The aggregation type for the column.
- **column_order**: `BIGINT(19)`, Order of the column.
- **heading**: `VARCHAR(255)`, Heading for the column.
- **report_id**: `BIGINT(19)`, Foreign key to the report.
- **sort_direction**: `BIT(1)`, Direction for sorting.
- **sort_enabled**: `BOOLEAN(1)`, Indicates whether sorting is enabled.
- **sort_order**: `BIGINT(19)`, Order for sorting.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the column.
- **user_modified**: `BIGINT(19)`, Foreign key to the user who last modified the record.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user who created the record.

---

### Table: reportbuilder_filter

Represents a report filter/condition.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **filter_order**: `BIGINT(19)`, Order of the filter.
- **heading**: `VARCHAR(255)`, Heading for the filter.
- **is_condition**: `BOOLEAN(1)`, Indicates whether the filter is a condition.
- **report_id**: `BIGINT(19)`, Foreign key to the report.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the filter.
- **user_modified**: `BIGINT(19)`, Foreign key to the user who last modified the record.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user*id***: `BIGINT(19)`, Foreign key to the user who created the record.

---

### Table: reportbuilder_report

Represents a report.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area**: `VARCHAR(100)`, Area to which the report belongs.
- **component**: `VARCHAR(100)`, Component that the report is part of.
- **condition_data**: `LONGTEXT(2147483647)`, Condition data for the report.
- **context_id**: `BIGINT(19)`, Foreign key to the context.
- **item_id**: `BIGINT(19)`, ID of the item.
- **name**: `VARCHAR(255)`, Name of the report.
- **settings_data**: `LONGTEXT(2147483647)`, Settings data for the report.
- **source**: `VARCHAR(255)`, Source of the report.
- **type**: `TINYINT(3)`, Type of the report.
- **unique_rows**: `BOOLEAN(1)`, Indicates whether the report has unique rows.
- **user_modified**: `BIGINT(19)`, Foreign key to the user who last modified the record.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user who created the record.

---

### Table: reportbuilder_schedule

Represents a report schedule.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **audiences**: `LONGTEXT(2147483647)`, Audiences for the schedule.
- **enabled**: `BOOLEAN(1)`, Indicates whether the schedule is enabled.
- **format**: `VARCHAR(255)`, Format of the schedule.
- **message**: `LONGTEXT(2147483647)`, Message for the schedule.
- **message_format**: `BIGINT(19)`, Format of the message.
- **name**: `VARCHAR(255)`, Name of the schedule.
- **recurrence**: `BIGINT(19)`, Recurrence interval of the schedule.
- **report_empty**: `BIGINT(19)`, Indicates whether the report is empty.
- **report_id**: `BIGINT(19)`, Foreign key to the report.
- **subject**: `VARCHAR(255)`, Subject of the schedule.
- **time_last_sent**: `BIGINT(19)`, Timestamp of when the schedule was last sent.
- **time_next_send**: `BIGINT(19)`, Timestamp of when the schedule will next be sent.
- **time_scheduled**: `BIGINT(19)`, Timestamp of when the schedule is set.
- **user_modified**: `BIGINT(19)`, Foreign key to the user who last modified the record.
- **user_view_as**: `BIGINT(19)`, ID of the user viewing as.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user who created the record.
