# WorkshopDash

## Tables

List of Tables with their function described below:

### workshops

This table keeps information about the module instances and

#### Fields

- id
- assessment_start \* 0 = will be started manually, greater than 0 the timestamp of the start of the assessment phase
- conclusion \* A text to be displayed at the end of the workshop.
- conclusion_format \* The format of the conclusion field content.
- course_id \* ID of the parent course
- evaluation \* The recently used grading evaluation method
- examples_mode \* 0 = example assessments are voluntary, 1 = examples must be assessed before submission, 2 = examples are available after own submission and must be assessed before peer/self assessment phase
- grade \* The maximum grade for submission
- grade_decimals \* Number of digits that should be shown after the decimal point when displaying grades
- grading_grade \* The maximum grade for assessment
- instruct_authors \* Instructions for the submission phase
- instruct_authors_format
- instruct_reviewers \* Instructions for the assessment phase
- instruct_reviewers_format
- intro \* The introduction or description of the activity
- intro_format \* The format of the intro field
- late_submissions \* Allow submitting the work after the deadline
- max_bytes \* Maximum size of the one attached file
- name \* Name of the activity
- natt_achments \* Maximum number of submission attachments
- overall_feedback_files \* Number of allowed attachments to the overall feedback.
- overall_feedback_file_types \* comma separated list of file extensions
- overall_feedback_max_bytes \* Maximum size of one file attached to the overall feedback.
- overall_feedback_mode \* Mode of the overall feedback support.
- phase \* The current phase of workshop (0 = not available, 1 = submission, 2 = assessment, 3 = closed)
- phase_switch_assessment \* Automatically switch to the assessment phase after the submissions deadline
- strategy \* The type of the current grading strategy used in this workshop
- submissionend \* 0 = will be closed manually, greater than 0 the timestamp of the end of the submission phase
- submission_file_types \* comma separated list of file extensions
- submission_start \* 0 = will be started manually, greater than 0 the timestamp of the start of the submission phase
- submission_type_file \* Can students attach files for their submissions? 0 for no, 1 for optional, 2 for required.
- submission_type_text \* Can students enter text for their submissions? 0 for no, 1 for optional, 2 for required.
- use_examples \* optional feature: students practise evaluating on example submissions from teacher
- use_peer_assessment \* optional feature: students perform peer assessment of others’ work
- use_self_assessment \* optional feature: students perform self assessment of their own work
- created_at \* The timestamp when the module was created
- updated_at \* The timestamp when the module was modified

### workshop_aggregations

Aggregated grades for assessment are stored here. The aggreg

#### Fields

- id
- grading_grade \* The aggregated grade for all assessments made by this reviewer. The grade is a number from interval 0..100. If NULL then the grade for assessments has not been aggregated yet.
- workshop_id \* the id of the workshop instance
- created_at \* The timestamp of when the participant’s gradinggrade was recently aggregated.
- updated_at
- user_id \* The id of the user which aggregated grades are calculated for

### workshop_assessments

Info about the made assessment and automatically calculated

#### Fields

- id
- feedback_author \* The comment/feedback from the reviewer for the author.
- feedback_author_attachment \* Are there some files attached to the feedbackauthor field? Sets to 1 by file_postupdate_standard_filemanager().
- feedback_author_format
- feedback_reviewer \* The comment/feedback from the teacher for the reviewer. For example the reason why the grade for assessment was overridden
- feedback_reviewer_format
- grade \* The aggregated grade for submission suggested by the reviewer. The grade 0..100 is computed from the values assigned to the assessment dimensions fields. If NULL then it has not been aggregated yet.
- grading_grade \* The computed grade 0..100 for this assessment. If NULL then it has not been computed yet.
- grading_grade_over \* Grade for the assessment manually overridden by a teacher. Grade is always from interval 0..100. If NULL then the grade is not overriden.
- grading_grade_over_by \* The id of the user who has overridden the grade for submission.
- reviewer_id \* The id of the reviewer who makes this assessment
- submission_id \* The id of the assessed submission
- weight \* The weight of the assessment for the purposes of aggregation
- created_at \* If 0 then the assessment was allocated but the reviewer has not assessed yet. If greater than 0 then the timestamp of when the reviewer assessed for the first time
- updated_at \* If 0 then the assessment was allocated but the reviewer has not assessed yet. If greater than 0 then the timestamp of when the reviewer assessed for the last time

### workshop_grades

How the reviewers filled-up the grading forms, given grades

#### Fields

