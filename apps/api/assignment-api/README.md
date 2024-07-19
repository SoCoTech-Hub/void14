# Assignment

## Tables

This README provides an overview of the tables in the Assignment application, along with their fields and functions.

### Table: assign

This table stores assignment information.

#### Fields

- **activity**: LONGTEXT(2147483647)
- **activityformat**: SMALLINT(5)
- **allowsubmissionsfromdate**: BIGINT(19) \* If set, submissions will only be accepted after this date.
- **alwaysshowdescription**: TINYINT(3) \* If false, the assignment intro will only be displayed after the allowsubmissionsfrom date. If true, it will always be displayed.
- **attemptreopenmethod**: VARCHAR(10) \* How to determine when students are allowed to open a new submission. Valid options are none, manual, untilpass.
- **blindmarking**: TINYINT(3) \* Hide student/grader identities until the reveal identities action is performed.
- **completionsubmit**: TINYINT(3) \* If this field is set to 1, then the activity will be automatically marked as ‘complete’ once the user submits their assignment.
- **course**: BIGINT(19)
- **cut_off_date**: BIGINT(19) \* The final date after which submissions will no longer be accepted for this assignment without an extension.
- **duedate**: BIGINT(19) \* The due date for the assignment. Displayed to students.
- **grade**: BIGINT(19) \* The maximum grade for this assignment. Can be negative to indicate the use of a scale.
- **gradingduedate**: BIGINT(19) \* The expected date for marking the submissions.
- **hidegrader**: TINYINT(3) \* Hide the grader’s identity from students. The opposite of blind marking.
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647) \* The description of the assignment. This field is used by feature MOD_INTRO.
- **introformat**: SMALLINT(5) \* The format of the description field of the assignment. This field is used by feature MOD_INTRO.
- **markingallocation**: TINYINT(3) \* If enabled, marking allocation features will be used in this assignment.
- **markingworkflow**: TINYINT(3) \* If enabled, marking workflow features will be used in this assignment.
- **maxattempts**: MEDIUMINT(7) \* What is the maximum number of student attempts allowed for this assignment? -1 means unlimited.
- **name**: VARCHAR(255) \* The name of the instance of the assignment. Displayed at the top of each page.
- **nosubmissions**: TINYINT(3) \* This field is a cache for is_any_submission_plugin_enabled() which allows Moodle pages to distinguish offline assignment types without loading the assignment class.
- **preventsubmissionnotingroup**: TINYINT(3) \* If enabled, a user will be unable to make a submission unless they are a member of a group.
- **requireallteammemberssubmit**: TINYINT(3) \* If enabled, a submission will not be accepted until all team members have submitted it.
- **requiresubmissionstatement**: TINYINT(3) \* Forces the student to accept a submission statement when submitting an assignment.
- **revealidentities**: TINYINT(3) \* Show identities for a blind marking assignment.
- **sendlatenotifications**: TINYINT(3) \* Allows separate enabling of notifications for late assignment submissions.
- **sendnotifications**: TINYINT(3) \* Allows the disabling of email notifications in the assign module.
- **sendstudentnotifications**: TINYINT(3) \* Default for send student notifications checkbox when grading.
- **submissionattachments**: TINYINT(3)
- **submissiondrafts**: TINYINT(3) \* If true, assignment submissions will be considered drafts until the student clicks on the submit assignment button.
- **teamsubmission**: TINYINT(3) \* Do students submit in teams?
- **teamsubmissiongroupingid**: BIGINT(19) \* A grouping id to get groups for team submissions.
- **timelimit**: BIGINT(19)
- **timemodified**: BIGINT(19) \* The time the settings for this assign module instance were last modified.

### Table: assign_grades

This table stores assignment grades.

#### Fields

- **assignment**: BIGINT(19)
- **attemptnumber**: BIGINT(19) \* The attempt number that this grade relates to.
- **grade**: DECIMAL(10) \* The numerical grade for this assignment submission. Can be determined by scales/advancedgradingforms etc., but will always be converted back to a floating point number.
- **grader**: BIGINT(19)
- **id**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time the assignment submission was first modified by a grader.
- **timemodified**: BIGINT(19) \* The most recent modification time for the assignment submission by a grader.
- **user_id**: BIGINT(19)

