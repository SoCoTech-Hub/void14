# Content Bank Management

## Tables

This README provides an overview of the tables in the Content Bank Management application, along with their fields and functions.

### Table: contentbank_content

This table stores content data in the content bank.

#### Fields

- **id**: BIGINT(19)
- **config_data**: LONGTEXT(2147483647)
- **content_type**: VARCHAR(100)
- **context_id**: BIGINT(19) \* References context.id.
- **instance_id**: BIGINT(19)
- **name**: VARCHAR(255)
- **usermodified**: BIGINT(19)
- **visibility**: BIT(1) \* Default: 1.
- **created_at**: BIGINT(19) \* Default: 0.
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19) \* The original author of the content.
