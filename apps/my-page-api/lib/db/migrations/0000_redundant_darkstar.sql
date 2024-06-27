CREATE TABLE IF NOT EXISTS "my_pages" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"private" boolean,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "my_pages_name_idx" ON "my_pages" USING btree ("name");