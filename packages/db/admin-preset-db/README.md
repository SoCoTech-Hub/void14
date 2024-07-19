# Admin Preset Dashboard

## Tables

This README provides an overview of the tables in the Admin Presets application, along with their fields and functions.

### Table: adminpresets

This table stores presets data.

#### Fields

- **author**: VARCHAR(255)
- **comments**: LONGTEXT(2147483647)
- **id**: BIGINT(19)
- **iscore**: BIT(1) \* Whether this is a core preset or not, and which core preset
- **moodlerelease**: VARCHAR(255)
- **moodleversion**: VARCHAR(20)
- **name**: VARCHAR(255)
- **site**: VARCHAR(255)
- **timecreated**: BIGINT(19)
- **timeimported**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: adminpresets_app

This table stores applied presets.

#### Fields

- **adminpresetid**: BIGINT(19)
- **id**: BIGINT(19)
- **time**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: adminpresets_app_it

This table stores admin presets applied items.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **configlogid**: BIGINT(19)
- **id**: BIGINT(19)

### Table: adminpresets_app_it_a

This table stores attributes of the applied items.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **configlogid**: BIGINT(19)
- **id**: BIGINT(19)
- **itemname**: VARCHAR(100) \* Necessary to rollback

### Table: adminpresets_app_plug

This table stores admin presets plugins applied.

#### Fields

- **adminpresetapplyid**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **oldvalue**: SMALLINT(5)
- **plugin**: VARCHAR(100)
- **value**: SMALLINT(5)

### Table: adminpresets_it

This table stores settings.

#### Fields

- **adminpresetid**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100)
- **value**: LONGTEXT(2147483647)

### Table: adminpresets_it_a

This table stores admin presets items attributes.

#### Fields

- **id**: BIGINT(19)
- **itemid**: BIGINT(19)
- **name**: VARCHAR(100)
- **value**: LONGTEXT(2147483647)

### Table: adminpresets_plug

This table stores admin presets plugins status.

#### Fields

- **adminpresetid**: BIGINT(19)
- **enabled**: SMALLINT(5) \* Whether this plugin is currently enabled.
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **plugin**: VARCHAR(100)
