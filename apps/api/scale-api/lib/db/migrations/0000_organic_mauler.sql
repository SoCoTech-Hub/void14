CREATE TABLE IF NOT EXISTS "scale_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"course_id" varchar(256),
	"description" text,
	"logged_user" varchar(256),
	"name" varchar(256),
	"old_id" varchar(256),
	"scale" text,
	"source" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scales" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"name" varchar(256),
	"scale" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
