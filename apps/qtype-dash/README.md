### Table: qtype_ddimageortext

Defines drag and drop (text or images onto a background image) question type.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partially_correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_num_correct**: `BOOLEAN(1)`, Indicates whether the number of correct answers should be shown.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates whether the answers should be shuffled.

---

### Table: qtype_ddimageortext_drags

Images to drag. Actual file names are not stored here; we use a file storage system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **drag_group**: `BIGINT(19)`, Group ID for the drag items.
- **infinite**: `BOOLEAN(1)`, Indicates if the drag item is infinite.
- **label**: `LONGTEXT(2147483647)` (Nullable), Alt text label for the drag-able image.
- **no**: `BIGINT(19)`, Drag number.
- **question_id**: `BIGINT(19)`, ID of the related question.

---

### Table: qtype_ddimageortext_drops

Drop boxes for drag and drop question type.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **choice**: `BIGINT(19)`, Choice number for the drop box.
- **label**: `LONGTEXT(2147483647)` (Nullable), Alt label for the drop box.
- **no**: `BIGINT(19)`, Drop number.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **x_left**: `BIGINT(19)`, X-coordinate of the drop box.
- **y_top**: `BIGINT(19)`, Y-coordinate of the drop box.

---

### Table: qtype_ddmarker

Defines drag and drop markers (text or images onto a background image) question type.

#### Fields

- **correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **incorrect_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partially_correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **show_misplaced**: `BOOLEAN(1)`, Indicates if misplaced markers should be shown.
- **show_num_correct**: `BOOLEAN(1)`, Indicates whether the number of correct answers should be shown.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates whether the answers should be shuffled.

---

### Table: qtype_ddmarker_drags

Labels for markers to drag.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **infinite**: `BOOLEAN(1)`, Indicates if the drag item is infinite.
- **label**: `LONGTEXT(2147483647)` (Nullable), Alt text label for the drag-able image.
- **no**: `BIGINT(19)`, Drag number.
- **no_of_drags**: `BIGINT(19)`, Number of drag items, ignored if drag is infinite.
- **question_id**: `BIGINT(19)`, ID of the related question.

---

### Table: qtype_ddmarker_drops

Drop regions for drag and drop markers question type.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **choice**: `BIGINT(19)`, Choice number for the drop region.
- **coords**: `LONGTEXT(2147483647)` (Nullable), Coordinates of the drop region.
- **no**: `BIGINT(19)`, Drop number.
- **question_id**: `BIGINT(19)`, ID of the related question.
- **shape**: `VARCHAR(255)` (Nullable), Shape of the drop region (circle, rectangle, polygon).

---

### Table: qtype_essay_options

Extra options for essay questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attachments**: `BOOLEAN(1)`, Whether, and how many, attachments a student is allowed to include with their response. -1 means unlimited.
- **attachments_required**: `BOOLEAN(1)`, The number of attachments that should be required.
- **file_types_list**: `LONGTEXT(2147483647)` (Nullable), What attachment file types a student is allowed to include with their response. \* or empty means unlimited.
- **grader_info**: `LONGTEXT(2147483647)` (Nullable), Information shown to people with permission to manually grade the question, when they are grading.
- **grader_info_format**: `BOOLEAN(1)`, The text format for grader info.
- **max_bytes**: `BIGINT(19)`, Maximum size of attached files in bytes.
- **max_word_limit**: `BIGINT(19)` (Nullable), Maximum number of words.
- **min_word_limit**: `BIGINT(19)` (Nullable), Minimum number of words.
- **question_id**: `BIGINT(19)`, Foreign key linking to the question table.
- **response_field_lines**: `BOOLEAN(1)`, Approximate height, in lines, of the input box the students should be given for their response.
- **response_format**: `VARCHAR(16)`, The type of input area students should be given for their response.
- **response_required**: `BOOLEAN(1)`, Non-zero if an online text response is required.
- **response_template**: `LONGTEXT(2147483647)` (Nullable), The template to pre-populate the student’s response field during the attempt.
- **response_template_format**: `BOOLEAN(1)`, The text format for the response template.

---

### Table: qtype_match_options

Defines the question-type specific options for matching questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any incorrect response.
- **incorrectfeedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partially_correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, Foreign key link to question.id.
- **show_num_correct**: `BOOLEAN(1)`, If true, when the user gets the question partially correct, tell them how many choices they got correct alongside the feedback.
- **shuffle_answers**: `BOOLEAN(1)`, Indicates whether the answers should be shuffled.

---

### Table: qtype_match_subquestions

The subquestions that make up a matching question.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer_text**: `VARCHAR(255)`, The text of the answer.
- **question_id**: `BIGINT(19)`, Foreign key link to question.id.
- **question_text**: `LONGTEXT(2147483647)` (Nullable), The text of the question.
- **question_text_format**: `TINYINT(3)`, Format of the question text.

---

### Table: qtype_multichoice_options

Options for multiple-choice questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **answer_numbering**: `VARCHAR(10)`, Indicates how and whether the choices should be numbered. Default is 'abc'.
- **correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partially_correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, Foreign key references question.id.
- **show_num_correct**: `BOOLEAN(1)`, If true, when the user gets a multiple-response question partially correct, tell them how many choices they got correct alongside the feedback.
- **show_standard_instruction**: `BOOLEAN(1)`, Whether standard instruction (‘Select one:’ or ‘Select one or more:’) is displayed.
- **shuffle_answers**: `BOOLEAN(1)`, Whether the choices can be randomly shuffled.
- **single**: `BOOLEAN(1)`, If 0, it is multiple response (checkboxes). Otherwise, it is radio buttons.

---

### Table: qtype_randomsamatch_options

Information about a random short-answer matching question.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **choose**: `BIGINT(19)`, Number of subquestions to randomly generate.
- **correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any correct response.
- **correct_feedback_format**: `TINYINT(3)`, Format of the correct feedback.
- **incorrect_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any incorrect response.
- **incorrect_feedback_format**: `TINYINT(3)`, Format of the incorrect feedback.
- **partially_correct_feedback**: `LONGTEXT(2147483647)` (Nullable), Feedback shown for any partially correct response.
- **partially_correct_feedback_format**: `TINYINT(3)`, Format of the partially correct feedback.
- **question_id**: `BIGINT(19)`, Foreign key references question.id.
- **show_num_correct**: `BOOLEAN(1)`, If true, when the user gets the question partially correct, tell them how many choices they got correct alongside the feedback.
- **sub_cats**: `BOOLEAN(1)`, Whether to include or not the subcategories.

### Table: qtype_shortanswer_options

Options for short answer questions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **question_id**: `BIGINT(19)`, Foreign key references question.id.
- **use_case**: `BOOLEAN(1)`, Whether answers are matched case-sensitively.
