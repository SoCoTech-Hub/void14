CREATE TABLE IF NOT EXISTS "question_answers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer" text,
	"answer_format" integer,
	"feedback" text,
	"feedback_format" integer,
	"fraction" real,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_attempts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"behaviour" varchar(256),
	"flagged" boolean,
	"max_fraction" real,
	"max_mark" real,
	"min_fraction" real,
	"question_id" varchar(256) NOT NULL,
	"question_summary" text,
	"question_usage_id" varchar(256) NOT NULL,
	"response_summary" text,
	"right_answer" text,
	"slot" integer,
	"variant" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_attempt_step_datas" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_attempt_step_id" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"value" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_attempt_steps" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"fraction" real,
	"question_attempt_id" varchar(256) NOT NULL,
	"sequence_number" integer,
	"state" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_bank_entries" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"id_number" varchar(256),
	"question_category_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_calculated_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer_numbering" varchar(256),
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partiallycorrect_feedback" text,
	"partiallycorrect_feedback_format" integer,
	"question_id" varchar(256) NOT NULL,
	"show_num_correct" boolean NOT NULL,
	"shuffle_answers" boolean NOT NULL,
	"single" boolean NOT NULL,
	"synchronize" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_calculateds" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_answer_id" varchar(256) NOT NULL,
	"correct_answer_format" integer,
	"correct_answer_length" integer,
	"question_id" varchar(256) NOT NULL,
	"tolerance" varchar(256) NOT NULL,
	"tolerance_type" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_categories" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"context_id" varchar(256) NOT NULL,
	"id_number" varchar(256),
	"info" text,
	"info_format" integer,
	"name" varchar(256),
	"parent_id" varchar(256),
	"sort_order" integer NOT NULL,
	"stamp" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_dataset_definitions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_category_id" varchar(256) NOT NULL,
	"item_count" integer NOT NULL,
	"name" varchar(256) NOT NULL,
	"options" varchar(256),
	"type" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_dataset_items" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_dataset_definition_id" varchar(256) NOT NULL,
	"item_number" integer,
	"value" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_datasets" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_dataset_definition_id" varchar(256) NOT NULL,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_ddwtos" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partiallycorrect_feedback" text,
	"partiallycorrect_feedback_format" integer,
	"show_num_correct" boolean NOT NULL,
	"shuffle_answers" boolean NOT NULL,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_gapselects" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partiallycorrect_feedback" text,
	"partiallycorrect_feedback_format" integer,
	"show_num_correct" boolean,
	"shuffle_answers" boolean NOT NULL,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_hints" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"clear_wrong" boolean NOT NULL,
	"hint" text,
	"hint_format" integer,
	"options" varchar(256),
	"question_id" varchar(256) NOT NULL,
	"show_num_correct" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_multianswers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"sequence" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_numerical_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"show_units" integer,
	"unit_grading_type" integer,
	"unit_penalty" real,
	"units_left" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_numericals" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_answer_id" varchar(256) NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"tolerance" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_numerical_units" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"multiplier" real,
	"question_id" varchar(256) NOT NULL,
	"unit" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_references" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"item_id" varchar(256),
	"question_area" varchar(256),
	"question_bank_entry_id" varchar(256) NOT NULL,
	"using_context_id" varchar(256),
	"version" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_response_analysises" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"a_id" varchar(256) NOT NULL,
	"credit" real,
	"hash_code" varchar(256),
	"question_id" varchar(256) NOT NULL,
	"response" text,
	"subq_id" varchar(256),
	"variant" varchar(256),
	"which_tries" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_response_counts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_response_analysise_id" varchar(256) NOT NULL,
	"rcount" integer NOT NULL,
	"try" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "questions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"default_mark" real,
	"general_feedback" text,
	"general_feedback_format" integer,
	"length" integer,
	"name" varchar(256),
	"parent_id" varchar(256),
	"penalty" real,
	"qtype" varchar(256) NOT NULL,
	"question_text" text,
	"question_text_format" integer,
	"stamp" varchar(256),
	"modified_by" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_set_references" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"filter_condition" text,
	"item_id" varchar(256),
	"question_area" varchar(256),
	"questions_context_id" varchar(256),
	"using_context_id" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_statistics" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"discrimination_index" real,
	"discriminative_efficiency" real,
	"effective_weight" real,
	"facility" real,
	"hashcode" varchar(256),
	"max_mark" real,
	"neg_covar" boolean,
	"positions" text,
	"question_id" varchar(256) NOT NULL,
	"random_guess_score" real,
	"s" integer,
	"sd" real,
	"slot" integer,
	"sub_question" boolean,
	"sub_questions" text,
	"variant" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_truefalse" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"false_answer" varchar(256) NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"true_answer" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_usages" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"component" varchar(256),
	"context_id" varchar(256) NOT NULL,
	"preferred_behaviour" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_versions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_bank_entry_id" varchar(256) NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"status" varchar(256),
	"version" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_answers" ADD CONSTRAINT "question_answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_attempts" ADD CONSTRAINT "question_attempts_question_usage_id_question_usages_id_fk" FOREIGN KEY ("question_usage_id") REFERENCES "public"."question_usages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_attempt_step_datas" ADD CONSTRAINT "question_attempt_step_datas_question_attempt_step_id_question_attempt_steps_id_fk" FOREIGN KEY ("question_attempt_step_id") REFERENCES "public"."question_attempt_steps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_attempt_steps" ADD CONSTRAINT "question_attempt_steps_question_attempt_id_question_attempts_id_fk" FOREIGN KEY ("question_attempt_id") REFERENCES "public"."question_attempts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_bank_entries" ADD CONSTRAINT "question_bank_entries_question_category_id_question_categories_id_fk" FOREIGN KEY ("question_category_id") REFERENCES "public"."question_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_calculated_options" ADD CONSTRAINT "question_calculated_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_calculateds" ADD CONSTRAINT "question_calculateds_question_answer_id_question_answers_id_fk" FOREIGN KEY ("question_answer_id") REFERENCES "public"."question_answers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_calculateds" ADD CONSTRAINT "question_calculateds_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_dataset_definitions" ADD CONSTRAINT "question_dataset_definitions_question_category_id_question_categories_id_fk" FOREIGN KEY ("question_category_id") REFERENCES "public"."question_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_dataset_items" ADD CONSTRAINT "question_dataset_items_question_dataset_definition_id_question_dataset_definitions_id_fk" FOREIGN KEY ("question_dataset_definition_id") REFERENCES "public"."question_dataset_definitions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_datasets" ADD CONSTRAINT "question_datasets_question_dataset_definition_id_question_dataset_definitions_id_fk" FOREIGN KEY ("question_dataset_definition_id") REFERENCES "public"."question_dataset_definitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_datasets" ADD CONSTRAINT "question_datasets_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_ddwtos" ADD CONSTRAINT "question_ddwtos_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_gapselects" ADD CONSTRAINT "question_gapselects_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_hints" ADD CONSTRAINT "question_hints_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_multianswers" ADD CONSTRAINT "question_multianswers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_numerical_options" ADD CONSTRAINT "question_numerical_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_numericals" ADD CONSTRAINT "question_numericals_question_answer_id_question_answers_id_fk" FOREIGN KEY ("question_answer_id") REFERENCES "public"."question_answers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_numericals" ADD CONSTRAINT "question_numericals_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_numerical_units" ADD CONSTRAINT "question_numerical_units_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_references" ADD CONSTRAINT "question_references_question_bank_entry_id_question_bank_entries_id_fk" FOREIGN KEY ("question_bank_entry_id") REFERENCES "public"."question_bank_entries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_response_analysises" ADD CONSTRAINT "question_response_analysises_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_response_counts" ADD CONSTRAINT "question_response_counts_question_response_analysise_id_question_response_analysises_id_fk" FOREIGN KEY ("question_response_analysise_id") REFERENCES "public"."question_response_analysises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_statistics" ADD CONSTRAINT "question_statistics_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_truefalse" ADD CONSTRAINT "question_truefalse_false_answer_question_answers_id_fk" FOREIGN KEY ("false_answer") REFERENCES "public"."question_answers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_truefalse" ADD CONSTRAINT "question_truefalse_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_truefalse" ADD CONSTRAINT "question_truefalse_true_answer_question_answers_id_fk" FOREIGN KEY ("true_answer") REFERENCES "public"."question_answers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_versions" ADD CONSTRAINT "question_versions_question_bank_entry_id_question_bank_entries_id_fk" FOREIGN KEY ("question_bank_entry_id") REFERENCES "public"."question_bank_entries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_versions" ADD CONSTRAINT "question_versions_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_answers_question_id_idx" ON "question_answers" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_attempts_question_id_idx" ON "question_attempts" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_attempt_step_datas_question_attempt_step_id_idx" ON "question_attempt_step_datas" USING btree ("question_attempt_step_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_attempt_steps_question_attempt_id_idx" ON "question_attempt_steps" USING btree ("question_attempt_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_bank_entries_question_category_id_idx" ON "question_bank_entries" USING btree ("question_category_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_calculated_options_question_id_idx" ON "question_calculated_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_calculateds_question_id_idx" ON "question_calculateds" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_categories_context_id_idx" ON "question_categories" USING btree ("context_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_dataset_definitions_question_category_id_idx" ON "question_dataset_definitions" USING btree ("question_category_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_dataset_items_question_dataset_definition_id_idx" ON "question_dataset_items" USING btree ("question_dataset_definition_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_datasets_question_id_idx" ON "question_datasets" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_ddwtos_question_id_idx" ON "question_ddwtos" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_gapselects_question_id_idx" ON "question_gapselects" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_hints_question_id_idx" ON "question_hints" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_multianswers_question_id_idx" ON "question_multianswers" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_numerical_options_question_id_idx" ON "question_numerical_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_numericals_question_id_idx" ON "question_numericals" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_numerical_units_question_id_idx" ON "question_numerical_units" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_references_question_bank_entry_id_idx" ON "question_references" USING btree ("question_bank_entry_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_response_analysises_question_id_idx" ON "question_response_analysises" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_response_counts_question_response_analysise_id_idx" ON "question_response_counts" USING btree ("question_response_analysise_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "questions_parent_id_idx" ON "questions" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_set_references_questions_context_id_idx" ON "question_set_references" USING btree ("questions_context_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_statistics_question_id_idx" ON "question_statistics" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_truefalse_question_id_idx" ON "question_truefalse" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_usages_component_idx" ON "question_usages" USING btree ("component");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "question_versions_question_id_idx" ON "question_versions" USING btree ("question_id");