# Wiki Dash

## Tables

![Relationships Diagram](RelationshipsDiagram.png)
List of Tables with their function described below:

### wikis

Stores Wiki activity configuration

#### Fields

- id
- course_id \* Course wiki activity belongs to
- default_format \* Wiki’s default editor
- edit_begin
- edit_end
- first_page_title \* Wiki first page’s name
- force_format \* Forces the default editor
- intro \* General introduction of the wiki activity
- intro_format \* Format of the intro field (MOODLE, HTML, MARKDOWN…)
- name \* name field for moodle instances
- wiki_mode \* Wiki mode (individual, collaborative)
- created_at
- updated_at

### wiki_links

Page wiki links

#### Fields

- id
- from_page_id \* Page id with a link
- sub_wiki_id \* Subwiki instance
- to_missing_page \* link to a nonexistent page
- to_page_id \* Page id that recives a link

### wiki_locks

Manages page locks

#### Fields

- id
- locke_dat
- page_id
- section_name
- user_id

### wiki_pages

Stores wiki pages

#### Fields

- id
- cached_content \* Cache wiki content
- page_views \* Number of page views
- read_only \* Read only flag
- sub_wiki_id \* Subwiki instance of this page
- time_rendered \* Last render timestamp
- title \* Page name
- created_at \* Wiki page creation timestamp
- updated_at \* page edition timestamp
- userid \* Edition author

### wiki_subwikis

Stores subwiki instances

#### Fields

- id
- group_id \* Group that owns this wiki
- wiki_id \* Wiki activity
- user_id \* Owner of that subwiki

### wiki_synonyms

Stores wiki pages synonyms

#### Fields

- id
- page_id \* Original page
- page_synonym \* Page name synonym
- sub_wiki_id \* Subwiki instance

### wiki_versions

Stores wiki page history

#### Fields

- id
- content \* Not parsed wiki content
- content_format \* Markup used to write content
- page_id \* Page id
- version \* Wiki page version
- created_at \* Page edition timestamp
- updated_at
- user_id \* Edition autor
