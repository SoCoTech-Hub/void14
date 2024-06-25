CREATE TABLE IF NOT EXISTS "tool_monitor_events" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"context_instance_id" varchar(256),
	"context_level" varchar(256),
	"course_id" varchar(256),
	"event_name" varchar(256),
	"link" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_monitor_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"sid" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_monitor_rules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"event_name" varchar(256),
	"frequency" integer,
	"name" varchar(256),
	"plugin" varchar(256),
	"template" text,
	"template_format" integer,
	"time_window" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_monitor_subscriptions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cm_id" varchar(256),
	"course_id" varchar(256),
	"inactive_date" timestamp,
	"last_notification_sent" timestamp,
	"tool_monitor_rule_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_monitor_subscriptions" ADD CONSTRAINT "tool_monitor_subscriptions_tool_monitor_rule_id_tool_monitor_rules_id_fk" FOREIGN KEY ("tool_monitor_rule_id") REFERENCES "public"."tool_monitor_rules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
