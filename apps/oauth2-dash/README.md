### Table: oauth2_access_token

Stores access tokens for system accounts to access OAuth2 services.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the access token.
- **expires**: `BIGINT(19)`, Expiry timestamp according to the issuer.
- **issuerid**: `BIGINT(19)`, Corresponding OAuth2 issuer ID.
- **scope**: `LONGTEXT(2147483647)`, The scope of the access token.
- **timecreated**: `BIGINT(19)`, Time this record was created.
- **timemodified**: `BIGINT(19)`, Time this record was modified.
- **token**: `LONGTEXT(2147483647)`, The access token.
- **usermodified**: `BIGINT(19)`, The user who modified this record.

### Table: oauth2_endpoint

Describes the named endpoint for an OAuth2 service.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the endpoint.
- **issuerid**: `BIGINT(19)`, The identity provider this service belongs to.
- **name**: `VARCHAR(255)`, The service name.
- **timecreated**: `BIGINT(19)`, The time this record was created.
- **timemodified**: `BIGINT(19)`, The time this record was modified.
- **url**: `LONGTEXT(2147483647)`, The URL to the endpoint.
- **usermodified**: `BIGINT(19)`, The user who modified this record.

### Table: oauth2_issuer

Details for an OAuth2 connect identity issuer.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the issuer.
- **alloweddomains**: `LONGTEXT(2147483647)`, Allowed domains for this issuer.
- **baseurl**: `LONGTEXT(2147483647)`, The base URL to the issuer.
- **basicauth**: `TINYINT(3)`, Use HTTP Basic authentication scheme when sending client ID and password.
- **clientid**: `LONGTEXT(2147483647)`, The client ID used to connect to this OAuth2 service.
- **clientsecret**: `LONGTEXT(2147483647)`, The secret used to connect to this OAuth2 service.
- **enabled**: `TINYINT(3)`, Indicates if the issuer is enabled.
- **image**: `LONGTEXT(2147483647)`, Image associated with the issuer.
- **loginpagename**: `VARCHAR(255)`, Name to be displayed on the login page.
- **loginparams**: `LONGTEXT(2147483647)`, Additional parameters sent for a login attempt.
- **loginparamsoffline**: `LONGTEXT(2147483647)`, Additional parameters sent for a login attempt to generate a refresh token.
- **loginscopes**: `LONGTEXT(2147483647)`, The scopes requested for a normal login attempt.
- **loginscopesoffline**: `LONGTEXT(2147483647)`, The scopes requested for a login attempt to generate a refresh token.
- **name**: `VARCHAR(255)`, The name of this identity issuer.
- **requireconfirmation**: `TINYINT(3)`, Indicates if confirmation is required.
- **scopessupported**: `LONGTEXT(2147483647)`, The list of scopes this service supports.
- **servicetype**: `VARCHAR(255)`, Issuer service type, such as 'google' or 'facebook'.
- **showonloginpage**: `TINYINT(3)`, Indicates if the issuer should be shown on the login page.
- **sortorder**: `BIGINT(19)`, The defined sort order.
- **timecreated**: `BIGINT(19)`, Time this record was created.
- **timemodified**: `BIGINT(19)`, Time this record was modified.
- **usermodified**: `BIGINT(19)`, The user who modified this record.

### Table: oauth2_refresh_token

Stores refresh tokens which can be exchanged for access tokens.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the refresh token.
- **issuerid**: `BIGINT(19)`, Corresponding OAuth2 issuer ID.
- **scopehash**: `VARCHAR(40)`, SHA1 hash of the scopes used when requesting the refresh token.
- **timecreated**: `BIGINT(19)`, Time this record was created.
- **timemodified**: `BIGINT(19)`, Time this record was modified.
- **token**: `LONGTEXT(2147483647)`, The refresh token.
- **userid**: `BIGINT(19)`, The user to whom this refresh token belongs.

### Table: oauth2_system_account

Stored details used to get an access token as a system user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the system account.
- **email**: `LONGTEXT(2147483647)`, The email connected to this issuer.
- **grantedscopes**: `LONGTEXT(2147483647)`, The scopes that this system account has been granted access to.
- **issuerid**: `BIGINT(19)`, The ID of the OAuth2 identity issuer.
- **refreshtoken**: `LONGTEXT(2147483647)`, The refresh token used to request access tokens.
- **timecreated**: `BIGINT(19)`, Time this record was created.
- **timemodified**: `BIGINT(19)`, Time this record was modified.
- **usermodified**: `BIGINT(19)`, The user who modified this record.
- **username**: `LONGTEXT(2147483647)`, The username connected as a system account to this issuer.

### Table: oauth2_user_field_mapping

Mapping of OAuth user fields to Moodle fields.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the mapping.
- **externalfield**: `VARCHAR(500)`, The field name returned by the userinfo endpoint.
- **internalfield**: `VARCHAR(64)`, The name of the Moodle field this user field maps to.
- **issuerid**: `BIGINT(19)`, The OAuth issuer ID.
- **timecreated**: `BIGINT(19)`, The time this record was created.
- **timemodified**: `BIGINT(19)`, The time this record was modified.
- **usermodified**: `BIGINT(19)`, The user who modified this record.
