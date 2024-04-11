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
CREATE TABLE IF NOT EXISTS "inmail_responses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"read" boolean,
	"starred" boolean,
	"important" boolean,
	"deleted" boolean,
	"lable" varchar(256),
	"inmail_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inmails" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"subject" varchar(256) NOT NULL,
	"body" text,
	"draft" boolean,
	"reply" boolean,
	"attachment" varchar(256),
	"to" varchar(256),
	"parent_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "inmail_id_idx" ON "inmail_responses" ("inmail_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inmail_responses" ADD CONSTRAINT "inmail_responses_inmail_id_inmails_id_fk" FOREIGN KEY ("inmail_id") REFERENCES "inmails"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
