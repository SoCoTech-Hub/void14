CREATE TABLE IF NOT EXISTS "mnet_applications" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"display_name" varchar(256),
	"name" varchar(256),
	"sso_jump_url" varchar(256),
	"sso_land_url" varchar(256),
	"xmlrpc_server_url" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_host2services" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"mnet_host_id" varchar(256) NOT NULL,
	"mnet_service_id" varchar(256) NOT NULL,
	"publish" boolean,
	"subscribe" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_hosts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"application_id" varchar(256) NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"force_theme" boolean DEFAULT false NOT NULL,
	"ip_address" varchar(256) NOT NULL,
	"last_connect_time" integer,
	"last_log_id" integer,
	"name" varchar(256) NOT NULL,
	"port_no" integer NOT NULL,
	"public_key" text,
	"public_key_expires" integer NOT NULL,
	"ssl_verification" boolean DEFAULT false NOT NULL,
	"theme" varchar(256),
	"transport" integer,
	"wwwroot" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_logs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256) NOT NULL,
	"cm_id" varchar(256),
	"course_id" varchar(256),
	"course_name" varchar(256),
	"mnet_host_id" varchar(256) NOT NULL,
	"info" varchar(256),
	"ip" varchar(256) NOT NULL,
	"module" varchar(256) NOT NULL,
	"remote_id" varchar(256),
	"time" integer,
	"url" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_remote_rpc" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"enabled" boolean NOT NULL,
	"function_name" varchar(256) NOT NULL,
	"plugin_name" varchar(256) NOT NULL,
	"plugin_type" varchar(256) NOT NULL,
	"xml_rpc_path" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_remote_service2rpcs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"rpc_id" varchar(256),
	"service_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_rpcs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"classname" varchar(256),
	"enabled" boolean NOT NULL,
	"file_name" varchar(256) NOT NULL,
	"function_name" varchar(256) NOT NULL,
	"help" text,
	"plugin_name" varchar(256) NOT NULL,
	"plugin_type" varchar(256) NOT NULL,
	"profile" text,
	"static" boolean,
	"xml_rpc_path" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_service2rpcs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"mnet_service_id" varchar(256) NOT NULL,
	"mnet_rpc_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_service_enrol_courses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"category_id" varchar(256),
	"category_name" varchar(256) NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"mnet_host_id" varchar(256) NOT NULL,
	"id_number" varchar(256),
	"remote_id" varchar(256),
	"role_id" varchar(256),
	"role_name" varchar(256),
	"short_name" varchar(256) NOT NULL,
	"sort_order" integer,
	"start_date" integer NOT NULL,
	"summary" text,
	"summary_format" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_service_enrol_enrolments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"enrol_time" integer,
	"enrol_type" varchar(256) NOT NULL,
	"mnet_host_id" varchar(256) NOT NULL,
	"remote_course_id" varchar(256) NOT NULL,
	"role_name" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_services" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"api_version" varchar(256) NOT NULL,
	"description" varchar(256),
	"name" varchar(256) NOT NULL,
	"offer" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_sessions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"confirm_timeout" integer,
	"expires" integer NOT NULL,
	"mnet_host_id" varchar(256) NOT NULL,
	"session_id" varchar(256),
	"token" varchar(256) NOT NULL,
	"user_agent" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mnet_sso_access_controls" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"access_ctrl" varchar(256),
	"mnet_host_id" varchar(256) NOT NULL,
	"username" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_host2services" ADD CONSTRAINT "mnet_host2services_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_host2services" ADD CONSTRAINT "mnet_host2services_mnet_service_id_mnet_services_id_fk" FOREIGN KEY ("mnet_service_id") REFERENCES "public"."mnet_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_hosts" ADD CONSTRAINT "mnet_hosts_application_id_mnet_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."mnet_applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_logs" ADD CONSTRAINT "mnet_logs_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_service2rpcs" ADD CONSTRAINT "mnet_service2rpcs_mnet_service_id_mnet_services_id_fk" FOREIGN KEY ("mnet_service_id") REFERENCES "public"."mnet_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_service2rpcs" ADD CONSTRAINT "mnet_service2rpcs_mnet_rpc_id_mnet_rpcs_id_fk" FOREIGN KEY ("mnet_rpc_id") REFERENCES "public"."mnet_rpcs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_service_enrol_courses" ADD CONSTRAINT "mnet_service_enrol_courses_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_service_enrol_enrolments" ADD CONSTRAINT "mnet_service_enrol_enrolments_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_sessions" ADD CONSTRAINT "mnet_sessions_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mnet_sso_access_controls" ADD CONSTRAINT "mnet_sso_access_controls_mnet_host_id_mnet_hosts_id_fk" FOREIGN KEY ("mnet_host_id") REFERENCES "public"."mnet_hosts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_applications_name_idx" ON "mnet_applications" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_host2services_mnet_host_id_idx" ON "mnet_host2services" USING btree ("mnet_host_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_hosts_application_id_idx" ON "mnet_hosts" USING btree ("application_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_logs_action_idx" ON "mnet_logs" USING btree ("action");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_remote_rpc_function_name_idx" ON "mnet_remote_rpc" USING btree ("function_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_remote_service2rpcs_rpc_id_idx" ON "mnet_remote_service2rpcs" USING btree ("rpc_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_rpcs_function_name_idx" ON "mnet_rpcs" USING btree ("function_name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_service2rpcs_mnet_rpc_id_idx" ON "mnet_service2rpcs" USING btree ("mnet_rpc_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_service_enrol_courses_category_id_idx" ON "mnet_service_enrol_courses" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_service_enrol_enrolments_mnet_host_id_idx" ON "mnet_service_enrol_enrolments" USING btree ("mnet_host_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_services_name_idx" ON "mnet_services" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_sessions_mnet_host_id_idx" ON "mnet_sessions" USING btree ("mnet_host_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "mnet_sso_access_controls_mnet_host_id_idx" ON "mnet_sso_access_controls" USING btree ("mnet_host_id");