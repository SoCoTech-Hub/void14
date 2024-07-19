# Badge Management

## Tables

This README provides an overview of the tables in the Badge Management application, along with their fields and functions.

### Table: badge

This table defines badges.

#### Fields

- **id**: BIGINT(19)
- **attachment**: BIT(1) \* Attach baked badge for download.
- **courseid**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **expiredate**: BIGINT(19)
- **expireperiod**: BIGINT(19)
- **imageauthoremail**: VARCHAR(255)
- **imageauthorname**: VARCHAR(255)
- **imageauthorurl**: VARCHAR(255)
- **imagecaption**: LONGTEXT(2147483647)
- **issuercontact**: VARCHAR(255)
- **issuername**: VARCHAR(255)
- **issuerurl**: VARCHAR(255)
- **language**: VARCHAR(255)
- **message**: LONGTEXT(2147483647)
- **messagesubject**: LONGTEXT(2147483647)
- **name**: VARCHAR(255)
- **nextcron**: BIGINT(19)
- **notification**: BIT(1) \* Message when badge is awarded.
- **status**: BIT(1) \* Badge status: 0 = inactive, 1 = active, 2 = active+locked, 3 = inactive+locked, 4 = archived.
- **type**: BIT(1) \* 1 = site, 2 = course.
- **usermodified**: BIGINT(19)
- **version**: VARCHAR(255)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: badge_alignment

This table defines alignment for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **targetcode**: VARCHAR(255)
- **targetdescription**: LONGTEXT(2147483647)
- **targetframework**: VARCHAR(255)
- **targetname**: VARCHAR(255)
- **targeturl**: VARCHAR(255)

### Table: badge_backpack

This table defines settings for connecting external backpacks.

#### Fields

- **id**: BIGINT(19)
- **autosync**: BIT(1)
- **backpackuid**: BIGINT(19)
- **email**: VARCHAR(100)
- **externalbackpackid**: BIGINT(19)
- **password**: VARCHAR(50)
- **user_id**: BIGINT(19)

### Table: badge_backpack_oauth2

This table stores OAuth2 settings for external backpacks.

#### Fields

- **id**: BIGINT(19)
- **expires**: BIGINT(19)
- **externalbackpackid**: BIGINT(19)
- **issuerid**: BIGINT(19)
- **refreshtoken**: LONGTEXT(2147483647)
- **scope**: LONGTEXT(2147483647)
- **token**: LONGTEXT(2147483647)
- **usermodified**: BIGINT(19)
- **created_at**: BIGINT(19)
- **updated_at**: BIGINT(19)
- **user_id**: BIGINT(19)

### Table: badge_criteria

This table defines criteria for issuing badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **criteriatype**: BIGINT(19)
- **description**: LONGTEXT(2147483647)
- **descriptionformat**: TINYINT(3)
- **method**: BIT(1) \* 1 = all, 2 = any.

### Table: badge_criteria_met

This table defines criteria that were met for an issued badge.

#### Fields

- **id**: BIGINT(19)
- **critid**: BIGINT(19)
- **datemet**: BIGINT(19)
- **issuedid**: BIGINT(19)
- **userid**: BIGINT(19)

### Table: badge_criteria_param

This table defines parameters for badges criteria.

#### Fields

- **id**: BIGINT(19)
- **critid**: BIGINT(19)
- **name**: VARCHAR(255)
- **value**: VARCHAR(255)

### Table: badge_endorsement

This table defines endorsement for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **claimcomment**: LONGTEXT(2147483647)
- **claimid**: VARCHAR(255)
- **dateissued**: BIGINT(19)
- **issueremail**: VARCHAR(255)
- **issuername**: VARCHAR(255)
- **issuerurl**: VARCHAR(255)

### Table: badge_external

This table stores settings for external badges display.

#### Fields

- **id**: BIGINT(19)
- **assertion**: LONGTEXT(2147483647) \* Assertion of external badge.
- **backpackid**: BIGINT(19)
- **collectionid**: BIGINT(19)
- **entityid**: VARCHAR(255)

### Table: badge_external_backpack

This table defines settings for site-level backpacks that a user can connect to.

#### Fields

- **id**: BIGINT(19)
- **apiversion**: VARCHAR(12)
- **backpackapiurl**: VARCHAR(255)
- **backpackweburl**: VARCHAR(255)
- **oauth2_issuerid**: BIGINT(19)
- **sortorder**: BIGINT(19)

### Table: badge_external_identifier

This table stores settings for external badge mappings.

#### Fields

- **id**: BIGINT(19)
- **externalid**: VARCHAR(128)
- **internalid**: VARCHAR(128)
- **sitebackpackid**: BIGINT(19)
- **type**: VARCHAR(16)

### Table: badge_issued

This table defines issued badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **dateexpire**: BIGINT(19)
- **dateissued**: BIGINT(19)
- **issuernotified**: BIGINT(19)
- **uniquehash**: LONGTEXT(2147483647)
- **visible**: BIT(1)
- **userid**: BIGINT(19)

### Table: badge_manual_award

This table tracks manual award criteria for badges.

#### Fields

- **id**: BIGINT(19)
- **badgeid**: BIGINT(19)
- **datemet**: BIGINT(19)
- **issuerid**: BIGINT(19)
- **issuerrole**: BIGINT(19)
- **recipientid**: BIGINT(19)

### Table: badge_related

This table defines related badges.

#### Fields

- **id**: BIGINT(19)
- **badge_id**: BIGINT(19)
- **relatedbadgeid**: BIGINT(19)
