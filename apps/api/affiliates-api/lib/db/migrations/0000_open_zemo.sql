CREATE TABLE IF NOT EXISTS "affiliates" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"is_approved" boolean NOT NULL,
	"note" text,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "affiliates_details" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"number" integer,
	"code" varchar(256),
	"bank" varchar(256),
	"type" varchar(256),
	"affiliate_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "affiliates_settings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"rate" integer NOT NULL,
	"terms" text,
	"is_active" boolean,
	"organization_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "affiliates_statuses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"color" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "affiliates_transactions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"paid" integer NOT NULL,
	"balance" integer,
	"paid_date" timestamp,
	"account_number" varchar(256),
	"affiliate_id" varchar(256) NOT NULL,
	"affiliates_status_id" varchar(256) NOT NULL
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
DO $$ BEGIN
 ALTER TABLE "affiliates_details" ADD CONSTRAINT "affiliates_details_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "affiliates_transactions" ADD CONSTRAINT "affiliates_transactions_affiliate_id_affiliates_id_fk" FOREIGN KEY ("affiliate_id") REFERENCES "affiliates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "affiliates_transactions" ADD CONSTRAINT "affiliates_transactions_affiliates_status_id_affiliates_statuses_id_fk" FOREIGN KEY ("affiliates_status_id") REFERENCES "affiliates_statuses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
