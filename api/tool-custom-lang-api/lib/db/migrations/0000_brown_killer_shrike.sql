CREATE TABLE IF NOT EXISTS "tool_custom_lang_components" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"version" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tool_custom_langs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component_id" varchar(256),
	"lang" varchar(256),
	"local" text,
	"master" text,
	"modified" integer,
	"original" text,
	"outdated" integer,
	"string_id" varchar(256),
	"customized_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
