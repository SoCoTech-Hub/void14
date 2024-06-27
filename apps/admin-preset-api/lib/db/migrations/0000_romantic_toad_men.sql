CREATE TABLE IF NOT EXISTS "admin_preset_app_plugs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"admin_presets_app_id" varchar(256) NOT NULL,
	"old_value" integer,
	"value" integer,
	"plugin" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_preset_it_as" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"item_id" varchar(256),
	"name" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_preset_its" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"plugin" varchar(256),
	"value" text,
	"admin_presets_app_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_preset_plugs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"admin_preset_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"plugin" varchar(256),
	"is_enabled" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_presets" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"author" varchar(256),
	"comments" text,
	"is_core" boolean,
	"name" varchar(256),
	"site" varchar(256),
	"time_imported" timestamp,
	"time_created" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adminpresets_app_it_as" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"admin_presets_app_id" varchar(256) NOT NULL,
	"config_log_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adminpresets_app_its" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"admin_presets_app_id" varchar(256) NOT NULL,
	"config_log_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_presets_apps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"time" timestamp NOT NULL,
	"admin_preset_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text NOT NULL,
	"name" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "admin_preset_app_plugs_admin_presets_app_id_idx" ON "admin_preset_app_plugs" ("admin_presets_app_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "item_id_idx" ON "admin_preset_it_as" ("item_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "admin_preset_its_admin_presets_app_id_idx" ON "admin_preset_its" ("admin_presets_app_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "admin_preset_plugs_admin_preset_id_idx" ON "admin_preset_plugs" ("admin_preset_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "adminpresets_app_its_admin_presets_app_id_idx" ON "adminpresets_app_its" ("admin_presets_app_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "admin_presets_apps_admin_preset_id_idx" ON "admin_presets_apps" ("admin_preset_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_preset_app_plugs" ADD CONSTRAINT "admin_preset_app_plugs_admin_presets_app_id_admin_presets_apps_id_fk" FOREIGN KEY ("admin_presets_app_id") REFERENCES "admin_presets_apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_preset_its" ADD CONSTRAINT "admin_preset_its_admin_presets_app_id_admin_presets_apps_id_fk" FOREIGN KEY ("admin_presets_app_id") REFERENCES "admin_presets_apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_preset_plugs" ADD CONSTRAINT "admin_preset_plugs_admin_preset_id_admin_presets_id_fk" FOREIGN KEY ("admin_preset_id") REFERENCES "admin_presets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adminpresets_app_it_as" ADD CONSTRAINT "adminpresets_app_it_as_admin_presets_app_id_admin_presets_apps_id_fk" FOREIGN KEY ("admin_presets_app_id") REFERENCES "admin_presets_apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adminpresets_app_its" ADD CONSTRAINT "adminpresets_app_its_admin_presets_app_id_admin_presets_apps_id_fk" FOREIGN KEY ("admin_presets_app_id") REFERENCES "admin_presets_apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin_presets_apps" ADD CONSTRAINT "admin_presets_apps_admin_preset_id_admin_presets_id_fk" FOREIGN KEY ("admin_preset_id") REFERENCES "admin_presets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
