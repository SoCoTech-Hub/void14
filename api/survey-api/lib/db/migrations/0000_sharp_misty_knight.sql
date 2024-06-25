CREATE TABLE IF NOT EXISTS "survey_analysiss" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"notes" text,
	"survey_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "survey_answers" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"answer1" text,
	"answer2" text,
	"survey_question_id" varchar(256) NOT NULL,
	"survey_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "survey_questions" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"intro" varchar(256),
	"multi" varchar(256),
	"options" text,
	"short_text" varchar(256),
	"text" varchar(256),
	"type" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveys" (
	"organization_id" varchar(191) NOT NULL,
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"completion_submit" boolean,
	"course_id" varchar(256),
	"days" integer,
	"intro" text,
	"intro_format" integer,
	"questions" varchar(256),
	"template_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey_analysiss" ADD CONSTRAINT "survey_analysiss_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_survey_question_id_survey_questions_id_fk" FOREIGN KEY ("survey_question_id") REFERENCES "public"."survey_questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
