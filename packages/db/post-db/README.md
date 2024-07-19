### Table: posts

Generic post table to hold data for blog entries, etc., in different contexts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the post.
- **attachment**: `VARCHAR(100)`, Attachment associated with the post.
- **content**: `TEXT`, The main content of the post.
- **course_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the course related to the post.
- **course_module_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the course module related to the post.
- **format**: `BIGINT` NOT NULL DEFAULT 0, Format of the content.
- **groupid**: `BIGINT` NOT NULL DEFAULT 0, ID of the group related to the post.
- **module**: `VARCHAR(20)` NOT NULL, Name of the module associated with the post.
- **module_id**: `BIGINT` NOT NULL DEFAULT 0, ID of the module related to the post.
- **publish_state**: `VARCHAR(20)` NOT NULL DEFAULT 'draft', State of the post publication.
- **rating**: `BIGINT` NOT NULL DEFAULT 0, Rating associated with the post.
- **subject**: `VARCHAR(128)` NOT NULL, Subject or title of the post.
- **summary**: `TEXT`, Summary of the post.
- **summary_format**: `SMALLINT` NOT NULL DEFAULT 0, Format of the summary.
- **unique_hash**: `VARCHAR(255)` NOT NULL, Unique hash for the post.
- **user_modified**: `BIGINT`, ID of the user who last modified the post.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the post was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the post was last modified.
- **userid**: `BIGINT` NOT NULL DEFAULT 0, ID of the user who created the post.

#### Indexes

- `CREATE INDEX idx_course_id ON post(course_id);`
- `CREATE INDEX idx_course_module_id ON post(course_module_id);`
- `CREATE INDEX idx_module ON post(module);`
- `CREATE INDEX idx_publish_state ON post(publish_state);`
- `CREATE INDEX idx_userid ON post(userid);`
- `CREATE INDEX idx_user_modified ON post(user_modified);`
