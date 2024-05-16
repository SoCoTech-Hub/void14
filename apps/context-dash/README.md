# Context Dash

## Tables

List of Tables with their function described below:

### context

one of these must be set

#### Fields

- id
- context_level
- depth
- instance_id
- locked */Whether this context and its children are locked
- path



### context_temp

Used by build_context_path() in upgrade and cron to keep con

#### Fields

- id */This id isn’t autonumeric/sequence. It’s the context->id
- depth
- locked */Whether this context and its children are locked
- path
