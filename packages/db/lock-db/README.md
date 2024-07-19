### Table: lock_dbs

#### Description

This table stores active and inactive lock types for database locking method.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the lock entry.
- **expires**: `BIGINT(19)`, Expiry time for an active lock.
- **owner**: `VARCHAR(36)` (nullable), UUID indicating the owner of the lock.
- **resource_key**: `VARCHAR(255)`, String identifying the resource to be locked. It should use the Frankenstyle format.

---

This table serves as a repository for managing database locks, including information about the owner, the resource being locked, and the expiry time for active locks. If you have any additional requirements or questions about how database locking is implemented, feel free to ask!
