# External Services and Functions Database Schema Documentation

This README provides an overview of the tables related to external services and functions, along with their fields and functions.

## Tables

### Table: external_functions

This table lists all external functions available in the system.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **capabilities**: VARCHAR(255), Optional, All capabilities required to run the function (separated by commas).
- **classname**: VARCHAR(100), Mandatory, The name of the class where the function is defined.
- **classpath**: VARCHAR(255), Optional, The path to the class where the function is defined.
- **component**: VARCHAR(100), Mandatory, The component the function belongs to.
- **methodname**: VARCHAR(100), Mandatory, The name of the method.
- **name**: VARCHAR(200), Mandatory, The name of the function.
- **services**: VARCHAR(1333), Optional, All the services (by shortname) where this function must be included.

### Table: external_services

This table lists both built-in and custom external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **component**: VARCHAR(100), Optional.
- **downloadfiles**: BIT(1), Default 0, 1 if the service allows people to download files from `webservice/plugins.php`, 0 if not.
- **enabled**: BIT(1), Nullable.
- **name**: VARCHAR(200), Mandatory.
- **requiredcapability**: VARCHAR(150), Optional.
- **restrictedusers**: BIT(1), Nullable.
- **shortname**: VARCHAR(255), Optional, A unique shortname.
- **timecreated**: BIGINT(19), Nullable.
- **timemodified**: BIGINT(19), Optional.
- **uploadfiles**: BIT(1), Default 0, 1 if the service allows people to upload files to `webservice/upload.php`, 0 if not.

### Table: external_services_functions

This table lists functions available in each service group.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **externalserviceid**: BIGINT(19), Nullable.
- **functionname**: VARCHAR(200), Mandatory.

### Table: external_services_users

This table lists users allowed to use services with restricted users flag.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **externalserviceid**: BIGINT(19), Nullable.
- **iprestriction**: VARCHAR(255), Optional, IP restriction.
- **timecreated**: BIGINT(19), Optional, Created timestamp.
- **validuntil**: BIGINT(19), Optional, Timestamp - valid until date.
- **userid**: BIGINT(19), Nullable.

### Table: external_tokens

This table stores security tokens for accessing external services.

#### Fields

- **id**: BIGINT(19), Primary Key, Nullable.
- **contextid**: BIGINT(19), Nullable, Context id where the token is valid.
- **creatorid**: BIGINT(19), Default 1, User id of the token creator.
- **externalserviceid**: BIGINT(19), Nullable.
- **iprestriction**: VARCHAR(255), Optional, IP restriction.
- **lastaccess**: BIGINT(19), Optional, Last access timestamp.
- **privatetoken**: VARCHAR(64), Optional, Private token, generated at the same time as the token.
- **sid**: VARCHAR(128), Optional, Link to browser or emulated session.
- **timecreated**: BIGINT(19), Nullable, Created timestamp.
- **token**: VARCHAR(128), Mandatory, Security token, aka private access key.
- **tokentype**: SMALLINT(5), Nullable, Type of token: 0=permanent, no session; 1=linked to current browser session via sid; 2=permanent, with emulated session.
- **validuntil**: BIGINT(19), Optional, Timestamp - valid until date.
- **userid**: BIGINT(19), Nullable, Owner of the token.

Each table is designed to handle different aspects of external services and functions, ensuring secure and efficient access to external functionalities.
