### Table: forum

The `forum` table contains the structure and settings of forums within Moodle.

#### Fields

- **assessed**: `BIGINT(19)`, Indicates whether the forum is assessed.
- **assesstimefinish**: `BIGINT(19)`, The finish time for assessments.
- **assesstimestart**: `BIGINT(19)`, The start time for assessments.
- **blockafter**: `BIGINT(19)`, Number of posts a user is allowed to post in a given time period before being blocked.
- **blockperiod**: `BIGINT(19)`, Time period in which the blocking settings apply.
- **completiondiscussions**: `INT(10)`, Number of discussions required for completion.
- **completionposts**: `INT(10)`, Number of posts or replies required for completion.
- **completionreplies**: `INT(10)`, Number of replies required for completion.
- **course**: `BIGINT(19)`, The ID of the course the forum belongs to.
- **cutoffdate**: `BIGINT(19)`, Final date after which posts are not accepted.
- **displaywordcount**: `BIT(1)`, Indicates whether to display word count.
- **duedate**: `BIGINT(19)`, Due date for posts (not used for grading).
- **forcesubscribe**: `BIT(1)`, Indicates whether users are forced to subscribe.
- **grade_forum**: `BIGINT(19)`, Grade for the forum.
- **grade_forum_notify**: `SMALLINT(5)`, Notification for forum grading.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the forum.
- **intro**: `LONGTEXT`, Introduction text for the forum.
- **introformat**: `SMALLINT(5)`, Format of the introduction text.
- **lockdiscussionafter**: `BIGINT(19)`, Time period after which discussions are locked.
- **maxattachments**: `BIGINT(19)`, Number of attachments allowed per post.
- **maxbytes**: `BIGINT(19)`, Maximum file size for attachments.
- **name**: `VARCHAR(255)`, Name of the forum.
- **rssarticles**: `TINYINT(3)`, Number of RSS articles.
- **rsstype**: `TINYINT(3)`, Type of RSS feed.
- **scale**: `BIGINT(19)`, Scale used for grading.
- **timemodified**: `BIGINT(19)`, Time when the forum was last modified.
- **trackingtype**: `TINYINT(3)`, Type of tracking used.
- **type**: `VARCHAR(20)`, Type of forum (e.g., general).
- **warnafter**: `BIGINT(19)`, Number of posts after which users are warned.

---

### Table: forum_digests

The `forum_digests` table keeps track of user mail delivery preferences for each forum.

#### Fields

- **forum**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **maildigest**: `BIT(1)`, Mail digest preference: `-1` for default, `0` for no digest, `1` for digest.
- **userid**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussion_subs

The `forum_discussion_subs` table allows users to subscribe and unsubscribe from specific discussions within a forum.

#### Fields

- **discussion**: `BIGINT(19)`, The ID of the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **preference**: `BIGINT(19)`, Subscription preference.
- **userid**: `BIGINT(19)`, The ID of the user.

---

### Table: forum_discussions

The `forum_discussions` table stores discussions within forums.

#### Fields

- **assessed**: `BIT(1)`, Indicates whether the discussion is assessed.
- **course**: `BIGINT(19)`, The ID of the course the discussion belongs to.
- **firstpost**: `BIGINT(19)`, The ID of the first post in the discussion.
- **forum**: `BIGINT(19)`, The ID of the forum the discussion belongs to.
- **groupid**: `BIGINT(19)`, The ID of the group the discussion belongs to.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the discussion.
- **name**: `VARCHAR(255)`, Name of the discussion.
- **pinned**: `BIT(1)`, Indicates whether the discussion is pinned.
- **timeend**: `BIGINT(19)`, End time for the discussion.
- **timelocked**: `BIGINT(19)`, Locked time for the discussion.
- **timemodified**: `BIGINT(19)`, Time when the discussion was last modified.
- **timestart**: `BIGINT(19)`, Start time for the discussion.
- **userid**: `BIGINT(19)`, The ID of the user who started the discussion.
- **usermodified**: `BIGINT(19)`, The ID of the user who last modified the discussion.

---

### Table: forum_grades

The `forum_grades` table stores grading data for forum instances.

#### Fields

- **forum**: `BIGINT(19)`, The ID of the forum.
- **grade**: `DECIMAL(10)`, The numerical grade for the user's forum assessment.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **itemnumber**: `BIGINT(19)`, The grade item number.
- **timecreated**: `BIGINT(19)`, Time when the grade was created.
- **timemodified**: `BIGINT(19)`, Time when the grade was last modified.
- **userid**: `BIGINT(19)`, The ID of the user who was graded.

---

### Table: forum_posts

The `forum_posts` table stores all posts within forums.

#### Fields

- **attachment**: `VARCHAR(100)`, Attachment file name.
- **charcount**: `BIGINT(19)`, Character count of the post.
- **created**: `BIGINT(19)`, Time when the post was created.
- **deleted**: `BIT(1)`, Indicates whether the post is deleted.
- **discussion**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the post.
- **mailed**: `TINYINT(3)`, Indicates whether the post was mailed.
- **mailnow**: `BIGINT(19)`, Indicates whether the post should be mailed immediately.
- **message**: `LONGTEXT`, The message content of the post.
- **messageformat**: `TINYINT(3)`, The format of the message.
- **messagetrust**: `TINYINT(3)`, Indicates whether the message is trusted.
- **modified**: `BIGINT(19)`, Time when the post was last modified.
- **parent**: `BIGINT(19)`, The ID of the parent post.
- **privatereplyto**: `BIGINT(19)`, The ID of the user to whom the reply is private.
- **subject**: `VARCHAR(255)`, The subject of the post.
- **totalscore**: `SMALLINT(5)`, The total score of the post.
- **userid**: `BIGINT(19)`, The ID of the user who created the post.
- **wordcount**: `BIGINT(19)`, Word count of the post.

---

### Table: forum_queue

The `forum_queue` table keeps track of posts that will be mailed in digest form.

#### Fields

- **discussionid**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the queue item.
- **postid**: `BIGINT(19)`, The ID of the post to be mailed.
- **timemodified**: `BIGINT(19)`, The modified time of the original post.
- **userid**

: `BIGINT(19)`, The ID of the user who will receive the mail.

---

### Table: forum_read

The `forum_read` table tracks each user's read posts within forums.

#### Fields

- **discussionid**: `BIGINT(19)`, The ID of the discussion the post belongs to.
- **firstread**: `BIGINT(19)`, The first time the post was read.
- **forumid**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read item.
- **lastread**: `BIGINT(19)`, The last time the post was read.
- **postid**: `BIGINT(19)`, The ID of the post.
- **userid**: `BIGINT(19)`, The ID of the user who read the post.

---

### Table: forum_subscriptions

The `forum_subscriptions` table keeps track of who is subscribed to which forums.

#### Fields

- **forum**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the subscription.
- **userid**: `BIGINT(19)`, The ID of the user who is subscribed.

---

### Table: forum_track_prefs

The `forum_track_prefs` table tracks each user's untracked forums.

#### Fields

- **forumid**: `BIGINT(19)`, The ID of the forum.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the tracking preference.
- **userid**: `BIGINT(19)`, The ID of the user who has the tracking preference.
