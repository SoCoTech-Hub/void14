### Table: post

Generic post table to hold data for blog entries, etc., in different contexts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the post.
- **attachment**: `VARCHAR(100)` (Nullable), Attachment associated with the post.
- **content**: `LONGTEXT(2147483647)` (Nullable), The main content of the post.
- **course_id**: `BIGINT(19)` , ID of the course related to the post. Default is 0.
- **course_module_id**: `BIGINT(19)` , ID of the course module related to the post. Default is 0.
- **format**: `BIGINT(19)` , Format of the content. Default is 0.
- **groupid**: `BIGINT(19)` , ID of the group related to the post. Default is 0.
- **module**: `VARCHAR(20)` , Name of the module associated with the post.
- **module_id**: `BIGINT(19)` , ID of the module related to the post. Default is 0.
- **publish_state**: `VARCHAR(20)` , State of the post publication (e.g., draft). Default is 'draft'.
- **rating**: `BIGINT(19)` , Rating associated with the post. Default is 0.
- **subject**: `VARCHAR(128)` , Subject or title of the post.
- **summary**: `LONGTEXT(2147483647)` (Nullable), Summary of the post.
- **summary_format**: `TINYINT(3)` , Format of the summary. Default is 0.
- **unique_hash**: `VARCHAR(255)` , Unique hash for the post.
- **user_modified**: `BIGINT(19)` (Nullable), ID of the user who last modified the post.
- **created_at**: `BIGINT(19)` , Timestamp of when the post was created. Default is 0.
- **updated_at**: `BIGINT(19)` , Timestamp of when the post was last modified. Default is 0.
- **userid**: `BIGINT(19)` , ID of the user who created the post. Default is 0.
