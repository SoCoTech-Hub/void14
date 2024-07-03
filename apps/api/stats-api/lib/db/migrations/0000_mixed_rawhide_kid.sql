CREATE TABLE IF NOT EXISTS "stats_dailies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stat1" varchar(256),
	"stat2" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats_monthlies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stat1" varchar(256),
	"stat2" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats_user_dailies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stats_reads" varchar(256),
	"stats_writes" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats_user_monthlies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stats_reads" varchar(256),
	"stats_writes" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats_user_weeklies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stats_reads" varchar(256),
	"stats_writes" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats_weeklies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"role_id" varchar(256),
	"stat1" varchar(256),
	"stat2" varchar(256),
	"stat_type" varchar(256),
	"time_end" timestamp
);
