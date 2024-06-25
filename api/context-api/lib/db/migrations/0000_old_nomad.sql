CREATE TABLE IF NOT EXISTS "contexts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_level" integer,
	"depth" integer,
	"instance_id" varchar(256),
	"locked" integer,
	"path" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "context_temp" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256) NOT NULL,
	"depth" integer,
	"locked" integer,
	"path" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "context_temp" ADD CONSTRAINT "context_temp_context_id_contexts_id_fk" FOREIGN KEY ("context_id") REFERENCES "public"."contexts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
