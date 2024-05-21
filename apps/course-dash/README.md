# Course Management

## Tables

This README provides an overview of the tables in the Course Management application, along with their fields and functions.

### Table: course

This table is the central course table.

#### Fields

- **id**: BIGINT(19)
- **cacherev**: BIGINT(19) \* Incrementing revision for validating the course content cache.
- **calendartype**: VARCHAR(30)
- **category**: BIGINT(19)
- **completionnotify**: BIT(1) \* Notify users when they complete this course.
- **defaultgroupingid**: BIGINT(19) \* Default grouping used in course modules, does not have key intentionally.
- **downloadcontent**: BIT(1)
- **enablecompletion**: BIT(1) \* 1 = allow use of ‘completion’ progress-tracking on this course. 0 = disable completion tracking on this course.
- **enddate**: BIGINT(19)
- **format**: VARCHAR(21) \* Default: topics.
- **fullname**: VARCHAR(254)
- **groupmode**: SMALLINT(5)
- **groupmodeforce**: SMALLINT(5)
- **idnumber**: VARCHAR(100)
- **lang**: VARCHAR(30)
- **legacyfiles**: SMALLINT(5) \* Course files are not necessary anymore: 0 no legacy files, 1 legacy files disabled, 2 legacy files enabled.
- **marker**: BIGINT(19)
- **maxbytes**: BIGINT(19)
- **newsitems**: MEDIUMINT(7) \* Default: 1.
- **originalcourse_id**: BIGINT(19) \* The id of the source course when a new course originates from a restore of another course on the same site.
- **relativedatesmode**: BIT(1) \* Whether to let this course display course- or activity-related dates relative to the user’s enrolment date in this course.
- **requested**: BIT(1)
- **shortname**: VARCHAR(255)
- **showactivitydates**: BIT(1) \* Whether to display activity dates to users. 0 = do not display, 1 = display activity dates.
- **showcompletionconditions**: BIT(1) \* Whether to display completion conditions to users. 0 = do not display, 1 = display conditions.
- **showgrades**: TINYINT(3) \* Default: 1.
- **showreports**: SMALLINT(5)
- **sortorder**: BIGINT(19)
- **startdate**: BIGINT(19)
- **summary**: LONGTEXT(2147483647)
- **summaryformat**: TINYINT(3)
- **theme**: VARCHAR(50)
- **visible**: BIT(1) \* Default: 1.
- **visibleold**: BIT(1) \* The state of the visible field when hiding parent category. This helps us recover hidden states when unhiding the parent category later.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: course_categories

This table stores course categories.

#### Fields

- **id**: BIGINT(19)
- **coursecount**: BIGINT(19)
- **depth**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **descriptionformat**: TINYINT(3)
- **idnumber**: VARCHAR(100)
- **name**: VARCHAR(255)
- **parent**: BIGINT(19)
- **path**: VARCHAR(255)
- **sortorder**: BIGINT(19)
- **theme**: VARCHAR(50)
- **visible**: BIT(1) \* Default: 1.
- **visibleold**: BIT(1) \* The state of the visible field when hiding parent category. This helps us recover hidden states when unhiding the parent category later.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: course_completion_aggr_methd

This table stores course completion aggregation methods for criteria.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **criteriatype**: BIGINT(19)
- **method**: BIT(1) \* 1 = all, 2 = any, 3 = fraction, 4 = unit.
- **value**: DECIMAL(10)

### Table: course_completion_crit_compl

This table stores course completion user records.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **criteriaid**: BIGINT(19) \* Completion criteria this references.
- **gradefinal**: DECIMAL(10)
- **timecompleted**: BIGINT(19)
- **unenroled**: BIGINT(19) \* Timestamp when the user was unenroled.
- **user_id**: BIGINT(19)

### Table: course_completion_criteria

This table stores course completion criteria.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **courseinstance**: BIGINT(19) \* Course instance id (if using course criteria type).
- **criteriatype**: BIGINT(19) \* Type of criteria.
- **enrolperiod**: BIGINT(19) \* Number of days after enrolment the course is completed (if using enrolperiod criteria type).
- **gradepass**: DECIMAL(10) \* The minimum grade needed to pass the course (if passing grade criteria enabled).
- **module**: VARCHAR(100) \* Type of module (if using module criteria type).
- **moduleinstance**: BIGINT(19) \* Module instance id (if using module criteria type).
- **role**: BIGINT(19)
- **timeend**: BIGINT(19) \* Timestamp of the date for course completion (if using date criteria type).

### Table: course_completion_defaults

This table stores default settings for activities completion.

#### Fields

- **id**: BIGINT(19)
- **completion**: BIT(1)
- **completionexpected**: BIGINT(19)
- **completionpassgrade**: BIT(1)
- **completionusegrade**: BIT(1)
- **completionview**: BIT(1)
- **course**: BIGINT(19)
- **customrules**: LONGTEXT(2147483647)
- **module**: BIGINT(19)

### Table: course_completions

