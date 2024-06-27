CREATE TABLE IF NOT EXISTS "posts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attachment" varchar(256),
	"content" text,
	"course_id" varchar(256),
	"course_module_id" varchar(256),
	"format" integer,
	"group_id" varchar(256),
	"module" varchar(256),
	"module_id" varchar(256),
	"publish_state" varchar(256),
	"rating" integer,
	"subject" varchar(256),
	"summary" text,
	"summary_format" integer,
	"unique_hash" varchar(256),
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "posts" USING btree ("course_id");