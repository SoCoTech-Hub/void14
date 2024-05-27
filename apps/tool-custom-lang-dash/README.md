# Tool Custom Language Dash

## Tables

List of Tables with their function described below:

### Table: tool_customlangs

Contains the working checkout of all strings and their customizations.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **component_id**: `BIGINT(19)`, The ID of the component.
- **lang**: `VARCHAR(20)`, The code of the language this string belongs to, e.g., en, cs, or es.
- **local**: `LONGTEXT(2147483647)`, Local customization of the string, null if not customized.
- **master**: `LONGTEXT(2147483647)`, Master translation of the string as distributed in the official lang pack, null if not translated.
- **modified**: `SMALLINT(5)`, Indicates if the string has been modified via the translator (default 0).
- **original**: `LONGTEXT(2147483647)`, English original of the string.
- **outdated**: `SMALLINT(5)`, Indicates if the customization may be outdated due to changes in the original or master translation (default 0).
- **string_id**: `VARCHAR(255)`, The identifier of the string.
- **customized_at**: `BIGINT(19)`, Timestamp of when the local translation was recently modified, null if not customized yet.
- **created_at**: `BIGINT(19)`, Timestamp of when the original or master was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the original or master was recently modified.

---

### Table: tool_customlang_components

Contains the list of all installed plugins that provide their own strings.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **name**: `VARCHAR(255)`, The normalized name of the plugin.
- **version**: `VARCHAR(255)`, The checked out version of the plugin, null if the version is unknown.
