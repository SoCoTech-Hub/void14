### Table: messages **

Stores all messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message.
- **component**: `VARCHAR(100)`, The component associated with the message.
- **conversation_id**: `BIGINT(19)`, ID of the conversation. \* Moved from Messages (containing all messages)
- **context_url**: `LONGTEXT`, URL linking to the context of the event.
- **context_url_name**: `LONGTEXT`, Display text for the context URL.
- **custom_data**: `LONGTEXT`, Custom data for the message processor (JSON format).
- **event_type**: `VARCHAR(100)`, Type of event related to the message.
- **full_message**: `LONGTEXT`, Full content of the message.
- **full_message_format**: `SMALLINT(5)`, Format of the full message.
- **full_message_html**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **small_message**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **time_user_from_deleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **time_user_to_deleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **user_id_to**: `BIGINT(19)`, ID of the receiver.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id_from**: `BIGINT(19)`, ID of the sender.

---

### Table: message_airnotifier_devices **

Stores information about devices registered in Airnotifier.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the device.
- **enable**: `BIT(1)`, Indicates if the device is enabled.
- **user_device_id**: `BIGINT(19)`, ID of the user device in the user_devices table.

---

### Table: message_contact_requests **

Maintains a list of contact requests between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact request.
- **requested_user_id**: `BIGINT(19)`, ID of the requested user.
- **time_created**: `BIGINT(19)`, Timestamp when the request was created.
- **user_id**: `BIGINT(19)`, ID of the user who made the request.

---

### Table: message_contacts **

Maintains lists of contacts between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact.
- **contact_id**: `BIGINT(19)`, ID of the contact user.
- **time_created**: `BIGINT(19)`, Timestamp when the contact was created.
- **user_id**: `BIGINT(19)`, ID of the user who has the contact.

---

### Table: message_conversation_actions **

Stores all per-user actions on individual conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the action.
- **action**: `BIGINT(19)`, Action performed by the user on the conversation.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the action was performed.
- **user_id**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_conversation_members **

Stores all members in conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation member.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the user was added to the conversation.
- **user_id**: `BIGINT(19)`, ID of the user in the conversation.

---

### Table: message_conversations **

Stores all message conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation.
- **component**: `VARCHAR(100)`, Component associated with the conversation.
- **context_id**: `BIGINT(19)`, Context ID of the item or course.
- **conv_hash**: `VARCHAR(40)`, Hash value of the conversation.
- **enabled**: `BIT(1)`, Indicates if the conversation is enabled.
- **item_id**: `BIGINT(19)`, ID of the item associated with the conversation.
- **item_type**: `VARCHAR(100)`, Type of the item associated with the conversation.
- **name**: `VARCHAR(255)`, Name of the conversation.
- **type**: `BIGINT(19)`, Type of the conversation.
- **time_created**: `BIGINT(19)`, Timestamp when the conversation was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the conversation was last modified.

---

### Table: message_email_messages **

Tracks what emails to send in an email digest.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the email message.
- **conversation_id**: `BIGINT(19)`, ID of the conversation.
- **message_id**: `BIGINT(19)`, ID of the message to be sent via email.
- **user_id_to**: `BIGINT(19)`, ID of the user who will receive the email.

---

### Table: message_popups **

Tracks the state of notifications for the popup message processor.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **is_read**: `BIT(1)`, Indicates if the popup notification has been read.
- **message_id**: `BIGINT(19)`, ID of the message associated with the popup notification.

---

### Table: message_popup_notifications **

Tracks notifications to display in the message output popup.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **notification_id**: `BIGINT(19)`, ID of the notification to display.

---

### Table: message_processors **

Lists message output plugins.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the processor.
- **enabled**: `BIT(1)`, Indicates if the processor is enabled.
- **name**: `VARCHAR(166)`, Name of the message processor.

---

### Table: message_providers **

Stores message providers for modules and core systems.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message provider.
- **capability**: `VARCHAR(255)`, Permission required to see this message provider.
- **component**: `VARCHAR(200)`, Component that produces the messages.
- **name**: `VARCHAR(100)`, Name of the message provider.

---

### Table: message_reads **

Tracks all messages that have been read.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read message.
- **component**: `VARCHAR(100)`, Component associated with the message.
- **context_url**: `LONGTEXT`, URL linking to the context of the event.
- **context_url_name**: `LONGTEXT`, Display text for the context URL.
- **event_type**: `VARCHAR(100)`, Type of event related to the message.
- **full_message**: `LONGTEXT`, Full content of the message.
- **full_message_format**: `SMALLINT(5)`, Format of the full message.
- **full_message_html**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **small_message**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **time_read**: `BIGINT(19)`, Timestamp when the message was read.
- **time_user_from_deleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **time_user_to_deleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **user_id_from**: `BIGINT(19)`, ID of the sender.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id_to**: `BIGINT(19)`, ID of the receiver.

---

### Table: message_user_actions **

Tracks all per-user actions on individual messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user action.
- **action**: `BIGINT(19)`, Action performed by the user on the message.
- **message_id**: `BIGINT(19)`, ID of the message associated with the action.
- **time_created**: `BIGINT(19)`, Timestamp when the action was performed.
- **user_id**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_users_blockeds **

Maintains lists of blocked users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the blocked user entry.
- **blocked_user_id**: `BIGINT(19)`, ID of the blocked user.
- **time_created**: `BIGINT(19)`, Timestamp when the user was blocked.
- **user_id**: `BIGINT(19)`, ID of the user who blocked the other user.

---

### Table: messageinbound_datakeys **

Stores secret keys for inbound message data items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the data key.
- **data_key**: `VARCHAR(64)`, Secret key for the data item.
- **data_value**: `BIGINT(19)`, Integer value of the data item.
- **expires**: `BIGINT(19)`, Expiry time of the key.
- **handler**: `BIGINT(19)`, ID of the handler associated with the key.
- **time_created**: `BIGINT(19)`, Timestamp when the data key was created.

---

### Table: messageinbound_handlers **

Defines inbound message handlers.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the handler.
- **class_name**: `VARCHAR(255)`, Class defining the inbound message handler.
- **component**: `VARCHAR(100)`, Component the handler belongs to.
- **default_expiration**: `BIGINT(19)`, Default expiration period for new keys.
- **enabled**: `BIT(1)`, Indicates if the handler is enabled.
- **validate_address**: `BIT(1)`, Indicates if the sender address should be validated.

---

### Table: messageinbound_messagelists **

Lists message IDs for existing replies.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message list entry.
- **address**: `LONGTEXT`, Inbound message address.
- **message_id**: `LONGTEXT`, Message ID for the reply.
- **time_created**: `BIGINT(19)`, Timestamp when the message was created.
- **user_id**: `BIGINT(19)`, ID of the user associated with the message.
