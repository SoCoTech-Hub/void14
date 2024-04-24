# Block - Dash

I have no idea what this does

## Tables

List of Tables with their function described below:

### block

contains all installed blocks

#### Fields

- id
- cron_id
- last_cron
- name
- visible

### block_instances

This table stores block instances. The type of block this is

#### Fields

- id
- block_name \* The type of block this is. Foreign key, references block.name.
- config_data \* A serialized blob of configuration data for this block instance.
- default_region \* Which block region this block should appear in on each page, in the absence of a specific position in the block_positions table.
- default_weight \* Used to order the blocks within a block region. Again, may be overridden by the block_positions table for a specific page where this block appears.
- page_type_pattern \* The types of page this block appears on. Either an exact page type like mod-quiz-view, or a pattern like mod-quiz-\* or course-view-. Note that course-view- will match course-view.
- parent_context_id \* The context within which this block appears. Foreign key, references context.id.
- required_by_theme \* If 1, this block was created because it was required by the theme and did not exist.
- show_in_sub_contexts \* If 1, this block appears on all matching pages in subcontexts of parentcontextid, as well in pages belonging to parentcontextid.
- sub_page_pattern \* Further restrictions on where this block appears. In some places, e.g. during a quiz or lesson attempt, different pages have different subpage ids. If this field is not null, the block only appears on that particular subpage.
- created_at \* Time at which this block instance was originally created
- updated_at \* Time at which block instance was last modified.

### block_positions

Stores the position of a sticky block_instance on a another

#### Fields

- id
- block_instance_id \* The block_instance this position relates to.
- context_id \* With pagetype and subpage, defines the page we are setting the position for.
- page_type \* With contextid and subpage, defines the page we are setting the position for.
- region \* Which block region on this page this block should appear in.
- sub_page \* With contextid and pagetype, defines the page we are setting the position for.
- visible \* Whether this block instance is visible on this page.
- weight \* Used to order the blocks within a block region.

### block_recent_activities

Recent activity block

#### Fields

- id
- action \* 0 created, 1 updated, 2 deleted
- cm_id \* Course module id
- course_id \* Course id
- mod_name \* module type name (for delete action)
- created_at
- updated_at
- user_id \* User performing the action

### block_recently_accessed_items

Most recently accessed items accessed by a user

#### Fields

- id
- cm_id \* Item course module id
- course_id \* Course id the item belongs to
- created_at \* Time the user accessed the first time an item
- updated_at \* Time the user accessed the last time an item
- user_id \* User id that accessed the item

### block_rss_clients

Remote news feed information. Contains the news feed id, the

#### Fields

- id
- description
- preferred_title
- shared
- skip_time \* How many seconds skip this feed for (increases every time it fails, resets to 0 when it succeeds)
- skip_until \* Do not query this RSS feed again until this time
- title
- url
- user_id
