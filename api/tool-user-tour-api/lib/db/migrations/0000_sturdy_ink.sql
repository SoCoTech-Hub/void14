CREATE TABLE IF NOT EXISTS "tool_user_tours_steps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"config_data" text,
	"content" text,
	"content_format" integer,
	"sort_order" integer,
	"target_type" integer,
	"target_value" text,
	"title" varchar(256),
	"tour_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_user_tours_tours" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"config_data" text,
	"description" text,
	"display_step_numbers" boolean,
	"enabled" boolean,
	"end_tour_label" varchar(256),
	"name" varchar(256),
	"path_match" varchar(256),
	"sort_order" integer
);
