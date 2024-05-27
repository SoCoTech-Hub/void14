### Table: quizaccess_seb_quiz_settings

Stores the quiz-level Safe Exam Browser (SEB) configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **activate_url_filtering**: `BOOLEAN(1)`, Indicates whether URLs will be filtered.
- **allowed_browser_exam_keys**: `LONGTEXT(2147483647)`, List of allowed browser exam keys.
- **allow_reload_in_exam**: `BOOLEAN(1)`, Indicates whether the user can reload the exam.
- **allow_spell_checking**: `BOOLEAN(1)`, Indicates whether spell checking is enabled in SEB.
- **allow_user_quit_seb**: `BOOLEAN(1)`, Indicates whether the quit button is shown.
- **cmid**: `BIGINT(19)`, Foreign key to the course module ID.
- **enable_audio_control**: `BOOLEAN(1)`, Indicates whether volume and audio controls are shown.
- **expressions_allowed**: `LONGTEXT(2147483647)`, Comma or newline-separated list of allowed expressions.
- **expressions_blocked**: `LONGTEXT(2147483647)`, Comma or newline-separated list of blocked expressions.
- **filter_embedded_content**: `BOOLEAN(1)`, Indicates whether embedded content will be filtered.
- **link_quitseb**: `LONGTEXT(2147483647)`, Link to exit SEB.
- **mute_on_startup**: `BOOLEAN(1)`, Indicates whether the browser starts muted.
- **quit_password**: `LONGTEXT(2147483647)`, Password to exit SEB.
- **quiz_id**: `BIGINT(19)`, Foreign key to the quiz ID.
- **regex_allowed**: `LONGTEXT(2147483647)`, Regular expression of allowed URLs.
- **regex_blocked**: `LONGTEXT(2147483647)`, Regular expression of blocked URLs.
- **require_safe_exam_browser**: `BOOLEAN(1)`, Indicates whether SEB is required.
- **show_keyboard_layout**: `BOOLEAN(1)`, Indicates whether the keyboard layout is shown.
- **show_reload_button**: `BOOLEAN(1)`, Indicates whether the reload button is shown.
- **show_seb_download_link**: `BOOLEAN(1)`, Indicates whether the SEB download link should appear.
- **show_seb_taskbar**: `BOOLEAN(1)`, Indicates whether the SEB taskbar is shown.
- **show_time**: `BOOLEAN(1)`, Indicates whether the clock is shown.
- **show_wifi_control**: `BOOLEAN(1)`, Indicates whether the user can control networking.
- **template_id**: `BIGINT(19)`, Foreign key to `quizaccess_seb_template.id`.
- **user_confirm_quit**: `BOOLEAN(1)`, Indicates whether the confirm quit popup should appear.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.

---

### Table: quizaccess_seb_template

Templates for Safe Exam Browser configuration.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the record.
- **content**: `LONGTEXT(2147483647)`, Content of the template.
- **description**: `LONGTEXT(2147483647)`, Description of the template.
- **enabled**: `BOOLEAN(1)`, Indicates whether the template is enabled.
- **name**: `VARCHAR(255)`, Name of the template.
- **sort_order**: `BIGINT(19)`, Sort order of the template.
- **created_at**: `BIGINT(19)`, Timestamp of when the record was created.
- **updated_at**: `BIGINT(19)`, Timestamp of when the record was last modified.
- **user_id**: `BIGINT(19)`, ID of the user who last modified the record.
