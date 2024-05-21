# Custom Field Management

## Tables

This README provides an overview of the tables in the Custom Field Management application, along with their fields and functions.

### Table: custom_field_categories

This table stores core custom field category information.

#### Fields

- **id**: BIGINT(19)
- **area**: VARCHAR(100)
- **component**: VARCHAR(100)
- **context_id**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **description_format**: BIGINT(19)
- **item_id**: BIGINT(19)
- **name**: VARCHAR(400)
- **sort_order**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: custom_field_datas

This table stores core custom field data.

#### Fields

- **id**: BIGINT(19)
- **char_value**: VARCHAR(1333)
- **context_id**: BIGINT(19)
- **dec_value**: DECIMAL(10)
- **field_id**: BIGINT(19)
- **instance_id**: BIGINT(19)
- **int_value**: BIGINT(19)
- **short_char_value**: VARCHAR(255)
- **value**: LONGTEXT(2147483647)
- **value_format**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: custom_field_fields

This table stores core custom field information.

#### Fields

- **id**: BIGINT(19)
- **category_id**: BIGINT(19)
- **config_data**: LONGTEXT(2147483647)
- **description**: LONGTEXT(2147483647)
- **description_format**: BIGINT(19)
- **name**: VARCHAR(400)
- **short_name**: VARCHAR(100)
- **sort_order**: BIGINT(19)
- **type**: VARCHAR(100)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
