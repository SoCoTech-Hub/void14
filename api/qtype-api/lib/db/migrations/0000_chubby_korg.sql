CREATE TABLE IF NOT EXISTS "qtype_ddimageortext_drags" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"drag_group" varchar(256),
	"infinite" boolean NOT NULL,
	"label" text,
	"no" integer,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_ddimageortext_drops" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"choice" integer,
	"label" text,
	"no" integer NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"x_left" integer,
	"y_top" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_ddimageortexts" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partially_correct_feedback" text,
	"partially_correct_feedback_format" integer,
	"show_num_correct" boolean NOT NULL,
	"shuffle_answers" boolean NOT NULL,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_ddmarker_drags" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"infinite" boolean NOT NULL,
	"label" text,
	"no" integer NOT NULL,
	"no_of_drags" integer NOT NULL,
	"question_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_ddmarker_drops" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"choice" integer,
	"coords" text,
	"no" integer,
	"question_id" varchar(256),
	"shape" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_ddmarkers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partially_correct_feedback" text,
	"partially_correct_feedback_format" integer,
	"question_id" varchar(256) NOT NULL,
	"show_misplaced" boolean NOT NULL,
	"show_num_correct" boolean NOT NULL,
	"shuffle_answers" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_essay_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"attachments" integer,
	"attachments_required" integer NOT NULL,
	"file_types_list" text,
	"grader_info" text,
	"grader_info_format" integer,
	"max_bytes" integer,
	"max_word_limit" integer,
	"min_word_limit" integer,
	"question_id" varchar(256),
	"response_field_lines" integer,
	"response_format" varchar(256),
	"response_required" boolean,
	"response_template" text,
	"response_template_format" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_match_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partially_correct_feedback" text,
	"partially_correct_feedback_format" integer,
	"question_id" varchar(256),
	"show_num_correct" boolean,
	"shuffle_answers" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_match_subquestions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer_text" varchar(256) NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"question_text" text,
	"question_text_format" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_multichoice_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer_numbering" varchar(256),
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partially_correct_feedback" text,
	"partially_correct_feedback_format" integer,
	"question_id" varchar(256) NOT NULL,
	"show_num_correct" boolean NOT NULL,
	"show_standard_instruction" boolean NOT NULL,
	"shuffle_answers" boolean NOT NULL,
	"single" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_randomsamatch_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"choose" integer,
	"correct_feedback" text,
	"correct_feedback_format" integer,
	"incorrect_feedback" text,
	"incorrect_feedback_format" integer,
	"partially_correct_feedback" text,
	"partially_correct_feedback_format" integer,
	"question_id" varchar(256) NOT NULL,
	"show_num_correct" boolean NOT NULL,
	"sub_cats" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "qtype_shortanswer_options" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"question_id" varchar(256) NOT NULL,
	"use_case" boolean NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddimageortext_drags_question_id_idx" ON "qtype_ddimageortext_drags" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddimageortext_drops_question_id_idx" ON "qtype_ddimageortext_drops" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddimageortexts_question_id_idx" ON "qtype_ddimageortexts" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddmarker_drags_question_id_idx" ON "qtype_ddmarker_drags" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddmarker_drops_question_id_idx" ON "qtype_ddmarker_drops" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_ddmarkers_question_id_idx" ON "qtype_ddmarkers" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_essay_options_question_id_idx" ON "qtype_essay_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_match_options_question_id_idx" ON "qtype_match_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_match_subquestions_question_id_idx" ON "qtype_match_subquestions" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_multichoice_options_question_id_idx" ON "qtype_multichoice_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_randomsamatch_options_question_id_idx" ON "qtype_randomsamatch_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "qtype_shortanswer_options_question_id_idx" ON "qtype_shortanswer_options" USING btree ("question_id");