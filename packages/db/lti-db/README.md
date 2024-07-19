### Table: ltis **

This table contains Basic LTI activities instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI activity.
- **course**: `BIGINT(19)`, Course to which the Basic LTI activity belongs.
- **debug_launch**: `BIT(1)`, Indicates whether debug-style launch is enabled.
- **grade**: `BIGINT(19)`, Grade scale for the activity.
- **icon**: `LONGTEXT`, URL or path to the icon associated with the activity.
- **instructor_choice_accept_grades**: `BIT(1)`, Whether to accept grades from the tool.
- **instructor_choice_allow_roster**: `BIT(1)`, Whether to allow the roster to be retrieved.
- **instructor_choice_allow_setting**: `BIT(1)`, Whether to allow the tool to store a setting.
- **instructor_choice_send_email_addr**: `BIT(1)`, Whether to send the user's email.
- **instructor_choice_send_name**: `BIT(1)`, Whether to send the user's name.
- **instructor_custom_parameters**: `LONGTEXT`, Additional custom parameters provided by the instructor.
- **intro**: `LONGTEXT`, General introduction of the Basic LTI activity.
- **intro_format**: `SMALLINT(5)`, Format of the intro field (e.g., Moodle, HTML, Markdown).
- **launch_container**: `TINYINT(3)`, Whether to launch the external tool in a pop-up.
- **name**: `VARCHAR(255)`, Name of the Basic LTI activity.
- **password**: `VARCHAR(255)`, Password associated with the activity.
- **resource_key**: `VARCHAR(255)`, Resource key associated with the activity.
- **secure_icon**: `LONGTEXT`, Secure URL or path to the icon associated with the activity.
- **secure_tool_url**: `LONGTEXT`, Secure URL to the remote tool.
- **service_salt**: `VARCHAR(40)`, Salt value for services.
- **show_description_launch**: `BIT(1)`, Whether to show the description during launch.
- **show_title_launch**: `BIT(1)`, Whether to show the title during launch.
- **tool_url**: `LONGTEXT`, Remote tool URL.
- **type_id**: `BIGINT(19)`, Basic LTI type associated with the activity.
- **time_created**: `BIGINT(19)`, Timestamp when the activity was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the activity was last modified.

---

### Table: lti_access_tokens **

Security tokens for accessing LTI services.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the access token.
- **last_access**: `BIGINT(19)`, Timestamp of the last access.
- **scope**: `LONGTEXT`, Scope values as a JSON array.
- **token**: `VARCHAR(128)`, Security token or private access key.
- **type_id**: `BIGINT(19)`, ID of the Basic LTI type associated with the access token.
- **valid_until**: `BIGINT(19)`, Timestamp until which the token is valid.
- **time_created**: `BIGINT(19)`, Timestamp when the access token was created.

---

### Table: lti_submissions **

Tracks individual submissions for LTI activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the submission.
- **date_submitted**: `BIGINT(19)`, Timestamp when the submission was made.
- **date_updated**: `BIGINT(19)`, Timestamp when the submission was last updated.
- **grade_percent**: `DECIMAL(10)`, Percentage grade of the submission.
- **launch_id**: `BIGINT(19)`, Identifier for the launch of the LTI activity.
- **lti_id**: `BIGINT(19)`, ID of the LTI tool instance.
- **original_grade**: `DECIMAL(10)`, Original grade of the submission.
- **state**: `TINYINT(3)`, State of the submission.
- **user_id**: `BIGINT(19)`, ID of the user who made the submission.

---

### Table: lti_tool_proxies **

