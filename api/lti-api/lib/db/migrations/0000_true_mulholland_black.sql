CREATE TABLE IF NOT EXISTS "lti_access_tokens" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"last_access" timestamp,
	"scope" text,
	"token" varchar(256),
	"type_id" varchar(256),
	"valid_until" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ltis" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"debug_launch" boolean,
	"grade" integer,
	"icon" text,
	"instructor_choice_accept_grades" boolean,
	"instructor_choice_allow_roster" boolean,
	"instructor_choice_allow_setting" boolean,
	"instructor_choice_send_email_addr" boolean,
	"instructor_choice_send_name" boolean,
	"instructor_custom_parameters" text,
	"intro" text,
	"intro_format" integer,
	"launch_container" integer,
	"name" varchar(256),
	"password" varchar(256),
	"resource_key" varchar(256),
	"secure_icon" text,
	"secure_tool_url" text,
	"service_salt" varchar(256),
	"show_description_launch" boolean,
	"show_title_launch" boolean,
	"tool_url" text,
	"type_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ltiservice_gradebookservices" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"base_url" text,
	"course_id" varchar(256),
	"grade_item_id" varchar(256),
	"lti_link_id" varchar(256),
	"resource_id" varchar(256),
	"tag" varchar(256),
	"tool_proxy_id" varchar(256),
	"type_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lti_submissions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"date_submitted" timestamp,
	"date_updated" timestamp,
	"grade_percent" real,
	"launch_id" varchar(256),
	"lti_id" varchar(256),
	"original_grade" real,
	"state" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lti_tool_proxies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"capability_offered" text,
	"created_by" varchar(256),
	"gu_id" varchar(256),
	"name" varchar(256),
	"reg_url" text,
	"secret" varchar(256),
	"service_offered" text,
	"state" integer,
	"tool_proxy" text,
	"vendor_code" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lti_tool_settings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course" varchar(256),
	"course_module_id" varchar(256),
	"settings" text,
	"tool_proxy_id" varchar(256),
	"type_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lti_types" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"base_url" text,
	"client_id" varchar(256),
	"course" varchar(256),
	"course_visible" boolean,
	"created_by" varchar(256),
	"description" text,
	"enabled_capability" text,
	"icon" text,
	"lti_version" varchar(256),
	"name" varchar(256),
	"parameter" text,
	"secure_icon" text,
	"state" integer,
	"tool_domain" varchar(256),
	"tool_proxy_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lti_types_configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"type_id" varchar(256),
	"value" text
);
