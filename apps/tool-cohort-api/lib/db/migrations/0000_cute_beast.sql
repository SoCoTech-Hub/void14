CREATE TABLE IF NOT EXISTS "tool_cohort_roles" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cohort_id" varchar(256),
	"role_id" varchar(256),
	"user_modified" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
