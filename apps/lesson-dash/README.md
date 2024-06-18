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

