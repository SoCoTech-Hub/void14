CREATE TABLE IF NOT EXISTS "paygw_paypals" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"payment_id" varchar(256) NOT NULL,
	"pp_orderid" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_accounts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"archived" boolean,
	"context_id" varchar(256),
	"enabled" boolean,
	"id_number" varchar(256),
	"name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_gateways" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"payment_account_id" varchar(256) NOT NULL,
	"config" text,
	"enabled" boolean NOT NULL,
	"gateway_name" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"payment_account_id" varchar(256) NOT NULL,
	"component" varchar(256),
	"amount" real NOT NULL,
	"currency" varchar(256) NOT NULL,
	"gateway" varchar(256) NOT NULL,
	"item_id" varchar(256) NOT NULL,
	"payment_area" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paygw_paypals" ADD CONSTRAINT "paygw_paypals_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_gateways" ADD CONSTRAINT "payment_gateways_payment_account_id_payment_accounts_id_fk" FOREIGN KEY ("payment_account_id") REFERENCES "public"."payment_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_account_id_payment_accounts_id_fk" FOREIGN KEY ("payment_account_id") REFERENCES "public"."payment_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "paygw_paypals_payment_id_idx" ON "paygw_paypals" USING btree ("payment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "payment_accounts_context_id_idx" ON "payment_accounts" USING btree ("context_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "payment_gateways_payment_account_id_idx" ON "payment_gateways" USING btree ("payment_account_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "payments_payment_account_id_idx" ON "payments" USING btree ("payment_account_id");