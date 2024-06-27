CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text NOT NULL,
	"name" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_instances" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"block_name" varchar(256),
	"config_data" text,
	"default_region" varchar(256),
	"default_weight" integer,
	"page_type_pattern" varchar(256),
	"parent_context_id" varchar(256),
	"required_by_theme" boolean,
	"show_in_sub_contexts" boolean,
	"sub_page_pattern" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_positions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"block_instance_id" varchar(256) NOT NULL,
	"context_id" varchar(256),
	"page_type" varchar(256),
	"region" varchar(256),
	"sub_page" varchar(256),
	"visible" boolean,
	"weight" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_recent_activities" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" integer,
	"cm_id" varchar(256),
	"course_id" varchar(256),
	"mod_name" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_recently_accessed_items" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cm_id" varchar(256),
	"course_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_rss_clients" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"preferred_title" varchar(256),
	"shared" boolean,
	"skip_time" integer,
	"skip_until" integer,
	"title" varchar(256),
	"url" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blocks" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cron_id" varchar(256),
	"last_cron" timestamp,
	"name" varchar(256),
	"visible" boolean
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bp_block_instance_id_idx" ON "block_positions" ("block_instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "block_recent_activities" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "brai_course_id_idx" ON "block_recently_accessed_items" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "b_cron_id_idx" ON "blocks" ("cron_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_positions" ADD CONSTRAINT "block_positions_block_instance_id_block_instances_id_fk" FOREIGN KEY ("block_instance_id") REFERENCES "block_instances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
