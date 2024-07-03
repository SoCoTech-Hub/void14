CREATE TABLE IF NOT EXISTS "favourites" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"context_id" varchar(256),
	"item_id" varchar(256),
	"item_type" varchar(256),
	"ordering" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
