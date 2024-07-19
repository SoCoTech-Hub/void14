# Wiki Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### Table: wikis

Stores Wiki activity configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki activity.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course this wiki activity belongs to.
- **name**: `VARCHAR(255)`, Name of the wiki activity.
- **intro**: `LONGTEXT(2147483647)`, Introduction to the wiki activity.
- **intro_format**: `SMALLINT(5)`, Format of the introduction field (e.g., MOODLE, HTML, MARKDOWN).
- **default_format**: `VARCHAR(20)`, Default editor format for the wiki (e.g., creole).
- **force_format**: `BIT(1)`, Whether the default editor format is forced.
- **first_page_title**: `VARCHAR(255)`, Title of the first page of the wiki.
- **wiki_mode**: `VARCHAR(20)`, Mode of the wiki (e.g., individual, collaborative).
- **edit_begin**: `BIGINT(19)`, Start time for editing.
- **edit_end**: `BIGINT(19)`, End time for editing.
- **created_at**: `BIGINT(19)`, Timestamp when the wiki activity was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the wiki activity was last modified.

---

### Table: wiki_links

Stores links between wiki pages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki link.
- **from_page_id**: `BIGINT(19)`, ID of the page that contains the link.
- **to_page_id**: `BIGINT(19)`, ID of the page that receives the link.
- **to_missing_page**: `VARCHAR(255)`, Link to a nonexistent page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance.

---

### Table: wiki_locks

Manages page locks to prevent simultaneous editing.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the lock.
- **page_id**: `BIGINT(19)`, ID of the locked page.
- **locked_at**: `BIGINT(19)`, Timestamp when the page was locked.
- **section_name**: `VARCHAR(255)`, Section of the page that is locked.
- **user_id**: `BIGINT(19)`, ID of the user who locked the page.

---

### Table: wiki_pages

Stores wiki pages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the wiki page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance to which this page belongs.
- **title**: `VARCHAR(255)`, Title of the page.
- **cached_content**: `LONGTEXT(2147483647)`, Cached content of the page.
- **time_rendered**: `BIGINT(19)`, Timestamp when the page was last rendered.
- **page_views**: `BIGINT(19)`, Number of times the page has been viewed.
- **read_only**: `BIT(1)`, Whether the page is read-only.
- **created_at**: `BIGINT(19)`, Timestamp when the page was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the page was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created or modified the page.

---

### Table: wiki_subwikis

Stores subwiki instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the subwiki instance.
- **wiki_id**: `BIGINT(19)`, ID of the wiki activity.
- **group_id**: `BIGINT(19)`, ID of the group that owns this subwiki.
- **user_id**: `BIGINT(19)`, ID of the user who owns this subwiki.

---

### Table: wiki_synonyms

Stores wiki page synonyms.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the synonym.
- **page_id**: `BIGINT(19)`, ID of the original page.
- **page_synonym**: `VARCHAR(255)`, Synonym for the page.
- **sub_wiki_id**: `BIGINT(19)`, ID of the subwiki instance.

---

### Table: wiki_versions

Stores wiki page history.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the version.
- **page_id**: `BIGINT(19)`, ID of the page.
- **content**: `LONGTEXT(2147483647)`, Content of the page.
- **content_format**: `VARCHAR(20)`, Markup used to write the content (e.g., creole).
- **version**: `MEDIUMINT(7)`, Version number of the page.
- **created_at**: `BIGINT(19)`, Timestamp when the version was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the version was updated.
- **user_id**: `BIGINT(19)`, ID of the user who edited the page.
