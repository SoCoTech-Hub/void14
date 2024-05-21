# Editor Atto Autosave

## Tables

This README provides an overview of the tables in the Editor Atto Autosave application, along with their fields and functions.

### Table: editor_atto_autosave

This table stores draft text that is auto-saved every 5 seconds while an editor is active.

#### Fields

- **contextid**: BIGINT(19) \* The contextid that the form was loaded with.
- **draftid**: BIGINT(19)
- **drafttext**: LONGTEXT(2147483647) \* The draft text.
- **elementid**: VARCHAR(255) \* The unique id for the text editor in the form.
- **id**: BIGINT(19)
- **pagehash**: VARCHAR(64) \* The HTML DOM id of the page that loaded the form.
- **pageinstance**: VARCHAR(64) \* The browser tab instance that last saved the draft text. This is to prevent multiple tabs from the same user saving different text alternately.
- **timemodified**: BIGINT(19) \* Store the last modified time for the auto-save text.
- **userid**: BIGINT(19) \* The id of the user that loaded the form.
