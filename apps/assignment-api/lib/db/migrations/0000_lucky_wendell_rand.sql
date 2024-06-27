CREATE TABLE IF NOT EXISTS "assign_feedback_comments" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"comment_format" integer,
	"comment_text" text,
	"grade_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_editpdf_annots" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"color" varchar(256),
	"draft" boolean,
	"end_x" integer,
	"end_y" integer,
	"grade_id" varchar(256),
	"page_no" integer,
	"path" text,
	"type" varchar(256),
	"x" integer,
	"y" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_editpdf_cmnts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"color" varchar(256),
	"draft" boolean,
	"grade_id" varchar(256),
	"page_no" integer,
	"raw_text" text,
	"width" integer,
	"x" integer,
	"y" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_editpdf_queues" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attempted_conversions" varchar(256),
	"submission_attempt" integer,
	"submission_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_editpdf_quicks" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"color" varchar(256),
	"raw_text" text,
	"width" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_editpdf_rots" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"degree" integer,
	"grade_id" varchar(256),
	"is_rotated" boolean,
	"page_no" integer,
	"path_name_hash" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_feedback_files" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"grade_id" varchar(256),
	"num_files" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_grades" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"attempt_number" integer,
	"grade" real,
	"grader_id" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignments" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_type" varchar(256),
	"course_id" varchar(191),
	"email_teachers" boolean,
	"grade_id" varchar(191),
	"intro" text,
	"intro_format" integer,
	"max_bytes" integer,
	"name" varchar(256),
	"prevent_late" boolean,
	"resubmit" boolean,
	"time_available" integer,
	"time_due" integer,
	"var1" varchar(256),
	"var2" varchar(256),
	"var3" varchar(256),
	"var4" varchar(256),
	"var5" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignment_submissions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"data1" text,
	"data2" text,
	"format" integer,
	"grade_id" varchar(256),
	"mailed" boolean,
	"num_files" integer,
	"submission_comment" text,
	"teacher_id" varchar(256),
	"time_marked" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assignment_upgrades" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"new_cm_id" varchar(256),
	"old_cm_id" varchar(256),
	"new_instance" varchar(256),
	"old_instance" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_overrides" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allow_submissions_from_date" timestamp,
	"assign_id" varchar(256) NOT NULL,
	"cut_off_date" timestamp,
	"due_date" timestamp,
	"group_id" varchar(256),
	"sort_order" integer,
	"time_limit" integer,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_plugin_configs" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"name" varchar(256),
	"plugin" varchar(256),
	"sub_type" varchar(256),
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assigns" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"activity" text,
	"activity_format" integer,
	"allow_submissions_from_date" timestamp,
	"always_show_description" boolean,
	"attempt_reopen_method" varchar(256),
	"blind_marking" boolean,
	"completion_submit" boolean,
	"course_id" varchar(256),
	"cut_off_date" timestamp,
	"due_date" timestamp,
	"grade" integer,
	"grading_due_date" timestamp,
	"hide_grader" boolean,
	"intro" text,
	"intro_format" integer,
	"marking_allocation" boolean,
	"marking_workflow" boolean,
	"max_attempts" integer,
	"name" varchar(256),
	"no_submissions" boolean,
	"prevent_submission_notin_group" boolean,
	"require_all_team_members_submit" boolean,
	"require_submission_statement" boolean,
	"reveal_identities" boolean,
	"send_late_notifications" boolean,
	"send_notifications" boolean,
	"send_student_notifications" boolean,
	"submission_attachments" boolean,
	"submission_drafts" boolean,
	"team_submission" boolean,
	"team_submission_grouping_id" varchar(256),
	"time_limit" timestamp,
	"asdasdasd" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_submission_files" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"num_files" integer,
	"submission" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_submission_online_texts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"online_format" integer,
	"online_text" text,
	"submission" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_submissions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"attempt_number" integer,
	"group_id" varchar(256),
	"latest" boolean,
	"status" varchar(256),
	"time_started" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_user_flags" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allocated_marker" varchar(256),
	"assignment_id" varchar(256) NOT NULL,
	"extension_due_date" timestamp,
	"locked" boolean,
	"is_mailed" boolean,
	"workflow_state" varchar(256),
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "assign_user_mappings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"assignment_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
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
CREATE UNIQUE INDEX IF NOT EXISTS "assignment_id_idx" ON "assign_feedback_comments" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "aff_assignment_id_idx" ON "assign_feedback_files" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ag_assignment_id_idx" ON "assign_grades" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "a_course_id_idx" ON "assignments" ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "as_assignment_id_idx" ON "assignment_submissions" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ao_assign_id_idx" ON "assign_overrides" ("assign_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "apc_assignment_id_idx" ON "assign_plugin_configs" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "asf_assignment_id_idx" ON "assign_submission_files" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "asot_assignment_id_idx" ON "assign_submission_online_texts" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "asub_assignment_id_idx" ON "assign_submissions" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "auf_assignment_id_idx" ON "assign_user_flags" ("assignment_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "aum_assignment_id_idx" ON "assign_user_mappings" ("assignment_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_feedback_comments" ADD CONSTRAINT "assign_feedback_comments_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_feedback_files" ADD CONSTRAINT "assign_feedback_files_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_grades" ADD CONSTRAINT "assign_grades_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assignment_submissions" ADD CONSTRAINT "assignment_submissions_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_overrides" ADD CONSTRAINT "assign_overrides_assign_id_assigns_id_fk" FOREIGN KEY ("assign_id") REFERENCES "assigns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_plugin_configs" ADD CONSTRAINT "assign_plugin_configs_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_submission_files" ADD CONSTRAINT "assign_submission_files_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_submission_online_texts" ADD CONSTRAINT "assign_submission_online_texts_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_submissions" ADD CONSTRAINT "assign_submissions_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_user_flags" ADD CONSTRAINT "assign_user_flags_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "assign_user_mappings" ADD CONSTRAINT "assign_user_mappings_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
