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
CREATE TABLE IF NOT EXISTS "digilib" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"estimated_reading_time" integer,
	"release_year" integer,
	"link" varchar(256),
	"language" varchar(256),
	"download" boolean,
	"attachment" varchar(256),
	"digilib_category_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "digilib_categories" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" varchar(256),
	"description" text,
	"background_color" varchar(256),
	"background" varchar(256)
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "digilib_category_id_idx" ON "digilib" ("digilib_category_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "digilib" ADD CONSTRAINT "digilib_digilib_category_id_digilib_categories_id_fk" FOREIGN KEY ("digilib_category_id") REFERENCES "digilib_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
