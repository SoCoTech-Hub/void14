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
CREATE TABLE IF NOT EXISTS "wiki_links" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"from_page_id" varchar(256) NOT NULL,
	"sub_wiki_id" varchar(256) NOT NULL,
	"to_missing_page" varchar(256) NOT NULL,
	"to_page_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_locks" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"locke_date" timestamp,
	"wiki_page_id" varchar(256) NOT NULL,
	"section_name" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_pages" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cached_content" text,
	"page_views" integer,
	"read_only" boolean,
	"sub_wiki_id" varchar(256),
	"time_rendered" timestamp,
	"title" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wikis" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"default_format" varchar(256),
	"edit_begin" integer,
	"edit_end" integer,
	"first_page_title" varchar(256),
	"force_format" boolean,
	"intro" text,
	"intro_format" integer,
	"name" varchar(256),
	"wiki_mode" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_subwikis" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"group_id" varchar(256),
	"wiki_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_synonyms" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"wiki_page_id" varchar(256) NOT NULL,
	"page_synonym" varchar(256),
	"wiki_subwiki_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wiki_versions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text,
	"content_format" integer,
	"wiki_page_id" varchar(256) NOT NULL,
	"version" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_links" ADD CONSTRAINT "wiki_links_from_page_id_wiki_pages_id_fk" FOREIGN KEY ("from_page_id") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_links" ADD CONSTRAINT "wiki_links_sub_wiki_id_wiki_pages_id_fk" FOREIGN KEY ("sub_wiki_id") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_links" ADD CONSTRAINT "wiki_links_to_missing_page_wiki_pages_id_fk" FOREIGN KEY ("to_missing_page") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_links" ADD CONSTRAINT "wiki_links_to_page_id_wiki_pages_id_fk" FOREIGN KEY ("to_page_id") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_locks" ADD CONSTRAINT "wiki_locks_wiki_page_id_wiki_pages_id_fk" FOREIGN KEY ("wiki_page_id") REFERENCES "public"."wiki_pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_subwikis" ADD CONSTRAINT "wiki_subwikis_wiki_id_wikis_id_fk" FOREIGN KEY ("wiki_id") REFERENCES "public"."wikis"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_synonyms" ADD CONSTRAINT "wiki_synonyms_wiki_page_id_wiki_pages_id_fk" FOREIGN KEY ("wiki_page_id") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_synonyms" ADD CONSTRAINT "wiki_synonyms_wiki_subwiki_id_wiki_subwikis_id_fk" FOREIGN KEY ("wiki_subwiki_id") REFERENCES "public"."wiki_subwikis"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wiki_versions" ADD CONSTRAINT "wiki_versions_wiki_page_id_wiki_pages_id_fk" FOREIGN KEY ("wiki_page_id") REFERENCES "public"."wiki_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wiki_links_from_page_id_idx" ON "wiki_links" ("from_page_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wikis_course_id_idx" ON "wikis" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wiki_subwikis_wiki_id_idx" ON "wiki_subwikis" ("wiki_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wiki_synonyms_wiki_page_id_idx" ON "wiki_synonyms" ("wiki_page_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wiki_versions_wiki_page_id_idx" ON "wiki_versions" ("wiki_page_id");