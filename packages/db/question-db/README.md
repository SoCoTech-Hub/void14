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
