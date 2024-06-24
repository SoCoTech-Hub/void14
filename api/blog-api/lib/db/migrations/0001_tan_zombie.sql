CREATE TABLE IF NOT EXISTS "blog_associations" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"blog_external_id" varchar(256) NOT NULL,
	"context_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_externals" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"failed_last_sync" boolean,
	"filter_tags" varchar(256),
	"name" varchar(256),
	"url" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_comments" ALTER COLUMN "parent_id" SET DATA TYPE varchar(191);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "blog_external_id_idx" ON "blog_associations" ("blog_external_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_associations" ADD CONSTRAINT "blog_associations_blog_external_id_blog_externals_id_fk" FOREIGN KEY ("blog_external_id") REFERENCES "blog_externals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