### Table: assign_overrides

This table stores assignment overrides.

#### Fields

- **id**: BIGINT(19)
- **allowsubmissionsfromdate**: BIGINT(19) \* Time at which students may start attempting this assign. Can be null, in which case the assign default is used.
- **assign_id**: BIGINT(19) \* Foreign key references assign.id.
- **cut_off_date**: BIGINT(19) \* Time by which students must have completed their attempt. Can be null, in which case the assign default is used.
- **duedate**: BIGINT(19) \* Time by which students must have completed their attempt. Can be null, in which case the assign default is used.
- **group_id**: BIGINT(19) \* Foreign key references groups.id. Can be null if this is a per-user override.
- **sortorder**: BIGINT(19) \* Rank for sorting overrides.
- **timelimit**: BIGINT(19) \* Time limit in seconds. Can be null, in which case the quiz default is used.
- **user_id**: BIGINT(19) \* Foreign key references user.id. Can be null if this is a per-group override.

### Table: assign_plugin_config

This table stores plugin configuration for assignments.

#### Fields

- **assignment**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(28)
- **plugin**: VARCHAR(28)
- **subtype**: VARCHAR(28)
- **value**: LONGTEXT(2147483647) \* The value of the config setting. Stored as text but can be interpreted by the plugin however it likes.

### Table: assign_submission

This table stores assignment submissions.

#### Fields

- **assignment**: BIGINT(19)
- **attemptnumber**: BIGINT(19) \* Used to track attempts for an assignment.
- **group_id**: BIGINT(19) \* The group id for team submissions.
- **id**: BIGINT(19)
- **latest**: TINYINT(3) \* Greatly simplifies queries wanting to know information about only the latest attempt.
- **status**: VARCHAR(10) \* The status of this assignment submission. The current statuses are DRAFT and SUBMITTED.
- **timecreated**: BIGINT(19) \* The time of the first student submission to this assignment.
- **timemodified**: BIGINT(19) \* The last time this assignment submission was modified by a student.
- **timestarted**: BIGINT(19) \* The time when the student started the submission.
- **user_id**: BIGINT(19)

### Table: assign_user_flags

This table stores user flags for assignments.

#### Fields

- **id**: BIGINT(19)
- **allocatedmarker**: BIGINT(19) \* The allocated marker to this submission.
- **assignment**: BIGINT(19) \* The assignment these flags apply to.
- **extensionduedate**: BIGINT(19) \* An extension date assigned to an individual student.
- **locked**: BIGINT(19) \* Student cannot make any changes to their submission if this flag is set.
- **mailed**: SMALLINT(5) \* Has the student been sent a notification about this grade update?
- **workflowstate**: VARCHAR(20) \* The current workflow state of the grade.
- **user_id**: BIGINT(19) \* The id of the user these flags apply to.

### Table: assign_user_mapping

This table stores user mappings for assignments.

#### Fields

- **id**: BIGINT(19)
- **assignment**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: assignfeedback_comments

This table stores feedback comments for assignments.

#### Fields

- **assignment**: BIGINT(19)
- **commentformat**: SMALLINT(5) \* The feedback text format.
- **commenttext**: LONGTEXT(2147483647) \* The feedback text.
- **grade**: BIGINT(19)
- **id**: BIGINT(19)

### Table: assignfeedback_editpdf_annot

This table stores PDF annotations

for feedback.

#### Fields

- **colour**: VARCHAR(10) \* Can be red, yellow, green, blue, white, black.
- **draft**: TINYINT(3) \* Is this a draft annotation?
- **endx**: BIGINT(19) \* x-position of the end of the annotation.
- **endy**: BIGINT(19) \* y-position of the end of the annotation.
- **gradeid**: BIGINT(19)
- **id**: BIGINT(19)
- **pageno**: BIGINT(19) \* The page in the PDF that this annotation appears on.
- **path**: LONGTEXT(2147483647) \* SVG path describing the freehand line.
- **type**: VARCHAR(10) \* line, oval, rect, etc.
- **x**: BIGINT(19) \* x-position of the start of the annotation (in pixels - image resolution is set to 100 pixels per inch).
- **y**: BIGINT(19) \* y-position of the start of the annotation (in pixels - image resolution is set to 100 pixels per inch).

