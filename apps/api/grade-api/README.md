## Grade Dashboard

### Table: grade_categories **

The `grade_categories` table stores information about grade categories, which are used for grouping grade items within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade category.
- **aggregate_only_graded**: `BIT(1)`, Indicates whether only graded activities are aggregated (`0` = No, `1` = Yes).
- **aggregate_outcomes**: `BIT(1)`, Indicates whether outcomes are aggregated (`0` = No, `1` = Yes).
- **aggregation**: `BIGINT(19)`, A constant pointing to one of the predefined aggregation strategies (none, mean, median, sum, etc.).
- **course_id**: `BIGINT(19)`, The ID of the course this grade category is part of.
- **depth**: `BIGINT(19)`, Indicates how many parents this category has.
- **drop_low**: `BIGINT(19)`, Number of lowest items to drop.
- **full_name**: `VARCHAR(255)`, The name of this grade category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **keep_high**: `BIGINT(19)`, Number of highest items to keep.
- **parent**: `BIGINT(19)`, Parent category ID, used for hierarchical categories.
- **path**: `VARCHAR(255)`, Shows the path as /1/2/3 (like course_categories).
- **time_created**: `BIGINT(19)`, Timestamp when the category was created.
- **time_modified**: `BIGINT(19)`, Timestamp when the category was last modified.

---

### Table: grade_categories_histories **

The `grade_categories_history` table stores the history of changes made to grade categories.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregate_only_graded**: `BIT(1)`, Indicates whether only graded activities are aggregated.
- **aggregate_outcomes**: `BIT(1)`, Indicates whether outcomes are aggregated.
- **aggregate_sub_cats**: `BIT(1)`, Indicates whether subcategories are aggregated (preserved for history).
- **aggregation**: `BIGINT(19)`, Aggregation strategy used.
- **course_id**: `BIGINT(19)`, Course ID this category is part of.
- **depth**: `BIGINT(19)`, Depth of the category.
- **drop_low**: `BIGINT(19)`, Number of lowest items to drop.
- **full_name**: `VARCHAR(255)`, Name of the category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **keep_high**: `BIGINT(19)`, Number of highest items to keep.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the category.
- **old_id**: `BIGINT(19)`, Original ID of the category.
- **parent**: `BIGINT(19)`, Parent category ID.
- **path**: `VARCHAR(255)`, Path of the category.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: grade_grades **

The `grade_grades` table stores individual grades for each user and grade item in Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **aggregation_status**: `VARCHAR(10)`, Describes how this grade was used in aggregation (unknown, dropped, novalue, used).
- **aggregation_weight**: `DECIMAL(10)`, Weight of the grade in the aggregation.
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedback_format**: `BIGINT(19)`, Format of the feedback text.
- **final_grade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **information**: `LONGTEXT`, Optional information about the grade.
- **information_format**: `BIGINT(19)`, Format of the information text.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **lock_time**: `BIGINT(19)`, Automatic locking date.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **raw_grade**: `DECIMAL(10)`, Raw grade value.
- **raw_grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **raw_grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **raw_scale_id**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **time_created**: `BIGINT(19)`, Timestamp of grade creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_grades_histories **

The `grade_grades_history` table stores the history of changes made to individual grades.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedback_format**: `BIGINT(19)`, Format of the feedback text.
- **final_grade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **information**: `LONGTEXT`, Optional information about the grade.
- **information_format**: `BIGINT(19)`, Format of the information text.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **lock_time**: `BIGINT(19)`, Automatic locking date.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the grade.
- **old_id**: `BIGINT(19)`, Original ID of the grade.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **raw_grade**: `DECIMAL(10)`, Raw grade value.
- **raw_grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **raw_grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **raw_scale_id**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.
- **user_modified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_import_newitems **

The `grade_import_newitem` table is a temporary table for storing new grade item names during grade import.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **import_code**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **item_name**: `VARCHAR(255)`, Name of the new grade item.

---

### Table: grade_import_values **

The `grade_import_values` table is a temporary table for storing imported grades.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **feedback**: `LONGTEXT`, Feedback for the imported grade.
- **final_grade**: `DECIMAL(10)`, Raw grade value.
- **import_code**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **import_only_feedback**: `BIT(1)`, Indicates whether only feedback is imported.
- **item_id**: `BIGINT(19)`, ID of the grade item.
- **new_grade_item**: `BIGINT(19)`, ID of the new grade item.
- **user_id**: `BIGINT(19)`, ID of the user the grade is for.

---

### Table: grade_items **

