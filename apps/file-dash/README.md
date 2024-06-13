### Table: file_conversions

#### Description

The `file_conversion` table tracks the conversion process of files within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file conversion record.
- **converter**: `VARCHAR(255)`, Name of the converter used for the file conversion.
- **data**: `LONGTEXT`, Additional data related to the conversion process.
- **dest_file_id**: `BIGINT(19)`, ID of the destination file after conversion.
- **source_file_id**: `BIGINT(19)`, ID of the source file to be converted.
- **status**: `BIGINT(19)`, Status of the file conversion process (e.g., 0 for pending, 1 for completed).
- **status_message**: `LONGTEXT`, Message describing the status or errors of the conversion.
- **target_format**: `VARCHAR(100)`, The target format for the conversion.
- **time_created**: `BIGINT(19)`, Timestamp when the file conversion record was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the file conversion record was last modified.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the record.

### Table: files

#### Description

The `files` table contains metadata about files stored in Moodle. The actual file content is stored in a SHA1-based file pool.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file record.
- **author**: `VARCHAR(255)`, The original author of the file.
- **component**: `VARCHAR(100)`, Full name of the component owning the area (e.g., "mod_forum").
- **contenthash**: `VARCHAR(40)`, SHA1 hash of the file content.
- **context_id**: `BIGINT(19)`, The context ID defined in the context table, identifying the instance of the plugin owning the file.
- **file_area**: `VARCHAR(50)`, Area within the component where the file belongs (e.g., "coursefiles").
- **file_name**: `VARCHAR(255)`, Full Unicode name of the file.
- **file_path**: `VARCHAR(255)`, Relative path to the file from the module content root.
- **file_size**: `BIGINT(19)`, Size of the file in bytes.
- **item_id**: `BIGINT(19)`, Optional plugin-specific item ID (e.g., forum post ID).
- **license**: `VARCHAR(255)`, License of the file to guide reuse.
- **mime_type**: `VARCHAR(100)`, MIME type of the file (e.g., "image/jpeg").
- **path_name_hash**: `VARCHAR(40)`, SHA1 hash of the complete file path, unique for each file.
- **reference_file_id**: `BIGINT(19)`, ID of the referenced file if the file is a proxy for a repository file.
- **sort_order**: `BIGINT(19)`, Order of files.
- **source**: `LONGTEXT`, Reference information if the file is imported from external sites.
- **status**: `BIGINT(19)`, Status of the file (e.g., 0 for normal, greater than 0 if there's an issue).
- **time_created**: `BIGINT(19)`, Timestamp when the file record was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the file record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user associated with the file.

### Table: files_references

#### Description

The `files_reference` table stores references to external files managed by repositories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file reference record.
- **last_sync**: `BIGINT(19)`, Last time the proxy file was synced with the repository.
- **reference**: `LONGTEXT`, Identification of the external file.
- **reference_hash**: `VARCHAR(40)`, SHA1 hash of the reference field, used for comparison.
- **repository_id**: `BIGINT(19)`, ID of the repository where the file is stored.

---

This documentation provides a detailed overview of the `file_conversion`, `files`, and `files_reference` tables and their fields within the Moodle system, facilitating better understanding and usage of file management functionality.