This table stores course completion records.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **reaggregate**: BIGINT(19)
- **timecompleted**: BIGINT(19)
- **timeenrolled**: BIGINT(19)
- **timestarted**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: course_format_options

This table stores format-specific options for the course or course section.

#### Fields

- **id**: BIGINT(19)
- **course_id**: BIGINT(19)
- **format**: VARCHAR(21) \* Format this option is for.
- **name**: VARCHAR(100) \* Name of the format option.
- **sectionid**: BIGINT(19) \* Null if this is a course option, otherwise id of the section this option is for.
- **value**: LONGTEXT(2147483647) \* Value of the format option.

### Table: course_modules

This table stores course modules.

#### Fields

- **id**: BIGINT(19)
- **added**: BIGINT(19)
- **availability**: LONGTEXT(2147483647) \* Availability restrictions for viewing this activity, in JSON format. Null if no restrictions.
- **completion**: BIT(1) \* Whether the completion-tracking facilities are enabled for this activity. 0 = not enabled (database default) 1 = manual tracking, user can tick this activity off (UI default for most activity types) 2 = automatic tracking, system should mark completion according to rules specified in course_moduleS_completion.
- **completionexpected**: BIGINT(19) \* Date at which students are expected to complete this activity. This field is used when displaying student progress.
- **completiongradeitemnumber**: BIGINT(19) \* Grade-item number used to track automatic completion, if applicable.
- **completionpassgrade**: BIT(1) \* Enable completion check on passing grade.
- **completionview**: BIT(1) \* Controls whether a page view is part of the automatic completion requirements for this activity. 0 = view not required 1 = view required.
- **course**: BIGINT(19)
- **deletioninprogress**: BIT(1)
- **downloadcontent**: BIT(1) \* Whether the ability to download course module content is enabled for this activity.
- **groupingid**: BIGINT(19)
- **groupmode**: SMALLINT(5)
- **idnumber**: VARCHAR(100) \* Customizable idnumber.
- **indent**: MEDIUMINT(7)
- **instance**: BIGINT(19)
- **module**: BIGINT(19)
- **score**: SMALLINT(5)
- **section**: BIGINT(19)
- **showdescription**:

BIT(1) \* Some module types support a ‘description’ which shows within the module pages. This option controls whether it also displays on the course main page. 0 = does not display (default), 1 = displays.

- **visible**: BIT(1) \* Default: 1.
- **visibleold**: BIT(1) \* Default: 1.
- **visibleoncoursepage**: BIT(1) \* If stealth visibility is allowed for the course, this controls whether activity is visible on course page.

### Table: course_modules_completion

This table stores the completion state (completed or not completed, etc.).

#### Fields

- **id**: BIGINT(19)
- **completionstate**: BIT(1) \* Whether or not the user has completed the activity. Available states: 0 = not completed if there’s no row in this table, that also counts as 0 1 = completed 2 = completed, show passed 3 = completed, show failed.
- **coursemoduleid**: BIGINT(19) \* Activity that has been completed (or not).
- **overrideby**: BIGINT(19)
- **viewed**: BIT(1) \* Tracks whether or not this activity has been viewed. NULL = we are not tracking viewed for this activity 0 = not viewed 1 = viewed.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* Time at which the completion state last changed.
- **user_id**: BIGINT(19) \* ID of user who has (or hasn’t) completed the activity.

### Table: course_published

This table stores information about how and when local courses were published.

#### Fields

- **id**: BIGINT(19)
- **course_id**: BIGINT(19) \* The id of the published course.
- **enrollable**: BIT(1) \* Default: 1. 1 = enrollable, 0 = downloadable.
- **hub_course_id**: BIGINT(19) \* The course id on the hub server.
- **hub_url**: VARCHAR(255) \* The url of the "registered on" hub.
- **status**: BIT(1) \* Default: 0. Is the publication published or not.
- **timechecked**: BIGINT(19)
- **timepublished**: BIGINT(19) \* The time when the publication occurred.

### Table: course_request

This table stores course requests.

#### Fields

- **id**: BIGINT(19)
- **category**: BIGINT(19)
- **fullname**: VARCHAR(254)
- **password**: VARCHAR(50)
- **reason**: LONGTEXT(2147483647)
- **requester**: BIGINT(19)
- **shortname**: VARCHAR(100)
- **summary**: LONGTEXT(2147483647)
- **summaryformat**: TINYINT(3)

### Table: course_sections

This table stores sections for each course.

#### Fields

- **id**: BIGINT(19)
- **availability**: LONGTEXT(2147483647) \* Availability restrictions for viewing this section, in JSON format. Null if no restrictions.
- **course**: BIGINT(19)
- **name**: VARCHAR(255)
- **section**: BIGINT(19)
- **sequence**: LONGTEXT(2147483647)
- **summary**: LONGTEXT(2147483647)
- **summaryformat**: TINYINT(3)
- **visible**: BIT(1) \* Default: 1.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* Time at which the course section was last changed.