The `grade_items` table stores information about gradeable items (i.e., columns in the gradebook) within Moodle.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade item.
- **aggregation_coef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregation_coef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **category_id**: `BIGINT(19)`, ID of the category this item belongs to.
- **course_id**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type (real grades, percentages, letters, etc.).
- **grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **grade_pass**: `DECIMAL(10)`, Grade needed to pass.
- **grade_type**: `SMALLINT(5)`, Type of grade (none, value, scale, text).
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id_number**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **item_info**: `LONGTEXT`, Information and notes about the item.
- **item_instance**: `BIGINT(19)`, ID of the item module.
- **item_module**: `VARCHAR(30)`, Module type ('forum', 'quiz', 'csv', etc.).
- **item_name**: `VARCHAR(255)`, Name of the item.
- **item_number**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **item_type**: `VARCHAR(30)`, Type of item ('mod', 'blocks', 'import', 'calculated', etc.).
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **lock_time**: `BIGINT(19)`, Date to lock all final grades.
- **mult_factor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needs_update**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **outcome_id**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plus_factor**: `DECIMAL(10)`, Add this factor to all grades.
- **scale_id**: `BIGINT(19)`, ID of the scale this grade is based on.
- **weight_override**: `BIT(1)`, Indicates whether the weight is overridden.
- **sort_order**: `BIGINT(19)`, Sorting order of the columns.
- **time_created**: `BIGINT(19)`, Timestamp of item creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: grade_items_histories **

The `grade_items_history` table stores the history of changes made to grade items.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregation_coef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregation_coef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **category_id**: `BIGINT(19)`, ID of the category this item belongs to.
- **course_id**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type.
- **grade_max**: `DECIMAL(10)`, Maximum allowable grade.
- **grade_min**: `DECIMAL(10)`, Minimum allowable grade.
- **grade_pass**: `DECIMAL(10)`, Grade needed to pass.
- **grade_type**: `SMALLINT(5)`, Type of grade.
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id_number**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **item_info**: `LONGTEXT`, Information and notes about the item.
- **item_instance**: `BIGINT(19)`, ID of the item module.
- **item_module**: `VARCHAR(30)`, Module type.
- **item_name**: `VARCHAR(255)`, Name of the item.
- **item_number**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **item_type**: `VARCHAR(30)`, Type of item.
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **lock_time**: `BIGINT(19)`, Date to lock all final grades.
- **mult_factor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needs_update**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **old_id**: `BIGINT(19)`, Original ID of the item.
- **outcome_id**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plus_factor**: `DECIMAL(10)`, Add this factor to all grades.
- **scale_id**: `BIGINT(19)`, ID of the scale this grade is based on.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **weight_override**: `BIT(1)`, Indicates whether the weight is overridden.
- **sort_order**: `BIGINT(19)`, Sorting order of the columns.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the item.

---

### Table: grade_letters **

The `grade_letters` table stores grade letters, which can be used to represent grade ranges with letters.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **context_id**: `BIGINT(19)`, ID of the context the letter applies to (e.g., course).
- **letter**: `VARCHAR(255)`, Display value of the letter (e.g., A, B, C, etc.).
- **lower_boundary**: `DECIMAL(10)`, Lower boundary of the letter. The upper boundary is the lower boundary of the next highest letter, or the maximum grade if there is no higher letter.

---

### Table: grade_outcomes **

The `grade_outcomes` table describes the outcomes used in the system. An outcome is a specific skill or knowledge that students should have gained.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the outcome.
- **course_id**: `BIGINT(19)`, ID of the course the outcome is associated with (NULL for site-wide outcomes).
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **description_format**: `TINYINT(3)`, Format of the description.
- **full_name**: `LONGTEXT`, Full description of the outcome.
- **scale_id**: `BIGINT(19)`, Recommended scale for the outcome.
- **short_name**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **time_created**: `BIGINT(19)`, Timestamp of outcome creation.
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **user_modified**: `BIGINT(19)`, User ID of the person who last modified the outcome.

---

### Table: grade_outcomes_courses **

The `grade_outcomes_courses` table stores the outcomes used in specific courses.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course.
- **outcome_id**: `BIGINT(19)`, ID of the outcome.

---

### Table: grade_outcomes_histories **

The `grade_outcomes_history` table stores the history of changes made to outcomes.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **course_id**: `BIGINT(19)`, ID of the course the outcome is associated with.
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **description_format**: `TINYINT(3)`, Format of the description.
- **full_name**: `LONGTEXT`, Full description of the outcome.
- **old_id**: `BIGINT(19)`, Original ID of the outcome.
- **scale_id**: `BIGINT(19)`, Recommended scale for the outcome.
- **short_name**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **time_modified**: `BIGINT(19)`, Timestamp of the last modification.
- **logged_user**: `BIGINT(19)`, User ID of the person who last modified the outcome.

