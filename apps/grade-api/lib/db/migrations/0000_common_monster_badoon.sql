CREATE TABLE IF NOT EXISTS "grade_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"aggregate_only_graded" boolean,
	"aggregate_outcomes" boolean,
	"aggregation" integer,
	"course_id" varchar(256),
	"depth" integer,
	"drop_low" integer,
	"full_name" varchar(256),
	"hidden" boolean,
	"keep_high" integer,
	"parent" varchar(256),
	"path" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_categories_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"aggregate_only_graded" boolean,
	"aggregate_outcomes" boolean,
	"aggregate_sub_cats" boolean,
	"aggregation" integer,
	"course_id" varchar(256),
	"depth" integer,
	"drop_low" integer,
	"full_name" varchar(256),
	"hidden" boolean,
	"keep_high" integer,
	"logged_user" varchar(256),
	"old_id" varchar(256),
	"parent" varchar(256),
	"path" varchar(256),
	"source" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_grades" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"aggregation_status" varchar(256),
	"aggregation_weight" real,
	"excluded" boolean,
	"exported" date,
	"feedback" text,
	"feedback_format" integer,
	"final_grade" real,
	"hidden" boolean,
	"information" text,
	"information_format" integer,
	"item_id" varchar(256),
	"locked" boolean,
	"lock_time" date,
	"overridden" boolean,
	"raw_grade" real,
	"raw_grade_max" real,
	"raw_grade_min" real,
	"raw_scale_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"user_modified" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_grades_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" integer,
	"excluded" integer,
	"exported" date,
	"feedback" text,
	"feedback_format" integer,
	"final_grade" real,
	"hidden" boolean,
	"information" text,
	"information_format" integer,
	"item_id" varchar(256),
	"locked" integer,
	"lock_time" date,
	"logged_user" varchar(256),
	"old_id" varchar(256),
	"overridden" integer,
	"raw_grade" real,
	"raw_grade_max" real,
	"raw_grade_min" real,
	"raw_scale_id" varchar(256),
	"source" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"user_modified" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_import_newitems" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"import_code" varchar(256),
	"importer" varchar(256),
	"item_name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_import_values" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"feedback" text,
	"final_grade" real,
	"import_code" varchar(256),
	"importer" varchar(256),
	"import_only_feedback" boolean,
	"item_id" varchar(256),
	"new_grade_item" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_items" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"aggregation_coef" real,
	"aggregation_coef2" real,
	"calculation" text,
	"category_id" varchar(256),
	"course_id" varchar(256),
	"decimals" boolean,
	"display" integer,
	"grade_max" real,
	"grade_min" real,
	"grade_pass" real,
	"grade_type" integer,
	"hidden" boolean,
	"id_number" varchar(256),
	"item_info" text,
	"item_instance" varchar(256),
	"item_module" varchar(256),
	"item_name" varchar(256),
	"item_number" integer,
	"item_type" varchar(256),
	"locked" boolean,
	"lock_time" timestamp,
	"mult_factor" real,
	"needs_update" integer,
	"outcome_id" varchar(256),
	"plus_factor" real,
	"scale_id" varchar(256),
	"weight_override" boolean,
	"sort_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_items_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" integer,
	"aggregation_coef" real,
	"aggregation_coef2" real,
	"calculation" text,
	"category_id" varchar(256),
	"course_id" varchar(256),
	"decimals" boolean,
	"display" integer,
	"grade_max" real,
	"grade_min" real,
	"grade_pass" real,
	"grade_type" integer,
	"hidden" boolean,
	"id_number" varchar(256),
	"item_info" text,
	"item_instance" varchar(256),
	"item_module" varchar(256),
	"item_name" varchar(256),
	"item_number" integer,
	"item_type" varchar(256),
	"locked" boolean,
	"lock_time" timestamp,
	"mult_factor" real,
	"needs_update" integer,
	"old_id" varchar(256),
	"outcome_id" varchar(256),
	"plus_factor" real,
	"scale_id" varchar(256),
	"source" varchar(256),
	"weight_override" boolean,
	"sort_order" integer,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_letters" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256),
	"letter" varchar(256),
	"lower_boundary" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_outcomes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"full_name" text,
	"scale_id" varchar(256),
	"short_name" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_outcomes_courses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"grade_outcome_id" varchar(256) NOT NULL,
	"course_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_outcomes_histories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" integer,
	"course_id" varchar(256),
	"description" text,
	"description_format" integer,
	"full_name" text,
	"old_id" varchar(256),
	"scale_id" varchar(256),
	"short_name" varchar(256),
	"source" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade_settings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256),
	"name" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grading_areas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"active_method" varchar(256),
	"area_name" varchar(256),
	"component" varchar(256) NOT NULL,
	"context_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grading_definitions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"area_id" varchar(256),
	"copied_from_id" varchar(256),
	"description" text,
	"description_format" integer,
	"method" varchar(256),
	"name" varchar(256),
	"options" text,
	"status" integer,
	"time_copied" timestamp,
	"user_id" varchar(256) NOT NULL,
	"user_modified" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_guide_comments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"definition_id" varchar(256),
	"description" text,
	"description_format" integer,
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_guide_criteria" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"definition_id" varchar(256),
	"description" text,
	"description_format" integer,
	"description_markers" text,
	"description_markers_format" integer,
	"max_score" real,
	"short_name" varchar(256),
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_guide_fillings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"criterion_id" varchar(256),
	"instance_id" varchar(256),
	"remark" text,
	"remark_format" integer,
	"score" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_rubric_criterias" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"definition_id" varchar(256),
	"description" text,
	"description_format" integer,
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_rubric_fillings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"criterion_id" varchar(256),
	"instance_id" varchar(256),
	"level_id" varchar(256),
	"remark" text,
	"remark_format" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gradingform_rubric_levels" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"criterion_id" varchar(256),
	"definition" text,
	"definition_format" integer,
	"score" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grading_instances" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"definition_id" varchar(256),
	"feedback" text,
	"feedback_format" integer,
	"item_id" varchar(256),
	"rater_id" varchar(256),
	"raw_grade" real,
	"status" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grade_outcomes_courses" ADD CONSTRAINT "grade_outcomes_courses_grade_outcome_id_grade_outcomes_id_fk" FOREIGN KEY ("grade_outcome_id") REFERENCES "public"."grade_outcomes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "grade_items_sort_order_idx" ON "grade_items" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "grade_items_histories_sort_order_idx" ON "grade_items_histories" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gradingform_guide_comments_sort_order_idx" ON "gradingform_guide_comments" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gradingform_guide_criteria_sort_order_idx" ON "gradingform_guide_criteria" USING btree ("sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "gradingform_rubric_criterias_sort_order_idx" ON "gradingform_rubric_criterias" USING btree ("sort_order");