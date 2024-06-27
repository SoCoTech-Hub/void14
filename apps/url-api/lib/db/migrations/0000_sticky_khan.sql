CREATE TABLE IF NOT EXISTS "urls" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"display" integer,
	"display_options" text,
	"external_url" text,
	"intro" text,
	"intro_format" integer,
	"name" varchar(256),
	"parameters" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "urls" USING btree ("course_id");