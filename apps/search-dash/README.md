### Table: search_index_requests

Records requests for (re)indexing of specific contexts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID that has been requested for reindexing.
- **index_priority**: `BIGINT(19)`, Priority value so that important requests can be dealt with first; higher numbers are processed first.
- **partial_area**: `VARCHAR(255)`, If processing of this context partially completed, set to the area that needs processing next. Blank indicates not processed yet.
- **partial_time**: `BIGINT(19)`, If processing partially completed, set to the timestamp within the next area where processing should start. 0 indicates not processed yet.
- **search_area**: `VARCHAR(255)`, Set (e.g. ‘forum-post’) if a specific area is to be reindexed. Blank indicates all areas.
- **created_at**: `BIGINT(19)`, Time at which this index update was requested.
- **updated_at**: `BIGINT(19)`, Time at which this index update was updated.

---

### Table: search_simpledb_index

Table containing the index data.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area_id**: `VARCHAR(255)`, Area ID.
- **content**: `LONGTEXT(2147483647)`, Content of the indexed item.
- **context_id**: `BIGINT(19)`, Context ID of the indexed item.
- **course_id**: `BIGINT(19)`, Course ID of the indexed item.
- **description_1**: `LONGTEXT(2147483647)`, First description field.
- **description_2**: `LONGTEXT(2147483647)`, Second description field.
- **doc_id**: `VARCHAR(255)`, Document ID of the indexed item.
- **item_id**: `BIGINT(19)`, Item ID of the indexed item.
- **owner_user_id**: `BIGINT(19)`, User ID of the owner of the indexed item.
- **title**: `LONGTEXT(2147483647)`, Title of the indexed item.
- **type**: `BOOLEAN(1)`, Type of the indexed item.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, User ID associated with the indexed item.
