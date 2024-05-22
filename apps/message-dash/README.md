### Table: message

Stores all messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message.
- **component**: `VARCHAR(100)`, The component associated with the message.
- **conversationid**: `BIGINT(19)`, ID of the conversation. \* Moved from Messages (containing all messages)
- **contexturl**: `LONGTEXT`, URL linking to the context of the event.
- **contexturlname**: `LONGTEXT`, Display text for the context URL.
- **customdata**: `LONGTEXT`, Custom data for the message processor (JSON format).
- **eventtype**: `VARCHAR(100)`, Type of event related to the message.
- **fullmessage**: `LONGTEXT`, Full content of the message.
- **fullmessageformat**: `SMALLINT(5)`, Format of the full message.
- **fullmessagehtml**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **smallmessage**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **timecreated**: `BIGINT(19)`, Timestamp when the message was created.
- **timeuserfromdeleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **timeusertodeleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **useridfrom**: `BIGINT(19)`, ID of the sender.
- **useridto**: `BIGINT(19)`, ID of the receiver.

---

### Table: message_airnotifier_devices

Stores information about devices registered in Airnotifier.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the device.
- **enable**: `BIT(1)`, Indicates if the device is enabled.
- **userdeviceid**: `BIGINT(19)`, ID of the user device in the user_devices table.

---

### Table: message_contact_requests

Maintains a list of contact requests between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact request.
- **requesteduserid**: `BIGINT(19)`, ID of the requested user.
- **timecreated**: `BIGINT(19)`, Timestamp when the request was created.
- **userid**: `BIGINT(19)`, ID of the user who made the request.

---

### Table: message_contacts

Maintains lists of contacts between users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the contact.
- **contactid**: `BIGINT(19)`, ID of the contact user.
- **timecreated**: `BIGINT(19)`, Timestamp when the contact was created.
- **userid**: `BIGINT(19)`, ID of the user who has the contact.

---

### Table: message_conversation_actions

Stores all per-user actions on individual conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the action.
- **action**: `BIGINT(19)`, Action performed by the user on the conversation.
- **conversationid**: `BIGINT(19)`, ID of the conversation.
- **timecreated**: `BIGINT(19)`, Timestamp when the action was performed.
- **userid**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_conversation_members

Stores all members in conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation member.
- **conversationid**: `BIGINT(19)`, ID of the conversation.
- **timecreated**: `BIGINT(19)`, Timestamp when the user was added to the conversation.
- **userid**: `BIGINT(19)`, ID of the user in the conversation.

---

### Table: message_conversations

Stores all message conversations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the conversation.
- **component**: `VARCHAR(100)`, Component associated with the conversation.
- **contextid**: `BIGINT(19)`, Context ID of the item or course.
- **convhash**: `VARCHAR(40)`, Hash value of the conversation.
- **enabled**: `BIT(1)`, Indicates if the conversation is enabled.
- **itemid**: `BIGINT(19)`, ID of the item associated with the conversation.
- **itemtype**: `VARCHAR(100)`, Type of the item associated with the conversation.
- **name**: `VARCHAR(255)`, Name of the conversation.
- **timecreated**: `BIGINT(19)`, Timestamp when the conversation was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the conversation was last modified.
- **type**: `BIGINT(19)`, Type of the conversation.

---

### Table: message_email_messages

Tracks what emails to send in an email digest.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the email message.
- **conversationid**: `BIGINT(19)`, ID of the conversation.
- **messageid**: `BIGINT(19)`, ID of the message to be sent via email.
- **useridto**: `BIGINT(19)`, ID of the user who will receive the email.

---

### Table: message_popup

Tracks the state of notifications for the popup message processor.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **isread**: `BIT(1)`, Indicates if the popup notification has been read.
- **messageid**: `BIGINT(19)`, ID of the message associated with the popup notification.

---

### Table: message_popup_notifications

