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
CREATE TABLE IF NOT EXISTS "course_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_count" integer,
	"depth" integer,
	"description" text,
	"description_format" integer,
	"id_number" varchar(256),
	"name" varchar(256),
	"parent" integer,
	"path" varchar(256),
	"sort_order" integer,
	"theme" varchar(256),
	"visible" boolean,
	"visible_old" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_completion_aggr_methds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"criteria_type" integer,
	"method" boolean,
	"value" real
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_completion_crit_compls" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"time_completed" timestamp,
	"time_unenrolled" timestamp,
	"grade_final" real,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_completion_criterias" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"course_instance_id" varchar(256),
	"criteria_type" varchar(256),
	"enrol_period_days" integer,
	"role_id" varchar(256),
	"time_start" timestamp,
	"time_end" timestamp,
	"grade_pass" real,
	"module_type" varchar(256),
	"completion_expected_date" timestamp,
	"remove_this_field" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_completion_defaults" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"completion_expected_date" timestamp,
	"course_id" varchar(256) NOT NULL,
	"module_id" varchar(256),
	"completion" boolean,
	"completion_pass_grade" boolean,
	"completion_use_grade" boolean,
	"completion_view" boolean,
	"custom_rules" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_completions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"time_completed" timestamp,
	"time_enrolled" timestamp,
	"time_started" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_format_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"section_id" varchar(256),
	"value" text,
	"format" varchar(256),
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_modules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"added" varchar(256),
	"completion_expected" timestamp,
	"completion_grade_item_number" varchar(256),
	"course_id" varchar(256) NOT NULL,
	"grouping_id" varchar(256),
	"instance" varchar(256),
	"module_id" varchar(256),
	"section_id" varchar(256),
	"completion_pass_grade" boolean,
	"completion_view" boolean,
	"group_mode" integer,
	"score" integer,
	"id_number" varchar(256),
	"availability_restrictions" text,
	"deletion_in_progress" boolean,
	"download_content" boolean,
	"show_description" boolean,
	"visible" boolean,
	"visible_on_course_page" boolean,
	"completion" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_modules_completions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_module_id" varchar(256),
	"completion_state" varchar(256),
	"viewed" boolean,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_publishes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"hub_course_id" varchar(256),
	"time_checked" timestamp,
	"time_published" timestamp,
	"enrollable" boolean,
	"published" boolean,
	"hub_url" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_requests" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"category_id" varchar(256),
	"requester_id" varchar(256),
	"reason" text,
	"summary" text,
	"full_name" varchar(256),
	"password" varchar(256),
	"short_name" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cache_rev" integer,
	"calendar_type" varchar(256),
	"category" integer,
	"completion_notify" boolean,
	"default_grouping_id" varchar(191),
	"download_content" boolean,
	"enable_completion" boolean,
	"end_date" date,
	"format" varchar(256),
	"full_name" varchar(256),
	"group_mode" integer,
	"group_mode_force" integer,
	"id_number" varchar(256),
	"lang" varchar(256),
	"legacy_files" integer,
	"marker" integer,
	"max_bytes" integer,
	"news_items" integer,
	"original_course_id" varchar(256),
	"relative_dates_mode" boolean,
	"requested" boolean,
	"short_name" varchar(256),
	"show_activity_dates" boolean,
	"show_completion_conditions" boolean,
	"show_grades" integer,
	"show_reports" integer,
	"sort_order" integer,
	"start_date" integer,
	"summary" text,
	"summary_format" integer,
	"theme" varchar(256),
	"visible" boolean,
	"visible_old" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_sections" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"course_id" varchar(256) NOT NULL,
	"section_id" varchar(256),
	"visible" boolean,
	"availability" text,
	"sequence" text,
	"summary" text,
	"name" varchar(256),
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
 ALTER TABLE "course_completion_aggr_methds" ADD CONSTRAINT "course_completion_aggr_methds_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_completion_crit_compls" ADD CONSTRAINT "course_completion_crit_compls_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_completion_criterias" ADD CONSTRAINT "course_completion_criterias_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_completion_defaults" ADD CONSTRAINT "course_completion_defaults_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_completions" ADD CONSTRAINT "course_completions_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_format_options" ADD CONSTRAINT "course_format_options_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_modules" ADD CONSTRAINT "course_modules_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_publishes" ADD CONSTRAINT "course_publishes_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course_sections" ADD CONSTRAINT "course_sections_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_completion_crit_compls_course_id_idx" ON "course_completion_crit_compls" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_completion_criterias_course_id_idx" ON "course_completion_criterias" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_completion_defaults_course_id_idx" ON "course_completion_defaults" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_completions_course_id_idx" ON "course_completions" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_format_options_course_id_idx" ON "course_format_options" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_modules_course_id_idx" ON "course_modules" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_modules_completions_course_module_id_idx" ON "course_modules_completions" USING btree ("course_module_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_publishes_course_id_idx" ON "course_publishes" USING btree ("course_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "course_sections_course_id_idx" ON "course_sections" USING btree ("course_id");