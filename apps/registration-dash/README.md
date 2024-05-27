### Table: registration_hubs

Hub where the site is registered on with their associated tokens.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **confirmed**: `BOOLEAN(1)`, Indicates whether the registration is confirmed (0 for no, 1 for yes).
- **hub_name**: `VARCHAR(255)`, The name of the hub.
- **hub_url**: `VARCHAR(255)`, The URL of the hub.
- **secret**: `VARCHAR(255)` (Nullable), The unique site identifier for this hub.
- **token**: `VARCHAR(255)`, The token used to communicate with the hub by web service.
- **created_at**: `BIGINT(19)`, Timestamp of creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.
