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
CREATE TABLE IF NOT EXISTS "localization_fields" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"default_value" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localization_languages" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"flag" varchar(256),
	"country_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localization_translations" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"localization_field_id" varchar(256) NOT NULL,
	"localization_language_id" varchar(256) NOT NULL,
	"value" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "localization_user" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"localization_language_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "localization_languages" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localization_translations" ADD CONSTRAINT "localization_translations_localization_field_id_localization_fields_id_fk" FOREIGN KEY ("localization_field_id") REFERENCES "localization_fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localization_translations" ADD CONSTRAINT "localization_translations_localization_language_id_localization_languages_id_fk" FOREIGN KEY ("localization_language_id") REFERENCES "localization_languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "localization_user" ADD CONSTRAINT "localization_user_localization_language_id_localization_languages_id_fk" FOREIGN KEY ("localization_language_id") REFERENCES "localization_languages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
