### Table: h5ps **

Stores H5P content information.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the H5P content.
- **content_hash**: `VARCHAR(40)`, Defines the hash for the file content.
- **display_options**: `SMALLINT(5)` (nullable), H5P Button display options.
- **filtered**: `LONGTEXT` (nullable), Filtered version of `json_content`.
- **json_content**: `LONGTEXT`, The content in JSON format.
- **main_library_id**: `BIGINT(19)`, The library instantiated for this node.
- **path_name_hash**: `VARCHAR(40)`, Defines the complete unique hash for the file path where the H5P content was added.
- **time_created**: `BIGINT(19)`, Timestamp of when the content was created.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: h5p_contents_libraries **

Stores which library is used in which content.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **dependency_type**: `VARCHAR(10)`, The type of dependency (e.g., dynamic, preloaded, or editor).
- **drop_css**: `BIT(1)`, Indicates if the preloaded CSS from the dependency is to be excluded.
- **h5p_id**: `BIGINT(19)`, Identifier for the H5P content.
- **library_id**: `BIGINT(19)`, Identifier of the H5P library used by the content.
- **weight**: `BIGINT(19)`, Determines the order in which the preloaded libraries will be loaded.

---

### Table: h5p_libraries **

Stores information about libraries used by H5P content.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the library.
- **add_to**: `LONGTEXT` (nullable), Plugin configuration data.
- **core_major**: `SMALLINT(5)` (nullable), H5P core API major version required.
- **core_minor**: `SMALLINT(5)` (nullable), H5P core API minor version required.
- **drop_library_css**: `LONGTEXT` (nullable), List of libraries that should not have CSS included if this library is used.
- **embed_types**: `VARCHAR(255)`, List of supported embed types.
- **enabled**: `BIT(1)` (nullable), Defines if this library is enabled (1) or not (0).
- **example**: `LONGTEXT` (nullable), Example URL.
- **full_screen**: `BIT(1)`, Display full_screen button.
- **machine_name**: `VARCHAR(255)`, The library machine name.
- **major_version**: `SMALLINT(5)`, Major version of the library.
- **meta_data_settings**: `LONGTEXT` (nullable), Library metadata settings.
- **minor_version**: `SMALLINT(5)`, Minor version of the library.
- **patch_version**: `SMALLINT(5)`, Patch version of the library.
- **pre_loaded_css**: `LONGTEXT` (nullable), Comma-separated list of stylesheets to load.
- **pre_loaded_js**: `LONGTEXT` (nullable), Comma-separated list of scripts to load.
- **runnable**: `BIT(1)`, Can this library be started by the module?
- **semantics**: `LONGTEXT` (nullable), The semantics definition in JSON format.
- **title**: `VARCHAR(255)`, The human-readable name of this library.
- **tutorial**: `LONGTEXT` (nullable), Tutorial URL.

---

### Table: h5p_libraries_cachedassets **

Stores H5P cached library assets.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **hash**: `VARCHAR(255)`, Cache hash key that this library is part of.
- **library_id**: `BIGINT(19)`, ID of the library.

---

### Table: h5p_library_dependencies **

Stores H5P library dependencies.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **dependency_type**: `VARCHAR(255)`, The type of dependency (e.g., preloaded, dynamic, or editor).
- **library_id**: `BIGINT(19)`, ID of the H5P library.
- **required_library_id**: `BIGINT(19)`, The dependent library to load.

---

### Table: h5pactivities **

Stores the h5pactivity activity module instances.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the activity instance.
- **course**: `BIGINT(19)`, ID of the course this activity is part of.
- **display_options**: `SMALLINT(5)`, H5P Button display options.
- **enable_tracking**: `BIT(1)`, Enable xAPI tracking.
- **grade**: `BIGINT(19)` (nullable), Grade associated with the activity.
- **grade_method**: `SMALLINT(5)`, Which H5P attempt is used for grading.
- **intro**: `LONGTEXT` (nullable), Activity description.
- **intro_format**: `SMALLINT(5)`, Format of the intro field.
- **name**: `VARCHAR(255)`, Name of the activity module instance.
- **review_mode**: `SMALLINT(5)` (nullable), Review mode setting.
- **time_created**: `BIGINT(19)`, Timestamp of when the instance was added to the course.
- **time_modified**: `BIGINT(19)`, Timestamp of when the instance was last modified.

---

### Table: h5pactivity_attempts **

Stores users' attempts inside H5P activities.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **attempt**: `MEDIUMINT(7)`, Attempt number.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **duration**: `BIGINT(19)` (nullable), Number of seconds invested in that attempt.
- **h5p_activity_id**: `BIGINT(19)`, H5P activity ID.
- **max_score**: `BIGINT(19)` (nullable), Maximum score achieved.
- **raw_score**: `BIGINT(19)` (nullable), Raw score achieved.
- **scaled**: `DECIMAL(10)`, Scaled score (0..1) reflecting the learner's performance.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **time_created**: `BIGINT(19)`, Timestamp of when the attempt was created.
- **time_modified**: `BIGINT(19)`, Timestamp of when the attempt was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who made the attempt.

---

### Table: h5pactivity_attempts_results **

Stores detailed tracking information for H5P activities attempts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **additionals**: `LONGTEXT` (nullable), Extra sub_content information in JSON format.
- **attempt_id**: `BIGINT(19)`, ID of the related attempt in `h5pactivity_attempts`.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **correct_pattern**: `LONGTEXT` (nullable), Correct pattern in xAPI format.
- **description**: `LONGTEXT` (nullable), Description of the attempt result.
- **duration**: `BIGINT(19)` (nullable), Seconds invested in this result.
- **interaction_type**: `VARCHAR(128)` (nullable), Type of interaction.
- **max_score**: `BIGINT(19)`, Maximum score achievable.
- **raw_score**: `BIGINT(19)`, Raw score achieved.
- **response**: `LONGTEXT`, User response data in xAPI format.
- **sub_content**: `VARCHAR(128)` (nullable), sub_content identifier.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **time_created**: `BIGINT(19)`, Timestamp of when the result was created.

---

This detailed information about the `h5p`, `h5p_contents_libraries`, `h5p_libraries`, `h5p_libraries_cachedassets`, `h5p_library_dependencies`, `h5pactivity`, `h5pactivity_attempts`, and `h5pactivity_attempts_results` tables provides a comprehensive understanding of how H5P content and related activities are structured and managed within the database schema.
