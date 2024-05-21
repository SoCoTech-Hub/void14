# Favourite Table Documentation

This README provides an overview of the `favourite` table, which stores relationships between users and their favourite items within the Moodle system. Each record in the table represents a favourite item for a user.

## Table: favourite

### Description

The `favourite` table records the relationships between users and their favourite items within the Moodle platform. It allows users to mark specific items as favourites, which can include messages, courses, or any other item types specified by the Moodle component.

### Fields

- **id**: `BIGINT(19)`, Primary Key, Auto-incremented. Unique identifier for each favourite record.
- **component**: `VARCHAR(100)`, Defines the Moodle component in which the favourite was created. This helps identify which part of Moodle the favourite item belongs to.
- **context_id**: `BIGINT(19)`, The context id of the item being favourited. Context id provides information about the context in which the favourite item resides, such as a specific course or module.
- **item_id**: `BIGINT(19)`, The identifier of the item which is being favourited. This id refers to the specific item within its type, such as a message id or course id.
- **item_type**: `VARCHAR(100)`, The type of the item which is being favourited. This is usually a table name but can be any identifier that denotes the type of item. Examples include 'messages' or 'message_conversations'.
- **ordering**: `BIGINT(19)`, Optional. Specifies the ordering of the favourite within its context area. This allows for custom sorting of favourite items, for example, to sort favourite message conversations.
- **created_at**: `BIGINT(19)`, The timestamp when the favourite was created. This helps in tracking when the user marked the item as a favourite.
- **updated_at**: `BIGINT(19)`, The timestamp when the favourite was last modified. This is useful for tracking changes to the favourite status.
- **user_id**: `BIGINT(19)`, The id of the user to whom the favourite belongs. This field associates the favourite item with a specific user.

### Example Usage

- A user marks a course as a favourite, resulting in a new record in the `favourite` table with the `component` set to 'course', the `itemid` set to the course id, and the `userid` set to the user's id.- A user marks a specific conversation in the messaging system as a favourite. The `component` is set to 'messages', `itemtype` is 'message_conversations', and the `itemid` is the id of the conversation.

This table helps enhance the user experience by allowing users to quickly access their favourite items within the Moodle system, improving navigation and usability.
