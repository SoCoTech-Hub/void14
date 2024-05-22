### Table: notifications

This table stores all notifications.

#### Fields

- **component**: `VARCHAR(100)` (Nullable), The component that generated the notification.
- **contexturl**: `LONGTEXT` (2147483647) (Nullable), URL related to the notification's context.
- **contexturlname**: `LONGTEXT` (2147483647) (Nullable), Display name for the context URL.
- **customdata**: `LONGTEXT` (2147483647) (Nullable), Custom data to be passed to the message processor. Must be serializable using `json_encode()`.
- **eventtype**: `VARCHAR(100)` (Nullable), The type of event that triggered the notification.
- **fullmessage**: `LONGTEXT` (2147483647) (Nullable), The full message of the notification.
- **fullmessageformat**: `BIT(1)`, The format of the full message.
- **fullmessagehtml**: `LONGTEXT` (2147483647) (Nullable), The full message in HTML format.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the notification.
- **smallmessage**: `LONGTEXT` (2147483647) (Nullable), A short version of the message (e.g., SMS).
- **subject**: `LONGTEXT` (2147483647) (Nullable), The subject of the message.
- **timecreated**: `BIGINT(19)`, The time when the notification was created.
- **timeread**: `BIGINT(19)` (Nullable), The time when the notification was read.
- **useridfrom**: `BIGINT(19)`, The user ID of the sender.
- **useridto**: `BIGINT(19)`, The user ID of the recipient.
