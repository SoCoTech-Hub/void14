# User Dash

## Tables

This README provides an overview of the tables in the User Dash application, along with their fields and functions.

### Table: users

Each record represents one person.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the user.
- **username**: `VARCHAR(100)`, The user's username.
- **password**: `VARCHAR(255)`, The user's password.
- **first_name**: `VARCHAR(100)`, The user's first name.
- **last_name**: `VARCHAR(100)`, The user's last name.
- **email**: `VARCHAR(100)`, The user's email address.
- **city**: `VARCHAR(120)`, The city where the user is located.
- **country**: `VARCHAR(2)`, The country code for the user's country.
- **lang**: `VARCHAR(30)`, The user's preferred language.
- **timezone**: `VARCHAR(100)`, The user's timezone.
- **first_access**: `BIGINT(19)`, Timestamp of the user's first access.
- **last_access**: `BIGINT(19)`, Timestamp of the user's last access.
- **last_login**: `BIGINT(19)`, Timestamp of the user's last login.
- **current_login**: `BIGINT(19)`, Timestamp of the user's current login.
- **last_ip**: `VARCHAR(45)`, The user's last IP address.
- **picture**: `BIGINT(19)`, Indicates if the user has uploaded a picture.
- **description**: `LONGTEXT(2147483647)`, Description or biography of the user.
- **description_format**: `TINYINT(3)`, Format of the description.
- **mail_display**: `TINYINT(3)`, Mail display settings.
- **mail_format**: `BOOLEAN(1)`, Mail format (0 for plain text, 1 for HTML).
- **auto_subscribe**: `BOOLEAN(1)`, Auto-subscribe to forums.
- **track_forums**: `BOOLEAN(1)`, Track forum posts.
- **trust_bitmask**: `BIGINT(19)`, Trust bitmask.
- **profile**: `VARCHAR(255)`, Moodle.net profile information.
- **confirmed**: `BOOLEAN(1)`, Whether the account is confirmed.
- **deleted**: `BOOLEAN(1)`, Whether the account is deleted.
- **suspended**: `BOOLEAN(1)`, Whether the account is suspended.
- **policy_agreed**: `BOOLEAN(1)`, Whether the user agreed to the policy.
- **phone1**: `VARCHAR(20)`, Primary phone number.
- **phone2**: `VARCHAR(20)`, Secondary phone number.
- **institution**: `VARCHAR(255)`, Institution.
- **department**: `VARCHAR(255)`, Department.
- **address**: `VARCHAR(255)`, Address.
- **alternate_name**: `VARCHAR(255)`, Alternate name.
- **first_name_phonetic**: `VARCHAR(255)`, Phonetic first name.
- **last_name_phonetic**: `VARCHAR(255)`, Phonetic last name.
- **middle_name**: `VARCHAR(255)`, Middle name.
- **auth**: `VARCHAR(20)`, Authentication method.
- **secret**: `VARCHAR(15)`, Secret.
- **image_alt**: `VARCHAR(255)`, Alternative text for user image.
- **calendar_type**: `VARCHAR(30)`, Calendar type.
- **lang**: `VARCHAR(30)`, Language.
- **email_stop**: `BOOLEAN(1)`, Stop email.
- **mail_digest**: `BOOLEAN(1)`, Mail digest.
- **theme**: `VARCHAR(50)`, Theme.
- **created_at**: `BIGINT(19)`, Timestamp of account creation.
- **updated_at**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: user_devices

This table stores user’s mobile devices information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the device.
- **app_id**: `VARCHAR(128)`, The app ID, usually something like com.moodle.moodlemobile.
- **push_id**: `VARCHAR(255)`, The device push token/key/identifier/registration ID.
- **model**: `VARCHAR(32)`, The device model, e.g., Nexus 4 or iPad 1,1.
- **name**: `VARCHAR(32)`, The device name, e.g., occam or iPhone.
- **platform**: `VARCHAR(32)`, The device platform, e.g., Android or iOS.
- **uuid**: `VARCHAR(255)`, The device vendor UUID.
- **version**: `VARCHAR(32)`, The device version, e.g., 6.1.2, 4.2.2.
- **created_at**: `BIGINT(19)`, Timestamp of when the device was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the device was last modified.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_enrolments

