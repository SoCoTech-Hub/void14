CREATE TABLE IF NOT EXISTS "enrol_flatfiles" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"course_id" varchar(256),
	"role_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_app_registrations" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"access_token_url" text,
	"authentication_request_url" text,
	"client_id" varchar(256),
	"jwks_url" text,
	"name" varchar(256),
	"platform_client_hash" varchar(256),
	"platform_id" text,
	"platform_unique_id_hash" varchar(256),
	"status" boolean,
	"unique_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_contexts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"lti_deployment_id" varchar(256),
	"type" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_deployments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"deployment_id" varchar(256),
	"legacy_consumer_key" varchar(256),
	"name" varchar(256),
	"platform_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_consumers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_guid" varchar(256),
	"consumer_key" text,
	"consumer_key256" varchar(256),
	"consumer_name" varchar(256),
	"consumer_version" varchar(256),
	"enabled" boolean,
	"last_access" date,
	"lti_version" varchar(256),
	"name" varchar(256),
	"profile" text,
	"protected" boolean,
	"secret" varchar(256),
	"settings" text,
	"tool_proxy" text,
	"enable_from" timestamp,
	"enable_until" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_contexts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_id" varchar(256),
	"settings" text,
	"lti_context_key" varchar(256),
	"type" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_nonces" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_id" varchar(256),
	"expires" timestamp,
	"value" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_resource_links" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_id" varchar(256),
	"context_id" varchar(256),
	"lti_resource_link_key" varchar(256),
	"primary_resource_link_id" varchar(256),
	"settings" text,
	"share_approved" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_share_keys" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"auto_approve" boolean,
	"expires" timestamp,
	"resource_link_id" varchar(256),
	"share_key" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_tool_proxys" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_id" varchar(256),
	"tool_proxy" text,
	"tool_proxy_key" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_lti2_user_results" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"lti_result_sourced_id" varchar(256),
	"lti_user_key" varchar(256),
	"resource_link_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_resource_links" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_memberships_url" varchar(256),
	"line_item_scope" varchar(256),
	"line_item_service" varchar(256),
	"line_items_service" varchar(256),
	"lti_context_id" varchar(256),
	"lti_deployment_id" varchar(256),
	"nrps_service_versions" varchar(256),
	"resource_id" varchar(256),
	"resource_link_id" varchar(256),
	"result_scope" varchar(256),
	"score_scope" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_tool_consumer_maps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_id" varchar(256),
	"tool_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_tools" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"city" varchar(256),
	"context_id" varchar(256),
	"country" varchar(256),
	"enrol_id" varchar(256),
	"grade_sync" boolean,
	"grade_sync_completion" boolean,
	"institution" varchar(256),
	"lang" varchar(256),
	"lti_version" varchar(256),
	"mail_display" integer,
	"max_enrolled" integer,
	"member_sync" boolean,
	"member_sync_mode" boolean,
	"provisioning_mode_instructor" integer,
	"provisioning_mode_learner" integer,
	"role_instructor" varchar(256),
	"role_learner" varchar(256),
	"secret" text,
	"time_zone" varchar(256),
	"uuid" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_user_resource_links" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"enrol_lti_user_id" varchar(256) NOT NULL,
	"enrol_lti_resource_link_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_lti_users" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"consumer_key" text,
	"consumer_secret" text,
	"last_access" timestamp,
	"last_grade" real,
	"enrol_lti_deployment_id" varchar(256) NOT NULL,
	"memberships_id" text,
	"memberships_url" text,
	"service_url" text,
	"source_id" text,
	"tool_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrol_paypals" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"business" varchar(256),
	"course_id" varchar(256),
	"instance_id" varchar(256),
	"item_name" varchar(256),
	"memo" varchar(256),
	"option_name1" varchar(256),
	"option_name2" varchar(256),
	"option_selection1_x" varchar(256),
	"option_selection2_x" varchar(256) NOT NULL,
	"parent_txn_id" varchar(256) NOT NULL,
	"payment_status" varchar(256) NOT NULL,
	"payment_type" varchar(256) NOT NULL,
	"pending_reason" varchar(256) NOT NULL,
	"reason_code" varchar(256) NOT NULL,
	"receiver_email" varchar(256) NOT NULL,
	"receiver_id" varchar(256) NOT NULL,
	"tax" varchar(256) NOT NULL,
	"txn_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enrols" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cost" varchar(256),
	"course_id" varchar(256),
	"currency" varchar(256),
	"custom_char1" varchar(256),
	"custom_char2" varchar(256),
	"custom_char3" varchar(256),
	"custom_dec1" real,
	"custom_dec2" real,
	"custom_int1" integer,
	"custom_int2" integer,
	"custom_int3" integer,
	"custom_int4" integer,
	"custom_int5" integer,
	"custom_int6" integer,
	"custom_int7" integer,
	"custom_int8" integer,
	"custom_text1" text,
	"custom_text2" text,
	"custom_text3" text,
	"custom_text4" text,
	"enrol" varchar(256),
	"enrol_end_date" date,
	"enrol_start_date" date,
	"enrol_period" integer,
	"expiry_notify" boolean,
	"expiry_threshold" integer,
	"name" varchar(256),
	"notify_all" boolean,
	"password" varchar(256),
	"role_id" varchar(256),
	"sort_order" integer,
	"status" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrol_lti_user_resource_links" ADD CONSTRAINT "enrol_lti_user_resource_links_enrol_lti_user_id_enrol_lti_users_id_fk" FOREIGN KEY ("enrol_lti_user_id") REFERENCES "public"."enrol_lti_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrol_lti_user_resource_links" ADD CONSTRAINT "enrol_lti_user_resource_links_enrol_lti_resource_link_id_enrol_lti_resource_links_id_fk" FOREIGN KEY ("enrol_lti_resource_link_id") REFERENCES "public"."enrol_lti_resource_links"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enrol_lti_users" ADD CONSTRAINT "enrol_lti_users_enrol_lti_deployment_id_enrol_lti_deployments_id_fk" FOREIGN KEY ("enrol_lti_deployment_id") REFERENCES "public"."enrol_lti_deployments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "enrols_sort_order_idx" ON "enrols" USING btree ("sort_order");