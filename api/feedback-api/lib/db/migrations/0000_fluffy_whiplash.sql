CREATE TABLE IF NOT EXISTS "feedback_completeds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"anonymous_response" boolean,
	"course_id" varchar(256),
	"feedback" varchar(256),
	"random_response" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_completedtmps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"anonymous_response" boolean,
	"course_id" varchar(256),
	"feedback" varchar(256),
	"guest_id" varchar(256),
	"random_response" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_items" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"depend_item" varchar(256),
	"depend_value" varchar(256),
	"feedback" varchar(256),
	"has_value" boolean,
	"label" varchar(256),
	"name" varchar(256),
	"options" varchar(256),
	"position" integer,
	"presentation" text,
	"required" boolean,
	"template" varchar(256),
	"type" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedbacks" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"anonymous" boolean,
	"auto_numbering" boolean,
	"completion_submit" boolean,
	"course" integer,
	"email_notification" boolean,
	"intro" text,
	"introformat" integer,
	"multiple_submit" boolean,
	"name" varchar(256),
	"page_after_submit" text,
	"page_after_submit_format" integer,
	"publish_stats" boolean,
	"site_after_submit" varchar(256),
	"time_close" timestamp,
	"time_open" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_sitecourse_maps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"feedback_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_templates" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"is_public" boolean,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_values" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"completed" varchar(256),
	"course_id" varchar(256),
	"item" varchar(256),
	"tmp_completed" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback_valuetmps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"completed" varchar(256),
	"course_id" varchar(256),
	"item" varchar(256),
	"tmp_completed" varchar(256),
	"value" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback_sitecourse_maps" ADD CONSTRAINT "feedback_sitecourse_maps_feedback_id_feedbacks_id_fk" FOREIGN KEY ("feedback_id") REFERENCES "public"."feedbacks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
