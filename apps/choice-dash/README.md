# choice Dash

## Tables

List of Tables with their function described below:

### choices

This table saves information about the available choices that are saved

#### Fields

- id
- allow_multiple
- allow_update
- completion_submit
- course
- display
- include_inactive
- intro
- intro_format
- limit_answers
- name
- publish
- show_available
- show_preview
- show_results
- show_unanswered
- time_close
- created_at
- updated_at

### choice_options

This table saves information about the available options to choice

#### Fields

- id
- max_answers
- text
- choice_id
- created_at
- updated_at


### choice_answers

This table saves information about choices performed by the users

#### Fields

- id
- choice_id
- option_id
- created_at
- updated_at
- user_id
