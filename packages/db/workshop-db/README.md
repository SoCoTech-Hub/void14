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
