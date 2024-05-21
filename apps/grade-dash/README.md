## Grade Dashboard

### Table: grade_categories

The `grade_categories` table stores information about grade categories, which are used for grouping grade items within Moodle.

#### Fields

- **aggregateonlygraded**: `BIT(1)`, Indicates whether only graded activities are aggregated (`0` = No, `1` = Yes).
- **aggregateoutcomes**: `BIT(1)`, Indicates whether outcomes are aggregated (`0` = No, `1` = Yes).
- **aggregation**: `BIGINT(19)`, A constant pointing to one of the predefined aggregation strategies (none, mean, median, sum, etc.).
- **courseid**: `BIGINT(19)`, The ID of the course this grade category is part of.
- **depth**: `BIGINT(19)`, Indicates how many parents this category has.
- **droplow**: `BIGINT(19)`, Number of lowest items to drop.
- **fullname**: `VARCHAR(255)`, The name of this grade category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade category.
- **keephigh**: `BIGINT(19)`, Number of highest items to keep.
- **parent**: `BIGINT(19)`, Parent category ID, used for hierarchical categories.
- **path**: `VARCHAR(255)`, Shows the path as /1/2/3 (like course_categories).
- **timecreated**: `BIGINT(19)`, Timestamp when the category was created.
- **timemodified**: `BIGINT(19)`, Timestamp when the category was last modified.

---

### Table: grade_categories_history

The `grade_categories_history` table stores the history of changes made to grade categories.

#### Fields

- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregateonlygraded**: `BIT(1)`, Indicates whether only graded activities are aggregated.
- **aggregateoutcomes**: `BIT(1)`, Indicates whether outcomes are aggregated.
- **aggregatesubcats**: `BIT(1)`, Indicates whether subcategories are aggregated (preserved for history).
- **aggregation**: `BIGINT(19)`, Aggregation strategy used.
- **courseid**: `BIGINT(19)`, Course ID this category is part of.
- **depth**: `BIGINT(19)`, Depth of the category.
- **droplow**: `BIGINT(19)`, Number of lowest items to drop.
- **fullname**: `VARCHAR(255)`, Name of the category.
- **hidden**: `BIGINT(19)`, Indicates whether the category is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **keephigh**: `BIGINT(19)`, Number of highest items to keep.
- **loggeduser**: `BIGINT(19)`, User ID of the person who last modified the category.
- **oldid**: `BIGINT(19)`, Original ID of the category.
- **parent**: `BIGINT(19)`, Parent category ID.
- **path**: `VARCHAR(255)`, Path of the category.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: grade_grades

The `grade_grades` table stores individual grades for each user and grade item in Moodle.

#### Fields

- **aggregationstatus**: `VARCHAR(10)`, Describes how this grade was used in aggregation (unknown, dropped, novalue, used).
- **aggregationweight**: `DECIMAL(10)`, Weight of the grade in the aggregation.
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedbackformat**: `BIGINT(19)`, Format of the feedback text.
- **finalgrade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade.
- **information**: `LONGTEXT`, Optional information about the grade.
- **informationformat**: `BIGINT(19)`, Format of the information text.
- **itemid**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **locktime**: `BIGINT(19)`, Automatic locking date.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **rawgrade**: `DECIMAL(10)`, Raw grade value.
- **rawgrademax**: `DECIMAL(10)`, Maximum allowable grade.
- **rawgrademin**: `DECIMAL(10)`, Minimum allowable grade.
- **rawscaleid**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **timecreated**: `BIGINT(19)`, Timestamp of grade creation.
- **timemodified**: `BIGINT(19)`, Timestamp of last modification.
- **userid**: `BIGINT(19)`, ID of the user the grade is for.
- **usermodified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_grades_history

The `grade_grades_history` table stores the history of changes made to individual grades.

#### Fields

- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **excluded**: `BIGINT(19)`, Indicates whether the grade is excluded from aggregation.
- **exported**: `BIGINT(19)`, Date of last grade export.
- **feedback**: `LONGTEXT`, Feedback for the grade.
- **feedbackformat**: `BIGINT(19)`, Format of the feedback text.
- **finalgrade**: `DECIMAL(10)`, Final grade after calculations.
- **hidden**: `BIGINT(19)`, Indicates whether the grade is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **information**: `LONGTEXT`, Optional information about the grade.
- **informationformat**: `BIGINT(19)`, Format of the information text.
- **itemid**: `BIGINT(19)`, ID of the grade item.
- **locked**: `BIGINT(19)`, Indicates whether the grade is locked.
- **locktime**: `BIGINT(19)`, Automatic locking date.
- **loggeduser**: `BIGINT(19)`, User ID of the person who last modified the grade.
- **oldid**: `BIGINT(19)`, Original ID of the grade.
- **overridden**: `BIGINT(19)`, Indicates whether the grade is overridden.
- **rawgrade**: `DECIMAL(10)`, Raw grade value.
- **rawgrademax**: `DECIMAL(10)`, Maximum allowable grade.
- **rawgrademin**: `DECIMAL(10)`, Minimum allowable grade.
- **rawscaleid**: `BIGINT(19)`, Scale ID if the grade is based on a scale.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.
- **userid**: `BIGINT(19)`, ID of the user the grade is for.
- **usermodified**: `BIGINT(19)`, ID of the user who last modified the grade.

