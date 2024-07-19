# Tool Policy Dash

## Tables

List of Tables with their function described below:

### Table: tool_policies

Contains the list of policy documents defined on the site.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **current_version_id**: `BIGINT(19)`, ID of the current policy version that applies on the site, NULL if the policy does not apply.
- **sort_order**: `INT(7)`, Defines the order in which policies should be presented to users (default 999).

---

### Table: tool_policy_acceptances

Tracks users accepting the policy versions.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **lang**: `VARCHAR(30)`, Code of the language the user had when the policy document was displayed.
- **note**: `LONGTEXT(2147483647)`, Plain text note describing how the actual consent has been obtained if the policy has been accepted on other user’s behalf.
- **policy_version_id**: `BIGINT(19)`, ID of the policy document version.
- **status**: `BIT(1)`, Acceptance status: 1 - accepted, 0 - not accepted.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the acceptance record.
- **created_at**: `BIGINT(19)`, Timestamp of when the acceptance record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the acceptance record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user this acceptance is relevant to.

---

### Table: tool_policy_versions

Holds versions of the policy documents.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **agreement_style**: `SMALLINT(5)`, How this agreement should flow: 0 - on the consent page, 1 - on a separate page before reaching the consent page.
- **archived**: `SMALLINT(5)`, Should the version be considered as archived. All non-archived, non-current versions are considered to be drafts.
- **audience**: `SMALLINT(5)`, Who is this policy targeted at: 0 - all users, 1 - logged in users only, 2 - guests only.
- **content**: `LONGTEXT(2147483647)`, Full policy text.
- **content_format**: `SMALLINT(5)`, Format of the content field.
- **name**: `VARCHAR(1333)`, Name of the policy document.
- **optional**: `SMALLINT(5)`, 0 - the policy must be accepted to use the site, 1 - accepting the policy is optional.
- **policy_id**: `BIGINT(19)`, ID of the policy document we are a version of.
- **revision**: `VARCHAR(1333)`, Human readable version of the policy document.
- **summary**: `LONGTEXT(2147483647)`, Policy text summary.
- **summary_format**: `SMALLINT(5)`, Format of the summary field.
- **type**: `SMALLINT(5)`, Type of the policy: 0 - Site policy, 1 - Privacy policy, 2 - Third party policy, 99 - Other.
- **created_at**: `BIGINT(19)`, Timestamp of when the policy version was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the policy version was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last edited this policy document version.
