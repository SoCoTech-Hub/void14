# Tool User Tour Dash

## Tables

List of Tables with their function described below:

### Table: tool_user_tours_steps

Steps in a tour.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **config_data**: `LONGTEXT(2147483647)`, Configuration data.
- **content**: `LONGTEXT(2147483647)`, Content of the user tour.
- **content_format**: `SMALLINT(5)`, Format of the content.
- **sort_order**: `BIGINT(19)`, Sort order of the step.
- **target_type**: `TINYINT(3)`, Type of the target (e.g., block, CSS selector, etc.).
- **target_value**: `LONGTEXT(2147483647)`, The value for the specified target type.
- **title**: `LONGTEXT(2147483647)`, Title of the step.
- **tour_id**: `BIGINT(19)`, ID of the tour.

---

### Table: tool_user_tours_tours

List of tours.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **config_data**: `LONGTEXT(2147483647)`, Configuration data.
- **description**: `LONGTEXT(2147483647)`, Description of the tour.
- **display_step_numbers**: `BIT(1)`, Setting to display step numbers of the tour.
- **enabled**: `BIT(1)`, Indicates if the tour is enabled.
- **end_tour_label**: `VARCHAR(255)`, Custom label for the end tour button.
- **name**: `VARCHAR(255)`, Name of the user tour.
- **path_match**: `VARCHAR(255)`, Path match for the tour.
- **sort_order**: `BIGINT(19)`, Sort order of the tour.
