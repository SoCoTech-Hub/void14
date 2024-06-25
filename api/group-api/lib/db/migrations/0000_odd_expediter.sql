CREATE TABLE IF NOT EXISTS "groupings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"config_data" text,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"id_number" varchar(256),
	"name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groupings_groups" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"grouping_id" varchar(256) NOT NULL,
	"group_id" varchar(256) NOT NULL,
	"time_added" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"enrolment_key" varchar(256),
	"id_number" varchar(256),
	"name" varchar(256),
	"picture" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups_members" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"group_id" varchar(256),
	"item_id" varchar(256),
	"time_added" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupings_groups" ADD CONSTRAINT "groupings_groups_grouping_id_groupings_id_fk" FOREIGN KEY ("grouping_id") REFERENCES "public"."groupings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groupings_groups" ADD CONSTRAINT "groupings_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
