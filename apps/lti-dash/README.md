### Table: lti

This table contains Basic LTI activities instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI activity.
- **course**: `BIGINT(19)`, Course to which the Basic LTI activity belongs.
- **debuglaunch**: `BIT(1)`, Indicates whether debug-style launch is enabled.
- **grade**: `BIGINT(19)`, Grade scale for the activity.
- **icon**: `LONGTEXT`, URL or path to the icon associated with the activity.
- **instructor_choice_accept_grades**: `BIT(1)`, Whether to accept grades from the tool.
- **instructor_choice_allow_roster**: `BIT(1)`, Whether to allow the roster to be retrieved.
- **instructor_choice_allow_setting**: `BIT(1)`, Whether to allow the tool to store a setting.
- **instructor_choice_send_email_addr**: `BIT(1)`, Whether to send the user's email.
- **instructor_choice_send_name**: `BIT(1)`, Whether to send the user's name.
- **instructor_custom_parameters**: `LONGTEXT`, Additional custom parameters provided by the instructor.
- **intro**: `LONGTEXT`, General introduction of the Basic LTI activity.
- **introformat**: `SMALLINT(5)`, Format of the intro field (e.g., Moodle, HTML, Markdown).
- **launchcontainer**: `TINYINT(3)`, Whether to launch the external tool in a pop-up.
- **name**: `VARCHAR(255)`, Name of the Basic LTI activity.
- **password**: `VARCHAR(255)`, Password associated with the activity.
- **resourcekey**: `VARCHAR(255)`, Resource key associated with the activity.
- **secureicon**: `LONGTEXT`, Secure URL or path to the icon associated with the activity.
- **securetoolurl**: `LONGTEXT`, Secure URL to the remote tool.
- **servicesalt**: `VARCHAR(40)`, Salt value for services.
- **showdescriptionlaunch**: `BIT(1)`, Whether to show the description during launch.
- **showtitlelaunch**: `BIT(1)`, Whether to show the title during launch.
- **timecreated**: `BIGINT(19)`, Timestamp when the activity was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the activity was last modified.
- **toolurl**: `LONGTEXT`, Remote tool URL.
- **typeid**: `BIGINT(19)`, Basic LTI type associated with the activity.

---

### Table: lti_access_tokens

Security tokens for accessing LTI services.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the access token.
- **lastaccess**: `BIGINT(19)`, Timestamp of the last access.
- **scope**: `LONGTEXT`, Scope values as a JSON array.
- **timecreated**: `BIGINT(19)`, Timestamp when the access token was created.
- **token**: `VARCHAR(128)`, Security token or private access key.
- **typeid**: `BIGINT(19)`, ID of the Basic LTI type associated with the access token.
- **validuntil**: `BIGINT(19)`, Timestamp until which the token is valid.

---

### Table: lti_submission

Tracks individual submissions for LTI activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the submission.
- **datesubmitted**: `BIGINT(19)`, Timestamp when the submission was made.
- **dateupdated**: `BIGINT(19)`, Timestamp when the submission was last updated.
- **gradepercent**: `DECIMAL(10)`, Percentage grade of the submission.
- **launchid**: `BIGINT(19)`, Identifier for the launch of the LTI activity.
- **ltiid**: `BIGINT(19)`, ID of the LTI tool instance.
- **originalgrade**: `DECIMAL(10)`, Original grade of the submission.
- **state**: `TINYINT(3)`, State of the submission.
- **userid**: `BIGINT(19)`, ID of the user who made the submission.

---

### Table: lti_tool_proxies

