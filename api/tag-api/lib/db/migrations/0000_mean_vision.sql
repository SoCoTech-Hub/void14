CREATE TABLE IF NOT EXISTS "tag_areas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"callback" varchar(256),
	"callback_file" varchar(256),
	"component" varchar(256),
	"enabled" boolean,
	"item_type" varchar(256),
	"multiple_contexts" boolean,
	"show_standard" boolean,
	"tag_coll_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag_colls" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"custom_url" varchar(256),
	"is_default" boolean,
	"searchable" boolean,
	"name" varchar(256),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag_correlations" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correlated_tags" text,
	"tag_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag_instances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"context_id" varchar(256),
	"item_id" varchar(256),
	"item_type" varchar(256),
	"ordering" integer,
	"tag_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"flag" integer,
	"is_standard" boolean,
	"name" varchar(256),
	"raw_name" varchar(256),
	"tag_coll_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag_areas" ADD CONSTRAINT "tag_areas_tag_coll_id_tag_colls_id_fk" FOREIGN KEY ("tag_coll_id") REFERENCES "public"."tag_colls"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag_correlations" ADD CONSTRAINT "tag_correlations_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tag_instances" ADD CONSTRAINT "tag_instances_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_tag_coll_id_tag_colls_id_fk" FOREIGN KEY ("tag_coll_id") REFERENCES "public"."tag_colls"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
