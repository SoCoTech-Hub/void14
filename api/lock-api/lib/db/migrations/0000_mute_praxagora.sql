CREATE TABLE IF NOT EXISTS "lock_dbs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"expires" timestamp,
	"owner" varchar(256),
	"resource_key" varchar(256)
);
