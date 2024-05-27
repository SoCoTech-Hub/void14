### Table: repository

This table contains one entry for every configured external repository.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **sort_order**: `BIGINT(19)`, Sort order of the repository.
- **type**: `VARCHAR(255)`, Type of the repository.
- **visible**: `BOOLEAN(1)`, Indicates whether the repository is visible. Default is 1.

---

### Table: repository_instances

This table contains one entry for every configured external repository instance.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, Foreign key to the context.
- **name**: `VARCHAR(255)`, Name of the repository instance.
- **password**: `VARCHAR(255)`, Password for the repository instance.
- **read_only**: `BOOLEAN(1)`, Indicates whether the repository instance is read-only. Default is 0.
- **type_id**: `BIGINT(19)`, Foreign key to the repository type.
- **user_name**: `VARCHAR(255)`, Username for the repository instance.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **userid**: `BIGINT(19)`, Foreign key to the user.

---

### Table: repository_instance_config

The config for instances of repositories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **instance_id**: `BIGINT(19)`, Foreign key to the repository instance.
- **name**: `VARCHAR(255)`, Name of the config item.
- **value**: `LONGTEXT(2147483647)`, Value of the config item.

---

### Table: repository_onedrive_access

List of temporary access grants for OneDrive repositories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **item_id**: `VARCHAR(255)`, The item ID in OneDrive.
- **permission_id**: `VARCHAR(255)`, The permission ID in OneDrive.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **userid**: `BIGINT(19)`, Foreign key to the user who last modified the record.
