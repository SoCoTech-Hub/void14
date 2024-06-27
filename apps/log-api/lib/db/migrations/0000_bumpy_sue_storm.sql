CREATE TABLE IF NOT EXISTS "log_displays" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"component" varchar(256),
	"field" varchar(256),
	"module" varchar(256),
	"m_table" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "log_queries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"back_trace" text,
	"error" integer,
	"exec_time" real,
	"info" text,
	"q_type" integer,
	"sql_params" text,
	"sql_text" text,
	"time_logged" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logstore_standard_logs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"anonymous" boolean,
	"component" varchar(256),
	"context_id" varchar(256),
	"context_instance_id" varchar(256),
	"context_level" integer,
	"course_id" varchar(256),
	"crud" varchar(256),
	"edu_level" boolean,
	"event_name" varchar(256),
	"ip" varchar(256),
	"object_id" varchar(256),
	"object_table" varchar(256),
	"origin" varchar(256),
	"other" text,
	"real_user_id" varchar(256),
	"related_user_id" varchar(256),
	"target" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
