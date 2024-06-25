CREATE TABLE IF NOT EXISTS "registration_hubs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"confirmed" boolean,
	"hub_name" varchar(256),
	"hub_url" varchar(256) NOT NULL,
	"secret" varchar(256),
	"token" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "registration_hubs_hub_name_idx" ON "registration_hubs" USING btree ("hub_name");