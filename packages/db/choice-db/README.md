# Choice Management

## Tables

This README provides an overview of the tables in the Choice Management application, along with their fields and functions.

### Table: choice

This table stores available choices.

#### Fields

- **allowmultiple**: TINYINT(3) \* Default: 0.
- **allowupdate**: TINYINT(3) \* Default: 0.
- **completionsubmit**: BIT(1) \* If this field is set to 1, then the activity will be automatically marked as ‘complete’ once the user submits their choice.
- **course**: BIGINT(19)
- **display**: SMALLINT(5) \* Default: 0.
- **id**: BIGINT(19)
- **includeinactive**: TINYINT(3) \* Default: 1.
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 0.
- **limitanswers**: TINYINT(3) \* Default: 0.
- **name**: VARCHAR(255)
- **publish**: TINYINT(3) \* Default: 0.
- **showavailable**: BIT(1) \* If this field is set to 1, then the number of available spaces on choice options will be shown, given limitanswers is set to 1.
- **showpreview**: TINYINT(3) \* Default: 0.
- **showresults**: TINYINT(3) \* Default: 0.
- **showunanswered**: TINYINT(3) \* Default: 0.
- **timeclose**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **timeopen**: BIGINT(19)

### Table: choice_answers

This table stores choices performed by users.

#### Fields

- **choiceid**: BIGINT(19)
- **id**: BIGINT(19)
- **optionid**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: choice_options

This table stores available options for choices.

#### Fields

- **choiceid**: BIGINT(19)
- **id**: BIGINT(19)
- **maxanswers**: BIGINT(19) \* Default: 0.
- **text**: LONGTEXT(2147483647)
- **timemodified**: BIGINT(19)
