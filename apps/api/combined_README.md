## admin-preset-api
# Admin Preset Dashboard

## Tables

This README provides an overview of the tables in the Admin Presets application, along with their fields and functions.

### Table: adminpresets

This table stores presets data.

#### Fields

- **author**: VARCHAR(255)
- **comments**: LONGTEXT(2147483647)
- **id**: BIGINT(19)
- **iscore**: BIT(1) \* Whether this is a core preset or not, and which core preset
- **moodlerelease**: VARCHAR(255)
- **moodleversion**: VARCHAR(20)
- **name**: VARCHAR(255)
- **site**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timeimported**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: adminpresets_app

This table stores applied presets.

#### Fields

- **adminpresetid**: BIGINT(19)
- **id**: BIGINT(19)
- **time**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: adminpresets_app_it

This table stores admin presets applied items.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **configlogid**: BIGINT(19)
- **id**: BIGINT(19)

### Table: adminpresets_app_it_a

This table stores attributes of the applied items.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **configlogid**: BIGINT(19)
- **id**: BIGINT(19)
- **itemname**: VARCHAR(100) \* Necessary to rollback

### Table: adminpresets_app_plug

This table stores admin presets plugins applied.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **oldvalue**: SMALLINT(5)
- **plugin**: VARCHAR(100)
- **value**: SMALLINT(5)

### Table: adminpresets_it

This table stores settings.

#### Fields

- **adminpresetid**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100)
- **value**: LONGTEXT(2147483647)

### Table: adminpresets_it_a

This table stores admin presets items attributes.

#### Fields

- **id**: BIGINT(19)
- **itemid**: BIGINT(19)
- **name**: VARCHAR(100)
- **value**: LONGTEXT(2147483647)

### Table: adminpresets_plug

This table stores admin presets plugins status.

#### Fields

- **adminpresetid**: BIGINT(19)
- **enabled**: SMALLINT(5) \* Whether this plugin is currently enabled.
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100)


---


## affiliates-api
# affiliates Dash

## Tables

List of Tables with their function described below:

### affiliates

This table saves a record of all the affiliates

#### Fields

- id
- is_approved
- note
- user_id

### affiliates_details

this table stores information about the affiliates

#### Fields

- id
- name
- number
- code
- bank
- type
- affiliate_id

### affiliates_settings

fields hold a record of the terms the affiliate has agreed to

#### Fields

- id
- rate
- terms
- is_active
- organization_id

### affiliates_statuses

records more information about the affiliate

#### fields

- id
- name
- color

### affiliates_transactions

records the payments done to affiliates

#### fields

- id
- paid
- balance
- paid_date
- account_number
- affiliate_id
- affiliate_status_id


---


## analytics-api
# Analytics Dashboard

## Tables

This README provides an overview of the tables in the Analytics application, along with their fields and functions.

### Table: analytics_indicator_calc

This table stores indicator calculations.

#### Fields

- **contextid**: BIGINT(19)
- **endtime**: BIGINT(19)
- **id**: BIGINT(19)
- **indicator**: VARCHAR(255)
- **sampleid**: BIGINT(19)
- **sampleorigin**: VARCHAR(255)
- **starttime**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **value**: DECIMAL(10) \* The calculated value, it can be null.

### Table: analytics_models

This table stores analytic models.

#### Fields

- **contextids**: LONGTEXT(2147483647) \* The model will be restricted to this contexts
- **enabled**: BIT(1)
- **id**: BIGINT(19)
- **indicators**: LONGTEXT(2147483647)
- **name**: VARCHAR(1333) \* Explicit name of the model, the localized target name is used when left empty
- **predictionsprocessor**: VARCHAR(255)
- **target**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timesplitting**: VARCHAR(255)
- **trained**: BIT(1)
- **usermodified**: BIGINT(19)
- **version**: BIGINT(19)

### Table: analytics_models_log

This table stores analytic models changes during evaluation.

#### Fields

- **dir**: LONGTEXT(2147483647)
- **evaluationmode**: VARCHAR(50)
- **id**: BIGINT(19)
- **indicators**: LONGTEXT(2147483647)
- **info**: LONGTEXT(2147483647)
- **modelid**: BIGINT(19)
- **score**: DECIMAL(10)
- **target**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timesplitting**: VARCHAR(255)
- **usermodified**: BIGINT(19)
- **version**: BIGINT(19)

### Table: analytics_predict_samples

This table stores samples already used for predictions.

#### Fields

- **analysableid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **rangeindex**: BIGINT(19)
- **sampleids**: LONGTEXT(2147483647)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timesplitting**: VARCHAR(255)

### Table: analytics_prediction_actions

This table registers user actions over predictions.

#### Fields

- **actionname**: VARCHAR(255)
- **id**: BIGINT(19)
- **predictionid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: analytics_predictions

This table stores predictions.

#### Fields

- **calculations**: LONGTEXT(2147483647)
- **contextid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **prediction**: DECIMAL(10)
- **predictionscore**: DECIMAL(10)
- **rangeindex**: MEDIUMINT(7)
- **sampleid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timeend**: BIGINT(19)
- **timestart**: BIGINT(19)

### Table: analytics_train_samples

This table stores samples used for training.

#### Fields

- **analysableid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **sampleids**: LONGTEXT(2147483647)
- **timecreated**: BIGINT(19)
- **timesplitting**: VARCHAR(255)

### Table: analytics_used_analysables

This table lists analysables used by each model.

#### Fields

- **action**: VARCHAR(50)
- **analysableid**: BIGINT(19)
- **firstanalysis**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **timeanalysed**: BIGINT(19)

### Table: analytics_used_files

This table stores files that have already been used for training and prediction.

#### Fields

- **action**: VARCHAR(50)
- **fileid**: BIGINT(19)
- **id**: BIGINT(19)
- **modelid**: BIGINT(19)
- **time**: BIGINT(19)


---


## application-api
# Application Dash

## Tables

List of Tables with their function described below:

### Application Categories

### Application Responses

### Job Applications

### Job Application Categories


---


## assignment-api
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


---


## auth-proxy-api
# Auth Proxy

This is a simple proxy server that enables OAuth authentication for preview environments and Expo apps.

## Setup

Deploy it somewhere (Vercel is a one-click, zero-config option) and set the following environment variables:

- `AUTH_DISCORD_ID` - The Discord OAuth client ID
- `AUTH_DISCORD_SECRET` - The Discord OAuth client secret
- `AUTH_REDIRECT_PROXY_URL` - The URL of this proxy server (e.g. )
- `AUTH_SECRET` - Your secret

Make sure the `AUTH_SECRET` and `AUTH_REDIRECT_PROXY_URL` match the values set for the main application's deployment for preview environments, and that you're using the same OAuth credentials for the proxy and the application's preview environment.
`AUTH_REDIRECT_PROXY_URL` should only be set for the main application's preview environment. Do not set it for the production environment.
The lines below shows what values should match eachother in both deployments.

> [!NOTE]
>
> For using the proxy for local development set the `AUTH_REDIRECT_PROXY_URL` in the `.env` file as well.

![Environment variables setup](https://github.com/t3-oss/create-t3-turbo/assets/51714798/5fadd3f5-f705-459a-82ab-559a3df881d0)

For providers that require an origin and a redirect URL, set them to `{AUTH_REDIRECT_PROXY_URL}` and `{AUTH_REDIRECT_PROXY_URL}/r/callback/{provider}` accordingly.

![Google credentials setup](https://github.com/ahkhanjani/create-t3-turbo/assets/72540492/eaa88685-6fc2-4c23-b7ac-737eb172fa0e)


---


## backup-api
# Backup Management

## Tables

This README provides an overview of the tables in the Backup Management application, along with their fields and functions.

### Table: backup_controllers

This table stores the backup controllers as they are used.

#### Fields

- **backupid**: VARCHAR(32) \* Unique ID of the backup.
- **checksum**: VARCHAR(32) \* Checksum of the backup_controller object.
- **controller**: LONGTEXT(2147483647) \* Serialized backup_controller object.
- **execution**: SMALLINT(5) \* Type of execution (immediate/delayed).
- **executiontime**: BIGINT(19) \* Epoch seconds when the backup should be executed (for delayed backups only).
- **format**: VARCHAR(20) \* Format of the backup (Moodle/IMSCC).
- **id**: BIGINT(19)
- **interactive**: SMALLINT(5) \* Is the backup interactive (1-yes/0-no).
- **itemid**: BIGINT(19) \* ID of the module/section/activity being backed up.
- **operation**: VARCHAR(20) \* Type of operation (backup/restore).
- **progress**: DECIMAL(15) \* The backup or restore progress as a floating point number.
- **purpose**: SMALLINT(5) \* Purpose (target) of the backup (general, import, hub).
- **status**: SMALLINT(5) \* Current status of the backup (configured, UI, running).
- **created_at**: BIGINT(19) \* Time the controller was created.
- **updated_at**: BIGINT(19) \* Last time the controller was modified.
- **type**: VARCHAR(10) \* Type of the backup (activity/section/course).
- **userid**: BIGINT(19) \* User that owns/performs the backup.

### Table: backup_courses

This table stores every course backup status.

#### Fields

- **courseid**: BIGINT(19)
- **id**: BIGINT(19)
- **lastendtime**: BIGINT(19)
- **laststarttime**: BIGINT(19)
- **laststatus**: VARCHAR(1)
- **nextstarttime**: BIGINT(19)

### Table: backup_logs

This table stores all the logs from backup and restore operations.

#### Fields

- **backupid**: VARCHAR(32) \* Backup ID the log record belongs to.
- **id**: BIGINT(19)
- **loglevel**: SMALLINT(5) \* Level of the log (debug/error).
- **message**: LONGTEXT(2147483647) \* Text logged.
- **created_at**: BIGINT(19) \* Timestamp this log entry was created.


---


## badge-api
# Badge Management

## Tables

This README provides an overview of the tables in the Badge Management application, along with their fields and functions.

### Table: badge

This table defines badges.

#### Fields

- **id**: BIGINT(19)
- **attachment**: BIT(1) \* Attach baked badge for download.
- **courseid**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **expiredate**: BIGINT(19)
- **expireperiod**: BIGINT(19)
- **imageauthoremail**: VARCHAR(255)
- **imageauthorname**: VARCHAR(255)
- **imageauthorurl**: VARCHAR(255)
- **imagecaption**: LONGTEXT(2147483647)
- **issuercontact**: VARCHAR(255)
- **issuername**: VARCHAR(255)
- **issuerurl**: VARCHAR(255)
- **language**: VARCHAR(255)
- **message**: LONGTEXT(2147483647)
- **messagesubject**: LONGTEXT(2147483647)
- **name**: VARCHAR(255)
- **nextcron**: BIGINT(19)
- **notification**: BIT(1) \* Message when badge is awarded.
- **status**: BIT(1) \* Badge status: 0 = inactive, 1 = active, 2 = active+locked, 3 = inactive+locked, 4 = archived.
- **type**: BIT(1) \* 1 = site, 2 = course.
- **usermodified**: BIGINT(19)
- **version**: VARCHAR(255)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: badge_alignment

This table defines alignment for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **targetcode**: VARCHAR(255)
- **targetdescription**: LONGTEXT(2147483647)
- **targetframework**: VARCHAR(255)
- **targetname**: VARCHAR(255)
- **targeturl**: VARCHAR(255)

### Table: badge_backpack

This table defines settings for connecting external backpacks.

#### Fields

- **id**: BIGINT(19)
- **autosync**: BIT(1)
- **backpackuid**: BIGINT(19)
- **email**: VARCHAR(100)
- **externalbackpackid**: BIGINT(19)
- **password**: VARCHAR(50)
- **user_id**: BIGINT(19)

### Table: badge_backpack_oauth2

This table stores OAuth2 settings for external backpacks.

#### Fields

- **id**: BIGINT(19)
- **expires**: BIGINT(19)
- **externalbackpackid**: BIGINT(19)
- **issuerid**: BIGINT(19)
- **refreshtoken**: LONGTEXT(2147483647)
- **scope**: LONGTEXT(2147483647)
- **token**: LONGTEXT(2147483647)
- **usermodified**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: badge_criteria

This table defines criteria for issuing badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **criteriatype**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **descriptionformat**: TINYINT(3)
- **method**: BIT(1) \* 1 = all, 2 = any.

### Table: badge_criteria_met

This table defines criteria that were met for an issued badge.

#### Fields

- **id**: BIGINT(19)
- **critid**: BIGINT(19)
- **datemet**: BIGINT(19)
- **issuedid**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: badge_criteria_param

This table defines parameters for badges criteria.

#### Fields

- **id**: BIGINT(19)
- **critid**: BIGINT(19)
- **name**: VARCHAR(255)
- **value**: VARCHAR(255)

### Table: badge_endorsement

This table defines endorsement for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **claimcomment**: LONGTEXT(2147483647)
- **claimid**: VARCHAR(255)
- **dateissued**: BIGINT(19)
- **issueremail**: VARCHAR(255)
- **issuername**: VARCHAR(255)
- **issuerurl**: VARCHAR(255)

### Table: badge_external

This table stores settings for external badges display.

#### Fields

- **id**: BIGINT(19)
- **assertion**: LONGTEXT(2147483647) \* Assertion of external badge.
- **backpackid**: BIGINT(19)
- **collectionid**: BIGINT(19)
- **entityid**: VARCHAR(255)

### Table: badge_external_backpack

This table defines settings for site-level backpacks that a user can connect to.

#### Fields

- **id**: BIGINT(19)
- **apiversion**: VARCHAR(12)
- **backpackapiurl**: VARCHAR(255)
- **backpackweburl**: VARCHAR(255)
- **oauth2_issuerid**: BIGINT(19)
- **sortorder**: BIGINT(19)

### Table: badge_external_identifier

This table stores settings for external badge mappings.

#### Fields

- **id**: BIGINT(19)
- **externalid**: VARCHAR(128)
- **internalid**: VARCHAR(128)
- **sitebackpackid**: BIGINT(19)
- **type**: VARCHAR(16)

### Table: badge_issued

This table defines issued badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **dateexpire**: BIGINT(19)
- **dateissued**: BIGINT(19)
- **issuernotified**: BIGINT(19)
- **uniquehash**: LONGTEXT(2147483647)
- **visible**: BIT(1)
- **userid**: BIGINT(19)

### Table: badge_manual_award

This table tracks manual award criteria for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **datemet**: BIGINT(19)
- **issuerid**: BIGINT(19)
- **issuerrole**: BIGINT(19)
- **recipientid**: BIGINT(19)

### Table: badge_related

This table defines related badges.

#### Fields

- **id**: BIGINT(19)
- **badge_id**: BIGINT(19)
- **relatedbadgeid**: BIGINT(19)


---


## big-blue-button-api
# Big Blue Button Dashboard

## Tables

This README provides an overview of the tables in the BigBlueButtonBN application, along with their fields and functions.

### Table: bigbluebuttonbn

This table stores information about a meeting.

#### Fields

- **clienttype**: BIT(1)
- **closingtime**: BIGINT(19)
- **completionattendance**: INT(10) \* Nonzero if a certain number of minutes in the meeting are required to mark an activity completed for a user.
- **completionengagementchats**: INT(10) \* Nonzero if chat during the meeting is required to mark an activity completed for a user.
- **completionengagementemojis**: INT(10) \* Nonzero if the use of emojis during the meeting is required to mark an activity completed for a user.
- **completionengagementpollvotes**: INT(10) \* Nonzero if poll voting during the meeting is required to mark an activity completed for a user.
- **completionengagementraisehand**: INT(10) \* Nonzero if raising hand during the meeting is required to mark an activity completed for a user.
- **completionengagementtalks**: INT(10) \* Nonzero if talking during the meeting is required to mark an activity completed for a user.
- **course**: BIGINT(19)
- **disablecam**: BIT(1)
- **disablemic**: BIT(1)
- **disablenote**: BIT(1)
- **disableprivatechat**: BIT(1)
- **disablepublicchat**: BIT(1)
- **hideuserlist**: BIT(1)
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 1.
- **lockedlayout**: BIT(1)
- **lockonjoin**: BIT(1)
- **lockonjoinconfigurable**: BIT(1)
- **meetingid**: VARCHAR(255)
- **moderatorpass**: VARCHAR(255)
- **muteonstart**: BIT(1)
- **name**: VARCHAR(255)
- **openingtime**: BIGINT(19)
- **participants**: LONGTEXT(2147483647)
- **presentation**: LONGTEXT(2147483647)
- **record**: BIT(1)
- **recordallfromstart**: BIT(1)
- **recordhidebutton**: BIT(1)
- **recordings_deleted**: BIT(1) \* Default: 1.
- **recordings_html**: BIT(1)
- **recordings_imported**: BIT(1)
- **recordings_preview**: BIT(1)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **type**: TINYINT(3)
- **userlimit**: SMALLINT(5)
- **viewerpass**: VARCHAR(255)
- **voicebridge**: MEDIUMINT(7)
- **wait**: BIT(1)
- **welcome**: LONGTEXT(2147483647)

### Table: bigbluebuttonbn_logs

This table stores meeting activity events.

#### Fields

- **bigbluebuttonbnid**: BIGINT(19)
- **courseid**: BIGINT(19)
- **id**: BIGINT(19)
- **log**: VARCHAR(32)
- **meetingid**: VARCHAR(256)
- **meta**: LONGTEXT(2147483647)
- **created_at**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: bigbluebuttonbn_recordings

This table stores references to recordings.

#### Fields

- **bigbluebuttonbnid**: BIGINT(19)
- **courseid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **headless**: BIT(1)
- **id**: BIGINT(19)
- **imported**: BIT(1)
- **importeddata**: LONGTEXT(2147483647) \* This is the remote recording data stored as JSON and kept for future reference.
- **recordingid**: VARCHAR(64)
- **status**: BIT(1)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **usermodified**: BIGINT(19)


---


## block-api
# Block Management

## Tables

This README provides an overview of the tables in the Block Management application, along with their fields and functions.

### Table: block

This table contains all installed blocks.

#### Fields

- **cron**: BIGINT(19)
- **id**: BIGINT(19)
- **lastcron**: BIGINT(19)
- **name**: VARCHAR(40)
- **visible**: BIT(1) \* Default: 1.

### Table: block_instances

This table stores block instances. The type of block is referenced by block.name.

#### Fields

- **blockname**: VARCHAR(40) \* The type of block this is. Foreign key, references block.name.
- **configdata**: LONGTEXT(2147483647) \* A serialized blob of configuration data for this block instance.
- **defaultregion**: VARCHAR(16) \* Which block region this block should appear in on each page, in the absence of a specific position in the block_positions table.
- **defaultweight**: BIGINT(19) \* Used to order the blocks within a block region. Again, may be overridden by the block_positions table for a specific page where this block appears.
- **id**: BIGINT(19)
- **pagetypepattern**: VARCHAR(64) \* The types of page this block appears on. Either an exact page type like mod-quiz-view, or a pattern like mod-quiz-* or course-view-. Note that course-view- will match course-view.
- **parentcontextid**: BIGINT(19) \* The context within which this block appears. Foreign key, references context.id.
- **requiredbytheme**: SMALLINT(5) \* If 1, this block was created because it was required by the theme and did not exist.
- **showinsubcontexts**: SMALLINT(5) \* If 1, this block appears on all matching pages in subcontexts of parentcontextid, as well as in pages belonging to parentcontextid.
- **subpagepattern**: VARCHAR(16) \* Further restrictions on where this block appears. In some places, e.g. during a quiz or lesson attempt, different pages have different subpage ids. If this field is not null, the block only appears on that particular subpage.
- **created_at**: BIGINT(19) \* Time at which this block instance was originally created.
- **updated_at**: BIGINT(19) \* Time at which block instance was last modified.

### Table: block_positions

This table stores the position of a sticky block_instance on another page.

#### Fields

- **blockinstanceid**: BIGINT(19) \* The block_instance this position relates to.
- **contextid**: BIGINT(19) \* With pagetype and subpage, defines the page we are setting the position for.
- **id**: BIGINT(19)
- **pagetype**: VARCHAR(64) \* With contextid and subpage, defines the page we are setting the position for.
- **region**: VARCHAR(16) \* Which block region on this page this block should appear in.
- **subpage**: VARCHAR(16) \* With contextid and pagetype, defines the page we are setting the position for.
- **visible**: SMALLINT(5) \* Whether this block instance is visible on this page.
- **weight**: BIGINT(19) \* Used to order the blocks within a block region.

### Table: block_recent_activity

This table stores recent activity in the block.

#### Fields

- **action**: BIT(1) \* 0 created, 1 updated, 2 deleted.
- **cmid**: BIGINT(19) \* Course module id.
- **courseid**: BIGINT(19) \* Course id.
- **id**: BIGINT(19)
- **modname**: VARCHAR(20) \* Module type name (for delete action).
- **created_at**: BIGINT(19)
- **userid**: BIGINT(19) \* User performing the action.

### Table: block_recentlyaccesseditems

This table stores the most recently accessed items by a user.

#### Fields

- **cmid**: BIGINT(19) \* Item course module id.
- **courseid**: BIGINT(19) \* Course id the item belongs to.
- **id**: BIGINT(19)
- **timeaccess**: BIGINT(19) \* Time the user accessed the last time an item.
- **userid**: BIGINT(19) \* User id that accessed the item.

### Table: block_rss_client

This table stores remote news feed information.

#### Fields

- **description**: LONGTEXT(2147483647)
- **id**: BIGINT(19)
- **preferredtitle**: VARCHAR(64)
- **shared**: TINYINT(3) \* Default: 0.
- **skiptime**: BIGINT(19) \* How many seconds to skip this feed for (increases every time it fails, resets to 0 when it succeeds).
- **skipuntil**: BIGINT(19) \* Do not query this RSS feed again until this time.
- **title**: LONGTEXT(2147483647)
- **url**: VARCHAR(255)
- **userid**: BIGINT(19)


---


## blog-api
# Blog Management Dashboard

## Tables

This README provides an overview of the tables in the Blog Management application, along with their fields and functions.

### Table: blog_association

This table stores associations of blog entries with courses and module instances.

#### Fields

- **id**: BIGINT(19)
- **blogid**: BIGINT(19)
- **contextid**: BIGINT(19)

### Table: blog_external

This table stores external blog links used for RSS copying of blog entries to Moodle.

#### Fields

- **id**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **failedlastsync**: BIT(1) \* Whether or not the last sync failed for some reason.
- **filtertags**: VARCHAR(255) \* Comma-separated list of tags that will be used to filter which entries are copied over from the external blog. They refer to existing tags in the external blog.
- **name**: VARCHAR(255)
- **timefetched**: BIGINT(19)
- **url**: LONGTEXT(2147483647)
- **updated_at**: BIGINT(19)
- **userid**: BIGINT(19)


---


## book-api
# Book Management

## Tables

This README provides an overview of the tables in the Book Management application, along with their fields and functions.

### Table: book

This table defines a book.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **customtitles**: TINYINT(3) \* Default: 0.
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 0.
- **name**: VARCHAR(255)
- **navstyle**: SMALLINT(5) \* Default: 1.
- **numbering**: SMALLINT(5) \* Default: 0.
- **revision**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: book_chapters

This table defines book chapters.

#### Fields

- **id**: BIGINT(19)
- **bookid**: BIGINT(19)
- **content**: LONGTEXT(2147483647)
- **contentformat**: SMALLINT(5) \* Default: 0.
- **hidden**: TINYINT(3) \* Default: 0.
- **importsrc**: VARCHAR(255)
- **pagenum**: BIGINT(19)
- **subchapter**: BIGINT(19)
- **title**: VARCHAR(255)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)


---


## bursaries-api
# Bursaries Dash

## Tables

List of Tables with their function described below:

### Bursaries

### Bursary Categories

### Bursary Categories Bursaries (Link Table)

### Bursary Responses


---


## calendar-api
# Calendar Dash

## Tables

List of Tables with their function described below:

### Calendar


---


## chat-api
# Chat Management

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:
This README provides an overview of the tables in the Chat Management application, along with their fields and functions.

### Table: chat

This table defines each chat room.

#### Fields

- **chattime**: BIGINT(19)
- **course**: BIGINT(19)
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Text format of intro field.
- **keepdays**: BIGINT(19)
- **name**: VARCHAR(255)
- **schedule**: SMALLINT(5)
- **studentlogs**: SMALLINT(5)
- **updated_at**: BIGINT(19)

### Table: chat_messages

This table stores all the actual chat messages.

#### Fields

- **chatid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **issystem**: BIT(1)
- **message**: LONGTEXT(2147483647)
- **timestamp**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: chat_messages_current

This table stores current session messages.

#### Fields

- **chatid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **issystem**: BIT(1)
- **message**: LONGTEXT(2147483647)
- **timestamp**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: chat_users

This table keeps track of which users are in which chat rooms.

#### Fields

- **chatid**: BIGINT(19)
- **course**: BIGINT(19)
- **firstping**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **ip**: VARCHAR(45)
- **lang**: VARCHAR(30)
- **lastmessageping**: BIGINT(19)
- **lastping**: BIGINT(19)
- **sid**: VARCHAR(32)
- **userid**: BIGINT(19)
- **version**: VARCHAR(16)


---


## choice-api
# Choice Management

## Tables

This README provides an overview of the tables in the Choice Management application, along with their fields and functions.

### Table: choice

This table stores available choices.

#### Fields

- **allowmultiple**: TINYINT(3) \* Default: 0.
- **allowupdate**: TINYINT(3) \* Default: 0.
- **completionsubmit**: BIT(1) \* If this field is set to 1, then the activity will be automatically marked as ‘complete’ once the user submits their choice.
- **course**: BIGINT(19)
- **display**: SMALLINT(5) \* Default: 0.
- **id**: BIGINT(19)
- **includeinactive**: TINYINT(3) \* Default: 1.
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 0.
- **limitanswers**: TINYINT(3) \* Default: 0.
- **name**: VARCHAR(255)
- **publish**: TINYINT(3) \* Default: 0.
- **showavailable**: BIT(1) \* If this field is set to 1, then the number of available spaces on choice options will be shown, given limitanswers is set to 1.
- **showpreview**: TINYINT(3) \* Default: 0.
- **showresults**: TINYINT(3) \* Default: 0.
- **showunanswered**: TINYINT(3) \* Default: 0.
- **timeclose**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timeopen**: BIGINT(19)

### Table: choice_answers

This table stores choices performed by users.

#### Fields

- **choiceid**: BIGINT(19)
- **id**: BIGINT(19)
- **optionid**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: choice_options

This table stores available options for choices.

#### Fields

- **choiceid**: BIGINT(19)
- **id**: BIGINT(19)
- **maxanswers**: BIGINT(19) \* Default: 0.
- **text**: LONGTEXT(2147483647)
- **timemodified**: BIGINT(19)


---


## cohort-api
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


---


## comment-api
# Comments Management

## Tables

This README provides an overview of the tables in the Comments Management application, along with their fields and functions.

### Table: comments

This table stores comments for the comments module.

#### Fields

- **id**: BIGINT(19)
- **comment_area**: VARCHAR(255)
- **component**: VARCHAR(255) \* The plugin this comment belongs to.
- **content**: LONGTEXT(2147483647)
- **context_id**: BIGINT(19)
- **format**: TINYINT(3) \* Default: 0.
- **item_id**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **userid**: BIGINT(19)


---


## competency-api
# Competency Management

## Tables

This README provides an overview of the tables in the Competency Management application, along with their fields and functions.

### Table: competency

This table contains the master record of each competency.

#### Fields

- **competencyframeworkid**: BIGINT(19) \* The framework this competency relates to.
- **description**: LONGTEXT(2147483647) \* Description of a single competency.
- **descriptionformat**: SMALLINT(5) \* Default: 0. The format of the description field.
- **id**: BIGINT(19)
- **idnumber**: VARCHAR(100) \* Unique identifier of a competency.
- **parentid**: BIGINT(19) \* The parent competency.
- **path**: VARCHAR(255) \* Used to speed up queries that use an entire branch of the tree. Looks like /5/34/54.
- **ruleconfig**: LONGTEXT(2147483647)
- **ruleoutcome**: TINYINT(3) \* Default: 0.
- **ruletype**: VARCHAR(100)
- **scaleconfiguration**: LONGTEXT(2147483647)
- **scaleid**: BIGINT(19)
- **shortname**: VARCHAR(100) \* Shortname of a competency.
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this competency was created.
- **timemodified**: BIGINT(19) \* The time this competency was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_coursecomp

This table links a competency to a course.

#### Fields

- **competencyid**: BIGINT(19) \* The competency that is linked to this course.
- **courseid**: BIGINT(19) \* The course this competency is linked to.
- **id**: BIGINT(19)
- **ruleoutcome**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this link was created.
- **timemodified**: BIGINT(19) \* The time this link was modified.
- **usermodified**: BIGINT(19)

### Table: competency_coursecompsetting

This table contains the course-specific settings for competencies.

#### Fields

- **courseid**: BIGINT(19) \* The course this setting is linked to.
- **id**: BIGINT(19)
- **pushratingstouserplans**: TINYINT(3)
- **timecreated**: BIGINT(19) \* The time this setting was created.
- **timemodified**: BIGINT(19) \* The time this setting was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_evidence

This table stores evidence linked to a user competency.

#### Fields

- **action**: TINYINT(3)
- **actionuserid**: BIGINT(19)
- **contextid**: BIGINT(19)
- **desca**: LONGTEXT(2147483647)
- **desccomponent**: VARCHAR(255)
- **descidentifier**: VARCHAR(255)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **note**: LONGTEXT(2147483647) \* A non-localized text to attach to the evidence.
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **url**: VARCHAR(255)
- **usercompetencyid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_framework

This table stores the list of competency frameworks.

#### Fields

- **contextid**: BIGINT(19)
- **description**: LONGTEXT(2147483647) \* Description of this competency framework.
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **id**: BIGINT(19)
- **idnumber**: VARCHAR(100) \* Unique idnumber for this competency framework.
- **scaleconfiguration**: LONGTEXT(2147483647)
- **scaleid**: BIGINT(19)
- **shortname**: VARCHAR(100) \* Short name for the competency framework.
- **taxonomies**: VARCHAR(255) \* Sequence of terms to use for each competency level.
- **timecreated**: BIGINT(19) \* The time this competency framework was created.
- **timemodified**: BIGINT(19) \* The time this competency framework was last modified.
- **usermodified**: BIGINT(19)
- **visible**: TINYINT(3) \* Default: 1. Used to show/hide this competency framework.

### Table: competency_modulecomp

This table links a competency to a module.

#### Fields

- **cmid**: BIGINT(19) \* ID of the record in the course_modules table.
- **competencyid**: BIGINT(19) \* The course competency this activity is linked to.
- **id**: BIGINT(19)
- **ruleoutcome**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this record was created.
- **timemodified**: BIGINT(19) \* The time this record was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_plan

This table stores learning plans.

#### Fields

- **description**: LONGTEXT(2147483647)
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **duedate**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **origtemplateid**: BIGINT(19)
- **reviewerid**: BIGINT(19)
- **status**: BIT(1)
- **templateid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_plancomp

This table stores plan competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **planid**: BIGINT(19)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_relatedcomp

This table stores related competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **relatedcompetencyid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_template

This table stores learning plan templates.

#### Fields

- **contextid**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **duedate**: BIGINT(19)
- **id**: BIGINT(19)
- **shortname**: VARCHAR(100)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)
- **visible**: TINYINT(3) \* Default: 1.

### Table: competency_templatecohort

This table stores cohort links to learning plan templates.

#### Fields

- **cohortid**: BIGINT(19)
- **id**: BIGINT(19)
- **templateid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_templatecomp

This table links a competency to a learning plan template.

#### Fields

- **competencyid**: BIGINT(19) \* The competency that is linked to this course.
- **id**: BIGINT(19)
- **sortorder**: BIGINT(19)
- **templateid**: BIGINT(19) \* The template this competency is linked to.
- **timecreated**: BIGINT(19) \* The time this link was created.
- **timemodified**: BIGINT(19) \* The time this link was modified.
- **usermodified**: BIGINT(19)

### Table: competency_usercomp

This table stores user competencies.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **reviewerid**: BIGINT(19)
- **status**: TINYINT(3) \* Default:

0.

- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_usercompcourse

This table stores user competencies in a course.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **courseid**: BIGINT(19)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_usercompplan

This table stores user competency plans.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **planid**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_userevidence

This table stores evidence of prior learning.

#### Fields

- **description**: LONGTEXT(2147483647)
- **descriptionformat**: BIT(1)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **url**: LONGTEXT(2147483647)
- **userid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_userevidencecomp

This table stores the relationship between user evidence and competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userevidenceid**: BIGINT(19)
- **usermodified**: BIGINT(19)


---


## config-api
# Configuration Management

## Tables

This README provides an overview of the tables in the Configuration Management application, along with their fields and functions.

### Table: config

This table stores configuration variables.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(255)
- **value**: LONGTEXT(2147483647)

### Table: config_log

This table stores changes done in server configuration through the admin UI.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **oldvalue**: LONGTEXT(2147483647)
- **plugin**: VARCHAR(100)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)
- **value**: LONGTEXT(2147483647)

### Table: config_plugins

This table stores modules and plugins configuration variables.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100) \* Default: 'core'.
- **value**: LONGTEXT(2147483647)


---


## content-api
# Content Bank Management

## Tables

This README provides an overview of the tables in the Content Bank Management application, along with their fields and functions.

