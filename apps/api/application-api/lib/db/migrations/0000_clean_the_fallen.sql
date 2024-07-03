CREATE TABLE IF NOT EXISTS "application_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"icon" varchar(256),
	"color" varchar(256),
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "application_responses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"job_application_id" varchar(256) NOT NULL,
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
CREATE TABLE IF NOT EXISTS "job_applications" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"institution" varchar(256),
	"term" varchar(256),
	"body" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_applications_application_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"job_application_id" varchar(256) NOT NULL,
	"application_category_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "application_categories" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "application_responses" ADD CONSTRAINT "application_responses_job_application_id_job_applications_id_fk" FOREIGN KEY ("job_application_id") REFERENCES "job_applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_applications_application_categories" ADD CONSTRAINT "job_applications_application_categories_job_application_id_job_applications_id_fk" FOREIGN KEY ("job_application_id") REFERENCES "job_applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_applications_application_categories" ADD CONSTRAINT "job_applications_application_categories_application_category_id_application_categories_id_fk" FOREIGN KEY ("application_category_id") REFERENCES "application_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
