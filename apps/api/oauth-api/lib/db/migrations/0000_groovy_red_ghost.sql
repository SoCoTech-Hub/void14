CREATE TABLE IF NOT EXISTS "oauth2_access_tokens" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"expires" integer NOT NULL,
	"oauth2issuer_id" varchar(256) NOT NULL,
	"scope" text,
	"token" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth2_endpoints" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"oauth2issuer_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"url" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth2_issuers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allowed_domains" text,
	"base_url" text,
	"basic_auth" boolean,
	"client_id" text,
	"client_secret" text,
	"enabled" boolean NOT NULL,
	"image" text,
	"login_page_name" varchar(256) NOT NULL,
	"login_params" text NOT NULL,
	"login_params_offline" text NOT NULL,
	"login_scopes" text NOT NULL,
	"login_scopes_offline" text NOT NULL,
	"scopes_supported" text NOT NULL,
	"name" varchar(256) NOT NULL,
	"require_confirmation" boolean NOT NULL,
	"service_type" varchar(256) NOT NULL,
	"show_on_login_page" boolean NOT NULL,
	"sort_order" integer NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth2_refresh_tokens" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"oauth2issuer_id" varchar(256) NOT NULL,
	"scope_hash" varchar(256) NOT NULL,
	"token" text NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth2_system_accounts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"email" text,
	"granted_scopes" text,
	"oauth2issuer_id" varchar(256) NOT NULL,
	"refresh_token" text,
	"username" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth2_user_field_mappings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"external_field" varchar(256),
	"internal_field" varchar(256),
	"oauth2issuer_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth2_access_tokens" ADD CONSTRAINT "oauth2_access_tokens_oauth2issuer_id_oauth2_issuers_id_fk" FOREIGN KEY ("oauth2issuer_id") REFERENCES "public"."oauth2_issuers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth2_endpoints" ADD CONSTRAINT "oauth2_endpoints_oauth2issuer_id_oauth2_issuers_id_fk" FOREIGN KEY ("oauth2issuer_id") REFERENCES "public"."oauth2_issuers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth2_refresh_tokens" ADD CONSTRAINT "oauth2_refresh_tokens_oauth2issuer_id_oauth2_issuers_id_fk" FOREIGN KEY ("oauth2issuer_id") REFERENCES "public"."oauth2_issuers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth2_system_accounts" ADD CONSTRAINT "oauth2_system_accounts_oauth2issuer_id_oauth2_issuers_id_fk" FOREIGN KEY ("oauth2issuer_id") REFERENCES "public"."oauth2_issuers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth2_user_field_mappings" ADD CONSTRAINT "oauth2_user_field_mappings_oauth2issuer_id_oauth2_issuers_id_fk" FOREIGN KEY ("oauth2issuer_id") REFERENCES "public"."oauth2_issuers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_access_tokens_oauth2issuer_id_idx" ON "oauth2_access_tokens" USING btree ("oauth2issuer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_endpoints_oauth2issuer_id_idx" ON "oauth2_endpoints" USING btree ("oauth2issuer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_issuers_name_idx" ON "oauth2_issuers" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_refresh_tokens_oauth2issuer_id_idx" ON "oauth2_refresh_tokens" USING btree ("oauth2issuer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_system_accounts_oauth2issuer_id_idx" ON "oauth2_system_accounts" USING btree ("oauth2issuer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "oauth2_user_field_mappings_oauth2issuer_id_idx" ON "oauth2_user_field_mappings" USING btree ("oauth2issuer_id");