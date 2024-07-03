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
CREATE TABLE IF NOT EXISTS "glossaries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allow_comments" boolean,
	"allow_duplicated_entries" boolean,
	"allow_print_view" boolean,
	"approval_display_format" varchar(256),
	"assessed" boolean,
	"assess_time_finish" timestamp,
	"assess_time_start" timestamp,
	"completion_entries" integer,
	"course" varchar(256),
	"default_approval" boolean,
	"display_format" varchar(256),
	"edit_always" boolean,
	"ent_by_page" integer,
	"global_glossary" boolean,
	"intro" text,
	"intro_format" integer,
	"main_glossary" boolean,
	"name" varchar(256),
	"rss_articles" integer,
	"rss_type" integer,
	"scale" integer,
	"show_all" boolean,
	"show_alphabet" boolean,
	"show_special" boolean,
	"use_dyna_link" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossary_aliases" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"alias" varchar(256),
	"entry_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossary_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"glossary_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"use_dyna_link" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossary_entries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"approved" boolean,
	"attachment" varchar(256),
	"case_sensitive" boolean,
	"concept" varchar(256),
	"definition" text,
	"definition_trust" boolean,
	"definition_format" integer,
	"full_match" boolean,
	"glossary_id" varchar(256),
	"source_glossary_id" varchar(256),
	"teacher_entry" boolean,
	"use_dyna_link" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossary_entries_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"category_id" varchar(256),
	"entry_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "glossary_formats" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"default_hook" varchar(256),
	"default_mode" varchar(256),
	"name" varchar(256),
	"pop_up_format_name" varchar(256),
	"show_group" boolean,
	"visible" boolean,
	"show_tabs" varchar(256),
	"sort_key" varchar(256),
	"sort_order" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "glossary_categories" ADD CONSTRAINT "glossary_categories_glossary_id_glossaries_id_fk" FOREIGN KEY ("glossary_id") REFERENCES "public"."glossaries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "glossary_formats_sort_order_idx" ON "glossary_formats" USING btree ("sort_order");