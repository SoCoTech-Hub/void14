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
CREATE TABLE IF NOT EXISTS "workshop_aggregations" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"grading_grade" real,
	"workshop_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_allocation_schedules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"enabled" boolean,
	"result_log" text,
	"result_message" text,
	"result_status" integer,
	"settings" text,
	"submissionend" integer,
	"workshop_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_assessments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"feedback_author" text,
	"feedback_author_attachment" integer,
	"feedback_author_format" integer,
	"feedback_reviewer" text,
	"feedback_reviewer_format" integer,
	"grade" real,
	"grading_grade" real,
	"grading_grade_over" real,
	"grading_grade_over_by" varchar(256),
	"reviewer_id" varchar(256),
	"submission_id" varchar(256),
	"weight" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_eval_best_settings" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"comparison" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_accumulatives" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"grade" integer,
	"sort" integer,
	"weight" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_comments" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"sort" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_num_error_maps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"grade" real,
	"no_negative" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_num_errors" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"description_trust" integer,
	"grade_0" varchar(256),
	"grade_1" varchar(256),
	"sort" integer,
	"weight" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_rubric_configs" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"layout" varchar(256),
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_rubric_levels" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"definition" text,
	"definition_format" integer,
	"dimension_id" varchar(256),
	"grade" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_form_rubrics" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"description" text,
	"description_format" integer,
	"sort" integer,
	"workshop_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_grades" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assessment_id" varchar(256),
	"dimension_id" varchar(256),
	"grade" real,
	"peer_comment" text,
	"peer_comment_format" integer,
	"strategy" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshops" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assessment_start" integer,
	"conclusion" text,
	"conclusion_format" integer,
	"course_id" varchar(256),
	"evaluation" varchar(256),
	"examples_moden" integer,
	"grade" real,
	"grade_decimals" integer,
	"grading_grade" real,
	"instruct_authors" text,
	"instruct_authors_format" integer,
	"instruct_reviewers" text,
	"instruct_reviewers_format" integer,
	"intro" text,
	"intro_format" integer,
	"late_submissions" boolean,
	"max_bytes" integer,
	"name" varchar(256),
	"natt_achments" integer,
	"overall_feedback_files" integer,
	"overall_feedback_file_types" varchar(256),
	"overall_feedback_max_bytes" integer,
	"overall_feedback_mode" integer,
	"phase" integer,
	"phase_switch_assessment" boolean,
	"strategy" varchar(256),
	"submissionend" integer,
	"submission_file_types" varchar(256),
	"submission_start" integer,
	"submission_type_file" boolean,
	"submission_type_text" boolean,
	"use_examples" boolean,
	"use_peer_assessment" integer,
	"use_self_assessment" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workshop_submissions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attachment" integer,
	"content" text,
	"content_format" integer,
	"content_trust" integer,
	"example" integer,
	"feedback_author" varchar(256),
	"feedback_author0" text,
	"feedback_author_format" integer,
	"grade" real,
	"grade_over" real,
	"grade_over_by" varchar(256),
	"late" integer,
	"published" boolean,
	"title" varchar(256),
	"workshop_id" varchar(256) NOT NULL,
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
 ALTER TABLE "workshop_aggregations" ADD CONSTRAINT "workshop_aggregations_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_allocation_schedules" ADD CONSTRAINT "workshop_allocation_schedules_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_eval_best_settings" ADD CONSTRAINT "workshop_eval_best_settings_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_accumulatives" ADD CONSTRAINT "workshop_form_accumulatives_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_comments" ADD CONSTRAINT "workshop_form_comments_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_num_error_maps" ADD CONSTRAINT "workshop_form_num_error_maps_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_num_errors" ADD CONSTRAINT "workshop_form_num_errors_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_rubric_configs" ADD CONSTRAINT "workshop_form_rubric_configs_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_form_rubrics" ADD CONSTRAINT "workshop_form_rubrics_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workshop_submissions" ADD CONSTRAINT "workshop_submissions_workshop_id_workshops_id_fk" FOREIGN KEY ("workshop_id") REFERENCES "public"."workshops"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_aggregations_workshop_id_idx" ON "workshop_aggregations" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_allocation_schedules_workshop_id_idx" ON "workshop_allocation_schedules" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_assessments_reviewer_id_idx" ON "workshop_assessments" ("reviewer_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_eval_best_settings_workshop_id_idx" ON "workshop_eval_best_settings" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_accumulatives_workshop_id_idx" ON "workshop_form_accumulatives" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_comments_workshop_id_idx" ON "workshop_form_comments" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_num_error_maps_workshop_id_idx" ON "workshop_form_num_error_maps" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_num_errors_workshop_id_idx" ON "workshop_form_num_errors" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_rubric_configs_workshop_id_idx" ON "workshop_form_rubric_configs" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_rubric_levels_dimension_id_idx" ON "workshop_form_rubric_levels" ("dimension_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_form_rubrics_workshop_id_idx" ON "workshop_form_rubrics" ("workshop_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_grades_assessment_id_idx" ON "workshop_grades" ("assessment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshops_course_id_idx" ON "workshops" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workshop_submissions_workshop_id_idx" ON "workshop_submissions" ("workshop_id");