- id
- assessment_id \* Part of which assessment this grade is of
- dimension_id \* Foreign key. References dimension id in one of the grading strategy tables.
- grade \* Given grade in the referenced assessment dimension.
- peer_comment \* Reviewer’s comment to the grade value.
- peer_comment_format \* The format of peercomment field
- strategy

### workshop_submissions

Info about the submission and the aggregation of the grade f

#### Fields

- id
- attachment \* Used by File API file_postupdate_standard_filemanager
- content \* Submission text
- content_format \* The format of submission text
- content_trust \* The trust mode of the data
- example \* Is this submission an example from teacher
- feedback_author \* Teacher comment/feedback for the author of the submission, for example describing the reasons for the grade overriding
- feedback_author_format
- grade \* Aggregated grade for the submission. The grade is a decimal number from interval 0..100. If NULL then the grade for submission has not been aggregated yet.
- grade_over \* Grade for the submission manually overridden by a teacher. Grade is always from interval 0..100. If NULL then the grade is not overriden.
- grade_over_by \* The id of the user who has overridden the grade for submission.
- late \* Has this submission been submitted after the deadline or during the assessment phase?
- published \* Shall the submission be available to other when the workshop is closed
- title \* The submission title
- workshop_id \* the id of the workshop instance
- created_at \* Timestamp when the work was submitted for the first time
- updated_at \* The timestamp when grade or gradeover was recently modified
- user_id \* The author of the submission

### workshop_allocation_schedules

Stores the allocation settings for the scheduled allocator

#### Fields

- id
- enabled \* Is the scheduled allocation enabled
- result_log \* The log of the most recent execution
- result_message \* Optional short message describing the resulting status
- result_status \* The resulting status of the most recent execution
- settings \* The pre-defined settings for the underlying random allocation to run it with
- submissionend \* What was the workshop’s submissionend when this record was created or modified
- workshop_id \* workshop id we are part of
- created_at \* When was the last scheduled allocation executed
- updated_at

### workshop_eval_best_settings

Settings for the grading evaluation subplugin Comparison wit

#### Fields

- id
- comparison \* Here we store the recently set factor of comparison of assessment in the given workshop. Reasonable values are from 1 to 10 or so. Default to 5.
- workshop_id \* workshop id we are part of

### workshop_form_accumulatives

The assessment dimensions definitions of Accumulative gradin

#### Fields

- id
- description \* The description of the dimension
- description_format \* The format of the description field
- grade \* If greater than 0, then the value is maximum grade on a scale 0..grade. If lesser than 0, then its absolute value is the id of a record in scale table. If equals 0, then no grading is possible for this dimension, just commenting.
- sort \* Defines the dimension order within the assessment form
- weight \* The weigh of the dimension
- workshop_id \* Workshop ID

### workshop_form_comments

The assessment dimensions definitions of Comments strategy f

#### Fields

- id
- description \* The description of the dimension
- description_format \* The format of the description field
- sort \* Defines the dimension order within the assessment form
- workshop_id \* Workshop ID

### workshop_form_num_errors

The assessment dimensions definitions of Number of errors gr

#### Fields

- id
- description \* The description of the dimension
- description_format \* The format of the description field
- description_trust
- grade_0 \* The word describing the negative evaluation (like Poor, Missing, Absent, etc.). If NULL, it defaults to a translated string False
- grade_1 \* A word for possitive evaluation (like Good, Present, OK etc). If NULL, it defaults to a translated string True
- sort \* Defines the dimension order within the assessment form
- weight \* Weight of this dimension
- workshop_id \* Workshop ID

### workshop_form_num_error_maps

This maps the number of errors to a percentual grade for sub

#### Fields

- id
- grade \* Percentual grade 0..100 for this number of negative responses
- no_negative \* Number of negative responses given by the reviewer
- workshop_id \* The id of the workshop

### workshop_form_rubrics

The assessment dimensions definitions of Rubric grading stra

#### Fields

- id
- description \* The description of the dimension
- description_format \* The format of the description field
- sort \* Defines the dimension order within the assessment form
- workshop_id \* Workshop ID

### workshop_form_rubric_configs

Configuration table for the Rubric grading strategy

#### Fields

- id
- layout \* How should the rubric be displayed for reviewers
- workshop_id \* The id of workshop this configuartion applies for

### workshop_form_rubric_levels

The definition of rubric rating scales

#### Fields

- id
- definition \* The definition of this level
- definition_format \* The format of the definition field
- dimension_id \* Which criterion this level is part of
- grade \* Grade representing this level.
