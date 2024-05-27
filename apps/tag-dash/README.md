# Tag Dash

## Tables

List of Tables with their function described below:

### Table: tag_coll

Defines different sets of tags.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Defines the Moodle component associated with the tag collection.
- **custom_url**: `VARCHAR(255)`, Custom URL for the tag page instead of /tag/index.php.
- **is_default**: `BOOLEAN(1)`, Indicates if this tag collection is the default (default 0).
- **name**: `VARCHAR(255)`, Name of the tag collection.
- **searchable**: `BOOLEAN(1)`, Indicates if the tag collection is searchable (default 1).
- **sort_order**: `INT(3)`, Sort order of the tag collection.

---

### Table: tag

Tag table - this generic table will replace the old “tags” table.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the tag.
- **description_format**: `TINYINT(3)`, Format of the description.
- **flag**: `SMALLINT(5)`, Indicates if a tag is flagged as inappropriate (default 0).
- **is_standard**: `BOOLEAN(1)`, Indicates if this tag is standard (default 0).
- **name**: `VARCHAR(255)`, Name of the tag.
- **raw_name**: `VARCHAR(255)`, The raw, unnormalized name for the tag as entered by users.
- **tag_coll_id**: `BIGINT(19)`, Foreign key to the tag collection.
- **created_at**: `BIGINT(19)`, Timestamp of the creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, User ID who created the tag.

---

### Table: tag_area

Defines various tag areas, one area is identified by component, itemtype, and tagcollid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **callback**: `VARCHAR(100)`, Callback function for the tag area.
- **callback_file**: `VARCHAR(100)`, File containing the callback function.
- **component**: `VARCHAR(100)`, Defines the Moodle component associated with the tag area.
- **enabled**: `BOOLEAN(1)`, Indicates if the tag area is enabled (default 1).
- **item_type**: `VARCHAR(100)`, Type of the item tagged.
- **multiplecontexts**: `BOOLEAN(1)`, Indicates if the tag area allows tag instances to be created in multiple contexts (default 0).
- **show_standard**: `BOOLEAN(1)`, Indicates if the standard tags should be shown (default 0).
- **tag_coll_id**: `BIGINT(19)`, Foreign key to the tag collection.

---

### Table: tag_correlation

The rationale for the ‘tag_correlation’ table is performance improvements.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **correlated_tags**: `LONGTEXT(2147483647)`, List of correlated tags.
- **tag_id**: `BIGINT(19)`, Foreign key to the tag.

---

### Table: tag_instance

Holds the information of associations between tags and items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component**: `VARCHAR(100)`, Defines the Moodle component which the tag was added to.
- **context_id**: `BIGINT(19)`, The context ID of the item that was tagged.
- **item_id**: `BIGINT(19)`, ID of the item that was tagged.
- **item_type**: `VARCHAR(100)`, Type of the item that was tagged.
- **ordering**: `BIGINT(19)`, Maintains the order of the tag instances of an item.
- **tag_id**: `BIGINT(19)`, Foreign key to the tag.
- **created_at**: `BIGINT(19)`, Timestamp of when the tag instance was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, User ID who created the tag instance.