### Table: contentbank_content

This table stores content data in the content bank.

#### Fields

- **id**: BIGINT(19)
- **config_data**: LONGTEXT(2147483647)
- **content_type**: VARCHAR(100)
- **context_id**: BIGINT(19) \* References context.id.
- **instance_id**: BIGINT(19)
- **name**: VARCHAR(255)
- **usermodified**: BIGINT(19)
- **visibility**: BIT(1) \* Default: 1.
- **created_at**: BIGINT(19) \* Default: 0.
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19) \* The original author of the content.


---


## context-api
# Context Management

## Tables

This README provides an overview of the tables in the Context Management application, along with their fields and functions.

### Table: context

This table stores context information, one of these must be set.

#### Fields

- **id**: BIGINT(19)
- **contextlevel**: BIGINT(19)
- **depth**: TINYINT(3)
- **instanceid**: BIGINT(19)
- **locked**: TINYINT(3) \* Whether this context and its children are locked.
- **path**: VARCHAR(255)

### Table: context_temp

This table is used by `build_context_path()` in upgrade and cron to keep context paths temporarily.

#### Fields

- **id**: BIGINT(19) \* This id isn’t autonumeric/sequence. It’s the context->id.
- **depth**: TINYINT(3)
- **locked**: TINYINT(3) \* Default: 0. Whether this context and its children are locked.
- **path**: VARCHAR(255)


---


## course-api
# Course Management

## Tables

This README provides an overview of the tables in the Course Management application, along with their fields and functions.

### Table: course **

This table is the central course table.

#### Fields

- **id**: BIGINT(19)
- **cache_rev**: BIGINT(19) \* Incrementing revision for validating the course content cache.
- **calendar_type**: VARCHAR(30)
- **category**: BIGINT(19)
- **completion_notify**: BIT(1) \* Notify users when they complete this course.
- **default_grouping_id**: BIGINT(19) \* Default grouping used in course modules, does not have key intentionally.
- **download_content**: BIT(1)
- **enable_completion**: BIT(1) \* 1 = allow use of ‘completion’ progress-tracking on this course. 0 = disable completion tracking on this course.
- **end_date**: BIGINT(19)
- **format**: VARCHAR(21) \* Default: topics.
- **full_name**: VARCHAR(254)
- **group_mode**: SMALLINT(5)
- **group_mode_force**: SMALLINT(5)
- **id_number**: VARCHAR(100)
- **lang**: VARCHAR(30)
- **legacy_files**: SMALLINT(5) \* Course files are not necessary anymore: 0 no legacy files, 1 legacy files disabled, 2 legacy files enabled.
- **marker**: BIGINT(19)
- **max_bytes**: BIGINT(19)
- **news_items**: MEDIUMINT(7) \* Default: 1.
- **original_course_id**: BIGINT(19) \* The id of the source course when a new course originates from a restore of another course on the same site.
- **relative_dates_mode**: BIT(1) \* Whether to let this course display course- or activity-related dates relative to the user’s enrolment date in this course.
- **requested**: BIT(1)
- **short_name**: VARCHAR(255)
- **show_activity_dates**: BIT(1) \* Whether to display activity dates to users. 0 = do not display, 1 = display activity dates.
- **show_completion_conditions**: BIT(1) \* Whether to display completion conditions to users. 0 = do not display, 1 = display conditions.
- **show_grades**: TINYINT(3) \* Default: 1.
- **show_reports**: SMALLINT(5)
- **sort_order**: BIGINT(19)
- **start_date**: BIGINT(19)
- **summary**: LONGTEXT(2147483647)
- **summary_format**: TINYINT(3)
- **theme**: VARCHAR(50)
- **visible**: BIT(1) \* Default: 1.
- **visible_old**: BIT(1) \* The state of the visible field when hiding parent category. This helps us recover hidden states when unhiding the parent category later.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: course_categories **

This table stores course categories.

#### Fields

- **id**: BIGINT(19)
- **course_count**: BIGINT(19)
- **depth**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **description_format**: TINYINT(3)
- **id_number**: VARCHAR(100)
- **name**: VARCHAR(255)
- **parent**: BIGINT(19)
- **path**: VARCHAR(255)
- **sort_order**: BIGINT(19)
- **theme**: VARCHAR(50)
- **visible**: BIT(1) \* Default: 1.
- **visible_old**: BIT(1) \* The state of the visible field when hiding parent category. This helps us recover hidden states when unhiding the parent category later.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: course_completion_aggr_methd 

This table stores course completion aggregation methods for criteria.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **criteria_type**: BIGINT(19)
- **method**: BIT(1) \* 1 = all, 2 = any, 3 = fraction, 4 = unit.
- **value**: DECIMAL(10)

### Table: course_completion_crit_compl **

This table stores course completion user records.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **criteria_id**: BIGINT(19) \* Completion criteria this references.
- **grade_final**: DECIMAL(10)
- **time_completed**: BIGINT(19)
- **un_enroled**: BIGINT(19) \* Timestamp when the user was un_enroled.
- **user_id**: BIGINT(19)

### Table: course_completion_criteria **

This table stores course completion criteria.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **course_instance**: BIGINT(19) \* Course instance id (if using course criteria type).
- **criteria_type**: BIGINT(19) \* Type of criteria.
- **enrol_period**: BIGINT(19) \* Number of days after enrolment the course is completed (if using enrol_period criteria type).
- **grade_pass**: DECIMAL(10) \* The minimum grade needed to pass the course (if passing grade criteria enabled).
- **module**: VARCHAR(100) \* Type of module (if using module criteria type).
- **module_instance**: BIGINT(19) \* Module instance id (if using module criteria type).
- **role**: BIGINT(19)
- **time_end**: BIGINT(19) \* Timestamp of the date for course completion (if using date criteria type).

### Table: course_completion_defaults **

This table stores default settings for activities completion.

#### Fields

- **id**: BIGINT(19)
- **completion**: BIT(1)
- **completion_expected**: BIGINT(19)
- **completion_pass_grade**: BIT(1)
- **completion_use_grade**: BIT(1)
- **completion_view**: BIT(1)
- **course**: BIGINT(19)
- **custom_rules**: LONGTEXT(2147483647)
- **module**: BIGINT(19)

### Table: course_completions **

This table stores course completion records.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **re_aggregate**: BIGINT(19)
- **time_completed**: BIGINT(19)
- **time_enrolled**: BIGINT(19)
- **time_started**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: course_format_options **

This table stores format-specific options for the course or course section.

#### Fields

- **id**: BIGINT(19)
- **course_id**: BIGINT(19)
- **format**: VARCHAR(21) \* Format this option is for.
- **name**: VARCHAR(100) \* Name of the format option.
- **section_id**: BIGINT(19) \* Null if this is a course option, otherwise id of the section this option is for.
- **value**: LONGTEXT(2147483647) \* Value of the format option.

### Table: course_modules **

This table stores course modules.

#### Fields

- **id**: BIGINT(19)
- **added**: BIGINT(19)
- **availability**: LONGTEXT(2147483647) \* Availability restrictions for viewing this activity, in JSON format. Null if no restrictions.
- **completion**: BIT(1) \* Whether the completion-tracking facilities are enabled for this activity. 0 = not enabled (database default) 1 = manual tracking, user can tick this activity off (UI default for most activity types) 2 = automatic tracking, system should mark completion according to rules specified in course_moduleS_completion.
- **completion_expected**: BIGINT(19) \* Date at which students are expected to complete this activity. This field is used when displaying student progress.
- **completion_grade_item_number**: BIGINT(19) \* Grade-item number used to track automatic completion, if applicable.
- **completion_pass_grade**: BIT(1) \* Enable completion check on passing grade.
- **completion_view**: BIT(1) \* Controls whether a page view is part of the automatic completion requirements for this activity. 0 = view not required 1 = view required.
- **course**: BIGINT(19)
- **deletion_in_progress**: BIT(1)
- **download_content**: BIT(1) \* Whether the ability to download course module content is enabled for this activity.
- **grouping_id**: BIGINT(19)
- **group_mode**: SMALLINT(5)
- **id_number**: VARCHAR(100) \* Customizable id_number.
- **indent**: MEDIUMINT(7)
- **instance**: BIGINT(19)
- **module**: BIGINT(19)
- **score**: SMALLINT(5)
- **section**: BIGINT(19)
- **show_description**:BIT(1) \* Some module types support a ‘description’ which shows within the module pages. This option controls whether it also displays on the course main page. 0 = does not display (default), 1 = displays.
- **visible**: BIT(1) \* Default: 1.
- **visible_old**: BIT(1) \* Default: 1.
- **visible_on_course_page**: BIT(1) \* If stealth visibility is allowed for the course, this controls whether activity is visible on course page.

### Table: course_modules_completion **

This table stores the completion state (completed or not completed, etc.).

#### Fields

- **id**: BIGINT(19)
- **completion_state**: BIT(1) \* Whether or not the user has completed the activity. Available states: 0 = not completed if there’s no row in this table, that also counts as 0 1 = completed 2 = completed, show passed 3 = completed, show failed.
- **course_module_id**: BIGINT(19) \* Activity that has been completed (or not).
- **override_by**: BIGINT(19)
- **viewed**: BIT(1) \* Tracks whether or not this activity has been viewed. NULL = we are not tracking viewed for this activity 0 = not viewed 1 = viewed.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* Time at which the completion state last changed.
- **user_id**: BIGINT(19) \* ID of user who has (or hasn’t) completed the activity.

### Table: course_published **

This table stores information about how and when local courses were published.

#### Fields

- **id**: BIGINT(19)
- **course_id**: BIGINT(19) \* The id of the published course.
- **enrollable**: BIT(1) \* Default: 1. 1 = enrollable, 0 = downloadable.
- **hub_course_id**: BIGINT(19) \* The course id on the hub server.
- **hub_url**: VARCHAR(255) \* The url of the "registered on" hub.
- **status**: BIT(1) \* Default: 0. Is the publication published or not.
- **time_checked**: BIGINT(19)
- **time_published**: BIGINT(19) \* The time when the publication occurred.

### Table: course_request **

This table stores course requests.

#### Fields

- **id**: BIGINT(19)
- **category**: BIGINT(19)
- **full_name**: VARCHAR(254)
- **password**: VARCHAR(50)
- **reason**: LONGTEXT(2147483647)
- **requester**: BIGINT(19)
- **short_name**: VARCHAR(100)
- **summary**: LONGTEXT(2147483647)
- **summary_format**: TINYINT(3)

### Table: course_sections **

This table stores sections for each course.

#### Fields

- **id**: BIGINT(19)
- **availability**: LONGTEXT(2147483647) \* Availability restrictions for viewing this section, in JSON format. Null if no restrictions.
- **course**: BIGINT(19)
- **name**: VARCHAR(255)
- **section**: BIGINT(19)
- **sequence**: LONGTEXT(2147483647)
- **summary**: LONGTEXT(2147483647)
- **summary_format**: TINYINT(3)
- **visible**: BIT(1) \* Default: 1.
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19) \* Time at which the course section was last changed.


---


## custom-field-api
# Custom Field Management

## Tables

This README provides an overview of the tables in the Custom Field Management application, along with their fields and functions.

### Table: custom_field_categories **

This table stores core custom field category information.

#### Fields

- **id**: BIGINT(19)
- **area**: VARCHAR(100)
- **component**: VARCHAR(100)
- **context_id**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **description_format**: BIGINT(19)
- **item_id**: BIGINT(19)
- **name**: VARCHAR(400)
- **sort_order**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: custom_field_datas **

This table stores core custom field data.

#### Fields

- **id**: BIGINT(19)
- **char_value**: VARCHAR(1333)
- **context_id**: BIGINT(19)
- **dec_value**: DECIMAL(10)
- **field_id**: BIGINT(19)
- **instance_id**: BIGINT(19)
- **int_value**: BIGINT(19)
- **short_char_value**: VARCHAR(255)
- **value**: LONGTEXT(2147483647)
- **value_format**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: custom_field_fields **

This table stores core custom field information.

#### Fields

- **id**: BIGINT(19)
- **category_id**: BIGINT(19)
- **config_data**: LONGTEXT(2147483647)
- **description**: LONGTEXT(2147483647)
- **description_format**: BIGINT(19)
- **name**: VARCHAR(400)
- **short_name**: VARCHAR(100)
- **sort_order**: BIGINT(19)
- **type**: VARCHAR(100)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)


---


## data-api
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


---


## digilib-api
# Digilib Dash

## Tables

List of Tables with their function described below:

### Digilib Categories

### Digilib


---


## editor-api
# Editor Atto Autosave

## Tables

This README provides an overview of the tables in the Editor Atto Autosave application, along with their fields and functions.

### Table: editor_atto_autosave

This table stores draft text that is auto-saved every 5 seconds while an editor is active.

#### Fields

- **id**: BIGINT(19)
- **context_id**: BIGINT(19) \* The contextid that the form was loaded with.
- **draft_id**: BIGINT(19)
- **draft_text**: LONGTEXT(2147483647) \* The draft text.
- **element_id**: VARCHAR(255) \* The unique id for the text editor in the form.
- **page_hash**: VARCHAR(64) \* The HTML DOM id of the page that loaded the form.
- **page_instance**: VARCHAR(64) \* The browser tab instance that last saved the draft text. This is to prevent multiple tabs from the same user saving different text alternately.
- **time_modified**: BIGINT(19) \* Store the last modified time for the auto-save text.
- **user_id**: BIGINT(19) \* The id of the user that loaded the form.


---


## enrol-api
# Enrolment Database Schema Documentation

This README provides an overview of the tables in the enrolment module, along with their fields and functions.

## Tables

### Table: enrol **

This table stores instances of enrolment plugins used in courses.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **cost**: VARCHAR(20), Optional, Custom - enrolment cost.
- **course_id**: BIGINT(19), Nullable.
- **currency**: VARCHAR(3), Optional, Custom - cost currency.
- **custom_char1**: VARCHAR(255), Optional, Custom - general short name.
- **custom_char2**: VARCHAR(255), Optional, Custom - general short name.
- **custom_char3**: VARCHAR(1333), Optional, Custom - general short name.
- **custom_dec1**: DECIMAL(12), Optional, Custom - general decimal.
- **custom_dec2**: DECIMAL(12), Optional, Custom - general decimal.
- **custom_int1**: BIGINT(19), Optional, Custom - general int.
- **custom_int2**: BIGINT(19), Optional, Custom - general int.
- **custom_int3**: BIGINT(19), Optional, Custom - general int.
- **custom_int4**: BIGINT(19), Optional, Custom - general int.
- **custom_int5**: BIGINT(19), Optional, Custom - general int.
- **custom_int6**: BIGINT(19), Optional, Custom - general int.
- **custom_int7**: BIGINT(19), Optional, Custom - general int.
- **custom_int8**: BIGINT(19), Optional, Custom - general int.
- **custom_text1**: LONGTEXT(2147483647), Optional, Custom - general text.
- **custom_text2**: LONGTEXT(2147483647), Optional, Custom - general text.
- **custom_text3**: LONGTEXT(2147483647), Optional, Custom - general text.
- **custom_text4**: LONGTEXT(2147483647), Optional, Custom - general text.
- **enrol**: VARCHAR(20), Mandatory.
- **enrol_end_date**: BIGINT(19), Optional, Custom - end of enrolment.
- **enrol_period**: BIGINT(19), Optional, Custom - enrolment duration.
- **enrol_start_date**: BIGINT(19), Optional, Custom - start of self-enrolment.
- **expiry_notify**: BIT(1), Optional, Custom - notify users before expiration.
- **expiry_threshold**: BIGINT(19), Optional, Custom - when should the participants be notified.
- **name**: VARCHAR(255), Optional, Nullable, Optional instance name.
- **notify_all**: BIT(1), Optional, Custom - Notify both participant and person responsible for enrolments.
- **password**: VARCHAR(50), Optional, Custom - enrolment or access password.
- **role_id**: BIGINT(19), Optional, Custom - the default role given to participants who self-enrol.
- **sort_order**: BIGINT(19), Default 0, Order of enrol plugins in each course.
- **status**: BIGINT(19), Default 0, 0 means active enrolment, see ENROL*STATUS*\* constants, plugins may define own status greater than 10.
- **time_created**: BIGINT(19), Default 0.
- **time_modified**: BIGINT(19), Default 0.

### Table: enrol_flatfile **

This table stores enrol_flatfile data.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **action**: VARCHAR(30), Mandatory.
- **course_id**: BIGINT(19), Nullable.
- **role_id**: BIGINT(19), Nullable.
- **time_end**: BIGINT(19), Default 0.
- **time_modified**: BIGINT(19), Default 0.
- **time_start**: BIGINT(19), Default 0.
- **user_id**: BIGINT(19), Nullable.

### Table: enrol_lti_app_registration **

This table stores details of each application that has been registered with the LTI (Learning Tools Interoperability) system.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **access_token_url**: LONGTEXT(2147483647), Optional.
- **authentication_request_url**: LONGTEXT(2147483647), Optional, The authorisation endpoint of the platform.
- **client_id**: VARCHAR(1333), Optional, The client_id string, generated by the platform when setting up the tool.
- **jwks_url**: LONGTEXT(2147483647), Optional, The JSON Web Key Set URL for the platform.
- **name**: VARCHAR(255), Mandatory, Common name to identify this platform to users.
- **platform_client_hash**: VARCHAR(64), Optional, SHA256 hash of the platform_id (issuer) and client_id.
- **platform_id**: LONGTEXT(2147483647), Optional, The issuer URL.
- **platform_unique_id_hash**: VARCHAR(64), Optional, SHA256 hash of the platform_id (issuer) and unique_id.
- **status**: BIT(1), Default 0, Status of the registration, used to denote draft (incomplete) or active (complete).
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Nullable.
- **unique_id**: VARCHAR(255), Mandatory, A unique local id, which can be used in the initiate login URI to provide {iss, client_id} uniqueness in the absence of the optional client_id claim.

### Table: enrol_lti_context **

This table stores information about contexts in the LTI platform where resources are shared.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **context_id**: VARCHAR(255), Mandatory, The id of the context on the platform.
- **lti_deployment_id**: BIGINT(19), Nullable, The id of the enrol_lti_deployment record containing the deployment information.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Nullable.
- **type**: LONGTEXT(2147483647), Optional, The type of the context on the platform.

### Table: enrol_lti_deployment **

This table stores information about tool deployments within a platform.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **deployment_id**: VARCHAR(255), Mandatory, The id of the deployment, as defined in the platform.
- **legacy_consumer_key**: VARCHAR(255), Optional, The legacy consumer key mapped to this deployment, if the deployment represents a migrated tool.
- **name**: VARCHAR(255), Mandatory, A short name identifying the tool deployment to users.
- **platform_id**: BIGINT(19), Nullable, The platform_id to which this deployment belongs.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Nullable.

### Table: enrol_lti_lti2_consumer **

This table stores information about LTI consumers interacting with Moodle.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_guid**: VARCHAR(1024), Optional.
- **consumer_key**: LONGTEXT(2147483647), Optional.
- **consumer_key256**: VARCHAR(255), Mandatory.
- **consumer_name**: VARCHAR(255), Optional.
- **consumer_version**: VARCHAR(255), Optional.
- **enabled**: BIT(1), Nullable.
- **last_access**: BIGINT(19), Optional.
- **lti_version**: VARCHAR(10), Optional.
- **name**: VARCHAR(50), Mandatory.
- **profile**: LONGTEXT(2147483647), Optional.
- **protected**: BIT(1), Nullable.
- **secret**: VARCHAR(1024), Mandatory.
- **settings**: LONGTEXT(2147483647), Optional.
- **tool_proxy**: LONGTEXT(2147483647), Optional.
- **enable_from**: BIGINT(19), Optional.
- **enable_until**: BIGINT(19), Optional.
- **created**: BIGINT(19), Nullable.
- **updated**: BIGINT(19), Nullable.

### Table: enrol_lti_lti2_context **

This table stores information about specific LTI contexts from the consumers.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_id**: BIGINT(19), Nullable.
- **lti_context_key**: VARCHAR(255), Mandatory.
- **settings**: LONGTEXT(2147483647), Optional.
- **type**: VARCHAR(100), Optional.
- **created**: BIGINT(19), Nullable.
- **updated**: BIGINT(19), Nullable.

### Table: enrol_lti_lti2_nonce **

This table stores nonce used for authentication between Moodle and a consumer.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_id**: BIGINT(19), Nullable.
- **expires**: BIGINT(19), Nullable.
- **value**: VARCHAR(64), Mandatory.

### Table: enrol_lti_lti2_resource_link **

This table stores links from the consumer to the tool.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_id**: BIGINT(19), Optional.
- **context_id**: BIGINT(19), Optional.
- **lti_resource_link_key**: VARCHAR(255), Mandatory.
- **primary_resource_link_id**: BIGINT(19), Optional.
- **settings**: LONGTEXT(2147483647), Optional.
- **share_approved**: BIT(1), Optional.
- **created**: BIGINT(19), Nullable.
- **updated**: BIGINT(19), Nullable.

### Table: enrol_lti_lti2_share_key **

This table stores resource link share key.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **auto_approve**: BIT(1), Nullable.
- **expires**: BIGINT(19), Nullable.
- **resource_link_id**: BIGINT(19), Nullable.
- **share_key**: VARCHAR(32), Mandatory.

### Table: enrol_lti_lti2_tool_proxy **

This table stores a tool proxy between Moodle and a consumer.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_id**: BIGINT(19), Nullable.
- **tool_proxy**: LONGTEXT(2147483647), Mandatory.
- **tool_proxy_key**: VARCHAR(32), Mandatory.
- **created**: BIGINT(19), Nullable.
- **updated**: BIGINT(19), Nullable.

### Table: enrol_lti_lti2_user_result **

This table stores results for each user for each resource link.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **lti_result_sourced_id**: VARCHAR(1024), Mandatory.
- **lti_user_key**: VARCHAR(255), Mandatory.
- **resource_link_id**: BIGINT(19), Nullable.
- **created**: BIGINT(19), Nullable.
- **updated**: BIGINT(19), Nullable.

### Table: enrol_lti_resource_link **

This table stores resource links for a platform and deployment.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **context_memberships_url**: VARCHAR(1333), Optional, The NRPS membership URL.
- **line_item_scope**: VARCHAR(255), Optional, The ags line items authorization scope.
- **line_item_service**: VARCHAR(1333), Optional, The URL for the line item service (if only one line item present).
- **line_items_service**: VARCHAR(1333), Optional, The URL for the line items service for this resource link.
- **lti_context_id**: BIGINT(19), Optional, The id of the enrol_lti_context record containing information about the context from which this resource link originates.
- **lti_deployment_id**: BIGINT(19), Nullable, The id of the enrol_lti_deployment record containing the deployment information.
- **nrps_service_versions**: VARCHAR(255), Optional, The NRPS supported service versions.
- **resource_id**: BIGINT(19), Nullable, The id of the local enrol_lti_tools record containing information about the published resource to which this resource link relates.
- **resource_link_id**: VARCHAR(255), Mandatory, The platform-and-deployment-unique id of the resource link.
- **result_scope**: VARCHAR(255), Optional, The ags result authorization scope.
- **score_scope**: VARCHAR(255), Optional, The ags score items authorization scope.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Nullable.

### Table: enrol_lti_tool_consumer_map **

This table maps the published tool to tool consumers.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_id**: BIGINT(19), Nullable, The consumer ID.
- **tool_id**: BIGINT(19), Nullable, The tool ID.

### Table: enrol_lti_tools **

This table stores a list of tools provided to the remote system.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **city**: VARCHAR(120), Mandatory.
- **context_id**: BIGINT(19), Nullable.
- **country**: VARCHAR(2), Mandatory.
- **enrol_id**: BIGINT(19), Nullable.
- **grade_sync**: BIT(1), Default 0.
- **grade_sync_completion**: BIT(1), Default 0.
- **institution**: VARCHAR(40), Mandatory.
- **lang**: VARCHAR(30), Default 'en'.
- **lti_version**: VARCHAR(15), Default 'LTI-1p3'.
- **mail_display**: TINYINT(3), Default 2.
- **max_enrolled**: BIGINT(19), Default 0.
- **member_sync**: BIT(1), Default 0.
- **member_sync_mode**: BIT(1), Default 0.
- **provisioning_mode_instructor**: TINYINT(3), Optional.
- **provisioning_mode_learner**: TINYINT(3), Optional.
- **role_instructor**: BIGINT(19), Nullable.
- **role_learner**: BIGINT(19), Nullable.
- **secret**: LONGTEXT(2147483647), Optional.
- **time_zone**: VARCHAR(100), Default '99'.
- **uuid**: VARCHAR(36), Optional.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Nullable.

### Table: enrol_lti_user_resource_link **

This table maps users to resource links as this is a many-to-many relationship.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **lti_user_id**: BIGINT(19), Nullable, The id of the enrol_lti_users record.
- **resource_link_id**: BIGINT(19), Nullable, The id of the enrol_lti_resource_link record.

### Table: enrol_lti_users **

This table stores user access log and gradeback data.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **consumer_key**: LONGTEXT(2147483647), Optional.
- **consumer_secret**: LONGTEXT(2147483647), Optional.
- **last_access**: BIGINT(19), Optional, The time the user last accessed.
- **last_grade**: DECIMAL(10), Optional, The last grade that was sent.
- **lti_deployment_id**: BIGINT(19), Optional.
- **memberships_id**: LONGTEXT(2147483647), Optional.
- **memberships_url**: LONGTEXT(2147483647), Optional.
- **service_url**: LONGTEXT(2147483647), Optional.
- **source_id**: LONGTEXT(2147483647), Optional.
- **tool_id**: BIGINT(19), Nullable.
- **time_created**: BIGINT(19), Optional, The time the user was created.
- **user_id**: BIGINT(19), Nullable.

### Table: enrol_paypal **

This table stores all known information about PayPal transactions.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **business**: VARCHAR(255), Mandatory.
- **course_id**: BIGINT(19), Default 0.
- **instance_id**: BIGINT(19), Default 0.
- **item_name**: VARCHAR(255), Mandatory.
- **memo**: VARCHAR(255), Mandatory.
- **option_name1**: VARCHAR(255), Mandatory.
- **option_name2**: VARCHAR(255), Mandatory.
- **option_selection1_x**: VARCHAR(255), Mandatory.
- **option_selection2_x**: VARCHAR(255), Mandatory.
- **parent_txn_id**: VARCHAR(255), Mandatory.
- **payment_status**: VARCHAR(255), Mandatory.
- **payment_type**: VARCHAR(30), Mandatory.
- **pending_reason**: VARCHAR(255), Mandatory.
- **reason_code**: VARCHAR(30), Mandatory.
- **receiver_email**: VARCHAR(255), Mandatory.
- **receiver_id**: VARCHAR(255), Mandatory.
- **tax**: VARCHAR(255), Mandatory.
- **txn_id**: VARCHAR(255), Mandatory.
- **time_updated**: BIGINT(19), Default 0.
- **user_id**: BIGINT(19), Default 0.


---


## event-api
# Event Management Database Schema Documentation

This README provides an overview of the tables in the event management module, along with their fields and functions.

## Tables

### Table: event **

This table stores information about various events.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **category_id**: BIGINT(19), Default 0.
- **component**: VARCHAR(100), Optional, Component that created this event, if specified, only the component itself can edit and delete it.
- **course_id**: BIGINT(19), Default 0.
- **description**: LONGTEXT(2147483647), Nullable.
- **event_type**: VARCHAR(20), Mandatory.
- **format**: SMALLINT(5), Default 0.
- **group_id**: BIGINT(19), Default 0.
- **instance**: BIGINT(19), Default 0.
- **location**: LONGTEXT(2147483647), Optional, Event Location.
- **module_name**: VARCHAR(20), Mandatory.
- **name**: LONGTEXT(2147483647), Mandatory.
- **priority**: BIGINT(19), Optional, The event’s display priority. For multiple events with the same module name, instance, and event_type (e.g., for group overrides), the one with the higher priority will be displayed.
- **repeat_id**: BIGINT(19), Default 0.
- **sequence**: BIGINT(19), Default 1.
- **subscription_id**: BIGINT(19), Optional, The event_subscription id this event is associated with.
- **time_sort**: BIGINT(19), Optional.
- **time_start**: BIGINT(19), Default 0.
- **type**: SMALLINT(5), Default 0.
- **uuid**: VARCHAR(255), Mandatory.
- **visible**: SMALLINT(5), Default 1.
- **time_modified**: BIGINT(19), Default 0.
- **time_duration**: BIGINT(19), Default 0.
- **user_id**: BIGINT(19), Default 0.

### Table: event_subscriptions **

This table tracks subscriptions to remote calendars.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **category_id**: BIGINT(19), Default 0.
- **course_id**: BIGINT(19), Default 0.
- **event_type**: VARCHAR(20), Mandatory, The type of the event.
- **group_id**: BIGINT(19), Default 0.
- **name**: VARCHAR(255), Mandatory.
- **poll_interval**: BIGINT(19), Default 0, Frequency of checks for new/changed events.
- **url**: VARCHAR(255), Mandatory.
- **last_updated**: BIGINT(19), Optional.
- **user_id**: BIGINT(19), Default 0.

### Table: events_handlers **

This table stores which components request what types of events.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **component**: VARCHAR(166), Mandatory, e.g., moodle, mod_forum, block_rss_client.
- **event_name**: VARCHAR(166), Mandatory, name of the event, e.g., ‘grade_updated’.
- **handler_file**: VARCHAR(255), Mandatory, path to the file of the function, e.g., /grade/export/lib.php.
- **handler_function**: LONGTEXT(2147483647), Optional, serialized string or array describing function, suitable to be passed to `call_user_func()`.
- **internal**: TINYINT(3), Default 1, 1 means standard plugin handler, 0 indicates if event handler sends data to external systems, this is used to prevent immediate sending of events from pending db transactions.
- **schedule**: VARCHAR(255), Optional, ‘cron’ or ‘instant’.
- **status**: BIGINT(19), Default 0, number of failed attempts to process this handler.

### Table: events_queue **

This table stores queued events. It stores only one entry for each event.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **event_data**: LONGTEXT(2147483647), Nullable, serialized version of the data object passed to the event handler.
- **stack_dump**: LONGTEXT(2147483647), Optional, serialized `debug_backtrace` showing where the event was fired from.
- **time_created**: BIGINT(19), Nullable, timestamp of the first time this was added.
- **user_id**: BIGINT(19), Optional, `$USER->id` when the event was fired.

### Table: events_queue_handlers

This table lists queued handlers for processing. The events_queue and events_queue_handlers tables are joined by a many-to-one relationship.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **error_message**: LONGTEXT(2147483647), Optional, if an error happened last time we tried to process this event, record it here.
- **handler_id**: BIGINT(19), Nullable, foreign key id corresponding to the id of the events_handlers table.
- **queued_event_id**: BIGINT(19), Nullable, foreign key id corresponding to the id of the events_queue table.
- **status**: BIGINT(19), Optional, number of failed attempts to process this handler.
- **time_modified**: BIGINT(19), Nullable, timestamp of the last attempt to run this from the queue.


---


## external-api
# External Services and Functions Database Schema Documentation

This README provides an overview of the tables related to external services and functions, along with their fields and functions.

## Tables

### Table: external_functions **

This table lists all external functions available in the system.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **capabilities**: VARCHAR(255), Optional, All capabilities required to run the function (separated by commas).
- **class_name**: VARCHAR(100), Mandatory, The name of the class where the function is defined.
- **class_path**: VARCHAR(255), Optional, The path to the class where the function is defined.
- **component**: VARCHAR(100), Mandatory, The component the function belongs to.
- **method_name**: VARCHAR(100), Mandatory, The name of the method.
- **name**: VARCHAR(200), Mandatory, The name of the function.
- **services**: VARCHAR(1333), Optional, All the services (by shortname) where this function must be included.

### Table: external_services **

This table lists both built-in and custom external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **component**: VARCHAR(100), Optional.
- **download_files**: BIT(1), Default 0, 1 if the service allows people to download files from `webservice/plugins.php`, 0 if not.
- **enabled**: BIT(1), Nullable.
- **name**: VARCHAR(200), Mandatory.
- **required_capability**: VARCHAR(150), Optional.
- **restricted_users**: BIT(1), Nullable.
- **shortname**: VARCHAR(255), Optional, A unique shortname.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Optional.
- **upload_files**: BIT(1), Default 0, 1 if the service allows people to upload files to `webservice/upload.php`, 0 if not.

### Table: external_services_functions **

This table lists functions available in each service group.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **external_service_id**: BIGINT(19), Nullable.
- **function_name**: VARCHAR(200), Mandatory.

### Table: external_services_users **

This table lists users allowed to use services with restricted users flag.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **external_service_id**: BIGINT(19), Nullable.
- **ip_restriction**: VARCHAR(255), Optional, IP restriction.
- **valid_until**: BIGINT(19), Optional, Timestamp - valid until date.
- **time_created**: BIGINT(19), Optional, Created timestamp.
- **user_id**: BIGINT(19), Nullable.

### Table: external_tokens **

