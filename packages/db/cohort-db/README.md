# Cohort Management

## Tables

This README provides an overview of the tables in the Cohort Management application, along with their fields and functions.

### Table: cohort

This table stores each cohort (aka site-wide group).

#### Fields

- **component**: VARCHAR(100) \* Component (plugintype_pluginname) that manages the cohort, manual modifications are allowed only when set to NULL.
- **contextid**: BIGINT(19) \* Context is usually ignored in sync operations so that the cohorts may be moved freely around in the context tree without any side effects.
- **description**: LONGTEXT(2147483647) \* Standard description text box.
- **descriptionformat**: TINYINT(3)
- **id**: BIGINT(19)
- **idnumber**: VARCHAR(100) \* Unique identifier of a cohort, useful especially for mapping to external entities.
- **name**: VARCHAR(254) \* Short human readable name for the cohort, does not have to be unique.
- **theme**: VARCHAR(50)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **visible**: BIT(1) \* Default: 1. Visibility to teachers.

### Table: cohort_members

This table links a user to a cohort.

#### Fields

- **cohortid**: BIGINT(19)
- **id**: BIGINT(19)
- **timeadded**: BIGINT(19)
- **userid**: BIGINT(19)
