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
