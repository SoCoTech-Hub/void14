CREATE TABLE IF NOT EXISTS "licenses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"custom" boolean,
	"enabled" boolean,
	"full_name" text,
	"short_name" varchar(256),
	"sort_order" integer,
	"source" varchar(256),
	"version" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "licenses_sort_order_idx" ON "licenses" USING btree ("sort_order");