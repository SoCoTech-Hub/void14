CREATE TABLE IF NOT EXISTS "lesson_answers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer" text,
	"answer_format" integer,
	"flags" boolean,
	"grade" integer,
	"jump_to" varchar(256),
	"lesson_id" varchar(256) NOT NULL,
	"lesson_page_id" varchar(256) NOT NULL,
	"response" text,
	"response_format" integer,
	"score" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_attempts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"lesson_answer_id" varchar(256) NOT NULL,
	"lesson_page_id" varchar(256) NOT NULL,
	"lesson_id" varchar(256) NOT NULL,
	"correct" boolean,
	"retry" integer,
	"user_answer" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_branches" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"flag" integer,
	"lesson_id" varchar(256) NOT NULL,
	"lesson_page_id" varchar(256) NOT NULL,
	"next_page_id" varchar(256),
	"retry" integer,
	"time_seen" timestamp,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_grades" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"completed" timestamp,
	"grade" real,
	"late" boolean,
	"lesson_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_overrides" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"available" timestamp,
	"deadline" timestamp,
	"group_id" varchar(256),
	"lesson_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_pages" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"contents" text,
	"contents_format" integer,
	"display" integer,
	"layout" integer,
	"lesson_id" varchar(256),
	"next_page_id" varchar(256),
	"prev_page_id" varchar(256),
	"q_option" integer,
	"q_type" integer,
	"title" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lessons" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"activity_link" varchar(256),
	"allow_offline_attempts" boolean,
	"available" timestamp,
	"bg_color" varchar(256),
	"completion_end_reached" boolean,
	"completion_time_spent" integer,
	"conditions" text,
	"course" varchar(256),
	"custom" integer,
	"deadline" timestamp,
	"dependency" integer,
	"display_left" boolean,
	"display_left_if" boolean,
	"feedback" boolean,
	"grade" varchar(256),
	"height" integer,
	"intro" text,
	"intro_format" integer,
	"max_answers" integer,
	"max_attempts" integer,
	"max_pages" integer,
	"media_close" integer,
	"media_file" varchar(256),
	"media_height" integer,
	"media_width" integer,
	"min_questions" integer,
	"mod_attempts" integer,
	"name" varchar(256),
	"next_page_default" integer,
	"ongoing" integer,
	"password" varchar(256),
	"practice" boolean,
	"progressbar" boolean,
	"retake" boolean,
	"review" boolean,
	"slideshow" boolean,
	"time_limit" integer,
	"use_max_grade" boolean,
	"use_password" boolean,
	"width" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lesson_timer" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"completed" boolean,
	"lesson_id" varchar(256) NOT NULL,
	"lesson_time" integer,
	"start_time" timestamp,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_lesson_page_id_lesson_pages_id_fk" FOREIGN KEY ("lesson_page_id") REFERENCES "public"."lesson_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_lesson_answer_id_lesson_answers_id_fk" FOREIGN KEY ("lesson_answer_id") REFERENCES "public"."lesson_answers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_lesson_page_id_lesson_pages_id_fk" FOREIGN KEY ("lesson_page_id") REFERENCES "public"."lesson_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_attempts" ADD CONSTRAINT "lesson_attempts_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_branches" ADD CONSTRAINT "lesson_branches_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_branches" ADD CONSTRAINT "lesson_branches_lesson_page_id_lesson_pages_id_fk" FOREIGN KEY ("lesson_page_id") REFERENCES "public"."lesson_pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_grades" ADD CONSTRAINT "lesson_grades_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_overrides" ADD CONSTRAINT "lesson_overrides_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lesson_timer" ADD CONSTRAINT "lesson_timer_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
