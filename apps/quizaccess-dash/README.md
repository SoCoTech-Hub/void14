### Table: quizaccess_seb_quiz_settings

Stores the quiz-level Safe Exam Browser (SEB) configuration.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **activate_url_filtering**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether URLs will be filtered.
- **allowed_browser_exam_keys**: `TEXT`, List of allowed browser exam keys.
- **allow_reload_in_exam**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the user can reload the exam.
- **allow_spell_checking**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether spell checking is enabled in SEB.
- **allow_user_quit_seb**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the quit button is shown.
- **cmid**: `BIGINT` NOT NULL, Foreign key to the course module ID.
- **enable_audio_control**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether volume and audio controls are shown.
- **expressions_allowed**: `TEXT`, Comma or newline-separated list of allowed expressions.
- **expressions_blocked**: `TEXT`, Comma or newline-separated list of blocked expressions.
- **filter_embedded_content**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether embedded content will be filtered.
- **link_quitseb**: `TEXT`, Link to exit SEB.
- **mute_on_startup**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the browser starts muted.
- **quit_password**: `TEXT`, Password to exit SEB.
- **quiz_id**: `BIGINT` NOT NULL, Foreign key to the quiz ID.
- **regex_allowed**: `TEXT`, Regular expression of allowed URLs.
- **regex_blocked**: `TEXT`, Regular expression of blocked URLs.
- **require_safe_exam_browser**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether SEB is required.
- **show_keyboard_layout**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the keyboard layout is shown.
- **show_reload_button**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the reload button is shown.
- **show_seb_download_link**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the SEB download link should appear.
- **show_seb_taskbar**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the SEB taskbar is shown.
- **show_time**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the clock is shown.
- **show_wifi_control**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the user can control networking.
- **template_id**: `BIGINT`, Foreign key to `quizaccess_seb_template.id`.
- **user_confirm_quit**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the confirm quit popup should appear.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, ID of the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_cmid ON quizaccess_seb_quiz_settings(cmid);`
- `CREATE INDEX idx_quiz_id ON quizaccess_seb_quiz_settings(quiz_id);`
- `CREATE INDEX idx_template_id ON quizaccess_seb_quiz_settings(template_id);`
- `CREATE INDEX idx_user_id_seb_settings ON quizaccess_seb_quiz_settings(user_id);`

---

### Table: quizaccess_seb_templates

Templates for Safe Exam Browser configuration.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the record.
- **content**: `TEXT`, Content of the template.
- **description**: `TEXT`, Description of the template.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates whether the template is enabled.
- **name**: `VARCHAR(255)` NOT NULL, Name of the template.
- **sort_order**: `INTEGER`, Sort order of the template.
- **created_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP, Timestamp of when the record was created.
- **updated_at**: `TIMESTAMP` NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, Timestamp of when the record was last modified.
- **user_id**: `BIGINT` NOT NULL, ID of the user who last modified the record.

#### Indexes

- `CREATE INDEX idx_user_id_seb_template ON quizaccess_seb_template(user_id);`
- `CREATE INDEX idx_name_seb_template ON quizaccess_seb_template(name);`
