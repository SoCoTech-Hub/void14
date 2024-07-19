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
