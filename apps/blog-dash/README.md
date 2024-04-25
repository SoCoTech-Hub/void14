# Blog - Dash

Blog articles for the platform

## Tables

List of Tables with their function described below:

### blog_associations

Associations of blog entries with courses and module instanc

#### Fields

- id
- blog_id
- context_id

### blog_externals

External blog links used for RSS copying of blog entries to

#### Fields

- id
- description
- failed_last_sync \* Whether or not the last sync failed for some reason
- filter_tags \* Comma-separated list of tags that will be used to filter which entries are copied over from the external blog. They refer to existing tags in the external blog.
- name
- url
- created_at
- updated_at
- user_id
