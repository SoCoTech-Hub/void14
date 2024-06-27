CREATE TABLE IF NOT EXISTS "data_contents" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text,
	"content1" text,
	"content2" text,
	"content3" text,
	"content4" text,
	"field_id" varchar(256) NOT NULL,
	"data_record_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_records" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"approved" boolean,
	"data_id" varchar(256) NOT NULL,
	"group_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "datas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"add_template" text,
	"approval" boolean,
	"assessed" integer,
	"assess_time_finish" integer,
	"assess_time_start" integer,
	"comments" boolean,
	"completion_entries" integer,
	"config" text,
	"course" integer,
	"css_template" text,
	"default_sort" integer,
	"default_sort_dir" boolean,
	"edit_any" boolean,
	"intro" text,
	"intro_format" boolean,
	"js_template" text,
	"list_template" text,
	"list_template_footer" text,
	"list_template_header" text,
	"manage_approved" boolean,
	"max_entries" integer,
	"name" varchar(256),
	"notification" integer,
	"required_entries" integer,
	"required_entries_to_view" integer,
	"rss_articles" integer,
	"rss_template" text,
	"rss_title_template" text,
	"scale" integer,
	"search_template" text,
	"single_template" text,
	"time_available_from" integer,
	"time_available_to" integer,
	"time_view_from" integer,
	"time_view_to" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fields" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"data_id" varchar(256) NOT NULL,
	"description" text,
	"name" varchar(256),
	"param1" text,
	"param2" text,
	"param3" text,
	"param4" text,
	"param5" text,
	"param6" text,
	"param7" text,
	"param8" text,
	"param9" text,
	"param10" text,
	"required" boolean,
	"type" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_contents" ADD CONSTRAINT "data_contents_field_id_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_contents" ADD CONSTRAINT "data_contents_data_record_id_data_records_id_fk" FOREIGN KEY ("data_record_id") REFERENCES "public"."data_records"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_records" ADD CONSTRAINT "data_records_data_id_datas_id_fk" FOREIGN KEY ("data_id") REFERENCES "public"."datas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fields" ADD CONSTRAINT "fields_data_id_datas_id_fk" FOREIGN KEY ("data_id") REFERENCES "public"."datas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
