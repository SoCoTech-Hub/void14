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
CREATE TABLE IF NOT EXISTS "zoom_lessons" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"active" boolean,
	"course_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "zoom_meetings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"meeting_link" varchar(256) NOT NULL,
	"participants" text,
	"zoom_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "zooms" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"key" varchar(256),
	"secret" varchar(256),
	"sdk_key" varchar(256),
	"sts_api_key" varchar(256),
	"sts_api_secret" varchar(256),
	"sts_account_id" varchar(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_id_idx" ON "zoom_lessons" ("course_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "zoom_meetings" ADD CONSTRAINT "zoom_meetings_zoom_id_zooms_id_fk" FOREIGN KEY ("zoom_id") REFERENCES "zooms"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
