# Badge - Dash

Badges for achievements on the platform

## Tables

List of Tables with their function described below:

### badges

Defines badge

#### Fields

- id
- attachment \* Attach baked badge for download
- course_id
- description
- expire_date
- expire_period
- image_author_email
- image_author_name
- image_author_url
- image_caption
- issuer_contact
- issuer_name
- issuer_url
- language
- message
- message_subject
- name
- next_cron
- notification \* Message when badge is awarded
- status \* Badge status: 0 = inactive, 1 = active, 2 = active+locked, 3 = inactive+locked, 4 = archived
- type \* 1 = site, 2 = course
- version
- created_at
- updated_at
- user_id

### badge_alignments

Defines alignment for badges

#### Fields

- id
- badge_id
- target_code
- target_description
- target_framework
- target_name
- target_url

### badge_backpacks

Defines settings for connecting external backpack

#### Fields

- id
- auto_sync
- backpack_uid
- email
- external_backpack_id
- password
- user_id

### badge_backpack_oauth2s

Default comment for the table, please edit me

#### Fields

- id
- expires
- external_backpack_id
- issuer_id
- refresh_token
- scope
- token
- created_at
- updated_at
- user_id

### badge_criterias

Defines criteria for issuing badges

#### Fields

- id
- badge_id
- criteria_type \* The criteria type we are aggregating
- description
- description_format
- method \* 1 = all, 2 = any

### badge_criteria_mets

Defines criteria that were met for an issued badge

#### Fields

- id
- crit_id
- date_met
- issued_id
- user_id

### badge_criteria_params

Defines parameters for badges criteria

#### Fields

- id
- crit_id
- name
- value

### badge_endorsements

Defines endorsement for badge

#### Fields

- id
- badge_id
- claim_comment
- claim_id
- date_issued
- issuer_email
- issuer_name
- issuer_url

### badge_externals

Setting for external badges display

#### Fields

- id
- assertion \* Assertion of external badge
- backpack_id \* ID of a backpack
- collection_id \* Badge collection id in the backpack
- entity_id

### badge_external_backpacks

Defines settings for site level backpacks that a user can co

#### Fields

- id
- api_version
- backpack_api_url
- backpack_web_url
- oauth2_issuer_id \* OAuth 2 Issuer
- sort_order

### badge_external_identifiers

Setting for external badges mappings

#### Fields

- id
- external_id
- internal_id
- site_backpack_id \* ID of a badge backpack
- type

### badge_issues

Defines issued badges

#### Fields

- id
- badge_id
- date_expire
- date_issued
- issuer_notified
- unique_hash
- visible
- user_id

### badge_manual_awards

Track manual award criteria for badges

#### Fields

- id
- badge_id
- date_met
- issuer_id
- issuer_role
- recipient_id

### badge_relateds

Defines badge related for badges

#### Fields

- id
- badge_id
- related_badge_id