Users participating in courses (aka enrolled users).

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the enrolment record.
- **enrolid**: `BIGINT(19)`, Foreign key reference to the enrolment method.
- **status**: `BIGINT(19)`, Status of the enrolment (0 means active participation).
- **time_start**: `BIGINT(19)`, Timestamp when enrolment starts.
- **time_end**: `BIGINT(19)`, Timestamp when enrolment ends.
- **modifier_id**: `BIGINT(19)`, ID of the user who modified the enrolment.
- **created_at**: `BIGINT(19)`, Timestamp of enrolment creation.
- **updated_at**: `BIGINT(19)`, Timestamp of last modification.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_info_categories

Customisable fields categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the category.
- **name**: `VARCHAR(255)`, Category name.
- **sort_order**: `INT(3)`, Display order of the category.

---

### Table: user_info_datas

Data for the customisable user fields.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the data record.
- **field_id**: `BIGINT(19)`, Foreign key reference to the field.
- **data**: `LONGTEXT(2147483647)`, The data for the custom field.
- **data_format**: `TINYINT(3)`, Format of the data.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_info_fields

Customisable user profile fields.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the field.
- **categoryid**: `BIGINT(19)`, Foreign key reference to the category.
- **shortname**: `VARCHAR(255)`, Short name for the field.
- **name**: `LONGTEXT(2147483647)`, Field name.
- **data_type**: `VARCHAR(255)`, Type of data held in this field.
- **description**: `LONGTEXT(2147483647)`, Description of the field.
- **descriptionformat**: `TINYINT(3)`, Format of the description.
- **defaultdata**: `LONGTEXT(2147483647)`, Default value for the field.
- **defaultdataformat**: `TINYINT(3)`, Format of the default data.
- **param1**: `LONGTEXT(2147483647)`, General parameter field.
- **param2**: `LONGTEXT(2147483647)`, General parameter field.
- **param3**: `LONGTEXT(2147483647)`, General parameter field.
- **param4**: `LONGTEXT(2147483647)`, General parameter field.
- **param5**: `LONGTEXT(2147483647)`, General parameter field.
- **visible**: `SMALLINT(1)`, Visibility of the field (private, public, hidden).
- **required**: `BOOLEAN(1)`, Whether the field is required.
- **locked**: `BOOLEAN(1)`, Whether the field is locked.
- **force_unique**: `BOOLEAN(1)`, Whether the field should contain unique data.
- **signup**: `BOOLEAN(1)`, Whether to display the field on the signup page.
- **sort_order**: `INT(3)`, Order within the category.

---

### Table: user_last_accesses

To keep track of course page access times, used in online participation reports.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, Foreign key reference to the course.
- **created_at**: `BIGINT(19)`, Timestamp of the first access to the course.
- **updated_at**: `BIGINT(19)`, Timestamp of the last access to the course.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_password_histories

A rotating log of hashes of previously used passwords for each user.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **hash**: `VARCHAR(255)`, Hash of the previously used password.
- **created_at**: `BIGINT(19)`, Timestamp when the password was created.
- **updated_at**: `BIGINT(19)`, Timestamp when the password was updated.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_password_resets

Tracking password reset confirmation tokens.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **token**: `VARCHAR(32)`, Secret set and emailed to user.
- **created_at**: `BIGINT(19)`, Timestamp when the password reset was requested.
- **updated_at**: `BIGINT(19)`, Timestamp when the password reset was re-requested.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_preferences

Allows modules to store arbitrary user preferences.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the preference.
- **name**: `VARCHAR(255)`, Name of the preference.
- **value**: `VARCHAR(1333)`, Value of the preference.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.

---

### Table: user_private_keys

Access keys used in cookieless scripts (e.g., RSS).

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the key.
- **script**: `VARCHAR(128)`, Plugin, module - unique identifier.
- **value**: `VARCHAR(128)`, Private access key value.
- **instance**: `BIGINT(19)`, Optional instance ID.
- **ip_restriction**: `VARCHAR(255)`, IP restriction.
- **validuntil**: `BIGINT(19)`, Timestamp until the key is valid.
- **created_at**: `BIGINT(19)`, Timestamp of key creation.
- **updated_at**: `BIGINT(19)`, Timestamp of key updated.
- **user_id**: `BIGINT(19)`, Foreign key reference to the user.
