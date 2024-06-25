CREATE TABLE IF NOT EXISTS "portfolio_instance_configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"portfolio_instance_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_instances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"plugin" varchar(256),
	"visible" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_instance_users" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"portfolio_instance_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"value" text,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_logs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"caller_class" varchar(256),
	"caller_component" varchar(256),
	"caller_file" varchar(256) NOT NULL,
	"caller_sha1" varchar(256) NOT NULL,
	"continue_url" varchar(256) NOT NULL,
	"portfolio_instance_id" varchar(256) NOT NULL,
	"return_url" varchar(256) NOT NULL,
	"portfolio_tempdata_id" varchar(256) NOT NULL,
	"time" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_mahara_queues" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"token" varchar(256) NOT NULL,
	"portfolio_tempdata_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio_tempdatas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"data" text,
	"expiry_time" integer NOT NULL,
	"portfolio_instance_id" varchar(256) NOT NULL,
	"queued" boolean NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_instance_configs" ADD CONSTRAINT "portfolio_instance_configs_portfolio_instance_id_portfolio_instances_id_fk" FOREIGN KEY ("portfolio_instance_id") REFERENCES "public"."portfolio_instances"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_instance_users" ADD CONSTRAINT "portfolio_instance_users_portfolio_instance_id_portfolio_instances_id_fk" FOREIGN KEY ("portfolio_instance_id") REFERENCES "public"."portfolio_instances"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_logs" ADD CONSTRAINT "portfolio_logs_portfolio_instance_id_portfolio_instances_id_fk" FOREIGN KEY ("portfolio_instance_id") REFERENCES "public"."portfolio_instances"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_logs" ADD CONSTRAINT "portfolio_logs_portfolio_tempdata_id_portfolio_tempdatas_id_fk" FOREIGN KEY ("portfolio_tempdata_id") REFERENCES "public"."portfolio_tempdatas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_mahara_queues" ADD CONSTRAINT "portfolio_mahara_queues_portfolio_tempdata_id_portfolio_tempdatas_id_fk" FOREIGN KEY ("portfolio_tempdata_id") REFERENCES "public"."portfolio_tempdatas"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio_tempdatas" ADD CONSTRAINT "portfolio_tempdatas_portfolio_instance_id_portfolio_instances_id_fk" FOREIGN KEY ("portfolio_instance_id") REFERENCES "public"."portfolio_instances"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_instance_configs_portfolio_instance_id_idx" ON "portfolio_instance_configs" USING btree ("portfolio_instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_instances_visible_idx" ON "portfolio_instances" USING btree ("visible");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_instance_users_portfolio_instance_id_idx" ON "portfolio_instance_users" USING btree ("portfolio_instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_logs_portfolio_instance_id_idx" ON "portfolio_logs" USING btree ("portfolio_instance_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_mahara_queues_portfolio_tempdata_id_idx" ON "portfolio_mahara_queues" USING btree ("portfolio_tempdata_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portfolio_tempdatas_portfolio_instance_id_idx" ON "portfolio_tempdatas" USING btree ("portfolio_instance_id");