---

### Table: grade_settings **

The `grade_settings` table stores settings for the gradebook.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **course_id**: `BIGINT(19)`, ID of the course the setting applies to.
- **name**: `VARCHAR(255)`, Name of the setting.
- **value**: `LONGTEXT`, Value of the setting.

---

### Table: grading_areas **

The `grading_areas` table identifies gradable areas where advanced grading can occur.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **active_method**: `VARCHAR(100)`, Default grading method (plugin) for the area.
- **area_name**: `VARCHAR(100)`, Name of the gradable area.
- **component**: `VARCHAR(100)`, Name of the component holding the area.
- **context_id**: `BIGINT(19)`, Context of the gradable area (e.g., module instance context).

---

### Table: grading_definitions **

The `grading_definitions` table contains basic information about advanced grading forms.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **area_id**: `BIGINT(19)`, ID of the grading area.
- **copied_from_id**: `BIGINT(19)`, ID of the original definition this was copied from.
- **description**: `LONGTEXT`, Detailed description of the form.
- **description_format**: `TINYINT(3)`, Format of the description.
- **method**: `VARCHAR(100)`, Name of the plugin providing the grading form.
- **name**: `VARCHAR(255)`, Title of the form.
- **options**: `LONGTEXT`, General storage place for plugin settings.
- **status**: `BIGINT(19)`, Status of the form definition.
- **time_copied**: `BIGINT(19)`, Timestamp of the last time this form was copied.
- **time_created**: `BIGINT(19)`, Timestamp of form creation.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.
- **user_created**: `BIGINT(19)`, User ID of the form creator.
- **user_modified**: `BIGINT(19)`, User ID of the person who last modified the form.

---

### Table: grading_instances **

The `grading_instances` table stores instances of advanced grading forms, representing individual assessments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **feedback**: `LONGTEXT`, Overall feedback from the rater.
- **feedback_format**: `TINYINT(3)`, Format of the feedback field.
- **item_id**: `BIGINT(19)`, ID of the graded item.
- **rater_id**: `BIGINT(19)`, User ID of the rater.
- **raw_grade**: `DECIMAL(10)`, Raw normalized grade (0.00000 - 100.00000).
- **status**: `BIGINT(19)`, Status of the assessment.
- **time_modified**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: gradingform_guide_comments **

The `gradingform_guide_comments` table stores frequently used comments in the marking guide.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Comment description.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **sort_order**: `BIGINT(19)`, Order of the comments.

---

### Table: gradingform_guide_criteria **

The `gradingform_guide_criteria` table stores the rows of the criteria grid for the marking guide.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion for students.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **description_markers**: `LONGTEXT`, Description for markers.
- **description_markers_format**: `TINYINT(3)`, Format of the description for markers.
- **max_score**: `DECIMAL(10)`, Maximum grade for the criterion.
- **short_name**: `VARCHAR(255)`, Short name of the criterion.
- **sort_order**: `BIGINT(19)`, Order of the criterion in the guide.

---

### Table: gradingform_guide_fillings **

The `gradingform_guide_fillings` table stores the data of how the guide is filled by a particular rater.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the criterion.
- **instance_id**: `BIGINT(19)`, ID of the grading form instance.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remark_format**: `TINYINT(3)`, Format of the remark field.
- **score**: `DECIMAL(10)`, Score assigned to the criterion.

---

### Table: gradingform_rubric_criterias **

The `gradingform_rubric_criteria` table stores the rows of the rubric grid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **definition_id**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion.
- **description_format**: `TINYINT(3)`, Format of the description field.
- **sort_order**: `BIGINT(19)`, Order of the criterion in the rubric.

---

### Table: gradingform_rubric_fillings **

The `gradingform_rubric_fillings` table stores the data of how the rubric is filled by a particular rater.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the criterion.
- **instance_id**: `BIGINT(19)`, ID of the grading form instance.
- **level_id**: `BIGINT(19)`, ID of the selected level during assessment.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remark_format**: `TINYINT(3)`, Format of the remark field.

---

### Table: gradingform_rubric_levels **

The `gradingform_rubric_levels` table stores the columns of the rubric grid.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **criterion_id**: `BIGINT(19)`, ID of the rubric criterion.
- **definition**: `LONGTEXT`, Text describing the level.
- **definition_format**: `BIGINT(19)`, Format of the definition field.
- **score**: `DECIMAL(10)`, Score for the level.

---

This detailed information about the tables and fields in the `grade_*` and `grading_*` categories provides a comprehensive understanding of how grading and evaluation data is structured and managed within Moodle's database schema.
