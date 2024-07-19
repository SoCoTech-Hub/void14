# Block Management

## Tables

This README provides an overview of the tables in the Block Management application, along with their fields and functions.

### Table: block

This table contains all installed blocks.

#### Fields

- **cron**: BIGINT(19)
- **id**: BIGINT(19)
- **lastcron**: BIGINT(19)
- **name**: VARCHAR(40)
- **visible**: BIT(1) \* Default: 1.

### Table: block_instances

This table stores block instances. The type of block is referenced by block.name.

#### Fields

- **blockname**: VARCHAR(40) \* The type of block this is. Foreign key, references block.name.
- **configdata**: LONGTEXT(2147483647) \* A serialized blob of configuration data for this block instance.
- **defaultregion**: VARCHAR(16) \* Which block region this block should appear in on each page, in the absence of a specific position in the block_positions table.
- **defaultweight**: BIGINT(19) \* Used to order the blocks within a block region. Again, may be overridden by the block_positions table for a specific page where this block appears.
- **id**: BIGINT(19)
- **pagetypepattern**: VARCHAR(64) \* The types of page this block appears on. Either an exact page type like mod-quiz-view, or a pattern like mod-quiz-* or course-view-. Note that course-view- will match course-view.
- **parentcontextid**: BIGINT(19) \* The context within which this block appears. Foreign key, references context.id.
- **requiredbytheme**: SMALLINT(5) \* If 1, this block was created because it was required by the theme and did not exist.
- **showinsubcontexts**: SMALLINT(5) \* If 1, this block appears on all matching pages in subcontexts of parentcontextid, as well as in pages belonging to parentcontextid.
- **subpagepattern**: VARCHAR(16) \* Further restrictions on where this block appears. In some places, e.g. during a quiz or lesson attempt, different pages have different subpage ids. If this field is not null, the block only appears on that particular subpage.
- **created_at**: BIGINT(19) \* Time at which this block instance was originally created.
- **updated_at**: BIGINT(19) \* Time at which block instance was last modified.

### Table: block_positions

This table stores the position of a sticky block_instance on another page.

#### Fields

- **blockinstanceid**: BIGINT(19) \* The block_instance this position relates to.
- **contextid**: BIGINT(19) \* With pagetype and subpage, defines the page we are setting the position for.
- **id**: BIGINT(19)
- **pagetype**: VARCHAR(64) \* With contextid and subpage, defines the page we are setting the position for.
- **region**: VARCHAR(16) \* Which block region on this page this block should appear in.
- **subpage**: VARCHAR(16) \* With contextid and pagetype, defines the page we are setting the position for.
- **visible**: SMALLINT(5) \* Whether this block instance is visible on this page.
- **weight**: BIGINT(19) \* Used to order the blocks within a block region.

### Table: block_recent_activity

This table stores recent activity in the block.

#### Fields

- **action**: BIT(1) \* 0 created, 1 updated, 2 deleted.
- **cmid**: BIGINT(19) \* Course module id.
- **courseid**: BIGINT(19) \* Course id.
- **id**: BIGINT(19)
- **modname**: VARCHAR(20) \* Module type name (for delete action).
- **created_at**: BIGINT(19)
- **userid**: BIGINT(19) \* User performing the action.

### Table: block_recentlyaccesseditems

This table stores the most recently accessed items by a user.

#### Fields

- **cmid**: BIGINT(19) \* Item course module id.
- **courseid**: BIGINT(19) \* Course id the item belongs to.
- **id**: BIGINT(19)
- **timeaccess**: BIGINT(19) \* Time the user accessed the last time an item.
- **userid**: BIGINT(19) \* User id that accessed the item.

### Table: block_rss_client

This table stores remote news feed information.

#### Fields

- **description**: LONGTEXT(2147483647)
- **id**: BIGINT(19)
- **preferredtitle**: VARCHAR(64)
- **shared**: TINYINT(3) \* Default: 0.
- **skiptime**: BIGINT(19) \* How many seconds to skip this feed for (increases every time it fails, resets to 0 when it succeeds).
- **skipuntil**: BIGINT(19) \* Do not query this RSS feed again until this time.
- **title**: LONGTEXT(2147483647)
- **url**: VARCHAR(255)
- **userid**: BIGINT(19)
