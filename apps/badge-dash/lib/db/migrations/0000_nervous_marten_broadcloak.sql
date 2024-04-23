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
CREATE TABLE IF NOT EXISTS "badge_alignments" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"target_code" varchar(256),
	"target_description" text,
	"target_framework" varchar(256),
	"target_name" varchar(256),
	"target_url" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_backpack_oauth2s" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"expires" integer,
	"external_backpack_id" varchar(256),
	"issuer_id" varchar(256),
	"refresh_token" text,
	"scope" text,
	"token" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_backpacks" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"auto_sync" boolean,
	"backpack_uid" varchar(256),
	"email" varchar(256),
	"external_backpack_id" varchar(256),
	"password" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_criteria_mets" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_criteria_id" varchar(256) NOT NULL,
	"date_met" integer,
	"issued_id" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_criteria_params" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_criteria_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"value" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_criterias" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"criteria_type" varchar(256),
	"description" text,
	"description_format" integer,
	"method" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_endorsements" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"claim_comment" text,
	"claim_id" varchar(256),
	"date_issued" timestamp,
	"issuer_email" varchar(256),
	"issuer_name" varchar(256),
	"issuer_url" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_external_backpacks" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"api_version" varchar(256),
	"backpack_api_url" varchar(256),
	"backpack_web_url" varchar(256),
	"oauth2_issuer_id" varchar(256),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_external_identifiers" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"external_id" varchar(256),
	"internal_id" varchar(256),
	"badge_backpack_id" varchar(256) NOT NULL,
	"type" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_externals" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assertion" text,
	"badge_backpack_id" varchar(256) NOT NULL,
	"collection_id" varchar(256),
	"entity_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_issues" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"date_expire" integer,
	"date_issued" timestamp,
	"issuer_notified" varchar(256),
	"unique_hash" text,
	"visible" boolean,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_manual_awards" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"date_met" timestamp,
	"issuer_id" varchar(256),
	"issuer_role" varchar(256),
	"recipient_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badge_relateds" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"badge_id" varchar(256) NOT NULL,
	"related_badge_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "badges" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attachment" boolean,
	"course_id" varchar(256),
	"description" text,
	"expire_date" integer,
	"expire_period" integer,
	"image_author_email" varchar(256),
	"image_author_name" varchar(256),
	"image_author_url" varchar(256),
	"image_caption" text,
	"issuer_contact" varchar(256),
	"issuer_name" varchar(256),
	"issuer_url" varchar(256),
	"language" varchar(256),
	"message" text,
	"message_subject" text,
	"name" varchar(256),
	"next_cron" integer,
	"notification" boolean,
	"status" boolean,
	"type" boolean,
	"version" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bc_badge_id_idx" ON "badge_criterias" ("badge_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "be_badge_id_idx" ON "badge_endorsements" ("badge_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bei_internal_id_idx" ON "badge_external_identifiers" ("internal_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bi_badge_id_idx" ON "badge_issues" ("badge_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "bma_badge_id_idx" ON "badge_manual_awards" ("badge_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_alignments" ADD CONSTRAINT "badge_alignments_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_criteria_mets" ADD CONSTRAINT "badge_criteria_mets_badge_criteria_id_badge_criterias_id_fk" FOREIGN KEY ("badge_criteria_id") REFERENCES "badge_criterias"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_criteria_params" ADD CONSTRAINT "badge_criteria_params_badge_criteria_id_badge_criterias_id_fk" FOREIGN KEY ("badge_criteria_id") REFERENCES "badge_criterias"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_criterias" ADD CONSTRAINT "badge_criterias_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_endorsements" ADD CONSTRAINT "badge_endorsements_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_external_identifiers" ADD CONSTRAINT "badge_external_identifiers_badge_backpack_id_badge_backpacks_id_fk" FOREIGN KEY ("badge_backpack_id") REFERENCES "badge_backpacks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_externals" ADD CONSTRAINT "badge_externals_badge_backpack_id_badge_backpacks_id_fk" FOREIGN KEY ("badge_backpack_id") REFERENCES "badge_backpacks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_issues" ADD CONSTRAINT "badge_issues_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_manual_awards" ADD CONSTRAINT "badge_manual_awards_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_relateds" ADD CONSTRAINT "badge_relateds_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "badge_relateds" ADD CONSTRAINT "badge_relateds_related_badge_id_badges_id_fk" FOREIGN KEY ("related_badge_id") REFERENCES "badges"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
