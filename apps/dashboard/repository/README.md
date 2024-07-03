### Table: repositories

This table contains one entry for every configured external repository.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **sort_order**: `INTEGER` NOT NULL, Sort order of the repository.
- **type**: `VARCHAR(255)` NOT NULL, Type of the repository.
- **visible**: `BOOLEAN` DEFAULT TRUE, Indicates whether the repository is visible.

#### Indexes

- `CREATE INDEX idx_sort_order ON repository(sort_order);`

---

### Table: repository_instances

This table contains one entry for every configured external repository instance.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **context_id**: `BIGINT` NOT NULL, Foreign key to the context.
- **name**: `VARCHAR(255)` NOT NULL, Name of the repository instance.
- **password**: `VARCHAR(255)`, Password for the repository instance.
- **read_only**: `BOOLEAN` DEFAULT FALSE, Indicates whether the repository instance is read-only.
- **type_id**: `BIGINT` NOT NULL, Foreign key to the repository type.
- **user_name**: `VARCHAR(255)`, Username for the repository instance.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **userid**: `BIGINT` NOT NULL, Foreign key to the user.

#### Indexes

- `CREATE INDEX idx_context_id ON repository_instances(context_id);`
- `CREATE INDEX idx_type_id ON repository_instances(type_id);`
- `CREATE INDEX idx_userid ON repository_instances(userid);`

---

### Table: repository_instance_configs

The config for instances of repositories.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **instance_id**: `BIGINT` NOT NULL, Foreign key to the repository instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the config item.
- **value**: `TEXT`, Value of the config item.

#### Indexes

- `CREATE INDEX idx_instance_id ON repository_instance_config(instance_id);`
- `CREATE INDEX idx_name ON repository_instance_config(name);`

---

### Table: repository_onedrive_accesses

List of temporary access grants for OneDrive repositories.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **item_id**: `VARCHAR(255)` NOT NULL, The item ID in OneDrive.
- **permission_id**: `VARCHAR(255)` NOT NULL, The permission ID in OneDrive.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **userid**: `BIGINT` NOT NULL, Foreign key to the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_userid ON repository_onedrive_access(userid);`
