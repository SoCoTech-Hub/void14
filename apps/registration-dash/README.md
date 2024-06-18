### Table: registration_hubs

Hub where the site is registered on with their associated tokens.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **confirmed**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the registration is confirmed (FALSE for no, TRUE for yes).
- **hub_name**: `VARCHAR(255)` NOT NULL, The name of the hub.
- **hub_url**: `VARCHAR(255)` NOT NULL, The URL of the hub.
- **secret**: `VARCHAR(255)`, The unique site identifier for this hub.
- **token**: `VARCHAR(255)` NOT NULL, The token used to communicate with the hub by web service.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of creation.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of the last modification.

#### Indexes

- `CREATE INDEX idx_hub_name ON registration_hubs(hub_name);`
- `CREATE INDEX idx_hub_url ON registration_hubs(hub_url);`
- `CREATE INDEX idx_token ON registration_hubs(token);`
