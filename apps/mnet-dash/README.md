### Table: mnet_application

Information about applications on remote hosts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the application.
- **display_name**: `VARCHAR(50)` NOT NULL, Display name of the application.
- **name**: `VARCHAR(50)` NOT NULL, Name of the application.
- **sso_jump_url**: `VARCHAR(255)` NOT NULL, URL for SSO jump.
- **sso_land_url**: `VARCHAR(255)` NOT NULL, URL for SSO land.
- **xmlrpc_server_url**: `VARCHAR(255)` NOT NULL, URL for XML-RPC server.

#### Indexes

- `CREATE INDEX idx_name ON mnet_application(name);`

---

### Table: mnet_host

Information about the local and remote hosts for RPC.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the host.
- **application_id**: `BIGINT` NOT NULL, Application ID associated with the host.
- **deleted**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the host is deleted.
- **force_theme**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the theme should be forced.
- **ip_address**: `VARCHAR(45)` NOT NULL, IP address of the host.
- **last_connect_time**: `BIGINT`, Last connection time.
- **last_log_id**: `BIGINT`, Last log ID.
- **name**: `VARCHAR(80)` NOT NULL, Name of the host.
- **port_no**: `INTEGER` NOT NULL, Port number.
- **public_key**: `TEXT` NOT NULL, Public key of the host.
- **public_key_expires**: `BIGINT` NOT NULL, Expiry time of the public key.
- **ssl_verification**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if SSL verification is enabled.
- **theme**: `VARCHAR(100)`, Theme associated with the host.
- **transport**: `SMALLINT` NOT NULL, Transport method used by the host.
- **wwwroot**: `VARCHAR(255)` NOT NULL, Root URL of the host.

#### Indexes

- `CREATE INDEX idx_applicationid ON mnet_host(applicationid);`
- `CREATE INDEX idx_ip_address ON mnet_host(ip_address);`
- `CREATE INDEX idx_name ON mnet_host(name);`

---

### Table: mnet_host2services

Information about the services for a given host.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the host-service link.
- **host_id**: `BIGINT` NOT NULL, Host ID associated with the service.
- **service_id**: `BIGINT` NOT NULL, Service ID associated with the host.
- **publish**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is published.
- **subscribe**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is subscribed.

#### Indexes

- `CREATE INDEX idx_hostid ON mnet_host2service(hostid);`
- `CREATE INDEX idx_serviceid ON mnet_host2service(serviceid);`

---

### Table: mnet_log

Store session data from users migrating to other sites.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the log entry.
- **action**: `VARCHAR(40)` NOT NULL, Action performed.
- **cm_id**: `BIGINT`, Course module ID.
- **course_id**: `BIGINT`, Course ID.
- **course_name**: `VARCHAR(40)`, Name of the course.
- **host_id**: `BIGINT` NOT NULL, Host ID.
- **info**: `VARCHAR(255)`, Additional information.
- **ip**: `VARCHAR(45)` NOT NULL, IP address.
- **module**: `VARCHAR(20)` NOT NULL, Module name.
- **remote_id**: `BIGINT`, Remote ID.
- **time**: `BIGINT` NOT NULL, Timestamp of the action.
- **url**: `VARCHAR(100)`, URL accessed.
- **user_id**: `BIGINT` NOT NULL, User ID.

#### Indexes

- `CREATE INDEX idx_action ON mnet_log(action);`
- `CREATE INDEX idx_cmid ON mnet_log(cmid);`
- `CREATE INDEX idx_course ON mnet_log(course);`
- `CREATE INDEX idx_hostid ON mnet_log(hostid);`
- `CREATE INDEX idx_module ON mnet_log(module);`
- `CREATE INDEX idx_remoteid ON mnet_log(remoteid);`
- `CREATE INDEX idx_time ON mnet_log(time);`
- `CREATE INDEX idx_userid ON mnet_log(userid);`

---

### Table: mnet_remote_rpc

Functions that might be called remotely.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the function.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the function is enabled.
- **function_name**: `VARCHAR(40)` NOT NULL, Name of the function.
- **plugin_name**: `VARCHAR(20)` NOT NULL, Name of the plugin.
- **plugin_type**: `VARCHAR(20)` NOT NULL, Type of the plugin.
- **xml_rpc_path**: `VARCHAR(80)` NOT NULL, XML-RPC path of the function.

#### Indexes

- `CREATE INDEX idx_functionname ON mnet_remote_rpc(function_name);`
- `CREATE INDEX idx_pluginname ON mnet_remote_rpc(plugin_name);`

---

### Table: mnet_remote_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service-function link.
- **rpc_id**: `BIGINT` NOT NULL, Function ID.
- **service_id**: `BIGINT` NOT NULL, Service ID.

#### Indexes

- `CREATE INDEX idx_rpcid ON mnet_remote_service2rpc(rpcid);`
- `CREATE INDEX idx_serviceid ON mnet_remote_service2rpc(serviceid);`

---

### Table: mnet_rpc

Functions or methods that we may publish or subscribe to.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the function.
- **classname**: `VARCHAR(150)`, Class name of the function.
- **enabled**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the function is enabled.
- **file_name**: `VARCHAR(100)` NOT NULL, Filename of the function.
- **function_name**: `VARCHAR(40)` NOT NULL, Name of the function.
- **help**: `TEXT`, Help text for the function.
- **plugin_name**: `VARCHAR(20)` NOT NULL, Name of the plugin.
- **plugin_type**: `VARCHAR(20)` NOT NULL, Type of the plugin.
- **profile**: `TEXT`, Method signature.
- **static**: `BOOLEAN`, Indicates if the function is static.
- **xml_rpc_path**: `VARCHAR(80)` NOT NULL, XML-RPC path of the function.

