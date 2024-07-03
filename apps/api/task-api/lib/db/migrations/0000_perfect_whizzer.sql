CREATE TABLE IF NOT EXISTS "task_adhocs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"blocking" boolean,
	"classname" varchar(256),
	"component" varchar(256),
	"custom_data" text,
	"fail_delay" varchar(256),
	"host_name" varchar(256),
	"next_runtime" timestamp NOT NULL,
	"pid" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_logs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"classname" varchar(256),
	"component" varchar(256),
	"db_reads" integer,
	"db_writes" integer,
	"host_name" varchar(256),
	"output" text,
	"pid" varchar(256),
	"result" boolean,
	"type" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_schedules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"blocking" boolean,
	"classname" varchar(256),
	"component" varchar(256),
	"customised" boolean,
	"day" varchar(256),
	"day_of_week" varchar(256),
	"disabled" boolean,
	"fail_delay" integer,
	"hostname" varchar(256),
	"hour" varchar(256),
	"last_runtime" timestamp,
	"next_runtime" timestamp,
	"time_started" timestamp,
	"minute" varchar(256),
	"month" varchar(256),
	"pid" varchar(256)
);
