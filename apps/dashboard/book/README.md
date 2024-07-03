# Book Management

## Tables

This README provides an overview of the tables in the Book Management application, along with their fields and functions.

### Table: book

This table defines a book.

#### Fields

- **id**: BIGINT(19)
- **course**: BIGINT(19)
- **customtitles**: TINYINT(3) \* Default: 0.
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 0.
- **name**: VARCHAR(255)
- **navstyle**: SMALLINT(5) \* Default: 1.
- **numbering**: SMALLINT(5) \* Default: 0.
- **revision**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)

### Table: book_chapters

This table defines book chapters.

#### Fields

- **id**: BIGINT(19)
- **bookid**: BIGINT(19)
- **content**: LONGTEXT(2147483647)
- **contentformat**: SMALLINT(5) \* Default: 0.
- **hidden**: TINYINT(3) \* Default: 0.
- **importsrc**: VARCHAR(255)
- **pagenum**: BIGINT(19)
- **subchapter**: BIGINT(19)
- **title**: VARCHAR(255)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
