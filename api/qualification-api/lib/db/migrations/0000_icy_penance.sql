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
CREATE TABLE IF NOT EXISTS "qualifications" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"institution" varchar(256),
	"duration" varchar(256),
	"program_description" text,
	"short_description" text,
	"degree" varchar(256),
	"requirements" text,
	"open_date" date,
	"close_date" date,
	"description" text,
	"url" varchar(256),
	"hashtags" varchar(256),
	"author_id" varchar(256),
	"organization_id" varchar(256),
	"subjects_id" varchar(256),
	"university_id" varchar(256),
	"facility_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qualifications_responses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"is_saved" boolean,
	"applied" boolean NOT NULL,
	"qualification_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "qualifications_responses" ADD CONSTRAINT "qualifications_responses_qualification_id_qualifications_id_fk" FOREIGN KEY ("qualification_id") REFERENCES "qualifications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
