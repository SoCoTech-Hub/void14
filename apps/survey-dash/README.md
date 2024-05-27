# Survey Dash

## Tables

List of Tables with their function described below:

### Table: survey

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
