# Configuration Management

## Tables

This README provides an overview of the tables in the Configuration Management application, along with their fields and functions.

### Table: config

This table stores configuration variables.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(255)
- **value**: LONGTEXT(2147483647)

### Table: config_log

This table stores changes done in server configuration through the admin UI.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **oldvalue**: LONGTEXT(2147483647)
- **plugin**: VARCHAR(100)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)
- **value**: LONGTEXT(2147483647)

### Table: config_plugins

This table stores modules and plugins configuration variables.

#### Fields

- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100) \* Default: 'core'.
- **value**: LONGTEXT(2147483647)
