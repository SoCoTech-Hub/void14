CREATE TABLE IF NOT EXISTS "quiz_attempts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attempt" integer,
	"current_page" integer NOT NULL,
	"graded_notification_sent_time" integer,
	"layout" text,
	"preview" boolean DEFAULT false NOT NULL,
	"quiz_id" varchar(256) NOT NULL,
	"state" varchar(256),
	"sum_grades" real,
	"time_check_state" integer,
	"time_finish" integer,
	"time_modified_offline" integer,
	"time_start" integer,
	"unique_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quizes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allow_offline_attempts" boolean DEFAULT false,
	"attempt_on_last" boolean DEFAULT false,
	"attempts" integer NOT NULL,
	"browser_security" varchar(256),
	"can_redo_questions" boolean DEFAULT false NOT NULL,
	"completion_attempts_exhausted" boolean DEFAULT false NOT NULL,
	"completion_min_attempts" integer NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"decimal_points" integer NOT NULL,
	"delay_1" integer,
	"delay_2" integer,
	"grace_period" integer,
	"grade" real,
	"grade_method" integer NOT NULL,
	"intro" text,
	"intro_format" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"nav_method" varchar(256),
	"over_due_handling" varchar(256),
	"password" varchar(256),
	"preferred_behaviour" varchar(256),
	"question_decimal_points" integer NOT NULL,
	"questions_per_page" integer,
	"review_attempt" integer,
	"review_correctness" integer,
	"show_blocks" boolean DEFAULT false NOT NULL,
	"review_general_feedback" integer NOT NULL,
	"review_marks" integer NOT NULL,
	"review_overall_feedback" integer NOT NULL,
	"review_right_answer" integer NOT NULL,
	"review_specific_feedback" integer NOT NULL,
	"show_user_picture" boolean DEFAULT false NOT NULL,
	"shuffle_answers" boolean DEFAULT false NOT NULL,
	"sub_net" varchar(256),
	"sum_grades" real NOT NULL,
	"time_close" integer,
	"time_limit" integer,
	"time_open" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_feedbacks" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"feedback_text" text,
	"feedback_text_format" integer NOT NULL,
	"max_grade" real NOT NULL,
	"min_grade" real NOT NULL,
	"quiz_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_grades" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"grade" real,
	"quiz_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_overrides" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attempts" integer,
	"group_id" varchar(256),
	"password" varchar(256),
	"quiz_id" varchar(256) NOT NULL,
	"time_close" integer,
	"time_limit" integer,
	"time_open" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_overview_regrades" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"new_fraction" real,
	"old_fraction" real,
	"question_usage_id" varchar(256) NOT NULL,
	"regraded" boolean DEFAULT false NOT NULL,
	"slot_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_reports" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"capability" varchar(256),
	"display_order" integer,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_sections" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"first_slot" integer,
	"heading" text,
	"quiz_id" varchar(256) NOT NULL,
	"shuffle_questions" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_slots" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"max_mark" real,
	"page" integer NOT NULL,
	"quiz_id" varchar(256) NOT NULL,
	"require_previous" boolean DEFAULT false NOT NULL,
	"slot" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz_statistics" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"all_attempts_avg" real,
	"all_attempts_count" integer,
	"cic" real,
	"error_ratio" real,
	"first_attempts_avg" real,
	"first_attempts_count" integer NOT NULL,
	"hashcode" varchar(256),
	"highest_attempts_avg" real,
	"highest_attempts_count" integer NOT NULL,
	"kurtosis" real,
	"last_attempts_avg" real,
	"last_attempts_count" integer NOT NULL,
	"median" real,
	"skewness" real,
	"standard_deviation" real,
	"standard_error" real,
	"which_attempts" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_feedbacks" ADD CONSTRAINT "quiz_feedbacks_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_grades" ADD CONSTRAINT "quiz_grades_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_overrides" ADD CONSTRAINT "quiz_overrides_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_sections" ADD CONSTRAINT "quiz_sections_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quiz_slots" ADD CONSTRAINT "quiz_slots_quiz_id_quizes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_attempts_quiz_id_idx" ON "quiz_attempts" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quizes_course_id_idx" ON "quizes" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_feedbacks_quiz_id_idx" ON "quiz_feedbacks" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_grades_quiz_id_idx" ON "quiz_grades" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_overrides_quiz_id_idx" ON "quiz_overrides" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_overview_regrades_slot_id_idx" ON "quiz_overview_regrades" USING btree ("slot_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_reports_name_idx" ON "quiz_reports" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_sections_quiz_id_idx" ON "quiz_sections" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_slots_quiz_id_idx" ON "quiz_slots" USING btree ("quiz_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "quiz_statistics_hashcode_idx" ON "quiz_statistics" USING btree ("hashcode");