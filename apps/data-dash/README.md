# Data Management

## Tables

This README provides an overview of the tables in the Data Management application, along with their fields and functions.

### Table: data

This table stores all database activities.

#### Fields

- **id**: BIGINT(19)
- **addtemplate**: LONGTEXT(2147483647)
- **approval**: SMALLINT(5) \* Default: 0.
- **asearchtemplate**: LONGTEXT(2147483647)
- **assessed**: BIGINT(19) \* Default: 0.
- **assesstimefinish**: BIGINT(19) \* Default: 0.
- **assesstimestart**: BIGINT(19) \* Default: 0.
- **comments**: SMALLINT(5) \* Default: 0.
- **completionentries**: BIGINT(19) \* Default: 0. Number of entries required for completion.
- **config**: LONGTEXT(2147483647)
- **course**: BIGINT(19)
- **csstemplate**: LONGTEXT(2147483647)
- **defaultsort**: BIGINT(19) \* Default: 0.
- **defaultsortdir**: SMALLINT(5) \* Default: 0.
- **editany**: SMALLINT(5) \* Default: 0.
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 0.
- **jstemplate**: LONGTEXT(2147483647)
- **listtemplate**: LONGTEXT(2147483647)
- **listtemplatefooter**: LONGTEXT(2147483647)
- **listtemplateheader**: LONGTEXT(2147483647)
- **manageapproved**: SMALLINT(5) \* Default: 1.
- **maxentries**: INT(10) \* Default: 0.
- **name**: VARCHAR(255)
- **notification**: BIGINT(19) \* Default: 0. Notify people when things change.
- **requiredentries**: INT(10) \* Default: 0.
- **requiredentriestoview**: INT(10) \* Default: 0.
- **rssarticles**: SMALLINT(5) \* Default: 0.
- **rsstemplate**: LONGTEXT(2147483647)
- **rsstitletemplate**: LONGTEXT(2147483647)
- **scale**: BIGINT(19) \* Default: 0.
- **singletemplate**: LONGTEXT(2147483647)
- **timeavailablefrom**: BIGINT(19) \* Default: 0.
- **timeavailableto**: BIGINT(19) \* Default: 0.
- **timeviewfrom**: BIGINT(19) \* Default: 0.
- **timeviewto**: BIGINT(19) \* Default: 0.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* The time the settings for this database module instance were last modified.

### Table: data_content

This table stores the content introduced in each record/field.

#### Fields

- **id**: BIGINT(19)
- **content**: LONGTEXT(2147483647)
- **content1**: LONGTEXT(2147483647)
- **content2**: LONGTEXT(2147483647)
- **content3**: LONGTEXT(2147483647)
- **content4**: LONGTEXT(2147483647)
- **fieldid**: BIGINT(19)
- **recordid**: BIGINT(19)

### Table: data_fields

This table stores every field available in the database activities.

#### Fields

- **id**: BIGINT(19)
- **dataid**: BIGINT(19)
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

### Table: data_records

This table stores every record introduced in the database activities.

#### Fields

- **id**: BIGINT(19)
- **approved**: SMALLINT(5) \* Default: 0.
- **dataid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **userid**: BIGINT(19)
