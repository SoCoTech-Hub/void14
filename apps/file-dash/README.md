### Table: file_conversion

#### Description

The `file_conversion` table tracks the conversion process of files within Moodle.

#### Fields

- **converter**: `VARCHAR(255)`, Name of the converter used for the file conversion.
- **data**: `LONGTEXT`, Additional data related to the conversion process.
- **destfileid**: `BIGINT(19)`, ID of the destination file after conversion.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file conversion record.
- **sourcefileid**: `BIGINT(19)`, ID of the source file to be converted.
- **status**: `BIGINT(19)`, Status of the file conversion process (e.g., 0 for pending, 1 for completed).
- **statusmessage**: `LONGTEXT`, Message describing the status or errors of the conversion.
- **targetformat**: `VARCHAR(100)`, The target format for the conversion.
- **timecreated**: `BIGINT(19)`, Timestamp when the file conversion record was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the file conversion record was last modified.
- **usermodified**: `BIGINT(19)`, ID of the user who last modified the record.

### Table: files

#### Description

The `files` table contains metadata about files stored in Moodle. The actual file content is stored in a SHA1-based file pool.

#### Fields

- **author**: `VARCHAR(255)`, The original author of the file.
- **component**: `VARCHAR(100)`, Full name of the component owning the area (e.g., "mod_forum").
- **contenthash**: `VARCHAR(40)`, SHA1 hash of the file content.
- **contextid**: `BIGINT(19)`, The context ID defined in the context table, identifying the instance of the plugin owning the file.
- **filearea**: `VARCHAR(50)`, Area within the component where the file belongs (e.g., "coursefiles").
- **filename**: `VARCHAR(255)`, Full Unicode name of the file.
- **filepath**: `VARCHAR(255)`, Relative path to the file from the module content root.
- **filesize**: `BIGINT(19)`, Size of the file in bytes.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file record.
- **itemid**: `BIGINT(19)`, Optional plugin-specific item ID (e.g., forum post ID).
- **license**: `VARCHAR(255)`, License of the file to guide reuse.
- **mimetype**: `VARCHAR(100)`, MIME type of the file (e.g., "image/jpeg").
- **pathnamehash**: `VARCHAR(40)`, SHA1 hash of the complete file path, unique for each file.
- **referencefileid**: `BIGINT(19)`, ID of the referenced file if the file is a proxy for a repository file.
- **sortorder**: `BIGINT(19)`, Order of files.
- **source**: `LONGTEXT`, Reference information if the file is imported from external sites.
- **status**: `BIGINT(19)`, Status of the file (e.g., 0 for normal, greater than 0 if there's an issue).
- **timecreated**: `BIGINT(19)`, Timestamp when the file record was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the file record was last modified.
- **userid**: `BIGINT(19)`, ID of the user associated with the file.

### Table: files_reference

#### Description

The `files_reference` table stores references to external files managed by repositories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the file reference record.
- **lastsync**: `BIGINT(19)`, Last time the proxy file was synced with the repository.
- **reference**: `LONGTEXT`, Identification of the external file.
- **referencehash**: `VARCHAR(40)`, SHA1 hash of the reference field, used for comparison.
- **repositoryid**: `BIGINT(19)`, ID of the repository where the file is stored.

---

This documentation provides a detailed overview of the `file_conversion`, `files`, and `files_reference` tables and their fields within the Moodle system, facilitating better understanding and usage of file management functionality.
