### Table: tool_dataprivacy_categories

Data categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the data category.
- **description_format**: `BIT(1)`, Format of the description.
- **name**: `VARCHAR(100)`, Name of the data category.
- **created_at**: `BIGINT(19)`, Time when the category was created.
- **updated_at**: `BIGINT(19)`, Time when the category was last modified.
- **user*id***: `BIGINT(19)`, ID of the user who last modified the category.

---

### Table: tool_dataprivacy_ctx_expireds

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the context.
- **default_expired**: `BIT(1)`, Indicates if the default retention period has passed.
- **expired_roles**: `LONGTEXT(2147483647)`, Explicitly expires roles.
- **status**: `TINYINT(3)`, Status of the context.
- **unexpired_roles**: `LONGTEXT(2147483647)`, Roles which have explicitly not expired yet.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_ctx_instances

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **context_id**: `BIGINT(19)`, ID of the context.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_ctx_levels

Default comment for the table, please edit me.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **category_id**: `BIGINT(19)`, ID of the category.
- **context_level**: `SMALLINT(5)`, The context level.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_purposes

Data purposes.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **description**: `LONGTEXT(2147483647)`, Description of the data purpose.
- **description_format**: `BIT(1)`, Format of the description.
- **lawful_bases**: `LONGTEXT(2147483647)`, Comma-separated IDs matching records in `tool_dataprivacy_lawfulbasis`.
- **name**: `VARCHAR(100)`, Name of the data purpose.
- **protected**: `BIT(1)`, Indicates if the data is protected.
- **retention_period**: `VARCHAR(255)`, Retention period.
- **sensitive_data_reasons**: `LONGTEXT(2147483647)`, Comma-separated IDs matching records in `tool_dataprivacy_sensitive`.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_purpose_roles

Data purpose overrides for a specific role.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **lawful_bases**: `LONGTEXT(2147483647)`, Lawful bases.
- **protected**: `BIT(1)`, Indicates if the data is protected.
- **purpose_id**: `BIGINT(19)`, ID of the purpose.
- **retention_period**: `VARCHAR(255)`, Retention period.
- **role_id**: `BIGINT(19)`, ID of the role.
- **sensitive_data_reasons**: `LONGTEXT(2147483647)`, Sensitive data reasons.
- **created_at**: `BIGINT(19)`, Time when the record was created.
- **updated_at**: `BIGINT(19)`, Time when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: tool_dataprivacy_requests

Table for data requests.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **comments**: `LONGTEXT(2147483647)`, More details about the request.
- **comments_format**: `TINYINT(3)`, Format of the comments.
- **creation_method**: `BIGINT(19)`, The type of the creation method of the data request.
- **dpo**: `BIGINT(19)`, The user ID of the Data Protection Officer who is reviewing the request.
- **dpo_comment**: `LONGTEXT(2147483647)`, DPO’s comments (e.g., reason for rejecting the request, etc.).
- **dpo_comment_format**: `TINYINT(3)`, Format of the DPO comment.
- **requested_by**: `BIGINT(19)`, The user ID of the one making the request.
- **status**: `TINYINT(3)`, The current status of the data request.
- **system_approved**: `SMALLINT(5)`, Indicates if the request is system approved (0 = no, 1 = yes).
- **type**: `BIGINT(19)`, Data request type.
- **user_modified**: `BIGINT(19)`, The user who created/modified this request object.
- **created_at**: `BIGINT(19)`, The time this data request was created.
- **updated_at**: `BIGINT(19)`, The last time this data request was updated.
- **user_id**: `BIGINT(19)`, The user ID the request is being made for.
