# Assignment Dash

## Tables

List of Tables with their function described below:

### assign

This table saves information about an instance of mod_assign

#### Fields

- id
- activity
- activity_format
- allow_submissions_from_date \* If set, submissions will only be accepted after this date.
- always_show_description \* If false the assignment intro will only be displayed after the allowsubmissionsfrom date. If true it will always be displayed.
- attempt_reopen_method \* How to determine when students are allowed to open a new submission. Valid options are none, manual, untilpass
- blind_marking \* Hide student/grader identities until the reveal identities action is performed
- completion_submit \* If this field is set to 1, then the activity will be automatically marked as ‘complete’ once the user submits their assignment.
- course_id
- cut_off_date \* The final date after which submissions will no longer be accepted for this assignment without an extensions.
- due_date \* The due date for the assignment. Displayed to students.
- grade \* The maximum grade for this assignment. Can be negative to indicate the use of a scale.
- grading_due_date \* The expected date for marking the submissions.
- hide_grader \* Hide the grader’s identity from students. The opposite of blind marking.
- intro \* The description of the assignment. This field is used by feature MOD_INTRO.
- intro_format \* The format of the description field of the assignment. This field is used by feature MOD_INTRO.
- marking_allocation \* If enabled, marking allocation features will be used in this assignment
- marking_workflow \* If enabled, marking workflow features will be used in this assignment.
- max_attempts \* What is the maximum number of student attempts allowed for this assignment? -1 means unlimited.
- name \* The name of the instance of the assignment. Displayed at the top of each page.
- no_submissions \* This field is a cache for is_any_submission_plugin_enabled() which allows Moodle pages to distinguish offline assignment types without loading the assignment class.
- prevent_submission_notin_group \* If enabled a user will be unable to make a submission unless they are a member of a group.
- require_all_team_members_submit \* If enabled, a submission will not be accepted until all team members have submitted it.
- require_submission_statement \* Forces the student to accept a submission statement when submitting an assignment
- reveal_identities \* Show identities for a blind marking assignment
- send_late_notifications \* Allows separate enabling of notifications for late assignment submissions.
- send_notifications \* Allows the disabling of email notifications in the assign module.
- send_student_notifications \* Default for send student notifications checkbox when grading.
- submission_attachments
- submission_drafts \* If true, assignment submissions will be considered drafts until the student clicks on the submit assignmnet button.
- team_submission \* Do students submit in teams?
- team_submission_grouping_id \* A grouping id to get groups for team submissions
- time_limit
- created_at
- updated_at \* The time the settings for this assign module instance were last modified.

### assign_grades

Grading information about a single assignment submission.

#### Fields

- id
- assignment_id
- attempt_number \* The attempt number that this grade relates to
- grade \* The numerical grade for this assignment submission. Can be determined by scales/advancedgradingforms etc but will always be converted back to a floating point number.
- grader
- user_id
- created_at \* The time the assignment submission was first modified by a grader.
- updated_at \* The most recent modification time for the assignment submission by a grader.

### assign_overrides

The overrides to assign settings.

#### Fields

- id
- allow_submissions_from_date \* Time at which students may start attempting this assign. Can be null, in which case the assign default is used.
- assign_id \* Foreign key references assign.id
- cut_off_date \* Time by which students must have completed their attempt. Can be null, in which case the assign default is used.
- due_date \* Time by which students must have completed their attempt. Can be null, in which case the assign default is used.
- group_id \* Foreign key references groups.id. Can be null if this is a per-user override.
- sort_order \* Rank for sorting overrides.
- time_limit \* Time limit in seconds. Can be null, in which case the quiz default is used.
- user_id \* Foreign key references user.id. Can be null if this is a per-group override.

### assign_plugin_config

Config data for an instance of a plugin in an assignment.

#### Fields

- id
- assignment_id
- name
- plugin
- sub_type
- value

### assign_submission

This table keeps information about student interactions with

#### Fields

