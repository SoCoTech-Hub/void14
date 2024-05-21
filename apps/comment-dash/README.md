# Comments Management

## Tables

This README provides an overview of the tables in the Comments Management application, along with their fields and functions.

### Table: comments

This table stores comments for the comments module.

#### Fields

- **id**: BIGINT(19)
- **comment_area**: VARCHAR(255)
- **component**: VARCHAR(255) \* The plugin this comment belongs to.
- **content**: LONGTEXT(2147483647)
- **context_id**: BIGINT(19)
- **format**: TINYINT(3) \* Default: 0.
- **item_id**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **userid**: BIGINT(19)
