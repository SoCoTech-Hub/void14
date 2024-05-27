### Table: question

This table stores the definition of one version of a question.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **default_mark**: `DECIMAL(12)`, Default mark for the question.
- **general_feedback**: `LONGTEXT(2147483647)`, Feedback for the question.
- **general_feedback_format**: `TINYINT(3)`, Format of the general feedback.
- **length**: `BIGINT(19)`, Length of the question.
- **name**: `VARCHAR(255)`, Name of the question.
- **parent**: `BIGINT(19)`, Parent ID of the question.
- **penalty**: `DECIMAL(12)`, Penalty for the question.
- **qtype**: `VARCHAR(20)`, Question type.
- **question_text**: `LONGTEXT(2147483647)`, Text of the question.
- **question_text_format**: `TINYINT(3)`, Format of the question text.
- **stamp**: `VARCHAR(255)`, Stamp of the question.
- **modified_by**: `BIGINT(19)`, User ID of the person who last edited this question.

- **created_at**: `BIGINT(19)`, Time the question was created.
- **updated_at**: `BIGINT(19)`, Time the question was last modified.
- **user_id**: `BIGINT(19)`, User ID of the person who created this question.

---

### Table: question_answers

Answers, with a fractional grade (0-1) and feedback.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer**: `LONGTEXT(2147483647)`, Answer text.
- **answer_format**: `TINYINT(3)`, Format of the answer text.
- **feedback**: `LONGTEXT(2147483647)`, Feedback for the answer.
- **feedback_format**: `TINYINT(3)`, Format of the feedback.
- **fraction**: `DECIMAL(12)`, Fractional grade for the answer.
- **question**: `BIGINT(19)`, ID of the related question.

---

### Table: question_attempt_step_data

Each question_attempt_step has an associative array of the data.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt_step_id**: `BIGINT(19)`, Foreign key, references `question_attempt_steps.id`.
- **name**: `VARCHAR(32)`, Name of this bit of data.
- **value**: `LONGTEXT(2147483647)`, Corresponding value.

---

### Table: question_attempt_steps

Stores one step in a question attempt. As well as the data recorded with this step, the state and time are recorded.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **fraction**: `DECIMAL(12)`, The grade for this question when graded out of 1.
- **question_attempt_id**: `BIGINT(19)`, Foreign key, references `question_attempts.id`.
- **sequence_number**: `BIGINT(19)`, Sequential number of the steps in a question attempt.
- **state**: `VARCHAR(13)`, State of the question at the end of this step.
- **created_at**: `BIGINT(19)`, Timestamp of the action that led to this state being created.
- **updated_at**: `BIGINT(19)`, Timestamp of the action that led to this state being modified.
- **userid**: `BIGINT(19)`, User ID whose action led to this state being created.

---

### Table: question_attempts

Each row here corresponds to an attempt at one question, as part of an attempt at a whole quiz or similar activity.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **behaviour**: `VARCHAR(32)`, Name of the question behaviour managing this question attempt.
- **flagged**: `BOOLEAN(1)`, Indicates whether this question has been flagged within the attempt.
- **max_fraction**: `DECIMAL(12)`, Indicates the greatest fraction that can be awarded.
- **max_mark**: `DECIMAL(12)`, The grade this question is marked out of in this attempt.
- **min_fraction**: `DECIMAL(12)`, Indicates the most negative mark that can be awarded, where the maximum positive mark is 1.
- **question_id**: `BIGINT(19)`, ID of the question being attempted, references `question.id`.
- **question_summary**: `LONGTEXT(2147483647)`, Summary of the student's response.
- **question_usage_id**: `BIGINT(19)`, Foreign key, references `question_usages.id`.
- **response_summary**: `LONGTEXT(2147483647)`, Summary of the student's response.
- **right_answer**: `LONGTEXT(2147483647)`, Summary of the right answer to the question.
- **slot**: `BIGINT(19)`, Used to number the questions in one attempt sequentially.
- **variant**: `BIGINT(19)`, The variant of the question being used.
- **created_at**: `BIGINT(19)`, The time this record was created.
- **updated_at**: `BIGINT(19)`, The time this record was last changed.

---

### Table: question_bank_entries

Each question bank entry. This table has one row for each question.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **id_number**: `VARCHAR(100)`, Unique identifier, useful especially for mapping to external entities.
- **question_category_id**: `BIGINT(19)`, ID of the category this question is part of.
- **user_id**: `BIGINT(19)`, User ID of the person who owns this question bank entry.

---

### Table: question_calculated

