CREATE TABLE IF NOT EXISTS "tool_dataprivacy_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"name" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_ctx_expireds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"default_expired" boolean,
	"expired_roles" text,
	"status" integer,
	"unexpired_roles" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_ctx_instances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"tool_dataprivacy_category_id" varchar(256) NOT NULL,
	"context_id" varchar(256),
	"tool_dataprivacy_purpose_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_ctx_levels" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"tool_dataprivacy_category_id" varchar(256) NOT NULL,
	"context_level" varchar(256),
	"tool_dataprivacy_purpose_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_purpose_roles" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"lawful_bases" text,
	"protected" boolean,
	"tool_dataprivacy_purpose_id" varchar(256) NOT NULL,
	"retention_period" varchar(256),
	"role_id" varchar(256),
	"sensitive_data_reasons" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_purposes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"lawful_bases" text,
	"name" varchar(256),
	"protected" boolean,
	"retention_period" varchar(256),
	"sensitive_data_reasons" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_dataprivacy_requests" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"comments" text,
	"comments_format" integer,
	"creation_method" varchar(256),
	"dpo" varchar(256),
	"dpo_comment" text,
	"dpo_comment_format" integer,
	"requested_by" varchar(256),
	"status" integer,
	"system_approved" boolean,
	"type" varchar(256),
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_dataprivacy_ctx_instances" ADD CONSTRAINT "tool_dataprivacy_ctx_instances_tool_dataprivacy_category_id_tool_dataprivacy_categories_id_fk" FOREIGN KEY ("tool_dataprivacy_category_id") REFERENCES "public"."tool_dataprivacy_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_dataprivacy_ctx_instances" ADD CONSTRAINT "tool_dataprivacy_ctx_instances_tool_dataprivacy_purpose_id_tool_dataprivacy_purposes_id_fk" FOREIGN KEY ("tool_dataprivacy_purpose_id") REFERENCES "public"."tool_dataprivacy_purposes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_dataprivacy_ctx_levels" ADD CONSTRAINT "tool_dataprivacy_ctx_levels_tool_dataprivacy_category_id_tool_dataprivacy_categories_id_fk" FOREIGN KEY ("tool_dataprivacy_category_id") REFERENCES "public"."tool_dataprivacy_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_dataprivacy_ctx_levels" ADD CONSTRAINT "tool_dataprivacy_ctx_levels_tool_dataprivacy_purpose_id_tool_dataprivacy_purposes_id_fk" FOREIGN KEY ("tool_dataprivacy_purpose_id") REFERENCES "public"."tool_dataprivacy_purposes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_dataprivacy_purpose_roles" ADD CONSTRAINT "tool_dataprivacy_purpose_roles_tool_dataprivacy_purpose_id_tool_dataprivacy_purposes_id_fk" FOREIGN KEY ("tool_dataprivacy_purpose_id") REFERENCES "public"."tool_dataprivacy_purposes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
