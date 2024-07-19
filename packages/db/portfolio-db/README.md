### Table: portfolio_instance

Base table (not including config data) for instances of portfolio plugins.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the portfolio instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the portfolio plugin instance.
- **plugin**: `VARCHAR(50)` NOT NULL, Foreign key to the plugin.
- **visible**: `BOOLEAN` NOT NULL DEFAULT TRUE, Indicates whether this instance is visible or not.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_plugin ON portfolio_instance(plugin);`

---

### Table: portfolio_instance_config

Stores configuration for portfolio plugin instances.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the configuration record.
- **portfolio_instance_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance being configured.
- **name**: `VARCHAR(255)` NOT NULL, Name of the configuration field.
- **value**: `TEXT`, Value of the configuration field.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_config_portfolio_instance_id ON portfolio_instance_config(portfolio_instance_id);`

---

### Table: portfolio_instance_user

Stores user data for portfolio instances.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the user configuration record.
- **portfolio_instance_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance.
- **name**: `VARCHAR(255)` NOT NULL, Name of the configuration item.
- **value**: `TEXT`, Value of the configuration item.
- **user_id**: `BIGINT` NOT NULL, Foreign key to the user.

#### Indexes

- `CREATE INDEX idx_portfolio_instance_user_portfolio_instance_id ON portfolio_instance_user(portfolio_instance_id);`
- `CREATE INDEX idx_portfolio_instance_user_user_id ON portfolio_instance_user(user_id);`

---

### Table: portfolio_log

Stores log of portfolio transfers, used to later check for duplicates.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the log record.
- **caller_class**: `VARCHAR(150)` NOT NULL, The name of the class used to create the transfer.
- **caller_component**: `VARCHAR(255)`, The component name responsible for exporting.
- **caller_file**: `VARCHAR(255)` NOT NULL, Path to the file to include where the class definition lives (relative to dirroot).
- **caller_sha1**: `VARCHAR(255)` NOT NULL, SHA1 hash of the exported content as far as the caller is concerned (before the portfolio plugin gets a hold of it).
- **continue_url**: `VARCHAR(255)` NOT NULL, The URL the external system has set to view the transfer.
- **portfolio_id**: `BIGINT` NOT NULL, Foreign key to the portfolio instance.
- **return_url**: `VARCHAR(255)` NOT NULL, The original "returnurl" of the export - takes us to the Moodle page we started from.
- **temp_data_id**: `BIGINT`, Old ID from portfolio_tempdata, used to catch a race condition between an external system requesting a file and causing the tempdata to be deleted before the user gets the "your transfer is requested" page.
- **time**: `BIGINT` NOT NULL, Time of the transfer (in the case of a queued transfer, this is the time the actual transfer ran, not when the user started).
- **user_id**: `BIGINT` NOT NULL, User who exported the content.

#### Indexes

- `CREATE INDEX idx_portfolio_log_portfolio_id ON portfolio_log(portfolio_id);`
- `CREATE INDEX idx_portfolio_log_temp_data_id ON portfolio_log(temp_data_id);`
- `CREATE INDEX idx_portfolio_log_time ON portfolio_log(time);`
- `CREATE INDEX idx_portfolio_log_user_id ON portfolio_log(user_id);`

---

### Table: portfolio_mahara_queue

Maps Mahara tokens to transfer IDs.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **token**: `VARCHAR(50)` NOT NULL, The token Mahara sent us to use for this transfer.
- **transfer_id**: `BIGINT` NOT NULL, Foreign key to portfolio_tempdata.id.

#### Indexes

- `CREATE INDEX idx_portfolio_mahara_queue_transfer_id ON portfolio_mahara_queue(transfer_id);`

---

### Table: portfolio_tempdata

Stores temporary data for portfolio exports.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the temporary data record.
- **data**: `TEXT`, Dumping ground for portfolio callers to store their data.
- **expiry_time**: `BIGINT` NOT NULL, Time this record will expire (used for cron cleanups) - the start of export + 24 hours.
- **portfolio_instance_id**: `BIGINT`, Which portfolio plugin instance is being used.
- **queued**: `BOOLEAN` NOT NULL DEFAULT FALSE, Value 1 means the entry should be processed in cron.
- **user_id**: `BIGINT` NOT NULL, Pseudo foreign key to the user. This is stored in the serialized data structure in the data field but added here for ease of lookups.

#### Indexes

- `CREATE INDEX idx_portfolio_tempdata_expiry_time ON portfolio_tempdata(expiry_time);`
- `CREATE INDEX idx_portfolio_tempdata_portfolio_instance_id ON portfolio_tempdata(portfolio_instance_id);`
- `CREATE INDEX idx_portfolio_tempdata_queued ON portfolio_tempdata(queued);`
- `CREATE INDEX idx_portfolio_tempdata_user_id ON portfolio_tempdata(user_id);`