This table stores security tokens for accessing external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **context_id**: BIGINT(19), Nullable, Context id where the token is valid.
- **creator_id**: BIGINT(19), Default 1, User id of the token creator.
- **external_service_id**: BIGINT(19), Nullable.
- **ip_restriction**: VARCHAR(255), Optional, IP restriction.
- **last_access**: BIGINT(19), Optional, Last access timestamp.
- **private_token**: VARCHAR(64), Optional, Private token, generated at the same time as the token.
- **s_id**: VARCHAR(128), Optional, Link to browser or emulated session.
- **token**: VARCHAR(128), Mandatory, Security token, aka private access key.
- **token_type**: SMALLINT(5), Nullable, Type of token: 0=permanent, no session; 1=linked to current browser session via s_id; 2=permanent, with emulated session.
- **valid_until**: BIGINT(19), Optional, Timestamp - valid until date.
- **time_created**: BIGINT(19), Nullable, Created timestamp.
- **user_id**: BIGINT(19), Nullable, Owner of the token.

Each table is designed to handle different aspects of external services and functions, ensuring secure and efficient access to external functionalities.


---


## faq-api
# FAQ Dash

## Tables

List of Tables with their function described below:

### Faq Categories

### Faq FAQ Categories (Link Table)

### Faq


---


## favourite-api
# Favourite Table Documentation

This README provides an overview of the `favourite` table, which stores relationships between users and their favourite items within the Moodle system. Each record in the table represents a favourite item for a user.

## Table: favourites

### Description

The `favourite` table records the relationships between users and their favourite items within the Moodle platform. It allows users to mark specific items as favourites, which can include messages, courses, or any other item types specified by the Moodle component.

### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each favourite record.
- **component**: `VARCHAR(100)`, Defines the Moodle component in which the favourite was created. This helps identify which part of Moodle the favourite item belongs to.
- **context_id**: `BIGINT(19)`, The context id of the item being favourited. Context id provides information about the context in which the favourite item resides, such as a specific course or module.
- **item_id**: `BIGINT(19)`, The identifier of the item which is being favourited. This id refers to the specific item within its type, such as a message id or course id.
- **item_type**: `VARCHAR(100)`, The type of the item which is being favourited. This is usually a table name but can be any identifier that denotes the type of item. Examples include 'messages' or 'message_conversations'.
- **ordering**: `BIGINT(19)`, Optional. Specifies the ordering of the favourite within its context area. This allows for custom sorting of favourite items, for example, to sort favourite message conversations.
- **created_at**: `BIGINT(19)`, The timestamp when the favourite was created. This helps in tracking when the user marked the item as a favourite.
- **updated_at**: `BIGINT(19)`, The timestamp when the favourite was last modified. This is useful for tracking changes to the favourite status.
- **user_id**: `BIGINT(19)`, The id of the user to whom the favourite belongs. This field associates the favourite item with a specific user.

### Example Usage

- A user marks a course as a favourite, resulting in a new record in the `favourite` table with the `component` set to 'course', the `itemid` set to the course id, and the `userid` set to the user's id.- A user marks a specific conversation in the messaging system as a favourite. The `component` is set to 'messages', `itemtype` is 'message_conversations', and the `itemid` is the id of the conversation.

This table helps enhance the user experience by allowing users to quickly access their favourite items within the Moodle system, improving navigation and usability.


---


## feedback-api
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


---


## file-api
### Table: file_conversions **

#### Description

The `file_conversion` table tracks the conversion process of files within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file conversion record.
- **converter**: `VARCHAR(255)`, Name of the converter used for the file conversion.
- **data**: `LONGTEXT`, Additional data related to the conversion process.
- **dest_file_id**: `BIGINT(19)`, ID of the destination file after conversion.
- **source_file_id**: `BIGINT(19)`, ID of the source file to be converted.
- **status**: `BIGINT(19)`, Status of the file conversion process (e.g., 0 for pending, 1 for completed).
- **status_message**: `LONGTEXT`, Message describing the status or errors of the conversion.
- **target_format**: `VARCHAR(100)`, The target format for the conversion.
- **time_created**: `BIGINT(19)`, Timestamp when the file conversion record was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the file conversion record was last modified.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the record.

### Table: files **

#### Description

The `files` table contains metadata about files stored in Moodle. The actual file content is stored in a SHA1-based file pool.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file record.
- **author**: `VARCHAR(255)`, The original author of the file.
- **component**: `VARCHAR(100)`, Full name of the component owning the area (e.g., "mod_forum").
- **content_hash**: `VARCHAR(40)`, SHA1 hash of the file content.
- **context_id**: `BIGINT(19)`, The context ID defined in the context table, identifying the instance of the plugin owning the file.
- **file_area**: `VARCHAR(50)`, Area within the component where the file belongs (e.g., "coursefiles").
- **file_name**: `VARCHAR(255)`, Full Unicode name of the file.
- **file_path**: `VARCHAR(255)`, Relative path to the file from the module content root.
- **file_size**: `BIGINT(19)`, Size of the file in bytes.
- **item_id**: `BIGINT(19)`, Optional plugin-specific item ID (e.g., forum post ID).
- **license**: `VARCHAR(255)`, License of the file to guide reuse.
- **mime_type**: `VARCHAR(100)`, MIME type of the file (e.g., "image/jpeg").
- **path_name_hash**: `VARCHAR(40)`, SHA1 hash of the complete file path, unique for each file.
- **reference_file_id**: `BIGINT(19)`, ID of the referenced file if the file is a proxy for a repository file.
- **sort_order**: `BIGINT(19)`, Order of files.
- **source**: `LONGTEXT`, Reference information if the file is imported from external sites.
- **status**: `BIGINT(19)`, Status of the file (e.g., 0 for normal, greater than 0 if there's an issue).
- **time_created**: `BIGINT(19)`, Timestamp when the file record was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the file record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user associated with the file.

### Table: files_references **

#### Description

The `files_reference` table stores references to external files managed by repositories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file reference record.
- **last_sync**: `BIGINT(19)`, Last time the proxy file was synced with the repository.
- **reference**: `LONGTEXT`, Identification of the external file.
- **reference_hash**: `VARCHAR(40)`, SHA1 hash of the reference field, used for comparison.
- **repository_id**: `BIGINT(19)`, ID of the repository where the file is stored.

---

This documentation provides a detailed overview of the `file_conversion`, `files`, and `files_reference` tables and their fields within the Moodle system, facilitating better understanding and usage of file management functionality.


---


## filter-api
# Filter Dash

## Tables

List of Tables with their function described below:

### Table: filter_actives **

#### Description

The `filter_active` table stores information about which filters are active in specific contexts within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **active**: `SMALLINT(5)`, Indicates whether the filter is active in the given context. Possible values:, `+1`: On, `-1`: Off, No row with this contextid: Inherit, `-9999` (when contextid points to the system context): Filter is completely disabled.
- **context_id**: `BIGINT(19)`, References the `id` field in the `context` table, indicating the context in which the filter is active.
- **filter**: `VARCHAR(32)`, The internal name of the filter (e.g., 'tex').
- **sort_order**: `BIGINT(19)`, The order in which filters should be applied. Only relevant if `contextid` points to the system context. In other cases, this field should contain `0`.

### Table: filter_configs

#### Description

The `filter_config` table stores per-context configuration settings for filters in Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, References the `id` field in the `context` table, indicating the context for the filter configuration.
- **filter**: `VARCHAR(32)`, The internal name of the filter (e.g., 'tex').
- **name**: `VARCHAR(255)`, The configuration variable name for the filter.
- **value**: `LONGTEXT`, The corresponding configuration variable value for the filter.


---


## forum-api
### Table: forums **

The `forum` table contains the structure and settings of forums within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the forum.
- **assessed**: `BIGINT(19)`, Indicates whether the forum is assessed.
- **assess_time_finish**: `BIGINT(19)`, The finish time for assessments.
- **assess_time_start**: `BIGINT(19)`, The start time for assessments.
- **block_after**: `BIGINT(19)`, Number of posts a user is allowed to post in a given time period before being blocked.
- **block_period**: `BIGINT(19)`, Time period in which the blocking settings apply.
- **completion_discussions**: `INT(10)`, Number of discussions required for completion.
- **completion_posts**: `INT(10)`, Number of posts or replies required for completion.
- **completion_replies**: `INT(10)`, Number of replies required for completion.
- **course**: `BIGINT(19)`, The ID of the course the forum belongs to.
- **cut_off_date**: `BIGINT(19)`, Final date after which posts are not accepted.
- **display_word_count**: `BIT(1)`, Indicates whether to display word count.
- **due_date**: `BIGINT(19)`, Due date for posts (not used for grading).
- **force_subscribe**: `BIT(1)`, Indicates whether users are forced to subscribe.
- **grade_forum**: `BIGINT(19)`, Grade for the forum.
- **grade_forum_notify**: `SMALLINT(5)`, Notification for forum grading.
- **intro**: `LONGTEXT`, Introduction text for the forum.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **lock_discussion_after**: `BIGINT(19)`, Time period after which discussions are locked.
- **max_attachments**: `BIGINT(19)`, Number of attachments allowed per post.
- **max_bytes**: `BIGINT(19)`, Maximum file size for attachments.
- **name**: `VARCHAR(255)`, Name of the forum.
- **rss_articles**: `TINYINT(3)`, Number of RSS articles.
- **rss_type**: `TINYINT(3)`, Type of RSS feed.
- **scale**: `BIGINT(19)`, Scale used for grading.
- **tracking_type**: `TINYINT(3)`, Type of tracking used.
- **type**: `VARCHAR(20)`, Type of forum (e.g., general).
- **warn_after**: `BIGINT(19)`, Number of posts after which users are warned.
- **time_modified**: `BIGINT(19)`, Time when the forum was last modified.

---

### Table: forum_digests **

The `forum_digests` table keeps track of user mail delivery preferences for each forum.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **mail_digest**: `BIT(1)`, Mail digest preference: `-1` for default, `0` for no digest, `1` for digest.
- **user_id**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussion_subs **

The `forum_discussion_subs` table allows users to subscribe and unsubscribe from specific discussions within a forum.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **discussion**: `BIGINT(19)`, The ID of the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **preference**: `BIGINT(19)`, Subscription preference.
- **user_id**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussions **

The `forum_discussions` table stores discussions within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the discussion.
- **assessed**: `BIT(1)`, Indicates whether the discussion is assessed.
- **course**: `BIGINT(19)`, The ID of the course the discussion belongs to.
- **first_post**: `BIGINT(19)`, The ID of the first post in the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum the discussion belongs to.
- **group_id**: `BIGINT(19)`, The ID of the group the discussion belongs to.
- **name**: `VARCHAR(255)`, Name of the discussion.
- **pinned**: `BIT(1)`, Indicates whether the discussion is pinned.
- **time_end**: `BIGINT(19)`, End time for the discussion.
- **time_locked**: `BIGINT(19)`, Locked time for the discussion.
- **time_modified**: `BIGINT(19)`, Time when the discussion was last modified.
- **time_start**: `BIGINT(19)`, Start time for the discussion.
- **user_id**: `BIGINT(19)`, The ID of the user who started the discussion.
- **user_modified**: `BIGINT(19)`, The ID of the user who last modified the discussion.

---

### Table: forum_grades **

The `forum_grades` table stores grading data for forum instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **grade**: `DECIMAL(10)`, The numerical grade for the user's forum assessment.
- **item_number**: `BIGINT(19)`, The grade item number.
- **time_created**: `BIGINT(19)`, Time when the grade was created.
- **time_modified**: `BIGINT(19)`, Time when the grade was last modified.
- **user_id**: `BIGINT(19)`, The ID of the user who was graded.

---

### Table: forum_posts **

The `forum_posts` table stores all posts within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the post.
- **attachment**: `VARCHAR(100)`, Attachment file name.
- **char_count**: `BIGINT(19)`, Character count of the post.
- **deleted**: `BIT(1)`, Indicates whether the post is deleted.
- **discussion**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **mailed**: `TINYINT(3)`, Indicates whether the post was mailed.
- **mail_now**: `BIGINT(19)`, Indicates whether the post should be mailed immediately.
- **message**: `LONGTEXT`, The message content of the post.
- **message_format**: `TINYINT(3)`, The format of the message.
- **message_trust**: `TINYINT(3)`, Indicates whether the message is trusted.
- **parent**: `BIGINT(19)`, The ID of the parent post.
- **private_reply_to**: `BIGINT(19)`, The ID of the user to whom the reply is private.
- **subject**: `VARCHAR(255)`, The subject of the post.
- **total_score**: `SMALLINT(5)`, The total score of the post.
- **word_count**: `BIGINT(19)`, Word count of the post.
- **created**: `BIGINT(19)`, Time when the post was created.
- **modified**: `BIGINT(19)`, Time when the post was last modified.
- **user_id**: `BIGINT(19)`, The ID of the user who created the post.

---

### Table: forum_queues **

The `forum_queue` table keeps track of posts that will be mailed in digest form.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the queue item.
- **discussion_id**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **post_id**: `BIGINT(19)`, The ID of the post to be mailed.
- **time_modified**: `BIGINT(19)`, The modified time of the original post.
- **user_id**

: `BIGINT(19)`, The ID of the user who will receive the mail.

---

### Table: forum_reads **

The `forum_read` table tracks each user's read posts within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read item.
- **discussion_id**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **first_read**: `BIGINT(19)`, The first time the post was read.
- **forum_id**: `BIGINT(19)`, The ID of the forum.
- **last_read**: `BIGINT(19)`, The last time the post was read.
- **post_id**: `BIGINT(19)`, The ID of the post.
- **user_id**: `BIGINT(19)`, The ID of the user who read the post.

---

### Table: forum_subscriptions **

The `forum_subscriptions` table keeps track of who is subscribed to which forums.

#### Fields

- **forum**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the subscription.
- **user_id**: `BIGINT(19)`, The ID of the user who is subscribed.

---

### Table: forum_track_prefs **

The `forum_track_prefs` table tracks each user's untracked forums.

#### Fields

- **forum_id**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tracking preference.
- **user_id**: `BIGINT(19)`, The ID of the user who has the tracking preference.


---


## geolocalize-api
### countries

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
flag: varchar("flag", { length: 256 }),
currency: varchar("currency", { length: 256 })

### districts

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
provinceId: varchar("province_id", { length: 256 }).references(() => provinces.id, { onDelete: "cascade" }).notNull()

### provinces

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
countryId: varchar("country_id", { length: 256 }).references(() => countries.id, { onDelete: "cascade" }).notNull()


---


## glossary-api
# Glossary Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### Table: glossary **

The `glossary` table contains the structure and settings of glossaries within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the glossary.
- **allow_comments**: `TINYINT(3)`, Indicates whether comments are allowed (`0` = No, `1` = Yes).
- **allow_duplicated_entries**: `TINYINT(3)`, Indicates whether duplicate entries are allowed (`0` = No, `1` = Yes).
- **allow_print_view**: `TINYINT(3)`, Indicates whether the print view is allowed (`0` = No, `1` = Yes).
- **approval_display_format**: `VARCHAR(50)`, Display format when approving entries, default is 'default'.
- **assessed**: `BIGINT(19)`, Indicates whether the glossary is assessed.
- **assess_time_finish**: `BIGINT(19)`, The finish time for assessments.
- **assess_time_start**: `BIGINT(19)`, The start time for assessments.
- **completion_entries**: `INT(10)`, Number of entries required for completion.
- **course**: `BIGINT(19)`, The ID of the course the glossary belongs to.
- **default_approval**: `TINYINT(3)`, Default approval status for new entries (`0` = No, `1` = Yes).
- **display_format**: `VARCHAR(50)`, Display format of the glossary, default is 'dictionary'.
- **edit_always**: `TINYINT(3)`, Indicates whether entries can always be edited (`0` = No, `1` = Yes).
- **ent_by_page**: `SMALLINT(5)`, Number of entries per page, default is `10`.
- **global_glossary**: `TINYINT(3)`, Indicates whether the glossary is global (`0` = No, `1` = Yes).
- **intro**: `LONGTEXT`, Introduction text for the glossary.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **main_glossary**: `TINYINT(3)`, Indicates whether it is the main glossary (`0` = No, `1` = Yes).
- **name**: `VARCHAR(255)`, Name of the glossary.
- **rss_articles**: `TINYINT(3)`, Number of RSS articles.
- **rss_type**: `TINYINT(3)`, Type of RSS feed.
- **scale**: `BIGINT(19)`, Scale used for grading.
- **show_all**: `TINYINT(3)`, Indicates whether all entries are shown (`0` = No, `1` = Yes).
- **show_alphabet**: `TINYINT(3)`, Indicates whether the alphabet is shown (`0` = No, `1` = Yes).
- **show_special**: `TINYINT(3)`, Indicates whether special characters are shown (`0` = No, `1` = Yes).
- **use_dyna_link**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).
- **created_at**: `BIGINT(19)`, Time when the glossary was created.
- **updated_at**: `BIGINT(19)`, Time when the glossary was last modified.

---

### Table: glossary_alias **

The `glossary_alias` table stores alias entries for glossary entries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the alias.
- **alias**: `VARCHAR(255)`, Alias name for the glossary entry.
- **entry_id**: `BIGINT(19)`, The ID of the glossary entry.

---

### Table: glossary_categories **

The `glossary_categories` table stores categories for glossary entries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the category.
- **glossary_id**: `BIGINT(19)`, The ID of the glossary.
- **name**: `VARCHAR(255)`, Name of the category.
- **use_dyna_link**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).

---

### Table: glossary_entries **

The `glossary_entries` table stores entries within glossaries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the glossary entry.
- **approved**: `TINYINT(3)`, Approval status of the entry (`0` = No, `1` = Yes).
- **attachment**: `VARCHAR(100)`, Attachment file name.
- **case_sensitive**: `TINYINT(3)`, Indicates whether the entry is case sensitive (`0` = No, `1` = Yes).
- **concept**: `VARCHAR(255)`, Concept of the glossary entry.
- **definition**: `LONGTEXT`, Definition of the glossary entry.
- **definition_format**: `TINYINT(3)`, Format of the definition.
- **definition_trust**: `TINYINT(3)`, Indicates whether the definition is trusted (`0` = No, `1` = Yes).
- **full_match**: `TINYINT(3)`, Indicates whether full match is required (`0` = No, `1` = Yes).
- **glossary_id**: `BIGINT(19)`, The ID of the glossary the entry belongs to.
- **source_glossary_id**: `BIGINT(19)`, The ID of the source glossary.
- **teacher_entry**: `TINYINT(3)`, Indicates whether it is a teacher entry (`0` = No, `1` = Yes).
- **use_dyna_link**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).
- **created_at**: `BIGINT(19)`, Time when the entry was created.
- **updated_at**: `BIGINT(19)`, Time when the entry was last modified.
- **user_id**: `BIGINT(19)`, The ID of the user who created the entry.

---

### Table: glossary_entries_categories

The `glossary_entries_categories` table stores categories for each glossary entry.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, The ID of the category.
- **entry_id**: `BIGINT(19)`, The ID of the glossary entry.

---

### Table: glossary_formats

The `glossary_formats` table stores settings for the display formats of glossaries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **default_hook**: `VARCHAR(50)`, Default hook.
- **default_mode**: `VARCHAR(50)`, Default mode.
- **name**: `VARCHAR(50)`, Name of the format.
- **pop_up_format_name**: `VARCHAR(50)`, Name of the popup format.
- **show_group**: `TINYINT(3)`, Indicates whether the group is shown (`0` = No, `1` = Yes).
- **show_tabs**: `VARCHAR(100)`, Indicates whether tabs are shown (`0` = No, `1` = Yes).
- **sort_key**: `VARCHAR(50)`, Key used for sorting.
- **visible**: `TINYINT(3)`, Indicates whether the format is visible (`0` = No, `1` = Yes).
- **sort_order**: `VARCHAR(50)`, Order used for sorting.


---


## grade-api
## Grade Dashboard

### Table: grade_categories **

The `grade_categories` table stores information about grade categories, which are used for grouping grade items within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade category.
- **aggregate_only_graded**: `BIT(1)`, Indicates whether only graded activities are aggregated (`0` = No, `1` = Yes).
- **aggregate_outcomes**: `BIT(1)`, Indicates whether outcomes are aggregated (`0` = No, `1` = Yes).
- **aggregation**: `BIGINT(19)`, A constant pointing to one of the predefined aggregation strategies (none, mean, median, sum, etc.).
- **course_id**: `BIGINT(19)`, The ID of the course this grade category is part of.
- **depth**: `BIGINT(19)`, Indicates how many parents this category has.
- **drop_low**: `BIGINT(19)`, Number of lowest items to drop.
- **full_name**: `VARCHAR(255)`, The name of this grade category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **keep_high**: `BIGINT(19)`, Number of highest items to keep.
- **parent**: `BIGINT(19)`, Parent category ID, used for hierarchical categories.
- **path**: `VARCHAR(255)`, Shows the path as /1/2/3 (like course_categories).
- **time_created**: `BIGINT(19)`, Timestamp when the category was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the category was last modified.

---

### Table: grade_categories_histories **

The `grade_categories_history` table stores the history of changes made to grade categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregate_only_graded**: `BIT(1)`, Indicates whether only graded activities are aggregated.
- **aggregate_outcomes**: `BIT(1)`, Indicates whether outcomes are aggregated.
- **aggregate_sub_cats**: `BIT(1)`, Indicates whether subcategories are aggregated (preserved for history).
- **aggregation**: `BIGINT(19)`, Aggregation strategy used.
- **course_id**: `BIGINT(19)`, Course ID this category is part of.
- **depth**: `BIGINT(19)`, Depth of the category.
- **drop_low**: `BIGINT(19)`, Number of lowest items to drop.
- **full_name**: `VARCHAR(255)`, Name of the category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **keep_high**: `BIGINT(19)`, Number of highest items to keep.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the category.
- **old_id**: `BIGINT(19)`, Original ID of the category.
- **parent**: `BIGINT(19)`, Parent category ID.
- **path**: `VARCHAR(255)`, Path of the category.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: grade_grades **

The `grade_grades` table stores individual grades for each user and grade item in Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **aggregation_status**: `VARCHAR(10)`, Describes how this grade was used in aggregation (unknown, dropped, novalue, used).
- **aggregation_weight**: `DECIMAL(10)`, Weight of the grade in the aggregation.
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedback_format**: `BIGINT(19)`, Format of the feedback text.
- **final_grade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **information**: `LONGTEXT`, Optional information about the grade.
- **information_format**: `BIGINT(19)`, Format of the information text.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **lock_time**: `BIGINT(19)`, Automatic locking date.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **raw_grade**: `DECIMAL(10)`, Raw grade value.
- **raw_grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **raw_grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **raw_scale_id**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **time_created**: `BIGINT(19)`, Timestamp of grade creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_grades_histories **

The `grade_grades_history` table stores the history of changes made to individual grades.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedback_format**: `BIGINT(19)`, Format of the feedback text.
- **final_grade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **information**: `LONGTEXT`, Optional information about the grade.
- **information_format**: `BIGINT(19)`, Format of the information text.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **lock_time**: `BIGINT(19)`, Automatic locking date.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the grade.
- **old_id**: `BIGINT(19)`, Original ID of the grade.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **raw_grade**: `DECIMAL(10)`, Raw grade value.
- **raw_grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **raw_grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **raw_scale_id**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_import_newitems **

The `grade_import_newitem` table is a temporary table for storing new grade item names during grade import.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **import_code**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **item_name**: `VARCHAR(255)`, Name of the new grade item.

---

### Table: grade_import_values **

The `grade_import_values` table is a temporary table for storing imported grades.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **feedback**: `LONGTEXT`, Feedback for the imported grade.
- **final_grade**: `DECIMAL(10)`, Raw grade value.
- **import_code**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **import_only_feedback**: `BIT(1)`, Indicates whether only feedback is imported.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **new_grade_item**: `BIGINT(19)`, ID of the new grade item.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.

---

### Table: grade_items **

The `grade_items` table stores information about gradeable items (i.e., columns in the gradebook) within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade item.
- **aggregation_coef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregation_coef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **category_id**: `BIGINT(19)`, ID of the category this item belongs to.
- **course_id**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type (real grades, percentages, letters, etc.).
- **grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **grade_pass**: `DECIMAL(10)`, Grade needed to pass.
- **grade_type**: `SMALLINT(5)`, Type of grade (none, value, scale, text).
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id_number**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **item_info**: `LONGTEXT`, Information and notes about the item.
- **item_instance**: `BIGINT(19)`, ID of the item module.
- **item_module**: `VARCHAR(30)`, Module type ('forum', 'quiz', 'csv', etc.).
- **item_name**: `VARCHAR(255)`, Name of the item.
- **item_number**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **item_type**: `VARCHAR(30)`, Type of item ('mod', 'blocks', 'import', 'calculated', etc.).
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **lock_time**: `BIGINT(19)`, Date to lock all final grades.
- **mult_factor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needs_update**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **outcome_id**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plus_factor**: `DECIMAL(10)`, Add this factor to all grades.
- **scale_id**: `BIGINT(19)`, ID of the scale this grade is based on.
- **weight_override**: `BIT(1)`, Indicates whether the weight is overridden.
- **sort_order**: `BIGINT(19)`, Sorting order of the columns.
- **time_created**: `BIGINT(19)`, Timestamp of item creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: grade_items_histories **

The `grade_items_history` table stores the history of changes made to grade items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregation_coef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregation_coef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **category_id**: `BIGINT(19)`, ID of the category this item belongs to.
- **course_id**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type.
- **grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **grade_pass**: `DECIMAL(10)`, Grade needed to pass.
- **grade_type**: `SMALLINT(5)`, Type of grade.
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id_number**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **item_info**: `LONGTEXT`, Information and notes about the item.
- **item_instance**: `BIGINT(19)`, ID of the item module.
- **item_module**: `VARCHAR(30)`, Module type.
- **item_name**: `VARCHAR(255)`, Name of the item.
- **item_number**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **item_type**: `VARCHAR(30)`, Type of item.
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **lock_time**: `BIGINT(19)`, Date to lock all final grades.
- **mult_factor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needs_update**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **old_id**: `BIGINT(19)`, Original ID of the item.
- **outcome_id**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plus_factor**: `DECIMAL(10)`, Add this factor to all grades.
- **scale_id**: `BIGINT(19)`, ID of the scale this grade is based on.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **weight_override**: `BIT(1)`, Indicates whether the weight is overridden.
- **sort_order**: `BIGINT(19)`, Sorting order of the columns.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the item.

---

### Table: grade_letters **

The `grade_letters` table stores grade letters, which can be used to represent grade ranges with letters.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the context the letter applies to (e.g., course).
- **letter**: `VARCHAR(255)`, Display value of the letter (e.g., A, B, C, etc.).
- **lower_boundary**: `DECIMAL(10)`, Lower boundary of the letter. The upper boundary is the lower boundary of the next highest letter, or the maximum grade if there is no higher letter.

---

### Table: grade_outcomes **

The `grade_outcomes` table describes the outcomes used in the system. An outcome is a specific skill or knowledge that students should have gained.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the outcome.
- **course_id**: `BIGINT(19)`, ID of the course the outcome is associated with (NULL for site-wide outcomes).
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **description_format**: `TINYINT(3)`, Format of the description.
- **full_name**: `LONGTEXT`, Full description of the outcome.
- **scale_id**: `BIGINT(19)`, Recommended scale for the outcome.
- **short_name**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **time_created**: `BIGINT(19)`, Timestamp of outcome creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **user_modified**: `BIGINT(19)`, User ID of the person who last modified the outcome.

---

### Table: grade_outcomes_courses **

The `grade_outcomes_courses` table stores the outcomes used in specific courses.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course.
- **outcome_id**: `BIGINT(19)`, ID of the outcome.

---

### Table: grade_outcomes_histories **

The `grade_outcomes_history` table stores the history of changes made to outcomes.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **course_id**: `BIGINT(19)`, ID of the course the outcome is associated with.
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **description_format**: `TINYINT(3)`, Format of the description.
- **full_name**: `LONGTEXT`, Full description of the outcome.
- **old_id**: `BIGINT(19)`, Original ID of the outcome.
- **scale_id**: `BIGINT(19)`, Recommended scale for the outcome.
- **short_name**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the outcome.

---

### Table: grade_settings **

The `grade_settings` table stores settings for the gradebook.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course the setting applies to.
- **name**: `VARCHAR(255)`, Name of the setting.
- **value**: `LONGTEXT`, Value of the setting.

---

### Table: grading_areas **

The `grading_areas` table identifies gradable areas where advanced grading can occur.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **active_method**: `VARCHAR(100)`, Default grading method (plugin) for the area.
- **area_name**: `VARCHAR(100)`, Name of the gradable area.
- **component**: `VARCHAR(100)`, Name of the component holding the area.
- **context_id**: `BIGINT(19)`, Context of the gradable area (e.g., module instance context).

---

### Table: grading_definitions **

The `grading_definitions` table contains basic information about advanced grading forms.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area_id**: `BIGINT(19)`, ID of the grading area.
- **copied_from_id**: `BIGINT(19)`, ID of the original definition this was copied from.
- **description**: `LONGTEXT`, Detailed description of the form.
- **description_format**: `TINYINT(3)`, Format of the description.
- **method**: `VARCHAR(100)`, Name of the plugin providing the grading form.
- **name**: `VARCHAR(255)`, Title of the form.
- **options**: `LONGTEXT`, General storage place for plugin settings.
- **status**: `BIGINT(19)`, Status of the form definition.
- **time_copied**: `BIGINT(19)`, Timestamp of the last time this form was copied.
- **time_created**: `BIGINT(19)`, Timestamp of form creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.
- **user_created**: `BIGINT(19)`, User ID of the form creator.
- **user_modified**: `BIGINT(19)`, User ID of the person who last modified the form.

---

### Table: grading_instances **

The `grading_instances` table stores instances of advanced grading forms, representing individual assessments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **feedback**: `LONGTEXT`, Overall feedback from the rater.
- **feedback_format**: `TINYINT(3)`, Format of the feedback field.
- **item_id**: `BIGINT(19)`, ID of the graded item.
- **rater_id**: `BIGINT(19)`, User ID of the rater.
- **raw_grade**: `DECIMAL(10)`, Raw normalized grade (0.00000 - 100.00000).
- **status**: `BIGINT(19)`, Status of the assessment.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: gradingform_guide_comments **

The `gradingform_guide_comments` table stores frequently used comments in the marking guide.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Comment description.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **sort_order**: `BIGINT(19)`, Order of the comments.

---

### Table: gradingform_guide_criteria **

The `gradingform_guide_criteria` table stores the rows of the criteria grid for the marking guide.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion for students.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **description_markers**: `LONGTEXT`, Description for markers.
- **description_markers_format**: `TINYINT(3)`, Format of the description for markers.
- **max_score**: `DECIMAL(10)`, Maximum grade for the criterion.
- **short_name**: `VARCHAR(255)`, Short name of the criterion.
- **sort_order**: `BIGINT(19)`, Order of the criterion in the guide.

---

### Table: gradingform_guide_fillings **

The `gradingform_guide_fillings` table stores the data of how the guide is filled by a particular rater.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the criterion.
- **instance_id**: `BIGINT(19)`, ID of the grading form instance.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remark_format**: `TINYINT(3)`, Format of the remark field.
- **score**: `DECIMAL(10)`, Score assigned to the criterion.

---

### Table: gradingform_rubric_criterias **

The `gradingform_rubric_criteria` table stores the rows of the rubric grid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **sort_order**: `BIGINT(19)`, Order of the criterion in the rubric.

---

### Table: gradingform_rubric_fillings **

The `gradingform_rubric_fillings` table stores the data of how the rubric is filled by a particular rater.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the criterion.
- **instance_id**: `BIGINT(19)`, ID of the grading form instance.
- **level_id**: `BIGINT(19)`, ID of the selected level during assessment.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remark_format**: `TINYINT(3)`, Format of the remark field.

---

### Table: gradingform_rubric_levels **

The `gradingform_rubric_levels` table stores the columns of the rubric grid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the rubric criterion.
- **definition**: `LONGTEXT`, Text describing the level.
- **definition_format**: `BIGINT(19)`, Format of the definition field.
- **score**: `DECIMAL(10)`, Score for the level.

---

This detailed information about the tables and fields in the `grade_*` and `grading_*` categories provides a comprehensive understanding of how grading and evaluation data is structured and managed within Moodle's database schema.


---


## group-api
## Grouping Dashboard

### Table: groupings **

#### Description

