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
CREATE TABLE IF NOT EXISTS "bursaries" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"who_qualifies" text,
	"application" text,
	"value" text,
	"particulars" text,
	"note" text,
	"url" varchar(256),
	"open_date" timestamp,
	"close_date" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bursary_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256),
	"color" varchar(256),
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bursary_categories_bursaries" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"bursary_id" varchar(256) NOT NULL,
	"bursary_category_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bursary_responses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"bursary_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bursary_category_id_idx" ON "bursary_categories_bursaries" ("bursary_category_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bursary_categories_bursaries" ADD CONSTRAINT "bursary_categories_bursaries_bursary_id_bursaries_id_fk" FOREIGN KEY ("bursary_id") REFERENCES "bursaries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bursary_categories_bursaries" ADD CONSTRAINT "bursary_categories_bursaries_bursary_category_id_bursary_categories_id_fk" FOREIGN KEY ("bursary_category_id") REFERENCES "bursary_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bursary_responses" ADD CONSTRAINT "bursary_responses_bursary_id_bursaries_id_fk" FOREIGN KEY ("bursary_id") REFERENCES "bursaries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