### Table: assignfeedback_editpdf_cmnt

This table stores PDF comments for feedback.

#### Fields

- **colour**: VARCHAR(10) \* Can be red, yellow, green, blue, white, black.
- **draft**: TINYINT(3) \* Is this a draft comment?
- **gradeid**: BIGINT(19)
- **id**: BIGINT(19)
- **pageno**: BIGINT(19) \* The page in the PDF that this comment appears on.
- **rawtext**: LONGTEXT(2147483647) \* Raw text of the comment.
- **width**: BIGINT(19) \* Width, in pixels, of the comment box.
- **x**: BIGINT(19) \* x-position of the top-left corner of the comment (in pixels - image resolution is set to 100 pixels per inch).
- **y**: BIGINT(19) \* y-position of the top-left corner of the comment (in pixels - image resolution is set to 100 pixels per inch).

### Table: assignfeedback_editpdf_queue

This table stores PDF feedback queue.

#### Fields

- **attemptedconversions**: BIGINT(19)
- **id**: BIGINT(19)
- **submissionattempt**: BIGINT(19)
- **submissionid**: BIGINT(19)

### Table: assignfeedback_editpdf_quick

This table stores quick PDF feedback annotations.

#### Fields

- **colour**: VARCHAR(10) \* yellow.
- **id**: BIGINT(19)
- **rawtext**: LONGTEXT(2147483647)
- **user_id**: BIGINT(19)
- **width**: BIGINT(19) \* 120.

### Table: assignfeedback_editpdf_rot

This table stores rotation details for PDF pages in feedback.

#### Fields

- **degree**: BIGINT(19) \* Rotation degree.
- **gradeid**: BIGINT(19)
- **id**: BIGINT(19)
- **isrotated**: BIT(1) \* Whether the page is rotated or not.
- **pageno**: BIGINT(19) \* Page number.
- **pathnamehash**: LONGTEXT(2147483647) \* File path hash of the rotated page.

### Table: assignfeedback_file

This table stores feedback files for assignments.

#### Fields

- **assignment**: BIGINT(19)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **numfiles**: BIGINT(19) \* The number of files uploaded by a grader.

### Table: assignment

This table stores assignment details.

#### Fields

- **assignmenttype**: VARCHAR(50)
- **course**: BIGINT(19)
- **emailteachers**: TINYINT(3)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5)
- **maxbytes**: BIGINT(19) \* 100000.
- **name**: VARCHAR(255)
- **preventlate**: TINYINT(3)
- **resubmit**: TINYINT(3)
- **timeavailable**: BIGINT(19)
- **timedue**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **var1**: BIGINT(19)
- **var2**: BIGINT(19)
- **var3**: BIGINT(19)
- **var4**: BIGINT(19)
- **var5**: BIGINT(19)

### Table: assignment_submissions

This table stores assignment submissions.

#### Fields

- **assignment**: BIGINT(19)
- **data1**: LONGTEXT(2147483647)
- **data2**: LONGTEXT(2147483647)
- **format**: SMALLINT(5)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **mailed**: BIT(1)
- **numfiles**: BIGINT(19)
- **submissioncomment**: LONGTEXT(2147483647)
- **teacher**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemarked**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: assignment_upgrade

This table stores assignment upgrade details.

#### Fields

- **id**: BIGINT(19)
- **newcmid**: BIGINT(19)
- **newinstance**: BIGINT(19)
- **oldcmid**: BIGINT(19)
- **oldinstance**: BIGINT(19)
- **timecreated**: BIGINT(19)

### Table: assignsubmission_file

This table stores file submissions for assignments.

#### Fields

- **assignment**: BIGINT(19)
- **id**: BIGINT(19)
- **numfiles**: BIGINT(19) \* The number of files the student submitted.
- **submission**: BIGINT(19)

### Table: assignsubmission_onlinetext

This table stores online text submissions for assignments.

#### Fields

- **assignment**: BIGINT(19)
- **id**: BIGINT(19)
- **onlineformat**: SMALLINT(5) \* The format for this online text submission.
- **onlinetext**: LONGTEXT(2147483647) \* The text for this online text submission.
- **submission**: BIGINT(19)
