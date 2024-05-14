# Competency Dash

## Tables

List of Tables with their function described below:

### competency *

This table contains the master record of each competency in

#### Fields 

- id
- competency_framework_id */ The framework this competency relates to.
- description */ Description of a single competency
- description_format */ The format of the description field
- id_number
- parent_id */ The parent competency.
- path */ Used to speed up queries that use an entire branch of the tree. Looks like /5/34/54.
- rule_config
- rule_outcome
- rule_type
- scale_configuration
- scale_id
- shortname */ Shortname of a competency
- sort_order */ Relative sort order within the branch
- time_created */ The time this competency was created.
- time_modified */ The time this competency was last modified.
- user_modified */ The user who last modified this competency

### competency_course_comp *

Link a competency to a course.

#### Fields

- id 
- competency_id */ The competency that is linked to this course.
- course_id */ The course this competency is linked to.
- rule_outcome */ The rule that applies to the competency when the course is completed.
- sort_order */ The display order for this link.
- time_created */ The time this link was created.
- time_modified */ The time this link was modified.
- user_modified */ The user who modified this link.


### competency_course_comp_setting

This table contains the course specific settings for compete

#### Fields

- id
- course_id */ The course this setting is linked to.
- push_ratings_to_user_plans */ Does this course push ratings to user plans?
- time_created */ The time this link was created.
- time_modified */ The time this link was modified.
- user_modified */ The user who modified this link.

### competency_evidence *

The evidence linked to a user competency

#### Fields

- id
- action 
- action_user_id 
- context_id 
- desca 
- desc_component 
- desc_identifier 
- grade 
- note */ A non-localised text to attach to the evidence.
- url 
- time_created 
- time_modified 
- user_competency_id 
- user_modified 


### competency_framework *

List of competency frameworks.

#### Fields

- id
- visible */ Used to show/hide this competency framework.
- context_id
- description */ Description of this competency framework
- description_format */ The format of the description field
- idnumber */ Unique idnumber for this competency framework.
- scale_configuration */ Scale information.
- scale_id */ Scale used to define competency.
- shortname */ Short name for the competency framework.
- taxonomies */ Sequence of terms to use for each competency level.
- time_created */ The time this competency framework was created.
- time_modified */ The time this competency framework was last modified.
- user_modified */ The user who last modified this framework.


### competency_module_comp *

Link a competency to a module.

#### Fields

- id
- cm_id */ ID of the record in the course_modules table.
- competency_id */ The course competency this activity is linked to.
- rule_outcome */ The outcome when an activity is completed.
- sort_order */ The field used to naturally sort this link.
- time_created */ The time this record was created.
- time_modified */ The time this record was last modified
- user_modified */ The user who last modified this field.

### competency_plan *

Learning plans

#### Fields

- id
- description
- description_format
- due_date
- name
- orig_template_id */ The template ID this plan was based on originally
- reviewer_id
- status
- template_id
- time_created
- time_modified
- user_id
- user_modified

### competency_plan_comp *

Plan competencies

#### Fields

- id
- competency_id
- plan_id
- sort_order */ Relative sort order
- time_created
- time_modified
- user_modified

### competency_related_comp *

Related competencies

#### Fields

- id
- competency_id
- related_competency_id
- time_created
- time_modified
- user_modified

### competency_template *

Learning plan templates.

#### Fields

- id
- visible */ Used to show/hide this learning plan template.
- context_id
- description */ Description of this learning plan template
- description_format */ The format of the description field
- due_date */ The default due date for instances of this plan.
- short_name */ Short name for the learning plan template.
- time_created */ The time this learning plan template was created.
- time_modified */ The time this learning plan template was last modified.
- user_modified */ The user who last modified this learning plan template.

### competency_template_cohort *

Default comment for the table, please edit me

#### Fields

- id
- cohort_id
- template_id
- time_created
- time_modified
- user_modified

### competency_template_comp *

Link a competency to a learning plan template.

#### Fields

- id
- competency_id */The competency that is linked to this course.
- sort_order */Relative sort order
- template_id */The template this competency is linked to.
- time_created */The time this link was created.
- time_modified */The time this link was modified.
- user_modified */The user who modified this link.

### competency_user_comp *

User competencies

#### Fields

- id
- competency_id */Competency associated to the user.
- grade */Grade assigned to the competency.
- proficiency */Indicate if the competency is proficient not.
- reviewer_id */User that reviewed the competency.
- status */Competency status.
- time_created
- time_modified
- user_id */User associated to the competency.
- user_modified

### competency_user_comp_course *

User competencies in a course

#### Fields

- id
- competency_id */Competency associated to the user.
- course_id */The course this competency is linked to.
- grade */The course grade assigned for the competency.
- proficiency */Indicate if the competency is proficient not.
- time_created
- time_modified
- user_id */User associated to the competency.
- user_modified


### competency_user_comp_plan *

User competencies plans

#### Fields

- id
- competency_id */Competency associated to the user.
- grade */Grade assigned to the competency.
- plan_id */Plan associated to the user.
- proficiency */Indicate if the competency is proficient not.
- sort_order */Relative sort order
- time_created
- time_modified
- user_id */User associated to the competency.
- user_modified


### competency_user_evidence

The evidence of prior learning

#### Fields

- id
- name 
- description
- description_format
- url
- user_id
- time_created
- time_modified
- user_modified


### competency_user_evidence_comp

Relationship between user evidence and competencies

#### Fields

- id
- competency_id
- time_created
- time_modified
- user_evidence_id
- user_modified