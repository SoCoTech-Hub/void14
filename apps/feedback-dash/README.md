# Feedback Table Documentation

This README provides an overview of the `feedback` tables, which store feedback data within the Moodle system. These tables track feedback forms, user responses, and related data.

## Tables

### Table: feedback **

#### Description

The `feedback` table contains metadata about feedback forms created within Moodle. Each record represents a single feedback form.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each feedback form.
- **anonymous**: `BIT(1)`, Indicates if the feedback is anonymous (1) or not (0).
- **auto_numbering**: `BIT(1)`, Specifies if items in the feedback are automatically numbered (1) or not (0).
- **completion_submit**: `BIT(1)`, If set to 1, the activity is automatically marked as complete once the user submits their feedback.
- **course**: `BIGINT(19)`, ID of the course associated with the feedback.
- **email_notification**: `BIT(1)`, Indicates if email notifications are sent for this feedback (1) or not (0).
- **intro**: `LONGTEXT`, Introduction or description of the feedback.
- **introformat**: `SMALLINT(5)`, Format of the intro field (e.g., HTML, plain text).
- **multiple_submit**: `BIT(1)`, Indicates if multiple submissions are allowed (1) or not (0).
- **name**: `VARCHAR(255)`, Name of the feedback form.
- **page_after_submit**: `LONGTEXT`, Content displayed after the user submits the feedback.
- **page_after_submit_format**: `TINYINT(3)`, Format of the page_after_submit field.
- **publish_stats**: `BIT(1)`, Indicates if the statistics of the feedback should be published (1) or not (0).
- **site_after_submit**: `VARCHAR(255)`, URL of the site to redirect to after submission.
- **time_close**: `BIGINT(19)`, Timestamp when the feedback closes.
- **time_modified**: `BIGINT(19)`, Timestamp when the feedback was last modified.
- **time_open**: `BIGINT(19)`, Timestamp when the feedback opens.

### Table: feedback_completed **

#### Description

The `feedback_completed` table stores records of completed feedback submissions.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each completed feedback.
- **anonymous_response**: `BIT(1)`, Indicates if the response is anonymous (1) or not (0).
- **course_id**: `BIGINT(19)`, ID of the course associated with the feedback.
- **feedback**: `BIGINT(19)`, ID of the feedback form.
- **random_response**: `BIGINT(19)`, Randomized response identifier.
- **time_modified**: `BIGINT(19)`, Timestamp when the feedback was completed.
- **userid**: `BIGINT(19)`, ID of the user who completed the feedback.

### Table: feedback_completedtmps

#### Description

The `feedback_completedtmp` table temporarily stores records of completed feedback submissions, often used during feedback processing or migration.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each completed feedback.
- **anonymous_response**: `BIT(1)`, Indicates if the response is anonymous (1) or not (0).
- **course_id**: `BIGINT(19)`, ID of the course associated with the feedback.
- **feedback**: `BIGINT(19)`, ID of the feedback form.
- **guest_id**: `VARCHAR(255)`, Guest identifier for anonymous submissions.
- **random_response**: `BIGINT(19)`, Randomized response identifier.
- **time_modified**: `BIGINT(19)`, Timestamp when the feedback was completed.
- **userid**: `BIGINT(19)`, ID of the user who completed the feedback.

### Table: feedback_items  **

#### Description

The `feedback_item` table stores the individual items or questions within a feedback form.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each feedback item.
- **depend_item**: `BIGINT(19)`, ID of the item this item depends on, if any.
- **depend_value**: `VARCHAR(255)`, Value that triggers the dependency.
- **feedback**: `BIGINT(19)`, ID of the feedback form this item belongs to.
- **has_value**: `BIT(1)`, Indicates if the item has a value (1) or not (0).
- **label**: `VARCHAR(255)`, Label for the item.
- **name**: `VARCHAR(255)`, Name of the item.
- **options**: `VARCHAR(255)`, Options for the item, if applicable.
- **position**: `SMALLINT(5)`, Position of the item within the feedback form.
- **presentation**: `LONGTEXT`, Presentation details for the item.
- **required**: `BIT(1)`, Indicates if the item is required (1) or not (0).
- **template**: `BIGINT(19)`, ID of the template this item belongs to, if any.
- **type**: `VARCHAR(255)`, Type of the item (e.g., question, label).

### Table: feedback_sitecourse_maps **

#### Description

The `feedback_sitecourse_maps` table maps feedback forms to specific courses.

#### Fields

- **course_id**: `BIGINT(19)`, ID of the course.
- **feedback_id**: `BIGINT(19)`, ID of the feedback form.
- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each map.

### Table: feedback_templates **

#### Description

The `feedback_template` table stores templates of feedback structures, which can be reused for creating feedback forms.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each template.
- **course**: `BIGINT(19)`, ID of the course associated with the template.
- **is_public**: `BIT(1)`, Indicates if the template is public (1) or not (0).
- **name**: `VARCHAR(255)`, Name of the template.

### Table: feedback_values **

#### Description

The `feedback_value` table stores the values of completed feedback items.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each value.
- **completed**: `BIGINT(19)`, ID of the completed feedback.
- **course_id**: `BIGINT(19)`, ID of the course associated with the feedback.
- **item**: `BIGINT(19)`, ID of the feedback item.
- **tmp_completed**: `BIGINT(19)`, Temporary ID of the completed feedback, used during processing.
- **value**: `LONGTEXT`, The actual value or response given by the user.

### Table: feedback_valuetmps

#### Description

The `feedback_valuetmp` table temporarily stores values of completed feedback items during processing or migration.

#### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each value.
- **completed**: `BIGINT(19)`, ID of the completed feedback.
- **course_id**: `BIGINT(19)`, ID of the course associated with the feedback.
- **item**: `BIGINT(19)`, ID of the feedback item.
- **tmp_completed**: `BIGINT(19)`, Temporary ID of the completed feedback, used during processing.
- **value**: `LONGTEXT`, The actual value or response given by the user.

This documentation provides a detailed overview of the feedback-related tables within the Moodle system, covering the structure and purpose of each table and its fields.
