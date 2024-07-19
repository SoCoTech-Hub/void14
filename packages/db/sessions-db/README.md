### Table: sessions

Database-based session storage - now recommended.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **first_ip**: `VARCHAR(45)` (Nullable), The IP address from which the session was first created.
- **last_ip**: `VARCHAR(45)` (Nullable), The IP address from which the session was last accessed.
- **sess_data**: `LONGTEXT(2147483647)` (Nullable), Session content.
- **sid**: `VARCHAR(128)`, Session ID.
- **state**: `BIGINT(19)`, State of the session (0 means normal session).
- **created_at**: `BIGINT(19)`, Timestamp of when the session was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the session.
- **user_id**: `BIGINT(19)`, User ID associated with the session.