- id
- assignment_id
- attempt_number \* Used to track attempts for an assignment
- group_id \* The group id for team submissions
- latest \* Greatly simplifies queries wanting to know information about only the latest attempt.
- status \* The status of this assignment submission. The current statuses are DRAFT and SUBMITTED.
- time_started \* The time when the student stared the submission.
- user_id
- created_at \* The time of the first student submission to this assignment.
- updated_at \* The last time this assignment submission was modified by a student.

### assign_user_flags

List of flags that can be set for a single user in a single

#### Fields

- id
- allocated_marker \* The allocated marker to this submission
- assignment_id \* The assignment these flags apply to.
- extension_due_date \* An extension date assigned to an individual student.
- locked \* Student cannot make any changes to their submission if this flag is set.
- is_mailed \* Has the student been sent a notification about this grade update?
- workflow_state \* The current workflow state of the grade
- user_id \* The id of the user these flags apply to.

### assign_user_mapping

Map an assignment specific id number to a user

#### Fields

- id
- assignment_id
- user_id

### assign_feedback_comments

Text feedback for submitted assignments

#### Fields

- id
- assignment_id
- comment_format \* The feedback text format
- comment_text \* The feedback text
- grade
- created_at
- updated_at

### assign_feedback_editpdf_annots

stores annotations added to pdfs submitted by students

#### Fields

- id
- colour \* black Can be red, yellow, green, blue, white, black
- draft \* Is this a draft annotation?
- end_x \* x-position of the end of the annotation
- end_y \* y-position of the end of the annotation
- grade_id
- page_no \* The page in the PDF that this annotation appears on
- path \* SVG path describing the freehand line
- type \* line line, oval, rect, etc.
- x \* x-position of the start of the annotation (in pixels - image resolution is set to 100 pixels per inch)
- y \* y-position of the start of the annotation (in pixels - image resolution is set to 100 pixels per inch)

### assign_feedback_editpdf_cmnts

Stores comments added to pdfs

#### Fields

- id
- colour \* black Can be red, yellow, green, blue, white, black
- draft \* Is this a draft comment?
- grade_id \*
- page_no \* The page in the PDF that this comment appears on
- raw_text \* Raw text of the comment
- width \* width, in pixels, of the comment box
- x \* x-position of the top-left corner of the comment (in pixels - image resolution is set to 100 pixels per inch)
- y \* y-position of the top-left corner of the comment (in pixels - image resolution is set to 100 pixels per inch)

### assign_feedback_editpdf_queues

Queue for processing.

#### Fields

- id
- attempted_conversions
- submission_attempt
- submission_id

### assign_feedback_editpdf_quick

Stores teacher specified quicklist comments

#### Fields

- id
- colour
- raw_text
- width
- user_id

### assign_feedback_editpdf_rot

Stores rotation information of a page.

#### Fields

- id
- degree \* Rotation degree
- grade_id
- is_rotated \* Whether the page is rotated or not
- page_no \* Page number
- path_name_hash \* File path hash of the rotated page

### assign_feedback_files

Stores info about the number of files submitted by a student

#### Fields

- id
- assignment_id
- grade_id
- num_files \* The number of files uploaded by a grader.

### assignment

Defines assignments

#### Fields

- id
- assignment_type
- course_id
- email_teachers
- grade_id
- intro
- intro_format
- max_bytes
- name
- prevent_late
- resubmit
- time_available
- time_due
- var1
- var2
- var3
- var4
- var5
- created_at
- updated_at

### assignment_submissions

Info about submitted assignments

#### Fields

- id
- assignment_id
- data1
- data2
- format
- grade
- mailed
- num_files
- submission_comment
- teacher
- timemarked
- user_id
- created_at
- updated_at

### assignment_upgrade

Info about upgraded assignments

#### Fields

- id
- new_cm_id
- old_cm_id
- new_instance
- old_instance
- created_at
- updated_at

### assign_submission_file

Info about file submissions for assignments

#### Fields

- id
- assignment
- num_files
- submission

### assign_submission_onlinetext

Info about onlinetext submission

#### Fields

- id
- assignment_id
- online_format
- online_text
- submission