Options for questions of type calculated.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer**: `BIGINT(19)`, ID of the related answer.
- **correct_answer_format**: `BIGINT(19)`, Format of the correct answer.
- **correct_answer_length**: `BIGINT(19)`, Length of the correct answer.
- **question**: `BIGINT(19)`, ID of the related question.
- **tolerance**: `VARCHAR(20)`, Tolerance for the answer.
- **tolerance_type**: `BIGINT(19)`, Type of tolerance.

---

### Table: question_calculated_options

Options for questions of type calculated.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer_numbering**: `VARCHAR(10)`, Indicates how and whether the choices should be numbered.
- **correct_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question**: `BIGINT(19)`, ID of the related question.
- **show_num_correct**: `BOOLEAN(1)`, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates if the choices should be shuffled.
- **single**: `BOOLEAN(1)`, Indicates if the question allows a single response.
- **synchronize**: `BOOLEAN(1)`, Indicates if the question should be synchronized.

---

### Table: question_categories

Categories for grouping questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the context this category is shared in.
- **id_number**: `VARCHAR(100)`, Unique identifier.
- **info**: `LONGTEXT(2147483647)`, Information about the category.
- **info_format**: `TINYINT(3)`, Format of the category information.
- **name**: `VARCHAR(255)`, Name of the category.
- **parent**: `BIGINT(19)`, Parent ID of the category.
- **sort_order**: `BIGINT(19)`, Sort order of the category.
- **stamp**: `VARCHAR(255)`, Stamp of the category.

---

### Table: question_dataset_definitions