Tracks LTI tool proxy registrations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tool proxy.
- **capabilityoffered**: `LONGTEXT`, List of capabilities offered by the tool proxy.
- **createdby**: `BIGINT(19)`, ID of the user who initiated the registration process.
- **guid**: `VARCHAR(255)`, Globally unique identifier for the tool proxy.
- **name**: `VARCHAR(255)`, Name of the tool provider.
- **regurl**: `LONGTEXT`, Registration URL of the tool provider.
- **secret**: `VARCHAR(255)`, Secret key for the tool proxy.
- **serviceoffered**: `LONGTEXT`, List of services offered by the tool proxy.
- **state**: `TINYINT(3)`, State of the tool proxy (e.g., Configured, Pending, Accepted, Rejected, Cancelled).
- **timecreated**: `BIGINT(19)`, Timestamp when the tool proxy was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the tool proxy was last modified.
- **toolproxy**: `LONGTEXT`, JSON string representing the tool proxy returned by the tool provider.
- **vendorcode**: `VARCHAR(255)`, Vendor code of the tool provider.

---

### Table: lti_tool_settings

Stores LTI tool setting values.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tool setting.
- **course**: `BIGINT(19)`, ID of the course (null for system-wide settings).
- **coursemoduleid**: `BIGINT(19)`, ID of the course module (null for system-wide and context-wide settings).
- **settings**: `LONGTEXT`, Setting values as JSON.
- **timecreated**: `BIGINT(19)`, Timestamp when the tool setting was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the tool setting was last modified.
- **toolproxyid**: `BIGINT(19)`, ID of the related tool proxy.
- **typeid**: `BIGINT(19)`, ID of the LTI type.

---

### Table: lti_types

Stores Basic LTI pre-configured activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI tool.
- **baseurl**: `LONGTEXT`, Base URL of the LTI tool.
- **clientid**: `VARCHAR(255)`, Client ID for the LTI tool.
- **course**: `BIGINT(19)`, ID of the course associated with the LTI tool.
- **coursevisible**: `BIT(1)`, Visibility status of the course.
- **createdby**: `BIGINT(19)`, ID of the user who created the LTI tool configuration.
- **description**: `LONGTEXT`, Description of the LTI tool.
- **enabledcapability**: `LONGTEXT`, Enabled capabilities for the LTI tool.
- **icon**: `LONGTEXT`, URL to the icon of the LTI tool.
- **ltiversion**: `VARCHAR(10)`, Version of the LTI tool.
- **name**: `VARCHAR(255)`, Name of the LTI tool.
- **parameter**: `LONGTEXT`, Launch parameters for the LTI tool.
- **secureicon**: `LONGTEXT`, Secure URL to the icon of the LTI tool.
- **state**: `TINYINT(3)`, State of the LTI tool (e.g., Active, Pending, Rejected).
- **timecreated**: `BIGINT(19)`, Timestamp when the LTI tool was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the LTI tool was last modified.
- **tooldomain**: `VARCHAR(255)`, Domain of the LTI tool.
- **toolproxyid**: `BIGINT(19)`, ID of the related tool proxy.

---

### Table: lti_types_config

Stores Basic LTI types configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the LTI type configuration.
- **name**: `VARCHAR(100)`, Name of the LTI parameter.
- **typeid**: `BIGINT(19)`, ID of the LTI type.
- **value**: `LONGTEXT`, Value of the parameter.

---

### Table: ltiservice_gradebookservices

Records the grade items created by the LTI Gradebook Service.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the gradebook service record.
- **baseurl**: `LONGTEXT`, URL for the line item that will be returned to the tool provider.
- **courseid**: `BIGINT(19)`, ID of the course related to the grade item.
- **gradeitemid**: `BIGINT(19)`, ID of the grade item.
- **ltilinkid**: `BIGINT(19)`, ID of the LTI element related to the line item.
- **resourceid**: `VARCHAR(512)`, Resource ID for the line item.
- **tag**: `VARCHAR(255)`, Tag type specified for the line item.
- **toolproxyid**: `BIGINT(19)`, ID of the tool proxy instance.
- **typeid**: `BIGINT(19)`, ID of the LTI type.

---

This completes the description of the LTI-related tables in the Moodle database schema.
