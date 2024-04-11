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
CREATE TABLE IF NOT EXISTS "mass_mail_lists" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"is_public" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mass_mail_lists_recipients" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"mass_mail_list_id" varchar(256) NOT NULL,
	"mass_mail_recipient_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mass_mail_messages" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"body" text,
	"publish_date" timestamp,
	"mass_mail_list_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mass_mail_recipients" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"surname" varchar(256),
	"fullname" varchar(256),
	"email" varchar(256),
	"mobile" varchar(256),
	"company" varchar(256),
	"title" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mass_mail_list_id_idx" ON "mass_mail_messages" ("mass_mail_list_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mass_mail_lists_recipients" ADD CONSTRAINT "mass_mail_lists_recipients_mass_mail_list_id_mass_mail_lists_id_fk" FOREIGN KEY ("mass_mail_list_id") REFERENCES "mass_mail_lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mass_mail_lists_recipients" ADD CONSTRAINT "mass_mail_lists_recipients_mass_mail_recipient_id_mass_mail_recipients_id_fk" FOREIGN KEY ("mass_mail_recipient_id") REFERENCES "mass_mail_recipients"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mass_mail_messages" ADD CONSTRAINT "mass_mail_messages_mass_mail_list_id_mass_mail_lists_id_fk" FOREIGN KEY ("mass_mail_list_id") REFERENCES "mass_mail_lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
