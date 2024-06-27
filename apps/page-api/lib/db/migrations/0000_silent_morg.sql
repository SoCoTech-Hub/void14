CREATE TABLE IF NOT EXISTS "pages" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text,
	"content_format" integer,
	"course_id" varchar(256),
	"display" integer,
	"display_options" text,
	"intro" text,
	"intro_format" integer,
	"legacy_files" integer,
	"legacy_files_last" integer,
	"name" varchar(256),
	"revision" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "pages" USING btree ("course_id");