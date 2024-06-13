# Tool Monitor Dash

## Tables

List of Tables with their function described below:

### Table: tool_monitor_events

A table that keeps a log of events related to subscriptions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Context ID.
- **context_instance_id**: `BIGINT(19)`, Context instance ID.
- **context_level**: `BIGINT(19)`, Context level.
- **course_id**: `BIGINT(19)`, Course ID.
- **event_name**: `VARCHAR(254)`, Event name.
- **link**: `VARCHAR(254)`, Link to the event location.
- **created_at**: `BIGINT(19)`, Time when the event was created.
- **updated_at**: `BIGINT(19)`, Time when the event was updated.

---

### Table: tool_monitor_history

Table to store the history of message notifications sent.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **sid**: `BIGINT(19)`, Subscription ID.
- **time_sent**: `BIGINT(19)`, Timestamp of when the message was sent.
- **user_id**: `BIGINT(19)`, User to whom this notification was sent.

---

### Table: tool_monitor_rules

Table to store rules.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course to which this rule belongs.
- **description**: `LONGTEXT(2147483647)`, Description of the rule.
- **description_format**: `BIT(1)`, Format of the description.
- **event_name**: `VARCHAR(254)`, Fully qualified name of the event.
- **frequency**: `SMALLINT(5)`, Frequency of the rule.
- **name**: `VARCHAR(254)`, Name of the rule.
- **plugin**: `VARCHAR(254)`, Name of the plugin.
- **template**: `LONGTEXT(2147483647)`, Message template.
- **template_format**: `BIT(1)`, Format of the template.
- **time_window**: `MEDIUMINT(7)`, Time window in seconds.
- **created_at**: `BIGINT(19)`, Timestamp of when this rule was created.
- **updated_at**: `BIGINT(19)`, Timestamp when this rule was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who created the rule.

---

### Table: tool_monitor_subscriptions

Table to store user subscriptions to various rules.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **cm_id**: `BIGINT(19)`, Course module ID.
- **course_id**: `BIGINT(19)`, Course ID of the subscription.
- **inactive_date**: `BIGINT(19)`, Timestamp of the time when a notification was last sent for this subscription.
- **last_notification_sent**: `BIGINT(19)`, Timestamp of when a notification was last sent for this subscription.
- **rule_id**: `BIGINT(19)`, Rule ID.
- **created_at**: `BIGINT(19)`, Timestamp of when this subscription was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when this subscription was updated.
- **user_id**: `BIGINT(19)`, User ID of the subscriber.