Tracks LTI tool proxy registrations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tool proxy.
- **capability_offered**: `LONGTEXT`, List of capabilities offered by the tool proxy.
- **created_by**: `BIGINT(19)`, ID of the user who initiated the registration process.
- **gu_id**: `VARCHAR(255)`, Globally unique identifier for the tool proxy.
- **name**: `VARCHAR(255)`, Name of the tool provider.
- **reg_url**: `LONGTEXT`, Registration URL of the tool provider.
- **secret**: `VARCHAR(255)`, Secret key for the tool proxy.
- **service_offered**: `LONGTEXT`, List of services offered by the tool proxy.
- **state**: `TINYINT(3)`, State of the tool proxy (e.g., Configured, Pending, Accepted, Rejected, Cancelled).
- **tool_proxy**: `LONGTEXT`, JSON string representing the tool proxy returned by the tool provider.
- **vendor_code**: `VARCHAR(255)`, Vendor code of the tool provider.
- **time_created**: `BIGINT(19)`, Timestamp when the tool proxy was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the tool proxy was last modified.

---

### Table: lti_tool_settings **

Stores LTI tool setting values.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tool setting.
- **course**: `BIGINT(19)`, ID of the course (null for system-wide settings).
- **course_module_id**: `BIGINT(19)`, ID of the course module (null for system-wide and context-wide settings).
- **settings**: `LONGTEXT`, Setting values as JSON.
- **tool_proxy_id**: `BIGINT(19)`, ID of the related tool proxy.
- **type_id**: `BIGINT(19)`, ID of the LTI type.
- **time_created**: `BIGINT(19)`, Timestamp when the tool setting was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the tool setting was last modified.

---

### Table: lti_types **

Stores Basic LTI pre-configured activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI tool.
- **base_url**: `LONGTEXT`, Base URL of the LTI tool.
- **client_id**: `VARCHAR(255)`, Client ID for the LTI tool.
- **course**: `BIGINT(19)`, ID of the course associated with the LTI tool.
- **course_visible**: `BIT(1)`, Visibility status of the course.
- **created_by**: `BIGINT(19)`, ID of the user who created the LTI tool configuration.
- **description**: `LONGTEXT`, Description of the LTI tool.
- **enabled_capability**: `LONGTEXT`, Enabled capabilities for the LTI tool.
- **icon**: `LONGTEXT`, URL to the icon of the LTI tool.
- **lti_version**: `VARCHAR(10)`, Version of the LTI tool.
- **name**: `VARCHAR(255)`, Name of the LTI tool.
- **parameter**: `LONGTEXT`, Launch parameters for the LTI tool.
- **secure_icon**: `LONGTEXT`, Secure URL to the icon of the LTI tool.
- **state**: `TINYINT(3)`, State of the LTI tool (e.g., Active, Pending, Rejected).
- **tool_domain**: `VARCHAR(255)`, Domain of the LTI tool.
- **tool_proxy_id**: `BIGINT(19)`, ID of the related tool proxy.
- **time_created**: `BIGINT(19)`, Timestamp when the LTI tool was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the LTI tool was last modified.

---
 
### Table: lti_types_configs **

Stores Basic LTI types configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI type configuration.
- **name**: `VARCHAR(100)`, Name of the LTI parameter.
- **type_id**: `BIGINT(19)`, ID of the LTI type.
- **value**: `LONGTEXT`, Value of the parameter.

---

### Table: ltiservice_gradebookservices **

Records the grade items created by the LTI Gradebook Service.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the gradebook service record.
- **base_url**: `LONGTEXT`, URL for the line item that will be returned to the tool provider.
- **course_id**: `BIGINT(19)`, ID of the course related to the grade item.
- **grade_item_id**: `BIGINT(19)`, ID of the grade item.
- **lti_link_id**: `BIGINT(19)`, ID of the LTI element related to the line item.
- **resource_id**: `VARCHAR(512)`, Resource ID for the line item.
- **tag**: `VARCHAR(255)`, Tag type specified for the line item.
- **tool_proxy_id**: `BIGINT(19)`, ID of the tool proxy instance.
- **type_id**: `BIGINT(19)`, ID of the LTI type.

---

This completes the description of the LTI-related tables in the Moodle database schema.
