# Badge - Dash

Big Blue Button is for conferencing on the platform

## Tables

List of Tables with their function described below:

### big_blue_button_bns

The big_blue_button_bns table to store information about a meeting

#### Fields

- id
- client_type
- closing_time
- completion_attendance \* Nonzero if a certain number of minutes in the meeting are required to mark an activity completed for a user.
- completion_engagement_chats \* Nonzero if chat during the meeting is required to mark an activity completed for a user.
- completion_engagement_emojis \* Nonzero if the use of emojis during the meeting is required to mark an activity completed for a user.
- completion_engagement_poll_votes \* Nonzero if poll voting during the meeting is required to mark an activity completed for a user.
- completion_engagement_raise_hand \* Nonzero if raising hand during the meeting is required to mark an activity completed for a user.
- completion_engagement_talks \* Nonzero if talking during the meeting is required to mark an activity completed for a user.
- course_id
- disable_cam
- disable_mic
- disable_note
- disable_private_chat
- disable_public_chat
- hide_user_list
- intro
- intro_format
- locked_layout
- lock_on_join
- lock_on_join_configurable
- meeting_id
- moderator_pass
- mute_on_start
- name
- opening_time
- participants
- presentation
- record
- record_all_from_start
- record_hide_button
- recordings_deleted
- recordings_html
- recordings_imported
- recordings_preview
- type
- user_limit
- viewer_pass
- voice_bridge
- wait
- welcome
- created_at
- updated_at

### big_blue_button_bn_logs

The big_blue_button_bn table to store meeting activity events

#### Fields

- id
- big_blue_button_bn_id
- course_id
- log
- meeting_id
- meta
- created_at
- updated_at
- user_id

### big_blue_button_bn_recordings

The big_blue_button_bn table to store references to recordings

#### Fields

- id
- big_blue_button_bn_id
- course_id
- group_id
- headless
- imported
- imported_data \* This is the remote recording data stored as json and kept for future reference.
- recording_id
- status
- created_at
- updated_at
- user_id
