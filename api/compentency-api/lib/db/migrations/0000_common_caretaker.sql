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
CREATE TABLE IF NOT EXISTS "competencies" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_framework_id" varchar(256) NOT NULL,
	"description" text,
	"description_format" varchar(256),
	"id_number" varchar(256),
	"parent_id" varchar(256),
	"path" varchar(256),
	"rule_config" text,
	"rule_outcome" varchar(256),
	"rule_type" varchar(256),
	"scale_configuration" text,
	"scale_id" integer,
	"shortname" varchar(256),
	"sort_order" integer NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_course_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"course_id" varchar(256),
	"rule_outcome" varchar(256),
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_course_comp_settings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"push_ratings_to_user_plans" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_evidences" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" integer,
	"action_user_id" varchar(256),
	"context_id" varchar(256),
	"desca" text,
	"desc_component" varchar(256),
	"desc_identifier" varchar(256),
	"grade" integer,
	"note" text,
	"url" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_frameworks" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"visible" boolean,
	"context_id" varchar(256),
	"description" text,
	"description_format" varchar(256),
	"id_number" varchar(256),
	"scale_configuration" text,
	"scale_id" integer,
	"shortname" varchar(256),
	"taxonomies" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_module_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cm_id" varchar(256),
	"competency_id" varchar(256) NOT NULL,
	"rule_outcome" integer,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_plan_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"competency_plan_id" varchar(256) NOT NULL,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_plans" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"description_format" varchar(256),
	"due_date" date,
	"orig_template_id" varchar(256),
	"reviewer_id" varchar(256),
	"status" boolean,
	"template_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_related_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"related_competency_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_template_cohorts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_template_id" varchar(256) NOT NULL,
	"cohort_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_template_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"competency_template_id" varchar(256) NOT NULL,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_templates" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"visible" boolean,
	"context_id" varchar(256),
	"description" text,
	"description_format" varchar(256),
	"due_date" date,
	"shortname" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_user_comp_courses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"course_id" varchar(256),
	"grade" integer,
	"proficiency" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_user_comp_plans" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"grade" integer,
	"competency_plan_id" varchar(256) NOT NULL,
	"proficiency" integer,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_user_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"grade" integer,
	"proficiency" integer,
	"reviewer_id" varchar(256),
	"status" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_user_evidence_comps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"competency_id" varchar(256) NOT NULL,
	"competency_user_evidence_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competency_user_evidences" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" text,
	"description_format" varchar(256),
	"url" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competencies" ADD CONSTRAINT "competencies_competency_framework_id_competency_frameworks_id_fk" FOREIGN KEY ("competency_framework_id") REFERENCES "public"."competency_frameworks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_course_comps" ADD CONSTRAINT "competency_course_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_module_comps" ADD CONSTRAINT "competency_module_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_plan_comps" ADD CONSTRAINT "competency_plan_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_plan_comps" ADD CONSTRAINT "competency_plan_comps_competency_plan_id_competency_plans_id_fk" FOREIGN KEY ("competency_plan_id") REFERENCES "public"."competency_plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_related_comps" ADD CONSTRAINT "competency_related_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_template_cohorts" ADD CONSTRAINT "competency_template_cohorts_competency_template_id_competency_templates_id_fk" FOREIGN KEY ("competency_template_id") REFERENCES "public"."competency_templates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_template_comps" ADD CONSTRAINT "competency_template_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_template_comps" ADD CONSTRAINT "competency_template_comps_competency_template_id_competency_templates_id_fk" FOREIGN KEY ("competency_template_id") REFERENCES "public"."competency_templates"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_comp_courses" ADD CONSTRAINT "competency_user_comp_courses_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_comp_plans" ADD CONSTRAINT "competency_user_comp_plans_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_comp_plans" ADD CONSTRAINT "competency_user_comp_plans_competency_plan_id_competency_plans_id_fk" FOREIGN KEY ("competency_plan_id") REFERENCES "public"."competency_plans"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_comps" ADD CONSTRAINT "competency_user_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_evidence_comps" ADD CONSTRAINT "competency_user_evidence_comps_competency_id_competencies_id_fk" FOREIGN KEY ("competency_id") REFERENCES "public"."competencies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "competency_user_evidence_comps" ADD CONSTRAINT "competency_user_evidence_comps_competency_user_evidence_id_competency_user_evidences_id_fk" FOREIGN KEY ("competency_user_evidence_id") REFERENCES "public"."competency_user_evidences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competencies_sort_order_idx" ON "competencies" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competency_course_comps_sort_order_idx" ON "competency_course_comps" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competency_module_comps_sort_order_idx" ON "competency_module_comps" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competency_plan_comps_sort_order_idx" ON "competency_plan_comps" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competency_template_comps_sort_order_idx" ON "competency_template_comps" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "competency_user_comp_plans_sort_order_idx" ON "competency_user_comp_plans" USING btree ("sort_order");