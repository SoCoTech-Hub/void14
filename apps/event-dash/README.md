# Event Management Database Schema Documentation

This README provides an overview of the tables in the event management module, along with their fields and functions.

## Tables

### Table: event

This table stores information about various events.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **categoryid**: BIGINT(19), Default 0.
- **component**: VARCHAR(100), Optional, Component that created this event, if specified, only the component itself can edit and delete it.
- **courseid**: BIGINT(19), Default 0.
- **description**: LONGTEXT(2147483647), Nullable.
- **eventtype**: VARCHAR(20), Mandatory.
- **format**: SMALLINT(5), Default 0.
- **groupid**: BIGINT(19), Default 0.
- **instance**: BIGINT(19), Default 0.
- **location**: LONGTEXT(2147483647), Optional, Event Location.
- **modulename**: VARCHAR(20), Mandatory.
- **name**: LONGTEXT(2147483647), Mandatory.
- **priority**: BIGINT(19), Optional, The event’s display priority. For multiple events with the same module name, instance, and eventtype (e.g., for group overrides), the one with the higher priority will be displayed.
- **repeatid**: BIGINT(19), Default 0.
- **sequence**: BIGINT(19), Default 1.
- **subscriptionid**: BIGINT(19), Optional, The event_subscription id this event is associated with.
- **timeduration**: BIGINT(19), Default 0.
- **timemodified**: BIGINT(19), Default 0.
- **timesort**: BIGINT(19), Optional.
- **timestart**: BIGINT(19), Default 0.
- **type**: SMALLINT(5), Default 0.
- **userid**: BIGINT(19), Default 0.
- **uuid**: VARCHAR(255), Mandatory.
- **visible**: SMALLINT(5), Default 1.

### Table: event_subscriptions

This table tracks subscriptions to remote calendars.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **categoryid**: BIGINT(19), Default 0.
- **courseid**: BIGINT(19), Default 0.
- **eventtype**: VARCHAR(20), Mandatory, The type of the event.
- **groupid**: BIGINT(19), Default 0.
- **lastupdated**: BIGINT(19), Optional.
- **name**: VARCHAR(255), Mandatory.
- **pollinterval**: BIGINT(19), Default 0, Frequency of checks for new/changed events.
- **url**: VARCHAR(255), Mandatory.
- **userid**: BIGINT(19), Default 0.

### Table: events_handlers

This table stores which components request what types of events.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **component**: VARCHAR(166), Mandatory, e.g., moodle, mod_forum, block_rss_client.
- **eventname**: VARCHAR(166), Mandatory, name of the event, e.g., ‘grade_updated’.
- **handlerfile**: VARCHAR(255), Mandatory, path to the file of the function, e.g., /grade/export/lib.php.
- **handlerfunction**: LONGTEXT(2147483647), Optional, serialized string or array describing function, suitable to be passed to `call_user_func()`.
- **internal**: TINYINT(3), Default 1, 1 means standard plugin handler, 0 indicates if event handler sends data to external systems, this is used to prevent immediate sending of events from pending db transactions.
- **schedule**: VARCHAR(255), Optional, ‘cron’ or ‘instant’.
- **status**: BIGINT(19), Default 0, number of failed attempts to process this handler.

### Table: events_queue

This table stores queued events. It stores only one entry for each event.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **eventdata**: LONGTEXT(2147483647), Nullable, serialized version of the data object passed to the event handler.
- **stackdump**: LONGTEXT(2147483647), Optional, serialized `debug_backtrace` showing where the event was fired from.
- **timecreated**: BIGINT(19), Nullable, timestamp of the first time this was added.
- **userid**: BIGINT(19), Optional, `$USER->id` when the event was fired.

### Table: events_queue_handlers

This table lists queued handlers for processing. The events_queue and events_queue_handlers tables are joined by a many-to-one relationship.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **errormessage**: LONGTEXT(2147483647), Optional, if an error happened last time we tried to process this event, record it here.
- **handlerid**: BIGINT(19), Nullable, foreign key id corresponding to the id of the events_handlers table.
- **queuedeventid**: BIGINT(19), Nullable, foreign key id corresponding to the id of the events_queue table.
- **status**: BIGINT(19), Optional, number of failed attempts to process this handler.
- **timemodified**: BIGINT(19), Nullable, timestamp of the last attempt to run this from the queue.
