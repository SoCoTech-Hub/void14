### Table: quiz

The settings for each quiz.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **allow_offline_attempts**: `BOOLEAN(1)`, Whether to allow the quiz to be attempted offline in the mobile app.
- **attempt_on_last**: `BOOLEAN(1)`, Whether subsequent attempts start from the answer to the previous attempt (1) or start blank (0).
- **attempts**: `MEDIUMINT(7)`, The maximum number of attempts a student is allowed.
- **browser_security**: `VARCHAR(32)`, Restriction on the browser the student must use (e.g., 'securewindow').
- **can_redo_questions**: `BOOLEAN(1)`, Allows students to redo any completed question within a quiz attempt.
- **completion_attempt_sex_hausted**: `BOOLEAN(1)`, Whether completion requires all attempts to be exhausted.
- **completion_min_attempts**: `BIGINT(19)`, Minimum number of attempts required for completion.
- **course**: `BIGINT(19)`, Foreign key reference to the course this quiz is part of.
- **decimal_points**: `SMALLINT(5)`, Number of decimal points to use when displaying grades.
- **delay_1**: `BIGINT(19)`, Delay between the first and second attempt, in seconds.
- **delay_2**: `BIGINT(19)`, Delay between the second and subsequent attempts, in seconds.
- **grace_period**: `BIGINT(19)`, Amount of time after the time limit runs out during which attempts can still be submitted.
- **grade**: `DECIMAL(10)`, The total that the quiz overall grade is scaled to be out of.
- **grade_method**: `SMALLINT(5)`, Grading method: one of QUIZ_GRADEHIGHEST, QUIZ_GRADEAVERAGE, QUIZ_ATTEMPTFIRST, or QUIZ_ATTEMPTLAST.
- **intro**: `LONGTEXT(2147483647)`, Quiz introduction text.
- **intro_format**: `SMALLINT(5)`, Format of the quiz intro text.
- **name**: `VARCHAR(255)`, Quiz name.
- **nav_method**: `VARCHAR(16)`, Navigation method: 'free' or 'seq'.
- **over_due_handling**: `VARCHAR(16)`, Method used to handle overdue attempts: 'autosubmit', 'graceperiod', or 'autoabandon'.
- **password**: `VARCHAR(255)`, Password required to start or continue a quiz attempt.
- **preferred_behaviour**: `VARCHAR(32)`, Behaviour to ask questions to use.
- **question_decimal_points**: `SMALLINT(5)`, Number of decimal points for displaying question grades.
- **questions_per_page**: `BIGINT(19)`, How often to insert a page break when editing the quiz or when shuffling the question order.
- **review_attempt**: `MEDIUMINT(7)`, Whether users can review their quiz attempts at various times.
- **review_correctness**: `MEDIUMINT(7)`, Whether users can review the correctness of their attempts.
- **review_general_feedback**: `MEDIUMINT(7)`, Whether users can review general feedback on their attempts.
- **review_marks**: `MEDIUMINT(7)`, Whether users can review marks for their attempts.
- **review_overall_feedback**: `MEDIUMINT(7)`, Whether users can review overall feedback on their attempts.
- **review_right_answer**: `MEDIUMINT(7)`, Whether users can review the correct answers to their attempts.
- **review_specific_feedback**: `MEDIUMINT(7)`, Whether users can review specific feedback on their attempts.
- **show_blocks**: `BOOLEAN(1)`, Whether blocks should be shown on the `attempt` and `review` pages.
- **show_user_picture**: `BOOLEAN(1)`, Option to show the user’s picture during the `attempt` and on the `review` page.
- **shuffle_answers**: `BOOLEAN(1)`, Whether the parts of the question should be shuffled.
- **sub_net**: `VARCHAR(255)`, Restriction on the IP addresses from which this quiz can be attempted.
- **sum_grades**: `DECIMAL(10)`, Total of all the question instance maxmarks.
- **time_close**: `BIGINT(19)`, Time when this quiz closes.
- **time_limit**: `BIGINT(19)`, Time limit for quiz attempts, in seconds.
- **time_open**: `BIGINT(19)`, Time when this quiz opens.
- **created_at**: `BIGINT(19)`, Time when the quiz was added to the course.
- **updated_at**: `BIGINT(19)`, Last modified time.

---

### Table: quiz_attempts

Stores users' attempts at quizzes.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt**: `MEDIUMINT(7)`, Sequentially numbers this student’s attempts at this quiz.
- **current_page**: `BIGINT(19)`, Current page number in the quiz attempt.
- **graded_notification_sent_time**: `BIGINT(19)`, Timestamp when the ‘graded’ notification was sent.
- **layout**: `LONGTEXT(2147483647)`, Layout of the quiz attempt.
- **preview**: `BOOLEAN(1)`, Indicates if the attempt is a preview.
- **quiz**: `BIGINT(19)`, Foreign key reference to the quiz that was attempted.
- **state**: `VARCHAR(16)`, Current state of the attempts: 'inprogress', 'overdue', 'finished', or 'abandoned'.
- **sum_grades**: `DECIMAL(10)`, Total marks for this attempt.
- **time_check_state**: `BIGINT(19)`, Next time quiz cron should check attempt for state changes.
- **time_finish**: `BIGINT(19)`, Time when the attempt was submitted.
- **time_modified_offline**: `BIGINT(19)`, Last modified time via web services.
- **time_start**: `BIGINT(19)`, Time when the attempt was started.
- **unique_id**: `BIGINT(19)`, Foreign key reference to the question_usage that holds the details of the question_attempts that make up this quiz attempt.
- **created_at**: `BIGINT(19)`, created time.
- **updated_at**: `BIGINT(19)`, Last modified time.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user whose attempt this is.