A `grouping` is a collection of groups.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grouping.
- **config_data**: `LONGTEXT`, Extra configuration data, may be used by group UI tools.
- **course_id**: `BIGINT(19)`, ID of the course associated with the grouping.
- **description**: `LONGTEXT`, Description of the grouping.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **id_number**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(255)`, Short human-readable unique name for the grouping.
- **time_created**: `BIGINT(19)`, Timestamp of grouping creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groupings_groups **

#### Description

The `groupings_groups` table links a grouping to a group, allowing groups to be in multiple groupings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **group_id**: `BIGINT(19)`, ID of the group.
- **grouping_id**: `BIGINT(19)`, ID of the grouping.
- **time_added**: `BIGINT(19)`, Timestamp of when the group was added to the grouping.

---

### Table: groups **

#### Description

Each record in the `groups` table represents a group.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the group.
- **course_id**: `BIGINT(19)`, ID of the course associated with the group.
- **description**: `LONGTEXT`, Description of the group.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **enrolment_key**: `VARCHAR(50)`, Key for enrolling in the group.
- **id_number**: `VARCHAR(100)`, Arbitrary identifier provided by the user.
- **name**: `VARCHAR(254)`, Short human-readable unique name for the group.
- **picture**: `BIGINT(19)`, ID of the picture associated with the group.
- **time_created**: `BIGINT(19)`, Timestamp of group creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: groups_members **

#### Description

The `groups_members` table links a user to a group.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Moodle component that added the group membership (e.g., `auth_myplugin`), or blank if added manually.
- **group_id**: `BIGINT(19)`, ID of the group.
- **itemid**: `BIGINT(19)`, Defines the instance of the component that created the entry, or default (0) if not applicable.
- **time_added**: `BIGINT(19)`, Timestamp of when the user was added to the group.
- **user_id**: `BIGINT(19)`, ID of the user.

---

This detailed information about the `groupings`, `groupings_groups`, `groups`, and `groups_members` tables provides a comprehensive understanding of how group-related data is structured and managed within Moodle's database schema.


---


## h5p-api
### Table: h5ps **

Stores H5P content information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the H5P content.
- **content_hash**: `VARCHAR(40)`, Defines the hash for the file content.
- **display_options**: `SMALLINT(5)` (nullable), H5P Button display options.
- **filtered**: `LONGTEXT` (nullable), Filtered version of `json_content`.
- **json_content**: `LONGTEXT`, The content in JSON format.
- **main_library_id**: `BIGINT(19)`, The library instantiated for this node.
- **path_name_hash**: `VARCHAR(40)`, Defines the complete unique hash for the file path where the H5P content was added.
- **time_created**: `BIGINT(19)`, Timestamp of when the content was created.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: h5p_contents_libraries **

Stores which library is used in which content.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **dependency_type**: `VARCHAR(10)`, The type of dependency (e.g., dynamic, preloaded, or editor).
- **drop_css**: `BIT(1)`, Indicates if the preloaded CSS from the dependency is to be excluded.
- **h5p_id**: `BIGINT(19)`, Identifier for the H5P content.
- **library_id**: `BIGINT(19)`, Identifier of the H5P library used by the content.
- **weight**: `BIGINT(19)`, Determines the order in which the preloaded libraries will be loaded.

---

### Table: h5p_libraries **

Stores information about libraries used by H5P content.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the library.
- **add_to**: `LONGTEXT` (nullable), Plugin configuration data.
- **core_major**: `SMALLINT(5)` (nullable), H5P core API major version required.
- **core_minor**: `SMALLINT(5)` (nullable), H5P core API minor version required.
- **drop_library_css**: `LONGTEXT` (nullable), List of libraries that should not have CSS included if this library is used.
- **embed_types**: `VARCHAR(255)`, List of supported embed types.
- **enabled**: `BIT(1)` (nullable), Defines if this library is enabled (1) or not (0).
- **example**: `LONGTEXT` (nullable), Example URL.
- **full_screen**: `BIT(1)`, Display full_screen button.
- **machine_name**: `VARCHAR(255)`, The library machine name.
- **major_version**: `SMALLINT(5)`, Major version of the library.
- **meta_data_settings**: `LONGTEXT` (nullable), Library metadata settings.
- **minor_version**: `SMALLINT(5)`, Minor version of the library.
- **patch_version**: `SMALLINT(5)`, Patch version of the library.
- **pre_loaded_css**: `LONGTEXT` (nullable), Comma-separated list of stylesheets to load.
- **pre_loaded_js**: `LONGTEXT` (nullable), Comma-separated list of scripts to load.
- **runnable**: `BIT(1)`, Can this library be started by the module?
- **semantics**: `LONGTEXT` (nullable), The semantics definition in JSON format.
- **title**: `VARCHAR(255)`, The human-readable name of this library.
- **tutorial**: `LONGTEXT` (nullable), Tutorial URL.

---

### Table: h5p_libraries_cachedassets **

Stores H5P cached library assets.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **hash**: `VARCHAR(255)`, Cache hash key that this library is part of.
- **library_id**: `BIGINT(19)`, ID of the library.

---

### Table: h5p_library_dependencies **

Stores H5P library dependencies.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **dependency_type**: `VARCHAR(255)`, The type of dependency (e.g., preloaded, dynamic, or editor).
- **library_id**: `BIGINT(19)`, ID of the H5P library.
- **required_library_id**: `BIGINT(19)`, The dependent library to load.

---

### Table: h5pactivities **

Stores the h5pactivity activity module instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the activity instance.
- **course**: `BIGINT(19)`, ID of the course this activity is part of.
- **display_options**: `SMALLINT(5)`, H5P Button display options.
- **enable_tracking**: `BIT(1)`, Enable xAPI tracking.
- **grade**: `BIGINT(19)` (nullable), Grade associated with the activity.
- **grade_method**: `SMALLINT(5)`, Which H5P attempt is used for grading.
- **intro**: `LONGTEXT` (nullable), Activity description.
- **intro_format**: `SMALLINT(5)`, Format of the intro field.
- **name**: `VARCHAR(255)`, Name of the activity module instance.
- **review_mode**: `SMALLINT(5)` (nullable), Review mode setting.
- **time_created**: `BIGINT(19)`, Timestamp of when the instance was added to the course.
- **time_modified**: `BIGINT(19)`, Timestamp of when the instance was last modified.

---

### Table: h5pactivity_attempts **

Stores users' attempts inside H5P activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt**: `MEDIUMINT(7)`, Attempt number.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **duration**: `BIGINT(19)` (nullable), Number of seconds invested in that attempt.
- **h5p_activity_id**: `BIGINT(19)`, H5P activity ID.
- **max_score**: `BIGINT(19)` (nullable), Maximum score achieved.
- **raw_score**: `BIGINT(19)` (nullable), Raw score achieved.
- **scaled**: `DECIMAL(10)`, Scaled score (0..1) reflecting the learner's performance.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **time_created**: `BIGINT(19)`, Timestamp of when the attempt was created.
- **time_modified**: `BIGINT(19)`, Timestamp of when the attempt was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who made the attempt.

---

### Table: h5pactivity_attempts_results **

Stores detailed tracking information for H5P activities attempts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **additionals**: `LONGTEXT` (nullable), Extra sub_content information in JSON format.
- **attempt_id**: `BIGINT(19)`, ID of the related attempt in `h5pactivity_attempts`.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **correct_pattern**: `LONGTEXT` (nullable), Correct pattern in xAPI format.
- **description**: `LONGTEXT` (nullable), Description of the attempt result.
- **duration**: `BIGINT(19)` (nullable), Seconds invested in this result.
- **interaction_type**: `VARCHAR(128)` (nullable), Type of interaction.
- **max_score**: `BIGINT(19)`, Maximum score achievable.
- **raw_score**: `BIGINT(19)`, Raw score achieved.
- **response**: `LONGTEXT`, User response data in xAPI format.
- **sub_content**: `VARCHAR(128)` (nullable), sub_content identifier.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **time_created**: `BIGINT(19)`, Timestamp of when the result was created.

---

This detailed information about the `h5p`, `h5p_contents_libraries`, `h5p_libraries`, `h5p_libraries_cachedassets`, `h5p_library_dependencies`, `h5pactivity`, `h5pactivity_attempts`, and `h5pactivity_attempts_results` tables provides a comprehensive understanding of how H5P content and related activities are structured and managed within the database schema.


---


## i18n-api
# i18n Dash

## Tables

List of Tables with their function described below:

### localization_languages

This table saves information about languages for localization

#### Fields

- id
- name
- flag
- country_id

### localization_fields

list of field used throughout the platform

#### Fields

- id
- name
- description
- default_value

### localization_translations

fields translated to localized language

#### Fields

- id
- localization_field_id
- localization_language_id
- value

### localization_user

#### fields

- id
- localization_language_id


---


## imscp-api
### Table: imscps **

Stores information about each IMS CP (Content Package) resource in the system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the IMS CP resource.
- **course**: `BIGINT(19)`, The ID of the course that this IMS CP resource belongs to.
- **intro**: `LONGTEXT` (nullable), Introduction or description of the IMS CP resource.
- **intro_format**: `SMALLINT(5)`, Format of the `intro` field (e.g., plain text, HTML).
- **keep_old**: `BIGINT(19)`, Counter incremented after each file change to solve browser caching issues. Default value is -1.
- **name**: `VARCHAR(255)`, The name of the IMS CP resource.
- **revision**: `BIGINT(19)`, Counter incremented after each file change to solve browser caching issues. Default value is 0.
- **structure**: `LONGTEXT` (nullable), Structure of the IMS CP resource, stored in a long text format.
- **created_at**: `BIGINT(19)`, Timestamp of the creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.

---

This table `imscp` is designed to handle IMS Content Packages, with fields to store essential information like course association, introduction, structure, and mechanisms to manage file revisions and caching issues.


---


## inmail-api
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---


## label-api
### Table: label

Stores information about labels used in courses within the Moodle system. Labels are text or media elements used to provide information or instructions within a course.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the label.
- **course**: `BIGINT(19)`, The ID of the course that this label belongs to.
- **intro**: `LONGTEXT`, The content of the label, which can include text, images, or other media.
- **intro_format**: `SMALLINT(5)` (nullable, default `0`), The format of the `intro` field (e.g., plain text, HTML).
- **name**: `VARCHAR(255)`, The name of the label.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification of the label.

---

This table `label` is designed to handle the creation and management of labels within Moodle courses. Labels can be used to add text or media content for instructional purposes or to provide additional information to course participants.


---


## lesson-api
### Table: lessons **

Defines the lesson structure and settings within the Moodle system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the lesson.
- **activity_link**: `BIGINT(19)`, Link to another activity within the course (default `0`).
- **allow_offline_attempts**: `BIT(1)` (nullable, default `0`), Whether to allow the lesson to be attempted offline in the mobile app.
- **available**: `BIGINT(19)`, Timestamp indicating when the lesson becomes available.
- **bg_color**: `VARCHAR(7)` (default `#FFFFFF`), Background color of the lesson.
- **completion_end_reached**: `BIT(1)` (nullable, default `0`), Completion when end is reached.
- **completion_time_spent**: `BIGINT(19)` (nullable, default `0`), Completion when a certain time is spent on the lesson.
- **conditions**: `LONGTEXT` (nullable), Additional conditions for accessing the lesson.
- **course**: `BIGINT(19)`, The ID of the course this lesson belongs to.
- **custom**: `SMALLINT(5)` (default `0`), Custom setting for the lesson.
- **deadline**: `BIGINT(19)`, Deadline for completing the lesson.
- **dependency**: `BIGINT(19)`, Dependency on another lesson.
- **display_left**: `SMALLINT(5)` (default `0`), Display the left menu.
- **display_left_if**: `SMALLINT(5)` (default `0`), Display the left menu if certain conditions are met.
- **feedback**: `SMALLINT(5)` (default `1`), Feedback settings for the lesson.
- **grade**: `BIGINT(19)`, Grade associated with the lesson.
- **height**: `BIGINT(19)` (default `480`), Height of the lesson window.
- **intro**: `LONGTEXT` (nullable), Introduction text for the lesson.
- **intro_format**: `SMALLINT(5)` (default `0`), Format of the introduction text.
- **max_answers**: `SMALLINT(5)` (default `4`), Maximum number of answers for a question.
- **max_attempts**: `SMALLINT(5)` (default `5`), Maximum number of attempts allowed.
- **max_pages**: `SMALLINT(5)` (default `0`), Maximum number of pages in the lesson.
- **media_close**: `SMALLINT(5)` (default `0`), Close media setting.
- **media_file**: `VARCHAR(255)`, Local file path or full external URL for media.
- **media_height**: `BIGINT(19)` (default `100`), Height of the media.
- **media_width**: `BIGINT(19)` (default `650`), Width of the media.
- **min_questions**: `SMALLINT(5)` (default `0`), Minimum number of questions.
- **mod_attempts**: `SMALLINT(5)` (default `0`), Module attempts setting.
- **name**: `VARCHAR(255)`, Name of the lesson.
- **next_page_default**: `SMALLINT(5)` (default `0`), Default next page.
- **ongoing**: `SMALLINT(5)` (default `0`), Ongoing score display.
- **password**: `VARCHAR(32)`, Password for the lesson.
- **practice**: `SMALLINT(5)` (default `0`), Practice lesson setting.
- **progressbar**: `SMALLINT(5)` (default `0`), Progress bar display setting.
- **retake**: `SMALLINT(5)` (default `1`), Allow retake setting.
- **review**: `SMALLINT(5)` (default `0`), Review setting.
- **slideshow**: `SMALLINT(5)` (default `0`), Slideshow setting.
- **time_limit**: `BIGINT(19)`, Time limit for the lesson.
- **use_max_grade**: `SMALLINT(5)` (default `0`), Use maximum grade setting.
- **use_password**: `SMALLINT(5)` (default `0`), Use password setting.
- **width**: `BIGINT(19)` (default `640`), Width of the lesson window.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: lesson_answers **

Defines the answers for questions in lessons.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the answer.
- **answer**: `LONGTEXT` (nullable), The text of the answer.
- **answer_format**: `TINYINT(3)` (default `0`), Format of the answer text.
- **flags**: `SMALLINT(5)` (default `0`), Additional settings for the answer.
- **grade**: `SMALLINT(5)` (default `0`), Grade associated with the answer.
- **jump_to**: `BIGINT(19)` (default `0`), ID of the next page to jump to.
- **lesson_id**: `BIGINT(19)`, ID of the lesson this answer belongs to.
- **page_id**: `BIGINT(19)`, ID of the page this answer belongs to.
- **response**: `LONGTEXT` (nullable), Response text for the answer.
- **response_format**: `TINYINT(3)` (default `0`), Format of the response text.
- **score**: `BIGINT(19)` (default `0`), Score associated with the answer.
- **time_created**: `BIGINT(19)`, Timestamp of when the answer was created.
- **time_modified**: `BIGINT(19)`, Timestamp of when the answer was last modified.

---

### Table: lesson_attempts **

Defines the attempts made by users on lessons.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the attempt.
- **answer_id**: `BIGINT(19)`, ID of the selected answer.
- **correct**: `BIGINT(19)`, Indicates if the attempt was correct.
- **lesson_id**: `BIGINT(19)`, ID of the lesson.
- **page_id**: `BIGINT(19)`, ID of the page the attempt was made on.
- **retry**: `SMALLINT(5)`, Retry count for the attempt.
- **user_answer**: `LONGTEXT` (nullable), User's answer.
- **time_seen**: `BIGINT(19)`, Timestamp of when the attempt was made.
- **user_id**: `BIGINT(19)`, ID of the user who made the attempt.

---

### Table: lesson_branches **

Defines branches for each lesson and user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the branch.
- **flag**: `SMALLINT(5)`, Flag for the branch.
- **lesson_id**: `BIGINT(19)`, ID of the lesson.
- **next_page_id**: `BIGINT(19)`, ID of the next page in the branch.
- **page_id**: `BIGINT(19)`, ID of the page in the branch.
- **retry**: `BIGINT(19)`, Retry count for the branch.
- **time_seen**: `BIGINT(19)`, Timestamp of when the branch was seen.
- **user_id**: `BIGINT(19)`, ID of the user.

---

### Table: lesson_grades **

Defines grades for lessons.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **completed**: `BIGINT(19)`, Timestamp of when the lesson was completed.
- **grade**: `DOUBLE(22)`, Grade for the lesson.
- **late**: `SMALLINT(5)`, Indicates if the lesson was completed late.
- **lesson_id**: `BIGINT(19)`, ID of the lesson.
- **user_id**: `BIGINT(19)`, ID of the user.

---

### Table: lesson_overrides **

Defines overrides to lesson settings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the override.
- **available**: `BIGINT(19)` (nullable), Time at which students may start attempting this lesson.
- **deadline**: `BIGINT(19)` (nullable), Time by which students must have completed their attempt.
- **group_id**: `BIGINT(19)` (nullable), Foreign key references `groups.id`.
- **lesson_id**: `BIGINT(19)`, Foreign key references `lesson


### Table: lesson_pages **


#### Fields

- **id** BIGINT
- **contents** LONGTEXT
- **contents_format** TINYINT
- **display** SMALLINT
- **layout** SMALLINT
- **lesson_id** BIGINT
- **next_page_id** BIGINT
- **prev_page_id** BIGINT
- **q_option** SMALLINT
- **q_type** SMALLINT
- **title** VARCHAR
- **time_created** BIGINT
- **time_modified** BIGINT

### Table: lesson_timer


#### Fields

- **id** BIGINT
- **completed** BIT
- **lesson_id** BIGINT
- **lesson_time** BIGINT
- **start_time** BIGINT
- **time_modified_offline** BIGINT
- **user_id** BIGINT



---


## license-api
### Table: licenses

Stores information about licenses used, including custom licenses and core licenses.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the license.
- **custom**: `BIT(1)`, Flag indicating whether the license is custom (`1`) or a core license (`0`). Custom licenses can be updated or deleted, while core licenses cannot.
- **enabled**: `BIT(1)`, Flag indicating whether the license is enabled (`1`) or not (`0`).
- **full_name**: `LONGTEXT` (nullable), Full name or description of the license.
- **short_name**: `VARCHAR(255)` (nullable), Short name or abbreviation of the license.
- **sort_order**: `MEDIUMINT(7)`, Sort order of the license.
- **source**: `VARCHAR(255)` (nullable), Source or origin of the license.
- **version**: `BIGINT(19)`, Version number of the license.

---

This schema should provide a comprehensive structure for managing licenses within the system. If you need further details or have specific requirements for how licenses should be managed, feel free to let me know!


---


## lock-api
### Table: lock_dbs

#### Description

This table stores active and inactive lock types for database locking method.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the lock entry.
- **expires**: `BIGINT(19)`, Expiry time for an active lock.
- **owner**: `VARCHAR(36)` (nullable), UUID indicating the owner of the lock.
- **resource_key**: `VARCHAR(255)`, String identifying the resource to be locked. It should use the Frankenstyle format.

---

This table serves as a repository for managing database locks, including information about the owner, the resource being locked, and the expiry time for active locks. If you have any additional requirements or questions about how database locking is implemented, feel free to ask!


---


## log-api
### Table: log_displays **

#### Description

Specifies a Moodle table and field for a particular module/action.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the entry.
- **action**: `VARCHAR(40)`, Specifies the action performed.
- **component**: `VARCHAR(100)`, Specifies the owner of the log action.
- **field**: `VARCHAR(200)`, Specifies the field of the table.
- **module**: `VARCHAR(20)`, Module related to the action.
- **m_table**: `VARCHAR(30)`, Moodle table associated with the action.

---

### Table: log_queries **

#### Description

Logged database queries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **back_trace**: `LONGTEXT`, PHP execution trace.
- **error**: `MEDIUMINT(7)`, Indicates if there was an error.
- **exec_time**: `DECIMAL(10)`, Query execution time in seconds as a float.
- **info**: `LONGTEXT`, Detailed information such as error text.
- **q_type**: `MEDIUMINT(7)`, Query type constant.
- **sql_params**: `LONGTEXT`, Query parameters.
- **sql_text**: `LONGTEXT`, Query SQL.
- **time_logged**: `BIGINT(19)`, Timestamp when log info was stored into the database.

---

### Table: logstore_standard_logs **

#### Description

Standard log table.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **action**: `VARCHAR(100)`, Specifies the action performed.
- **anonymous**: `BIT(1)`, Indicates if the event was anonymous at the time of triggering.
- **component**: `VARCHAR(100)`, Specifies the component related to the action.
- **context_id**: `BIGINT(19)`, Context ID associated with the action.
- **context_instance_id**: `BIGINT(19)`, Context instance ID associated with the action.
- **context_level**: `BIGINT(19)`, Context level associated with the action.
- **course_id**: `BIGINT(19)`, Course ID associated with the action.
- **crud**: `VARCHAR(1)`, Specifies the CRUD operation performed.
- **edu_level**: `BIT(1)`, Educational level associated with the action.
- **event_name**: `VARCHAR(255)`, Name of the event.
- **ip**: `VARCHAR(45)`, IP address associated with the action.
- **object_id**: `BIGINT(19)`, Object ID associated with the action.
- **object_table**: `VARCHAR(50)`, Table name associated with the object.
- **origin**: `VARCHAR(10)`, Specifies the origin of the action (e.g., CLI, cron, WS).
- **other**: `LONGTEXT`, Additional information related to the action.
- **real_user_id**: `BIGINT(19)`, Real user ID when logged in as another user.
- **related_user_id**: `BIGINT(19)`, Related user ID associated with the action.
- **target**: `VARCHAR(100)`, Target related to the action.
- **time_created**: `BIGINT(19)`, Timestamp of when the log entry was created.
- **user_id**: `BIGINT(19)`, User ID associated with the action.

---

These tables play a crucial role in logging various activities within the Moodle system, such as user actions, database queries, and standard event logs. If you need further clarification on any specific aspect of logging or have additional questions, feel free to ask!


---


## lti-api
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


---


## mass-mail-api
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


---


## media-api
# media Dash

## Tables

List of Tables with their function described below:

### medias

This table saves information about media

#### Fields

- id
- name
- alt
- mime
- url
- provider
- related_id
- related_type
- related_field
- order
- created_At
- updated_At


---


## message-api
### Table: messages **

Stores all messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message.
- **component**: `VARCHAR(100)`, The component associated with the message.
- **conversation_id**: `BIGINT(19)`, ID of the conversation. \* Moved from Messages (containing all messages)
- **context_url**: `LONGTEXT`, URL linking to the context of the event.
- **context_url_name**: `LONGTEXT`, Display text for the context URL.
- **custom_data**: `LONGTEXT`, Custom data for the message processor (JSON format).
- **event_type**: `VARCHAR(100)`, Type of event related to the message.
- **full_message**: `LONGTEXT`, Full content of the message.
- **full_message_format**: `SMALLINT(5)`, Format of the full message.
- **full_message_html**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **small_message**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **time_user_from_deleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **time_user_to_deleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **user_id_to**: `BIGINT(19)`, ID of the receiver.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id_from**: `BIGINT(19)`, ID of the sender.

---

### Table: message_airnotifier_devices **

Stores information about devices registered in Airnotifier.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the device.
- **enable**: `BIT(1)`, Indicates if the device is enabled.
- **user_device_id**: `BIGINT(19)`, ID of the user device in the user_devices table.

---

### Table: message_contact_requests **

Maintains a list of contact requests between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact request.
- **requested_user_id**: `BIGINT(19)`, ID of the requested user.
- **time_created**: `BIGINT(19)`, Timestamp when the request was created.
- **user_id**: `BIGINT(19)`, ID of the user who made the request.

---

### Table: message_contacts **

Maintains lists of contacts between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact.
- **contact_id**: `BIGINT(19)`, ID of the contact user.
- **time_created**: `BIGINT(19)`, Timestamp when the contact was created.
- **user_id**: `BIGINT(19)`, ID of the user who has the contact.

---

### Table: message_conversation_actions **

Stores all per-user actions on individual conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the action.
- **action**: `BIGINT(19)`, Action performed by the user on the conversation.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the action was performed.
- **user_id**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_conversation_members **

Stores all members in conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation member.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the user was added to the conversation.
- **user_id**: `BIGINT(19)`, ID of the user in the conversation.

---

### Table: message_conversations **

Stores all message conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation.
- **component**: `VARCHAR(100)`, Component associated with the conversation.
- **context_id**: `BIGINT(19)`, Context ID of the item or course.
- **conv_hash**: `VARCHAR(40)`, Hash value of the conversation.
- **enabled**: `BIT(1)`, Indicates if the conversation is enabled.
- **item_id**: `BIGINT(19)`, ID of the item associated with the conversation.
- **item_type**: `VARCHAR(100)`, Type of the item associated with the conversation.
- **name**: `VARCHAR(255)`, Name of the conversation.
- **type**: `BIGINT(19)`, Type of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the conversation was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the conversation was last modified.

---

### Table: message_email_messages **

Tracks what emails to send in an email digest.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the email message.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **message_id**: `BIGINT(19)`, ID of the message to be sent via email.
- **user_id_to**: `BIGINT(19)`, ID of the user who will receive the email.

---

### Table: message_popups **

Tracks the state of notifications for the popup message processor.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **is_read**: `BIT(1)`, Indicates if the popup notification has been read.
- **message_id**: `BIGINT(19)`, ID of the message associated with the popup notification.

---

### Table: message_popup_notifications **

Tracks notifications to display in the message output popup.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **notification_id**: `BIGINT(19)`, ID of the notification to display.

---

### Table: message_processors **

Lists message output plugins.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the processor.
- **enabled**: `BIT(1)`, Indicates if the processor is enabled.
- **name**: `VARCHAR(166)`, Name of the message processor.

---

### Table: message_providers **

Stores message providers for modules and core systems.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message provider.
- **capability**: `VARCHAR(255)`, Permission required to see this message provider.
- **component**: `VARCHAR(200)`, Component that produces the messages.
- **name**: `VARCHAR(100)`, Name of the message provider.

---

### Table: message_reads **

Tracks all messages that have been read.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read message.
- **component**: `VARCHAR(100)`, Component associated with the message.
- **context_url**: `LONGTEXT`, URL linking to the context of the event.
- **context_url_name**: `LONGTEXT`, Display text for the context URL.
- **event_type**: `VARCHAR(100)`, Type of event related to the message.
- **full_message**: `LONGTEXT`, Full content of the message.
- **full_message_format**: `SMALLINT(5)`, Format of the full message.
- **full_message_html**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **small_message**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **time_read**: `BIGINT(19)`, Timestamp when the message was read.
- **time_user_from_deleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **time_user_to_deleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **user_id_from**: `BIGINT(19)`, ID of the sender.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id_to**: `BIGINT(19)`, ID of the receiver.

---

### Table: message_user_actions **

Tracks all per-user actions on individual messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user action.
- **action**: `BIGINT(19)`, Action performed by the user on the message.
- **message_id**: `BIGINT(19)`, ID of the message associated with the action.
- **time_created**: `BIGINT(19)`, Timestamp when the action was performed.
- **user_id**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_users_blockeds **

Maintains lists of blocked users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the blocked user entry.
- **blocked_user_id**: `BIGINT(19)`, ID of the blocked user.
- **time_created**: `BIGINT(19)`, Timestamp when the user was blocked.
- **user_id**: `BIGINT(19)`, ID of the user who blocked the other user.

---

### Table: messageinbound_datakeys **

Stores secret keys for inbound message data items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the data key.
- **data_key**: `VARCHAR(64)`, Secret key for the data item.
- **data_value**: `BIGINT(19)`, Integer value of the data item.
- **expires**: `BIGINT(19)`, Expiry time of the key.
- **handler**: `BIGINT(19)`, ID of the handler associated with the key.
- **time_created**: `BIGINT(19)`, Timestamp when the data key was created.

---

### Table: messageinbound_handlers **

Defines inbound message handlers.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the handler.
- **class_name**: `VARCHAR(255)`, Class defining the inbound message handler.
- **component**: `VARCHAR(100)`, Component the handler belongs to.
- **default_expiration**: `BIGINT(19)`, Default expiration period for new keys.
- **enabled**: `BIT(1)`, Indicates if the handler is enabled.
- **validate_address**: `BIT(1)`, Indicates if the sender address should be validated.

---

### Table: messageinbound_messagelists **

Lists message IDs for existing replies.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message list entry.
- **address**: `LONGTEXT`, Inbound message address.
- **message_id**: `LONGTEXT`, Message ID for the reply.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id**: `BIGINT(19)`, ID of the user associated with the message.


---


## mnet-api
### Table: mnet_application

Information about applications on remote hosts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the application.
- **display_name**: `VARCHAR(50)` NOT NULL, Display name of the application.
- **name**: `VARCHAR(50)` NOT NULL, Name of the application.
- **sso_jump_url**: `VARCHAR(255)` NOT NULL, URL for SSO jump.
- **sso_land_url**: `VARCHAR(255)` NOT NULL, URL for SSO land.
- **xmlrpc_server_url**: `VARCHAR(255)` NOT NULL, URL for XML-RPC server.

#### Indexes

- `CREATE INDEX idx_name ON mnet_application(name);`

---

### Table: mnet_host

Information about the local and remote hosts for RPC.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the host.
- **application_id**: `BIGINT` NOT NULL, Application ID associated with the host.
- **deleted**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the host is deleted.
- **force_theme**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the theme should be forced.
- **ip_address**: `VARCHAR(45)` NOT NULL, IP address of the host.
- **last_connect_time**: `BIGINT`, Last connection time.
- **last_log_id**: `BIGINT`, Last log ID.
- **name**: `VARCHAR(80)` NOT NULL, Name of the host.
- **port_no**: `INTEGER` NOT NULL, Port number.
- **public_key**: `TEXT` NOT NULL, Public key of the host.
- **public_key_expires**: `BIGINT` NOT NULL, Expiry time of the public key.
- **ssl_verification**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if SSL verification is enabled.
- **theme**: `VARCHAR(100)`, Theme associated with the host.
- **transport**: `SMALLINT` NOT NULL, Transport method used by the host.
- **wwwroot**: `VARCHAR(255)` NOT NULL, Root URL of the host.

#### Indexes

- `CREATE INDEX idx_applicationid ON mnet_host(applicationid);`
- `CREATE INDEX idx_ip_address ON mnet_host(ip_address);`
- `CREATE INDEX idx_name ON mnet_host(name);`

---

### Table: mnet_host2services

Information about the services for a given host.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the host-service link.
- **host_id**: `BIGINT` NOT NULL, Host ID associated with the service.
- **service_id**: `BIGINT` NOT NULL, Service ID associated with the host.
- **publish**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is published.
- **subscribe**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is subscribed.

#### Indexes

- `CREATE INDEX idx_hostid ON mnet_host2service(hostid);`
- `CREATE INDEX idx_serviceid ON mnet_host2service(serviceid);`

---

### Table: mnet_log

Store session data from users migrating to other sites.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the log entry.
- **action**: `VARCHAR(40)` NOT NULL, Action performed.
- **cm_id**: `BIGINT`, Course module ID.
- **course_id**: `BIGINT`, Course ID.
- **course_name**: `VARCHAR(40)`, Name of the course.
- **host_id**: `BIGINT` NOT NULL, Host ID.
- **info**: `VARCHAR(255)`, Additional information.
- **ip**: `VARCHAR(45)` NOT NULL, IP address.
- **module**: `VARCHAR(20)` NOT NULL, Module name.
- **remote_id**: `BIGINT`, Remote ID.
- **time**: `BIGINT` NOT NULL, Timestamp of the action.
- **url**: `VARCHAR(100)`, URL accessed.
- **user_id**: `BIGINT` NOT NULL, User ID.

#### Indexes

- `CREATE INDEX idx_action ON mnet_log(action);`
- `CREATE INDEX idx_cmid ON mnet_log(cmid);`
- `CREATE INDEX idx_course ON mnet_log(course);`
- `CREATE INDEX idx_hostid ON mnet_log(hostid);`
- `CREATE INDEX idx_module ON mnet_log(module);`
- `CREATE INDEX idx_remoteid ON mnet_log(remoteid);`
- `CREATE INDEX idx_time ON mnet_log(time);`
- `CREATE INDEX idx_userid ON mnet_log(userid);`

---

### Table: mnet_remote_rpc

Functions that might be called remotely.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the function.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the function is enabled.
- **function_name**: `VARCHAR(40)` NOT NULL, Name of the function.
- **plugin_name**: `VARCHAR(20)` NOT NULL, Name of the plugin.
- **plugin_type**: `VARCHAR(20)` NOT NULL, Type of the plugin.
- **xml_rpc_path**: `VARCHAR(80)` NOT NULL, XML-RPC path of the function.

#### Indexes

- `CREATE INDEX idx_functionname ON mnet_remote_rpc(function_name);`
- `CREATE INDEX idx_pluginname ON mnet_remote_rpc(plugin_name);`

---

### Table: mnet_remote_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service-function link.
- **rpc_id**: `BIGINT` NOT NULL, Function ID.
- **service_id**: `BIGINT` NOT NULL, Service ID.

#### Indexes

- `CREATE INDEX idx_rpcid ON mnet_remote_service2rpc(rpcid);`
- `CREATE INDEX idx_serviceid ON mnet_remote_service2rpc(serviceid);`

---

### Table: mnet_rpc

Functions or methods that we may publish or subscribe to.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the function.
- **classname**: `VARCHAR(150)`, Class name of the function.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the function is enabled.
- **file_name**: `VARCHAR(100)` NOT NULL, Filename of the function.
- **function_name**: `VARCHAR(40)` NOT NULL, Name of the function.
- **help**: `TEXT`, Help text for the function.
- **plugin_name**: `VARCHAR(20)` NOT NULL, Name of the plugin.
- **plugin_type**: `VARCHAR(20)` NOT NULL, Type of the plugin.
- **profile**: `TEXT`, Method signature.
- **static**: `BOOLEAN`, Indicates if the function is static.
- **xml_rpc_path**: `VARCHAR(80)` NOT NULL, XML-RPC path of the function.

#### Indexes

- `CREATE INDEX idx_functionname ON mnet_rpc(functionname);`
- `CREATE INDEX idx_pluginname ON mnet_rpc(pluginname);`

---

### Table: mnet_services

A service is a group of functions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service.
- **api_version**: `VARCHAR(10)` NOT NULL, API version of the service.
- **description**: `VARCHAR(40)` NOT NULL, Description of the service.
- **name**: `VARCHAR(40)` NOT NULL, Name of the service.
- **offer**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is offered.

#### Indexes

- `CREATE INDEX idx_name ON mnet_service(name);`

---

### Table: mnet_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service-function link.
- **rpc_id**: `BIGINT` NOT NULL, Function ID.
- **service_id**: `BIGINT` NOT NULL, Service ID.

#### Indexes

- `CREATE INDEX idx_rpcid ON mnet_service2rpc(rpcid);`
- `CREATE INDEX idx_serviceid ON mnet_service2rpc(serviceid);`

---

### Table: mnet_sessions

Store session data from users migrating to other sites.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the session.
- **confirm_timeout**: `BIGINT` NOT NULL, UNIX timestamp for expiry of session.
- **expires**: `BIGINT` NOT NULL, Expire time of session on peer.
- **mnet_host_id**: `BIGINT` NOT NULL, Unique remote host ID.
- **session_id**: `VARCHAR(40)` NOT NULL, The session ID.
- **token**: `VARCHAR(40)` NOT NULL, Unique SHA1 token.
- **user_agent**: `VARCHAR(40)` NOT NULL, SHA1 hash of user agent.
- **username**: `VARCHAR(100)` NOT NULL, Unique username.
- **user_id**: `BIGINT` NOT NULL, Unique user ID.

#### Indexes

- `CREATE INDEX idx_mnethostid ON mnet_session(mnet_host_id);`
- `CREATE INDEX idx_session_id ON mnet_session(session_id);`
- `CREATE INDEX idx_token ON mnet_session(token);`
- `CREATE INDEX idx_userid ON mnet_session(user_id);`

---

### Table: mnet_sso_access_controls

Users by host permitted (or not) to login from a remote provider.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the access control entry.
- **access_ctrl**: `VARCHAR(20)` NOT NULL, Indicates whether login is allowed or denied.
- **mnet_host_id**: `BIGINT` NOT NULL, ID of the MNet host.
- **username**: `VARCHAR(100)` NOT NULL, Username of the user.

#### Indexes

- `CREATE INDEX idx_mnet_host_id ON mnet_sso_access_control(mnet_host_id);`
- `CREATE INDEX idx_username ON mnet_sso_access_control(username);`

---

### Table: mnet_service_enrol_courses

Caches the information fetched via XML-RPC about courses on remote hosts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique remote-course ID.
- **category_id**: `BIGINT` NOT NULL, ID of the category on the remote server.
- **category_name**: `VARCHAR(255)` NOT NULL, Name of the category.
- **full_name**: `VARCHAR(254)` NOT NULL, Full name of the course.
- **host_id**: `BIGINT` NOT NULL, ID of the remote MNet host.
- **id_number**: `VARCHAR(100)`, ID number of the course.
- **remote_id**: `BIGINT` NOT NULL, ID of the course on its home server.
- **role_id**: `BIGINT`, ID of the role at the remote server for local users.
- **role_name**: `VARCHAR(255)`, Name of the role at the remote server.
- **short_name**: `VARCHAR(100)` NOT NULL, Short name of the course.
- **sort_order**: `BIGINT`, Sort order of the course.
- **start_date**: `BIGINT` NOT NULL, Start date of the course.
- **summary**: `TEXT`, Summary of the course.
- **summary_format**: `SMALLINT`, Format of the summary field.

#### Indexes

- `CREATE INDEX idx_categoryid ON mnetservice_enrol_courses(categoryid);`
- `CREATE INDEX idx_hostid ON mnetservice_enrol_courses(hostid);`
- `CREATE INDEX idx_remoteid ON mnetservice_enrol_courses(remoteid);`
- `CREATE INDEX idx_shortname ON mnetservice_enrol_courses(shortname);`
- `CREATE INDEX idx_startdate ON mnetservice_enrol_courses(startdate);`

---

### Table: mnet_service_enrol_enrolments

Caches the information about enrolments of local users in remote courses.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique enrolment ID.
- **enrol_time**: `BIGINT` NOT NULL, Time of enrolment.
- **enrol_type**: `VARCHAR(20)` NOT NULL, Name of the enrolment plugin at the remote server.
- **host_id**: `BIGINT` NOT NULL, ID of the remote MNet host.
- **remote_course_id**: `BIGINT` NOT NULL, ID of the course at the remote server.
- **role_name**: `VARCHAR(255)`, Name of the role at the remote server.
- **user_id**: `BIGINT` NOT NULL, ID of the local user.

#### Indexes

- `CREATE INDEX idx_hostid ON mnetservice_enrol_enrolments(hostid);`
- `CREATE INDEX idx_remotecourseid ON mnetservice_enrol_enrolments(remotecourseid);`
- `CREATE INDEX idx_userid ON mnetservice_enrol_enrolments(userid);`


---


## module-api
### Table: modules

This table stores information about the modules available on the site.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the module.
- **cron**: `BIGINT(19)`, The interval in seconds between cron executions for this module.
- **last_cron**: `BIGINT(19)`, The timestamp of the last cron execution for this module.
- **name**: `VARCHAR(20)`, The name of the module.
- **search**: `VARCHAR(255)`, Search path for the module.
- **visible**: `BIT(1)`, Indicates whether the module is visible (`1`) or not (`0`).


---


## my-pages-api
### Table: my_pages

This table stores extra user pages for the My Moodle system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the page.
- **name**: `VARCHAR(200)`, The name of the page (freeform text).
- **private**: `BIT(1)`, Indicates whether the page is private (`1`, dashboard) or public (`0`, profile).
- **sort_order**: `MEDIUMINT(7)`, The order of the pages for a user.
- **userid**: `BIGINT(19)`, The user who owns this page or `0` for system defaults.


---


## note-api
### notes

- organizationId: varchar('organization_id', { length: 191 }).notNull(),
  id: varchar('id', { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
- name: varchar('name', { length: 256 }).notNull(),
- body: text('body'),
- userId: varchar('user_id', { length: 256 }).notNull(),
- createdAt: timestamp('created_at').notNull().default(sql`now()`),
- updatedAt: timestamp('updated_at').notNull().default(sql`now()`)


---


## notification-api
### Table: notifications

This table stores all notifications.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the notification.
- **component**: `VARCHAR(100)` (Nullable), The component that generated the notification.
- **context_url**: `LONGTEXT` (2147483647) (Nullable), URL related to the notification's context.
- **context_url_name**: `LONGTEXT` (2147483647) (Nullable), Display name for the context URL.
- **custom_data**: `LONGTEXT` (2147483647) (Nullable), Custom data to be passed to the message processor. Must be serializable using `json_encode()`.
- **event_type**: `VARCHAR(100)` (Nullable), The type of event that triggered the notification.
- **full_message**: `LONGTEXT` (2147483647) (Nullable), The full message of the notification.
- **full_message_format**: `BIT(1)`, The format of the full message.
- **full_message_html**: `LONGTEXT` (2147483647) (Nullable), The full message in HTML format.
- **small_message**: `LONGTEXT` (2147483647) (Nullable), A short version of the message (e.g., SMS).
- **subject**: `LONGTEXT` (2147483647) (Nullable), The subject of the message.
- **time_read**: `BIGINT(19)` (Nullable), The time when the notification was read.
- **user_id_to**: `BIGINT(19)`, The user ID of the recipient.
- **created_at**: `BIGINT(19)`, The time when the notification was created.
- **updated_at**: `BIGINT(19)`, The time when the notification was created.
- **user_id_from**: `BIGINT(19)`, The user ID of the sender.


---


## oauth2-api
![Relationships Diagram](RelationshipsDiagram.png)

### Table: oauth2_access_token

Stores access tokens for system accounts to access OAuth2 services.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the access token.
- **expires**: `BIGINT` NOT NULL, Expiry timestamp according to the issuer.
- **issuer_id**: `BIGINT` NOT NULL, Corresponding OAuth2 issuer ID.
- **scope**: `TEXT` NOT NULL, The scope of the access token.
- **token**: `TEXT` NOT NULL, The access token.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuer_id ON oauth2_access_token(issuer_id);`
- `CREATE INDEX idx_user_id ON oauth2_access_token(user_id);`

