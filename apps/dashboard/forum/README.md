### Table: forums **

The `forum` table contains the structure and settings of forums within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the forum.
- **assessed**: `BIGINT(19)`, Indicates whether the forum is assessed.
- **assess_time_finish**: `BIGINT(19)`, The finish time for assessments.
- **assess_time_start**: `BIGINT(19)`, The start time for assessments.
- **block_after**: `BIGINT(19)`, Number of posts a user is allowed to post in a given time period before being blocked.
- **block_period**: `BIGINT(19)`, Time period in which the blocking settings apply.
- **completion_discussions**: `INT(10)`, Number of discussions required for completion.
- **completion_posts**: `INT(10)`, Number of posts or replies required for completion.
- **completion_replies**: `INT(10)`, Number of replies required for completion.
- **course**: `BIGINT(19)`, The ID of the course the forum belongs to.
- **cut_off_date**: `BIGINT(19)`, Final date after which posts are not accepted.
- **display_word_count**: `BIT(1)`, Indicates whether to display word count.
- **due_date**: `BIGINT(19)`, Due date for posts (not used for grading).
- **force_subscribe**: `BIT(1)`, Indicates whether users are forced to subscribe.
- **grade_forum**: `BIGINT(19)`, Grade for the forum.
- **grade_forum_notify**: `SMALLINT(5)`, Notification for forum grading.
- **intro**: `LONGTEXT`, Introduction text for the forum.
- **intro_format**: `SMALLINT(5)`, Format of the introduction text.
- **lock_discussion_after**: `BIGINT(19)`, Time period after which discussions are locked.
- **max_attachments**: `BIGINT(19)`, Number of attachments allowed per post.
- **max_bytes**: `BIGINT(19)`, Maximum file size for attachments.
- **name**: `VARCHAR(255)`, Name of the forum.
- **rss_articles**: `TINYINT(3)`, Number of RSS articles.
- **rss_type**: `TINYINT(3)`, Type of RSS feed.
- **scale**: `BIGINT(19)`, Scale used for grading.
- **tracking_type**: `TINYINT(3)`, Type of tracking used.
- **type**: `VARCHAR(20)`, Type of forum (e.g., general).
- **warn_after**: `BIGINT(19)`, Number of posts after which users are warned.
- **time_modified**: `BIGINT(19)`, Time when the forum was last modified.

---

### Table: forum_digests **

The `forum_digests` table keeps track of user mail delivery preferences for each forum.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **mail_digest**: `BIT(1)`, Mail digest preference: `-1` for default, `0` for no digest, `1` for digest.
- **user_id**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussion_subs **

The `forum_discussion_subs` table allows users to subscribe and unsubscribe from specific discussions within a forum.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **discussion**: `BIGINT(19)`, The ID of the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **preference**: `BIGINT(19)`, Subscription preference.
- **user_id**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussions **

The `forum_discussions` table stores discussions within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the discussion.
- **assessed**: `BIT(1)`, Indicates whether the discussion is assessed.
- **course**: `BIGINT(19)`, The ID of the course the discussion belongs to.
- **first_post**: `BIGINT(19)`, The ID of the first post in the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum the discussion belongs to.
- **group_id**: `BIGINT(19)`, The ID of the group the discussion belongs to.
- **name**: `VARCHAR(255)`, Name of the discussion.
- **pinned**: `BIT(1)`, Indicates whether the discussion is pinned.
- **time_end**: `BIGINT(19)`, End time for the discussion.
- **time_locked**: `BIGINT(19)`, Locked time for the discussion.
- **time_modified**: `BIGINT(19)`, Time when the discussion was last modified.
- **time_start**: `BIGINT(19)`, Start time for the discussion.
- **user_id**: `BIGINT(19)`, The ID of the user who started the discussion.
- **user_modified**: `BIGINT(19)`, The ID of the user who last modified the discussion.

---

### Table: forum_grades **

The `forum_grades` table stores grading data for forum instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **grade**: `DECIMAL(10)`, The numerical grade for the user's forum assessment.
- **item_number**: `BIGINT(19)`, The grade item number.
- **time_created**: `BIGINT(19)`, Time when the grade was created.
- **time_modified**: `BIGINT(19)`, Time when the grade was last modified.
- **user_id**: `BIGINT(19)`, The ID of the user who was graded.

---

### Table: forum_posts **

The `forum_posts` table stores all posts within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the post.
- **attachment**: `VARCHAR(100)`, Attachment file name.
- **char_count**: `BIGINT(19)`, Character count of the post.
- **deleted**: `BIT(1)`, Indicates whether the post is deleted.
- **discussion**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **mailed**: `TINYINT(3)`, Indicates whether the post was mailed.
- **mail_now**: `BIGINT(19)`, Indicates whether the post should be mailed immediately.
- **message**: `LONGTEXT`, The message content of the post.
- **message_format**: `TINYINT(3)`, The format of the message.
- **message_trust**: `TINYINT(3)`, Indicates whether the message is trusted.
- **parent**: `BIGINT(19)`, The ID of the parent post.
- **private_reply_to**: `BIGINT(19)`, The ID of the user to whom the reply is private.
- **subject**: `VARCHAR(255)`, The subject of the post.
- **total_score**: `SMALLINT(5)`, The total score of the post.
- **word_count**: `BIGINT(19)`, Word count of the post.
- **created**: `BIGINT(19)`, Time when the post was created.
- **modified**: `BIGINT(19)`, Time when the post was last modified.
- **user_id**: `BIGINT(19)`, The ID of the user who created the post.

---

### Table: forum_queues **

The `forum_queue` table keeps track of posts that will be mailed in digest form.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the queue item.
- **discussion_id**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **post_id**: `BIGINT(19)`, The ID of the post to be mailed.
- **time_modified**: `BIGINT(19)`, The modified time of the original post.
- **user_id**

: `BIGINT(19)`, The ID of the user who will receive the mail.

---

### Table: forum_reads **

The `forum_read` table tracks each user's read posts within forums.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read item.
- **discussion_id**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **first_read**: `BIGINT(19)`, The first time the post was read.
- **forum_id**: `BIGINT(19)`, The ID of the forum.
- **last_read**: `BIGINT(19)`, The last time the post was read.
- **post_id**: `BIGINT(19)`, The ID of the post.
- **user_id**: `BIGINT(19)`, The ID of the user who read the post.

---

### Table: forum_subscriptions **

The `forum_subscriptions` table keeps track of who is subscribed to which forums.

#### Fields

- **forum**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the subscription.
- **user_id**: `BIGINT(19)`, The ID of the user who is subscribed.

---

### Table: forum_track_prefs **

The `forum_track_prefs` table tracks each user's untracked forums.

#### Fields

- **forum_id**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tracking preference.
- **user_id**: `BIGINT(19)`, The ID of the user who has the tracking preference.
