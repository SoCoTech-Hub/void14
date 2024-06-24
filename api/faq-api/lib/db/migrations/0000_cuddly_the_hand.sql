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
CREATE TABLE IF NOT EXISTS "faq_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256),
	"description" text,
	"background" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faq_faqs_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"faq_category_id" varchar(256) NOT NULL,
	"faq_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faqs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question" text,
	"answer" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faq_faqs_categories" ADD CONSTRAINT "faq_faqs_categories_faq_category_id_faq_categories_id_fk" FOREIGN KEY ("faq_category_id") REFERENCES "faq_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faq_faqs_categories" ADD CONSTRAINT "faq_faqs_categories_faq_id_faqs_id_fk" FOREIGN KEY ("faq_id") REFERENCES "faqs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
