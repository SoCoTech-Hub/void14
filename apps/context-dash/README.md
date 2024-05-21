# Context Management

## Tables

This README provides an overview of the tables in the Context Management application, along with their fields and functions.

### Table: context

This table stores context information, one of these must be set.

#### Fields

- **id**: BIGINT(19)
- **contextlevel**: BIGINT(19)
- **depth**: TINYINT(3)
- **instanceid**: BIGINT(19)
- **locked**: TINYINT(3) \* Whether this context and its children are locked.
- **path**: VARCHAR(255)

### Table: context_temp

This table is used by `build_context_path()` in upgrade and cron to keep context paths temporarily.

#### Fields

- **id**: BIGINT(19) \* This id isn’t autonumeric/sequence. It’s the context->id.
- **depth**: TINYINT(3)
- **locked**: TINYINT(3) \* Default: 0. Whether this context and its children are locked.
- **path**: VARCHAR(255)
