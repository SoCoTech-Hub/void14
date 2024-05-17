# User Dash

## Tables

This README provides an overview of the tables in the User Dash application, along with their fields and functions.

### Table: users

This table contains records for each person in the system.

#### Fields

- **id**: VARCHAR(19)
- **address**: VARCHAR(255)
- **alternate_name**: VARCHAR(255) \* Alternate name (useful for three-name countries)
- **auth**: VARCHAR(20)
- **auto_subscribe**: BOOLEAN(1)
- **calendar_type**: VARCHAR(30)
- **city**: VARCHAR(120)
- **confirmed**: BOOLEAN(1)
- **country**: VARCHAR(2)
- **current_login**: DATETIME
- **deleted**: BOOLEAN(1)
- **department**: VARCHAR(255)
- **description**: LONGTEXT
- **description_format**: NUMBER(3)
- **email**: VARCHAR(100)
- **email_stop**: BOOLEAN(1)
- **first_access**: DATETIME
- **first_name**: VARCHAR(100)
- **middle_name**: VARCHAR(255) \* Middle name
- **last_name**: VARCHAR(100)
- **first_name_phonetic**: VARCHAR(255) \* First name phonetic
- **last_name_phonetic**: VARCHAR(255) \* Last name phonetic
- **id_number**: VARCHAR(255)
- **image_alt**: VARCHAR(255) \* Alt tag for user uploaded image
- **institution**: VARCHAR(255)
- **lang**: VARCHAR(30)
- **last_access**: DATETIME
- **last_ip**: VARCHAR(45)
- **last_login**: DATETIME
- **mail_digest**: BOOLEAN(1)
- **mail_display**: NUMBER(3)
- **mail_format**: BOOLEAN(1)
- **mnet_host_id**: DATETIME
- **moodle_net_profile**: VARCHAR(255) \* Moodle.net profile information
- **password**: VARCHAR(255)
- **phone1**: VARCHAR(20)
- **phone2**: VARCHAR(20)
- **picture**: VARCHAR(255) \* Means no image uploaded. Positive values are revisions that prevent caching - problems, and negative values are reserved for future use.
- **policy_agreed**: BOOLEAN(1)
- **secret**: VARCHAR(15)
- **suspended**: BOOLEAN(1) \* Suspended flag prevents users from logging in
- **theme**: VARCHAR(50)
- **time_zone**: VARCHAR(100)
- **track_forums**: BOOLEAN(1)
- **trust_bit_mask**: VARCHAR(19)
- **username**: VARCHAR(100)
- **created_at**: DATETIME
- **updated_at**: DATETIME

### Table: user_devices

This table stores information about the user's mobile devices.

#### Fields

- **id**: VARCHAR(19)
- **app_id**: VARCHAR(128) \* The app id, usually something like com.moodle.moodlemobile
- **model**: VARCHAR(32) \* The device model, e.g., Nexus 4 or iPad 1,1
- **name**: VARCHAR(32) \* The device name, e.g., Occam or iPhone
- **platform**: VARCHAR(32) \* The device platform, e.g., Android or iOS
- **push_id**: VARCHAR(255) \* The device PUSH token/key/identifier/registration id
- **uuid**: VARCHAR(255) \* The device vendor UUID
- **version**: VARCHAR(32) \* The device version, e.g., 6.1.2 or 4.2.2
- **created_at**: DATETIME
- **updated_at**: DATETIME
- **user_id**: VARCHAR(19)

### Table: user_enrolments

This table tracks users' participation in courses.

#### Fields

- **id**: VARCHAR(19)
- **enrol_id**: VARCHAR(19)
- **modifier_id**: VARCHAR(19)
- **status**: VARCHAR(19) _0..9 are system constants. 0 means active participation. See ENROL_PARTICIPATION constants. Plugins may define their own status greater than 10._
- **time_start**: DATETIME
- **time_end**: DATETIME
- **created_at**: DATETIME
- **updated_at**: DATETIME
- **user_id**: VARCHAR(19)

### Table: user_info_categories

This table defines customizable field categories.

#### Fields

- **id**: VARCHAR(19)
- **name**: VARCHAR(255) \* Category name
- **sort_order**: VARCHAR(19) \* Display order

### Table: user_info_datas

This table stores data for customizable user fields.

#### Fields

- **id**: VARCHAR(19)
- **data**: LONGTEXT \* Field data
- **data_format**: NUMBER(3)
- **field_id**: VARCHAR(19)
- **user_id**: VARCHAR(19)

### Table: user_info_fields

This table defines customizable user profile fields.

#### Fields

- **id**: VARCHAR(19)
- **category_id**: VARCHAR(19) \* ID from the category table
- **data_type**: VARCHAR(255) \* Type of data held in this field
- **default_data**: LONGTEXT \* Default value for this field
- **default_data_format**: NUMBER(3)
- **description**: LONGTEXT \* Description of the field
- **description_format**: NUMBER(3)
- **force_unique**: NUMBER(3) \* Should the field contain unique data
- **locked**: NUMBER(3) \* Field locked
- **name**: LONGTEXT \* Field name
- **param1-5**: LONGTEXT \* General parameter fields
- **required**: NUMBER(3) _0 Field required_
- **short_name**: VARCHAR(255) _Short name for each field_
- **signup**: NUMBER(3) _0 Display field on signup page_
- **sort_order**: VARCHAR(19) _Order within the category_
- **visible**: SMALLINT _Visibility: private, public, hidden_

### Table: user_last_accesses

This table tracks course page access times.

#### Fields

- **id**: VARCHAR(19)
- **course_id**: VARCHAR(19)
- **time_access**: DATETIME
- **user_id**: VARCHAR(19)

### Table: user_password_histories

This table stores a rotating log of hashes of previously used passwords.

#### Fields

- **id**: VARCHAR(19)
- **hash**: VARCHAR(255)
- **created_at**: DATETIME
- **updated_at**: DATETIME
- **user_id**: VARCHAR(19)

### Table: user_password_resets

This table tracks password reset confirmation tokens.

#### Fields

- **id**: VARCHAR(19)
- **token**: VARCHAR(32) _Secret set and emailed to user_
- **created_at**: DATETIME _The time that the user first requested this password reset_
- **updated_at**: DATETIME _The time the user re-requested the password reset_
- **user_id**: VARCHAR(19) _ID of the user account which requester claimed to be_

### Table: user_preferences

This table allows modules to store arbitrary user preferences.

#### Fields

- **id**: VARCHAR(19)
- **name**: VARCHAR(255)
- **user_id**: VARCHAR(19)
- **value**: VARCHAR(1333)

### Table: user_private_keys

This table stores access keys used in cookieless scripts.

#### Fields

- **id**: VARCHAR(19)
- **instance**: VARCHAR(19) \* Optional instance id
- **iprestriction**: VARCHAR(255) \* IP restriction
- **script**: VARCHAR(128) _Plugin, module - unique identifier_
- **created_at**: DATETIME \* Created timestamp
- **user_id**: VARCHAR(19) _Owner_
- **validuntil**: DATETIME \* Valid until data
- **value**: VARCHAR(128) _Private access key value_