#### Indexes

- `CREATE INDEX idx_functionname ON mnet_rpc(functionname);`
- `CREATE INDEX idx_pluginname ON mnet_rpc(pluginname);`

---

### Table: mnet_services

A service is a group of functions.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service.
- **api_version**: `VARCHAR(10)` NOT NULL, API version of the service.
- **description**: `VARCHAR(40)` NOT NULL, Description of the service.
- **name**: `VARCHAR(40)` NOT NULL, Name of the service.
- **offer**: `BOOLEAN` NOT NULL DEFAULT FALSE, Indicates if the service is offered.

#### Indexes

- `CREATE INDEX idx_name ON mnet_service(name);`

---

### Table: mnet_service2rpc

Groups functions or methods under a service.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the service-function link.
- **rpc_id**: `BIGINT` NOT NULL, Function ID.
- **service_id**: `BIGINT` NOT NULL, Service ID.

#### Indexes

- `CREATE INDEX idx_rpcid ON mnet_service2rpc(rpcid);`
- `CREATE INDEX idx_serviceid ON mnet_service2rpc(serviceid);`

---

### Table: mnet_sessions

Store session data from users migrating to other sites.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the session.
- **confirm_timeout**: `BIGINT` NOT NULL, UNIX timestamp for expiry of session.
- **expires**: `BIGINT` NOT NULL, Expire time of session on peer.
- **mnet_host_id**: `BIGINT` NOT NULL, Unique remote host ID.
- **session_id**: `VARCHAR(40)` NOT NULL, The session ID.
- **token**: `VARCHAR(40)` NOT NULL, Unique SHA1 token.
- **user_agent**: `VARCHAR(40)` NOT NULL, SHA1 hash of user agent.
- **username**: `VARCHAR(100)` NOT NULL, Unique username.
- **user_id**: `BIGINT` NOT NULL, Unique user ID.

#### Indexes

- `CREATE INDEX idx_mnethostid ON mnet_session(mnet_host_id);`
- `CREATE INDEX idx_session_id ON mnet_session(session_id);`
- `CREATE INDEX idx_token ON mnet_session(token);`
- `CREATE INDEX idx_userid ON mnet_session(user_id);`

---

### Table: mnet_sso_access_controls

Users by host permitted (or not) to login from a remote provider.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique identifier for the access control entry.
- **access_ctrl**: `VARCHAR(20)` NOT NULL, Indicates whether login is allowed or denied.
- **mnet_host_id**: `BIGINT` NOT NULL, ID of the MNet host.
- **username**: `VARCHAR(100)` NOT NULL, Username of the user.

#### Indexes

- `CREATE INDEX idx_mnet_host_id ON mnet_sso_access_control(mnet_host_id);`
- `CREATE INDEX idx_username ON mnet_sso_access_control(username);`

---

### Table: mnet_service_enrol_courses

Caches the information fetched via XML-RPC about courses on remote hosts.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique remote-course ID.
- **category_id**: `BIGINT` NOT NULL, ID of the category on the remote server.
- **category_name**: `VARCHAR(255)` NOT NULL, Name of the category.
- **full_name**: `VARCHAR(254)` NOT NULL, Full name of the course.
- **host_id**: `BIGINT` NOT NULL, ID of the remote MNet host.
- **id_number**: `VARCHAR(100)`, ID number of the course.
- **remote_id**: `BIGINT` NOT NULL, ID of the course on its home server.
- **role_id**: `BIGINT`, ID of the role at the remote server for local users.
- **role_name**: `VARCHAR(255)`, Name of the role at the remote server.
- **short_name**: `VARCHAR(100)` NOT NULL, Short name of the course.
- **sort_order**: `BIGINT`, Sort order of the course.
- **start_date**: `BIGINT` NOT NULL, Start date of the course.
- **summary**: `TEXT`, Summary of the course.
- **summary_format**: `SMALLINT`, Format of the summary field.

#### Indexes

- `CREATE INDEX idx_categoryid ON mnetservice_enrol_courses(categoryid);`
- `CREATE INDEX idx_hostid ON mnetservice_enrol_courses(hostid);`
- `CREATE INDEX idx_remoteid ON mnetservice_enrol_courses(remoteid);`
- `CREATE INDEX idx_shortname ON mnetservice_enrol_courses(shortname);`
- `CREATE INDEX idx_startdate ON mnetservice_enrol_courses(startdate);`

---

### Table: mnet_service_enrol_enrolments

Caches the information about enrolments of local users in remote courses.

#### Fields

- **id**: `BIGINT` PRIMARY KEY, Unique enrolment ID.
- **enrol_time**: `BIGINT` NOT NULL, Time of enrolment.
- **enrol_type**: `VARCHAR(20)` NOT NULL, Name of the enrolment plugin at the remote server.
- **host_id**: `BIGINT` NOT NULL, ID of the remote MNet host.
- **remote_course_id**: `BIGINT` NOT NULL, ID of the course at the remote server.
- **role_name**: `VARCHAR(255)`, Name of the role at the remote server.
- **user_id**: `BIGINT` NOT NULL, ID of the local user.

#### Indexes

- `CREATE INDEX idx_hostid ON mnetservice_enrol_enrolments(hostid);`
- `CREATE INDEX idx_remotecourseid ON mnetservice_enrol_enrolments(remotecourseid);`
- `CREATE INDEX idx_userid ON mnetservice_enrol_enrolments(userid);`
