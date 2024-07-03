CREATE TABLE IF NOT EXISTS "reportbuilder_audiences" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"class_name" varchar(256),
	"config_data" text,
	"heading" varchar(256),
	"report_id" varchar(256),
	"user_modified_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reportbuilder_columns" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"aggregation" varchar(256),
	"column_order" integer,
	"heading" varchar(256),
	"report_id" varchar(256),
	"unique_identifier" varchar(256),
	"sort_direction" boolean DEFAULT false,
	"sort_enabled" boolean DEFAULT false,
	"sort_order" integer,
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reportbuilder_filters" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"filter_order" integer,
	"heading" varchar(256),
	"is_condition" boolean DEFAULT false,
	"report_id" varchar(256) NOT NULL,
	"unique_identifier" varchar(256),
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reportbuilder_reports" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"area" varchar(256),
	"component" varchar(256),
	"condition_data" text,
	"context_id" varchar(256) NOT NULL,
	"item_id" varchar(256),
	"name" varchar(256),
	"settings_data" text,
	"source" varchar(256),
	"type" integer,
	"unique_rows" boolean DEFAULT false,
	"user_modified" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reportbuilder_schedules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"audiences" text,
	"enabled" boolean,
	"format" varchar(256),
	"message" text,
	"message_format" integer,
	"name" varchar(256),
	"recurrence" integer,
	"report_empty" boolean,
	"report_id" varchar(256) NOT NULL,
	"subject" varchar(256),
	"time_last_sent" timestamp,
	"time_next_send" timestamp,
	"time_scheduled" timestamp,
	"user_modified" varchar(256) NOT NULL,
	"user_view_as" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reportbuilder_audiences_report_id_idx" ON "reportbuilder_audiences" USING btree ("report_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reportbuilder_columns_report_id_idx" ON "reportbuilder_columns" USING btree ("report_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reportbuilder_filters_report_id_idx" ON "reportbuilder_filters" USING btree ("report_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reportbuilder_reports_context_id_idx" ON "reportbuilder_reports" USING btree ("context_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reportbuilder_schedules_report_id_idx" ON "reportbuilder_schedules" USING btree ("report_id");