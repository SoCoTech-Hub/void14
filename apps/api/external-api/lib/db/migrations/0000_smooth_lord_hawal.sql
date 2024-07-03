CREATE TABLE IF NOT EXISTS "external_functions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"capabilities" varchar(256),
	"class_name" varchar(256),
	"class_path" varchar(256),
	"component" varchar(256),
	"method_name" varchar(256),
	"name" varchar(256),
	"services" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "external_services" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"download_files" boolean,
	"enabled" boolean,
	"name" varchar(256),
	"required_capability" varchar(256),
	"shortname" varchar(256),
	"restricted_users" boolean,
	"upload_files" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "external_services_functions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"external_service_id" varchar(256),
	"function_name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "external_services_users" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"external_service_id" varchar(256),
	"ip_restriction" varchar(256),
	"valid_until" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "external_tokens" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"creator_id" varchar(256),
	"external_service_id" varchar(256),
	"ip_restriction" varchar(256),
	"last_access" timestamp,
	"private_token" varchar(256),
	"s_id" varchar(256),
	"token" varchar(256),
	"token_type" boolean,
	"valid_until" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