---

### Table: grade_import_newitem

The `grade_import_newitem` table is a temporary table for storing new grade item names during grade import.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **importcode**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **itemname**: `VARCHAR(255)`, Name of the new grade item.

---

### Table: grade_import_values

The `grade_import_values` table is a temporary table for storing imported grades.

#### Fields

- **feedback**: `LONGTEXT`, Feedback for the imported grade.
- **finalgrade**: `DECIMAL(10)`, Raw grade value.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **importcode**: `BIGINT(19)`, Import batch code for identification.
- **importer**: `BIGINT(19)`, ID of the user importing the data.
- **importonlyfeedback**: `BIT(1)`, Indicates whether only feedback is imported.
- **itemid**: `BIGINT(19)`, ID of the grade item.
- **newgradeitem**: `BIGINT(19)`, ID of the new grade item.
- **userid**: `BIGINT(19)`, ID of the user the grade is for.

---

### Table: grade_items

The `grade_items` table stores information about gradeable items (i.e., columns in the gradebook) within Moodle.

#### Fields

- **aggregationcoef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregationcoef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **categoryid**: `BIGINT(19)`, ID of the category this item belongs to.
- **courseid**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type (real grades, percentages, letters, etc.).
- **grademax**: `DECIMAL(10)`, Maximum allowable grade.
- **grademin**: `DECIMAL(10)`, Minimum allowable grade.
- **gradepass**: `DECIMAL(10)`, Grade needed to pass.
- **gradetype**: `SMALLINT(5)`, Type of grade (none, value, scale, text).
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the grade item.
- **idnumber**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **iteminfo**: `LONGTEXT`, Information and notes about the item.
- **iteminstance**: `BIGINT(19)`, ID of the item module.
- **itemmodule**: `VARCHAR(30)`, Module type ('forum', 'quiz', 'csv', etc.).
- **itemname**: `VARCHAR(255)`, Name of the item.
- **itemnumber**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **itemtype**: `VARCHAR(30)`, Type of item ('mod', 'blocks', 'import', 'calculated', etc.).
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **locktime**: `BIGINT(19)`, Date to lock all final grades.
- **multfactor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needsupdate**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **outcomeid**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plusfactor**: `DECIMAL(10)`, Add this factor to all grades.
- **scaleid**: `BIGINT(19)`, ID of the scale this grade is based on.
- **sortorder**: `BIGINT(19)`, Sorting order of the columns.
- **timecreated**: `BIGINT(19)`, Timestamp of item creation.
- **timemodified**: `BIGINT(19)`, Timestamp of last modification.
- **weightoverride**: `BIT(1)`, Indicates whether the weight is overridden.

---

### Table: grade_items_history

The `grade_items_history` table stores the history of changes made to grade items.

#### Fields

- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **aggregationcoef**: `DECIMAL(10)`, Aggregation coefficient used for category weights or other aggregation types.
- **aggregationcoef2**: `DECIMAL(10)`, Aggregation coefficient used for weights in aggregation types with both extra credit and weight.
- **calculation**: `LONGTEXT`, Formula describing how to derive this grade from other items.
- **categoryid**: `BIGINT(19)`, ID of the category this item belongs to.
- **courseid**: `BIGINT(19)`, ID of the course this item is part of.
- **decimals**: `BIT(1)`, Number of digits after the decimal point.
- **display**: `BIGINT(19)`, Display type.
- **grademax**: `DECIMAL(10)`, Maximum allowable grade.
- **grademin**: `DECIMAL(10)`, Minimum allowable grade.
- **gradepass**: `DECIMAL(10)`, Grade needed to pass.
- **gradetype**: `SMALLINT(5)`, Type of grade.
- **hidden**: `BIGINT(19)`, Indicates whether the item is hidden.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **idnumber**: `VARCHAR(255)`, Arbitrary ID number provided by the module responsible.
- **iteminfo**: `LONGTEXT`, Information and notes about the item.
- **iteminstance**: `BIGINT(19)`, ID of the item module.
- **itemmodule**: `VARCHAR(30)`, Module type.
- **itemname**: `VARCHAR(255)`, Name of the item.
- **itemnumber**: `BIGINT(19)`, Used to distinguish multiple grades for an activity.
- **itemtype**: `VARCHAR(30)`, Type of item.
- **locked**: `BIGINT(19)`, Indicates whether the item is locked.
- **locktime**: `BIGINT(19)`, Date to lock all final grades.
- **loggeduser**: `BIGINT(19)`, User ID of the person who last modified the item.
- **multfactor**: `DECIMAL(10)`, Multiply all grades by this factor.
- **needsupdate**: `BIGINT(19)`, Indicates whether the column needs to be recalculated.
- **oldid**: `BIGINT(19)`, Original ID of the item.
- **outcomeid**: `BIGINT(19)`, ID of the outcome this grade is related to.
- **plusfactor**: `DECIMAL(10)`, Add this factor to all grades.
- **scaleid**: `BIGINT(19)`, ID of the scale this grade is based on.
- **sortorder**: `BIGINT(19)`, Sorting order of the columns.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.
- **weightoverride**: `BIT(1)`, Indicates whether the weight is overridden.

---

### Table: grade_letters

The `grade_letters` table stores grade letters, which can be used to represent grade ranges with letters.

#### Fields

- **contextid**: `BIGINT(19)`, ID of the context the letter applies to (e.g., course).
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **letter**: `VARCHAR(255)`, Display value of the letter (e.g., A, B, C, etc.).
- **lowerboundary**: `DECIMAL(10)`, Lower boundary of the letter. The upper boundary is the lower boundary of the next highest letter, or the maximum grade if there is no higher letter.

---

### Table: grade_outcomes

The `grade_outcomes` table describes the outcomes used in the system. An outcome is a specific skill or knowledge that students should have gained.

#### Fields

- **courseid**: `BIGINT(19)`, ID of the course the outcome is associated with (NULL for site-wide outcomes).
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **descriptionformat**: `TINYINT(3)`, Format of the description.

- **fullname**: `LONGTEXT`, Full description of the outcome.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the outcome.
- **scaleid**: `BIGINT(19)`, Recommended scale for the outcome.
- **shortname**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **timecreated**: `BIGINT(19)`, Timestamp of outcome creation.
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.
- **usermodified**: `BIGINT(19)`, User ID of the person who last modified the outcome.

---

### Table: grade_outcomes_courses

The `grade_outcomes_courses` table stores the outcomes used in specific courses.

#### Fields

- **courseid**: `BIGINT(19)`, ID of the course.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **outcomeid**: `BIGINT(19)`, ID of the outcome.

---

### Table: grade_outcomes_history

The `grade_outcomes_history` table stores the history of changes made to outcomes.

#### Fields

- **action**: `BIGINT(19)`, Action performed (created, modified, deleted).
- **courseid**: `BIGINT(19)`, ID of the course the outcome is associated with.
- **description**: `LONGTEXT`, Detailed description of the outcome.
- **descriptionformat**: `TINYINT(3)`, Format of the description.
- **fullname**: `LONGTEXT`, Full description of the outcome.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **loggeduser**: `BIGINT(19)`, User ID of the person who last modified the outcome.
- **oldid**: `BIGINT(19)`, Original ID of the outcome.
- **scaleid**: `BIGINT(19)`, Recommended scale for the outcome.
- **shortname**: `VARCHAR(255)`, Short name or code for the outcome statement.
- **source**: `VARCHAR(255)`, Source of the modification (manual, module, import, etc.).
- **timemodified**: `BIGINT(19)`, Timestamp of the last modification.

---

### Table: grade_settings

The `grade_settings` table stores settings for the gradebook.

#### Fields

- **courseid**: `BIGINT(19)`, ID of the course the setting applies to.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **name**: `VARCHAR(255)`, Name of the setting.
- **value**: `LONGTEXT`, Value of the setting.

---

### Table: grading_areas

The `grading_areas` table identifies gradable areas where advanced grading can occur.

#### Fields

- **activemethod**: `VARCHAR(100)`, Default grading method (plugin) for the area.
- **areaname**: `VARCHAR(100)`, Name of the gradable area.
- **component**: `VARCHAR(100)`, Name of the component holding the area.
- **contextid**: `BIGINT(19)`, Context of the gradable area (e.g., module instance context).
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.

---

### Table: grading_definitions

The `grading_definitions` table contains basic information about advanced grading forms.

