CREATE TABLE IF NOT EXISTS "ratings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256) NOT NULL,
	"context_id" varchar(256) NOT NULL,
	"item_id" varchar(256) NOT NULL,
	"rating" integer NOT NULL,
	"rating_area" varchar(256) NOT NULL,
	"scale_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "scale_id_idx" ON "ratings" USING btree ("scale_id");