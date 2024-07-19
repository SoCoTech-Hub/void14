# Data Management

## Tables

This README provides an overview of the tables in the Data Management application, along with their fields and functions.

### Table: data **

This table stores all database activities.

#### Fields

- **id**: BIGINT(19)
- **add_template**: LONGTEXT(2147483647)
- **approval**: SMALLINT(5) \* Default: 0.
- **assessed**: BIGINT(19) \* Default: 0.
- **assess_time_finish**: BIGINT(19) \* Default: 0.
- **assess_time_start**: BIGINT(19) \* Default: 0.
- **comments**: SMALLINT(5) \* Default: 0.
- **completion_entries**: BIGINT(19) \* Default: 0. Number of entries required for completion.
- **config**: LONGTEXT(2147483647)
- **course**: BIGINT(19)
- **css_template**: LONGTEXT(2147483647)
- **default_sort**: BIGINT(19) \* Default: 0.
- **default_sort_dir**: SMALLINT(5) \* Default: 0.
- **edit_any**: SMALLINT(5) \* Default: 0.
- **intro**: LONGTEXT(2147483647)
- **intro_format**: SMALLINT(5) \* Default: 0.
- **js_template**: LONGTEXT(2147483647)
- **list_template**: LONGTEXT(2147483647)
- **list_template_footer**: LONGTEXT(2147483647)
- **list_template_header**: LONGTEXT(2147483647)
- **manage_approved**: SMALLINT(5) \* Default: 1.
- **max_entries**: INT(10) \* Default: 0.
- **name**: VARCHAR(255)
- **notification**: BIGINT(19) \* Default: 0. Notify people when things change.
- **required_entries**: INT(10) \* Default: 0.
- **required_entries_to_view**: INT(10) \* Default: 0.
- **rss_articles**: SMALLINT(5) \* Default: 0.
- **rss_template**: LONGTEXT(2147483647)
- **rss_title_template**: LONGTEXT(2147483647)
- **scale**: BIGINT(19) \* Default: 0.
- **search_template**: LONGTEXT(2147483647)
- **single_template**: LONGTEXT(2147483647)
- **time_available_from**: BIGINT(19) \* Default: 0.
- **time_available_to**: BIGINT(19) \* Default: 0.
- **time_view_from**: BIGINT(19) \* Default: 0.
- **time_view_to**: BIGINT(19) \* Default: 0.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* The time the settings for this database module instance were last modified.

### Table: data_content **

This table stores the content introduced in each record/field.

#### Fields

- **id**: BIGINT(19)
- **content**: LONGTEXT(2147483647)
- **content1**: LONGTEXT(2147483647)
- **content2**: LONGTEXT(2147483647)
- **content3**: LONGTEXT(2147483647)
- **content4**: LONGTEXT(2147483647)
- **field_id**: BIGINT(19)
- **record_id**: BIGINT(19)

### Table: data_fields **

This table stores every field available in the database activities.

#### Fields

- **id**: BIGINT(19)
- **data_id**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **name**: VARCHAR(255)
- **param1**: LONGTEXT(2147483647)
- **param10**: LONGTEXT(2147483647)
- **param2**: LONGTEXT(2147483647)
- **param3**: LONGTEXT(2147483647)
- **param4**: LONGTEXT(2147483647)
- **param5**: LONGTEXT(2147483647)
- **param6**: LONGTEXT(2147483647)
- **param7**: LONGTEXT(2147483647)
- **param8**: LONGTEXT(2147483647)
- **param9**: LONGTEXT(2147483647)
- **required**: BIT(1) \* Default: 0. Required fields must have a value when inserted by a user.
- **type**: VARCHAR(255)

### Table: data_records **

This table stores every record introduced in the database activities.

#### Fields

- **id**: BIGINT(19)
- **approved**: SMALLINT(5) \* Default: 0.
- **data_id**: BIGINT(19)
- **group_id**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19)