---

### Table: quiz_feedback

Feedback given to students based on their grade band.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **feedback_text**: `LONGTEXT(2147483647)`, Feedback text.
- **feedback_text_format**: `TINYINT(3)`, Format of the feedback text.
- **max_grade**: `DECIMAL(10)`, Upper limit of this grade band.
- **min_grade**: `DECIMAL(10)`, Lower limit of this grade band.
- **quiz_id**: `BIGINT(19)`, Foreign key reference to the quiz.

---

### Table: quiz_grades

Stores the overall grade for each user on the quiz.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **grade**: `DECIMAL(10)`, Overall grade from the quiz.
- **quiz_id**: `BIGINT(19)`, Foreign key reference to the quiz.
- **created_at**: `BIGINT(19)`, created time.
- **updated_at**: `BIGINT(19)`, Last modified time.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: quiz_overrides

Overrides to quiz settings on a per-user and per-group basis.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempts**: `MEDIUMINT(7)`, Maximum number of attempts.
- **group_id**: `BIGINT(19)`, Foreign key reference to the group.
- **password**: `VARCHAR(255)`, Quiz password.
- **quiz_id**: `BIGINT(19)`, Foreign key reference to the quiz.
- **time_close**: `BIGINT(19)`, Time by which students must complete their attempt.
- **time_limit**: `BIGINT(19)`, Time limit in seconds.
- **time_open**: `BIGINT(19)`, Time at which students may start attempting the quiz.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: quiz_overview_regrades

Records which question attempts need regrading.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **new_fraction**: `DECIMAL(12)`, New fraction for the question attempt after regrading.
- **old_fraction**: `DECIMAL(12)`, Previous fraction for the question attempt.
- **question_usage_id**: `BIGINT(19)`, Foreign key reference to question_usages.id.
- **regraded**: `BOOLEAN(1)`, Indicates regrading status.
- **slot**: `BIGINT(19)`, Foreign key reference to question_attempts.slot.
- **created_at**: `BIGINT(19)`, Timestamp of creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: quiz_reports

Lists all the installed quiz reports and their display order.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **capability**: `VARCHAR(255)`, Capability required to see this report.
- **display_order**: `BIGINT(19)`, Display order for report tabs.
- **name**: `VARCHAR(255)`, Name of the report.

---

### Table: quiz_sections

Stores sections of a quiz with section name (heading), from one page break to the next.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **first_slot**: `BIGINT(19)`, Number of the first slot in the section.
- **heading**: `VARCHAR(1333)`, Text of the section heading.
- **quiz_id**: `BIGINT(19)`, Foreign key reference to the quiz.
- **shuffle_questions**: `BOOLEAN(1)`, Whether the question order within this section should be shuffled.

---

### Table: quiz_slots

Stores the questions used in a quiz, with the order and for each slot.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **max_mark**: `DECIMAL(12)`, Marks this question contributes to quiz.sumgrades.
- **page**: `BIGINT(19)`, Page number where this question appears.
- **quiz_id**: `BIGINT(19)`, Foreign key reference to the quiz.
- **require_previous**: `BOOLEAN(1)`, Set to 1 if the current question requires the previous one to be answered first.
- **slot**: `BIGINT(19)`, Order of the question in the quiz.

---

### Table: quiz_statistics

Caches results from analysis done in statistics reports.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **all_attempts_avg**: `DECIMAL(15)`, Average of all attempts.
- **all_attempts_count**: `BIGINT(19)`, Count of all attempts.
- **cic**: `DECIMAL(15)`, Cumulative item characteristic.
- **error_ratio**: `DECIMAL(15)`, Error ratio.
- **first_attempts_avg**: `DECIMAL(15)`, Average of first attempts.
- **first_attempts_count**: `BIGINT(19)`, Count of first attempts.
- **hashcode**: `VARCHAR(40)`, SHA1 hash of the serialized `qubaids_condition` class.
- **highest_attempts_avg**: `DECIMAL(15)`, Average of highest attempts.
- **highest_attempts_count**: `BIGINT(19)`, Count of highest attempts.
- **kurtosis**: `DECIMAL(15)`, Kurtosis value.
- **last_attempts_avg**: `DECIMAL(15)`, Average of last attempts.
- **last_attempts_count**: `BIGINT(19)`, Count of last attempts.
- **median**: `DECIMAL(15)`, Median value.
- **skewness**: `DECIMAL(15)`, Skewness value.
- **standard_deviation**: `DECIMAL(15)`, Standard deviation.
- **standard_error**: `DECIMAL(15)`, Standard error.
- **which_attempts**: `BOOLEAN(1)`, Indicates whether stats are for all attempts or just the first.
- **created_at**: `BIGINT(19)`, Time of creation.
- **updated_at**: `BIGINT(19)`, Time of last modification.
