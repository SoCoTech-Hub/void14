# Chat Management

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:
This README provides an overview of the tables in the Chat Management application, along with their fields and functions.

### Table: chat

This table defines each chat room.

#### Fields

- **chattime**: BIGINT(19)
- **course**: BIGINT(19)
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Text format of intro field.
- **keepdays**: BIGINT(19)
- **name**: VARCHAR(255)
- **schedule**: SMALLINT(5)
- **studentlogs**: SMALLINT(5)
- **updated_at**: BIGINT(19)

### Table: chat_messages

This table stores all the actual chat messages.

#### Fields

- **chatid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **issystem**: BIT(1)
- **message**: LONGTEXT(2147483647)
- **timestamp**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: chat_messages_current

This table stores current session messages.

#### Fields

- **chatid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **issystem**: BIT(1)
- **message**: LONGTEXT(2147483647)
- **timestamp**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: chat_users

This table keeps track of which users are in which chat rooms.

#### Fields

- **chatid**: BIGINT(19)
- **course**: BIGINT(19)
- **firstping**: BIGINT(19)
- **groupid**: BIGINT(19)
- **id**: BIGINT(19)
- **ip**: VARCHAR(45)
- **lang**: VARCHAR(30)
- **lastmessageping**: BIGINT(19)
- **lastping**: BIGINT(19)
- **sid**: VARCHAR(32)
- **userid**: BIGINT(19)
- **version**: VARCHAR(16)
