# External Services and Functions Database Schema Documentation

This README provides an overview of the tables related to external services and functions, along with their fields and functions.

## Tables

### Table: external_functions **

This table lists all external functions available in the system.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **capabilities**: VARCHAR(255), Optional, All capabilities required to run the function (separated by commas).
- **class_name**: VARCHAR(100), Mandatory, The name of the class where the function is defined.
- **class_path**: VARCHAR(255), Optional, The path to the class where the function is defined.
- **component**: VARCHAR(100), Mandatory, The component the function belongs to.
- **method_name**: VARCHAR(100), Mandatory, The name of the method.
- **name**: VARCHAR(200), Mandatory, The name of the function.
- **services**: VARCHAR(1333), Optional, All the services (by shortname) where this function must be included.

### Table: external_services **

This table lists both built-in and custom external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **component**: VARCHAR(100), Optional.
- **download_files**: BIT(1), Default 0, 1 if the service allows people to download files from `webservice/plugins.php`, 0 if not.
- **enabled**: BIT(1), Nullable.
- **name**: VARCHAR(200), Mandatory.
- **required_capability**: VARCHAR(150), Optional.
- **restricted_users**: BIT(1), Nullable.
- **shortname**: VARCHAR(255), Optional, A unique shortname.
- **time_created**: BIGINT(19), Nullable.
- **time_modified**: BIGINT(19), Optional.
- **upload_files**: BIT(1), Default 0, 1 if the service allows people to upload files to `webservice/upload.php`, 0 if not.

### Table: external_services_functions **

This table lists functions available in each service group.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **external_service_id**: BIGINT(19), Nullable.
- **function_name**: VARCHAR(200), Mandatory.

### Table: external_services_users **

This table lists users allowed to use services with restricted users flag.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **external_service_id**: BIGINT(19), Nullable.
- **ip_restriction**: VARCHAR(255), Optional, IP restriction.
- **valid_until**: BIGINT(19), Optional, Timestamp - valid until date.
- **time_created**: BIGINT(19), Optional, Created timestamp.
- **user_id**: BIGINT(19), Nullable.

### Table: external_tokens **

This table stores security tokens for accessing external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **context_id**: BIGINT(19), Nullable, Context id where the token is valid.
- **creator_id**: BIGINT(19), Default 1, User id of the token creator.
- **external_service_id**: BIGINT(19), Nullable.
- **ip_restriction**: VARCHAR(255), Optional, IP restriction.
- **last_access**: BIGINT(19), Optional, Last access timestamp.
- **private_token**: VARCHAR(64), Optional, Private token, generated at the same time as the token.
- **s_id**: VARCHAR(128), Optional, Link to browser or emulated session.
- **token**: VARCHAR(128), Mandatory, Security token, aka private access key.
- **token_type**: SMALLINT(5), Nullable, Type of token: 0=permanent, no session; 1=linked to current browser session via s_id; 2=permanent, with emulated session.
- **valid_until**: BIGINT(19), Optional, Timestamp - valid until date.
- **time_created**: BIGINT(19), Nullable, Created timestamp.
- **user_id**: BIGINT(19), Nullable, Owner of the token.

Each table is designed to handle different aspects of external services and functions, ensuring secure and efficient access to external functionalities.
