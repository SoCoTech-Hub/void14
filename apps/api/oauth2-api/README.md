![Relationships Diagram](RelationshipsDiagram.png)

### Table: oauth2_access_token

Stores access tokens for system accounts to access OAuth2 services.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the access token.
- **expires**: `BIGINT` NOT NULL, Expiry timestamp according to the issuer.
- **issuer_id**: `BIGINT` NOT NULL, Corresponding OAuth2 issuer ID.
- **scope**: `TEXT` NOT NULL, The scope of the access token.
- **token**: `TEXT` NOT NULL, The access token.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuer_id ON oauth2_access_token(issuer_id);`
- `CREATE INDEX idx_user_id ON oauth2_access_token(user_id);`

---

### Table: oauth2_endpoints

Describes the named endpoint for an OAuth2 service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the endpoint.
- **issuer_id**: `BIGINT` NOT NULL, The identity provider this service belongs to.
- **name**: `VARCHAR(255)` NOT NULL, The service name.
- **url**: `TEXT` NOT NULL, The URL to the endpoint.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, The time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, The time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuer_id ON oauth2_endpoint(issuer_id);`
- `CREATE INDEX idx_user_id ON oauth2_endpoint(user_id);`

---

### Table: oauth2_issuer

Details for an OAuth2 connect identity issuer.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the issuer.
- **allowed_domains**: `TEXT` NOT NULL, Allowed domains for this issuer.
- **base_url**: `TEXT` NOT NULL, The base URL to the issuer.
- **basic_auth**: `BOOLEAN` NOT NULL DEFAULT FALSE, Use HTTP Basic authentication scheme when sending client ID and password.
- **client_id**: `TEXT` NOT NULL, The client ID used to connect to this OAuth2 service.
- **client_secret**: `TEXT` NOT NULL, The secret used to connect to this OAuth2 service.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the issuer is enabled.
- **image**: `TEXT` NOT NULL, Image associated with the issuer.
- **login_page_name**: `VARCHAR(255)` NOT NULL, Name to be displayed on the login page.
- **login_params**: `TEXT` NOT NULL, Additional parameters sent for a login attempt.
- **login_params_offline**: `TEXT` NOT NULL, Additional parameters sent for a login attempt to generate a refresh token.
- **login_scopes**: `TEXT` NOT NULL, The scopes requested for a normal login attempt.
- **login_scopes_offline**: `TEXT` NOT NULL, The scopes requested for a login attempt to generate a refresh token.
- **name**: `VARCHAR(255)` NOT NULL, The name of this identity issuer.
- **require_confirmation**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if confirmation is required.
- **scopes_supported**: `TEXT` NOT NULL, The list of scopes this service supports.
- **service_type**: `VARCHAR(255)` NOT NULL, Issuer service type, such as 'google' or 'facebook'.
- **show_on_login_page**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the issuer should be shown on the login page.
- **sort_order**: `BIGINT` NOT NULL, The defined sort order.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_name ON oauth2_issuer(name);`
- `CREATE INDEX idx_service_type ON oauth2_issuer(service_type);`
- `CREATE INDEX idx_user_id ON oauth2_issuer(user_id);`

---

### Table: oauth2_refresh_token

Stores refresh tokens which can be exchanged for access tokens.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the refresh token.
- **issuer_id**: `BIGINT` NOT NULL, Corresponding OAuth2 issuer ID.
- **scope_hash**: `VARCHAR(40)` NOT NULL, SHA1 hash of the scopes used when requesting the refresh token.
- **token**: `TEXT` NOT NULL, The refresh token.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user to whom this refresh token belongs.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_refresh_token(issuerid);`
- `CREATE INDEX idx_scopehash ON oauth2_refresh_token(scopehash);`
- `CREATE INDEX idx_userid ON oauth2_refresh_token(userid);`

---

### Table: oauth2_system_account

Stored details used to get an access token as a system user.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the system account.
- **email**: `TEXT` NOT NULL, The email connected to this issuer.
- **granted_scopes**: `TEXT` NOT NULL, The scopes that this system account has been granted access to.
- **issuer_id**: `BIGINT` NOT NULL, The ID of the OAuth2 identity issuer.
- **refresh_token**: `TEXT` NOT NULL, The refresh token used to request access tokens.
- **username**: `TEXT` NOT NULL, The username connected as a system account to this issuer.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_system_account(issuerid);`
- `CREATE INDEX idx_user_id ON oauth2_system_account(user_id);`

---

### Table: oauth2_user_field_mapping

Mapping of OAuth user fields to Moodle fields.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the mapping.
- **external_field**: `VARCHAR(500)` NOT NULL, The field name returned by the userinfo endpoint.
- **internal_field**: `VARCHAR(64)` NOT NULL, The name of the Moodle field this user field maps to.
- **issuer_id**: `BIGINT` NOT NULL, The OAuth issuer ID.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, The time this record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, The time this record was modified.
- **user_id**: `BIGINT` NOT NULL, The user who modified this record.

#### Indexes

- `CREATE INDEX idx_issuerid ON oauth2_user_field_mapping(issuerid);`
- `CREATE INDEX idx_user_id ON oauth2_user_field_mapping(user_id);`
