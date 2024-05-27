# Tool Brickfield Dash

## Tables

List of Tables with their function described below:

### Table: tool_brickfield_areas

Areas that have been checked for accessibility problems.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **cmid**: `BIGINT(19)`, ID of the course module.
- **component**: `VARCHAR(100)`, The component the area belongs to.
- **context_id**: `BIGINT(19)`, ID of the context.
- **course_id**: `BIGINT(19)`, ID of the course.
- **field_or_area**: `VARCHAR(50)`, Field or area name.
- **file_name**: `VARCHAR(1333)`, file_name if applicable.
- **item_id**: `BIGINT(19)`, ID of the item.
- **ref_id**: `BIGINT(19)`, Reference ID.
- **ref_table**: `VARCHAR(40)`, Reference table name.
- **table_name**: `VARCHAR(40)`, Table name.
- **type**: `TINYINT(3)`, Type of area.

---

### Table: tool_brickfield_cache_acts

Contains accessibility summary information per activity.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(64)`, Component name.
- **course_id**: `BIGINT(19)`, Course ID.
- **error_count**: `BIGINT(19)`, Number of errors.
- **failed_activities**: `BIGINT(19)`, Number of failed activities.
- **passed_activities**: `BIGINT(19)`, Number of passed activities.
- **status**: `BIT(1)`, Status of the activity.
- **total_activities**: `BIGINT(19)`, Total number of activities.

---

### Table: tool_brickfield_cache_checks

Contains accessibility summary information per check.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **check_count**: `BIGINT(19)`, Number of checks.
- **check_id**: `BIGINT(19)`, ID of the check.
- **course_id**: `BIGINT(19)`, Course ID.
- **error_count**: `BIGINT(19)`, Number of errors.
- **status**: `BIT(1)`, Status of the check.

---

### Table: tool_brickfield_checks

Checks details.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **check_group**: `BIGINT(19)`, The group category identifier.
- **check_type**: `VARCHAR(64)`, Type of check.
- **severity**: `TINYINT(3)`, Severity of the check.
- **short_name**: `VARCHAR(64)`, Short name of the check.
- **status**: `SMALLINT(5)`, Status of the check.

---

### Table: tool_brickfield_contents

Content of an area at a particular time (recognized by a hash).

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area_id**: `BIGINT(19)`, ID of the area.
- **content_hash**: `VARCHAR(40)`, Hash of the content.
- **is_current**: `BOOLEAN(1)`, Indicates if the content is current.
- **status**: `TINYINT(3)`, Status of the content (0 - needs checking, -1 - in progress, 1 - checked).
- **created_at**: `BIGINT(19)`, Time the content was created.
- **updated_at**: `BIGINT(19)`, Time the content was checked.

---

### Table: tool_brickfield_errors

Errors during the accessibility checks.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **error_data**: `LONGTEXT(2147483647)`, Data about the error.
- **html_code**: `LONGTEXT(2147483647)`, HTML code related to the error.
- **line_number**: `BIGINT(19)`, Line number where the error occurred.
- **result_id**: `BIGINT(19)`, ID of the related result.

---

### Table: tool_brickfield_process

Queued records to initiate new processing of specific targets.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID.
- **course_id**: `BIGINT(19)`, Course ID.
- **inner_context_id**: `BIGINT(19)`, Inner context ID.
- **item**: `VARCHAR(64)`, Item for process action.
- **created_at**: `BIGINT(19)`, Time the process was created.
- **updated_at**: `BIGINT(19)`, Time the process was completed.

---

### Table: tool_brickfield_results

Results of the accessibility checks.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **check_id**: `BIGINT(19)`, ID of the check.
- **content_id**: `BIGINT(19)`, Content ID.
- **error_count**: `BIGINT(19)`, Number of errors.

---

### Table: tool_brickfield_schedule

Keeps the per course content analysis schedule.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the specific context record.
- **context_level**: `BIGINT(19)`, The context level for this item. Defaults to CONTEXT_COURSE.
- **instance_id**: `BIGINT(19)`, ID of the specific context instance. Course ID for courses.
- **status**: `TINYINT(3)`, The schedule status for this item. 0 = not requested; 1 = requested; 2 = analyzed.
- **created_at**: `BIGINT(19)`, The most recent time the item was analyzed by scheduler.
- **updated_at**: `BIGINT(19)`, Time stamp of the last record update.

---

### Table: tool_brickfield_summary

Contains accessibility check results summary information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **activities**: `BIGINT(19)`, Number of activities.
- **activities_failed**: `BIGINT(19)`, Number of failed activities.
- **activities_passed**: `BIGINT(19)`, Number of passed activities.
- **course_id**: `BIGINT(19)`, Course ID.
- **errors_check_type1**: `BIGINT(19)`, Number of errors of check type 1.
- **errors_check_type2**: `BIGINT(19)`, Number of errors of check type 2.
- **errors_check_type3**: `BIGINT(19)`, Number of errors of check type 3.
- **errors_check_type4**: `BIGINT(19)`, Number of errors of check type 4.
- **errors_check_type5**: `BIGINT(19)`, Number of errors of check type 5.
- **errors_check_type6**: `BIGINT(19)`, Number of errors of check type 6.
- **errors_check_type7**: `BIGINT(19)`, Number of errors of check type 7.
- **failed_check_type1**: `BIGINT(19)`, Number of failed checks of type 1.
- **failed_check_type2**: `BIGINT(19)`, Number of failed checks of type 2.
- **failed_check_type3**: `BIGINT(19)`, Number of failed checks of type 3.
- **failed_check_type4**: `BIGINT(19)`, Number of failed checks of type 4.
- **failed_check_type5**: `BIGINT(19)`, Number of failed checks of type 5.
- **failed_check_type6**: `BIGINT(19)`, Number of failed checks of type 6.
- **failed_check_type7**: `BIGINT(19)`, Number of failed checks of type 7.
- **percent_check_type1**: `BIGINT(19)`, Percentage of checks passed of type 1.
- **percent_check_type2**: `BIGINT(19)`, Percentage of checks passed of type 2.
- **percent_check_type3**: `BIGINT(19)`, Percentage of checks passed of type 3.
- **percent_check_type4**: `BIGINT(19)`, Percentage of checks passed of type 4.
- **percent_check_type5**: `BIGINT(19)`, Percentage of checks passed of type 5.
- **percent_check_type6**: `BIGINT(19)`, Percentage of checks passed of type 6.
- **percent_check_type7**: `BIGINT(19)`, Percentage of checks passed of type 7.
- **status**: `BIT(1)`, Status of the summary.
