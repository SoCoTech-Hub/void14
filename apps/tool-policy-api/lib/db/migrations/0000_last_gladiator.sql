CREATE TABLE IF NOT EXISTS "tool_policies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"current_version_id" varchar(256),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_policy_acceptances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"lang" varchar(256),
	"note" text,
	"policy_version_id" varchar(256),
	"status" boolean,
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_policy_versions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"agreement_style" integer,
	"archived" integer,
	"audience" integer,
	"content" text,
	"content_format" integer,
	"name" varchar(256) NOT NULL,
	"optional" integer,
	"tool_policy_id" varchar(256) NOT NULL,
	"revision" varchar(256),
	"summary" text,
	"summary_format" integer,
	"type" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tool_policy_versions" ADD CONSTRAINT "tool_policy_versions_tool_policy_id_tool_policies_id_fk" FOREIGN KEY ("tool_policy_id") REFERENCES "public"."tool_policies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
