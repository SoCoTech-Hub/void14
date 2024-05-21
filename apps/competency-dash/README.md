# Competency Management

## Tables

This README provides an overview of the tables in the Competency Management application, along with their fields and functions.

### Table: competency

This table contains the master record of each competency.

#### Fields

- **competencyframeworkid**: BIGINT(19) \* The framework this competency relates to.
- **description**: LONGTEXT(2147483647) \* Description of a single competency.
- **descriptionformat**: SMALLINT(5) \* Default: 0. The format of the description field.
- **id**: BIGINT(19)
- **idnumber**: VARCHAR(100) \* Unique identifier of a competency.
- **parentid**: BIGINT(19) \* The parent competency.
- **path**: VARCHAR(255) \* Used to speed up queries that use an entire branch of the tree. Looks like /5/34/54.
- **ruleconfig**: LONGTEXT(2147483647)
- **ruleoutcome**: TINYINT(3) \* Default: 0.
- **ruletype**: VARCHAR(100)
- **scaleconfiguration**: LONGTEXT(2147483647)
- **scaleid**: BIGINT(19)
- **shortname**: VARCHAR(100) \* Shortname of a competency.
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this competency was created.
- **timemodified**: BIGINT(19) \* The time this competency was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_coursecomp

This table links a competency to a course.

#### Fields

- **competencyid**: BIGINT(19) \* The competency that is linked to this course.
- **courseid**: BIGINT(19) \* The course this competency is linked to.
- **id**: BIGINT(19)
- **ruleoutcome**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this link was created.
- **timemodified**: BIGINT(19) \* The time this link was modified.
- **usermodified**: BIGINT(19)

### Table: competency_coursecompsetting

This table contains the course-specific settings for competencies.

#### Fields

- **courseid**: BIGINT(19) \* The course this setting is linked to.
- **id**: BIGINT(19)
- **pushratingstouserplans**: TINYINT(3)
- **timecreated**: BIGINT(19) \* The time this setting was created.
- **timemodified**: BIGINT(19) \* The time this setting was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_evidence

This table stores evidence linked to a user competency.

#### Fields

- **action**: TINYINT(3)
- **actionuserid**: BIGINT(19)
- **contextid**: BIGINT(19)
- **desca**: LONGTEXT(2147483647)
- **desccomponent**: VARCHAR(255)
- **descidentifier**: VARCHAR(255)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **note**: LONGTEXT(2147483647) \* A non-localized text to attach to the evidence.
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **url**: VARCHAR(255)
- **usercompetencyid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_framework

This table stores the list of competency frameworks.

#### Fields

- **contextid**: BIGINT(19)
- **description**: LONGTEXT(2147483647) \* Description of this competency framework.
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **id**: BIGINT(19)
- **idnumber**: VARCHAR(100) \* Unique idnumber for this competency framework.
- **scaleconfiguration**: LONGTEXT(2147483647)
- **scaleid**: BIGINT(19)
- **shortname**: VARCHAR(100) \* Short name for the competency framework.
- **taxonomies**: VARCHAR(255) \* Sequence of terms to use for each competency level.
- **timecreated**: BIGINT(19) \* The time this competency framework was created.
- **timemodified**: BIGINT(19) \* The time this competency framework was last modified.
- **usermodified**: BIGINT(19)
- **visible**: TINYINT(3) \* Default: 1. Used to show/hide this competency framework.

### Table: competency_modulecomp

This table links a competency to a module.

#### Fields

- **cmid**: BIGINT(19) \* ID of the record in the course_modules table.
- **competencyid**: BIGINT(19) \* The course competency this activity is linked to.
- **id**: BIGINT(19)
- **ruleoutcome**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19) \* The time this record was created.
- **timemodified**: BIGINT(19) \* The time this record was last modified.
- **usermodified**: BIGINT(19)

### Table: competency_plan

This table stores learning plans.

#### Fields

- **description**: LONGTEXT(2147483647)
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **duedate**: BIGINT(19)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **origtemplateid**: BIGINT(19)
- **reviewerid**: BIGINT(19)
- **status**: BIT(1)
- **templateid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_plancomp

This table stores plan competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **planid**: BIGINT(19)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_relatedcomp

This table stores related competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **relatedcompetencyid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_template

This table stores learning plan templates.

#### Fields

- **contextid**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **descriptionformat**: SMALLINT(5) \* Default: 0.
- **duedate**: BIGINT(19)
- **id**: BIGINT(19)
- **shortname**: VARCHAR(100)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)
- **visible**: TINYINT(3) \* Default: 1.

### Table: competency_templatecohort

This table stores cohort links to learning plan templates.

#### Fields

- **cohortid**: BIGINT(19)
- **id**: BIGINT(19)
- **templateid**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_templatecomp

This table links a competency to a learning plan template.

#### Fields

- **competencyid**: BIGINT(19) \* The competency that is linked to this course.
- **id**: BIGINT(19)
- **sortorder**: BIGINT(19)
- **templateid**: BIGINT(19) \* The template this competency is linked to.
- **timecreated**: BIGINT(19) \* The time this link was created.
- **timemodified**: BIGINT(19) \* The time this link was modified.
- **usermodified**: BIGINT(19)

### Table: competency_usercomp

This table stores user competencies.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **reviewerid**: BIGINT(19)
- **status**: TINYINT(3) \* Default:

0.

- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_usercompcourse

This table stores user competencies in a course.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **courseid**: BIGINT(19)
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_usercompplan

This table stores user competency plans.

#### Fields

- **competencyid**: BIGINT(19) \* Competency associated to the user.
- **grade**: BIGINT(19)
- **id**: BIGINT(19)
- **planid**: BIGINT(19)
- **proficiency**: TINYINT(3)
- **sortorder**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userid**: BIGINT(19) \* User associated to the competency.
- **usermodified**: BIGINT(19)

### Table: competency_userevidence

This table stores evidence of prior learning.

#### Fields

- **description**: LONGTEXT(2147483647)
- **descriptionformat**: BIT(1)
- **id**: BIGINT(19)
- **name**: VARCHAR(100)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **url**: LONGTEXT(2147483647)
- **userid**: BIGINT(19)
- **usermodified**: BIGINT(19)

### Table: competency_userevidencecomp

This table stores the relationship between user evidence and competencies.

#### Fields

- **competencyid**: BIGINT(19)
- **id**: BIGINT(19)
- **timecreated**: BIGINT(19)
- **timemodified**: BIGINT(19)
- **userevidenceid**: BIGINT(19)
- **usermodified**: BIGINT(19)