Organises and stores properties for dataset items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category**: `BIGINT(19)`, ID of the related category.
- **item_count**: `BIGINT(19)`, Count of items in the dataset.
- **name**: `VARCHAR(255), Name of the dataset.
- **options**: `VARCHAR(255)`, Options for the dataset.
- **type**: `BIGINT(19)`, Type of the dataset.

---

### Table: question_dataset_items

Individual dataset items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition**: `BIGINT(19)`, ID of the related definition.
- **item_number**: `BIGINT(19)`, Number of the item in the dataset.
- **value**: `VARCHAR(255)`, Value of the dataset item.

---

### Table: question_datasets

Many-many relation between questions and dataset definitions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **data_set_definition**: `BIGINT(19)`, ID of the related dataset definition.
- **question_id**: `BIGINT(19)`, ID of the related question.

---

### Table: question_ddwtos

Defines drag and drop (words into sentences) questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correct_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_num_correct**: `BOOLEAN(1)`, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates if the choices should be shuffled.

---

### Table: question_gapselect

Defines select missing words questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correct_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partiallycorrect_feedback**: `LONGTEXT(2147483647)`, Feedback shown for any partially correct response.
- **partiallycorrect_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_num_correct**: `BOOLEAN(1)`, Indicates if the number of correct choices should be shown.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates if the choices should be shuffled.

---

### Table: question_hints

Stores the part of the question definition that gives hints to students.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **clear_wrong**: `BOOLEAN(1)`, Indicates if any wrong choices should be cleared before the next try.
- **hint**: `LONGTEXT(2147483647)`, The text of the feedback to be given.
- **hint_format**: `SMALLINT(5)`, Format of the hint.
- **options**: `VARCHAR(255)`, Space for any other question-type specific options.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_num_correct**: `BOOLEAN(1)`, Indicates if the feedback should include a message about how many things the student got right.

---

### Table: question_multianswer

Options for multianswer questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **sequence**: `LONGTEXT(2147483647)`, Sequence of the answers.

---

### Table: question_numerical

Options for numerical questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer_id**: `BIGINT(19)`, Foreign key references `question_answers.id`.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **tolerance**: `VARCHAR(255)`, Allowed error when matching a response to this answer.

---

### Table: question_numerical_options

Options for numerical questions. This table is also used for handling units.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_units**: `SMALLINT(5)`, How units are handled: 3) Not used at all, 0) Optional, or 1) must be right or penalty applied.
- **unit_grading_type**: `SMALLINT(5)`, Grading type for the unit: 0) No penalty, 1) Fraction of response grade, 2) Fraction of total grade.
- **unit_penalty**: `DECIMAL(12)`, Penalty for getting the unit wrong when they are being graded.
- **units_left**: `SMALLINT(5)`, Indicates if the unit should be displayed to the left as in $1.00.

---

### Table: question_numerical_units

Optional unit options for numerical questions. This table is also used for handling units.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **multiplier**: `DECIMAL(38)`, Multiplier for this unit.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **unit**: `VARCHAR(50)`, The unit, e.g., 'm' or 'kg'.

---

### Table: question_references

Records where a specific question is used.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Component, e.g., `mod_quiz` or `core_question`.
- **item_id**: `BIGINT(19)`, Plugin specific ID, e.g., `slotid` for a quiz.
- **question_area**: `VARCHAR(50)`, Depending on the component, which area the question is used in, e.g., `slot` for a quiz.
- **question_bank_entry_id**: `BIGINT(19)`, ID of the question bank entry this question is part of.
- **using_context_id**: `BIGINT(19)`, Context where the question is used.
- **version**: `BIGINT(19)`, Version number for the question where NULL means use the latest ready version.

---

### Table: question_response_analysis

Analysis of student responses given to questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **a_id**: `VARCHAR(100)`, Analysis ID.
- **credit**: `DECIMAL(15)`, Credit received for the response.
- **hash_code**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **response**: `LONGTEXT(2147483647)`, The student's response.
- **subq_id**: `VARCHAR(100)`, Sub-question ID.
- **variant**: `BIGINT(19)`, Variant of the question.
- **which_tries**: `VARCHAR(255)`, Indicates which tries are being analyzed.
- **created_at**: `BIGINT(19)`, Time the analysis was created.
- **updated_at**: `BIGINT(19)`, Time the analysis was modified.

---

### Table: question_response_count

Count for each response for each try at a question.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **analysis_id**: `BIGINT(19)`, ID of the related analysis.
- **rcount**: `BIGINT(19)`, Count of responses.
- **try**: `BIGINT(19)`, Attempt number.

---

### Table: question_set_references

Records where groups of questions are used.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Component, e.g., `mod_quiz`.
- **filter_condition**: `LONGTEXT(2147483647)`, Filter expression in JSON format.
- **item_id**: `BIGINT(19)`, Plugin specific ID, e.g., `slotid` for a quiz.
- **question_area**: `VARCHAR(50)`, Depending on the component, which area the question is used in, e.g., `slot` for a quiz.
- **questions_context_id**: `BIGINT(19)`, Context questions come from.
- **using_context_id**: `BIGINT(19)`, Context where the questions are used.

---

### Table: question_statistics

Statistics for individual questions used in an activity.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **discrimination_index**: `DECIMAL(15)`, Index of discrimination.
- **discriminative_efficiency**: `DECIMAL(15)`, Efficiency of discrimination.
- **effective_weight**: `DECIMAL(15)`, Effective weight.
- **facility**: `DECIMAL(15)`, Facility index.
- **hashcode**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **max_mark**: `DECIMAL(12)`, Maximum mark for the question.
- **neg_covar**: `BOOLEAN(1)`, Indicates if there is negative covariance.
- **positions**: `LONGTEXT(2147483647)`, Positions in which this item appears.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **random_guess_score**: `DECIMAL(12)`, Estimate of the score for random guessing.
- **s**: `BIGINT(19)`, Value of 's'.
- **sd**: `DECIMAL(15)`, Standard deviation.
- **slot**: `BIGINT(19)`, Position in the quiz where this question appears.
- **sub_question**: `BOOLEAN(1)`, Indicates if it is a subquestion.
- **sub_questions**: `LONGTEXT(2147483647)`, Subquestions related to the question.
- **variant**: `BIGINT(19)`, Variant of the question.
- **created_at**: `BIGINT(19)`, Time the statistics was created.
- **updated_at**: `BIGINT(19)`, Time the statistics were modified.

---

### Table: question_truefalse

Options for True-False questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **false_answer**: `BIGINT(19)`, Foreign key references `question_answers.id`. The ‘False’ choice.
- **question**: `BIGINT(19)`, ID of the related question, references `question.id`.
- **true_answer**: `BIGINT(19)`, Foreign key references `question_answers.id`. The ‘True’ choice.

---

### Table: question_usages

This table’s main purpose is to assign a unique ID to each attempt.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(255)`, The plugin this attempt belongs to, e.g., ‘mod_quiz’, ‘block_questionoftheday’, ‘filter_embedquestion’.
- **context_id**: `BIGINT(19)`, ID of the context associated with this usage.
- **preferred_behaviour**: `VARCHAR(32)`, The archetypal behaviour that should be used for question attempts in this usage.

---

### Table: question_versions

A join table linking the different question version definitions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **question_bank_entry_id**: `BIGINT(19)`, ID of the question bank entry this question version is part of.
- **question_id**: `BIGINT(19)`, ID of the question.
- **status**: `VARCHAR(10)`, Status of the question (ready, hidden, draft).
- **version**: `BIGINT(19)`, Version number of the question, where the first version is always 1.
