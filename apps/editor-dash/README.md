# Editor Atto Autosave

## Tables

This README provides an overview of the tables in the Editor Atto Autosave application, along with their fields and functions.

### Table: editor_atto_autosave

This table stores draft text that is auto-saved every 5 seconds while an editor is active.

#### Fields

- **id**: BIGINT(19)
- **context_id**: BIGINT(19) \* The contextid that the form was loaded with.
- **draft_id**: BIGINT(19)
- **draft_text**: LONGTEXT(2147483647) \* The draft text.
- **element_id**: VARCHAR(255) \* The unique id for the text editor in the form.
- **page_hash**: VARCHAR(64) \* The HTML DOM id of the page that loaded the form.
- **page_instance**: VARCHAR(64) \* The browser tab instance that last saved the draft text. This is to prevent multiple tabs from the same user saving different text alternately.
- **time_modified**: BIGINT(19) \* Store the last modified time for the auto-save text.
- **user_id**: BIGINT(19) \* The id of the user that loaded the form.
