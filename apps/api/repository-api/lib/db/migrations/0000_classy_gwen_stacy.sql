CREATE TABLE IF NOT EXISTS "repositories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"sort_order" integer,
	"type" varchar(256) NOT NULL,
	"visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repository_instance_configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"repository_instance_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repository_instances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"password" varchar(256),
	"read_only" boolean DEFAULT false NOT NULL,
	"type_id" varchar(256) NOT NULL,
	"user_name" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repository_onedrive_accesses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"item_id" varchar(256) NOT NULL,
	"permission_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repository_instance_configs" ADD CONSTRAINT "repository_instance_configs_repository_instance_id_repository_instances_id_fk" FOREIGN KEY ("repository_instance_id") REFERENCES "public"."repository_instances"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "repositories_sort_order_idx" ON "repositories" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "repository_instance_configs_repository_instance_id_idx" ON "repository_instance_configs" USING btree ("repository_instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "repository_instances_context_id_idx" ON "repository_instances" USING btree ("context_id");