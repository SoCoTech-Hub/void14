CREATE TABLE IF NOT EXISTS "config_logs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"old_value" text,
	"plugin" varchar(256),
	"value" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "config_plugins" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"plug_in" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"value" text
);