#### Fields

- **areaid**: `BIGINT(19)`, ID of the grading area.
- **copiedfromid**: `BIGINT(19)`, ID of the original definition this was copied from.
- **description**: `LONGTEXT`, Detailed description of the form.
- **descriptionformat**: `TINYINT(3)`, Format of the description.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **method**: `VARCHAR(100)`, Name of the plugin providing the grading form.
- **name**: `VARCHAR(255)`, Title of the form.
- **options**: `LONGTEXT`, General storage place for plugin settings.
- **status**: `BIGINT(19)`, Status of the form definition.
- **timecopied**: `BIGINT(19)`, Timestamp of the last time this form was copied.
- **timecreated**: `BIGINT(19)`, Timestamp of form creation.
- **timemodified**: `BIGINT(19)`, Timestamp of last modification.
- **usercreated**: `BIGINT(19)`, User ID of the form creator.
- **usermodified**: `BIGINT(19)`, User ID of the person who last modified the form.

---

### Table: grading_instances

The `grading_instances` table stores instances of advanced grading forms, representing individual assessments.

#### Fields

- **definitionid**: `BIGINT(19)`, ID of the form definition.
- **feedback**: `LONGTEXT`, Overall feedback from the rater.
- **feedbackformat**: `TINYINT(3)`, Format of the feedback field.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **itemid**: `BIGINT(19)`, ID of the graded item.
- **raterid**: `BIGINT(19)`, User ID of the rater.
- **rawgrade**: `DECIMAL(10)`, Raw normalized grade (0.00000 - 100.00000).
- **status**: `BIGINT(19)`, Status of the assessment.
- **timemodified**: `BIGINT(19)`, Timestamp of last modification.

---

### Table: gradingform_guide_comments

The `gradingform_guide_comments` table stores frequently used comments in the marking guide.

#### Fields

- **definitionid**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Comment description.
- **descriptionformat**: `TINYINT(3)`, Format of the description field.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **sortorder**: `BIGINT(19)`, Order of the comments.

---

### Table: gradingform_guide_criteria

The `gradingform_guide_criteria` table stores the rows of the criteria grid for the marking guide.

#### Fields

- **definitionid**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion for students.
- **descriptionformat**: `TINYINT(3)`, Format of the description field.
- **descriptionmarkers**: `LONGTEXT`, Description for markers.
- **descriptionmarkersformat**: `TINYINT(3)`, Format of the description for markers.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **maxscore**: `DECIMAL(10)`, Maximum grade for the criterion.
- **shortname**: `VARCHAR(255)`, Short name of the criterion.
- **sortorder**: `BIGINT(19)`, Order of the criterion in the guide.

---

### Table: gradingform_guide_fillings

The `gradingform_guide_fillings` table stores the data of how the guide is filled by a particular rater.

#### Fields

- **criterionid**: `BIGINT(19)`, ID of the criterion.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **instanceid**: `BIGINT(19)`, ID of the grading form instance.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remarkformat**: `TINYINT(3)`, Format of the remark field.
- **score**: `DECIMAL(10)`, Score assigned to the criterion.

---

### Table: gradingform_rubric_criteria

The `gradingform_rubric_criteria` table stores the rows of the rubric grid.

#### Fields

- **definitionid**: `BIGINT(19)`, ID of the form definition.
- **description**: `LONGTEXT`, Description of the criterion.
- **descriptionformat**: `TINYINT(3)`, Format of the description field.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **sortorder**: `BIGINT(19)`, Order of the criterion in the rubric.

---

### Table: gradingform_rubric_fillings

The `gradingform_rubric_fillings` table stores the data of how the rubric is filled by a particular rater.

#### Fields

- **criterionid**: `BIGINT(19)`, ID of the criterion.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **instanceid**: `BIGINT(19)`, ID of the grading form instance.
- **levelid**: `BIGINT(19)`, ID of the selected level during assessment.
- **remark**: `LONGTEXT`, Feedback for the particular criterion.
- **remarkformat**: `TINYINT(3)`, Format of the remark field.

---

### Table: gradingform_rubric_levels

The `gradingform_rubric_levels` table stores the columns of the rubric grid.

#### Fields

- **criterionid**: `BIGINT(19)`, ID of the rubric criterion.
- **definition**: `LONGTEXT`, Text describing the level.
- **definitionformat**: `BIGINT(19)`, Format of the definition field.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **score**: `DECIMAL(10)`, Score for the level.

---

This detailed information about the tables and fields in the `grade_*` and `grading_*` categories provides a comprehensive understanding of how grading and evaluation data is structured and managed within Moodle's database schema.