---

### Table: oauth2_endpoints

Describes the named endpoint for an OAuth2 service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the endpoint.
- **issuer_id**: `BIGINT` NOT NULL, The identity provider this service belongs to.
- **name**: `VARCHAR(255)` NOT NULL, The service name.
- **url**: `TEXT` NOT NULL, The URL to the endpoint.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, The time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, The time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuer_id ON oauth2_endpoint(issuer_id);`
- `CREATE INDEX idx_user_id ON oauth2_endpoint(user_id);`

---

### Table: oauth2_issuer

Details for an OAuth2 connect identity issuer.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the issuer.
- **allowed_domains**: `TEXT` NOT NULL, Allowed domains for this issuer.
- **base_url**: `TEXT` NOT NULL, The base URL to the issuer.
- **basic_auth**: `BOOLEAN` NOT NULL DEFAULT FALSE, Use HTTP Basic authentication scheme when sending client ID and password.
- **client_id**: `TEXT` NOT NULL, The client ID used to connect to this OAuth2 service.
- **client_secret**: `TEXT` NOT NULL, The secret used to connect to this OAuth2 service.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the issuer is enabled.
- **image**: `TEXT` NOT NULL, Image associated with the issuer.
- **login_page_name**: `VARCHAR(255)` NOT NULL, Name to be displayed on the login page.
- **login_params**: `TEXT` NOT NULL, Additional parameters sent for a login attempt.
- **login_params_offline**: `TEXT` NOT NULL, Additional parameters sent for a login attempt to generate a refresh token.
- **login_scopes**: `TEXT` NOT NULL, The scopes requested for a normal login attempt.
- **login_scopes_offline**: `TEXT` NOT NULL, The scopes requested for a login attempt to generate a refresh token.
- **name**: `VARCHAR(255)` NOT NULL, The name of this identity issuer.
- **require_confirmation**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if confirmation is required.
- **scopes_supported**: `TEXT` NOT NULL, The list of scopes this service supports.
- **service_type**: `VARCHAR(255)` NOT NULL, Issuer service type, such as 'google' or 'facebook'.
- **show_on_login_page**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the issuer should be shown on the login page.
- **sort_order**: `BIGINT` NOT NULL, The defined sort order.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_name ON oauth2_issuer(name);`
- `CREATE INDEX idx_service_type ON oauth2_issuer(service_type);`
- `CREATE INDEX idx_user_id ON oauth2_issuer(user_id);`

---

### Table: oauth2_refresh_token

Stores refresh tokens which can be exchanged for access tokens.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the refresh token.
- **issuer_id**: `BIGINT` NOT NULL, Corresponding OAuth2 issuer ID.
- **scope_hash**: `VARCHAR(40)` NOT NULL, SHA1 hash of the scopes used when requesting the refresh token.
- **token**: `TEXT` NOT NULL, The refresh token.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user to whom this refresh token belongs.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_refresh_token(issuerid);`
- `CREATE INDEX idx_scopehash ON oauth2_refresh_token(scopehash);`
- `CREATE INDEX idx_userid ON oauth2_refresh_token(userid);`

---

### Table: oauth2_system_account

Stored details used to get an access token as a system user.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the system account.
- **email**: `TEXT` NOT NULL, The email connected to this issuer.
- **granted_scopes**: `TEXT` NOT NULL, The scopes that this system account has been granted access to.
- **issuer_id**: `BIGINT` NOT NULL, The ID of the OAuth2 identity issuer.
- **refresh_token**: `TEXT` NOT NULL, The refresh token used to request access tokens.
- **username**: `TEXT` NOT NULL, The username connected as a system account to this issuer.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_system_account(issuerid);`
- `CREATE INDEX idx_user_id ON oauth2_system_account(user_id);`

---

### Table: oauth2_user_field_mapping

Mapping of OAuth user fields to Moodle fields.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the mapping.
- **external_field**: `VARCHAR(500)` NOT NULL, The field name returned by the userinfo endpoint.
- **internal_field**: `VARCHAR(64)` NOT NULL, The name of the Moodle field this user field maps to.
- **issuer_id**: `BIGINT` NOT NULL, The OAuth issuer ID.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, The time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, The time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_user_field_mapping(issuerid);`
- `CREATE INDEX idx_user_id ON oauth2_user_field_mapping(user_id);`


---


## organization-api
### organizations

- id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
- name: varchar("name", { length: 256 }).notNull(),
- shortName: varchar("short_name", { length: 256 }),
- logo: varchar("logo", { length: 256 }),
- favicon: varchar("favicon", { length: 256 }),
- avatar: varchar("avatar", { length: 256 }),
- banner: varchar("banner", { length: 256 })


---


## page-api
### Table: page

Each record represents a page and its configuration data in the system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the page.
- **content**: `LONGTEXT(2147483647)` (Nullable), The content of the page.
- **content_format**: `SMALLINT(5)`, Format of the content (e.g., HTML, plain text).
- **course_id**: `BIGINT(19)`, The ID of the course this page belongs to.
- **display**: `SMALLINT(5)`, Display settings for the page.
- **display_options**: `LONGTEXT(2147483647)` (Nullable), Options for displaying the page.
- **intro**: `LONGTEXT(2147483647)` (Nullable), Introduction or description for the page.
- **intro_format**: `SMALLINT(5)`, Format of the intro field (e.g., HTML, plain text).
- **legacy_files**: `SMALLINT(5)`, Legacy file handling settings.
- **legacy_files_last**: `BIGINT(19)` (Nullable), Timestamp of the last legacy file modification.
- **name**: `VARCHAR(255)`, The name of the page.
- **revision**: `BIGINT(19)`, Incremented each time the file changes, used to solve browser caching issues.
- **created_at**: `BIGINT(19)`, Timestamp of the creation of the page.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the page.


---


## payment-api
### Table: paygw_paypal

Stores PayPal related information for payments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the PayPal payment record.
- **paymentid**: `BIGINT(19)`, The ID of the payment this record is associated with.
- **pp_orderid**: `VARCHAR(255)`, The ID of the order in PayPal.

---

### Table: payment_accounts

Stores information about payment accounts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment account.
- **archived**: `BIT(1)`, Indicates if the account is archived. Default is 0.
- **context_id**: `BIGINT(19)`, Context ID associated with the payment account.
- **enabled**: `BIT(1)`, Indicates if the account is enabled. Default is 0.
- **id_number**: `VARCHAR(100)` (Nullable), ID number of the payment account.
- **name**: `VARCHAR(255)`, Name of the payment account.
- **created_at**: `BIGINT(19)` (Nullable), Timestamp of when the account was created.
- **updated_at**: `BIGINT(19)` (Nullable), Timestamp of the last modification of the account.

---

### Table: payment_gateways

Stores configuration for payment gateways for different payment accounts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment gateway configuration.
- **account_id**: `BIGINT(19)`, The ID of the associated payment account.
- **config**: `LONGTEXT(2147483647)` (Nullable), Configuration settings for the payment gateway.
- **enabled**: `BIT(1)`, Indicates if the gateway is enabled. Default is 1.
- **gateway_name**: `VARCHAR(100)`, Name of the payment gateway.
- **created_at**: `BIGINT(19)`, Timestamp of when the gateway configuration was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the gateway configuration.

---

### Table: payments

Stores information about payments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment.
- **account_id**: `BIGINT(19)`, The ID of the associated payment account.
- **amount**: `VARCHAR(20)`, Amount of the payment.
- **component**: `VARCHAR(100)`, The plugin this payment belongs to.
- **currency**: `VARCHAR(3)`, Currency of the payment.
- **gateway**: `VARCHAR(100)`, The payment gateway used.
- **item_id**: `BIGINT(19)`, The ID of the item associated with the payment.
- **payment_area**: `VARCHAR(50)`, The name of the payable area.
- **created_at**: `BIGINT(19)`, Timestamp of when the payment was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the payment.
- **user_id**: `BIGINT(19)`, The ID of the user who made the payment.


---


## portfolio-api
### Table: portfolio_instance

Base table (not including config data) for instances of portfolio plugins.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the portfolio instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the portfolio plugin instance.
- **plugin**: `VARCHAR(50)` NOT NULL, Foreign key to the plugin.
- **visible**: `BOOLEAN` NOT NULL DEFAULT TRUE, Indicates whether this instance is visible or not.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_plugin ON portfolio_instance(plugin);`

---

### Table: portfolio_instance_config

Stores configuration for portfolio plugin instances.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the configuration record.
- **portfolio_instance_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance being configured.
- **name**: `VARCHAR(255)` NOT NULL, Name of the configuration field.
- **value**: `TEXT`, Value of the configuration field.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_config_portfolio_instance_id ON portfolio_instance_config(portfolio_instance_id);`

---

### Table: portfolio_instance_user

Stores user data for portfolio instances.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the user configuration record.
- **portfolio_instance_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the configuration item.
- **value**: `TEXT`, Value of the configuration item.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_user_portfolio_instance_id ON portfolio_instance_user(portfolio_instance_id);`
- `CREATE INDEX idx_portfolio_instance_user_user_id ON portfolio_instance_user(user_id);`

---

### Table: portfolio_log

Stores log of portfolio transfers, used to later check for duplicates.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the log record.
- **caller_class**: `VARCHAR(150)` NOT NULL, The name of the class used to create the transfer.
- **caller_component**: `VARCHAR(255)`, The component name responsible for exporting.
- **caller_file**: `VARCHAR(255)` NOT NULL, Path to the file to include where the class definition lives (relative to dirroot).
- **caller_sha1**: `VARCHAR(255)` NOT NULL, SHA1 hash of the exported content as far as the caller is concerned (before the portfolio plugin gets a hold of it).
- **continue_url**: `VARCHAR(255)` NOT NULL, The URL the external system has set to view the transfer.
- **portfolio_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance.
- **return_url**: `VARCHAR(255)` NOT NULL, The original "returnurl" of the export - takes us to the Moodle page we started from.
- **temp_data_id**: `BIGINT`, Old ID from portfolio_tempdata, used to catch a race condition between an external system requesting a file and causing the tempdata to be deleted before the user gets the "your transfer is requested" page.
- **time**: `BIGINT` NOT NULL, Time of the transfer (in the case of a queued transfer, this is the time the actual transfer ran, not when the user started).
- **user_id**: `BIGINT` NOT NULL, User who exported the content.

#### Indexes

- `CREATE INDEX idx_portfolio_log_portfolio_id ON portfolio_log(portfolio_id);`
- `CREATE INDEX idx_portfolio_log_temp_data_id ON portfolio_log(temp_data_id);`
- `CREATE INDEX idx_portfolio_log_time ON portfolio_log(time);`
- `CREATE INDEX idx_portfolio_log_user_id ON portfolio_log(user_id);`

---

### Table: portfolio_mahara_queue

Maps Mahara tokens to transfer IDs.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **token**: `VARCHAR(50)` NOT NULL, The token Mahara sent us to use for this transfer.
- **transfer_id**: `BIGINT` NOT NULL, Foreign key to portfolio_tempdata.id.

#### Indexes

- `CREATE INDEX idx_portfolio_mahara_queue_transfer_id ON portfolio_mahara_queue(transfer_id);`

---

### Table: portfolio_tempdata

Stores temporary data for portfolio exports.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the temporary data record.
- **data**: `TEXT`, Dumping ground for portfolio callers to store their data.
- **expiry_time**: `BIGINT` NOT NULL, Time this record will expire (used for cron cleanups) - the start of export + 24 hours.
- **portfolio_instance_id**: `BIGINT`, Which portfolio plugin instance is being used.
- **queued**: `BOOLEAN` NOT NULL DEFAULT FALSE, Value 1 means the entry should be processed in cron.
- **user_id**: `BIGINT` NOT NULL, Pseudo foreign key to the user. This is stored in the serialized data structure in the data field but added here for ease of lookups.

#### Indexes

- `CREATE INDEX idx_portfolio_tempdata_expiry_time ON portfolio_tempdata(expiry_time);`
- `CREATE INDEX idx_portfolio_tempdata_portfolio_instance_id ON portfolio_tempdata(portfolio_instance_id);`
- `CREATE INDEX idx_portfolio_tempdata_queued ON portfolio_tempdata(queued);`
- `CREATE INDEX idx_portfolio_tempdata_user_id ON portfolio_tempdata(user_id);`


---


## post-api
### Table: posts

Generic post table to hold data for blog entries, etc., in different contexts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the post.
- **attachment**: `VARCHAR(100)`, Attachment associated with the post.
- **content**: `TEXT`, The main content of the post.
- **course_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the course related to the post.
- **course_module_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the course module related to the post.
- **format**: `BIGINT` NOT NULL DEFAULT 0, Format of the content.
- **groupid**: `BIGINT` NOT NULL DEFAULT 0, ID of the group related to the post.
- **module**: `VARCHAR(20)` NOT NULL, Name of the module associated with the post.
- **module_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the module related to the post.
- **publish_state**: `VARCHAR(20)` NOT NULL DEFAULT 'draft', State of the post publication.
- **rating**: `BIGINT` NOT NULL DEFAULT 0, Rating associated with the post.
- **subject**: `VARCHAR(128)` NOT NULL, Subject or title of the post.
- **summary**: `TEXT`, Summary of the post.
- **summary_format**: `SMALLINT` NOT NULL DEFAULT 0, Format of the summary.
- **unique_hash**: `VARCHAR(255)` NOT NULL, Unique hash for the post.
- **user_modified**: `BIGINT`, ID of the user who last modified the post.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the post was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the post was last modified.
- **userid**: `BIGINT` NOT NULL DEFAULT 0, ID of the user who created the post.

#### Indexes

- `CREATE INDEX idx_course_id ON post(course_id);`
- `CREATE INDEX idx_course_module_id ON post(course_module_id);`
- `CREATE INDEX idx_module ON post(module);`
- `CREATE INDEX idx_publish_state ON post(publish_state);`
- `CREATE INDEX idx_userid ON post(userid);`
- `CREATE INDEX idx_user_modified ON post(user_modified);`


---


## profile-api
### addresses

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- line1: varchar("line_1" { length: 256 })
- line2: varchar("line_2" { length: 256 })
- city: varchar("city" { length: 256 })
- zipCode: varchar("zip_code" { length: 256 })
- state: varchar("state" { length: 256 })
- country: varchar("country" { length: 256 })
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)

### genders

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- icon: varchar("icon" { length: 256 })

### nextOfKins

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- surname: varchar("surname" { length: 256 })
- fullName: varchar("full_name" { length: 256 })
- mobile: varchar("mobile" { length: 256 })
- email: varchar("email" { length: 256 })
- title: varchar("title" { length: 256 })
- dateOfBirth: varchar("date_of_birth" { length: 256 })
- relation: varchar("relation" { length: 256 })
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)

### profiles

- id: varchar("id" { length: 191 }).primaryKey().$defaultFn(() => nanoid())
- name: varchar("name" { length: 256 }).notNull()
- surname: varchar("surname" { length: 256 })
- fullName: varchar("full_name" { length: 256 })
- idNumber: varchar("id_number" { length: 256 })
- mobile: varchar("mobile" { length: 256 })
- bio: text("bio")
- dateOfBirth: date("date_of_birth")
- uniqueId: varchar("unique_id" { length: 256 })
- addressId: varchar("address_id" { length: 256 }).references(() => addresses.id { onDelete: "cascade" }).notNull()
- genderId: varchar("gender_id" { length: 256 }).references(() => genders.id { onDelete: "cascade" }).notNull()
- nextOfKinId: varchar("next_of_kin_id" { length: 256 }).references(() => nextOfKins.id { onDelete: "cascade" }).notNull()
- userId: varchar("user_id" { length: 256 }).notNull()
- createdAt: timestamp("created_at").notNull().default(sql`now()`)
- updatedAt: timestamp("updated_at").notNull().default(sql`now()`)


---


## qtype-api
### Table: qtype_ddimageortext

Defines drag and drop (text or images onto a background image) question type.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partially_correct_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the number of correct answers should be shown.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the answers should be shuffled.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_ddimageortext(question_id);`

---

### Table: qtype_ddimageortext_drags

Images to drag. Actual file names are not stored here; we use a file storage system.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **drag_group**: `BIGINT` NOT NULL, Group ID for the drag items.
- **infinite**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the drag item is infinite.
- **label**: `TEXT`, Alt text label for the drag-able image.
- **no**: `INTEGER` NOT NULL, Drag number.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.

#### Indexes

- `CREATE INDEX idx_drag_group ON qtype_ddimageortext_drags(drag_group);`
- `CREATE INDEX idx_question_id ON qtype_ddimageortext_drags(question_id);`

---

### Table: qtype_ddimageortext_drops

Drop boxes for drag and drop question type.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **choice**: `INTEGER` NOT NULL, Choice number for the drop box.
- **label**: `TEXT`, Alt label for the drop box.
- **no**: `INTEGER` NOT NULL, Drop number.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **x_left**: `INTEGER` NOT NULL, X-coordinate of the drop box.
- **y_top**: `INTEGER` NOT NULL, Y-coordinate of the drop box.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_ddimageortext_drops(question_id);`

---

### Table: qtype_ddmarker

Defines drag and drop markers (text or images onto a background image) question type.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partially_correct_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_misplaced**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if misplaced markers should be shown.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the number of correct answers should be shown.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the answers should be shuffled.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_ddmarker(question_id);`

---

### Table: qtype_ddmarker_drags

Labels for markers to drag.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **infinite**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the drag item is infinite.
- **label**: `TEXT`, Alt text label for the drag-able image.
- **no**: `INTEGER` NOT NULL, Drag number.
- **no_of_drags**: `INTEGER` NOT NULL, Number of drag items, ignored if drag is infinite.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_ddmarker_drags(question_id);`

---

### Table: qtype_ddmarker_drops

Drop regions for drag and drop markers question type.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **choice**: `INTEGER` NOT NULL, Choice number for the drop region.
- **coords**: `TEXT`, Coordinates of the drop region.
- **no**: `INTEGER` NOT NULL, Drop number.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **shape**: `VARCHAR(255)`, Shape of the drop region (circle, rectangle, polygon).

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_ddmarker_drops(question_id);`

---

### Table: qtype_essay_options

Extra options for essay questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **attachments**: `INTEGER` NOT NULL, Whether, and how many, attachments a student is allowed to include with their response. -1 means unlimited.
- **attachments_required**: `INTEGER` NOT NULL, The number of attachments that should be required.
- **file_types_list**: `TEXT`, What attachment file types a student is allowed to include with their response. \* or empty means unlimited.
- **grader_info**: `TEXT`, Information shown to people with permission to manually grade the question, when they are grading.
- **grader_info_format**: `SMALLINT` NOT NULL, The text format for grader info.
- **max_bytes**: `BIGINT` NOT NULL, Maximum size of attached files in bytes.
- **max_word_limit**: `INTEGER`, Maximum number of words.
- **min_word_limit**: `INTEGER`, Minimum number of words.
- **question_id**: `BIGINT` NOT NULL, Foreign key linking to the question table.
- **response_field_lines**: `INTEGER` NOT NULL, Approximate height, in lines, of the input box the students should be given for their response.
- **response_format**: `VARCHAR(16)` NOT NULL, The type of input area students should be given for their response.
- **response_required**: `BOOLEAN` NOT NULL DEFAULT FALSE, Non-zero if an online text response is required.
- **response_template**: `TEXT`, The template to pre-populate the student’s response field during the attempt.
- **response_template_format**: `SMALLINT` NOT NULL, The text format for the response template.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_essay_options(question_id);`

---

### Table: qtype_match_options

Defines the question-type specific options for matching questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partially_correct_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, Foreign key link to question.id.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, If true, when the user gets the question partially correct, tell them how many choices they got correct alongside the feedback.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the answers should be shuffled.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_match_options(question_id);`

---

### Table: qtype_match_subquestions

The subquestions that make up a matching question.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer_text**: `VARCHAR(255)` NOT NULL, The text of the answer.
- **question_id**: `BIGINT` NOT NULL, Foreign key link to question.id.
- **question_text**: `TEXT`, The text of the question.
- **question_text_format**: `SMALLINT` NOT NULL, Format of the question text.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_match_subquestions(question_id);`

---

### Table: qtype_multichoice_options

Options for multiple-choice questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer_numbering**: `VARCHAR(10)` NOT NULL DEFAULT 'abc', Indicates how and whether the choices should be numbered.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partially_correct_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, Foreign key references question.id.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, If true, when the user gets a multiple-response question partially correct, tell them how many choices they got correct alongside the feedback.
- **show_standard_instruction**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether standard instruction (‘Select one:’ or ‘Select one or more:’) is displayed.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether the choices can be randomly shuffled.
- **single**: `BOOLEAN` NOT NULL DEFAULT TRUE, If false, it is multiple response (checkboxes). Otherwise, it is radio buttons.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_multichoice_options(question_id);`

---

### Table: qtype_randomsamatch_options

Information about a random short-answer matching question.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **choose**: `INTEGER` NOT NULL, Number of subquestions to randomly generate.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partially_correct_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, Foreign key references question.id.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, If true, when the user gets the question partially correct, tell them how many choices they got correct alongside the feedback.
- **sub_cats**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether to include or not the subcategories.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_randomsamatch_options(question_id);`

---

### Table: qtype_shortanswer_options

Options for short answer questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **question_id**: `BIGINT` NOT NULL, Foreign key references question.id.
- **use_case**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether answers are matched case-sensitively.

#### Indexes

- `CREATE INDEX idx_question_id ON qtype_shortanswer_options(question_id);`


---


## qualifications-api
# qualifications Dash

## Tables

List of Tables with their function described below:

### qualifications

This table saves information about the qualifications offered

#### Fields

- name
- institution
- duration
- program_description
- short_description
- degree
- requirements
- open_date
- close_date
- description
- url
- hashtags
- author_id
-	organization_id
- subjects_id
- university_id
- facility_id


### qualifications_responses

user responses to qualifications

#### Fields

- is_saved
- applied
- qualification_id
- user_id


---


## question-api
### Table: question

This table stores the definition of one version of a question.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **default_mark**: `DECIMAL(10, 2)` NOT NULL, Default mark for the question.
- **general_feedback**: `TEXT`, Feedback for the question.
- **general_feedback_format**: `SMALLINT` NOT NULL, Format of the general feedback.
- **length**: `INTEGER` NOT NULL, Length of the question.
- **name**: `VARCHAR(255)` NOT NULL, Name of the question.
- **parent**: `BIGINT`, Parent ID of the question.
- **penalty**: `DECIMAL(10, 2)` NOT NULL, Penalty for the question.
- **qtype**: `VARCHAR(20)` NOT NULL, Question type.
- **question_text**: `TEXT`, Text of the question.
- **question_text_format**: `SMALLINT` NOT NULL, Format of the question text.
- **stamp**: `VARCHAR(255)`, Stamp of the question.
- **modified_by**: `BIGINT` NOT NULL, User ID of the person who last edited this question.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time the question was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time the question was last modified.
- **user_id**: `BIGINT` NOT NULL, User ID of the person who created this question.

#### Indexes

- `CREATE INDEX idx_parent ON question(parent);`
- `CREATE INDEX idx_qtype ON question(qtype);`

---

### Table: question_answers

Answers, with a fractional grade (0-1) and feedback.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer**: `TEXT`, Answer text.
- **answer_format**: `SMALLINT` NOT NULL, Format of the answer text.
- **feedback**: `TEXT`, Feedback for the answer.
- **feedback_format**: `SMALLINT` NOT NULL, Format of the feedback.
- **fraction**: `DECIMAL(10, 2)` NOT NULL, Fractional grade for the answer.
- **question**: `BIGINT` NOT NULL, ID of the related question.

#### Indexes

- `CREATE INDEX idx_question ON question_answers(question);`

---

### Table: question_attempt_step_data

Each question_attempt_step has an associative array of the data.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **attempt_step_id**: `BIGINT` NOT NULL, Foreign key, references `question_attempt_steps.id`.
- **name**: `VARCHAR(32)` NOT NULL, Name of this bit of data.
- **value**: `TEXT`, Corresponding value.

#### Indexes

- `CREATE INDEX idx_attempt_step_id ON question_attempt_step_data(attempt_step_id);`

---

### Table: question_attempt_steps

Stores one step in a question attempt. As well as the data recorded with this step, the state and time are recorded.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **fraction**: `DECIMAL(10, 2)` NOT NULL, The grade for this question when graded out of 1.
- **question_attempt_id**: `BIGINT` NOT NULL, Foreign key, references `question_attempts.id`.
- **sequence_number**: `INTEGER` NOT NULL, Sequential number of the steps in a question attempt.
- **state**: `VARCHAR(13)` NOT NULL, State of the question at the end of this step.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of the action that led to this state being created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of the action that led to this state being modified.
- **userid**: `BIGINT` NOT NULL, User ID whose action led to this state being created.

#### Indexes

- `CREATE INDEX idx_question_attempt_id ON question_attempt_steps(question_attempt_id);`

---

### Table: question_attempts

Each row here corresponds to an attempt at one question, as part of an attempt at a whole quiz or similar activity.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **behaviour**: `VARCHAR(32)` NOT NULL, Name of the question behaviour managing this question attempt.
- **flagged**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether this question has been flagged within the attempt.
- **max_fraction**: `DECIMAL(10, 2)` NOT NULL, Indicates the greatest fraction that can be awarded.
- **max_mark**: `DECIMAL(10, 2)` NOT NULL, The grade this question is marked out of in this attempt.
- **min_fraction**: `DECIMAL(10, 2)` NOT NULL, Indicates the most negative mark that can be awarded, where the maximum positive mark is 1.
- **question_id**: `BIGINT` NOT NULL, ID of the question being attempted, references `question.id`.
- **question_summary**: `TEXT`, Summary of the student's response.
- **question_usage_id**: `BIGINT` NOT NULL, Foreign key, references `question_usages.id`.
- **response_summary**: `TEXT`, Summary of the student's response.
- **right_answer**: `TEXT`, Summary of the right answer to the question.
- **slot**: `INTEGER` NOT NULL, Used to number the questions in one attempt sequentially.
- **variant**: `INTEGER` NOT NULL, The variant of the question being used.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, The time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, The time this record was last changed.

