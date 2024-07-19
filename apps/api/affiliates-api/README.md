# affiliates Dash

## Tables

List of Tables with their function described below:

### affiliates

This table saves a record of all the affiliates

#### Fields

- id
- is_approved
- note
- user_id

### affiliates_details

this table stores information about the affiliates

#### Fields

- id
- name
- number
- code
- bank
- type
- affiliate_id

### affiliates_settings

fields hold a record of the terms the affiliate has agreed to

#### Fields

- id
- rate
- terms
- is_active
- organization_id

### affiliates_statuses

records more information about the affiliate

#### fields

- id
- name
- color

### affiliates_transactions

records the payments done to affiliates

#### fields

- id
- paid
- balance
- paid_date
- account_number
- affiliate_id
- affiliate_status_id
