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
CREATE TABLE IF NOT EXISTS "choice_answers" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"choice_option_id" varchar(256) NOT NULL,
	"choice_id" varchar(256) NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "choice_options" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"max_answers" integer,
	"text" text,
	"choice_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "choices" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"allow_multiple" varchar(256),
	"allow_update" varchar(256),
	"completion_submit" boolean,
	"course" varchar(256),
	"display" varchar(256),
	"include_inactive" varchar(256),
	"intro" text,
	"intro_format" varchar(256),
	"limit_answers" varchar(256),
	"name" varchar(256),
	"publish" varchar(256),
	"show_available" boolean,
	"show_preview" varchar(256),
	"show_results" varchar(256),
	"show_unanswered" varchar(256),
	"time_close" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "choice_answers" ADD CONSTRAINT "choice_answers_choice_option_id_choice_options_id_fk" FOREIGN KEY ("choice_option_id") REFERENCES "choice_options"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "choice_answers" ADD CONSTRAINT "choice_answers_choice_id_choices_id_fk" FOREIGN KEY ("choice_id") REFERENCES "choices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "choice_options" ADD CONSTRAINT "choice_options_choice_id_choices_id_fk" FOREIGN KEY ("choice_id") REFERENCES "choices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
