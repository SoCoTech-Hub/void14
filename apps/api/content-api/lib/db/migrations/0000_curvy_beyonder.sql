CREATE TABLE IF NOT EXISTS "contents" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"visibility" boolean,
	"config_data" text,
	"content_type" varchar(256),
	"context_id" varchar(256),
	"instance_id" varchar(256),
	"name" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
