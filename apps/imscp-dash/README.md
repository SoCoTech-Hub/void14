### Table: imscp

Stores information about each IMS CP (Content Package) resource in the system.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the IMS CP resource.
- **course**: `BIGINT(19)`, The ID of the course that this IMS CP resource belongs to.
- **intro**: `LONGTEXT` (nullable), Introduction or description of the IMS CP resource.
- **introformat**: `SMALLINT(5)`, Format of the `intro` field (e.g., plain text, HTML).
- **keepold**: `BIGINT(19)`, Counter incremented after each file change to solve browser caching issues. Default value is -1.
- **name**: `VARCHAR(255)`, The name of the IMS CP resource.
- **revision**: `BIGINT(19)`, Counter incremented after each file change to solve browser caching issues. Default value is 0.
- **structure**: `LONGTEXT` (nullable), Structure of the IMS CP resource, stored in a long text format.
- **created_at**: `BIGINT(19)`, Timestamp of the creation.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification.

---

This table `imscp` is designed to handle IMS Content Packages, with fields to store essential information like course association, introduction, structure, and mechanisms to manage file revisions and caching issues.
