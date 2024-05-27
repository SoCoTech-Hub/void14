### Table: portfolio_instance

Base table (not including config data) for instances of portfolio plugins.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the portfolio instance.
- **name**: `VARCHAR(255)`, Name of the portfolio plugin instance.
- **plugin**: `VARCHAR(50)`, Foreign key to the plugin.
- **visible**: `BIT(1)`, Indicates whether this instance is visible or not. Default is 1.

---

### Table: portfolio_instance_config

Stores configuration for portfolio plugin instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the configuration record.
- **portfolio_instance_id**: `BIGINT(19)`, Foreign key to the portfolio instance being configured.
- **name**: `VARCHAR(255)`, Name of the configuration field.
- **value**: `LONGTEXT(2147483647)` (Nullable), Value of the configuration field.

---

### Table: portfolio_instance_user

Stores user data for portfolio instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user configuration record.
- **portfolio_instance_id**: `BIGINT(19)`, Foreign key to the portfolio instance.
- **name**: `VARCHAR(255)`, Name of the configuration item.
- **value**: `LONGTEXT(2147483647)` (Nullable), Value of the configuration item.
- **userid**: `BIGINT(19)`, Foreign key to the user.

---

### Table: portfolio_log

Stores log of portfolio transfers, used to later check for duplicates.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log record.
- **caller_class**: `VARCHAR(150)`, The name of the class used to create the transfer.
- **caller_component**: `VARCHAR(255)` (Nullable), The component name responsible for exporting.
- **caller_file**: `VARCHAR(255)`, Path to the file to include where the class definition lives (relative to dirroot).
- **caller_sha1**: `VARCHAR(255)`, SHA1 hash of the exported content as far as the caller is concerned (before the portfolio plugin gets a hold of it).
- **continue_url**: `VARCHAR(255)`, The URL the external system has set to view the transfer.
- **portfolio**: `BIGINT(19)`, Foreign key to the portfolio instance.
- **return_url**: `VARCHAR(255)`, The original "returnurl" of the export - takes us to the Moodle page we started from.
- **temp_data_id**: `BIGINT(19)`, Old ID from portfolio_tempdata, used to catch a race condition between an external system requesting a file and causing the tempdata to be deleted before the user gets the "your transfer is requested" page.
- **time**: `BIGINT(19)`, Time of the transfer (in the case of a queued transfer, this is the time the actual transfer ran, not when the user started).
- **userid**: `BIGINT(19)`, User who exported the content.

---

### Table: portfolio_mahara_queue

Maps Mahara tokens to transfer IDs.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **token**: `VARCHAR(50)`, The token Mahara sent us to use for this transfer.
- **transfer_id**: `BIGINT(19)`, Foreign key to portfolio_tempdata.id.

---

### Table: portfolio_tempdata

Stores temporary data for portfolio exports.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the temporary data record.
- **data**: `LONGTEXT(2147483647)` (Nullable), Dumping ground for portfolio callers to store their data.
- **expiry_time**: `BIGINT(19)`, Time this record will expire (used for cron cleanups) - the start of export + 24 hours.
- **portfolio_instance_id**: `BIGINT(19)` (Nullable), Which portfolio plugin instance is being used.
- **queued**: `BIT(1)`, Value 1 means the entry should be processed in cron.
- **userid**: `BIGINT(19)`, Pseudo foreign key to the user. This is stored in the serialized data structure in the data field but added here for ease of lookups.
