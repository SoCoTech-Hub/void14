CREATE TABLE IF NOT EXISTS "filter_actives" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"active" boolean,
	"context_id" varchar(256),
	"filter" varchar(256),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "filter_configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"filter" varchar(256),
	"name" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "filter_actives_sort_order_idx" ON "filter_actives" USING btree ("sort_order");