# i18n Dash

## Tables

List of Tables with their function described below:

### localization_languages

This table saves information about languages for localization

#### Fields

- id
- name
- flag
- country_id

### localization_fields

list of field used throughout the platform

#### Fields

- id
- name
- description
- default_value

### localization_translations

fields translated to localized language

#### Fields

- id
- localization_field_id
- localization_language_id
- value

### localization_user

#### fields

- id
- localization_language_id