CREATE TABLE IF NOT EXISTS "resource_olds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"all_text" text,
	"cm_id" varchar(256),
	"course_id" varchar(256),
	"intro" text,
	"intro_format" integer,
	"migrated" boolean,
	"name" varchar(256) NOT NULL,
	"new_id" varchar(256),
	"new_module" varchar(256),
	"old_id" varchar(256),
	"type" varchar(256),
	"reference" varchar(256),
	"options" varchar(256),
	"popup" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"display" boolean,
	"display_options" text,
	"filter_files" integer,
	"intro" text,
	"intro_format" integer,
	"legacy_files" integer,
	"legacy_files_last" integer,
	"name" varchar(256),
	"revision" integer,
	"to_be_migrated" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