Tracks notifications to display in the message output popup.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the popup notification.
- **notificationid**: `BIGINT(19)`, ID of the notification to display.

---

### Table: message_processors

Lists message output plugins.

#### Fields

- **enabled**: `BIT(1)`, Indicates if the processor is enabled.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the processor.
- **name**: `VARCHAR(166)`, Name of the message processor.

---

### Table: message_providers

Stores message providers for modules and core systems.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message provider.
- **capability**: `VARCHAR(255)`, Permission required to see this message provider.
- **component**: `VARCHAR(200)`, Component that produces the messages.
- **name**: `VARCHAR(100)`, Name of the message provider.

---

### Table: message_read

Tracks all messages that have been read.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the read message.
- **component**: `VARCHAR(100)`, Component associated with the message.
- **contexturl**: `LONGTEXT`, URL linking to the context of the event.
- **contexturlname**: `LONGTEXT`, Display text for the context URL.
- **eventtype**: `VARCHAR(100)`, Type of event related to the message.
- **fullmessage**: `LONGTEXT`, Full content of the message.
- **fullmessageformat**: `SMALLINT(5)`, Format of the full message.
- **fullmessagehtml**: `LONGTEXT`, HTML formatted message.
- **notification**: `BIT(1)`, Indicates if the message is a notification.
- **smallmessage**: `LONGTEXT`, Short version of the message (e.g., for SMS).
- **subject**: `LONGTEXT`, Subject of the message.
- **timecreated**: `BIGINT(19)`, Timestamp when the message was created.
- **timeread**: `BIGINT(19)`, Timestamp when the message was read.
- **timeuserfromdeleted**: `BIGINT(19)`, Timestamp when the sender deleted the message.
- **timeusertodeleted**: `BIGINT(19)`, Timestamp when the receiver deleted the message.
- **useridfrom**: `BIGINT(19)`, ID of the sender.
- **useridto**: `BIGINT(19)`, ID of the receiver.

---

### Table: message_user_actions

Tracks all per-user actions on individual messages.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user action.
- **action**: `BIGINT(19)`, Action performed by the user on the message.
- **messageid**: `BIGINT(19)`, ID of the message associated with the action.
- **timecreated**: `BIGINT(19)`, Timestamp when the action was performed.
- **userid**: `BIGINT(19)`, ID of the user who performed the action.

---

### Table: message_users_blocked

Maintains lists of blocked users.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the blocked user entry.
- **blockeduserid**: `BIGINT(19)`, ID of the blocked user.
- **timecreated**: `BIGINT(19)`, Timestamp when the user was blocked.
- **userid**: `BIGINT(19)`, ID of the user who blocked the other user.

---

### Table: messageinbound_datakeys

Stores secret keys for inbound message data items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the data key.
- **datakey**: `VARCHAR(64)`, Secret key for the data item.
- **datavalue**: `BIGINT(19)`, Integer value of the data item.
- **expires**: `BIGINT(19)`, Expiry time of the key.
- **handler**: `BIGINT(19)`, ID of the handler associated with the key.
- **timecreated**: `BIGINT(19)`, Timestamp when the data key was created.

---

### Table: messageinbound_handlers

Defines inbound message handlers.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the handler.
- **classname**: `VARCHAR(255)`, Class defining the inbound message handler.
- **component**: `VARCHAR(100)`, Component the handler belongs to.
- **defaultexpiration**: `BIGINT(19)`, Default expiration period for new keys.
- **enabled**: `BIT(1)`, Indicates if the handler is enabled.
- **validateaddress**: `BIT(1)`, Indicates if the sender address should be validated.

---

### Table: messageinbound_messagelist

Lists message IDs for existing replies.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the message list entry.
- **address**: `LONGTEXT`, Inbound message address.
- **messageid**: `LONGTEXT`, Message ID for the reply.
- **timecreated**: `BIGINT(19)`, Timestamp when the message was created.
- **userid**: `BIGINT(19)`, ID of the user associated with the message.
