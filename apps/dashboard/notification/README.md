### Table: notifications

This table stores all notifications.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the notification.
- **component**: `VARCHAR(100)` (Nullable), The component that generated the notification.
- **context_url**: `LONGTEXT` (2147483647) (Nullable), URL related to the notification's context.
- **context_url_name**: `LONGTEXT` (2147483647) (Nullable), Display name for the context URL.
- **custom_data**: `LONGTEXT` (2147483647) (Nullable), Custom data to be passed to the message processor. Must be serializable using `json_encode()`.
- **event_type**: `VARCHAR(100)` (Nullable), The type of event that triggered the notification.
- **full_message**: `LONGTEXT` (2147483647) (Nullable), The full message of the notification.
- **full_message_format**: `BIT(1)`, The format of the full message.
- **full_message_html**: `LONGTEXT` (2147483647) (Nullable), The full message in HTML format.
- **small_message**: `LONGTEXT` (2147483647) (Nullable), A short version of the message (e.g., SMS).
- **subject**: `LONGTEXT` (2147483647) (Nullable), The subject of the message.
- **time_read**: `BIGINT(19)` (Nullable), The time when the notification was read.
- **user_id_to**: `BIGINT(19)`, The user ID of the recipient.
- **created_at**: `BIGINT(19)`, The time when the notification was created.
- **updated_at**: `BIGINT(19)`, The time when the notification was created.
- **user_id_from**: `BIGINT(19)`, The user ID of the sender.