#### Indexes

- `CREATE INDEX idx_question_id ON question_attempts(question_id);`
- `CREATE INDEX idx_question_usage_id ON question_attempts(question_usage_id);`
- `CREATE INDEX idx_slot ON question_attempts(slot);`

---

### Table: question_bank_entries

Each question bank entry. This table has one row for each question.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **id_number**: `VARCHAR(100)`, Unique identifier, useful especially for mapping to external entities.
- **question_category_id**: `BIGINT` NOT NULL, ID of the category this question is part of.
- **user_id**: `BIGINT` NOT NULL, User ID of the person who owns this question bank entry.

#### Indexes

- `CREATE INDEX idx_question_category_id ON question_bank_entries(question_category_id);`
- `CREATE INDEX idx_user_id ON question_bank_entries(user_id);`

---

### Table: question_calculated

Options for questions of type calculated.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer**: `BIGINT` NOT NULL, ID of the related answer.
- **correct_answer_format**: `BIGINT` NOT NULL, Format of the correct answer.
- **correct_answer_length**: `INTEGER` NOT NULL, Length of the correct answer.
- **question**: `BIGINT` NOT NULL, ID of the related question.
- **tolerance**: `VARCHAR(20)` NOT NULL, Tolerance for the answer.
- **tolerance_type**: `BIGINT` NOT NULL, Type of tolerance.

#### Indexes

- `CREATE INDEX idx_answer ON question_calculated(answer);`
- `CREATE INDEX idx_question ON question_calculated(question);`

---

### Table: question_calculated_options

Options for questions of type calculated.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer_numbering**: `VARCHAR(10)`, Indicates how and whether the choices should be numbered.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question**: `BIGINT` NOT NULL, ID of the related question.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the choices should be shuffled.
- **single**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the question allows a single response.
- **synchronize**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the question should be synchronized.

#### Indexes

- `CREATE INDEX idx_question ON question_calculated_options(question);`

---

### Table: question_categories

Categories for grouping questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **context_id**: `BIGINT` NOT NULL, ID of the context this category is shared in.
- **id_number**: `VARCHAR(100)`, Unique identifier.
- **info**: `TEXT`, Information about the category.
- **info_format**: `SMALLINT` NOT NULL, Format of the category information.
- **name**: `VARCHAR(255)` NOT NULL, Name of the category.
- **parent**: `BIGINT`, Parent ID of the category.
- **sort_order**: `INTEGER` NOT NULL, Sort order of the category.
- **stamp**: `VARCHAR(255)`, Stamp of the category.

#### Indexes

- `CREATE INDEX idx_context_id ON question_categories(context_id);`
- `CREATE INDEX idx_parent ON question_categories(parent);`
- `CREATE INDEX idx_sort_order ON question_categories(sort_order);`

---

### Table: question_dataset_definitions

Organises and stores properties for dataset items.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **category**: `BIGINT` NOT NULL, ID of the related category.
- **item_count**: `INTEGER` NOT NULL, Count of items in the dataset.
- **name**: `VARCHAR(255)` NOT NULL, Name of the dataset.
- **options**: `VARCHAR(255)`, Options for the dataset.
- **type**: `BIGINT` NOT NULL, Type of the dataset.

#### Indexes

- `CREATE INDEX idx_category ON question_dataset_definitions(category);`

---

### Table: question_dataset_items

Individual dataset items.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **definition**: `BIGINT` NOT NULL, ID of the related definition.
- **item_number**: `INTEGER` NOT NULL, Number of the item in the dataset.
- **value**: `VARCHAR(255)` NOT NULL, Value of the dataset item.

#### Indexes

- `CREATE INDEX idx_definition ON question_dataset_items(definition);`

---

### Table: question_datasets

Many-many relation between questions and dataset definitions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **data_set_definition**: `BIGINT` NOT NULL, ID of the related dataset definition.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.

#### Indexes

- `CREATE INDEX idx_data_set_definition ON question_datasets(data_set_definition);`
- `CREATE INDEX idx_question_id ON question_datasets(question_id);`

---

### Table: question_ddwtos

Defines drag and drop (words into sentences) questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the choices should be shuffled.

#### Indexes

- `CREATE INDEX idx_question_id ON question_ddwtos(question_id);`

---

### Table: question_gapselect

Defines select missing words questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **correct_feedback**: `TEXT`, Feedback shown for any correct response.
- **correct_feedback_format**: `SMALLINT` NOT NULL, Format of the correct feedback.
- **incorrect_feedback**: `TEXT`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `TEXT`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `SMALLINT` NOT NULL, Format of the partially correct feedback.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the choices should be shuffled.

#### Indexes

- `CREATE INDEX idx_question_id ON question_gapselect(question_id);`

---

### Table: question_hints

Stores the part of the question definition that gives hints to students.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **clear_wrong**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if any wrong choices should be cleared before the next try.
- **hint**: `TEXT`, The text of the feedback to be given.
- **hint_format**: `SMALLINT` NOT NULL, Format of the hint.
- **options**: `VARCHAR(255)`, Space for any other question-type specific options.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_num_correct**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the feedback should include a message about how many things the student got right.

#### Indexes

- `CREATE INDEX idx_question_id ON question_hints(question_id);`

---

### Table: question_multianswer

Options for multianswer questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **sequence**: `TEXT`, Sequence of the answers.

#### Indexes

- `CREATE INDEX idx_question_id ON question_multianswer(question_id);`

---

### Table: question_numerical

Options for numerical questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **answer_id**: `BIGINT` NOT NULL, Foreign key references `question_answers.id`.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **tolerance**: `VARCHAR(255)` NOT NULL, Allowed error when matching a response to this answer.

#### Indexes

- `CREATE INDEX idx_answer_id ON question_numerical(answer_id);`
- `CREATE INDEX idx_question_id ON question_numerical(question_id);`

---

### Table: question_numerical_options

Options for numerical questions. This table is also used for handling units.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **show_units**: `SMALLINT` NOT NULL, How units are handled: 3) Not used at all, 0) Optional, or 1) must be right or penalty applied.
- **unit_grading_type**: `SMALLINT` NOT NULL, Grading type for the unit: 0) No penalty, 1) Fraction of response grade, 2) Fraction of total grade.
- **unit_penalty**: `DECIMAL(10, 2)` NOT NULL, Penalty for getting the unit wrong when they are being graded.
- **units_left**: `SMALLINT` NOT NULL, Indicates if the unit should be displayed to the left as in $1.00.

#### Indexes

- `CREATE INDEX idx_question_id ON question_numerical_options(question_id);`

---

### Table: question_numerical_units

Optional unit options for numerical questions. This table is also used for handling units.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **multiplier**: `DECIMAL(15, 10)` NOT NULL, Multiplier for this unit.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **unit**: `VARCHAR(50)` NOT NULL, The unit, e.g., 'm' or 'kg'.

#### Indexes

- `CREATE INDEX idx_question_id ON question_numerical_units(question_id);`

---

### Table: question_references

Records where a specific question is used.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **component**: `VARCHAR(100)` NOT NULL, Component, e.g., `mod_quiz` or `core_question`.
- **item_id**: `BIGINT` NOT NULL, Plugin specific ID, e.g., `slotid` for a quiz.
- **question_area**: `VARCHAR(50)` NOT NULL, Depending on the component, which area the question is used in, e.g., `slot` for a quiz.
- **question_bank_entry_id**: `BIGINT` NOT NULL, ID of the question bank entry this question is part of.
- **using_context_id**: `BIGINT` NOT NULL, Context where the question is used.
- **version**: `BIGINT`, Version number for the question where NULL means use the latest ready version.

#### Indexes

- `CREATE INDEX idx_question_bank_entry_id ON question_references(question_bank_entry_id);`
- `CREATE INDEX idx_using_context_id ON question_references(using_context_id);`

---

### Table: question_response_analysis

Analysis of student responses given to questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **a_id**: `VARCHAR(100)` NOT NULL, Analysis ID.
- **credit**: `DECIMAL(15, 10)` NOT NULL, Credit received for the response.
- **hash_code**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **response**: `TEXT`, The student's response.
- **subq_id**: `VARCHAR(100)`, Sub-question ID.
- **variant**: `BIGINT` NOT NULL, Variant of the question.
- **which_tries**: `VARCHAR(255)`, Indicates which tries are being analyzed.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time the analysis was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time the analysis was modified.

#### Indexes

- `CREATE INDEX idx_question_id ON question_response_analysis(question_id);`
- `CREATE INDEX idx_hash_code ON question_response_analysis(hash_code);`

---

### Table: question_response_count

Count for each response for each try at a question.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **analysis_id**: `BIGINT` NOT NULL, ID of the related analysis.
- **rcount**: `INTEGER` NOT NULL, Count of responses.
- **try**: `INTEGER` NOT NULL, Attempt number.

#### Indexes

- `CREATE INDEX idx_analysis_id ON question_response_count(analysis_id);`

---

### Table: question_set_references

Records where groups of questions are used.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **component**: `VARCHAR(100)` NOT NULL, Component, e.g., `mod_quiz`.
- **filter_condition**: `TEXT`, Filter expression in JSON format.
- **item_id**: `BIGINT` NOT NULL, Plugin specific ID, e.g., `slotid` for a quiz.
- **question_area**: `VARCHAR(50)` NOT NULL, Depending on the component, which area the question is used in, e.g., `slot` for a quiz.
- **questions_context_id**: `BIGINT` NOT NULL, Context questions come from.
- **using_context_id**: `BIGINT` NOT NULL, Context where the questions are used.

#### Indexes

- `CREATE INDEX idx_questions_context_id ON question_set_references(questions_context_id);`
- `CREATE INDEX idx_using_context_id ON question_set_references(using_context_id);`

---

### Table: question_statistics

Statistics for individual questions used in an activity.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **discrimination_index**: `DECIMAL(15, 10)`, Index of discrimination.
- **discriminative_efficiency**: `DECIMAL(15, 10)`, Efficiency of discrimination.
- **effective_weight**: `DECIMAL(15, 10)`, Effective weight.
- **facility**: `DECIMAL(15, 10)`, Facility index.
- **hashcode**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **max_mark**: `DECIMAL(10, 2)` NOT NULL, Maximum mark for the question.
- **neg_covar**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if there is negative covariance.
- **positions**: `TEXT`, Positions in which this item appears.
- **question_id**: `BIGINT` NOT NULL, ID of the related question.
- **random_guess_score**: `DECIMAL(10, 2)`, Estimate of the score for random guessing.
- **s**: `INTEGER`, Value of 's'.
- **sd**: `DECIMAL(15, 10)`, Standard deviation.
- **slot**: `INTEGER`, Position in the quiz where this question appears.
- **sub_question**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if it is a subquestion.
- **sub_questions**: `TEXT`, Subquestions related to the question.
- **variant**: `INTEGER` NOT NULL, Variant of the question.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time the statistics was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time the statistics were modified.

#### Indexes

- `CREATE INDEX idx_question_id ON question_statistics(question_id);`
- `CREATE INDEX idx_hashcode ON question_statistics(hashcode);`

---

### Table: question_truefalse

Options for True-False questions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **false_answer**: `BIGINT` NOT NULL, Foreign key references `question_answers.id`. The ‘False’ choice.
- **question**: `BIGINT` NOT NULL, ID of the related question, references `question.id`.
- **true_answer**: `BIGINT` NOT NULL, Foreign key references `question_answers.id`. The ‘True’ choice.

#### Indexes

- `CREATE INDEX idx_false_answer ON question_truefalse(false_answer);`
- `CREATE INDEX idx_question ON question_truefalse(question);`
- `CREATE INDEX idx_true_answer ON question_truefalse(true_answer);`

---

### Table: question_usages

This table’s main purpose is to assign a unique ID to each attempt.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **component**: `VARCHAR(255)` NOT NULL, The plugin this attempt belongs to, e.g., ‘mod_quiz’, ‘block_questionoftheday’, ‘filter_embedquestion’.
- **context_id**: `BIGINT` NOT NULL, ID of the context associated with this usage.
- **preferred_behaviour**: `VARCHAR(32)` NOT NULL, The archetypal behaviour that should be used for question attempts in this usage.

#### Indexes

- `CREATE INDEX idx_component ON question_usages(component);`
- `CREATE INDEX idx_context_id ON question_usages(context_id);`

---

### Table: question_versions

A join table linking the different question version definitions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **question_bank_entry_id**: `BIGINT` NOT NULL, ID of the question bank entry this question version is part of.
- **question_id**: `BIGINT` NOT NULL, ID of the question.
- **status**: `VARCHAR(10)` NOT NULL, Status of the question (ready, hidden, draft).
- **version**: `INTEGER` NOT NULL, Version number of the question, where the first version is always 1.

#### Indexes

- `CREATE INDEX idx_question_bank_entry_id ON question_versions(question_bank_entry_id);`
- `CREATE INDEX idx_question_id ON question_versions(question_id);`


---


## quiz-api
### Table: quizes

The settings for each quiz.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **allow_offline_attempts**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether to allow the quiz to be attempted offline in the mobile app.
- **attempt_on_last**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether subsequent attempts start from the answer to the previous attempt or start blank.
- **attempts**: `INTEGER` NOT NULL, The maximum number of attempts a student is allowed.
- **browser_security**: `VARCHAR(32)`, Restriction on the browser the student must use.
- **can_redo_questions**: `BOOLEAN` NOT NULL DEFAULT FALSE, Allows students to redo any completed question within a quiz attempt.
- **completion_attempts_exhausted**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether completion requires all attempts to be exhausted.
- **completion_min_attempts**: `INTEGER` NOT NULL, Minimum number of attempts required for completion.
- **course**: `BIGINT` NOT NULL, Foreign key reference to the course this quiz is part of.
- **decimal_points**: `SMALLINT` NOT NULL, Number of decimal points to use when displaying grades.
- **delay_1**: `BIGINT`, Delay between the first and second attempt, in seconds.
- **delay_2**: `BIGINT`, Delay between the second and subsequent attempts, in seconds.
- **grace_period**: `BIGINT`, Amount of time after the time limit runs out during which attempts can still be submitted.
- **grade**: `DECIMAL(10, 2)` NOT NULL, The total that the quiz overall grade is scaled to be out of.
- **grade_method**: `SMALLINT` NOT NULL, Grading method.
- **intro**: `TEXT`, Quiz introduction text.
- **intro_format**: `SMALLINT` NOT NULL, Format of the quiz intro text.
- **name**: `VARCHAR(255)` NOT NULL, Quiz name.
- **nav_method**: `VARCHAR(16)`, Navigation method.
- **over_due_handling**: `VARCHAR(16)`, Method used to handle overdue attempts.
- **password**: `VARCHAR(255)`, Password required to start or continue a quiz attempt.
- **preferred_behaviour**: `VARCHAR(32)`, Behaviour to ask questions to use.
- **question_decimal_points**: `SMALLINT` NOT NULL, Number of decimal points for displaying question grades.
- **questions_per_page**: `INTEGER`, How often to insert a page break when editing the quiz or when shuffling the question order.
- **review_attempt**: `INTEGER` NOT NULL, Whether users can review their quiz attempts at various times.
- **review_correctness**: `INTEGER` NOT NULL, Whether users can review the correctness of their attempts.
- **review_general_feedback**: `INTEGER` NOT NULL, Whether users can review general feedback on their attempts.
- **review_marks**: `INTEGER` NOT NULL, Whether users can review marks for their attempts.
- **review_overall_feedback**: `INTEGER` NOT NULL, Whether users can review overall feedback on their attempts.
- **review_right_answer**: `INTEGER` NOT NULL, Whether users can review the correct answers to their attempts.
- **review_specific_feedback**: `INTEGER` NOT NULL, Whether users can review specific feedback on their attempts.
- **show_blocks**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether blocks should be shown on the `attempt` and `review` pages.
- **show_user_picture**: `BOOLEAN` NOT NULL DEFAULT FALSE, Option to show the user’s picture during the `attempt` and on the `review` page.
- **shuffle_answers**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether the parts of the question should be shuffled.
- **sub_net**: `VARCHAR(255)`, Restriction on the IP addresses from which this quiz can be attempted.
- **sum_grades**: `DECIMAL(10, 2)` NOT NULL, Total of all the question instance max marks.
- **time_close**: `BIGINT`, Time when this quiz closes.
- **time_limit**: `BIGINT`, Time limit for quiz attempts, in seconds.
- **time_open**: `BIGINT`, Time when this quiz opens.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time when the quiz was added to the course.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.

#### Indexes

- `CREATE INDEX idx_course ON quiz(course);`
- `CREATE INDEX idx_name ON quiz(name);`

---

### Table: quiz_attempts

Stores users' attempts at quizzes.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **attempt**: `INTEGER` NOT NULL, Sequentially numbers this student’s attempts at this quiz.
- **current_page**: `INTEGER` NOT NULL, Current page number in the quiz attempt.
- **graded_notification_sent_time**: `BIGINT`, Timestamp when the ‘graded’ notification was sent.
- **layout**: `TEXT`, Layout of the quiz attempt.
- **preview**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the attempt is a preview.
- **quiz**: `BIGINT` NOT NULL, Foreign key reference to the quiz that was attempted.
- **state**: `VARCHAR(16)` NOT NULL, Current state of the attempts.
- **sum_grades**: `DECIMAL(10, 2)` NOT NULL, Total marks for this attempt.
- **time_check_state**: `BIGINT`, Next time quiz cron should check attempt for state changes.
- **time_finish**: `BIGINT`, Time when the attempt was submitted.
- **time_modified_offline**: `BIGINT`, Last modified time via web services.
- **time_start**: `BIGINT`, Time when the attempt was started.
- **unique_id**: `BIGINT` NOT NULL, Foreign key reference to the question_usage.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.
- **user_id**: `BIGINT` NOT NULL, Foreign key reference to the user whose attempt this is.

#### Indexes

- `CREATE INDEX idx_quiz ON quiz_attempts(quiz);`
- `CREATE INDEX idx_user_id_attempts ON quiz_attempts(user_id);`
- `CREATE INDEX idx_state_attempts ON quiz_attempts(state);`

---

### Table: quiz_feedbacks

Feedback given to students based on their grade band.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **feedback_text**: `TEXT`, Feedback text.
- **feedback_text_format**: `SMALLINT` NOT NULL, Format of the feedback text.
- **max_grade**: `DECIMAL(10, 2)` NOT NULL, Upper limit of this grade band.
- **min_grade**: `DECIMAL(10, 2)` NOT NULL, Lower limit of this grade band.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key reference to the quiz.

#### Indexes

- `CREATE INDEX idx_quiz_id_feedback ON quiz_feedback(quiz_id);`

---

### Table: quiz_grades

Stores the overall grade for each user on the quiz.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **grade**: `DECIMAL(10, 2)` NOT NULL, Overall grade from the quiz.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key reference to the quiz.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.
- **user_id**: `BIGINT` NOT NULL, Foreign key reference to the user.

#### Indexes

- `CREATE INDEX idx_quiz_id_grades ON quiz_grades(quiz_id);`
- `CREATE INDEX idx_user_id_grades ON quiz_grades(user_id);`

---

### Table: quiz_overrides

Overrides to quiz settings on a per-user and per-group basis.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **attempts**: `INTEGER`, Maximum number of attempts.
- **group_id**: `BIGINT`, Foreign key reference to the group.
- **password**: `VARCHAR(255)`, Quiz password.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key reference to the quiz.
- **time_close**: `BIGINT`, Time by which students must complete their attempt.
- **time_limit**: `BIGINT`, Time limit in seconds.
- **time_open**: `BIGINT`, Time at which students may start attempting the quiz.
- **user_id**: `BIGINT`, Foreign key reference to the user.

#### Indexes

- `CREATE INDEX idx_quiz_id_overrides ON quiz_overrides(quiz_id);`
- `CREATE INDEX idx_user_id_overrides ON quiz_overrides(user_id);`
- `CREATE INDEX idx_group_id_overrides ON quiz_overrides(group_id);`

---

### Table: quiz_overview_regrades

Records which question attempts need regrading.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **new_fraction**: `DECIMAL(12, 10)`, New fraction for the question attempt after regrading.
- **old_fraction**: `DECIMAL(12, 10)`, Previous fraction for the question attempt.
- **question_usage_id**: `BIGINT` NOT NULL, Foreign key reference to question_usages.id.
- **regraded**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates regrading status.
- **slot**: `INTEGER` NOT NULL, Foreign key reference to question_attempts.slot.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of creation.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of the last modification.

#### Indexes

- `CREATE INDEX idx_question_usage_id_regrades ON quiz_overview_regrades(question_usage_id);`
- `CREATE INDEX idx_slot_regrades ON quiz_overview_regrades(slot);`

---

### Table: quiz_reports

Lists all the installed quiz reports and their display order.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **capability**: `VARCHAR(255)`, Capability required to see this report.
- **display_order**: `INTEGER`, Display order for report tabs.
- **name**: `VARCHAR(255)` NOT NULL, Name of the report.

#### Indexes

- `CREATE INDEX idx_name_reports ON quiz_reports(name);`

---

### Table: quiz_sections

Stores sections of a quiz with section name (heading), from one page break to the next.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **first_slot**: `INTEGER` NOT NULL, Number of the first slot in the section.
- **heading**: `VARCHAR(1333)`, Text of the section heading.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key reference to the quiz.
- **shuffle_questions**: `BOOLEAN` NOT NULL DEFAULT FALSE, Whether the question order within this section should be shuffled.

#### Indexes

- `CREATE INDEX idx_quiz_id_sections ON quiz_sections(quiz_id);`

---

### Table: quiz_slots

Stores the questions used in a quiz, with the order and for each slot.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **max_mark**: `DECIMAL(12, 2)`, Marks this question contributes to quiz.sumgrades.
- **page**: `INTEGER` NOT NULL, Page number where this question appears.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key reference to the quiz.
- **require_previous**: `BOOLEAN` NOT NULL DEFAULT FALSE, Set to TRUE if the current question requires the previous one to be answered first.
- **slot**: `INTEGER` NOT NULL, Order of the question in the quiz.

#### Indexes

- `CREATE INDEX idx_quiz_id_slots ON quiz_slots(quiz_id);`
- `CREATE INDEX idx_slot_slots ON quiz_slots(slot);`

---

### Table: quiz_statistics

Caches results from analysis done in statistics reports.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **all_attempts_avg**: `DECIMAL(15, 10)`, Average of all attempts.
- **all_attempts_count**: `BIGINT` NOT NULL, Count of all attempts.
- **cic**: `DECIMAL(15, 10)`, Cumulative item characteristic.
- **error_ratio**: `DECIMAL(15, 10)`, Error ratio.
- **first_attempts_avg**: `DECIMAL(15, 10)`, Average of first attempts.
- **first_attempts_count**: `BIGINT` NOT NULL, Count of first attempts.
- **hashcode**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **highest_attempts_avg**: `DECIMAL(15, 10)`, Average of highest attempts.
- **highest_attempts_count**: `BIGINT` NOT NULL, Count of highest attempts.
- **kurtosis**: `DECIMAL(15, 10)`, Kurtosis value.
- **last_attempts_avg**: `DECIMAL(15, 10)`, Average of last attempts.
- **last_attempts_count**: `BIGINT` NOT NULL, Count of last attempts.
- **median**: `DECIMAL(15, 10)`, Median value.
- **skewness**: `DECIMAL(15, 10)`, Skewness value.
- **standard_deviation**: `DECIMAL(15, 10)`, Standard deviation.
- **standard_error**: `DECIMAL(15, 10)`, Standard error.
- **which_attempts**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether stats are for all attempts or just the first.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time of creation.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time of last modification.

#### Indexes

- `CREATE INDEX idx_hashcode_statistics ON quiz_statistics(hashcode);`


---


## quizaccess-api
### Table: quizaccess_seb_quiz_settings

Stores the quiz-level Safe Exam Browser (SEB) configuration.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **activate_url_filtering**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether URLs will be filtered.
- **allowed_browser_exam_keys**: `TEXT`, List of allowed browser exam keys.
- **allow_reload_in_exam**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the user can reload the exam.
- **allow_spell_checking**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether spell checking is enabled in SEB.
- **allow_user_quit_seb**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the quit button is shown.
- **cmid**: `BIGINT` NOT NULL, Foreign key to the course module ID.
- **enable_audio_control**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether volume and audio controls are shown.
- **expressions_allowed**: `TEXT`, Comma or newline-separated list of allowed expressions.
- **expressions_blocked**: `TEXT`, Comma or newline-separated list of blocked expressions.
- **filter_embedded_content**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether embedded content will be filtered.
- **link_quitseb**: `TEXT`, Link to exit SEB.
- **mute_on_startup**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the browser starts muted.
- **quit_password**: `TEXT`, Password to exit SEB.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key to the quiz ID.
- **regex_allowed**: `TEXT`, Regular expression of allowed URLs.
- **regex_blocked**: `TEXT`, Regular expression of blocked URLs.
- **require_safe_exam_browser**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether SEB is required.
- **show_keyboard_layout**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the keyboard layout is shown.
- **show_reload_button**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the reload button is shown.
- **show_seb_download_link**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the SEB download link should appear.
- **show_seb_taskbar**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the SEB taskbar is shown.
- **show_time**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the clock is shown.
- **show_wifi_control**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the user can control networking.
- **template_id**: `BIGINT`, Foreign key to `quizaccess_seb_template.id`.
- **user_confirm_quit**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the confirm quit popup should appear.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, ID of the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_cmid ON quizaccess_seb_quiz_settings(cmid);`
- `CREATE INDEX idx_quiz_id ON quizaccess_seb_quiz_settings(quiz_id);`
- `CREATE INDEX idx_template_id ON quizaccess_seb_quiz_settings(template_id);`
- `CREATE INDEX idx_user_id_seb_settings ON quizaccess_seb_quiz_settings(user_id);`

---

### Table: quizaccess_seb_templates

Templates for Safe Exam Browser configuration.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **content**: `TEXT`, Content of the template.
- **description**: `TEXT`, Description of the template.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the template is enabled.
- **name**: `VARCHAR(255)` NOT NULL, Name of the template.
- **sort_order**: `INTEGER`, Sort order of the template.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, ID of the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_user_id_seb_template ON quizaccess_seb_template(user_id);`
- `CREATE INDEX idx_name_seb_template ON quizaccess_seb_template(name);`


---


## rating-api
### Table: ratings

Moodle ratings.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **component**: `VARCHAR(100)` NOT NULL, The component to which this rating belongs.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context ID.
- **item_id**: `BIGINT` NOT NULL, The ID of the item being rated.
- **rating**: `INTEGER` NOT NULL, The rating value.
- **rating_area**: `VARCHAR(50)` NOT NULL, The area within the component where this rating is applied.
- **scale_id**: `BIGINT` NOT NULL, Foreign key to the scale ID.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the rating was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the rating was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user ID of the person who gave the rating.

#### Indexes

- `CREATE INDEX idx_component ON rating(component);`
- `CREATE INDEX idx_context_id ON rating(context_id);`
- `CREATE INDEX idx_item_id ON rating(item_id);`
- `CREATE INDEX idx_scale_id ON rating(scale_id);`
- `CREATE INDEX idx_user_id ON rating(user_id);`


---


## registration-api
### Table: registration_hubs

Hub where the site is registered on with their associated tokens.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **confirmed**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the registration is confirmed (FALSE for no, TRUE for yes).
- **hub_name**: `VARCHAR(255)` NOT NULL, The name of the hub.
- **hub_url**: `VARCHAR(255)` NOT NULL, The URL of the hub.
- **secret**: `VARCHAR(255)`, The unique site identifier for this hub.
- **token**: `VARCHAR(255)` NOT NULL, The token used to communicate with the hub by web service.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of creation.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of the last modification.

#### Indexes

- `CREATE INDEX idx_hub_name ON registration_hubs(hub_name);`
- `CREATE INDEX idx_hub_url ON registration_hubs(hub_url);`
- `CREATE INDEX idx_token ON registration_hubs(token);`


---


## report-builder-api
### Table: reportbuilder_audiences

Defines report audience.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **class_name**: `VARCHAR(255)`, The class name for the audience.
- **config_data**: `TEXT`, Configuration data for the audience.
- **heading**: `VARCHAR(255)`, Heading for the audience.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_audience ON reportbuilder_audience(report_id);`

---

### Table: reportbuilder_columns

Represents a report column.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **aggregation**: `VARCHAR(32)`, The aggregation type for the column.
- **column_order**: `INTEGER`, Order of the column.
- **heading**: `VARCHAR(255)`, Heading for the column.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **sort_direction**: `BOOLEAN`, Direction for sorting.
- **sort_enabled**: `BOOLEAN` DEFAULT FALSE, Indicates whether sorting is enabled.
- **sort_order**: `INTEGER`, Order for sorting.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the column.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_column ON reportbuilder_column(report_id);`
- `CREATE INDEX idx_user_id_column ON reportbuilder_column(user_id);`
- `CREATE INDEX idx_user_modified_column ON reportbuilder_column(user_modified);`

---

### Table: reportbuilder_filters

Represents a report filter/condition.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **filter_order**: `INTEGER`, Order of the filter.
- **heading**: `VARCHAR(255)`, Heading for the filter.
- **is_condition**: `BOOLEAN` DEFAULT FALSE, Indicates whether the filter is a condition.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **unique_identifier**: `VARCHAR(255)`, Unique identifier for the filter.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_filter ON reportbuilder_filter(report_id);`
- `CREATE INDEX idx_user_id_filter ON reportbuilder_filter(user_id);`
- `CREATE INDEX idx_user_modified_filter ON reportbuilder_filter(user_modified);`

---

### Table: reportbuilder_reports

Represents a report.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **area**: `VARCHAR(100)`, Area to which the report belongs.
- **component**: `VARCHAR(100)`, Component that the report is part of.
- **condition_data**: `TEXT`, Condition data for the report.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context.
- **item_id**: `BIGINT`, ID of the item.
- **name**: `VARCHAR(255)`, Name of the report.
- **settings_data**: `TEXT`, Settings data for the report.
- **source**: `VARCHAR(255)`, Source of the report.
- **type**: `SMALLINT`, Type of the report.
- **unique_rows**: `BOOLEAN` DEFAULT FALSE, Indicates whether the report has unique rows.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_context_id_report ON reportbuilder_report(context_id);`
- `CREATE INDEX idx_user_id_report ON reportbuilder_report(user_id);`
- `CREATE INDEX idx_user_modified_report ON reportbuilder_report(user_modified);`

---

### Table: reportbuilder_schedules

Represents a report schedule.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **audiences**: `TEXT`, Audiences for the schedule.
- **enabled**: `BOOLEAN` DEFAULT TRUE, Indicates whether the schedule is enabled.
- **format**: `VARCHAR(255)`, Format of the schedule.
- **message**: `TEXT`, Message for the schedule.
- **message_format**: `BIGINT`, Format of the message.
- **name**: `VARCHAR(255)`, Name of the schedule.
- **recurrence**: `BIGINT`, Recurrence interval of the schedule.
- **report_empty**: `BOOLEAN` DEFAULT FALSE, Indicates whether the report is empty.
- **report_id**: `BIGINT` NOT NULL, Foreign key to the report.
- **subject**: `VARCHAR(255)`, Subject of the schedule.
- **time_last_sent**: `TIMESTAMP`, Timestamp of when the schedule was last sent.
- **time_next_send**: `TIMESTAMP`, Timestamp of when the schedule will next be sent.
- **time_scheduled**: `TIMESTAMP`, Timestamp of when the schedule is set.
- **user_modified**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.
- **user_view_as**: `BIGINT`, ID of the user viewing as.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user who created the record.

#### Indexes

- `CREATE INDEX idx_report_id_schedule ON reportbuilder_schedule(report_id);`
- `CREATE INDEX idx_user_id_schedule ON reportbuilder_schedule(user_id);`
- `CREATE INDEX idx_user_modified_schedule ON reportbuilder_schedule(user_modified);`


---


## repository-api
### Table: repositories

This table contains one entry for every configured external repository.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **sort_order**: `INTEGER` NOT NULL, Sort order of the repository.
- **type**: `VARCHAR(255)` NOT NULL, Type of the repository.
- **visible**: `BOOLEAN` DEFAULT TRUE, Indicates whether the repository is visible.

#### Indexes

- `CREATE INDEX idx_sort_order ON repository(sort_order);`

---

### Table: repository_instances

This table contains one entry for every configured external repository instance.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context.
- **name**: `VARCHAR(255)` NOT NULL, Name of the repository instance.
- **password**: `VARCHAR(255)`, Password for the repository instance.
- **read_only**: `BOOLEAN` DEFAULT FALSE, Indicates whether the repository instance is read-only.
- **type_id**: `BIGINT` NOT NULL, Foreign key to the repository type.
- **user_name**: `VARCHAR(255)`, Username for the repository instance.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **userid**: `BIGINT` NOT NULL, Foreign key to the user.

