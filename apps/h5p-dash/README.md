### Table: h5p

Stores H5P content information.

#### Fields

- **contenthash**: `VARCHAR(40)`, Defines the hash for the file content.
- **displayoptions**: `SMALLINT(5)` (nullable), H5P Button display options.
- **filtered**: `LONGTEXT` (nullable), Filtered version of `jsoncontent`.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the H5P content.
- **jsoncontent**: `LONGTEXT`, The content in JSON format.
- **mainlibraryid**: `BIGINT(19)`, The library instantiated for this node.
- **pathnamehash**: `VARCHAR(40)`, Defines the complete unique hash for the file path where the H5P content was added.
- **timecreated**: `BIGINT(19)`, Timestamp of when the content was created.
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: h5p_contents_libraries

Stores which library is used in which content.

#### Fields

- **dependencytype**: `VARCHAR(10)`, The type of dependency (e.g., dynamic, preloaded, or editor).
- **dropcss**: `BIT(1)`, Indicates if the preloaded CSS from the dependency is to be excluded.
- **h5pid**: `BIGINT(19)`, Identifier for the H5P content.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **libraryid**: `BIGINT(19)`, Identifier of the H5P library used by the content.
- **weight**: `BIGINT(19)`, Determines the order in which the preloaded libraries will be loaded.

---

### Table: h5p_libraries

Stores information about libraries used by H5P content.

#### Fields

- **addto**: `LONGTEXT` (nullable), Plugin configuration data.
- **coremajor**: `SMALLINT(5)` (nullable), H5P core API major version required.
- **coreminor**: `SMALLINT(5)` (nullable), H5P core API minor version required.
- **droplibrarycss**: `LONGTEXT` (nullable), List of libraries that should not have CSS included if this library is used.
- **embedtypes**: `VARCHAR(255)`, List of supported embed types.
- **enabled**: `BIT(1)` (nullable), Defines if this library is enabled (1) or not (0).
- **example**: `LONGTEXT` (nullable), Example URL.
- **fullscreen**: `BIT(1)`, Display fullscreen button.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the library.
- **machinename**: `VARCHAR(255)`, The library machine name.
- **majorversion**: `SMALLINT(5)`, Major version of the library.
- **metadatasettings**: `LONGTEXT` (nullable), Library metadata settings.
- **minorversion**: `SMALLINT(5)`, Minor version of the library.
- **patchversion**: `SMALLINT(5)`, Patch version of the library.
- **preloadedcss**: `LONGTEXT` (nullable), Comma-separated list of stylesheets to load.
- **preloadedjs**: `LONGTEXT` (nullable), Comma-separated list of scripts to load.
- **runnable**: `BIT(1)`, Can this library be started by the module?
- **semantics**: `LONGTEXT` (nullable), The semantics definition in JSON format.
- **title**: `VARCHAR(255)`, The human-readable name of this library.
- **tutorial**: `LONGTEXT` (nullable), Tutorial URL.

---

### Table: h5p_libraries_cachedassets

Stores H5P cached library assets.

#### Fields

- **hash**: `VARCHAR(255)`, Cache hash key that this library is part of.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **libraryid**: `BIGINT(19)`, ID of the library.

---

### Table: h5p_library_dependencies

Stores H5P library dependencies.

#### Fields

- **dependencytype**: `VARCHAR(255)`, The type of dependency (e.g., preloaded, dynamic, or editor).
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **libraryid**: `BIGINT(19)`, ID of the H5P library.
- **requiredlibraryid**: `BIGINT(19)`, The dependent library to load.

---

### Table: h5pactivity

Stores the h5pactivity activity module instances.

#### Fields

- **course**: `BIGINT(19)`, ID of the course this activity is part of.
- **displayoptions**: `SMALLINT(5)`, H5P Button display options.
- **enabletracking**: `BIT(1)`, Enable xAPI tracking.
- **grade**: `BIGINT(19)` (nullable), Grade associated with the activity.
- **grademethod**: `SMALLINT(5)`, Which H5P attempt is used for grading.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the activity instance.
- **intro**: `LONGTEXT` (nullable), Activity description.
- **introformat**: `SMALLINT(5)`, Format of the intro field.
- **name**: `VARCHAR(255)`, Name of the activity module instance.
- **reviewmode**: `SMALLINT(5)` (nullable), Review mode setting.
- **timecreated**: `BIGINT(19)`, Timestamp of when the instance was added to the course.
- **timemodified**: `BIGINT(19)`, Timestamp of when the instance was last modified.

---

### Table: h5pactivity_attempts

Stores users' attempts inside H5P activities.

#### Fields

- **attempt**: `MEDIUMINT(7)`, Attempt number.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **duration**: `BIGINT(19)` (nullable), Number of seconds invested in that attempt.
- **h5pactivityid**: `BIGINT(19)`, H5P activity ID.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **maxscore**: `BIGINT(19)` (nullable), Maximum score achieved.
- **rawscore**: `BIGINT(19)` (nullable), Raw score achieved.
- **scaled**: `DECIMAL(10)`, Scaled score (0..1) reflecting the learner's performance.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **timecreated**: `BIGINT(19)`, Timestamp of when the attempt was created.
- **timemodified**: `BIGINT(19)`, Timestamp of when the attempt was last modified.
- **userid**: `BIGINT(19)`, ID of the user who made the attempt.

---

### Table: h5pactivity_attempts_results

Stores detailed tracking information for H5P activities attempts.

#### Fields

- **additionals**: `LONGTEXT` (nullable), Extra subcontent information in JSON format.
- **attemptid**: `BIGINT(19)`, ID of the related attempt in `h5pactivity_attempts`.
- **completion**: `BIT(1)` (nullable), Stores the xAPI tracking completion result.
- **correctpattern**: `LONGTEXT` (nullable), Correct pattern in xAPI format.
- **description**: `LONGTEXT` (nullable), Description of the attempt result.
- **duration**: `BIGINT(19)` (nullable), Seconds invested in this result.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **interactiontype**: `VARCHAR(128)` (nullable), Type of interaction.
- **maxscore**: `BIGINT(19)`, Maximum score achievable.
- **rawscore**: `BIGINT(19)`, Raw score achieved.
- **response**: `LONGTEXT`, User response data in xAPI format.
- **subcontent**: `VARCHAR(128)` (nullable), Subcontent identifier.
- **success**: `BIT(1)` (nullable), Stores the xAPI tracking success result.
- **timecreated**: `BIGINT(19)`, Timestamp of when the result was created.

---

This detailed information about the `h5p`, `h5p_contents_libraries`, `h5p_libraries`, `h5p_libraries_cachedassets`, `h5p_library_dependencies`, `h5pactivity`, `h5pactivity_attempts`, and `h5pactivity_attempts_results` tables provides a comprehensive understanding of how H5P content and related activities are structured and managed within the database schema.
