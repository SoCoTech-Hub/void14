# Auth

Accounts linked to a users account.

## Tables

List of Tables with their function described below:

### auth_lti_linked_logins

Accounts linked to a users account.

#### Fields

- id
- issuer
- issuer_256 \* SHA256 hash of the issuer from which the platform user originates.
- sub
- sub_256 \* SHA256 hash of the subject identifying the user for the issuer.
- created_at
- updated_at
- userid

### auth_oauth2_linked_login

Accounts linked to a users account.

#### Fields

- id
- confirm_token \* If this is not empty - the user has not confirmed their email to create the link.
- confirm_token_expires
- email \* The external email to map to this account
- issuer_id
- user_modified_id
- user_name \* The external username to map to this account
- created_at
- updated_at
- userid \* The user account this oauth login is linked to.