#### Indexes

- `CREATE INDEX idx_context_id ON repository_instances(context_id);`
- `CREATE INDEX idx_type_id ON repository_instances(type_id);`
- `CREATE INDEX idx_userid ON repository_instances(userid);`

---

### Table: repository_instance_configs

The config for instances of repositories.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **instance_id**: `BIGINT` NOT NULL, Foreign key to the repository instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the config item.
- **value**: `TEXT`, Value of the config item.

#### Indexes

- `CREATE INDEX idx_instance_id ON repository_instance_config(instance_id);`
- `CREATE INDEX idx_name ON repository_instance_config(name);`

---

### Table: repository_onedrive_accesses

List of temporary access grants for OneDrive repositories.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **item_id**: `VARCHAR(255)` NOT NULL, The item ID in OneDrive.
- **permission_id**: `VARCHAR(255)` NOT NULL, The permission ID in OneDrive.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **userid**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_userid ON repository_onedrive_access(userid);`


---


## resource-api
### Table: resources

Each record represents a resource and its configuration data.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **course_id**: `BIGINT` NOT NULL, Foreign key reference to the course this resource is part of.
- **display**: `BOOLEAN` NOT NULL, Display settings for the resource.
- **display_options**: `TEXT`, Display options for the resource.
- **filter_files**: `SMALLINT` NOT NULL, Filter files settings.
- **intro**: `TEXT`, Introduction text for the resource.
- **intro_format**: `SMALLINT` NOT NULL, Format of the introduction text.
- **legacy_files**: `SMALLINT` NOT NULL, Settings for legacy files.
- **legacy_files_last**: `BIGINT`, Timestamp of the last legacy file.
- **name**: `VARCHAR(255)` NOT NULL, Name of the resource.
- **revision**: `BIGINT` NOT NULL, Revision number of the resource, incremented when a file changes to solve browser caching issues.
- **to_be_migrated**: `BOOLEAN` NOT NULL, Indicator if the resource is to be migrated.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.

---

### Table: resource_olds

Backup of all old resource instances from version 1.9.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **all_text**: `TEXT`, Text of the old resource.
- **cm_id**: `BIGINT`, Foreign key reference to the course module ID.
- **course_id**: `BIGINT` NOT NULL, Foreign key reference to the course this old resource is part of.
- **intro**: `TEXT`, Introduction text for the old resource.
- **intro_format**: `SMALLINT` NOT NULL, Format of the introduction text.
- **migrated**: `BOOLEAN` NOT NULL, Indicator if the old resource has been migrated.
- **name**: `VARCHAR(255)` NOT NULL, Name of the old resource.
- **new_id**: `BIGINT`, New ID for the migrated resource.
- **new_module**: `VARCHAR(50)`, New module name for the migrated resource.
- **old_id**: `BIGINT`, Old ID for the resource.
- **type**: `VARCHAR(30)`, Type of the old resource.
- **reference**: `VARCHAR(255)`, Reference for the old resource.
- **options**: `VARCHAR(255)`, Options for the old resource.
- **popup**: `TEXT`, Popup settings for the old resource.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Created time.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Last modified time.


---


## role-api
### Table: roles

Moodle roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the role.
- **arche_type**: `VARCHAR(30)`, Role archetype, used during install and role reset.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the role, empty descriptions may be automatically localized.
- **name**: `VARCHAR(255)`, Name of the role, empty names are automatically localized.
- **short_name**: `VARCHAR(100)`, Short name of the role.
- **sort_order**: `INT(3)`, Sort order of the role.

---

### Table: role_allow_assigns

Defines which roles can assign other roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role that can assign.
- **allow_assign_id**: `BIGINT(19)`, ID of the role that can be assigned.

---

### Table: role_allow_overrides

Defines which roles can override other roles.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role that can override.
- **allow_override_id**: `BIGINT(19)`, ID of the role that can be overridden.

---

### Table: role_allow_switches

Defines which roles a user is allowed to switch to.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role the user has.
- **allow_switch_id**: `BIGINT(19)`, ID of the role the user is allowed to switch to.

---

### Table: role_allow_views

Defines which roles a user is allowed to view.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **role_id**: `BIGINT(19)`, ID of the role the user has.
- **allow_view_id**: `BIGINT(19)`, ID of the role the user is allowed to view.

---

### Table: role_assignments

Assigning roles in different contexts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Plugin responsible for the role assignment, empty when manually assigned.
- **context_id**: `BIGINT(19)`, Context ID where the role is assigned.
- **item_id**: `BIGINT(19)`, ID of the enrolment/auth instance responsible for this role assignment.
- **modifier_user_id**: `BIGINT(19)`, ID of the user who modified the role assignment.
- **role_id**: `BIGINT(19)`, ID of the assigned role.
- **sort_order**: `INT(3)`, Sort order of the role assignment.
- **created_at**: `BIGINT(19)`, Timestamp when the role assignment was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the role assignment was modified.
- **user_id**: `BIGINT(19)`, ID of the user to whom the role is assigned.

---

### Table: role_capabilities

Permission has to be signed, overriding a capability for a particular role.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **capability**: `VARCHAR(255)`, The capability name.
- **context_id**: `BIGINT(19)`, Context ID where the capability is applied.
- **permission**: `BIGINT(19)`, Permission level for the capability.
- **role_id**: `BIGINT(19)`, ID of the role the capability applies to.
- **created_at**: `BIGINT(19)`, Timestamp when the capability was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the capability was modified.
- **user_id**: `BIGINT(19)`, ID of the user who modified the capability.

---

### Table: role_context_levels

Lists which roles can be assigned at which context levels.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_level**: `BIGINT(19)`, Context level where the role can be assigned.
- **role_id**: `BIGINT(19)`, ID of the role.

---

### Table: role_names

Role names in native strings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID where the role name is used.
- **name**: `VARCHAR(255)`, Name of the role.
- **role_id**: `BIGINT(19)`, ID of the role.


---


## scale-api
### Table: scales

Defines grading scales.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course to which the scale belongs.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the scale.
- **description_format**: `TINYINT(3)`, Format of the description.
- **name**: `VARCHAR(255)`, Name of the scale.
- **scale**: `LONGTEXT(2147483647)`, Scale values.
- **created_at**: `BIGINT(19)`, Timestamp when the scale was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the scale was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created the scale.

---

### Table: scale_histories

History table for grading scales.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed on the scale (e.g., created, modified, deleted).
- **course_id**: `BIGINT(19)`, ID of the course to which the scale belongs.
- **description**: `LONGTEXT(2147483647)` (Nullable), Description of the scale.
- **logged_user**: `BIGINT(19)` (Nullable), ID of the user who last modified this scale.
- **name**: `VARCHAR(255)`, Name of the scale.
- **old_id**: `BIGINT(19)`, ID of the old scale before modification.
- **scale**: `LONGTEXT(2147483647)`, Scale values.
- **source**: `VARCHAR(255)` (Nullable), Source of the modification (e.g., manual, module, import).
- **created_at**: `BIGINT(19)` (Nullable), Timestamp when the scale was created.
- **updated_at**: `BIGINT(19)` (Nullable), Timestamp when the scale was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created or modified the scale.


---


## school-api
### grades

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### schools

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
telephone: varchar("telephone", { length: 256 }),
country: varchar("country", { length: 256 }),
province: varchar("province", { length: 256 }),
suburb: varchar("suburb", { length: 256 }),
district: varchar("district", { length: 256 }),
gradeId: varchar("grade_id", { length: 256 }).references(() => grades.id, { onDelete: "cascade" }).notNull()

### user_grades

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
gradeId: varchar("grade_id", { length: 256 }).references(() => grades.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### user_schools

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
schoolId: varchar("school_id", { length: 256 }).references(() => schools.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()


---


## scorm-api
# SCORM Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### Table: scorms

Each record is one SCORM module and its configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **auto**: `BOOLEAN(1)`, Indicates if the SCORM module should start automatically.
- **auto_commit**: `BOOLEAN(1)`, Indicates if auto-commit is enabled.
- **completion_score_required**: `BIGINT(19)`, Score required for completion.
- **completion_status_all_scos**: `BOOLEAN(1)`, Indicates if completion status is required for all SCOs.
- **completion_status_required**: `BOOLEAN(1)`, Indicates if a specific completion status is required.
- **course_id**: `BIGINT(19)`, Foreign key to the course ID.
- **display_attempt_status**: `BOOLEAN(1)`, Indicates if the attempt status should be displayed.
- **display_course_structure**: `BOOLEAN(1)`, Indicates if the course structure should be displayed.
- **force_completed**: `BOOLEAN(1)`, Indicates if force complete is enabled.
- **force_new_attempt**: `BOOLEAN(1)`, Indicates if a new attempt is forced.
- **grade_method**: `TINYINT(3)`, Method used for grading.
- **height**: `BIGINT(19)`, Height of the SCORM package display.
- **hide_browse**: `BOOLEAN(1)`, Indicates if browsing is hidden.
- **hide_toc**: `BOOLEAN(1)`, Indicates if the table of contents is hidden.
- **intro**: `LONGTEXT(2147483647)`, Introduction text.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **last_attempt_lock**: `BOOLEAN(1)`, Indicates if the last attempt is locked.
- **launch**: `BIGINT(19)`, Launch setting for the SCORM package.
- **mastery_override**: `BOOLEAN(1)`, Indicates if mastery override is enabled.
- **max_attempt**: `BIGINT(19)`, Maximum number of attempts allowed.
- **max_grade**: `DOUBLE(22)`, Maximum grade for the SCORM module.
- **md5_hash**: `VARCHAR(32)`, MD5 hash of the package file.
- **name**: `VARCHAR(255)`, Name of the SCORM module.
- **nav**: `BOOLEAN(1)`, Indicates if navigation is enabled.
- **nav_position_left**: `BIGINT(19)`, Left position for navigation.
- **nav_position_top**: `BIGINT(19)`, Top position for navigation.
- **options**: `VARCHAR(255)`, Additional options for the SCORM module.
- **popup**: `BOOLEAN(1)`, Indicates if the SCORM module should be displayed in a popup.
- **reference**: `VARCHAR(255)`, Reference for the SCORM module.
- **revision**: `BIGINT(19)`, Revision number of the SCORM module.
- **scorm_type**: `VARCHAR(50)`, Type of SCORM package (local, external, or repository).
- **sha1_hash**: `VARCHAR(40)`, SHA-1 hash of the package content or external path.
- **skip_view**: `BOOLEAN(1)`, Indicates if the view should be skipped.
- **time_close**: `BIGINT(19)`, Time when the SCORM module closes.
- **time_open**: `BIGINT(19)`, Time when the SCORM module opens.
- **update_freq**: `BOOLEAN(1)`, Indicates if the package must be automatically updated.
- **version**: `VARCHAR(9)`, Version of the SCORM package.
- **what_grade**: `BIGINT(19)`, Indicates what grade is used.
- **width**: `BIGINT(19)`, Width of the SCORM package display.
- **created_at**: `BIGINT(19)`, creation time.
- **updated_at**: `BIGINT(19)`, Last modified time.

---

### Table: scorm_aicc_sessions

Used by AICC HACP to store session information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt**: `BIGINT(19)`, Attempt number.
- **hacp_session**: `VARCHAR(255)`, Session ID used to authenticate AICC HACP communication.
- **lesson_status**: `VARCHAR(255)`, Status of the lesson.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.
- **scorm_id**: `BIGINT(19)`, Foreign key to the `scorm` table.
- **scorm_mode**: `VARCHAR(50)`, Mode of the SCORM module.
- **scorm_status**: `VARCHAR(255)`, Status of the SCORM module.
- **session_time**: `VARCHAR(255)`, Duration of the session.
- **created_at**: `BIGINT(19)`, Time when the session was created.
- **updated_at**: `BIGINT(19)`, Time when the session was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user ID.

---

### Table: scorm_scoes

Each SCO part of the SCORM module.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **identifier**: `VARCHAR(255)`, Identifier for the SCO.
- **launch**: `LONGTEXT(2147483647)`, Launch data for the SCO.
- **manifest**: `VARCHAR(255)`, Manifest identifier for the SCO.
- **organization**: `VARCHAR(255)`, Organization identifier for the SCO.
- **parent**: `VARCHAR(255)`, Parent identifier for the SCO.
- **scorm**: `BIGINT(19)`, Foreign key to the SCORM module.
- **scorm_type**: `VARCHAR(5)`, Type of SCORM.
- **sort_order**: `BIGINT(19)`, Order of the SCOs.
- **title**: `VARCHAR(255)`, Title of the SCO.

---

### Table: scorm_scoes_datas

Contains variable data from packages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **name**: `VARCHAR(255)`, Name of the data.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.
- **value**: `LONGTEXT(2147483647)`, Value of the data.

---

### Table: scorm_scoes_tracks

Tracks SCOs.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt**: `BIGINT(19)`, Attempt number.
- **element**: `VARCHAR(255)`, Element being tracked.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.
- **scorm_id**: `BIGINT(19)`, Foreign key to the SCORM module.
- **value**: `LONGTEXT(2147483647)`, Value being tracked.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, Foreign key to the user ID.

---

### Table: scorm_seq_mapinfos

SCORM2004 objective mapinfo description.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **objective_id**: `BIGINT(19)`, Foreign key to the objective ID.
- **read_normalized_measure**: `BOOLEAN(1)`, Indicates if the normalized measure should be read.
- **read_satisfied_status**: `BOOLEAN(1)`, Indicates if the satisfied status should be read.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.
- **target_objective_id**: `BIGINT(19)`, Foreign key to the target objective ID.
- **write_normalized_measure**: `BOOLEAN(1)`, Indicates if the normalized measure should be written.
- **write_satisfied_status**: `BOOLEAN(1)`, Indicates if the satisfied status should be written.

---

### Table: scorm_seq_objectives

SCORM2004 objective description.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **min_normalized_measure**: `FLOAT(11)`, Minimum normalized measure.
- **objective_id**: `VARCHAR(255)`, Objective identifier.
- **primary_obj**: `BOOLEAN(1)`, Indicates if this is the primary objective.
- **satisfied_by_measure**: `BOOLEAN(1)`, Indicates if the objective is satisfied by measure.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.

---

### Table: scorm_seq_rollup_rules

SCORM2004 sequencing rule.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `VARCHAR(15)`, Action taken by the rule.
- **child_activity_set**: `VARCHAR(15)`, Set of child activities affected by the rule.
- **condition_combination**: `VARCHAR(3)`, Combination of conditions (e.g., "all").
- **minimum_count**: `BIGINT(19)`, Minimum count for the rule.
- **minimum_percent**: `FLOAT(11)`, Minimum percentage for the rule.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.

---

### Table: scorm_seq_rollup_rule_conds

SCORM2004 sequencing rule condition.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cond**: `VARCHAR(25)`, Condition for the rule.
- **operator**: `VARCHAR(5)`, Operator for the condition (e.g., "noOp").
- **rollup_rule_id**: `BIGINT(19)`, Foreign key to the rollup rule ID.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.

---

### Table: scorm_seq_rule_conditions

SCORM2004 rule condition.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cond**: `VARCHAR(30)`, Condition for the rule (e.g., "always").
- **measure_threshold**: `FLOAT(11)`, Measure threshold for the rule.
- **operator**: `VARCHAR(5)`, Operator for the condition (e.g., "noOp").
- **refrenced_objective**: `VARCHAR(255)`, Referenced objective.
- **rule_conditions_id**: `BIGINT(19)`, Foreign key to the rule conditions ID.
- **sco_id**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.

---

### Table: scorm_seq_rule_conds

SCORM2004 rule conditions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `VARCHAR(25)`, Action taken by the rule.
- **condition_combination**: `VARCHAR(3)`, Combination of conditions (e.g., "all").
- **ruletype**: `TINYINT(3)`, Type of the rule.
- **scoid**: `BIGINT(19)`, Foreign key to the `scorm_scoes` table.


---


## search-api
### Table: search_index_requests

Records requests for (re)indexing of specific contexts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID that has been requested for reindexing.
- **index_priority**: `BIGINT(19)`, Priority value so that important requests can be dealt with first; higher numbers are processed first.
- **partial_area**: `VARCHAR(255)`, If processing of this context partially completed, set to the area that needs processing next. Blank indicates not processed yet.
- **partial_time**: `BIGINT(19)`, If processing partially completed, set to the timestamp within the next area where processing should start. 0 indicates not processed yet.
- **search_area**: `VARCHAR(255)`, Set (e.g. ‘forum-post’) if a specific area is to be reindexed. Blank indicates all areas.
- **created_at**: `BIGINT(19)`, Time at which this index update was requested.
- **updated_at**: `BIGINT(19)`, Time at which this index update was updated.

---

### Table: search_simpledb_indexes

Table containing the index data.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area_id**: `VARCHAR(255)`, Area ID.
- **content**: `LONGTEXT(2147483647)`, Content of the indexed item.
- **context_id**: `BIGINT(19)`, Context ID of the indexed item.
- **course_id**: `BIGINT(19)`, Course ID of the indexed item.
- **description_1**: `LONGTEXT(2147483647)`, First description field.
- **description_2**: `LONGTEXT(2147483647)`, Second description field.
- **doc_id**: `VARCHAR(255)`, Document ID of the indexed item.
- **item_id**: `BIGINT(19)`, Item ID of the indexed item.
- **owner_user_id**: `BIGINT(19)`, User ID of the owner of the indexed item.
- **title**: `LONGTEXT(2147483647)`, Title of the indexed item.
- **type**: `BOOLEAN(1)`, Type of the indexed item.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, User ID associated with the indexed item.


---


## sessions-api
### Table: sessions

Database-based session storage - now recommended.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **first_ip**: `VARCHAR(45)` (Nullable), The IP address from which the session was first created.
- **last_ip**: `VARCHAR(45)` (Nullable), The IP address from which the session was last accessed.
- **sess_data**: `LONGTEXT(2147483647)` (Nullable), Session content.
- **sid**: `VARCHAR(128)`, Session ID.
- **state**: `BIGINT(19)`, State of the session (0 means normal session).
- **created_at**: `BIGINT(19)`, Timestamp of when the session was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the session.
- **user_id**: `BIGINT(19)`, User ID associated with the session.


---


## show-api
### shows

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
url: varchar("url", { length: 256 }),
description: text("description"),
transcript: text("transcript"),
showsCategoryId: varchar("shows_category_id", { length: 256 }).references(() => showsCategories.id, { onDelete: "cascade" }).notNull(),
createdAt: timestamp("created_at").notNull().default(sql`now()`),
updatedAt: timestamp("updated_at").notNull().default(sql`now()`),

### shows_categories

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
description: text("description")


---


## social-api
### social_emojis

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### social_links

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
image: varchar("image", { length: 256 }),
url: varchar("url", { length: 256 })

### socials

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
tableName: varchar("table_name", { length: 256 }).notNull(),
fieldId: varchar("field_id", { length: 256 }).notNull(),
socialEmojiId: varchar("social_emoji_id", { length: 256 }).references(() => socialEmojis.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### social_shares

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
fieldId: varchar("field_id", { length: 256 }).notNull(),
tableName: varchar("table_name", { length: 256 }).notNull(),
socialLinkId: varchar("social_link_id", { length: 256 }).references(() => socialLinks.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()


---


## stats-api
### Table: stats_dailies

To accumulate daily stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.

---

### Table: stats_monthlies

To accumulate monthly stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.

---

### Table: stats_user_dailies

To accumulate daily stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_user_monthlies

To accumulate monthly stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_user_weeklies

To accumulate weekly stats per course/user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, Role ID.
- **stats_reads**: `BIGINT(19)`, Stats for reads.
- **stats_writes**: `BIGINT(19)`, Stats for writes.
- **stat_type**: `VARCHAR(30)`, Type of stat.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: stats_weeklies

To accumulate weekly stats.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Course ID.
- **role_id**: `BIGINT(19)`, ID of role for the aggregates.
- **stat1**: `BIGINT(19)`, Stat1, usually used for reads.
- **stat2**: `BIGINT(19)`, Stat2, usually used for writes.
- **stat_type**: `VARCHAR(20)`, Type of stat, typically 'activity'.
- **time_end**: `BIGINT(19)`, End time for the stats collection period.


---


## stickers-api
### stickers

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }),
image: varchar("image", { length: 256 }),
mimeType: varchar("mime_type", { length: 256 }),
extension: varchar("extension", { length: 256 }),
organizationId: varchar("organization_id", { length: 256 })


---


## subject-api
### subjects

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
icon: varchar("icon", { length: 256 }),
color: varchar("color", { length: 256 })

### subject_categories

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
organizationId: varchar("organization_id", { length: 256 }).notNull(),
image: varchar("image", { length: 256 })

### subjects_subject_categories (Link Table)

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
subjectCategoryId: varchar("subject_category_id", { length: 191 }).references(() => subjectCategories.id, { onDelete: "cascade" }).notNull(),
subjectId: varchar("subject_id", { length: 191 }).references(() => subjects.id, { onDelete: "cascade" }).notNull()


---


## support-api
# Support Dash

## Tables

List of Tables with their function described below:

### supportComments

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
comment: text("comment").notNull(),
attachments: varchar("attachments", { length: 256 }),
timeSpent: varchar("time_spent", { length: 256 }),
supportTicketId: varchar("support_ticket_id", { length: 256 }).references(() => supportTickets.id, { onDelete: "cascade" }).notNull(),
userId: varchar("user_id", { length: 256 }).notNull()

### supportDepartments

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
description: text("description"),
userId: varchar("user_id", { length: 256 }).notNull()

### supportStatuses

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
color: varchar("color", { length: 256 })

### supportTickets

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
descrption: text("descrption"),
attachments: varchar("attachments", { length: 256 }),
timeSpent: varchar("time_spent", { length: 256 }),
open: boolean("open"),
path: varchar("path", { length: 256 }),
device: text("device"),
assignedTo: varchar("assigned_to", { length: 256 }),
supportDepartmentId: varchar("support_department_id", { length: 256 }).references(() => supportDepartments.id, { onDelete: "cascade" }).notNull(),
supportTopicId: varchar("support_topic_id", { length: 256 }).references(() => supportTopics.id, { onDelete: "cascade" }).notNull(),
supportStatusId: varchar("support_status_id", { length: 256 }).references(() => supportStatuses.id, { onDelete: "cascade" }).notNull(),
province: varchar("province", { length: 256 }),
grade: varchar("grade", { length: 256 }),
createdAt: timestamp("created_at").notNull().default(sql`now()`),
updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
userId: varchar("user_id", { length: 256 }).notNull(),

### supportTopics

id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
name: varchar("name", { length: 256 }).notNull(),
supportDepartmentId: varchar("support_department_id", { length: 256 }).references(() => supportDepartments.id, { onDelete: "cascade" }).notNull()


---


## survey-api
# Survey Dash

## Tables

List of Tables with their function described below:

### Table: surveys

Each record is one SURVEY module with its configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **completion_submit**: `BIT(1)`, If this field is set to 1, the activity will be automatically marked as ‘complete’ once the user submits the survey.
- **course_id**: `BIGINT(19)`, Course ID.
- **days**: `MEDIUMINT(7)`, Number of days for survey completion.
- **intro**: `LONGTEXT(2147483647)` (Nullable), Introductory text for the survey.
- **intro_format**: `SMALLINT(5)`, Format of the intro text field.
- **name**: `VARCHAR(255)`, Name of the survey.
- **questions**: `VARCHAR(255)`, Questions associated with the survey.
- **template_id**: `BIGINT(19)`, Template ID.
- **created_at**: `BIGINT(19)`, Time when the survey was created.
- **updated_at**: `BIGINT(19)`, Time when the survey was last modified.

---

### Table: survey_analysis

Text about each survey submission.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **notes**: `LONGTEXT(2147483647)` (Nullable), Notes about the survey submission.
- **survey_id**: `BIGINT(19)`, Survey ID.
- **user_id**: `BIGINT(19)`, User ID.

---

### Table: survey_answers

The answers to each question filled by the users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer1**: `LONGTEXT(2147483647)` (Nullable), First part of the answer.
- **answer2**: `LONGTEXT(2147483647)` (Nullable), Second part of the answer.
- **question**: `BIGINT(19)`, Question ID.
- **survey_id**: `BIGINT(19)`, Survey ID.
- **created_at**: `BIGINT(19)`, Time when the answer was submitted.
- **updated_at**: `BIGINT(19)`, Time when the answer was updated.
- **user_id**: `BIGINT(19)`, User ID.

---

### Table: survey_questions

The questions conforming one survey.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **intro**: `VARCHAR(50)`, Introduction to the question.
- **multi**: `VARCHAR(100)`, Multiple choice options.
- **options**: `LONGTEXT(2147483647)` (Nullable), Options for the question.
- **short_text**: `VARCHAR(30)`, Short text for the question.
- **text**: `VARCHAR(255)`, The text of the question.
- **type**: `SMALLINT(5)`, Type of the question.


---


## tag-api
# Tag Dash

## Tables

List of Tables with their function described below:

### Table: tag_colls

Defines different sets of tags.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Defines the Moodle component associated with the tag collection.
- **custom_url**: `VARCHAR(255)`, Custom URL for the tag page instead of /tag/index.php.
- **is_default**: `BOOLEAN(1)`, Indicates if this tag collection is the default (default 0).
- **name**: `VARCHAR(255)`, Name of the tag collection.
- **searchable**: `BOOLEAN(1)`, Indicates if the tag collection is searchable (default 1).
- **sort_order**: `INT(3)`, Sort order of the tag collection.

---

### Table: tags

Tag table - this generic table will replace the old “tags” table.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the tag.
- **description_format**: `TINYINT(3)`, Format of the description.
- **flag**: `SMALLINT(5)`, Indicates if a tag is flagged as inappropriate (default 0).
- **is_standard**: `BOOLEAN(1)`, Indicates if this tag is standard (default 0).
- **name**: `VARCHAR(255)`, Name of the tag.
- **raw_name**: `VARCHAR(255)`, The raw, unnormalized name for the tag as entered by users.
- **tag_coll_id**: `BIGINT(19)`, Foreign key to the tag collection.
- **created_at**: `BIGINT(19)`, Timestamp of the creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, User ID who created the tag.

---

### Table: tag_areas

Defines various tag areas, one area is identified by component, itemtype, and tagcollid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **callback**: `VARCHAR(100)`, Callback function for the tag area.
- **callback_file**: `VARCHAR(100)`, File containing the callback function.
- **component**: `VARCHAR(100)`, Defines the Moodle component associated with the tag area.
- **enabled**: `BOOLEAN(1)`, Indicates if the tag area is enabled (default 1).
- **item_type**: `VARCHAR(100)`, Type of the item tagged.
- **multiple_contexts**: `BOOLEAN(1)`, Indicates if the tag area allows tag instances to be created in multiple contexts (default 0).
- **show_standard**: `BOOLEAN(1)`, Indicates if the standard tags should be shown (default 0).
- **tag_coll_id**: `BIGINT(19)`, Foreign key to the tag collection.

---

### Table: tag_correlations

The rationale for the ‘tag_correlation’ table is performance improvements.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correlated_tags**: `LONGTEXT(2147483647)`, List of correlated tags.
- **tag_id**: `BIGINT(19)`, Foreign key to the tag.

---

### Table: tag_instances

Holds the information of associations between tags and items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Defines the Moodle component which the tag was added to.
- **context_id**: `BIGINT(19)`, The context ID of the item that was tagged.
- **item_id**: `BIGINT(19)`, ID of the item that was tagged.
- **item_type**: `VARCHAR(100)`, Type of the item that was tagged.
- **ordering**: `BIGINT(19)`, Maintains the order of the tag instances of an item.
- **tag_id**: `BIGINT(19)`, Foreign key to the tag.
- **created_at**: `BIGINT(19)`, Timestamp of when the tag instance was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, User ID who created the tag instance.


---


## task-api
# Task Dash

## Tables

List of Tables with their function described below:

### Table: task_adhocs

List of adhoc tasks waiting to run.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **blocking**: `TINYINT(3)`, Indicates if the task blocks others (default 0).
- **classname**: `VARCHAR(255)`, The name of the class extending `adhoc_task` to run when this task is executed.
- **component**: `VARCHAR(255)`, The component that triggered this adhoc task.
- **custom_data**: `LONGTEXT(2147483647)`, Custom data to be passed to the adhoc task, must be serializable using `json_encode()`.
- **fail_delay**: `BIGINT(19)`, Delay before retrying the task after failure.
- **host_name**: `VARCHAR(255)`, Hostname where the task is running.
- **next_runtime**: `BIGINT(19)`, The next scheduled runtime of the task.
- **pid**: `BIGINT(19)`, Process ID that is running the task.
- **created_at**: `BIGINT(19)`, Timestamp of adhoc task creation.
- **updated_at**: `BIGINT(19)`, Time when the task was started.
- **user_id**: `BIGINT(19)`, User ID associated with the task.

---

### Table: task_logs

The log table for all tasks.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **classname**: `VARCHAR(255)`, The class of the task being run.
- **component**: `VARCHAR(255)`, The component that the task belongs to.
- **db_reads**: `BIGINT(19)`, The number of DB reads performed during the task.
- **db_writes**: `BIGINT(19)`, The number of DB writes performed during the task.
- **host_name**: `VARCHAR(255)`, Hostname where the task was executed.
- **output**: `LONGTEXT(2147483647)`, Output of the task.
- **pid**: `BIGINT(19)`, PHP process ID that was running the task.
- **result**: `BOOLEAN(1)`, Whether the task was successful or not. 0 = pass; 1 = fail.
- **type**: `SMALLINT(5)`, The type of task. Scheduled task = 0; Adhoc task = 1.
- **created_at**: `DECIMAL(20)`, The end time of the task.
- **updated_at**: `DECIMAL(20)`, The start time of the task.
- **user_id**: `BIGINT(19)`, The user ID that the task was configured to run as (Adhoc tasks only).

---

### Table: task_schedules

List of scheduled tasks to be run by cron.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **blocking**: `BOOLEAN(1)`, Block the entire cron when this task is running (default 0).
- **classname**: `VARCHAR(255)`, The class extending `scheduled_task` to be called when running this task.
- **component**: `VARCHAR(255)`, The component this scheduled task belongs to.
- **customised**: `TINYINT(3)`, Used on upgrades to prevent overwriting custom schedules (default 0).
- **day**: `VARCHAR(90)`, Day of the month the task should run.
- **day_of_week**: `VARCHAR(25)`, Day of the week the task should run.
- **disabled**: `BOOLEAN(1)`, Indicates if the task is disabled (default 0).
- **fail_delay**: `BIGINT(19)`, Delay before retrying the task after failure.
- **hostname**: `VARCHAR(255)`, Hostname where the task is running.
- **hour**: `VARCHAR(70)`, Hour the task should run.
- **last_runtime**: `BIGINT(19)`, Last runtime of the task.
- **minute**: `VARCHAR(200)`, Minute the task should run.
- **month**: `VARCHAR(30)`, Month the task should run.
- **next_runtime**: `BIGINT(19)`, Next scheduled runtime of the task.
- **pid**: `BIGINT(19)`, PHP process ID that is running the task.
- **time_started**: `BIGINT(19)`, Time when the task was started.


---


## theme-api
# Theme Dash

## Tables

List of Tables with their function described below:

### themes

id
name
organization_id
created_at
updated_at
user_id

### theme_components

id
name

### theme_component_styles

id
theme_id
component_id
style
created_at
updated_at
user_id


---


## tool-brickfield-api
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


---


## tool-cohort-api
# Tool Cohort Dash

## Tables

List of Tables with their function described below:

### Table: tool_cohort_roles

Mapping of users to cohort role assignments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cohort_id**: `BIGINT(19)`, The cohort to sync.
- **role_id**: `BIGINT(19)`, The role to assign.
- **user_modified**: `BIGINT(19)`, Who last modified this record.
- **created_at**: `BIGINT(19)`, The time this record was created.
- **updated_at**: `BIGINT(19)`, The time this record was modified.
- **user_id**: `BIGINT(19)`, The user to sync.


---


## tool-custom-lang-api
# Tool Custom Language Dash

## Tables

List of Tables with their function described below:

### Table: tool_custom_langs

Contains the working checkout of all strings and their customizations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component_id**: `BIGINT(19)`, The ID of the component.
- **lang**: `VARCHAR(20)`, The code of the language this string belongs to, e.g., en, cs, or es.
- **local**: `LONGTEXT(2147483647)`, Local customization of the string, null if not customized.
- **master**: `LONGTEXT(2147483647)`, Master translation of the string as distributed in the official lang pack, null if not translated.
- **modified**: `SMALLINT(5)`, Indicates if the string has been modified via the translator (default 0).
- **original**: `LONGTEXT(2147483647)`, English original of the string.
- **outdated**: `SMALLINT(5)`, Indicates if the customization may be outdated due to changes in the original or master translation (default 0).
- **string_id**: `VARCHAR(255)`, The identifier of the string.
- **customized_at**: `BIGINT(19)`, Timestamp of when the local translation was recently modified, null if not customized yet.
- **created_at**: `BIGINT(19)`, Timestamp of when the original or master was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the original or master was recently modified.

---

### Table: tool_custom_lang_components

Contains the list of all installed plugins that provide their own strings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **name**: `VARCHAR(255)`, The normalized name of the plugin.
- **version**: `VARCHAR(255)`, The checked out version of the plugin, null if the version is unknown.


---


## tool-data-privacy-api
### Table: tool_dataprivacy_categories

Data categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the data category.
- **description_format**: `BIT(1)`, Format of the description.
- **name**: `VARCHAR(100)`, Name of the data category.
- **created_at**: `BIGINT(19)`, Time when the category was created.
- **updated_at**: `BIGINT(19)`, Time when the category was last modified.
- **user*id***: `BIGINT(19)`, ID of the user who last modified the category.

---

### Table: tool_dataprivacy_ctx_expireds

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the context.
- **default_expired**: `BIT(1)`, Indicates if the default retention period has passed.
- **expired_roles**: `LONGTEXT(2147483647)`, Explicitly expires roles.
- **status**: `TINYINT(3)`, Status of the context.
- **unexpired_roles**: `LONGTEXT(2147483647)`, Roles which have explicitly not expired yet.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_ctx_instances

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **context_id**: `BIGINT(19)`, ID of the context.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_ctx_levels

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **context_level**: `SMALLINT(5)`, The context level.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_purposes

Data purposes.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the data purpose.
- **description_format**: `BIT(1)`, Format of the description.
- **lawful_bases**: `LONGTEXT(2147483647)`, Comma-separated IDs matching records in `tool_dataprivacy_lawfulbasis`.
- **name**: `VARCHAR(100)`, Name of the data purpose.
- **protected**: `BIT(1)`, Indicates if the data is protected.
- **retention_period**: `VARCHAR(255)`, Retention period.
- **sensitive_data_reasons**: `LONGTEXT(2147483647)`, Comma-separated IDs matching records in `tool_dataprivacy_sensitive`.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_purpose_roles

Data purpose overrides for a specific role.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **lawful_bases**: `LONGTEXT(2147483647)`, Lawful bases.
- **protected**: `BIT(1)`, Indicates if the data is protected.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **retention_period**: `VARCHAR(255)`, Retention period.
- **role_id**: `BIGINT(19)`, ID of the role.
- **sensitive_data_reasons**: `LONGTEXT(2147483647)`, Sensitive data reasons.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_requests

Table for data requests.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **comments**: `LONGTEXT(2147483647)`, More details about the request.
- **comments_format**: `TINYINT(3)`, Format of the comments.
- **creation_method**: `BIGINT(19)`, The type of the creation method of the data request.
- **dpo**: `BIGINT(19)`, The user ID of the Data Protection Officer who is reviewing the request.
- **dpo_comment**: `LONGTEXT(2147483647)`, DPO’s comments (e.g., reason for rejecting the request, etc.).
- **dpo_comment_format**: `TINYINT(3)`, Format of the DPO comment.
- **requested_by**: `BIGINT(19)`, The user ID of the one making the request.
- **status**: `TINYINT(3)`, The current status of the data request.
- **system_approved**: `SMALLINT(5)`, Indicates if the request is system approved (0 = no, 1 = yes).
- **type**: `BIGINT(19)`, Data request type.
- **user_modified**: `BIGINT(19)`, The user who created/modified this request object.
- **created_at**: `BIGINT(19)`, The time this data request was created.
- **updated_at**: `BIGINT(19)`, The last time this data request was updated.
- **user_id**: `BIGINT(19)`, The user ID the request is being made for.


---


## tool-monitor-api
# Tool Monitor Dash

## Tables

List of Tables with their function described below:

### Table: tool_monitor_events

A table that keeps a log of events related to subscriptions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID.
- **context_instance_id**: `BIGINT(19)`, Context instance ID.
- **context_level**: `BIGINT(19)`, Context level.
- **course_id**: `BIGINT(19)`, Course ID.
- **event_name**: `VARCHAR(254)`, Event name.
- **link**: `VARCHAR(254)`, Link to the event location.
- **created_at**: `BIGINT(19)`, Time when the event was created.
- **updated_at**: `BIGINT(19)`, Time when the event was updated.

---

### Table: tool_monitor_history

Table to store the history of message notifications sent.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **sid**: `BIGINT(19)`, Subscription ID.
- **time_sent**: `BIGINT(19)`, Timestamp of when the message was sent.
- **user_id**: `BIGINT(19)`, User to whom this notification was sent.

---

### Table: tool_monitor_rules

Table to store rules.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course to which this rule belongs.
- **description**: `LONGTEXT(2147483647)`, Description of the rule.
- **description_format**: `BIT(1)`, Format of the description.
- **event_name**: `VARCHAR(254)`, Fully qualified name of the event.
- **frequency**: `SMALLINT(5)`, Frequency of the rule.
- **name**: `VARCHAR(254)`, Name of the rule.
- **plugin**: `VARCHAR(254)`, Name of the plugin.
- **template**: `LONGTEXT(2147483647)`, Message template.
- **template_format**: `BIT(1)`, Format of the template.
- **time_window**: `MEDIUMINT(7)`, Time window in seconds.
- **created_at**: `BIGINT(19)`, Timestamp of when this rule was created.
- **updated_at**: `BIGINT(19)`, Timestamp when this rule was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created the rule.

---

### Table: tool_monitor_subscriptions

Table to store user subscriptions to various rules.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cm_id**: `BIGINT(19)`, Course module ID.
- **course_id**: `BIGINT(19)`, Course ID of the subscription.
- **inactive_date**: `BIGINT(19)`, Timestamp of the time when a notification was last sent for this subscription.
- **last_notification_sent**: `BIGINT(19)`, Timestamp of when a notification was last sent for this subscription.
- **rule_id**: `BIGINT(19)`, Rule ID.
- **created_at**: `BIGINT(19)`, Timestamp of when this subscription was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when this subscription was updated.
- **user_id**: `BIGINT(19)`, User ID of the subscriber.


---


## tool-policy-api
# Tool Policy Dash

## Tables

List of Tables with their function described below:

### Table: tool_policies

Contains the list of policy documents defined on the site.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **current_version_id**: `BIGINT(19)`, ID of the current policy version that applies on the site, NULL if the policy does not apply.
- **sort_order**: `INT(7)`, Defines the order in which policies should be presented to users (default 999).

---

### Table: tool_policy_acceptances

Tracks users accepting the policy versions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **lang**: `VARCHAR(30)`, Code of the language the user had when the policy document was displayed.
- **note**: `LONGTEXT(2147483647)`, Plain text note describing how the actual consent has been obtained if the policy has been accepted on other user’s behalf.
- **policy_version_id**: `BIGINT(19)`, ID of the policy document version.
- **status**: `BIT(1)`, Acceptance status: 1 - accepted, 0 - not accepted.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the acceptance record.
- **created_at**: `BIGINT(19)`, Timestamp of when the acceptance record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the acceptance record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user this acceptance is relevant to.

---

### Table: tool_policy_versions

Holds versions of the policy documents.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **agreement_style**: `SMALLINT(5)`, How this agreement should flow: 0 - on the consent page, 1 - on a separate page before reaching the consent page.
- **archived**: `SMALLINT(5)`, Should the version be considered as archived. All non-archived, non-current versions are considered to be drafts.
- **audience**: `SMALLINT(5)`, Who is this policy targeted at: 0 - all users, 1 - logged in users only, 2 - guests only.
- **content**: `LONGTEXT(2147483647)`, Full policy text.
- **content_format**: `SMALLINT(5)`, Format of the content field.
- **name**: `VARCHAR(1333)`, Name of the policy document.
- **optional**: `SMALLINT(5)`, 0 - the policy must be accepted to use the site, 1 - accepting the policy is optional.
- **policy_id**: `BIGINT(19)`, ID of the policy document we are a version of.
- **revision**: `VARCHAR(1333)`, Human readable version of the policy document.
- **summary**: `LONGTEXT(2147483647)`, Policy text summary.
- **summary_format**: `SMALLINT(5)`, Format of the summary field.
- **type**: `SMALLINT(5)`, Type of the policy: 0 - Site policy, 1 - Privacy policy, 2 - Third party policy, 99 - Other.
- **created_at**: `BIGINT(19)`, Timestamp of when the policy version was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the policy version was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last edited this policy document version.


---


## tool-recyclebin-api
# Tool Recyclebin Dash

## Tables

List of Tables with their function described below:

### Table: tool_recyclebin_categories

A list of items in the category recycle bin.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **full_name**: `VARCHAR(255)`, Full name of the category.
- **short_name**: `VARCHAR(255)`, Short name of the category.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was updated.

---

### Table: tool_recyclebin_courses

A list of items in the course recycle bin.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course.
- **module_id**: `BIGINT(19)`, ID of the module.
- **name**: `VARCHAR(255)`, Name of the item.
- **section_id**: `BIGINT(19)`, Section ID.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was updated.


---


## tool-user-tours-api
# Tool User Tour Dash

## Tables

List of Tables with their function described below:

### Table: tool_user_tours_steps

Steps in a tour.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **config_data**: `LONGTEXT(2147483647)`, Configuration data.
- **content**: `LONGTEXT(2147483647)`, Content of the user tour.
- **content_format**: `SMALLINT(5)`, Format of the content.
- **sort_order**: `BIGINT(19)`, Sort order of the step.
- **target_type**: `TINYINT(3)`, Type of the target (e.g., block, CSS selector, etc.).
- **target_value**: `LONGTEXT(2147483647)`, The value for the specified target type.
- **title**: `LONGTEXT(2147483647)`, Title of the step.
- **tour_id**: `BIGINT(19)`, ID of the tour.

---

### Table: tool_user_tours_tours

List of tours.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **config_data**: `LONGTEXT(2147483647)`, Configuration data.
- **description**: `LONGTEXT(2147483647)`, Description of the tour.
- **display_step_numbers**: `BIT(1)`, Setting to display step numbers of the tour.
- **enabled**: `BIT(1)`, Indicates if the tour is enabled.
- **end_tour_label**: `VARCHAR(255)`, Custom label for the end tour button.
- **name**: `VARCHAR(255)`, Name of the user tour.
- **path_match**: `VARCHAR(255)`, Path match for the tour.
- **sort_order**: `BIGINT(19)`, Sort order of the tour.


---


## universities-api
# Universities Dash

## Tables

List of Tables with their function described below:

### Universities

#### Fields

- id
- name
- logo
- created_at
- updated_at


---


## url-api
### Table: urls

Each record is one URL resource.
This table stores information about URL resources, including their associated courses, display options, introduction text, and any parameters related to the URL.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this URL resource is part of.
- **display**: `SMALLINT(5)`, Display type for the URL resource.
- **display_options**: `LONGTEXT(2147483647)`, Options for displaying the URL.
- **external_url**: `LONGTEXT(2147483647)`, The actual URL being referenced.
- **intro**: `LONGTEXT(2147483647)`, Introduction or description of the URL resource.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **name**: `VARCHAR(255)`, Name of the URL resource.
- **parameters**: `LONGTEXT(2147483647)`, Parameters associated with the URL.
- **created_at**: `BIGINT(19)`, Timestamp of when this URL resource was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when this URL resource was last modified.

---


---


## user-api
# User Dash

## Tables

This README provides an overview of the tables in the User Dash application, along with their fields and functions.

### Table: users

Each record represents one person.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user.
- **username**: `VARCHAR(100)`, The user's username.
- **password**: `VARCHAR(255)`, The user's password.
- **first_name**: `VARCHAR(100)`, The user's first name.
- **last_name**: `VARCHAR(100)`, The user's last name.
- **email**: `VARCHAR(100)`, The user's email address.
- **city**: `VARCHAR(120)`, The city where the user is located.
- **country**: `VARCHAR(2)`, The country code for the user's country.
- **lang**: `VARCHAR(30)`, The user's preferred language.
- **timezone**: `VARCHAR(100)`, The user's timezone.
- **first_access**: `BIGINT(19)`, Timestamp of the user's first access.
- **last_access**: `BIGINT(19)`, Timestamp of the user's last access.
- **last_login**: `BIGINT(19)`, Timestamp of the user's last login.
- **current_login**: `BIGINT(19)`, Timestamp of the user's current login.
- **last_ip**: `VARCHAR(45)`, The user's last IP address.
- **picture**: `BIGINT(19)`, Indicates if the user has uploaded a picture.
- **description**: `LONGTEXT(2147483647)`, Description or biography of the user.
- **description_format**: `TINYINT(3)`, Format of the description.
- **mail_display**: `TINYINT(3)`, Mail display settings.
- **mail_format**: `BOOLEAN(1)`, Mail format (0 for plain text, 1 for HTML).
- **auto_subscribe**: `BOOLEAN(1)`, Auto-subscribe to forums.
- **track_forums**: `BOOLEAN(1)`, Track forum posts.
- **trust_bitmask**: `BIGINT(19)`, Trust bitmask.
- **confirmed**: `BOOLEAN(1)`, Whether the account is confirmed.
- **deleted**: `BOOLEAN(1)`, Whether the account is deleted.
- **suspended**: `BOOLEAN(1)`, Whether the account is suspended.
- **policy_agreed**: `BOOLEAN(1)`, Whether the user agreed to the policy.
- **phone1**: `VARCHAR(20)`, Primary phone number.
- **phone2**: `VARCHAR(20)`, Secondary phone number.
- **institution**: `VARCHAR(255)`, Institution.
- **department**: `VARCHAR(255)`, Department.
- **address**: `VARCHAR(255)`, Address.
- **alternate_name**: `VARCHAR(255)`, Alternate name.
- **first_name_phonetic**: `VARCHAR(255)`, Phonetic first name.
- **last_name_phonetic**: `VARCHAR(255)`, Phonetic last name.
- **middle_name**: `VARCHAR(255)`, Middle name.
- **auth**: `VARCHAR(20)`, Authentication method.
- **secret**: `VARCHAR(15)`, Secret.
- **image_alt**: `VARCHAR(255)`, Alternative text for user image.
- **calendar_type**: `VARCHAR(30)`, Calendar type.
- **lang**: `VARCHAR(30)`, Language.
- **email_stop**: `BOOLEAN(1)`, Stop email.
- **mail_digest**: `BOOLEAN(1)`, Mail digest.
- **theme**: `VARCHAR(50)`, Theme.
- **created_at**: `BIGINT(19)`, Timestamp of account creation.
- **updated_at**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: user_devices

This table stores user’s mobile devices information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the device.
- **app_id**: `VARCHAR(128)`, The app ID, usually something like com.moodle.moodlemobile.
- **push_id**: `VARCHAR(255)`, The device push token/key/identifier/registration ID.
- **model**: `VARCHAR(32)`, The device model, e.g., Nexus 4 or iPad 1,1.
- **name**: `VARCHAR(32)`, The device name, e.g., occam or iPhone.
- **platform**: `VARCHAR(32)`, The device platform, e.g., Android or iOS.
- **uuid**: `VARCHAR(255)`, The device vendor UUID.
- **version**: `VARCHAR(32)`, The device version, e.g., 6.1.2, 4.2.2.
- **created_at**: `BIGINT(19)`, Timestamp of when the device was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the device was last modified.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_enrolments

Users participating in courses (aka enrolled users).

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the enrolment record.
- **enrolid**: `BIGINT(19)`, Foreign key reference to the enrolment method.
- **status**: `BIGINT(19)`, Status of the enrolment (0 means active participation).
- **time_start**: `BIGINT(19)`, Timestamp when enrolment starts.
- **time_end**: `BIGINT(19)`, Timestamp when enrolment ends.
- **modifier_id**: `BIGINT(19)`, ID of the user who modified the enrolment.
- **created_at**: `BIGINT(19)`, Timestamp of enrolment creation.
- **updated_at**: `BIGINT(19)`, Timestamp of last modification.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_info_categories

Customisable fields categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the category.
- **name**: `VARCHAR(255)`, Category name.
- **sort_order**: `INT(3)`, Display order of the category.

---

### Table: user_info_datas

Data for the customisable user fields.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the data record.
- **field_id**: `BIGINT(19)`, Foreign key reference to the field.
- **data**: `LONGTEXT(2147483647)`, The data for the custom field.
- **data_format**: `TINYINT(3)`, Format of the data.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_info_fields

Customisable user profile fields.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the field.
- **category_id**: `BIGINT(19)`, Foreign key reference to the category.
- **short_name**: `VARCHAR(255)`, Short name for the field.
- **name**: `LONGTEXT(2147483647)`, Field name.
- **data_type**: `VARCHAR(255)`, Type of data held in this field.
- **description**: `LONGTEXT(2147483647)`, Description of the field.
- **description_format**: `TINYINT(3)`, Format of the description.
- **default_data**: `LONGTEXT(2147483647)`, Default value for the field.
- **default_data_format**: `TINYINT(3)`, Format of the default data.
- **param1**: `LONGTEXT(2147483647)`, General parameter field.
- **param2**: `LONGTEXT(2147483647)`, General parameter field.
- **param3**: `LONGTEXT(2147483647)`, General parameter field.
- **param4**: `LONGTEXT(2147483647)`, General parameter field.
- **param5**: `LONGTEXT(2147483647)`, General parameter field.
- **visible**: `SMALLINT(1)`, Visibility of the field (private, public, hidden).
- **required**: `BOOLEAN(1)`, Whether the field is required.
- **locked**: `BOOLEAN(1)`, Whether the field is locked.
- **force_unique**: `BOOLEAN(1)`, Whether the field should contain unique data.
- **signup**: `BOOLEAN(1)`, Whether to display the field on the signup page.
- **sort_order**: `INT(3)`, Order within the category.

---

### Table: user_last_accesses

To keep track of course page access times, used in online participation reports.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course.
- **created_at**: `BIGINT(19)`, Timestamp of the first access to the course.
- **updated_at**: `BIGINT(19)`, Timestamp of the last access to the course.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_password_histories

A rotating log of hashes of previously used passwords for each user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **hash**: `VARCHAR(255)`, Hash of the previously used password.
- **created_at**: `BIGINT(19)`, Timestamp when the password was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the password was updated.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_password_resets

Tracking password reset confirmation tokens.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **token**: `VARCHAR(32)`, Secret set and emailed to user.
- **created_at**: `BIGINT(19)`, Timestamp when the password reset was requested.
- **updated_at**: `BIGINT(19)`, Timestamp when the password reset was re-requested.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_preferences

Allows modules to store arbitrary user preferences.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the preference.
- **name**: `VARCHAR(255)`, Name of the preference.
- **value**: `VARCHAR(1333)`, Value of the preference.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_private_keys

Access keys used in cookieless scripts (e.g., RSS).

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the key.
- **script**: `VARCHAR(128)`, Plugin, module - unique identifier.
- **value**: `VARCHAR(128)`, Private access key value.
- **instance**: `BIGINT(19)`, Optional instance ID.
- **ip_restriction**: `VARCHAR(255)`, IP restriction.
- **valid_until**: `BIGINT(19)`, Timestamp until the key is valid.
- **created_at**: `BIGINT(19)`, Timestamp of key creation.
- **updated_at**: `BIGINT(19)`, Timestamp of key updated.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.


---


## wiki-api
# Wiki Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### Table: wikis

Stores Wiki activity configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki activity.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this wiki activity belongs to.
- **name**: `VARCHAR(255)`, Name of the wiki activity.
- **intro**: `LONGTEXT(2147483647)`, Introduction to the wiki activity.
- **intro_format**: `SMALLINT(5)`, Format of the introduction field (e.g., MOODLE, HTML, MARKDOWN).
- **default_format**: `VARCHAR(20)`, Default editor format for the wiki (e.g., creole).
- **force_format**: `BIT(1)`, Whether the default editor format is forced.
- **first_page_title**: `VARCHAR(255)`, Title of the first page of the wiki.
- **wiki_mode**: `VARCHAR(20)`, Mode of the wiki (e.g., individual, collaborative).
- **edit_begin**: `BIGINT(19)`, Start time for editing.
- **edit_end**: `BIGINT(19)`, End time for editing.
- **created_at**: `BIGINT(19)`, Timestamp when the wiki activity was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the wiki activity was last modified.

---

### Table: wiki_links

Stores links between wiki pages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki link.
- **from_page_id**: `BIGINT(19)`, ID of the page that contains the link.
- **to_page_id**: `BIGINT(19)`, ID of the page that receives the link.
- **to_missing_page**: `VARCHAR(255)`, Link to a nonexistent page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance.

---

### Table: wiki_locks

Manages page locks to prevent simultaneous editing.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the lock.
- **page_id**: `BIGINT(19)`, ID of the locked page.
- **locked_at**: `BIGINT(19)`, Timestamp when the page was locked.
- **section_name**: `VARCHAR(255)`, Section of the page that is locked.
- **user_id**: `BIGINT(19)`, ID of the user who locked the page.

---

### Table: wiki_pages

Stores wiki pages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance to which this page belongs.
- **title**: `VARCHAR(255)`, Title of the page.
- **cached_content**: `LONGTEXT(2147483647)`, Cached content of the page.
- **time_rendered**: `BIGINT(19)`, Timestamp when the page was last rendered.
- **page_views**: `BIGINT(19)`, Number of times the page has been viewed.
- **read_only**: `BIT(1)`, Whether the page is read-only.
- **created_at**: `BIGINT(19)`, Timestamp when the page was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the page was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created or modified the page.

---

### Table: wiki_subwikis

Stores subwiki instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the subwiki instance.
- **wiki_id**: `BIGINT(19)`, ID of the wiki activity.
- **group_id**: `BIGINT(19)`, ID of the group that owns this subwiki.
- **user_id**: `BIGINT(19)`, ID of the user who owns this subwiki.

---

### Table: wiki_synonyms

Stores wiki page synonyms.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the synonym.
- **page_id**: `BIGINT(19)`, ID of the original page.
- **page_synonym**: `VARCHAR(255)`, Synonym for the page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance.

---

### Table: wiki_versions

Stores wiki page history.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the version.
- **page_id**: `BIGINT(19)`, ID of the page.
- **content**: `LONGTEXT(2147483647)`, Content of the page.
- **content_format**: `VARCHAR(20)`, Markup used to write the content (e.g., creole).
- **version**: `MEDIUMINT(7)`, Version number of the page.
- **created_at**: `BIGINT(19)`, Timestamp when the version was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the version was updated.
- **user_id**: `BIGINT(19)`, ID of the user who edited the page.


---


## workshop-api
# WorkshopDash

## Tables

List of Tables with their function described below:

### Table: workshop

Stores information about workshop module instances and their configurations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the workshop instance.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course the workshop belongs to.
- **name**: `VARCHAR(255)`, Name of the workshop activity.
- **intro**: `LONGTEXT(2147483647)`, Introduction or description of the workshop activity.
- **intro_format**: `SMALLINT(5)`, Format of the intro field.
- **instruct_authors**: `LONGTEXT(2147483647)`, Instructions for the submission phase.
- **instruct_authors_format**: `SMALLINT(5)`, Format of the instructions for authors.
- **instruct_reviewers**: `LONGTEXT(2147483647)`, Instructions for the assessment phase.
- **instruct_reviewers_format**: `SMALLINT(5)`, Format of the instructions for reviewers.
- **submission_start**: `BIGINT(19)`, Timestamp of the start of the submission phase.
- **submission_end**: `BIGINT(19)`, Timestamp of the end of the submission phase.
- **assessment_start**: `BIGINT(19)`, Timestamp of the start of the assessment phase.
- **assessment_end**: `BIGINT(19)`, Timestamp of the end of the assessment phase.
- **phase_switch_assessment**: `TINYINT(3)`, Automatically switch to the assessment phase after the submissions deadline.
- **submission_type_file**: `BIT(1)`, Can students attach files for their submissions? (0 for no, 1 for optional, 2 for required).
- **submission_type_text**: `BIT(1)`, Can students enter text for their submissions? (0 for no, 1 for optional, 2 for required).
- **submission_file_types**: `VARCHAR(255)`, Comma-separated list of allowed file extensions for submissions.
- **grade**: `DECIMAL(10)`, Maximum grade for submission.
- **grading_grade**: `DECIMAL(10)`, Maximum grade for assessment.
- **grade_decimals**: `SMALLINT(5)`, Number of digits shown after the decimal point for grades.
- **max_bytes**: `BIGINT(19)`, Maximum size of one attached file.
- **n_attachments**: `SMALLINT(5)`, Maximum number of submission attachments.
- **late_submissions**: `TINYINT(3)`, Allow submitting the work after the deadline.
- **use_examples**: `TINYINT(3)`, Optional feature: students practice evaluating on example submissions from the teacher.
- **use_peer_assessment**: `TINYINT(3)`, Optional feature: students perform peer assessment of others' work.
- **use_self_assessment**: `TINYINT(3)`, Optional feature: students perform self-assessment of their own work.
- **evaluation**: `VARCHAR(30)`, The grading evaluation method.
- **strategy**: `VARCHAR(30)`, The grading strategy used in the workshop.
- **overall_feedback_mode**: `SMALLINT(5)`, Mode of the overall feedback support.
- **overall_feedback_files**: `SMALLINT(5)`, Number of allowed attachments to the overall feedback.
- **overall_feedback_file_types**: `VARCHAR(255)`, Comma-separated list of allowed file extensions for overall feedback.
- **overall_feedback_max_bytes**: `BIGINT(19)`, Maximum size of one file attached to the overall feedback.
- **conclusion**: `LONGTEXT(2147483647)`, Text displayed at the end of the workshop.
- **conclusion_format**: `SMALLINT(5)`, Format of the conclusion field content.
- **phase**: `SMALLINT(5)`, Current phase of the workshop (0 = not available, 1 = submission, 2 = assessment, 3 = closed).
- **created_at**: `BIGINT(19)`, Timestamp when the module was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the module was last modified.

---

### Table: workshop_aggregations

Stores aggregated grades for assessments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the aggregation.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **grading_grade**: `DECIMAL(10)`, Aggregated grade for all assessments made by this reviewer (0..100).
- **time_graded**: `BIGINT(19)`, Timestamp when the participant’s grading grade was recently aggregated.
- **user_id**: `BIGINT(19)`, ID of the user for whom aggregated grades are calculated.

---

### Table: workshop_assessments

Stores information about assessments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the assessment.
- **submission_id**: `BIGINT(19)`, ID of the assessed submission.
- **reviewer_id**: `BIGINT(19)`, ID of the reviewer who makes this assessment.
- **grade**: `DECIMAL(10)`, Aggregated grade for the submission suggested by the reviewer (0..100).
- **grading_grade**: `DECIMAL(10)`, Computed grade for this assessment (0..100).
- **grading_grade_over**: `DECIMAL(10)`, Grade for the assessment manually overridden by a teacher.
- **grading_grade_over_by**: `BIGINT(19)`, ID of the user who has overridden the grade for the assessment.
- **feedback_author**: `LONGTEXT(2147483647)`, Comment/feedback from the reviewer for the author.
- **feedback_author_format**: `SMALLINT(5)`, Format of the feedback author field.
- **feedback_author_attachment**: `SMALLINT(5)`, Are there files attached to the feedback author field?
- **feedback_reviewer**: `LONGTEXT(2147483647)`, Comment/feedback from the teacher for the reviewer.
- **feedback_reviewer_format**: `SMALLINT(5)`, Format of the feedback reviewer field.
- **weight**: `BIGINT(19)`, Weight of the assessment for aggregation purposes.
- **created_at**: `BIGINT(19)`, Timestamp when the assessment was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the assessment was last modified.

---

### Table: workshop_grades

Stores information about how reviewers filled out the grading forms.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **assessment_id**: `BIGINT(19)`, Foreign key reference to the assessment.
- **dimension_id**: `BIGINT(19)`, Foreign key reference to the dimension in the grading strategy table.
- **grade**: `DECIMAL(10)`, Given grade in the referenced assessment dimension.
- **peer_comment**: `LONGTEXT(2147483647)`, Reviewer’s comment to the grade value.
- **peer_comment_format**: `SMALLINT(5)`, Format of the peer comment field.
- **strategy**: `VARCHAR(30)`, Strategy used for the assessment.

---

### Table: workshop_submissions

Stores information about submissions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the submission.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **author_id**: `BIGINT(19)`, ID of the author of the submission.
- **title**: `VARCHAR(255)`, Title of the submission.
- **content**: `LONGTEXT(2147483647)`, Submission text.
- **content_format**: `SMALLINT(5)`, Format of the submission text.
- **content_trust**: `SMALLINT(5)`, Trust mode of the data.
- **attachment**: `TINYINT(3)`, Used by File API file post-update standard file manager.
- **example**: `TINYINT(3)`, Is this submission an example from the teacher.
- **grade**: `DECIMAL(10)`, Aggregated grade for the submission (0..100).
- **grade_over**: `DECIMAL(10)`, Grade for the submission manually overridden by a teacher.
- **grade_over_by**: `BIGINT(19)`, ID of the user who has overridden the grade for submission.
- **published**: `TINYINT(3)`, Shall the submission be available to others when the workshop is closed.
- **late**: `TINYINT(3)`, Has this submission been submitted after the deadline or during the assessment phase?
- **feedback_author**: `LONGTEXT(2147483647)`, Teacher comment/feedback for the author of the submission.
- **feedback_author_format**: `SMALLINT(5)`, Format of the feedback author field.
- **time_graded**: `BIGINT(19)`, Timestamp when the grade or gradeover was recently modified.
- **created_at**: `BIGINT(19)`, Timestamp when the work was submitted for the first time.
- **updated_at**: `BIGINT(19)`, Timestamp when the submission has been updated.

---

### Table: workshopallocation_scheduled

Stores the allocation settings for the scheduled allocator.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the allocation settings.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **enabled**: `TINYINT(3)`, Is the scheduled allocation enabled.
- **settings**: `LONGTEXT(2147483647)`, Pre-defined settings for the underlying random allocation.
- **submissionend**: `BIGINT(19)`, Workshop’s submission end timestamp when the record was created or modified.
- **time_allocated**: `BIGINT(19)`, Timestamp when the last scheduled allocation was executed.
- **result_status**: `BIGINT(19)`, Resulting status of the most recent execution.
- **result_message**: `VARCHAR(1333)`, Optional short message describing the resulting status.
- **result_log**: `LONGTEXT(2147483647)`, Log of the most recent execution.

---

### Table: workshopeval_best_settings

Stores settings for the grading evaluation subplugin "Comparison with the best".

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the settings.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **comparison**: `SMALLINT(5)`, Factor of comparison of assessment (default to 5).

---

### Table: workshopform_accumulative

Stores assessment dimensions definitions of the Accumulative grading strategy.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the dimension.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **description**: `LONGTEXT(2147483647)`, Description of the dimension.
- **description_format**: `SMALLINT(5)`, Format of the description field.
- **grade**: `BIGINT(19)`, Maximum grade on a scale 0..grade or a reference to the scale table.
- **sort**: `INT(3)`, Defines the dimension order within the assessment form.
- **weight**: `MEDIUMINT(7)`, Weight of the dimension.

---

### Table: workshopform_comments

Stores assessment dimensions definitions of the Comments strategy.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the dimension.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **description**: `LONGTEXT(2147483647)`, Description of the dimension.
- **description_format**: `SMALLINT(5)`, Format of the description field.
- **sort**: `BIGINT(19)`, Defines the dimension order within the assessment form.

---

### Table: workshopform_numerrors

Stores assessment dimensions definitions of the Number of Errors grading strategy.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the dimension.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **description**: `LONGTEXT(2147483647)`, Description of the dimension.
- **description_format**: `SMALLINT(5)`, Format of the description field.
- **description_trust**: `BIGINT(19)`, Trust level of the description.
- **grade0**: `VARCHAR(50)`, Description for negative evaluation.
- **grade1**: `VARCHAR(50)`, Description for positive evaluation.
- **sort**: `INT(3)`, Defines the dimension order within the assessment form.
- **weight**: `MEDIUMINT(7)`, Weight of the dimension.

---

### Table: workshopform_numerrors_map

Maps the number of errors to a percentual grade for submissions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the map.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **no_negative**: `BIGINT(19)`, Number of negative responses given by the reviewer.
- **grade**: `DECIMAL(10)`, Percentual grade (0..100) for this number of negative responses.

---

### Table: workshopform_rubric

Stores assessment dimensions definitions of the Rubric grading strategy.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the dimension.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **description**: `LONGTEXT(2147483647)`, Description of the dimension.
- **description_format**: `SMALLINT(5)`, Format of the description field.
- **sort**: `INT(3)`, Defines the dimension order within the assessment form.

---

### Table: workshopform_rubric_config

Stores configuration for the Rubric grading strategy.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the configuration.
- **workshop_id**: `BIGINT(19)`, Foreign key reference to the workshop instance.
- **layout**: `VARCHAR(30)`, How the rubric should be displayed for reviewers.

---

### Table: workshopform_rubric_levels

Stores rubric rating scales definitions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the level.
- **dimension_id**: `BIGINT(19)`, Foreign key reference to the criterion this level is part of.
- **definition**: `LONGTEXT(2147483647)`, Definition of this level.
- **definition_format**: `SMALLINT(5)`, Format of the definition field.
- **grade**: `DECIMAL(10)`, Grade representing this level.


---


## zoom-api
# zooms Dash

## Tables

List of Tables with their function described below:

### zooms

This table saves information about users zoom details

#### Fields

- email
- key
- Secret
- SdkKey
- StsApiKey
- StsApiSecret
- StsAccountId

### zoom_meetings

This table saves information about the zoom calls

#### Fields

- meeting_link
- participants
- zoom_id
- user_id

### zoom_lessons

shows the meetings associated with lessons

#### Fields

- active
- course_id
- user_id


---


