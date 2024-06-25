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
CREATE TABLE IF NOT EXISTS "scorm_aicc_sessions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attempt" integer,
	"hacp_session" varchar(256),
	"lesson_status" varchar(256),
	"scorm_scoe_id" varchar(256) NOT NULL,
	"scorm_id" varchar(256) NOT NULL,
	"scorm_mode" varchar(256),
	"scorm_status" varchar(256),
	"session_time" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorms" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"auto" boolean,
	"auto_commit" boolean,
	"completion_score_required" integer,
	"completion_status_all_scos" boolean,
	"completion_status_required" boolean,
	"course_id" varchar(256),
	"display_attempt_status" boolean,
	"display_course_structure" boolean,
	"force_completed" boolean,
	"force_new_attempt" boolean,
	"grade_method" integer,
	"height" integer,
	"hide_browse" boolean,
	"hide_toc" boolean,
	"intro" text,
	"intro_format" integer,
	"last_attempt_lock" boolean,
	"launch" integer,
	"mastery_override" boolean,
	"max_attempt" integer,
	"max_grade" real,
	"md5_hash" varchar(256),
	"name" varchar(256),
	"nav" boolean,
	"nav_position_left" integer,
	"nav_position_top" integer,
	"options" varchar(256),
	"popup" boolean,
	"reference" varchar(256),
	"revision" integer,
	"scorm_type" varchar(256),
	"sha1_hash" varchar(256),
	"skip_view" boolean,
	"time_close" timestamp,
	"time_open" timestamp,
	"update_freq" boolean,
	"version" varchar(256),
	"what_grade" integer,
	"width" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_scoes" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"identifier" varchar(256),
	"launch" text,
	"manifest" varchar(256),
	"organization" varchar(256),
	"parent" varchar(256),
	"scorm_id" varchar(256) NOT NULL,
	"scorm_type" varchar(256),
	"sort_order" integer,
	"title" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_scoes_datas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"scorm_scoe_id" varchar(256) NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_scoes_tracks" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"element" varchar(256),
	"attempt" integer,
	"scorm_scoe_id" varchar(256) NOT NULL,
	"scorm_id" varchar(256) NOT NULL,
	"value" text,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_mapinfos" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"scorm_seq_objective_id" varchar(256) NOT NULL,
	"read_normalized_measure" boolean,
	"read_satisfied_status" boolean,
	"scorm_scoe_id" varchar(256) NOT NULL,
	"scorm_seq_target_objective_id" varchar(256) NOT NULL,
	"write_normalized_measure" boolean,
	"write_satisfied_status" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_objectives" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"min_normalized_measure" real,
	"objective_id" varchar(256),
	"primary_obj" boolean,
	"satisfied_by_measure" boolean,
	"scorm_scoe_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_rollup_rule_conds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cond" varchar(256),
	"operator" varchar(256),
	"scorm_seq_rollup_rule_id" varchar(256) NOT NULL,
	"scorm_scoe_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_rollup_rules" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"child_activity_set" varchar(256),
	"condition_combination" varchar(256),
	"minimum_count" integer,
	"minimum_percent" real,
	"scorm_scoe_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_rule_conditions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"cond" varchar(256),
	"measure_threshold" real,
	"operator" varchar(256),
	"refrenced_objective" varchar(256),
	"scorm_seq_rule_cond_id" varchar(256) NOT NULL,
	"scorm_scoe_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scorm_seq_rule_conds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"action" varchar(256),
	"condition_combination" varchar(256),
	"ruletype" integer,
	"scorm_scoe_id" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_aicc_sessions" ADD CONSTRAINT "scorm_aicc_sessions_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_aicc_sessions" ADD CONSTRAINT "scorm_aicc_sessions_scorm_id_scorms_id_fk" FOREIGN KEY ("scorm_id") REFERENCES "public"."scorms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_scoes" ADD CONSTRAINT "scorm_scoes_scorm_id_scorms_id_fk" FOREIGN KEY ("scorm_id") REFERENCES "public"."scorms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_scoes_datas" ADD CONSTRAINT "scorm_scoes_datas_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_scoes_tracks" ADD CONSTRAINT "scorm_scoes_tracks_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_scoes_tracks" ADD CONSTRAINT "scorm_scoes_tracks_scorm_id_scorms_id_fk" FOREIGN KEY ("scorm_id") REFERENCES "public"."scorms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_mapinfos" ADD CONSTRAINT "scorm_seq_mapinfos_scorm_seq_objective_id_scorm_seq_objectives_id_fk" FOREIGN KEY ("scorm_seq_objective_id") REFERENCES "public"."scorm_seq_objectives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_mapinfos" ADD CONSTRAINT "scorm_seq_mapinfos_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_mapinfos" ADD CONSTRAINT "scorm_seq_mapinfos_scorm_seq_target_objective_id_scorm_seq_objectives_id_fk" FOREIGN KEY ("scorm_seq_target_objective_id") REFERENCES "public"."scorm_seq_objectives"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_objectives" ADD CONSTRAINT "scorm_seq_objectives_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rollup_rule_conds" ADD CONSTRAINT "scorm_seq_rollup_rule_conds_scorm_seq_rollup_rule_id_scorm_seq_rollup_rules_id_fk" FOREIGN KEY ("scorm_seq_rollup_rule_id") REFERENCES "public"."scorm_seq_rollup_rules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rollup_rule_conds" ADD CONSTRAINT "scorm_seq_rollup_rule_conds_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rollup_rules" ADD CONSTRAINT "scorm_seq_rollup_rules_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rule_conditions" ADD CONSTRAINT "scorm_seq_rule_conditions_scorm_seq_rule_cond_id_scorm_seq_rule_conds_id_fk" FOREIGN KEY ("scorm_seq_rule_cond_id") REFERENCES "public"."scorm_seq_rule_conds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rule_conditions" ADD CONSTRAINT "scorm_seq_rule_conditions_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scorm_seq_rule_conds" ADD CONSTRAINT "scorm_seq_rule_conds_scorm_scoe_id_scorm_scoes_id_fk" FOREIGN KEY ("scorm_scoe_id") REFERENCES "public"."scorm_scoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
