CREATE TABLE IF NOT EXISTS "addresses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"line_1" varchar(256),
	"line_2" varchar(256),
	"city" varchar(256),
	"zip_code" varchar(256),
	"state" varchar(256),
	"country" varchar(256),
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
CREATE TABLE IF NOT EXISTS "genders" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"icon" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "next_of_kins" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"surname" varchar(256),
	"full_name" varchar(256),
	"mobile" varchar(256),
	"email" varchar(256),
	"title" varchar(256),
	"date_of_birth" varchar(256),
	"relation" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"surname" varchar(256),
	"full_name" varchar(256),
	"id_number" varchar(256),
	"mobile" varchar(256),
	"bio" text,
	"date_of_birth" date,
	"unique_id" varchar(256),
	"address_id" varchar(256) NOT NULL,
	"gender_id" varchar(256) NOT NULL,
	"next_of_kin_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "country_idx" ON "addresses" ("country");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_id_idx" ON "profiles" ("unique_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_gender_id_genders_id_fk" FOREIGN KEY ("gender_id") REFERENCES "genders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_next_of_kin_id_next_of_kins_id_fk" FOREIGN KEY ("next_of_kin_id") REFERENCES "next_of_kins"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
