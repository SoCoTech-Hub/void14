# Blog Management Dashboard

## Tables

This README provides an overview of the tables in the Blog Management application, along with their fields and functions.

### Table: blog_association

This table stores associations of blog entries with courses and module instances.

#### Fields

- **id**: BIGINT(19)
- **blogid**: BIGINT(19)
- **contextid**: BIGINT(19)

### Table: blog_external

This table stores external blog links used for RSS copying of blog entries to Moodle.

#### Fields

- **id**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **failedlastsync**: BIT(1) \* Whether or not the last sync failed for some reason.
- **filtertags**: VARCHAR(255) \* Comma-separated list of tags that will be used to filter which entries are copied over from the external blog. They refer to existing tags in the external blog.
- **name**: VARCHAR(255)
- **timefetched**: BIGINT(19)
- **url**: LONGTEXT(2147483647)
- **updated_at**: BIGINT(19)
- **userid**: BIGINT(19)
