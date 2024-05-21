# Glossary Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### Table: glossary

The `glossary` table contains the structure and settings of glossaries within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the glossary.
- **allowcomments**: `TINYINT(3)`, Indicates whether comments are allowed (`0` = No, `1` = Yes).
- **allowduplicatedentries**: `TINYINT(3)`, Indicates whether duplicate entries are allowed (`0` = No, `1` = Yes).
- **allowprintview**: `TINYINT(3)`, Indicates whether the print view is allowed (`0` = No, `1` = Yes).
- **approvaldisplayformat**: `VARCHAR(50)`, Display format when approving entries, default is 'default'.
- **assessed**: `BIGINT(19)`, Indicates whether the glossary is assessed.
- **assesstimefinish**: `BIGINT(19)`, The finish time for assessments.
- **assesstimestart**: `BIGINT(19)`, The start time for assessments.
- **completionentries**: `INT(10)`, Number of entries required for completion.
- **course**: `BIGINT(19)`, The ID of the course the glossary belongs to.
- **defaultapproval**: `TINYINT(3)`, Default approval status for new entries (`0` = No, `1` = Yes).
- **displayformat**: `VARCHAR(50)`, Display format of the glossary, default is 'dictionary'.
- **editalways**: `TINYINT(3)`, Indicates whether entries can always be edited (`0` = No, `1` = Yes).
- **entbypage**: `SMALLINT(5)`, Number of entries per page, default is `10`.
- **globalglossary**: `TINYINT(3)`, Indicates whether the glossary is global (`0` = No, `1` = Yes).
- **intro**: `LONGTEXT`, Introduction text for the glossary.
- **introformat**: `SMALLINT(5)`, Format of the introduction text.
- **mainglossary**: `TINYINT(3)`, Indicates whether it is the main glossary (`0` = No, `1` = Yes).
- **name**: `VARCHAR(255)`, Name of the glossary.
- **rssarticles**: `TINYINT(3)`, Number of RSS articles.
- **rsstype**: `TINYINT(3)`, Type of RSS feed.
- **scale**: `BIGINT(19)`, Scale used for grading.
- **showall**: `TINYINT(3)`, Indicates whether all entries are shown (`0` = No, `1` = Yes).
- **showalphabet**: `TINYINT(3)`, Indicates whether the alphabet is shown (`0` = No, `1` = Yes).
- **showspecial**: `TINYINT(3)`, Indicates whether special characters are shown (`0` = No, `1` = Yes).
- **usedynalink**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).
- **created_at**: `BIGINT(19)`, Time when the glossary was created.
- **updated_at**: `BIGINT(19)`, Time when the glossary was last modified.

---

### Table: glossary_alias

The `glossary_alias` table stores alias entries for glossary entries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the alias.
- **alias**: `VARCHAR(255)`, Alias name for the glossary entry.
- **entry_id**: `BIGINT(19)`, The ID of the glossary entry.

---

### Table: glossary_categories

The `glossary_categories` table stores categories for glossary entries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the category.
- **glossaryid**: `BIGINT(19)`, The ID of the glossary.
- **name**: `VARCHAR(255)`, Name of the category.
- **use_dyna_link**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).

---

### Table: glossary_entries

The `glossary_entries` table stores entries within glossaries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the glossary entry.
- **approved**: `TINYINT(3)`, Approval status of the entry (`0` = No, `1` = Yes).
- **attachment**: `VARCHAR(100)`, Attachment file name.
- **casesensitive**: `TINYINT(3)`, Indicates whether the entry is case sensitive (`0` = No, `1` = Yes).
- **concept**: `VARCHAR(255)`, Concept of the glossary entry.
- **definition**: `LONGTEXT`, Definition of the glossary entry.
- **definitionformat**: `TINYINT(3)`, Format of the definition.
- **definitiontrust**: `TINYINT(3)`, Indicates whether the definition is trusted (`0` = No, `1` = Yes).
- **fullmatch**: `TINYINT(3)`, Indicates whether full match is required (`0` = No, `1` = Yes).
- **glossaryid**: `BIGINT(19)`, The ID of the glossary the entry belongs to.
- **sourceglossaryid**: `BIGINT(19)`, The ID of the source glossary.
- **teacherentry**: `TINYINT(3)`, Indicates whether it is a teacher entry (`0` = No, `1` = Yes).
- **usedynalink**: `TINYINT(3)`, Indicates whether dynamic linking is used (`0` = No, `1` = Yes).
- **created_at**: `BIGINT(19)`, Time when the entry was created.
- **updated_at**: `BIGINT(19)`, Time when the entry was last modified.
- **userid**: `BIGINT(19)`, The ID of the user who created the entry.

---

### Table: glossary_entries_categories

The `glossary_entries_categories` table stores categories for each glossary entry.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **categoryid**: `BIGINT(19)`, The ID of the category.
- **entryid**: `BIGINT(19)`, The ID of the glossary entry.

---

### Table: glossary_formats

The `glossary_formats` table stores settings for the display formats of glossaries.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **defaulthook**: `VARCHAR(50)`, Default hook.
- **defaultmode**: `VARCHAR(50)`, Default mode.
- **name**: `VARCHAR(50)`, Name of the format.
- **popupformatname**: `VARCHAR(50)`, Name of the popup format.
- **showgroup**: `TINYINT(3)`, Indicates whether the group is shown (`0` = No, `1` = Yes).
- **showtabs**: `VARCHAR(100)`, Indicates whether tabs are shown (`0` = No, `1` = Yes).
- **sortkey**: `VARCHAR(50)`, Key used for sorting.
- **sortorder**: `VARCHAR(50)`, Order used for sorting.
- **visible**: `TINYINT(3)`, Indicates whether the format is visible (`0` = No, `1` = Yes).
