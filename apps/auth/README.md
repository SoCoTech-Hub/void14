# Authentication Dashboard

## Tables

This README provides an overview of the tables in the Authentication application, along with their fields and functions.

### Table: auth_lti_linked_login

This table stores accounts linked to a user's account.

#### Fields

- **id**: BIGINT(19)
- **issuer**: LONGTEXT(2147483647)
- **issuer256**: VARCHAR(64) \* SHA256 hash of the issuer from which the platform user originates.
- **sub**: VARCHAR(255)
- **sub256**: VARCHAR(64) \* SHA256 hash of the subject identifying the user for the issuer.
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **user_id**: BIGINT(19) \* The user account the LTI user is linked to.

### Table: auth_oauth2_linked_login

This table stores accounts linked to a user's account.

#### Fields

- **confirmtoken**: VARCHAR(64) \* If this is not empty - the user has not confirmed their email to create the link.
- **confirmtokenexpires**: BIGINT(19)
- **email**: LONGTEXT(2147483647) \* The external email to map to this Moodle account.
- **id**: BIGINT(19)
- **issuerid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **user_id**: BIGINT(19) \* The user account this OAuth login is linked to.
- **usermodified**: BIGINT(19)
- **username**: VARCHAR(255) \* The external username to map to this Moodle account.
