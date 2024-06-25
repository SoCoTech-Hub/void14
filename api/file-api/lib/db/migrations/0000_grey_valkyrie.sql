CREATE TABLE IF NOT EXISTS "file_conversions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"converter" varchar(256),
	"data" text,
	"dest_file_id" varchar(256),
	"source_file_id" varchar(256),
	"status" boolean,
	"status_message" text,
	"target_format" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"author" varchar(256),
	"component" varchar(256),
	"content_hash" varchar(256),
	"context_id" varchar(256),
	"file_area" varchar(256),
	"file_name" varchar(256),
	"file_path" varchar(256),
	"file_size" integer,
	"item_id" varchar(256),
	"license" varchar(256),
	"mime_type" varchar(256),
	"path_name_hash" varchar(256),
	"reference_file_id" varchar(256),
	"sort_order" integer,
	"source" text,
	"status" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files_references" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"last_sync" timestamp,
	"reference" text,
	"reference_hash" varchar(256),
	"repository_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "folders" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"display" integer,
	"forced_download" boolean,
	"intro" text,
	"intro_format" integer,
	"name" varchar(256),
	"revision" integer,
	"show_download_folder" boolean,
	"show_expanded" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "infected_files" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"file_name" text,
	"quarantined_file" text,
	"reason" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "files_sort_order_idx" ON "files" USING btree ("sort_order");