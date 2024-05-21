# Big Blue Button Dashboard

## Tables

This README provides an overview of the tables in the BigBlueButtonBN application, along with their fields and functions.

### Table: bigbluebuttonbn

This table stores information about a meeting.

#### Fields

- **clienttype**: BIT(1)
- **closingtime**: BIGINT(19)
- **completionattendance**: INT(10) \* Nonzero if a certain number of minutes in the meeting are required to mark an activity completed for a user.
- **completionengagementchats**: INT(10) \* Nonzero if chat during the meeting is required to mark an activity completed for a user.
- **completionengagementemojis**: INT(10) \* Nonzero if the use of emojis during the meeting is required to mark an activity completed for a user.
- **completionengagementpollvotes**: INT(10) \* Nonzero if poll voting during the meeting is required to mark an activity completed for a user.
- **completionengagementraisehand**: INT(10) \* Nonzero if raising hand during the meeting is required to mark an activity completed for a user.
- **completionengagementtalks**: INT(10) \* Nonzero if talking during the meeting is required to mark an activity completed for a user.
- **course**: BIGINT(19)
- **disablecam**: BIT(1)
- **disablemic**: BIT(1)
- **disablenote**: BIT(1)
- **disableprivatechat**: BIT(1)
- **disablepublicchat**: BIT(1)
- **hideuserlist**: BIT(1)
- **id**: BIGINT(19)
- **intro**: LONGTEXT(2147483647)
- **introformat**: SMALLINT(5) \* Default: 1.
- **lockedlayout**: BIT(1)
- **lockonjoin**: BIT(1)
- **lockonjoinconfigurable**: BIT(1)
- **meetingid**: VARCHAR(255)
- **moderatorpass**: VARCHAR(255)
- **muteonstart**: BIT(1)
- **name**: VARCHAR(255)
- **openingtime**: BIGINT(19)
- **participants**: LONGTEXT(2147483647)
- **presentation**: LONGTEXT(2147483647)
- **record**: BIT(1)
- **recordallfromstart**: BIT(1)
- **recordhidebutton**: BIT(1)
- **recordings_deleted**: BIT(1) \* Default: 1.
- **recordings_html**: BIT(1)
- **recordings_imported**: BIT(1)
- **recordings_preview**: BIT(1)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **type**: TINYINT(3)
- **userlimit**: SMALLINT(5)
- **viewerpass**: VARCHAR(255)
- **voicebridge**: MEDIUMINT(7)
- **wait**: BIT(1)
- **welcome**: LONGTEXT(2147483647)

### Table: bigbluebuttonbn_logs

This table stores meeting activity events.

#### Fields

- **bigbluebuttonbnid**: BIGINT(19)
- **courseid**: BIGINT(19)
- **id**: BIGINT(19)
- **log**: VARCHAR(32)
- **meetingid**: VARCHAR(256)
- **meta**: LONGTEXT(2147483647)
- **created_at**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: bigbluebuttonbn_recordings

This table stores references to recordings.

#### Fields

- **bigbluebuttonbnid**: BIGINT(19)
- **courseid**: BIGINT(19)
- **groupid**: BIGINT(19)
- **headless**: BIT(1)
- **id**: BIGINT(19)
- **imported**: BIT(1)
- **importeddata**: LONGTEXT(2147483647) \* This is the remote recording data stored as JSON and kept for future reference.
- **recordingid**: VARCHAR(64)
- **status**: BIT(1)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **usermodified**: BIGINT(19)
