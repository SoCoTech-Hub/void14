### Table: mnet_application

Information about applications on remote hosts.

#### Fields

- **display_name**: `VARCHAR(50)`, Display name of the application.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the application.
- **name**: `VARCHAR(50)`, Name of the application.
- **sso_jump_url**: `VARCHAR(255)`, URL for SSO jump.
- **sso_land_url**: `VARCHAR(255)`, URL for SSO land.
- **xmlrpc_server_url**: `VARCHAR(255)`, URL for XML-RPC server.

---

### Table: mnet_host

Information about the local and remote hosts for RPC.

#### Fields

- **applicationid**: `BIGINT(19)`, Application ID associated with the host.
- **deleted**: `BIT(1)`, Indicates if the host is deleted.
- **force_theme**: `BIT(1)`, Indicates if the theme should be forced.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the host.
- **ip_address**: `VARCHAR(45)`, IP address of the host.
- **last_connect_time**: `BIGINT(19)`, Last connection time.
- **last_log_id**: `BIGINT(19)`, Last log ID.
- **name**: `VARCHAR(80)`, Name of the host.
- **portno**: `MEDIUMINT(7)`, Port number.
- **public_key**: `LONGTEXT`, Public key of the host.
- **public_key_expires**: `BIGINT(19)`, Expiry time of the public key.
- **sslverification**: `BIT(1)`, Indicates if SSL verification is enabled.
- **theme**: `VARCHAR(100)` (Nullable), Theme associated with the host.
- **transport**: `TINYINT(3)`, Transport method used by the host.
- **wwwroot**: `VARCHAR(255)`, Root URL of the host.

---

### Table: mnet_host2service

Information about the services for a given host.

#### Fields

- **hostid**: `BIGINT(19)`, Host ID associated with the service.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the host-service link.
- **publish**: `BIT(1)`, Indicates if the service is published.
- **serviceid**: `BIGINT(19)`, Service ID associated with the host.
- **subscribe**: `BIT(1)`, Indicates if the service is subscribed.

---

### Table: mnet_log

Store session data from users migrating to other sites.

#### Fields

- **action**: `VARCHAR(40)`, Action performed.
- **cmid**: `BIGINT(19)`, Course module ID.
- **course**: `BIGINT(19)`, Course ID.
- **coursename**: `VARCHAR(40)`, Name of the course.
- **hostid**: `BIGINT(19)`, Host ID.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the log entry.
- **info**: `VARCHAR(255)`, Additional information.
- **ip**: `VARCHAR(45)`, IP address.
- **module**: `VARCHAR(20)`, Module name.
- **remoteid**: `BIGINT(19)`, Remote ID.
- **time**: `BIGINT(19)`, Timestamp of the action.
- **url**: `VARCHAR(100)`, URL accessed.
- **userid**: `BIGINT(19)`, User ID.

---

### Table: mnet_remote_rpc

Functions that might be called remotely.

#### Fields

- **enabled**: `BIT(1)`, Indicates if the function is enabled.
- **functionname**: `VARCHAR(40)`, Name of the function.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the function.
- **pluginname**: `VARCHAR(20)`, Name of the plugin.
- **plugintype**: `VARCHAR(20)`, Type of the plugin.
- **xmlrpcpath**: `VARCHAR(80)`, XML-RPC path of the function.

---

### Table: mnet_remote_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the service-function link.
- **rpcid**: `BIGINT(19)`, Function ID.
- **serviceid**: `BIGINT(19)`, Service ID.

---

### Table: mnet_rpc

Functions or methods that we may publish or subscribe to.

#### Fields

- **classname**: `VARCHAR(150)` (Nullable), Class name of the function.
- **enabled**: `BIT(1)`, Indicates if the function is enabled.
- **filename**: `VARCHAR(100)`, Filename of the function.
- **functionname**: `VARCHAR(40)`, Name of the function.
- **help**: `LONGTEXT`, Help text for the function.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the function.
- **pluginname**: `VARCHAR(20)`, Name of the plugin.
- **plugintype**: `VARCHAR(20)`, Type of the plugin.
- **profile**: `LONGTEXT`, Method signature.
- **static**: `BIT(1)` (Nullable), Indicates if the function is static.
- **xmlrpcpath**: `VARCHAR(80)`, XML-RPC path of the function.

---

### Table: mnet_service

A service is a group of functions.

#### Fields

- **apiversion**: `VARCHAR(10)`, API version of the service.
- **description**: `VARCHAR(40)`, Description of the service.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the service.
- **name**: `VARCHAR(40)`, Name of the service.
- **offer**: `BIT(1)`, Indicates if the service is offered.

---

### Table: mnet_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the service-function link.
- **rpcid**: `BIGINT(19)`, Function ID.
- **serviceid**: `BIGINT(19)`, Service ID.

---

### Table: mnet_session

Store session data from users migrating to other sites.

#### Fields

- **confirm_timeout**: `BIGINT(19)`, UNIX timestamp for expiry of session.
- **expires**: `BIGINT(19)`, Expire time of session on peer.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the session.
- **mnethostid**: `BIGINT(19)`, Unique remote host ID.
- **session_id**: `VARCHAR(40)`, The PHP session ID.
- **token**: `VARCHAR(40)`, Unique SHA1 token.
- **useragent**: `VARCHAR(40)`, SHA1 hash of user agent.
- **userid**: `BIGINT(19)`, Unique user ID.
- **username**: `VARCHAR(100)`, Unique username.

---

### Table: mnet_sso_access_control

Users by host permitted (or not) to login from a remote provider.

#### Fields

- **accessctrl**: `VARCHAR(20)`, Indicates whether login is allowed or denied.
- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the access control entry.
- **mnet_host_id**: `BIGINT(19)`, ID of the MNet host.
- **username**: `VARCHAR(100)`, Username of the user.

---

### Table: mnetservice_enrol_courses

Caches the information fetched via XML-RPC about courses on remote hosts.

#### Fields

- **categoryid**: `BIGINT(19)`, ID of the category on the remote server.
- **categoryname**: `VARCHAR(255)`, Name of the category.
- **fullname**: `VARCHAR(254)`, Full name of the course.
- **hostid**: `BIGINT(19)`, ID of the remote MNet host.
- **id**: `BIGINT(19)` (Primary Key), Unique remote-course ID.
- **idnumber**: `VARCHAR(100)`, ID number of the course.
- **remoteid**: `BIGINT(19)`, ID of the course on its home server.
- **roleid**: `BIGINT(19)`, ID of the role at the remote server for local users.
- **rolename**: `VARCHAR(255)`, Name of the role at the remote server.
- **shortname**: `VARCHAR(100)`, Short name of the course.
- **sortorder**: `BIGINT(19)`, Sort order of the course.
- **startdate**: `BIGINT(19)`, Start date of the course.
- **summary**: `LONGTEXT`, Summary of the course.
- **summaryformat**: `SMALLINT(5)` (Nullable), Format of the summary field.

---

### Table: mnetservice_enrol_enrolments

Caches the information about enrolments of local users in remote courses.

#### Fields

- **enroltime**: `BIGINT(19)`, Time of enrolment.
- **enroltype**: `VARCHAR(20)`, Name of the enrolment plugin at the remote server.
- **hostid**: `BIGINT(19)`, ID of the remote MNet host.
- **id**: `BIGINT(19)` (Primary Key), Unique enrolment ID.
- **remotecourseid**: `BIGINT(19)`, ID of the course at the remote server.
- **rolename**: `VARCHAR(255)`, Name of the role at the remote server.
- **userid**: `BIGINT(19)`, ID of the local user.
